# Local Claude Code Runner (lcc)

Tool: lcc
Category: Local LLM Integration / AI Coding
Reviewed: 2026-03-22
Source: XDA Developers article by Adam Conway (published 2026-03-20) plus linked gist
Source confidence: High
Links:
- https://www.xda-developers.com/wrote-script-run-claude-code-local-llm-skipping-cloud/
- https://gist.github.com/Incipiens/9f70ce27d9fa4c39bca9fafcb6ef2753

## Overview

This stood out because it connects an already adopted tool, Claude Code, to a
local Anthropic-compatible model server without introducing a whole new coding
stack. It looks like the missing bridge between the current Claude Code path
and the local-model experiments already underway around NVIDIA Nemotron 3
Super.

The implementation is intentionally small: a bash wrapper dropped into
`~/.local/bin/lcc` that points Claude Code at a local server and runs it as
normal. That makes it an appealing privacy and cost play for sensitive or
repetitive work if local model quality is good enough.

## How It Works

The wrapper checks for a healthy local endpoint, discovers the loaded model,
exports the Anthropic-compatible env vars Claude Code expects, then executes
the normal CLI flow.

- `ANTHROPIC_BASE_URL` points Claude Code at the local server.
- A dummy auth token plus an empty API key satisfy the CLI surface.
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` keeps the path as local as
  possible.
- The script ends with `exec claude --model "$MODEL" "$@"`.

## Takeaways

- This is a low-friction way to reuse the adopted Claude Code workflow with
  local inference.
- It pairs naturally with the current Nemotron trial path and a strong local
  workstation.
- The real value is not a new tool but a cleaner local path for an existing
  tool.

## Risks / Caveats

- Local coding quality may still lag the best cloud Sonnet-class path.
- The script assumes an Anthropic-compatible local endpoint and may need small
  tweaks for some servers.
- Hardware cost and VRAM limits still apply even if cloud token cost goes away.

## If I Revisit This

1. Install the wrapper and test it against one real refactor task using a
   local Nemotron or Qwen coder model.
2. Compare quality, latency, and token cost against the current cloud Claude
   Code flow.
3. Only move it beyond trial if the local path stays close enough in quality to
   justify the privacy and cost win.

## Context Chain
<- inherits from: /home/evo/workspace/DNA/ops/tech-radar-intake/README.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
