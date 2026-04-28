#!/usr/bin/env bash
set -euo pipefail

# new-project.sh — Scaffold a new project in the Evolution workspace
# Usage: bash _scripts/new-project.sh <ProjectName> <domain> <description>
# Example: bash _scripts/new-project.sh Evolution_API api "Internal API gateway"

WORKSPACE_ROOT="/home/evo/workspace"
PROJECTS_DIR="$WORKSPACE_ROOT/projects"
CONVENTIONS="$WORKSPACE_ROOT/DNA/ops/CONVENTIONS.md"
MANIFEST="$WORKSPACE_ROOT/MANIFEST.md"

# ─── Validate args ───────────────────────────────────────────────────────────
if [ $# -lt 3 ]; then
    echo "Usage: bash _scripts/new-project.sh <ProjectName> <domain> <description>"
    echo "Example: bash _scripts/new-project.sh Evolution_API api 'Internal API gateway'"
    exit 1
fi

PROJECT_NAME="$1"
DOMAIN="$2"
DESCRIPTION="$3"
DOMAIN_UPPER=$(echo "$DOMAIN" | tr '[:lower:]' '[:upper:]')
DATE=$(date +%Y-%m-%d)

PROJECT_DIR="$PROJECTS_DIR/$PROJECT_NAME"

# ─── Safety checks ───────────────────────────────────────────────────────────
if [ -d "$PROJECT_DIR" ]; then
    echo "❌ Project already exists: $PROJECT_DIR"
    exit 1
fi

# ─── 1. Create project scaffold ─────────────────────────────────────────────
echo "📁 Creating project: $PROJECT_NAME"
mkdir -p "$PROJECT_DIR"

# README.md
cat > "$PROJECT_DIR/README.md" <<'EOF'
# Project Name

Description

## Status

- Created: DATE
- Domain: DOMAIN

## Quick Start

```bash
cd /home/evo/workspace/projects/PROJECT_NAME
just check
```

## Context Chain

<- workspace/MEMORY.md
-> DNA/ops/CONVENTIONS.md
EOF

# MEMORY.md
cat > "$PROJECT_DIR/MEMORY.md" <<'EOF'
# PROJECT_NAME — Memory

> Tool-agnostic project memory. Any agent or human can read/write.

## Current State

- **Branch:** main
- **Status:** Active — initial scaffold
- **Environment:** TBD

## Active Threads

| Thread | Status | Next Step | Owner |
|--------|--------|-----------|-------|
| Project initialization | 🟡 | Scaffold created | Human |

## Blockers

| Blocker | Severity | Resolution |
|---------|----------|------------|
| None | — | — |

## Integration Points

| System | Direction | Status |
|--------|-----------|--------|
| TBD | ← TBD | TBD |

## Workspace Tools Available

When building in this project, leverage the shared workspace infrastructure:

| Tool | Location | Use For |
|------|----------|---------|
| Vision MCP | `tools/vision-mcp/` | Screenshots, OCR, UI review |
| Codex Peers | `tools/codex-peers-mcp/` | Cross-session messaging |
| OpenFang + Ollama | `tools/agent-stack/` | Bounded agent tasks |
| UI/UX Pro Max | `DNA/skills/UI_UX_PRO_MAX.md` | Design intelligence |
| shadcn/ui | Workspace registry | Component source (`npx shadcn`) |
| Playwright | Workspace registry | Browser automation |

Full active registry: `DNA/ops/STACK.md`

## DNA References

- `DNA/ops/CONVENTIONS.md` — workspace rules
- `DNA/ops/STACK.md` — tool registry

## Context Chain

<- workspace/MEMORY.md
<- workspace/SESSION_LOG.md
-> Project README.md
-> SESSION_LOG.md
EOF

# SESSION_LOG.md
cat > "$PROJECT_DIR/SESSION_LOG.md" <<'EOF'
# PROJECT_NAME — Session Log

> Append-only. Grows forever. Any tool can write.

## DATE — Project created
- Memory system initialized
- Project scaffolded

## Context Chain

<- MEMORY.md
EOF

# AGENTS.md
cat > "$PROJECT_DIR/AGENTS.md" <<'EOF'
# PROJECT_NAME — Agents

## Scope

Project-specific agent rules.

## Context Chain

<- workspace/AGENTS.md
<- workspace/DNA/AGENTS.md
-> DNA/ops/CONVENTIONS.md
EOF

# Justfile
cat > "$PROJECT_DIR/Justfile" <<'EOF'
# PROJECT_NAME — Justfile

set shell := ["bash", "-cu"]

# Default: show available recipes
default:
    @just --list

# Run project checks
check:
    @echo "Running checks..."
    @echo "Override this in your project Justfile"

# Memory management
memory-read:
    @cat MEMORY.md

memory-log:
    @cat SESSION_LOG.md | tail -20
EOF

# Replace placeholders
find "$PROJECT_DIR" -type f | while read -r file; do
    sed -i "s/PROJECT_NAME/$PROJECT_NAME/g" "$file"
    sed -i "s/DATE/$DATE/g" "$file"
    sed -i "s/DOMAIN/$DOMAIN/g" "$file"
    sed -i "s/DESCRIPTION/$DESCRIPTION/g" "$file"
done

# Create .env symlink
ln -sf /home/evo/.env "$PROJECT_DIR/.env"

# ─── 2. Update MANIFEST.md ─────────────────────────────────────────────────
echo "📝 Updating MANIFEST.md"
if grep -q "^## Active Projects" "$MANIFEST"; then
    sed -i "/^## Active Projects/a\\- ${PROJECT_NAME} - ${DESCRIPTION}, canonical at \`projects/${PROJECT_NAME}\`" "$MANIFEST"
    sed -i "s/Updated: .*/Updated: ${DATE}/" "$MANIFEST"
fi

# ─── 3. Register in CONVENTIONS.md ─────────────────────────────────────────
echo "📋 Registering in CONVENTIONS.md"
if ! grep -q "projects/${PROJECT_NAME}/README.md" "$CONVENTIONS"; then
    echo "- /home/evo/workspace/projects/${PROJECT_NAME}/README.md" >> "$CONVENTIONS"
    echo "- /home/evo/workspace/projects/${PROJECT_NAME}/AGENTS.md" >> "$CONVENTIONS"
    echo "- /home/evo/workspace/projects/${PROJECT_NAME}/MEMORY.md" >> "$CONVENTIONS"
fi

# ─── Done ──────────────────────────────────────────────────────────────────
echo ""
echo "✅ Project ${PROJECT_NAME} scaffolded successfully"
echo ""
echo "Files created:"
echo "  - README.md"
echo "  - MEMORY.md"
echo "  - SESSION_LOG.md"
echo "  - AGENTS.md"
echo "  - Justfile"
echo ""
echo "Next steps:"
echo "  1. cd ${PROJECT_DIR}"
echo "  2. just check"
echo "  3. Edit README.md, MEMORY.md, Justfile"
echo ""
