#!/usr/bin/env python3
"""Enhanced Vision MCP Server — VRAM-optimized 'Eyes' with Auto-Detection

Smart vision MCP that:
1. Uses GLM-OCR (2.2GB) instead of Gemma4 (16.8GB) for VRAM efficiency
2. Auto-detects vision-capable models and provides guidance
3. Maintains fallback OCR for text-only models
4. Optimized for RTX 3060 with cloud LLM usage

Usage:
    python server.py

MCP client config (.vscode/mcp.json):
    {
        "mcpServers": {
            "vision": {
                "command": "python3",
                "args": ["/home/evo/workspace/tools/vision-mcp/server.py"],
                "env": {
                    "VISION_MODEL": "glm-ocr:latest",
                    "VISION_QUICK_MODEL": "glm-ocr:latest", 
                    "OLLAMA_URL": "http://localhost:11434",
                    "VISION_TIMEOUT": "300",
                    "VISION_KEEP_ALIVE": "3600"
                }
            }
        }
    }

Env vars:
    VISION_MODEL       — Ollama vision model (default: glm-ocr:latest)
    OLLAMA_URL         — Ollama API base URL (default: http://localhost:11434)
    VISION_TIMEOUT     — API call timeout in seconds (default: 300)
    VISION_KEEP_ALIVE  — Model keep-alive in seconds (default: 3600)
"""

from __future__ import annotations

import base64
import json
import os
import sys
import subprocess
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

SERVER_NAME = "vision"
SERVER_VERSION = "0.2.0"  # Enhanced version
PROTOCOL_VERSION = "2025-03-26"

# VRAM-optimized configuration
DEFAULT_MODEL = os.environ.get("VISION_MODEL", "glm-ocr:latest")  # 2.2GB instead of 9.6GB
QUICK_MODEL = os.environ.get("VISION_QUICK_MODEL", "glm-ocr:latest")  # Same for consistency
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
VISION_TIMEOUT = int(os.environ.get("VISION_TIMEOUT", "300"))
KEEP_ALIVE = os.environ.get("VISION_KEEP_ALIVE", "3600")  # 1 hour instead of permanent

# Vision-capable models (from user's list)
VISION_CAPABLE_MODELS = {
    "claude-yolo:latest", "gemma-sniper:latest", "gemma4:31b-cloud",
    "gemma4:e2b", "gemma4:e4b", "gemma4:latest", "glm-ocr:latest",
    "kimi-k2.6:cloud", "qwen-tight:latest", "qwen3.5:latest"
}

# Text-only models (for fallback usage)
TEXT_ONLY_MODELS = {
    "deepseek-coder-v2:16b", "glm-5.1:cloud",
    "granite4:7b-a1b-h", "llama3.2:latest",
    "minimax-m2.7:cloud", "opencode:latest",
    "qwen2.5-coder:14b", "qwen2.5-coder:7b"
}

VISION_GUIDANCE = (
    "This model has native vision capability. "
    "For better performance and accuracy, use the model's built-in vision features instead of MCP OCR. "
    "MCP OCR (GLM-OCR) is available as fallback if needed. "
    "Add prompt='force' to bypass this detection."
)

DEFAULT_PROMPT = (
    "Describe this image in detail. Include: "
    "1) All visible text (OCR — transcribe exactly), "
    "2) Layout and UI elements, "
    "3) Colors and spacing, "
    "4) Any notable design patterns."
)

QUICK_PROMPT = (
    "List all visible text in this image. Be brief and direct."
)

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".svg"}


def log(message: str) -> None:
    print(f"[{SERVER_NAME}] {message}", file=sys.stderr, flush=True)


def is_vision_capable_model(model_hint: str = "") -> bool:
    """Check if the current context suggests a vision-capable model."""
    # This is a heuristic approach since MCP doesn't expose calling model
    # In practice, you'd detect this from MCP client information
    
    # For now, we'll assume most calls come from text-only models
    # and provide guidance when we suspect vision capability
    
    # Check environment variables or other indicators
    current_model = os.environ.get("CURRENT_MODEL", "")
    if current_model and current_model in VISION_CAPABLE_MODELS:
        return True
    
    # Check model hint from prompt or other sources
    if model_hint and any(vision_model in model_hint for vision_model in VISION_CAPABLE_MODELS):
        return True
        
    return False


def detect_mime_type(path: Path) -> str:
    """Detect image MIME type from file header bytes."""
    try:
        with path.open("rb") as f:
            header = f.read(64)
    except OSError:
        pass
    else:
        if header.startswith(b"\x89PNG\r\n\x1a\n"):
            return "image/png"
        if header.startswith(b"\xff\xd8\xff"):
            return "image/jpeg"
        if header.startswith((b"GIF87a", b"GIF89a")):
            return "image/gif"
        if header.startswith(b"BM"):
            return "image/bmp"
        if len(header) >= 12 and header[:4] == b"RIFF" and header[8:12] == b"WEBP":
            return "image/webp"

    # Fallback to extension
    ext = path.suffix.lower()
    mime_map = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".bmp": "image/bmp",
        ".svg": "image/svg+xml",
    }
    return mime_map.get(ext, "application/octet-stream")


def call_ollama_vision(
    image_path: str,
    prompt: str,
    model: str,
) -> str:
    """Send an image to Ollama for vision analysis using direct command. Returns the text description."""
    path = Path(image_path).expanduser().resolve()

    if not path.exists():
        raise FileNotFoundError(f"Image not found: {path}")
    if not path.is_file():
        raise ValueError(f"Not a file: {path}")

    # Validate extension
    if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        raise ValueError(
            f"Unsupported image format: {path.suffix}. "
            f"Supported: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
        )

    log(f"Analyzing {path.name} with {model}...")
    
    # Use direct ollama run command instead of HTTP API
    try:
        result = subprocess.run([
            "ollama", "run", model,
            f"{prompt} - Image: {path.name}"
        ], 
        capture_output=True, 
        text=True, 
        timeout=VISION_TIMEOUT,
        cwd=path.parent
        )
        
        if result.returncode != 0:
            raise ValueError(f"Ollama command failed: {result.stderr}")
            
        response = result.stdout.strip()
        if not response:
            raise ValueError(f"Empty response from {model}")

        log(f"Done ({len(response)} chars)")
        return response
        
    except subprocess.TimeoutExpired:
        raise ValueError(f"Analysis timed out after {VISION_TIMEOUT} seconds")
    except subprocess.CalledProcessError as e:
        raise ValueError(f"Ollama execution error: {e.stderr}")


# ---------------------------------------------------------------------------
# MCP JSON-RPC protocol (stdio transport)
# ---------------------------------------------------------------------------

def format_content(text: str, *, is_error: bool = False) -> dict[str, Any]:
    result: dict[str, Any] = {
        "content": [{"type": "text", "text": text}],
    }
    if is_error:
        result["isError"] = True
    return result


def list_tools() -> dict[str, Any]:
    return {
        "tools": [
            {
                "name": "analyze_image",
                "title": "Analyze Image",
                "description": (
                    "Analyze an image file using local vision models. "
                    "Uses GLM-OCR (2.2GB) for VRAM efficiency. "
                    "Auto-detects vision-capable models and provides guidance. "
                    "For text-only models: provides OCR fallback. "
                    "For vision models: recommends native vision features. "
                    "Supports PNG, JPG, JPEG, GIF, WebP, BMP, SVG."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "image_path": {
                            "type": "string",
                            "description": (
                                "Absolute path to the image file to analyze. "
                                "Supports ~ expansion for home directory."
                            ),
                        },
                        "prompt": {
                            "type": "string",
                            "description": (
                                "Custom analysis prompt. Defaults to detailed description with OCR, "
                                "layout, colors, and design patterns. Use 'quick' for fast OCR-only mode. "
                                "Use 'force' to bypass vision capability detection."
                            ),
                        },
                        "model": {
                            "type": "string",
                            "description": (
                                "Vision model to use. Default: glm-ocr:latest (2.2GB VRAM). "
                                "Options: glm-ocr:latest (fast OCR), gemma4:e2b (7.2GB), gemma4:e4b (9.6GB). "
                                "Auto-selected based on VRAM optimization."
                            ),
                        },
                    },
                    "required": ["image_path"],
                    "additionalProperties": False,
                },
            },
        ],
    }


def call_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    if name != "analyze_image":
        raise ValueError(f"Unknown tool: {name}")

    image_path = str(arguments["image_path"])
    raw_prompt = arguments.get("prompt", "")
    model = str(arguments.get("model", DEFAULT_MODEL))

    # Check for vision capability guidance (unless force is specified)
    if raw_prompt != "force" and is_vision_capable_model():
        return format_content(VISION_GUIDANCE)

    # 'quick' shortcut: use optimized prompt
    if raw_prompt == "quick":
        prompt = QUICK_PROMPT
        model = QUICK_MODEL
    elif raw_prompt:
        prompt = str(raw_prompt)
    else:
        prompt = DEFAULT_PROMPT

    try:
        description = call_ollama_vision(image_path, prompt, model)
        return format_content(description)
    except FileNotFoundError as e:
        return format_content(str(e), is_error=True)
    except ValueError as e:
        return format_content(str(e), is_error=True)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace") if e.fp else str(e)
        return format_content(
            f"Ollama API error ({e.code}): {detail}. "
            f"Ensure Ollama is running and model '{model}' is pulled: ollama pull {model}",
            is_error=True,
        )
    except urllib.error.URLError as e:
        return format_content(
            f"Cannot reach Ollama at {OLLAMA_URL}: {e.reason}. "
            "Ensure Ollama is running: ollama serve",
            is_error=True,
        )
    except Exception as e:
        return format_content(f"Vision analysis failed: {e}", is_error=True)


# ---------------------------------------------------------------------------
# Stdio JSON-RPC transport
# ---------------------------------------------------------------------------

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
    log(f"Enhanced Vision MCP Server v{SERVER_VERSION}")
    log(f"VRAM-optimized: {DEFAULT_MODEL} (2.2GB) | Keep-alive: {KEEP_ALIVE}s")
    log(f"Vision-capable models: {len(VISION_CAPABLE_MODELS)} detected")
    log(f"Text-only models: {len(TEXT_ONLY_MODELS)} supported")
    log(f"Ollama: {OLLAMA_URL}, timeout: {VISION_TIMEOUT}s")

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
                    "Enhanced vision server with auto-detection. "
                    "Uses GLM-OCR (2.2GB VRAM) for efficiency. "极速版
                    "Auto-detects vision-capable models and provides guidance. "
                    "For text-only models: provides OCR fallback. "
                    "For vision models: recommends native vision features. "
                    "Pass prompt='force' to bypass detection. "
                    f"Default: {DEFAULT_MODEL}. Supports PNG, JPG, JPEG, GIF, WebP, BMP, SVG."
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

        if message_id is not None:
            write_message(error_response(message_id, -32601, f"Method not found: {method}"))


if __name__ == "__main__":
    main()