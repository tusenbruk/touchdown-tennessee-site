import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2026-04-22.dahlia" });
  try {
    const { items } = await request.json();
    if (!items || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

    const lineItems = items.map((item: {
      name: string;
      variantName: string;
      price: number;
      quantity: number;
      thumbnail: string;
    }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.variantName,
          images: [item.thumbnail],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "AU", "GB", "NZ"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 499, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 999, currency: "usd" },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://touchdowntennessee.com"}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://touchdowntennessee.com"}/cart`,
      metadata: {
        source: "touchdowntennessee.com",
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return Response.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
