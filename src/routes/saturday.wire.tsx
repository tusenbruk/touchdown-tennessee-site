import { createFileRoute } from "@tanstack/react-router";
import { TakeMachine } from "@/components/saturday/take-machine";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { kindLabel, wireFeed, disclaimer, type WireItem } from "@/lib/saturday/wire";
import { games, resultLabel, versus } from "@/lib/saturday/schedule";

export const Route = createFileRoute("/saturday/wire")({
  component: WirePage,
  head: () =>
    seo({
      title: "The Wire",
      path: "/saturday/wire",
      description:
        "Whispers, notices and a take machine. Tennessee football satire with a Knoxville accent. Not a newsroom.",
    }),
});

function WirePage() {
  const { current, earlier } = wireFeed();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader kicker="Heard around Knoxville" title="The Wire" lede={disclaimer} />

      <div className="mt-10">
        <TakeMachine />
      </div>

      <WireList items={current} label="Wire items, newest first" />

      {earlier.length ? (
        <section className="mt-16" aria-labelledby="earlier-heading">
          <h2 id="earlier-heading" className="text-2xl sm:text-3xl">
            Earlier this season
          </h2>
          <p className="mt-2 text-sm text-muted">
            About games already played. Kept for the record.
          </p>
          <WireList items={earlier} label="Earlier wire items" showResult />
        </section>
      ) : null}
    </div>
  );
}

function WireList({
  items,
  label,
  showResult = false,
}: {
  items: WireItem[];
  label: string;
  showResult?: boolean;
}) {
  return (
    <ol className="mt-8 divide-y divide-ink/10 border-y border-ink/10" aria-label={label}>
      {items.map((item) => (
        <li key={item.id} className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.18em] text-brand-deep">
              {kindLabel[item.kind]}
            </p>
            <p className="mt-1 text-xs text-muted">{item.stamped}</p>
          </div>
          <div>
            <p className="font-display text-xl uppercase leading-tight tracking-[0.04em] sm:text-2xl">
              {item.line}
            </p>
            {showResult ? <ResultTag gameId={item.gameId} /> : null}
            <p className="mt-3 max-w-2xl text-base text-muted">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** What actually happened in the game an older wire item was written about. */
function ResultTag({ gameId }: { gameId?: string }) {
  const g = games.find((x) => x.id === gameId);
  if (!g?.result) return null;
  return (
    <p className="mt-2 font-display text-xs uppercase tracking-[0.16em] text-brand-deep">
      {g.result.final ? "Final" : "Not final"}: {versus(g)}, {resultLabel(g.result)}
    </p>
  );
}
