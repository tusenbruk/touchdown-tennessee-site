// Live scores + odds via ESPN's public site API (no key required).
// Every fetch is defensive: if ESPN is unreachable or the shape shifts, we fall
// back to real, dated schedule facts — never invented "Final" scores or lines.

const REVALIDATE_SECONDS = 300; // cache upstream responses for 5 minutes

const NFL_TEAM_SCHEDULE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/ten/schedule";
const CFB_TEAM_SCHEDULE = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/2633/schedule";
const NFL_SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";
const CFB_SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=8&limit=50";

export interface ScoreItem {
  badge: "VOLS" | "TITANS";
  color: string;
  score: string; // "19 – 13" for played games, kickoff time for upcoming
  game: string;
  status: string; // "Final" | "Live" | "Upcoming"
  live?: boolean;
}

export interface OddsRow {
  game: string;
  date: string;
  spread: string;
  ml: string;
  ou: string;
  book: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    });
  } catch {
    return "";
  }
}

function fmtKickoff(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    }) + " ET";
  } catch {
    return "Upcoming";
  }
}

// Pull the most recent completed (or live) event and format it; if none has
// been played yet, format the next upcoming one instead.
function scheduleToScoreItem(
  data: any,
  badge: ScoreItem["badge"],
  color: string,
  teamName: string
): ScoreItem | null {
  try {
    const events: any[] = data?.events ?? [];
    if (events.length === 0) return null;
    const now = Date.now();

    let latest: any = null;
    let next: any = null;
    for (const ev of events) {
      const comp = ev?.competitions?.[0];
      const state = comp?.status?.type?.state; // "pre" | "in" | "post"
      if (state === "in") {
        latest = ev;
        break;
      }
      if (state === "post") {
        if (!latest || new Date(ev.date).getTime() > new Date(latest.date).getTime()) latest = ev;
      } else if (new Date(ev.date).getTime() > now) {
        if (!next || new Date(ev.date).getTime() < new Date(next.date).getTime()) next = ev;
      }
    }

    const ev = latest ?? next;
    if (!ev) return null;
    const comp = ev.competitions[0];
    const state = comp?.status?.type?.state;
    const competitors: any[] = comp?.competitors ?? [];
    const us = competitors.find((c) => c?.team?.displayName?.includes(teamName) || c?.team?.abbreviation === "TEN");
    const them = competitors.find((c) => c !== us);
    if (!us || !them) return null;

    if (state === "post" || state === "in") {
      const usScore = us.score?.displayValue ?? us.score?.value ?? us.score ?? "";
      const themScore = them.score?.displayValue ?? them.score?.value ?? them.score ?? "";
      const won = Number(usScore) > Number(themScore);
      return {
        badge,
        color,
        score: `${usScore} – ${themScore}`,
        game: `Tennessee ${state === "in" ? "vs" : won ? "over" : "falls to"} ${them.team?.shortDisplayName ?? them.team?.displayName} · ${fmtDate(ev.date)}`,
        status: state === "in" ? "Live" : "Final",
        live: state === "in",
      };
    }
    return {
      badge,
      color,
      score: fmtKickoff(ev.date),
      game: `${ev.name ?? ev.shortName} · ${fmtDate(ev.date)}`,
      status: "Upcoming",
    };
  } catch {
    return null;
  }
}

// Real, verified facts as of Aug 20, 2026 — shown only when ESPN is unreachable.
const SCORES_FALLBACK: ScoreItem[] = [
  {
    badge: "TITANS",
    color: "#4B92DB",
    score: "19 – 13",
    game: "Tennessee over San Francisco · Preseason · Aug 13",
    status: "Final",
  },
  {
    badge: "VOLS",
    color: "#FF6600",
    score: "Sept 5",
    game: "Furman at Tennessee · Neyland Stadium · Season opener",
    status: "Upcoming",
  },
];

export async function getLatestScores(): Promise<ScoreItem[]> {
  const [vols, titans] = await Promise.all([
    fetchJson(CFB_TEAM_SCHEDULE),
    fetchJson(NFL_TEAM_SCHEDULE),
  ]);
  const items = [
    titans ? scheduleToScoreItem(titans, "TITANS", "#4B92DB", "Titans") : null,
    vols ? scheduleToScoreItem(vols, "VOLS", "#FF6600", "Volunteers") : null,
  ].filter(Boolean) as ScoreItem[];
  return items.length > 0 ? items : SCORES_FALLBACK;
}

function eventToOddsRow(ev: any): OddsRow | null {
  try {
    const comp = ev?.competitions?.[0];
    if (comp?.status?.type?.state !== "pre") return null;
    const odds = comp?.odds?.[0];
    const home = comp?.competitors?.find((c: any) => c.homeAway === "home");
    const away = comp?.competitors?.find((c: any) => c.homeAway === "away");
    if (!home || !away) return null;

    const homeMl = odds?.homeTeamOdds?.moneyLine;
    const awayMl = odds?.awayTeamOdds?.moneyLine;
    const ml =
      homeMl != null && awayMl != null
        ? `${awayMl > 0 ? "+" : ""}${awayMl} / ${homeMl > 0 ? "+" : ""}${homeMl}`
        : "—";

    return {
      game: `${away.team?.shortDisplayName ?? "Away"} at ${home.team?.shortDisplayName ?? "Home"}`,
      date: fmtDate(ev.date),
      spread: odds?.details ?? "Line pending",
      ml,
      ou: odds?.overUnder != null ? String(odds.overUnder) : "—",
      book: odds?.provider?.name ?? "—",
    };
  } catch {
    return null;
  }
}

function involvesOurTeams(ev: any): boolean {
  const name: string = ev?.name ?? "";
  return name.includes("Tennessee") || name.includes("Titans");
}

// Last lines we could verify by hand, each dated — never presented as live.
const ODDS_FALLBACK: OddsRow[] = [
  { game: "Furman at Tennessee", date: "Sep 5", spread: "TENN -46.5", ml: "—", ou: "66.5", book: "as of Aug 15" },
  { game: "Tennessee at Georgia Tech", date: "Sep 12", spread: "Line pending", ml: "—", ou: "—", book: "—" },
  { game: "Jets at Titans", date: "Sep 13", spread: "TEN -3", ml: "-162", ou: "39.5", book: "as of Jul 9" },
];

export interface OddsBoard {
  rows: OddsRow[];
  live: boolean;
}

export async function getOddsBoard(): Promise<OddsBoard> {
  const [nfl, cfb] = await Promise.all([
    fetchJson(NFL_SCOREBOARD),
    fetchJson(CFB_SCOREBOARD),
  ]);

  const events: any[] = [
    ...(nfl?.events ?? []),
    ...(cfb?.events ?? []),
  ];

  const ours = events.filter(involvesOurTeams).map(eventToOddsRow).filter(Boolean) as OddsRow[];
  const others = events
    .filter((ev) => !involvesOurTeams(ev))
    .map(eventToOddsRow)
    .filter((r): r is OddsRow => r !== null && r.spread !== "Line pending");

  const rows = [...ours, ...others].slice(0, 4);
  if (rows.length === 0) return { rows: ODDS_FALLBACK, live: false };
  return { rows, live: true };
}
