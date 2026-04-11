# AI Session Bootstrap
Version: v2.4.0
Updated: 2026-04-11
Status: ACTIVE - Hermes personal layer optional, OpenFang bounded sidecar live, orchestration layer adopted

## Canonical Root
`/home/evo/workspace`

## Control Plane
- `/home/evo/` is system home only.
- Keep root usage limited to dotfiles, wrappers, auth, global tool config, and launcher behavior.
- Do not treat `/home/evo/` as the source of truth for active code or governance docs.

## Legacy Roots
- Older `/home/evo/00_DNA` references are historical and should be treated as drift unless explicitly archived.

## Required Context Files
1. `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
2. `/home/evo/workspace/AGENTS.md`
3. `/home/evo/workspace/DNA/AGENTS.md`
4. `/home/evo/workspace/DNA/agents/AI_CONTEXT.md`
5. `/home/evo/workspace/orchestration/README.md`
6. `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
7. `/home/evo/workspace/DNA/ops/STACK.md`
8. `/home/evo/workspace/DNA/ops/TRANSITION.md`
9. `/home/evo/workspace/DNA/INBOX.md`
10. `/home/evo/workspace/DNA/ops/DECISION_LOG.md`

## Active Paths
- Workspace rules: `/home/evo/workspace/AGENTS.md`
- DNA rules: `/home/evo/workspace/DNA/AGENTS.md`
- AI context: `/home/evo/workspace/DNA/agents/AI_CONTEXT.md`
- Memory protocol: `/home/evo/workspace/DNA/agents/MEMORY_PROTOCOL.md`
- Stack registry: `/home/evo/workspace/DNA/ops/STACK.md`
- Transition log: `/home/evo/workspace/DNA/ops/TRANSITION.md`
- Decision log: `/home/evo/workspace/DNA/ops/DECISION_LOG.md`
- Orchestration layer: `/home/evo/workspace/orchestration/README.md`
- Deferred queue: `/home/evo/workspace/DNA/INBOX.md`
- Tech radar: `/home/evo/workspace/DNA/ops/TECH_RADAR.md` (consult on demand)
- Gate script: `/home/evo/workspace/_scripts/evo-check.sh`
- Task runner: `/home/evo/workspace/Justfile`
- Hermes launcher: `/home/evo/workspace/_scripts/hermesc.sh`
- Hermes gateway launcher: `/home/evo/workspace/_scripts/hermes-gateway.sh`
- Hermes UI launcher: `/home/evo/workspace/_scripts/hermes-ui.sh`
- Hermes runbook: `/home/evo/workspace/_docs/hermes/README.md`
- Hermes home: `/home/evo/.hermes`
- Hermes Workspace app: `/home/evo/workspace/_sandbox/hermes-workspace`
- OpenFang wizard docs: `/home/evo/workspace/_docs/openfang-wizard`
- Agent-stack sandbox: `/home/evo/workspace/_sandbox/agent-stack`
- Agent-stack docs: `/home/evo/workspace/_docs/agent-stack`
- Orchestration root: `/home/evo/workspace/orchestration`
- Orchestration roles: `/home/evo/workspace/orchestration/roles`
- Orchestration streams: `/home/evo/workspace/orchestration/streams`
- Orchestration tickets: `/home/evo/workspace/orchestration/tickets`
- Future role reserve: `/home/evo/workspace/DNA/roles/README.md`

## Active Projects
- Evolution_Platform: `/home/evo/workspace/projects/Evolution_Platform`
- SSOT_Build: `/home/evo/workspace/projects/SSOT_Build`
- Evolution_Content: `/home/evo/workspace/projects/Evolution_Content`
- Evolution_Studio: `/home/evo/workspace/projects/Evolution_Studio`

## Deferred Or Archived
- `seo-baseline` is archived out of the active platform surface as of 2026-03-12.
- `Evolution_Marketplace` was archived out of the active workspace surface on 2026-03-19.
- Evolution_Studio app or dashboard rebuild remains deferred; the v0.0 manual
  workbench surface is active at `projects/Evolution_Studio`.
- Evolution_Intelligence remains a deferred rebuild workstream.
- External or vendor infrastructure stays outside the active merge core until re-scoped.

## Current Focus
- Governed orchestration layer for domain memory, tickets, and delegation
- SSOT and Evolution_Platform as the primary active management lanes
- Workspace internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct
- Control-plane alignment between `/home/evo` and `/home/evo/workspace`
- Google Cloud routing through `evolution-engine`
- State-trap mapping and repository seam planning
- Evolution_Content scaffold restoration and Prudentia-first content operating
  model v0.0
- Evolution_Studio manual production workbench scaffold v0.0
- Archive-first cleanup of stale surfaces
- Hermes personal-layer onboarding with workspace-root launch and local Ollama
  default
- OpenFang bounded planning, retrieval, and packaging surfaces under `_docs/openfang-wizard/` and `_sandbox/agent-stack/`
- Paperclip retired from the live workspace surface on 2026-04-09
- Hermes -> DNA -> OpenFang handoff discipline with human approval at the
  boundary

## Current Active Agent Surface

- Active now: the governed orchestration layer under `/home/evo/workspace/orchestration`
  holds management state, tickets, role contracts, and domain memory
- Active now: Hermes is an optional personal assistant layer with runtime and
  durable personality under `/home/evo/.hermes`, launched from the workspace
  root via `_scripts/hermesc.sh` so it reads the existing `AGENTS.md` chain
- Active now: OpenFang with WSL-local Ollama under `_sandbox/agent-stack/` and
  tracked hand templates under `_docs/openfang-wizard/`
- Boundary: orchestration coordinates work, but it does not authorize
  autonomous parallel runtimes by itself
- Boundary: Hermes may suggest a Fang handoff; the human decides when Fang is
  brought in, and Fang remains the bounded hands layer
- Retired: Paperclip from the live workspace surface as of 2026-04-09

## Phase Rule
No build starts until `just check` is GREEN.

## Context Chain
<- inherits from: none (root map)
-> overrides by: /home/evo/workspace/AGENTS.md
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
