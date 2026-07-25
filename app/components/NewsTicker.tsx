export default function NewsTicker() {
  const ticks = [
    "🏈 2026 FOOTBALL SEASON KICKS OFF — Full coverage every game week",
    "🍊 VOLS open vs Chattanooga at Neyland · Sept 6 · Kickoff 7pm ET",
    "🔵 TITANS Training Camp: daily reports from Nashville",
    "📊 Tennessee ranked No. 12 in preseason AP Poll",
    "🏈 THIRD SATURDAY IN OCTOBER · Vols vs Alabama · Sept 20 · TN -3.5",
    "🔥 Follow @TDTennessee for live scores, hot takes, and film room breakdowns",
    "🎙️ Rocky Top Digest newsletter — every Friday morning, game week analysis",
    "💰 Bookie's Nook: Tennessee spreads, moneylines, and best books — see below",
  ];

  const text = ticks.join("          ·          ");

  return (
    <div style={{
      background: "#FF6600",
      overflow: "hidden",
      borderBottom: "2px solid #1A1208",
    }}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div style={{
          background: "#1A1208",
          color: "#FF6600",
          padding: "8px 18px",
          fontSize: 9,
          fontWeight: 900,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          fontFamily: "Georgia, serif",
        }}>
          BREAKING
        </div>
        <div style={{ overflow: "hidden", flex: 1, padding: "8px 12px" }}>
          <div
            className="ticker-scroll"
            style={{
              fontSize: 11,
              fontFamily: "Georgia, serif",
              color: "#fff",
              fontWeight: 600,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap" as const,
              display: "inline-block",
            }}
          >
            {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
          </div>
        </div>
      </div>
    </div>
  );
}
