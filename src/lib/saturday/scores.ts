const KEY = "tdt-give-him-6";
const TAKES_KEY = "tdt-takes";

export type KickSave = {
  best: number;
  last: number;
  made50: boolean;
};

export function loadKickSave(): KickSave {
  if (typeof window === "undefined") return { best: 0, last: 0, made50: false };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { best: 0, last: 0, made50: false };
    const parsed = JSON.parse(raw) as Partial<KickSave>;
    return {
      best: Number(parsed.best) || 0,
      last: Number(parsed.last) || 0,
      made50: Boolean(parsed.made50),
    };
  } catch {
    return { best: 0, last: 0, made50: false };
  }
}

export function writeKickSave(score: number, made50: boolean) {
  const prev = loadKickSave();
  const next: KickSave = {
    best: Math.max(prev.best, score),
    last: score,
    made50: prev.made50 || made50,
  };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export type SavedTake = {
  kicker: string;
  line: string;
  aside: string;
  subject: string;
  at: number;
};

export function loadTakes(): SavedTake[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TAKES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedTake[];
    return Array.isArray(parsed) ? parsed.slice(0, 12) : [];
  } catch {
    return [];
  }
}

export function pushTake(take: SavedTake) {
  const next = [take, ...loadTakes()].slice(0, 12);
  window.localStorage.setItem(TAKES_KEY, JSON.stringify(next));
  return next;
}
