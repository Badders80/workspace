# STACK.md — Live Tool Registry

> Canonical registry of tools at Adopt/Active status.
> Agent rule: do not suggest alternatives to tools listed here. Do not
> introduce new tools without updating this file and DECISION_LOG.md.
>
> Evaluation queue -> DNA/ops/TECH_RADAR.md (consult on demand, not auto-loaded)
> Decision rationale -> DNA/ops/DECISION_LOG.md

Last updated: 2026-04-09

---

## AI Operating Model

### Daily Drivers
| Tool | Role |
|------|------|
| Codex CLI | Primary workspace agent for overview, planning, review, and execution inside the canonical workspace. |
| Hermes Agent | Active personal front door for drafting, iteration, memory, and human-approved handoff into OpenFang. Launch from the workspace root so the existing `AGENTS.md` chain loads. Optional Hermes Workspace UI repo lives under `_sandbox/hermes-workspace`, not `projects/`. |
| Claude (browser/chat) | Human-in-the-loop advisor for planning, writing, and review, usually against `workspace_full` or pasted context. Not a required local wrapper. |

### Capability-Specific
| Tool | Role |
|------|------|
| Claude Code | Terminal-native deep refactors, review, or second-opinion execution when explicitly chosen. |
| Gemini CLI / Vertex AI | Google-stack tasks, `evolution-engine`, and ADC-first workflows. |

### Utility / Optional
| Tool | Notes |
|------|-------|
| Aider | Diff-first editing workflow when it is the best fit. |
| OpenRouter / Groq APIs | Low-cost utility inference, not the default daily agent surface. |
| Jules | Future GitHub-native async PR automation path; keep optional, not a daily driver. |
| codex-peers MCP | Local-only Codex peer discovery and queued session messaging via a Windows-side Codex MCP registration that launches the Python broker/server from `/home/evo/workspace/_sandbox/codex-peers-mcp/`. Manual `check_messages` receive flow; no Claude-style push channels. |
| OpenFang + Ollama sidecar | Workspace-side bounded agent surface under `/home/evo/workspace/_sandbox/agent-stack/` with tracked hand templates under `/home/evo/workspace/_docs/openfang-wizard/`. OpenFang is the live retrieval, planning, audit, and packaging layer; WSL-local Ollama is the default local runtime; hosted review lanes stay explicit manual route selections. |

### Retired From Live Wrapper Surface
| Tool | Status |
|------|--------|
| Kimi CLI | Retired from the live workspace wrapper surface. Historical references remain in `DECISION_LOG.md`. |
| Kilo | Retired from the live workspace wrapper surface. Historical references remain in `DECISION_LOG.md`. |

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
- Codex CLI 0.116.0 — primary executor
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
