"use client";
import MobileNavBar from "@/app/components/MobileNavBar";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/components/CartContext";
import { useParams } from "next/navigation";

interface Variant {
  id: number;
  name: string;
  retail_price: string;
}

interface Product {
  id: number;
  name: string;
  thumbnail_url: string;
  variants: Variant[];
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/merch/product?id=${id}`)
      .then((r) => r.json())
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#8B7355", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Loading...</p>
    </main>
  );

  if (!product) return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: 16 }}>
      <p style={{ fontSize: 18, fontWeight: 700 }}>Product not found.</p>
      <Link href="/merch" style={{ color: "#FF6600" }}>← Back to Shop</Link>
    </main>
  );

  const colors = [...new Set(product.variants.map((v) => {
    const parts = v.name.split(" / ");
    return parts.length >= 3 ? parts[1] : null;
  }).filter(Boolean))] as string[];

  const sizes = [...new Set(product.variants
    .filter((v) => !selectedColor || v.name.includes(`/ ${selectedColor} /`))
    .map((v) => {
      const parts = v.name.split(" / ");
      return parts.length >= 3 ? parts[2] : parts.length === 2 ? parts[1] : null;
    }).filter(Boolean))] as string[];

  const selectedVariant = product.variants.find((v) => {
    if (colors.length > 0 && sizes.length > 0) return v.name.includes(selectedColor) && v.name.includes(selectedSize);
    if (sizes.length > 0) return v.name.includes(selectedSize);
    return true;
  }) || product.variants[0];

  const price = parseFloat(selectedVariant?.retail_price || "0");

  const handleAddToCart = () => {
    setError("");
    if (colors.length > 0 && !selectedColor) { setError("Please select a color."); return; }
    if (sizes.length > 0 && !selectedSize) { setError("Please select a size."); return; }

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      variantName: selectedVariant.name.split(" / ").slice(1).join(" / "),
      price,
      quantity: 1,
      thumbnail: product.thumbnail_url,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <MobileNavBar backHref="/merch" backLabel="← Shop" rightHref="/cart" rightLabel="View Cart →" />

      <div style={{ maxWidth: 1080, margin: "48px auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600" }}>
            <img src={product.thumbnail_url} alt={product.name} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

          <div style={{ paddingTop: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 12, fontWeight: 700 }}>The Frontier Collection</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>{product.name}</h2>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#FF6600", marginBottom: 28 }}>${price.toFixed(2)}</div>

            {colors.length > 1 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 10 }}>
                  Color {selectedColor && <span style={{ color: "#8B7355", fontWeight: 400 }}>— {selectedColor}</span>}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  {colors.map((color) => (
                    <button key={color} onClick={() => { setSelectedColor(color); setSelectedSize(""); setError(""); }}
                      style={{ padding: "8px 16px", border: `1.5px solid ${selectedColor === color ? "#1A1208" : "#D4CEC7"}`, background: selectedColor === color ? "#1A1208" : "#fff", color: selectedColor === color ? "#fff" : "#1A1208", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 10 }}>Size</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  {sizes.map((size) => (
                    <button key={size} onClick={() => { setSelectedSize(size); setError(""); }}
                      style={{ width: 52, height: 42, border: `1.5px solid ${selectedSize === size ? "#1A1208" : "#D4CEC7"}`, background: selectedSize === size ? "#1A1208" : "#fff", color: selectedSize === size ? "#fff" : "#1A1208", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: 600 }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && <p style={{ color: "#cc0000", fontSize: 12, marginBottom: 12 }}>{error}</p>}

            <button onClick={handleAddToCart}
              style={{ width: "100%", padding: "14px 24px", background: added ? "#2a5c2a" : "#FF6600", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, border: "none", cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 12 }}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            {added && (
              <div style={{ background: "#f0f7f0", border: "1px solid #c3dfc3", padding: "12px 16px", fontSize: 13, color: "#2a5c2a", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <span>Added to cart</span>
                <Link href="/cart" style={{ color: "#2a5c2a", fontWeight: 700 }}>View Cart →</Link>
              </div>
            )}

            <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 20, fontSize: 12, color: "#8B7355", lineHeight: 1.8 }}>
              <div>✓ Fulfilled by Printful</div>
              <div>✓ Ships in 3–5 business days</div>
              <div>✓ Printed on demand</div>
            </div>

            {/* SIZE GUIDE */}
            {sizes.length > 0 && (
              <details style={{ borderTop: "1px solid #D4CEC7", marginTop: 16, paddingTop: 16 }}>
                <summary style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, cursor: "pointer", color: "#1A1208" }}>Size Guide</summary>
                <div style={{ overflowX: "auto" as const }}>
                  <table style={{ width: "100%", marginTop: 12, fontSize: 12, color: "#555", borderCollapse: "collapse" as const }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #1A1208", textAlign: "left" as const }}>
                        <th style={{ padding: "6px 8px" }}>Size</th><th style={{ padding: "6px 8px" }}>Chest (in)</th><th style={{ padding: "6px 8px" }}>Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[["S","34–37","28"],["M","38–41","29"],["L","42–45","30"],["XL","46–49","31"],["2XL","50–53","32"],["3XL","54–57","33"]].map((row) => (
                        <tr key={row[0]} style={{ borderBottom: "1px solid #EEE" }}>
                          {row.map((cell, i) => <td key={i} style={{ padding: "6px 8px" }}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 11, color: "#8B7355", marginTop: 8 }}>Typical unisex garment measurements — the exact chart for this item is on its Printful size tab in your confirmation email. Between sizes? Size up.</p>
              </details>
            )}

            {/* SHIPPING & RETURNS */}
            <div style={{ borderTop: "1px solid #D4CEC7", marginTop: 16, paddingTop: 16, fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#1A1208", marginBottom: 6 }}>Shipping &amp; Returns</div>
              Free US standard shipping on orders over $75, otherwise $5.95 (or $12.95 express). Wrong size or misprint? We reprint or refund — keep the original.
            </div>

            <p style={{ fontSize: 10, color: "#bbb", marginTop: 20, lineHeight: 1.6 }}>Independent fan publication and brand. Not affiliated with, sponsored by, or endorsed by the University of Tennessee or the NFL.</p>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE ADD-TO-CART */}
      <div className="mobile-sticky-cart">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{product.name}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#FF6600" }}>${price.toFixed(2)}</div>
          </div>
          <button onClick={handleAddToCart}
            style={{ flex: 1, maxWidth: 220, padding: "12px 16px", background: added ? "#2a5c2a" : "#FF6600", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, border: "none", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
