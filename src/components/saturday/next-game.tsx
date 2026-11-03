import type { ReactNode } from "react";
import { KickoffCountdown } from "@/components/saturday/countdown";
import {
  formatGameDate,
  games,
  leanLabel,
  nextGame,
  saturdayCard,
  type Game,
} from "@/lib/saturday/schedule";
import { cn } from "@/lib/cn";

/**
 * The current/next game, from the schedule. Falls back to a generic
 * "Next game: to be announced" card when nothing is left on the calendar.
 * `headingLevel` lets the caller keep the page's heading order valid.
 */
export function NextGameCard({
  tone = "ink",
  headingLevel = 2,
  className,
}: {
  tone?: "ink" | "light";
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const g = nextGame();
  const card = saturdayCard(g);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const ink = tone === "ink";

  return (
    <article
      aria-label={card.label}
      className={cn(
        "p-6 sm:p-8",
        ink ? "on-ink bg-ink text-cream" : "border border-ink/10 bg-cream text-ink",
        className,
      )}
    >
      <p className="kicker">{card.label}</p>
      <Heading className="mt-2 text-3xl sm:text-4xl">
        {g ? `${g.location === "away" ? "At" : "Vs"} ${g.opponent}` : "To be announced"}
      </Heading>

      {g ? (
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
          <Fact label="Date" ink={ink}>
            {formatGameDate(g.date)}
          </Fact>
          <Fact label="Kickoff" ink={ink}>
            {g.kickoff ? g.kickoffLabel : `${g.kickoffLabel}, time TBA`}
          </Fact>
          <Fact label="Where" ink={ink}>
            {g.city} ({g.location})
          </Fact>
          <Fact label="TV" ink={ink}>
            {g.network === "TBD" ? "To be announced" : g.network}
          </Fact>
          <Fact label="Week" ink={ink}>
            {g.week}
          </Fact>
          <Fact label="Our lean" ink={ink}>
            {leanLabel[g.lean]}
          </Fact>
        </dl>
      ) : (
        <p className={cn("mt-4 text-base", ink ? "text-cream/80" : "text-muted")}>{card.note}</p>
      )}

      {/* A countdown only means something once a real kickoff time exists. */}
      {g?.kickoff ? (
        <div className="mt-6">
          <KickoffCountdown tone={ink ? "ink" : "paper"} />
        </div>
      ) : null}
    </article>
  );
}

function Fact({ label, ink, children }: { label: string; ink: boolean; children: ReactNode }) {
  return (
    <div>
      <dt
        className={cn(
          "font-display text-[11px] uppercase tracking-[0.18em]",
          ink ? "text-cream/70" : "text-muted",
        )}
      >
        {label}
      </dt>
      <dd className="mt-1 font-display text-lg uppercase tracking-[0.04em]">{children}</dd>
    </div>
  );
}

/** The next few games after the featured one. Renders nothing if there are none. */
export function UpcomingGames({ count = 3, className }: { count?: number; className?: string }) {
  const current = nextGame();
  const list: Game[] = current
    ? games.slice(games.indexOf(current) + 1, games.indexOf(current) + 1 + count)
    : [];
  if (list.length === 0) return null;
  return (
    <section aria-labelledby="upcoming-heading" className={className}>
      <h3 id="upcoming-heading" className="font-display text-lg uppercase tracking-[0.1em]">
        After that
      </h3>
      <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
        {list.map((g) => (
          <li key={g.id} className="flex items-baseline justify-between gap-4 py-3">
            <span className="font-display text-sm uppercase tracking-[0.12em] text-muted">
              {formatGameDate(g.date)}
            </span>
            <span className="flex-1 font-display text-base uppercase tracking-[0.05em]">
              {g.location === "away" ? "at" : "vs"} {g.opponent}
            </span>
            <span className="text-xs text-muted">{g.kickoffLabel}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
