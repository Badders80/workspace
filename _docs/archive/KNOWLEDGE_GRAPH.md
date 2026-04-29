# Evolution Ecosystem — Knowledge Graph
# Version: 1.0.0
# Purpose: How everything connects

---

## Products

| Product | Role | Status | Path |
|---------|------|--------|------|
| Evolution_Platform | Public website, marketplace | 🟡 Active | projects/Evolution_Platform/ |
| Evolution_Token | Tokenization, blockchain, KYC, payments | 🟡 Active | projects/Evolution_Token/ |
| SSOT_Build | Canonical horse/lease/owner data | ✅ Stable | projects/SSOT_Build/ |
| Evolution_CRM | Investor/owner management | 🔴 Inactive | projects/Evolution_CRM/ |
| Evolution_Content | Marketing assets, media | 🔴 Inactive | projects/Evolution_Content/ |
| Evolution_Ops | Horse operations, compliance | 🔴 Inactive | projects/Evolution_Ops/ |
| Evolution_Studio | Brand, design, creative | 🔴 Inactive | projects/Evolution_Studio/ |

## Data Flow

```
[User] → [Evolution_Platform]
              ↓
        [KYC: Didit.me]
              ↓
        [Wallet Generation]
              ↓
        [Stripe Payment]
              ↓
        [Token Mint: Evolution_Token]
              ↓
        [Holdings Display]
              ↓
        [SSOT_Build: Canonical Record]
```

## Cross-Project Dependencies

```
SSOT_Build ──horse data──────▶ Evolution_Platform (marketplace listings)
SSOT_Build ──lease terms────▶ Evolution_Token (contract terms)
Evolution_Token ──tokens────▶ Evolution_Platform (MyStable holdings)
Evolution_Platform ──auth────▶ Evolution_Token (KYC status)
Evolution_Content ──assets──▶ Evolution_Platform (investor updates)
Evolution_Studio ──design───▶ Evolution_Platform (brand, UI)
```

## External Services

| Service | Role | Status | Notes |
|---------|------|--------|-------|
| Didit.me | KYC verification | Integrating | SDK v0, sandbox testing |
| Stripe | Payments | Test mode active | Test cards only |
| Base Sepolia | Testnet blockchain | Pending deploy | Alchemy RPC connected |
| Alchemy | RPC provider | Active | Connected to Base Sepolia |
| Firestore | Cloud database | Active | evolution-engine project |
| Google Vertex AI | AI/ML | Active | ADC via evolution-engine |

## Auth & Trust Boundaries

- **Public:** Evolution_Platform marketplace (open info)
- **Private:** MyStable (authenticated users)
- **Gated:** Purchase flow (KYC + payment required)
- **Admin:** SSOT_Build, manual ops (founder-only)

## Context Chain
<- inherits from: workspace/CLINE_BOOT.md
-> overrides by: none
