# Touchdown Tennessee: site audit

Audited 2026-11-02 against `main` at `69238d3`. Every file under `src/`, `server/`, `public/` (by inventory), `scripts/` (by purpose) and the root config was read.

## What the site is

An independent Tennessee-football merch shop with an editorial "Saturday" section (a satirical wire, a season board, a countdown). Print-on-demand through Printful. Original marks only; no licensed University of Tennessee, NFL or Titans marks.

**Stack:** TanStack Start + TanStack Router (file routes), React 19, Tailwind v4 (`@theme` tokens in `src/styles.css`), Zustand (persisted cart), Nitro `vercel` preset. Oswald (display) and Figtree (body) from Google Fonts.

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `routes/index.tsx` | Hero, Saturday teaser, Classics grid, 1794 grid |
| `/shop`, `/shop/$slug` | `shop.index.tsx`, `shop.$slug.tsx` | Catalog; product detail with colour and size pickers |
| `/collection/$slug` | `collection.$slug.tsx` | `classics` or `heritage` (1794) |
| `/saturday`, `/saturday/wire`, `/saturday/board` | `saturday*.tsx` | Layout with sub-nav; the wire is satire, the board is the season slate |
| `/independent` | `independent.tsx` | What "independent" means; X avatar and header downloads |
| `/checkout`, `/order/$id` | `checkout.tsx`, `order.$id.tsx` | Preview flow (see findings) |
| `/drops` | `drops.tsx` | Orphan: not linked anywhere, duplicates `/shop` |
| `/games`, `/saturday/six` | redirects | Retired "Give Him 6" game; also in `vercel.json` |

## Components and libs

- **Chrome:** `site-shell`, `header` (desktop nav, mobile drawer, cart button), `footer`, `cart-drawer`, `newsletter`, `brand-mark`.
- **Commerce:** `product-card`, `lib/catalog.ts` (all product data, 401 lines), `lib/cart.ts` (Zustand + localStorage), `lib/orders.ts` (localStorage).
- **Saturday:** `countdown`, `take-machine` (calls a server fn that uses xAI when `XAI_API_KEY` is set, else canned takes), `lib/saturday/{schedule,wire,takes,scores}.ts`.
- **Platform scaffolding (not site code):** `lib/auth/*`, `lib/app-data/*`, `lib/db.ts`, `lib/multiplayer`, `lib/preview-*`, `scripts/*`, `server/middleware/grok-pwa.ts`. Auth is disabled (`.grok/app-env.json`).

## Assets

`public/products` 21 MB across 55 JPEGs (several over 700 KB, one 1.2 MB), `public/brand` 5 MB, `public/heroes` 1.2 MB. No `og.jpg`, no `robots.txt`, no sitemap.

## Baseline (before changes)

| Check | Result |
|---|---|
| `npm ci` | **Fails**: `package-lock.json` is out of sync with `package.json` (`ajv`). `npm install` works. |
| `eslint .` | 1 error, 3 warnings |
| `tsc --noEmit` | 1 error: committed `routeTree.gen.ts` is stale (no `/games`) |
| `npm test` | 184 pass, **11 fail**: all in platform scaffolding (`.grok/skills/**` is gitignored and absent). Unrelated to the site. |
| `vite build` | Passes |

## Findings

### Needs your decision (not changed in this PR)

1. **Newsletter does not collect emails.** "Join" writes to the visitor's own `localStorage` and says "You are on it." Nobody receives the address. Needs a real provider (Buttondown, Mailchimp, Printful-side list).
2. **Checkout is a preview.** It stores the order in `localStorage`, charges nothing, and sends nothing to Printful. The copy says so, but the site presents itself as the live shop. Needs Stripe (or similar) and Printful order submission before real traffic.
3. **Editorial content is five weeks stale.** The wire's lead item, the "This Saturday" card and the countdown all point at Texas on Sep 26. Today is Nov 2; the board shows Oct 31 as a bye week. This PR makes the countdown and "This Saturday" card derive from the schedule so they stop rotting. The wire copy is yours to write and is untouched.
4. **Dead code that I did not delete**, because the brief says no deletions: `components/saturday/kick-game.tsx` (714 lines, "Give Him 6", unrouted), `lib/multiplayer/`, `components/state-mark.tsx`, `TdtMark` (identical to `PrimaryMark`), `routes/drops.tsx`, `drops` array in `catalog.ts`, `featuredProducts`, `listOrders` consumers. Safe to remove in a follow-up.
5. **Lockfile** needs regenerating (`npm install` and commit). Left alone so a design PR does not change dependency resolution.

### Fixed in this PR

See the PR description for the section-by-section list.

## Constraints I worked within

- The platform head injector (`scripts/grok-pwa-shared.mjs`) **strips and re-emits all `og:*` / `twitter:*` metas** on every deployed HTML response, sourcing title, description and image from `src/lib/og/site.json` and `public/og.jpg`. Page-level share tags therefore have to flow through `<title>` and `site.json`, not through route `head()` alone.
- Orange (#FF8200) fails WCAG on white (2.49:1) and passes on ink (7.49:1). Orange text on light surfaces uses a deeper shade (#A84C00, 5.49:1).
- The brand is deliberately unlicensed. New copy avoids school marks, slogans and nicknames.

## Round 2 status (2026-11-03)

| Round 1 item | Status |
|---|---|
| Newsletter collects nothing | Replaced: hidden until enabled; dry-run-by-default Buttondown stub (`docs/NEWSLETTER.md`). Provider request shape still needs verifying against Buttondown's docs. |
| Checkout is a preview | Clear "Preview only" banner on cart, checkout and confirmation. Real payments and Printful submission are still not built. |
| Stale editorial content | Lead notice, countdown, board, pulse card, take-machine default and its AI prompt all derive from the schedule. Wire items about played games move to "Earlier this season". |
| Dead code | Moved to `_deprecated/` with a README (nothing deleted). |
| Lockfile | Regenerated; `npm ci` verified in a clean directory. |

Still open: the 38 unreferenced original product JPEGs in `public/products/` (about 20 MB, still publicly served); the schedule dates and networks in `schedule.ts` were not checked against an official source; the 7 platform script tests that need `.grok/skills/**`.
