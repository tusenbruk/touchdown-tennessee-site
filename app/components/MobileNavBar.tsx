"use client";

import Link from "next/link";
import Image from "next/image";
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
        <span className="top-bar-center">Original Tennessee Football Goods · Knoxville to Nashville</span>
        {rightHref && <Link href={rightHref} className="top-bar-right" style={{ textDecoration: "none", color: "#8B7355" }}>{rightLabel}</Link>}
        <MobileNav />
      </div>

      {/* Same masthead as the homepage and the Masthead component. */}
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
            <p>Original Tennessee Football Goods</p>
            <span aria-hidden="true" />
          </div>
        </div>
        <div className="masthead-rule" />
        <div className="masthead-rule masthead-rule-heavy" />
      </div>
    </>
  );
}
