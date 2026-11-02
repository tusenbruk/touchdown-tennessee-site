import { useEffect, useState } from "react";
import { formatGameDate, nextGame } from "@/lib/saturday/schedule";
import { cn } from "@/lib/cn";

function parts(ms: number) {
  const clamped = Math.max(0, ms);
  const s = Math.floor(clamped / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    sec: s % 60,
    live: clamped === 0,
  };
}

export function KickoffCountdown({
  compact = false,
  tone = "paper",
}: {
  compact?: boolean;
  tone?: "paper" | "ink";
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const game = nextGame(now ?? Date.now());
  const opponent = game.opponent;
  // Most future games have no confirmed kickoff yet. Do not invent one:
  // show the date and say the time is pending.
  const target = game.kickoff ? Date.parse(game.kickoff) : null;
  const t = now === null || target === null ? null : parts(target - now);

  if (target === null) {
    const pending = `${formatGameDate(game.date)} · kickoff time to be announced`;
    if (compact) {
      return (
        <p className="font-display text-sm uppercase tracking-[0.16em] text-brand">
          {formatGameDate(game.date)} · {opponent}
        </p>
      );
    }
    return (
      <div>
        <p className="kicker">Next up: {opponent}</p>
        <p className="mt-3 font-display text-3xl uppercase tracking-[0.06em] sm:text-4xl">
          {pending}
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <p className="font-display text-sm uppercase tracking-[0.16em] text-brand">
        {t?.live ? "Kickoff" : t ? `${t.d}d ${t.h}h ${t.m}m` : "—"} · {opponent}
      </p>
    );
  }

  const cells = t
    ? [
        [t.d, "Days"],
        [t.h, "Hours"],
        [t.m, "Min"],
        [t.sec, "Sec"],
      ]
    : [
        ["—", "Days"],
        ["—", "Hours"],
        ["—", "Min"],
        ["—", "Sec"],
      ];

  return (
    <div>
      <p className="kicker">{t?.live ? "It is Saturday" : `Until ${opponent}`}</p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {cells.map(([n, label]) => (
          <div
            key={String(label)}
            className={cn(
              "px-2 py-4 text-center",
              tone === "ink" ? "bg-cream/10 text-cream" : "bg-ink text-cream",
            )}
          >
            <p className="font-display text-3xl tabular-nums tracking-wide sm:text-4xl">
              {typeof n === "number" ? String(n).padStart(2, "0") : n}
            </p>
            <p
              className={cn(
                "mt-1 font-display text-[10px] uppercase tracking-[0.18em]",
                "text-cream/70",
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
