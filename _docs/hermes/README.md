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
- Gateway launcher: `/home/evo/workspace/_scripts/hermes-gateway.sh`
- UI launcher: `/home/evo/workspace/_scripts/hermes-ui.sh`
- Hermes Workspace app: `/home/evo/workspace/_sandbox/hermes-workspace`
- Just target: `just hermes`
- Just gateway target: `just hermes-gateway`
- Just UI target: `just hermes-ui`
- Default model in this pass: local Ollama `qwen3.5:latest` via
  `http://localhost:11434/v1`
- Default local UI port: `3000`
- Default local gateway port: `8642`

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

## UI Option

Hermes Workspace is now the local-first UI surface for Hermes.

- Keep it private by default.
- Treat it as an optional front end, not a canonical truth source.
- Use the existing local repo at `/home/evo/workspace/_sandbox/hermes-workspace`.
- Keep that repo under `_sandbox/` because it is a workspace tool surface, not an Evolution product project.
- Prefer private Tailscale access for phone use instead of public exposure.

## Local UI Launch

Start the gateway first:

```bash
just hermes-gateway
```

In a second terminal, start the UI:

```bash
just hermes-ui
```

Then open:

```text
http://localhost:3000
```

What each command does:

- `just hermes` opens the interactive Hermes CLI in the workspace root.
- `just hermes-gateway` starts the Hermes API server on `127.0.0.1:8642`.
- `just hermes-ui` starts Hermes Workspace on `0.0.0.0:3000` and points it at the local gateway.

Expected local ports:

- `3000` - Hermes Workspace UI
- `8642` - Hermes gateway API

Quick verification:

```bash
curl http://127.0.0.1:8642/health
curl http://127.0.0.1:3000/api/connection-status
```

Current expected result:

- gateway health returns `{"status": "ok", "platform": "hermes-agent"}`
- connection status returns `ok: true` with backend `http://127.0.0.1:8642`

Note:

- The current Hermes setup is working in UI portable mode against the local Hermes API path.
- That is enough for the local UI path to work cleanly without introducing a second config source.

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

## PWA Install

Desktop:

1. Open Hermes Workspace in Chrome or Edge at `http://localhost:3000`
2. Click the install icon in the address bar
3. Install it as an app
4. Pin it to the taskbar or dock if you want it as a daily launcher

Phone:

1. Open the private Tailscale URL for the UI on your phone browser
2. iPhone or iPad: use Safari -> Share -> Add to Home Screen
3. Android: use Chrome -> menu -> Add to Home screen

## Private Phone Access

Preferred path: Tailscale, not a public route.

Hermes Workspace already binds to `0.0.0.0:3000`, while the Hermes gateway can
stay local-only on `127.0.0.1:8642`.

Recommended flow:

1. Install Tailscale on this machine and your phone.
2. Sign in to the same Tailnet on both devices.
3. Start `just hermes-gateway`.
4. Start `just hermes-ui`.
5. Find this machine's Tailnet IPv4 address:

```bash
tailscale ip -4
```

6. Open `http://<tailscale-ip>:3000` on your phone.
7. Add it to your home screen if you want the app-like launcher.

If Tailscale is not installed yet, keep using `http://localhost:3000` on
desktop first and add phone access later. Do not publish Hermes Workspace to
the public internet in this pass.

## Startup Rule

If Hermes Workspace becomes worth keeping always on, route that persistence
through the governed startup surface at `C:\evo\startup`.

Do not add ad hoc startup tasks, desktop shortcuts, or Startup-folder entries
outside that governed surface.

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
