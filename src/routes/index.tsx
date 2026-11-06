import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  atsRecord,
  commentary,
  games,
  lastUpdated,
  money,
  nextGame,
  notes,
  orderEmail,
  points,
  products,
  rank,
  rankings,
  record,
  secRecord,
} from "@/data/site";

export const Route = createFileRoute("/")({ component: Program });

const contents = [
  { href: "#poll", label: "I. The Poll" },
  { href: "#chances", label: "II. The Chances" },
  { href: "#ledger", label: "III. The Ledger" },
  { href: "#wire", label: "IV. The Wire" },
  { href: "#shop", label: "V. Mail Order" },
];

function Program() {
  const against = atsRecord(games);

  return (
    <div className="program min-h-screen bg-paper font-serif text-ink">
      <header className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10">
        <p className="text-center font-cond text-sm font-semibold tracking-[0.28em] text-muted uppercase">
          It's Football Time in Tennessee
        </p>
        <div className="thick-thin mt-3" />
        <div className="px-2 py-4 sm:px-8 sm:py-6">
          <img
            src="/brand/touchdown-logo.jpg"
            alt="Touchdown"
            className="mx-auto w-full max-w-xl mix-blend-multiply outline-none"
          />
        </div>
        <div className="thin-thick" />
        <p className="mt-4 text-center font-cond text-base font-semibold tracking-[0.22em] text-ink uppercase sm:text-lg">
          Neyland Stadium · November 7, 2026
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {contents.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-cond text-base font-semibold tracking-wide text-ink uppercase underline decoration-orange decoration-2 underline-offset-4"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="grid gap-3 border border-ink bg-sheet sm:grid-cols-3">
          <Fact kicker="The record" value={record} detail={`${secRecord} in the conference`} />
          <Fact kicker="The committee" value={`No. ${rank}`} detail="First ranking · November 3" />
          <Fact
            kicker="Tomorrow"
            value={nextGame.opponent}
            detail={`${nextGame.when} · ${nextGame.tv}`}
          />
        </section>
        <p className="mt-3 text-center font-serif text-sm text-muted italic">
          {nextGame.where}. {nextGame.note}
        </p>

        <Section id="poll" numeral="I" title="The Poll">
          <p className="mb-4 text-sm text-muted italic">
            College Football Playoff, first ranking. Tennessee marked. Sheet dated {lastUpdated}.
          </p>
          <ol className="grid border-t border-ink sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-13">
            {rankings.map((row) => (
              <li
                key={row.rank}
                className={
                  "flex items-baseline gap-3 border-b border-ink/20 px-2 py-2 " +
                  (row.ours ? "border-l-4 border-l-orange bg-wash" : "")
                }
              >
                <span className="w-8 shrink-0 font-cond text-2xl leading-none font-semibold tabular-nums">
                  {row.rank}
                </span>
                <span className={"flex-1 " + (row.ours ? "font-bold" : "")}>{row.team}</span>
                <span className="font-cond text-lg tracking-wide text-muted tabular-nums">
                  {row.record}
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="chances" numeral="II" title="The Chances">
          <p className="max-w-3xl text-lg leading-relaxed">{commentary}</p>
        </Section>

        <Section id="ledger" numeral="III" title="The Ledger">
          <p className="mb-4 text-sm text-muted italic">
            Score is ours, then theirs. The line is Tennessee’s number. Against the line, a plus
            covered. Through South Carolina: {against}. Open date was October 31.
          </p>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-sheet font-cond text-sm font-semibold tracking-[0.14em] uppercase">
                  <th className="px-3 py-2 font-semibold">Date</th>
                  <th className="px-3 py-2 font-semibold">Opponent</th>
                  <th className="px-3 py-2 font-semibold">Site</th>
                  <th className="px-3 py-2 font-semibold">W/L</th>
                  <th className="px-3 py-2 font-semibold">Score</th>
                  <th className="px-3 py-2 font-semibold">Line</th>
                  <th className="px-3 py-2 font-semibold">Against</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.date + game.opponent} className="border-b border-ink/15">
                    <td className="px-3 py-2 font-cond text-lg tabular-nums">{game.date}</td>
                    <td className="px-3 py-2">{game.opponent}</td>
                    <td className="px-3 py-2 text-muted">{game.site}</td>
                    <td className="px-3 py-2 font-cond text-xl font-semibold">
                      {game.result ?? "—"}
                    </td>
                    <td className="px-3 py-2 font-cond text-lg tabular-nums">
                      {game.score ?? "—"}
                    </td>
                    <td className="px-3 py-2 font-cond text-lg tabular-nums">
                      {game.line == null ? "—" : points(game.line)}
                    </td>
                    <td
                      className={
                        "px-3 py-2 font-cond text-lg font-semibold tabular-nums " +
                        (game.ats == null
                          ? "text-muted"
                          : game.ats > 0
                            ? "text-orange"
                            : "text-ink")
                      }
                    >
                      {game.ats == null ? "—" : points(game.ats)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="wire" numeral="IV" title="The Wire">
          <div className="divide-y divide-ink/20 border-y border-ink">
            {notes.map((note) => (
              <article key={note.title} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <p className="font-cond text-base font-semibold tracking-widest text-orange uppercase">
                  {note.date}
                </p>
                <div>
                  <h3 className="font-cond text-2xl font-semibold tracking-wide uppercase">
                    {note.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed">{note.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="shop" numeral="V" title="Mail Order">
          <p className="mb-5 max-w-2xl text-sm text-muted italic">
            Write for a size and a color. Original drawings. Not a licensed mark.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.name} className="flex flex-col border border-ink bg-plate">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover outline-none"
                />
                <div className="flex flex-1 flex-col border-t border-ink p-3">
                  <h3 className="font-cond text-xl font-semibold tracking-wide uppercase">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted">{product.line}</p>
                  <p className="mt-2 flex-1 text-sm leading-snug">{product.blurb}</p>
                  <p className="mt-3 font-cond text-2xl font-semibold tabular-nums">
                    {money(product.cents)}
                  </p>
                  <a
                    href={`mailto:${orderEmail}?subject=${encodeURIComponent(`Order — ${product.name}`)}`}
                    className="mt-3 inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-3 font-cond text-base font-semibold tracking-widest text-paper uppercase"
                  >
                    Write to order
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="thick-thin" />
        <div className="bg-sheet px-4 py-6 text-center sm:px-8">
          <p className="font-cond text-xl font-semibold tracking-[0.18em] uppercase">
            This domain is for sale
          </p>
          <p className="mt-2 text-base">Interesting offers considered.</p>
          <a
            href={`mailto:${orderEmail}?subject=${encodeURIComponent("Touchdowntennessee.com")}`}
            className="mt-3 inline-flex min-h-11 items-center font-cond text-lg font-semibold tracking-wide text-orange underline decoration-2 underline-offset-4"
          >
            {orderEmail}
          </a>
          <p className="mt-4 text-sm text-muted italic">
            Independent. The mark is ours. The letters on the helmet are not.
          </p>
        </div>
        <div className="thin-thick" />
      </footer>
    </div>
  );
}

function Fact({ kicker, value, detail }: { kicker: string; value: string; detail: string }) {
  return (
    <div className="border-b border-ink px-4 py-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
      <p className="font-cond text-xs font-semibold tracking-[0.22em] text-muted uppercase">
        {kicker}
      </p>
      <p className="mt-1 font-cond text-4xl leading-none font-semibold tracking-wide uppercase">
        {value}
      </p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </div>
  );
}

function Section({
  id,
  numeral,
  title,
  children,
}: {
  id: string;
  numeral: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 pt-12">
      <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
        <h2 className="font-cond text-3xl font-semibold tracking-wide uppercase sm:text-4xl">
          <span className="mr-3 text-orange">{numeral}</span>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
