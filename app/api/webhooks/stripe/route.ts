import Stripe from "stripe";
import { createOrder, getOrderByExternalId } from "@/lib/printful";

export const dynamic = "force-dynamic";

// Something went wrong between a paid Stripe session and Printful — a human
// needs to fulfill manually. Loud log + alert email so it can't slip by.
async function alertFailure(subject: string, detail: string) {
  console.error(`[FULFILLMENT ALERT] ${subject}\n${detail}`);
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "alerts@touchdowntennessee.com",
        to: ["ryan@watauga.co"],
        subject: `[TDT fulfillment] ${subject}`,
        text: detail,
      }),
    });
  } catch (e) {
    console.error("Alert email also failed:", e);
  }
}

function parseItemsMeta(meta: string | undefined): { sync_variant_id: number; quantity: number }[] {
  if (!meta) return [];
  return meta
    .split(",")
    .map((pair) => {
      const [id, qty] = pair.split(":").map(Number);
      return { sync_variant_id: id, quantity: qty };
    })
    .filter((i) => Number.isInteger(i.sync_variant_id) && i.sync_variant_id > 0 && Number.isInteger(i.quantity) && i.quantity > 0);
}

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2026-04-22.dahlia" });
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET not set — webhook rejected");
    return Response.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, secret);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // Idempotency: external_id is the session id; if Printful already has it,
    // this is a webhook retry — acknowledge and stop.
    const existing = await getOrderByExternalId(session.id);
    if (existing) {
      return Response.json({ received: true, duplicate: true });
    }

    const items = parseItemsMeta(session.metadata?.items);
    if (items.length === 0) {
      await alertFailure(
        `Paid session ${session.id} has no fulfillable items`,
        `Stripe Checkout session ${session.id} completed but its metadata carried no variant list.\n` +
          `Customer: ${session.customer_details?.email ?? "unknown"}\n` +
          `Amount: ${((session.amount_total ?? 0) / 100).toFixed(2)} ${session.currency?.toUpperCase()}\n` +
          `Fulfill manually in Printful, and investigate the checkout route.`
      );
      return Response.json({ received: true, error: "no items" });
    }

    // Shipping details location depends on Stripe API version — check both.
    type ShippingDetails = { name?: string | null; address?: Stripe.Address | null } | null | undefined;
    const s = session as unknown as {
      collected_information?: { shipping_details?: ShippingDetails };
      shipping_details?: ShippingDetails;
    };
    const shipping = s.collected_information?.shipping_details ?? s.shipping_details;
    const addr = shipping?.address;
    if (!addr?.line1 || !addr.city || !addr.country || !addr.postal_code) {
      await alertFailure(
        `Paid session ${session.id} missing shipping address`,
        `Stripe Checkout session ${session.id} completed without a usable shipping address.\n` +
          `Customer: ${session.customer_details?.email ?? "unknown"}\nFulfill manually in Printful.`
      );
      return Response.json({ received: true, error: "no address" });
    }

    const order = await createOrder(
      {
        external_id: session.id,
        recipient: {
          name: shipping?.name || session.customer_details?.name || "Customer",
          email: session.customer_details?.email || undefined,
          address1: addr.line1,
          address2: addr.line2 || undefined,
          city: addr.city,
          state_code: addr.state || undefined,
          country_code: addr.country,
          zip: addr.postal_code,
        },
        items,
      },
      false // draft order — confirm manually in Printful for the first two weeks
    );

    console.log(`Printful draft order ${order?.id} created for session ${session.id}`);
    return Response.json({ received: true, printful_order_id: order?.id });
  } catch (e) {
    await alertFailure(
      `Printful order creation failed for session ${session.id}`,
      `Error: ${e instanceof Error ? e.message : String(e)}\n` +
        `Customer: ${session.customer_details?.email ?? "unknown"}\n` +
        `Items meta: ${session.metadata?.items ?? "(none)"}\n` +
        `Fulfill manually in Printful using the Stripe session details.`
    );
    // 500 so Stripe retries — transient Printful outages self-heal.
    return Response.json({ error: "Fulfillment failed" }, { status: 500 });
  }
}
