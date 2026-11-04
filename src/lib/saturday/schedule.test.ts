import assert from "node:assert/strict";
import { test } from "node:test";
import {
  byeWeeks,
  formatRecord,
  gameStatus,
  games,
  nextGame,
  nextUpPulse,
  pulse,
  resultLabel,
  saturdayCard,
  seasonRecord,
  statusLine,
} from "./schedule.ts";
import { leadNotice, wireFeed } from "./wire.ts";

const at = (iso: string) => Date.parse(iso);

test("preseason: first game is next", () => {
  assert.equal(nextGame(at("2026-08-01T12:00:00Z"))?.id, games[0]!.id);
});

test("a game stays 'next' through kickoff day, then advances", () => {
  assert.equal(nextGame(at("2026-09-26T22:00:00Z"))?.id, "texas");
  assert.equal(nextGame(at("2026-09-27T05:00:00Z"))?.id, "texas"); // after midnight ET, still Texas
  assert.equal(nextGame(at("2026-09-27T13:00:00Z"))?.id, "auburn"); // Sunday morning ET: advanced
});

test("bye week: next game is the one after the gap", () => {
  assert.equal(nextGame(at("2026-11-03T12:00:00Z"))?.id, "kentucky");
  assert.deepEqual(byeWeeks(), ["2026-10-31"]);
});

test("season over: no next game, generic copy", () => {
  const now = at("2026-12-15T12:00:00Z");
  assert.equal(nextGame(now), undefined);
  assert.match(saturdayCard(undefined, now).line, /Next game: to be announced/);
  assert.equal(nextUpPulse(undefined).value, "TBA");
  assert.match(leadNotice(now).line, /to be announced/);
});

test("card says 'This Saturday' within a week, 'Next game' otherwise", () => {
  const kentucky = games.find((g) => g.id === "kentucky")!;
  assert.equal(saturdayCard(kentucky, at("2026-10-28T12:00:00Z")).label, "Next game");
  assert.equal(saturdayCard(kentucky, at("2026-11-05T12:00:00Z")).label, "This Saturday");
});

test("unconfirmed kickoff is never invented", () => {
  const kentucky = games.find((g) => g.id === "kentucky")!;
  assert.equal(kentucky.kickoff, null);
  assert.match(saturdayCard(kentucky).line, /time to be announced/);
});

test("wire: items about played games move to 'earlier'; evergreen stays", () => {
  const { current, earlier } = wireFeed(at("2026-11-03T12:00:00Z"));
  assert.equal(current[0]!.id, "lead");
  assert.match(current[0]!.line, /Kentucky/);
  assert.ok(earlier.some((w) => w.gameId === "texas"));
  assert.ok(current.some((w) => !w.gameId)); // evergreen items still current
  assert.ok(current.every((w) => !w.gameId || w.id === "lead" || w.gameId !== "texas"));
});

test("wire: nothing is dropped", () => {
  const now = at("2026-11-03T12:00:00Z");
  const { current, earlier } = wireFeed(now);
  assert.equal(current.length - 1 + earlier.length, 10); // 10 authored items + generated lead
});

test("results: every game played by Nov 3 has a result, the rest have none", () => {
  const now = at("2026-11-03T12:00:00Z");
  for (const g of games) {
    if (g.date < "2026-11-03") assert.ok(g.result?.final, `${g.id} should have a final result`);
    else assert.equal(g.result, undefined, `${g.id} should not have a result yet`);
  }
  assert.equal(
    gameStatus(
      games.find((g) => g.id === "texas")!,
      now,
    ),
    "final",
  );
  assert.equal(
    gameStatus(
      games.find((g) => g.id === "kentucky")!,
      now,
    ),
    "upcoming",
  );
});

test("results: outcome agrees with the score and the record is 6-2", () => {
  for (const g of games.filter((x) => x.result)) {
    const [ours, theirs] = g.result!.score.split("\u2013").map(Number) as [number, number];
    assert.equal(g.result!.outcome, ours > theirs ? "W" : "L", g.id);
  }
  assert.deepEqual(seasonRecord(), { w: 6, l: 2 });
  assert.equal(formatRecord(), "6\u20132");
  assert.equal(resultLabel(games.find((g) => g.id === "texas")!.result!), "L 17\u201320");
});

test("a played game with no result yet is 'awaiting', not a pick", () => {
  const kentucky = games.find((g) => g.id === "kentucky")!;
  assert.equal(gameStatus(kentucky, at("2026-11-08T13:00:00Z")), "awaiting");
});

test("pulse cards report results, not predictions, for played games", () => {
  const cards = pulse();
  const record = cards.find((c) => c.kicker === "The record")!;
  assert.equal(record.value, "6\u20132");
  assert.match(record.note, /L 24\u201327 at South Carolina/);
  const four = cards.find((c) => c.kicker === "The four")!;
  assert.equal(four.value, "1\u20131"); // Alabama W, Texas L
  assert.match(four.note, /Still ahead: Texas A&M, LSU/);
  assert.match(nextUpPulse(nextGame(at("2026-11-03T12:00:00Z"))).note, /Our pick:/);
});

test("status line: record, next game, kickoff, all from the schedule", () => {
  assert.equal(
    statusLine(at("2026-11-03T12:00:00Z")).text,
    "6\u20132 \u00b7 Next: vs Kentucky \u00b7 Nov 7 \u00b7 Night window \u00b7 time TBA",
  );
  // A confirmed kickoff drops the "time TBA" suffix.
  assert.equal(
    statusLine(at("2026-09-26T12:00:00Z")).text,
    "6\u20132 \u00b7 Next: vs Texas \u00b7 Sep 26 \u00b7 Noon ET",
  );
});

test("status line: after the season it closes cleanly", () => {
  const s = statusLine(at("2026-12-15T12:00:00Z"));
  assert.equal(s.text, "Season closed, 6\u20132");
  assert.equal(s.game, undefined);
});
