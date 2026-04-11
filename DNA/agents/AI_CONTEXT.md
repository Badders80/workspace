# AI Context

## Purpose

Quick loader for any AI assistant entering the active workspace.

## Canonical Rule

- `/home/evo/workspace` is the only canonical build surface.
- `/home/evo` is control plane only: dotfiles, wrappers, auth, global tool config.

## Required Read Order

1. `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
2. `/home/evo/workspace/AGENTS.md`
3. `/home/evo/workspace/DNA/AGENTS.md`
4. `/home/evo/workspace/orchestration/README.md`
5. `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
6. `/home/evo/workspace/DNA/ops/STACK.md`
7. `/home/evo/workspace/DNA/ops/TRANSITION.md`
8. `/home/evo/workspace/DNA/INBOX.md`
9. `/home/evo/workspace/DNA/ops/DECISION_LOG.md`

Read those files before answering questions about project state.
Consult `/home/evo/workspace/DNA/ops/TECH_RADAR.md` on demand only when checking prior tool research or evaluation notes.

## Current Platform Snapshot

- Active repos: `Evolution_Platform`, `SSOT_Build`, `Evolution_Content`, `Evolution_Studio`
- Primary active management lanes: `SSOT`, `Platform`
- Reserved or light lanes: `Studio`, `Content`
- Deferred rebuilds: `Evolution_Intelligence`
- Archived out of active surface: `Evolution_Platform/seo-baseline`, `Evolution_Marketplace`

## Working Rules

1. Archive-first is preferred when stale or duplicate surfaces create drag.
2. One shared env source lives at `/home/evo/.env`.
3. Google ecosystem tools should default to `evolution-engine`.
4. Prefer GCP ADC or service-account auth over raw Google API keys.
5. Do not remove local JSON or file fallbacks until repository seams are tested.
6. Treat direct local reads or writes for dynamic state as state traps.
7. `orchestration/` is the governed coordination surface for tickets, role contracts, stream state, and domain memory.
8. `orchestration/` does not replace `DNA/` and does not authorize autonomous parallel runtimes by itself.
9. OpenFang remains the bounded hands layer under the existing handoff rules.
10. Workspace internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct. Keep `DNA/` and external-facing content in normal prose.

## Current Focus

- Governed orchestration rollout for SSOT and Platform
- Root control-plane cleanup and launcher alignment
- Stale DNA rewrite and path-drift removal
- Gemini and Google auth routing through GCP conventions
- State-trap mapping for future repository seams

## Commands

- `evo context` - show the current context chain
- `evo doctor` - run the workspace sanity check
- `evo transition` - inspect structural handoff history
- `evo backlog` - show the deferred queue and active cleanup items
- `evo decisions` - inspect architectural history

## Handoff Rule

When a session changes structure, behavior, or architecture:

- append to `DNA/ops/TRANSITION.md`
- update `DNA/ops/STACK.md` if the live tool registry changed
- update `DNA/ops/DECISION_LOG.md` if a real decision was made
- update `DNA/INBOX.md` or a project README backlog if priorities changed
