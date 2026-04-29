# Heartbeat Tasks

> Periodic checks for OpenClaw main session.
> Runs every ~30 minutes. Keep lightweight to limit token burn.

## Check Rotation (2-4x per day)

Rotate through these. Don't check all every heartbeat — pick 1-2.

### System Health
- Run `health-check.sh` → log status
- Check if system health cron is running: `crontab -l | grep system-health`
- If status != ok, alert user

### Memory Maintenance (1-2x per day)
- Read recent `memory/YYYY-MM-DD.md`
- Identify significant events worth keeping long-term
- Update `MEMORY.md` with distilled learnings
- Remove outdated info from MEMORY.md

### Project Pulse
- Check `workspace/MEMORY.md` — any stale blockers?
- Check active project MEMORY.md files for drift
- If blockers changed, note in daily memory

### Session Log Hygiene
- Check if `SESSION_LOG.md` was updated today
- If not, prompt user at next interaction: "Want to log what happened?"

## When to Stay Quiet (NO_REPLY)

- Late night (23:00-08:00) unless urgent
- Human is clearly busy
- Nothing new since last check
- Just checked <30 minutes ago

## When to Reach Out

- Important blocker resolved or new blocker appears
- System health escalates to warn/critical
- Calendar event coming up (<2h)
- It's been >8h since last interaction

## Change Log

- 2026-04-26: Created from AGENTS.md heartbeat guidance + system health integration.
