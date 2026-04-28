# Justfile - Task runner for Evolution Stables
# Usage: just <task>
# Install just: curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash

# Default task - show help
default:
    @just --list

# ═══════════════════════════════════════════════════════════
# Daily Commands
# ═══════════════════════════════════════════════════════════

# Check current workspace gate, vault, docker
check:
    @echo "🔍 Running all checks..."
    bash /home/evo/workspace/_scripts/evo-check.sh
    bash /home/evo/workspace/_scripts/vault.sh check
    @test -f /home/evo/workspace/_scripts/evo-docker.sh && bash /home/evo/workspace/_scripts/evo-docker.sh status || echo "⚠️  Docker check skipped (evo-docker.sh not present)"

# Rebuild productivity dashboard from all project MEMORY.md files
dash:
    @echo "📊 Rebuilding dashboard..."
    python3 /home/evo/workspace/_scripts/build-dashboard.py
    @echo ""
    @echo "Dashboard ready: /home/evo/workspace/DASHBOARD.md"

# Quick status - what's happening
status:
    @echo "📊 Project Status"
    @echo "═══════════════════════════════════════════════════════════"
    @evo backlog | head -30

# Launch Hermes from the workspace root so it loads the AGENTS.md chain
hermes:
    bash /home/evo/workspace/_scripts/hermesc.sh

# Launch the Hermes API gateway for local UI clients
hermes-gateway:
    bash /home/evo/workspace/_scripts/hermes-gateway.sh

# Launch the Hermes Workspace UI pointed at the local Hermes gateway
hermes-ui:
    bash /home/evo/workspace/_scripts/hermes-ui.sh

# Launch local Claude lanes
claude-fast:
    CLAUDE_LOCAL_MODEL=qwen3.5:latest bash /home/evo/workspace/_scripts/claude-local.sh

claude-debug:
    CLAUDE_LOCAL_MODEL=deepseek-coder-v2:16b bash /home/evo/workspace/_scripts/claude-local.sh

claude-audit:
    CLAUDE_LOCAL_MODEL=granite4:7b-a1b-h bash /home/evo/workspace/_scripts/claude-local.sh

# ═══════════════════════════════════════════════════════════
# Vault Management
# ═══════════════════════════════════════════════════════════

# Edit the central API vault
vault:
    evo vault edit

# Check vault health
vault-check:
    evo vault check

# ═══════════════════════════════════════════════════════════
# Docker Management
# ═══════════════════════════════════════════════════════════

# See what's running
docker-status:
    evo docker status

# List Docker projects
docker-list:
    evo docker list

# Start N8N workflows
n8n:
    evo docker start n8n

# Start Evolution Studio
studio:
    evo docker start studio

# Stop all Docker containers (emergency)
stop-all:
    evo docker stop-all

# ═══════════════════════════════════════════════════════════
# OpenClaw Bridge
# ═══════════════════════════════════════════════════════════

# Start OpenClaw bridge (FastAPI HTTP wrapper for just/openfang)
openclaw-start:
    @echo "🚀 Starting OpenClaw Bridge..."
    python3 /home/evo/workspace/tools/openclaw-bridge/main.py &
    @sleep 2
    @curl -s http://localhost:8080/health && echo "OpenClaw Bridge UP ✓" || echo "OpenClaw Bridge may need more time"

# Stop OpenClaw bridge
openclaw-stop:
    @echo "🛑 Stopping OpenClaw Bridge..."
    pkill -f "python3.*openclaw-bridge/main.py" 2>/dev/null || true
    @echo "OpenClaw Bridge stopped ✓"

# View OpenClaw bridge logs
openclaw-logs:
    @echo "=== Bridge Logs ==="
    @tail -20 /tmp/openclaw-bridge.log

# Check OpenClaw bridge status
openclaw-status:
    @curl -s http://localhost:8080/health && echo "OpenClaw Bridge is running ✓" || echo "OpenClaw Bridge is DOWN"

# ═══════════════════════════════════════════════════════════
# Project Memory (Per-Project Working Memory)
# ═══════════════════════════════════════════════════════════

# Focus on a project — declare intent and load memory
# Usage: just focus ssot
focus project:
    bash /home/evo/workspace/_scripts/focus.sh "{{project}}"

# Done with current project — save memory and clear focus
# Usage: just done
done:
    bash /home/evo/workspace/_scripts/done.sh

# Switch to a different project — save current, load new
# Usage: just switch platform
switch project:
    bash /home/evo/workspace/_scripts/switch.sh "{{project}}"

# Start a project session — resume where you left off
project-start project:
    bash /home/evo/workspace/_scripts/project-start.sh "{{project}}"

# End a project session — update memory, move done tickets
project-end project:
    bash /home/evo/workspace/_scripts/project-end.sh "{{project}}"

# ═══════════════════════════════════════════════════════════
# DNA / Memory
# ═══════════════════════════════════════════════════════════

# Show current backlog
backlog:
    evo backlog

# Show decision log
decisions:
    evo decisions

# Quick capture into the sidecar research vault
research-capture title body='':
    bash /home/evo/workspace/_scripts/research-capture.sh "{{title}}" "{{body}}"

# Launch Obsidian for the research vault from Windows PowerShell
research-vault-open:
    powershell -ExecutionPolicy Bypass -File "\\wsl.localhost\Ubuntu\home\evo\workspace\_scripts\open-research-vault.ps1"

# Sync workspace vault -> local Windows Obsidian vault
research-vault-pull:
    powershell -ExecutionPolicy Bypass -File "\\wsl.localhost\Ubuntu\home\evo\workspace\_scripts\research-vault-sync.ps1" -Direction pull

# Sync local Windows Obsidian vault -> workspace vault
research-vault-push:
    powershell -ExecutionPolicy Bypass -File "\\wsl.localhost\Ubuntu\home\evo\workspace\_scripts\research-vault-sync.ps1" -Direction push

# Seed the research vault with the current website/profile source set
research-seed:
    bash -lc 'python3 /home/evo/workspace/_scripts/seed_research_sources.py'

# Ingest new raw notes into the wiki pipeline
vault-wiki-ingest:
    cd /home/evo/workspace/research_vault && olw ingest

# Build the research vault wiki from raw notes
vault-wiki:
    cd /home/evo/workspace/research_vault && olw compile

# Review wiki articles (interactive approve/reject)
vault-wiki-review:
    cd /home/evo/workspace/research_vault && olw review

# ═══════════════════════════════════════════════════════════
# Research Vault v0.1 (Karpathy LLM Wiki Pattern)
# ═══════════════════════════════════════════════════════════

# Ingest a raw source into the wiki
vault-ingest source:
    bash /home/evo/workspace/_scripts/vault-ingest.sh "{{source}}"

# Lint the wiki for orphans, broken links, uncited claims
vault-lint:
    python3 /home/evo/workspace/_scripts/vault-lint.py

# Search the vault (v0.1: grep-based; v0.2: qmd)
vault-search query:
    python3 /home/evo/workspace/_scripts/vault-search.py "{{query}}"

# Query the wiki (AI synthesis)
vault-query question:
    @echo "=== Vault Query: {{question}} ==="
    @echo ""
    @echo "Searching vault..."
    python3 /home/evo/workspace/_scripts/vault-search.py "{{question}}"
    @echo ""
    @echo "Copy the search results and ask your AI to synthesize an answer."
    @echo "In v0.2, this will be fully automated via the wiki-keeper hand."

# Show vault status
vault-status:
    @echo "=== Research Vault Status ==="
    @echo ""
    @echo "Raw sources:  $(find /home/evo/workspace/research_vault/raw -name '*.md' | wc -l)"
    @echo "Wiki pages:   $(find /home/evo/workspace/research_vault/wiki -name '*.md' | wc -l)"
    @echo ""
    @echo "Last log entry:"
    @tail -5 /home/evo/workspace/research_vault/log.md
    @echo ""
    @echo "Vault path: /home/evo/workspace/research_vault"

# Push vault changes to Windows Obsidian mirror
vault-push:
    just research-vault-push

# Session start — progressive disclosure (index|timeline|full)
session-start detail='index':
    bash /home/evo/workspace/_scripts/session-start.sh --detail={{detail}}

# Session end — update memory logs and move completed tickets
session-end summary='Session ended':
    bash /home/evo/workspace/_scripts/session-end.sh "{{summary}}"

# Route a ticket to the correct OpenFang hand
ticket-route ticket:
    bash /home/evo/workspace/_scripts/ticket-route.sh "{{ticket}}"

# Check UI/UX ecosystem consistency
ui-ux-check:
    bash /home/evo/workspace/_scripts/check-ui-ux-consistency.sh

# Add design basics components
design-basics:
    bash /home/evo/workspace/_scripts/add-design-basics.sh

# Edit DNA
dna:
    code /home/evo/workspace/DNA

# Commit DNA changes
dna-commit msg:
    git -C /home/evo/workspace add DNA/ && git -C /home/evo/workspace commit -m "{{msg}}" -- DNA/

# ═══════════════════════════════════════════════════════════
# Navigation
# ═══════════════════════════════════════════════════════════

# Go to projects
proj:
    cd /home/evo/workspace/projects

# Go to DNA
cd-dna:
    cd /home/evo/workspace/DNA

# Go to scripts
cd-scripts:
    cd /home/evo/workspace/_scripts

# ═══════════════════════════════════════════════════════════
# Maintenance
# ═══════════════════════════════════════════════════════════

# Install git hooks (prevent .env commits)
install-hooks:
    bash /home/evo/workspace/_scripts/install-git-hooks.sh

# Install enhancements (fzf, zoxide, just, starship)
install-enhancements:
    bash /home/evo/workspace/_scripts/install-enhancements.sh

# Clean up Docker
docker-clean:
    evo docker clean

# Update all git repos (DNA + projects)
update:
    @echo "🔄 Updating all repositories..."
    @echo ""
    @echo "Updating DNA..."
    cd /home/evo/workspace/DNA && git pull
    @echo ""
    @echo "Updating projects..."
    @for dir in /home/evo/workspace/projects/*/; do \
        if [ -d "$$dir/.git" ]; then \
            echo "  $$(basename $$dir)..."; \
            cd "$$dir" && git pull 2>/dev/null || echo "    (failed or no remote)"; \
        fi \
    done
    @echo ""
    @echo "✅ Update complete"

# Backup DNA and projects
backup:
    @echo "💾 Creating backup..."
    @mkdir -p /home/evo/_archive/backups/auto
    @tar czf "/home/evo/_archive/backups/auto/evo-backup-$(date +%Y%m%d-%H%M%S).tar.gz" \
        -C /home/evo/workspace \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='__pycache__' \
        --exclude='.Trash' \
        --exclude='models' \
        --exclude='.cache' \
        DNA projects _docs _locks _logs _scripts AGENTS.md AI_SESSION_BOOTSTRAP.md Justfile MANIFEST.md 2>/dev/null
    @echo "✅ Backup created in /home/evo/_archive/backups/auto/"

# Full system check + update
doctor: check backup
    @echo "✅ System checked and backed up"


# ═══════════════════════════════════════════════════════════
# Memory Management (WSL2 Optimization)
# ═══════════════════════════════════════════════════════════

# Quick memory check (what's using RAM)
memory:
    bash /home/evo/workspace/_scripts/memory-check.sh

# Full memory optimization (WSL config, cleanup, kill zombies)
optimize-memory:
    bash /home/evo/workspace/_scripts/memory-optimize.sh

# ═══════════════════════════════════════════════════════════
# Audit Helpers
# ═══════════════════════════════════════════════════════════

audit-partners date='':
    @/home/evo/workspace/_scripts/evo-audit-partners.sh {{date}}

audit-claude-meta date='':
    @/home/evo/workspace/_scripts/evo-audit-claude-meta.sh {{date}}

audit-partners-claude date='':
    @/home/evo/workspace/_scripts/evo-audit-claude-meta.sh {{date}}

# Legacy pre-sidecar OpenFang bridge. Keep until the new agent-stack trial
# proves itself, then redirect or retire it.
audit-openfang-bridge date='':
    @/home/evo/workspace/_scripts/evo-openfang-audit-bridge.sh {{date}}

fang-local:
    /home/evo/workspace/tools/agent-stack/ollama-trial.sh start
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route local
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-debug:
    /home/evo/workspace/tools/agent-stack/ollama-trial.sh start
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route local-debug
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-audit:
    /home/evo/workspace/tools/agent-stack/ollama-trial.sh start
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route local-audit
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-status:
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh status
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh hand active

fang-conductor:
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route conductor
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-reasoning:
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route reasoning
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-primary:
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route primary
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-visual:
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route visual
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

fang-creative:
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh route creative
    /home/evo/workspace/tools/agent-stack/openfang-trial.sh start

model-status:
    @echo "=== Active Model Stack ==="
    @echo ""
    @echo "Conductor:    kimi-k2.6:cloud"
    @echo "Reasoning:    glm-5.1:cloud"
    @echo "Primary:      kimi-k2.6:cloud"
    @echo "Visual:       gemma4:31b-cloud"
    @echo "Creative:     minimax-m2.7:cloud"
    @echo ""
    @echo "=== OpenFang Routes ==="
    @ls /home/evo/workspace/tools/agent-stack/openfang/state/routes/*.toml | xargs -I {} basename {} .toml

# ═══════════════════════════════════════════════════════════
# Analysis Mirror
# ═══════════════════════════════════════════════════════════

analysis-mirror:
    bash /home/evo/workspace/_scripts/sync-analysis-mirror-git.sh

analysis-mirror-apply:
    bash /home/evo/workspace/_scripts/sync-analysis-mirror-git.sh --apply

workspace-full:
    bash /home/evo/workspace/_scripts/sync-workspace-full-git.sh --remote-url https://github.com/Badders80/workspace_full.git

workspace-full-apply:
    bash /home/evo/workspace/_scripts/sync-workspace-full-git.sh --apply --remote-url https://github.com/Badders80/workspace_full.git
