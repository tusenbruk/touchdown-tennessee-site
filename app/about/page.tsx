import Masthead from "@/app/components/Masthead";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Touchdown Tennessee is an independent fan brand making original Tennessee football designs — apparel, prints, and gifts, plus free daily games.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 740, margin: "48px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>About</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>

        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>About Touchdown Tennessee</h2>

        <div style={{ fontSize: 17, lineHeight: 1.75, color: "#1A1208" }}>
          <p style={{ marginBottom: 20 }}>
            Touchdown Tennessee is an independent fan brand making original Tennessee football designs — apparel, prints, stickers, and gifts. We are not affiliated with, sponsored by, or endorsed by the University of Tennessee, the NFL, or the Tennessee Titans organization.
          </p>

          <p style={{ marginBottom: 20 }}>
            Tennessee has one of the most passionate football cultures in America, and most of what you can buy to show it comes off the same licensed rack. We make the other thing: artwork with a point of view, drawn from the state itself — the mountains, the river, the frontier heritage, Saturday in Knoxville and Sunday in Nashville.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>How the Shop Works</h3>

          <p style={{ marginBottom: 20 }}>
            Every design is our own original artwork — no licensed logos, no trademarks, no jersey imitations. Products are printed on demand and typically ship within 3–5 business days of ordering. Wrong size or misprint? We reprint or refund, and you keep the original. Read more about <Link href="/guides/independent-tennessee-football-apparel" style={{ color: "#FF6600", textDecoration: "underline" }}>what independent means</Link>.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>The Game Room</h3>

          <p style={{ marginBottom: 20 }}>
            The site also hosts free games — <Link href="/games/tennessee-football-trivia" style={{ color: "#FF6600", textDecoration: "underline" }}>daily Tennessee football trivia</Link>, the <Link href="/games/saturday-score" style={{ color: "#FF6600", textDecoration: "underline" }}>Saturday Score</Link> puzzle, and two arcade games. No login, no charge; progress lives on your device. Big arcade scores earn single-use shop discounts.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>Independence</h3>

          <p style={{ marginBottom: 20 }}>
            Touchdown Tennessee is independently owned and operated. Our collections — starting with the Frontier Collection — use original designs and do not incorporate any officially licensed marks or logos. If you want official gear, the university bookstore is the right place; if you want something nobody else in your section is wearing, that&apos;s us.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>Contact</h3>

          <p style={{ marginBottom: 20 }}>
            For order questions, wholesale, or anything else, visit our <Link href="/contact" style={{ color: "#FF6600", textDecoration: "underline" }}>Contact page</Link>.
          </p>
        </div>

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginTop: 48, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em" }}>Touchdown Tennessee · Original Goods</span>
        </div>
      </div>
    </main>
  );
}
