import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, getByCollection } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { BrandStamp } from "@/components/brand-mark";
import { KickoffCountdown } from "@/components/saturday/countdown";
import { buttonVariants } from "@/components/ui/button";
import { wire } from "@/lib/saturday/wire";
import { nextGame } from "@/lib/saturday/schedule";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const classics = getByCollection("classics");
  const heritage = getByCollection("heritage");
  const next = nextGame();
  const featured = wire[0]!;
  return (
    <div>
      <section className="relative min-h-[72vh] overflow-hidden bg-ink text-cream">
        <img
          src="/heroes/tailgate.jpg"
          alt="East Tennessee river tailgate at golden hour"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/20" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-sm tracking-[0.28em] text-brand">Limited Runs</p>
              <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl md:text-8xl">
                Touchdown Classics
                <span className="mt-2 block text-4xl sm:text-6xl md:text-7xl">The Tennessee Spirit</span>
              </h1>
              <p className="mt-5 font-display text-xl uppercase tracking-[0.14em] text-cream sm:text-2xl">
                Standout from the masses
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className={buttonVariants({ size: "lg" })}>
                  Shop
                </Link>
                <Link to="/saturday" className={buttonVariants({ size: "lg", variant: "cream" })}>
                  Saturday
                </Link>
              </div>
            </div>
            <BrandStamp
              src="/brand/primary-orange.png"
              alt="Touchdown"
              className="hidden w-72 lg:block lg:w-80"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-display text-xs tracking-[0.22em] text-brand">Saturday</p>
            <h2 className="mt-2 text-3xl sm:text-5xl">The shop is merch. This is why you stay.</h2>
            <p className="mt-4 max-w-lg text-sm text-cream/70">
              A wire of takes, a board that actually has an opinion, and a kick with something on it. {next.opponent},{" "}
              {next.kickoffLabel}.
            </p>
            <div className="mt-8">
              <KickoffCountdown tone="ink" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/saturday/six" className={buttonVariants({ size: "lg" })}>
                Play Give Him 6
              </Link>
              <Link to="/saturday/wire" className={buttonVariants({ size: "lg", variant: "cream" })}>
                The Wire
              </Link>
            </div>
          </div>
          <Link to="/saturday/wire" className="block border border-cream/15 p-6 sm:p-8">
            <p className="font-display text-xs tracking-[0.22em] text-brand">{featured.kind}</p>
            <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-[0.04em] sm:text-3xl">
              {featured.line}
            </p>
            <p className="mt-4 text-sm text-cream/65">{featured.body}</p>
            <p className="mt-6 font-display text-[11px] uppercase tracking-[0.18em] text-cream/40">Open the wire</p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-display text-xs tracking-[0.22em] text-brand">{collections.classics.kicker}</p>
        <h2 className="mt-2 text-3xl sm:text-4xl">{collections.classics.title}</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">{collections.classics.lede}</p>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
          {classics.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-display text-xs tracking-[0.22em] text-brand">{collections.heritage.kicker}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">{collections.heritage.title}</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">{collections.heritage.lede}</p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {heritage.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
