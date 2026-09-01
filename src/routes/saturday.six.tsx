import { createFileRoute, Link } from "@tanstack/react-router";
import { KickGame } from "@/components/saturday/kick-game";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/saturday/six")({
  component: SixPage,
  head: () => ({
    meta: [{ title: "Give Him 6 — Touchdown Tennessee" }],
  }),
});

function SixPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="font-display text-xs tracking-[0.22em] text-brand">One button. No mercy.</p>
        <h2 className="mt-2 text-3xl sm:text-5xl">Give Him 6</h2>
        <p className="mt-4 text-sm text-muted">
          Hold to charge. Release to send it. Distance climbs, wind lies, fifty and beyond is six. Miss and the kick
          is dead. Best score lives on this device.
        </p>
      </div>

      <div className="mt-8">
        <KickGame />
      </div>

      <div className="mt-12 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-2">
        <div>
          <h3 className="text-2xl">How it works</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Power oscillates. Release near the top for the long ones. Short kicks punish a moon shot.</li>
            <li>Aim swings left and right. The posts are unforgiving. Wind is worse.</li>
            <li>Extra-point range is 1. A field goal is 3. Fifty and beyond is 6.</li>
            <li>Make it to keep kicking. Miss and we tally the board.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl">Then wear it</h3>
          <p className="mt-4 text-sm text-muted">
            The outline does the talking. Tee, hoodie, hat, case — same mark you just kicked through.
          </p>
          <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-6")}>
            Shop the classics
          </Link>
        </div>
      </div>
    </div>
  );
}
