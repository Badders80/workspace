# STACK.md — Live Tool Registry

> Canonical registry of tools at Adopt/Active status.
> Agent rule: do not suggest alternatives to tools listed here. Do not
> introduce new tools without updating this file and DECISION_LOG.md.
>
> Evaluation queue -> DNA/ops/TECH_RADAR.md (consult on demand, not auto-loaded)
> Decision rationale -> DNA/ops/DECISION_LOG.md

Last updated: 2026-04-14

---

## AI Operating Model

### Think/Do Architecture

The workspace uses a think/do model for agentic execution:

- **Conductor** (GLM-5.1:cloud): plans, decomposes, delegates, verifies, synthesizes.
  The conductor frames work, assigns tickets, reviews results, and escalates to human.
  Absorbs the former General Manager role — routes priorities across domains directly.
- **Reasoning Partner** (Nemotron-3-Super:cloud): reviews plans, stress-tests decisions,
  analyzes architecture, provides second opinion before high-stakes execution.
- **Workers** are assigned by task type and execute scoped work through Fang hands:
  - DeepSeek-V3.1:671b-cloud → heavy coding, architecture
  - Qwen3-Coder-Next:cloud → focused implementation, bug fixes
  - Qwen3.5:cloud → utility, fallback tasks

The think layer plans. Workers execute. Workers do not plan their own approach.

See `orchestration/_planning/AGENTIC_FLOW_LOCKIN_2026-04-13.md` for the full model.

### Daily Drivers
| Tool | Role |
|------|------|
| GLM-5.1:cloud | Primary conductor for planning, decomposition, and orchestration |
| Codex CLI | Workspace agent for overview, review, and bounded execution |
| Hermes Agent | Active personal front door for drafting, iteration, memory, and human-approved handoff into OpenFang. Launch from the workspace root so the existing `AGENTS.md` chain loads. Optional Hermes Workspace UI repo lives under `_sandbox/hermes-workspace`, not `projects/`. |
| Claude (browser/chat) | Human-in-the-loop advisor for planning, writing, and review, usually against `workspace_full` or pasted context. Not a required local wrapper. |

### Capability-Specific
| Tool | Role |
|------|------|
| Nemotron-3-Super:cloud | Reasoning partner — plan review, stress-testing, architecture analysis, second opinion. **Use `nemotron-super-128k` wrapper** (see `models/ollama/Modelfile.nemotron-super-128k`) to prevent repetition loops. |
| DeepSeek-V3.1:671b-cloud | Heavy worker — architecture, complex refactors, large implementations |
| Qwen3-Coder-Next:cloud | Focused worker — bug fixes, feature implementation, specific tasks |
| Qwen3.5:cloud | Utility worker — general tasks, formatting, supporting work, fallback |
| Claude Code | Terminal-native deep refactors, review, or second-opinion execution when explicitly chosen. |
| Gemini CLI / Vertex AI | Google-stack tasks, `evolution-engine`, and ADC-first workflows. |
| Google Stitch (design.md + MCP) | Design system specification and UI generation. DESIGN.md is local-first and version-controllable. Screen generation is cloud-only via ADC. |
| Vision MCP (gemma4:e4b + e2b) | "Eyes for any model" — two-tier local vision MCP server. Quick eyes (gemma4:e2b, ~14s) for fast OCR; deep eyes (gemma4:e4b, ~30s) for full detail. Both models stay loaded in VRAM permanently. Registered in `.vscode/mcp.json`. Server at `_sandbox/vision-mcp/`. |
| UI/UX Pro Max | Design intelligence skill for UI work. Aligns with shadcn/ui + Tailwind. CIP mockup generation excluded (cloud-only). |
| 21st.dev Registry | Component source for shadcn/ui-based components. Install via `npx shadcn`. Magic MCP and extension toolbar not adopted. |
| GSD-2 Execution Pattern | Structured execution loop (plan → execute → verify → ship) mapped to ticket lifecycle. |
| obsidian-llm-wiki | Local LLM wiki compiler for research_vault. Ollama-native, zero cloud. |

### Utility / Optional
| Tool | Notes |
|------|-------|
| Aider | Diff-first editing workflow when it is the best fit. |
| OpenRouter / Groq APIs | Low-cost utility inference, not the default daily agent surface. |
| Jules | Future GitHub-native async PR automation path; keep optional, not a daily driver. |
| codex-peers MCP | Local-only Codex peer discovery and queued session messaging via a Windows-side Codex MCP registration that launches the Python broker/server from `/home/evo/workspace/_sandbox/codex-peers-mcp/`. Manual `check_messages` receive flow; no Claude-style push channels. |
| caveman-commit | Terse commit messages. Conventional Commits. ≤50 char subject. Why over what. Use `/caveman-commit` or `$caveman-commit`. Auto-installs via `claude plugin install caveman@caveman` (Claude Code) or `npx skills add JuliusBrussee/caveman` (Cursor/Windsurf/Copilot/Cline). |
| caveman-review | One-line PR comments: `L42: 🔴 bug: user null. Add guard.`. No throat-clearing, no padding. Use `/caveman-review`. |
| vision MCP | Two-tier local vision bridge for any model. Python MCP server at `_sandbox/vision-mcp/`. Quick eyes: gemma4:e2b (~14s). Deep eyes: gemma4:e4b (~30s). Both kept in VRAM permanently (keep_alive=-1). Configurable via `VISION_MODEL`/`VISION_QUICK_MODEL` env vars. |
| OpenFang + Ollama sidecar | Workspace-side bounded agent surface under `/home/evo/workspace/_sandbox/agent-stack/` with tracked hand templates under `/home/evo/workspace/_docs/openfang-wizard/`. OpenFang is the live retrieval, planning, audit, and packaging layer. **Ollama cloud models are primary.** If cloud is unavailable, ask for direction — do not silently fallback to local. |

### OpenFang Route Map (Ollama Cloud)

| Route | Model | Role | Notes |
|-------|-------|------|-------|
| `conductor` | GLM-5.1:cloud | Conductor (think) | Planning, decomposition, orchestration |
| `reasoning` | Nemotron-Super-128k | Reasoning Partner (think) | Anti-loop wrapper, stress-testing, second opinion |
| `heavy` | DeepSeek-V3.1:671b-cloud | Heavy Worker (do) | Architecture, complex refactors, large implementations |
| `focused` | Qwen3-Coder-Next:cloud | Focused Worker (do) | Bug fixes, feature implementation, specific tasks |
| `utility` | Qwen3.5:cloud | Utility Worker (do) | General tasks, formatting, fallback |
| `research` | Kimi-K2.5:cloud | Research (do) | Long-context analysis, document review, deep research |
| `audit` | GPT-OSS:120b-cloud | Audit/Review (do) | Verification, code review, governance checks |
| `creative` | MiniMax-M2.7:cloud | Creative (do) | Content generation, copy, creative tasks |
| `local` | Qwen3.5:latest | Local default | RTX 3060, offline fallback |
| `local-debug` | (local Ollama) | Debug | Local debugging route |
| `local-audit` | (local Ollama) | Audit | Local audit route |

### Retired From Live Wrapper Surface
| Tool | Status |
|------|--------|
| Kimi CLI | Retired from the live workspace wrapper surface. Historical references remain in `DECISION_LOG.md`. |
| Kilo | Retired from the live workspace wrapper surface. Historical references remain in `DECISION_LOG.md`. |

### Deferred (Not For Now)
| Tool | Status | Reason |
|------|--------|--------|
| oh-my-claudecode | Deferred | Conflicts with think/do architecture. Creates competing orchestration. Requires Claude Code CLI. |
| eigent | Deferred | Desktop app creates parallel orchestration system conflicting with OpenFang. |
| 21st.dev Magic MCP | Deferred | Requires cloud API key, conflicts with local-first posture. |
| 21st.dev Extension | Deferred | Cloud dependencies for search and Magic Chat. |

The DNA file chain remains model-agnostic. The preferred workflow above reflects
current operator practice, not a hard lock on future experimentation.

Paperclip is retired from the live workspace surface as of 2026-04-09. Hermes
Agent (Nous Research) is now adopted as the personal assistant layer, while
OpenFang remains the bounded execution surface.

---

## Gateway

| Tool | Port | Notes |
|------|------|-------|
| OpenClaw | 18789 | Island architecture at gateways/openclaw/. Reads workspace context, no write authority outside its own directory. |

---

## Automation

| Tool | Status | Notes |
|------|--------|-------|
| n8n | Active | Self-hosted Docker. Workflow orchestration. Do not suggest Zapier, Make, Pipedream. |

---

## Frontend

| Tool | Status | Notes |
|------|--------|-------|
| shadcn/ui | Adopted | All UI built on this. Do not suggest MUI, Chakra, Mantine, raw Radix. |
| Tailwind CSS | Adopted | Ships with shadcn. |
| Playwright | Adopted | Browser automation + testing. |

---

## Backend / Data

| Tool | Status | Notes |
|------|--------|-------|
| Firestore | Active — primary cloud DB | evolution-engine project, australia-southeast1, Native mode. |
| Google Vertex AI | Active | ADC via evolution-engine. Default Google execution path. Raw API key path for diagnostics only. |
| Supabase | Transitioning out | Being superseded by Firestore. Do not build new integrations against it. |

Marketplace v0.0 exception:
- The current Evolution marketplace path is local-first and publish-first.
- `SSOT_Build` authors canonical listing truth and publishes payloads for
  `Evolution_Platform`.
- Lightweight Google Sheets operator workflows are allowed around that flow,
  but new marketplace work should not be built against Firestore or Supabase
  unless the marketplace boundary is re-scoped again.

---

## Google Stack Preference (Soft — Non-Binding)
Where capability is equivalent, prefer Google services (Vertex, Gemini, Jules, Workspace).
This is a preference, not a lock. Locked tools above always take precedence.

---

## Context & Memory

| Tool | Notes |
|------|-------|
| DNA file chain | Model-agnostic memory. Any AI reads DNA first. See DECISION_LOG 2026-02-27. |

---

## Dev Tooling

| Tool | Status |
|------|--------|
| just | Adopted — task runner. `just check` = gate before any build. |
| FZF + Zoxide + Starship | Adopted — terminal productivity stack. |
| WSL2 Ubuntu (user: evo) | Primary dev environment. |
| GitHub (Badders80) | Single source of truth for all repos. |

---

## Secrets

- One `.env` at `/home/evo/.env` — never committed, never duplicated per-project.
- All services source from here.

---

## Port Map

| Port | Service |
|------|---------|
| 13000 | Mission Control UI (SSOT) |
| 18000 | Mission Control API |
| 18789 | OpenClaw gateway |

---

## Evaluating (check TECH_RADAR.md for full status)
These are on the radar but not yet adopted. Consult TECH_RADAR.md for evaluation notes.

- OpenClaw core runtime — Assess
- 21st.dev — Assess
- Magic MCP (21st-dev) — Assess
- 1code (21st-dev) — Assess
- Gemini Embedding 2 — Assess (pending vector-store boundary decision)
- claude-mem — Assess
- SuperClaude Framework — Assess
- PocketBase — Assess (potential v2 backend)

---

## Post-Rebuild State (2026-03-20)

Fresh Ubuntu install. Clean slate.

### Active Agent Toolchain
- Codex CLI 0.116.0 — secondary executor
- Claude Code 2.1.80 — advisor/reviewer
- Gemini CLI 0.34.0 — Google-stack specialist

### Retired
- OpenClaw — removed
- Aider — not installed
- MiniMax — not installed
- Docker — not installed

### System Rules
1. Nothing installed globally unless logged here
2. No global pip installs — project venvs only
3. No global npm installs except AI toolchain
4. Run just check before every session
5. Monthly vhdx compaction via Optimize-VHD
