# Agent Stack

Status: workspace-side operating layer with WSL-local Ollama now proven;
OpenFang and Paperclip cutover still pending refresh.

## Scope

This doc set governs the v1.0 agent-stack trial under:

- `/home/evo/workspace/_sandbox/agent-stack/`
- `/home/evo/workspace/_docs/agent-stack/`

It does not move the operating layer into a product repo and it does not treat
`/home/evo/` as a source of truth.

## Core Model

- Human stays in the board seat.
- Paperclip is the orchestration, queue, approval, and reporting surface.
- OpenFang is the single executor.
- CEO, CTO, and similar roles are lenses, not separate autonomous runtimes.

## Docs In This Surface

- `INSTALL_NOTES.md` - machine readiness, install order, and known caveats
- `RUNBOOK.md` - startup, smoke-test, and shutdown flow
- `PHASE0_MARKETPLACE_READINESS_CHECKLIST_2026-04-06.md` - go/no-go checklist for the first bounded marketplace proof inside Paperclip
- `MARKETPLACE_PHASED_EXECUTION_PLAN_2026-04-06.md` - full-scope marketplace plan broken into ordered phases, gates, and parked work
- `PHASE0_PAPERCLIP_OPERATOR_PACK_2026-04-06.md` - exact Phase 0 active role set, loading order, and first ticket queue for Paperclip
- `CEO_PHASE0_INSTRUCTIONS_2026-04-06.md` - CEO instruction draft for the sandbox company
- `EXECUTION_WORKER_INSTRUCTIONS_2026-04-06.md` - ExecutionWorker instruction draft for the sandbox company
- `VERIFICATION_WORKER_INSTRUCTIONS_2026-04-06.md` - VerificationWorker instruction draft for the sandbox company
- `ALLOWLIST_POLICY.md` - initial path boundaries and write restrictions
- `ROLE_LENSES.md` - role semantics for v1.0
- `TICKET_FLOW.md` - how work moves from ticket to execution to logging
- `BUDGET_RULES.md` - budget ceilings and stop conditions

## Current Status

- `just check` is green.
- The sidecar folders and Node 20 wrapper exist.
- Ollama is installed locally under `_sandbox/agent-stack/ollama/bin/` with
  bundled runtime libraries under `_sandbox/agent-stack/ollama/lib/ollama/`.
- The sanctioned local model store is `/home/evo/workspace/models/ollama`.
- `qwen3:14b` is pulled locally and verified through the direct Ollama API.
- Ollama GPU offload is verified on the WSL-side RTX 3060 path.
- OpenFang is installed locally under `_sandbox/agent-stack/openfang/bin/` and
  its daemon boot was verified on `127.0.0.1:4200`.
- OpenFang is intentionally paused at the local-runtime boundary until its
  persisted provider state is scrubbed and it is re-cut over to the local
  Ollama route.
- Paperclip is onboarded under `_sandbox/agent-stack/paperclip/data/` and its
  local UI was verified on `127.0.0.1:3100`.
- The active operator budget cap for this trial is `0`, which means free-model
  routes only until the cap is explicitly raised.
- The remaining blockers are the OpenFang local-route cutover plus the first
  company record and executor connection inside Paperclip.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
