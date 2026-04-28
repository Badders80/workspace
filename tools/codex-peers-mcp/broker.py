#!/usr/bin/env python3
"""Local broker for Codex peer discovery and messaging."""

from __future__ import annotations

import json
import os
import secrets
import signal
import sqlite3
import sys
import threading
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "127.0.0.1"
PORT = int(os.environ.get("CODEX_PEERS_PORT", "7901"))
DB_PATH = Path(os.environ.get("CODEX_PEERS_DB", "~/.codex-peers.db")).expanduser()
CLEANUP_INTERVAL_SECONDS = 30


def connect_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=3.0, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA busy_timeout = 3000")
    return conn


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect_db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS peers (
              id TEXT PRIMARY KEY,
              pid INTEGER NOT NULL,
              cwd TEXT NOT NULL,
              git_root TEXT,
              summary TEXT NOT NULL DEFAULT '',
              registered_at TEXT NOT NULL,
              last_seen TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS messages (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              from_id TEXT NOT NULL,
              to_id TEXT NOT NULL,
              text TEXT NOT NULL,
              sent_at TEXT NOT NULL,
              delivered INTEGER NOT NULL DEFAULT 0
            );
            """
        )


def utc_now() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def peer_is_alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


def clean_stale_peers() -> None:
    with connect_db() as conn:
        peers = conn.execute("SELECT id, pid FROM peers").fetchall()
        stale_ids = [row["id"] for row in peers if not peer_is_alive(int(row["pid"]))]
        for peer_id in stale_ids:
            conn.execute("DELETE FROM peers WHERE id = ?", (peer_id,))
            conn.execute("DELETE FROM messages WHERE to_id = ? AND delivered = 0", (peer_id,))
        conn.commit()


def cleanup_loop(stop_event: threading.Event) -> None:
    while not stop_event.wait(CLEANUP_INTERVAL_SECONDS):
        clean_stale_peers()


def generate_peer_id(conn: sqlite3.Connection) -> str:
    while True:
        peer_id = secrets.token_hex(4)
        existing = conn.execute("SELECT 1 FROM peers WHERE id = ?", (peer_id,)).fetchone()
        if not existing:
            return peer_id


def list_peers(payload: dict[str, object]) -> list[dict[str, object]]:
    scope = str(payload.get("scope", "machine"))
    cwd = payload.get("cwd")
    git_root = payload.get("git_root")
    exclude_id = payload.get("exclude_id")

    with connect_db() as conn:
        if scope == "directory" and cwd:
            rows = conn.execute("SELECT * FROM peers WHERE cwd = ?", (cwd,)).fetchall()
        elif scope == "repo" and git_root:
            rows = conn.execute("SELECT * FROM peers WHERE git_root = ?", (git_root,)).fetchall()
        elif scope == "repo" and cwd:
            rows = conn.execute("SELECT * FROM peers WHERE cwd = ?", (cwd,)).fetchall()
        else:
            rows = conn.execute("SELECT * FROM peers").fetchall()

        results: list[dict[str, object]] = []
        for row in rows:
            if exclude_id and row["id"] == exclude_id:
                continue
            pid = int(row["pid"])
            if not peer_is_alive(pid):
                conn.execute("DELETE FROM peers WHERE id = ?", (row["id"],))
                conn.execute("DELETE FROM messages WHERE to_id = ? AND delivered = 0", (row["id"],))
                continue
            results.append(dict(row))
        conn.commit()
        return results


class BrokerHandler(BaseHTTPRequestHandler):
    server_version = "codex-peers-broker/0.1.0"

    def log_message(self, format: str, *args: object) -> None:
        return

    def _json_response(self, payload: object, status: int = HTTPStatus.OK) -> None:
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _read_json_body(self) -> dict[str, object]:
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length else b"{}"
        return json.loads(raw.decode("utf-8"))

    def do_GET(self) -> None:
        if self.path == "/health":
            with connect_db() as conn:
                peer_count = conn.execute("SELECT COUNT(*) FROM peers").fetchone()[0]
            self._json_response({"status": "ok", "peers": peer_count})
            return
        self._json_response({"name": "codex-peers-broker"})

    def do_POST(self) -> None:
        try:
            payload = self._read_json_body()
            if self.path == "/register":
                self._json_response(self.handle_register(payload))
                return
            if self.path == "/heartbeat":
                self.handle_heartbeat(payload)
                self._json_response({"ok": True})
                return
            if self.path == "/set-summary":
                self.handle_set_summary(payload)
                self._json_response({"ok": True})
                return
            if self.path == "/list-peers":
                self._json_response(list_peers(payload))
                return
            if self.path == "/send-message":
                self._json_response(self.handle_send_message(payload))
                return
            if self.path == "/poll-messages":
                self._json_response(self.handle_poll_messages(payload))
                return
            if self.path == "/unregister":
                self.handle_unregister(payload)
                self._json_response({"ok": True})
                return
            self._json_response({"error": "not found"}, status=HTTPStatus.NOT_FOUND)
        except Exception as exc:  # noqa: BLE001
            self._json_response({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)

    def handle_register(self, payload: dict[str, object]) -> dict[str, str]:
        pid = int(payload["pid"])
        cwd = str(payload["cwd"])
        git_root = payload.get("git_root")
        summary = str(payload.get("summary") or "")
        now = utc_now()

        with connect_db() as conn:
            conn.execute("DELETE FROM peers WHERE pid = ?", (pid,))
            peer_id = generate_peer_id(conn)
            conn.execute(
                """
                INSERT INTO peers (id, pid, cwd, git_root, summary, registered_at, last_seen)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (peer_id, pid, cwd, git_root, summary, now, now),
            )
            conn.commit()
        return {"id": peer_id}

    def handle_heartbeat(self, payload: dict[str, object]) -> None:
        with connect_db() as conn:
            conn.execute(
                "UPDATE peers SET last_seen = ? WHERE id = ?",
                (utc_now(), str(payload["id"])),
            )
            conn.commit()

    def handle_set_summary(self, payload: dict[str, object]) -> None:
        with connect_db() as conn:
            conn.execute(
                "UPDATE peers SET summary = ? WHERE id = ?",
                (str(payload.get("summary") or ""), str(payload["id"])),
            )
            conn.commit()

    def handle_send_message(self, payload: dict[str, object]) -> dict[str, object]:
        to_id = str(payload["to_id"])
        with connect_db() as conn:
            target = conn.execute("SELECT 1 FROM peers WHERE id = ?", (to_id,)).fetchone()
            if not target:
                return {"ok": False, "error": f"Peer {to_id} not found"}
            conn.execute(
                """
                INSERT INTO messages (from_id, to_id, text, sent_at, delivered)
                VALUES (?, ?, ?, ?, 0)
                """,
                (
                    str(payload["from_id"]),
                    to_id,
                    str(payload["text"]),
                    utc_now(),
                ),
            )
            conn.commit()
        return {"ok": True}

    def handle_poll_messages(self, payload: dict[str, object]) -> dict[str, object]:
        peer_id = str(payload["id"])
        with connect_db() as conn:
            rows = conn.execute(
                "SELECT * FROM messages WHERE to_id = ? AND delivered = 0 ORDER BY sent_at ASC",
                (peer_id,),
            ).fetchall()
            messages = [dict(row) for row in rows]
            if messages:
                conn.executemany(
                    "UPDATE messages SET delivered = 1 WHERE id = ?",
                    [(message["id"],) for message in messages],
                )
            conn.commit()
        return {"messages": messages}

    def handle_unregister(self, payload: dict[str, object]) -> None:
        with connect_db() as conn:
            conn.execute("DELETE FROM peers WHERE id = ?", (str(payload["id"]),))
            conn.commit()


def main() -> None:
    init_db()
    clean_stale_peers()

    stop_event = threading.Event()
    cleanup_thread = threading.Thread(
        target=cleanup_loop,
        args=(stop_event,),
        daemon=True,
        name="codex-peers-cleanup",
    )
    cleanup_thread.start()

    httpd = ThreadingHTTPServer((HOST, PORT), BrokerHandler)

    def shutdown_handler(signum: int, _frame: object) -> None:
        del signum
        stop_event.set()
        httpd.shutdown()

    signal.signal(signal.SIGTERM, shutdown_handler)
    signal.signal(signal.SIGINT, shutdown_handler)

    print(
        f"[codex-peers broker] listening on http://{HOST}:{PORT} (db: {DB_PATH})",
        file=sys.stderr,
        flush=True,
    )
    httpd.serve_forever()


if __name__ == "__main__":
    main()
