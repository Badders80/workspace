# DNA Active State

Status: active governance surface

## Current Focus

### Spring Clean (2026-04-26) — IN PROGRESS

| Item | Status | Notes |
|------|--------|-------|
| Delete fake `.evo/` memory system | ✅ Done | Deleted from 7 projects + workspace |
| Adopt MEMORY.md pattern | ✅ Done | Created across workspace + 7 projects + template |
| Fix OpenClaw workspace path | ✅ Done | Pointed to `/home/evo/workspace` |
| Build OpenClaw → OpenFang bridge | ✅ Done | Bridge on port 8080, MCP registered |
| Trash `_sandbox/agent-stack/` | ✅ Done | Recovered 4.8GB |
| Trash `node_modules/` | ✅ Done | Recovered 1.1GB |
| Trash retired scripts/docs | ✅ Done | 20+ `.sh` files, old `_docs/` |
| Create `HARDWARE.md` | ✅ Done | Machine specs documented |
| Revive system health monitor | ✅ Done | Cron reinstalled, collectors running |
| Purge CONVENTIONS.md | ✅ Done | Removed stale refs, added MEMORY.md + HARDWARE.md |
| Rewrite AI_SESSION_BOOTSTRAP.md | ✅ Done | MEMORY.md ritual, OpenClaw+OpenFang bridge |
| Update AI_CONTEXT.md | ✅ Done | HARDWARE.md, MEMORY.md in required read |
| Update MEMORY_PROTOCOL.md | ✅ Done | Archived 2026-04-28. v3 boot replaces it. |
| Bridge project MEMORY.md → DNA | 🔄 In Progress | Add DNA cross-references |
| Update HEARTBEAT.md | ✅ Done | Periodic checks configured |

### Active Projects

| Project | Status | Next Action | Blocker |
|---------|--------|-------------|---------|
| Evolution_Token | 🟡 Active | Redeploy contract to Base Sepolia | Contract on Ethereum Sepolia (wrong chain) |
| Evolution_Platform | 🟡 Active | MyStable auth integration | Auth deferred per product decision |
| SSOT_Build | ✅ Stable | Waiting for Platform integration | Lease terms pending legal review |
| Evolution_Content | 🔴 Inactive | Not started | — |
| Evolution_Studio | 🔴 Inactive | Not started | — |
| Evolution_CRM | 🔴 Inactive | Not started | — |
| Evolution_Ops | 🔴 Inactive | Not started | — |

## Blockers

1. **Evolution_Token contract on wrong chain** — Ethereum Sepolia instead of Base Sepolia
2. **Evolution_Platform auth deferred** — blocks MyStable personalization
3. **SSOT_Build lease terms** — waiting for legal review

## Next

1. Bridge all project MEMORY.md files to DNA
2. Log today's work to TRANSITION.md + SESSION_LOG.md
3. Fix Token contract chain mismatch
4. Test OpenClaw → OpenFang delegation end-to-end

## Last Updated

2026-04-26

## Context Chain
<- inherits from: /home/evo/workspace/DNA/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
