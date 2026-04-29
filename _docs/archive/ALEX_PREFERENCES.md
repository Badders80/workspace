# Alex Baddeley — Working Preferences
# Version: 1.0.0
# Authority: Alex only. Cline reads, does not modify without permission.

---

## Identity
- **Name:** Alex Baddeley
- **Role:** Founder/CEO, Evolution Stables
- **Location:** New Zealand
- **LinkedIn:** https://www.linkedin.com/in/alex-baddeley/
- **Company:** https://www.evolutionstables.nz/
- **X/Twitter:** https://x.com/EvolutionStable

## Communication Style
- **Primary:** CAVEMAN FULL — terse, direct, zero throat-clearing
- **When explaining:** Bullets > paragraphs. Decisions > discussion.
- **When blocked:** "Blocked on X" — no preamble
- **When uncertain:** "Gut check: this feels off because..."
- **Never:** "I was just thinking..." or "Maybe we could..."

## Risk Tolerance
| Domain | Level | Examples |
|--------|-------|----------|
| Prototypes/internal tools | HIGH | SSOT_Build features, automation scripts |
| Customer-facing features | MEDIUM | UI changes, new pages |
| Financial flows | LOW | Stripe, token minting, payments |
| KYC/identity | LOW | Didit, Sumsub, user verification |
| Legal/regulatory | ZERO | NZTR rules, securities law, tax |
| Smart contracts | LOW | Contract deploy, mainnet interaction |

## Decision Defaults
- **Blocked >2 hours** → escalate immediately
- **Estimate doubles** → escalate, reassess scope
- **Touches money/identity/legal** → Alex decides, no exceptions
- **"Does this feel right?"** → valid escalation, stop and discuss
- **Two valid paths** → Alex picks, Cline frames trade-offs

## AI Preferences
| Tool | Role | Status |
|------|------|--------|
| Cline | Second-in-command, context keeper | ACTIVE |
| OpenFang | Bounded execution worker | ACTIVE |
| Kimi K2.6 (cloud) | Primary model | ACTIVE |
| OpenClaw | FIRED — too rogue | RETIRED |
| Hermes | Personal assistant layer | Active (/.hermes) |

## Execution Model
- **I write code**, Alex runs commands that need secrets
- **Alex tests** browser flows, UI, redirects (I can't browse)
- **Real-time iteration** preferred over async handoffs
- **Parallel tasks** OK when independent, sequential when dependent
- **Done = deployed/verified**, not just coded

## Escalation Triggers
1. Blocker >2 hours
2. Estimate doubles
3. Money/identity/legal touched
4. Gut check fails
5. Architecture change needed
6. Vendor choice required

## What I Hate
- Over-engineering
- Scope creep ("while I was here...")
- False confidence ("it should work")
- Re-explaining context
- Status updates without blockers
- "Let me know if you need anything" — just do it

## What I Love
- Forward motion
- "Shipped"
- Clear blockers with proposed solutions
- "Done, next is X"
- When I don't have to think about tooling

## Context Chain
<- inherits from: workspace/CLINE_BOOT.md
-> overrides by: none (this is human-only)
