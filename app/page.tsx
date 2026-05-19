export default function Home() {
  const volsArticles = [
    { badge: "Film Room", title: "The Route Combination Killing SEC Defenses", deck: "Tennessee's crossing concept is open every week. Here's why coordinators aren't adjusting.", date: "May 18" },
    { badge: "Recruiting", title: "Four-Star WR Commits — What It Means for 2027", deck: "The Vols landed their second top-50 receiver in the class. The depth chart implications start now.", date: "May 17" },
    { badge: "Analysis", title: "Spring Practice Winners and One Lingering Question", deck: "Three players who helped themselves. One position group that still doesn't have an answer.", date: "May 16" },
  ];
  const titansArticles = [
    { badge: "Gamebook", title: "Containing the Edge Where Everyone Can Rush", deck: "The Titans' defensive scheme is built for one thing. Sunday showed whether it holds up.", date: "May 18" },
    { badge: "Draft", title: "Draft Capital and What Nashville Does With It", deck: "Three picks in the top 60. A GM who trades up. A fanbase that wants answers by September.", date: "May 17" },
    { badge: "Camp", title: "OTA Observations: The Quarterback Situation, Plainly Stated", deck: "No spin. Here is what the depth chart looks like and what it means.", date: "May 15" },
  ];

  const Badge = ({ label, color }: { label: string; color: string }) => (
    <span style={{ border: `1.5px solid ${color}`, color, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>{label}</span>
  );

  // Brass rule divider (dashed, from design sheet)
  const BrassRule = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "0 0 0" }}>
      <div style={{ flex: 1, borderTop: "1px dashed #8B7355", opacity: 0.5 }} />
      <div style={{ width: 4, height: 4, background: "#8B7355", borderRadius: "50%", opacity: 0.5 }} />
      <div style={{ flex: 1, borderTop: "1px dashed #8B7355", opacity: 0.5 }} />
    </div>
  );

  // Ticket perforation divider
  const TicketRule = () => (
    <div style={{ 
      borderTop: "2px dashed #fff", 
      opacity: 0.2, 
      margin: "0 0 24px",
      backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 10px)"
    }} />
  );

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <span>Tuesday, May 19, 2026</span>
        <span>Tennessee Football · Vols · Titans · Rocky Top</span>
        <span>Independent Editorial</span>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <h1 style={{ fontSize: 64, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <div style={{ fontSize: 11, fontWeight: 700, border: "1.5px solid #1A1208", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "0.05em" }}>TT</div>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16, marginBottom: 0 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid #D4CEC7", marginTop: 0 }}>
        {[["Vols Desk","#FF6600"],["Titans Desk","#4B92DB"],["Film Room","#1A1208"],["Recruiting","#1A1208"],["Rocky Top","#1A1208"],["Newsletter","#1A1208"]].map(([label, color], i) => (
          <a key={i} href="#" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none", color, padding: "10px 20px", borderRight: "1px solid #D4CEC7", borderLeft: i === 0 ? "1px solid #D4CEC7" : undefined }}>{label}</a>
        ))}
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>

        {/* HERO */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", borderBottom: "1px solid #D4CEC7", marginTop: 32, paddingBottom: 32 }}>
          <div style={{ paddingRight: 32, borderRight: "1px solid #D4CEC7" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <Badge label="Vols Desk" color="#FF6600" /><span>Game Preview</span>
              <div style={{ flex: 1, height: 1, background: "#FF6600", opacity: 0.3 }} />
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.07, color: "#1A1208", marginBottom: 14 }}>Patience in the Trenches:<br />How Tennessee Wins the Line</h2>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.55, fontStyle: "italic", marginBottom: 16 }}>The Volunteers&apos; offensive line is the story no one is telling. Through four weeks, they have surrendered two sacks. The numbers say something is different this year.</p>
            <BrassRule />
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355", marginTop: 10 }}>By Staff Writer · May 19, 2026 · 4 min read</div>
          </div>
          <div style={{ paddingLeft: 28 }}>
            <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", height: 200, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative" as const }}>
              <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#8B7355", opacity: 0.5 }}>Game Photo</span>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#FF6600" }} />
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, borderBottom: "2px solid #1A1208", paddingBottom: 5, marginBottom: 12 }}>Latest Scores</div>
            {[{badge:"VOLS",color:"#FF6600",score:"28 – 14",game:"Tennessee over Florida · SEC Week 4"},{badge:"TITANS",color:"#4B92DB",score:"21 – 17",game:"Tennessee over Jacksonville · Week 3"}].map((s,i)=>(
              <div key={i} style={{ borderBottom: "1px solid #D4CEC7", paddingBottom: 10, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Badge label={s.badge} color={s.color} />
                  <span style={{ fontWeight: 700, fontSize: 20 }}>{s.score}</span>
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 3 }}>{s.game}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>Final</div>
              </div>
            ))}
          </div>
        </div>

        {/* VOLS */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "36px 0 18px" }}>
          <Badge label="Vols Desk" color="#FF6600" />
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>University of Tennessee Volunteers</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 8 }}>
          {volsArticles.map((a,i)=>(
            <div key={i} style={{ borderTop: "2px solid #FF6600", paddingTop: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.22, marginBottom: 8 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 10 }}>{a.deck}</p>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355", display: "flex", gap: 8, alignItems: "center" }}>
                <Badge label={a.badge} color="#FF6600" /><span>·</span><span>{a.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ margin: "24px 0" }}><BrassRule /></div>

        {/* TITANS */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 18px" }}>
          <Badge label="Titans Desk" color="#4B92DB" />
          <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>Tennessee Titans · NFL</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {titansArticles.map((a,i)=>(
            <div key={i} style={{ borderTop: "2px solid #4B92DB", paddingTop: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.22, marginBottom: 8 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 10 }}>{a.deck}</p>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355", display: "flex", gap: 8, alignItems: "center" }}>
                <Badge label={a.badge} color="#4B92DB" /><span>·</span><span>{a.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* NEWSLETTER — with ticket perforation border */}
      <div style={{ background: "#1A1208", color: "#fff", padding: "36px 40px", textAlign: "center", margin: "0 0 40px", position: "relative" as const }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderTop: "3px dashed rgba(255,255,255,0.15)" }} />
        <h3 style={{ fontSize: 22, letterSpacing: "0.06em", marginBottom: 6 }}>The Rocky Top Digest</h3>
        <TicketRule />
        <p style={{ fontSize: 14, fontStyle: "italic", color: "#aaa", marginBottom: 20 }}>Game-week analysis, delivered Friday morning. No filler.</p>
        <div style={{ display: "flex", maxWidth: 380, margin: "0 auto" }}>
          <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "10px 14px", fontSize: 13, border: "1px solid #333", background: "#2a2010", color: "#fff", outline: "none" }} />
          <button style={{ padding: "10px 18px", background: "#FF6600", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, border: "none", cursor: "pointer" }}>Subscribe</button>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderBottom: "3px dashed rgba(255,255,255,0.15)" }} />
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <footer style={{ borderTop: "3px solid #1A1208", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700 }}>Touchdown Tennessee</div>
          <div style={{ display: "flex", gap: 18, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
            <span>About</span><span>Contact</span><span>Advertise</span>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>Independent editorial · Not affiliated with UT or NFL</div>
        </footer>
      </div>

    </main>
  );
}
