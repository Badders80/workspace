# Workspace Context — How We Operate

## 🧭 NAVIGATION
- **Canonical Root**: `/home/evo/workspace`
- **DNA**: `/home/evo/workspace/DNA` (conventions, skills, brand, agents)
- **This Project**: `/home/evo/workspace/projects/reel-generator`

## 🎯 CORE PHILOSOPHY (Build vs Adopt)

**Default Decision**: **ADOPT**, not BUILD.

**Required Order**:
1. Reuse existing internal asset (DNA docs, skills, services)
2. Adopt from Tier 1 partners/systems
3. Adapt/fork Tier 2 with guardrails
4. Build custom ONLY if required

**Before Building Anything**:
1. Check `DNA/skills/registry/approved_sources.md` (single source of truth)
2. Search GitHub, npm, existing workflows
3. Check n8n workflows, DNA skills
4. Document why custom build was chosen

**Violation = stop, research, replan.**

---

## 🏗️ EVOLUTION BUILD PROTOCOL (EBP)

### E-01: STOP AND TELL (Hard Stop Triggers)
1. Gateway/agent spawning fails → Report options
2. User says "review" or "assess" → Confirm mode
3. Task >2 files OR API change → Draft spec first
4. Phase complete → State status, ask next action

### E-03: RESEARCH BEFORE BUILD
Before ANY feature:
- Check approved sources
- Search for existing solutions
- Check n8n workflows, DNA skills
- Adapt > Integrate > Build from scratch

### Surgical Edit Rules (Low Mode)
1. Edit minimum files possible
2. Prefer modifying existing code over rewriting
3. Keep diffs <30 lines unless unavoidable
4. No refactors unless explicitly requested
5. After edits: list what changed and why

---

## 🎨 BRAND SYSTEM (Evolution Stables Ownership Layer)

### The Funnel Model
- **Evolution Intelligence** (Awareness Layer): Racing intelligence, no ownership push
- **Evolution Stables** (Ownership Layer): Regulated digital-syndication platform

**Critical**: Awareness ≠ Ownership. Wall is permanent. User-initiated only.

### Voice & Tone
- **Professional, not stuffy**: "Institutional-grade" not "fancy horse gambling"
- **Analytical, not cold**: Acknowledge the animal, respect the sport
- **Confident, not arrogant**: "We built" not "We're the only smart ones"
- **Visionary, not abstract**: Claims tied to tangible outcomes

### Hard Language Rules
- **Tone**: Calm, measured, evidence-grounded
- **Format**: Plain English (British spelling), declarative sentences
- **Prohibited**: No hype, no clichés, no exclamation marks, no Web3 jargon
- **Active voice always**

### Ownership Lexicon
| Use | Banned Alternative |
|-----|-------------------|
| Digital-syndication | Tokenized shares, Blockchain horses |
| Equine Assets | Horses, Racehorses, Animals |
| Fractional Ownership | Shares, Pieces, Parts |
| Marketplace | Exchange, Trading platform |
| Regulated Access | Buying in, Getting started |

**Never lead with technology. Always lead with outcome.**

### Visual System (Ownership Layer)
- **Gold**: #d4a964 (primary accent, CTAs)
- **Background**: #0b0b0b (deep sophistication)
- **Typography**: Geist Sans (primary), Geist Mono (protocol/data)
- **Imagery**: Documentary-meets-cinematic, natural light, real environments

---

## 🛠️ TECH STACK 2026

### Primary Runtimes
- **Python**: 3.12.3 (venvs at `/home/evo/projects/[project]/venv`)
- **Node.js**: Latest LTS (Next.js 14 / TypeScript)
- **Database**: Supabase (PostgreSQL)

### LLM Architecture
**Philosophy**: Local-First Intelligence with Cloud-Hybrid fallback

| Model | Size | Use Case | Response |
|-------|------|----------|----------|
| liquid-ai-2.6b | 2.7GB | Fast iteration, simple Q&A | <2s |
| evolution-designer | 6.2GB | Creative content, branding | 2-5s |
| evolution-coder | 6.3GB | Code generation, docs | 2-5s |
| qwen2.5-14b | 8.6GB | Complex reasoning, strategy | 3-8s |

### Automation & Content
- **Orchestration**: n8n (Docker-based)
- **Image/Video Gen**: ComfyUI (FLUX.1-dev, LTX-Video, Wan 2.2)
- **Voice**: ElevenLabs API
- **Assembly**: FFmpeg (NVENC/CPU hybrid)

---

## 📝 CONVENTIONS

### Naming
- `AGENTS.md`: Primary agent rules
- `CLAUDE.md`: Claude-only overrides
- `README.md`: Human docs with AI section
- `AI_SESSION_BOOTSTRAP.md`: Live map

### Archive Convention
- All archives: `/home/evo/workspace/_archive/<stream>/<YYYY-MM-DD>/`
- Every dated snapshot needs `MANIFEST.md`
- Search pattern: `rg -n "<term>" /home/evo/workspace/_archive/*/MANIFEST.md`

---

## 🎬 CURRENT PROJECT: REEL GENERATOR

### Phase 1: B-Roll Asset Library (NOW)
- Build reusable library of 50-100 horse racing images
- Use Google Opal + Nano Banana (leverage alex@evolutionstables.nz credits)
- Organized by category (race action, riders, post-race, environments)

### Phase 2: Full Reel Generator (LATER)
- DaVinci Resolve Fusion templates
- Motion assembly (parallax, Ken Burns, brand routing)
- Audio sync (Lyria)

### Key Reference Docs (Already Loaded)
1. **Opal Bible**: How to build Opal workflows
2. **Evolution Reel Generator**: Multi-layer image + motion assembly system
3. **Reel Production Pipeline**: Full north-star vision (RTX 3060, local+cloud hybrid)
4. **AI Learning Guide**: Tool ecosystem, agentic workflows

---

## ✅ READY TO BUILD

All context loaded. Operating within established conventions.

**Next**: Open Google Opal in browser, build "Horse Racing B-Roll Generator v1".
