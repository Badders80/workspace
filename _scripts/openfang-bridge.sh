#!/usr/bin/env bash
# OpenClaw → OpenFang Bridge
# Usage: ./openfang-bridge.sh <command> [args...]
# 
# This script bridges OpenClaw (coordinator) with OpenFang (worker).
# OpenClaw can call this via exec tool to delegate tasks to OpenFang agents.

set -e

OPENFANG_URL="${OPENFANG_URL:-http://127.0.0.1:50051}"
OPENFANG_WS="${OPENFANG_WS:-ws://127.0.0.1:50051}"

# ─── Helpers ──────────────────────────────────────────────────
api_get() { curl -s "$OPENFANG_URL/api/$1" 2>/dev/null || echo '{"error":"API unreachable"}'; }
api_post() { curl -s -X POST -H "Content-Type: application/json" -d "$2" "$OPENFANG_URL/api/$1" 2>/dev/null || echo '{"error":"API unreachable"}'; }

# ─── Commands ──────────────────────────────────────────────────
case "$1" in
  status)
    api_get "health"
    ;;
  
  agent-list)
    api_get "agents"
    ;;
  
  agent-info)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: agent-info <agent-id>"}'
      exit 1
    fi
    api_get "agents/$2"
    ;;
  
  agent-spawn)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: agent-spawn <agent-name> [model]"}'
      exit 1
    fi
    NAME="$2"
    MODEL="${3:-kimi-k2.6:cloud}"
    api_post "agents" "{\"name\":\"$NAME\",\"model\":\"$MODEL\",\"provider\":\"ollama\"}"
    ;;
  
  chat)
    if [ -z "$2" ] || [ -z "$3" ]; then
      echo '{"error":"Usage: chat <agent-id> <message>"}'
      exit 1
    fi
    api_post "agents/$2/chat" "{\"message\":\"$3\"}"
    ;;
  
  workflow-list)
    api_get "workflows"
    ;;
  
  workflow-run)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: workflow-run <workflow-id>"}'
      exit 1
    fi
    api_post "workflows/$2/run" "{}"
    ;;
  
  hand-list)
    api_get "hands"
    ;;
  
  hand-activate)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: hand-activate <hand-name>"}'
      exit 1
    fi
    api_post "hands/$2/activate" "{}"
    ;;
  
  skill-list)
    api_get "skills"
    ;;
  
  memory-search)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: memory-search <query>"}'
      exit 1
    fi
    api_get "memory/search?q=$(echo "$2" | jq -sRr @uri)"
    ;;
  
  # Quick delegation patterns (via CLI for reliable routing)
  delegate-coding)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: delegate-coding <prompt>"}'
      exit 1
    fi
    openfang message b5145714-3e8c-4546-a7cd-8ac457321cd4 "$2"
    ;;
  
  delegate-research)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: delegate-research <query>"}'
      exit 1
    fi
    openfang message 52a6d4df-6eb0-5c55-a200-b984514886ab "$2"
    ;;
  
  delegate-analysis)
    if [ -z "$2" ]; then
      echo '{"error":"Usage: delegate-analysis <query>"}'
      exit 1
    fi
    openfang message d8f04c0c-d848-442c-af36-7a13aa47249c "$2"
    ;;
  
  *)
    echo "OpenClaw → OpenFang Bridge v1.0"
    echo ""
    echo "Commands:"
    echo "  status                    - Check OpenFang daemon health"
    echo "  agent-list                - List all agents"
    echo "  agent-info <id>           - Get agent details"
    echo "  agent-spawn <name>       - Spawn new agent"
    echo "  chat <id> <msg>          - Send message to agent"
    echo "  workflow-list             - List workflows"
    echo "  workflow-run <id>         - Run a workflow"
    echo "  hand-list                 - List available hands"
    echo "  hand-activate <name>     - Activate a hand"
    echo "  skill-list                - List loaded skills"
    echo "  memory-search <query>     - Search agent memory"
    echo ""
    echo "Quick Delegation (OpenClaw use):"
    echo "  delegate-coding <prompt>   - Send to coder agent"
    echo "  delegate-research <query> - Send to researcher"
    echo "  delegate-analysis <query> - Send to analyst"
    echo ""
    echo "Environment:"
    echo "  OPENFANG_URL=$OPENFANG_URL"
    echo "  OPENFANG_WS=$OPENFANG_WS"
    exit 1
    ;;
esac
