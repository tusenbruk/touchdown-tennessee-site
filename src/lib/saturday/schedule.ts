export type Lean = "lock" | "lean-w" | "toss" | "lean-l" | "loss";

/** What actually happened. Written by `scripts/update_result.py`; absent until a game is played. */
export type GameResult = { final: boolean; score: string; outcome: "W" | "L" };

export type Game = {
  id: string;
  week: number;
  date: string;
  kickoff: string | null;
  kickoffLabel: string;
  opponent: string;
  location: "home" | "away";
  city: string;
  network: string;
  lean: Lean;
  take: string;
  featured?: boolean;
  result?: GameResult;
};

export const SEASON_LINE = "7.5";
export const OUR_RECORD_PICK = "8–4, leaning 9–3";

export const games: Game[] = [
  {
    id: "furman",
    week: 1,
    date: "2026-09-05",
    kickoff: "2026-09-05T19:30:00.000Z",
    kickoffLabel: "3:30 ET",
    opponent: "Furman",
    location: "home",
    city: "Knoxville",
    network: "SECN+",
    lean: "lock",
    take: "Not a trap. A temperature check. The hill should be loud for a game it is supposed to win. That is the whole point of September.",
    featured: false,
    result: { final: true, score: "56–9", outcome: "W" },
  },
  {
    id: "georgia-tech",
    week: 2,
    date: "2026-09-12",
    kickoff: "2026-09-12T23:00:00.000Z",
    kickoffLabel: "7:00 ET",
    opponent: "Georgia Tech",
    location: "away",
    city: "Atlanta",
    network: "ESPN",
    lean: "toss",
    take: "First real test, under the lights, on the road. Atlanta is not a warm-up. If the freshman is still standing on Sunday, the season has a spine.",
    featured: false,
    result: { final: true, score: "45–24", outcome: "W" },
  },
  {
    id: "kennesaw",
    week: 3,
    date: "2026-09-19",
    kickoff: "2026-09-19T23:45:00.000Z",
    kickoffLabel: "7:45 ET",
    opponent: "Kennesaw State",
    location: "home",
    city: "Knoxville",
    network: "SECN",
    lean: "lock",
    take: "A Saturday to remember the depth chart. Score it, sit the pride, keep the freshman upright. Nobody hands out banners in week three.",
    featured: false,
    result: { final: true, score: "42–9", outcome: "W" },
  },
  {
    id: "texas",
    week: 4,
    date: "2026-09-26",
    kickoff: "2026-09-26T16:00:00.000Z",
    kickoffLabel: "Noon ET",
    opponent: "Texas",
    location: "home",
    city: "Knoxville",
    network: "ABC",
    lean: "lean-l",
    take: "Noon, national window, a roster that is supposed to be better than ours. Steal it and the over/under is a rumor. Drop it and we find out who we actually are.",
    featured: true,
    result: { final: true, score: "17–20", outcome: "L" },
  },
  {
    id: "auburn",
    week: 5,
    date: "2026-10-03",
    kickoff: null,
    kickoffLabel: "Flex",
    opponent: "Auburn",
    location: "home",
    city: "Knoxville",
    network: "TBD",
    lean: "toss",
    take: "Chaos in a Saturday costume. Treat it like a road game even though it is not. The river has seen this movie.",
    result: { final: true, score: "24–14", outcome: "W" },
  },
  {
    id: "arkansas",
    week: 6,
    date: "2026-10-10",
    kickoff: null,
    kickoffLabel: "Flex",
    opponent: "Arkansas",
    location: "away",
    city: "Fayetteville",
    network: "TBD",
    lean: "lean-w",
    take: "The kind of game a young team either grows up in or spends November explaining. We like the road dogs more than the experts do.",
    result: { final: true, score: "24–17", outcome: "W" },
  },
  {
    id: "alabama",
    week: 7,
    date: "2026-10-17",
    kickoff: null,
    kickoffLabel: "Flex",
    opponent: "Alabama",
    location: "home",
    city: "Knoxville",
    network: "TBD",
    lean: "loss",
    take: "Permanent opponent, finally. The hill will be a problem for them. The talent gap will be a problem for us. Worth the ticket anyway.",
    result: { final: true, score: "26–10", outcome: "W" },
  },
  {
    id: "south-carolina",
    week: 8,
    date: "2026-10-24",
    kickoff: null,
    kickoffLabel: "3:30 ET window",
    opponent: "South Carolina",
    location: "away",
    city: "Columbia",
    network: "TBD",
    lean: "lean-w",
    take: "A game Tennessee should win and historically finds a way to make interesting. Take the points. Pack patience.",
    result: { final: true, score: "24–27", outcome: "L" },
  },
  {
    id: "kentucky",
    week: 10,
    date: "2026-11-07",
    kickoff: null,
    kickoffLabel: "Night window",
    opponent: "Kentucky",
    location: "home",
    city: "Knoxville",
    network: "TBD",
    lean: "lean-w",
    take: "Permanent, nearby, and always meaner than the ranking. Night at home. This is a must if the over is going to cash.",
  },
  {
    id: "texas-am",
    week: 11,
    date: "2026-11-14",
    kickoff: null,
    kickoffLabel: "Flex",
    opponent: "Texas A&M",
    location: "away",
    city: "College Station",
    network: "TBD",
    lean: "loss",
    take: "November, on the road, against a roster built to bully. Survive and the season still has a bowl with teeth. Get bullied and we talk about next year early.",
  },
  {
    id: "lsu",
    week: 12,
    date: "2026-11-21",
    kickoff: null,
    kickoffLabel: "Flex",
    opponent: "LSU",
    location: "home",
    city: "Knoxville",
    network: "TBD",
    lean: "toss",
    take: "Night-game energy even if it kicks at noon. Home field is the equalizer. One of the four we are 'supposed' to lose — we do not accept the assignment.",
  },
  {
    id: "vanderbilt",
    week: 13,
    date: "2026-11-28",
    kickoff: null,
    kickoffLabel: "Night window",
    opponent: "Vanderbilt",
    location: "away",
    city: "Nashville",
    network: "TBD",
    lean: "lean-w",
    take: "The in-state one. Always closer than the internet wants it. Win it ugly. Leave with the state.",
  },
];

export const leanLabel: Record<Lean, string> = {
  lock: "Lock",
  "lean-w": "Lean W",
  toss: "Toss-up",
  "lean-l": "Lean L",
  loss: "Likely L",
};

/** "Nov 7" from an ISO date. Parsed as UTC parts so the day never shifts with the viewer's timezone. */
export function formatGameDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

const DAY_MS = 24 * 3600 * 1000;

/** A game counts as finished at 12:00 UTC the day after its date (about 8 am ET Sunday). */
function gameEnd(g: Game) {
  return Date.parse(`${g.date}T23:59:59.000Z`) + 12 * 3600 * 1000;
}

export function isPlayed(g: Game, now = Date.now()) {
  return gameEnd(g) <= now;
}

/**
 * First game that has not finished yet, or `undefined` once the season is over
 * (callers show a generic "Next game" state rather than repeating the finale).
 * A game stays "next" through the evening of kickoff day (see gameEnd).
 */
export function nextGame(now = Date.now()): Game | undefined {
  return games.find((g) => !isPlayed(g, now));
}

/** "This Saturday" when the game is within a week, otherwise "Next game". */
export function gameLabel(g: Game, now = Date.now()) {
  const until = Date.parse(`${g.date}T00:00:00.000Z`) - now;
  return until <= 7 * DAY_MS ? "This Saturday" : "Next game";
}

/** Copy for the "This Saturday" cards, built from the schedule entry. */
export function saturdayCard(g: Game | undefined, now = Date.now()) {
  if (!g) {
    return {
      label: "Next game",
      line: "Next game: to be announced",
      note: "The schedule is updated as the conference confirms it.",
    };
  }
  const prefix = g.location === "away" ? "at" : "vs";
  const when = g.kickoff ? g.kickoffLabel : `${g.kickoffLabel} · time to be announced`;
  return {
    label: gameLabel(g, now),
    line: `Tennessee ${prefix} ${g.opponent} · ${formatGameDate(g.date)} · ${when} · ${g.city}`,
    note: `${g.location === "away" ? "Away" : "Home"} game, ${
      g.network === "TBD" ? "network to be announced" : `on ${g.network}`
    }.`,
  };
}

/** Dates of bye weeks: any two-week gap between consecutive games. */
export function byeWeeks(): string[] {
  const out: string[] = [];
  for (let i = 1; i < games.length; i++) {
    const prev = Date.parse(`${games[i - 1]!.date}T00:00:00.000Z`);
    const cur = Date.parse(`${games[i]!.date}T00:00:00.000Z`);
    if (cur - prev >= 14 * DAY_MS) {
      out.push(new Date(prev + 7 * DAY_MS).toISOString().slice(0, 10));
    }
  }
  return out;
}

/** The fourth "pulse" card: always about the next game, never a fixed opponent. */
export function nextUpPulse(g: Game | undefined) {
  if (!g) {
    return {
      kicker: "Next up",
      value: "TBA",
      label: "Schedule pending",
      note: "Nothing on the calendar yet. Check back when the conference confirms it.",
    };
  }
  const network = g.network === "TBD" ? "network to be announced" : `on ${g.network}`;
  return {
    kicker: "Next up",
    value: g.city,
    label: `Week ${g.week}, ${g.kickoffLabel}`,
    note: `${g.location === "away" ? "At" : "Home against"} ${g.opponent}, ${network}. Our pick: ${leanLabel[g.lean]}.`,
  };
}

/** Overall record from final results only: `{ w: 6, l: 2 }`. */
export function seasonRecord(list: Game[] = games) {
  let w = 0;
  let l = 0;
  for (const g of list) {
    if (!g.result?.final) continue;
    if (g.result.outcome === "W") w += 1;
    else l += 1;
  }
  return { w, l };
}

/** "6–2" (en dash, as the schedule data writes scores). */
export function formatRecord(r = seasonRecord()) {
  return `${r.w}–${r.l}`;
}

/** "W 24–17" for a finished game, "W 24–17 (not final)" while it is still being played. */
export function resultLabel(result: GameResult) {
  return `${result.outcome} ${result.score}${result.final ? "" : " (not final)"}`;
}

/**
 * Where a game stands: it has a result ("final" / "live"), its date has passed
 * but nobody has run the weekly update yet ("awaiting"), or it is still ahead
 * ("upcoming"). Only "upcoming" games show our pick.
 */
export function gameStatus(g: Game, now = Date.now()): "final" | "live" | "awaiting" | "upcoming" {
  if (g.result) return g.result.final ? "final" : "live";
  return isPlayed(g, now) ? "awaiting" : "upcoming";
}

/** "at Kentucky" / "vs Kentucky". */
export function versus(g: Game) {
  return `${g.location === "away" ? "at" : "vs"} ${g.opponent}`;
}

/**
 * The one-line status shown on every page, derived from the schedule:
 * record plus next game, or "Season closed, 6–2" once nothing is left.
 */
export function statusLine(now = Date.now()) {
  const record = formatRecord();
  const g = nextGame(now);
  if (!g) {
    return { record, text: `Season closed, ${record}`, game: undefined };
  }
  const when = g.kickoff ? g.kickoffLabel : `${g.kickoffLabel} · time TBA`;
  return {
    record,
    text: `${record} · Next: ${versus(g)} · ${formatGameDate(g.date)} · ${when}`,
    game: g,
  };
}

/** Preseason: the four games the computers had us losing (ids in `games`). */
const THE_FOUR = ["texas", "alabama", "texas-am", "lsu"];

/**
 * Season-level cards, built from results so none of them reads as a
 * prediction about a game already played. Pair with `nextUpPulse()`.
 */
export function pulse() {
  const record = formatRecord();
  const lastPlayed = [...games].reverse().find((g) => g.result?.final);
  const four = THE_FOUR.map((id) => games.find((g) => g.id === id)!);
  const fourDone = four.filter((g) => g.result?.final);
  const fourLost = fourDone.filter((g) => g.result!.outcome === "L").length;
  const fourAhead = four.filter((g) => !g.result?.final).map((g) => g.opponent);
  return [
    {
      kicker: "The number",
      value: SEASON_LINE,
      label: "Vegas over/under",
      note: "Priced a freshman and four games the computers think we lose. We took the over because September still exists.",
    },
    {
      kicker: "The record",
      value: record,
      label: "Overall, final scores only",
      note: lastPlayed
        ? `Last: ${resultLabel(lastPlayed.result!)} ${versus(lastPlayed)}.`
        : "No games played yet.",
    },
    {
      kicker: "The four",
      value: `${fourDone.length - fourLost}–${fourLost}`,
      label: "Against the four they had us losing",
      note: fourAhead.length
        ? `${fourDone.map((g) => `${g.opponent} ${resultLabel(g.result!)}`).join(", ")}. Still ahead: ${fourAhead.join(", ")}.`
        : `${fourDone.map((g) => `${g.opponent} ${resultLabel(g.result!)}`).join(", ")}.`,
    },
  ];
}
