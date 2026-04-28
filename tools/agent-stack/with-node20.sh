#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 64
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
ROOT="/home/evo/workspace/tools/agent-stack"
WIN_CODEX_DIR="/mnt/c/Users/Evo/.codex/.sandbox-bin"
LOCAL_SANDBOX_DIR="$ROOT/.sandbox-bin-linux"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "nvm.sh not found at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

# Load nvm explicitly so non-interactive launches see the same Node runtime.
# shellcheck source=/dev/null
. "$NVM_DIR/nvm.sh"

nvm use 20 >/dev/null

# Build a Linux-safe Codex shim so child processes do not execute the Windows
# shim file with CRLF line endings (`#!/usr/bin/env bash\r`).
mkdir -p "$LOCAL_SANDBOX_DIR"
cat >"$LOCAL_SANDBOX_DIR/codex" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

exec /mnt/c/Users/Evo/.codex/.sandbox-bin/codex.exe "$@"
EOF
chmod +x "$LOCAL_SANDBOX_DIR/codex"

# Some child runtimes see a sanitized PATH. Expose git via a local shim so
# plugin sync and any git-aware features can still resolve it.
cat >"$LOCAL_SANDBOX_DIR/git" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

exec /usr/bin/git "$@"
EOF
chmod +x "$LOCAL_SANDBOX_DIR/git"

# Make the sidecar launcher shims available to child processes. Prefer the
# Linux-safe shim ahead of the Windows sandbox-bin directory.
export PATH="$LOCAL_SANDBOX_DIR:$WIN_CODEX_DIR:$ROOT:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"

exec "$@"
