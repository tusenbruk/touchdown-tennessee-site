import Masthead from "@/app/components/Masthead";
import Link from "next/link";

export const metadata = {
  title: "About | Touchdown Tennessee",
  description: "Touchdown Tennessee is an independent editorial sports media brand covering the University of Tennessee Volunteers and the Tennessee Titans.",
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
            Touchdown Tennessee is an independent editorial sports media brand covering the University of Tennessee Volunteers and the Tennessee Titans. We are not affiliated with, endorsed by, or connected to the University of Tennessee, the NFL, or the Tennessee Titans organization.
          </p>

          <p style={{ marginBottom: 20 }}>
            Tennessee has two serious football programs and one of the most passionate fan bases in American sport. We believe it deserves independent, editorially sharp coverage that isn't filtered through official channels or beholden to access journalism.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>Our Coverage</h3>

          <p style={{ marginBottom: 20 }}>
            Touchdown Tennessee covers both programs under one roof — the Vols Desk for University of Tennessee football, and the Titans Desk for NFL coverage. Our editorial voice is direct, analytically grounded, and written for fans who actually watch the tape.
          </p>

          <p style={{ marginBottom: 20 }}>
            Content is published daily and covers game previews and recaps, recruiting analysis, film room breakdowns, roster moves, historical features, and the Bookie's Nook odds section.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>Our Writers</h3>

          <p style={{ marginBottom: 12 }}><strong>Huck Denton</strong> — Vols Desk. Maryville native, 40 years watching Tennessee football. Deadpan and specific.</p>
          <p style={{ marginBottom: 12 }}><strong>Cal Merritt</strong> — Film Room. Former walk-on. Watches more tape than anyone in the press box.</p>
          <p style={{ marginBottom: 12 }}><strong>Ned Bowman</strong> — SEC Analysis. Veteran media voice. Will ask the question nobody else will.</p>
          <p style={{ marginBottom: 20 }}><strong>Ray Pickard</strong> — Titans Desk. Has covered Nashville football since the franchise arrived. Gruff, honest, loyal to the fanbase.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>Independence</h3>

          <p style={{ marginBottom: 20 }}>
            Touchdown Tennessee is independently owned and operated. We are not a licensed affiliate of the University of Tennessee or the Tennessee Titans. Our merchandise line — the Rocky Top Collection — uses original designs and does not incorporate any officially licensed marks or logos.
          </p>

          <p style={{ marginBottom: 20 }}>
            Our site is supported by display advertising and affiliate partnerships. The Bookie's Nook section contains affiliate links to licensed sports betting operators. We earn a commission when readers sign up through our links. Gambling content is intended for adults 21+ in jurisdictions where sports betting is legal.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 12px" }}>Contact</h3>

          <p style={{ marginBottom: 20 }}>
            For editorial inquiries, advertising, or general questions, visit our <Link href="/contact" style={{ color: "#FF6600", textDecoration: "underline" }}>Contact page</Link>.
          </p>
        </div>

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginTop: 48, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em" }}>Touchdown Tennessee · Independent Editorial</span>
        </div>
      </div>
    </main>
  );
}
