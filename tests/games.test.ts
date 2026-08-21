// Focused tests for the game engine and content banks.
// Run: npm run test:games  (node --experimental-strip-types --test)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  utcDateKey,
  hashString,
  mulberry32,
  seededShuffle,
  pickDaily,
  pickDailyIndex,
  normalizeGuess,
  matchesAnswer,
  validateTriviaBank,
  validateScorePuzzles,
} from "../lib/games/engine.ts";
import { TRIVIA_QUESTIONS } from "../data/games/trivia-questions.ts";
import { SCORE_PUZZLES } from "../data/games/score-puzzles.ts";

test("utcDateKey is stable and UTC-based", () => {
  assert.equal(utcDateKey(new Date("2026-08-21T23:59:59Z")), "2026-08-21");
  assert.equal(utcDateKey(new Date("2026-08-21T00:00:00Z")), "2026-08-21");
});

test("daily selection is deterministic for a date and differs across dates", () => {
  const a1 = pickDaily(TRIVIA_QUESTIONS, new Date("2026-08-21T05:00:00Z"), "tdt-trivia", 10);
  const a2 = pickDaily(TRIVIA_QUESTIONS, new Date("2026-08-21T22:00:00Z"), "tdt-trivia", 10);
  assert.deepEqual(a1.map((q) => q.id), a2.map((q) => q.id), "same UTC day must give the same round");
  assert.equal(a1.length, 10);
  assert.equal(new Set(a1.map((q) => q.id)).size, 10, "no duplicate questions in a round");

  const b = pickDaily(TRIVIA_QUESTIONS, new Date("2026-08-22T05:00:00Z"), "tdt-trivia", 10);
  assert.notDeepEqual(a1.map((q) => q.id), b.map((q) => q.id), "different days should differ");
});

test("date rollover changes the daily puzzle deterministically", () => {
  const i1 = pickDailyIndex(SCORE_PUZZLES.length, new Date("2026-08-21T12:00:00Z"), "tdt-saturday-score");
  const i1b = pickDailyIndex(SCORE_PUZZLES.length, new Date("2026-08-21T23:00:00Z"), "tdt-saturday-score");
  assert.equal(i1, i1b);
  assert.ok(i1 >= 0 && i1 < SCORE_PUZZLES.length);
  // Over a month, more than one distinct puzzle must appear
  const seen = new Set<number>();
  for (let d = 1; d <= 30; d++) {
    seen.add(pickDailyIndex(SCORE_PUZZLES.length, new Date(`2026-09-${String(d).padStart(2, "0")}T12:00:00Z`), "tdt-saturday-score"));
  }
  assert.ok(seen.size > 5, "rotation should spread across the bank");
});

test("seededShuffle is deterministic and a permutation", () => {
  const src = [1, 2, 3, 4, 5, 6, 7, 8];
  const s1 = seededShuffle(src, mulberry32(42));
  const s2 = seededShuffle(src, mulberry32(42));
  assert.deepEqual(s1, s2);
  assert.deepEqual([...s1].sort((a, b) => a - b), src);
});

test("hashString is stable", () => {
  assert.equal(hashString("tdt"), hashString("tdt"));
  assert.notEqual(hashString("tdt-a"), hashString("tdt-b"));
});

test("guess normalization and matching", () => {
  assert.equal(normalizeGuess("  Peyton  MANNING! "), "peyton manning");
  assert.ok(matchesAnswer("peyton manning", ["peyton", "manning"]));
  assert.ok(matchesAnswer("The Music City Miracle", ["music city miracle"]));
  assert.ok(matchesAnswer("neyland", ["neyland"]));
  assert.ok(matchesAnswer("1998", ["1998"]));
  assert.ok(!matchesAnswer("", ["manning"]));
  assert.ok(!matchesAnswer("al", ["alcorn state"]), "very short guesses must not substring-match");
  assert.ok(!matchesAnswer("nashville", ["neyland"]));
});

test("trivia bank is well-formed", () => {
  const errors = validateTriviaBank(TRIVIA_QUESTIONS);
  assert.deepEqual(errors, []);
  assert.ok(TRIVIA_QUESTIONS.length >= 40, `expected 40+ questions, got ${TRIVIA_QUESTIONS.length}`);
});

test("score puzzle bank is well-formed", () => {
  const errors = validateScorePuzzles(SCORE_PUZZLES);
  assert.deepEqual(errors, []);
  assert.ok(SCORE_PUZZLES.length >= 20, `expected 20+ puzzles, got ${SCORE_PUZZLES.length}`);
});

test("every puzzle's own answer matches its aliases", () => {
  for (const p of SCORE_PUZZLES) {
    assert.ok(
      matchesAnswer(p.answer, p.aliases),
      `${p.id}: display answer "${p.answer}" should match its own aliases`
    );
  }
});
