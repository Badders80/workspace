#!/bin/bash
set -euo pipefail

WORKSPACE_ROOT="/home/evo/workspace"
HERMES_WORKSPACE_DIR="$WORKSPACE_ROOT/_sandbox/hermes-workspace"
HERMES_API_URL="${HERMES_API_URL:-http://127.0.0.1:8642}"
HERMES_UI_HOST="${HERMES_UI_HOST:-0.0.0.0}"
HERMES_UI_PORT="${HERMES_UI_PORT:-3000}"

main() {
  if ! command -v pnpm >/dev/null 2>&1; then
    echo "Error: pnpm is required to run Hermes Workspace."
    exit 1
  fi

  if [ ! -d "$HERMES_WORKSPACE_DIR" ]; then
    echo "Error: Hermes Workspace repo not found at $HERMES_WORKSPACE_DIR"
    exit 1
  fi

  if [ ! -d "$HERMES_WORKSPACE_DIR/node_modules" ]; then
    echo "Error: Hermes Workspace dependencies are missing."
    echo "Run: cd $HERMES_WORKSPACE_DIR && pnpm install"
    exit 1
  fi

  if ! curl -fsS "$HERMES_API_URL/health" >/dev/null 2>&1; then
    echo "Error: Hermes gateway is not reachable at $HERMES_API_URL"
    echo "Start it first with: just hermes-gateway"
    exit 1
  fi

  cd "$HERMES_WORKSPACE_DIR"

  echo "Starting Hermes Workspace on http://${HERMES_UI_HOST}:${HERMES_UI_PORT}"
  echo "Backend: $HERMES_API_URL"
  exec env \
    HERMES_API_URL="$HERMES_API_URL" \
    pnpm exec vite dev --host "$HERMES_UI_HOST" --port "$HERMES_UI_PORT" --strictPort
}

main "$@"
