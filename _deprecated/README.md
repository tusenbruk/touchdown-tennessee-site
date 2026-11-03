# _deprecated

Code that is no longer used by the live site. Nothing here is built, linted or
type-checked (`tsconfig.json` only includes `src/` and `server/`; ESLint ignores
this folder). Paths mirror `src/` so an item can be restored with `git mv`.

Moved on 2026-11-03 (round 2). Git history is preserved: use `git log --follow`.

| File                                          | What it was                                                                                                                                                                                    | Why it is here                                                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/saturday/kick-game.tsx`       | "Give Him 6": a 714-line canvas field-goal kicking mini-game (charge, flight, made/missed, sound toggle, best distance saved locally). Used a hard-coded copy of the old cream/orange palette. | The game was stripped from production (`/games` and `/saturday/six` redirect to `/saturday`) and the component was never routed again. |
| `src/lib/multiplayer/` (`index.ts`, `p2p.ts`) | A 570-line WebRTC peer-to-peer room helper (offer/answer/ICE signalling over polling). Platform template code for multiplayer games.                                                           | Nothing imported it. The site has no multiplayer feature.                                                                              |
| `src/components/state-mark.tsx`               | `StateMark`: an inline SVG outline of Tennessee.                                                                                                                                               | Never rendered; the house mark images replaced it.                                                                                     |
| `src/components/tdt-mark.tsx`                 | `TdtMark`: extracted from `brand-mark.tsx`. Identical output to `PrimaryMark`.                                                                                                                 | Duplicate component with no importers.                                                                                                 |
| `src/routes/drops.tsx`                        | `/drops`: a "Limited runs" page that duplicated `/shop`, linked from nowhere, and was `noindex`.                                                                                               | Redundant. `vercel.json` now redirects `/drops` to `/shop` on deploy.                                                                  |
| `src/lib/saturday/schedule-legacy.ts`         | `NEXT_KICKOFF`, `NEXT_OPPONENT`, `THIS_SATURDAY`: week-four (Texas, Sep 26) values that had to be restaged by hand every week.                                                                 | Replaced by `nextGame()` / `saturdayCard()` in `src/lib/saturday/schedule.ts`, which derive the same from the `games` list.            |

## Commerce retired (2026-11-03, header-site pass)

The site no longer sells anything. Everything below was moved with `git mv` (history kept), paths mirror `src/`, `scripts/` and `docs/`. `public/products/` photos and `src/lib/catalog.ts` (product data) were left where they are.

| File                                                                                                                                         | What it was                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `src/routes/shop.tsx`, `shop.index.tsx`, `shop.$slug.tsx`                                                                                    | `/shop` layout, product grid, product page with colour and size pickers |
| `src/routes/checkout.tsx`, `order.$id.tsx`                                                                                                   | Preview checkout and order confirmation (localStorage, no payment)      |
| `src/routes/collection.$slug.tsx`                                                                                                            | `/collection/classics` and `/collection/heritage`                       |
| `src/components/cart-drawer.tsx`, `cart-hydrate.tsx`, `src/lib/cart.ts`                                                                      | Cart UI and Zustand store                                               |
| `src/lib/orders.ts`, `src/components/preview-banner.tsx`                                                                                     | Order storage and the "Preview only" banner (only checkout used them)   |
| `src/components/product-card.tsx`                                                                                                            | Product tile (only shop, collection and the old home page used it)      |
| `src/components/newsletter.tsx`, `src/lib/newsletter.ts`, `newsletter-core.ts` (+ `.test.ts`), `scripts/newsletter.ts`, `docs/NEWSLETTER.md` | Drop List signup and its Buttondown stub (dry-run by default)           |

Why: the site is becoming a header site (record, next game, wire), not a commerce site, and nothing was taking payment. Moved beyond the list in the request, because they only existed for the pages above and would otherwise link to routes that no longer exist: `collection.$slug.tsx`, `order.$id.tsx`, `orders.ts`, `preview-banner.tsx`, `product-card.tsx`.

`vercel.json` redirects `/shop`, `/shop/*`, `/collection/*`, `/checkout`, `/order/*` and `/drops` to `/saturday`. To restore the shop, `git mv` the files back, re-add the nav and footer links, and drop those redirects. The newsletter test file expects `node --experimental-strip-types --test`; add it back to the `test` script when restoring.

## Not moved (still referenced or shared)

- `loadKickSave` / `writeKickSave` in `src/lib/saturday/scores.ts` exist only for the kick game. They share a file with `pushTake`, which the take machine uses, so the file stays. Remove the two helpers if the game is deleted for good.
- Small unused exports in `src/lib/catalog.ts` (`drops`, `featuredProducts`) and `src/lib/orders.ts` (`listOrders` is used internally). Harmless; tidy up if you like.

## Restoring something

```bash
git mv _deprecated/src/components/state-mark.tsx src/components/state-mark.tsx
```

Imports use the `@/` alias, which resolves again once the file is back under `src/`.

## Unused image variants (`public/products/`)

`_deprecated/public/products/*-600.webp` and `*-900.webp` (76 files, 6.2 MB): WebP variants generated in round 1 for product photos the catalog never references. `scripts/make-webp.sh` now builds variants only for images listed in `src/lib/catalog.ts`.

The 38 matching _original_ JPEGs (about 20 MB) are still in `public/products/` and are still served at their URLs. They were not moved because they are product art, not generated files. Worth a decision: archive them, or add the products they belong to.
