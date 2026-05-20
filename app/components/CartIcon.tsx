"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartIcon() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      style={{
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 16px",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        color: "#1A1208",
        borderLeft: "1px solid #D4CEC7",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      Cart
      {count > 0 && (
        <span style={{
          position: "absolute" as const,
          top: 6,
          right: 8,
          background: "#FF6600",
          color: "#fff",
          borderRadius: "50%",
          width: 16,
          height: 16,
          fontSize: 9,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {count}
        </span>
      )}
    </Link>
  );
}
