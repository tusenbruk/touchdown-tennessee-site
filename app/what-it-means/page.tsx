import type { Metadata } from "next";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What It Means",
  description: "Tennessee football culture beyond the scoreboard — drives over the mountains, family radios, and Saturdays that keep coming.",
  alternates: { canonical: "/what-it-means" },
};

export default function WhatItMeansPage() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "What It Means", path: "/what-it-means" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 760, margin: "40px auto 0", padding: "0 40px 56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #4B92DB", color: "#4B92DB", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Culture</span>
          <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 18 }}>What It Means</h1>
        <p style={{ fontSize: 17, color: "#333", lineHeight: 1.75, margin: "0 0 16px" }}>
          Tennessee football isn’t only a scoreboard. It’s the drive over the mountains. It’s a kid in an oversized shirt. It’s alumni in Sydney and Singapore still checking kickoff times like they’re late for church.
        </p>
        <p style={{ fontSize: 17, color: "#333", lineHeight: 1.75, margin: "0 0 16px" }}>
          It’s hospitality that runs hot until the whistle — then the joke gets sharper. It’s arguing about coaching on Monday and forgiving by Thursday because Saturday is coming again.
        </p>
        <p style={{ fontSize: 17, color: "#333", lineHeight: 1.75, margin: 0 }}>
          Touchdown Tennessee is an independent corner of that culture. Original art. Plain talk. No bookstore shelf required.
        </p>
      </div>
      <Footer />
    </main>
  );
}
