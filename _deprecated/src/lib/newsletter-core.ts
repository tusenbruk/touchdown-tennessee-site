/**
 * Mailing-list signup, provider-agnostic core. Pure functions: no DOM, no
 * framework imports, so the server function, the CLI (scripts/newsletter.ts)
 * and the tests all share it.
 *
 * Provider: Buttondown (stub).
 *   UNVERIFIED: the endpoint, auth header and body field names in `buildRequest`
 *   were written from memory. The Buttondown docs were not reachable when this
 *   was written. Check them against https://docs.buttondown.com before going live.
 *   Everything provider-specific lives in `buildRequest` and `interpretResponse`.
 *
 * Safety: it only sends a real request when BOTH a key is set AND
 * NEWSLETTER_DRY_RUN is explicitly "0". Anything else is a dry run.
 */

export type NewsletterConfig = {
  provider: "buttondown";
  apiUrl: string;
  apiKey: string | undefined;
  /** Tag attached to subscribers from this site. */
  tag: string;
  dryRun: boolean;
};

export type SubscribeStatus = "subscribed" | "already" | "dry-run" | "invalid" | "error";
export type SubscribeResult = { status: SubscribeStatus; message: string; preview?: unknown };
/** What the browser receives: no request preview. */
export type PublicResult = Pick<SubscribeResult, "status" | "message">;

export const DEFAULT_API_URL = "https://api.buttondown.com/v1/subscribers";

export function loadConfig(env: Record<string, string | undefined>): NewsletterConfig {
  const apiKey = env.BUTTONDOWN_API_KEY?.trim() || undefined;
  return {
    provider: "buttondown",
    apiUrl: env.BUTTONDOWN_API_URL?.trim() || DEFAULT_API_URL,
    apiKey,
    tag: env.NEWSLETTER_TAG?.trim() || "touchdown-tennessee-site",
    // Live only with a key AND an explicit opt-out of dry run.
    dryRun: !(apiKey && env.NEWSLETTER_DRY_RUN?.trim() === "0"),
  };
}

/** Pragmatic check: one @, a dot in the domain, no spaces, within RFC length. */
export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/** UNVERIFIED request shape; see the file header. */
export function buildRequest(cfg: NewsletterConfig, email: string) {
  return {
    url: cfg.apiUrl,
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${cfg.apiKey ?? "<BUTTONDOWN_API_KEY>"}`,
      },
      body: JSON.stringify({ email_address: email.trim(), tags: [cfg.tag] }),
    },
  };
}

/** Map a provider response to our result. 400 is treated as "already subscribed" only if the body says so. */
export async function interpretResponse(res: Response): Promise<SubscribeResult> {
  if (res.status === 201 || res.status === 200) {
    return { status: "subscribed", message: "You are on the list." };
  }
  const text = await res.text().catch(() => "");
  if ((res.status === 400 || res.status === 409) && /already|exists|subscrib/i.test(text)) {
    return { status: "already", message: "That address is already on the list." };
  }
  return { status: "error", message: "We could not add you just now. Try again later." };
}

export async function subscribe(
  rawEmail: string,
  cfg: NewsletterConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<SubscribeResult> {
  if (!isValidEmail(rawEmail)) {
    return { status: "invalid", message: "That does not look like an email address." };
  }
  const req = buildRequest(cfg, rawEmail);
  if (cfg.dryRun) {
    // Never include the real key, even though a dry run builds no network call.
    const preview = {
      url: req.url,
      method: req.init.method,
      body: JSON.parse(req.init.body),
      authorization: "Token <redacted>",
    };
    return { status: "dry-run", message: "Dry run: nothing was sent or saved.", preview };
  }
  try {
    const res = await fetchImpl(req.url, { ...req.init, signal: AbortSignal.timeout(8000) });
    return await interpretResponse(res);
  } catch {
    return { status: "error", message: "We could not add you just now. Try again later." };
  }
}
