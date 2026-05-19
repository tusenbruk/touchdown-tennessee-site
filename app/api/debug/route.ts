export const dynamic = "force-dynamic";

export async function GET() {
  const slug = "2026-05-19-tennessee-opens-with-furman-while-georgia-dodges-fcs-embarrassment";
  const GITHUB_API = "https://api.github.com/repos/tusenbruk/touchdown-tennessee-site/contents/content/articles";

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const url = `${GITHUB_API}/${slug}.md`;
  const res = await fetch(url, { headers });
  const status = res.status;
  const text = await res.text();

  return Response.json({
    url,
    status,
    hasToken: !!process.env.GITHUB_TOKEN,
    preview: text.slice(0, 300),
  });
}
