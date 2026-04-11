#!/bin/bash
set -euo pipefail

DEFAULT_MODEL="${CLAUDE_LOCAL_MODEL:-qwen3.5:latest}"
BASE_URL="${CLAUDE_LOCAL_BASE_URL:-http://localhost:11434}"
AUTH_TOKEN="${CLAUDE_LOCAL_AUTH_TOKEN:-ollama}"
CLAUDE_BIN="/home/evo/.local/bin/claude"
OLLAMA_BIN="${OLLAMA_BIN:-$(command -v ollama)}"
TOOLS_MODE="${CLAUDE_LOCAL_TOOLS_MODE:-auto}"
ADD_DIR="${CLAUDE_LOCAL_ADD_DIR:-}"
PERMISSION_MODE="${CLAUDE_LOCAL_PERMISSION_MODE:-}"
WORKSPACE_ROOT="/home/evo/workspace"
CONTROL_PLANE_HOME="/home/evo"

has_model_arg() {
  local arg
  for arg in "$@"; do
    case "$arg" in
      --model|--model=*)
        return 0
        ;;
    esac
  done
  return 1
}

extract_model_arg() {
  local model="$1"
  shift
  local expect_value=0
  local arg

  for arg in "$@"; do
    if [ "$expect_value" -eq 1 ]; then
      model="$arg"
      expect_value=0
      continue
    fi

    case "$arg" in
      --model)
        expect_value=1
        ;;
      --model=*)
        model="${arg#--model=}"
        ;;
    esac
  done

  printf '%s\n' "$model"
}

list_local_models() {
  if [ -z "$OLLAMA_BIN" ]; then
    echo "Error: ollama command not found on PATH" >&2
    return 1
  fi

  "$OLLAMA_BIN" list | awk 'NR > 1 && NF { print $1 }'
}

model_picker_notes() {
  local model="$1"

  case "$model" in
    claude-yolo:latest)
      printf 'yolo, draft'
      ;;
    gemma4:e4b)
      printf 'balanced, general'
      ;;
    granite4:7b-a1b-h)
      printf 'review, experimental'
      ;;
    deepseek-coder-v2:16b)
      printf 'debug, chat-only'
      ;;
    qwen3.5:latest)
      printf 'audit, fast'
      ;;
    *)
      printf ''
      ;;
  esac
}

print_model_picker_line() {
  local index="$1"
  local model="$2"
  local current_default="$3"
  local notes=""

  notes="$(model_picker_notes "$model")"

  printf '  %d. %s' "$index" "$model" >&2
  if [ -n "$notes" ]; then
    printf ' [%s]' "$notes" >&2
  fi
  if [ "$model" = "$current_default" ]; then
    printf ' (default)' >&2
  fi
  printf '\n' >&2
}

pick_local_model() {
  local current_default="$1"
  local selected=""
  local choice=""
  local index=1
  local model
  local -a models=()

  mapfile -t models < <(list_local_models)
  if [ "${#models[@]}" -eq 0 ]; then
    echo "Error: no local Ollama models found." >&2
    return 1
  fi

  printf 'Local Ollama models:\n' >&2
  for model in "${models[@]}"; do
    print_model_picker_line "$index" "$model" "$current_default"
    index=$((index + 1))
  done

  while :; do
    printf 'Pick a model [1-%d] or press Enter for %s: ' "${#models[@]}" "$current_default" >&2
    read -r choice

    if [ -z "$choice" ]; then
      selected="$current_default"
      break
    fi

    if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le "${#models[@]}" ]; then
      selected="${models[$((choice - 1))]}"
      break
    fi

    printf 'Invalid selection.\n' >&2
  done

  printf '%s\n' "$selected"
}

has_print_arg() {
  local arg
  for arg in "$@"; do
    case "$arg" in
      -p|--print)
        return 0
        ;;
    esac
  done
  return 1
}

has_tools_arg() {
  local arg
  local expect_value=0
  for arg in "$@"; do
    if [ "$expect_value" -eq 1 ]; then
      return 0
    fi

    case "$arg" in
      --tools|--allowedTools|--allowed-tools|--disallowedTools|--disallowed-tools)
        expect_value=1
        ;;
      --tools=*|--allowedTools=*|--allowed-tools=*|--disallowedTools=*|--disallowed-tools=*)
        return 0
        ;;
    esac
  done
  return 1
}

has_bare_arg() {
  local arg
  for arg in "$@"; do
    case "$arg" in
      --bare)
        return 0
        ;;
    esac
  done
  return 1
}

has_add_dir_arg() {
  local arg
  local expect_value=0
  for arg in "$@"; do
    if [ "$expect_value" -eq 1 ]; then
      return 0
    fi

    case "$arg" in
      --add-dir)
        expect_value=1
        ;;
      --add-dir=*)
        return 0
        ;;
    esac
  done
  return 1
}

has_permission_mode_arg() {
  local arg
  local expect_value=0
  for arg in "$@"; do
    if [ "$expect_value" -eq 1 ]; then
      return 0
    fi

    case "$arg" in
      --permission-mode)
        expect_value=1
        ;;
      --permission-mode=*)
        return 0
        ;;
    esac
  done
  return 1
}

model_supports_tools() {
  local model="$1"
  local capabilities

  if [ -z "$OLLAMA_BIN" ]; then
    return 2
  fi

  capabilities="$("$OLLAMA_BIN" show "$model" 2>/dev/null | sed -n '/^  Capabilities$/,/^$/p' | awk 'NR > 1 && NF { print $1 }')"
  if [ -z "$capabilities" ]; then
    return 2
  fi

  printf '%s\n' "$capabilities" | grep -qx 'tools'
}

main() {
  local -a model_args=()
  local -a auto_args=()
  local -a tool_args=()
  local -a user_args=()
  local selected_model
  local effective_default="$DEFAULT_MODEL"
  local effective_add_dir="$ADD_DIR"
  local tools_enabled=1
  local tool_probe_status=0
  local pick_model="${CLAUDE_LOCAL_PICK_MODEL:-0}"
  local list_models=0
  local arg

  if [ ! -x "$CLAUDE_BIN" ]; then
    echo "Error: Claude Code binary not found at $CLAUDE_BIN"
    exit 1
  fi

  for arg in "$@"; do
    case "$arg" in
      --pick-model)
        pick_model=1
        ;;
      --list-local-models)
        list_models=1
        ;;
      *)
        user_args+=("$arg")
        ;;
    esac
  done

  if [ "$list_models" -eq 1 ]; then
    list_local_models
    exit 0
  fi

  if [ "$PWD" = "$CONTROL_PLANE_HOME" ]; then
    echo "Info: launching Claude from $WORKSPACE_ROOT because /home/evo is control plane only." >&2
    echo "Info: prefer Linux paths like /home/evo/workspace/... over \\\\wsl.localhost\\Ubuntu\\... prompts." >&2
    cd "$WORKSPACE_ROOT"
    if [ -z "$effective_add_dir" ]; then
      effective_add_dir="$WORKSPACE_ROOT"
    fi
  fi

  if [ "$pick_model" -eq 1 ] && ! has_model_arg "${user_args[@]}"; then
    effective_default="$(pick_local_model "$effective_default")"
  fi

  selected_model="$(extract_model_arg "$effective_default" "${user_args[@]}")"

  if ! has_model_arg "${user_args[@]}"; then
    model_args=(--model "$effective_default")
  fi

  if ! has_tools_arg "${user_args[@]}"; then
    case "$TOOLS_MODE" in
      off)
        tools_enabled=0
        ;;
      on)
        tools_enabled=1
        ;;
      auto)
        if model_supports_tools "$selected_model"; then
          tools_enabled=1
        else
          tool_probe_status=$?
          if [ "$tool_probe_status" -eq 1 ]; then
            tools_enabled=0
            echo "Info: $selected_model does not advertise tool support in Ollama. Launching Claude Code in chat-only mode." >&2
          else
            echo "Info: Could not confirm tool support for $selected_model. Leaving Claude Code tools enabled." >&2
          fi
        fi
        ;;
      *)
        echo "Error: unsupported CLAUDE_LOCAL_TOOLS_MODE value: $TOOLS_MODE" >&2
        exit 1
        ;;
    esac

    if [ "$tools_enabled" -eq 0 ]; then
      tool_args=(--tools "")
    fi
  fi

  export ANTHROPIC_BASE_URL="$BASE_URL"
  export ANTHROPIC_AUTH_TOKEN="$AUTH_TOKEN"
  export ANTHROPIC_API_KEY="${CLAUDE_LOCAL_API_KEY:-}"
  export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="${CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:-1}"

  if [ -n "$effective_add_dir" ] && ! has_add_dir_arg "${user_args[@]}"; then
    auto_args+=(--add-dir "$effective_add_dir")
  fi

  if [ -n "$PERMISSION_MODE" ] && ! has_permission_mode_arg "${user_args[@]}"; then
    auto_args+=(--permission-mode "$PERMISSION_MODE")
  fi

  if [ "${CLAUDE_LOCAL_FORCE_BARE:-0}" = "1" ] && ! has_bare_arg "${user_args[@]}"; then
    auto_args+=(--bare)
  elif [ "$tools_enabled" -eq 0 ] && ! has_bare_arg "${user_args[@]}" && { has_print_arg "${user_args[@]}" || [ ! -t 0 ] || [ ! -t 1 ]; }; then
    # Chat-only local models are most stable in bare mode for print and piped use.
    auto_args+=(--bare)
  fi

  exec "$CLAUDE_BIN" "${model_args[@]}" "${tool_args[@]}" "${auto_args[@]}" "${user_args[@]}"
}

main "$@"
