#!/usr/bin/env python3
"""
OpenClaw Bridge — Safe HTTP wrapper for just / openfang commands.
Phase 2: AnythingLLM talks to this, this talks to your build system.
"""

import json
import logging
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# ─── Config ──────────────────────────────────────────────────────────
WORKSPACE_DIR = Path("/home/evo/workspace")
LOG_FILE = Path("/tmp/openclaw-bridge.log")
ALLOWED_TIMEOUT = 60  # seconds

# Whitelist: command string → metadata
ALLOWED_COMMANDS = {
    # Status / info (low risk)
    "just status": {"description": "Show project status", "risk": "low"},
    "just check": {"description": "Run all checks", "risk": "low"},
    "just backlog": {"description": "Show backlog", "risk": "low"},
    "just decisions": {"description": "Show decision log", "risk": "low"},
    "just anythingllm-start": {"description": "Start AnythingLLM", "risk": "low"},
    "just anythingllm-stop": {"description": "Stop AnythingLLM", "risk": "low"},
    "just anythingllm-logs": {"description": "Show AnythingLLM logs", "risk": "low"},
    "just fang-status": {"description": "OpenFang hand status", "risk": "low"},
    "openfang status": {"description": "Check daemon + agents", "risk": "low"},
    "openfang hand status evolution-workspace": {"description": "Check EVO hand", "risk": "low"},
    # Build (medium risk — human approval recommended)
    "just fang-local": {"description": "Start local Fang build", "risk": "medium"},
    "just fang-debug": {"description": "Start debug Fang build", "risk": "medium"},
    "just fang-audit": {"description": "Run Fang audit", "risk": "medium"},
    # Model-aware routes (medium risk — human approval recommended)
    "just fang-conductor": {"description": "Run conductor hand with kimi-k2.6:cloud", "risk": "medium"},
    "just fang-reasoning": {"description": "Run reasoning hand with glm-5.1:cloud", "risk": "medium"},
    "just fang-primary": {"description": "Run primary worker hand with kimi-k2.6:cloud", "risk": "medium"},
    "just fang-visual": {"description": "Run visual hand with gemma4:31b-cloud", "risk": "medium"},
    "just fang-creative": {"description": "Run creative hand with minimax-m2.7:cloud", "risk": "medium"},
    "just model-status": {"description": "Show active model routes and assignments", "risk": "low"},
}

# ─── Logging ───────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger("openclaw-bridge")

# ─── FastAPI App ───────────────────────────────────────────────────────
app = FastAPI(
    title="OpenClaw Bridge",
    description="Safe HTTP wrapper for just / openfang commands",
    version="0.1.0",
)


class RunRequest(BaseModel):
    command: str
    dry_run: bool = True  # Default to safe


class RunResponse(BaseModel):
    success: bool
    command: str
    dry_run: bool
    stdout: str
    stderr: str
    exit_code: int
    duration_ms: int
    timestamp: str


# ─── Helpers ────────────────────────────────────────────────────────────
def log_execution(command: str, success: bool, duration_ms: int, exit_code: int):
    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "command": command,
        "success": success,
        "duration_ms": duration_ms,
        "exit_code": exit_code,
    }
    logger.info(f"EXECUTED: {json.dumps(entry)}")


def run_command(command: str) -> tuple[str, str, int, int]:
    """Run a whitelisted command in the workspace directory."""
    start = time.time()
    try:
        result = subprocess.run(
            command,
            shell=True,
            cwd=WORKSPACE_DIR,
            capture_output=True,
            text=True,
            timeout=ALLOWED_TIMEOUT,
        )
        duration_ms = int((time.time() - start) * 1000)
        return result.stdout, result.stderr, result.returncode, duration_ms
    except subprocess.TimeoutExpired:
        duration_ms = int((time.time() - start) * 1000)
        return "", f"Command timed out after {ALLOWED_TIMEOUT}s", -1, duration_ms


# ─── Routes ────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "version": "0.1.0"}


@app.get("/commands")
def list_commands():
    """Return all allowed commands."""
    return {
        "commands": [
            {
                "command": cmd,
                "description": meta["description"],
                "risk": meta["risk"],
            }
            for cmd, meta in ALLOWED_COMMANDS.items()
        ]
    }


@app.post("/run", response_model=RunResponse)
def run(req: RunRequest):
    """
    Execute a whitelisted command.
    Default dry_run=True — must explicitly set dry_run=False to execute.
    """
    # Validate command is in whitelist
    if req.command not in ALLOWED_COMMANDS:
        logger.warning(f"BLOCKED: {req.command}")
        raise HTTPException(
            status_code=403,
            detail=f"Command not allowed: '{req.command}'. Use GET /commands to see allowed commands.",
        )

    meta = ALLOWED_COMMANDS[req.command]

    # Dry run: don't execute, just confirm
    if req.dry_run:
        return RunResponse(
            success=True,
            command=req.command,
            dry_run=True,
            stdout="",
            stderr="",
            exit_code=0,
            duration_ms=0,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )

    # Execute
    logger.info(f"EXECUTING: {req.command} (risk={meta['risk']})")
    stdout, stderr, exit_code, duration_ms = run_command(req.command)
    success = exit_code == 0

    log_execution(req.command, success, duration_ms, exit_code)

    return RunResponse(
        success=success,
        command=req.command,
        dry_run=False,
        stdout=stdout,
        stderr=stderr,
        exit_code=exit_code,
        duration_ms=duration_ms,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


@app.post("/run/dry", response_model=RunResponse)
def run_dry(req: RunRequest):
    """Force dry_run=True regardless of request."""
    req.dry_run = True
    return run(req)


@app.get("/logs")
def get_logs(limit: int = 20):
    """Return recent execution logs."""
    if not LOG_FILE.exists():
        return {"logs": []}

    lines = LOG_FILE.read_text().strip().split("\n")
    logs = []
    for line in lines[-limit:]:
        # Parse simple log format: timestamp | LEVEL | message
        parts = line.split(" | ", 2)
        if len(parts) == 3:
            logs.append({"raw": line})
    return {"logs": logs}


# ─── Main ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import socket
    import uvicorn

    # Guard: check if bridge is already running on port 8080
    def is_port_in_use(port: int) -> bool:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            return s.connect_ex(("127.0.0.1", port)) == 0

    if is_port_in_use(8080):
        print("=" * 60)
        print("OpenClaw Bridge")
        print("=" * 60)
        print("Bridge already running on port 8080.")
        print("Reusing existing instance.")
        print("=" * 60)
        sys.exit(0)

    print("=" * 60)
    print("OpenClaw Bridge")
    print("=" * 60)
    print(f"Workspace: {WORKSPACE_DIR}")
    print(f"Log file:  {LOG_FILE}")
    print(f"Allowed commands: {len(ALLOWED_COMMANDS)}")
    print("Docs: http://localhost:8080/docs")
    print("=" * 60)

    uvicorn.run(app, host="127.0.0.1", port=8080)
