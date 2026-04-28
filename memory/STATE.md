# Evolution Workspace — Current State
# Version: 1.1.0
# Updated: 2026-04-28 by Cline

---

## System Health

| Component | Status | Notes |
|-----------|--------|-------|
| WSL Ubuntu | ✅ Running | 12GB RAM allocated |
| Ollama | ✅ Running | Port 11434, cloud models primary |
| Claude Code subagents | ✅ ACTIVE | Enabled via `tengu_mcp_subagent_prompt` flag (2026-04-28) |
| OpenFang | ✅ Running | Port 50051 — fallback if subagents unavailable |
| Cron | ✅ Active | Collectors running |
| Git repos | ✅ Clean | No uncommitted changes |

## Active Project States

### Evolution_Token
- **Status:** ✅ Production-ready MVP — 31 workflows tested, build passes
- **Contract:** Solidity ERC-20 with KYC-gated transfers. Compiled + deployed locally. Alchemy RPC connected to Base Sepolia
- **KYC:** Webhook working (idempotent), UI still simulated (setTimeout). Needs real Didit SDK integration
- **Wallet:** Openfort per-user wallets (keys configured, guard fixed)
- **Stripe:** Checkout sessions + webhook with signature verification + dev bypass
- **Mint:** KYC-gated API working. Needs real testnet deploy for E2E
- **Next:** Auth integration into Platform, E2E Stripe test with CLI, Didit SDK

### Evolution_Platform
- **Status:** Marketplace shell ready
- **Auth:** Deferred (blocks MyStable)
- **Release stage:** staging/live toggle configured
- **MyStable:** Holding page, truthful shell only
- **Next:** Auth integration, MyStable personalization

### SSOT_Build
- **Status:** Stable, canonical data
- **Firestore:** Stage-one horse writes live
- **Next:** Platform integration (consume published data)

### Evolution_Content
- **Status:** ✅ Shipped — Production reel v0.2 ready for post
- **Pipeline:** SQLite ledger → Canvas renderer → FFmpeg video output
- **Video:** 1080x1920, 25s, 5 scenes, H.264+AAC, rendered ✅
- **Tracked pundits:** Boys Get Paid, TAB Form, Alternative Commentary Collective
- **Next:** Real data ingestion, voiceover (TTS), stock images, IG/X caption generator

## Environment

- **Secrets:** /home/evo/.env (single source)
- **Node:** Project venvs only, no global installs
- **Build gate:** just check (GREEN required)
- **MCP skills server:** `get_memory_state` tool live — auto-loads STATE + BLOCKERS

## System Changes (2026-04-28)

| Change | Status | Note |
|--------|--------|------|
| v3 boot ritual | ✅ Live | 3 steps: STATE → BLOCKERS → AGENTS |
| Tool Gate Law 5 | ✅ Live | One in, one out for tool adoption |
| skills-mcp get_memory_state | ✅ Live | MCP tool auto-loads workspace state |
| Dead docs archived | ✅ Done | MEMORY_PROTOCOL, old TRANSITION, STACK_2026, tech-radar |
| .continue/config.yaml | ✅ Live | Auto-loads STATE.md + BLOCKERS.md into context |
| Kingmaker template test | ✅ Shipped | Evolution_Content renderer running, frames generating, v0.3-v0.5 MP4s exist |

## Blockers

| Blocker | Impact | Since | Owner |
|---------|--------|-------|-------|
| Auth system not wired to Platform | Blocks MyStable personalization | 2026-04-11 | Product decision — next sprint |
| Lease terms not finalized | Blocks full syndication contract | 2026-04-10 | Human/legal review |
| Contract on localhost only | Can't do real E2E token mint | 2026-04-26 | Cline — next sprint |
| No real tip/result data for Content | Can't run live Evolution Intelligence | 2026-04-27 | Human — source data |

## Context Chain
<- inherits from: workspace/CURRENT_SPRINT.md
-> overrides by: none