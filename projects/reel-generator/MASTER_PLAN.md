# Evolution Reel Generator - Master Plan (REVISED)

## 🎯 PROJECT UNDERSTANDING (LOCKED IN)

### **What We're Actually Building**
A **template-first, AI-powered social media reel production pipeline** that combines:
1. **Google Opal** for fast prototyping and image generation (Nano Banana)
2. **Local RTX 3060 12GB** for batch SDXL generation and upscaling
3. **fal.ai** as cloud burst for high-quality FLUX.1 Pro and video generation
4. **DaVinci Resolve Studio** for final assembly using Fusion templates

### **Key Insight from Docs**
The goal is NOT to generate everything from scratch for each reel. Instead:
- Build **reusable asset library** (horses, riders, environments)
- Create **Fusion templates** with dynamic substitution points
- **Assemble** reels from pre-generated components
- Use AI generation only for **hero images** and **custom elements**

---

## 📐 TECHNICAL ARCHITECTURE

### **Hardware (Confirmed)**
- **GPU**: RTX 3060 12GB (WSL2 environment)
- **Performance**: SDXL @ 15-25s per 1024x1024 image
- **Limitation**: Cannot run FLUX.1 locally (requires 20GB+ VRAM)

### **Software Stack**
1. **Image Generation**:
   - **Opal/Nano Banana**: Fast prototyping, Google credits
   - **ComfyUI + SDXL**: Local batch generation (WSL2)
   - **fal.ai FLUX.1 Pro**: Hero images requiring highest quality

2. **Video Assembly**:
   - **DaVinci Resolve Studio**: Template-based editing
   - **Fusion**: Motion graphics and compositing
   - **NVENC**: Hardware-accelerated rendering

3. **Enhancement**:
   - **Real-ESRGAN**: Local upscaling (720p → 1440p)
   - **fal.ai Topaz**: Premium 4K upscaling when needed

### **Target Output**
- **Resolution**: 1440x2560 (9:16 vertical) — optimal for RTX 3060
- **Duration**: 40-50s social media reels
- **Platforms**: Instagram Reels, TikTok, YouTube Shorts

---

## 🏗️ BUILD PHASES (REVISED)

### **Phase 1: B-Roll Asset Library (PRIORITY)**
**Goal**: Generate 50-100 high-quality horse racing images before building final workflow.

**Tools**:
- **Opal (Google Nano Banana)**: Primary tool for fast iteration using Google credits
- **fal.ai FLUX.1 Pro**: Backup for maximum quality hero shots
- **ComfyUI + SDXL**: Local generation once prompts are dialed in

**Asset Categories**:
1. **Race Action** (20-30 images)
   - Mid-gallop shots, multiple angles
   - Different lighting (golden hour, stadium lights)
   - Various compositions (wide, close-up, tracking)

2. **Riders/Jockeys** (15-20 images)
   - Portrait-style close-ups
   - Action poses during race
   - Post-race celebration moments

3. **Post-Race Scenes** (15-20 images)
   - Horse being led with jockey mounted
   - Winner's circle
   - Crowd reactions (blurred backgrounds)

4. **Environments** (10-15 images)
   - Track rails, grandstands, paddock
   - Atmospheric elements (dust, light rays)
   - Textural overlays (bokeh, grain)

**Deliverable**: Organized asset library with metadata tagging

---

### **Phase 2: Opal Workflow Builder (CURRENT)**
**Goal**: Build "Horse Racing B-Roll Generator" in Opal for fast asset creation.

**Workflow Design**:
```
[Text Input: Scene Description]
        ↓
[Gemini Flash: Analyze Scene Type]
        ↓
[Depth Router: Determine Layers Needed]
        ↓
    ┌─────────────────────────┐
    ↓                         ↓                         ↓                         ↓
[Nano Banana]         [Nano Banana]         [Nano Banana]         [Nano Banana]
Foreground            Midground             Background            Micro-Motion
2048×1080             2048×1080             2662×1404             Elements
Subject isolation     Context               130% overscan         Particles/mane
        ↓                         ↓                         ↓                         ↓
    └─────────────────────────┘
                ↓
        [Output Node]
        Download PNGs + Save to Drive
```

**Key Components**:
1. **Input Node**: Text description of scene
2. **Gemini Logic Node**: Brand routing, depth analysis
3. **4x Nano Banana Nodes**: Parallel layer generation
4. **Output Node**: Download links + Google Drive integration

**Prompt Engineering** (from Evolution Reel doc):
- **Foreground**: `"Extreme close-up [subject], sharp focus, black background, subject only"`
- **Midground**: `"[Context elements], soft edges, depth of field blur ready"`
- **Background**: `"Wide panoramic [scene], 130% overscan, pan-ready composition"`
- **Micro-Motion**: `"Isolated [element], transparent background, loop-ready"`

---

### **Phase 3: DaVinci Resolve Templates (FUTURE)**
**Goal**: Build Fusion templates with dynamic substitution points for rapid reel assembly.

**Template Categories**:
1. **Intros** (Logo reveals, title cards, transitions)
2. **Lower Thirds** (Name/title overlays, social handles)
3. **Transitions** (Swipe, zoom blur, morph effects)
4. **Outros** (CTA, social links, end screens)
5. **Overlays** (Grain, vignettes, light leaks)

**Scripting**: Python API for automated parameter injection

---

### **Phase 4: Motion Assembly Engine (FUTURE)**
**Goal**: Implement the Evolution Reel doc's motion math.

**Motion Library**:
- **Parallax Depth Push**: FG 105%→112%, MG 102%→108%, BG 100%→105%
- **Ken Burns**: Hold 4-6s, scale 105%→115%
- **Action Burst Strobe**: 4-5 images @ 0.15-0.20s each
- **Chromatic Aberration**: RGB split on hard cuts
- **Audio-Reactive Effects**: Opacity pulsing synced to Lyria audio

**Brand Routing**:
- **Evolution Stables**: Max 1 effect, smooth motion, no strobe
- **Evolution Intelligence**: Max 3 effects, fast cuts, strobe allowed

---

## 💰 COST STRATEGY

### **Google Credits First**
- Use **alex@evolutionstables.nz** Google account credits
- **Opal/Nano Banana**: Free or included in Google AI Studio
- **Gemini**: Generous free tier
- **Lyria**: Free for experimental use

### **fal.ai as Burst Layer**
- **FLUX.1 Pro**: $0.025 per 1024×1024 image (~$0.075 for 3 hero images)
- **Wan 2.1 I2V**: ~$0.30 per 6s clip
- **Topaz Upscale**: $0.39/minute (only for 4K masters)

**Estimated Cost per 45s Reel**:
- **B-roll from library**: $0 (already generated)
- **Hero images (3× FLUX)**: $0.075
- **Motion clips (2× Wan)**: $0.60
- **4K upscale (optional)**: $0.29
- **Total**: ~$1.00 per reel (when using cloud)

### **Local Generation (Post-Phase 1)**
Once prompts are perfected:
- **ComfyUI + SDXL**: $0 per image (electricity only)
- **Real-ESRGAN**: $0 per upscale
- **Batch overnight**: 50-100 images while sleeping

---

## 🚀 IMMEDIATE NEXT STEPS

### **Step 1: Access Google Opal**
1. Open browser to `opal.google`
2. Log in with `alex@evolutionstables.nz`
3. Verify access to Nano Banana (Imagen 3)

### **Step 2: Build First Workflow**
Create "Horse Racing B-Roll Generator v1":
- **Input**: Simple text description
- **Generate**: Single Nano Banana image (no layering yet)
- **Output**: Download PNG

### **Step 3: Test Prompt Engineering**
Generate 5 test images with varied prompts:
1. "Thoroughbred horse mid-gallop, jockey in blue silks, golden hour lighting"
2. "Close-up jockey portrait, intense expression, motion blur background"
3. "Winner's circle celebration, horse being led, crowd in background"
4. "Dubai racetrack, Meydan grandstand, golden hour panoramic"
5. "Isolated horse mane strands, wind motion, transparent background"

### **Step 4: Iterate & Refine**
- Evaluate quality vs. FLUX.1 Pro
- Adjust prompt formulas
- Add negative prompts
- Test layer separation workflow

### **Step 5: Scale to Multi-Layer**
Once single-image prompts work:
- Build parallel 4-node Nano Banana workflow
- Implement depth routing logic
- Test full layer stack generation

---

## 📊 SUCCESS CRITERIA

### **Phase 1 Complete When**:
- ✅ 50+ high-quality horse racing images generated
- ✅ Assets organized in Drive with metadata
- ✅ Prompt formulas documented and repeatable
- ✅ Quality meets "cinematic, premium racing aesthetic" standard

### **Phase 2 Complete When**:
- ✅ Opal workflow generates 4-layer image stacks
- ✅ Depth routing logic works consistently
- ✅ Google Drive integration auto-organizes outputs
- ✅ Can generate complete asset set in <10 minutes

### **Phase 3+ Complete When**:
- ✅ DaVinci Resolve templates assembled
- ✅ Python API automation working
- ✅ Can produce 45s reel from library assets in <15 minutes
- ✅ Brand routing logic implemented (Stables vs Intelligence)

---

## 🔒 CONSTRAINTS & DECISIONS

### **Why Opal First?**
1. **Google credits** make it zero-cost to experiment
2. **Fast iteration** without local setup complexity
3. **Learning opportunity** for future Opal workflows
4. **Nano Banana quality** is good enough for b-roll

### **Why NOT Build Full Reel Generator Yet?**
1. **Asset library required first** (nothing to assemble without b-roll)
2. **ComfyUI + Resolve** workflows are complex (premature optimization)
3. **Opal proves viability** before investing in local infrastructure

### **When to Switch to Local?**
1. After Phase 1 library is built
2. When batch generation becomes routine
3. When Google credits approach limits
4. When speed/cost favors overnight local rendering

---

## ✅ CURRENT STATUS: READY TO BUILD

All prerequisites confirmed. Ready to open Opal and start generating b-roll assets.

**Awaiting go-ahead to proceed with Step 1: Access Google Opal.**
