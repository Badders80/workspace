#!/usr/bin/env bash
# session-start.sh — Boot ritual. Writes heartbeat, loads context.
# Runs automatically when Cline session opens.
#
# What it does:
#   1. Writes .cline-active heartbeat (timestamp)
#   2. Prints session status from STATE.md + BLOCKERS.md
#   3. Reminds: "Say 'done' or 'wrap up' to close properly"

set -euo pipefail

WORKSPACE="/home/evo/workspace"
ACTIVE_FILE="$WORKSPACE/.cline-active"
STATE_FILE="$WORKSPACE/memory/STATE.md"
BLOCKERS_FILE="$WORKSPACE/memory/BLOCKERS.md"

# ─── WRITE HEARTBEAT ───
date -u +%Y-%m-%dT%H:%M:%SZ > "$ACTIVE_FILE"
echo "=== Session Active: $(cat "$ACTIVE_FILE") ==="
echo ""

# ─── LOAD CONTEXT ───
echo "--- Workspace State ---"
if [[ -f "$STATE_FILE" ]]; then
  # Extract system health table
  grep -A 20 "^## System Health" "$STATE_FILE" 2>/dev/null | head -15 || echo "  (no system health data)"
  echo ""
  
  # Extract active projects
  grep -A 30 "^## Active Project States" "$STATE_FILE" 2>/dev/null | grep -E "^(### |Status:|Next:)" | head -20 || echo "  (no project data)"
else
  echo "  WARNING: $STATE_FILE not found. Boot incomplete."
fi

echo ""
echo "--- Blockers ---"
if [[ -f "$BLOCKERS_FILE" ]]; then
  grep -E "^\| (B[0-9]+|Blocker|----)" "$BLOCKERS_FILE" 2>/dev/null | head -10 || echo "  No active blockers."
else
  echo "  No blockers file."
fi

echo ""
echo "--- Quick Commands ---"
echo "  'Status check'         → reload STATE + BLOCKERS"
echo "  'I'm working on [X]'   → load project MEMORY.md"
echo "  'Done' / 'Wrap up'     → trigger session-end"
echo "  'Add blocker: [what]'  → append to BLOCKERS.md"
echo ""

# ─── ACTIVE STACK ───
echo "--- Active Stack ---"
if [[ -f "$WORKSPACE/DNA/ops/STACK.md" ]]; then
  grep -E "^\| [a-z]" "$WORKSPACE/DNA/ops/STACK.md" 2>/dev/null | grep -v "Notes" | head -15 || echo "  (see DNA/ops/STACK.md)"
else
  echo "  (STACK.md not found)"
fi
echo ""

# ─── DETECT ACTIVE PROJECT ───
ACTIVE_PROJECT=$(find "$WORKSPACE/projects" -name "MEMORY.md" -mmin -60 2>/dev/null | head -1 | xargs dirname 2>/dev/null | xargs basename 2>/dev/null || echo "")
if [[ -n "$ACTIVE_PROJECT" ]]; then
  echo "--- Resumed Project: $ACTIVE_PROJECT ---"
  PROJECT_MEM="$WORKSPACE/projects/$ACTIVE_PROJECT/MEMORY.md"
  if [[ -f "$PROJECT_MEM" ]]; then
    grep -m1 "^## Current State" "$PROJECT_MEM" 2>/dev/null | sed 's/## Current State/- /' || echo "  (no state data)"
    grep -m1 "^## Active Threads" "$PROJECT_MEM" 2>/dev/null && echo "  (see MEMORY.md for full threads)"
  fi
  echo ""
fi

echo "=== Session Context Loaded ==="
echo ""
echo "Say 'done' or 'wrap things up' when finished. Monitor runs every 10 min."