import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rocky Top Collection | Touchdown Tennessee",
  description: "Independent Tennessee football merchandise. The Rocky Top Collection — built for fans, not the bookstore.",
};

interface SyncVariant {
  id: number;
  name: string;
  retail_price: string;
}

interface StoreProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  variants: number;
  synced: number;
}

async function getProducts() {
  try {
    const res = await fetch("https://api.printful.com/store/products?limit=50", {
      headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_KEY || "1MciG1HuVVIByhDrXhETY7rBU2cJmmq5wURAq0uR"}` },
      cache: "no-store",
    });
    const data = await res.json();
    const products = data.result || [];

    // Get full details for each product
    const detailed = await Promise.all(
      products.map(async (p: StoreProduct) => {
        const r = await fetch(`https://api.printful.com/store/products/${p.id}`, {
          headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_KEY || "1MciG1HuVVIByhDrXhETY7rBU2cJmmq5wURAq0uR"}` },
          cache: "no-store",
        });
        const d = await r.json();
        const sp = d.result?.sync_product;
        const variants: SyncVariant[] = d.result?.sync_variants || [];
        const prices = variants.map((v) => parseFloat(v.retail_price)).filter(Boolean);
        const minPrice = prices.length ? Math.min(...prices) : 0;
        const maxPrice = prices.length ? Math.max(...prices) : 0;

        // Get unique sizes and colors
        const sizes: string[] = [...new Set(variants.map((v) => v.name.split(" / ").pop() || ""))].filter(Boolean).slice(0, 6);
        const colors = [...new Set(variants.map((v) => {
          const parts = v.name.split(" / ");
          return parts.length > 1 ? parts[1] : null;
        }))].filter(Boolean).slice(0, 5);

        return {
          id: sp?.id,
          name: sp?.name,
          thumbnail: sp?.thumbnail_url,
          minPrice: minPrice.toFixed(2),
          maxPrice: maxPrice.toFixed(2),
          samePrice: minPrice === maxPrice,
          sizes,
          colors,
          variantCount: variants.length,
        };
      })
    );

    return detailed.filter((p) => p.id);
  } catch {
    return [];
  }
}

export default async function MerchPage() {
  const products = await getProducts();

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

      {/* HEADER */}
      <div style={{ maxWidth: 1080, margin: "48px auto 0", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Shop</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>The Rocky Top Collection</h2>
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

        {/* LEGAL */}
        <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 24, marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, maxWidth: 640 }}>
            Touchdown Tennessee is an independent editorial brand. All merchandise uses original designs and does not incorporate any officially licensed University of Tennessee, NFL, or Tennessee Titans marks, logos, or trademarks. Not affiliated with, endorsed by, or connected to the University of Tennessee or the Tennessee Titans.
          </p>
        </div>

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginBottom: 40, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>The Rocky Top Collection</span>
        </div>
      </div>
    </main>
  );
}
