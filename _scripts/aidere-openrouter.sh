#!/bin/bash
set -euo pipefail

source /home/evo/workspace/_scripts/agent-context.sh
export PATH="$HOME/.local/bin:$PATH"

if [ -r "$HOME/.env" ]; then
  set -a
  . "$HOME/.env"
  set +a
fi

if ! command -v aider >/dev/null 2>&1; then
  echo "Error: aider command not found"
  echo "Install: curl -fsSL https://aider.chat/install.sh | sh"
  exit 1
fi

if [ -z "${OPENROUTER_API_KEY:-}" ]; then
  echo "Error: OPENROUTER_API_KEY not found in /home/evo/.env"
  exit 1
fi

DNA_FILES=()
while IFS= read -r file; do
  DNA_FILES+=("--read" "$file")
done < <(workspace_context_files)

MODEL="${AIDERE_OPENROUTER_MODEL:-openrouter/deepseek/deepseek-v3.2}"

echo "Launching aider via OpenRouter model: $MODEL"
exec aider --model "$MODEL" "${DNA_FILES[@]}" "$@"
