# OpenFang Wizard — EVO-STATION Control Panel

## Daily open commands

Just the wizard:
```
wizard
```

Everything (workspace + wizard + config):
```
cd ~/workspace && code _docs/openfang-wizard/starters/evolution-workspace/evolution-openfang.code-workspace
```

## Key commands

```bash
openfang status                    # Check daemon + agents
openfang agent list                # List running agents
openfang hand list                 # List available Hands
openfang hand status evolution-workspace   # Check EVO Hand
openfang doctor                    # Run diagnostics
openfang stop && openfang start    # Restart daemon
```

## Daily query patterns

Ask the evolution-workspace Hand:
- "Summarise the current brand philosophy from DNA/brand/"
- "What are the last 3 entries in DECISION_LOG.md?"
- "What horses are currently in the intake queue in SSOT?"
- "List the active projects and their current status"
- "What does AGENTS.md say about [topic]?"

## Current operating model

We currently use four bounded OpenFang roles:

- `evolution-workspace` — read-only retrieval from tracked workspace files.
- `audit-workspace` — governance sentinel. It verifies workspace alignment, tracked docs, and runtime separation.
- `build-workspace` — process manager. It plans tasks, sequences work, and produces exact commands for human approval.
- `production-studio` — content packager. It turns approved source material into short manual-ready production packs such as heading, subheading, caption, and 4 to 8 square slides.

The process hand does not execute commands automatically; it manages the process and defers compliance checks to the audit hand.

Use `evolution-workspace` for citation-backed lookup, `build-workspace` for planning, `audit-workspace` for setup verification, and `production-studio` for manual-ready content packaging.

## Model reference

| Task | Model | Why |
|------|-------|-----|
| Default / daily queries | qwen3.5:latest (Ollama) | Free, local, private |
| Spot-check audit / sanity review | gemma4:latest (Ollama) | Optional local second opinion when needed |
| Provider fallback path | OpenRouter / OpenAI / Google | Runtime fallbacks only, not the default execution path |

## File locations

- OpenFang runtime config: `~/.openfang/config.toml`
- OpenFang data store: `~/.openfang/data`
- Runtime Hand configs: `~/.openfang/hands/`
- Versioned Hand templates: `~/workspace/_docs/openfang-wizard/hands/`
- Starter workspace file: `~/workspace/_docs/openfang-wizard/starters/evolution-workspace/evolution-openfang.code-workspace`
- This wizard: `~/workspace/_docs/openfang-wizard/`
- Note: `~/.openfang` is symlinked to `/home/evo/workspace/tools/agent-stack/openfang/state` in this environment.

## Retrieval helper

`qmd` is the preferred helper path for local semantic markdown lookup when that capability is needed.

Use it as a bounded helper over:

- `research_vault/` first
- selected high-signal docs in `DNA/`

Guardrails:

- tracked workspace files remain canonical
- runtime OpenFang memory is not the citation authority
- `qmd` is an auxiliary lookup layer, not canonical storage
- LightRAG and RAG-Anything remain future-evaluation paths only

## Repeatable audit

Run the workspace audit wrapper to verify OpenFang workspace governance and runtime separation:

```bash
cd ~/workspace && ./_docs/openfang-wizard/run-openfang-audit.sh
```

This script checks tracked wizard files, hand activation, agent status, and OpenFang runtime presence.

## Daily scheduled audit

A daily cron job has been added to run this audit at 07:00 local time and append output to:

```bash
~/workspace/_docs/openfang-wizard/run-openfang-audit.log
```

If you want a different schedule, update the crontab entry with `crontab -e`.
