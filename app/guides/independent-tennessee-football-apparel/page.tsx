import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What 'Independent' Tennessee Football Apparel Actually Means",
  description:
    "The honest difference between licensed team merchandise and original fan-made designs: what independent brands can and can&apos;t do, and what you actually get.",
  alternates: { canonical: "/guides/independent-tennessee-football-apparel" },
};

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} style={{ fontSize: 24, fontWeight: 900, margin: "40px 0 14px", lineHeight: 1.2, scrollMarginTop: 80 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 16, lineHeight: 1.75, margin: "0 0 16px", color: "#2A2118" }}>{children}</p>
);

export default function IndependentApparelGuide() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: "What 'Independent' Apparel Actually Means", path: "/guides/independent-tennessee-football-apparel" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/guides", label: "← Guides" }} />

      <article style={{ maxWidth: 720, margin: "40px auto 0", padding: "0 40px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#FF6600", fontWeight: 700, marginBottom: 12 }}>Guide</div>
        <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.12, marginBottom: 14 }}>What &ldquo;Independent&rdquo; Tennessee Football Apparel Actually Means</h1>
        <p style={{ fontSize: 17, color: "#555", fontStyle: "italic", lineHeight: 1.6, marginBottom: 10 }}>
          A plain-English explanation of licensed versus original — because &ldquo;unofficial&rdquo; shouldn&apos;t mean &ldquo;mystery.&rdquo;
        </p>
        <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const, borderBottom: "2px solid #1A1208", paddingBottom: 16, marginBottom: 24 }}>
          By the TDT Desk · Published &amp; reviewed August 21, 2026
        </div>

        <H2 id="licensed">What licensed merchandise is</H2>
        <P>
          When a university or an NFL team licenses merchandise, a manufacturer pays for the right to use the institution&apos;s trademarks — its logos, its wordmarks, its slogans, its exact color-and-symbol combinations. Part of what you pay goes back to the institution. That&apos;s a real and legitimate thing: if you want the official logo on your chest, licensed is the only honest way to get it, and the university bookstore does it well.
        </P>

        <H2 id="independent">What independent means</H2>
        <P>
          Independent fan brands — and there is a long tradition of them in college football towns — make original artwork <em>about</em> the experience of being a fan, without using anyone&apos;s protected marks. No logos. No trademarked slogans. No jersey imitations. What&apos;s left is actually a bigger canvas: the state itself, the mountains, the river, the city, the history, the frontier heritage, the particular feeling of a Saturday in Knoxville or a Sunday in Nashville.
        </P>
        <P>
          That&apos;s the entire TDT design position. Our mark is the shape of Tennessee. Our subjects are the things no one owns: the Smokies at dusk, the 1794 founding of a little Knoxville college, longhunters and powder horns, a river full of boats on game day. If a design ever needs a protected logo to make sense, it&apos;s a bad design by our rules and it doesn&apos;t get made.
        </P>

        <H2 id="difference">The practical differences</H2>
        <P>
          <strong>Money:</strong> with licensed gear, part of the price is the license. With independent gear, you&apos;re paying for the artwork and the garment. Neither is a ripoff; they&apos;re different products.
        </P>
        <P>
          <strong>Design range:</strong> licensed apparel has to pass a brand office. Independent design answers only to taste — which is how you get pieces with a point of view, and occasionally pieces with <Link href="/merch#tasteless" style={{ color: "#FF6600" }}>no class at all, on purpose</Link>.
        </P>
        <P>
          <strong>Scarcity:</strong> our runs are printed on demand. Nothing we make shows up on eight thousand people at the same tailgate.
        </P>
        <P>
          <strong>What you don&apos;t get:</strong> the official logo, and any claim of affiliation. We are fans with a print shop and opinions, and we say so on every page: not affiliated with, sponsored by, or endorsed by the University of Tennessee or the NFL.
        </P>

        <H2 id="how-to-tell">How to tell who you&apos;re buying from</H2>
        <P>
          A trustworthy independent shop tells you it&apos;s independent without being asked, doesn&apos;t imitate official uniforms or logos, and puts a real returns policy where you can find it. If a shop is vague about whether it&apos;s official — that vagueness is the product. Walk.
        </P>

        <div style={{ background: "#1A1208", padding: "22px 26px", margin: "40px 0", display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div>
            <div style={{ color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.24em", textTransform: "uppercase" as const, marginBottom: 6 }}>See for yourself</div>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>The Frontier Collection — every design original</div>
          </div>
          <Link href="/merch" style={{ background: "#FF6600", color: "#fff", padding: "12px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, textDecoration: "none" }}>Browse the Shop →</Link>
        </div>

        <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, borderTop: "1px solid #D4CEC7", paddingTop: 16, marginBottom: 48 }}>
          Touchdown Tennessee is an independent fan publication and brand. Not affiliated with, sponsored by, or endorsed by the University of Tennessee or the NFL.
        </p>
      </article>
      <Footer />
    </main>
  );
}
