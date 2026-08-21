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

// Get all store products
export async function getStoreProducts(): Promise<PrintfulProduct[]> {
  try {
    const res = await fetch(`${PRINTFUL_API}/store/products?limit=50`, {
      headers: pfHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.result || [];
  } catch {
    return [];
  }
}

// Get single product with variants
export async function getStoreProduct(id: string): Promise<PrintfulProduct | null> {
  try {
    const res = await fetch(`${PRINTFUL_API}/store/products/${id}`, {
      headers: pfHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result?.sync_product || null;
  } catch {
    return null;
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
