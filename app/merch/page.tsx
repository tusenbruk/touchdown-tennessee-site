import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rocky Top Collection | Touchdown Tennessee",
  description: "Independent Tennessee football merchandise. The Rocky Top Collection — built for fans, not the bookstore.",
};

// Placeholder collection items until Printful products are live
const COLLECTION = [
  {
    id: "rocky-top-tee",
    name: "Rocky Top Tee",
    description: "Bella + Canvas 3001. Dark navy. Tennessee orange type. The one you wear to every game.",
    price: "$32",
    image: "/vols-runningback.png",
    badge: "Vols",
    badgeColor: "#FF6600",
    sizes: ["S", "M", "L", "XL", "2XL"],
    comingSoon: false,
  },
  {
    id: "rocky-top-hoodie",
    name: "Rocky Top Hoodie",
    description: "Gildan Heavy Blend. Dark navy. Midweight. The kind you keep for a decade.",
    price: "$58",
    image: "/vols-stadium-charge.png",
    badge: "Vols",
    badgeColor: "#FF6600",
    sizes: ["S", "M", "L", "XL", "2XL"],
    comingSoon: false,
  },
  {
    id: "vol-walk-hat",
    name: "Vol Walk Hat",
    description: "Structured dad hat. Tennessee orange. The TT monogram stamp on the front.",
    price: "$28",
    image: "/volwalk-banner.png",
    badge: "Vols",
    badgeColor: "#FF6600",
    sizes: ["One Size"],
    comingSoon: true,
  },
  {
    id: "titans-desk-tee",
    name: "Titans Desk Tee",
    description: "Bella + Canvas 3001. Steel blue. For the Nashville faithful.",
    price: "$32",
    image: "/titans-stadium-charge.png",
    badge: "Titans",
    badgeColor: "#4B92DB",
    sizes: ["S", "M", "L", "XL", "2XL"],
    comingSoon: true,
  },
];

export default function MerchPage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#8B7355" }}>← Touchdown Tennessee</Link>
        <span>Tennessee Football · Vols · Titans · Rocky Top</span>
        <span>Independent Editorial</span>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <div style={{ fontSize: 11, fontWeight: 700, border: "1.5px solid #1A1208", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>TT</div>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* BANNER */}
      <div style={{ width: "100%", maxHeight: 280, overflow: "hidden", borderBottom: "3px solid #FF6600" }}>
        <Image src="/vols-stadium-charge.png" alt="Rocky Top Collection" width={1800} height={600} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center 40%" }} priority />
      </div>

      {/* COLLECTION HEADER */}
      <div style={{ maxWidth: 1080, margin: "48px auto 0", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Merch</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>The Rocky Top Collection</h2>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 8, maxWidth: 640 }}>
          Independent editorial gear. No licensed marks. No bookstore markup. Just good material and a brand built for people who actually watch the tape.
        </p>
        <p style={{ fontSize: 12, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 40 }}>
          Fulfilled by Printful · Ships in 3–5 business days · Free returns
        </p>

        {/* PRODUCT GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40, marginBottom: 64 }}>
          {COLLECTION.map((product) => (
            <div key={product.id} style={{ borderTop: `2px solid ${product.badgeColor}`, paddingTop: 24 }}>
              {/* Product image */}
              <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", height: 320, overflow: "hidden", marginBottom: 20, position: "relative" as const }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={500}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
                {product.comingSoon && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(26,18,8,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Coming Soon</span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{product.name}</h3>
                <span style={{ fontSize: 20, fontWeight: 700, color: product.badgeColor }}>{product.price}</span>
              </div>

              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>{product.description}</p>

              {/* Sizes */}
              <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" as const }}>
                {product.sizes.map((size) => (
                  <span key={size} style={{ border: "1px solid #D4CEC7", padding: "4px 10px", fontSize: 11, letterSpacing: "0.08em", color: "#555" }}>{size}</span>
                ))}
              </div>

              {/* CTA */}
              {product.comingSoon ? (
                <div style={{ border: `1.5px solid ${product.badgeColor}`, padding: "12px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: product.badgeColor, opacity: 0.5 }}>
                  Notify Me
                </div>
              ) : (
                <a
                  href={`/merch/${product.id}`}
                  style={{ display: "block", background: product.badgeColor, color: "#fff", padding: "12px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none" }}
                >
                  Shop Now →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* LEGAL NOTICE */}
        <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 24, marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, maxWidth: 640 }}>
            Touchdown Tennessee is an independent editorial brand. All merchandise uses original designs and does not incorporate any officially licensed University of Tennessee, NFL, or Tennessee Titans marks, logos, or trademarks. Rocky Top Collection products are not affiliated with, endorsed by, or connected to the University of Tennessee or the Tennessee Titans.
          </p>
        </div>

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginBottom: 40, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>The Rocky Top Collection · Touchdown Tennessee</span>
        </div>
      </div>
    </main>
  );
}
