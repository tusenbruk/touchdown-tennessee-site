import type { Metadata } from "next";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { DAYS_THAT_MATTER } from "@/lib/culture";

export const metadata: Metadata = {
  title: "Days That Matter",
  description: "Six Saturdays people still tell at the tailgate — Florida 1998, Fiesta Bowl 1999, Georgia 2007, Florida 2016, Alabama 2022 and 2024.",
  alternates: { canonical: "/days-that-matter" },
};

export default function DaysThatMatterPage() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Days That Matter", path: "/days-that-matter" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 1080, margin: "40px auto 0", padding: "0 40px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>History</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 10 }}>Days That Matter</h1>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", margin: "0 0 28px", maxWidth: 640 }}>
          Not a full encyclopedia. Just the Saturdays people still tell at the tailgate.
        </p>

        <div className="article-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          {DAYS_THAT_MATTER.map((d, i) => (
            <article key={`${d.year}-${d.opponent}`} style={{ border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600", padding: "20px 20px 22px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#8B7355", marginBottom: 8 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 10px", lineHeight: 1.2 }}>
                {d.year} · {d.opponent}
              </h2>
              <p style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.5 }}>{d.detail}</p>
              {d.why ? <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.55 }}>{d.why}</p> : null}
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
