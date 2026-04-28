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
2. One `.env` at `/home/evo/.env`.
3. No build starts without `just check` GREEN.
4. `DNA/ops/STACK.md` is the live adopted and active tool registry; do not suggest alternatives to locked tools there unless `STACK.md` and `DECISION_LOG.md` are updated together.
5. **Tool Gate — Replaced.** Tools are added case-by-case. When evaluating a new tool, mention if a similar unused tool exists and suggest cleanup if relevant.

## Target Structure

- `/home/evo/workspace/DNA/`
- `/home/evo/workspace/projects/`
- `/home/evo/workspace/_scripts/`
- `/home/evo/workspace/_locks/`
- `/home/evo/workspace/_logs/`
- `/home/evo/workspace/_docs/`
- `/home/evo/_archive/` (external — outside workspace root, not indexed by agents)
- `/home/evo/workspace/models/`

## Guardrails

- Do not treat `/home/evo/` as source of truth for active workspace content.
- Do not leave keep-worthy or recurring work parked at workspace root; promote it to `_docs/`, `projects/`, `research_vault/`, or `/home/evo/_archive/`.
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
- **Cline config lives in `cline/`** — see `cline/boot/CLINE_BOOT.md` for Cline-specific rules. Do not duplicate Cline rules here.

## Required Reading Order

1. `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md` — 3-step universal boot
2. `/home/evo/workspace/AGENTS.md` — 5 laws, case-by-case tool adoption
3. `/home/evo/workspace/memory/STATE.md` — current state
4. `/home/evo/workspace/memory/BLOCKERS.md` — what's stuck
5. `/home/evo/workspace/skills/ai/claude-skills-library.md` — 9 skill domains

**On demand:** `DNA/ops/STACK.md`, `DNA/ops/HARDWARE.md`, `DNA/ops/ACTIVE.md`

## Context Chain
<- inherits from: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> overrides by: /home/evo/workspace/DNA/AGENTS.md
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
