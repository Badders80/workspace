# Repomix — Codebase Context Packer

## Source
- GitHub: `https://github.com/yamadashy/repomix`
- Type: CLI tool / Claude Code plugin
- Creator: yamadashy

## Purpose
Packs an entire codebase (or remote GitHub repo) into a single AI-friendly file. Handles compression, token optimization, and ignores. Turns large codebases into digestible context for LLMs.

## Setup

```bash
# Install via npm
npm install -g repomix

# Or use npx
npx repomix
```

## Core Commands

```bash
repomix                    # Pack current directory
repomix --remote owner/repo  # Pack remote repo
repomix --include "*.ts"   # Filter file types
repomix --output report.xml # Output format (xml/markdown/plain)
```

## Key Features

| Feature | What it does |
|---------|--------------|
| Token optimization | Respects token limits |
| Compression | Reduces codebase size |
| Binary filtering | Skips images, binaries |
| .gitignore support | Respects project ignores |
| Remote repos | Pack any GitHub repo |
| Skill generation | Generate Claude skills from codebase |

## For Evolution Stables

Repomix is useful when:
- Working across multiple Evolution projects
- Need full context for refactoring
- Preparing prompts for complex cross-project tasks
- Generating project-specific skills

## Comparison to Manual Copy-Paste

| Method | Pros | Cons |
|--------|------|------|
| Repomix | Complete, optimized, fast | CLI dependency |
| Manual | No setup | Incomplete, error-prone |

## Status
- **Fit:** Should (highly recommended foundational tool)
- **Verdict:** Mature, actively maintained, works across LLMs

## See Also
- `/workspace/DNA/skills/registry/approved_sources.md`
- `/workspace/skills/ai/mcp-builder-skill.md`