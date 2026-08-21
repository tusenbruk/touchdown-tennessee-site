import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Arcade reward: a single-use 15%-off Stripe promotion code for big scores.
// Codes are only ever minted server-side; the client just reports a score.
const SCORE_THRESHOLD = 3000;
const COUPON_ID = "arcade-15";
const CODE_TTL_HOURS = 48;
const MAX_CODES_PER_IP_PER_DAY = 3;

// Simple in-memory rate limit (per serverless instance — good enough to stop
// casual farming; the codes are single-use 15% either way).
const issued = new Map<string, { count: number; day: string }>();

function rateLimited(ip: string): boolean {
  const day = new Date().toISOString().slice(0, 10);
  const entry = issued.get(ip);
  if (!entry || entry.day !== day) {
    issued.set(ip, { count: 1, day });
    return false;
  }
  if (entry.count >= MAX_CODES_PER_IP_PER_DAY) return true;
  entry.count++;
  return false;
}

async function ensureCoupon(stripe: Stripe) {
  try {
    return await stripe.coupons.retrieve(COUPON_ID);
  } catch {
    return await stripe.coupons.create({
      id: COUPON_ID,
      percent_off: 15,
      duration: "once",
      name: "Arcade High Score 15%",
    });
  }
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Rewards are offline right now." }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" });

  let score = 0;
  try {
    const body = await request.json();
    score = Number(body?.score) || 0;
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  if (score < SCORE_THRESHOLD) {
    return Response.json({ error: "Score below reward threshold" }, { status: 400 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return Response.json({ error: "Reward limit reached for today. Come back tomorrow!" }, { status: 429 });
  }

  try {
    await ensureCoupon(stripe);
    const suffix = Array.from({ length: 5 }, () => "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 31)]).join("");
    const promo = await stripe.promotionCodes.create({
      promotion: { type: "coupon", coupon: COUPON_ID },
      code: `VOL${suffix}`,
      max_redemptions: 1,
      expires_at: Math.floor(Date.now() / 1000) + CODE_TTL_HOURS * 3600,
    });
    return Response.json({ code: promo.code, expiresHours: CODE_TTL_HOURS });
  } catch (e) {
    console.error("Arcade code mint failed:", e);
    return Response.json({ error: "Could not create a code right now." }, { status: 500 });
  }
}
