#!/usr/bin/env bash
# vault-lint.sh — Health-check the research vault wiki
# Usage: vault-lint.sh

set -uo pipefail

VAULT="/home/evo/workspace/research_vault"
WIKI="$VAULT/wiki"
TIMESTAMP="$(date -u +%Y-%m-%d)"

echo "=== Vault Lint: $TIMESTAMP ==="
echo ""

# 1. Count pages
WIKI_COUNT="$(find "$WIKI" -name '*.md' | wc -l)"
RAW_COUNT="$(find "$VAULT/raw" -name '*.md' | wc -l)"
echo "Wiki pages: $WIKI_COUNT"
echo "Raw sources: $RAW_COUNT"
echo ""

# 2. Find orphan pages (no inbound links)
echo "--- Orphan Pages ---"
find "$WIKI" -name '*.md' -print0 | while IFS= read -r -d '' page; do
    BASENAME="$(basename "$page" .md)"
    # Check if any other page links to this one
    LINKS=0
    while IFS= read -r -d '' other; do
        if [[ "$other" != "$page" ]] && grep -q "\[\[.*$BASENAME.*\]\]" "$other" 2>/dev/null; then
            LINKS=$((LINKS + 1))
            break
        fi
    done < <(find "$WIKI" -name '*.md' -print0)
    if [[ "$LINKS" -eq 0 ]]; then
        REL="$(realpath --relative-to="$VAULT" "$page")"
        echo "  🟡 orphan: $REL"
    fi
done
echo ""

# 3. Check for broken wikilinks
echo "--- Broken Wikilinks ---"
find "$WIKI" -name '*.md' -print0 | while IFS= read -r -d '' page; do
    grep -oP '\[\[\K[^\]]+' "$page" 2>/dev/null | while read -r link; do
        # Remove aliases (pipe)
        TARGET="${link%%|*}"
        # Check if target exists as a file
        FOUND=0
        for ext in "" ".md"; do
            if [[ -f "$WIKI/$TARGET$ext" ]] || [[ -f "$VAULT/$TARGET$ext" ]]; then
                FOUND=1
                break
            fi
        done
        if [[ "$FOUND" -eq 0 ]]; then
            REL="$(realpath --relative-to="$VAULT" "$page")"
            echo "  🔴 broken: [[$TARGET]] in $REL"
        fi
    done
done
echo ""

# 4. Check for uncited claims (heuristic: paragraphs without [^source:])
echo "--- Uncited Claims ---"
find "$WIKI" -name '*.md' -print0 | while IFS= read -r -d '' page; do
    # Count paragraphs/bullets without source citations
    UNCTED="$(grep -c '^\s*[-*]\s\+.*[^\[]\+$' "$page" 2>/dev/null || echo 0)"
    if [[ "$UNCTED" -gt 2 ]]; then
        REL="$(realpath --relative-to="$VAULT" "$page")"
        echo "  🟡 uncited: $REL ($UNCTED paragraphs without citations)"
    fi
done
echo ""

# 5. Check for stale pages (>30 days)
echo "--- Stale Pages (>30 days) ---"
find "$WIKI" -name '*.md' -mtime +30 -print0 | while IFS= read -r -d '' page; do
    REL="$(realpath --relative-to="$VAULT" "$page")"
    echo "  🟡 stale: $REL"
done
echo ""

# 6. Check frontmatter
echo "--- Missing Frontmatter ---"
find "$WIKI" -name '*.md' -print0 | while IFS= read -r -d '' page; do
    if ! head -1 "$page" | grep -q '^---$'; then
        REL="$(realpath --relative-to="$VAULT" "$page")"
        echo "  🟡 no-frontmatter: $REL"
    fi
done
echo ""

# 7. Summary
echo "--- Lint Summary ---"
echo "Wiki pages: $WIKI_COUNT"
echo "Raw sources: $RAW_COUNT"
echo ""
echo "Run 'just vault-ingest <source>' to add more sources."
echo "Run 'just vault-search <query>' to search the vault."
echo ""

# Append to log
LOG_ENTRY="## [$TIMESTAMP] lint | vault | Wiki: $WIKI_COUNT pages, Raw: $RAW_COUNT sources"
echo "$LOG_ENTRY" >> "$VAULT/log.md"
echo "Appended to log.md"

echo "=== Lint Complete ==="
