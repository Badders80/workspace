#!/usr/bin/env bash
# session-end.sh — Graceful session close. Writes logs, clears heartbeat.
# Triggered by: "done", "wrap things up", "we are done for now"
#
# Usage:
#   just session-end                    → prompts interactively
#   just session-end "Shipped X"        → one-liner
#   just session-end --ship="X" --blockers="none" --decisions="none"

set -euo pipefail

WORKSPACE="/home/evo/workspace"
ACTIVE_FILE="$WORKSPACE/.cline-active"
LOG_FILE="$WORKSPACE/memory/SESSION_LOG.md"
STATE_FILE="$WORKSPACE/memory/STATE.md"

TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# ─── PARSE ARGS ───
SHIP_LOG=""
BLOCKERS_CHANGED=""
DECISIONS_MADE=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --ship=*) SHIP_LOG="${1#--ship=}"; shift ;;
    --blockers=*) BLOCKERS_CHANGED="${1#--blockers=}"; shift ;;
    --decisions=*) DECISIONS_MADE="${1#--decisions=}"; shift ;;
    --*) echo "Unknown flag: $1"; exit 1 ;;
    *) SHIP_LOG="$1"; shift ;;
  esac
done

# ─── DETECT ACTIVE PROJECT ───
ACTIVE_PROJECT=$(find "$WORKSPACE/projects" -name "MEMORY.md" -mmin -60 2>/dev/null | head -1 | xargs dirname 2>/dev/null | xargs basename 2>/dev/null || echo "")

# ─── PROMPT IF NOT PROVIDED ───
if [[ -z "$SHIP_LOG" ]]; then
  echo "=== Session End ==="
  echo "What shipped this session? (one line, or 'nothing'):"
  read -r SHIP_LOG
  [[ -z "$SHIP_LOG" ]] && SHIP_LOG="nothing explicit"
fi

# ─── APPEND TO SESSION LOG ───
{
  echo ""
  echo "## $TIMESTAMP — SESSION END"
  echo "- **Shipped:** $SHIP_LOG"
  [[ -n "$ACTIVE_PROJECT" ]] && echo "- **Project:** $ACTIVE_PROJECT"
  [[ -n "$BLOCKERS_CHANGED" ]] && echo "- **Blockers:** $BLOCKERS_CHANGED"
  [[ -n "$DECISIONS_MADE" ]] && echo "- **Decisions:** $DECISIONS_MADE"
  echo "- **Status:** Graceful close"
} >> "$LOG_FILE"

echo "  ✅ Appended to SESSION_LOG.md"

# ─── UPDATE PROJECT MEMORY ───
if [[ -n "$ACTIVE_PROJECT" ]]; then
  PROJECT_MEM="$WORKSPACE/projects/$ACTIVE_PROJECT/MEMORY.md"
  if [[ -f "$PROJECT_MEM" ]]; then
    # Update "Last sprint" or add session note
    echo "" >> "$PROJECT_MEM"
    echo "**Session $TIMESTAMP:** $SHIP_LOG" >> "$PROJECT_MEM"
    echo "  ✅ Updated projects/$ACTIVE_PROJECT/MEMORY.md"
  fi
fi

# ─── CLEAR HEARTBEAT ───
if [[ -f "$ACTIVE_FILE" ]]; then
  rm -f "$ACTIVE_FILE"
  echo "  ✅ Cleared session heartbeat"
fi

echo ""
echo "=== Session End Complete ==="
echo "Session logged. Ready for next session."