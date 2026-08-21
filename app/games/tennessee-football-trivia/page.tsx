import type { Metadata } from "next";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import TriviaClient from "./TriviaClient";

export const metadata: Metadata = {
  title: "Tennessee Football Trivia — Daily Round",
  description:
    "Ten questions a day on Tennessee football: Vols history, Titans lore, coaches, bowls, venues, and culture. Same round for everyone — compare scores with your section.",
  alternates: { canonical: "/games/tennessee-football-trivia" },
};

export default function TriviaPage() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Games", path: "/games" },
              { name: "Tennessee Football Trivia", path: "/games/tennessee-football-trivia" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/games", label: "← Games" }} />
      <TriviaClient />
      <Footer showNewsletter={false} />
    </main>
  );
}
