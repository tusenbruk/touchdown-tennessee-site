import assert from "node:assert/strict";
import { test } from "node:test";
import { isValidEmail, loadConfig, subscribe, type NewsletterConfig } from "./newsletter-core.ts";

const live = (over: Partial<NewsletterConfig> = {}): NewsletterConfig => ({
  ...loadConfig({ BUTTONDOWN_API_KEY: "k_secret", NEWSLETTER_DRY_RUN: "0" }),
  ...over,
});
const never: typeof fetch = () => {
  throw new Error("network must not be touched");
};

test("dry run is the default, even with a key", () => {
  assert.equal(loadConfig({}).dryRun, true);
  assert.equal(loadConfig({ BUTTONDOWN_API_KEY: "k" }).dryRun, true);
  assert.equal(loadConfig({ NEWSLETTER_DRY_RUN: "0" }).dryRun, true); // no key
  assert.equal(loadConfig({ BUTTONDOWN_API_KEY: "k", NEWSLETTER_DRY_RUN: "0" }).dryRun, false);
});

test("email validation", () => {
  for (const ok of ["a@b.co", "ryan+tdt@example.com"]) assert.ok(isValidEmail(ok), ok);
  for (const bad of ["", "nope", "a@b", "a b@c.com", "a@@b.com", "x".repeat(250) + "@b.co"]) {
    assert.ok(!isValidEmail(bad), bad);
  }
});

test("dry run builds a preview, redacts the key, and never calls the network", async () => {
  const r = await subscribe(
    "fan@example.com",
    loadConfig({ BUTTONDOWN_API_KEY: "k_secret" }),
    never,
  );
  assert.equal(r.status, "dry-run");
  assert.ok(!JSON.stringify(r).includes("k_secret"));
  assert.deepEqual((r.preview as { body: unknown }).body, {
    email_address: "fan@example.com",
    tags: ["touchdown-tennessee-site"],
  });
});

test("invalid email is rejected before anything else", async () => {
  assert.equal((await subscribe("nope", live(), never)).status, "invalid");
});

test("live: 201 subscribed, 400 'already' recognised, other failures are errors", async () => {
  const reply =
    (status: number, body = ""): typeof fetch =>
    async () =>
      new Response(body, { status });
  assert.equal((await subscribe("a@b.co", live(), reply(201))).status, "subscribed");
  assert.equal(
    (await subscribe("a@b.co", live(), reply(400, "Email already exists"))).status,
    "already",
  );
  assert.equal((await subscribe("a@b.co", live(), reply(400, "bad payload xyz"))).status, "error");
  assert.equal((await subscribe("a@b.co", live(), reply(500))).status, "error");
});

test("live: sends the key in the header and a network failure is an error, not a throw", async () => {
  let seen: RequestInit | undefined;
  const spy: typeof fetch = async (_u, init) => ((seen = init), new Response("", { status: 201 }));
  await subscribe("a@b.co", live(), spy);
  assert.equal((seen!.headers as Record<string, string>).Authorization, "Token k_secret");
  const boom: typeof fetch = async () => {
    throw new Error("offline");
  };
  assert.equal((await subscribe("a@b.co", live(), boom)).status, "error");
});
