import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
const source = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const site = await import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString('base64')}`);
test('current sheet has consistent results and a dated CFP ranking', () => {
  assert.equal(site.record, '7–2');
  assert.equal(site.games.filter(g => g.result === 'W').length, 7);
  assert.equal(site.games.filter(g => g.result === 'L').length, 2);
  assert.equal(site.secRecord, '4–2');
  assert.equal(site.rank, 8);
  assert.equal(site.pollDate, 'November 10, 2026');
  assert.equal(site.rankings.length, 25);
  assert.deepEqual(site.rankings.map(r => r.rank), Array.from({ length: 25 }, (_, i) => i + 1));
  assert.equal(site.rankings.filter(r => r.ours).length, 1);
  assert.equal(site.rankings.find(r => r.ours).rank, site.rank);
  assert.equal(site.rankings.find(r => r.ours).record, site.record);
  assert.equal(site.games.find(g => g.opponent === 'Kentucky').score, '34–6');
  assert.equal(site.nextGame.opponent, 'Texas A&M');
  assert.equal(site.atsRecord(site.games), '4–4');
});
test('homepage labels are data-driven, not stale relative dates', () => {
  const page = readFileSync(new URL('../src/routes/index.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /Tomorrow|First ranking|first ranking|November 7, 2026/);
  assert.match(page, /pollDate/);
  assert.match(page, /Updated \{lastUpdated\}/);
});
