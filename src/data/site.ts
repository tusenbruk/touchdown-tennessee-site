/**
 * WEEKLY UPDATE — edit this file only.
 * Monday midday and Thursday afternoon:
 * 1. lastUpdated, record, secRecord, rank
 * 2. nextGame
 * 3. rankings (set ours: true on Tennessee, and only there)
 * 4. commentary
 * 5. games — result, score as "ours–theirs", line and ats from Tennessee's side.
 *    Negative line = favorite. Positive ats = the number was covered.
 * 6. notes
 */

export type Ranking = {
  rank: number;
  team: string;
  record: string;
  ours?: boolean;
};

export type Game = {
  date: string;
  opponent: string;
  site: "Home" | "Away";
  result: "W" | "L" | null;
  score: string | null;
  line: number | null;
  ats: number | null;
};

export type Note = {
  date: string;
  title: string;
  body: string;
};

export const lastUpdated = "November 6, 2026";

export const record = "6–2";
export const secRecord = "3–2";
export const rank = 13;

export const nextGame = {
  opponent: "Kentucky",
  rank: 6,
  when: "Saturday, November 7 · 6:15 p.m. ET",
  where: "Neyland Stadium · Knoxville",
  tv: "ESPN",
  note: "Homecoming. Sold out. Favored by about 6½.",
};

export const commentary =
  "No. 13 in the first committee ranking, put out November 3. Alabama, beaten here 26–10, sits at No. 5. The chair’s reason: the Alabama win is real, and the rest of the résumé is thin. Tomorrow is the chance to thicken it. Kentucky is No. 6, 7–1, and in Neyland at 6:15. Both losses this year were by three points. Win the rest and the argument gets simple. As the sheet stands, the bid is still work.";

export const rankings: Ranking[] = [
  { rank: 1, team: "Miami", record: "8–0" },
  { rank: 2, team: "Georgia", record: "7–1" },
  { rank: 3, team: "Utah", record: "8–0" },
  { rank: 4, team: "Indiana", record: "8–1" },
  { rank: 5, team: "Alabama", record: "6–2" },
  { rank: 6, team: "Kentucky", record: "7–1" },
  { rank: 7, team: "Texas", record: "6–2" },
  { rank: 8, team: "UCLA", record: "8–0" },
  { rank: 9, team: "BYU", record: "7–1" },
  { rank: 10, team: "Ole Miss", record: "6–2" },
  { rank: 11, team: "Notre Dame", record: "7–1" },
  { rank: 12, team: "Ohio State", record: "6–2" },
  { rank: 13, team: "Tennessee", record: "6–2", ours: true },
  { rank: 14, team: "LSU", record: "6–2" },
  { rank: 15, team: "Texas Tech", record: "7–1" },
  { rank: 16, team: "Wake Forest", record: "7–1" },
  { rank: 17, team: "Houston", record: "6–2" },
  { rank: 18, team: "Missouri", record: "6–2" },
  { rank: 19, team: "Iowa", record: "6–2" },
  { rank: 20, team: "USC", record: "7–2" },
  { rank: 21, team: "South Carolina", record: "5–3" },
  { rank: 22, team: "Arizona", record: "6–2" },
  { rank: 23, team: "Oregon", record: "5–3" },
  { rank: 24, team: "Florida", record: "5–3" },
  { rank: 25, team: "Boise State", record: "7–1" },
];

export const games: Game[] = [
  { date: "Sep 5", opponent: "Furman", site: "Home", result: "W", score: "56–9", line: -49.5, ats: -2.5 },
  { date: "Sep 12", opponent: "Georgia Tech", site: "Away", result: "W", score: "45–24", line: -12.5, ats: 8.5 },
  { date: "Sep 19", opponent: "Kennesaw State", site: "Home", result: "W", score: "42–9", line: -35.5, ats: -2.5 },
  { date: "Sep 26", opponent: "Texas", site: "Home", result: "L", score: "17–20", line: 5.5, ats: 2.5 },
  { date: "Oct 3", opponent: "Auburn", site: "Home", result: "W", score: "24–14", line: -6.5, ats: 3.5 },
  { date: "Oct 10", opponent: "Arkansas", site: "Away", result: "W", score: "24–17", line: -13.5, ats: -6.5 },
  { date: "Oct 17", opponent: "Alabama", site: "Home", result: "W", score: "26–10", line: 7.5, ats: 23.5 },
  { date: "Oct 24", opponent: "South Carolina", site: "Away", result: "L", score: "24–27", line: 2.5, ats: -0.5 },
  { date: "Nov 7", opponent: "Kentucky", site: "Home", result: null, score: null, line: null, ats: null },
  { date: "Nov 14", opponent: "Texas A&M", site: "Away", result: null, score: null, line: null, ats: null },
  { date: "Nov 21", opponent: "LSU", site: "Home", result: null, score: null, line: null, ats: null },
  { date: "Nov 28", opponent: "Vanderbilt", site: "Away", result: null, score: null, line: null, ats: null },
];

export const notes: Note[] = [
  {
    date: "Nov 3",
    title: "First ranking",
    body: "No. 13. Ten SEC teams made the first sheet. Alabama is No. 5, Kentucky No. 6, Texas No. 7, LSU No. 14, South Carolina No. 21.",
  },
  {
    date: "Nov 3",
    title: "The chair, on the gap",
    body: "Hunter Yurachek said the Alabama win counts, and that you have to look harder to find another quality win. That is the whole argument against No. 5.",
  },
  {
    date: "Nov 4",
    title: "Lombardi",
    body: "Gilliam was named a semifinalist for the Lombardi Award.",
  },
  {
    date: "Nov 6",
    title: "Tomorrow night",
    body: "Kentucky, Neyland, 6:15, ESPN. Homecoming. The stadium is sold out for the 33rd game in a row.",
  },
];

export const orderEmail = "touchdowntennessee@gmail.com";

export function points(n: number): string {
  const sign = n < 0 ? "−" : n > 0 ? "+" : "";
  const abs = Math.abs(n);
  const whole = Math.floor(abs);
  const half = Math.abs(abs - whole - 0.5) < 0.001;
  if (half) return whole === 0 ? `${sign}½` : `${sign}${whole}½`;
  return Number.isInteger(abs) ? `${sign}${abs}` : `${sign}${abs.toFixed(1)}`;
}

export function atsRecord(list: Game[]): string {
  let covers = 0;
  let misses = 0;
  for (const game of list) {
    if (game.ats == null) continue;
    if (game.ats > 0) covers += 1;
    else if (game.ats < 0) misses += 1;
  }
  return `${covers}–${misses}`;
}
