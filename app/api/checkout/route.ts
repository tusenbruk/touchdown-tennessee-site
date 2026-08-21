import Stripe from "stripe";
import { getSyncVariant } from "@/lib/printful";

export const dynamic = "force-dynamic";

const FREE_SHIPPING_THRESHOLD_CENTS = 75_00;

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2026-04-22.dahlia" });
  try {
    const { items } = await request.json();
    if (!items || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

    // Price authority is Printful, not the client. The client's price is used
    // for display only; a tampered POST cannot change what gets charged.
    const lineItems = [];
    let subtotalCents = 0;
    for (const item of items as {
      variantId: number;
      name: string;
      variantName: string;
      quantity: number;
      thumbnail: string;
    }[]) {
      const variantId = Number(item.variantId);
      const quantity = Math.min(Math.max(1, Math.floor(Number(item.quantity) || 1)), 20);
      if (!Number.isInteger(variantId) || variantId <= 0) {
        return Response.json({ error: "Invalid item in cart" }, { status: 400 });
      }
      const variant = await getSyncVariant(variantId);
      if (!variant) {
        return Response.json({ error: `An item in your cart is no longer available.` }, { status: 400 });
      }
      const unitAmount = Math.round(parseFloat(variant.retail_price) * 100);
      if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
        return Response.json({ error: "Could not verify item pricing. Try again shortly." }, { status: 502 });
      }
      subtotalCents += unitAmount * quantity;
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.variantName || variant.name,
            images: item.thumbnail ? [item.thumbnail] : [],
            metadata: { printful_variant_id: String(variantId) },
          },
          unit_amount: unitAmount,
        },
        quantity,
      });
    }

    // Mirror the fulfillment payload compactly into session metadata
    // ("variantId:qty" pairs) — the webhook reads this to place the
    // Printful order. Stays far under Stripe's 500-char value limit.
    const itemsMeta = (items as { variantId: number; quantity: number }[])
      .map((i) => `${i.variantId}:${Math.min(Math.max(1, Math.floor(Number(i.quantity) || 1)), 20)}`)
      .join(",");

    const shippingOptions =
      subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Standard Shipping — free over $75",
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 5 },
                  maximum: { unit: "business_day" as const, value: 10 },
                },
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: 595, currency: "usd" },
                display_name: "Standard Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 5 },
                  maximum: { unit: "business_day" as const, value: 10 },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: 1295, currency: "usd" },
                display_name: "Express Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 3 },
                  maximum: { unit: "business_day" as const, value: 5 },
                },
              },
            },
          ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "AU", "GB", "NZ"],
      },
      shipping_options: shippingOptions,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://touchdowntennessee.com"}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://touchdowntennessee.com"}/cart`,
      metadata: {
        source: "touchdowntennessee.com",
        items: itemsMeta,
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return Response.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
