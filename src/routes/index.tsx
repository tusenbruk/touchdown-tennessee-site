import { createFileRoute, Link } from "@tanstack/react-router";
import { ResponsiveImg } from "@/components/responsive-img";
import { BrandStamp } from "@/components/brand-mark";
import { KickoffCountdown } from "@/components/saturday/countdown";
import { buttonVariants } from "@/components/ui/button-variants";
import { leadNotice } from "@/lib/saturday/wire";
import { nextGame, saturdayCard } from "@/lib/saturday/schedule";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => seo({ path: "/", image: "/og.jpg" }),
});

function Home() {
  const featured = leadNotice();
  const card = saturdayCard(nextGame());
  return (
    <div>
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
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="title-rule" aria-hidden="true" />
              <p className="kicker mt-4">Knoxville · Saturday</p>
              <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl md:text-8xl">
                Touchdown Classics
                <span className="mt-2 block text-4xl text-brand sm:text-6xl md:text-7xl">
                  The Tennessee Spirit
                </span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-cream/85 sm:text-xl">
                Tennessee football from Knoxville: the record, the next game, and the wire.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/saturday" className={buttonVariants({ size: "lg" })}>
                  This Saturday
                </Link>
                <Link
                  to="/saturday/board"
                  className={buttonVariants({ size: "lg", variant: "cream" })}
                >
                  The Board
                </Link>
              </div>
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

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker">{card.label}</p>
            <h2 className="mt-2 text-3xl sm:text-5xl">This is why you come back.</h2>
            <p className="mt-4 max-w-lg text-base text-cream/80">{card.line}</p>
            <p className="mt-2 max-w-lg text-base text-cream/80">{card.note}</p>
            <div className="mt-8">
              <KickoffCountdown tone="ink" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/saturday/wire" className={buttonVariants({ size: "lg" })}>
                The Wire
              </Link>
              <Link
                to="/saturday/board"
                className={buttonVariants({ size: "lg", variant: "cream" })}
              >
                The Board
              </Link>
            </div>
          </div>
          <Link
            to="/saturday/wire"
            className="group block border border-cream/20 p-6 transition-colors duration-150 hover:border-brand sm:p-8"
          >
            <p className="kicker">{featured.kind}</p>
            <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-[0.04em] sm:text-3xl">
              {featured.line}
            </p>
            <p className="mt-4 text-base text-cream/75">{featured.body}</p>
            <p className="mt-6 font-display text-xs uppercase tracking-[0.18em] text-brand">
              Open the wire <span aria-hidden="true">→</span>
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
