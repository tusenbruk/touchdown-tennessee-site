import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/cn";
import { KickoffCountdown } from "@/components/saturday/countdown";

export const Route = createFileRoute("/saturday")({
  component: SaturdayLayout,
  head: () => ({
    meta: [
      { title: "Saturday — Touchdown Tennessee" },
      {
        name: "description",
        content:
          "The Knoxville clubhouse: rumor mill, the board, and Give Him 6. Independent Tennessee football spirit.",
      },
    ],
  }),
});

const links = [
  { to: "/saturday" as const, label: "Clubhouse", exact: true },
  { to: "/saturday/wire" as const, label: "The Wire" },
  { to: "/saturday/board" as const, label: "The Board" },
  { to: "/saturday/six" as const, label: "Give Him 6" },
];

function SaturdayLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHub = pathname === "/saturday" || pathname === "/saturday/";

  return (
    <div>
      <div className="bg-ink text-cream">
        {isHub ? (
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
            <p className="font-display text-xs tracking-[0.22em] text-brand">Game week</p>
            <h1 className="mt-2 text-4xl sm:text-6xl">Saturday</h1>
            <p className="mt-3 max-w-xl text-sm text-cream/70">
              The shop is merch. This is why you come back. Gossip, the board, and a kick with something on it.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-4 py-5 sm:px-6">
            <p className="font-display text-2xl uppercase tracking-[0.08em]">Saturday</p>
            <KickoffCountdown compact />
          </div>
        )}
        <nav className="border-t border-cream/10">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-4">
            {links.map((l) => {
              const active = l.exact
                ? pathname === "/saturday" || pathname === "/saturday/"
                : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "shrink-0 px-4 py-3 font-display text-sm uppercase tracking-[0.16em] transition-colors duration-150",
                    active ? "text-brand" : "text-cream/70 hover:text-cream",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
