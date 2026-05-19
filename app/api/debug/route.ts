export const dynamic = "force-dynamic";

export async function GET() {
  const PUBLICATION_ID = "pub_c0d997a8-3340-42b1-9add-9c68fb4a813a";
  const key = process.env.BEEHIIV_API_KEY;

  if (!key) {
    return Response.json({ error: "No BEEHIIV_API_KEY set", hasGithubToken: !!process.env.GITHUB_TOKEN });
  }

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  return Response.json({
    hasKey: true,
    beehiivStatus: res.status,
    beehiivOk: res.ok,
  });
}
