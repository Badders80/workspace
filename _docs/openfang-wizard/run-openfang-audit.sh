#!/usr/bin/env bash
set -euo pipefail

cd /home/evo/workspace

echo "=== OpenFang audit wrapper ==="

echo "1) Tracked wizard files under _docs/openfang-wizard:"
git ls-files _docs/openfang-wizard | sed 's/^/  /' || true

echo

echo "2) Git status for wizard files:"
git status --short _docs/openfang-wizard || true

echo

echo "3) Git ignore check for wizard path:"
git check-ignore -v _docs/openfang-wizard || true

echo

echo "4) OpenFang daemon status:"
openfang status || true

echo

echo "5) OpenFang hand status:"
openfang hand active || true

echo

echo "6) OpenFang audit-workspace hand info:"
openfang hand info audit-workspace || true

echo

echo "7) OpenFang agent list:"
openfang agent list || true


echo

echo "7) Runtime presence check:"
for p in ~/.openfang ~/.openfang/data ~/.openfang/hands ~/.openfang/logs; do
  printf "  %s: " "$p"
  if [ -e "$p" ]; then ls -ld "$p"; else echo "missing"; fi
done

echo

echo "=== End audit wrapper ==="