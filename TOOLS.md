# TOOLS.md - Local Tool Registry

## Bridges

### OpenClaw → OpenFang Bridge
**Script:** `_scripts/openfang-bridge.sh`
**Purpose:** Delegate tasks from OpenClaw to OpenFang workers

**Quick commands:**
```bash
# Check OpenFang status
_scripts/openfang-bridge.sh status

# List agents
_scripts/openfang-bridge.sh agent-list

# Delegate coding task
_scripts/openfang-bridge.sh delegate-coding "Implement user auth"

# Delegate research
_scripts/openfang-bridge.sh delegate-research "Compare LLM providers"

# Delegate analysis
_scripts/openfang-bridge.sh delegate-analysis "Review codebase for SQL injection"
```

**OpenFang endpoint:** `http://127.0.0.1:50051`

## OpenFang Agents
| Agent | Role | Status |
|---|---|---|
| `coder` | Code generation/review | Running |
| `analyst` | Analysis & debugging | Running |
| `assistant` | General tasks | Running |
| `researcher-hand` | Research & investigation | Running |

## Environment
- **OpenFang URL:** `http://127.0.0.1:50051`
- **OpenClaw Gateway:** `http://127.0.0.1:18789`
- **Ollama:** `http://127.0.0.1:11434`
