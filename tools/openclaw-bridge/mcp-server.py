#!/usr/bin/env python3
"""OpenClaw + OpenFang Bridge MCP Server — stdio wrapper for dual delegation

Exposes MCP tools for two delegation paths:
  1. Copilot → OpenClaw Bridge (just commands, status, checks)
  2. Copilot → OpenFang API (direct agent spawn, chat, hand execution)

Usage:
    python mcp-server.py

MCP client config (.vscode/mcp.json):
    {
        "mcpServers": {
            "openclaw": {
                "command": "python3",
                "args": ["/home/evo/workspace/tools/openclaw-bridge/mcp-server.py"],
                "env": {
                    "BRIDGE_URL": "http://localhost:8080",
                    "BRIDGE_TIMEOUT": "60",
                    "OPENFANG_URL": "http://localhost:50051",
                    "OPENFANG_TIMEOUT": "120"
                }
            }
        }
    }
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from typing import Any

SERVER_NAME = "openclaw"
SERVER_VERSION = "0.2.0"
PROTOCOL_VERSION = "2025-03-26"

BRIDGE_URL = os.environ.get("BRIDGE_URL", "http://localhost:8080")
BRIDGE_TIMEOUT = int(os.environ.get("BRIDGE_TIMEOUT", "60"))
OPENFANG_URL = os.environ.get("OPENFANG_URL", "http://localhost:50051")
OPENFANG_TIMEOUT = int(os.environ.get("OPENFANG_TIMEOUT", "120"))


def log(message: str) -> None:
    print(f"[{SERVER_NAME}] {message}", file=sys.stderr, flush=True)


def bridge_get(endpoint: str) -> dict[str, Any]:
    url = f"{BRIDGE_URL}{endpoint}"
    req = urllib.request.Request(url, method="GET")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=BRIDGE_TIMEOUT) as resp:
        return json.loads(resp.read().decode("utf-8"))


def bridge_post(endpoint: str, payload: dict[str, Any]) -> dict[str, Any]:
    url = f"{BRIDGE_URL}{endpoint}"
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=BRIDGE_TIMEOUT) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fang_get(endpoint: str) -> dict[str, Any]:
    url = f"{OPENFANG_URL}{endpoint}"
    req = urllib.request.Request(url, method="GET")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=OPENFANG_TIMEOUT) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fang_post(endpoint: str, payload: dict[str, Any]) -> dict[str, Any]:
    url = f"{OPENFANG_URL}{endpoint}"
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=OPENFANG_TIMEOUT) as resp:
        return json.loads(resp.read().decode("utf-8"))


def format_content(text: str, *, is_error: bool = False) -> dict[str, Any]:
    result: dict[str, Any] = {"content": [{"type": "text", "text": text}]}
    if is_error:
        result["isError"] = True
    return result


def list_tools() -> dict[str, Any]:
    return {
        "tools": [
            {
                "name": "get_status",
                "title": "Get Project Status",
                "description": "Get workspace status via just status.",
                "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
            },
            {
                "name": "run_check",
                "title": "Run Project Checks",
                "description": "Run just check to verify workspace health.",
                "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
            },
            {
                "name": "list_commands",
                "title": "List Allowed Commands",
                "description": "List all whitelisted bridge commands with risk levels.",
                "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
            },
            {
                "name": "run_command",
                "title": "Run Allowed Command",
                "description": (
                    "Execute a whitelisted command via the OpenClaw bridge. "
                    "Default dry_run=True — must explicitly set dry_run=false to execute."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "command": {"type": "string", "description": "Exact command string from whitelist."},
                        "dry_run": {"type": "boolean", "description": "If true, validates only. Default: true.", "default": True},
                    },
                    "required": ["command"],
                    "additionalProperties": False,
                },
            },
            {
                "name": "read_memory",
                "title": "Read Project MEMORY.md",
                "description": (
                    "Read the MEMORY.md file from a project to know current state, "
                    "active threads, blockers, and recent decisions."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "project": {
                            "type": "string",
                            "description": "Project name, e.g. 'SSOT_Build', 'Evolution_Platform', 'Evolution_Token'.",
                        },
                    },
                    "required": ["project"],
                    "additionalProperties": False,
                },
            },
            {
                "name": "read_workspace_memory",
                "title": "Read Workspace MEMORY.md",
                "description": (
                    "Read the workspace-level MEMORY.md for cross-project context, "
                    "active projects, blockers, and recent decisions."
                ),
                "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
            },
            {
                "name": "fang_list_agents",
                "title": "List OpenFang Agents",
                "description": "List all running OpenFang agents with their models and states.",
                "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
            },
            {
                "name": "fang_spawn_agent",
                "title": "Spawn OpenFang Agent",
                "description": (
                    "Spawn a new OpenFang agent with a specific model and name. "
                    "Returns the agent ID for chat/delegation."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string", "description": "Agent name, e.g. 'platform-worker'"},
                        "model": {
                            "type": "string",
                            "description": "Model route, e.g. 'kimi-k2.6:cloud', 'glm-5.1:cloud'",
                            "default": "kimi-k2.6:cloud",
                        },
                        "system_prompt": {
                            "type": "string",
                            "description": "Optional system prompt to initialize the agent.",
                            "default": "",
                        },
                    },
                    "required": ["name"],
                    "additionalProperties": False,
                },
            },
            {
                "name": "fang_chat",
                "title": "Chat with OpenFang Agent",
                "description": (
                    "Send a message to a running OpenFang agent and get its response. "
                    "Use this to delegate tasks to Fang workers."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "agent_id": {"type": "string", "description": "Agent ID from fang_list_agents or fang_spawn_agent."},
                        "message": {"type": "string", "description": "The task or question to send."},
                    },
                    "required": ["agent_id", "message"],
                    "additionalProperties": False,
                },
            },
            {
                "name": "fang_list_hands",
                "title": "List OpenFang Hands",
                "description": "List all available OpenFang hands.",
                "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
            },
            {
                "name": "fang_run_hand",
                "title": "Run OpenFang Hand",
                "description": (
                    "Activate and run an OpenFang hand with a prompt. "
                    "Hands are specialized agents (researcher, browser, lead, etc.)."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "hand_id": {"type": "string", "description": "Hand ID from fang_list_hands, e.g. 'researcher', 'browser'."},
                        "prompt": {"type": "string", "description": "The task prompt for the hand."},
                    },
                    "required": ["hand_id", "prompt"],
                    "additionalProperties": False,
                },
            },
            {
                "name": "fang_kill_agent",
                "title": "Kill OpenFang Agent",
                "description": "Kill a running OpenFang agent by ID.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "agent_id": {"type": "string", "description": "Agent ID to kill."},
                    },
                    "required": ["agent_id"],
                    "additionalProperties": False,
                },
            },
        ],
    }


def call_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    if name == "get_status":
        try:
            result = bridge_post("/run", {"command": "just status", "dry_run": False})
            return format_content(result.get("stdout", "No output"))
        except Exception as e:
            return format_content(f"Status check failed: {e}", is_error=True)

    elif name == "run_check":
        try:
            result = bridge_post("/run", {"command": "just check", "dry_run": False})
            stdout = result.get("stdout", "")
            stderr = result.get("stderr", "")
            exit_code = result.get("exit_code", -1)
            status = "PASS" if exit_code == 0 else "FAIL"
            return format_content(f"Check result: {status}\n\nstdout:\n{stdout}\n\nstderr:\n{stderr}")
        except Exception as e:
            return format_content(f"Check failed: {e}", is_error=True)

    elif name == "list_commands":
        try:
            result = bridge_get("/commands")
            commands = result.get("commands", [])
            lines = ["Allowed commands:"]
            for cmd in commands:
                lines.append(f"  {cmd['command']} — {cmd['description']} (risk: {cmd['risk']})")
            return format_content("\n".join(lines))
        except Exception as e:
            return format_content(f"Failed to list commands: {e}", is_error=True)

    elif name == "run_command":
        command = str(arguments["command"])
        dry_run = bool(arguments.get("dry_run", True))
        try:
            result = bridge_post("/run", {"command": command, "dry_run": dry_run})
            stdout = result.get("stdout", "")
            stderr = result.get("stderr", "")
            exit_code = result.get("exit_code", -1)
            success = result.get("success", False)
            status = "SUCCESS" if success else "FAILED"
            return format_content(
                f"Command: {command}\n"
                f"Dry run: {dry_run}\n"
                f"Status: {status} (exit code: {exit_code})\n\n"
                f"stdout:\n{stdout}\n\n"
                f"stderr:\n{stderr}"
            )
        except Exception as e:
            return format_content(f"Command execution failed: {e}", is_error=True)

    elif name == "read_memory":
        project = str(arguments["project"])
        memory_path = f"/home/evo/workspace/projects/{project}/MEMORY.md"
        try:
            with open(memory_path, "r") as f:
                content = f.read()
            return format_content(f"Project: {project}\n\n{content}")
        except FileNotFoundError:
            return format_content(f"No MEMORY.md found for project '{project}'.", is_error=True)
        except Exception as e:
            return format_content(f"Failed to read MEMORY.md: {e}", is_error=True)

    elif name == "read_workspace_memory":
        memory_path = "/home/evo/workspace/MEMORY.md"
        try:
            with open(memory_path, "r") as f:
                content = f.read()
            return format_content(f"Workspace MEMORY.md:\n\n{content}")
        except FileNotFoundError:
            return format_content("No workspace MEMORY.md found.", is_error=True)
        except Exception as e:
            return format_content(f"Failed to read workspace MEMORY.md: {e}", is_error=True)

    elif name == "fang_list_agents":
        try:
            result = fang_get("/api/agents")
            agents = result if isinstance(result, list) else result.get("agents", [])
            lines = ["OpenFang Agents:"]
            for a in agents:
                lines.append(
                    f"  {a.get('id', '?')[:8]}... | {a.get('name', '?')} | "
                    f"{a.get('model_name', '?')} | {a.get('state', '?')}"
                )
            return format_content("\n".join(lines))
        except Exception as e:
            return format_content(f"Failed to list agents: {e}", is_error=True)

    elif name == "fang_spawn_agent":
        agent_name = str(arguments["name"])
        model = str(arguments.get("model", "kimi-k2.6:cloud"))
        system_prompt = str(arguments.get("system_prompt", ""))
        try:
            payload = {"name": agent_name, "model": model, "provider": "ollama"}
            if system_prompt:
                payload["system_prompt"] = system_prompt
            result = fang_post("/api/agents", payload)
            agent_id = result.get("id", "unknown")
            return format_content(
                f"Agent spawned successfully.\n"
                f"Name: {agent_name}\n"
                f"ID: {agent_id}\n"
                f"Model: {model}"
            )
        except Exception as e:
            return format_content(f"Failed to spawn agent: {e}", is_error=True)

    elif name == "fang_chat":
        agent_id = str(arguments["agent_id"])
        message = str(arguments["message"])
        try:
            result = fang_post(f"/api/agents/{agent_id}/chat", {"message": message})
            response = result.get("response", result.get("message", "No response"))
            return format_content(f"Agent {agent_id[:8]}... responded:\n\n{response}")
        except Exception as e:
            return format_content(f"Chat failed: {e}", is_error=True)

    elif name == "fang_list_hands":
        try:
            result = fang_get("/api/hands")
            hands = result if isinstance(result, list) else result.get("hands", [])
            lines = ["OpenFang Hands:"]
            for h in hands:
                lines.append(
                    f"  {h.get('id', '?')} | {h.get('name', '?')} | "
                    f"{h.get('category', '?')} | {h.get('description', '?')[:50]}..."
                )
            return format_content("\n".join(lines))
        except Exception as e:
            return format_content(f"Failed to list hands: {e}", is_error=True)

    elif name == "fang_run_hand":
        hand_id = str(arguments["hand_id"])
        prompt = str(arguments["prompt"])
        try:
            fang_post(f"/api/hands/{hand_id}/activate", {})
            result = fang_post(f"/api/hands/{hand_id}/chat", {"message": prompt})
            response = result.get("response", result.get("message", "No response"))
            return format_content(f"Hand '{hand_id}' result:\n\n{response}")
        except Exception as e:
            return format_content(f"Hand execution failed: {e}", is_error=True)

    elif name == "fang_kill_agent":
        agent_id = str(arguments["agent_id"])
        try:
            req = urllib.request.Request(
                f"{OPENFANG_URL}/api/agents/{agent_id}", method="DELETE"
            )
            with urllib.request.urlopen(req, timeout=OPENFANG_TIMEOUT) as resp:
                return format_content(f"Agent {agent_id[:8]}... killed.")
        except Exception as e:
            return format_content(f"Failed to kill agent: {e}", is_error=True)

    else:
        raise ValueError(f"Unknown tool: {name}")


def write_message(payload: dict[str, Any]) -> None:
    body = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    sys.stdout.buffer.write(f"Content-Length: {len(body)}\r\n\r\n".encode("ascii"))
    sys.stdout.buffer.write(body)
    sys.stdout.buffer.flush()


def read_message() -> dict[str, Any] | None:
    headers: dict[str, str] = {}
    while True:
        line = sys.stdin.buffer.readline()
        if not line:
            return None
        if line in (b"\r\n", b"\n"):
            break
        name, _, value = line.decode("utf-8", errors="replace").partition(":")
        headers[name.strip().lower()] = value.strip()

    content_length = int(headers.get("content-length", "0"))
    if content_length <= 0:
        return None
    body = sys.stdin.buffer.read(content_length)
    return json.loads(body.decode("utf-8"))


def success_response(message_id: Any, result: dict[str, Any]) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": message_id, "result": result}


def error_response(message_id: Any, code: int, message: str) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": message_id, "error": {"code": code, "message": message}}


def main() -> None:
    log(f"OpenClaw + OpenFang Bridge MCP Server v{SERVER_VERSION}")
    log(f"Bridge URL: {BRIDGE_URL}")
    log(f"OpenFang URL: {OPENFANG_URL}")

    while True:
        message = read_message()
        if message is None:
            break

        message_id = message.get("id")
        method = message.get("method")
        params = message.get("params") or {}

        if method == "notifications/initialized":
            continue

        if method == "ping" and message_id is not None:
            write_message(success_response(message_id, {}))
            continue

        if method == "initialize" and message_id is not None:
            write_message(success_response(message_id, {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {"tools": {}},
                "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
                "instructions": (
                    "OpenClaw + OpenFang Bridge MCP Server.\n\n"
                    "Two delegation paths:\n"
                    "1. OpenClaw Bridge — run whitelisted just commands (get_status, run_check, run_command)\n"
                    "2. OpenFang Direct — spawn agents, chat with agents, run hands (fang_spawn_agent, fang_chat, fang_run_hand)\n\n"
                    "Memory: use read_memory and read_workspace_memory to get project state.\n"
                    f"Bridge: {BRIDGE_URL} | OpenFang: {OPENFANG_URL}"
                ),
            }))
            continue

        if method == "tools/list" and message_id is not None:
            write_message(success_response(message_id, list_tools()))
            continue

        if method == "tools/call" and message_id is not None:
            try:
                tool_name = str(params["name"])
                tool_args = params.get("arguments") or {}
                result = call_tool(tool_name, tool_args)
                write_message(success_response(message_id, result))
            except Exception as exc:
                write_message(error_response(message_id, -32603, str(exc)))
            continue


if __name__ == "__main__":
    main()
