import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/printful";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.touchdowntennessee.com").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalog();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/merch`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/games`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/games/tennessee-football-trivia`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/games/saturday-score`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guides/tennessee-football-gifts`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/independent-tennessee-football-apparel`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/merch/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
