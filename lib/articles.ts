import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Articles live in the repo and deploy with the app, so the filesystem is the
// primary source. The GitHub API is only a fallback for environments where the
// content directory didn't make it into the build output. (The old API-first
// approach made 193 unauthenticated requests per page view and rate-limited
// almost immediately, which surfaced as dead links and stale fallback cards.)
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
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

function parseMeta(slug: string, text: string): Article {
  const { data } = matter(text);
  return {
    slug,
    title: data.title || "Untitled",
    deck: data.deck || "",
    date: data.date || "",
    desk: data.desk || "vols",
    author: data.author || "Staff Writer",
    tags: data.tags || [],
  };
}

async function readLocalArticleFiles(): Promise<Map<string, string> | null> {
  try {
    const names = await fs.readdir(ARTICLES_DIR);
    const mdNames = names.filter((n) => n.endsWith(".md"));
    if (mdNames.length === 0) return null;
    const entries = await Promise.all(
      mdNames.map(async (name) => {
        const text = await fs.readFile(path.join(ARTICLES_DIR, name), "utf8");
        return [name.replace(/\.md$/, ""), text] as const;
      })
    );
    return new Map(entries);
  } catch {
    return null;
  }
}

async function fetchGithubFileContent(filename: string): Promise<string | null> {
  const url = `${GITHUB_API}/${filename}`;
  try {
    const res = await fetch(url, { headers: ghHeaders(), cache: "no-store" });
    if (!res.ok) {
      console.error(`fetchGithubFileContent failed: ${res.status} for ${url}`);
      return null;
    }
    return await res.text();
  } catch (e) {
    console.error(`fetchGithubFileContent error for ${url}:`, e);
    return null;
  }
}

async function getAllArticlesFromGithub(): Promise<Article[]> {
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
          const text = await fetchGithubFileContent(f.name);
          return text ? parseMeta(slug, text) : null;
        })
    );
    return articles.filter(Boolean) as Article[];
  } catch (e) {
    console.error("getAllArticlesFromGithub error:", e);
    return [];
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const local = await readLocalArticleFiles();
  const articles = local
    ? Array.from(local.entries()).map(([slug, text]) => parseMeta(slug, text))
    : await getAllArticlesFromGithub();

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Guard against path traversal — slugs only ever contain word chars and dashes.
  if (!/^[\w-]+$/.test(slug)) return null;

  let text: string | null = null;
  try {
    text = await fs.readFile(path.join(ARTICLES_DIR, `${slug}.md`), "utf8");
  } catch {
    text = await fetchGithubFileContent(`${slug}.md`);
  }
  if (!text) {
    console.error(`No content found for slug: ${slug}`);
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
