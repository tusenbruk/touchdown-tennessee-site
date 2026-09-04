import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.touchdowntennessee.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/games`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/the-place`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/days-that-matter`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/what-it-means`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/games/tennessee-football-trivia`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/games/saturday-score`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
