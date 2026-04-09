# Handoff Flow

Updated: 2026-04-09

Historical note: the filename is retained for continuity after the Paperclip
phase, but the live workspace flow is now human -> Hermes (optional) -> DNA ->
OpenFang.

## Required Flow

1. Human starts a task, question, or workflow.
2. Exploratory or personal work stays human-led or goes through Hermes as the
   personal layer.
3. Hermes may suggest that a workflow looks bounded enough for Fang, but the
   human decides whether to hand off.
4. Stable patterns, constraints, and prompts are written into tracked workspace
   surfaces such as `DNA/` or `_docs/openfang-wizard/`.
5. Only bounded execution, review, or packaging work is handed to an OpenFang
   hand inside the declared allowlist.
6. Result is reviewed by the human and then promoted, revised, or archived.
7. If the operating model changes, update `DNA/ops/TRANSITION.md`,
   `DNA/ops/DECISION_LOG.md`, and `DNA/ops/STACK.md` as required.

## Rules

- No work starts with hidden autonomous routing.
- No automatic Hermes -> Fang invocation.
- No silent path expansion during execution.
- No second executor runs in parallel with OpenFang unless governance is
  updated first.
- Do not mix the retired Paperclip model back into the live surface.

## Early Workstreams

Start with one or two bounded streams only:

- research packaging
- internal reports
- investor-update prep
- light SSOT support
- manual-ready content packs

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
