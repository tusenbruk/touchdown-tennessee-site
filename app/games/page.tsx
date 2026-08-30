import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Games",
  description: "Daily Tennessee football trivia, the Saturday Score guessing game, and two arcade games. Free, no login, progress saved on your device.",
  alternates: { canonical: "/games" },
};

const GAMES = [
  {
    href: "/games/tennessee-football-trivia",
    badge: "Daily Trivia",
    color: "#FF6600",
    title: "Tennessee Football Trivia",
    desc: "Ten questions a day on Tennessee football history, Titans lore, coaches, bowls, and the culture. Same round for everyone — compare scores.",
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
    desc: "Crockett's hunt. Streak multipliers, a supply wagon, a three-strike rule — and a shop discount for big scores.",
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
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>The Game Room</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>Games</h1>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 6, maxWidth: 640 }}>
          Two daily brain games, two arcade shooters. Free, no login.
        </p>
        <p style={{ fontSize: 11, color: "#8B7355", marginBottom: 36 }}>
          Progress and streaks are stored only on your device. Nothing is tracked to you personally.
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

        {/* Commerce cross-link, restrained */}
        <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 24, marginBottom: 48, display: "flex", flexWrap: "wrap" as const, alignItems: "baseline", gap: 12, justifyContent: "space-between" }}>
          <p style={{ fontSize: 13, color: "#8B7355", fontStyle: "italic", margin: 0 }}>
            Big Rifleman scores earn a single-use shop discount. Everything in the shop is original artwork.
          </p>
          <Link href="/merch" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#FF6600", textDecoration: "none" }}>
            Visit the Shop →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
