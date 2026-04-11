#!/bin/bash
set -euo pipefail

WORKSPACE_ROOT="/home/evo/workspace"
SYSTEM_ENV="/home/evo/.env"
HERMES_REPO="${HERMES_REPO:-/home/evo/.hermes/hermes-agent-workspace}"
HERMES_PY="${HERMES_PY:-$HERMES_REPO/venv/bin/python}"
HERMES_ENTRY="${HERMES_ENTRY:-$HERMES_REPO/cli.py}"

load_provider_env() {
  if [ ! -f "$SYSTEM_ENV" ]; then
    return 0
  fi

  eval "$(
    python3 - <<'PY'
from pathlib import Path
import shlex

env_path = Path("/home/evo/.env")
keys = {
    "OPENROUTER_API_KEY",
    "ANTHROPIC_API_KEY",
    "OPENAI_API_KEY",
    "GOOGLE_API_KEY",
    "GEMINI_API_KEY",
    "AI_GATEWAY_API_KEY",
    "GITHUB_TOKEN",
}

for raw in env_path.read_text(errors="ignore").splitlines():
    line = raw.strip()
    if not line or line.startswith("#") or "=" not in line:
        continue
    key, value = line.split("=", 1)
    if key in keys and value:
        print(f"export {key}={shlex.quote(value)}")
PY
  )"
}

main() {
  if [ ! -x "$HERMES_PY" ] || [ ! -f "$HERMES_ENTRY" ]; then
    echo "Error: Hermes Workspace gateway runtime not found at $HERMES_REPO"
    exit 1
  fi

  load_provider_env

  export API_SERVER_ENABLED="${API_SERVER_ENABLED:-true}"
  export API_SERVER_HOST="${API_SERVER_HOST:-127.0.0.1}"
  export API_SERVER_PORT="${API_SERVER_PORT:-8642}"

  cd "$WORKSPACE_ROOT"

  echo "Starting Hermes gateway on http://${API_SERVER_HOST}:${API_SERVER_PORT}"
  exec "$HERMES_PY" "$HERMES_ENTRY" --gateway
}

main "$@"
