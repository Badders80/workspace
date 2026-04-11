# Evolution Platform Marketplace Build Plan

Updated: 2026-04-10
Status: ACTIVE - planning brief for marketplace, dashboard, and purchase-flow expansion

## Purpose

Define a safe way to expand `Evolution_Platform` into a fuller marketplace
experience without outrunning the current `SSOT_Build -> Evolution_Platform`
contract. This brief captures the recommended worker model, sandbox options,
reuse-first template plan, and the key information or guardrails still missing.

## Current Truth

- `Evolution_Platform` already supports:
  - marketplace browse
  - listing detail
  - manual application and reservation capture
  - operator-gated review routes
- `Evolution_Platform` does not yet support:
  - real checkout
  - authenticated member dashboard behavior
  - holdings or order history
  - KYC, payment, allocation, or reconciliation flows
- `SSOT_Build` is still the canonical marketplace authoring surface.

## Direction Lock

- Marketplace page build is not the current blocker.
- The main work now is the operating and contract layer behind it.
- KYC direction:
  - `Sumsub`
- Payment direction:
  - `Swipe`
  - `Wise`
  - bank transfer
- Data-authoring direction:
  - `SSOT_Build` publishes core listing truth
  - Google Sheets can hold extra marketing and operator-friendly listing copy
  - `Evolution_Platform` consumes the merged publish output, not raw ad hoc
    edits from multiple places

## Recommended Delivery Model

- Keep one live writer on governed project files: Codex
- Use parallel read-only or sandboxed worker lanes for:
  - contract design
  - UX planning
  - operator flow review
  - audit and risk review
- Keep experiments in `_sandbox/claude-marketplace/` until a slice is approved
  for promotion into `projects/` or `_docs/`

## Worker Roster

### Worker 1 - Contract Lane

Ownership:
- `SSOT_Build` publish contract review
- listing, application, and dashboard schema proposal

Output:
- proposed `marketplace-v1` contract split
- required fields for dashboard and purchase flow
- publish checklist for `live`

## Worker 2 - Marketplace Experience Lane

Ownership:
- listing grid/detail refinement
- application flow UX
- post-submit status and user-truth screens

Output:
- thin vertical slice for a better apply flow
- receipt/status page plan
- copy and disclosure placement plan

## Worker 3 - Dashboard Lane

Ownership:
- `MyStable` shell
- application status, documents, updates, and holdings information architecture

Output:
- truthful v0.1 dashboard shell
- component map for cards, sections, and status modules
- data dependencies for each dashboard block

## Worker 4 - Operator Ops Lane

Ownership:
- founder inbox evolution
- manual review actions
- status transitions and reconciliation workflow

Output:
- operator state machine
- review queue design
- audit trail requirements

## Worker 5 - Trust And Guardrails Lane

Ownership:
- auth rules
- release-stage protection
- disclosure, KYC, and payment-readiness guardrails

Output:
- fail-closed route checklist
- compliance and disclosure checklist
- “not ready for checkout” blockers list

## Source-Of-Truth Split

### `SSOT_Build`

Owns:
- horse identity and profile truth
- offering and lease truth
- listing lifecycle truth
- inventory truth
- disclosure and document references
- publish status and release readiness

### Google Sheets

Owns:
- extra marketing copy
- campaign framing
- optional merchandised highlights
- operator-facing launch notes
- temporary merchandising fields that are safe to remain non-canonical

Rules:
- Sheets may enrich a listing, but it must not replace canonical offering,
  inventory, legal, or ownership truth from `SSOT_Build`
- The publish step should merge SSOT core data with approved Sheets enrichment
  into one platform-facing payload

## Producer / Consumer Handshake

The manager relationship is explicit:

- `SSOT_Build` is the producer for canonical marketplace payloads
- `Evolution_Platform` is the consumer for those payloads
- Google Sheets is an enrichment input to the publish step, not a peer
  canonical source

### Producer obligations: `SSOT_Build`

- publish one governed payload shape
- define field meanings clearly
- provide stable identifiers
- expose required inventory and disclosure fields
- version the contract when meanings or field names change

### Consumer obligations: `Evolution_Platform`

- consume the governed payload only
- fail closed when required fields are missing
- avoid inventing canonical business truth locally
- escalate contract gaps instead of silently compensating for them

### Enrichment obligations: Google Sheets

- provide only approved non-canonical enrichment fields
- never override canonical offer, legal, inventory, or ownership truth

### Failure behavior

If `SSOT_Build` does not hand over a required field, `Evolution_Platform`
should:

- block the dependent feature
- show truthful fallback UI
- record the gap in shared docs

It should not:

- infer hidden business rules
- backfill permanent truth from ad hoc local logic
- let Sheets become the accidental source of record

## Public Vs Authenticated Vs Operator

### Public

Allowed:
- homepage
- public marketplace listing pages when release stage is `production`
- public-safe horse and offer overview
- public marketing content
- public FAQs and high-level process copy

Blocked:
- application status
- reservation status
- holdings
- investor documents tied to a user
- payment instructions
- founder inbox
- anything with PII or allocation state

### Authenticated User

Allowed:
- `MyStable`
- their own application status
- reservation progress
- signed-document checklist or placeholders
- KYC progress state
- payment method and payment instructions for their own application
- their own holdings and update history once those exist

Blocked:
- other users' activity
- operator queue views
- cap-table level truth
- unpublished listings
- founder-only notes and reconciliation controls

### Operator / Founder

Allowed:
- manual ops inbox
- review queue
- state transitions
- allocation and reconciliation actions
- payment confirmation notes
- listing release controls
- audit trail and exception handling

Rules:
- operator routes stay fail-closed behind release stage, Google auth, and
  explicit allowlist
- founder actions must be traceable, not just visible

## Sandbox Options

### Option A - Planning Sandbox First

Surface:
- `/home/evo/workspace/_sandbox/claude-marketplace`

Best for:
- schema drafts
- route maps
- UI wireframe notes
- bounded local-model exploration

Why:
- zero risk to live repos
- already governed for marketplace exploration
- ideal for parallel worker notes and proposals

### Option B - Docs-First Governance Lane

Surface:
- `/home/evo/workspace/_docs/agent-stack`

Best for:
- approved plans
- operator runbooks
- stage-by-stage delivery briefs

Why:
- keeps durable planning visible
- fits the workspace “docs lead, code follows” rule

### Option C - Thin Vertical Slice In Live Repo

Surface:
- `/home/evo/workspace/projects/Evolution_Platform`

Best for:
- approved, tightly scoped implementation only

Rule:
- only after the contract lane confirms the slice does not pretend to be a real
  checkout or holdings system

## Reuse-First Template Plan

Use the existing project surfaces before introducing new patterns.

- Marketplace route shells already exist in
  `/home/evo/workspace/projects/Evolution_Platform/src/app/marketplace/...`
- The current application form is reusable in
  `/home/evo/workspace/projects/Evolution_Platform/src/components/marketplace/StakeApplicationForm.tsx`
- A dashboard visual direction already exists, but should be re-used
  selectively, from
  `/home/evo/workspace/projects/Evolution_Platform/src/components/mystable/LegacyMyStablePage.tsx`
- Reusable layout and card primitives already exist in:
  - `/home/evo/workspace/projects/Evolution_Platform/src/components/layout/SectionShell.tsx`
  - `/home/evo/workspace/projects/Evolution_Platform/src/components/ui/Card.tsx`
  - `/home/evo/workspace/projects/Evolution_Platform/src/components/ui/Badge.tsx`
- The bento-style feature block can be adapted for dashboard summaries or
  operator overviews from
  `/home/evo/workspace/projects/Evolution_Platform/src/components/ui/feature-section-with-bento-grid.tsx`

Template stance:
- Prefer adapting these internal surfaces first
- Keep `shadcn/ui` as the component baseline
- Do not import a new design system or commerce stack just to move faster

## Missing Information

These are the biggest blockers to a real dashboard or purchase flow:

- no durable user, application, reservation, order, or holding contract
- no inventory truth such as available, reserved, sold, or expired units
- no doc/disclosure references in the published listing payload
- no operator action model beyond read-only inbox review
- no payment, KYC, agreement-signing, or allocation lifecycle
- no dashboard payload separate from the listing payload
- no reliable long-term system of record beyond local JSON plus Google Sheets
- no explicit merged publish contract for `SSOT_Build core + Google Sheets enrichment`
- no per-user document access model
- no email or notification lifecycle for status changes
- no expiry model for reservations, invoices, or payment windows
- no audit model for who approved, changed, or reconciled a deal

## Missing Contracts

These contracts should exist before real money moves:

- `listing`
  - public offer facts and disclosure references
- `inventory`
  - units total, available, reserved, allocated, expired
- `application`
  - user intent and review state
- `kyc_case`
  - Sumsub status and timestamps
- `payment_instruction`
  - payment method, destination, deadline, confirmation requirements
- `payment_record`
  - received, pending, failed, refunded, reconciled
- `allocation`
  - final granted units or percentage
- `holding`
  - what the user actually owns
- `dashboard`
  - the user-facing projection of all of the above

## Mandatory Guardrails

- Keep marketplace v0.0 defined as `browse + manual application` until a new
  application/order contract exists
- Keep `SSOT_Build` as the single source of canonical listing truth
- Fail closed on operator and founder routes using stage, auth, and allowlist
- Do not let `MyStable` read directly from the manual-ops JSON as if it were a
  member system of record
- Require disclosure docs and operator approval before a listing can go `live`
- Separate listing status from application, order, and holdings status
- Add explicit audit trail rules before any real-money or contract flow
- Treat `Sumsub`, `Swipe`, `Wise`, and bank transfer as provider seams, not as
  places to hide business truth
- Never let Google Sheets become the hidden system of record for inventory,
  allocations, or payment truth
- Do not expose payment instructions publicly or before KYC and review gates
- Require per-user access checks for any signed docs, invoices, or holdings
- Add reservation expiry and stale-payment rules before activating payment
- Add reconciliation checkpoints before a payment can become an allocation

## Provider Seams

### KYC

- Preferred provider: `Sumsub`
- Role:
  - identity verification
  - KYC lifecycle state
  - compliance evidence reference

### Payments

- Preferred rails:
  - `Swipe`
  - `Wise`
  - bank transfer
- Role:
  - collect or route payment
  - return status signals
  - support reconciliation

Rule:
- provider outputs must attach to internal `application`, `payment_record`, and
  `allocation` states rather than becoming the only place where truth lives

## What Else

These are the additional design questions that still matter:

- what makes a listing eligible to move from draft to live
- what exact fields may Google Sheets override, add, or never touch
- whether authenticated users can see only applications at first, or also
  manual documents and updates
- what happens when a reservation expires or payment is late
- how manual bank-transfer proof is uploaded, verified, and reconciled
- whether Wise and Swipe are parallel options or stage-gated by jurisdiction or
  deal type
- when a user becomes a holder in the system:
  - after application approval
  - after KYC pass
  - after payment receipt
  - after reconciliation
  - after legal countersign
- what notifications are mandatory at each state change
- what can be corrected by operators after submission, and what must be
  immutable
- what minimum audit history must be kept for compliance and dispute handling

## Recommended Sequence

1. Use the sandbox to draft the `listing`, `application`, and `dashboard`
   contract split, plus inventory, KYC, and payment-record seams.
2. Promote the approved contract brief into governed docs.
3. Build a truthful `MyStable` shell that shows application status only, not
   fake holdings.
4. Add operator actions and state transitions before attempting checkout.
5. Only then scope a real purchase flow behind stronger compliance and storage
   boundaries.

## Immediate Next Slice

The safest next implementation slice is:

- authenticated `MyStable` shell
- application status cards
- KYC and payment status placeholders
- document placeholders
- clear “manual review in progress” truth

This gives users and operators a better experience without pretending payments,
allocations, or holdings are already automated.

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
