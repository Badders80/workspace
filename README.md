# Workspace

Canonical workspace root for the Evolution operating environment.

This repository is the control surface for workspace structure, operating docs, conventions, scripts, and project navigation. It is not the place where the main product codebases are developed day to day.

## What This Repo Is For

- Keep the workspace organized and navigable
- Store operating rules, decisions, and session bootstrap docs
- Track scripts and supporting docs used across projects
- Act as the entry point when working from GitHub or mobile

## Start Here

If you are opening this repo on mobile, these are the only files you usually need first:

1. [README.md](README.md) - quick orientation
2. [CONTEXT.md](CONTEXT.md) - what the workspace is and where things live
3. [AI_SESSION_BOOTSTRAP.md](AI_SESSION_BOOTSTRAP.md) - session map and current operating entry
4. [AGENTS.md](AGENTS.md) - workspace rules and guardrails

## Repo Layout

- `DNA/` - operating brain, brand, conventions, decisions, prompts, and AI context
- `projects/` - active project folders that live inside the workspace
- `_scripts/` - workspace scripts, checks, launchers, and audit helpers
- `_docs/` - planning docs, briefs, assets, and lightweight deliverables
- `tools/` - agent stack, bridges, and supporting tooling
- `research_vault/` - tracked sidecar research and normalized captures

## Active Projects

These are the main active surfaces currently present in `projects/`:

- `projects/Evolution_Platform/` - public platform site
- `projects/SSOT_Build/` - Mission Control internal app

Important: folders inside `projects/` are separate git repos. This `workspace` repo is the parent operating layer around them.

## Key Operating Docs

- [CONTEXT.md](CONTEXT.md) - high-level workspace context
- [MANIFEST.md](MANIFEST.md) - current structure and active/archive status
- [AGENTS.md](AGENTS.md) - workspace-level rules
- [DNA/ops/CONVENTIONS.md](DNA/ops/CONVENTIONS.md) - conventions and registry authority
- [DNA/ops/STACK.md](DNA/ops/STACK.md) - active tool registry
- [DNA/ops/memory-system-adoption.md](DNA/ops/memory-system-adoption.md) - current memory-layer operating model
- [DNA/ops/TRANSITION.md](DNA/ops/TRANSITION.md) - append-only handoff log
- [DNA/ops/DECISION_LOG.md](DNA/ops/DECISION_LOG.md) - architectural history and current path

## Memory Workflow

- `DNA/` and `research_vault/` are the tracked canonical memory surfaces.
- Obsidian is the human-facing sidecar over `research_vault/`.
- OpenFang is the bounded retrieval and workflow layer around tracked files.
- `qmd` is the documented helper path for local semantic markdown lookup when installed, not canonical storage.

## Working Rules

- `/home/evo/workspace` is the canonical root
- `/home/evo/` is control plane only, not the source of truth for active work
- One shared `.env` lives at `/home/evo/.env`
- Run `just check` before builds or structural changes

## Why This README Exists

This file is the fast entry point for travel and mobile use. It is meant to help you answer three questions quickly:

- What is this repo?
- Where is the real work?
- Which doc should I open next?
