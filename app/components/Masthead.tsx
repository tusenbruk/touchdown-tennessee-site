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
        <span className="top-bar-center">Saturday · Atlanta · Road lights</span>
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
