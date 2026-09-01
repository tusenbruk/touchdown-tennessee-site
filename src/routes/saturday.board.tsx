import { createFileRoute } from "@tanstack/react-router";
import { games, leanLabel, pulse, OUR_RECORD_PICK, SEASON_LINE } from "@/lib/saturday/schedule";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/saturday/board")({
  component: BoardPage,
  head: () => ({
    meta: [{ title: "The Board — Touchdown Tennessee" }],
  }),
});

function BoardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="font-display text-xs tracking-[0.22em] text-brand">Opinionated, on purpose</p>
        <h2 className="mt-2 text-3xl sm:text-5xl">The Board</h2>
        <p className="mt-4 text-sm text-muted">
          Vegas has the season at {SEASON_LINE}. We have it at {OUR_RECORD_PICK}. The computers do not sit in this
          weather. Neither do we pretend this is a spreadsheet.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pulse.map((p) => (
          <div key={p.kicker} className="bg-ink p-5 text-cream">
            <p className="font-display text-[11px] uppercase tracking-[0.18em] text-brand">{p.kicker}</p>
            <p className="mt-2 font-display text-4xl tracking-wide">{p.value}</p>
            <p className="mt-1 text-sm text-cream/80">{p.label}</p>
            <p className="mt-3 text-sm text-cream/55">{p.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <p className="font-display text-xs tracking-[0.22em] text-brand">The slate</p>
        <h3 className="mt-2 text-2xl sm:text-3xl">Twelve Saturdays</h3>
        <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {games.map((g) => (
            <li key={g.id} className="grid gap-3 py-6 md:grid-cols-[6rem_1fr_7rem] md:items-baseline">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-muted">
                {formatDate(g.date)}
              </p>
              <div>
                <p className="font-display text-xl uppercase tracking-[0.05em]">
                  {g.location === "away" ? "at " : "vs "}
                  {g.opponent}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {g.city} · {g.kickoffLabel} · {g.network}
                </p>
                <p className="mt-3 max-w-2xl text-sm text-ink/80">{g.take}</p>
              </div>
              <p
                className={cn(
                  "font-display text-xs uppercase tracking-[0.16em] md:text-right",
                  g.lean === "lock" || g.lean === "lean-w" ? "text-brand" : "text-muted",
                )}
              >
                {leanLabel[g.lean]}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-xs text-muted">
          Bye week around November 1. Leans are ours, updated when the season actually happens. Not betting advice —
          we sell shirts.
        </p>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, m! - 1, d!));
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}
