import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const GITHUB_RAW = "https://raw.githubusercontent.com/tusenbruk/touchdown-tennessee-site/main/content/articles";
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

export async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(GITHUB_API, {
      headers: ghHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error("GitHub API error:", res.status, await res.text());
      return [];
    }
    const files = await res.json();

    const articles = await Promise.all(
      files
        .filter((f: { name: string }) => f.name.endsWith(".md") && f.name !== ".gitkeep")
        .map(async (f: { name: string }) => {
          const slug = f.name.replace(/\.md$/, "");
          const raw = await fetch(`${GITHUB_RAW}/${f.name}`, {
            headers: ghHeaders(),
            next: { revalidate: 300 },
          });
          const text = await raw.text();
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

    return articles.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (e) {
    console.error("getAllArticles error:", e);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${GITHUB_RAW}/${slug}.md`, {
      headers: ghHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const text = await res.text();
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
