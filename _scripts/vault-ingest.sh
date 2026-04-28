#!/usr/bin/env bash
# vault-ingest.sh — Ingest a raw source into the research vault wiki
# Usage: vault-ingest.sh <relative-path-to-raw-source>
# Example: vault-ingest.sh raw/karpathy-llm-wiki.md

set -euo pipefail

VAULT="/home/evo/workspace/research_vault"
SOURCE="${1:-}"
TIMESTAMP="$(date -u +%Y-%m-%d)"

if [[ -z "$SOURCE" ]]; then
    echo "Usage: vault-ingest.sh <relative-path-to-raw-source>"
    echo "Example: vault-ingest.sh raw/karpathy-llm-wiki.md"
    exit 1
fi

SOURCE_PATH="$VAULT/$SOURCE"
if [[ ! -f "$SOURCE_PATH" ]]; then
    echo "Error: Source not found: $SOURCE_PATH"
    exit 1
fi

SOURCE_BASENAME="$(basename "$SOURCE" .md)"
SOURCE_REL="$SOURCE"

echo "=== Vault Ingest: $SOURCE ==="
echo "Timestamp: $TIMESTAMP"
echo ""

# Read AGENT.md rules
AGENT_RULES="$VAULT/AGENT.md"
if [[ ! -f "$AGENT_RULES" ]]; then
    echo "Error: AGENT.md not found at $AGENT_RULES"
    exit 1
fi

# Count lines in source for citation ranges
SOURCE_LINES="$(wc -l < "$SOURCE_PATH" | tr -d ' ')"

echo "Source: $SOURCE_REL ($SOURCE_LINES lines)"
echo "AGENT.md: $AGENT_RULES"
echo ""

# Generate wiki pages using the AI (via Ollama/GLM-5.1 or local model)
# For v0.1, we create a structured prompt and call the AI
# The AI reads the source, AGENT.md, and generates wiki pages

# Create a temporary prompt file
PROMPT_FILE="/tmp/vault-ingest-prompt-$$.md"
cat > "$PROMPT_FILE" <<EOF
# Vault Ingest Task

You are the wiki-keeper for the Evolution Stables research vault.

## Source to Ingest

File: $SOURCE_REL
Lines: $SOURCE_LINES
Path: $SOURCE_PATH

## Rules (from AGENT.md)

- raw/ is immutable — never modify.
- wiki/ is append-only — create new pages, never overwrite existing ones.
- Every claim cites exact source: raw/filename.md#Lstart-Lend.
- Frontmatter on every wiki page: aliases, tags, created, sources, confidence.
- Confidence: 1.0=direct quote, 0.7=clear inference, 0.5=speculative, 0.3=flagged.
- Use Obsidian conventions: [[wikilinks]], > [!note] callouts, #tags.
- If a concept already has a wiki page, create "Concept Name v2.md" and link to v1.

## Task

1. Read the source file below.
2. Extract atomic claims with line citations.
3. Create relevant wiki pages in these categories:
   - wiki/entities/ — people, companies, projects
   - wiki/topics/ — themes, concepts, methodologies
   - wiki/reports/ — summaries, analyses
4. Update index.md with new pages.
5. Append to log.md.

## Source Content

$(cat "$SOURCE_PATH")

## Output Format

For each wiki page, output:

```
--- FILE: wiki/category/Page Name.md ---
---
aliases: []
tags: []
created: $TIMESTAMP
updated: $TIMESTAMP
sources:
  - $SOURCE_REL
confidence: 0.7
---

# Page Name

Claim with citation [^source: $SOURCE_REL#L1-L5]

> [!note] Summary
> Key insight here.

## Linked Concepts

- [[Related Concept]]

--- END FILE ---
```

Then output:

```
--- INDEX UPDATE ---
Add to index.md:
- [[wiki/category/Page Name]] — one-line summary

--- LOG UPDATE ---
Append to log.md:
## [$TIMESTAMP] ingest | $SOURCE_REL | Created N wiki pages: Page 1, Page 2, ...
```

Generate all wiki pages now.
EOF

echo "Prompt generated: $PROMPT_FILE"
echo ""
echo "=== Next Steps ==="
echo "1. Copy the prompt above and send it to your AI (GLM-5.1:cloud or local Ollama)."
echo "2. The AI will generate wiki pages in the output format."
echo "3. Save each FILE block to the specified path in $VAULT/wiki/"
echo "4. Update $VAULT/index.md and $VAULT/log.md"
echo ""
echo "For automated ingest, run:"
echo "  ollama run glm-5.1:cloud < $PROMPT_FILE"
echo ""
echo "Or use VS Code Copilot with the prompt content."

# For v0.1, we output the prompt and let the human/AI handle the generation
# In v0.2, this will be fully automated via the wiki-keeper hand

echo "=== Ingest Complete (Manual Step Required) ==="
echo "Prompt saved to: $PROMPT_FILE"
