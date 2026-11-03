import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, getByCollection, SHIP_FREE_AT } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ResponsiveImg } from "@/components/responsive-img";
import { BrandStamp } from "@/components/brand-mark";
import { SectionHeading } from "@/components/page-header";
import { KickoffCountdown } from "@/components/saturday/countdown";
import { buttonVariants } from "@/components/ui/button-variants";
import { leadNotice } from "@/lib/saturday/wire";
import { nextGame, saturdayCard } from "@/lib/saturday/schedule";
import { formatMoney } from "@/lib/format";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => seo({ path: "/", image: "/og.jpg" }),
});

/** Facts the site already states elsewhere (product page, footer, cart). */
const promises = [
  { title: "Original art", body: "Drawn here. No licensed marks, ever." },
  { title: "Ships in 3–5 days", body: "Printed to order." },
  { title: `Free over ${formatMoney(SHIP_FREE_AT)}`, body: "US shipping on the whole cart." },
];

function Home() {
  const classics = getByCollection("classics");
  const heritage = getByCollection("heritage");
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
              <p className="kicker mt-4">Limited runs</p>
              <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl md:text-8xl">
                Touchdown Classics
                <span className="mt-2 block text-4xl text-brand sm:text-6xl md:text-7xl">
                  The Tennessee Spirit
                </span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-cream/85 sm:text-xl">
                Original Tennessee gear, drawn in Knoxville. Stand out from the masses.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className={buttonVariants({ size: "lg" })}>
                  Shop the runs
                </Link>
                <Link to="/saturday" className={buttonVariants({ size: "lg", variant: "cream" })}>
                  This Saturday
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

      <section aria-label="Why shop here" className="bg-brand text-ink">
        <ul className="mx-auto grid max-w-6xl gap-3 px-4 py-5 sm:grid-cols-3 sm:gap-8 sm:px-6">
          {promises.map((p) => (
            <li key={p.title}>
              <p className="font-display text-base uppercase tracking-[0.1em]">{p.title}</p>
              <p className="text-sm text-ink/85">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker">{card.label}</p>
            <h2 className="mt-2 text-3xl sm:text-5xl">The shop is merch. This is why you stay.</h2>
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker={collections.classics.kicker}
          title={collections.classics.title}
          lede={collections.classics.lede}
          action={<ViewAll slug="classics" label="Classics" />}
        />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
          {classics.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-bone/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            kicker={collections.heritage.kicker}
            title={collections.heritage.title}
            lede={collections.heritage.lede}
            action={<ViewAll slug="heritage" label="1794" />}
          />
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

function ViewAll({ slug, label }: { slug: "classics" | "heritage"; label: string }) {
  return (
    <Link
      to="/collection/$slug"
      params={{ slug }}
      className="hidden shrink-0 border-b-2 border-brand pb-0.5 font-display text-sm uppercase tracking-[0.16em] text-ink sm:inline"
    >
      All {label} <span aria-hidden="true">→</span>
    </Link>
  );
}
