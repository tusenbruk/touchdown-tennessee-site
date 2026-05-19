export const dynamic = "force-dynamic";

export async function GET() {
  const GITHUB_API = "https://api.github.com/repos/tusenbruk/touchdown-tennessee-site/contents/content/articles";
  
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(GITHUB_API, { headers });
    const status = res.status;
    const body = await res.json();
    
    return Response.json({
      status,
      hasToken: !!process.env.GITHUB_TOKEN,
      files: Array.isArray(body) ? body.map((f: {name: string}) => f.name) : body,
    });
  } catch (e) {
    return Response.json({ error: String(e) });
  }
}
