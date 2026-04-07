# Phase 0 Marketplace Readiness Checklist

Updated: 2026-04-06
Status: active sandbox-only checklist for the first Paperclip marketplace proof

## Purpose

Turn the marketplace game plan into a bounded Phase 0 readiness gate for the
agent-stack sandbox.

This checklist is not the North Star architecture.
It is the minimum honest operating position required before live marketplace
work starts moving through Paperclip.

## Phase 0 Truth

- One Paperclip deployment under `/home/evo/workspace/_sandbox/agent-stack/`
- One sandbox company only
- Build, Audit, and R&D represented as logical lanes, not full autonomous companies
- OpenFang is the only executor
- Founder remains the approval bridge
- No broad repo write access
- No production deploys

## Sandbox Boundary Rule

Before any marketplace ticket is considered ready, confirm:

- Runtime state stays under `/home/evo/workspace/_sandbox/agent-stack/`
- Governed docs stay under `/home/evo/workspace/_docs/agent-stack/`
- Shared secret use is read-only from `/home/evo/.env`
- No new workspace-wide tooling changes are introduced for convenience
- No product repo is added to the write surface unless explicitly approved

If a task requires changing shared workspace tooling, stop and reclassify it as
separate Foundation work instead of sneaking it into the marketplace trial.

## Go/No-Go Checklist

### 1. Runtime Readiness

- [ ] `just check` is green before startup
- [ ] `paperclip-trial.sh start` brings Paperclip up cleanly
- [ ] `openfang-trial.sh start` works on the intended route
- [ ] the active route is explicit and documented before use
- [ ] logs are easy to inspect for all three surfaces: Paperclip, OpenFang, Ollama
- [ ] restart and shutdown flow are repeatable from `RUNBOOK.md`

No-Go if:
- Paperclip needs ad hoc shell fixes to boot
- OpenFang route selection is ambiguous
- the only way to understand a failure is live shell archaeology

### 2. Lane Readiness

- [ ] Build lane exists and has a clear execution mandate
- [ ] Audit lane exists and is independent in review role
- [ ] R&D lane exists as a planning or backlog lane only
- [ ] Founder approval bridge is explicit between lanes
- [ ] no lane can bypass the Founder in Phase 0

No-Go if:
- one lane can silently task another
- Audit is acting like execution
- R&D is treated as a prerequisite for the first ticket

### 3. Ticket Contract Readiness

- [ ] every ticket has a class: `FOUNDATION`, `FEATURE`, `OPERATING TRIAL`, or `AUDIT`
- [ ] every ticket defines allowed paths
- [ ] every ticket defines expected output
- [ ] every ticket defines the approval gate
- [ ] every ticket defines who can close it
- [ ] every ticket is small enough to review in one pass

No-Go if:
- the ticket says “build the marketplace”
- write authority is implied instead of named
- the output is open-ended or impossible to audit quickly

### 4. Marketplace Constraint Readiness

- [ ] investor-facing language uses `Ownership Stake`
- [ ] British English rule is explicit in prompts and review
- [ ] no financial-advice language is allowed
- [ ] the brand kit is available before design or copy work starts
- [ ] compliance and brand checks are defined before feature execution
- [ ] provider-dependent surfaces are described abstractly, not hard-wired too early

No-Go if:
- compliance language is still fuzzy
- brand rules live only in memory
- a provider decision is being hard-coded before the flow is proven

### 5. First Proof Scope Readiness

- [ ] the first workflow is internal and bounded
- [ ] the first proof requires no production deployment
- [ ] the first proof is reversible
- [ ] the first proof can be reviewed by the Founder quickly
- [ ] success and failure criteria are written before execution

No-Go if:
- the first proof depends on full marketplace architecture
- the first proof requires customer-facing launch
- the first proof needs autonomous multi-agent sprawl to succeed

## First Ticket Types

These are the first sanctioned ticket types for Phase 0:

### OPERATING TRIAL

Purpose:
Runtime health check, route verification, startup or shutdown reporting, ticket
flow proving, and sandbox-boundary confirmation.

Definition of done:
- reports current runtime truth
- names any blocker clearly
- does not widen authority

### FOUNDATION

Purpose:
Marketplace glossary, language rules, brand rules, compliance checklist,
investor journey map, prompt constraints, and other reusable truth surfaces.

Definition of done:
- reusable beyond one task
- reviewed by Founder before feature execution depends on it

### FEATURE

Purpose:
One bounded investor-facing mock flow or component flow that sits inside the
approved sandbox scope.

Definition of done:
- bounded output only
- no production path
- passes brand and compliance review

### AUDIT

Purpose:
Review checklist execution against compliance, brand, architectural discipline,
ticket scope, or allowlist boundaries.

Definition of done:
- explicit pass, fail, or hold outcome
- findings are concrete and actionable

## First Five Recommended Tickets

1. `OPERATING TRIAL` - runtime health check and daily report
2. `FOUNDATION` - marketplace glossary and hard language constraints
3. `FOUNDATION` - investor journey map for the domestic marketplace
4. `FEATURE` - one bounded investor-facing mock flow
5. `AUDIT` - review against compliance and brand rules

## Anti-Tangent Guardrails

- Do not refactor wider workspace tooling to make the sandbox feel cleaner
- Do not move agent-stack launchers into `_scripts/` yet
- Do not introduce extra agents because the North Star mentions them
- Do not let R&D become a prerequisite for the first Build proof
- Do not widen write access to active repos during Phase 0
- Do not confuse “interesting architecture” with “required to start”

## Ready Means

The marketplace trial is ready to begin only when:

- the sandbox runtime is stable
- the lane model is clear
- the first tickets are small and reviewable
- the brand and compliance constraints are written down
- the first proof can succeed without touching production or restructuring the workspace

## Not Ready Means

Pause and do not start live marketplace tickets if:

- Paperclip or OpenFang still require active debugging to stay up
- approval boundaries are unclear
- the first ticket scope is vague
- shared workspace changes are becoming a side quest
- the team is talking more about future architecture than the first bounded proof

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
