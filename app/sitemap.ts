import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { getCatalog } from "@/lib/printful";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://touchdowntennessee.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, products] = await Promise.all([getAllArticles(), getCatalog()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/merch`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/archive`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/vols/roster`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/titans/roster`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/merch/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
