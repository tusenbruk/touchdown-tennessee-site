// Pure game-engine utilities: deterministic daily seeding, shuffling, answer
// matching, and content validation. No React, no browser APIs — everything
// here is unit-testable in plain Node.

export function utcDateKey(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

// Small string hash (FNV-1a) — stable across platforms.
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Deterministic PRNG (mulberry32).
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dailySeed(date: Date, salt: string): number {
  return hashString(`${salt}:${utcDateKey(date)}`);
}

export function seededShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Deterministic daily selection: same date + salt → same picks for everyone.
export function pickDaily<T>(pool: readonly T[], date: Date, salt: string, count: number): T[] {
  const rng = mulberry32(dailySeed(date, salt));
  return seededShuffle(pool, rng).slice(0, Math.min(count, pool.length));
}

// Stable daily rotation through a puzzle bank (one item per day, cycles).
export function pickDailyIndex(poolSize: number, date: Date, salt: string): number {
  if (poolSize <= 0) return 0;
  return dailySeed(date, salt) % poolSize;
}

export function normalizeGuess(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

// A guess matches when any alias appears in the normalized guess, or the
// guess appears in an alias (so "the music city miracle" matches "music city
// miracle"). Very short guesses must match an alias exactly.
export function matchesAnswer(guess: string, aliases: readonly string[]): boolean {
  const g = normalizeGuess(guess);
  if (!g) return false;
  return aliases.some((raw) => {
    const a = normalizeGuess(raw);
    if (!a) return false;
    if (g === a) return true;
    if (g.length >= 4 && a.includes(g)) return true;
    if (a.length >= 4 && g.includes(a)) return true;
    return false;
  });
}

// ---- Content validation (run in tests; guards malformed data) ----

interface TriviaLike {
  id: string;
  question: string;
  choices: readonly string[];
  answerIndex: number;
  note: string;
  source: { label: string; url: string };
}

interface PuzzleLike {
  id: string;
  answer: string;
  aliases: readonly string[];
  clues: readonly string[];
  explanation: string;
  source: { label: string; url: string };
}

export function validateTriviaBank(questions: readonly TriviaLike[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const q of questions) {
    const where = q.id || "(missing id)";
    if (!q.id) errors.push(`${where}: missing id`);
    if (seen.has(q.id)) errors.push(`${where}: duplicate id`);
    seen.add(q.id);
    if (!q.question?.trim()) errors.push(`${where}: empty question`);
    if (q.choices.length !== 4) errors.push(`${where}: needs exactly 4 choices`);
    if (new Set(q.choices.map((c) => c.trim().toLowerCase())).size !== q.choices.length) errors.push(`${where}: duplicate choices`);
    if (!Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex > 3) errors.push(`${where}: bad answerIndex`);
    if (!q.note?.trim()) errors.push(`${where}: missing note`);
    if (!q.source?.url?.startsWith("http")) errors.push(`${where}: missing source url`);
  }
  return errors;
}

export function validateScorePuzzles(puzzles: readonly PuzzleLike[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const p of puzzles) {
    const where = p.id || "(missing id)";
    if (!p.id) errors.push(`${where}: missing id`);
    if (seen.has(p.id)) errors.push(`${where}: duplicate id`);
    seen.add(p.id);
    if (!p.answer?.trim()) errors.push(`${where}: empty answer`);
    if (p.aliases.length === 0) errors.push(`${where}: needs aliases`);
    if (p.clues.length !== 5) errors.push(`${where}: needs exactly 5 clues`);
    const answerNorm = normalizeGuess(p.answer);
    for (let i = 0; i < p.clues.length; i++) {
      if (!p.clues[i]?.trim()) errors.push(`${where}: empty clue ${i + 1}`);
      const clueNorm = normalizeGuess(p.clues[i] ?? "");
      if (answerNorm && clueNorm.includes(answerNorm)) errors.push(`${where}: clue ${i + 1} contains the answer`);
    }
    if (!p.explanation?.trim()) errors.push(`${where}: missing explanation`);
    if (!p.source?.url?.startsWith("http")) errors.push(`${where}: missing source url`);
  }
  return errors;
}
