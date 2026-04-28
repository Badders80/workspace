# CONVENTIONS

## Canonical Root

- `/home/evo/workspace`

## Legacy Roots

- `/home/evo/` is system home only, dotfiles only, and not canonical.

## Naming

- `AGENTS.md`: primary agent rules
- `CLAUDE.md`: Claude-only overrides
- `README.md`: human docs with AI section
- `AI_SESSION_BOOTSTRAP.md`: live map
- `MEMORY.md`: tool-agnostic project/workspace memory (primary)
- `SESSION_LOG.md`: append-only session chronicle

## Env Governance

- SSOT: `/home/evo/.env` only.
- All env validation and schema enforcement must resolve from `/home/evo`.

## Tool Governance

- `/home/evo/workspace/DNA/ops/STACK.md` is the live registry for adopted, active, and locked tools.
- Do not suggest alternatives to tools locked in `STACK.md` unless `STACK.md` and `DECISION_LOG.md` are updated together.
- `/home/evo/workspace/DNA/ops/DECISION_LOG.md` records historical rationale and decision context.
- `/home/evo/workspace/DNA/ops/tech-radar-intake/` is the repository-first discovery library for items that caught attention before any final fit decision.

## Communication Style

- Workspace internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct.
- Keep `DNA/`, legal/compliance content, and external-facing content in normal prose.

## Machine Specs

- Read `/home/evo/workspace/DNA/ops/HARDWARE.md` before recommending local models, video renders, or Docker workloads.
- Respect the C: vs S: storage isolation. No hot workloads on C:.

## Registered Markdown Files (Current)

### Root / Workspace
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/AGENTS.md`
- `/home/evo/workspace/MANIFEST.md`
- `/home/evo/workspace/MEMORY.md` — unified memory index (sources from `memory/*.md`)
- `/home/evo/workspace/TOOLS.md`

### Memory Directory (Workspace Level)
- `/home/evo/workspace/memory/STATE.md` — canonical workspace memory, system + project statuses
- `/home/evo/workspace/memory/BLOCKERS.md` — active blockers with resolution paths
- `/home/evo/workspace/memory/DECISIONS.md` — decision log
- `/home/evo/workspace/memory/LESSONS.md` — resolved blockers → lessons
- `/home/evo/workspace/memory/SESSION_LOG.md` — append-only session chronicle
- `/home/evo/workspace/memory/YYYY-MM-DD.md` — daily raw logs

### DNA
- `/home/evo/workspace/DNA/AGENTS.md`
- `/home/evo/workspace/DNA/agents/AI_CONTEXT.md`
- `/home/evo/workspace/DNA/agents/ANTI_LOOP_PROMPT.md`
- `/home/evo/workspace/DNA/brand/BRAND_GUIDELINES.md`
- `/home/evo/workspace/DNA/brand/BRAND_SYSTEM.md`
- `/home/evo/workspace/DNA/brand/DESIGN.md`
- `/home/evo/workspace/DNA/brand/DESIGN_v2_REVIEW.md`
- `/home/evo/workspace/DNA/brand/INTELLIGENCE_SYSTEM.md`
- `/home/evo/workspace/DNA/build-philosophy/BUILD_VS_ADOPT_POLICY.md`
- `/home/evo/workspace/DNA/build-philosophy/PROJECT_ONBOARDING.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md` (this file)
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/DNA/ops/DECISION_LOG.md`
- `/home/evo/workspace/DNA/ops/ACTIVE.md`
- `/home/evo/workspace/DNA/ops/HARDWARE.md`
- `/home/evo/workspace/DNA/ops/memory-system-adoption.md`
- `/home/evo/workspace/DNA/INBOX.md`
- `/home/evo/workspace/DNA/skills/frontend-design/SKILL.md`
- `/home/evo/workspace/DNA/skills/video-production/SKILL.md`
- `/home/evo/workspace/DNA/tool-registry/skills-index.md`
- `/home/evo/workspace/DNA/tool-registry/approved_sources.md`
- `/home/evo/workspace/DNA/tool-registry/starred_repo_registry.md`

### Projects (per-project MEMORY.md + SESSION_LOG.md)
- `/home/evo/workspace/projects/Evolution_Token/MEMORY.md`
- `/home/evo/workspace/projects/Evolution_Platform/MEMORY.md`
- `/home/evo/workspace/projects/SSOT_Build/MEMORY.md`
- `/home/evo/workspace/projects/Evolution_CRM/MEMORY.md`
- `/home/evo/workspace/projects/Evolution_Content/MEMORY.md`
- `/home/evo/workspace/projects/Evolution_Ops/MEMORY.md`
- `/home/evo/workspace/projects/Evolution_Studio/MEMORY.md`
- `/home/evo/workspace/projects/_template/MEMORY.md`

### Docs
- `/home/evo/workspace/_docs/STORAGE_POLICY.md`
- `/home/evo/workspace/_docs/system-health/README.md`
- `/home/evo/workspace/_docs/system-health/DECISIONS.md`
- `/home/evo/workspace/_docs/system-health/DEPLOY_WINDOWS.md`
- `/home/evo/workspace/_docs/system-health/monitoring-guide.md`
- `/home/evo/workspace/_docs/openfang-wizard/README.md`
- `/home/evo/workspace/research_vault/README.md`
- `/home/evo/workspace/research_vault/HOME.md`
- `/home/evo/workspace/research_vault/OBSIDIAN_SETUP.md`
- `/home/evo/workspace/research_vault/SCHEMA.md`

## Archive Convention

- All archive batches live under `/home/evo/_archive/<stream>/<YYYY-MM-DD>/` (OUTSIDE workspace root — never inside /home/evo/workspace/)
- Every dated snapshot must contain a `MANIFEST.md` before the batch is considered closed.
- `MANIFEST.md` must list: contents by folder, notable files with one-line descriptions, and reason for archiving.

## Retired Surfaces (Do Not Reference)

The following patterns are retired. Do not create new files in these locations:

- `.evo/` directories — replaced by `MEMORY.md`
- `orchestration/` layer — replaced by MEMORY.md + OpenClaw bridge
- `memories/` directory — replaced by `memory/YYYY-MM-DD.md` + `MEMORY.md`
- Google Docs sync — retired 2026-03-16
- `_docs/agent-stack/` — archived
- `_docs/hermes/` — archived
- `_docs/google/` — archived
- `_docs/presentations/` — archived
- `_docs/brand_assets/` — archived
- Hermes as active tool — retired 2026-04-09
- Paperclip — retired 2026-04-09
- `.claude/` workspace config — deleted
- `TICKET_FLOW.md` — retired, replaced by MEMORY.md + SESSION_LOG.md

## Context Chain
<- inherits from: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
