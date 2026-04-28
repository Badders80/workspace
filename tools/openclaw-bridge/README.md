# OpenClaw Bridge

Safe HTTP wrapper for `just` and `openfang` commands.

## What This Is

A tiny FastAPI service that exposes a **whitelist** of safe build/status commands.
AnythingLLM (or any HTTP client) can call it, but only approved commands run.

## What This Is NOT

- NOT a shell execution service. Only whitelisted commands work.
- NOT automatic. Phase 1 (today) is still copy/paste from chat.
- NOT a replacement for your terminal. It's a bridge for future automation.

## Quick Start

```bash
# 1. Install deps
cd /home/evo/workspace/tools/openclaw-bridge
pip install -r requirements.txt

# 2. Run the server
python main.py

# 3. Check it's up
curl http://localhost:8080/health

# 4. List allowed commands
curl http://localhost:8080/commands

# 5. Dry-run a command (safe, doesn't execute)
curl -X POST http://localhost:8080/run \
  -H "Content-Type: application/json" \
  -d '{"command": "just status", "dry_run": true}'

# 6. Actually execute (requires explicit dry_run=false)
curl -X POST http://localhost:8080/run \
  -H "Content-Type: application/json" \
  -d '{"command": "just status", "dry_run": false}'
```

## Adding New Commands

Edit `ALLOWED_COMMANDS` in `main.py`:

```python
ALLOWED_COMMANDS = {
    "just status": {"description": "Show project status", "risk": "low"},
    # Add yours here:
    "just my-new-command": {"description": "What it does", "risk": "low|medium|high"},
}
```

Restart the server. The new command is immediately available.

## AnythingLLM Integration (Phase 2)

In AnythingLLM UI:

1. Go to **Agent → Tools → Custom**
2. Add a tool:
   - Name: `OpenClaw Bridge`
   - Method: `POST`
   - URL: `http://localhost:8080/run`
   - Headers: `{"Content-Type": "application/json"}`
   - Body: `{"command": "{{command}}", "dry_run": false}`
3. In chat, the agent can now suggest and (with your approval) execute commands.

## Safety

| Feature | How |
|---------|-----|
| Whitelist | Only `ALLOWED_COMMANDS` keys run. Everything else → 403 |
| Dry-run default | Must explicitly set `dry_run=false` to execute |
| Timeout | Commands timeout after 60s |
| Logging | Every execution logged to `/tmp/openclaw-bridge.log` |
| Working dir | Locked to `/home/evo/workspace` |

## Files

| File | Purpose |
|------|---------|
| `main.py` | FastAPI server |
| `requirements.txt` | Python deps |
| `README.md` | This file |

## Phase 1 vs Phase 2

| Phase | How | Status |
|-------|-----|--------|
| Phase 1 | You copy/paste commands from AnythingLLM chat into terminal | ✅ Active now |
| Phase 2 | AnythingLLM calls this bridge, bridge runs commands | 🔄 Ready when you are |
