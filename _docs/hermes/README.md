# Hermes Integration

Status: active workspace personal layer

- Human-in-the-loop
- Personal and exploratory by default
- DNA stays canonical
- OpenFang remains the bounded execution layer

## Purpose

Hermes is now the personal front door for `/home/evo/workspace`.

Use Hermes for:

- personal chat
- early drafting
- iteration and synthesis
- cross-session preference memory
- turning evolving work into cleaner briefs for DNA or OpenFang

Do not use Hermes as:

- the source of canonical truth
- an automatic Fang trigger
- a hidden automation path

## Boundary

- Hermes owns evolving, personal, and exploratory work.
- DNA owns rules, roles, tone, promoted workflows, and architectural truth.
- OpenFang owns bounded retrieval, planning, audit, packaging, and future
  durable Hands.
- The human decides when work graduates from Hermes into Fang.

## Runtime

- Hermes home: `/home/evo/.hermes`
- Hermes install: `/home/evo/.hermes/hermes-agent`
- Global Hermes command: `/home/evo/.local/bin/hermes`
- Workspace launcher: `/home/evo/workspace/_scripts/hermesc.sh`
- Just target: `just hermes`
- Default model in this pass: local Ollama `qwen3.5:latest` via
  `http://localhost:11434/v1`

## Launch

Preferred workspace launch paths:

```bash
just hermes
```

```bash
bash /home/evo/workspace/_scripts/hermesc.sh
```

```bash
cd /home/evo/workspace && hermes
```

Launching from the workspace root matters because Hermes should absorb the
existing `AGENTS.md` chain instead of a separate project-specific override.

## Guardrails

- Keep secrets in `/home/evo/.env`; do not duplicate them into
  `/home/evo/.hermes/.env`.
- Do not introduce `.hermes.md` or project-local `SOUL.md` files in this pass.
- Keep `SOUL.md` global and personality-only.
- Keep Hermes read-write actions human-approved.
- Do not auto-invoke OpenFang from Hermes.

## Handoff Rule

- Hermes may suggest that a workflow looks bounded enough for Fang.
- Fang is brought in only when the human asks or approves.
- Stable patterns should be promoted into tracked workspace docs before they
  become Fang Hands or durable runtime instructions.

## First Safe Uses

- email and investor communication drafts
- design and content ideation
- research synthesis
- preparing cleaner handoff briefs for `build-workspace`,
  `audit-workspace`, or `production-studio`

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
