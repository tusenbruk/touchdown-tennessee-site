import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

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

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && f !== ".gitkeep");

  const articles = files.map((filename) => {
    const filepath = path.join(ARTICLES_DIR, filename);
    const raw = fs.readFileSync(filepath, "utf-8");
    const { data } = matter(raw);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      deck: data.deck || "",
      date: data.date || "",
      desk: data.desk || "vols",
      author: data.author || "Staff Writer",
      tags: data.tags || [],
    } as Article;
  });

  // Sort newest first
  return articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByDesk(desk: "vols" | "titans"): Article[] {
  return getAllArticles().filter((a) => a.desk === desk);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const body = processed.toString();

  return {
    slug,
    title: data.title || "Untitled",
    deck: data.deck || "",
    date: data.date || "",
    desk: data.desk || "vols",
    author: data.author || "Staff Writer",
    tags: data.tags || [],
    body,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && f !== ".gitkeep")
    .map((f) => f.replace(/\.md$/, ""));
}
