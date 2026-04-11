# Marketplace PM Portal

Updated: 2026-04-10
Status: ACTIVE - operator control surface for marketplace delivery

## Purpose

This file is the single operator portal for the marketplace build. It is the
place to resume work, check the current stage, see the active tool and model
lanes, review blockers, and find the next managed tickets.

Use this file as the control tower in VS Code. It is a dashboard, not the
source of truth. Canonical implementation still lives in the project surfaces
and DNA governance docs it links to.

## Status Snapshot

### Urgent

- Set the required operator env vars before using gated review flows:
  `MARKETPLACE_RELEASE_STAGE`, `ENABLE_GOOGLE_AUTH`,
  `MARKETPLACE_OPERATOR_ALLOWLIST`, and
  `MARKETPLACE_FOUNDER_INBOX_ENABLED`.
- Clean the remaining historical doc drift in `SSOT_Build` where older audit
  notes still reference retired middleware and Supabase-era assumptions.

### Working On

- Stage 0-1 implementation landed in code and verified with builds/tests
- marketplace control layer and release-stage wiring are now aligned to the
  current delivery model
- PM memory is being updated to reflect the implemented state
- provider seams are being clarified:
  - KYC -> `Sumsub`
  - payments -> `Swipe`, `Wise`, and bank transfer
- the next contract pass is focused on the missing operating layer, not the
  marketplace page UI itself

### Next Up

1. Configure the env-backed gated review flow and verify pending-stage access
   end-to-end.
2. Clean the remaining historical SSOT docs that still mention retired proxy
   middleware.
3. Lock the source-of-truth split between `SSOT_Build` core data and Google
   Sheets marketing enrichment.
4. Draft the missing contracts for inventory, application, KYC, payment, and
   dashboard state.
5. Start the next slice: authenticated user dashboard shell on top of the new
   access model.
6. Keep the four-project product / line manager split explicit while parallel
   chats are active.

### Watchlist

- `Evolution_Platform/public/fonts/Geist*.woff2` files are actually HTML, not
  font binaries.
- `Evolution_Platform/.env.local` creates a second active env surface inside
  the project.
- Next.js still warns about inferred workspace root and old
  `baseline-browser-mapping` data during build.

## Operator Surface

- Workspace root: `/home/evo/workspace`
- Main cockpit: VS Code opened at `/home/evo/workspace`
- PM portal: `/home/evo/workspace/_docs/agent-stack/MARKETPLACE_PM_PORTAL.md`
- Core build surfaces:
  - `/home/evo/workspace/projects/SSOT_Build`
  - `/home/evo/workspace/projects/Evolution_Platform`
  - `/home/evo/workspace/projects/Evolution_Content`
  - `/home/evo/workspace/projects/Evolution_Studio`

## Current Delivery Model

- Human stays in the board seat for scope, budget, and stage approval.
- Codex is the single writer and integrator.
- Hermes is optional for brief shaping and decision framing.
- OpenFang is the default reviewer stack.
- Claude is an exception lane only, not a standard marketplace lane.

## Active Agent Lanes

### Writer

- Tool: Codex CLI
- Role: implementation, integration, verification, doc updates
- Authority: single writer on live marketplace work

### Planner

- Tool: OpenFang `build-workspace`
- Default local model lane: `fast`
- Role: planning, bounded implementation briefs, command-ready review

### Auditor

- Tool: OpenFang `audit-workspace`
- Default local model lane: `audit`
- Role: governance, architecture drift, brand and trust review on narrow remits

### Debugger

- Tool: OpenFang `audit-workspace` or `build-workspace`
- Default local model lane: `debug`
- Role: contract and implementation bug diagnosis when the main writer is stuck

## Local Model Presets

- `fast`
  - Default model family: local `qwen3.5`
  - Use for first-pass review, ticket triage, short comparisons, and cheap
    bounded audits
- `debug`
  - Use for tricky contract seams, route failures, payload mismatches, or
    implementation bug hunts
- `audit`
  - Use for final narrow-scope review on trust, tone, governance, and operator
    clarity

Rule:
- Prefer Fang plus local models first.
- Escalate outside Fang only if a local lane repeatedly misses important
  issues, or if an unusually high-stakes second opinion is worth paying for.

## Marketplace Stage Map

1. Stage 0 - Contract lock and stack cleanup
2. Stage 1 - SSOT live knowledge hub
3. Stage 2 - Publish surface
4. Stage 3 - Marketplace experience MVP
5. Stage 4 - Manual transaction ops
6. Stage 5 - Provider seams
7. Stage 6 - Hardening and release

## Current Stage

- Active stage: Stage 0 - contract lock and stack cleanup
- Stage objective: remove backend drift, lock the Sheets-first operating model,
  and confirm the project surfaces are clear enough to start implementation

## Current Decision Snapshot

- Marketplace delivery is managed from the workspace, not a separate PM app.
- VS Code is the operator cockpit for v0.0.
- The PM memory surface lives in tracked markdown, not tool-local session
  memory.
- OpenFang is the default reviewer stack.
- `SSOT_Build` remains the canonical data authoring surface.
- `Evolution_Platform` remains the marketplace consumption and experience
  surface.
- Google Sheets plus local-first fallbacks is the intended lightweight SSOT
  direction for marketplace v0.0.
- Google Sheets should enrich listing presentation and operator convenience,
  not replace canonical offer, inventory, or legal truth from `SSOT_Build`.
- `Sumsub` is the preferred KYC seam.
- `Swipe`, `Wise`, and bank transfer are the preferred payment rails under a
  future payment-record and reconciliation contract.
- Parallel work should be governed by one effective product / line manager per
  project surface, with cross-project work coordinated through shared docs
  rather than silent drift between chats.
- Firestore and Supabase references currently present in `SSOT_Build` should be
  treated as drift until governance and implementation are brought back into
  line.

## Start Readiness

- `just check`: GREEN on 2026-04-10
- Blocking infrastructure issue: none
- Non-blocking environment warning: Docker unavailable in WSL
- Start verdict: work can start now
- Current implementation verdict: Stage 0-1 foundations are in place and green
- Verified checks:
  - `SSOT_Build`: `npm run build` passes
  - `Evolution_Platform`: `npm run build` passes
  - `Evolution_Platform`: `npm test` passes

## Latest Audit

- Audit file:
  `/home/evo/workspace/_docs/agent-stack/PROJECTS_BLOCKER_AUDIT_2026-04-10.md`
- Latest verdict:
  - Original kickoff blockers were resolved in code:
    - `SSOT_Build` no longer depends on the dead live middleware seam
    - release stages now use `working_on`, `pending`, and `production`
    - founder manual-ops access is now fail-closed and operator-gated
    - the broken `Evolution_Platform` test gate was replaced with a real test
      suite
  - Remaining follow-up risks:
    - historical doc drift in older SSOT notes
    - corrupted tracked font assets
    - local env ambiguity and build warnings

## Active Tickets

1. Verify the pending-stage gated review flow with real operator auth and env
   settings.
2. Clean remaining historical SSOT docs that still mention retired middleware
   and older backend migration directions.
3. Draft the merged publish contract:
   `SSOT_Build core + Google Sheets enrichment -> Evolution_Platform payload`.
4. Draft the missing contracts for `inventory`, `application`, `kyc_case`,
   `payment_record`, and `dashboard`.
5. Start the authenticated dashboard shell using the new release and access
   primitives.

## Immediate Next Actions

1. Set the required env for gated review mode and validate:
   `MARKETPLACE_RELEASE_STAGE=pending`,
   `ENABLE_GOOGLE_AUTH=true`,
   `MARKETPLACE_OPERATOR_ALLOWLIST=...`,
   `MARKETPLACE_FOUNDER_INBOX_ENABLED=true`.
2. Update any remaining active docs that still describe retired SSOT proxy
   middleware as live.
3. Lock what is `public`, `authenticated user`, and `operator-only`.
4. Draft the contract layer before turning on any real KYC or payment
   implementation.
5. Keep `projects/README.md` current as the shared ownership map between
   parallel chats.

## Resume Protocol

If you come back later and forget the state, start here:

1. Open this portal.
2. Read `Current Stage`, `Current Decision Snapshot`, and `Immediate Next
   Actions`.
3. Open the latest audit file linked above.
4. Continue the top active ticket unless a newer blocker is recorded here.

## Update Rule

At the end of any meaningful marketplace session, update:

- `Status Snapshot`
- `Latest Audit` if a new audit was produced
- `Current Stage` if stage status changed
- `Active Tickets` and `Immediate Next Actions`
- `Current Decision Snapshot` if a real decision was made

## Canonical References

- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/DECISION_LOG.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/projects/README.md`

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
