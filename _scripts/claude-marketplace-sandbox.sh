#!/bin/bash
set -euo pipefail

cd /home/evo/workspace/_sandbox/claude-marketplace
export CLAUDE_LOCAL_MODEL="${CLAUDE_LOCAL_MODEL:-qwen3.5:latest}"
export CLAUDE_LOCAL_ADD_DIR="${CLAUDE_LOCAL_ADD_DIR:-$PWD}"

exec /home/evo/workspace/_scripts/claude-local.sh "$@"
