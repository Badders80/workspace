# Evolution Design Tokens

This repository is the **Visual DNA** of Evolution Stables. It defines the rules, roles, and values that ensure a consistent brand identity across all platforms.

## 🎯 The Game Plan

The goal is to move from hard-coded styles to a **Single Source of Truth (SSOT)** for design. We use a layered approach:
`Atoms (Values)` $\rightarrow$ `Profiles (Roles)` $\rightarrow$ `Components (Execution)`.

### Phase 1: v0.0 - The Investor Update (IU) Baseline
**Current Focus.** We are codifying the "Investor Update" style as our first profile.
- [x] Establish Core Atoms (Colors, Typography).
- [x] Map IU Component Logic (Heading, Body, Summary, Quote).
- [x] Map Asset Pointers to `Evolution_Content`.
  - *Note: Currently using direct URLs. Full asset library with semantic mapping to be implemented in Phase 4.*

### Phase 2: The Web Profile
Expand the library to include the cinematic website experience.
- [ ] Map `Web` Profile (H1 52px, Pill Buttons, Shimmers).
- [ ] Create "Cross-Profile" tokens (e.g., `CTA-Web` vs `CTA-IU`).

### Phase 3: The Transformer
Build the logic to export these JSON tokens into usable formats.
- [ ] Export to CSS Variables (for `Evolution_Platform`).
- [ ] Export to Inline Style Constants (for Email Generator).

### Phase 4: Asset Integration
Connect the tokens to the `Evolution_Content` warehouse.
- [ ] Create `assets.json` mapping semantic names to physical file paths.

## 🧬 Architecture

- `/tokens/`: The raw values (Atoms).
- `/profiles/`: The role-based mappings (Molecules).
- `/assets/`: Pointers to the physical asset warehouse.

## 📏 Brand Signatures
- **Sans:** Inter (Infrastructure/Precision).
- **Serif:** Playfair Display (Heritage/Narrative).
- **Accent:** Evolution Gold (#d4a964).
- **Signature:** Wide tracking (0.25em) on uppercase labels.

## 🛠️ Design Token Creation Protocol

### When you say: "Turn this into a design token"

**Step 1: Identify Component Type**
- **Atoms**: Raw values (colors, fonts, spacing) → `/tokens/`
- **Molecules**: Component styles → `/profiles/{profile}.json`
- **Assets**: Image/URL references → Future `/assets.json`

**Step 2: Token Structure Rules**
```json
{
  "component_name": {
    "property": { 
      "value": "actual-value", 
      "description": "semantic-meaning" 
    },
    "nested_component": {
      "property": "value"
    }
  }
}
```

**Step 3: Naming Conventions**
- Use `kebab-case` for component names
- Reference atoms: `color-brand-primary`, `font-serif`
- Include semantic descriptions
- Add `content` field for default text

**Step 4: Environment Considerations**
- Web: Use CSS-friendly values
- Email: Include inline-style fallbacks
- Multi-platform: Add transformation notes

**Step 5: Validation Checklist**
- [ ] Uses existing atoms where possible
- [ ] Includes semantic descriptions
- [ ] Follows established patterns
- [ ] Cross-platform compatible
- [ ] Tested in target environments

### Quick Reference Examples:
- **Button**: `buttons → section_cta`
- **Header**: `header_branding → logo + tagline`  
- **Quote**: `quote → text + caption + styling`
- **Footer**: `footer → hero + social + branding`

*Always reference existing tokens in `/profiles/iu-profile.json` for patterns.*
