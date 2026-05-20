import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tennessee Volunteers 2026 Roster | Touchdown Tennessee",
  description: "Full roster for the University of Tennessee Volunteers football team — players, positions, jersey numbers.",
};

interface Player {
  id: string;
  fullName: string;
  jersey: string;
  position: { abbreviation: string; displayName: string };
  height: number;
  weight: number;
  experience: { displayValue: string };
  birthPlace?: { city?: string; state?: string; displayText?: string };
  headshot?: { href: string };
}

interface RosterGroup {
  position: string;
  items: Player[];
}

function formatHeight(inches: number) {
  if (!inches) return "—";
  const ft = Math.floor(inches / 12);
  const ins = inches % 12;
  return `${ft}'${ins}"`;
}

export default async function VolsRosterPage() {
  let groups: RosterGroup[] = [];
  let teamName = "Tennessee Volunteers";

  try {
    const res = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/2633/roster",
      { cache: "no-store" }
    );
    const data = await res.json();
    groups = data.athletes || [];
    teamName = data.team?.displayName || teamName;
  } catch (e) {
    console.error("Roster fetch error:", e);
  }

  const positionOrder = ["Offense", "Defense", "Special Teams"];
  const sorted = [...groups].sort(
    (a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  );

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B7355" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#8B7355" }}>← Touchdown Tennessee</Link>
        <span>Tennessee Football · Vols · Titans · Rocky Top</span>
        <span>Independent Editorial</span>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <img src="/tdt-logo.png" alt="Touchdown Tennessee" style={{ height: 36, width: "auto", display: "block" }} />
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* BANNER */}
      <div style={{ width: "100%", maxHeight: 300, overflow: "hidden", borderBottom: "3px solid #FF6600" }}>
        <Image src="/vols-stadium-charge.png" alt="Tennessee Volunteers" width={1800} height={600} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center 30%" }} priority />
      </div>

      {/* HEADER */}
      <div style={{ maxWidth: 1080, margin: "40px auto 0", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" }}>Vols Desk</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, color: "#1A1208", marginBottom: 4 }}>{teamName}</h2>
        <p style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 32 }}>2026 Roster · Via ESPN</p>

        {sorted.map((group) => (
          <div key={group.position} style={{ marginBottom: 48 }}>
            {/* Group header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0, color: "#1A1208" }}>{group.position}</h3>
              <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
            </div>

            {/* Table */}
            <div style={{ border: "1px solid #D4CEC7", overflow: "hidden" }}>
              {/* Header row */}
              <div style={{ display: "grid", gridTemplateColumns: "48px 48px 1fr 80px 80px 80px 100px 140px", background: "#1A1208", color: "#fff", padding: "8px 16px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", gap: 8 }}>
                <span>#</span>
                <span>Photo</span>
                <span>Name</span>
                <span>Pos</span>
                <span>Ht</span>
                <span>Wt</span>
                <span>Year</span>
                <span>Hometown</span>
              </div>

              {group.items.map((player, i) => (
                <div key={player.id} style={{ display: "grid", gridTemplateColumns: "48px 48px 1fr 80px 80px 80px 100px 140px", padding: "10px 16px", borderTop: "1px solid #D4CEC7", background: i % 2 === 0 ? "#fff" : "#FAFAF8", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#FF6600" }}>{player.jersey || "—"}</span>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#F0EDE8", flexShrink: 0 }}>
                    {player.headshot?.href ? (
                      <img src={player.headshot.href} alt={player.fullName} width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 36, height: 36, background: "#1A1208", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6600", fontSize: 11, fontWeight: 700 }}>
                        {player.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{player.fullName}</span>
                  <span style={{ fontSize: 12, color: "#8B7355" }}>{player.position?.abbreviation || "—"}</span>
                  <span style={{ fontSize: 12, color: "#555" }}>{formatHeight(player.height)}</span>
                  <span style={{ fontSize: 12, color: "#555" }}>{player.weight ? `${player.weight} lbs` : "—"}</span>
                  <span style={{ fontSize: 12, color: "#555" }}>{player.experience?.displayValue || "—"}</span>
                  <span style={{ fontSize: 11, color: "#555" }}>{player.birthPlace?.displayText || (player.birthPlace?.city ? `${player.birthPlace.city}, ${player.birthPlace.state}` : "—")}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginBottom: 40, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B7355" }}>Data via ESPN · Updated live</span>
        </div>
      </div>
    </main>
  );
}
