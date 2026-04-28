# Decision Log — Cline Era
# Version: 1.0.0
# Purpose: Irreversible choices. Append only.

---

## 2026-04-26: Cline Appointed Second-in-Command

**Decision:** Cline replaces OpenClaw as primary execution partner.
**Why:** OpenClaw went rogue, required constant babysitting. Alex needs output, not oversight.
**Impact:** Cline writes code, Alex runs commands. Real-time iteration.
**Reversible:** No — this is the new operating model.

## 2026-04-26: OpenClaw FIRED

**Decision:** OpenClaw removed from critical path. Retained for bounded tasks only.
**Why:** Over-engineered, scope crept, missed business context, required constant correction.
**Impact:** No more OpenClaw on Token/Platform/SSOT work. Cline-only for core.
**Reversible:** Only if OpenClaw governance improves significantly.

## 2026-04-26: Memory Layer Rebuilt

**Decision:** File-based memory system with machine-readable structure.
**Why:** Previous systems (orchestration/, .evo/, TICKET_FLOW.md) all failed day-to-day.
**Impact:** CLINE_BOOT.md, CURRENT_SPRINT.md, STATE.md, SESSION_LOG.md as living files.
**Reversible:** Yes, but this system designed to last.

## 2026-04-26: Council Mode = HYBRID

**Decision:** Auto-suggest council for high-stakes decisions, manual trigger always available.
**Why:** Full auto = noisy. Full manual = forgotten. Hybrid = balanced.
**Impact:** Council invoked for architecture, vendor, go-to-market decisions.
**Reversible:** Adjust sensitivity based on experience.

## 2026-04-28: Subagents vs OpenFang — Delegation Surface

**Decision:** Use `runSubagent` for ephemeral parallel work during Cline sessions. Use OpenFang hands for repeatable, agent-agnostic tasks callable from anywhere.

**Why:** Subagents now work (enabled via `tengu_mcp_subagent_prompt` flag). Both tools are active. Need clear boundary so Alex knows which to reach for.

**Impact:**
- One-time / session-bound → `runSubagent` (up to 5 parallel)
- Repeatable / scheduled / cross-tool → OpenFang hand

**Reversible:** Yes — documented in `cline/boot/CLINE_BOOT.md`. Subagents tested and working.

## Context Chain
<- inherits from: workspace/CLINE_BOOT.md
-> overrides by: none
