# Evolution Update Generator - Setup & Usage

## Installation

The Hand is located at: `~/.openfang/hands/evolution-updates/`

### Register the Hand
```bash
cd ~/.openfang/hands/evolution-updates
openfang hand install .
```

### Verify Installation
```bash
openfang hand list
```

You should see `evolution-updates` in the output.

---

## Quick Start Workflow

### Step 1: Create Your Update Content
Save as `my-update.json`:

```json
{
  "updateType": "investor",
  "heading": "March Performance Review",
  "subheading": "Strong Q1 positioning ahead of market pivot",
  "content": "Q1 has delivered exceptional returns. Our diversified strategy paid off as market volatility favored our positioned assets.\n\nKey wins:\n- New partnership with Tier-1 institutional investor\n- Platform adoption up 47%\n- Regulatory approval in 3 new jurisdictions",
  "quote": "Success is the intersection of preparation and opportunity.",
  "quoteAttribution": "Team Leadership",
  "imageUrl": "https://example.com/q1-results.png",
  "outputFormat": "both"
}
```

### Step 2: Run the Generator
```bash
openfang run evolution-updates --input @my-update.json
```

### Step 3: Output Files
- `investor-2026-04-07-email.html` → Email version (max-width 640px, inline CSS)
- `investor-2026-04-07-mobile.html` → Mobile version (responsive, viewport meta)

### Step 4: Copy to Project
```bash
cp investor-2026-04-07-*.html ~/workspace/projects/Evolution_Platform/public/updates/
```

---

## Advanced Usage

### Generate Only Email Version
```json
{
  "updateType": "investor",
  "heading": "April Snapshot",
  "content": "Markets stabilizing. Positions strong.",
  "outputFormat": "email"
}
```

### Generate Only Mobile Version
```json
{
  "outputFormat": "mobile"
}
```

### Include Quote Box
```json
{
  "quote": "The best technology is invisible.",
  "quoteAttribution": "CEO",
}
```

### Include Image
```json
{
  "imageUrl": "https://s3.example.com/performance-chart.png"
}
```

### Include Video
```json
{
  "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
}
```

### Minimal Update (Heading + Content Only)
```json
{
  "updateType": "investor",
  "heading": "Quick Update",
  "content": "Simply the best month we've had."
}
```

---

## Brand Standards Applied

All generated updates automatically include:
- ✅ Evolution Platform color palette (#d4a964 gold accents, #000000 black, #ffffff white)
- ✅ Exact typography: Playfair Display (headlines), Inter (body), Geist Sans (quotes)
- ✅ Proper spacing and alignment (justified text, drop caps, etc.)
- ✅ Responsive layouts for all viewports
- ✅ Email client compatibility (Outlook, Gmail, Apple Mail)
- ✅ Mobile optimization (320px - 1440px)
- ✅ SEO metadata: noindex, nofollow tags

---

## File Naming Convention

Generated files follow this pattern:

```
{updateType}-{date}-{format}.html

Examples:
- investor-2026-04-07-email.html
- investor-2026-04-07-mobile.html
- pre-race-2026-04-14-email.html
- post-race-2026-04-21-mobile.html
- nomination-2026-05-01-both.html
```

---

## Workflow Integration

### If You Use Git
```bash
# Generate update
openfang run evolution-updates --input @update.json

# Add to project
mv investor-*.html ~/workspace/projects/Evolution_Platform/public/updates/

# Commit
cd ~/workspace/projects/Evolution_Platform
git add public/updates/investor-*.html
git commit -m "Add investor update for April 7"
git push
```

### Automated Script
Save this as `generate-update.sh`:

```bash
#!/bin/bash
# Generate investor update and deploy to Evolution Platform

WORKSPACE=~/workspace/projects/Evolution_Platform
UPDATES_DIR=$WORKSPACE/public/updates

# Generate
openfang run evolution-updates --input @./update-input.json

# Move to project
mv investor-*.html $UPDATES_DIR/

# Display result
echo "✅ Update generated and deployed to:"
ls -lh $UPDATES_DIR/investor-*
```

---

## Troubleshooting

### Hand Not Found
```bash
openfang hand list
# If evolution-updates is missing:
openfang hand install ~/.openfang/hands/evolution-updates
```

### Output Not Generated
Check your JSON formatting:
```bash
# Validate JSON
jq . my-update.json
```

### Email Rendering Issues
- Some email clients strip CSS. Check rendering in target clients
- Inline styles are most reliable
- Test in Outlook, Gmail, Apple Mail before sending

### Mobile Display Issues
- Ensure viewport meta tag is present
- Open .html in browser at different screen sizes (320px, 768px, 1440px)
- Images should scale proportionally

---

## Update Types Reference

| Type | Use Case | Example |
|------|----------|---------|
| `investor` | Monthly/quarterly metrics & insights | "Q2 performance review" |
| `pre-race` | Pre-event analysis & strategy | "Championship race prep" |
| `post-race` | Race recap & performance review | "Post-race analysis" |
| `nomination` | Awards, announcements, news | "Award nomination news" |

---

## Example: Full Workflow

```bash
# 1. Create detailed update
cat > april-investor-update.json << 'EOF'
{
  "updateType": "investor",
  "heading": "April 2026: Momentum Building",
  "subheading": "Strategic positioning pays off as market conditions align",
  "content": "April delivered on expectations. Our focus on diversification across regulatory regimes continues to prove resilient.\n\nThis month we saw:\n- Capital deployment: $3.2M across 4 new opportunities\n- Partnership wins: 2 Tier-1 institutional partners\n- Geographic expansion: Approval in Singapore, Hong Kong pending\n\nLooking ahead to May, we anticipate continued regulatory tailwinds.",
  "quote": "When preparation meets opportunity, exceptional results follow.",
  "quoteAttribution": "Board Commentary",
  "imageUrl": "https://cdn.example.com/april-performance.png",
  "outputFormat": "both"
}
EOF

# 2. Generate both email and mobile versions
openfang run evolution-updates --input @april-investor-update.json

# 3. Verify output
ls -lh investor-2026-04-07-*.html

# 4. Deploy
cp investor-2026-04-07-*.html ~/workspace/projects/Evolution_Platform/public/updates/

# 5. Commit to git
cd ~/workspace/projects/Evolution_Platform
git add public/updates/investor-2026-04-07-*.html
git commit -m "April investor update: Momentum Building"
git push
```

---

## Next Steps

1. **Try with example**: See `examples-inputs.md` for templates
2. **Test generation**: Run with your first update
3. **Review output**: Open HTML files in browser at different sizes
4. **Deploy**: Commit to project and push
5. **Schedule**: Set up recurring updates or CI/CD hook

Questions? Check `HAND.toml` for input schema or `prompt.md` for generation rules.
