# Touchdown Tennessee

Independent Tennessee football, from Knoxville. A one-page header site: the season record, the next game and kickoff, and a notice that the domain is for sale. No licensed marks.

Everything on the page is computed from `src/lib/saturday/schedule.ts`, and that file updates itself (see "How it stays current"). Nobody needs to touch the repo during the season.

The shop, cart, checkout and newsletter were retired on 2026-11-03. The code is kept in `_deprecated/` (see its README); `public/products/` is untouched.

Questions: touchdowntennessee@gmail.com

## Develop

```bash
npm ci
npm run dev        # http://localhost:8080
npm run build && npm run typecheck && npm run lint && npm test
```

## How it stays current

`.github/workflows/weekly-update.yml` runs every day at 10:00 UTC. It reads Tennessee's schedule from ESPN's public feed and runs `scripts/auto_update.py`, which does two things to games already in `schedule.ts`:

- a finished game gets its final score and the record moves;
- an upcoming game gets its kickoff time and network once they are confirmed.

If anything changed, the workflow builds the site to prove it still works, commits `schedule.ts` to `main` as `content: ...`, and Vercel deploys. If nothing changed it does nothing. If the feed is down or stops matching the schedule it changes nothing and the run fails, which GitHub emails to the repo owner.

It never adds or removes games and never touches the takes or the picks. After the last game the page reads "Season closed" with the final record until a new season is entered.

**The one manual job, once a year (August):** replace the `games` array in `schedule.ts` with the new season's twelve games (id, date, opponent, home or away, city, a pick and a one-line take; leave `kickoff: null` and no `result`). The automation takes it from there.

To check it by hand: `python3 scripts/auto_update.py --dry-run` prints what it would change and writes nothing. To trigger a run: Actions → Schedule update → Run workflow.

### Fixing a score by hand

```bash
python3 scripts/update_result.py kentucky "W 31-17"
```

- The first argument is the game `id` in `src/lib/saturday/schedule.ts` (`furman`, `texas`, `south-carolina`, ...). An unknown id lists the valid ones and changes nothing.
- The score is **ours first**: `"W 31-17"` is Tennessee 31, opponent 17. A hyphen or en dash both work. A `W` with a losing score, a `L` with a winning one, and ties are rejected.
- Running it again for the same game replaces the result. `--dry-run` shows what would change without writing. `--not-final` records a score still in progress; it shows on the site as "not final" and is left out of the record.

Commit `schedule.ts` and push. The next automatic run will overwrite a hand-entered score only if ESPN's final differs from it.

The tests run against frozen fixtures in `scripts/fixtures/`, not the live schedule, so they stay green as results come in. Python 3 only (no packages).
