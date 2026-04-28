# AI Session Bootstrap
# Version: v3.0.0
# Updated: 2026-04-28
# Status: ACTIVE — 3-step universal boot, MCP-driven memory

## Canonical Root
`/home/evo/workspace`

## 3-Step Boot Ritual (Any Agent)

### 1. Read `memory/STATE.md`
System health, all project statuses, current focus.

### 2. Read `memory/BLOCKERS.md`
Active blockers with owners and resolution paths.

### 3. Read `AGENTS.md`
Workspace rules (5 laws, tool registry, constraints).

**That's it.** No 12-file chain. No context window waste.

**If working on a specific project:** Read `projects/{name}/MEMORY.md` after step 2.

## Natural Language Triggers

| What You Want | Say This | What I Do |
|---------------|----------|-----------|
| Load context | "Boot" or "Status check" | Read STATE + BLOCKERS + AGENTS |
| Start project | "I'm working on [project]" | Read STATE + BLOCKERS + project MEMORY.md |
| What's stuck? | "Any blockers?" | Read BLOCKERS.md |
| Refresh board | "Update dash" or "Rebuild board" | Run `just dash` |

## Quick Commands

```bash
just check        # verify project health
just dash         # rebuild productivity board
just session-start # progressive disclosure dashboard
just session-end  # update memory logs
```

## Context Chain
<- inherits from: none (root map)
-> overrides by: /home/evo/workspace/AGENTS.md
-> live state: /home/evo/workspace/memory/STATE.md
-> blockers: /home/evo/workspace/memory/BLOCKERS.md