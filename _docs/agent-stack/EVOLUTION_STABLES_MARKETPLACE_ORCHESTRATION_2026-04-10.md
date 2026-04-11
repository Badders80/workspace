# Evolution Stables Marketplace Orchestration Blueprint

Updated: 2026-04-10
Status: ACTIVE - v0.0 managed delivery model

## Purpose

Define how the Evolution Stables marketplace build is run with the current
workspace stack before provider lock-in. The goal is to keep delivery fast,
keep SSOT ownership clean, and let the human stay at the board-seat level while
specialist lanes support each stage.

## Core Rules

- Human stays in the board seat for scope, budget, provider choice, and stage
  approval.
- `SSOT_Build` owns canonical horse, lease, and offering data.
- New horse records are authored in `SSOT_Build`; generated docs are downloaded
  and stored locally during v0.0.
- `Evolution_Platform` owns presentation, investor flow, and later transaction
  handling.
- Published marketplace payloads flow from `SSOT_Build` into
  `Evolution_Platform`; Platform does not author canonical horse or lease
  truth.
- Assets are referenced by metadata rather than embedded into canonical
  records.
- Provider choices stay behind interfaces until the seams are proven.
- Current governance is still one writer, many reviewers. Parallel sidecars are
  allowed as read-only or bounded planning lanes, not as competing autonomous
  code writers.

## Build Layers

- Knowledge layer: `/home/evo/workspace/projects/SSOT_Build`
- Publish layer:
  `/home/evo/workspace/projects/SSOT_Build/scripts/publish-marketplace-v0.mjs`
- Experience layer:
  `/home/evo/workspace/projects/Evolution_Platform`
- Asset layer: local files first, with Google Drive acceptable as an asset and
  evidence holding surface
- Transaction layer: manual or local-first until the provider seam is ready to
  be promoted

## Stage Map

### Stage 0 - Contract Lock

Objective:
- Lock module boundaries, publishing rules, and operating constraints without
  locking external partners.

Primary surfaces:
- `SSOT_Build` contracts
- Platform consumption boundaries
- Marketplace payload shape

Lead:
- Codex

Review sidecars:
- Hermes
- `claude-fast`
- OpenFang `build-workspace`

Exit criteria:
- `SSOT_Build` authoring boundary is explicit
- Platform consumption boundary is explicit
- provider seams are named but uncommitted

### Stage 1 - SSOT Live Knowledge Hub

Objective:
- Stabilize `SSOT_Build` as the live local-first knowledge hub for horses,
  leases, and offering metadata.

Primary surfaces:
- `intake/v0.1/seed.json`
- SSOT contracts
- local generated documents
- asset metadata conventions

Lead:
- Codex

Review sidecars:
- `claude-debug`
- `claude-audit`
- OpenFang `audit-workspace`

Exit criteria:
- new horse intake is clean and repeatable
- canonical data lives in one place
- document outputs are reproducible from canonical records

### Stage 2 - Publish Surface

Objective:
- Formalize the read-only marketplace payload that `Evolution_Platform`
  consumes.

Primary surfaces:
- SSOT publisher
- generated marketplace JSON
- field mappings and type contract

Lead:
- Codex

Review sidecars:
- `claude-fast`
- `claude-audit`
- OpenFang `evolution-workspace`

Exit criteria:
- one command or one documented flow republishes listing truth
- Platform reads published output, not ad hoc edits
- no canonical truth leaks into Platform-only files

### Stage 3 - Marketplace Experience MVP

Objective:
- Ship the investor-facing marketplace slice on top of published SSOT data.

Primary surfaces:
- listing grid
- horse detail page
- checkout placeholder or manual transaction capture
- investor dashboard shell

Lead:
- Codex

Review sidecars:
- `claude-debug`
- `claude-audit`

Exit criteria:
- horse browse and detail flow is real
- purchase intent capture is real
- dashboard reflects the current v0.0 manual reality truthfully

### Stage 4 - Manual Transaction Ops

Objective:
- Make the manual transaction layer operational before automating providers.

Primary surfaces:
- order intake
- cap-table export
- manual payout workflow notes
- founder or admin review surface

Lead:
- Codex

Review sidecars:
- Hermes
- `claude-audit`
- OpenFang `audit-workspace`

Exit criteria:
- orders can be captured and reconciled manually
- ops state is not hidden in random files
- the next provider seam is obvious from real use

### Stage 5 - Provider Seams

Objective:
- Introduce payment, KYC, notification, and order-store adapters only after
  the manual flow proves the boundary.

Primary surfaces:
- gateway interfaces
- adapter contracts
- env requirements
- reconciliation rules

Lead:
- Codex

Review sidecars:
- `claude-debug`
- `claude-audit`
- explicit hosted review lane if needed

Exit criteria:
- one provider can be swapped without reshaping the whole app
- write boundaries still hold
- vendor choice is driven by fit, not drift

### Stage 6 - Hardening And Release

Objective:
- Turn the MVP from a promising slice into a trustworthy operating surface.

Primary surfaces:
- tests
- smoke checks
- manual ops checklist
- deployment and rollback notes

Lead:
- Codex

Review sidecars:
- `claude-audit`
- OpenFang `audit-workspace`

Exit criteria:
- `just check` is green
- manual release checklist is clear
- residual risks are known and accepted

## Agent Roles

### Human

Authority:
- choose the stage
- approve scope
- approve provider moves
- approve release

Default posture:
- managed layer
- board seat
- interruption point for major direction changes

### Codex

Authority:
- primary delivery orchestrator
- default and only active code writer unless a narrower write scope is
  explicitly delegated later
- owner of tracked implementation, tests, docs, and final synthesis

Default posture:
- lead builder
- stage manager
- integration owner

### Hermes

Authority:
- brief refinement
- sequencing
- decision framing
- prompt shaping for bounded hands

Default posture:
- strategy desk
- human-facing prep layer

### `claude-fast`

Authority:
- fast local scout
- simplify the slice
- propose thin vertical cuts

Default posture:
- read-only triage lane

### `claude-debug`

Authority:
- trace logic
- challenge implementation assumptions
- review awkward code paths

Default posture:
- read-only debugger lane

### `claude-audit`

Authority:
- find regressions
- inspect trust gaps
- challenge release readiness

Default posture:
- read-only auditor lane

### OpenFang `evolution-workspace`

Authority:
- bounded retrieval from tracked workspace files

Default posture:
- context fetcher

### OpenFang `build-workspace`

Authority:
- planning
- exact command suggestions
- bounded work breakdown

Default posture:
- non-writing planner

### OpenFang `audit-workspace`

Authority:
- governance checks
- runtime-separation checks
- review prompts

Default posture:
- boundary reviewer

### OpenFang `production-studio`

Authority:
- packaging for approved content workflows

Default posture:
- manual-ready content packager

## Preset Environments

### Preset 1 - Strategy

Use for:
- scoping
- stage selection
- architecture cuts
- deciding what not to build yet

Launch shape:
- `cd /home/evo/workspace`
- `just hermes`
- `claude-fast`
- `just fang-local`

Write rule:
- Codex may update docs if a decision or blueprint is being locked

### Preset 2 - SSOT

Use for:
- horse intake
- lease structure
- publishing contracts
- local document generation rules

Launch shape:
- `cd /home/evo/workspace/projects/SSOT_Build`
- Codex main lane
- `claude-debug`
- `claude-audit`

Write rule:
- only Codex writes canonical SSOT files

### Preset 3 - Marketplace Slice

Use for:
- listing flow
- detail page
- checkout slice
- investor dashboard

Launch shape:
- `cd /home/evo/workspace/projects/Evolution_Platform`
- Codex main lane
- `claude-debug`
- `claude-audit`

Write rule:
- only Codex writes active Platform implementation files

### Preset 4 - Audit

Use for:
- pre-merge review
- release hardening
- contract drift checks

Launch shape:
- `cd /home/evo/workspace`
- `claude-audit`
- `just fang-audit`
- `just check`

Write rule:
- findings first
- no new feature work unless a blocker fix is approved

### Preset 5 - Sandbox Lab

Use for:
- provider experiments
- prompt experiments
- launcher experiments
- workflow trials

Launch shape:
- `cd /home/evo/workspace/_sandbox`
- local Claude lanes as needed
- OpenFang only if the experiment is bounded

Write rule:
- no direct promotion into active project surfaces without a deliberate handoff

## Handoff Rules

1. Human names the goal and selects the current stage.
2. Hermes or Codex turns the goal into a bounded task packet.
3. Codex declares the active write surface before implementation.
4. Sidecars stay read-only unless governance changes.
5. `SSOT_Build` changes land in `SSOT_Build` first; `Evolution_Platform`
   consumes published results.
6. Experiments start in `_sandbox` and are promoted only after review.
7. Session close always records `Done`, `Next`, `Blocked`, and `Decisions`.
8. If the operating model changes, update `TRANSITION.md`, `DECISION_LOG.md`,
   and any affected stack docs together.

## Touch Boundaries

| Surface | Allowed To Touch Now | Not Allowed To Touch Now |
| --- | --- | --- |
| Human | scope, stage, budget, go/no-go, vendor decisions | hidden routing or silent approvals |
| Codex | tracked docs, code, tests, contracts in approved scope | unrelated worktree changes, hidden provider lock-in |
| Hermes | briefs, framing, summaries, handoff prep | autonomous repo mutation |
| `claude-fast` | review notes, options, simplification advice | canonical writes |
| `claude-debug` | bug hypotheses, logic reviews, edge-case checks | canonical writes |
| `claude-audit` | findings, release risk, trust-gap review | canonical writes |
| OpenFang `evolution-workspace` | bounded retrieval | writes |
| OpenFang `build-workspace` | plans and command suggestions | writes |
| OpenFang `audit-workspace` | governance and runtime checks | writes |
| OpenFang `production-studio` | approved packaging work | product implementation writes |
| Hosted routes | explicit second-pass review when local lanes stall | becoming the silent default |

## Default Operating Loop

1. Human chooses the stage and names the desired outcome.
2. Codex writes or refines the stage packet.
3. `claude-fast` pressure-tests scope if the slice still feels too large.
4. Codex implements the approved slice.
5. `claude-debug` is brought in if logic or integration gets sticky.
6. `claude-audit` or OpenFang `audit-workspace` reviews the result.
7. Human approves promotion, revision, or rollback.

## Immediate Recommendation For This Build

Run the marketplace with this order:

1. Stage 0: lock the orchestration and publishing rules.
2. Stage 1: harden `SSOT_Build` as the live knowledge hub.
3. Stage 2: formalize the publish contract into `Evolution_Platform`.
4. Stage 3: upgrade the current marketplace surfaces into a real MVP slice.
5. Stage 4: keep transactions manual until the real seam is obvious.
6. Stage 5: only then choose payment, KYC, notification, and order-store
   providers.

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
