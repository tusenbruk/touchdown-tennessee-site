import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinDropList } from "@/lib/newsletter";
import type { PublicResult } from "@/lib/newsletter-core";
import { cn } from "@/lib/cn";

/**
 * The form only renders when VITE_NEWSLETTER_ENABLED=true. Until a mailing
 * list is connected the footer says so plainly instead of showing a form that
 * collects nothing. In dry-run mode the server says so too and the message is
 * shown verbatim: we never claim a signup that did not happen.
 */
const ENABLED = import.meta.env.VITE_NEWSLETTER_ENABLED === "true";

export function Newsletter({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PublicResult | null>(null);
  const inputId = useId();
  const muted = dark ? "text-cream/75" : "text-muted";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    // `company` is a honeypot field that real visitors never see.
    const company = String(new FormData(e.currentTarget).get("company") ?? "");
    try {
      setResult(await joinDropList({ data: { email, company } }));
    } catch {
      setResult({ status: "error", message: "We could not add you just now. Try again later." });
    } finally {
      setBusy(false);
    }
  }

  const done = result?.status === "subscribed" || result?.status === "already";

  return (
    <div className={dark ? "text-cream" : "text-ink"}>
      <h2 className="font-display text-2xl uppercase tracking-[0.08em]">The Drop List</h2>
      {ENABLED ? (
        <>
          <p className={cn("mt-2 max-w-md text-sm", muted)}>
            Thursday notes, Saturday drops. Unsubscribe any time.
          </p>
          {/* Live region so screen readers hear the outcome. */}
          <div role="status" aria-live="polite" className="text-sm">
            {result ? (
              <p
                className={cn(
                  "mt-4",
                  result.status === "error" || result.status === "invalid"
                    ? "text-brand"
                    : "text-inherit",
                )}
              >
                {result.message}
              </p>
            ) : null}
          </div>
          {done ? null : (
            <form onSubmit={submit} className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <Input
                id={inputId}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={
                  dark
                    ? "bg-ink text-cream placeholder:text-cream/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]"
                    : ""
                }
              />
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <Button
                type="submit"
                variant={dark ? "primary" : "ink"}
                className="sm:w-40"
                disabled={busy}
              >
                {busy ? "Joining…" : "Join"}
              </Button>
            </form>
          )}
        </>
      ) : (
        <p className={cn("mt-2 max-w-md text-sm", muted)}>
          Thursday notes and Saturday drops are coming. The list opens soon.
        </p>
      )}
    </div>
  );
}
