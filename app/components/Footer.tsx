import Link from "next/link";

export default function Footer({ showNewsletter = false }: { showNewsletter?: boolean }) {
  void showNewsletter;
  return (
    <footer style={{ borderTop: "2px solid #1A1208", padding: "28px 24px 36px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
          <div>
            <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700, marginBottom: 8 }}>Touchdown Tennessee</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
              <Link href="/" style={{ color: "#8B7355", textDecoration: "none" }}>Home</Link>
              <Link href="/games" style={{ color: "#8B7355", textDecoration: "none" }}>Games</Link>
              <Link href="/the-place" style={{ color: "#8B7355", textDecoration: "none" }}>The Place</Link>
              <Link href="/days-that-matter" style={{ color: "#8B7355", textDecoration: "none" }}>Days That Matter</Link>
              <Link href="/what-it-means" style={{ color: "#8B7355", textDecoration: "none" }}>What It Means</Link>
              <Link href="/about" style={{ color: "#8B7355", textDecoration: "none" }}>About</Link>
              <Link href="/contact" style={{ color: "#8B7355", textDecoration: "none" }}>Contact</Link>
            </div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#1A1208", maxWidth: 420 }}>
            <p style={{ margin: "0 0 8px" }}>
              Touchdown Tennessee is an independent brand. Not affiliated with, endorsed by, or licensed by the University of Tennessee.
            </p>
            <p style={{ margin: 0, fontSize: 12 }}>
              Contact: <a href="mailto:touchdowntennessee@gmail.com" style={{ color: "#FF6600", textDecoration: "none" }}>touchdowntennessee@gmail.com</a>
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 10, color: "#C0B9AF", letterSpacing: "0.08em" }}>
          touchdowntennessee.com
        </div>
      </div>
    </footer>
  );
}
