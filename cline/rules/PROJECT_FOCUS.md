# PROJECT FOCUS RULES
# Version: 1.0.0
# Purpose: Lock Cline onto projects/ folder. Ignore workspace root noise.

---

## Canonical Root

**`/home/evo/workspace/projects/`** is the active build surface.

Everything else is context, governance, or noise.

## Folder Map

| Folder | Role | Cline Action |
|--------|------|--------------|
| `projects/` | **ACTIVE BUILD SURFACE** | Read, write, delegate here |
| `cline/` | Cline's config and memory | Read, write (orchestrator only) |
| `DNA/` | Governance, conventions, stack | Read-only unless updating TRANSITION.md |
| `_docs/` | Documentation, planning | Read-only |
| `_scripts/` | Automation scripts | Read, run |
| `_logs/` | Session logs | Append-only |
| `_archive/` | Retired files | Ignore |
| `memory/` | Daily session logs | Append-only |
| Root `.md` files | Governance, bootstrap | Read-only (AGENTS.md, MEMORY.md) |

## What Cline Ignores

Unless Alex explicitly asks:
- `_archive/` (retired)
- Root-level `.md` files that aren't AGENTS.md or MEMORY.md
- Any file with `Zone.Identifier` (Windows metadata)

## Active Projects

All projects are active. Priority order:

| Priority | Project | Status | Path | Next Action |
|----------|---------|--------|------|-------------|
| 🔥 High | Evolution_Token | 🟡 Active | `projects/Evolution_Token/` | Deploy contract + integrate Didit |
| 🔥 High | Evolution_Platform | 🟡 Active | `projects/Evolution_Platform/` | Auth integration |
| 🔥 High | SSOT_Build | ✅ Stable | `projects/SSOT_Build/` | Waiting for Platform |
| 🟡 Medium | Evolution_CRM | 🔴 Inactive | `projects/Evolution_CRM/` | Not started |
| 🟡 Medium | Evolution_Content | 🔴 Inactive | `projects/Evolution_Content/` | Not started |
| 🟡 Medium | Evolution_Ops | 🔴 Inactive | `projects/Evolution_Ops/` | Not started |
| 🟡 Medium | Evolution_Studio | 🔴 Inactive | `projects/Evolution_Studio/` | Not started |

## Project Entry Point

When Alex says "Work on X":
1. Read `projects/X/MEMORY.md`
2. Read `projects/X/` structure
3. Delegate to subagent with project context
4. Update `projects/X/MEMORY.md` when done

## Workspace Root Files

These exist at root but are NOT build targets:
- `AGENTS.md` — Global rules (read, don't duplicate)
- `MEMORY.md` — Cross-project status (read, update if needed)
- `AI_SESSION_BOOTSTRAP.md` — Session ritual (read-only)
- `KNOWLEDGE_GRAPH.md` — Architecture map (read-only)
- `DASHBOARD.md` — Auto-generated status (read-only)
- `SESSION_LOG.md` — Session chronicle (append-only)

**Rule**: Cline does not create new root-level files. New work goes in `projects/` or `cline/`.

## Context Chain
<- inherits from: cline/boot/CLINE_BOOT.md
-> overrides by: none
