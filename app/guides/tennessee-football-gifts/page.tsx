import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gifts for Tennessee Football Fans",
  description:
    "A practical gift guide for Tennessee football fans: what works by fan type and budget, honest sizing advice, and what made-to-order really means for delivery timing.",
  alternates: { canonical: "/guides/tennessee-football-gifts" },
};

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} style={{ fontSize: 24, fontWeight: 900, margin: "40px 0 14px", lineHeight: 1.2, scrollMarginTop: 80 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 16, lineHeight: 1.75, margin: "0 0 16px", color: "#2A2118" }}>{children}</p>
);

export default function GiftsGuide() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: "Gifts for Tennessee Football Fans", path: "/guides/tennessee-football-gifts" },
            ])
          ),
        }}
      />
      <Masthead backLink={{ href: "/guides", label: "← Guides" }} />

      <article style={{ maxWidth: 720, margin: "40px auto 0", padding: "0 40px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#FF6600", fontWeight: 700, marginBottom: 12 }}>Guide</div>
        <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.12, marginBottom: 14 }}>Gifts for Tennessee Football Fans</h1>
        <p style={{ fontSize: 17, color: "#555", fontStyle: "italic", lineHeight: 1.6, marginBottom: 10 }}>
          What actually lands, by fan type and budget — with the sizing and timing honesty most gift guides skip.
        </p>
        <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const, borderBottom: "2px solid #1A1208", paddingBottom: 16, marginBottom: 8 }}>
          By the TDT Desk · Published &amp; reviewed August 21, 2026
        </div>

        {/* TOC */}
        <nav aria-label="Contents" style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", padding: "14px 20px", margin: "20px 0 8px", fontSize: 13 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#8B7355", marginBottom: 8 }}>In this guide</div>
          {[
            ["#fan-types", "Match the gift to the fan"],
            ["#budget", "By budget"],
            ["#sizing", "Sizing without the guesswork"],
            ["#timing", "Made-to-order timing, honestly"],
            ["#licensed", "A note on licensed vs. original"],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ display: "block", color: "#1A1208", textDecoration: "none", padding: "3px 0" }}>→ {label}</a>
          ))}
        </nav>

        <H2 id="fan-types">Match the gift to the fan</H2>
        <P>
          There are, roughly, four kinds of Tennessee football fan, and they do not want the same gift.
        </P>
        <P>
          <strong>The lifer</strong> has watched every game since before you were making gift decisions. They own plenty of gear already, which means the generic stuff is wasted on them. What works is something with a point of view — a design that references the history they lived through, or a print for the wall of the room where they watch the games. They will notice original artwork precisely because they own everything official.
        </P>
        <P>
          <strong>The Saturday social fan</strong> goes for the tailgate as much as the game. Caps and comfortable tees win here — things that work at a cookout, not just in a stadium seat. If they host, drinkware gets used weekly in a way a jersey never will.
        </P>
        <P>
          <strong>The transplant</strong> moved away and misses it. Anything that says <em>Tennessee</em> and <em>home</em> more than it says <em>team</em> tends to hit — state-outline designs, Knoxville and Smokies imagery. It&apos;s homesickness merchandise, in the best way.
        </P>
        <P>
          <strong>The new fan</strong> — a kid, a new partner pulled into the orbit, a freshman — needs the low-commitment entry point: a sticker for the laptop, a simple tee. Don&apos;t buy the expensive thing for someone still deciding how much of their identity this will be. It will be decided for them by November.
        </P>

        <H2 id="budget">By budget</H2>
        <P>
          <strong>Under $15:</strong> stickers and small accessories. Genuinely good gifts for stockings and care packages, and the only category you can buy without knowing a size.
        </P>
        <P>
          <strong>$20–$35:</strong> the tee and cap zone, where most gift-giving happens. A well-chosen tee in the right size beats an expensive item in the wrong one — see sizing below.
        </P>
        <P>
          <strong>$40–$60:</strong> hoodies, crewnecks, and prints. This is the &ldquo;they&apos;ll think of you every time they wear it&rdquo; range, and where original artwork matters most: at this price the design is the gift.
        </P>
        <P>
          Current stock and prices live in <Link href="/merch" style={{ color: "#FF6600" }}>the shop</Link> — everything there is our own original artwork, printed on demand.
        </P>

        <H2 id="sizing">Sizing without the guesswork</H2>
        <P>
          Print-on-demand apparel runs on standard unisex blanks. Two practical rules cover ninety percent of gift-sizing mistakes: when the recipient is between sizes, size up — a slightly roomy tee gets worn, a slightly tight one doesn&apos;t. And for hoodies specifically, most people prefer one size above their tee size.
        </P>
        <P>
          Every product page in the shop carries a size guide with actual garment measurements. Thirty seconds with a tape measure on a shirt that already fits them well is the most reliable method ever devised.
        </P>

        <H2 id="timing">Made-to-order timing, honestly</H2>
        <P>
          Everything in the shop is printed when you order it — nothing sits in a warehouse. Production typically takes 3–5 business days before shipping. That&apos;s the honest trade of made-to-order: no waste and no stockouts, but it is not built for the birthday that is tomorrow.
        </P>
        <P>
          The practical rule: order ten days or more ahead for anything date-specific, longer in December. If you&apos;re inside that window, a gift note with a picture of the incoming item has saved many a giver before you.
        </P>

        <H2 id="licensed">A note on licensed vs. original</H2>
        <P>
          Nothing we sell is licensed by the University of Tennessee or the NFL, and nothing pretends to be — no logos, no trademarks, no jersey knockoffs. What you&apos;re buying is original artwork by people who care about this the way the recipient does. If the person on your list wants official gear, the university bookstore does that well. If they&apos;d enjoy something nobody else in their section is wearing, that&apos;s <Link href="/guides/independent-tennessee-football-apparel" style={{ color: "#FF6600" }}>what independent means</Link> — and it&apos;s us.
        </P>

        <div style={{ background: "#1A1208", padding: "22px 26px", margin: "40px 0", display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div>
            <div style={{ color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.24em", textTransform: "uppercase" as const, marginBottom: 6 }}>The Shop</div>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Original Tennessee football designs, printed to order</div>
          </div>
          <Link href="/merch" style={{ background: "#FF6600", color: "#fff", padding: "12px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, textDecoration: "none" }}>Browse the Collection →</Link>
        </div>

        <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, borderTop: "1px solid #D4CEC7", paddingTop: 16, marginBottom: 48 }}>
          Touchdown Tennessee is an independent fan publication and brand. Not affiliated with, sponsored by, or endorsed by the University of Tennessee or the NFL.
        </p>
      </article>
      <Footer />
    </main>
  );
}
