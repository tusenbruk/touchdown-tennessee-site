"use client";

// Local-first game progress: streaks and bests live only in this browser.
// Nothing here is tied to an identity or sent anywhere.

export interface GameProgress {
  lastPlayed: string | null; // UTC date key of last completed daily round
  streak: number;
  bestScore: number;
  plays: number;
}

const EMPTY: GameProgress = { lastPlayed: null, streak: 0, bestScore: 0, plays: 0 };

function key(game: string): string {
  return `tdt-game-${game}`;
}

export function loadProgress(game: string): GameProgress {
  try {
    const raw = localStorage.getItem(key(game));
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    return {
      lastPlayed: typeof parsed.lastPlayed === "string" ? parsed.lastPlayed : null,
      streak: Number(parsed.streak) || 0,
      bestScore: Number(parsed.bestScore) || 0,
      plays: Number(parsed.plays) || 0,
    };
  } catch {
    return { ...EMPTY };
  }
}

// Record a completed daily round. Consecutive UTC days extend the streak;
// a gap resets it; replaying the same day changes nothing but the best.
export function recordDailyResult(game: string, todayKey: string, score: number): GameProgress {
  const prev = loadProgress(game);
  let streak = prev.streak;
  if (prev.lastPlayed !== todayKey) {
    const yesterday = new Date(`${todayKey}T00:00:00Z`);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);
    streak = prev.lastPlayed === yKey ? prev.streak + 1 : 1;
  }
  const next: GameProgress = {
    lastPlayed: todayKey,
    streak,
    bestScore: Math.max(prev.bestScore, score),
    plays: prev.plays + 1,
  };
  try {
    localStorage.setItem(key(game), JSON.stringify(next));
  } catch {}
  return next;
}
