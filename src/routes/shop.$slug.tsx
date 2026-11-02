import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  defaultSize,
  findVariant,
  getProduct,
  relatedProducts,
  sizesForColor,
  type Product,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/shop/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) throw notFound();
  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [size, setSize] = useState<string | undefined>(defaultSize(product, colorId));
  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const sizes = sizesForColor(product, colorId);
  const variant = findVariant(product, colorId, size);
  const price = variant?.price ?? product.price;
  const activeSrc = color?.image ?? product.images[0];

  function pickColor(id: string) {
    setColorId(id);
    const nextSizes = sizesForColor(product, id);
    if (size && !nextSizes.includes(size)) {
      setSize(defaultSize(product, id));
    }
  }

  function addToCart() {
    if (sizes.length && !size) {
      toast("Pick a size");
      return;
    }
    if (!variant) {
      toast("That size is not in this color");
      return;
    }
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: activeSrc,
      price,
      size: product.kind === "hat" ? undefined : size,
      color: color?.name,
      printfulVariantId: variant.id,
    });
    toast("In the truck");
  }

  const related = relatedProducts(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link to="/shop" className="underline-offset-4 hover:text-ink hover:underline">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <div className="overflow-hidden bg-bone">
            <img
              src={activeSrc}
              alt={`${product.name}${color && product.colors.length > 1 ? `, ${color.name}` : ""}`}
              width={900}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="aspect-3/4 w-full object-cover"
            />
          </div>
          {product.colors.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => pickColor(c.id)}
                  aria-label={`Show ${c.name}`}
                  aria-pressed={c.id === colorId}
                  className={cn(
                    "overflow-hidden bg-bone",
                    c.id === colorId ? "shadow-[inset_0_0_0_3px_#16120E]" : "hover:opacity-80",
                  )}
                >
                  <img
                    src={c.image}
                    alt=""
                    width={900}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover outline-none"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="min-w-0">
          {product.badge ? <p className="kicker">{product.badge}</p> : null}
          <span className="title-rule" aria-hidden="true" />
          <h1 className="mt-4 text-3xl leading-none sm:text-4xl lg:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">{product.line}</p>
          <p className="mt-4 text-xl tabular-nums">{formatMoney(price)}</p>
          <p className="mt-5 max-w-md text-lg">{product.blurb}</p>
          <p className="mt-3 max-w-md text-base text-muted">{product.story}</p>

          {product.colors.length > 1 ? (
            <fieldset className="mt-8">
              <legend className="font-display text-xs uppercase tracking-[0.16em]">
                {color?.name}
              </legend>
              <div className="mt-3 flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => pickColor(c.id)}
                    aria-label={c.name}
                    aria-pressed={colorId === c.id}
                    className={cn(
                      "size-11 rounded-full shadow-[inset_0_0_0_1px_rgba(22,18,14,0.25)]",
                      colorId === c.id ? "shadow-[0_0_0_2px_#fffcf8,0_0_0_4px_#16120E]" : "",
                    )}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {sizes.length ? (
            <fieldset className="mt-6">
              <legend className="font-display text-xs uppercase tracking-[0.16em]">
                {product.kind === "case" ? "iPhone" : "Size"}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cn(
                      "h-11 min-w-11 px-3 font-display text-sm transition-colors duration-150",
                      size === s
                        ? "bg-ink text-cream"
                        : "bg-transparent text-ink shadow-[inset_0_0_0_1px_rgba(22,18,14,0.35)] hover:bg-bone",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {product.kind === "tee" || product.kind === "sweatshirt" ? (
                <p className="mt-2 text-sm text-muted">
                  True to size. Size up if you want it huge.
                </p>
              ) : null}
            </fieldset>
          ) : null}

          <Button size="lg" variant="primary" className="mt-8 w-full sm:w-72" onClick={addToCart}>
            Add to truck
          </Button>
          <dl className="mt-8 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-t border-ink/10 py-3">
              <dt className="shrink-0 text-muted">Spec</dt>
              <dd className="text-right">{product.fabric}</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 py-3">
              <dt className="text-muted">Ships</dt>
              <dd>3–5 business days</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 py-3">
              <dt className="text-muted">Over $75</dt>
              <dd>Free US shipping</dd>
            </div>
          </dl>
        </div>
      </div>
      {related.length ? (
        <section className="mt-20">
          <h2 className="text-3xl sm:text-4xl">With this</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
