#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/evo/workspace/tools/agent-stack"
BIN="$ROOT/openfang/bin/openfang"
ENV_FILE="/home/evo/.env"
ROUTES_DIR="$ROOT/openfang/state/routes"
ACTIVE_ROUTE_FILE="$ROOT/openfang/state/active-route"
SECRETS_FILE="$ROOT/openfang/state/secrets.env"
DEFAULT_ROUTE="local"

if [ ! -x "$BIN" ]; then
  echo "OpenFang binary not found at $BIN" >&2
  exit 1
fi

mkdir -p "$ROUTES_DIR"

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE" >/dev/null 2>&1 || true
  set +a
fi

sanitize_remote_keys() {
  unset OPENROUTER_API_KEY
  unset ANTHROPIC_API_KEY
  unset GROQ_API_KEY
  unset OPENAI_API_KEY
  unset GEMINI_API_KEY
  unset GOOGLE_API_KEY
  unset DEEPSEEK_API_KEY
  unset MISTRAL_API_KEY
  unset TOGETHER_API_KEY
  unset FIREWORKS_API_KEY
  unset PERPLEXITY_API_KEY
  unset COHERE_API_KEY
  unset AI21_API_KEY
  unset CEREBRAS_API_KEY
  unset SAMBANOVA_API_KEY
  unset HF_API_KEY
  unset XAI_API_KEY
  unset REPLICATE_API_TOKEN
}

write_secrets_file() {
  : >"$SECRETS_FILE"
  chmod 600 "$SECRETS_FILE"

  if [ -n "${TELEGRAM_BOT_TOKEN:-}" ]; then
    printf 'TELEGRAM_BOT_TOKEN=%q\n' "$TELEGRAM_BOT_TOKEN" >>"$SECRETS_FILE"
  fi
}

selected_route() {
  if [ -f "$ACTIVE_ROUTE_FILE" ]; then
    cat "$ACTIVE_ROUTE_FILE"
  else
    echo "$DEFAULT_ROUTE"
  fi
}

config_for_route() {
  printf '%s/%s.toml\n' "$ROUTES_DIR" "$1"
}

apply_route_env() {
  local route="$1"

  case "$route" in
    conductor|reasoning|primary|visual|creative|audit|focused|heavy|research|utility)
      sanitize_remote_keys
      write_secrets_file
      ;;
    *)
      echo "Unknown OpenFang route: $route" >&2
      exit 1
      ;;
  esac
}

case "${1:-}" in
  route)
    case "${2:-show}" in
      conductor|reasoning|primary|visual|creative|audit|focused|heavy|research|utility|local|local-debug|local-audit)
        printf '%s\n' "$2" >"$ACTIVE_ROUTE_FILE"
        echo "OpenFang route set to $2"
        echo "Config: $(config_for_route "$2")"
        apply_route_env "$2"
        echo "Secrets: $SECRETS_FILE"
        exit 0
        ;;
      show|current)
        route="$(selected_route)"
        echo "OpenFang route: $route"
        echo "Config: $(config_for_route "$route")"
        echo "Secrets: $SECRETS_FILE"
        exit 0
        ;;
      *)
        echo "Usage: openfang-trial.sh route [conductor|reasoning|primary|visual|creative|audit|focused|heavy|research|utility|show]" >&2
        exit 1
        ;;
    esac
    ;;
esac

route="$(selected_route)"
config_path="$(config_for_route "$route")"

if [ ! -f "$config_path" ]; then
  echo "OpenFang config not found for route '$route' at $config_path" >&2
  exit 1
fi

apply_route_env "$route"

if [ "${1:-}" = "status" ]; then
  echo "OpenFang route: $route"
  echo "Config: $config_path"
  echo "Secrets: $SECRETS_FILE"
fi

exec "$BIN" --config "$config_path" "$@"
