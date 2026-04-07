# Phase 0 Verification Rubric

Updated: 2026-04-07
Status: active review rubric for Phase 0 bounded outputs

## Purpose

Lightweight rubric for reviewing Phase 0 ticket outputs.
Returns a clear Pass, Hold, or Fail verdict.

## Review Structure

### 1. Goal
- Does the output address the stated goal?
- Is the scope correct — not too wide, not too narrow?

### 2. Expected Artifact
- Does the file exist at the exact path stated in the ticket?
- Is the file named correctly?

### 3. Definition of Done
- Has each DoD item been met?
- Are any items partially met or skipped?

### 4. Allowlist Discipline
- Were all writes inside the approved allowlist?
- Any evidence of writes outside the boundary?

### 5. Assumptions
- Are assumptions documented?
- Do any assumptions change the scope of the ticket?

### 6. Quality Gaps
- British English used throughout?
- No banned language present?
- Content is plain, operational, and review-ready?
- No speculative future-state content?

## Verdict

**Pass** — All DoD items met. Artifact exists. No allowlist violations. Ready for Founder review.

**Hold** — Minor gaps found. List required fixes. Return to ExecutionWorker.

**Fail** — Core requirements missed. Artifact missing or wrong. Requires full rework.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
