# Vision MCP Server

"Eyes for any model" — MCP server that lets any text-only model see images via local Ollama vision models.

## Two-Tier Architecture

```
Quick eyes (gemma4:e2b, ~14s)  → fast OCR, text extraction, basic description
Deep eyes (gemma4:e4b, ~30s)  → full detail: OCR, layout, colors, design patterns
```

Both models stay loaded in VRAM permanently (keep_alive=-1) for zero cold-start.

## Setup

1. Ensure Ollama is running with both models pulled:
   ```bash
   ollama pull gemma4:e4b   # deep eyes
   ollama pull gemma4:e2b   # quick eyes
   ```
2. Server is registered in `.vscode/mcp.json` — VS Code Copilot can call it automatically
3. Any MCP client can use it

## Tools

### `analyze_image`

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `image_path` | Yes | — | Absolute path to image file |
| `prompt` | No | Detailed description | Custom analysis prompt. Pass `"quick"` for fast OCR-only mode |
| `model` | No | `gemma4:e4b` | `gemma4:e4b` (deep) or `gemma4:e2b` (quick) |

### Quick Mode

Pass `prompt: "quick"` to automatically use e2b with a brief OCR prompt:
```
analyze_image(image_path="/path/to/img.png", prompt="quick")
```

## Env Vars

| Var | Default | Description |
|-----|---------|-------------|
| `VISION_MODEL` | `gemma4:e4b` | Deep eyes model |
| `VISION_QUICK_MODEL` | `gemma4:e2b` | Quick eyes model |
| `OLLAMA_URL` | `http://localhost:11434` | Ollama API URL |
| `VISION_TIMEOUT` | `300` | API timeout in seconds |
| `VISION_KEEP_ALIVE` | `-1` | Keep models loaded permanently |

## Supported Formats

PNG, JPG, JPEG, GIF, WebP, BMP, SVG

## Models with Eyes

All text-only Ollama models gain vision through this server:

- kimi-k2.6:cloud
- glm-5.1:cloud
- gemma4:31b-cloud
- minimax-m2.7:cloud

## Performance (RTX 3060, models pre-loaded)

| Tier | Model | Brief prompt | Full detail |
|------|-------|-------------|-------------|
| Quick | gemma4:e2b | ~14s | ~21s |
| Deep | gemma4:e4b | ~25s | ~42s |