import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveImg } from "@/components/responsive-img";
import { BrandStamp } from "@/components/brand-mark";
import { KickoffCountdown } from "@/components/saturday/countdown";
import { CONTACT_EMAIL } from "@/components/nav-links";
import { pulse, statusLine } from "@/lib/saturday/schedule";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => seo({ path: "/", image: "/og.jpg" }),
});

function Home() {
  const { text } = statusLine();
  const cards = pulse();

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate min-h-[72svh] overflow-hidden bg-ink text-cream">
        <ResponsiveImg
          src="/heroes/tailgate.jpg"
          sizes="100vw"
          alt="East Tennessee river tailgate at golden hour"
          width={1792}
          height={1008}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/70 to-ink/35" />
        <div className="mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Touchdowntennessee.com`}
            className="inline-flex w-fit items-center gap-2 bg-brand px-3 py-1.5 font-display text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
          >
            This domain is for sale <span aria-hidden="true">→</span>
          </a>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="title-rule" aria-hidden="true" />
              <p className="kicker mt-4">Knoxville · Saturday</p>
              <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl md:text-8xl">
                Touchdown Tennessee
              </h1>
              <p className="mt-5 max-w-md text-lg text-cream/85 sm:text-xl">
                The record, the next game, and an opinion about both. Unlicensed on purpose.
              </p>
            </div>
            <BrandStamp
              src="/brand/house-mark.svg"
              alt=""
              width={360}
              height={243}
              priority
              className="hidden w-72 lg:block lg:w-80"
            />
          </div>
        </div>
      </section>

      {/* The board: record, the number, the four — all derived from the schedule */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="kicker">{text}</p>
          <h2 className="mt-2 text-3xl sm:text-5xl">The board.</h2>

          <div className="mt-10 grid gap-px overflow-hidden bg-cream/10 sm:grid-cols-3">
            {cards.map((c) => (
              <div key={c.kicker} className="bg-ink px-6 py-8">
                <p className="kicker">{c.kicker}</p>
                <p className="mt-3 font-display text-5xl uppercase tracking-tight sm:text-6xl">
                  {c.value}
                </p>
                <p className="mt-2 text-sm text-cream/70">{c.label}</p>
                <p className="mt-3 text-sm text-cream/60">{c.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-sm">
            <KickoffCountdown tone="ink" />
          </div>
        </div>
      </section>

      {/* Independent, in one breath */}
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="kicker">No letters, no mascots, no licence</p>
            <h2 className="mt-2 text-3xl sm:text-5xl">Geography we actually own.</h2>
            <p className="mt-4 max-w-lg text-base text-muted">
              Licensed gear pays a school for the right to print its marks. This does not — no
              university letters, mascots, seals, or slogans. Just the outline of the state, a
              rifleman who never asked anyone's permission, and a strong opinion about Saturday.
            </p>
          </div>
          <BrandStamp
            src="/products/print-rifleman.jpg"
            alt="The Rifleman, an original character mark"
            width={300}
            height={400}
            className="hidden h-72 shadow-border lg:block"
          />
        </div>
      </section>
    </div>
  );
}
