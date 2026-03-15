#!/bin/bash
# ═══════════════════════════════════════════════════════════
# AI Tool Handler - One-liner to log and evaluate tools
# This is called BY the AI when you mention a new tool
# Usage: ai-tool-handler "tool name or url" "source context"
# ═══════════════════════════════════════════════════════════

EVO_ROOT="/home/evo"
TOOL_NAME="$1"
SOURCE="${2:-cli conversation}"
DATE=$(date +%Y-%m-%d)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🎯 AI TOOL HANDLER - Quick Capture"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}Tool:${NC} $TOOL_NAME"
echo -e "${BLUE}Source:${NC} $SOURCE"
echo -e "${BLUE}Date:${NC} $DATE"
echo ""

# Check if already in TECH_RADAR
echo "🔍 Checking TECH_RADAR for existing evaluation..."

# Normalize the search (remove https, github.com, etc.)
SEARCH_TERM=$(echo "$TOOL_NAME" | sed 's|https://||;s|http://||;s|github.com/||;s|www.||' | cut -d'/' -f1)

if grep -i "$SEARCH_TERM" "$EVO_ROOT/00_DNA/TECH_RADAR.md" 2>/dev/null | grep -q "^###"; then
    echo -e "${YELLOW}⚠️  ALREADY EVALUATED${NC}"
    echo ""
    grep -i -A5 -B1 "^###.*$SEARCH_TERM" "$EVO_ROOT/00_DNA/TECH_RADAR.md" 2>/dev/null | head -20
    echo ""
    echo -e "${BLUE}Found in TECH_RADAR. Not adding duplicate.${NC}"
    exit 0
fi

# Check for similar tools (broader search)
echo "🔍 Checking for similar tools..."
KEYWORDS=$(echo "$TOOL_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/ /g')
SIMILAR_FOUND=0

for word in $KEYWORDS; do
    if [[ ${#word} -gt 4 ]]; then
        if grep -i "$word" "$EVO_ROOT/00_DNA/TECH_RADAR.md" 2>/dev/null | grep -q "^###"; then
            if [[ $SIMILAR_FOUND -eq 0 ]]; then
                echo -e "${YELLOW}⚠️  SIMILAR TOOLS FOUND:${NC}"
                SIMILAR_FOUND=1
            fi
            grep -i "$word" "$EVO_ROOT/00_DNA/TECH_RADAR.md" 2>/dev/null | grep "^###" | sed 's/^### /  • /'
        fi
    fi
done

if [[ $SIMILAR_FOUND -eq 1 ]]; then
    echo ""
    echo -e "${YELLOW}Consider: Are these the same or solving similar problems?${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📝 CAPTURING TO INBOX"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Create the entry
ENTRY="
### $DATE - $TOOL_NAME
**Source:** $SOURCE  
**Link:** $TOOL_NAME  
**Category:** [AI/DevOps/Frontend/etc]  
**One-liner:** [What does it claim to do?]  
**Hot take:** [Promising / Overrated / Revolutionary]  
**Action:** [Assess immediately / Research later / Probably ignore]  
**Logged by:** AI handler
"

# Add to INBOX.md
INBOX_FILE="$EVO_ROOT/00_DNA/INBOX.md"

# Create temp file with new entry
TEMP_FILE=$(mktemp)
echo "$ENTRY" > "$TEMP_FILE"

# Insert after the "New Discoveries" header or append
if grep -q "## 🆕 New Discoveries" "$INBOX_FILE"; then
    # Find the line number of the header
    LINE=$(grep -n "## 🆕 New Discoveries" "$INBOX_FILE" | head -1 | cut -d: -f1)
    # Split file and insert
    head -n "$LINE" "$INBOX_FILE" > "$TEMP_FILE.combined"
    echo "$ENTRY" >> "$TEMP_FILE.combined"
    tail -n +$((LINE + 1)) "$INBOX_FILE" >> "$TEMP_FILE.combined"
    mv "$TEMP_FILE.combined" "$INBOX_FILE"
else
    echo "" >> "$INBOX_FILE"
    echo "$ENTRY" >> "$INBOX_FILE"
fi

rm -f "$TEMP_FILE"
echo -e "${GREEN}✅ Added to INBOX.md${NC}"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📋 NEXT STEPS FOR AI:"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "1. Evaluate against current stack:"
echo "   - What problem does it solve?"
echo "   - Do we already have a solution?"
echo "   - Is it significantly better?"
echo ""
echo "2. Quick verdict:"
echo "   🔴 Reject = Not for us / Duplicates existing"
echo "   🟡 Assess = Interesting, needs research"  
echo "   🟢 Trial = Test in sandbox"
echo "   🔵 Adopt = Production ready"
echo ""
echo "3. If Assess or Trial:"
echo "   - Move to TECH_RADAR.md"
echo "   - Set decision deadline"
echo ""
echo "View inbox: code $EVO_ROOT/00_DNA/INBOX.md"
echo "View radar: code $EVO_ROOT/00_DNA/TECH_RADAR.md"
echo "═══════════════════════════════════════════════════════════"
