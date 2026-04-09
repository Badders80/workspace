# Budget Rules

Updated: 2026-04-09

## Principle

Autonomy is capped by budget first, then by scope.

## Active Defaults

- Local routes are the default execution path.
- Hosted routes require explicit human opt-in per run or per bounded review
  session.
- Every hosted run should declare its purpose, target files, and stop condition
  before it starts.
- If a run needs more scope, time, or access than declared, execution stops and
  returns to the human.

## Current Budget Posture

- `local` remains the daily default route.
- `openrouter-qwen` and `openrouter-glm` are paid review lanes, not ambient
  defaults.
- `openrouter-nemotron` is the low-cost or free backup reviewer lane.
- `groq` remains a deliberate hosted fallback, not an automatic failover path.
- There is no live always-on ticket queue or background spend surface after the
  Paperclip retirement.

## Practical Defaults

- Start with local models and escalate only when the extra quality is worth it.
- Keep hosted prompts narrow and evidence-led.
- Budget only one or two active workstreams at a time.
- Prefer one bounded execution layer over stacked orchestration and duplicate
  spend.

## Non-Negotiables

- No hidden budget growth through silent hosted fallback.
- No work should continue because a model is "nearly done" once the declared
  cap or stop condition is reached.
- Budget approval belongs to the human in the board seat.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
