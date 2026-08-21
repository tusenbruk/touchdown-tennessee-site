import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { getCatalog } from "@/lib/printful";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Frontier Collection | Touchdown Tennessee",
  description: "Independent Tennessee football merchandise. Original designs, built for fans — not the bookstore.",
};

export default async function MerchPage() {
  const products = await getCatalog();

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      <Masthead backLink={{ href: "/", label: "← Home" }} />

      {/* BANNER */}
      <div style={{ width: "100%", maxHeight: 280, overflow: "hidden", borderBottom: "3px solid #FF6600" }}>
        <Image src="/vols-stadium-charge.png" alt="The Frontier Collection" width={1800} height={600} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center 40%" }} priority />
      </div>

      {/* HEADER */}
      <div style={{ maxWidth: 1080, margin: "48px auto 0", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Shop</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>The Frontier Collection</h2>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 8, maxWidth: 640 }}>
          Independent editorial gear. No licensed marks. No bookstore markup. Built for fans who actually watch the tape.
        </p>
        <p style={{ fontSize: 12, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 40 }}>
          Fulfilled by Printful · Ships in 3–5 business days
        </p>

        {/* PRODUCT GRID */}
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#8B7355", fontSize: 14, fontStyle: "italic" }}>
            Collection dropping soon. Check back shortly.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginBottom: 64 }}>
            {products.map((product) => (
              <div key={product.id} style={{ borderTop: "2px solid #FF6600", paddingTop: 20 }}>
                {/* Product image */}
                <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", marginBottom: 16, overflow: "hidden", aspectRatio: "1/1" }}>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Name + price */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{product.name}</h3>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#FF6600", whiteSpace: "nowrap", marginLeft: 8 }}>
                    {product.samePrice ? `$${product.minPrice}` : `$${product.minPrice}–$${product.maxPrice}`}
                  </span>
                </div>

                {/* Colors */}
                {product.colors.length > 0 && (
                  <p style={{ fontSize: 12, color: "#8B7355", margin: "0 0 8px", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                    {product.colors.join(" · ")}
                  </p>
                )}

                {/* Sizes */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const, marginBottom: 16 }}>
                  {product.sizes.map((size: string) => (
                    <span key={size} style={{ border: "1px solid #D4CEC7", padding: "3px 8px", fontSize: 10, color: "#555", letterSpacing: "0.06em" }}>{size}</span>
                  ))}
                </div>

                {/* CTA — links to Printful popup or product page */}
                <a
                  href={`/merch/${product.id}`}
                  style={{ display: "block", background: "#1A1208", color: "#fff", padding: "11px 16px", textAlign: "center", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none" }}
                >
                  Shop Now →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TASTELESS TENNESSEE */}
        <div id="tasteless" style={{ background: "#1A1208", margin: "0 -40px 48px", padding: "36px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", padding: "4px 10px", textTransform: "uppercase" as const }}>Tasteless Tennessee</span>
            <div style={{ flex: 1, height: 1, background: "#FF6600", opacity: 0.4 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#8a8074" }}>Rival-flavored · Zero class · All original</span>
          </div>
          <p style={{ color: "#C9BFAF", fontSize: 14, fontStyle: "italic", maxWidth: 560, lineHeight: 1.6, marginBottom: 24 }}>
            The line your mother-in-law won&apos;t get for Christmas. Strong opinions about certain reptiles, elephants, and bulldogs — expressed in 100% original artwork, no rival trademarks harmed.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { name: "Gator Tears Sweet Tea Glass", tag: "For sipping in October" },
              { name: "Elephant Graveyard Cap", tag: "Third Saturday state of mind" },
              { name: "Bulldog Obedience School Tee", tag: "Sit. Stay. Lose." },
            ].map((p, i) => (
              <div key={i} style={{ border: "2px solid #FF6600", padding: 0 }}>
                <div style={{ aspectRatio: "1/1" as const, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: 10, background: "rgba(255,102,0,0.06)" }}>
                  <span style={{ fontSize: 34 }}>🔥</span>
                  <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#8a8074", fontWeight: 700 }}>Dropping Soon</span>
                </div>
                <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,102,0,0.4)" }}>
                  <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, lineHeight: 1.25, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ color: "#8a8074", fontSize: 11, fontStyle: "italic" }}>{p.tag}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "#6a6156", fontSize: 10, marginTop: 18, lineHeight: 1.6 }}>
            All in good fun. Designs reference rivalry culture generically and use no rival school or team trademarks.
          </p>
        </div>

        {/* LEGAL */}
        <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 24, marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, maxWidth: 640 }}>
            Touchdown Tennessee is an independent editorial brand. All merchandise uses original designs and does not incorporate any officially licensed University of Tennessee, NFL, or Tennessee Titans marks, logos, or trademarks. Not affiliated with, endorsed by, or connected to the University of Tennessee or the Tennessee Titans.
          </p>
        </div>

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginBottom: 40, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>The Frontier Collection</span>
        </div>
      </div>
    </main>
  );
}
