# Agent Stack

Status: OpenFang + Ollama are the active workspace-side bounded agent stack.
Hermes is now active as the personal layer outside this surface. Paperclip was
retired from the live surface on 2026-04-09 and archived to
`/home/evo/_archive/agent-stack/2026-04-09/`.

## Scope

This doc set governs the active agent-stack surface under:

- `/home/evo/workspace/_sandbox/agent-stack/`
- `/home/evo/workspace/_docs/agent-stack/`

It does not move the operating layer into a product repo and it does not treat
`/home/evo/` as a source of truth.

## Core Model

- Human stays in the board seat.
- `DNA/` and `_docs/openfang-wizard/` are the tracked control surfaces.
- OpenFang is the bounded runtime for retrieval, planning, audit, and
  packaging hands.
- WSL-local Ollama is the default local inference path.
- Hosted review lanes stay explicit manual route selections.
- Hermes is the human-facing personal layer and may suggest Fang handoff, but
  it does not replace the bounded OpenFang runtime described here.
- Internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct.

## Docs In This Surface

- `INSTALL_NOTES.md` - machine readiness, route model, and known caveats
- `RUNBOOK.md` - startup, smoke-test, and shutdown flow
- `ALLOWLIST_POLICY.md` - current write boundaries and no-write zones
- `ROLE_LENSES.md` - active OpenFang hand roles plus reserved future profiles
- `TICKET_FLOW.md` - current human -> DNA -> OpenFang handoff flow
- `EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md` - stage-gated
  managed delivery model for the horse syndication marketplace build
- `BUDGET_RULES.md` - local-first spending and hosted-route controls

## Current Status

- `just check` was green at the start of the Paperclip retirement pass.
- Ollama is installed locally under `_sandbox/agent-stack/ollama/bin/` with
  bundled runtime libraries under `_sandbox/agent-stack/ollama/lib/ollama/`.
- The sanctioned local model store is `/home/evo/workspace/models/ollama`.
- `qwen3:14b` is pulled locally and verified through the direct Ollama API.
- OpenFang is installed locally under `_sandbox/agent-stack/openfang/bin/`.
- The tracked control surface for hands and templates is
  `/home/evo/workspace/_docs/openfang-wizard/`.
- The active local default hand route is `ollama/qwen3.5:latest`.
- The local specialist lanes are `local-debug` on
  `ollama/deepseek-coder-v2:16b` and `local-audit` on
  `ollama/granite4:7b-a1b-h`.
- Hosted review lanes remain available only through explicit manual route
  selection: `openrouter-qwen`, `openrouter-nemotron`, `openrouter-glm`, and
  `groq`.
- The retired Paperclip runtime, launchers, operator pack, and duplicate
  `_sandbox/openfang-wizard/` surface now live in
  `/home/evo/_archive/agent-stack/2026-04-09/`.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
