# Drop List signup

The footer signup is wired to a mailing-list provider (Buttondown, as a stub). It is **off by default** and **dry-run by default**, so nothing reaches a real list until you turn it on deliberately.

## States

| Setting | Footer shows | Server does |
|---|---|---|
| nothing set (default) | "The list opens soon." No form. | n/a |
| `VITE_NEWSLETTER_ENABLED=true`, no key | Form | Dry run: validates, builds the request, sends nothing, tells the visitor "Dry run: nothing was sent or saved." |
| `VITE_NEWSLETTER_ENABLED=true`, key set, `NEWSLETTER_DRY_RUN` not `0` | Form | Still a dry run |
| `VITE_NEWSLETTER_ENABLED=true`, key set, `NEWSLETTER_DRY_RUN=0` | Form | **Live**: creates a subscriber |

The old form wrote to the visitor's own browser and said "You are on it". That is gone.

## Before going live

1. **Verify the Buttondown request.** The endpoint, `Authorization: Token …` header and `email_address` / `tags` body fields in `src/lib/newsletter-core.ts` (`buildRequest`) were written from memory; the Buttondown docs were not reachable from the build environment. Check them against https://docs.buttondown.com and adjust `buildRequest` / `interpretResponse` if they differ. Nothing else is provider-specific.
2. Set `BUTTONDOWN_API_KEY` as a server-side secret (never a `VITE_` variable).
3. Rehearse: `npm run newsletter -- --email you@example.com --dry-run` prints the exact request with the key redacted.
4. Set `NEWSLETTER_DRY_RUN=0` and `VITE_NEWSLETTER_ENABLED=true`, redeploy, and sign up with your own address.

## Safeguards in place

- Honeypot field and a per-process rate limit on the server function.
- The key stays on the server; the browser only receives a status and a message.
- Dry-run output never contains the key.
- Tests: `npm run test:site` (14 tests, includes "dry run never touches the network").

## Not done

- **Double opt-in / confirmation email** is whatever the provider's default is. Decide this in Buttondown.
- **WELCOME10**: the old copy promised the code to subscribers. The code still works in the cart, but the footer no longer mentions it until a welcome email can actually deliver it.
