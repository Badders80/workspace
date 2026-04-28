# Agent Stack Sandbox

Status: WSL-local Ollama and OpenFang are the active sandbox surfaces. Paperclip
was retired from the live sandbox on 2026-04-09 and archived to
`/home/evo/_archive/agent-stack/2026-04-09/`.

## Purpose

Workspace-side operating-layer sandbox for the active OpenFang + Ollama path.
This is not a product repo and not a control-plane surface.

## Layout

- `with-node20.sh` - non-interactive launcher that loads `nvm`, selects Node 20, and then execs the requested command
- `.sandbox-bin-linux/` - Linux-safe shim directory for `codex` and `git`
- `ollama-trial.sh` - WSL-only Ollama launcher with the sanctioned local bind,
  model store, and log path
- `openfang-trial.sh` - OpenFang launcher with explicit manual route selection
- `ollama/` - Ollama binary and bundled runtime libraries owned by this sidecar
- `openfang/` - OpenFang install and runtime owned by this sidecar
- `gemini-state/` - sandbox Gemini state only; not a source of truth

## v1.0 Rules

- Human stays in the board seat.
- OpenFang is the bounded retrieval, planning, audit, and packaging layer.
- **Ollama cloud models are primary.** If cloud is unavailable, ask for direction — do not silently fallback to local.
- Local Ollama is the offline fallback only, not the daily default.
- Hosted review lanes stay explicit manual selections.
- `_docs/openfang-wizard/` is the tracked control surface for hands and starter
  templates.
- Write scope stays limited to explicit workspace allowlists only.
- Stable launchers move into `/home/evo/workspace/_scripts/` only after this
  sidecar proves itself.

## Current State

- Folder scaffold created.
- `with-node20.sh` remains the supported non-interactive Node and pnpm wrapper.
- WSL-local Ollama is installed under `ollama/bin/` with bundled runtime
  libraries under `ollama/lib/ollama/`.
- Ollama model store is proven under `/home/evo/workspace/models/ollama`.
- Local proof model `qwen3:14b` is pulled and verified through the direct API
  path.
- Ollama GPU offload on the RTX 3060 is verified inside WSL.
- OpenFang binary is installed under `openfang/bin/`.
- `openfang-trial.sh` sources `/home/evo/.env` before OpenFang starts and
  supports the active manual routes:
  - `local`
  - `local-debug`
  - `local-audit`
  - `openrouter-qwen`
  - `openrouter-nemotron`
  - `openrouter-glm`
  - `groq`
- Route selection rewrites the active `secrets.env` surface so provider keys do
  not silently bleed across routes.
- OpenFang state is redirected through `/home/evo/.openfang` as a documented
  symlink to `openfang/state/`.
- The retired Paperclip runtime, launchers, temp helpers, and duplicate
  `_sandbox/openfang-wizard/` surface are now archived outside the workspace.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
