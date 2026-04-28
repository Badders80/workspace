#!/usr/bin/env python3
"""Codex-compatible MCP server for local peer discovery and messaging."""

from __future__ import annotations

import atexit
import json
import os
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

BROKER_PORT = int(os.environ.get("CODEX_PEERS_PORT", "7901"))
BROKER_URL = f"http://127.0.0.1:{BROKER_PORT}"
BROKER_SCRIPT = Path(__file__).with_name("broker.py")
POLL_INTERVAL_SECONDS = 15
PROTOCOL_VERSION = "2025-03-26"
SERVER_NAME = "codex-peers"
SERVER_VERSION = "0.1.0"


def log(message: str) -> None:
    print(f"[{SERVER_NAME}] {message}", file=sys.stderr, flush=True)


def broker_request(path: str, payload: dict[str, Any] | None = None, *, timeout: float = 3.0) -> Any:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    headers = {"Content-Type": "application/json"} if payload is not None else {}
    request = urllib.request.Request(
        f"{BROKER_URL}{path}",
        data=data,
        headers=headers,
        method="POST" if payload is not None else "GET",
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def is_broker_alive() -> bool:
    try:
        request = urllib.request.Request(f"{BROKER_URL}/health", method="GET")
        with urllib.request.urlopen(request, timeout=1.0) as response:
            return response.status == 200
    except Exception:  # noqa: BLE001
        return False


def ensure_broker() -> None:
    if is_broker_alive():
        return

    log("Starting local broker")
    subprocess.Popen(  # noqa: S603
        [sys.executable, "-B", str(BROKER_SCRIPT)],
        cwd=str(BROKER_SCRIPT.parent),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
        env=os.environ.copy(),
    )

    for _ in range(30):
        time.sleep(0.2)
        if is_broker_alive():
            return
    raise RuntimeError("Failed to start codex-peers broker")


def run_git(args: list[str]) -> str | None:
    try:
        proc = subprocess.run(
            ["git", *args],
            cwd=os.getcwd(),
            capture_output=True,
            text=True,
            check=False,
        )
        if proc.returncode == 0:
            return proc.stdout.strip() or None
    except Exception:  # noqa: BLE001
        return None
    return None


def get_git_root() -> str | None:
    return run_git(["rev-parse", "--show-toplevel"])


def get_git_branch() -> str | None:
    return run_git(["rev-parse", "--abbrev-ref", "HEAD"])


def get_recent_files(limit: int = 5) -> list[str]:
    files: list[str] = []

    diff_files = run_git(["diff", "--name-only", "HEAD"])
    if diff_files:
        files.extend([line for line in diff_files.splitlines() if line])

    log_files = run_git(["log", "--oneline", "--name-only", "-5", "--format="])
    if log_files:
        for line in log_files.splitlines():
            if line and line not in files:
                files.append(line)

    return files[:limit]


def build_initial_summary(cwd: str, git_root: str | None) -> str:
    label = Path(git_root or cwd).name or "workspace"
    branch = get_git_branch()
    recent = get_recent_files()

    parts = [f"Working in {label}"]
    if branch:
        parts.append(f"on branch {branch}")
    summary = " ".join(parts) + "."

    if recent:
        shown = ", ".join(recent[:3])
        summary += f" Recent files include {shown}."
    return summary


def format_content(text: str, *, structured: dict[str, Any] | None = None, is_error: bool = False) -> dict[str, Any]:
    result: dict[str, Any] = {
        "content": [{"type": "text", "text": text}],
    }
    if structured is not None:
        result["structuredContent"] = structured
    if is_error:
        result["isError"] = True
    return result


class PeerServer:
    def __init__(self) -> None:
        self.cwd = os.getcwd()
        self.git_root = get_git_root()
        self.peer_id: str | None = None
        self._stop = threading.Event()
        self._heartbeat_thread: threading.Thread | None = None
        self._protocol_version = PROTOCOL_VERSION

    def start(self) -> None:
        ensure_broker()
        self.register()
        self._heartbeat_thread = threading.Thread(target=self.heartbeat_loop, daemon=True)
        self._heartbeat_thread.start()
        atexit.register(self.unregister)

    def register(self) -> None:
        initial_summary = build_initial_summary(self.cwd, self.git_root)
        result = broker_request(
            "/register",
            {
                "pid": os.getpid(),
                "cwd": self.cwd,
                "git_root": self.git_root,
                "summary": initial_summary,
            },
        )
        self.peer_id = result["id"]

    def unregister(self) -> None:
        self._stop.set()
        if self.peer_id:
            try:
                broker_request("/unregister", {"id": self.peer_id}, timeout=1.0)
            except Exception:  # noqa: BLE001
                pass
            self.peer_id = None

    def heartbeat_loop(self) -> None:
        while not self._stop.wait(POLL_INTERVAL_SECONDS):
            if not self.peer_id:
                continue
            try:
                broker_request("/heartbeat", {"id": self.peer_id}, timeout=1.0)
            except Exception:  # noqa: BLE001
                pass

    def handle_initialize(self, params: dict[str, Any]) -> dict[str, Any]:
        client_protocol = params.get("protocolVersion")
        if isinstance(client_protocol, str) and client_protocol:
            self._protocol_version = client_protocol

        return {
            "protocolVersion": self._protocol_version,
            "capabilities": {"tools": {}},
            "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
            "instructions": (
                "Use codex-peers to discover other Codex sessions on this machine, share a short "
                "summary, and exchange queued messages. Codex does not support Claude-style "
                "channel push here, so unread peer messages are received by tool call rather than "
                "instant session injection. Recommended routine: call collaboration_checkpoint at "
                "session start, after major task changes, after substantial work blocks, and "
                "before your final response. When your task focus changes, pass a brief summary so "
                "other peers can see what you are doing."
            ),
        }

    def require_peer_id(self) -> str:
        if not self.peer_id:
            raise RuntimeError("This session is not registered with the broker yet.")
        return self.peer_id

    def fetch_peers(self, scope: str) -> list[dict[str, Any]]:
        return broker_request(
            "/list-peers",
            {
                "scope": scope,
                "cwd": self.cwd,
                "git_root": self.git_root,
                "exclude_id": self.peer_id,
            },
        )

    def fetch_messages(self) -> list[dict[str, Any]]:
        peer_id = self.require_peer_id()
        result = broker_request("/poll-messages", {"id": peer_id})
        return result.get("messages", [])

    def list_tools(self) -> dict[str, Any]:
        return {
            "tools": [
                {
                    "name": "list_peers",
                    "title": "List Peers",
                    "description": (
                        "List other Codex sessions on this machine. Scope can be machine, "
                        "directory, or repo."
                    ),
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "scope": {
                                "type": "string",
                                "enum": ["machine", "directory", "repo"],
                                "description": "Where to look for other peers.",
                            }
                        },
                        "required": ["scope"],
                        "additionalProperties": False,
                    },
                },
                {
                    "name": "send_message",
                    "title": "Send Message",
                    "description": "Queue a message for another Codex peer by ID.",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "to_id": {"type": "string", "description": "Target peer ID."},
                            "message": {"type": "string", "description": "Message text."},
                        },
                        "required": ["to_id", "message"],
                        "additionalProperties": False,
                    },
                },
                {
                    "name": "set_summary",
                    "title": "Set Summary",
                    "description": "Set a short summary of what this Codex session is doing.",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "summary": {"type": "string", "description": "1-2 sentence summary."}
                        },
                        "required": ["summary"],
                        "additionalProperties": False,
                    },
                },
                {
                    "name": "check_messages",
                    "title": "Check Messages",
                    "description": "Fetch queued unread messages sent by other Codex peers.",
                    "inputSchema": {
                        "type": "object",
                        "properties": {},
                        "additionalProperties": False,
                    },
                },
                {
                    "name": "collaboration_checkpoint",
                    "title": "Collaboration Checkpoint",
                    "description": (
                        "Recommended routine call. Optionally update your summary, then fetch "
                        "unread messages and nearby peers in one step."
                    ),
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "summary": {
                                "type": "string",
                                "description": "Optional updated 1-2 sentence summary for this session.",
                            },
                            "scope": {
                                "type": "string",
                                "enum": ["machine", "directory", "repo"],
                                "description": "Which peer scope to list alongside inbox results.",
                            },
                        },
                        "additionalProperties": False,
                    },
                },
            ]
        }

    def call_tool(self, name: str, arguments: dict[str, Any]) -> dict[str, Any]:
        if name == "list_peers":
            scope = str(arguments.get("scope", "machine"))
            peers = self.fetch_peers(scope)
            if not peers:
                return format_content(f"No other Codex peers found (scope: {scope}).", structured={"peers": []})

            lines = []
            for peer in peers:
                line_parts = [
                    f"ID: {peer['id']}",
                    f"PID: {peer['pid']}",
                    f"CWD: {peer['cwd']}",
                ]
                if peer.get("git_root"):
                    line_parts.append(f"Repo: {peer['git_root']}")
                if peer.get("summary"):
                    line_parts.append(f"Summary: {peer['summary']}")
                line_parts.append(f"Last seen: {peer['last_seen']}")
                lines.append("\n  ".join(line_parts))

            return format_content(
                f"Found {len(peers)} peer(s) (scope: {scope}):\n\n" + "\n\n".join(lines),
                structured={"peers": peers},
            )

        if name == "send_message":
            if not self.peer_id:
                return format_content("This session is not registered with the broker yet.", is_error=True)
            to_id = str(arguments["to_id"])
            message = str(arguments["message"])
            result = broker_request(
                "/send-message",
                {"from_id": self.peer_id, "to_id": to_id, "text": message},
            )
            if not result.get("ok"):
                return format_content(f"Failed to send message: {result.get('error')}", is_error=True)
            return format_content(f"Message queued for peer {to_id}.")

        if name == "set_summary":
            if not self.peer_id:
                return format_content("This session is not registered with the broker yet.", is_error=True)
            summary = str(arguments["summary"])
            broker_request("/set-summary", {"id": self.peer_id, "summary": summary})
            return format_content(f'Summary updated to "{summary}".')

        if name == "check_messages":
            if not self.peer_id:
                return format_content("This session is not registered with the broker yet.", is_error=True)
            messages = self.fetch_messages()
            if not messages:
                return format_content("No new messages.", structured={"messages": []})

            rendered = [
                f"From {message['from_id']} ({message['sent_at']}):\n{message['text']}"
                for message in messages
            ]
            return format_content(
                f"{len(messages)} new message(s):\n\n" + "\n\n---\n\n".join(rendered),
                structured={"messages": messages},
            )

        if name == "collaboration_checkpoint":
            if not self.peer_id:
                return format_content("This session is not registered with the broker yet.", is_error=True)

            scope = str(arguments.get("scope", "repo"))
            summary = arguments.get("summary")
            summary_updated = None
            if isinstance(summary, str) and summary.strip():
                summary_updated = summary.strip()
                broker_request("/set-summary", {"id": self.peer_id, "summary": summary_updated})

            messages = self.fetch_messages()
            peers = self.fetch_peers(scope)

            lines = []
            if summary_updated:
                lines.append(f'Summary updated to "{summary_updated}".')
            if messages:
                lines.append(f"{len(messages)} unread peer message(s) found.")
                for message in messages:
                    lines.append(f"From {message['from_id']} ({message['sent_at']}): {message['text']}")
            else:
                lines.append("No unread peer messages.")

            if peers:
                lines.append(f"{len(peers)} peer(s) visible in {scope} scope:")
                for peer in peers:
                    descriptor = f"{peer['id']} - {peer['cwd']}"
                    if peer.get("summary"):
                        descriptor += f" - {peer['summary']}"
                    lines.append(descriptor)
            else:
                lines.append(f"No peers visible in {scope} scope.")

            return format_content(
                "\n".join(lines),
                structured={
                    "summary_updated": summary_updated,
                    "messages": messages,
                    "peers": peers,
                    "scope": scope,
                },
            )

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
        name, _, value = line.decode("utf-8").partition(":")
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
    server = PeerServer()
    server.start()

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
            write_message(success_response(message_id, server.handle_initialize(params)))
            continue

        if method == "tools/list" and message_id is not None:
            write_message(success_response(message_id, server.list_tools()))
            continue

        if method == "tools/call" and message_id is not None:
            try:
                tool_name = str(params["name"])
                tool_args = params.get("arguments") or {}
                result = server.call_tool(tool_name, tool_args)
                write_message(success_response(message_id, result))
            except urllib.error.HTTPError as exc:
                detail = exc.read().decode("utf-8") if exc.fp else str(exc)
                write_message(error_response(message_id, -32603, detail))
            except Exception as exc:  # noqa: BLE001
                write_message(error_response(message_id, -32603, str(exc)))
            continue

        if message_id is not None:
            write_message(error_response(message_id, -32601, f"Method not found: {method}"))


if __name__ == "__main__":
    main()
