export type Lean = "lock" | "lean-w" | "toss" | "lean-l" | "loss";

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
    note: `${g.location === "away" ? "At" : "Home against"} ${g.opponent}, ${network}. Our lean: ${leanLabel[g.lean]}.`,
  };
}

/** Season-level cards. Pair with `nextUpPulse()` for the game-specific one. */
export const pulse = [
  {
    kicker: "The number",
    value: "7.5",
    label: "Vegas over/under",
    note: "Priced a freshman and four games the computers think we lose. We took the over because September still exists.",
  },
  {
    kicker: "Our board",
    value: "8–4",
    label: "Leaning 9–3",
    note: "Locks on Furman and Kennesaw. Steal one from Texas, Alabama, A&M, or LSU and the over is a story, not a hope.",
  },
  {
    kicker: "The four",
    value: "4",
    label: "Games they have us losing",
    note: "Texas, Alabama, Texas A&M, LSU. The whole season lives in whether one of those gets stubborn.",
  },
];
