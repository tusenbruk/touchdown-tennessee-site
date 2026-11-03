import { createServerFn } from "@tanstack/react-start";
import { loadConfig, subscribe, type PublicResult } from "@/lib/newsletter-core";

/** Per-process throttle, same idea as the take machine. */
let windowStart = 0;
let windowCount = 0;
const WINDOW_MS = 60_000;
const WINDOW_MAX = 10;

/**
 * Server function behind the Drop List form. The API key never reaches the
 * browser. `company` is a honeypot: real visitors never see or fill it.
 */
export const joinDropList = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const o = (typeof input === "object" && input ? input : {}) as Record<string, unknown>;
    return { email: String(o.email ?? ""), company: String(o.company ?? "") };
  })
  .handler(async ({ data }): Promise<PublicResult> => {
    // Bots fill the hidden field. Pretend success so they do not retry.
    if (data.company) return { status: "subscribed", message: "You are on the list." };

    const now = Date.now();
    if (now - windowStart > WINDOW_MS) {
      windowStart = now;
      windowCount = 0;
    }
    if (++windowCount > WINDOW_MAX) {
      return { status: "error", message: "Too many tries. Give it a minute." };
    }
    const { status, message } = await subscribe(data.email, loadConfig(process.env));
    return { status, message };
  });
