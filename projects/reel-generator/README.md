# Evolution Reel Generator

**Status**: Phase 1 — B-Roll Asset Library Generation  
**Created**: 2026-03-13  
**Stack**: Vertex AI / Gemini API + Python + local asset labelling

---

## 🎯 Project Goal

Build a template-first reel production pipeline that generates studio-grade social media content (40-50s reels) for Evolution Stables racing content.

### The Strategy

**Phase 1** (NOW): Generate reusable b-roll image library  
**Phase 2**: Apply motion effects (Ken Burns, parallax, zoom)  
**Phase 3**: Layer with overlays (text, race data, stats)  
**Phase 4**: Add voice narration  
**Phase 5**: Full reel assembly pipeline

**Why images first?** Opal/fal.ai give us **large daily image quotas** but **small video quotas**. We use effects on still images to simulate motion (Ken Burns, parallax depth push) and save video generation for strategic moments only.

---

## 📁 Project Structure

```
reel-generator/
├── assets/
│   └── <label>/          # Grouped local runs, e.g. gemini-baseline-compare/
├── prompts/
│   ├── gemini_baseline_test_batch.json
│   └── test_batch.json
├── scripts/
│   ├── generate_broll.py
│   └── generate_nanobanana.py
├── MASTER_PLAN.md
├── PROJECT_STATUS.md
├── WORKSPACE_CONTEXT.md
└── EXECUTION_REPORT.md
```

---

## 🚀 Quick Start

### Diagnose Google Setup
```bash
cd /home/evo/workspace/projects/reel-generator
source /home/evo/.env

python3 scripts/generate_nanobanana.py --diagnose-google
```

### Generate Single Image
```bash
cd /home/evo/workspace/projects/reel-generator
source /home/evo/.env
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT=evolution-engine
export GOOGLE_CLOUD_LOCATION=global

python3 scripts/generate_nanobanana.py \
  --prompt "Thoroughbred horse mid-gallop, golden hour" \
  --type test \
  --label gemini-baseline \
  --auth-mode vertex \
  --width 1024 \
  --height 1024
```

### Generate Batch
```bash
python3 scripts/generate_nanobanana.py \
  --batch prompts/gemini_baseline_test_batch.json \
  --auth-mode vertex
```

### Build Review Bundle
From PowerShell on this machine, generate a quick review surface for any completed label:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build_review_bundle.ps1 -Label library-v1
```

This writes:
- `<label>_contact_sheet.png` for fast visual review
- `<label>_review_manifest.csv` for keep/reject notes and curation

### Prepare The Next Batch
The next targeted prompt set is staged at `prompts/library_v2_backfill_batch.json`.
It focuses on the gaps visible after `adhoc` and `library-v1`: tighter equine detail, cleaner midground layers, more pan-ready backgrounds, and vertical-safe reel portraits.

### Output Layout
All Gemini generations are grouped under `assets/<label>/...` so each test pass stays separate.
If a batch file does not declare a `label`, the script now falls back to the batch filename stem.

### Auth Modes
- `--auth-mode vertex`: Preferred workspace path. Uses Vertex AI with ADC / Google Cloud auth against `evolution-engine`.
- `--auth-mode developer`: Uses `GEMINI_API_KEY` against the Gemini Developer API.
- `--auth-mode auto`: Prefers Vertex when Google Cloud config or ADC is present.

### Current Google Notes
- Workspace policy is Google-first via Vertex AI / ADC, not raw API keys.
- A Developer API key can still be present and valid for text generation while having zero image quota.
- If Vertex reports `invalid_rapt`, the local ADC credential is stale and needs `gcloud auth application-default login` refreshed.
- The local Cloud SDK is available at `/home/evo/.local/bin/gcloud`, so the repair command is:
  `gcloud auth application-default login --project evolution-engine`

Example:
```text
assets/
└── gemini-baseline-compare/
    ├── test/
    └── gemini_batch_results_*.json
```

---

## 🎨 Prompt Engineering

### Evolution Reel Generator Formulas

Based on the **Evolution Reel Generator Build Doc** and **Opal Bible**, we use layered prompt formulas:

#### Foreground Layer (Subject Isolation)
**Formula**: `[SUBJECT] + [DEPTH ROLE] + [TECHNICAL SPECS] + [ATMOSPHERIC MODIFIERS]`

**Example**:
```
Extreme close-up Thoroughbred horse head, neck and mane in sharp focus, 
occupying right third of frame, black background, studio lighting, 
8K detail, photorealistic, no environment visible, subject only
```

**Negative Prompt**:
```
background, environment, sky, ground, blur, soft focus, multiple subjects, 
full body, wide angle
```

**Dimensions**: 2048×1080 (wide for lateral panning)

---

#### Midground Layer (Contextual Elements)
**Formula**: `[CONTEXT ELEMENTS] + [DEPTH CUE] + [SOFT EDGES]`

**Example**:
```
Horse racing fence, white rails, depth of field blur ready, 
paddock environment, soft afternoon light, no sky, no ground detail, 
middle distance focus, architectural elements only
```

**Negative Prompt**:
```
sharp focus, foreground subject, background skyline, close-up detail
```

**Dimensions**: 2048×1080

---

#### Background Layer (Extended Canvas for Panning)
**Formula**: `[WIDE SCENE] + [OVERSCAN SPEC] + [ATMOSPHERIC DEPTH]`

**Example**:
```
Wide panoramic Dubai Meydan Racecourse at golden hour, grandstand visible, 
ultra-wide 21:9 aspect, 130% crop room on all sides, atmospheric haze, 
soft clouds, cinematic gradient sky, extended canvas, pan-ready composition
```

**Critical Addition**:
```
extended canvas, overscan 30%, pan-ready composition, center-weighted 
with bleed on left/right/top/bottom
```

**Negative Prompt**:
```
people, horses, close-up, narrow field of view
```

**Dimensions**: 2662×1404 (130% overscan for Ken Burns/pan effects)

---

#### Micro-Motion Elements (Cinemagraph/Overlay)
**Formula**: `[ISOLATED ELEMENT] + [MOTION CUE] + [ALPHA-READY]`

**Example**:
```
Isolated horse mane strands, wind motion, transparent background, 
individual hair detail, subtle movement blur, loop-ready, 4K texture, 
alpha channel ready
```

**Variants**:
- Dust particles, arena dust motes
- Flag/banner rippling fabric
- Crowd blur abstract shapes

**Dimensions**: 1024×1024 (tile-able)

---

## 📊 Test Results

### First Generation (2026-03-13 12:51)

**Prompt**: "Thoroughbred racehorse mid-gallop, jockey in racing silks, golden hour lighting, photorealistic, cinematic"

**Score**: 8/10

| Aspect | Rating | Notes |
|--------|--------|-------|
| Photorealism | 7/10 | Leg anatomy issues (AI tell), tack geometry ambiguous |
| Composition | 8.5/10 | Excellent triangular framing, rule of thirds, depth layers |
| Lighting | 9/10 | **Outstanding** golden hour backlight, rim lighting, volumetric haze |
| Motion/Energy | 8/10 | Suspended gallop phase captured, dirt spray present |
| Brand Fit | 7.5/10 | Gold palette perfect, but needs anatomy fixes for premium use |

**Recommended Fixes**:
1. Inpaint front legs for correct anatomy
2. Add motion blur to background (panning simulation)
3. Define saddle/tack geometry
4. Add saddle cloth with number
5. Specify "correct four-leg gallop anatomy" in future prompts

**Usage**: Suitable for digital placements (web, social) after minor fixes. Not print-ready without corrections.

---

## 🎬 Motion Assembly (Phase 2 — Not Yet Built)

Once we have the asset library, we'll apply:

### Camera Grammar (Movement)
- **Parallax Depth Push**: FG 105%→112%, MG 102%→108%, BG 100%→105%
- **Ken Burns**: Hold 4-6s, scale 105%→115%
- **Lateral Pan**: Scale BG to 120%, animate X-axis 3-5s

### Temporal Effects
- **Action Burst Strobe**: 4-5 images @ 0.15-0.20s each
- **Speed Ramp**: Variable frame timing (0.30s → 0.08s)

### Brand Routing Logic
- **Evolution Stables**: Max 1 effect, smooth motion, no strobe
- **Evolution Intelligence**: Max 3 effects, fast cuts, strobe allowed

---

## 💰 Cost Analysis

### fal.ai Pricing (FLUX.1 Pro)
- **Per image**: ~$0.025 per 1024×1024
- **Test batch (5 images)**: ~$0.125
- **Full library (100 images)**: ~$2.50

### Comparison
- **Opal**: Free with Google credits (but requires manual workflow)
- **Local SDXL**: $0 per image (but 15-25s generation time, quality trade-off)
- **fal.ai FLUX**: Best quality, fast (<5s), scalable

**Strategy**: Use fal.ai for initial library build-out, then switch to local SDXL for iterations once prompts are dialed in.

---

## 🔄 Next Steps

### Immediate (Phase 1 Completion)
1. ✅ Test single image generation → **DONE**
2. ⏳ Generate test batch (5 images) → **IN PROGRESS**
3. ⏳ Curate successful labels with review sheets + CSV manifests before motion assembly
3. ⬜ Evaluate results, adjust prompts
4. ⬜ Generate full library (50-100 images)
5. ⬜ Organize by category, add metadata

### Phase 2 (Motion Assembly)
6. ⬜ Build DaVinci Resolve / After Effects templates
7. ⬜ Implement parallax depth math
8. ⬜ Test Ken Burns, lateral pan effects
9. ⬜ Add brand routing logic

### Phase 3 (Overlay System)
10. ⬜ Create text overlay templates
11. ⬜ Build data card system (race results, stats)
12. ⬜ Test real-world example (NZB Kiwi race results)

### Phase 4 (Voice Narration)
13. ⬜ Integrate ElevenLabs TTS
14. ⬜ Generate sample narration
15. ⬜ Sync audio to video timeline

### Phase 5 (Full Pipeline)
16. ⬜ End-to-end reel generation from prompt
17. ⬜ Batch export for multiple platforms (Instagram, TikTok, YouTube)
18. ⬜ Quality analysis via Gemini Embedding API

---

## 📚 Reference Docs

- **MASTER_PLAN.md**: Full technical architecture
- **Opal Bible**: Google Opal workflow patterns
- **Evolution Reel Generator**: Motion assembly system
- **Reel Production Pipeline**: North-star vision (local stack)

---

## 🛠️ Tech Stack

- **Image Generation**: fal.ai FLUX.1 Pro
- **Scripting**: Python 3.12
- **Future**: DaVinci Resolve, After Effects, n8n, ComfyUI
- **Analysis**: Gemini Embedding API

---

**Last Updated**: 2026-03-13 12:52 NZDT  
**Status**: Phase 1 in progress — generating test batch
