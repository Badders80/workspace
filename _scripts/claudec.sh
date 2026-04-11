#!/bin/bash
set -euo pipefail

source /home/evo/workspace/_scripts/agent-context.sh
LOCAL_LAUNCHER="/home/evo/workspace/_scripts/claude-local.sh"

if [ ! -x "$LOCAL_LAUNCHER" ]; then
  echo "Error: local Claude launcher not found at $LOCAL_LAUNCHER"
  exit 1
fi

if /home/evo/.local/bin/claude --help 2>&1 | grep -q "system-prompt"; then
  exec "$LOCAL_LAUNCHER" --system-prompt "$(workspace_context_prompt)" "$@"
fi

printf '%s\n' "$(workspace_context_prompt)" | exec "$LOCAL_LAUNCHER" "$@"
