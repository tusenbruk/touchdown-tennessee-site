import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateTake, SUBJECTS, type Subject, type TakeResult } from "@/lib/saturday/takes";
import { pushTake } from "@/lib/saturday/scores";
import { cn } from "@/lib/cn";

export function TakeMachine() {
  const [subject, setSubject] = useState<Subject>("Furman week");
  const [busy, setBusy] = useState(false);
  const [take, setTake] = useState<TakeResult | null>(null);
  const [lockedUntil, setLockedUntil] = useState(0);

  async function run() {
    if (busy || Date.now() < lockedUntil) return;
    setBusy(true);
    try {
      const result = await generateTake({ data: { subject } });
      setTake(result);
      pushTake({
        kicker: result.kicker,
        line: result.line,
        aside: result.aside,
        subject: result.subject,
        at: Date.now(),
      });
      setLockedUntil(Date.now() + 3500);
    } catch {
      toast("The wire is jammed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!take) return;
    const text = `${take.kicker} — ${take.line}${take.aside ? ` ${take.aside}` : ""} — Touchdown Tennessee`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied. Go start something.");
    } catch {
      toast("Could not copy.");
    }
  }

  return (
    <div className="w-full min-w-0 overflow-hidden border border-ink/10 bg-cream">
      <div className="border-b border-ink/10 px-5 py-4 sm:px-6">
        <p className="font-display text-xs tracking-[0.22em] text-brand">The take machine</p>
        <h2 className="mt-1 text-2xl sm:text-3xl">Write me a take</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Pick a subject. We will write you something dry enough to post. Satire, not reporting.
        </p>
      </div>
      <div className="px-5 py-5 sm:px-6">
        <div className="flex min-w-0 flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubject(s)}
              className={cn(
                "h-10 px-3 font-display text-xs uppercase tracking-[0.14em] transition-colors duration-150",
                subject === s ? "bg-ink text-cream" : "bg-paper text-ink hover:bg-bone",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={run} disabled={busy} variant="primary">
            {busy ? "Writing…" : "Write me a take"}
          </Button>
          {take ? (
            <Button onClick={copy} variant="outline">
              Copy
            </Button>
          ) : null}
        </div>
      </div>
      {take ? (
        <div className="bg-ink px-5 py-8 text-cream sm:px-8">
          <p className="font-display text-xs tracking-[0.22em] text-brand">{take.kicker}</p>
          <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-[0.04em] sm:text-3xl">
            {take.line}
          </p>
          {take.aside ? <p className="mt-4 max-w-xl text-sm text-cream/70">{take.aside}</p> : null}
          <p className="mt-6 font-display text-[11px] uppercase tracking-[0.18em] text-cream/45">
            {take.subject}
            {take.canned ? " · House take" : " · Fresh off the wire"}
          </p>
        </div>
      ) : null}
    </div>
  );
}
