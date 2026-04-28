#!/usr/bin/env bash
set -euo pipefail

# Session Log Health Check
# Runs as part of the system health cron cycle (every 15 minutes)
# OpenClaw-agnostic — pure bash, no gateway dependency

WORKSPACE="${WORKSPACE:-/home/evo/workspace}"
SESSION_LOG="$WORKSPACE/SESSION_LOG.md"
DAILY_MEMORY="$WORKSPACE/memory/$(date +%Y-%m-%d).md"
PLANNING_MD="$WORKSPACE/projects/PLANNING.md"
LOG_FILE="/home/evo/workspace/_logs/system-health/session-log-check.log"

# --- PLANNING.md freshness check ---
planning_stale=false
if [[ -f "$PLANNING_MD" ]]; then
    planning_modified=$(stat -c %Y "$PLANNING_MD" 2>/dev/null || echo 0)
    if [[ "$planning_modified" -lt "$today_start" ]]; then
        planning_stale=true
        echo "planning_md_stale=true" >> "$LOG_FILE"
        echo "PLANNING.md not updated today — bottleneck may be stale"
    else
        echo "planning_md_fresh=true"
    fi
else
    echo "planning_md_missing=true" >> "$LOG_FILE"
    echo "PLANNING.md missing at $PLANNING_MD"
fi

# Check if SESSION_LOG.md exists
if [[ ! -f "$SESSION_LOG" ]]; then
    echo "Creating $SESSION_LOG"
    cat > "$SESSION_LOG" <<'EOF'
# Workspace Session Log

> Append-only. Grows forever. Any tool can write.
EOF
fi

# Check if SESSION_LOG.md was modified today
last_modified=$(stat -c %Y "$SESSION_LOG" 2>/dev/null || echo 0)
today_start=$(date -d "today 00:00" +%s)

if [[ "$last_modified" -lt "$today_start" ]]; then
    # Not updated today — append auto-generated entry
    timestamp=$(date '+%Y-%m-%d %H:%M %Z')
    cat >> "$SESSION_LOG" <<EOF

## $timestamp — Auto-Log
**What happened:**
- Session active (auto-logged by system health check)

**What changed:**
- (Agent/human to fill in)

**Next:**
- (Agent/human to fill in)

**Decisions:**
- (Agent/human to fill in)
EOF
    echo "session_log_stale=true" >> "$LOG_FILE"
    echo "Auto-appended session log entry for $timestamp"
else
    echo "session_log_fresh=true"
    echo "Session log is current (updated today)"
fi

# If PLANNING.md is stale, append a nudge to SESSION_LOG
if [[ "$planning_stale" == "true" ]]; then
    cat >> "$SESSION_LOG" <<EOF

## $timestamp — Planning Nudge
**Quartermaster says:** PLANNING.md not updated today. Bottleneck may be stale.
**Action:** Open projects/PLANNING.md → reassess → update bottleneck.
EOF
    echo "Appended planning nudge to session log"
fi

# Also ensure daily memory file exists
if [[ ! -f "$DAILY_MEMORY" ]]; then
    mkdir -p "$WORKSPACE/memory"
    cat > "$DAILY_MEMORY" <<EOF
# Memory — $(date +%Y-%m-%d)

> Daily notes. Auto-created by system health check.
EOF
    echo "Created daily memory: $DAILY_MEMORY"
fi
