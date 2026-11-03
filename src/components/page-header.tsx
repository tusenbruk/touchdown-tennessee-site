import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The one title block every content page uses: kicker, orange rule, h1, lede.
 * Keeps hierarchy identical from page to page. `tone="ink"` is for use inside
 * a dark (bg-ink) band; the kicker colour adapts via CSS (see .kicker).
 */
export function PageHeader({
  kicker,
  title,
  lede,
  tone = "light",
  className,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "ink";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <span className="title-rule" aria-hidden="true" />
      {kicker ? <p className="kicker mt-4">{kicker}</p> : null}
      <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
      {lede ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-base sm:text-lg",
            tone === "ink" ? "text-cream/80" : "text-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  );
}

/** Section heading used inside pages: kicker, h2, optional lede, optional right-hand link slot. */
export function SectionHeading({
  kicker,
  title,
  lede,
  tone = "light",
  action,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "ink";
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2>
        {lede ? (
          <p
            className={cn(
              "mt-3 max-w-xl text-base",
              tone === "ink" ? "text-cream/75" : "text-muted",
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
