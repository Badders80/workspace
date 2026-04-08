# OpenFang Wizard — EVO-STATION Control Panel

## Daily open commands

Just the wizard:
```
wizard
```

Everything (workspace + wizard + config):
```
cd ~/workspace && code evolution-openfang.code-workspace
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

## Model reference

| Task | Model | Why |
|------|-------|-----|
| Default / daily queries | qwen3.5:latest (Ollama) | Free, local, private |
| Heavy reasoning / compliance | claude-sonnet-4 (Anthropic) | Best quality, use sparingly |
| Fast/cheap bulk tasks | openrouter free tier | Fallback only |

## File locations

- OpenFang runtime config: `~/.openfang/config.toml`
- OpenFang data store: `~/.openfang/data`
- Runtime Hand configs: `~/.openfang/hands/`
- Versioned Hand templates: `~/workspace/_docs/openfang-wizard/hands/evolution-workspace/`
- This wizard: `~/workspace/_docs/openfang-wizard/`

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
EOF