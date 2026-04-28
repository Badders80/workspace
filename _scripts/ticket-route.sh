#!/usr/bin/env bash
# ticket-route.sh — Read a ticket and route to the correct OpenFang hand
# Usage: ticket-route.sh <ticket-file>

set -euo pipefail

TICKET_FILE="${1:?Usage: ticket-route.sh <ticket-file>}"

if [[ ! -f "$TICKET_FILE" ]]; then
  echo "ERROR: Ticket file not found: $TICKET_FILE"
  exit 1
fi

# Extract assigned worker model from ticket
WORKER_MODEL=$(grep -i "assigned worker model\|Delegated To:" "$TICKET_FILE" | head -1 | sed 's/.*: *//' | tr '[:upper:]' '[:lower:]')

# Map model to OpenFang hand
case "$WORKER_MODEL" in
  deepseek*|heavy*)      HAND="heavy-worker" ;;
  qwen3-coder*|focused*) HAND="focused-worker" ;;
  qwen3.5*|utility*)     HAND="utility-worker" ;;
  nemotron*|reasoning*)  HAND="reasoning-partner" ;;
  glm*|conductor*)       HAND="conductor" ;;
  *)                     echo "ERROR: Unknown worker model: $WORKER_MODEL"; exit 1 ;;
esac

echo "Ticket: $TICKET_FILE"
echo "Worker model: $WORKER_MODEL"
echo "Routing to hand: $HAND"
echo "Command: openfang hand run $HAND --ticket $TICKET_FILE"

# Log execution start
mkdir -p /home/evo/workspace/_logs
echo "[ticket-route] $(date -u +%Y-%m-%dT%H:%M:%SZ) routed $TICKET_FILE to $HAND" >> /home/evo/workspace/_logs/ticket-routes.log

# Execute the hand via OpenFang
exec openfang hand run "$HAND" --ticket "$TICKET_FILE"