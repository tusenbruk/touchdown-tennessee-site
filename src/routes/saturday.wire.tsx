import { createFileRoute } from "@tanstack/react-router";
import { TakeMachine } from "@/components/saturday/take-machine";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { kindLabel, wire, disclaimer } from "@/lib/saturday/wire";

export const Route = createFileRoute("/saturday/wire")({
  component: WirePage,
  head: () =>
    seo({
      title: "The Wire",
      path: "/saturday/wire",
      description:
        "Whispers, notices and a take machine. Tennessee football satire with a Knoxville accent. Not a newsroom.",
    }),
});

function WirePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader kicker="Heard around Knoxville" title="The Wire" lede={disclaimer} />

      <div className="mt-10">
        <TakeMachine />
      </div>

      <ol
        className="mt-12 divide-y divide-ink/10 border-y border-ink/10"
        aria-label="Wire items, newest first"
      >
        {wire.map((item) => (
          <li key={item.id} className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.18em] text-brand-deep">
                {kindLabel[item.kind]}
              </p>
              <p className="mt-1 text-xs text-muted">{item.stamped}</p>
            </div>
            <div>
              <p className="font-display text-xl uppercase leading-tight tracking-[0.04em] sm:text-2xl">
                {item.line}
              </p>
              <p className="mt-3 max-w-2xl text-base text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
