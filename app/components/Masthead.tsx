import Link from "next/link";
import Image from "next/image";
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
        <span className="top-bar-center">Saturday · Knoxville · Football country</span>
        <div className="top-bar-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {rightLink ? (
            <Link href={rightLink.href} style={{ textDecoration: "none", color: "#8B7355" }}>{rightLink.label}</Link>
          ) : (
            <span style={{ fontSize: 11, letterSpacing: "0.12em" }}>Independent &amp; Unlicensed on Purpose</span>
          )}
        </div>
        <MobileNav />
      </div>

      {/* MASTHEAD — house mark stays the primary visual. */}
      <div className="masthead">
        <div className="masthead-rule masthead-rule-heavy" />
        <div className="masthead-rule" />
        <div className="masthead-brand">
          <Link href="/" className="masthead-brand-link">
            <div className="masthead-mark-frame">
              <Image className="masthead-mark" src="/art/tdt-mark-state.png" alt="" width={385} height={134} priority />
            </div>
            <h1 className="masthead-brand-title">Touchdown Tennessee</h1>
          </Link>
          <div className="masthead-desk">
            <span aria-hidden="true" />
            <p>Independent Tennessee football culture</p>
            <span aria-hidden="true" />
          </div>
        </div>
        <div className="masthead-rule" />
        <div className="masthead-rule masthead-rule-heavy" />
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
