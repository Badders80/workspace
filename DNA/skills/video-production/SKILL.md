# Video Production Skill

Status: **v0.1 — initial integration**

> **This is the starting point.** The full video production stack is not yet wired.
> Triggers for heavier integration are marked `[[HEAVIER: YES]]` below.
> Remotion is the only active video engine in v0.1.

## Purpose

Add video as a content output format alongside HTML email and web updates.
When Evolution_Studio decides a brief warrants a video version, this skill
guides the production.

## Toolkit Location

```
/home/evo/workspace/claude-code-video-toolkit/
```

Reference the toolkit's own docs for commands and tool details:
- `/video` — create or resume a video project
- `/setup` — first-time toolkit configuration
- `/brand` — manage brand profiles

---

## v0.1 Scope

### What is active

| Component | Status | Notes |
|-----------|--------|-------|
| Remotion (React-based video) | ✅ Active | Video rendering engine |
| `product-demo` template | ✅ Active | Dark tech aesthetic; adaptable for investor/race content |
| Scene types: title, problem, solution, demo, stats, cta | ✅ Active | Map to Evolution content types below |
| Scene transitions: glitch, rgbSplit, zoomBlur, lightLeak, clockWipe, pixelate, checkerboard | ✅ Active | Preview: `cd showcase/transitions && npm run studio` |
| Brand profiles (`brands/`) | ✅ Active | Evolution Stables profile needs to be created |
| Voiceover generation (Qwen3-TTS, ElevenLabs) | ✅ Active | via toolkit Python tools |
| AI image generation (FLUX.2) | ✅ Active | via `--cloud modal` |
| SadTalker (talking head from image + audio) | ✅ Active | via `--cloud modal` |
| AI music (ACE-Step) | ✅ Active | via toolkit Python tools |

### What is not yet wired

| Component | Status | Trigger for activation |
|-----------|--------|------------------------|
| Stitch MCP (design canvas) | 🟡 Not wired | [[HEAVIER: YES]] — See §Heavier Integration |
| 21st.dev Magic MCP (component variations) | 🟡 Not wired | [[HEAVIER: YES]] |
| Magic UI library (animated components) | 🟡 Not wired | [[HEAVIER: YES]] |
| Nano Banana 2 (image generation) | 🟡 Not wired | [[HEAVIER: YES]] |
| Narrator PiP (talking head overlay) | 🟡 Not wired | [[HEAVIER: YES]] |
| `/record-demo` (Playwright browser recording) | 🟡 Not wired | [[HEAVIER: YES]] |
| `/scene-review` (Remotion Studio for scene review) | 🟡 Not wired | [[HEAVIER: YES]] |

### What is explicitly out of scope

- LTX-2.3 AI video generation (high cloud GPU cost for v0.1)
- RunPod as cloud GPU (Modal is recommended and sufficient for v0.1)

---

## When to Trigger Video Production

### Decision logic

```
Does the brief have video-flagged sections?
    YES → invoke video production skill
    NO  → check below

Does the brief involve:
  - Race preview or recap?
  - New horse listing / platform introduction?
  - Investor milestone or update (funding, performance)?
  - Brand storytelling or stable narrative?
    YES to any → consider video, check with author
    NO → HTML-only is fine for v0.1
```

### Content type → Remotion scene mapping

| Evolution content type | Remotion scene type | Notes |
|-----------------------|---------------------|-------|
| Race preview (Prudentia at Te Rapa) | `title` + `stats` + `cta` | Title slide with race details, stats card for form, CTA with TAB link |
| Race recap | `title` + `stats` | Results headline, animated stat cards for margin/time |
| New horse listing (Hottathanafantasy intro) | `title` + `solution` + `cta` | Pedigree highlights, Tokinvest CTA |
| Investor update (dual-purpose) | `title` + `problem` + `solution` + `cta` | Body copy as voiceover narration over visuals |
| Stable narrative / brand story | `title` + `feature` + `cta` | Farm highlights, trainer angle, CTA |

### Brand profile needed

Before video production, create:

```
brands/evolution-stables/
├── brand.json    # Colors, fonts, logo paths
├── voice.json    # ElevenLabs / Qwen3-TTS voice settings
└── assets/       # Logo, background images
```

Use `/brand` command in the toolkit to scaffold. Current `default` brand
is usable as reference.

---

## Evolution Stables — v0.1 Adaptation

### Theme direction

Remotion's `product-demo` template uses a dark tech aesthetic.
For Evolution Stables, adapt toward:

- **Dark background** with gold/amber accent (matches Evolution brand)
- **Clean serif or slab-serif typography** for headlines (Prudentia announcements)
- **Horse racing visual language** — track imagery, silks colors, finishing post
- **Data-forward** where relevant (form stats, margins, weights)

### Voiceover approach

- Qwen3-TTS self-hosted via Modal (~$0.01/min) for v0.1
- ElevenLabs if voice quality needs to be higher
- Match voice tone to brand: measured, confident, not hype

### Output target

```
Evolution_Studio/packages/{item-name}/
├── src/                    # Remotion project (from adapted template)
├── public/
│   ├── videos/             # Rendered MP4 outputs
│   └── audio/              # Voiceover, music
└── project.json            # Toolkit project manifest
```

---

## Heavier Integration Triggers

`[[HEAVIER: YES]]` — activate when the corresponding need is confirmed.

### [[HEAVIER: YES]] Stitch MCP for design generation

**Trigger**: Brief requires custom visual layout not covered by template scenes.

Stitch MCP (`@_davideast/stitch-mcp`) generates full design screens and a
machine-readable `DESIGN.md` from natural language. It can produce the visual
mockup for a new scene type before Remotion implements it.

Wire in `.vscode/mcp.json` alongside the existing Stitch proxy.

### [[HEAVIER: YES]] 21st.dev Magic MCP for component variations

**Trigger**: Brief needs animated UI components that go beyond template slides.

21st.dev Magic generates polished React + Tailwind component variations from a
prompt. Drop the chosen variant into a Remotion slide component. Requires cloud
API key — revisit if cloud egress posture changes.

### [[HEAVIER: YES]] Magic UI library for premium animations

**Trigger**: Video needs the "not AI-looking" polish that shadcn/ui + Magic UI
provide.

Magic UI (`magicui.design`) has 150+ animated components. These can be used
inside Remotion slides via the same React + Tailwind stack Remotion already
uses.

### [[HEAVIER: YES]] Narrator PiP (talking head overlay)

**Trigger**: Investor update benefits from a "presenter" feel rather than
voiceover-only.

SadTalker generates a talking head from a portrait photo + audio.
Combined with the narrator PiP system in the product-demo template, this
gives a "host" overlay on video content.

### [[HEAVIER: YES]] `/record-demo` for browser walkthroughs

**Trigger**: Platform update needs a live demo walkthrough (e.g., Tokinvest
portal walkthrough for new investors).

Playwright records browser interactions as a video file, which is then dropped
into a `demo` scene with browser chrome.

### [[HEAVIER: YES]] `/scene-review` for scene-by-scene review

**Trigger**: Multi-scene video project with quality bar above "rough cut."

Opens Remotion Studio for frame-accurate scene review before final render.

---

## Relationship to UI_UX_PRO_MAX Skill

UI_UX_PRO_MAX is loaded for Evolution_Platform and Evolution_Studio UI work.
Video production is a **sibling capability**, not a replacement.

| Concern | UI_UX_PRO_MAX | Video Production |
|---------|---------------|-------------------|
| Target output | Web UI / application | MP4 video |
| Design tool | Stitch MCP, 21st.dev Magic | Remotion + Stitch (for custom scenes) |
| Components | shadcn/ui, Magic UI | Magic UI **can** be used inside Remotion slides |
| Brand enforcement | Design tokens in `.github/instructions/` | Brand profile in `brands/evolution-stables/` |
| Asset generation | Nano Banana 2, FLUX.2 | FLUX.2 via toolkit, Nano Banana 2 [[HEAVIER: YES]] |

**Cross-skill rule**: If video slides need custom visual layouts, invoke
Stitch via UI_UX_PRO_MAX workflow. If Stitch outputs design tokens, mirror
them into the `brands/evolution-stables/` theme.

---

## v0.1 Workflow

```
1. Studio brief is approved → author flags "video: yes"
2. Agent reads this skill doc
3. Agent identifies content type → Remotion scene mapping
4. Agent creates / adapts Remotion project in Studio/packages/
5. Agent configures brand (colors, fonts, logo)
6. Agent generates voiceover via Qwen3-TTS
7. Agent assembles scenes in Remotion Studio (npm run studio)
8. Agent renders MP4 (npm run render)
9. Agent places output in Evolution_Content/media/ and updates catalog/
10. Publish-queue packet updated to include video asset
```

---

## Integration Checklist

- [ ] Clone toolkit to `/home/evo/workspace/claude-code-video-toolkit`
- [ ] Run `/setup` in Claude Code to configure cloud GPU and voice
- [ ] Create `brands/evolution-stables/` brand profile
- [ ] Adapt `product-demo` template for Evolution content types
- [ ] Verify `npm run studio` and `npm run render` work
- [ ] Confirm voiceover pipeline (Qwen3-TTS or ElevenLabs)
- [ ] Update `approved_sources.md` with toolkit reference
- [ ] Update `INDEX.md` to list this skill

## Context Chain

<- inherits from: /home/evo/workspace/DNA/skills/INDEX.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
