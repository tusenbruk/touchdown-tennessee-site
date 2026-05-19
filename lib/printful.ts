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

// Create an order
export async function createOrder(orderData: {
  recipient: {
    name: string;
    email: string;
    address1: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
  };
  items: { sync_variant_id: number; quantity: number }[];
}) {
  const res = await fetch(`${PRINTFUL_API}/orders`, {
    method: "POST",
    headers: pfHeaders(),
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  return data;
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
