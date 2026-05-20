import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ showNewsletter = true }: { showNewsletter?: boolean }) {
  return (
    <>
      {showNewsletter && (
        <div style={{ background: "#1A1208", color: "#fff", padding: "36px 24px", textAlign: "center", position: "relative" as const, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderTop: "3px dashed rgba(255,255,255,0.15)" }} />
          <h3 style={{ fontSize: 22, letterSpacing: "0.06em", marginBottom: 6 }}>The Rocky Top Digest</h3>
          <p style={{ fontSize: 14, fontStyle: "italic", color: "#aaa", marginBottom: 20 }}>Game-week analysis, delivered Friday morning. No filler.</p>
          <NewsletterForm />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderBottom: "3px dashed rgba(255,255,255,0.15)" }} />
        </div>
      )}

      <footer style={{ borderTop: "2px solid #1A1208", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700 }}>Touchdown Tennessee</div>
          <div style={{ display: "flex", gap: 18, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
            <Link href="/about" style={{ color: "#8B7355", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ color: "#8B7355", textDecoration: "none" }}>Contact</Link>
            <Link href="/merch" style={{ color: "#8B7355", textDecoration: "none" }}>Shop</Link>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#8B7355", maxWidth: 260 }}>
            Independent editorial · Not affiliated with UT or NFL
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 10, color: "#D4CEC7", letterSpacing: "0.08em" }}>
          touchdowntennessee.com
        </div>
      </footer>
    </>
  );
}
