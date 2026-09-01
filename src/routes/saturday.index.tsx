import { createFileRoute, Link } from "@tanstack/react-router";
import { KickoffCountdown } from "@/components/saturday/countdown";
import { buttonVariants } from "@/components/ui/button";
import { wire } from "@/lib/saturday/wire";
import { games, leanLabel, nextGame, pulse } from "@/lib/saturday/schedule";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/saturday/")({ component: SaturdayHome });

function SaturdayHome() {
  const next = nextGame();
  const featured = wire[0]!;
  const look = games.filter((g) => g.id === "texas" || g.id === "alabama" || g.id === "georgia-tech");

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <KickoffCountdown />
          <p className="mt-4 text-sm text-muted">
            {next.location === "home" ? "Home" : "Away"} · {next.city} · {next.kickoffLabel} · {next.network}
          </p>
          <p className="mt-4 max-w-lg text-sm text-ink/80">{next.take}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/saturday/six" className={buttonVariants({ size: "lg" })}>
              Play Give Him 6
            </Link>
            <Link to="/saturday/wire" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Read the wire
            </Link>
          </div>
        </div>
        <Link
          to="/saturday/wire"
          className="block bg-ink p-6 text-cream transition-colors duration-150 hover:bg-ink/95 sm:p-8"
        >
          <p className="font-display text-xs tracking-[0.22em] text-brand">{featured.kind}</p>
          <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-[0.04em] sm:text-3xl">
            {featured.line}
          </p>
          <p className="mt-4 text-sm text-cream/65">{featured.body}</p>
          <p className="mt-6 font-display text-[11px] uppercase tracking-[0.18em] text-cream/40">
            {featured.stamped} · Open the wire
          </p>
        </Link>
      </section>

      <section className="border-t border-ink/10 bg-cream/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="font-display text-xs tracking-[0.22em] text-brand">Three rooms</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Come for the takes. Stay for the kick.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Room
              to="/saturday/wire"
              kicker="Gossip"
              title="The Wire"
              body="Whispers, notices, and a take machine. Satire with a Knoxville accent. Not a newsroom."
            />
            <Room
              to="/saturday/board"
              kicker="Numbers"
              title="The Board"
              body="The slate with our lean, not a spreadsheet. What 7.5 actually means, in English."
            />
            <Room
              to="/saturday/six"
              kicker="The game"
              title="Give Him 6"
              body="Hold. Time it. Put it through. Fifty and beyond is six. Miss and you start over."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-[0.22em] text-brand">The pulse</p>
            <h2 className="mt-2 text-3xl">What the numbers actually say</h2>
          </div>
          <Link to="/saturday/board" className="hidden font-display text-sm uppercase tracking-[0.16em] text-ink/70 hover:text-ink sm:inline">
            Full board
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pulse.map((p) => (
            <div key={p.kicker} className="border border-ink/10 bg-cream p-5">
              <p className="font-display text-[11px] uppercase tracking-[0.18em] text-brand">{p.kicker}</p>
              <p className="mt-2 font-display text-4xl tracking-wide">{p.value}</p>
              <p className="mt-1 text-sm text-ink">{p.label}</p>
              <p className="mt-3 text-sm text-muted">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3">
          {look.map((g) => (
            <div key={g.id} className="flex flex-col gap-2 border-t border-ink/10 py-4 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-display text-lg uppercase tracking-[0.06em]">
                {g.location === "away" ? "at " : "vs "}
                {g.opponent}
              </p>
              <p className="text-sm text-muted sm:max-w-xl sm:text-right">{g.take}</p>
              <p className="font-display text-xs uppercase tracking-[0.16em] text-brand">{leanLabel[g.lean]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Room({
  to,
  kicker,
  title,
  body,
}: {
  to: "/saturday/wire" | "/saturday/board" | "/saturday/six";
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "block border border-ink/10 bg-paper p-6 transition-colors duration-150 hover:border-ink/30 hover:bg-cream",
      )}
    >
      <p className="font-display text-[11px] uppercase tracking-[0.18em] text-brand">{kicker}</p>
      <h3 className="mt-2 text-2xl">{title}</h3>
      <p className="mt-3 text-sm text-muted">{body}</p>
    </Link>
  );
}
