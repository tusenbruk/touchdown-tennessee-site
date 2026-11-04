"""Tests for scripts/update_result.py. Run: python3 -m unittest discover -s scripts -p 'test_*.py'"""
import io
import shutil
import sys
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import update_result as ur  # noqa: E402


class UpdateResultTests(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.addCleanup(shutil.rmtree, self.tmp, True)
        self.file = self.tmp / "schedule.ts"
        shutil.copy(ur.SCHEDULE, self.file)

    def run_cli(self, *args):
        out, err = io.StringIO(), io.StringIO()
        with redirect_stdout(out), redirect_stderr(err):
            code = ur.main([*args, "--file", str(self.file)])
        return code, out.getvalue(), err.getvalue()

    def test_parse_accepts_hyphen_and_dashes(self):
        self.assertEqual(ur.parse_result("W 31-17"), ("W", 31, 17))
        self.assertEqual(ur.parse_result("l 17–20"), ("L", 17, 20))

    def test_parse_rejects_bad_input(self):
        for bad in ["31-17", "W 17-31", "L 31-17", "W 24-24", "W thirty-one", ""]:
            with self.assertRaises(ur.ResultError, msg=bad):
                ur.parse_result(bad)

    def test_seeded_record_is_six_two(self):
        self.assertEqual(ur.record(self.file.read_text(encoding="utf-8")), (6, 2))

    def test_writes_result_and_updates_record(self):
        code, out, _ = self.run_cli("kentucky", "W 31-17")
        self.assertEqual(code, 0)
        self.assertIn("6–2 -> 7–2", out)
        src = self.file.read_text(encoding="utf-8")
        self.assertIn('result: { final: true, score: "31–17", outcome: "W" },', src)
        self.assertEqual(ur.record(src), (7, 2))

    def test_rerun_replaces_instead_of_duplicating(self):
        self.run_cli("kentucky", "W 31-17")
        self.run_cli("kentucky", "L 14-21")
        src = self.file.read_text(encoding="utf-8")
        start, end = ur.game_blocks(src)["kentucky"]
        self.assertEqual(src[start:end].count("result:"), 1)
        self.assertEqual(ur.record(src), (6, 3))

    def test_unknown_id_fails_and_writes_nothing(self):
        before = self.file.read_text(encoding="utf-8")
        code, _, err = self.run_cli("not-a-game", "W 3-0")
        self.assertEqual(code, 1)
        self.assertIn("no game 'not-a-game'", err)
        self.assertEqual(self.file.read_text(encoding="utf-8"), before)

    def test_dry_run_writes_nothing(self):
        before = self.file.read_text(encoding="utf-8")
        code, out, _ = self.run_cli("kentucky", "W 31-17", "--dry-run")
        self.assertEqual(code, 0)
        self.assertIn("Would write", out)
        self.assertEqual(self.file.read_text(encoding="utf-8"), before)

    def test_not_final_is_not_counted_in_record(self):
        self.run_cli("kentucky", "W 10-7", "--not-final")
        src = self.file.read_text(encoding="utf-8")
        self.assertIn("final: false", src)
        self.assertEqual(ur.record(src), (6, 2))

    def test_only_the_target_block_changes(self):
        before = self.file.read_text(encoding="utf-8")
        self.run_cli("lsu", "L 3-20")
        after = self.file.read_text(encoding="utf-8")
        added = [l for l in after.splitlines() if l not in before.splitlines()]
        self.assertEqual(added, ['    result: { final: true, score: "3–20", outcome: "L" },'])


if __name__ == "__main__":
    unittest.main()
