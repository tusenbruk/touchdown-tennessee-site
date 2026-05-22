import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Arcade | Touchdown Tennessee",
  description: "Play Crockett's Catwalk — the official Touchdown Tennessee football browser game.",
};

export default function ArcadePage() {
  const Badge = ({ label, color }: { label: string; color: string }) => (
    <span style={{ border: `1.5px solid ${color}`, color, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>{label}</span>
  );

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <Masthead />

      {/* PAGE HEADER */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 40px 20px" }} className="main-container">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <Badge label="Arcade" color="#FF6600" />
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>Play Now</span>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, color: "#1A1208", margin: "12px 0 6px" }}>Crockett&apos;s Catwalk</h2>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.55, fontStyle: "italic", margin: "0 0 0", maxWidth: 600 }}>
          Guide the ball down the catwalk and into the end zone. Arrow keys or tap to play. How far can you take it?
        </p>
      </div>

      {/* GAME */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 40px 52px" }} className="main-container">
        <div style={{ border: "2px solid #1A1208", background: "#1a1030", position: "relative" as const, overflow: "hidden" }}>
          <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 3, background: "#FF6600", zIndex: 1 }} />
          <iframe
            src="/touchdown-tennessee.html"
            style={{ display: "block", width: "100%", height: "640px", border: "none" }}
            title="Crockett's Catwalk — Touchdown Tennessee Arcade"
            allow="autoplay"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
          <span>Arrow keys or tap to play</span>
          <span>Touchdown Tennessee · Vol Nation</span>
        </div>
      </div>

      <Footer />
    </main>
  );
}
