---
aliases:
  - Think/Do
tags:
  - architecture
  - agentic
  - methodology
created: 2026-04-24
updated: 2026-04-24
sources:
  - raw/bootstrap/AI_SESSION_BOOTSTRAP.md
confidence: 0.8
---

# Think-Do Agentic Model

The workspace uses a think/do model for agentic execution:

- **Conductor** (GLM-5.1:cloud) — plans, decomposes, delegates, verifies, synthesizes
- **Reasoning Partner** (Nemotron-3-Super:cloud) — reviews plans, stress-tests decisions
- **Workers** — assigned by task type and execute scoped work through Fang hands

## Key Rules

- Think layer plans. Do layer executes.
- Workers do not plan their own approach.
- The orchestration layer is the agent communication hub.

## Related

- [[wiki/entities/Evolution Stables]]
- [[wiki/topics/Agentic Architecture]]

## Source

[^source: raw/bootstrap/AI_SESSION_BOOTSTRAP.md]

Updated: 2026-04-24
Changed files: wiki/topics/Think-Do Agentic Model.md
