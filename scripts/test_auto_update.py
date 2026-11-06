"""Tests for scripts/auto_update.py. Run: python3 -m unittest discover -s scripts -p 'test_*.py'

Everything here runs against frozen fixtures (the schedule as it stood on
3 Nov 2026 and the ESPN feed as it stood on 6 Nov 2026), never the live
schedule.ts or the network, so the suite stays green as the season moves on.
"""
import copy
import io
import json
import shutil
import sys
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import auto_update as au  # noqa: E402
import update_result as ur  # noqa: E402

SEED = HERE / "fixtures" / "schedule.seed.ts"
FEED = HERE / "fixtures" / "espn.2026-11-06.json"
NOW = datetime(2026, 11, 6, 3, 0, tzinfo=timezone.utc)


def finish(feed, opponent, ours, theirs):
    """Mark one fixture game as final with the given score."""
    for ev in feed["events"]:
        comp = ev["competitions"][0]
        sides = comp["competitors"]
        if any(s["team"]["location"] == opponent for s in sides):
            comp["status"]["type"]["completed"] = True
            for s in sides:
                mine = s["team"]["id"] == au.TEAM_ID
                s["score"] = {"value": float(ours if mine else theirs), "displayValue": str(ours if mine else theirs)}
            return
    raise AssertionError(opponent)


class AutoUpdateTests(unittest.TestCase):
    def setUp(self):
        self.src = SEED.read_text(encoding="utf-8")
        self.feed = json.loads(FEED.read_text(encoding="utf-8"))

    def run_on(self, feed, src=None):
        return au.apply_feed(src or self.src, au.parse_events(feed), NOW)

    def test_confirmed_kickoff_is_filled_in(self):
        new, changes = self.run_on(self.feed)
        self.assertEqual(changes, ["kentucky: kickoff 6:15 ET on ESPN"])
        start, end = ur.game_blocks(new)["kentucky"]
        block = new[start:end]
        self.assertIn('    kickoff: "2026-11-07T23:15:00.000Z",\n', block)
        self.assertIn('    kickoffLabel: "6:15 ET",\n', block)
        self.assertIn('    network: "ESPN",\n', block)

    def test_unconfirmed_kickoffs_are_left_alone(self):
        new, _ = self.run_on(self.feed)
        for gid in ("texas-am", "lsu", "vanderbilt"):
            start, end = ur.game_blocks(new)[gid]
            self.assertIn("    kickoff: null,\n", new[start:end], gid)

    def test_played_games_are_not_rewritten(self):
        new, _ = self.run_on(self.feed)
        for gid in ("auburn", "arkansas", "alabama", "south-carolina"):
            a = ur.game_blocks(self.src)[gid]
            b = ur.game_blocks(new)[gid]
            self.assertEqual(self.src[a[0]:a[1]], new[b[0]:b[1]], gid)

    def test_second_run_changes_nothing(self):
        new, _ = self.run_on(self.feed)
        again, changes = self.run_on(self.feed, new)
        self.assertEqual(changes, [])
        self.assertEqual(again, new)

    def test_final_score_is_recorded_home_and_away(self):
        feed = copy.deepcopy(self.feed)
        finish(feed, "Kentucky", 31, 17)      # home win
        finish(feed, "Texas A&M", 20, 34)     # away loss: our score still first
        new, changes = self.run_on(feed)
        self.assertIn("kentucky: result W 31–17", changes)
        self.assertIn("texas-am: result L 20–34", changes)
        self.assertEqual(ur.record(new), (7, 3))

    def test_corrected_score_replaces_the_old_one(self):
        feed = copy.deepcopy(self.feed)
        finish(feed, "South Carolina", 24, 28)
        new, changes = self.run_on(feed)
        self.assertIn("south-carolina: result L 24–28", changes)
        start, end = ur.game_blocks(new)["south-carolina"]
        self.assertEqual(new[start:end].count("result:"), 1)

    def test_wrong_season_changes_nothing(self):
        feed = copy.deepcopy(self.feed)
        for ev in feed["events"]:
            ev["date"] = ev["date"].replace("2026", "2027")
            for s in ev["competitions"][0]["competitors"]:
                if s["team"]["id"] != au.TEAM_ID:
                    s["team"]["location"] = "Somebody Else"
        with self.assertRaises(au.FeedError):
            self.run_on(feed)

    def test_broken_feed_shape_is_an_error(self):
        with self.assertRaises(au.FeedError):
            au.parse_events({"events": []})
        with self.assertRaises(au.FeedError):
            au.parse_events({"events": [{"date": "2026-11-07T23:15Z", "competitions": []}]})

    def test_tied_or_missing_score_is_an_error(self):
        feed = copy.deepcopy(self.feed)
        finish(feed, "Kentucky", 21, 21)
        with self.assertRaises(au.FeedError):
            self.run_on(feed)

    def test_kickoff_labels(self):
        utc = lambda h, m: datetime(2026, 11, 7, h, m, tzinfo=timezone.utc)  # noqa: E731
        self.assertEqual(au.kickoff_label(utc(17, 0)), "Noon ET")
        self.assertEqual(au.kickoff_label(utc(20, 30)), "3:30 ET")
        self.assertEqual(au.kickoff_label(datetime(2026, 9, 12, 23, 0, tzinfo=timezone.utc)), "7:00 ET")

    def test_cli_dry_run_writes_nothing_and_real_run_writes(self):
        tmp = Path(tempfile.mkdtemp())
        self.addCleanup(shutil.rmtree, tmp, True)
        target = tmp / "schedule.ts"
        shutil.copy(SEED, target)
        out = io.StringIO()
        with redirect_stdout(out), redirect_stderr(io.StringIO()):
            code = au.main(["--dry-run", "--file", str(target), "--feed-file", str(FEED)])
        self.assertEqual(code, 0)
        self.assertEqual(target.read_text(encoding="utf-8"), self.src)
        with redirect_stdout(out), redirect_stderr(io.StringIO()):
            code = au.main(["--file", str(target), "--feed-file", str(FEED)])
        self.assertEqual(code, 0)
        self.assertNotEqual(target.read_text(encoding="utf-8"), self.src)


if __name__ == "__main__":
    unittest.main()
