import { getProductDetail } from "@/lib/printful";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id || !/^\d+$/.test(id)) return Response.json({ error: "No ID" }, { status: 400 });

  const product = await getProductDetail(id);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json({
    id: product.id,
    name: product.name,
    thumbnail_url: product.thumbnail_url,
    variants: product.variants,
  });
}
