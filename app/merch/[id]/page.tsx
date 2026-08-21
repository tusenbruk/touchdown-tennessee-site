import type { Metadata } from "next";
import { getProductDetail } from "@/lib/printful";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://touchdowntennessee.com";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetail(id);
  if (!product) {
    return { title: "Product | Touchdown Tennessee" };
  }
  const prices = product.variants.map((v) => parseFloat(v.retail_price)).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : undefined;
  const description = `${product.name} — original Touchdown Tennessee design${minPrice ? `, from $${minPrice.toFixed(2)}` : ""}. Independent Tennessee football merchandise.`;
  return {
    title: `${product.name} | Touchdown Tennessee`,
    description,
    openGraph: {
      title: product.name,
      description,
      url: `${SITE_URL}/merch/${product.id}`,
      siteName: "Touchdown Tennessee",
      images: product.thumbnail_url ? [{ url: product.thumbnail_url }] : [],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductDetail(id);

  const prices = product?.variants.map((v) => parseFloat(v.retail_price)).filter(Boolean) ?? [];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.thumbnail_url,
        description: `${product.name} — original Touchdown Tennessee design.`,
        brand: { "@type": "Brand", name: "Touchdown Tennessee" },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/merch/${product.id}`,
          priceCurrency: "USD",
          price: minPrice.toFixed(2),
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <ProductClient />
    </>
  );
}
