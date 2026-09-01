export type WireKind = "whisper" | "take" | "notice" | "rumor";

export type WireItem = {
  id: string;
  kind: WireKind;
  stamped: string;
  line: string;
  body: string;
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
    kind: "notice",
    stamped: "Mon · Game week",
    line: "Furman, Saturday, 3:30. The hill will be loud for a game it should win.",
    body: "That is the point of September. Come early. The shop is merch. Saturday is why you stay.",
  },
  {
    id: "w2",
    kind: "take",
    stamped: "Mon",
    line: "The freshman is starting. The takes will write themselves. Ours already did.",
    body: "A young quarterback in this conference is not a scandal. It is a temperature. Week two in Atlanta is the thermometer.",
  },
  {
    id: "w3",
    kind: "whisper",
    stamped: "Sun night",
    line: "Someone in Market Square is already selling Furman as a trap game.",
    body: "It is not a trap game. It is Furman. Sit down. Save the panic for Texas week, which is already leaking into the group chats.",
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
    kind: "take",
    stamped: "Sat",
    line: "Night in Atlanta is the first real test. Georgia Tech is not a warm-up.",
    body: "Pack the voice. If the offense still looks like itself on a road clock, the season has a spine. If it does not, we will hear about it until November.",
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
    kind: "notice",
    stamped: "Thu",
    line: "Texas week is four Saturdays away and already living in the group chat.",
    body: "Noon, national window, a roster that is supposed to be better. Steal it and the over/under is a rumor. Hydrate now.",
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
