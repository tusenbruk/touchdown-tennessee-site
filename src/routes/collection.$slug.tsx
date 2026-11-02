import { createFileRoute, notFound } from "@tanstack/react-router";
import { collections, getByCollection, type CollectionId } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { BrandStamp } from "@/components/brand-mark";
import { PageHeader } from "@/components/page-header";

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
      <section className="bg-ink px-4 py-14 text-cream sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <PageHeader kicker={meta.kicker} title={meta.title} lede={meta.lede} tone="ink" />
          <BrandStamp
            src="/brand/primary-orange.png"
            alt=""
            width={1405}
            height={498}
            priority
            className="h-16 max-w-[18rem] shrink-0 sm:h-20"
          />
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </div>
  );
}
