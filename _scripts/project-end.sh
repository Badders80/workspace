#!/usr/bin/env bash
# project-end.sh — Close a project session and update MEMORY.md
# Usage: project-end.sh <project-name>

set -euo pipefail

PROJECT="${1:?Usage: project-end.sh <project-name>}"
PROJECT_DIR="/home/evo/workspace/projects/$PROJECT"
MEMORY_FILE="$PROJECT_DIR/MEMORY.md"
SESSION_LOG="$PROJECT_DIR/SESSION_LOG.md"
TIMESTAMP="$(date -u +%Y-%m-%d)"

if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "ERROR: Project not found: $PROJECT_DIR"
  exit 1
fi

echo "═══════════════════════════════════════════════════════════"
echo "  🏁 $PROJECT — Session End"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ─── PROMPTS ───
if [[ ! -t 0 ]]; then
  echo "Non-interactive mode detected. Skipping prompts."
  echo "Run 'just project-end $PROJECT' from an interactive terminal for full ritual."
  DONE=""
  FAILED=""
  DECIDED=""
  BLOCKED=""
  NEXT=""
else
  echo "What did you do this session? (one line, or press Enter to skip)"
  read -r DONE
  echo ""

  echo "What was tried and failed? (one line, or press Enter to skip)"
  read -r FAILED
  echo ""

  echo "What was decided? (one line, or press Enter to skip)"
  read -r DECIDED
  echo ""

  echo "What's blocked? (one line, or press Enter to skip)"
  read -r BLOCKED
  echo ""

  echo "What's next? (one line, or press Enter to skip)"
  read -r NEXT
  echo ""
fi

# ─── APPEND TO SESSION_LOG.MD ───
{
  echo ""
  echo "## $TIMESTAMP"
  [[ -n "$DONE" ]] && echo "- Done: $DONE"
  [[ -n "$FAILED" ]] && echo "- Failed: $FAILED"
  [[ -n "$DECIDED" ]] && echo "- Decided: $DECIDED"
  [[ -n "$BLOCKED" ]] && echo "- Blocked: $BLOCKED"
  [[ -n "$NEXT" ]] && echo "- Next: $NEXT"
} >> "$SESSION_LOG"

echo "✅ Appended to SESSION_LOG.md"

# ─── UPDATE MEMORY.MD ───
# Update the "Current State" timestamp
if [[ -f "$MEMORY_FILE" ]]; then
  # Update last updated
  sed -i "s/^## Current State/## Current State\n**Last updated:** $TIMESTAMP/" "$MEMORY_FILE" 2>/dev/null || true
fi

echo "✅ Updated MEMORY.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  $PROJECT session closed."
echo "  Read: MEMORY.md | Log: SESSION_LOG.md"
echo "═══════════════════════════════════════════════════════════"
