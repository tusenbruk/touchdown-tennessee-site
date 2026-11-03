# Touchdown Tennessee

Independent Knoxville merch. No licensed marks.

- **Classics** — tee, signature tee, hoodie, hat, MagSafe case
- **1794** — Rifleman, Blount College, Crockett

Shop: [touchdowntennessee.com](https://touchdowntennessee.com)

Questions: touchdowntennessee@gmail.com

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
