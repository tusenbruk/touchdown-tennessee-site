import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guides",
  description: "Practical guides from the Touchdown Tennessee desk: gifts for Tennessee football fans, what independent apparel actually means, and more.",
  alternates: { canonical: "/guides" },
};

const GUIDES = [
  {
    href: "/guides/tennessee-football-gifts",
    title: "Gifts for Tennessee Football Fans",
    desc: "What actually lands with a Tennessee football fan — by fan type, budget, and occasion, with honest notes on sizing and made-to-order timing.",
    updated: "August 21, 2026",
  },
  {
    href: "/guides/independent-tennessee-football-apparel",
    title: "What 'Independent' Tennessee Apparel Actually Means",
    desc: "The difference between licensed merchandise and original fan-made designs — why we don't print logos, and what you get instead.",
    updated: "August 21, 2026",
  },
];

export default function GuidesPage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 800, margin: "40px auto 0", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #1A1208", color: "#1A1208", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Guides</span>
          <div style={{ flex: 1, height: 1, background: "#1A1208" }} />
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>The Practical Shelf</h1>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 36, maxWidth: 620 }}>
          Useful, factual, and updated when facts change. No filler.
        </p>

        <div style={{ marginBottom: 56 }}>
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="article-card" style={{ textDecoration: "none", color: "inherit", display: "block", borderBottom: "1px solid #D4CEC7", padding: "22px 0" }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 8px", lineHeight: 1.2 }}>{g.title}</h2>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.55, margin: "0 0 8px" }}>{g.desc}</p>
              <span style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Updated {g.updated}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
