import { createFileRoute } from "@tanstack/react-router";
import { TakeMachine } from "@/components/saturday/take-machine";
import { kindLabel, wire, disclaimer } from "@/lib/saturday/wire";

export const Route = createFileRoute("/saturday/wire")({
  component: WirePage,
  head: () => ({
    meta: [{ title: "The Wire — Touchdown Tennessee" }],
  }),
});

function WirePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="font-display text-xs tracking-[0.22em] text-brand">Heard around Knoxville</p>
        <h2 className="mt-2 text-3xl sm:text-5xl">The Wire</h2>
        <p className="mt-4 text-sm text-muted">{disclaimer}</p>
      </div>

      <div className="mt-10">
        <TakeMachine />
      </div>

      <ol className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
        {wire.map((item) => (
          <li key={item.id} className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">{kindLabel[item.kind]}</p>
              <p className="mt-1 text-xs text-muted">{item.stamped}</p>
            </div>
            <div>
              <p className="font-display text-xl uppercase leading-tight tracking-[0.04em] sm:text-2xl">{item.line}</p>
              <p className="mt-3 max-w-2xl text-sm text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
