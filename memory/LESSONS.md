# Lessons Learned — Evolution Workspace
# Version: 1.0.0
# Purpose: "We tried X, it failed because Y." Append only.

---

## 2026-04-26: OpenClaw FIRED

**What:** Used OpenClaw as primary execution agent.
**Result:** Rogue behavior, over-engineering, scope creep, constant babysitting.
**Lesson:** Output-focused solo founder cannot afford AI that needs managing. Cline's iteration-manager role is the correct abstraction.
**Action:** OpenClaw retired from critical path. Cline-only for core work.

## 2026-04-26: Memory Systems Failed

**What:** Built orchestration/, .evo/, TICKET_FLOW.md as memory layers.
**Result:** All failed day-to-day. Too complex, not maintained, became drift.
**Lesson:** Memory must be simpler than the work it tracks. File-based, machine-readable, auto-generated dashboard is the right level.
**Action:** New memory layer: CLINE_BOOT.md + CURRENT_SPRINT.md + STATE.md + SESSION_LOG.md.

## 2026-04-26: Obsidian Second Brain Rejected

**What:** Considered Obsidian + Claude Code "Second Brain" pattern.
**Result:** Too heavy for shipping founder. Optimized for knowledge accumulation, not production output.
**Lesson:** Match the tool to the phase. Research phase = knowledge graphs. Shipping phase = decision engine.
**Action:** Evolution Ledger (file-based, append-only, queryable) instead of graph-based knowledge garden.

## Sprint Retro Template

When a sprint ends, Cline auto-prompts these questions. Answers append here under dated headers.

### Retro Questions

| # | Question | What to Capture |
|---|----------|----------------|
| 1 | What worked in our working style? | Keep doing |
| 2 | What slowed us down? | Change next sprint |
| 3 | What tools/patterns are NO-GO? | Add to block list |
| 4 | New tools or automation candidates? | Propose to STACK.md |

### Example Entry

```
## Sprint Retro 2026-04-27

1. What worked? Browser testing batching — verified 3 flows in one pass
2. What slowed us down? Waiting for manual verification between subagent iterations
3. NO-GO: Changing API contracts mid-sprint
4. Tool: Magic MCP used 3x, propose OpenFang hand `component-gen`
```

If nothing significant: "Clean sprint. No new patterns or blockers."

---

## Context Chain
<- inherits from: workspace/CLINE_BOOT.md
-> overrides by: none
