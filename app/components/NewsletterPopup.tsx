"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NewsletterForm from "./NewsletterForm";

const SEEN_KEY = "tdt-popup-seen";
const SEEN_DAYS = 14;
const DELAY_MS = 12_000;

// Delayed email-capture popup: shows once per 14 days, never on checkout-adjacent pages.
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const suppressed = pathname.startsWith("/cart") || pathname.startsWith("/merch/success") || pathname.startsWith("/arcade");

  useEffect(() => {
    if (suppressed) return;
    try {
      const seen = localStorage.getItem(SEEN_KEY);
      if (seen && Date.now() - Number(seen) < SEEN_DAYS * 86_400_000) return;
    } catch {
      return; // storage unavailable — skip rather than nag every load
    }
    const t = setTimeout(() => {
      setOpen(true);
      try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch {}
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [suppressed]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{ position: "fixed", inset: 0, background: "rgba(26,18,8,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#1A1208", color: "#fff", maxWidth: 440, width: "100%", padding: "32px 28px", position: "relative", border: "3px solid #FF6600", fontFamily: "Georgia, serif", textAlign: "center" }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", color: "#8a8074", fontSize: 22, cursor: "pointer", lineHeight: 1 }}
        >
          ×
        </button>
        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", textTransform: "uppercase", color: "#FF6600", marginBottom: 10 }}>
          10% off your first order
        </div>
        <h3 style={{ fontSize: 24, margin: "0 0 8px", letterSpacing: "0.04em" }}>Join the Drop List</h3>
        <p style={{ fontSize: 13, fontStyle: "italic", color: "#aaa", lineHeight: 1.6, margin: "0 0 18px" }}>
          First look at every Thursday drop — and code <span style={{ color: "#FF6600", fontWeight: 700, fontStyle: "normal", letterSpacing: "0.08em" }}>WELCOME10</span> for 10% off the shop.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
}
