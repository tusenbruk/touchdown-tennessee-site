import { statusLine } from "@/lib/saturday/schedule";

/**
 * One line on every page: record, next game, kickoff. Derived from
 * `schedule.ts`, so the weekly result update is the only edit. After the last
 * game it reads "Season closed, 6–2".
 */
export function StatusLine() {
  const { text } = statusLine();
  return (
    <div role="region" aria-label="Season status" className="bg-brand text-ink">
      <p className="px-4 py-2 text-center font-display text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em]">
        {text}
      </p>
    </div>
  );
}
