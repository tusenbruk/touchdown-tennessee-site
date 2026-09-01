import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    const list = JSON.parse(localStorage.getItem("tdt-drops") || "[]") as string[];
    localStorage.setItem("tdt-drops", JSON.stringify([...new Set([...list, email])]));
    setDone(true);
  }

  return (
    <div className={dark ? "text-cream" : "text-ink"}>
      <p className="font-display text-2xl uppercase tracking-[0.08em]">The Drop List</p>
      <p className={`mt-2 max-w-md text-sm ${dark ? "text-cream/70" : "text-muted"}`}>
        Thursday notes, Saturday drops. First order takes WELCOME10 — ten percent off.
      </p>
      {done ? (
        <p className="mt-4 text-sm">You are on it. Wear something original this week.</p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={dark ? "bg-ink text-cream placeholder:text-cream/40" : ""}
            aria-label="Email"
          />
          <Button type="submit" variant={dark ? "primary" : "ink"} className="sm:w-40">
            Join
          </Button>
        </form>
      )}
    </div>
  );
}
