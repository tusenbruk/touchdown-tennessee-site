"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Vols Desk", color: "#FF6600", href: "/#vols" },
  { label: "Vols Roster", color: "#FF6600", href: "/vols/roster" },
  { label: "Titans Desk", color: "#4B92DB", href: "/#titans" },
  { label: "Titans Roster", color: "#4B92DB", href: "/titans/roster" },
  { label: "Bookie's Nook", color: "#1A1208", href: "/#bookies-nook" },
  { label: "Shop", color: "#FF6600", href: "/merch" },
  { label: "Archive", color: "#1A1208", href: "/archive" },
  { label: "Arcade", color: "#FF6600", href: "/arcade" },
  { label: "Cart", color: "#1A1208", href: "/cart" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HAMBURGER BUTTON — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          flexDirection: "column" as const,
          gap: 5,
        }}
        className="hamburger"
      >
        <span style={{ display: "block", width: 22, height: 2, background: "#1A1208", transition: "all 0.2s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ display: "block", width: 22, height: 2, background: "#1A1208", opacity: open ? 0 : 1, transition: "all 0.2s" }} />
        <span style={{ display: "block", width: 22, height: 2, background: "#1A1208", transition: "all 0.2s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div style={{
          position: "fixed" as const,
          top: 0, left: 0, right: 0, bottom: 0,
          background: "#fff",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column" as const,
          padding: "20px 0",
        }}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px 20px", borderBottom: "2px solid #1A1208" }}>
            <img src="/tdt-logo.png" alt="Touchdown Tennessee" style={{ height: 32 }} />
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "#1A1208", lineHeight: 1 }}>✕</button>
          </div>

          {/* Nav items */}
          <div style={{ flex: 1, overflowY: "auto" as const }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "16px 24px",
                  fontSize: 14,
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  textDecoration: "none",
                  color: item.color,
                  borderBottom: "1px solid #D4CEC7",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ padding: "20px 24px", fontSize: 10, color: "#8B7355", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            Touchdown Tennessee · Independent Editorial
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
          .top-bar-center { display: none !important; }
          .top-bar-right { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-sidebar { display: none !important; }
          .article-grid { grid-template-columns: 1fr !important; }
          .merch-grid { grid-template-columns: 1fr !important; }
          .product-grid { grid-template-columns: 1fr !important; }
          .roster-table { font-size: 11px !important; }
          .masthead-title { font-size: 36px !important; }
          .top-bar { padding: 6px 16px !important; }
          .main-container { padding: 0 16px !important; }
          .section-padding { padding: 0 16px !important; }
          .bookie-grid { grid-template-columns: 1fr 1fr 1fr !important; font-size: 11px !important; }
        }
      `}</style>
    </>
  );
}
