# Evolution Workspace — Productivity Dashboard
# Auto-generated: 2026-04-28 10:43
# Rule: DASHBOARD.md is read-only. Edit MEMORY.md, then run `just dash`.

---

## 🎯 Top of Stack

**Evolution_Content** — Post copy
Status: 🟡 | Next: Needs IG/X caption generator | Owner: Cline

## 📊 WIP Health

| Project | In Flight | Warning |
|---------|-----------|---------|
| Evolution_Content | 2 | ✅ |
| Evolution_Platform | 2 | ✅ |
| Evolution_Token | 1 | ✅ |
| SSOT_Build | 3 | ✅ |

## In Flight (8)

| Project | Item | Status | Next Step | Owner | Updated |
|---------|------|--------|-----------|-------|---------|
| Evolution_Content | Post copy | 🟡 | Needs IG/X caption generator | Cline | — |
| Evolution_Content | Content generator | 🟡 | Needs end-to-end pipeline script | Cline | — |
| Evolution_Platform | MyStable MVP | 🟡 | Shell exists, needs auth + real data | Human | — |
| Evolution_Platform | KYC flow | 🟡 | Didit hosted flow works | Working | — |
| Evolution_Token | Stripe E2E test | 🟡 | Test with real Stripe CLI (optional) | Deferred | — |
| SSOT_Build | Lease terms | 🟡 | Waiting for legal review | Human | — |
| SSOT_Build | HLT Lockdown | 🟡 | Phase 1 complete. Phase 2: DOCX generation | AI | — |
| SSOT_Build | Hottathanafantasy HLT | 🟡 | HLT v3 in review. Awaiting legal sign-off | Human | — |

## Completing (0)

_Empty_

## Stalled (7)

| Project | Item | Status | Next Step | Owner | Updated |
|---------|------|--------|-----------|-------|---------|
| Evolution_CRM | Project initialization | 🔴 | Not started | Human | — |
| Evolution_Content | Real data ingestion | 🔴 | Needs actual pundit tip sources | Human | — |
| Evolution_Ops | Project initialization | 🔴 | Not started | Human | — |
| Evolution_Platform | Auth integration | 🔴 | Deferred per product decision | Human | — |
| Evolution_Studio | Project initialization | 🔴 | Not started | Human | — |
| Evolution_Token | Contract deploy (Base Sepolia) | ❌ Cancelled | ETH-only decision, Base removed | Product decision | — |
| Evolution_Token | Firestore migration | 🔴 | Post-v1.0 | Deferred | — |

## Blocked (0)

_Empty_

## Ready (0)

_Empty_

## Done (12)

| Project | Item | Status | Next Step | Owner | Updated |
|---------|------|--------|-----------|-------|---------|
| Evolution_Content | Scaffold project | ✅ | Done — Node.js + dependencies installed | Cline | — |
| Evolution_Content | Ledger schema | ✅ | Done — SQLite schema + init script | Cline | — |
| Evolution_Content | Mock data | ✅ | Done — 3 pundits, 5 races, 15 calls, 15 records | Cline | — |
| Evolution_Content | Video template | ✅ | Done — Canvas + FFmpeg, 1080x1920, 20s | Cline | — |
| Evolution_Content | Build + verify | ✅ | Done — video rendered, 823KB | Cline | — |
| Evolution_Content | Data source research | ✅ | Done — deep dive in `_research/NZ_RACING_DATA_SOURCES.md` | Cline | — |
| Evolution_Platform | Marketplace v0.0 | ✅ | Public listings, open by default | Done | — |
| Evolution_Token | Auth middleware | ✅ Done | `/admin` route protected | Shipped | — |
| Evolution_Token | Full flow E2E test | ✅ Done | Pipeline validated, 2 bugs fixed | Shipped | — |
| Evolution_Token | Didit KYC SDK | ✅ Done | Real redirect flow implemented | Shipped | — |
| SSOT_Build | Horse data | ✅ | Canonical source for all projects | Done | — |
| SSOT_Build | Marketplace listing contract | ✅ | Drafted, linked from README | Done | — |

## 🛑 Blocked

| ID | Blocker | Impact | Since | Owner |
|----|---------|--------|-------|-------|
| B1 | Token contract on localhost only | Can't test real KYC→Stripe→Mint flow end-to-end | 2026-04-26 | Cline |
| B2 | KYC UI uses setTimeout simulation | Production KYC flow untested from user perspective | 2026-04-26 | Cline |
| B3 | Auth not wired Platform→Token | Blocks MyStable personalization + full user journey | 2026-04-11 | Product decision |
| B4 | Lease terms not finalized | Blocks complete syndication contract | 2026-04-10 | Human/legal |

## 🏁 Completing — Quick Wins

_Nothing in Completing_

## ✅ Done (This Week)

- **Evolution_Content** — Scaffold project
- **Evolution_Content** — Ledger schema
- **Evolution_Content** — Mock data
- **Evolution_Content** — Video template
- **Evolution_Content** — Build + verify
- **Evolution_Content** — Data source research
- **Evolution_Platform** — Marketplace v0.0
- **Evolution_Token** — Auth middleware
- **Evolution_Token** — Full flow E2E test
- **Evolution_Token** — Didit KYC SDK
- **SSOT_Build** — Horse data
- **SSOT_Build** — Marketplace listing contract

## Commands

```bash
just dash      # rebuild this dashboard
just check     # workspace health gate
just status    # project status
```

## Context Chain
<- inherits from: workspace/memory/STATE.md
<- inherits from: workspace/memory/BLOCKERS.md
<- inherits from: projects/*/MEMORY.md
-> overrides by: none