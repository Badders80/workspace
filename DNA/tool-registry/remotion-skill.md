# Remotion — Code-Driven Video Rendering

## Source
- Website: `https://remotion.dev`
- Type: React-based video composition framework
- Agent Skills: `npx skills add remotion-dev/skills`

## Purpose
Programmatic video rendering from code. Turns prompts into video files without manual timeline editing. Frame-by-frame control, deterministic output.

## Setup

```bash
# Install Remotion
npx create-video@latest my-video

# Add Agent Skills
npx skills add remotion-dev/skills
```

## How It Works

1. **Prompt Claude Code** → "Make a 30-second product promo with this logo"
2. **Claude scaffolds** → React components for layout, timing, animations
3. **Remotion renders** → MP4 output from code

## Key Capabilities

| Feature | Use Case |
|---------|----------|
| Captions | Burned-in subtitles, text overlays |
| B-roll | Auto-placed stock footage |
| Animations | Zoom, pan, fade, motion graphics |
| Transitions | Cuts, wipes, dissolves |
| 3D | Three.js integration for 3D scenes |
| Audio | Background music, voiceover sync |

## For Faceless Reels
Remotion excels at:
- Text overlay videos (animated captions)
- Animated charts/data graphics
- Logo reveals
- AI-generated voiceover + visual sync
- Programmatic B-roll placement

## Workflow with Evolution_Content

1. Go Viral Bro generates script + filming cards
2. Remotion renders video from script + brand assets
3. Evolution_Content templates (Kingmaker) provide scene structure
4. FFmpeg finalizes MP4 output

## DNA Brand Compliance
- Background: `#121212` (dark)
- Gold accent: `#d4a964`
- Fonts: Inter Bold (captions), Geist Mono (data)
- Ken Burns: 105-115% zoom

## Example Prompt

```
"Create a 25-second faceless reel with:
- Dark background (#121212)
- Gold text (#d4a964) for key numbers
- Animated P&L counter
- Ken Burns zoom effect on horse image
- Burned-in ALL CAPS captions with 2px black stroke"
```

## Status
- **Fit:** Should (code-driven video production)
- **Project Use:** Evolution_Content (Kingmaker template)

## See Also
- `/workspace/skills/content/go-viral-bro-skill.md`
- `/workspace/skills/video/magic-animator-skill.md`