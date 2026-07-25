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

      {/* SOCIAL FOLLOW BAR */}
      <div style={{ background: "#FAFAF8", borderTop: "1px solid #D4CEC7", borderBottom: "1px solid #D4CEC7", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", textTransform: "uppercase" as const, color: "#8B7355", marginBottom: 14 }}>Follow Touchdown Tennessee</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, alignItems: "center", flexWrap: "wrap" as const }}>
          <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#1A1208", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            @TDTennessee
          </a>
          <a href="https://instagram.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#1A1208", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </a>
          <a href="https://facebook.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#1A1208", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
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
            <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" style={{ color: "#8B7355", textDecoration: "none" }}>@TDTennessee</a>
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
