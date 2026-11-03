import {
  games,
  isPlayed,
  leanLabel,
  nextGame,
  saturdayCard,
  type Game,
} from "./schedule.ts";

export type WireKind = "whisper" | "take" | "notice" | "rumor";

export type WireItem = {
  id: string;
  kind: WireKind;
  stamped: string;
  line: string;
  body: string;
  /**
   * Schedule id (see schedule.ts) of the game this item is about. Once that
   * game has been played the item moves to "Earlier this season". Items with
   * no gameId are evergreen.
   */
  gameId?: string;
};

export const kindLabel: Record<WireKind, string> = {
  whisper: "Whisper",
  take: "Take",
  notice: "Notice",
  rumor: "Rumor",
};

export const wire: WireItem[] = [
  {
    id: "w1",
    gameId: "texas",
    kind: "notice",
    stamped: "Saturday · Knoxville",
    line: "Tennessee vs Texas · Sep 26 · 12:00 ET · Knoxville",
    body: "Home noon kick. SEC Saturday on ABC. Visitors leave quietly.",
  },
  {
    id: "w2",
    gameId: "kennesaw",
    kind: "take",
    stamped: "Mon",
    line: "The freshman is starting. The takes will write themselves. Ours already did.",
    body: "A young quarterback in this conference is not a scandal. It is a temperature. Week three at home is a chance to keep him upright.",
  },
  {
    id: "w3",
    gameId: "texas",
    kind: "whisper",
    stamped: "Last week",
    line: "Somebody called Kennesaw a trap game.",
    body: "It was not a trap. Depth-chart Saturday came and went. The panic is Texas week now.",
  },
  {
    id: "w4",
    kind: "rumor",
    stamped: "Sun",
    line: "Heard the over/under is 7.5. Heard the river does not care about Vegas.",
    body: "Four of the twelve are supposed to be losses. That is a lot of supposed-to. We took the over because we live here.",
  },
  {
    id: "w5",
    gameId: "kennesaw",
    kind: "take",
    stamped: "Sat",
    line: "Night in Knoxville. Score it, then sit the pride.",
    body: "Pack the voice. If the offense still looks like itself after Atlanta, the season has a spine. Keep the freshman standing.",
  },
  {
    id: "w6",
    kind: "whisper",
    stamped: "Fri",
    line: "A man in a brand-new orange polo asked if we print the letter.",
    body: "We do not print the letter. We print the outline. Geography we actually own. He bought the hat anyway.",
  },
  {
    id: "w7",
    gameId: "texas",
    kind: "notice",
    stamped: "Thu",
    line: "Texas week is here and living in the group chat.",
    body: "Noon, national window, a roster that is supposed to be better. Steal it and the over/under is a rumor. Visitors leave quietly.",
  },
  {
    id: "w8",
    kind: "take",
    stamped: "Thu",
    line: "Independent merch will not get you into a club. It will get you a better shirt.",
    body: "The bookstore sells permission. We sell a drawing. If the design needs a protected logo to work, it is a bad design.",
  },
  {
    id: "w9",
    gameId: "alabama",
    kind: "rumor",
    stamped: "Wed",
    line: "Somebody heard Alabama is a home game this year and started clearing the calendar in October.",
    body: "Permanent opponent, finally. The hill will be a problem for them. The talent gap will be a problem for us. Still worth the ticket.",
  },
  {
    id: "w10",
    kind: "whisper",
    stamped: "Tue",
    line: "The hats are going to outsell the tees and nobody in this building wants to admit it.",
    body: "A brim does more talking at a tailgate than a chest logo. The outline was built for a crown. We noticed. The inventory did too.",
  },
];

export const disclaimer =
  "Satire and opinion, written in Knoxville, not a newsroom. Not affiliated with the university. If it sounds like reporting, it is not.";

/**
 * The lead item: a notice generated from the schedule so it is never stale.
 * With no upcoming game (season over, or schedule not yet released) it falls
 * back to a generic "Next game" notice.
 */
export function leadNotice(now = Date.now()): WireItem {
  const g: Game | undefined = nextGame(now);
  const card = saturdayCard(g, now);
  return {
    id: "lead",
    kind: "notice",
    stamped: g ? `${card.label} · ${g.city}` : "Next game",
    line: g ? `Our lean on ${g.opponent}: ${leanLabel[g.lean]}` : card.line,
    body: g ? g.take : card.note,
    gameId: g?.id,
  };
}

/**
 * The wire as the site shows it: the generated lead, then evergreen items and
 * items about games still to come. Items about games already played are kept
 * (nothing is deleted) but listed separately as "Earlier this season".
 */
export function wireFeed(now = Date.now()): { current: WireItem[]; earlier: WireItem[] } {
  const played = new Set(games.filter((g) => isPlayed(g, now)).map((g) => g.id));
  const earlier = wire.filter((w) => w.gameId && played.has(w.gameId));
  const current = wire.filter((w) => !w.gameId || !played.has(w.gameId));
  return { current: [leadNotice(now), ...current], earlier };
}
