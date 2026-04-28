# Evolution Stables Branding Implementation Guide
## shadcn/ui Button Component with Lockup Assets

This guide provides specific guidance on implementing Evolution Stables branding in a shadcn/ui button component that uses lockup assets, compliant with Institutional Minimalism principles.

## Overview

The Evolution Stables button component implements the Institutional Minimalism design philosophy from `DESIGN.md` while integrating with the shadcn/ui ecosystem and 21st.dev component registry.

## Implementation Steps

### 1. Set Up the Development Environment

First, ensure you have the required dependencies installed:

```bash
# Navigate to workspace
cd /home/evo/workspace/DNA

# Install core dependencies
npm install

# Install shadcn/ui dependencies
npm install clsx tailwind-merge
```

### 2. Configure Tailwind CSS

Ensure your `tailwind.config.ts` includes the content paths and extends the color palette with Evolution Stables design tokens:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",    // #09090b Velvet Night
        surface: "var(--color-surface)",          // #0a0a0a Elevated Surface
        foreground: "var(--color-foreground)",    // #f5f5f5 Primary Text
        muted: "var(--color-muted)",              // #a1a1aa Secondary Text
        border: "var(--color-border)",            // rgba(255,255,255,0.06) Subtle Dividers
        gold: "var(--brand-gold)",                // #d4a964 The ONLY Accent
      },
    },
  },
  plugins: [],
};
```

### 3. Import Design Tokens

In your global CSS file, import the Evolution Stables design tokens:

```css
/* styles/globals.css */
@import "./brand/ASSETS/COLORS/swatches/design-tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Additional base styles */
```

### 4. Create the Button Component

The Evolution Stables button component (`components/evolution-stables-button.tsx`) implements:

#### Core Features:
- **Institutional Minimalism Compliance**: Uses exact color values from DESIGN.md
- **Lockup Asset Integration**: Designed to work with horizontal, stacked, and vertical lockups
- **Multiple Variants**: Default, destructive, outline, secondary, ghost, and link
- **Responsive Sizing**: Small, default, large, and icon sizes
- **Accessibility**: Proper focus states, disabled states, and ARIA support

#### Key Implementation Details:

**Color Usage** (from DESIGN.md):
- Background: `var(--color-background)` (#09090b Velvet Night)
- Surface: `var(--color-surface)` (#0a0a0a Elevated Surface)
- Foreground: `var(--color-foreground)` (#f5f5f5 Primary Text)
- Muted: `var(--color-muted)` (#a1a1aa Secondary Text)
- Gold Accent: `var(--brand-gold)` (#d4a964 - THE ONLY accent color)
- Border: `var(--color-border)` (rgba(255,255,255,0.06) Subtle Dividers)

**Typography Compliance**:
- Uses system fonts that align with Inter Tight for UI elements
- Proper font weights and sizes for button text

**Layout & Spacing**:
- Precise padding and sizing (h-10 px-4 py-2 for default)
- Proper border radius following the design system
- Consistent hover and focus states

### 5. Using the Component

#### Basic Usage:
```tsx
import { EvolutionStablesButton } from "@/components/evolution-stables-button";

function Example() {
  return (
    <div>
      <EvolutionStablesButton>Primary Action</EvolutionStablesButton>
    </div>
  );
}
```

#### With Lockup Assets:
```tsx
import { EvolutionStablesButton } from "@/components/evolution-stables-button";

function ExampleWithLockup() {
  return (
    <div>
      {/* Button with horizontal lockup */}
      <EvolutionStablesButton lockupType="horizontal" lockupSize="md">
        Invest Now
      </EvolutionStablesButton>
      
      {/* Button with vertical lockup */}
      <EvolutionStablesButton lockupType="vertical" lockupSize="sm" variant="outline">
        Learn More
      </EvolutionStablesButton>
    </div>
  );
}
```

#### Variant Examples:
```tsx
<div className="flex flex-col gap-4">
  <EvolutionStablesButton>Default</EvolutionStablesButton>
  <EvolutionStablesButton variant="outline">Outline</EvolutionStablesButton>
  <EvolutionStablesButton variant="secondary">Secondary</EvolutionStablesButton>
  <EvolutionStablesButton variant="ghost">Ghost</EvolutionStablesButton>
  <EvolutionStablesButton variant="link">Link</EvolutionStablesButton>
</div>
```

#### Size Examples:
```tsx
<div className="flex flex-col gap-4">
  <EvolutionStablesButton size="sm">Small</EvolutionStablesButton>
  <EvolutionStablesButton size="default">Default</EvolutionStablesButton>
  <EvolutionStablesButton size="lg">Large</EvolutionStablesButton>
  <EvolutionStablesButton size="icon" aria-label="Menu">
    {/* Icon content */}
  </EvolutionStablesButton>
</div>
```

## 21st.dev Integration

To leverage the 21st.dev component registry with Evolution Stables branding:

1. Browse available components: `npx shadcn@latest list`
2. Add components from 21st.dev: `npx shadcn@latest add "https://21st.dev/r/<component>"`
3. Apply Evolution Stables styling overrides to maintain brand consistency

## Stitch MCP Usage

The Stitch MCP can be used to validate compliance with the Evolution Stables design system:

1. Ensure the MCP server is running (configured in `.vscode/mcp.json`)
2. Use the MCP to validate component implementations against DESIGN.md
3. Get real-time feedback on Institutional Minimalism compliance

## Verification Checklist

Before deploying, verify that your implementation:

- [ ] Uses ONLY the approved color palette (no secondary accent colors)
- [ ] Applies `--brand-gold` (#d4a964) as the sole accent color
- [ ] Implements proper background (`--color-background`: #09090b) and surface (`--color-surface`: #0a0a0a) colors
- [ ] Uses correct text colors (`--color-foreground`: #f5f5f5, `--color-muted`: #a1a1aa)
- [ ] Applies border color (`--color-border`: rgba(255,255,255,0.06))
- [ ] Follows typography guidelines (Inter Tight for UI elements)
- [ ] Maintains proper spacing and proportions
- [ ] Implements appropriate hover, focus, and disabled states
- [ ] Integrates lockup assets correctly without altering their proportions
- [ ] Maintains the "Guide, not the Hero" philosophy (Yoda Principle)

## Troubleshooting

### Common Issues:

1. **Incorrect Colors**: Double-check that you're using the CSS variables, not hardcoded hex values
2. **Lockup Sizing**: Ensure lockup assets maintain their aspect ratio and don't distort
3. **Variant Conflicts**: Verify that variant classes don't override essential base styles
4. **Spacing Issues**: Check that padding and margin values align with the 4px grid system

### Validation:

Use the Stitch MCP to validate your implementation:
```
# This would be done through the MCP interface in VS Code
Validate component against DESIGN.md Institutional Minimalism principles
```

## Maintenance

When updating the component:

1. Refer to `DESIGN.md` as the canonical source for design decisions
2. Ensure any changes maintain Institutional Minimalism compliance
3. Test with all lockup asset variations (horizontal, stacked, vertical)
4. Verify functionality across all button variants and sizes
5. Check accessibility compliance (WCAG 2.1 AA)

## Conclusion

This implementation provides a robust, compliant Evolution Stables branded button component that:
- Strictly adheres to Institutional Minimalism principles
- Integrates seamlessly with shadcn/ui and 21st.dev ecosystems
- Properly utilizes Evolution Stables lockup assets
- Maintains accessibility and usability standards
- Provides a consistent foundation for all UI components in the Evolution Stables platform