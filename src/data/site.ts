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

export const lastUpdated = "November 12, 2026";

export const record = "7–2";
export const secRecord = "4–2";
export const rank = 8;
export const pollDate = "November 10, 2026";
export const pollSource = "https://utsports.com/news/2026/11/10/vols-vault-to-8-in-nov-10-college-football-playoff-rankings";

export const nextGame = {
  opponent: "Texas A&M",
  when: "Saturday, November 14 · 3 p.m. ET / 2 p.m. CT",
  where: "Kyle Field · College Station",
  tv: "ESPN",
  note: "Next stop after the 34–6 win over Kentucky.",
};

export const commentary =
  "Kentucky came to Neyland ranked sixth by the committee. Tennessee sent the Wildcats home with a 34–6 loss, then moved from No. 13 to No. 8 in the November 10 CFP ranking. The Vols are also ninth in the AP and Coaches polls. Alabama is now No. 3; Kentucky is No. 11. Tennessee has beaten both by double digits. The case is stronger, but this is a weekly ranking, not a playoff invitation. Texas A&M is next, on the road.";

export const rankings: Ranking[] = [
  { rank: 1, team: "Georgia", record: "8–1" },
  { rank: 2, team: "Utah", record: "9–0" },
  { rank: 3, team: "Alabama", record: "7–2" },
  { rank: 4, team: "UCLA", record: "9–0" },
  { rank: 5, team: "Notre Dame", record: "8–1" },
  { rank: 6, team: "Texas", record: "7–2" },
  { rank: 7, team: "Miami", record: "8–1" },
  { rank: 8, team: "Tennessee", record: "7–2", ours: true },
  { rank: 9, team: "Indiana", record: "8–1" },
  { rank: 10, team: "BYU", record: "7–2" },
  { rank: 11, team: "Kentucky", record: "7–2" },
  { rank: 12, team: "Texas Tech", record: "8–1" },
  { rank: 13, team: "Wake Forest", record: "8–1" },
  { rank: 14, team: "Houston", record: "7–2" },
  { rank: 15, team: "Iowa", record: "7–2" },
  { rank: 16, team: "Oregon", record: "6–3" },
  { rank: 17, team: "South Carolina", record: "6–3" },
  { rank: 18, team: "USC", record: "7–2" },
  { rank: 19, team: "Ole Miss", record: "6–3" },
  { rank: 20, team: "Ohio State", record: "6–3" },
  { rank: 21, team: "LSU", record: "6–3" },
  { rank: 22, team: "Missouri", record: "6–3" },
  { rank: 23, team: "Arizona", record: "7–2" },
  { rank: 24, team: "Boise State", record: "8–1" },
  { rank: 25, team: "Oklahoma State", record: "6–3" },
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
  { date: "Nov 7", opponent: "Kentucky", site: "Home", result: "W", score: "34–6", line: null, ats: null },
  { date: "Nov 14", opponent: "Texas A&M", site: "Away", result: null, score: null, line: null, ats: null },
  { date: "Nov 21", opponent: "LSU", site: "Home", result: null, score: null, line: null, ats: null },
  { date: "Nov 28", opponent: "Vanderbilt", site: "Away", result: null, score: null, line: null, ats: null },
];

export const notes: Note[] = [
  {
    date: "Nov 10",
    title: "Five places higher",
    body: "Tennessee is No. 8 in the second CFP ranking, up from No. 13. Kentucky falls to No. 11. The committee now has Alabama third.",
  },
  {
    date: "Nov 8",
    title: "Back in the top ten",
    body: "The AP and Coaches polls both put Tennessee ninth. Those Sunday polls are separate from Tuesday’s CFP ranking.",
  },
  {
    date: "Nov 7",
    title: "Kentucky, settled",
    body: "Tennessee 34, Kentucky 6. The Vols scored 24 unanswered points after halftime and held the Wildcats scoreless in the second half. The record is 7–2, with four wins and two losses in the SEC.",
  },
  {
    date: "Nov 14",
    title: "Next: College Station",
    body: "Texas A&M at Kyle Field. Saturday, 3 p.m. ET / 2 p.m. CT, on ESPN. The road comes before any talk of December.",
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
