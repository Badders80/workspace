# Mirror Manifest

Defines what lives where and why. Updated: 2026-03-16.

---

## Architecture

### GitHub — AI Context (source of truth)

`Badders80/workspace` is the single entry point for any AI session.

```
Badders80/workspace
├── CONTEXT.md                    ← cloud AI entry point
├── AGENTS.md                     ← agent rules
├── AI_SESSION_BOOTSTRAP.md       ← session orientation
├── DNA/                          ← brand, ops conventions, decision log
└── _scripts/                     ← operational scripts
```

Fetch `https://raw.githubusercontent.com/Badders80/workspace/main/CONTEXT.md` to orient any session.

### Google Drive — Assets Only

`gdrive:_evo-context/` is for assets that can't live in git.

```
gdrive:_evo-context/
├── pitch decks
├── images and brand assets
└── investor content
```

**No markdown mirrors.** The rclone `sync-md-context-gdocs.sh` cron was retired 2026-03-16.

---

## What Changed (2026-03-16)

| Before | After |
|--------|-------|
| rclone cron pushed workspace markdown to Drive every 6h | Removed — cron retired |
| Drive `_gdocs-key/workspace/` was the AI context mirror | Deleted |
| AI sessions fetched context via Drive docs | AI sessions fetch `CONTEXT.md` from GitHub |

---

## Other Repos

| Repo | Purpose |
|------|---------|
| `Badders80/SSOT` | Mission Control React/Vite app |
| `Badders80/Evolution-3.1` | Evolution Stables public website |
