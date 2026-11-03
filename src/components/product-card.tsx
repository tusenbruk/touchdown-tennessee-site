import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { ResponsiveImg } from "@/components/responsive-img";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative overflow-hidden bg-bone">
        <ResponsiveImg
          src={product.images[0]!}
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
          alt={product.name}
          width={900}
          height={1200}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="aspect-3/4 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.badge ? (
          <span className="absolute top-3 left-3 bg-brand px-2 py-1 font-display text-[11px] uppercase tracking-[0.16em] text-ink">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg uppercase tracking-[0.06em] text-ink decoration-brand decoration-2 underline-offset-4 group-hover:underline">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs tracking-wide text-muted">{product.line}</p>
        </div>
        <p className="shrink-0 text-sm tabular-nums text-ink">{formatMoney(product.price)}</p>
      </div>
    </Link>
  );
}
