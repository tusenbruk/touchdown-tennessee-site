export const dynamic = "force-dynamic";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const PUBLICATION_ID = "pub_c0d997a8-3340-42b1-9add-9c68fb4a813a";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "touchdowntennessee.com",
          utm_medium: "organic",
          utm_campaign: "rocky-top-digest",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Beehiiv error:", err);
      return Response.json({ error: "Subscription failed" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (e) {
    console.error("Subscribe error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
