# Evolution_Platform <-> SSOT_Build Linkup Meeting

Date: 2026-04-10
Status: ACTIVE - cross-project readiness review

## Purpose

Capture a direct producer-consumer readiness review between `SSOT_Build` and
`Evolution_Platform` so the next integration slice is based on the live code
and publish surfaces, not on assumptions.

## Participants

- Overall manager for `/projects`
- `SSOT_Build` line manager
- `Evolution_Platform` line manager

## Outcome

The two surfaces are already linked at a basic v0 level, but they are not yet
linked through the governed draft contract that is meant to become the stable
handoff.

Inference from the current code and published artifacts:

- operational v0 link readiness: about 80%
- governed contract link readiness: about 40%

Why this split exists:

- `SSOT_Build` already publishes a legacy marketplace payload and a richer
  draft contract from the same seed and horse-attached listing state
- `Evolution_Platform` already consumes the mirrored legacy payload for browse,
  listing detail, manual application, and founder manual-ops flow
- `Evolution_Platform` does not yet consume the richer draft contract, its
  release-eligibility metadata, its document references, or its inventory and
  performance-summary surfaces

## What Is Already Real

- `SSOT_Build` is the active producer:
  `scripts/publish-marketplace-v0.mjs` publishes both
  `data/published/marketplace-v0.json` and
  `data/published/marketplace-contract-draft.v0.json`.
- `Evolution_Platform` is the active consumer of the legacy handoff:
  `src/lib/marketplace.ts` loads `src/data/marketplace-listings.generated.json`
  and the marketplace routes use that payload directly.
- The current legacy mirror is effectively in sync:
  `Evolution_Platform/src/data/marketplace-listings.generated.json` matches
  `SSOT_Build/data/published/marketplace-v0.json` except for `generatedAt`.
- Platform-side access control already exists for preview and founder lanes:
  `src/lib/marketplace-release-stage.ts`, `src/lib/auth.ts`, and
  `src/app/marketplace/manual-ops/page.tsx`.
- Platform-side application validation already checks live listing identity,
  pricing, stake size, and campaign values against the consumed listing payload:
  `src/app/api/interest/route.ts`.

## Where The Link Still Drifts

### 1. Contract Draft Exists, But Consumer Migration Has Not Started

- `Evolution_Platform` still types and renders the legacy payload shape only.
- No consumer adapter or type layer exists yet for
  `marketplace-contract-draft.v0.json`.
- That means the current richer producer data is effectively invisible to the
  live marketplace experience.

### 2. Release Logic Is Split Across Two Different Systems

- `SSOT_Build` publishes `releaseStageEligibility` per listing in the draft
  contract.
- `Evolution_Platform` ignores that and instead gates visibility from the
  environment-only `MARKETPLACE_RELEASE_STAGE`.
- Result: release truth is partly producer-owned and partly environment-owned,
  with no enforced handshake between them.

### 3. “Live” Means Different Things On Each Side

- In `SSOT_Build`, the legacy `publishStatus` becomes `live` when lease status
  is active and horse identity is verified.
- In the same producer, the draft contract can still say
  `releaseStageEligibility.production = false` and the horse-attached listing
  can still be `status: "local"` with `readiness: "publish_ready"`.
- In `Evolution_Platform`, the UI and application route trust
  `publishStatus === "live"`.
- Result: a listing can appear live to the consumer before the producer-side
  listing attachment says it is truly production-ready.

### 4. Producer Contract Shape Still Needs Tightening Before Consumer Adoption

- The draft document example describes `linkedParties.governingBody` as an
  object, but the generated contract currently emits `governingBodyCode`.
- The draft document example describes document-facing download semantics, but
  the generated contract currently emits repo-local absolute `filePath` values.
- Those absolute paths still expose historical filesystem drift and are not a
  safe consumer-facing handoff.

### 5. Required Fail-Closed Fields Are Not Enforced Yet

- The draft contract says the consumer should fail closed on inventory,
  release, and document gaps.
- The live Platform flow does not yet consume or enforce inventory truth,
  document readiness, or disclosure-readiness signals before showing a listing
  or accepting an application.

### 6. Stable Identifier Semantics Still Need One Clear Rule

- The legacy payload uses `id` mapped from `lease_id`.
- The draft contract introduces a distinct `listingId`.
- The consumer currently treats the listing identity as the legacy `id` plus
  `slug`.
- A deliberate rule is still needed for which identifier is the stable
  cross-project listing key.

### 7. There Is Still At Least One Legacy Mapping Bug In The Current Handoff

- The legacy payload currently maps `trainer.location` from the trainer
  website field in `buildListing`.
- That does not block the current UI because the location is not driving a
  critical path, but it shows the v0 payload is still a convenience payload,
  not yet a hardened contract.

## Recommended Next Slice

Do not start with a bigger marketplace UI pass. Start with the shared seam.

1. Lock the producer contract that `Evolution_Platform` is actually expected to
   consume next.
2. Resolve producer-side field drift inside that contract:
   governing-body shape, document reference shape, stable listing key, and the
   release/readiness rule.
3. Remove absolute local filesystem paths from the consumer-facing contract.
4. Add a Platform-side adapter and types for the draft contract in parallel
   with the legacy payload.
5. Add parity tests so one SSOT publish proves what Platform will accept.
6. Switch listing exposure and application acceptance to the governed
   release/readiness semantics instead of the current split logic.

## Meeting Call

The projects are close to a real link, but only for the current local-first
legacy payload.

They are not yet close to a trustworthy long-term seam until these four things
are true at the same time:

- producer and consumer agree on one contract shape
- release eligibility and publish readiness mean the same thing on both sides
- documents and inventory become enforceable consumer inputs
- the contract stops leaking local implementation details such as absolute file
  paths

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
