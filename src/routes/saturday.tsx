import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/cn";
import { KickoffCountdown } from "@/components/saturday/countdown";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/saturday")({
  component: SaturdayLayout,
  head: () => ({
    meta: [
      { title: "Saturday — Touchdown Tennessee" },
      {
        name: "description",
        content:
          "The Knoxville clubhouse: rumor mill and the board. Independent Tennessee football spirit.",
      },
    ],
  }),
});

const links = [
  { to: "/saturday" as const, label: "Clubhouse", exact: true },
  { to: "/saturday/wire" as const, label: "The Wire" },
  { to: "/saturday/board" as const, label: "The Board" },
];

function SaturdayLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHub = pathname === "/saturday" || pathname === "/saturday/";

  return (
    <div>
      <div className="bg-ink text-cream">
        {isHub ? (
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <PageHeader
              kicker="Game week"
              title="Saturday"
              tone="ink"
              lede="The shop is merch. This is why you come back. Gossip and the board for game week."
            />
          </div>
        ) : (
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-4 py-5 sm:px-6">
            <p className="font-display text-2xl uppercase tracking-[0.08em]" aria-hidden="true">
              Saturday
            </p>
            <KickoffCountdown compact />
          </div>
        )}
        <nav aria-label="Saturday sections" className="border-t border-cream/10">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-4">
            {links.map((l) => {
              const active = l.exact
                ? pathname === "/saturday" || pathname === "/saturday/"
                : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "shrink-0 border-b-2 px-4 py-3 font-display text-sm uppercase tracking-[0.16em] transition-colors duration-150",
                    active
                      ? "border-brand text-brand"
                      : "border-transparent text-cream/75 hover:text-cream",
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
