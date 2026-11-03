#!/usr/bin/env -S node --experimental-strip-types
/**
 * Try the mailing-list signup from the command line.
 *
 *   npm run newsletter -- --email fan@example.com --dry-run
 *   npm run newsletter -- --email fan@example.com            # follows env (dry run unless live)
 *
 * --dry-run always forces a dry run: it prints the request that would be sent
 * (key redacted) and touches no network. Without it, the config decides; see
 * src/lib/newsletter-core.ts for the live conditions.
 */
import { loadConfig, subscribe } from "../src/lib/newsletter-core.ts";

const args = process.argv.slice(2);
const email = args[args.indexOf("--email") + 1];
if (!args.includes("--email") || !email || email.startsWith("--")) {
  console.error("usage: npm run newsletter -- --email <address> [--dry-run]");
  process.exit(2);
}

const cfg = loadConfig(process.env);
if (args.includes("--dry-run")) cfg.dryRun = true;

console.log(
  `mode: ${cfg.dryRun ? "DRY RUN" : "LIVE"}  provider: ${cfg.provider}  key: ${cfg.apiKey ? "set" : "not set"}`,
);
const result = await subscribe(email, cfg);
console.log(JSON.stringify(result, null, 2));
process.exit(result.status === "error" || result.status === "invalid" ? 1 : 0);
