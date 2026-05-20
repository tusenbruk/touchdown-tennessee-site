import Link from "next/link";
import MobileNav from "./MobileNav";

interface MastheadProps {
  backLink?: { href: string; label: string };
  rightLink?: { href: string; label: string };
}

export default function Masthead({ backLink, rightLink }: MastheadProps) {
  const navItems = [
    { label: "Vols Desk", color: "#FF6600", href: "/#vols" },
    { label: "Vols Roster", color: "#FF6600", href: "/vols/roster" },
    { label: "Titans Desk", color: "#4B92DB", href: "/#titans" },
    { label: "Titans Roster", color: "#4B92DB", href: "/titans/roster" },
    { label: "Bookie's Nook", color: "#1A1208", href: "/#bookies-nook" },
    { label: "Shop", color: "#FF6600", href: "/merch" },
    { label: "Archive", color: "#1A1208", href: "/archive" },
    { label: "Cart", color: "#1A1208", href: "/cart" },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar" style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        {backLink ? (
          <Link href={backLink.href} style={{ textDecoration: "none", color: "#8B7355" }}>{backLink.label}</Link>
        ) : (
          <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        )}
        <span className="top-bar-center">Tennessee Football · Vols · Titans · Rocky Top</span>
        {rightLink ? (
          <Link href={rightLink.href} className="top-bar-right" style={{ textDecoration: "none", color: "#8B7355" }}>{rightLink.label}</Link>
        ) : (
          <span className="top-bar-right">Independent Editorial</span>
        )}
        <MobileNav />
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 className="masthead-title" style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
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
