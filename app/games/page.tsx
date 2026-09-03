import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { SLATE_2026, THIS_SATURDAY } from "@/lib/culture";

export const metadata: Metadata = {
  title: "Games",
  description: "The 2026 slate, daily Tennessee football trivia, Saturday Score, and arcade games. Free, no login.",
  alternates: { canonical: "/games" },
};

const GAMES = [
  {
    href: "/games/tennessee-football-trivia",
    badge: "Daily Trivia",
    color: "#FF6600",
    title: "Tennessee Football Trivia",
    desc: "Ten questions a day on Tennessee football history, coaches, bowls, and the culture. Same round for everyone — compare scores.",
    cta: "Play today's round →",
  },
  {
    href: "/games/saturday-score",
    badge: "Daily Puzzle",
    color: "#4B92DB",
    title: "Saturday Score",
    desc: "Five clues, one answer from Tennessee football history. The fewer clues you need, the better your score.",
    cta: "Play today's puzzle →",
  },
  {
    href: "/arcade",
    badge: "Arcade",
    color: "#FF6600",
    title: "Tennessee Rifleman",
    desc: "Crockett's hunt. Streak multipliers, a supply wagon, a three-strike rule.",
    cta: "Start the hunt →",
  },
  {
    href: "/catwalk",
    badge: "Arcade",
    color: "#4B92DB",
    title: "Crockett's Catwalk",
    desc: "Knock SEC mascots off the tightrope before they reach the uprights. Fifteen balls. Make them count.",
    cta: "Play ball →",
  },
];

export default function GamesPage() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Games", path: "/games" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 1080, margin: "40px auto 0", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>This Saturday</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>Games</h1>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 18, maxWidth: 640 }}>
          The 2026 slate. Show up when you can. Watch when you can’t. Talk about it either way.
        </p>

        <div style={{ border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600", padding: "18px 20px", background: "#FAFAF8", marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 6 }}>{THIS_SATURDAY.label}</div>
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.3 }}>{THIS_SATURDAY.line}</div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#666", fontStyle: "italic" }}>{THIS_SATURDAY.note}</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 14px" }}>2026 slate</h2>
        <div style={{ border: "1px solid #D4CEC7", marginBottom: 40 }}>
          {SLATE_2026.map((g, i) => (
            <div
              key={`${g.date}-${g.opponent}`}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 120px 90px",
                gap: 12,
                padding: "12px 14px",
                borderTop: i === 0 ? "none" : "1px solid #EEE8E0",
                background: g.featured ? "#FFF7F0" : "#fff",
                fontSize: 13,
              }}
            >
              <span style={{ fontWeight: 700, letterSpacing: "0.04em" }}>{g.date}</span>
              <span style={{ fontWeight: g.featured ? 800 : 600 }}>{g.opponent}</span>
              <span style={{ color: "#8B7355" }}>{g.where || "—"}</span>
              <span style={{ color: "#666", textAlign: "right" as const }}>{g.time || "TBD"}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #1A1208", color: "#1A1208", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>The Game Room</span>
          <div style={{ flex: 1, height: 1, background: "#1A1208" }} />
        </div>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>
          Two daily brain games, two arcade shooters. Free, no login. Progress stays on your device.
        </p>

        <div className="games-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
          {GAMES.map((g) => (
            <Link key={g.href} href={g.href} className="article-card" style={{ textDecoration: "none", color: "inherit", display: "block", border: "1px solid #D4CEC7", borderTop: `3px solid ${g.color}`, padding: "20px 22px" }}>
              <span style={{ border: `1.5px solid ${g.color}`, color: g.color, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>{g.badge}</span>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: "14px 0 8px", lineHeight: 1.15 }}>{g.title}</h2>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.55, marginBottom: 14 }}>{g.desc}</p>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: g.color }}>{g.cta}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
