#!/usr/bin/env bash
# project-start.sh — Resume a project session with MEMORY.md
# Usage: project-start.sh <project-name>

set -euo pipefail

PROJECT="${1:?Usage: project-start.sh <project-name>}"
PROJECT_DIR="/home/evo/workspace/projects/$PROJECT"
MEMORY_FILE="$PROJECT_DIR/MEMORY.md"
SESSION_LOG="$PROJECT_DIR/SESSION_LOG.md"

if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "ERROR: Project not found: $PROJECT_DIR"
  exit 1
fi

echo "═══════════════════════════════════════════════════════════"
echo "  🚀 $PROJECT — Session Start"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ─── WORKING MEMORY ───
if [[ -f "$MEMORY_FILE" ]] && [[ -s "$MEMORY_FILE" ]]; then
  echo "📋 CURRENT STATE"
  echo "───────────────────────────────────────────────────────────"
  grep -A 30 "## Current State" "$MEMORY_FILE" 2>/dev/null | head -12 || true
  echo ""
  
  echo "🎯 ACTIVE THREADS"
  echo "───────────────────────────────────────────────────────────"
  grep -A 20 "## Active Threads" "$MEMORY_FILE" 2>/dev/null | head -15 || true
  echo ""
  
  echo "🔴 BLOCKERS"
  echo "───────────────────────────────────────────────────────────"
  grep -A 10 "## Blockers" "$MEMORY_FILE" 2>/dev/null | head -8 || true
  echo ""
else
  echo "⚠️  No MEMORY.md found. This project hasn't been initialized yet."
  echo ""
fi

# ─── LAST SESSION ───
if [[ -f "$SESSION_LOG" ]] && [[ -s "$SESSION_LOG" ]]; then
  echo "📝 LAST SESSION"
  echo "───────────────────────────────────────────────────────────"
  tail -20 "$SESSION_LOG" | grep -v "^$" | sed 's/^/  /'
  echo ""
fi

# ─── DNA REFERENCES ───
echo "🔗 DNA REFERENCES"
echo "───────────────────────────────────────────────────────────"
grep -A 5 "## DNA References" "$MEMORY_FILE" 2>/dev/null | head -6 || true
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "  Ready to work on $PROJECT"
echo "═══════════════════════════════════════════════════════════"
