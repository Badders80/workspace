# Ticket Flow

Updated: 2026-04-03

## Required Flow

1. Ticket is created in Paperclip.
2. Ticket records goal, budget cap, allowlist, and expected artifact.
3. Human approves the ticket for execution.
4. Paperclip dispatches the work to OpenFang.
5. OpenFang sends heartbeat and status updates back through the orchestration
   layer.
6. Result is logged to the ticket.
7. Human closes, requeues, or revises the ticket.

## Rules

- No work starts outside a ticket.
- No silent path expansion during execution.
- No second executor in parallel with OpenFang in v1.0.
- Tickets should stay small enough that completion, review, and rollback remain
  obvious.

## Early Workstreams

Start with one or two bounded streams only:

- research packaging
- internal reports
- investor-update prep
- light SSOT support

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
