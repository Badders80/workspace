# Projects Blocker Audit - Marketplace Start

Updated: 2026-04-10
Status: ACTIVE - first-pass start audit for `/projects`

## Purpose

Determine whether the current project surfaces contain any blockers that would
stop marketplace delivery from starting, and identify the first cleanup work
needed to keep the new lightweight direction coherent.

## Scope

- `/home/evo/workspace/projects/README.md`
- `/home/evo/workspace/projects/SSOT_Build`
- `/home/evo/workspace/projects/Evolution_Platform`
- `/home/evo/workspace/projects/Evolution_Content`
- `/home/evo/workspace/projects/Evolution_Studio`

## Gate Check

- `just check`: GREEN on 2026-04-10
- Environment warning: Docker unavailable in WSL
- Audit conclusion from gate: not a blocker for marketplace kickoff

## Verdict

- Hard blocker to starting marketplace work: none
- Immediate Stage 0 blockers to starting cleanly: yes
  - `SSOT_Build` still contains active Firestore and older Supabase direction
    drift that conflicts with the current Sheets-first lightweight marketplace
    plan
  - `Evolution_Platform` exposes the founder manual-ops inbox without an auth
    guard while rendering applicant PII from a local JSON store
  - `projects/README.md` is currently misleading and points at broken or
    missing control-layer references

## Major Findings

### 1. Backend-direction drift in `SSOT_Build`

Severity: high

Evidence:
- `projects/README.md` says marketplace SSOT is Google Sheets
- `projects/SSOT_Build/README.md` still describes Firestore as the next write
  surface and includes Firestore walkthroughs
- `projects/SSOT_Build/src/lib/ssot/firestore-horse-stage-one.ts` is still an
  active helper surface
- `projects/SSOT_Build/src/lib/ssot/firestore-ssot-read-repository.ts` and
  `projects/SSOT_Build/src/lib/ssot/ssot-read-repository.ts` still expose
  `firestore` as the alternate data source
- `projects/SSOT_Build/scripts/write_stage_one_horses_to_firestore.py` is still
  present
- historical docs still mention Supabase migration direction

Impact:
- New implementation work could easily start against the wrong backend
  assumption
- Governance and implementation are currently pointing in different directions
- Audit, planning, and future handoffs will be noisy until this is cleaned up

Action:
- Run a dedicated anti-Firebase, anti-Firestore, anti-Supabase audit over
  `SSOT_Build`
- classify every reference as `remove`, `replace`, `rename`, or `historical`
- update governance before deeper feature work

### 2. Oversized `SSOT_Build` app surface

Severity: medium

Evidence:
- `projects/SSOT_Build/App.tsx` is 5470 lines

Impact:
- The build is workable, but future Stage 1 and Stage 2 changes will be slower
  and riskier than they need to be
- Reviews and targeted agent audits are less efficient because too much logic
  is centralized

Action:
- Do not treat this as a kickoff blocker
- Keep module decomposition on the backlog while the Stage 0 backend cleanup is
  handled first

### 3. Public founder inbox exposes applicant PII in `Evolution_Platform`

Severity: high

Evidence:
- `projects/Evolution_Platform/src/app/marketplace/manual-ops/page.tsx`
  renders applicant name, email, phone, notes, reservation values, and
  timestamps
- the route only gates on `isMarketplaceStagingEnabled()`
- the default store path is
  `projects/Evolution_Platform/data/generated/marketplace-manual-ops.json`,
  configured in `src/lib/marketplace-manual-ops.ts`

Impact:
- This is the clearest current trust and operational risk
- The inbox is not suitable for broader staging exposure in its current form

Action:
- Add an auth or local-only restriction before broader use
- Until then, treat this route as unsafe outside tightly controlled local work

### 4. Dead middleware seam in `SSOT_Build`

Severity: high

Evidence:
- `projects/SSOT_Build/App.tsx` still calls `/__loveracing_proxy`,
  `/__url_proxy`, `/__glm_profile`, `/__groq_profile`,
  `/__anthropic_profile`, and `/__save_investor_update`
- active `projects/SSOT_Build/vite.config.ts` no longer defines those
  middleware handlers
- old middleware logic survives only in `vite.config.ts.bak`

Impact:
- The app can compile while still having runtime actions that now 404
- This is a misleading live seam inside the current authoring tool

Action:
- Classify each middleware-dependent feature as `remove`, `replace`, or
  `restore intentionally`
- Do not leave the current half-live state in place

### 5. Broken control-layer map in `projects/README.md`

Severity: high

Evidence:
- points at `/home/evo/workspace/evolution_platofm/...`
- points at a missing `/home/evo/workspace/CLAUDE.md`
- states details such as Google Sheets SSOT, bi-directional marketplace API,
  and 15-minute external sync that are not yet reflected as the governed active
  implementation

Impact:
- This file can misdirect kickoff work before implementation even starts
- It currently behaves more like optimistic planning notes than a reliable
  operator map

Action:
- Rewrite it so it matches the actual governed marketplace flow and current
  active docs

### 6. Dirty project surfaces and generated artifacts

Severity: medium

Evidence:
- `projects/Evolution_Platform/.next`
- `projects/Evolution_Platform/node_modules`
- `projects/SSOT_Build/dist`
- `projects/SSOT_Build/node_modules`

Impact:
- Not a blocker for local work
- Increases noise during audits and handoffs if mistaken for source-of-truth

Action:
- Treat as normal local build residue for now
- Keep audit work focused on tracked source and docs, not generated output

### 7. Windows metadata debris in active project trees

Severity: medium

Evidence:
- multiple `*:Zone.Identifier` files under
  `projects/Evolution_Platform/public/fonts/...`
- one `:Zone.Identifier` file under `projects/Evolution_Content/drop/...`

Impact:
- Not a start blocker
- Adds clutter and can confuse inventory, packaging, and future cleanup passes

Action:
- Clean in a separate hygiene pass after Stage 0 backend drift is resolved

### 8. Broken test gate in `Evolution_Platform`

Severity: medium

Evidence:
- `npm test` fails in `projects/Evolution_Platform`
- `src/services/interest/_sanity.test.ts` is not a real Vitest suite
- it triggers an invalid fetch to `/api/interest`

Impact:
- Current test status overstates readiness
- This is not a kickoff blocker, but it weakens confidence in the current app
  gate

Action:
- Replace the pseudo-test with a real suite or remove it from the declared test
  surface

### 9. Marketplace flow exists and is start-ready

Severity: positive signal

Evidence:
- `projects/SSOT_Build/scripts/publish-marketplace-v0.mjs` publishes payloads
- `projects/SSOT_Build/data/published/marketplace-v0.json` exists
- `projects/Evolution_Platform/src/data/marketplace-listings.generated.json`
  exists
- `projects/Evolution_Platform/src/app/marketplace/...` routes exist
- manual ops intake surface exists in
  `projects/Evolution_Platform/src/app/marketplace/manual-ops/...`

Impact:
- We are not starting from zero
- The current stack already has a viable publish-to-consume seam for v0.0

Action:
- Preserve this seam and harden it rather than rebuilding the architecture from
  scratch

## Project-by-Project Read

### `projects/README.md`

- Intended as a high-level marketplace map
- Currently misleading enough to be treated as a Stage 0 blocker until fixed

### `projects/SSOT_Build`

- Canonical authoring surface is clear
- Local-first operation is still viable
- Main risks are backend drift, dead middleware seams, and stale canonical paths
- Main technical drag is oversized `App.tsx`

### `projects/Evolution_Platform`

- Marketplace routes and generated marketplace payload consumption are already
  in place
- Manual ops surface exists, which matches the v0.0 operating model
- Main risk is that the founder inbox is exposed without auth
- Secondary risk is fallback content that still tells an older tokenised or
  trading story when staging is disabled

### `projects/Evolution_Content`

- Role is clear and aligned
- No blocker found

### `projects/Evolution_Studio`

- Role is clear and aligned
- No blocker found

## Go / No-Go

- Go for marketplace kickoff: YES
- Condition:
  - treat `SSOT_Build` backend and path drift cleanup as the first managed
    Stage 0 ticket
  - protect or isolate the founder manual-ops inbox before broader staging use
  - fix `projects/README.md` before relying on it as an operator map

## Recommended First Ticket

Title:
- `Stage 0 - SSOT backend drift audit and Sheets-first remediation map`

Deliverable:
- one classified inventory of all Firebase, Firestore, and Supabase references
  in `SSOT_Build`
- one remediation plan for docs, helper code, and repository seams
- one governance update proposal for `STACK.md` and `DECISION_LOG.md`
- one short operator-map cleanup pass for `projects/README.md`

## Session Memory Rule

If the operator forgets the state later, the resume path is:

1. open `MARKETPLACE_PM_PORTAL.md`
2. open this audit
3. continue the top active ticket recorded in the PM portal

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
