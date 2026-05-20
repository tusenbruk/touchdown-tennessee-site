"use client";
import MobileNavBar from "@/app/components/MobileNavBar";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/components/CartContext";
export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Checkout failed."); setLoading(false); return; }
      // Redirect to Stripe checkout URL
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <MobileNavBar backHref="/merch" backLabel="← Shop" rightHref="/" rightLabel="Home" />

      <div style={{ maxWidth: 800, margin: "48px auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Your Cart</h2>
          {count > 0 && <span style={{ fontSize: 13, color: "#8B7355" }}>{count} item{count !== 1 ? "s" : ""}</span>}
        </div>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 32 }} />

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 18, color: "#8B7355", fontStyle: "italic", marginBottom: 24 }}>Your cart is empty.</p>
            <Link href="/merch" style={{ background: "#FF6600", color: "#fff", padding: "12px 28px", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none" }}>Shop the Collection</Link>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div style={{ marginBottom: 32 }}>
              {items.map((item) => (
                <div key={item.variantId} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 20, padding: "20px 0", borderBottom: "1px solid #D4CEC7", alignItems: "center" }}>
                  <img src={item.thumbnail} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", border: "1px solid #D4CEC7" }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#8B7355", marginBottom: 12 }}>{item.variantName}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        style={{ width: 28, height: 28, border: "1px solid #D4CEC7", background: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" as const }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        style={{ width: 28, height: 28, border: "1px solid #D4CEC7", background: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      <button onClick={() => removeItem(item.variantId)}
                        style={{ fontSize: 11, color: "#aaa", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginLeft: 8 }}>Remove</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#FF6600" }}>${(item.price * item.quantity).toFixed(2)}</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>${item.price.toFixed(2)} each</div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", padding: "24px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: "#555" }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 12, color: "#8B7355" }}>
                <span>Shipping calculated at checkout</span>
              </div>
              <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 16, display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: "#FF6600" }}>${total.toFixed(2)}</span>
              </div>

              {error && <p style={{ color: "#cc0000", fontSize: 12, marginBottom: 12 }}>{error}</p>}

              <button onClick={handleCheckout} disabled={loading}
                style={{ width: "100%", padding: "16px", background: loading ? "#aaa" : "#1A1208", color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>
                {loading ? "Redirecting to Checkout..." : "Proceed to Checkout →"}
              </button>

              <p style={{ fontSize: 10, color: "#aaa", textAlign: "center" as const, marginTop: 12, lineHeight: 1.6 }}>
                Secure checkout via Stripe. Fulfilled by Printful. Ships in 3–5 business days.
              </p>
            </div>

            <button onClick={clearCart}
              style={{ background: "none", border: "none", color: "#aaa", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "pointer", padding: 0 }}>
              Clear cart
            </button>
          </>
        )}
      </div>
    </main>
  );
}
