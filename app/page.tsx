import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";
import Masthead from "./components/Masthead";
import { getCatalog, CatalogProduct } from "@/lib/printful";

export const dynamic = "force-dynamic";

// Planned collection lines (per the design program). A line goes live by
// pointing its href at real products; until then it reads "dropping soon"
// honestly — no fake scarcity.
const COLLECTIONS = [
  { name: "The Frontier Collection", desc: "Longhunters, powder horns, and the state that started as the frontier.", href: "/merch", live: true, color: "#FF6600", image: "/art/collection-frontier.png" },
  { name: "Smokies Line", desc: "Mountains at dusk, poster-style. Wall prints and heavyweight tees.", href: null, live: false, color: "#8B7355", image: "/art/collection-smokies.png" },
  { name: "Knoxville City Line", desc: "The river, the skyline, Saturday at 7pm.", href: null, live: false, color: "#4B92DB", image: "/art/collection-knoxville.png" },
  { name: "Tasteless Tennessee", desc: "Rival-flavored. Zero class. All original.", href: "/merch#tasteless", live: true, color: "#1A1208", image: "/art/collection-tasteless.png" },
];

// Shown only when the Printful catalogue is unreachable or empty. Art is the
// approved concept work; Blount College 1794 stays image-free until the
// trademark clearance on that name comes back.
const PLACEHOLDERS: { name: string; image: string | null }[] = [
  { name: "The Frontier Tee", image: "/art/card-frontier-tee.png" },
  { name: "Blount College 1794 Crest", image: null },
  { name: "Smokies Poster Print", image: "/art/card-smokies-print.png" },
  { name: "Powder Horn Mug", image: "/art/card-powder-horn-mug.png" },
  { name: "State Rope Cap", image: "/art/card-state-rope-cap.png" },
  { name: "Frontier Kit Sticker Sheet", image: "/art/card-sticker-sheet.png" },
];

function ProductCard({ p }: { p: CatalogProduct }) {
  return (
    <Link href={`/merch/${p.id}`} className="article-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ borderTop: "3px solid #FF6600", borderBottom: "1px solid #1A1208", paddingBottom: 14 }}>
        <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", borderTop: "none", overflow: "hidden", aspectRatio: "1/1" as const, marginBottom: 12 }}>
          <img src={p.thumbnail} alt={p.name} className="card-image" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>{p.name}</h3>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#FF6600", whiteSpace: "nowrap" }}>{p.samePrice ? `$${p.minPrice}` : `from $${p.minPrice}`}</span>
        </div>
      </div>
    </Link>
  );
}

function PlaceholderCard({ name, image }: { name: string; image: string | null }) {
  return (
    <Link href="/merch" className="article-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ borderTop: "3px solid #FF6600", borderBottom: "1px solid #1A1208", paddingBottom: 14 }}>
        <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", borderTop: "none", aspectRatio: "1/1" as const, marginBottom: 12, position: "relative" as const, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: 10, overflow: "hidden" }}>
          {image ? (
            <img src={image} alt={name} className="card-image" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <img src="/art/tdt-mark-state.png" alt="" style={{ width: "55%", height: "auto", opacity: 0.25 }} />
          )}
          <span style={{ position: image ? "absolute" : "static", bottom: 10, right: 10, background: image ? "#1A1208" : "transparent", color: image ? "#F5EFE4" : "#C0B9AF", padding: image ? "4px 9px" : 0, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" as const, fontWeight: 700 }}>Dropping Soon</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>{name}</h3>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#FF6600", whiteSpace: "nowrap" }}>$—</span>
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const catalog = await getCatalog();
  const featured = catalog.slice(0, 6);

  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      <Masthead />

      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: "#1A1208", color: "#F5EFE4", textAlign: "center", padding: "8px 16px", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase" as const, fontWeight: 700 }}>
        Free US shipping over $75 · New drop every Thursday
      </div>

      <div className="main-container" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>

        {/* FEATURED PRODUCTS */}
        <div style={{ margin: "36px 0 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>The Shop</span>
            <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
            <Link href="/merch" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" as const, textDecoration: "none", color: "#1A1208", fontWeight: 700 }}>Shop All →</Link>
          </div>
          <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 12 }}>
            {featured.length > 0
              ? featured.map((p) => <ProductCard key={p.id} p={p} />)
              : PLACEHOLDERS.slice(0, 6).map((p) => <PlaceholderCard key={p.name} name={p.name} image={p.image} />)}
          </div>
        </div>

        {/* COLLECTIONS */}
        <div style={{ margin: "40px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ border: "1.5px solid #1A1208", color: "#1A1208", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>The Lines</span>
            <div style={{ flex: 1, height: 1, background: "#1A1208" }} />
          </div>
          <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 8 }}>
            {COLLECTIONS.map((c) => {
              const inner = (
                <div style={{ border: "1px solid #D4CEC7", borderTop: `3px solid ${c.color}`, overflow: "hidden", opacity: c.live ? 1 : 0.85 }}>
                  <div style={{ aspectRatio: "21/9" as const, overflow: "hidden", position: "relative" }}>
                    <img src={c.image} alt="" className="card-image" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: c.live ? "none" : "grayscale(0.4)" }} />
                    {!c.live && (
                      <span style={{ position: "absolute", top: 10, right: 10, background: "#1A1208", color: "#F5EFE4", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, padding: "4px 10px" }}>Dropping Soon</span>
                    )}
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 4px" }}>{c.name}</h3>
                    <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <Link key={c.name} href={c.href} className="article-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>{inner}</Link>
              ) : (
                <div key={c.name}>{inner}</div>
              );
            })}
          </div>
        </div>

        {/* THE POSITION */}
        <div style={{ borderTop: "1px solid #D4CEC7", borderBottom: "1px solid #D4CEC7", margin: "40px 0", padding: "28px 0", display: "flex", flexWrap: "wrap" as const, gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
            Every design here is original artwork. No licensed logos, no bookstore markup, nothing you&apos;ll see on eight thousand other people at the tailgate. Independent and unlicensed — on purpose.
          </p>
          <Link href="/guides/independent-tennessee-football-apparel" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6600", textDecoration: "none", whiteSpace: "nowrap" as const }}>
            What that means →
          </Link>
        </div>

        {/* GAMES DRAW */}
        <div style={{ background: "#1A1208", margin: "0 -40px 40px", padding: "32px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", padding: "4px 10px", textTransform: "uppercase" as const }}>The Game Room</span>
            <div style={{ flex: 1, height: 1, background: "#FF6600", opacity: 0.4 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#8a8074" }}>Free · No login · Big scores earn shop discounts</span>
          </div>
          <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { href: "/games/tennessee-football-trivia", title: "Daily Trivia", desc: "Ten questions on Tennessee football history. Same round for everyone." },
              { href: "/games/saturday-score", title: "Saturday Score", desc: "Five clues, one answer. Solve early, score big." },
              { href: "/arcade", title: "Tennessee Rifleman", desc: "The arcade hunt. Score 3,000+ and earn 15% off the shop." },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="hot-take-card" style={{ textDecoration: "none", display: "block", border: "2px solid #FF6600", padding: "16px 18px" }}>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 900, marginBottom: 6 }}>{g.title}</div>
                <div style={{ color: "#C9BFAF", fontSize: 12, lineHeight: 1.5 }}>{g.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER — the drop list */}
      <div style={{ background: "#1A1208", color: "#fff", padding: "0", margin: "0 0 40px", position: "relative" as const, overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", width: "45%", opacity: 0.12 }}>
          <Image src="/art/tdt-mark-state.png" alt="" width={385} height={134} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderTop: "3px dashed rgba(255,255,255,0.15)" }} />
        <div style={{ padding: "36px 40px", textAlign: "center", position: "relative" as const }}>
          <h3 style={{ fontSize: 22, letterSpacing: "0.06em", marginBottom: 6 }}>The Drop List</h3>
          <p style={{ fontSize: 14, fontStyle: "italic", color: "#aaa", marginBottom: 20 }}>First look at every Thursday drop, plus code WELCOME10 for 10% off your first order.</p>
          <NewsletterForm />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderBottom: "3px dashed rgba(255,255,255,0.15)" }} />
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "3px solid #1A1208", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700 }}>Touchdown Tennessee</div>
          <div style={{ display: "flex", gap: 18, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
            <Link href="/merch" style={{ color: "#8B7355", textDecoration: "none" }}>Shop</Link>
            <Link href="/games" style={{ color: "#8B7355", textDecoration: "none" }}>Games</Link>
            <Link href="/guides" style={{ color: "#8B7355", textDecoration: "none" }}>Guides</Link>
            <Link href="/about" style={{ color: "#8B7355", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ color: "#8B7355", textDecoration: "none" }}>Contact</Link>
            <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" style={{ color: "#8B7355", textDecoration: "none" }}>@TDTennessee</a>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "#8B7355", maxWidth: 320 }}>
            Independent fan brand. Not affiliated with, sponsored by, or endorsed by the University of Tennessee or the NFL.
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 10, color: "#D4CEC7", letterSpacing: "0.08em" }}>
          touchdowntennessee.com
        </div>
      </footer>
    </main>
  );
}
