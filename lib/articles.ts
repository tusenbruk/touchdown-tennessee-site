import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const GITHUB_API = "https://api.github.com/repos/tusenbruk/touchdown-tennessee-site/contents/content/articles";

function ghHeaders() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

export interface Article {
  slug: string;
  title: string;
  deck: string;
  date: string;
  desk: "vols" | "titans";
  author: string;
  tags: string[];
  body?: string;
}

async function fetchFileContent(filename: string): Promise<string | null> {
  const url = `${GITHUB_API}/${filename}`;
  try {
    const res = await fetch(url, { headers: ghHeaders(), cache: "no-store" });
    if (!res.ok) {
      console.error(`fetchFileContent failed: ${res.status} for ${url}`);
      return null;
    }
    return await res.text();
  } catch (e) {
    console.error(`fetchFileContent error for ${url}:`, e);
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(GITHUB_API, {
      headers: { Accept: "application/vnd.github.v3+json", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const files = await res.json();

    const articles = await Promise.all(
      files
        .filter((f: { name: string }) => f.name.endsWith(".md") && f.name !== ".gitkeep")
        .map(async (f: { name: string }) => {
          const slug = f.name.replace(/\.md$/, "");
          const text = await fetchFileContent(f.name);
          if (!text) return null;
          const { data } = matter(text);
          return {
            slug,
            title: data.title || "Untitled",
            deck: data.deck || "",
            date: data.date || "",
            desk: data.desk || "vols",
            author: data.author || "Staff Writer",
            tags: data.tags || [],
          } as Article;
        })
    );

    return articles
      .filter(Boolean)
      .sort((a, b) => new Date((b as Article).date).getTime() - new Date((a as Article).date).getTime()) as Article[];
  } catch (e) {
    console.error("getAllArticles error:", e);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  console.log(`getArticleBySlug called for: ${slug}`);
  const text = await fetchFileContent(`${slug}.md`);
  if (!text) {
    console.error(`No content returned for slug: ${slug}`);
    return null;
  }
  try {
    const { data, content } = matter(text);
    const processed = await remark().use(html).process(content);
    return {
      slug,
      title: data.title || "Untitled",
      deck: data.deck || "",
      date: data.date || "",
      desk: data.desk || "vols",
      author: data.author || "Staff Writer",
      tags: data.tags || [],
      body: processed.toString(),
    };
  } catch (e) {
    console.error(`getArticleBySlug parse error for ${slug}:`, e);
    return null;
  }
}
