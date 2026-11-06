#!/usr/bin/env python3
"""Keep src/lib/saturday/schedule.ts current without anyone touching it.

    python3 scripts/auto_update.py            # fetch, write if anything changed
    python3 scripts/auto_update.py --dry-run  # fetch, print, write nothing

Reads Tennessee's schedule from ESPN's public feed and, for games already in
schedule.ts, does two things:

  1. A finished game with no final result gets one (via update_result.apply,
     so the same validation applies as the manual command).
  2. An upcoming game whose kickoff has been confirmed gets its kickoff time,
     label and network filled in.

It never adds, removes or reorders games, and never touches the takes or the
picks. If the feed cannot be matched to the schedule it changes nothing and
exits non-zero, so a broken feed fails loudly instead of writing nonsense.
Stdlib only. Run by .github/workflows/weekly-update.yml.

Exit codes: 0 = ran cleanly (changed or not), 1 = feed or matching problem.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent))
import update_result as ur  # noqa: E402

TEAM_ID = "2633"  # Tennessee, in ESPN's numbering
FEED = (
    "https://site.api.espn.com/apis/site/v2/sports/football/college-football/"
    "teams/{team}/schedule?season={season}"
)
EASTERN = ZoneInfo("America/New_York")
NETWORK_SHORT = {"SEC Network": "SECN", "SEC Network+": "SECN+", "ESPN+": "ESPN+"}

DATE_RE = re.compile(r'^    date: "(\d{4}-\d{2}-\d{2})",\n', re.M)
OPPONENT_RE = re.compile(r'^    opponent: "([^"]+)",\n', re.M)
KICKOFF_RE = re.compile(r"^    kickoff: (null|\"[^\"]*\"),\n", re.M)
LABEL_RE = re.compile(r'^    kickoffLabel: "[^"]*",\n', re.M)
NETWORK_RE = re.compile(r'^    network: "[^"]*",\n', re.M)
FINAL_RE = re.compile(r'^    result: \{ final: true, score: "([^"]*)", outcome: "([WL])" \},\n', re.M)


class FeedError(Exception):
    pass


def norm(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", name.lower())


def schedule_games(src: str) -> list[dict]:
    """The games in schedule.ts, in file order: id, date, opponent."""
    out = []
    for game_id, (start, end) in ur.game_blocks(src).items():
        block = src[start:end]
        date = DATE_RE.search(block)
        opponent = OPPONENT_RE.search(block)
        if not date or not opponent:
            raise FeedError(f"schedule.ts game {game_id!r} has no date or opponent line")
        out.append({"id": game_id, "date": date.group(1), "opponent": opponent.group(1)})
    return out


def fetch(season: int, timeout: int = 30) -> dict:
    req = urllib.request.Request(
        FEED.format(team=TEAM_ID, season=season),
        headers={"User-Agent": "touchdown-tennessee-site schedule updater"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.load(resp)


def parse_events(feed: dict) -> list[dict]:
    """Flatten the feed to what the site needs. Raises FeedError on a shape we do not know."""
    events = feed.get("events")
    if not isinstance(events, list) or not events:
        raise FeedError("feed has no events")
    out = []
    for ev in events:
        try:
            comp = ev["competitions"][0]
            sides = comp["competitors"]
            us = next(s for s in sides if str(s["team"]["id"]) == TEAM_ID)
            them = next(s for s in sides if str(s["team"]["id"]) != TEAM_ID)
            when = datetime.strptime(ev["date"], "%Y-%m-%dT%H:%MZ").replace(tzinfo=timezone.utc)
            completed = bool(comp["status"]["type"]["completed"])
        except (KeyError, IndexError, StopIteration, ValueError, TypeError) as exc:
            raise FeedError(f"unexpected event shape: {exc!r}") from exc

        def score(side: dict) -> int | None:
            raw = side.get("score")
            if isinstance(raw, dict):
                raw = raw.get("displayValue", raw.get("value"))
            try:
                return int(float(raw))
            except (TypeError, ValueError):
                return None

        networks = [
            (b.get("media") or {}).get("shortName") for b in comp.get("broadcasts") or []
        ]
        networks = [n for n in networks if n]
        out.append(
            {
                "opponent": them["team"].get("location") or them["team"].get("displayName", ""),
                "utc": when,
                # Unconfirmed kickoffs come through as midnight Eastern, which is
                # still the right calendar day once converted.
                "date": when.astimezone(EASTERN).date().isoformat(),
                "time_valid": bool(ev.get("timeValid")),
                "completed": completed,
                "ours": score(us),
                "theirs": score(them),
                "network": NETWORK_SHORT.get(networks[0], networks[0]) if networks else None,
            }
        )
    return out


def match(game: dict, events: list[dict]) -> dict | None:
    """Same calendar day first; failing that, same opponent within a week (a moved game)."""
    for ev in events:
        if ev["date"] == game["date"]:
            return ev
    day = datetime.fromisoformat(game["date"]).date()
    for ev in events:
        gap = abs(datetime.fromisoformat(ev["date"]).date() - day)
        if norm(ev["opponent"]) == norm(game["opponent"]) and gap <= timedelta(days=7):
            return ev
    return None


def kickoff_label(utc: datetime) -> str:
    """'Noon ET', '3:30 ET', '7:45 ET', matching the labels already in schedule.ts."""
    local = utc.astimezone(EASTERN)
    if (local.hour, local.minute) == (12, 0):
        return "Noon ET"
    return f"{local.hour % 12 or 12}:{local.minute:02d} ET"


def set_line(block: str, pattern: re.Pattern, line: str) -> str:
    if not pattern.search(block):
        raise FeedError(f"schedule.ts block is missing the line for {line.strip()!r}")
    return pattern.sub(lambda _m: line, block, count=1)


def apply_feed(src: str, events: list[dict], now: datetime) -> tuple[str, list[str]]:
    """Return the new schedule.ts text and a human-readable list of what changed."""
    games = schedule_games(src)
    matched = [(g, match(g, events)) for g in games]
    hits = sum(1 for _g, ev in matched if ev)
    if hits < max(1, len(games) // 2):
        raise FeedError(
            f"only {hits} of {len(games)} games in schedule.ts match the feed; "
            "wrong season or a new schedule that needs entering by hand"
        )

    changes: list[str] = []
    for game, ev in matched:
        if not ev:
            continue
        start, end = ur.game_blocks(src)[game["id"]]
        block = src[start:end]
        final = FINAL_RE.search(block)

        if ev["completed"]:
            if ev["ours"] is None or ev["theirs"] is None or ev["ours"] == ev["theirs"]:
                raise FeedError(f"{game['id']}: finished but the score is unusable")
            outcome = "W" if ev["ours"] > ev["theirs"] else "L"
            score = f"{ev['ours']}{ur.EN_DASH}{ev['theirs']}"
            if final and final.group(1) == score and final.group(2) == outcome:
                continue
            src, label = ur.apply(src, game["id"], f"{outcome} {ev['ours']}-{ev['theirs']}")
            changes.append(f"{game['id']}: result {label}")
            continue

        # Upcoming game: fill in a confirmed kickoff. Never touch a game that has a result.
        if final or not ev["time_valid"] or ev["utc"] < now - timedelta(hours=6):
            continue
        iso = ev["utc"].strftime("%Y-%m-%dT%H:%M:00.000Z")
        new_block = set_line(block, KICKOFF_RE, f'    kickoff: "{iso}",\n')
        new_block = set_line(new_block, LABEL_RE, f'    kickoffLabel: "{kickoff_label(ev["utc"])}",\n')
        if ev["network"]:
            new_block = set_line(new_block, NETWORK_RE, f'    network: "{ev["network"]}",\n')
        if new_block != block:
            src = src[:start] + new_block + src[end:]
            changes.append(
                f"{game['id']}: kickoff {kickoff_label(ev['utc'])}"
                + (f" on {ev['network']}" if ev["network"] else "")
            )
    return src, changes


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawTextHelpFormatter)
    ap.add_argument("--dry-run", action="store_true", help="print what would change, write nothing")
    ap.add_argument("--file", type=Path, default=ur.SCHEDULE, help=argparse.SUPPRESS)
    ap.add_argument("--feed-file", type=Path, help="read the feed from a saved JSON file (tests)")
    args = ap.parse_args(argv)

    src = args.file.read_text(encoding="utf-8")
    try:
        games = schedule_games(src)
        if not games:
            raise FeedError("schedule.ts has no games")
        season = int(games[0]["date"][:4])
        if args.feed_file:
            feed = json.loads(args.feed_file.read_text(encoding="utf-8"))
        else:
            feed = fetch(season)
        new_src, changes = apply_feed(src, parse_events(feed), datetime.now(timezone.utc))
    except (FeedError, ur.ResultError, OSError, json.JSONDecodeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    if not changes:
        print("No change: schedule.ts already matches the feed.")
    else:
        for line in changes:
            print(("Would write " if args.dry_run else "Wrote ") + line)
        w, l = ur.record(new_src)
        print(f"Record: {w}{ur.EN_DASH}{l}")
        if not args.dry_run:
            args.file.write_text(new_src, encoding="utf-8")

    summary = "; ".join(changes)
    gh_out = os.environ.get("GITHUB_OUTPUT")
    if gh_out and not args.dry_run:
        with open(gh_out, "a", encoding="utf-8") as fh:
            fh.write(f"changed={'true' if changes else 'false'}\n")
            fh.write(f"summary={summary}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
