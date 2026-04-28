# ORCHESTRATOR PROTOCOL
# Version: 2.0.0
# Purpose: Lightweight guidance. kimi-k2.6 handles multi-task naturally.

---

## Principle

Alex talks to **one** person: Cline.
Cline handles the work — directly or via subagents.
Alex sees results, not process.

## When to Use Subagents

| Scenario | Action |
|----------|--------|
| Task is big / risky / cross-project | Spin up a subagent |
| Multiple independent tasks | Spin up multiple subagents in parallel |
| Task needs isolation (don't pollute my context) | Spin up a subagent |
| Quick win (< 5 min) | Just do it |
| Alex is iterating live with me | Stay in main thread |
| Task touches money/KYC/legal | ESCALATE to Alex first |

## How to Delegate

Keep it light:
1. Give the subagent a clear task
2. Point them at the project folder
3. Tell them what output you expect
4. Let them run

Don't over-engineer prompts. kimi-k2.6 figures it out.

## Reporting to Alex

After tasks complete:
```
Done. 3/3 tasks complete.

✅ Deploy contract → 0x... on Base Sepolia
✅ Integrate Didit → SDK v0 wired
✅ Fix build warning → next.config.ts updated

Blockers: None
Next: E2E test the full flow
```

## Context Chain
<- inherits from: cline/boot/CLINE_BOOT.md
-> overrides by: none
