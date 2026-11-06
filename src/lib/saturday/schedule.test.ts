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

// schedule.ts is rewritten every week by scripts/auto_update.py (results, confirmed
// kickoffs). These tests check the logic against whatever the data says today; they
// do not pin a particular record, score or kickoff, so they stay green all season.
const kentucky = games.find((g) => g.id === "kentucky")!;
const pending: typeof kentucky = {
  ...kentucky,
  kickoff: null,
  kickoffLabel: "Night window",
  network: "TBD",
  result: undefined,
};
const record = formatRecord();

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
  assert.equal(saturdayCard(kentucky, at("2026-10-28T12:00:00Z")).label, "Next game");
  assert.equal(saturdayCard(kentucky, at("2026-11-05T12:00:00Z")).label, "This Saturday");
});

test("unconfirmed kickoff is never invented", () => {
  assert.match(saturdayCard(pending).line, /time to be announced/);
  assert.match(saturdayCard(pending).note, /network to be announced/);
  const confirmed = { ...pending, kickoff: "2026-11-07T23:15:00.000Z", kickoffLabel: "6:15 ET" };
  assert.doesNotMatch(saturdayCard(confirmed).line, /to be announced/);
  assert.match(saturdayCard(confirmed).line, /6:15 ET/);
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

test("results: no gaps, a result is never recorded ahead of an unplayed game", () => {
  const firstOpen = games.findIndex((g) => !g.result);
  if (firstOpen !== -1) {
    for (const g of games.slice(firstOpen)) {
      assert.equal(g.result, undefined, `${g.id} has a result but an earlier game does not`);
    }
  }
  const now = at("2026-11-03T12:00:00Z");
  assert.equal(gameStatus(games.find((g) => g.id === "texas")!, now), "final");
  assert.equal(gameStatus(pending, now), "upcoming");
});

test("results: outcome agrees with the score and the record counts final results", () => {
  for (const g of games.filter((x) => x.result)) {
    const [ours, theirs] = g.result!.score.split("\u2013").map(Number) as [number, number];
    assert.equal(g.result!.outcome, ours > theirs ? "W" : "L", g.id);
  }
  const finals = games.filter((g) => g.result?.final);
  const wins = finals.filter((g) => g.result!.outcome === "W").length;
  assert.deepEqual(seasonRecord(), { w: wins, l: finals.length - wins });
  assert.equal(record, `${wins}\u2013${finals.length - wins}`);
  assert.equal(resultLabel(games.find((g) => g.id === "texas")!.result!), "L 17\u201320");
  assert.deepEqual(
    seasonRecord([
      { ...pending, result: { final: true, score: "31\u201317", outcome: "W" } },
      { ...pending, result: { final: false, score: "10\u20137", outcome: "W" } },
      { ...pending, result: { final: true, score: "3\u201320", outcome: "L" } },
    ]),
    { w: 1, l: 1 },
  );
});

test("a played game with no result yet is 'awaiting', not a pick", () => {
  assert.equal(gameStatus(pending, at("2026-11-08T13:00:00Z")), "awaiting");
});

test("pulse cards report results, not predictions, for played games", () => {
  const cards = pulse();
  const recordCard = cards.find((c) => c.kicker === "The record")!;
  assert.equal(recordCard.value, record);
  const last = [...games].reverse().find((g) => g.result?.final)!;
  assert.ok(recordCard.note.includes(resultLabel(last.result!)));
  const four = cards.find((c) => c.kicker === "The four")!;
  assert.match(four.value, /^\d\u2013\d$/);
  assert.match(four.note, /Texas L 17\u201320/);
  assert.match(four.note, /Alabama W 26\u201310/);
  assert.match(nextUpPulse(nextGame(at("2026-11-03T12:00:00Z"))).note, /Our pick:/);
});

test("status line: record, next game, kickoff, all from the schedule", () => {
  const nov = statusLine(at("2026-11-03T12:00:00Z"));
  assert.equal(nov.game?.id, "kentucky");
  assert.ok(nov.text.startsWith(`${record} \u00b7 Next: vs Kentucky \u00b7 Nov 7 \u00b7 `));
  // "time TBA" shows exactly when the kickoff is unconfirmed.
  assert.equal(nov.text.endsWith("time TBA"), kentucky.kickoff === null);
  // A confirmed kickoff drops the suffix.
  assert.equal(
    statusLine(at("2026-09-26T12:00:00Z")).text,
    `${record} \u00b7 Next: vs Texas \u00b7 Sep 26 \u00b7 Noon ET`,
  );
});

test("status line: after the season it closes cleanly", () => {
  const s = statusLine(at("2026-12-15T12:00:00Z"));
  assert.equal(s.text, `Season closed, ${record}`);
  assert.equal(s.game, undefined);
});
