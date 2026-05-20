"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";

export default function MobileNavBar({
  backHref,
  backLabel,
  rightHref,
  rightLabel,
}: {
  backHref: string;
  backLabel: string;
  rightHref?: string;
  rightLabel?: string;
}) {
  return (
    <>
      <div className="top-bar" style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <Link href={backHref} style={{ textDecoration: "none", color: "#8B7355" }}>{backLabel}</Link>
        <span className="top-bar-center">Rocky Top Collection</span>
        {rightHref && <Link href={rightHref} className="top-bar-right" style={{ textDecoration: "none", color: "#8B7355" }}>{rightLabel}</Link>}
        <MobileNav />
      </div>

      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 className="masthead-title" style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <img src="/tdt-logo.png" alt="TDT" style={{ height: 36, width: "auto" }} />
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>
    </>
  );
}
