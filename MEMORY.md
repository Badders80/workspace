# Evolution Workspace — Unified Memory Index
# Version: 1.0.0
# Purpose: Single entry point for all workspace memory. Any agent or human reads this first.
# Updated: 2026-04-27

---

## Quick Access

| What You Need | File | Purpose |
|---------------|------|---------|
| **Current state of everything** | `memory/STATE.md` | System health, project statuses, blockers snapshot |
| **What's stuck right now** | `memory/BLOCKERS.md` | Active blockers with owners and resolution paths |
| **Productivity board** | `DASHBOARD.md` | Auto-generated from MEMORY.md. `just dash` to rebuild |
| **What we've decided** | `memory/DECISIONS.md` | Decision log across projects |
| **What not to repeat** | `memory/LESSONS.md` | Resolved blockers → lessons learned |
| **Session chronicle** | `memory/SESSION_LOG.md` | Append-only raw session log |
| **Daily raw logs** | `memory/YYYY-MM-DD.md` | Auto-indexed by OpenFang memory-core |
| **Cline boot identity** | `cline/boot/CLINE_BOOT.md` | Orchestrator identity, read every session |
| **Project rules** | `cline/rules/PROJECT_FOCUS.md` | Locks Cline to `projects/` folder |
| **Subagent definitions** | `cline/agents/AGENTS.md` | Coder, Tester, Deployer, Researcher, Reviewer |

---

## Boot Ritual

See `AI_SESSION_BOOTSTRAP.md` for the 3-step universal boot.

**Quick:**
1. `memory/STATE.md` — what's happening
2. `memory/BLOCKERS.md` — what's stuck
3. `AGENTS.md` — rules + constraints

**Also:** `tools/skills-mcp` server provides `get_memory_state` MCP tool for automated state loading.

**During work:**
- Say "Add to blockers: X" → append to `memory/BLOCKERS.md`
- Say "Note in lessons: X" → append to `memory/LESSONS.md`
- Say "Update Token memory: X" → edit `projects/Evolution_Token/MEMORY.md`
- Say "Update state: X" → edit `memory/STATE.md`
- Say "Refresh the dashboard" / "Rebuild the board" / "Update dash" → run `just dash`
- Say "Top 3 tasks" / "What should I work on?" / "What are my priorities?" → read `DASHBOARD.md` In Flight
- Say "Top of stack" → read `DASHBOARD.md` `## 🎯 Top of Stack`
- Say "Quick wins" / "What can I finish?" → read `DASHBOARD.md` `## 🏁 Completing`
- Say "What's blocked?" / "Any blockers?" → read `memory/BLOCKERS.md`

**At session end:**
- Append to `memory/SESSION_LOG.md` with what happened

---

## Active Projects

| Priority | Project | Status | Path |
|----------|---------|--------|------|
| 🔥 High | Evolution_Token | ✅ Production-ready MVP | `projects/Evolution_Token/` |
| 🔥 High | Evolution_Platform | 🟡 Marketplace shell ready | `projects/Evolution_Platform/` |
| 🔥 High | SSOT_Build | ✅ Stable | `projects/SSOT_Build/` |

See `memory/STATE.md` for full details.

---

## Context Chain

<- inherits from: `workspace/AI_SESSION_BOOTSTRAP.md`
-> overrides by: `workspace/memory/STATE.md`
-> live state: `workspace/memory/STATE.md`
-> blockers: `workspace/memory/BLOCKERS.md`
-> decisions: `workspace/memory/DECISIONS.md`
-> lessons: `workspace/memory/LESSONS.md`
-> session log: `workspace/memory/SESSION_LOG.md`