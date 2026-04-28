# Active Blockers — Evolution Workspace
# Version: 1.0.0
# Purpose: Living blocker tracker. Resolved blockers move to LESSONS.md.
# Updated: 2026-04-27 by Cline

---

## Current Blockers

| ID | Blocker | Impact | Since | Owner | Resolution Path |
|----|---------|--------|-------|-------|-----------------|
| B1 | Token contract on localhost only | Can't test real KYC→Stripe→Mint flow end-to-end | 2026-04-26 | Cline | Deploy to Base Sepolia (next sprint P1) |
| B2 | KYC UI uses setTimeout simulation | Production KYC flow untested from user perspective | 2026-04-26 | Cline | Integrate real Didit SDK (next sprint P0/P1). NOTE: KYC webhook + wallet creation IS working |
| B3 | Auth not wired Platform→Token | Blocks MyStable personalization + full user journey | 2026-04-11 | Product decision | Next sprint P0: integrate Token auth into Platform |
| B4 | Lease terms not finalized | Blocks complete syndication contract | 2026-04-10 | Human/legal | External review pending |

## Resolved Blockers (This Session)

| ID | Blocker | Resolution | Date |
|----|---------|------------|------|
| — | KYC webhook not idempotent | Fixed: UNIQUE constraint on kyc_sessions, idempotent processing | 2026-04-25 |
| — | Stripe webhook signature fail | Fixed: Added dev bypass + real signature verification | 2026-04-25 |
| — | Openfort guard policy error | Fixed: Guard configuration corrected, real API ready | 2026-04-25 |
| — | Build failing | Fixed: TypeScript errors resolved, build passes | 2026-04-25 |

## Blocker Rules
- **New blocker:** Add immediately, notify Alex if HIGH impact
- **Resolved:** Move to LESSONS.md with resolution notes
- **Stale >1 week:** Escalate to Alex
- **Duplicate:** Merge, don't create new entry

## Context Chain
<- inherits from: workspace/CURRENT_SPRINT.md
-> overrides by: none