# AI Context

## Purpose

Quick loader for any AI assistant entering the active workspace.

## Canonical Rule

- `/home/evo/workspace` is the only canonical build surface.
- `/home/evo` is control plane only: dotfiles, wrappers, auth, global tool config.

## Required Read Order

1. `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md` — 3-step universal boot
2. `/home/evo/workspace/AGENTS.md` — 5 laws, tool gate
3. `/home/evo/workspace/memory/STATE.md` — current state
4. `/home/evo/workspace/memory/BLOCKERS.md` — what's stuck

**On demand:** `DNA/ops/STACK.md`, `DNA/ops/HARDWARE.md`, `DNA/ops/ACTIVE.md`, `DNA/ops/DECISION_LOG.md`, `DNA/INBOX.md`

## Current Platform Snapshot

- Active repos: `Evolution_Token`, `Evolution_Platform`, `SSOT_Build`
- Primary management lanes: `token`, `platform`, `ssot`
- Deferred: `content`, `studio`, `crm`, `ops`
- Retired: `seo-baseline`, `Evolution_Marketplace`, `Hermes`, `Paperclip`

## Working Rules

1. Read `MEMORY.md` before giving project-state advice.
2. Read `HARDWARE.md` before recommending local models, video renders, or Docker workloads.
3. Read `DASHBOARD.md` when asked for priorities, top tasks, quick wins, or what's in flight.
4. Archive-first is preferred when stale or duplicate surfaces create drag.
5. One shared env source lives at `/home/evo/.env`.
6. Google ecosystem tools should default to `evolution-engine`.
7. Prefer GCP ADC or service-account auth over raw Google API keys.
8. Do not remove local JSON or file fallbacks until repository seams are tested.
9. Treat direct local reads or writes for dynamic state as state traps.
10. Workspace internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct. Keep `DNA/` and external-facing content in normal prose.
11. Memory is the files. If files are stale, agent memory is stale.

## Dashboard Commands (Natural Language)

When the user says any of these, know what to do:

| User says | What to do |
|-----------|------------|
| "Refresh the dashboard" / "Rebuild the board" / "Update dash" | Run `just dash`, then read `DASHBOARD.md` |
| "Top 3 tasks" / "What should I work on?" / "What are my priorities?" | Read `DASHBOARD.md` In Flight section |
| "Top of stack" | Read `DASHBOARD.md` `## 🎯 Top of Stack` |
| "Quick wins" / "What can I finish?" | Read `DASHBOARD.md` `## 🏁 Completing` |
| "What's blocked?" / "Any blockers?" | Read `memory/BLOCKERS.md` |
| "Ship something" | Read `DASHBOARD.md` Completing section, suggest the highest-priority item to finish |

## Memory System (Primary)

The workspace uses **MEMORY.md files** for persistent state:

| Scope | File | When to Read | When to Write |
|-------|------|--------------|---------------|
| Workspace | `workspace/memory/STATE.md` | Every session start | When cross-project state changes |
| Workspace | `workspace/memory/BLOCKERS.md` | Every session start | When blockers change |
| Project | `projects/{name}/MEMORY.md` | When user mentions project | When project state changes |
| Daily | `memory/YYYY-MM-DD.md` | For historical context | Auto-indexed by OpenFang |
| Session | `memory/SESSION_LOG.md` | For continuity | End of every session |

**Rule:** If you don't read STATE.md, you're starting from zero.

## Hardware Constraints (Quick Reference)

Read `DNA/ops/HARDWARE.md` for full details before any workload recommendation.

| Component | Spec | Limit |
|-----------|------|-------|
| CPU | AMD Ryzen 5 7600X (6c/12t) | Parallelism -j8 |
| GPU | RTX 3060 12GB (compute-only) | Local models: max ~13B params |
| RAM | 12GB WSL | Docker/memory-capped |
| Storage | C: (OS) + S: (workloads) | Hot workloads on S: only |

## Commands

```bash
# Context
just check              # workspace health gate
just backlog            # deferred queue
just decisions          # architectural history

# Memory
just session-start      # progressive disclosure dashboard
just session-end        # update memory logs

# System
/home/evo/workspace/_scripts/system-health/health-check.sh
```

## Handoff Rule

When a session changes structure, behavior, or architecture:

1. Append to `DNA/ops/TRANSITION.md`
2. Update `DNA/ops/STACK.md` if tool registry changed
3. Update `DNA/ops/ACTIVE.md` if current focus changed
4. Record in `DNA/ops/DECISION_LOG.md` if a real decision was made
5. Update `MEMORY.md` (workspace or project) if state changed
6. Update `SESSION_LOG.md` with what happened

## Context Chain
<- inherits from: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> state: /home/evo/workspace/memory/STATE.md
-> blockers: /home/evo/workspace/memory/BLOCKERS.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
