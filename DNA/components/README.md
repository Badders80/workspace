# Evolution Stables Button Component

A shadcn/ui-based button component that implements Evolution Stables branding according to Institutional Minimalism principles.

## Features

- **Institutional Minimalism Compliant**: Uses the exact color palette, typography, and spacing from DESIGN.md
- **Lockup Integration**: Designed to work with Evolution Stables lockup assets
- **Multiple Variants**: Default, destructive, outline, secondary, ghost, and link variants
- **Size Options**: Small, default, large, and icon sizes
- **Fully Typed**: Built with TypeScript for enhanced developer experience

## Installation

1. Install the required dependencies:
   ```bash
   npm install clsx tailwind-merge
   ```

2. Copy the component files to your project:
   - `components/evolution-stables-button.tsx`
   - `lib/utils.ts`

3. Ensure your Tailwind configuration includes the design tokens:
   ```css
   @import "./brand/ASSETS/COLORS/swatches/design-tokens.css";
   ```

## Usage

```tsx
import { EvolutionStablesButton } from "@/components/evolution-stables-button";

// Basic usage
<EvolutionStablesButton>Click Me</EvolutionStablesButton>

// With lockup asset
<EvolutionStablesButton lockupType="horizontal" lockupSize="md">
  Action Button
</EvolutionStablesButton>

// Variant examples
<EvolutionStablesButton variant="outline">Outline</EvolutionStablesButton>
<EvolutionStablesButton variant="secondary">Secondary</EvolutionStablesButton>
<EvolutionStablesButton variant="ghost">Ghost</EvolutionStablesButton>
<EvolutionStablesButton variant="link">Link</EvolutionStablesButton>

// Size examples
<EvolutionStablesButton size="sm">Small</EvolutionStablesButton>
<EvolutionStablesButton size="lg">Large</EvolutionStablesButton>
<EvolutionStablesButton size="icon" aria-label="Icon">
  {/* Icon content */}
</EvolutionStablesButton>
```

## Design Tokens Used

The component uses the following CSS variables from the Evolution Stables design system:

- `--color-background`: `#09090b` (Velvet Night)
- `--color-surface`: `#0a0a0a` (Elevated Surface)
- `--color-foreground`: `#f5f5f5` (Primary Text)
- `--color-muted`: `#a1a1aa` (Secondary Text)
- `--brand-gold`: `#d4a964` (The ONLY Accent)
- `--color-border`: `rgba(255,255,255,0.06)` (Subtle Dividers)

## Institutional Minimalism Compliance

This button adheres to the Institutional Minimalism principles outlined in DESIGN.md:

- **Color**: Strictly limited palette with Velvet Night backgrounds and Gold accents only
- **Typography**: Uses system fonts that align with Inter Tight for UI elements
- **Layout**: Clean, precise spacing with appropriate padding and sizing
- **Philosophy**: Quiet confidence through high-contrast clarity and structural trust