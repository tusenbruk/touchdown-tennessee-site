#!/usr/bin/env python3
"""Record a game result in src/lib/saturday/schedule.ts.

    python3 scripts/update_result.py kentucky "W 31-17"

Validates the game id against schedule.ts, parses the score, writes the
`result` object onto that game (replacing any earlier one, so a typo is fixed
by running it again), then prints the new overall record. Our score comes
first: "W 31-17" means Tennessee 31, opponent 17. Stdlib only.

    --not-final   mark the score as in progress (final: false)
    --dry-run     print what would change and write nothing
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

SCHEDULE = Path(__file__).resolve().parent.parent / "src" / "lib" / "saturday" / "schedule.ts"
EN_DASH = "–"

ID_RE = re.compile(r'^    id: "([^"]+)",\n', re.M)
RESULT_LINE_RE = re.compile(r"^    result: \{.*\},\n", re.M)
RESULT_PARSE_RE = re.compile(
    r'result: \{ final: (true|false), score: "[^"]*", outcome: "([WL])" \}'
)


class ResultError(Exception):
    pass


def parse_result(text: str) -> tuple[str, int, int]:
    """'W 31-17' -> ('W', 31, 17). Accepts hyphen, en dash or em dash."""
    m = re.fullmatch(r"\s*([WLwl])\s+(\d{1,3})\s*[-–—]\s*(\d{1,3})\s*", text)
    if not m:
        raise ResultError(f'cannot parse {text!r}; expected like "W 31-17" (our score first)')
    outcome, ours, theirs = m.group(1).upper(), int(m.group(2)), int(m.group(3))
    if ours == theirs:
        raise ResultError(f"{ours}-{theirs} is a tie; football has none, check the score")
    if outcome == "W" and ours < theirs:
        raise ResultError(f"W with {ours}-{theirs}: our score comes first, so that is a loss")
    if outcome == "L" and ours > theirs:
        raise ResultError(f"L with {ours}-{theirs}: our score comes first, so that is a win")
    return outcome, ours, theirs


def game_blocks(src: str) -> dict[str, tuple[int, int]]:
    """Map game id -> (start, end) offsets of its `{ ... },` block in the games array."""
    blocks: dict[str, tuple[int, int]] = {}
    for m in ID_RE.finditer(src):
        start = src.rfind("\n  {\n", 0, m.start()) + 1
        end = src.index("\n  },\n", m.end()) + len("\n  },\n")
        blocks[m.group(1)] = (start, end)
    return blocks


def record(src: str) -> tuple[int, int]:
    w = l = 0
    for m in RESULT_PARSE_RE.finditer(src):
        if m.group(1) != "true":
            continue
        if m.group(2) == "W":
            w += 1
        else:
            l += 1
    return w, l


def apply(src: str, game_id: str, result_text: str, final: bool = True) -> tuple[str, str]:
    blocks = game_blocks(src)
    if game_id not in blocks:
        raise ResultError(f"no game {game_id!r} in schedule.ts. Known ids: {', '.join(blocks)}")
    outcome, ours, theirs = parse_result(result_text)
    score = f"{ours}{EN_DASH}{theirs}"
    line = (
        f'    result: {{ final: {"true" if final else "false"}, '
        f'score: "{score}", outcome: "{outcome}" }},\n'
    )
    start, end = blocks[game_id]
    block = src[start:end]
    block = RESULT_LINE_RE.sub("", block)
    closing = "  },\n"
    block = block[: -len(closing)] + line + closing
    return src[:start] + block + src[end:], f"{outcome} {score}"


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawTextHelpFormatter)
    ap.add_argument("game_id")
    ap.add_argument("result", help='e.g. "W 31-17" (our score first)')
    ap.add_argument("--not-final", action="store_true", help="score is in progress")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--file", type=Path, default=SCHEDULE, help=argparse.SUPPRESS)
    args = ap.parse_args(argv)

    src = args.file.read_text(encoding="utf-8")
    before = record(src)
    try:
        new_src, label = apply(src, args.game_id, args.result, final=not args.not_final)
    except ResultError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1
    after = record(new_src)

    if not args.dry_run:
        args.file.write_text(new_src, encoding="utf-8")
    verb = "Would write" if args.dry_run else "Wrote"
    state = "in progress" if args.not_final else "final"
    print(f"{verb} {args.game_id}: {label} ({state})")
    print(f"Record: {before[0]}{EN_DASH}{before[1]} -> {after[0]}{EN_DASH}{after[1]}")
    blocks = game_blocks(new_src)
    left = [gid for gid, (s, e) in blocks.items() if "    result:" not in new_src[s:e]]
    print(f"Games without a result: {len(left)}" + (f" (next: {left[0]})" if left else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
