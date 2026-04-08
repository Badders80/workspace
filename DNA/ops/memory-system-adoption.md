# Memory System Adoption

## Core Architecture

This workspace uses a layered local memory architecture with clear ownership boundaries:

- `DNA/` and `research_vault/` are the tracked canonical memory surfaces.
- Obsidian is the human-facing sidecar over `research_vault/`, not the source of truth.
- OpenFang is the agent-facing retrieval and workflow layer for bounded read-only assistance.
- `qmd` is a local semantic retrieval helper for markdown lookup, not canonical storage.
- LightRAG and RAG-Anything stay in future-evaluation status until governance explicitly promotes them.

## Current Priority

Stabilize the active OpenFang hands first, then polish the broader adoption workflow around them.

The immediate sequence is:

1. Keep `evolution-workspace`, `build-workspace`, and `audit-workspace` stable on `qwen3.5:latest`.
2. Validate retrieval, planning, and audit behavior against tracked files and runtime separation.
3. Align the written docs to the live setup.
4. Add lightweight `qmd` guidance as a helper path only.

## Canonical Memory Surfaces

The canonical tracked memory surfaces are:

- `DNA/` for operating rules, decisions, conventions, and stack governance
- `research_vault/` for the tracked sidecar research layer and normalized captures

These files remain the citation authority for humans and agents.

Runtime state is separate:

- `~/.openfang/data` is runtime memory managed by OpenFang
- `~/.openfang/logs` is for local diagnostics
- `~/.openfang/hands/` is installed runtime hand state

Runtime memory may help retrieval, but it does not replace tracked source files.

## OpenFang Role

OpenFang manages the bounded retrieval and workflow layer around the current workspace:

- `evolution-workspace` handles read-only knowledge retrieval from tracked workspace content
- `build-workspace` handles planning and exact command recommendation without executing changes
- `audit-workspace` handles governance checks, tracked-versus-runtime separation, and setup validation

The active local execution model for this workflow is `qwen3.5:latest`.

Secondary local models such as `gemma4:latest`, `qwen3:14b`, `opencode:latest`, and `llama3.2:latest` are not the default execution path for this workflow.

Use them only for bounded checks such as:

- controlled verification runs
- benchmark comparisons
- fallback sanity checks if `qwen3.5:latest` shows quality or performance issues

For now, `gemma4:latest` is a spot-check auditor, not an always-on second pass.

## Obsidian Role

Obsidian is the human-facing sidecar over `research_vault/`.

That means:

- the tracked workspace copy remains canonical
- the Windows Obsidian mirror is an operating convenience, not a second source of truth
- promotion decisions remain human-controlled
- workspace sync remains explicit through the existing pull/push workflow

Obsidian is for capture, review, linking, and human synthesis. It should not silently redefine workspace truth.

## qmd Role

`qmd` is the preferred helper for local semantic markdown retrieval when that capability is needed.

Use it as an auxiliary lookup layer over:

- `research_vault/` first
- selected high-signal docs in `DNA/`, such as `AGENTS.md`, `AI_SESSION_BOOTSTRAP.md`, `DNA/ops/STACK.md`, and `DNA/ops/DECISION_LOG.md`

Guardrails:

- `qmd` is not canonical storage
- `qmd` is not the citation authority
- answers should still cite tracked files directly
- do not expand indexing beyond the bounded memory surfaces without a deliberate review

At the time of this note, `qmd` is a documented helper path and not yet a required installed dependency for this workspace.

## Validation Path

Validate the memory system through bounded checks:

1. Confirm the three target hands are installed, active, and aligned to their intended roles.
2. Verify retrieval against known tracked files such as `AGENTS.md`, `CONTEXT.md`, and `DNA/ops/STACK.md`.
3. Verify `build-workspace` produces planning guidance without write authority.
4. Verify `audit-workspace` checks tracked-template versus runtime separation and catches setup drift.
5. Treat runtime/config inspection as the first validation path if an OpenFang agent response appears ungrounded.

If a stronger second opinion is needed, run a targeted `gemma4:latest` spot-check at the checkpoint rather than making it a permanent gate.

## Deferred Retrieval Evaluation

Do not adopt LightRAG or RAG-Anything in the active workflow at this stage.

Only revisit them if:

- native OpenFang memory plus the current helper path prove insufficient
- there is a clear retrieval quality problem to solve
- there is a genuine multimodal retrieval need
- the fit is recorded through governance before adoption

## Operating Summary

The operating split is:

- tracked workspace files hold canonical truth
- Obsidian supports human-side research flow
- OpenFang supports bounded agent retrieval and workflow checks
- `qmd` supports optional semantic lookup
- alternate retrieval systems stay deferred until explicitly approved

## Context Chain
<- inherits from: /home/evo/workspace/DNA/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
