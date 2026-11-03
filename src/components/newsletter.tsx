import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const inputId = useId();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    const list = JSON.parse(localStorage.getItem("tdt-drops") || "[]") as string[];
    localStorage.setItem("tdt-drops", JSON.stringify([...new Set([...list, email])]));
    setDone(true);
  }

  return (
    <div className={dark ? "text-cream" : "text-ink"}>
      <h2 className="font-display text-2xl uppercase tracking-[0.08em]">The Drop List</h2>
      <p className={`mt-2 max-w-md text-sm ${dark ? "text-cream/75" : "text-muted"}`}>
        Thursday notes, Saturday drops. First order takes WELCOME10 — ten percent off.
      </p>
      {/* Live region so screen readers hear the confirmation. */}
      <div role="status" aria-live="polite">
        {done ? (
          <p className="mt-4 text-sm">You are on it. Wear something original this week.</p>
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
          <Button type="submit" variant={dark ? "primary" : "ink"} className="sm:w-40">
            Join
          </Button>
        </form>
      )}
    </div>
  );
}
