import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ showNewsletter = true }: { showNewsletter?: boolean }) {
  return (
    <>
      {showNewsletter && (
        <div style={{ background: "#1A1208", color: "#fff", padding: "36px 24px", textAlign: "center", position: "relative" as const, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderTop: "3px dashed rgba(255,255,255,0.15)" }} />
          <h3 style={{ fontSize: 22, letterSpacing: "0.06em", marginBottom: 6 }}>The Drop List</h3>
          <p style={{ fontSize: 14, fontStyle: "italic", color: "#aaa", marginBottom: 20 }}>First look at every Thursday drop.</p>
          <NewsletterForm />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderBottom: "3px dashed rgba(255,255,255,0.15)" }} />
        </div>
      )}

      {/* SOCIAL FOLLOW BAR */}
      <div style={{ background: "#FAFAF8", borderTop: "1px solid #D4CEC7", borderBottom: "1px solid #D4CEC7", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", textTransform: "uppercase" as const, color: "#8B7355", marginBottom: 14 }}>Follow Touchdown Tennessee</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, alignItems: "center", flexWrap: "wrap" as const }}>
          <a href="https://youtube.com/@TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#1A1208", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            YouTube
          </a>
        </div>
      </div>

      <footer style={{ borderTop: "2px solid #1A1208", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700 }}>Touchdown Tennessee</div>
          <div style={{ display: "flex", gap: 18, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
            <Link href="/about" style={{ color: "#8B7355", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ color: "#8B7355", textDecoration: "none" }}>Contact</Link>
            <Link href="/merch" style={{ color: "#8B7355", textDecoration: "none" }}>Shop</Link>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "#8B7355", maxWidth: 320 }}>
            Independent fan publication and brand. Not affiliated with, sponsored by, or endorsed by the University of Tennessee or the NFL.
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 10, color: "#D4CEC7", letterSpacing: "0.08em" }}>
          touchdowntennessee.com
        </div>
      </footer>
    </>
  );
}
