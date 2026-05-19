export const dynamic = "force-dynamic";

const KEY = process.env.PRINTFUL_API_KEY || "1MciG1HuVVIByhDrXhETY7rBU2cJmmq5wURAq0uR";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "No ID" }, { status: 400 });

  try {
    const res = await fetch(`https://api.printful.com/store/products/${id}`, {
      headers: { Authorization: `Bearer ${KEY}` },
      cache: "no-store",
    });
    if (!res.ok) return Response.json({ error: "Not found" }, { status: 404 });

    const data = await res.json();
    const sp = data.result?.sync_product;
    const variants = data.result?.sync_variants || [];

    return Response.json({
      id: sp.id,
      name: sp.name,
      thumbnail_url: sp.thumbnail_url,
      variants: variants.map((v: { id: number; name: string; retail_price: string }) => ({
        id: v.id,
        name: v.name,
        retail_price: v.retail_price,
      })),
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
