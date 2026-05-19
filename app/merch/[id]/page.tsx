"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Variant {
  id: number;
  name: string;
  retail_price: string;
  color?: string;
  size?: string;
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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/merch/product?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main style={{ fontFamily: "Georgia, serif", background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#8B7355", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main style={{ fontFamily: "Georgia, serif", background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 18, fontWeight: 700 }}>Product not found.</p>
        <Link href="/merch" style={{ color: "#FF6600", fontSize: 13 }}>← Back to Shop</Link>
      </main>
    );
  }

  // Parse colors and sizes from variant names
  const colors = [...new Set(product.variants.map((v) => {
    const parts = v.name.split(" / ");
    return parts.length >= 2 ? parts[1] : null;
  }).filter(Boolean))] as string[];

  const sizes = [...new Set(product.variants
    .filter((v) => !selectedColor || v.name.includes(`/ ${selectedColor} /`) || v.name.includes(`/ ${selectedColor}`))
    .map((v) => {
      const parts = v.name.split(" / ");
      return parts.length >= 3 ? parts[2] : parts.length === 2 ? parts[1] : null;
    }).filter(Boolean))] as string[];

  // Find selected variant
  const selectedVariant = product.variants.find((v) => {
    if (colors.length > 0 && sizes.length > 0) {
      return v.name.includes(selectedColor) && v.name.includes(selectedSize);
    } else if (sizes.length > 0) {
      return v.name.includes(selectedSize);
    }
    return true;
  }) || product.variants[0];

  const price = selectedVariant?.retail_price || product.variants[0]?.retail_price || "—";
  const isSingleSize = sizes.length <= 1 && colors.length <= 1;

  const handleAddToCart = () => {
    if (!isSingleSize && (!selectedColor && colors.length > 0)) return;
    if (!isSingleSize && (!selectedSize && sizes.length > 0)) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B7355" }}>
        <Link href="/merch" style={{ textDecoration: "none", color: "#8B7355" }}>← Shop</Link>
        <span>Tennessee Football · Vols · Titans · Rocky Top</span>
        <Link href="/" style={{ textDecoration: "none", color: "#8B7355" }}>Home</Link>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <div style={{ fontSize: 11, fontWeight: 700, border: "1.5px solid #1A1208", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>TT</div>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* PRODUCT */}
      <div style={{ maxWidth: 1080, margin: "48px auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>

          {/* IMAGE */}
          <div style={{ background: "#FAFAF8", border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600" }}>
            <img
              src={product.thumbnail_url}
              alt={product.name}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* DETAILS */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF6600", marginBottom: 12, fontWeight: 700 }}>Rocky Top Collection</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>{product.name}</h2>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#FF6600", marginBottom: 28 }}>${price}</div>

            {/* COLOR SELECTOR */}
            {colors.length > 1 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, color: "#1A1208" }}>
                  Color {selectedColor && <span style={{ color: "#8B7355", fontWeight: 400 }}>— {selectedColor}</span>}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => { setSelectedColor(color); setSelectedSize(""); }}
                      style={{
                        padding: "8px 16px",
                        border: `1.5px solid ${selectedColor === color ? "#1A1208" : "#D4CEC7"}`,
                        background: selectedColor === color ? "#1A1208" : "#fff",
                        color: selectedColor === color ? "#fff" : "#1A1208",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "Georgia, serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTOR */}
            {sizes.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Size</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        width: 52,
                        height: 42,
                        border: `1.5px solid ${selectedSize === size ? "#1A1208" : "#D4CEC7"}`,
                        background: selectedSize === size ? "#1A1208" : "#fff",
                        color: selectedSize === size ? "#fff" : "#1A1208",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "Georgia, serif",
                        fontWeight: 600,
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "14px 24px",
                background: added ? "#2a5c2a" : "#FF6600",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                marginBottom: 16,
                transition: "background 0.2s",
              }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            {added && (
              <div style={{ background: "#f0f7f0", border: "1px solid #c3dfc3", padding: "12px 16px", fontSize: 13, color: "#2a5c2a", marginBottom: 16 }}>
                Item added. <Link href="/merch" style={{ color: "#2a5c2a", fontWeight: 700 }}>Continue shopping →</Link>
              </div>
            )}

            {/* SHIPPING INFO */}
            <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 20, fontSize: 12, color: "#8B7355", lineHeight: 1.8 }}>
              <div>✓ Fulfilled by Printful</div>
              <div>✓ Ships in 3–5 business days</div>
              <div>✓ Printed on demand — no inventory</div>
            </div>

            {/* LEGAL */}
            <p style={{ fontSize: 10, color: "#bbb", marginTop: 20, lineHeight: 1.6 }}>
              Independent editorial brand. Not affiliated with the University of Tennessee or Tennessee Titans.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
