import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Arcade | Touchdown Tennessee",
  description: "Play Touchdown Tennessee browser games — Crockett's Hunt and Crockett's Catwalk.",
};

const games = [
  {
    href: "/rifleman",
    title: "Tennessee Rifleman",
    subtitle: "Crockett's Hunt",
    description: "Take aim. SEC mascots are in your sights. Don't miss — every shot counts.",
    badge: "NEW",
    badgeColor: "#FF6600",
    bg: "#1a2a0a",
    accent: "#8B4513",
    label: "Aim & shoot",
  },
  {
    href: "/catwalk",
    title: "Crockett's Catwalk",
    subtitle: "Knock 'em off the tightrope",
    description: "15 balls. Knock SEC mascots off the catwalk. Do not hit Smokey.",
    badge: null,
    badgeColor: "#4B92DB",
    bg: "#1a1030",
    accent: "#FF8200",
    label: "Arrow keys or tap",
  },
];

export default function ArcadePage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <Masthead />

      {/* HEADER */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 40px 28px" }} className="main-container">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Arcade</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>{games.length} games</span>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, color: "#1A1208", margin: "12px 0 6px" }}>Vol Nation Arcade</h2>
        <p style={{ fontSize: 14, color: "#666", fontStyle: "italic", margin: 0 }}>
          Browser games for the faithful. No downloads. Just football.
        </p>
      </div>

      {/* GAME CARDS */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px 60px", display: "flex", flexDirection: "column" as const, gap: 32 }} className="main-container">
        {games.map((game) => (
          <Link key={game.href} href={game.href} style={{ textDecoration: "none", display: "block" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              border: "2px solid #1A1208",
              overflow: "hidden",
              transition: "box-shadow 0.15s",
            }}
              className="game-card"
            >
              {/* PREVIEW PANEL */}
              <div style={{
                background: game.bg,
                minHeight: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative" as const,
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 3, background: game.accent }} />
                <div style={{ textAlign: "center" as const }}>
                  <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 8 }}>🏈</div>
                  <div style={{ color: "#FF8200", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" as const, fontFamily: "Impact, Arial Black, sans-serif" }}>
                    {game.subtitle}
                  </div>
                </div>
                <div style={{ position: "absolute" as const, bottom: 14, right: 16, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                  {game.label}
                </div>
              </div>

              {/* INFO PANEL */}
              <div style={{ padding: "28px 28px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", borderLeft: "2px solid #1A1208" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Game</span>
                    {game.badge && (
                      <span style={{ background: "#FF6600", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", padding: "3px 8px", textTransform: "uppercase" as const }}>{game.badge}</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.1, color: "#1A1208", margin: "0 0 6px" }}>{game.title}</h3>
                  <div style={{ fontSize: 11, color: "#FF6600", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: 14 }}>{game.subtitle}</div>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>{game.description}</p>
                </div>
                <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 10, background: "#1A1208", color: "#fff", padding: "11px 22px", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start" as const }}>
                  Play Now →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{\`
        .game-card:hover { box-shadow: 0 4px 24px rgba(255,102,0,0.18); }
        @media (max-width: 768px) {
          .game-card { grid-template-columns: 1fr !important; }
        }
      \`}</style>

      <Footer />
    </main>
  );
}
