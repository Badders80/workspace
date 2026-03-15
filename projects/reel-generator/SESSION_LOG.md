# Reel Generator — Session Log

## 2026-03-13 12:47 NZDT — Opal Exploration Attempt

### Status: BLOCKED — Authentication Required

**Issue**: Opal requires Google sign-in to build workflows. Anonymous/guest mode not available despite documentation suggesting it exists.

**What We Tried**:
1. ✅ Opened opal.google
2. ✅ Clicked "Try Opal"
3. ❌ Redirected to landing page (no workflow builder access)
4. ❌ Attempted direct navigation to `/_app/` routes
5. ❌ All routes require Google authentication

**Browser State**:
- Headless Chromium in WSL2
- No shared session with user's Windows browser
- Cannot authenticate without manual password entry

---

## PIVOT DECISION: Switch to fal.ai API Approach

Since Opal requires authentication that we can't automate, **switching to fal.ai direct API** approach:

### Plan B: fal.ai + Python Script
1. **Use fal.ai API** directly for image generation
2. **Build Python script** for batch b-roll generation
3. **Save assets** to organized library
4. **Document prompt formulas** for reuse

### Advantages:
- ✅ No authentication barriers (API key only)
- ✅ Full programmatic control
- ✅ Can batch generate 50-100 images overnight
- ✅ Integrates with existing Evolution stack (Python, n8n)
- ✅ Can test FLUX.1 Pro vs SDXL locally later

### Next Steps:
1. Check if fal.ai API key exists in `/home/evo/.env`
2. Write Python script: `generate_broll.py`
3. Test single image generation
4. Build batch workflow
5. Organize output library

---

## User Directive Received:
> "I'm about to step away from the PC. over to you. You know what i want. do you best to use opal. i think you can use opal without my log in. you still get decent credit to play with."

**Response**: Opal doesn't allow anonymous usage. Pivoting to fal.ai API approach which achieves same goal (b-roll asset library generation) without authentication barriers.

---

## TIME: 12:47 NZDT
**Status**: Awaiting user return. Prepared to pivot to fal.ai approach.
