import { createFileRoute } from "@tanstack/react-router";
import { collections, getByCollection } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/shop/")({ component: ShopPage });

function ShopPage() {
  const classics = getByCollection("classics");
  const heritage = getByCollection("heritage");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-display text-xs tracking-[0.22em] text-brand">The shop</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Limited Runs</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Eight pieces from the Printful press. Classics first, then 1794.
      </p>

      <h2 className="mt-12 text-2xl">{collections.classics.title}</h2>
      <p className="mt-1 text-sm text-muted">{collections.classics.lede}</p>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
        {classics.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h2 className="mt-16 text-2xl">{collections.heritage.title}</h2>
      <p className="mt-1 text-sm text-muted">{collections.heritage.lede}</p>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
        {heritage.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}