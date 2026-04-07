# Marketplace Phased Execution Plan

Updated: 2026-04-06
Status: active planning companion to the Phase 0 readiness checklist

## Purpose

Turn the Evolution Stables Domestic Marketplace game plan lineage into one
working execution document that:

- preserves the full marketplace scope
- separates current truth from target-state architecture
- breaks the work into phased operating steps
- makes clear what must happen now, what comes after proof, and what stays parked

This document is a companion to:

- `/home/evo/workspace/_docs/agent-stack/PHASE0_MARKETPLACE_READINESS_CHECKLIST_2026-04-06.md`

The checklist is the go/no-go gate.
This plan is the fuller map.

## Source Lineage

This document condenses and reconciles:

- `C:\Users\Evo\Downloads\EVO_Marketplace_GamePlan_v2.3.docx`
- `C:\Users\Evo\Downloads\EVO_Marketplace_GamePlan_v2_4.txt`
- `C:\Users\Evo\Downloads\EVO_Marketplace_GamePlan_v2_5.docx`

Lineage summary:

- `v2.3` carries the broadest North Star operating vision, including the
  three-company model and the fullest Ruflo-centered R&D posture.
- `v2.4` keeps that scope and adds the memory-layer and research-tool radar.
- `v2.5` is the most operationally honest version. It keeps the vision but
  splits it into North Star, live sandbox truth, and bounded Phase 0 charter.

This plan follows `v2.5` as the live baseline while preserving the additional
scope from `v2.3` and `v2.4` as later-phase or parked work.

## What We Are Building

Evolution Stables is building a domestic NZ investor marketplace for fractional
thoroughbred ownership stakes, integrated into `evolutionstables.nz`.

The full product scope remains:

- investor onboarding and KYC in a provider-agnostic structure
- Ownership Stake browsing and listing discovery
- stake purchase flow and transaction management
- investor portfolio dashboard for holdings, distributions, and horse updates
- investor communications that are automated, templated, and on-brand

The Founder continues to manage the owner and issuer side directly.
The agent system supports the investor-facing demand side only.

## Non-Negotiable Standing Orders

The following remain in force across every phase:

- British English only
- `Ownership Stake` is the sanctioned investor-facing term
- no financial advice language
- gold is accent-only and never the dominant surface
- brand kit review before visual or written output is treated as final
- provider integrations remain abstracted
- no autonomous production deploys
- agents propose and the Founder decides
- Audit remains independent from Build execution
- no new agent or skill activation without explicit approval
- budget limits are hard stops
- no broad repo write access in Phase 0
- sandbox work remains under governed workspace paths

## Layer Model

To avoid mixing ambition with immediate execution, every decision should be
sorted into one of four layers.

### Layer 1. Live Truth

What is actually wired and usable now:

- one Paperclip deployment under `/home/evo/workspace/_sandbox/agent-stack/`
- one sandbox company
- one active execution surface
- governed docs under `/home/evo/workspace/_docs/agent-stack/`
- explicit allowlist discipline
- Founder approval bridge

### Layer 2. Phase 0

What starts immediately:

- bounded operating-layer proof
- ticket flow, result logging, approval discipline
- planning and documentation outputs
- narrow internal artifacts
- no broad product-repo write scope

### Layer 3. Phase 1 to Phase 4 Build Roadmap

What the marketplace still needs once the control layer is proven:

- foundations and onboarding
- listings and discovery
- transactions
- engagement and retention

### Layer 4. Parked or Target State

What stays visible but does not block the current phase:

- fuller multi-lane activation
- richer memory layer
- Ollama-first promotion
- separate R&D runtime hardening
- broader specialist swarm activation
- three distinct deployed Paperclip companies

## Operating Model by Maturity

### North Star Model

The long-term operating system remains:

- Build Company
- Audit Company
- R&D and Innovation Engine

Those may eventually become distinct deployed surfaces.
They are still the correct logical model.

### Live Phase 0 Model

The first proof stays much smaller:

- one sandbox company only
- Build, Audit, and R&D represented as logical lanes, projects, or queues
- Founder as the approval bridge
- one bounded execution path

This is not a retreat from the vision.
It is the execution order required to reach it honestly.

## Full Marketplace Scope by Phase

## Phase 0. Sandbox Proof and Control Layer

### Objective

Prove Paperclip can govern one bounded marketplace workstream end to end without:

- path drift
- budget ambiguity
- authority confusion
- silent scope expansion

### In Scope

- align runtime truth to the actual sidecar bootstrap path
- create or normalize the sandbox company and budget rules
- confirm the only approved executor path for the trial
- define ticket classes, labels, approvals, and output rules
- run bounded planning, documentation, and operating-trial tickets
- prove result logging and blocked or requeue handling
- keep all outputs inside explicit allowlists

### Out of Scope

- broad product-repo writes
- KYC provider integration
- payment rail integration
- real money flows
- full Obsidian migration
- local-first runtime promotion as a prerequisite
- separate deployed companies before proof

### Required Outputs

Phase 0 should produce:

- runtime truth docs
- allowlist rules
- budget rules
- role and lane definitions
- ticket templates
- approval rules
- first bounded planning artifacts
- first reusable marketplace truth surfaces

### Required Ticket Fields

Every Phase 0 ticket must define:

- goal
- allowlist
- budget rule
- expected artifact
- definition of done
- owner and approver
- runtime route
- result log surface

### Success Criteria

Phase 0 is successful only if:

- ticket creation to approval to dispatch to result is repeatable
- budget is visible and understood
- writes stay inside the allowlist
- at least three bounded tickets complete cleanly
- at least one blocked or requeued case is handled cleanly
- output quality is good enough to justify expansion

### Immediate Deliverables

Before leaving Phase 0, the operating layer should have:

- clear lane model
- clear approval model
- clear task classification rules
- clear runtime truth
- first marketplace glossary and language rules
- first investor journey map
- first compliance and brand review surfaces

## Phase 1. Foundations and Onboarding

### Objective

Stand up the first real investor-facing foundations once the control layer is
proven.

### Scope

- company mission and active-role manifests needed for execution
- approved brand kit
- core data schemas
- integration contracts
- investor registration
- profile creation
- KYC wrapper in provider-agnostic form
- basic authentication and investor portal shell
- staging pipeline

### Build Outputs

- registration flow
- investor profile model
- KYC abstraction layer
- initial authenticated dashboard shell
- approved component-library entries

### Audit Requirements

Before Phase 1 is considered complete, outputs must pass:

- compliance review
- brand review
- architecture review
- security review
- Founder review

### Gate to Phase 2

Do not advance unless:

- onboarding works end to end in staging or sandbox-approved form
- KYC abstraction is explicit even if the final provider choice is still pending
- schemas and contracts are written down
- investor-facing language passes review

## Phase 2. Listings and Discovery

### Objective

Expose the inventory and discovery layer for Ownership Stakes.

### Scope

- Ownership Stake listing display fed from SSOT
- syndicate structure and pricing views
- horse profile pages
- coming-soon campaign infrastructure
- expanded and documented component library

### Build Outputs

- listings index
- listing detail pages
- horse profile views
- discovery and browsing patterns
- campaign capture surfaces

### Audit Requirements

Phase 2 must pass:

- Audit review
- UX and CX review
- performance review
- Founder approval for expansion

### Gate to Phase 3

Do not advance unless:

- listings are accurate and governed
- pricing and syndicate presentation are clear and compliant
- pages perform acceptably on mobile
- component reuse is documented rather than ad hoc

## Phase 3. Transactions

### Objective

Enable the investment action layer without breaking governance or compliance.

### Scope

- stake purchase flow
- payment rail abstract wrapper
- transaction record
- confirmation flow
- investor portfolio dashboard
- investor communications suite

### Build Outputs

- transaction-ready purchase journey
- transaction records and confirmations
- holdings and portfolio views
- post-purchase communication templates

### Critical Dependencies

The following decisions must be settled before this phase goes live:

- KYC provider
- payment rail provider
- approval rules for any real-money or regulated flow

### Audit Requirements

This phase requires pass results from all relevant auditors and explicit Founder
manual approval.

No real investor money should touch the platform before this gate passes.

## Phase 4. Engagement and Retention

### Objective

Deepen the ongoing investor relationship and information loop.

### Scope

- race-day update feeds
- automated investor notifications
- educational content infrastructure
- Founder-facing performance analytics

### Build Outputs

- ongoing update surfaces
- notification cadence
- educational content delivery structure
- performance and retention dashboards

### Gate

Advance only if:

- the platform is stable post-transaction
- communications remain compliant and on-brand
- operational reporting is reliable

## Cross-Cutting Tracks

Every phase carries work in parallel across the following tracks.

## Track A. Product and Experience

This track covers:

- investor journey
- UX and CX design
- interface patterns
- component library
- content architecture

Primary dependency:
- experience design must be defined before engineering scales a feature

## Track B. Compliance and Language

This track covers:

- FMA guardrails
- AML and CFT considerations
- Privacy Act considerations
- investor-facing language rules
- no-financial-advice constraints

Primary dependency:
- no investor-facing flow should bypass compliance review

## Track C. Architecture and Data

This track covers:

- schemas
- data contracts
- integration contracts
- provider abstraction
- runtime boundaries

Primary dependency:
- no significant build expansion without written contracts

## Track D. Runtime and Orchestration

This track covers:

- Paperclip orchestration
- executor routing
- budget controls
- allowlists
- logging
- retry and blocked behavior

Primary dependency:
- runtime truth must be explicit before scaling task volume

## Track E. Audit and Governance

This track covers:

- audit independence
- role activation approval
- brand integrity
- architecture review
- security review
- UX and performance review

Primary dependency:
- Build execution cannot silently self-approve

## Track F. R&D and Research

This track covers:

- provider research
- future tooling evaluation
- prototype investigations
- innovation backlog

Primary dependency:
- R&D remains bounded and non-blocking until the control layer is proven

## Role Activation by Phase

The game plan names many roles.
Not all of them should be activated at once.

### Phase 0 Active Roles

Recommended active or directly represented roles:

- Founder as approval bridge
- CEO as delegation and operating authority
- one execution role or equivalent worker
- one verification or QA role or equivalent worker
- one audit approval surface, even if still lane-based

### Phase 0 Logical but Not Fully Active Roles

These should exist as role lenses, documentation surfaces, or approval concepts
before they become dedicated agents:

- Product Owner
- Project Manager
- Brand Director
- Compliance Officer
- Data Architect
- QA Engineer

### Phase 1 to Phase 2 Promotion Candidates

Promote only when the workstream justifies it:

- UX or UI Designer
- CX Strategist
- Investor Comms Manager
- Content Strategist
- Solutions Architect
- Full Stack Engineer
- DevOps Engineer

### Later-Phase or Retained Specialist Activation

Promote only after repeated need is proven:

- deeper frontend specialists
- deeper backend specialists
- integration specialists
- performance specialists
- security specialists
- cross-browser specialists

## Audit Structure by Phase

### Phase 0

Audit may be lane-based inside the one sandbox company, but it must still be
functionally independent from Build execution.

### Phase 1 Forward

The audit model should explicitly cover:

- Audit Lead
- Agent Approval Auditor
- Compliance Auditor
- Brand Integrity Auditor
- Architecture Auditor
- Security Auditor
- UX and CX Auditor
- Performance Auditor

These do not all need dedicated agents immediately, but they do need explicit
review ownership.

## R&D Structure by Phase

### Phase 0

R&D is a parked or bounded lane.
It may collect findings and research packaging.
It must not become a prerequisite for the first proof.

### After Proof

R&D may grow into:

- R&D Director
- Innovation Curator
- Sandbox Engineer
- Research Specialists

### Still Parked Until Justified

The following remain visible but parked:

- Ruflo as a required runtime dependency
- nightly autonomous innovation cycles
- richer memory tooling as a gating dependency
- high-autonomy agent swarms leaving the sandbox

## Runtime Strategy by Phase

## Phase 0 Live Runtime Truth

For now, planning should reflect live reality rather than target-state intent:

- Paperclip is the orchestration, queue, approval, and logging surface
- one approved execution path is used for the bounded proof
- budget remains conservative or zero-spend unless explicitly changed
- write scope is explicit allowlist only

### Phase 0 Hardening Targets

- prove company and budget setup
- prove executor registration and heartbeat
- prove ticket dispatch and result logging
- prove blocked and retry handling
- keep path control explicit

## Target-State Runtime Direction

Still visible, but not a start blocker:

- local-first OpenFang daily execution
- stronger local-model promotion
- external models as logged exception path
- richer memory layer later
- separate R&D runtime later

## Skills and Agent Governance by Phase

### Always True

- Tier 1 first
- Tier 2 only after evaluation
- Tier 3 only when nothing suitable exists and approval is explicit

### Before Multi-Agent Expansion

Every specialist agent ultimately needs:

- Job Description
- `CONTEXT_MANIFEST.md`
- `HAND.toml`
- `SKILL.md`

### Phase 0 Minimum

Do not block first proof on full manifest coverage.
Do require the minimum viable ticket contract on every task.

## Memory and Knowledge by Phase

### Phase 0

Use governed markdown and Paperclip history as the active memory surface.
Do not block on full Obsidian or RAG setup.

### After Proof

Obsidian may become the human navigation layer.
LightRAG or richer retrieval may be added only once basic discipline is stable
and retrieval is the real bottleneck.

## Parked Items and Reactivation Triggers

The following items stay parked until the named condition is true.

### Ollama-First Promotion

Status:
- target state

Reactivate when:
- bounded tickets are stable and the executor flow is proven

### Ruflo Innovation Auditor

Status:
- assess

Reactivate when:
- a separate R&D trial plan is approved

### LightRAG

Status:
- assess

Reactivate when:
- retrieval becomes a real bottleneck rather than an imagined future need

### RAG-Anything

Status:
- assess

Reactivate when:
- text-first retrieval proves useful and multimodal retrieval is justified

### DeerFlow

Status:
- assess

Reactivate when:
- autonomy pressure is justified after later phases, not before

### Three Separate Paperclip Instances

Status:
- target state

Reactivate when:
- the one-company sandbox proves a real need for stronger deployment isolation

## Immediate Ordered Steps

The following is the current phased order of work.

### Step 1. Stabilize Runtime Truth

- ensure Paperclip boots cleanly
- ensure the approved execution path is explicit
- ensure logs and restart surfaces are documented
- ensure the budget rule is visible

### Step 2. Lock the Phase 0 Operating Contract

- finalize lane model
- finalize approval model
- finalize allowlists
- finalize ticket class rules
- finalize result logging expectations

### Step 3. Build the First Reusable Truth Surfaces

- marketplace glossary
- hard language constraints
- investor journey map
- compliance review baseline
- brand review baseline

### Step 4. Prove the First Bounded Workflow

- create
- approve
- dispatch
- review
- log result

### Step 5. Repeat Until the Control Layer Is Credible

- run at least three clean bounded tickets
- handle at least one blocked or requeued case
- review drift and tighten instructions

### Step 6. Only Then Begin Phase 1 Build Work

- onboarding
- auth shell
- KYC abstraction
- initial schemas and contracts

### Step 7. Expand Only by Passing Gates

- Phase 2 after foundations pass review
- Phase 3 after compliance and money-flow gates are ready
- Phase 4 after transaction stability is proven

## What We Need Right Now

If the question is "what do we need next, in plain terms," the answer is:

- a stable sandbox orchestration layer
- a clear approval bridge
- a small active role set
- explicit ticket contracts
- reusable compliance, brand, and language rules
- one successful bounded proof loop

Not yet:

- full multi-agent expansion
- full product build-out
- full local-first runtime hardening as a prerequisite
- separate deployed companies
- high-autonomy R&D loops

## Relationship to the Current Agent-Stack Surface

This plan is designed to sit alongside the current agent-stack docs, not replace
them.

Use:

- `PHASE0_MARKETPLACE_READINESS_CHECKLIST_2026-04-06.md` for go or no-go
- this document for full-scope phased planning
- `RUNBOOK.md` for startup and shutdown
- `ALLOWLIST_POLICY.md` for path discipline
- `TICKET_FLOW.md` for execution mechanics

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
