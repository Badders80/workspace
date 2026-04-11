#!/bin/bash
set -euo pipefail

source /home/evo/workspace/_scripts/agent-context.sh
export PATH="$HOME/.local/bin:$PATH"

if ! command -v aider >/dev/null 2>&1; then
  echo "Error: aider command not found"
  echo "Install: curl -fsSL https://aider.chat/install.sh | sh"
  exit 1
fi

DNA_FILES=()
while IFS= read -r file; do
  DNA_FILES+=("--read" "$file")
done < <(workspace_context_files)

echo "Launching aider with workspace context"
exec aider "${DNA_FILES[@]}" "$@"
