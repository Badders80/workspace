# AGENTS

## Migration Status

WORKSPACE ACTIVE - `/home/evo/workspace` is canonical. `/home/evo/` is control plane only. Site-wide alignment and GCP routing cleanup are the current workstream.

## Scope

Workspace-level rules for `/home/evo/workspace`.

## Canonical Root

- Canonical root is `/home/evo/workspace`.
- `/home/evo/` is system home only, dotfiles, wrappers, and auth.

## Laws

1. Nothing is added without a home in the structure.
2. Docs lead, code follows unless production break-glass work requires otherwise.
3. Every `.md` has a context chain.
4. One `.env` at `/home/evo/.env`.
5. No build starts without `just check` GREEN.
6. Update bootstrap before structural changes.
7. Read and update the transition log every session.
8. Out-of-scope work goes to inbox.
9. Session ends with Done, Next, Blocked, and Decisions.
10. Symlinks are documented or auto-scanned.
11. New `.md` files are registered in conventions.
12. `DNA/ops/STACK.md` is the live adopted and active tool registry; do not suggest alternatives to locked tools there unless `STACK.md` and `DECISION_LOG.md` are updated together.
13. Google ecosystem tools should default to `evolution-engine` and prefer ADC over raw API keys.
14. Archive-first is preferred when stale or duplicate surfaces add drag.
15. Custom Windows and WSL startup automation must live under `C:\evo\startup` as the single source of truth; do not add ad-hoc Scheduled Tasks, desktop batch files, or Startup-folder shortcuts without updating that surface and its backups.
16. Workspace internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct. Keep `DNA/` and external-facing content in normal prose.

## Target Structure

- `/home/evo/workspace/DNA/`
- `/home/evo/workspace/projects/`
- `/home/evo/workspace/_scripts/`
- `/home/evo/workspace/_locks/`
- `/home/evo/workspace/_logs/`
- `/home/evo/workspace/_docs/`
- `/home/evo/_archive/` (external — outside workspace root, not indexed by agents)
- `/home/evo/workspace/_sandbox/`
- `/home/evo/workspace/models/`

## Guardrails

- Do not treat `/home/evo/` as source of truth for active workspace content.
- Do not leave keep-worthy or recurring work parked at workspace root; promote it to `_docs/`, `projects/`, `research_vault/`, `_sandbox/`, or `/home/evo/_archive/`.
- Use `_locks/` for folder-level ownership during merge execution.
- Keep deferred material isolated until explicitly re-scoped.
- Keep local JSON and file fallbacks in place until repository seams are tested.
- Treat direct dynamic file reads and writes as state traps to be mapped before cloud migration.
- Treat machine startup behavior as governed infrastructure: hidden by default, reversible, backed up, and documented in `C:\evo\startup`.

## Active Notes

- `Evolution_Platform` is the main platform build surface.
- `SSOT_Build` is the active SSOT design and contract surface.
- `Evolution_Content` is active and should stay aligned to workspace rules.
- External or vendor infrastructure remains deferred.
- `seo-baseline` is archived and off the active surface.

## Required Reading Order

1. `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
2. `/home/evo/workspace/AGENTS.md`
3. `/home/evo/workspace/DNA/AGENTS.md`
4. `/home/evo/workspace/DNA/agents/AI_CONTEXT.md`
5. `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
6. `/home/evo/workspace/DNA/ops/STACK.md`
7. `/home/evo/workspace/DNA/ops/TRANSITION.md`
8. `/home/evo/workspace/DNA/INBOX.md`
9. `/home/evo/workspace/DNA/ops/DECISION_LOG.md`
10. `/home/evo/workspace/_docs/MERGE_PLAN_2026-03-10.md` when doing merge-history work only

## Context Chain
<- inherits from: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> overrides by: /home/evo/workspace/DNA/AGENTS.md
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
