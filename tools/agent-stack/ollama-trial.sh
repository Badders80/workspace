#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/evo/workspace/tools/agent-stack"
BIN="$ROOT/ollama/bin/ollama"
MODEL_DIR="/home/evo/workspace/models/ollama"
LOG_FILE="/home/evo/workspace/_logs/agent-stack/ollama-serve.log"
PID_FILE="$ROOT/ollama/serve.pid"
HOST="127.0.0.1:11434"
START_TIMEOUT_SECS=30

if [ ! -x "$BIN" ]; then
  echo "Ollama binary not found at $BIN" >&2
  exit 1
fi

mkdir -p "$MODEL_DIR" "$(dirname "$LOG_FILE")"

export OLLAMA_HOST="$HOST"
export OLLAMA_MODELS="$MODEL_DIR"
export OLLAMA_NO_CLOUD="1"

is_listening() {
  ss -ltn 2>/dev/null | grep -q ':11434\b'
}

wait_for_listener() {
  local deadline=$((SECONDS + START_TIMEOUT_SECS))
  while [ "$SECONDS" -lt "$deadline" ]; do
    if is_listening; then
      return 0
    fi
    sleep 1
  done
  return 1
}

case "${1:-}" in
  start)
    if is_listening; then
      echo "Ollama already listening on $HOST"
      exit 0
    fi

    rm -f "$PID_FILE"
    setsid "$BIN" serve </dev/null >>"$LOG_FILE" 2>&1 &
    echo $! >"$PID_FILE"

    if wait_for_listener; then
      echo "Ollama listening on $HOST"
      echo "Models: $MODEL_DIR"
      echo "Log: $LOG_FILE"
      exit 0
    fi

    echo "Ollama did not start within ${START_TIMEOUT_SECS}s" >&2
    exit 1
    ;;
  stop)
    if [ -f "$PID_FILE" ]; then
      kill "$(cat "$PID_FILE")" 2>/dev/null || true
      rm -f "$PID_FILE"
    fi
    pkill -f "$BIN serve" 2>/dev/null || true
    echo "Ollama stop requested"
    ;;
  status)
    if is_listening; then
      echo "Ollama listening on $HOST"
      ss -ltnp 2>/dev/null | grep ':11434\b' || true
      "$BIN" list || true
    else
      echo "Ollama not listening on $HOST"
    fi
    ;;
  logs)
    tail -n 120 "$LOG_FILE"
    ;;
  *)
    exec "$BIN" "$@"
    ;;
esac
