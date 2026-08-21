const PRINTFUL_API = "https://api.printful.com";

function pfHeaders() {
  return {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  retail_price: string;
  variants: PrintfulVariant[];
}

export interface PrintfulVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  retail_price: string;
  is_enabled: boolean;
}

// ---- Cached catalog (5-minute revalidate) ----
// One products-list fetch + parallel detail fetches. This is the single
// source for /merch, the homepage shop section, and the product API route —
// replacing the old per-page no-store N+1 fetches.

const CATALOG_REVALIDATE = 300;

export interface ProductDetail {
  id: number;
  name: string;
  thumbnail_url: string;
  variants: { id: number; name: string; retail_price: string }[];
}

export interface CatalogProduct {
  id: number;
  name: string;
  thumbnail: string;
  minPrice: string;
  maxPrice: string;
  samePrice: boolean;
  sizes: string[];
  colors: string[];
  variantCount: number;
}

export async function getProductDetail(id: string | number): Promise<ProductDetail | null> {
  try {
    const res = await fetch(`${PRINTFUL_API}/store/products/${id}`, {
      headers: pfHeaders(),
      next: { revalidate: CATALOG_REVALIDATE },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const sp = data.result?.sync_product;
    if (!sp?.id) return null;
    const variants = (data.result?.sync_variants || []) as { id: number; name: string; retail_price: string }[];
    return {
      id: sp.id,
      name: sp.name,
      thumbnail_url: sp.thumbnail_url,
      variants: variants.map((v) => ({ id: v.id, name: v.name, retail_price: v.retail_price })),
    };
  } catch {
    return null;
  }
}

export async function getCatalog(): Promise<CatalogProduct[]> {
  try {
    const res = await fetch(`${PRINTFUL_API}/store/products?limit=50`, {
      headers: pfHeaders(),
      next: { revalidate: CATALOG_REVALIDATE },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const products = (data.result || []) as { id: number }[];

    const detailed = await Promise.all(
      products.map(async (p) => {
        const d = await getProductDetail(p.id);
        if (!d) return null;
        const prices = d.variants.map((v) => parseFloat(v.retail_price)).filter(Boolean);
        const minPrice = prices.length ? Math.min(...prices) : 0;
        const maxPrice = prices.length ? Math.max(...prices) : 0;
        const sizes = [...new Set(d.variants.map((v) => v.name.split(" / ").pop() || ""))].filter(Boolean).slice(0, 6);
        const colors = [...new Set(d.variants.map((v) => {
          const parts = v.name.split(" / ");
          return parts.length > 1 ? parts[1] : null;
        }))].filter(Boolean).slice(0, 5) as string[];
        return {
          id: d.id,
          name: d.name,
          thumbnail: d.thumbnail_url,
          minPrice: minPrice.toFixed(2),
          maxPrice: maxPrice.toFixed(2),
          samePrice: minPrice === maxPrice,
          sizes,
          colors,
          variantCount: d.variants.length,
        };
      })
    );
    return detailed.filter(Boolean) as CatalogProduct[];
  } catch {
    return [];
  }
}

// Look up a single sync variant (the id stored in cart items) — used by the
// checkout route as the price authority. Cached briefly so a burst of
// checkouts doesn't hammer Printful.
export async function getSyncVariant(id: number): Promise<{ id: number; name: string; retail_price: string } | null> {
  try {
    const res = await fetch(`${PRINTFUL_API}/store/variants/${id}`, {
      headers: pfHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const v = data.result;
    if (!v?.id) return null;
    return { id: v.id, name: v.name, retail_price: v.retail_price };
  } catch {
    return null;
  }
}

// Fetch an order by the external_id we set at creation (the Stripe session id).
// Used for webhook idempotency: if it exists, the event was already handled.
export async function getOrderByExternalId(externalId: string) {
  try {
    const res = await fetch(`${PRINTFUL_API}/orders/@${externalId}`, {
      headers: pfHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result || null;
  } catch {
    return null;
  }
}

// Create an order. Draft by default (confirm=false) — Ryan confirms in the
// Printful dashboard until the pipeline has two clean weeks, then flip.
export async function createOrder(
  orderData: {
    external_id: string;
    recipient: {
      name: string;
      email?: string;
      address1: string;
      address2?: string;
      city: string;
      state_code?: string;
      country_code: string;
      zip: string;
    };
    items: { sync_variant_id: number; quantity: number }[];
  },
  confirm = false
) {
  const res = await fetch(`${PRINTFUL_API}/orders${confirm ? "?confirm=1" : ""}`, {
    method: "POST",
    headers: pfHeaders(),
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Printful order failed (${res.status}): ${JSON.stringify(data?.error ?? data).slice(0, 500)}`);
  }
  return data.result;
}

// Calculate shipping rates
export async function getShippingRates(recipient: {
  address1: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
}, items: { variant_id: number; quantity: number }[]) {
  const res = await fetch(`${PRINTFUL_API}/shipping/rates`, {
    method: "POST",
    headers: pfHeaders(),
    body: JSON.stringify({ recipient, items }),
  });
  const data = await res.json();
  return data.result || [];
}
