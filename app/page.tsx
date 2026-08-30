import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";
import Masthead from "./components/Masthead";
import { getCatalog, CatalogProduct } from "@/lib/printful";

export const dynamic = "force-dynamic";

// Lead order for the homepage grid, by Printful sync product id — Signature
// Tee, Blount Class of 1794, Signature Hat. Explicit ids, not a slice of the
// catalog: this is the only trio the homepage is allowed to lead with.
const LEAD_PRODUCT_IDS = [434160067, 434189214, 434160148];

// Planned collection lines (per the design program). A line goes live by
// pointing its href at real products; until then it reads "dropping soon"
// honestly — no fake scarcity.
const COLLECTIONS = [
  { name: "The Frontier Collection", desc: "Longhunters, powder horns, and the state that started as the frontier.", href: "/merch", live: true, color: "#FF6600", image: "/art/collection-frontier.png" },
  { name: "Smokies Line", desc: "Mountains at dusk, poster-style. Wall prints and heavyweight tees.", href: null, live: false, color: "#8B7355", image: "/art/collection-smokies.png" },
  { name: "Knoxville City Line", desc: "The river, the skyline, Saturday at 7pm.", href: null, live: false, color: "#4B92DB", image: "/art/collection-knoxville.png" },
  { name: "Tasteless Tennessee", desc: "Rival-flavored. Zero class. All original.", href: "/merch#tasteless", live: true, color: "#1A1208", image: "/art/collection-tasteless.png" },
];

// Shown only when the Printful catalogue is unreachable or empty — same
// three-product lead as the live grid, not the full six. Art is the approved
// concept work; Blount Class of 1794 stays image-free until the trademark
// clearance on that name comes back.
const PLACEHOLDERS: { name: string; image: string | null }[] = [
  { name: "The Signature Tee", image: "/art/card-frontier-tee.png" },
  { name: "Blount Class of 1794", image: null },
  { name: "The Signature Hat", image: "/art/card-state-rope-cap.png" },
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
  // Lead with exactly the three in-stock products, in this order. Anything
  // else — MagSafe included — stays off the homepage grid; MagSafe is still
  // reachable via its own product page, just not featured here.
  const byId = new Map(catalog.map((p) => [p.id, p]));
  const featured = LEAD_PRODUCT_IDS.map((id) => byId.get(id)).filter((p): p is CatalogProduct => Boolean(p));

  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      <Masthead />

      {/* TICKER — playful, scrolling, not a static shipping-bar. Reuses the
          .ticker-scroll keyframe already defined in globals.css: content is
          duplicated once so the -50% loop point is seamless. */}
      <div style={{ background: "#1A1208", color: "#F5EFE4", overflow: "hidden", borderBottom: "1px solid rgba(255,102,0,0.35)" }}>
        <div className="ticker-scroll" style={{ display: "flex", width: "max-content", whiteSpace: "nowrap" as const, padding: "8px 0" }}>
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {["New drop every Thursday", "Not the bookstore", "Ships in 3–5 days, not Saturday"].map((t, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "0 22px", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase" as const, fontWeight: 700 }}>{t}</span>
                  <span style={{ color: "#FF6600" }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* KICKOFF HERO — full-bleed collection art with the state mark as a
          corner watermark. Independent original goods only: no licensed
          marks or nicknames, and no delivery-by-Saturday promise — Printful
          ships in 3–5 business days. Exact copy per the kickoff-week brief.
          Scheduled through Wed 2026-09-02; keep this hero into Thursday too
          unless a real Frontier Printful SKU exists to replace it — don't
          swap in New Skin/Frontier art as if it were a live product. */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "clamp(380px, 52vw, 560px)", display: "flex", alignItems: "flex-end", borderBottom: "3px solid #FF6600" }}>
        <Image src="/art/collection-frontier.png" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,18,8,0.30) 0%, rgba(26,18,8,0.88) 100%)" }} />
        <Image src="/art/tdt-mark-state.png" alt="" width={385} height={134} style={{ position: "absolute", top: 20, right: 24, width: "clamp(90px, 12vw, 150px)", height: "auto", opacity: 0.85 }} />
        <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "0 40px 40px", width: "100%", color: "#F5EFE4" }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", padding: "4px 10px", textTransform: "uppercase" as const }}>Saturday · 3:30 ET · Knoxville</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.08, margin: "18px 0 10px", maxWidth: 720 }}>
            Kickoff is this week. Your new shirt is not.
          </h1>
          <p style={{ fontSize: 15, color: "#E7DFD1", lineHeight: 1.6, maxWidth: 620, margin: "0 0 22px" }}>
            Printful is 3–5 days. We will not fake Saturday. The Signature T
            is $19, Blount College is the heritage one, the hat is the one
            people steal.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" as const }}>
            <Link href="/merch/434160067" style={{ background: "#FF6600", color: "#fff", padding: "13px 26px", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none" }}>Get the Signature T →</Link>
            <Link href="/merch/434160148" style={{ color: "#F5EFE4", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, textDecoration: "underline", textUnderlineOffset: 3 }}>Shop the hat →</Link>
          </div>
        </div>
      </section>

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
              : PLACEHOLDERS.map((p) => <PlaceholderCard key={p.name} name={p.name} image={p.image} />)}
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
          <p style={{ fontSize: 14, fontStyle: "italic", color: "#aaa", marginBottom: 10 }}>First look at every Thursday drop.</p>
          {/* Copy-only preview of what the signup actually sends — no ESP
              subject line is wired here, this is just an honest preview. */}
          <p style={{ fontSize: 11, color: "#8a8074", letterSpacing: "0.01em", marginBottom: 20, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
            What lands in your inbox: <span style={{ color: "#C9BFAF" }}>&ldquo;Kickoff Saturday. The tee is $19.&rdquo;</span> Printful will not make Saturday. Buy it anyway.
          </p>
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
