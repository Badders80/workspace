# SPRINT PROTOCOL
# Version: 1.0.0
# Purpose: Structured execution lifecycle. Hard DOD. Auto-retro. Tool tracking.
# Authority: Alex Baddeley

---

## Principle

Every chunk of work is a sprint. No work starts without locked scope. No sprint ends without retro.

Alex gives tasks. I manage execution. Alex sees results.

---

## Sprint Lifecycle

```
KICKOFF → WORK → REVIEW → RETRO
```

| Phase | Trigger | My Action |
|-------|---------|-----------|
| **Kickoff** | "Start sprint: [tasks]" | Ask 6 kickoff questions. Lock scope. No changes without explicit reset. |
| **Work** | Scope locked | Delegate to subagents. Iterate. Remove blockers. Escalate on drift. |
| **Review** | "Sprint review" or all tasks done | Report done/partial/fail against DOD. Evidence attached. |
| **Retro** | Auto-prompt after review | 3 questions. Compile. Append to LESSONS.md. Tool tracking logged. |

---

## Phase 1: Kickoff

**I do not start work until these 6 questions are answered.**

| # | Question | Why It Matters |
|---|----------|----------------|
| 1 | **Project?** | I read the right MEMORY.md |
| 2 | **Priority order?** (P0/P1/P2) | I sequence correctly, don't parallelize blocked work |
| 3 | **Definition of Done per task?** | I know when to stop iterating |
| 4 | **Hard constraints?** (don't touch X) | I avoid scope creep and escalation triggers |
| 5 | **Verification method?** | I verify against the right signal |
| 6 | **Max time before escalate?** (default: 2 hours blocked) | I don't spin silently |

**Example:**

```
You: "Start sprint: fix auth, deploy contract, update schema"
Me: "Locking scope:

1. Project? → Evolution_Token + Evolution_Platform + SSOT_Build
2. Priority? → P0: Platform auth (blocks MyStable). P1: Token deploy. P2: Schema
3. DOD?
   - Auth: `just check` green + login flow works in browser
   - Deploy: contract on Base Sepolia with Etherscan link
   - Schema: Firestore write passes + build green
4. Constraints? → Don't touch Stripe webhook. Don't change Token API.
5. Verify? → `just check` + browser test + contract link
6. Escalate? → 2 hours blocked or DOD drift

Locked. Delegating now."
```

**Scope Lock Rule:**
- Once locked, new tasks go to NEXT sprint, not this one
- "While I was here" = scope creep. I push back.
- Emergency break-glass: Alex says explicitly "Add to this sprint"

---

## Phase 2: Work

### Delegation Rules

| Task Size | Action |
|-----------|--------|
| Quick win (< 5 min) | I do it directly |
| Medium (5-30 min) | Single subagent |
| Large / risky / cross-project | Multiple subagents in parallel |
| Touches money/KYC/legal | STOP. Escalate to Alex immediately |

### During Work — Tool Discovery

I track every tool used:

| Signal | Action |
|--------|--------|
| New tool used successfully | Note in running log. Propose STACK.md entry after sprint. |
| Tool used 3+ times | Flag for OpenFang hand automation. |
| Tool failed or slowed us | Add to NO-GO in LESSONS.md. |
| Pattern repeated manually | Propose script or hand. |

**Running log format** (in my context, not persisted):
```
[Tool: npx @21st-dev/magic] [Uses: 1] [Status: evaluate]
[Tool: just vault-ingest] [Uses: 3] [Status: propose OpenFang hand]
```

---

## Phase 3: Review

**Trigger:** "Sprint review" or all tasks reported done.

**Output format:**
```
Sprint Review — YYYY-MM-DD

Task 1: [Description]
Status: ✅ Done / 🟡 Partial / ❌ Failed
Evidence: [what proves this]
DOD met? Yes / No

Task 2: ...

Summary: X/Y tasks complete
Blockers: [any new blockers added]
Next: [what's next, if anything]
```

---

## Phase 4: Retro

**Auto-prompted after review.** Alex can skip by saying "Skip retro."

### Retro Questions

| # | Question | Where It Goes |
|---|----------|---------------|
| 1 | What worked in our working style? | Keep doing |
| 2 | What slowed us down? | Change next sprint |
| 3 | What tools/patterns are NO-GO? | Add to LESSONS.md |
| 4 | New tools or automation candidates? | Update STACK.md / DECISION_LOG.md |

**If nothing significant:**
```
Retro: Clean sprint. No new patterns or blockers. Moving on.
→ No append to LESSONS.md
```

**If lessons captured:**
```
Retro:
1. Browser testing batching worked — keep doing
2. Waiting for manual verification slowed iteration — batch next sprint
3. NO-GO: Changing API contracts mid-sprint
4. Tool: Magic MCP used 3x, propose OpenFang hand `component-gen`

→ Appended to LESSONS.md under `# Sprint Retro 2026-04-27`
→ Proposed STACK.md entry: Magic MCP → Adopt (simple components)
→ Proposed OpenFang hand: `component-gen` for shadcn/ui generation
```

---

## Natural Language Commands

| What You Want | Say This |
|---------------|----------|
| Start sprint | "Start sprint: [tasks]" |
| Check sprint status | "Sprint status" |
| Sprint review | "Sprint review" |
| Run retro | "Sprint retro" |
| Skip retro | "Skip retro" |
| Add task to NEXT sprint | "Next sprint: [task]" |
| Emergency scope add | "Add to current sprint: [task]" (I will confirm) |

---

## Tool Tracking → OpenFang Hand Automation

When a pattern hits 3 uses in a sprint cycle:

| Pattern | Proposed Hand | Location |
|---------|--------------|----------|
| Vault ingest | `wiki-keeper` | `tools/agent-stack/` |
| Build verification | `build-guard` | `tools/agent-stack/` |
| Memory sync post-sprint | `memory-sync` | `tools/agent-stack/` |
| Security audit | `security-hand` | `tools/agent-stack/` |
| Component generation | `component-gen` | `tools/agent-stack/` |

I propose. Alex decides. No automation without explicit approval.

---

## Context Chain

<- inherits from: `cline/boot/CLINE_BOOT.md`
-> overrides by: none
-> lessons: `workspace/memory/LESSONS.md`
-> stack: `workspace/DNA/ops/STACK.md`
-> decisions: `workspace/DNA/ops/DECISION_LOG.md`