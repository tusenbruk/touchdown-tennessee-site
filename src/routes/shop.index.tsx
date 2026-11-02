import { createFileRoute } from "@tanstack/react-router";
import { collections, getByCollection, products } from "@/lib/catalog";
import { numberWord } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { PageHeader, SectionHeading } from "@/components/page-header";

export const Route = createFileRoute("/shop/")({ component: ShopPage });

function ShopPage() {
  const classics = getByCollection("classics");
  const heritage = getByCollection("heritage");
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="The shop"
        title="Limited runs"
        lede={`${numberWord(products.length)} pieces from the Printful press. Classics first, then 1794.`}
      />

      <section className="mt-14" aria-labelledby="classics-heading">
        <SectionHeading
          kicker={collections.classics.kicker}
          title={<span id="classics-heading">{collections.classics.title}</span>}
          lede={collections.classics.lede}
        />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
          {classics.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="heritage-heading">
        <SectionHeading
          kicker={collections.heritage.kicker}
          title={<span id="heritage-heading">{collections.heritage.title}</span>}
          lede={collections.heritage.lede}
        />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {heritage.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
