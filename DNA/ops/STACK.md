# STACK.md — Active Tool Registry

> Current workspace tools at Active status.
> Register new tools here when adopted; remove when retired.

Last updated: 2026-04-28

---

## AI Operating Model

### Think/Do Architecture

| Role | Model | Purpose |
|------|-------|---------|
| Conductor | kimi-k2.6:cloud | Planning, decomposition, orchestration |
| Reasoning Partner | glm-5.1:cloud | Plan review, stress-testing, second opinion |
| Primary Worker | kimi-k2.6:cloud | Architecture, coding, research |
| Visual Worker | gemma4:31b-cloud | Screenshots, UI review, OCR, design |
| Creative Worker | minimax-m2.7:cloud | Content generation, copy |

### Local AI Wrappers

| Tool | Role |
|------|------|
| Codex CLI | Workspace agent for overview, review, bounded execution |
| Claude Code | Terminal-native deep refactors and review |
| Gemini CLI | Google-stack specialist |
| Hermes Agent | Personal front door for drafting, iteration, memory |

### MCP Servers

| Tool | Location | Purpose |
|------|----------|---------|
| Vision MCP | `tools/vision-mcp/` | Two-tier local vision (quick/deep). Models in VRAM permanently. |
| Codex Peers | `tools/codex-peers-mcp/` | Peer discovery and session messaging |

### Skills

| Skill | Location | Purpose |
|-------|----------|---------|
| UI/UX Pro Max | `DNA/skills/UI_UX_PRO_MAX.md` | Design intelligence for UI work |
| OpenFang + Ollama | `tools/agent-stack/` | Bounded agent surface |

---

## Frontend Stack

| Tool | Status | Notes |
|------|--------|-------|
| shadcn/ui | Active | Component base. Install via `npx shadcn` |
| Tailwind CSS | Active | Ships with shadcn |
| Framer Motion | Active | Declarative animations + gestures |
| Remotion | Active | Programmatic video/animation rendering |
| Playwright MCP | Active | Browser automation + testing via MCP |
| 21st.dev Registry | Active | Component source for shadcn/ui |
| superdesign | Active | AI product design agent (IDE-native) |
| 1code | Active | Orchestration layer for coding agents |
| UI/UX Pro Max | Active | Design intelligence skill for AI coders |

---

## Backend / Data

| Tool | Status | Notes |
|------|--------|-------|
| Firestore | Active | Primary cloud DB (evolution-engine) |
| Google Vertex AI | Active | ADC via evolution-engine |
| Supabase | Transitioning out | Do not build new integrations |

---

## Workflow Patterns

| Tool | Status | Notes |
|------|--------|-------|
| Sprint Protocol | Active | Formal execution: KICKOFF → WORK → REVIEW → RETRO |
| GSD-2 | Active | Lightweight loop for quick single tasks |

---

## Dev Tooling

| Tool | Status | Notes |
|------|--------|-------|
| just | Active | Task runner. `just check` = gate before builds |
| FZF + Zoxide + Starship | Active | Terminal productivity |
| WSL2 Ubuntu (user: evo) | Primary dev environment |
| GitHub (Badders80) | Single source of truth |
| caveman | Active | Terse communication style. Concise commits, PRs, docs |

---

## Port Map

| Port | Service |
|------|---------|
| 13000 | Mission Control UI (SSOT) |
| 18000 | Mission Control API |
| 18789 | OpenClaw gateway |

---

## Secrets

- One `.env` at `/home/evo/.env` — never committed, never duplicated per-project.
- All services source from here.

---

## System Rules

1. Nothing installed globally unless logged here
2. No global pip installs — project venvs only
3. No global npm installs except AI toolchain
4. Run `just check` before every session
5. Monthly vhdx compaction via Optimize-VHD