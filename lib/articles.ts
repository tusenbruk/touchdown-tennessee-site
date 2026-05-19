import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const GITHUB_API = "https://api.github.com/repos/tusenbruk/touchdown-tennessee-site/contents/content/articles";

const ghHeaders = () => ({
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

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
  try {
    const res = await fetch(`${GITHUB_API}/${filename}`, {
      headers: { ...ghHeaders(), Accept: "application/vnd.github.v3.raw" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(GITHUB_API, {
      headers: ghHeaders(),
      next: { revalidate: 300 },
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
  try {
    const text = await fetchFileContent(`${slug}.md`);
    if (!text) return null;
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
    console.error("getArticleBySlug error:", e);
    return null;
  }
}
