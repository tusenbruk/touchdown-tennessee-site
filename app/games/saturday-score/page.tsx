import type { Metadata } from "next";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import ScoreClient from "./ScoreClient";

export const metadata: Metadata = {
  title: "Saturday Score — Daily Tennessee Football Puzzle",
  description:
    "Five clues, one answer from Tennessee football history. The fewer clues you need, the better your score. A new puzzle every day.",
  alternates: { canonical: "/games/saturday-score" },
};

export default function SaturdayScorePage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Games", path: "/games" },
              { name: "Saturday Score", path: "/games/saturday-score" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/games", label: "← Games" }} />
      <ScoreClient />
      <Footer showNewsletter={false} />
    </main>
  );
}
