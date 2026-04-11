# Orchestration Layer

Status: active governed coordination surface

## Purpose

`orchestration/` is the managed coordination layer between immutable `DNA/` and
executable `projects/`.

Use this surface for:
- role contracts
- domain state
- memory logs
- roadmaps
- tickets
- bounded delegation records

Do not use this surface as a replacement for `DNA/`.
Do not treat this surface as authorization for autonomous parallel runtimes.

## Authority Model

- CEO: final authority for scope, governance, and priorities
- General Manager: cross-domain coordination, sequencing, and escalation
- Product Managers: durable domain brains for `SSOT`, `Platform`, `Studio`, and `Content`
- Fang: bounded hands for execution, audit, retrieval, packaging, and verification

## Current Operating Shape

- Primary active lanes: `ssot`, `platform`
- Light or placeholder lanes: `studio`, `content`
- Handoff rule: keep `_docs/agent-stack/TICKET_FLOW.md` as the live handoff model
- DNA rule: PMs and Fang may escalate governance issues, but may not mutate `DNA/`

## Structure

- `roles/` -> role contracts, lenses, and operating prompts
- `streams/` -> per-domain state, memory, and roadmap
- `tickets/` -> bounded work packets and validation records

## Communication Rule

Internal operating surfaces use `caveman lite` style:
- direct
- professional
- low filler

Governance and decision records stay in normal professional prose.
External-facing content stays in normal brand voice.

## Read Order Inside This Surface

1. `roles/GENERAL_MANAGER.md`
2. domain PM file for the lane in use
3. matching `streams/<domain>/STATE.md`
4. matching `streams/<domain>/MEMORY_LOG.md`
5. matching `streams/<domain>/ROADMAP.md`
6. ticket file when work is delegated

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
