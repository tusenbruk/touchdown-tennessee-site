"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/components/CartContext";
import { trackPurchase, EcommerceItem } from "@/app/components/analytics";

interface Props {
  sessionId: string | null;
  total: number;
  items: EcommerceItem[];
  stickerVariantId: string | null;
}

export default function SuccessClient({ sessionId, total, items, stickerVariantId }: Props) {
  const { clearCart } = useCart();
  const [stickerLoading, setStickerLoading] = useState(false);

  useEffect(() => {
    clearCart();
    if (sessionId) trackPurchase(sessionId, total, items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const buySticker = async () => {
    if (!stickerVariantId) return;
    setStickerLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ variantId: Number(stickerVariantId), name: "TDT Sticker", variantName: "Sticker", quantity: 1, thumbnail: "" }],
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {}
    setStickerLoading(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      {stickerVariantId ? (
        <button
          onClick={buySticker}
          disabled={stickerLoading}
          style={{ background: "none", border: "2px solid #FF6600", color: "#FF6600", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-body)", opacity: stickerLoading ? 0.6 : 1 }}
        >
          {stickerLoading ? "One second…" : "Grab a sticker for $5 →"}
        </button>
      ) : (
        <Link href="/merch" style={{ fontSize: 12, color: "#FF6600", fontStyle: "italic" }}>
          While you&apos;re here — stickers and more in the shop →
        </Link>
      )}
    </div>
  );
}
