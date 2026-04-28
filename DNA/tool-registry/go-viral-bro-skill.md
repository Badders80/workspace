# Go Viral Bro — Content Script Generator

## Source
- GitHub: `https://github.com/charlesdove977/goviralbro`
- Creator: Charles Dove (@charlieautomates)
- Type: Claude Code plugin / content brain

## Purpose
Generates faceless-friendly content scripts with hooks, filming cards, and feedback loops. Designed for social media (Instagram, YouTube, LinkedIn).

## Setup

```bash
git clone https://github.com/charlesdove977/goviralbro.git
cd goviralbro
bash scripts/init-viral-command.sh
```

## Requirements
- Claude Code (paid subscription)
- Python
- Node.js
- API keys: YouTube, OpenAI (or alternatives)

## Core Commands

```bash
/viral:onboard    # Start new content campaign
/viral:research   # Scrape competitors, extract hooks
/viral:script     # Generate full script with filming cards
/viral:analyze    # Pull analytics, update brain
```

## Pipeline

1. **Discover** → Scrapes YouTube/Instagram/Reddit for competitors
2. **Angle** → Contrast Formula generates format-specific angles
3. **Script** → Hooks (6 patterns) + full script + filming cards
4. **Analyze** → Pulls analytics, updates JSONL brain stores

## Output
- Hook patterns (scored 1-10)
- Full scripts
- Filming cards (for on-camera or faceless production)
- JSONL stores: topics, angles, hooks, scripts, insights

## For Faceless Reels
Go Viral Bro outputs text/graphic scripts ideal for:
- Text overlay videos
- AI voiceover narration
- Animated captions
- Stock footage + B-roll

Pair with Remotion for programmatic video generation from scripts.

## Status
- **Fit:** Should (high value for faceless content)
- **Project Use:** Evolution_Content (Kingmaker template)

## See Also
- `/workspace/skills/video/remotion-skill.md`
- `/workspace/skills/content/content-brain-skill.md`