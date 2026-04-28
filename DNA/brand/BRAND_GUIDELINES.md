# Evolution Stables Brand Guidelines

**Version:** 1.0
**Last Updated:** 2026-04-15
**Status:** Canonical

This document consolidates all brand usage guidelines from BRAND_SYSTEM.md, DESIGN.md, and INTELLIGENCE_SYSTEM.md into a practical reference for internal and external use.

---

## 1. LOGO USAGE

### Primary Logo
- **Full Color**: Use Evolution-Stables-Logo-White.svg on dark backgrounds (`#09090b`)
- **Reverse**: Use Evolution-Stables-Logo-Black.svg on light backgrounds
- **Minimum Size**: 24px height for digital, 6mm height for print
- **Clear Space**: Maintain minimum clear space equal to the height of the "E" in Evolution

### Monogram/Mark Usage
- **Primary Mark**: EvolutionStables Mono-Gold.svg for accent usage
- **Reverse Mark**: EvolutionStables Mono-White.svg or EvolutionStables Mono-Black.svg
- **Usage**: Appropriate for social media avatars, favicons, and secondary branding

### Lockup Variations
- Horizontal lockups: Wordmark + Monogram
- Vertical lockups: Wordmark above Monogram
- Stacked lockups: For narrow applications

### Prohibited Uses
- Do not alter colors, proportions, or orientation
- Do not add effects (shadows, gradients, outlines) unless specified
- Do not place on busy backgrounds that reduce legibility
- Do not rearrange elements or create new lockups

### File Formats
- **AI**: Source files for print production
- **SVG**: Web and scalable applications
- **PNG**: Digital applications with transparency
- **JPG**: Digital applications without transparency needs
- **EPS**: Legacy print workflows

---

## 2. COLOR SYSTEM

### Core Palette (from DESIGN.md)
| Role | Token | Hex | RGB | Usage |
|------|-------|-----|-----|--------|
| Background | `--color-background` | `#09090b` | 9,9,11 | Velvet Night. Primary surface. |
| Surface | `--color-surface` | `#0a0a0a` | 10,10,10 | Elevated surface (cards, modals). |
| Foreground | `--color-foreground` | `#f5f5f5` | 245,245,245 | Primary text on dark backgrounds. |
| Muted | `--color-muted` | `#a1a1aa` | 161,161,170 | Secondary text, captions. |
| Gold Accent | `--brand-gold` | `#d4a964` | 212,169,100 | The ONLY accent. CTAs, key metrics. Never for body text. |
| Border | `--color-border` | `rgba(255,255,255,0.06)` | 255,255,255,0.06 | Subtle dividers. |

### Color Usage Rules
1. **Background**: Always use `#09090b` (Velvet Night) for primary surfaces
2. **Surface**: Use `#0a0a0a` for elevated components (cards, modals, dropdowns)
3. **Foreground**: Use `#f5f5f5` for primary text on dark backgrounds
4. **Muted**: Use `#a1a1aa` for secondary text, captions, and de-emphasized content
5. **Gold Accent**: Use `#d4a964` EXCLUSIVELY for:
   - Primary call-to-action buttons
   - Key metrics and data highlights
   - Interactive elements on hover/focus
   - Brand monograms and accent marks
   - Never for body text or large color blocks

### Accessibility
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Gold accent (`#d4a964`) on background (`#09090b`): 7.2:1 ✓
- Gold accent on surface (`#0a0a0a`): 6.8:1 ✓
- Foreground (`#f5f5f5`) on background (`#09090b`): 15.6:1 ✓

---

## 3. TYPOGRAPHY

### Font Families (from DESIGN.md)
| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Heritage Heading | **Instrument Serif** | Bold, SemiBold | H1, H2, hero statements. Never for UI/body. |
| Precision Body | **Inter Tight** | Regular, Medium, SemiBold | Body text, labels, UI elements, navigation. |
| Data | **Geist Mono** | Regular, Medium | Code, data tables, odds, timestamps, metrics. |

### Typography Scale
- **H1**: 3.5rem (56px) - Instrument Serif Bold
- **H2**: 2.75rem (44px) - Instrument Serif SemiBold
- **H3**: 2.25rem (36px) - Instrument Serif SemiBold
- **H4**: 1.75rem (28px) - Instrument Serif Medium
- **H5**: 1.5rem (24px) - Instrument Serif Regular
- **H6**: 1.25rem (20px) - Instrument Serif Regular
- **Body Large**: 1.125rem (18px) - Inter Tight Medium
- **Body**: 1rem (16px) - Inter Tight Regular
- **Body Small**: 0.875rem (14px) - Inter Tight Regular
- **Caption**: 0.75rem (12px) - Inter Tight Light
- **Data**: 0.875rem (14px) - Geist Mono Regular

### Font Usage Rules
1. **Instrument Serif**: Reserved for headings, hero statements, and brand expressions ONLY
2. **Inter Tight**: Used for ALL body text, UI elements, navigation, and labels
3. **Geist Mono**: Used exclusively for data presentation (odds, timestamps, metrics, code)
4. Never mix more than 2 font families in any single composition
5. Maintain consistent line heights: 1.4 for body, 1.2 for headings

### Font Files Available
- **Bw Gradual Bold**: OTF, TTF, WOFF, WOFF2, EOT formats
- **Bw Gradual Medium**: OTF, TTF, WOFF, WOFF2, EOT formats
- **Geist Mono/Sans**: Variable fonts from Evolution Platform
- **Audi Type Digital**: Additional option for specific applications

---

## 4. VOICE AND TONE

### Ownership Layer Voice (from BRAND_SYSTEM.md)
**Character**: Mature, refined, long-horizon, stewardship-led
**Application**: Evolution Stables platform, investor relations, ownership conversion
**Governed by**: BRAND_SYSTEM.md

### Awareness Layer Voice (from INTELLIGENCE_SYSTEM.md)
**Character**: Fast, accessible, democratic, high-revving
**Application**: Evolution Intelligence, faceless content operations, social media
**Governed by**: INTELLIGENCE_SYSTEM.md
**Hard Restrictions**:
- NO ownership mentions
- NO Evolution Stables branding
- NO Tokinvest/VARA references
- NO DRC mentions
- The algorithm makes the connection - we never do explicitly

### The Funnel Model
- **Awareness Layer**: Evolution Intelligence builds trust through data accuracy
- **Ownership Layer**: Evolution Stables converts qualified participants to regulated digital-syndication owners
- **Separation**: Strict wall between layers - awareness never mentions ownership

---

## 5. APPLICATION GUIDELINES

### Digital Applications
- **Website**: Background `#09090b`, surfaces `#0a0a0a`, gold accent `#d4a964` for CTAs
- **Social Media**: Use monogram as avatar, apply color palette consistently
- **Email**: Text-only or minimal HTML with brand colors in signatures
- **Presentations**: Dark background with gold accent for highlights

### Print Applications
- **Business Cards**: Velvet Night background with white/gold text
- **Letterhead**: Minimal design with logo and brand colors
- **Brochures**: Follow institutional minimalism principles
- **Merchandise**: Apply logo with proper clear space and color variations

### Prohibited Applications
- Do not use on photographic backgrounds without proper overlay
- Do not combine with competing brand colors
- Do not use in contexts that violate the awareness/ownership separation
- Do not animate logo elements without explicit permission

---

## 6. MAINTENANCE AND VERSIONING

### Update Process
1. Changes to BRAND_SYSTEM.md, DESIGN.md, or INTELLIGENCE_SYSTEM.md trigger guideline updates
2. Version number increments with substantive changes
3. Last Updated date reflects most recent modification
4. Archive previous versions in `/brand/ARCHIVE/`

### Review Schedule
- Quarterly: Verify asset integrity and accessibility compliance
- Bi-annually: Review voice and tone effectiveness
- Annually: Complete brand audit and refresh if needed

### File Organization
```
/ASSETS/
├── LOGOS/
│   ├── primary/          # Full wordmark logos
│   ├── marks/            # Monogram/icon logos
│   ├── lockups/          # Combined logo treatments
│   └── favicons/         # Browser and app icons
├── COLORS/
│   ├── swatches/         # ASE, JSON, SCSS, CSS variables
│   └── guidelines/       # Usage rules and accessibility
├── TYPOGRAPHY/
│   ├── fonts/            # OTF, TTF, WOFF, WOFF2, EOT files
│   └── specimens/        # PDF showcases of typography
└── APPLICATIONS/
    ├── social-media/     # Templates for platforms
    ├── print/            # Business cards, letterhead, etc.
    └── digital/          # Website components, email templates
```

---

## 7. APPROVALS AND CONTACTS

### Brand Authority
- Ultimate authority: Evolution Stables Brand Council
- Day-to-day management: Brand Operations Team
- Technical implementation: Design Systems Team

### Usage Requests
All external usage requests must be submitted to:
brand@evolutionstables.example

### Internal Use
Internal teams may use assets following these guidelines without additional approval for:
- Marketing materials
- Investor communications
- Platform development
- Social media content (within layer restrictions)

---

**Note**: This document is derived from and must be read in conjunction with:
- BRAND_SYSTEM.md (Ownership Layer)
- DESIGN.md (Visual Design System)
- INTELLIGENCE_SYSTEM.md (Awareness Layer)
- Evolution_OS.md (Technical Architecture - referenced but not included)