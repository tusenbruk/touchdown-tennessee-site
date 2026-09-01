import { createFileRoute, notFound } from "@tanstack/react-router";
import { collections, getByCollection, type CollectionId } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { BrandStamp } from "@/components/brand-mark";

export const Route = createFileRoute("/collection/$slug")({
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const id = slug as CollectionId;
  const meta = collections[id];
  if (!meta) throw notFound();
  const list = getByCollection(id);

  return (
    <div>
      <section className="bg-ink px-4 py-16 text-cream sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xs tracking-[0.22em] text-brand">{meta.kicker}</p>
            <h1 className="mt-3 text-5xl sm:text-6xl">{meta.title}</h1>
            <p className="mt-4 max-w-xl text-cream/70">{meta.lede}</p>
          </div>
          <BrandStamp
            src="/brand/primary-orange.png"
            alt="Touchdown"
            className="h-16 max-w-[18rem] shrink-0 sm:h-20"
          />
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
