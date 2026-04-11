#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/home/evo/workspace/_sandbox/open-webui"
VENV_PATH="$APP_ROOT/.venv"
DATA_DIR="$APP_ROOT/data"
CONFIG_DIR="$APP_ROOT/config"
PIP_CACHE_DIR="/mnt/s/pip-cache/open-webui"
HF_HOME="/mnt/s/huggingface-cache/open-webui"
XDG_CACHE_HOME="$APP_ROOT/.cache"
OPEN_TERMINAL_KEY_FILE="/home/evo/workspace/_sandbox/open-terminal/.api-key"
OPEN_TERMINAL_URL="http://127.0.0.1:8878"

mkdir -p "$DATA_DIR" "$CONFIG_DIR" "$PIP_CACHE_DIR" "$HF_HOME" "$XDG_CACHE_HOME"

export DATA_DIR
export PIP_CACHE_DIR
export HF_HOME
export XDG_CACHE_HOME

if [ -x /home/evo/workspace/_scripts/open-terminal.sh ] && [ -s "$OPEN_TERMINAL_KEY_FILE" ]; then
  OPEN_TERMINAL_API_KEY="$(tr -d '\r\n' < "$OPEN_TERMINAL_KEY_FILE")"

  if ! curl -fsS -H "Authorization: Bearer $OPEN_TERMINAL_API_KEY" "$OPEN_TERMINAL_URL/api/config" >/dev/null 2>&1; then
    nohup /home/evo/workspace/_scripts/open-terminal.sh \
      >/home/evo/workspace/_sandbox/open-terminal/open-terminal.log 2>&1 &
    sleep 2
  fi

  export TERMINAL_SERVER_CONNECTIONS="$(cat <<JSON
[{"id":"workspace-projects","name":"Workspace Projects","enabled":true,"url":"$OPEN_TERMINAL_URL","path":"/openapi.json","key":"$OPEN_TERMINAL_API_KEY","auth_type":"bearer"}]
JSON
)"
fi

cd "$APP_ROOT"
source "$VENV_PATH/bin/activate"

exec open-webui serve "$@"
