import { createServerFn } from "@tanstack/react-start";

export const SUBJECTS = [
  "Furman week",
  "Night in Atlanta",
  "Texas",
  "The freshman",
  "The over/under",
  "Hats",
  "Alabama",
  "The river",
  "Independent merch",
  "Vanderbilt",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export type TakeResult = {
  kicker: "TAKE" | "WHISPER" | "NOTICE" | "RUMOR";
  line: string;
  aside: string;
  subject: Subject;
  canned: boolean;
};

const CANNED: Record<Subject, TakeResult[]> = {
  "Furman week": [
    {
      kicker: "NOTICE",
      line: "Furman is not a trap. A trap requires mystery. This is a Saturday with a band.",
      aside: "Come early anyway. September is for volume.",
      subject: "Furman week",
      canned: true,
    },
    {
      kicker: "TAKE",
      line: "If you are nervous about Furman you are not a fan. You are a content account.",
      aside: "The hill should still be loud. That is manners.",
      subject: "Furman week",
      canned: true,
    },
  ],
  "Night in Atlanta": [
    {
      kicker: "TAKE",
      line: "Atlanta under the lights is the first adult conversation of the year.",
      aside: "Win it and the over starts walking. Lose it and we learn the freshman in public.",
      subject: "Night in Atlanta",
      canned: true,
    },
    {
      kicker: "WHISPER",
      line: "Georgia Tech is not a warm-up. Anyone selling it as one is selling something else.",
      aside: "Pack the voice. The clock will feel faster than Knoxville.",
      subject: "Night in Atlanta",
      canned: true,
    },
  ],
  Texas: [
    {
      kicker: "TAKE",
      line: "Texas week at noon is when the season either grows a spine or a press conference.",
      aside: "Steal it and Vegas was guessing. Drop it and we already knew.",
      subject: "Texas",
      canned: true,
    },
    {
      kicker: "RUMOR",
      line: "The group chats opened Texas week in August. Discipline is a skill issue.",
      aside: "Four Saturdays is not a long time. Hydrate.",
      subject: "Texas",
      canned: true,
    },
  ],
  "The freshman": [
    {
      kicker: "NOTICE",
      line: "A freshman starting in this conference is not a scandal. It is a temperature.",
      aside: "Week two is the thermometer. Everything else is noise.",
      subject: "The freshman",
      canned: true,
    },
    {
      kicker: "TAKE",
      line: "Protect the kid, not the takes. The takes will be fine.",
      aside: "The river has seen quarterbacks younger than the beer line.",
      subject: "The freshman",
      canned: true,
    },
  ],
  "The over/under": [
    {
      kicker: "TAKE",
      line: "Seven and a half is a number written by people who do not sit in this weather.",
      aside: "We took the over because September still exists.",
      subject: "The over/under",
      canned: true,
    },
    {
      kicker: "WHISPER",
      line: "They have us losing four. That is a lot of they.",
      aside: "Steal one and the number is a rumor.",
      subject: "The over/under",
      canned: true,
    },
  ],
  Hats: [
    {
      kicker: "NOTICE",
      line: "A brim does more talking at a tailgate than a chest logo.",
      aside: "The outline was built for a crown. The inventory noticed first.",
      subject: "Hats",
      canned: true,
    },
    {
      kicker: "TAKE",
      line: "If your hat needs a letter to work, it is a costume.",
      aside: "Geography on a crown is enough.",
      subject: "Hats",
      canned: true,
    },
  ],
  Alabama: [
    {
      kicker: "TAKE",
      line: "Permanent opponent, finally. The hill will be a problem for them. The roster will be a problem for us.",
      aside: "Still worth the ticket. Always was.",
      subject: "Alabama",
      canned: true,
    },
    {
      kicker: "WHISPER",
      line: "October 17 is already a black-out in half the group chats and a church conflict in the other.",
      aside: "Choose correctly.",
      subject: "Alabama",
      canned: true,
    },
  ],
  "The river": [
    {
      kicker: "NOTICE",
      line: "The river does not care about the over/under. That is why we like it.",
      aside: "Tailgates end. Current does not.",
      subject: "The river",
      canned: true,
    },
    {
      kicker: "TAKE",
      line: "If your Saturday does not include water, you are doing Knoxville wrong.",
      aside: "The outline was a map before it was a shirt.",
      subject: "The river",
      canned: true,
    },
  ],
  "Independent merch": [
    {
      kicker: "TAKE",
      line: "The bookstore sells permission. We sell a drawing.",
      aside: "If the design needs a protected logo to work, it is a bad design.",
      subject: "Independent merch",
      canned: true,
    },
    {
      kicker: "NOTICE",
      line: "Independent will not get you into a club. It will get you a better shirt.",
      aside: "Stand out from the masses. That was the brief.",
      subject: "Independent merch",
      canned: true,
    },
  ],
  Vanderbilt: [
    {
      kicker: "TAKE",
      line: "The in-state one is always closer than the internet wants it.",
      aside: "Win it ugly. Leave with the state.",
      subject: "Vanderbilt",
      canned: true,
    },
    {
      kicker: "RUMOR",
      line: "November in Nashville is where seasons go to get humble.",
      aside: "We prefer stubborn.",
      subject: "Vanderbilt",
      canned: true,
    },
  ],
};

export function cannedTake(subject: Subject): TakeResult {
  const bank = CANNED[subject];
  return bank[Math.floor(Math.random() * bank.length)]!;
}

const kickers = ["TAKE", "WHISPER", "NOTICE", "RUMOR"] as const;

let windowStart = 0;
let windowCount = 0;
const WINDOW_MS = 60_000;
const WINDOW_MAX = 24;

export const generateTake = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const subject =
      typeof input === "object" && input && "subject" in input
        ? String((input as { subject: unknown }).subject)
        : "";
    if (!(SUBJECTS as readonly string[]).includes(subject)) {
      throw new Error("Pick a subject.");
    }
    return { subject: subject as Subject };
  })
  .handler(async ({ data }): Promise<TakeResult> => {
    const now = Date.now();
    if (now - windowStart > WINDOW_MS) {
      windowStart = now;
      windowCount = 0;
    }
    windowCount += 1;
    if (windowCount > WINDOW_MAX) return cannedTake(data.subject);

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return cannedTake(data.subject);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 1.1,
          max_tokens: 140,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You write one dry Knoxville sports take for Touchdown Tennessee, an independent unlicensed merch brand. Voice: newspaper column, slightly mean, never cute, never hype-man. Say Tennessee, Knoxville, the orange, the hill, the river — never mascots, never song titles, never checkerboard, never 'Vols' as a brand, never player names, never coach names, never university trademarks. JSON only: {\"kicker\":\"TAKE\"|\"WHISPER\"|\"NOTICE\"|\"RUMOR\",\"line\":\"one sentence\",\"aside\":\"optional short second sentence\"}. Line max 140 characters. Aside max 100.",
            },
            {
              role: "user",
              content: `Subject: ${data.subject}. Make it specific to this Saturday, September 2026, freshman quarterback, Furman this week, Georgia Tech next, Texas on the horizon, over/under 7.5.`,
            },
          ],
        }),
      });
      if (!res.ok) return cannedTake(data.subject);
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content ?? "";
      const parsed = JSON.parse(text) as {
        kicker?: string;
        line?: string;
        aside?: string;
      };
      const kicker = kickers.includes(parsed.kicker as (typeof kickers)[number])
        ? (parsed.kicker as TakeResult["kicker"])
        : "TAKE";
      const line = (parsed.line ?? "").trim().slice(0, 180);
      if (line.length < 12) return cannedTake(data.subject);
      return {
        kicker,
        line,
        aside: (parsed.aside ?? "").trim().slice(0, 140),
        subject: data.subject,
        canned: false,
      };
    } catch {
      return cannedTake(data.subject);
    } finally {
      clearTimeout(timer);
    }
  });
