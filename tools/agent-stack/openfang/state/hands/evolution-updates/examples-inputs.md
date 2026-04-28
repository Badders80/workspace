# Example Inputs for Evolution Update Generator

## How to Use
1. Pick the update type template below
2. Fill in your raw content
3. Save as `update-input.json`
4. Run: `openfang run evolution-updates < update-input.json`

---

## Template 1: Investor Update

```json
{
  "updateType": "investor",
  "heading": "February Performance: Steady Growth in Volatile Markets",
  "subheading": "Month-over-month analysis with strategic positioning for Q1",
  "content": "February saw continued robust performance across all tracked assets. Our strategy of diversified positioning proved resilient against market volatility.\n\n**Key Metrics:**\n- Portfolio return: +3.2%\n- New investments: $2.4M\n- Partnerships signed: 2\n\nThe market's focus on regulatory clarity has favored our positioned assets. We're optimistic about continued momentum into March.",
  "quote": "When opportunity meets preparation, excellence becomes inevitable.",
  "quoteAttribution": "Growth Insights Report, Feb 2026",
  "imageUrl": "https://example.com/feb-chart.png",
  "videoUrl": "https://www.youtube.com/embed/xyz123",
  "outputFormat": "both"
}
```

---

## Template 2: Pre-Race Update

```json
{
  "updateType": "pre-race",
  "heading": "Championship Prep: Advanced Analytics Meet Proven Methodology",
  "subheading": "Here's what our models predict for Sunday's race",
  "content": "With 48 hours to race day, our engineering team has completed final testing. The telemetry data shows optimal line selection at turns 3 and 7, with predicted lap time improvements of 1.2 seconds.\n\nWeather forecast indicates cooler inlet temps—a factor our car handles exceptionally well. Strategy will emphasize tire conservation in first stint, then aggressive pace in stints 2-3.",
  "quote": "The race is won on Friday night, not Sunday afternoon.",
  "quoteAttribution": "Team Principal",
  "imageUrl": "https://example.com/track-map.png",
  "outputFormat": "both"
}
```

---

## Template 3: Post-Race Analysis

```json
{
  "updateType": "post-race",
  "heading": "Post-Race Analysis: Excellent Execution, Strategic Decisions",
  "subheading": "Breakdown of our P2 finish and what it means for the championship",
  "content": "An exceptional drive today. Our driver maintained consistent pace throughout all three stints despite mid-race tire degradation that we hadn't fully anticipated.\n\n**Race Summary:**\n- Qualifying: 3rd place start\n- Race finish: 2nd place (+0.8s from leader)\n- Fastest lap: Sector 2, turn 7 (new course record)\n- Pit strategy: Perfectly executed 1.94s pit stop\n\nThe decision to soften tires on lap 23 proved critical. This performance moves us to +12 points in the constructors' championship.",
  "quote": "Podiums come from thousands of small decisions executed perfectly. Today proved it.",
  "quoteAttribution": "Driver Quote",
  "imageUrl": "https://example.com/podium.png",
  "videoUrl": "https://www.youtube.com/embed/race2026",
  "outputFormat": "both"
}
```

---

## Template 4: Nomination Announcement

```json
{
  "updateType": "nomination",
  "heading": "Evolution Platform Nominated for Innovation Excellence 2026",
  "subheading": "Recognition for breakthrough work in decentralized asset management",
  "content": "We're honored to announce that Evolution Platform has been nominated for the Global Innovation Excellence Award in the Fintech category.\n\nThis nomination recognizes our pioneering work in democratizing access to institutional-grade investment opportunities through blockchain-verified, regulatory-compliant infrastructure.\n\n**Award Timeline:**\n- Nomination: April 2026\n- Semi-finals submission: May 15\n- Finals decision: June 22\n\nThis is a testament to our team's dedication and our community's trust.",
  "quote": "The best technology is invisible—it simply works, reliably and fairly.",
  "quoteAttribution": "CEO Statement",
  "imageUrl": "https://example.com/award-logo.png",
  "outputFormat": "email"
}
```

---

## Minimal Example (Only Heading + Content)

```json
{
  "updateType": "investor",
  "heading": "Quick Market Update",
  "content": "Markets stabilized this week. Our positions remain solid.",
  "outputFormat": "mobile"
}
```

---

## Field Reference

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `updateType` | ✓ | string | investor \| pre-race \| post-race \| nomination |
| `heading` | ✓ | string | Main title (40-50 chars ideal) |
| `subheading` | - | string | Optional subtitle |
| `content` | ✓ | string | Main body; supports **bold**, _italic_, line breaks |
| `quote` | - | string | Featured pullquote |
| `quoteAttribution` | - | string | Who said it; ignored if no quote |
| `imageUrl` | - | string | Full HTTPS URL to image |
| `videoUrl` | - | string | YouTube embed URL (youtube.com/embed/...) |
| `outputFormat` | - | string | email \| mobile \| both (default) |

---

## CLI Usage Examples

### Run with JSON file:
```bash
openfang run evolution-updates --input @update-input.json
```

### Pipe content directly:
```bash
cat update-input.json | openfang run evolution-updates
```

### Generate and save to project:
```bash
openfang run evolution-updates --input @update-input.json --output ~/workspace/projects/Evolution_Platform/public/updates/
```

### Generate email version only:
```bash
cat > update-email.json << 'EOF'
{
  "updateType": "investor",
  "heading": "April Update",
  "content": "Strong performance across all metrics.",
  "outputFormat": "email"
}
EOF
openfang run evolution-updates --input @update-email.json
```
