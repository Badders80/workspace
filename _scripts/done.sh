#!/usr/bin/env bash
# done.sh — End the active project session and clear focus
# Usage: done.sh

set -euo pipefail

ACTIVE_FILE="/home/evo/workspace/.active_project"

if [[ ! -f "$ACTIVE_FILE" ]]; then
  echo "No active project. Run 'just focus <project>' first."
  exit 0
fi

PROJECT="$(cat "$ACTIVE_FILE")"
PROJECT_DIR="/home/evo/workspace/projects/$PROJECT"

if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "Active project '$PROJECT' no longer exists. Clearing focus."
  rm -f "$ACTIVE_FILE"
  exit 0
fi

echo "═══════════════════════════════════════════════════════════"
echo "  🏁 WRAPPING UP: $PROJECT"
echo "═══════════════════════════════════════════════════════════"
echo ""

# End project session
bash /home/evo/workspace/_scripts/project-end.sh "$PROJECT"

# Clear active project
rm -f "$ACTIVE_FILE"

echo ""
echo "✅ Focus cleared. You're free."
