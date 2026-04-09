# Hermes Boundary Review Brief

Status: draft-only review artifact

- Non-canonical
- Review artifact
- Not promoted to DNA
- Not an instruction to modify runtime behavior

## Purpose

This brief exists to help review the proposed Hermes and OpenFang boundary
without promoting exploratory architecture into canonical workspace truth too
early.

Its job is to:

- capture current live workspace truth
- describe the proposed Hermes and Fang separation in draft form
- identify what belongs in DNA instead of assistant memory
- give Hermes a clean read-only packet for a later review pass

This brief does not onboard Hermes, does not modify OpenFang behavior, and does
not change any DNA governance files.

## Current Workspace Truth

- Hermes is planned, not yet active in the live stack.
  Evidence: `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`,
  `/home/evo/workspace/DNA/ops/STACK.md`,
  `/home/evo/workspace/DNA/roles/README.md`
- OpenFang is the already-live bounded sidecar.
  Evidence: `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`,
  `/home/evo/workspace/DNA/ops/STACK.md`,
  `/home/evo/workspace/DNA/ops/memory-system-adoption.md`,
  `/home/evo/workspace/_docs/openfang-wizard/README.md`
- DNA remains the canonical truth layer for rules, decisions, conventions, and
  promoted workflows.
  Evidence: `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`,
  `/home/evo/workspace/DNA/ops/STACK.md`,
  `/home/evo/workspace/DNA/ops/memory-system-adoption.md`
- OpenFang is currently bounded rather than broadly autonomous.
  Evidence: `/home/evo/workspace/DNA/ops/memory-system-adoption.md`,
  `/home/evo/workspace/_docs/openfang-wizard/README.md`

## What Fang Already Owns Today

OpenFang already owns these live roles in the workspace:

- Retrieval
  - `evolution-workspace` is the read-only knowledge and lookup surface over
    tracked workspace files.
- Planning
  - `build-workspace` produces planning guidance and exact command suggestions
    without automatically executing changes.
- Governance checks
  - `audit-workspace` verifies workspace alignment, tracked-versus-runtime
    separation, and setup health.
- Packaging
  - `production-studio` turns approved material into bounded, manual-ready
    production packs.

Evidence: `/home/evo/workspace/DNA/ops/memory-system-adoption.md`,
`/home/evo/workspace/_docs/openfang-wizard/README.md`

## What Hermes Would Own That Fang Should Not

Hermes is the proposed personal front door and relational layer. In draft form,
Hermes would own:

- personal chat
- cross-session preference memory
- early drafting
- exploration
- iteration
- skill growth
- pattern recognition across evolving work

Draft boundary rule:

- evolving work stays in Hermes
- fixed work may become a future Fang candidate

Hermes should not become the primary bounded execution layer that OpenFang
already is.

## What Must Stay In DNA Instead Of Hermes Memory

The following must never live only in Hermes memory:

- rules
- roles
- tone and voice direction
- promoted workflows
- canonical operating truth
- durable architectural decisions

If a pattern becomes stable enough to matter operationally, it must graduate
into tracked workspace files before it is treated as durable process.

Evidence: `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`,
`/home/evo/workspace/DNA/ops/STACK.md`,
`/home/evo/workspace/DNA/ops/memory-system-adoption.md`,
`/home/evo/workspace/DNA/roles/README.md`

## Handoff Rule: Hermes Suggests, Human Decides

Draft handoff rule:

- Hermes may suggest that a workflow looks ready for Fang.
- Fang is not brought in automatically.
- The human explicitly decides whether to hand off.
- “Fixed work can move to Fang” is a heuristic, not yet a hard law.

Practical reading of the rule:

- if work is still changing, watched closely, or being shaped by taste or
  judgment, it stays with Hermes
- if work becomes repeatable, bounded, and inspectable, Hermes may suggest
  exploring a Fang handoff

## Open Questions

- What does “fixed enough” mean in practice for this workspace?
- What should the first Fang-eligible workflow types be?
- How much external action, if any, is ever allowed later once a workflow is
  mature?

## What Is Mature Enough To Promote Later

Future promotion candidates may include:

- the stable statement that Hermes is the personal front door and relational
  layer
- the stable statement that OpenFang is the bounded execution layer
- the stable statement that DNA outranks assistant memory
- a simple handoff posture where Hermes suggests and the human decides

These are candidates only. They should not be promoted until they are tested
against real use and still feel correct.

## What Must Stay Draft-Only For Now

Do not promote any of the following yet:

- any autonomous handoff rule
- any hardcoded tool-routing law
- any canonical Hermes staff-role definitions
- any DNA promotion wording beyond future candidates
- any claim that Hermes is already active in the live stack
- any claim that Fang should automatically engage when a pattern looks mature

## Hermes Review Instructions

When Hermes later reviews this brief, require all of the following:

- stay read-only and advisory
- cite exact workspace files for every major claim
- separate each point into one of:
  - verified repo truth
  - inference
  - recommendation
- stop and report if this brief conflicts with the current live files
- do not propose runtime changes, file writes, skill creation, or automation in
  the review pass
- flag anything that would promote an immature pattern into DNA too early

## Evidence Files

Use only these live authority files for the review:

- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/memory-system-adoption.md`
- `/home/evo/workspace/_docs/openfang-wizard/README.md`
- `/home/evo/workspace/DNA/roles/README.md`

Explicitly do not use these as evidence:

- `/home/evo/_archive/docs-legacy/2026-04-09/AGENTS_STUB.md`
- `/home/evo/_archive/docs-legacy/2026-04-09/EVOLUTION_MASTER_CONTEXT.md`

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
