#!/usr/bin/env bash
# session-monitor.sh — Detects dead Cline sessions and auto-runs session-end
# Runs via cron every 10 minutes: */10 * * * * /home/evo/workspace/_scripts/session-monitor.sh
#
# Logic:
#   1. Check if .cline-active exists
#   2. If age > 30 minutes → session is dead → auto session-end
#   3. If age ≤ 30 minutes → heartbeat is fresh → do nothing

set -euo pipefail

WORKSPACE="/home/evo/workspace"
ACTIVE_FILE="$WORKSPACE/.cline-active"
LOG_FILE="$WORKSPACE/memory/SESSION_LOG.md"
MAX_AGE_MINUTES=30

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] session-monitor: $*"
}

# No active file → nothing to monitor
if [[ ! -f "$ACTIVE_FILE" ]]; then
  exit 0
fi

# Check age of .cline-active
AGE_MINUTES=$(($(date +%s) - $(stat -c %Y "$ACTIVE_FILE" 2>/dev/null || echo "0")))
AGE_MINUTES=$((AGE_MINUTES / 60))

if [[ "$AGE_MINUTES" -gt "$MAX_AGE_MINUTES" ]]; then
  log "Session stale ($AGE_MINUTES min). Auto-ending..."

  # Detect active project from last modified files
  ACTIVE_PROJECT=$(find "$WORKSPACE/projects" -name "MEMORY.md" -mmin -60 2>/dev/null | head -1 | xargs dirname 2>/dev/null | xargs basename 2>/dev/null || echo "")

  # Append to session log
  echo "" >> "$LOG_FILE"
  echo "## $(date -u +%Y-%m-%dT%H:%M:%SZ) — SESSION TIMEOUT" >> "$LOG_FILE"
  echo "- **Status:** Auto-ended by monitor (no heartbeat for ${AGE_MINUTES}m)" >> "$LOG_FILE"
  echo "- **Project:** ${ACTIVE_PROJECT:-unknown}" >> "$LOG_FILE"
  echo "- **Note:** Session closed without explicit session-end. Review what shipped." >> "$LOG_FILE"

  # Clear active file
  rm -f "$ACTIVE_FILE"

  # Update STATE.md to reflect stale session
  if grep -q "Active session" "$WORKSPACE/memory/STATE.md" 2>/dev/null; then
    sed -i 's/Active session.*/Session closed (timeout)/' "$WORKSPACE/memory/STATE.md"
  fi

  log "Auto session-end complete. Project: ${ACTIVE_PROJECT:-unknown}"
else
  log "Heartbeat fresh ($AGE_MINUTES min). OK."
fi