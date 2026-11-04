import { createFileRoute } from "@tanstack/react-router";
import {
  byeWeeks,
  formatGameDate,
  games,
  formatRecord,
  gameStatus,
  leanLabel,
  nextGame,
  nextUpPulse,
  pulse,
  resultLabel,
  OUR_RECORD_PICK,
  SEASON_LINE,
} from "@/lib/saturday/schedule";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/cn";
import { numberWord } from "@/lib/format";

export const Route = createFileRoute("/saturday/board")({
  component: BoardPage,
  head: () =>
    seo({
      title: "The Board",
      path: "/saturday/board",
      description:
        "Twelve Saturdays, our lean on each, and what the season over/under actually means. Opinion, not betting advice.",
    }),
});

function BoardPage() {
  const next = nextGame();
  const byes = byeWeeks().map(formatGameDate);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Opinionated, on purpose"
        title="The Board"
        lede={`Vegas has the season at ${SEASON_LINE}. Our preseason pick was ${OUR_RECORD_PICK}. The record so far is ${formatRecord()}. The computers do not sit in this weather. Neither do we pretend this is a spreadsheet.`}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...pulse(), nextUpPulse(next)].map((p) => (
          <div key={p.kicker} className="bg-ink p-5 text-cream">
            <p className="kicker">{p.kicker}</p>
            <p className="mt-2 font-display text-4xl tracking-wide">{p.value}</p>
            <p className="mt-1 text-sm text-cream">{p.label}</p>
            <p className="mt-3 text-sm text-cream/75">{p.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <p className="kicker">The slate</p>
        <h2 className="mt-2 text-2xl sm:text-3xl">{numberWord(games.length)} Saturdays</h2>
        <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {games.map((g) => {
            const status = gameStatus(g);
            const isNext = g.id === next?.id;
            return (
              <li
                key={g.id}
                aria-current={isNext ? "true" : undefined}
                className={cn(
                  "grid gap-3 py-6 md:grid-cols-[6rem_1fr_7rem] md:items-baseline",
                  isNext && "border-l-4 border-brand bg-bone/60 pl-4",
                )}
              >
                <p className="font-display text-xs uppercase tracking-[0.16em] text-muted">
                  {formatGameDate(g.date)}
                  {isNext ? <span className="mt-1 block text-brand-deep">Next up</span> : null}
                  {status === "final" ? <span className="mt-1 block">Final</span> : null}
                  {status === "live" ? <span className="mt-1 block">Not final</span> : null}
                </p>
                <div>
                  <p className="font-display text-xl uppercase tracking-[0.05em]">
                    {g.location === "away" ? "at " : "vs "}
                    {g.opponent}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {g.city} · {g.kickoffLabel} · {g.network}
                  </p>
                  {/* Our preseason take is a prediction: only unplayed games keep it. */}
                  {status === "upcoming" ? (
                    <p className="mt-3 max-w-2xl text-sm text-ink/80">{g.take}</p>
                  ) : null}
                </div>
                {g.result ? (
                  <p
                    className={cn(
                      "font-display text-lg uppercase tracking-[0.08em] md:text-right",
                      g.result.outcome === "W" ? "text-brand-deep" : "text-ink",
                    )}
                  >
                    <span className="sr-only">
                      {g.result.final ? "Final: " : "Score, not final: "}
                    </span>
                    {resultLabel(g.result)}
                  </p>
                ) : status === "awaiting" ? (
                  <p className="font-display text-xs uppercase tracking-[0.16em] text-muted md:text-right">
                    Result to come
                  </p>
                ) : (
                  <p
                    className={cn(
                      "font-display text-xs uppercase tracking-[0.16em] md:text-right",
                      g.lean === "lock" || g.lean === "lean-w" ? "text-brand-deep" : "text-muted",
                    )}
                  >
                    <span className="block text-[10px] text-muted">Our pick</span>
                    {leanLabel[g.lean]}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 max-w-2xl text-xs text-muted">
          {byes.length ? `Bye week: ${byes.join(", ")}. ` : ""}Played games show the final score.
          Picks on the rest are ours, preseason opinion. Not betting advice — we sell shirts.
        </p>
      </div>
    </div>
  );
}
