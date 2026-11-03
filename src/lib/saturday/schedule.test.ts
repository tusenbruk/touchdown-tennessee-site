import assert from "node:assert/strict";
import { test } from "node:test";
import { byeWeeks, games, nextGame, nextUpPulse, saturdayCard } from "./schedule.ts";
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
