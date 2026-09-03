import type { Metadata } from "next";
import Image from "next/image";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { PHOTOS } from "@/lib/culture";

export const metadata: Metadata = {
  title: "The Place",
  description: "On the river. Built for Saturdays. Independent Tennessee football culture about the stadium and the walk home.",
  alternates: { canonical: "/the-place" },
};

export default function ThePlacePage() {
  const lead = PHOTOS[0];
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "The Place", path: "/the-place" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 860, margin: "40px auto 0", padding: "0 40px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>The Place</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>The Place</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, margin: "0 0 22px" }}>
          On the river. Built for Saturdays. Expanded until a whole state could fit inside the noise.
        </p>

        <figure style={{ margin: "0 0 28px", border: "1px solid #D4CEC7" }}>
          <div style={{ position: "relative", aspectRatio: "4 / 3", background: "#1A1208" }}>
            <Image src={lead.src} alt={lead.alt} fill sizes="860px" style={{ objectFit: "cover" }} priority />
          </div>
          <figcaption style={{ padding: "10px 12px", fontSize: 12, color: "#666", lineHeight: 1.5 }}>
            {lead.caption} Photo: {lead.author} ·{" "}
            <a href={lead.licenseUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#FF6600" }}>{lead.license}</a> ·{" "}
            <a href={lead.filePage} target="_blank" rel="noopener noreferrer" style={{ color: "#8B7355" }}>Wikimedia Commons</a>
          </figcaption>
        </figure>

        <p style={{ fontSize: 16, color: "#333", lineHeight: 1.7, margin: "0 0 16px" }}>
          Shields-Watkins Field became the stadium people still point at when they say “home.” Generations of East Tennesseans learned the walk, the wait, the first roar when the team came out of the tunnel.
        </p>
        <p style={{ fontSize: 16, color: "#333", lineHeight: 1.7, margin: "0 0 16px" }}>
          The checkerboard end zones aren’t decoration to the people who grew up under them — they’re a calendar. Fall means orange. Fall means the river. Fall means someone in your family already has the radio on.
        </p>
        <p style={{ fontSize: 16, color: "#333", lineHeight: 1.7, margin: 0 }}>
          We don’t own the marks. We know the feeling.
        </p>
      </div>
      <Footer />
    </main>
  );
}
