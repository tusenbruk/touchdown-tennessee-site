import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden bg-bone">
        <img
          src={product.images[0]}
          alt={product.name}
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
          <p className="font-display text-lg uppercase tracking-[0.06em] text-ink">{product.name}</p>
          <p className="mt-0.5 text-xs tracking-wide text-muted">{product.line}</p>
        </div>
        <p className="shrink-0 tabular-nums text-sm text-ink">{formatMoney(product.price)}</p>
      </div>
    </Link>
  );
}
