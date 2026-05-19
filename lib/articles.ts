import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const GITHUB_RAW = "https://raw.githubusercontent.com/tusenbruk/touchdown-tennessee-site/main/content/articles";
const GITHUB_API = "https://api.github.com/repos/tusenbruk/touchdown-tennessee-site/contents/content/articles";

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
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const files = await res.json();

    const articles = await Promise.all(
      files
        .filter((f: { name: string }) => f.name.endsWith(".md") && f.name !== ".gitkeep")
        .map(async (f: { name: string }) => {
          const slug = f.name.replace(/\.md$/, "");
          const raw = await fetch(`${GITHUB_RAW}/${f.name}`, { next: { revalidate: 300 } });
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
  } catch {
    return [];
  }
}

export function getArticlesByDesk(articles: Article[], desk: "vols" | "titans"): Article[] {
  return articles.filter((a) => a.desk === desk);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${GITHUB_RAW}/${slug}.md`, { next: { revalidate: 300 } });
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
  } catch {
    return null;
  }
}
