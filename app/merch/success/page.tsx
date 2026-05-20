"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/components/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 40px" }}>
        <img src="/tdt-logo.png" alt="TDT" style={{ height: 60, marginBottom: 32 }} />
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Order Confirmed</h2>
        <p style={{ fontSize: 16, color: "#555", fontStyle: "italic", lineHeight: 1.6, marginBottom: 8 }}>
          You&apos;ll receive a confirmation email shortly. Printful will handle fulfillment — expect delivery in 5–10 business days.
        </p>
        <p style={{ fontSize: 13, color: "#8B7355", marginBottom: 32 }}>Go Big Orange.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/merch" style={{ background: "#FF6600", color: "#fff", padding: "12px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>Shop More</Link>
          <Link href="/" style={{ background: "#1A1208", color: "#fff", padding: "12px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
