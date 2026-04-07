# Budget Rules

Updated: 2026-04-03

## Principle

Autonomy is capped by budget first, then by scope.

## v1.0 Rules

- Set a hard daily budget cap before any autonomous run.
- Every ticket must carry its own budget ceiling or spend limit.
- If the budget cap is hit, execution stops and returns to the human.
- If the ticket needs more scope, time, or access than declared, execution
  stops and returns to the human.

## Current Trial Cap

- The active v1.0 trial cap is `0`.
- Only free-model routes are allowed under this cap.
- No paid-model run is authorized until the cap is explicitly raised by the
  human in the board seat.

## Paperclip Reality Check

Current Paperclip docs expose company and agent budgets as monthly
`budgetMonthlyCents`, with hard stops at 100% utilization.

For this trial, that means:

- set the first Paperclip company monthly cap to `0` cents when the company is
  created
- pair it with the explicit human daily cap of `0` in ticket operations
- do not enable broad autonomous work until both controls are set

## Practical Defaults

- Start low and raise caps only after useful output is proven.
- Prefer one executor and one orchestration surface over multi-agent spend.
- Budget only one or two active workstreams at a time.
- Treat any route that could incur non-zero cost as disabled by default.

## Non-Negotiables

- No hidden budget growth through extra autonomous role runtimes.
- No work should continue because a model is "nearly done" once the declared
  cap or stop condition is reached.
- Budget approval belongs to the human in the board seat.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
