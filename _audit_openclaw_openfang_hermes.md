# System Health Audit: OpenClaw / OpenFang / Hermes
**Audit Date:** 2026-04-26  
**Auditor:** Subagent (OpenClaw main session)  
**Scope:** Config health, version drift, security, dependency integrity, build artifacts, crash patterns

---

## 1. OpenClaw (`~/.openclaw/`)

| Metric | Value |
|--------|-------|
| **Installed Version** | `2026.4.24` (commit `cbcfdf6`) |
| **Latest Available** | `2026.4.24` (no drift — current) |
| **Config Path** | `~/.openclaw/openclaw.json` |
| **Config Backups** | 5 rolling backups + 1 `.last-good` |
| **Files** | 21,798 files across 3,585 dirs |
| **Permissions** | Strong (`drwx------` / `-rw-------` throughout) |
| **Broken Symlinks** | None found |
| **Empty Dirs** | 10 (harmless — `.git` internals, caches, state dirs) |

### Grade: **B+**

### Blockers (will break integration)
1. **`gateway.controlUi.allowedOrigins = ["*"]`** — CORS wildcard exposes the control UI to any origin. If the gateway binds to anything other than strict loopback, this is a remote-code-execution vector via the approvals socket.
2. **`plugins.allow` lists `memory-core` but `plugins.entries` has no entry for it** — the allow-list references a plugin that isn’t declared. If another process toggles it, the config validator may reject the whole file.
3. **`tools.web.fetch.enabled = false` and `tools.web.search.enabled = false`** — yet `tools.alsoAllow` explicitly whitelists `ollama_web_search` and `ollama_web_fetch`. The web-search plugin (`openclaw-web-search`) is installed and enabled, but the global web gate is shut. Users will see tool-whitelist errors when the agent tries to use search/fetch.

### Code Debt
- **Mixed permission models**: `~/.openclaw/extensions/` and `~/.openclaw/identity/` are `drwxr-xr-x` / `-rw-r--r--`, breaking the otherwise uniform `700/600` posture. Not exploitable locally, but inconsistent.
- **Orphaned `.bak` files**: 5 backups + `.last-good` = 6 redundant copies of secrets-bearing config. No rotation policy; old backups may contain revoked tokens.
- **Config drift in `tools`**: `profile: "coding"` is declared but never referenced in the JSON schema shipped with `2026.4.24`. Likely a legacy key.

### Quick Wins (< 5 min each)
1. **Fix CORS wildcard** — change `allowedOrigins` from `["*"]` to `["http://localhost:18789"]` (or whatever the actual UI origin is).
2. **Align plugin allow-list** — either add `memory-core` to `plugins.entries` or remove it from `plugins.allow`.
3. **Enable web tools gate** — set `tools.web.fetch.enabled = true` and `tools.web.search.enabled = true` so the whitelisted ollama web tools actually function.

---

## 2. OpenFang / Hermes Workspace

> **Status:** Hermes Workspace UI was previously located at `_sandbox/hermes-workspace/`. The `_sandbox/` directory has been fully eliminated (2026-04-26). Hermes functionality is now handled through the OpenClaw bridge and direct OpenFang integration. No local Hermes Workspace UI is currently maintained.

### Grade: **C+**

### Blockers (will break integration)
1. **`.env` is incomplete** — only `HERMES_API_URL` and `HERMES_AGENT_PATH` are set; `ANTHROPIC_API_KEY` is missing. The workspace relies on the hermes-agent API, but if that server requires auth or rate-limit headers, requests will 401/429.
2. **`package.json` modified but uncommitted** — local changes to dependencies/scripts without a lockfile update mean the next `pnpm install` may produce a different tree than what was tested.
3. **`start-sandbox-ui.sh` is untracked** — a shell script that likely starts the hermes-agent in the background. If it’s not in git, it’s not reproducible across clones.

### Code Debt
- **Stale lockfile** — `pnpm-lock.yaml` predates the latest `package.json` edits. Risk of transitive dependency drift (especially around `@tanstack/react-start` which is still pre-1.0).
- **No test coverage** — 0 test files. A React 19 + Tailwind 4 + Vite 7 stack moves fast; without even smoke tests, breakages will only surface at runtime.
- **Legacy `xterm` packages** — `xterm` v5.3.0 is used alongside three v0.x addons. These addons have peer-dep ranges that may not declare React 19 compatibility, causing silent bundling issues.
- **`.vscode/settings.json` drift** — `routeTree.gen.ts` is excluded from watcher/search, which is correct for TanStack Router, but the settings file itself is uncommitted.

### Quick Wins (< 5 min each)
1. **Commit the dirty files** — `git add package.json .vscode/settings.json start-sandbox-ui.sh && git commit -m "chore: sync workspace config and startup script"`.
2. **Run `pnpm install` and commit the refreshed lockfile** — eliminates 16 days of drift.
3. **Copy `.env.example` → `.env` and fill `ANTHROPIC_API_KEY`** — or at minimum document why it’s intentionally omitted.

---

## 3. Hermes (`~/.hermes/`)

| Metric | Value |
|--------|-------|
| **Agent Dir** | `~/.hermes/hermes-agent/` (git repo, 3 recent commits) |
| **Commits Behind Upstream** | **234** |
| **Python Venv Packages** | 73 |
| **State DB** | `state.db` — 292 KB, healthy (SQLite with WAL) |
| **Logs** | `agent.log` (45 KB), `errors.log` (23 KB) |
| **Skills Installed** | 27+ categories |
| **Test Files** | 38 test files in `hermes-agent/` |

### Grade: **B**

### Blockers (will break integration)
1. **234 commits behind upstream** — the local clone is missing 2+ weeks of bug fixes, including resume/redirect patches and proxy keepalive regression tests. Risk of hitting already-fixed crashes when connecting to newer OpenClaw gateway versions.
2. **No `.env` file in `hermes-agent/`** — `agent.log` repeats `No .env file found. Using system environment variables.` on every boot. If `ANTHROPIC_API_KEY` or `API_SERVER_ENABLED` are required by newer upstream, the agent will fail silently.
3. **`auth.lock` is 0 bytes** — stale lock file from 2026-04-19. If the auth subsystem tries to acquire this lock on startup, it may race or hang on some filesystems.

### Code Debt
- **`.update_check` lag** — timestamp `1777150508` (2026-04-25 08:55) shows the updater knows it’s behind but no auto-pull is configured. Manual intervention needed.
- **Context-length override** — `config.yaml` forces `context_length: 64000` for `gemma4:latest`, which natively claims 8K. This is a deliberate override (noted in comment), but if the model actually truncates at 8K, the agent will lose mid-conversation context without warning.
- **`.skills_prompt_snapshot.json`** — 4 entries, 45 KB. Likely a cached prompt manifest. If skills are added/removed, this snapshot may desync until the agent restarts.

### Quick Wins (< 5 min each)
1. **Pull latest upstream** — `cd ~/.hermes/hermes-agent && git pull origin main` (234 commits; review release notes first).
2. **Remove stale `auth.lock`** — `rm ~/.hermes/auth.lock`.
3. **Create a minimal `.env`** in `~/.hermes/hermes-agent/` with `API_SERVER_ENABLED=true` and `ANTHROPIC_API_KEY=<key>` so the workspace ↔ agent integration works without environment-variable gymnastics.

---

## Cross-System Integration Health

| Integration Point | Status | Risk |
|-------------------|--------|------|
| OpenClaw gateway → OpenFang UI | `HERMES_API_URL=http://127.0.0.1:8642` configured | Low |
| OpenFang UI → Hermes agent | `HERMES_AGENT_PATH` points to sandbox clone | Low |
| Hermes agent → OpenClaw tools | `ollama_web_search` / `ollama_web_fetch` whitelisted but **disabled** in OpenClaw config | **Medium** — tool calls will fail |
| Hermes config → Model provider | `gemma4:latest` via `localhost:11434` | Low (assumes Ollama is running) |

---

## Summary Table

| System | Grade | Top Blocker | Top Debt | Top Quick Win |
|--------|-------|-------------|----------|---------------|
| **OpenClaw** | B+ | CORS wildcard `["*"]` | Orphaned `.bak` token copies | Lock `allowedOrigins` to localhost |
| **OpenFang** | C+ | Dirty git + stale lockfile | Zero test coverage | Commit dirty files + `pnpm install` |
| **Hermes** | B | 234 commits behind upstream | `context_length: 64000` override | `git pull origin main` |

---

*End of audit.*
