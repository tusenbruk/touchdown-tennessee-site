# Touchdown Tennessee

Independent Tennessee football, from Knoxville. A low-maintenance header site: the season record, the next game and kickoff, a satirical wire and a season board. No licensed marks.

- **Saturday** (`/saturday`): clubhouse, countdown, next game
- **The Board** (`/saturday/board`): the slate, final scores for played games, our pick on the rest
- **The Wire** (`/saturday/wire`): satire and a take machine
- A one-line status on every page: record, next game, kickoff. All of it is computed from `src/lib/saturday/schedule.ts`.

The shop, cart, checkout and newsletter were retired on 2026-11-03. The code is kept in `_deprecated/` (see its README); `public/products/` is untouched.

Questions: touchdowntennessee@gmail.com

## Develop

```bash
npm ci
npm run dev        # http://localhost:8080
npm run build && npm run typecheck && npm run lint && npm test
```

## Weekly update

After each game, one command records the result:

```bash
python3 scripts/update_result.py kentucky "W 31-17"
```

- The first argument is the game `id` in `src/lib/saturday/schedule.ts` (`furman`, `texas`, `south-carolina`, ...). An unknown id lists the valid ones and changes nothing.
- The score is **ours first**: `"W 31-17"` is Tennessee 31, opponent 17. A hyphen or en dash both work. A `W` with a losing score, a `L` with a winning one, and ties are rejected.
- It writes `result: { final, score, outcome }` onto that game, prints the new overall record and the games still without a result. Running it again for the same game replaces the result, so a typo is fixed by re-running.
- `--dry-run` shows what would change without writing. `--not-final` records a score still in progress; it shows on the site as "not final" and is left out of the record.

Then commit `schedule.ts` and push. The board, wire, pulse cards and the status line on every page read the result from that one file. Nothing else needs editing; the next game, countdown and record are computed. Needs Python 3 only (no packages).
