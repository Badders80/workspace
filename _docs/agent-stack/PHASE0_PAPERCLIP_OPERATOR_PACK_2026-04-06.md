# Phase 0 Paperclip Operator Pack

Updated: 2026-04-06
Status: active operator pack for loading the first bounded marketplace company

## Purpose

Turn the marketplace planning surface into a concrete Phase 0 operating pack for
Paperclip.

This pack answers:

- which roles are active now
- which roles are parked
- what each active agent should do
- what each active agent should not do
- what the first ticket queue should be
- what should be paused to prevent Paperclip from overthinking

Use this when the goal is execution, not further design.

## Core Rule

Paperclip is the executor and orchestration surface.
It is not the place where the org should invent itself from scratch.

Design the operating model here.
Load the resulting roles and tickets into Paperclip.
Keep the agent layer narrow.

## Phase 0 Active Role Set

The smallest useful active set is:

- `CEO`
- `ExecutionWorker`
- `VerificationWorker`

Optional but not central:

- `HeadHunter`

### Why This Is the Right Minimum

- `CEO` keeps approvals, scope control, and escalation in one place
- `ExecutionWorker` produces the actual bounded artifacts
- `VerificationWorker` checks outputs and keeps quality independent from delivery
- `HeadHunter` can help shape hiring or future role briefs, but is not required
  for the first proof once the initial role set is already decided

## Roles to Keep Parked

Do not activate these as standalone Paperclip agents yet:

- Product Owner
- Project Manager
- Brand Director
- UX/UI Designer
- CX Strategist
- Compliance Officer
- Investor Comms Manager
- Content Strategist
- Data Architect
- Solutions Architect
- Full Stack Engineer
- QA Engineer
- DevOps Engineer
- Audit Lead
- Agent Approval Auditor
- Compliance Auditor
- Brand Integrity Auditor
- Architecture Auditor
- Security Auditor
- UX/CX Auditor
- Performance Auditor
- R&D Director
- Innovation Curator
- Sandbox Engineer
- Research Specialists

These remain valid North Star roles.
They are parked because Phase 0 should prove the control layer before role
explosion begins.

## Reporting Structure

Use this reporting model in Phase 0:

- `CEO`
  - `ExecutionWorker`
  - `VerificationWorker`

If `HeadHunter` remains present:

- `CEO`
  - `HeadHunter`
  - `ExecutionWorker`
  - `VerificationWorker`

Do not make `HeadHunter` the manager of `ExecutionWorker`.
Do not make `VerificationWorker` subordinate to delivery pressure.

## Role Definitions

## CEO

### Purpose

Acts as Founder bridge and top-level operating authority inside the sandbox
company.

### Owns

- approval flow
- delegation
- scope control
- escalation
- final decision support for the Founder
- queue discipline

### Does Not Own

- hands-on specialist execution by default
- audit self-approval
- broad architecture invention without approval
- uncontrolled agent creation

### Success Definition

- tasks stay small and reviewable
- approvals are explicit
- no path drift
- no authority confusion
- no ticket starts without a proper contract

## ExecutionWorker

### Purpose

Performs the actual bounded work assigned in Paperclip.

### Owns

- producing the requested artifact
- staying inside the allowlist
- following the ticket contract
- escalating when scope is unclear
- documenting assumptions

### Does Not Own

- approving its own work
- expanding authority
- changing the org design
- spawning more agents
- making audit decisions

### Success Definition

- fast, clean delivery
- low rework
- explicit assumptions
- crisp handoff package to review

## VerificationWorker

### Purpose

Checks ExecutionWorker output against the ticket contract and review rubric.

### Owns

- evidence-based review
- pass/hold/fail recommendation
- identifying missing requirements
- identifying scope drift
- identifying compliance, quality, or clarity gaps at the bounded-task level

### Does Not Own

- doing the delivery work itself
- silently rewriting the assignment
- approving major governance changes
- acting as the whole Audit Company

### Success Definition

- catches meaningful gaps early
- explains findings with evidence
- stays independent from delivery pressure
- makes it easy for the CEO and Founder to decide

## HeadHunter

### Purpose

Temporary hiring-lane specialist.

### Phase 0 Status

Optional or parked after the initial role set is defined.

### Owns

- role briefs
- scorecards
- interview packets
- recommendations on who should be hired or created next

### Does Not Own

- broad org strategy
- execution management
- engineering authority
- audit authority

### Recommendation

Once the first three active roles are loaded and stable, pause `HeadHunter`
until there is a real need to define another role.

## Loading Order

Load roles in this order:

1. `CEO`
2. `ExecutionWorker`
3. `VerificationWorker`
4. `HeadHunter` only if needed for later role-definition work

## Approved First Ticket Queue

Do not flood the queue.
Start with a small ordered set.

## Queue 1. Marketplace Truth Surfaces

Assign to `ExecutionWorker`.
Review with `VerificationWorker`.
Approve with `CEO`.

### Ticket 1

`FOUNDATION: Write marketplace glossary and hard language constraints`

Expected artifact:

- glossary of sanctioned marketplace terms
- banned language list
- investor-facing language rules

### Ticket 2

`FOUNDATION: Write investor journey map for the domestic marketplace`

Expected artifact:

- end-to-end investor journey from discovery to portfolio ownership
- key trust and friction points

### Ticket 3

`FOUNDATION: Write Phase 0 compliance and brand review checklist`

Expected artifact:

- review checklist for investor-facing copy and flows
- pass/hold/fail review structure

## Queue 2. Bounded Product Planning

Only after Queue 1 reviews cleanly.

### Ticket 4

`FEATURE: Draft one bounded investor-facing mock flow`

Expected artifact:

- one mock flow only
- no production code path
- no live integration assumptions

### Ticket 5

`AUDIT: Review the bounded mock flow against compliance, brand, and scope`

Expected artifact:

- explicit pass/hold/fail review
- concrete findings only

## Queue 3. Post-Proof Role Definition

Only after the first bounded proof loop works.

Assign to `HeadHunter` only if still needed.

### Ticket 6

`FOUNDATION: Define the next active engineering role after Phase 0 proof`

### Ticket 7

`FOUNDATION: Define the first audit-lane specialist to promote after Phase 0`

## Ticket Contract Template

Every active ticket should include:

- Goal
- Allowlist
- Budget rule
- Expected artifact
- Definition of Done
- Owner / approver
- Runtime route
- Result log

### Recommended Ticket Footer

Use this on every Paperclip ticket:

```text
Allowlist:
- /home/evo/workspace/_sandbox/agent-stack/
- /home/evo/workspace/_docs/agent-stack/

Budget rule:
- Zero-spend or approved free route only unless Founder changes the cap

Definition of Done:
- Artifact produced in the approved path
- Assumptions listed
- No writes outside allowlist
- Ready for verification review

Owner / approver:
- Owner: assigned worker
- Review: VerificationWorker
- Final approval: CEO / Founder bridge
```

## What to Pause or Stop

Pause or stop the following behaviors immediately:

- asking Paperclip to decide the org design
- asking `HeadHunter` to think through the entire system
- creating multiple speculative agents before the first proof
- using broad “build the marketplace” tickets
- treating run logs as finished deliverables

## What the Human Still Needs to Click

The remaining UI work should be narrow:

- confirm `CEO` instructions are correct
- create `ExecutionWorker`
- create `VerificationWorker`
- optionally pause `HeadHunter`
- load the first three tickets
- review outputs rather than logs

## What Can Be Prepared Outside the UI

These should be prepared before or alongside loading Paperclip:

- agent instruction text
- ticket text
- review rubrics
- glossary and language rules
- investor journey map outline

## Definition of Done for This Operator Pack

This pack is successfully applied when:

- the active role set is only the approved minimum
- each active agent has a clear mandate
- the first queue is small and bounded
- the org is no longer inventing itself inside Paperclip
- the Founder can review outputs without reading raw runtime logs

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
