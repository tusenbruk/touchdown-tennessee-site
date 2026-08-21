import Stripe from "stripe";
import Link from "next/link";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

interface SummaryLine {
  name: string;
  quantity: number;
  amount: number; // cents
}

async function getOrderSummary(sessionId: string | undefined) {
  if (!sessionId || !sessionId.startsWith("cs_") || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" });
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
    const lines: SummaryLine[] =
      session.line_items?.data.map((li) => ({
        name: li.description ?? "Item",
        quantity: li.quantity ?? 1,
        amount: li.amount_total ?? 0,
      })) ?? [];
    return {
      id: session.id,
      email: session.customer_details?.email ?? null,
      total: session.amount_total ?? 0,
      lines,
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const order = await getOrderSummary(session_id);
  const stickerVariantId = process.env.STICKER_VARIANT_ID || null;

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 520, padding: "40px" }}>
        <img src="/tdt-logo.png" alt="TDT" style={{ height: 60, marginBottom: 32 }} />
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Order Confirmed</h2>
        <p style={{ fontSize: 16, color: "#555", fontStyle: "italic", lineHeight: 1.6, marginBottom: 20 }}>
          {order?.email ? `A confirmation is on its way to ${order.email}. ` : "You'll receive a confirmation email shortly. "}
          Printful handles fulfillment — expect delivery in 5–10 business days.
        </p>

        {order && order.lines.length > 0 && (
          <div style={{ border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600", textAlign: "left", padding: "16px 20px", marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#8B7355", marginBottom: 10 }}>Order Summary</div>
            {order.lines.map((line, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, padding: "6px 0", borderBottom: "1px solid #F0EBE3" }}>
                <span>{line.name}{line.quantity > 1 ? ` × ${line.quantity}` : ""}</span>
                <span style={{ fontWeight: 700 }}>${(line.amount / 100).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, paddingTop: 10 }}>
              <span>Total</span>
              <span style={{ color: "#FF6600" }}>${(order.total / 100).toFixed(2)}</span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/merch" style={{ background: "#FF6600", color: "#fff", padding: "12px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>Shop More</Link>
          <Link href="/" style={{ background: "#1A1208", color: "#fff", padding: "12px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>Back to Home</Link>
        </div>

        <SuccessClient
          sessionId={order?.id ?? null}
          total={(order?.total ?? 0) / 100}
          items={order?.lines.map((l) => ({ item_id: l.name, item_name: l.name, price: l.amount / 100 / (l.quantity || 1), quantity: l.quantity })) ?? []}
          stickerVariantId={stickerVariantId}
        />
      </div>
    </main>
  );
}
