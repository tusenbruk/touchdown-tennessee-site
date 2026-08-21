import Link from "next/link";
import MobileNav from "./MobileNav";
import { NAV_ITEMS } from "./nav-items";

interface MastheadProps {
  backLink?: { href: string; label: string };
  rightLink?: { href: string; label: string };
}

export default function Masthead({ backLink, rightLink }: MastheadProps) {
  const navItems = NAV_ITEMS;

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar" style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        {backLink ? (
          <Link href={backLink.href} style={{ textDecoration: "none", color: "#8B7355" }}>{backLink.label}</Link>
        ) : (
          <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        )}
        <span className="top-bar-center">Original Tennessee Football Goods · Knoxville to Nashville</span>
        <div className="top-bar-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {rightLink ? (
            <Link href={rightLink.href} style={{ textDecoration: "none", color: "#8B7355" }}>{rightLink.label}</Link>
          ) : (
            <span style={{ fontSize: 11, letterSpacing: "0.12em" }}>Independent &amp; Unlicensed on Purpose</span>
          )}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }} aria-label="X / Twitter">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <a href="https://instagram.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }} aria-label="Instagram">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }} aria-label="Facebook">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <MobileNav />
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 className="masthead-title" style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Original Tennessee Football Goods</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <img src="/tdt-logo.png" alt="Touchdown Tennessee" style={{ height: 36, width: "auto", display: "block" }} />
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* DESKTOP NAV */}
      <nav className="desktop-nav" style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid #D4CEC7", overflowX: "auto" as const }}>
        {navItems.map((item, i) => (
          <a key={i} href={item.href} style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none", color: item.color, padding: "10px 20px", borderRight: "1px solid #D4CEC7", borderLeft: i === 0 ? "1px solid #D4CEC7" : undefined, whiteSpace: "nowrap" as const }}>{item.label}</a>
        ))}
      </nav>
    </>
  );
}
