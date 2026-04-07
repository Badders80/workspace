# Allowlist Policy

Updated: 2026-04-03

## Principle

OpenFang starts with the smallest practical write scope. Until the sidecar is
proven, explicit allowlists beat convenience.

## Default Write Surface

Allow write access by default only to:

- `/home/evo/workspace/_sandbox/agent-stack/`
- `/home/evo/workspace/_docs/agent-stack/`

## Bounded Expansion Candidates

Only add these after explicit approval on a ticket-by-ticket basis:

- `/home/evo/workspace/research_vault/04_Reviews/`
- `/home/evo/workspace/research_vault/05_Reports/`
- `/home/evo/workspace/projects/SSOT_Build/docs/`

## Explicit No-Write Zones

- `/home/evo/.env`
- `/home/evo/`
- `/home/evo/_archive/`
- `/home/evo/workspace/projects/Evolution_Platform/`
- `/home/evo/workspace/projects/Evolution_Content/`
- `/home/evo/workspace/projects/SSOT_Build/src/`
- `/home/evo/workspace/DNA/`
- `C:\evo\startup`

## Rules

- No broad write access across all repos in v1.0.
- Every ticket must name its allowed output path before execution starts.
- Any request outside the current allowlist must stop and return for human
  approval.
- Read scope can be wider than write scope, but secrets and control-plane files
  remain off-limits.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
