// Archived from src/lib/saturday/schedule.ts. Hard-coded week-four (Texas) values.
// Superseded by nextGame()/saturdayCard(), which derive the same from `games`.

/**
 * @deprecated Hard-coded week-four values, kept for reference only. The site
 * now derives the featured game from `games` via `nextGame()` / `saturdayCard()`
 * so it no longer needs restaging every week.
 * Texas, Saturday Sep 26 2026, Noon ET (EDT = UTC-4).
 */
export const NEXT_KICKOFF = "2026-09-26T16:00:00.000Z";
export const NEXT_OPPONENT = "Texas";
export const THIS_SATURDAY = {
  label: "This Saturday",
  line: "Tennessee vs Texas · Sep 26 · 12:00 ET · Knoxville",
  note: "Home noon kick. SEC Saturday on ABC. Visitors leave quietly.",
} as const;
