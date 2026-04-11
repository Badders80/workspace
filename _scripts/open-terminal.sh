#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/home/evo/workspace/_sandbox/open-terminal"
VENV_PATH="$APP_ROOT/.venv"
CONFIG_PATH="$APP_ROOT/config.toml"
KEY_FILE="$APP_ROOT/.api-key"
WORKSPACE_ROOT="/home/evo/workspace/projects"
HOST="127.0.0.1"
PORT="8878"

mkdir -p "$APP_ROOT"

if [ ! -s "$KEY_FILE" ]; then
  python3 - <<'PY' > "$KEY_FILE"
import secrets
print(secrets.token_urlsafe(32))
PY
  chmod 600 "$KEY_FILE"
fi

export OPEN_TERMINAL_API_KEY="$(tr -d '\r\n' < "$KEY_FILE")"
export OPEN_TERMINAL_CORS_ALLOWED_ORIGINS="http://localhost:8080,http://127.0.0.1:8080"

cd "$WORKSPACE_ROOT"
source "$VENV_PATH/bin/activate"

exec open-terminal run \
  --host "$HOST" \
  --port "$PORT" \
  --config "$CONFIG_PATH" \
  --cwd "$WORKSPACE_ROOT"
