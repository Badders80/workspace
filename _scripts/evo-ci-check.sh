#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Running CI health check..."

required_files=(
  "AGENTS.md"
  "AI_SESSION_BOOTSTRAP.md"
  "DNA/AGENTS.md"
  "DNA/ops/CONVENTIONS.md"
  "DNA/ops/STACK.md"
  "DNA/ops/TRANSITION.md"
  "DNA/INBOX.md"
  "DNA/ops/DECISION_LOG.md"
  "Justfile"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "FAIL  missing file: $file" >&2
    exit 1
  fi
  echo "PASS  $file"
done

echo ""
echo "Checking shell script syntax..."

mapfile -t shell_files < <(git ls-files '*.sh' 2>/dev/null || find . -name '*.sh' -not -path './.git/*')

if [[ "${#shell_files[@]}" -eq 0 ]]; then
  echo "No shell scripts found."
else
  for sf in "${shell_files[@]}"; do
    echo "  $sf"
    bash -n "$sf"
  done
fi

echo ""
echo "GREEN"
