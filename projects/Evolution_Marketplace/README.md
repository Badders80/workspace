# Evolution Marketplace

Evolution Marketplace is a standalone MVP marketplace for New Zealand thoroughbred horse ownership stakes.

It is designed as:

- a Phase 1 functional marketplace core
- public marketplace and ticket surfaces
- owner and investor operational dashboards
- NZD-native listing and offer pricing
- whole-horse percentage accounting
- Supabase-backed auth, data, and seedable demo content

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Supabase Postgres, Auth, and Storage-ready schema
- Modular domain structure for listings, offers, transactions, ownership, currency, and ingestion

## Quick Start

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Run `pnpm dev` for local demo mode with `DEV_AUTH_BYPASS=true`.
4. Add your Supabase values when you want live auth and persistence.
5. Apply [`supabase/migrations/0001_initial_schema.sql`](/home/evo/workspace/projects/Evolution_Marketplace/supabase/migrations/0001_initial_schema.sql).
6. Seed the demo content with [`supabase/seed.sql`](/home/evo/workspace/projects/Evolution_Marketplace/supabase/seed.sql).

If Supabase is not configured yet, the app still runs with local demo fixtures and a local persona switcher so we can iterate on listings, dashboards, and ticket flows without blocking on auth.

## Core Deliverables

- public marketplace browse, listing, and ticket pages
- owner dashboard for listing creation and management
- investor dashboard for offers, transactions, and ownership
- offer accept, decline, and counter workflow
- payment-instruction transaction state
- ownership ledger updates on settlement
- demo auth bypass for local iteration
- normalized demo seed content for the three required horses

## Docs

- Setup: [`docs/setup.md`](/home/evo/workspace/projects/Evolution_Marketplace/docs/setup.md)
- Architecture: [`docs/architecture.md`](/home/evo/workspace/projects/Evolution_Marketplace/docs/architecture.md)
- Ingestion findings: [`docs/ingestion-findings.md`](/home/evo/workspace/projects/Evolution_Marketplace/docs/ingestion-findings.md)
- Future items: [`docs/future-items.md`](/home/evo/workspace/projects/Evolution_Marketplace/docs/future-items.md)

## Verification

Run `pnpm verify` for lint and type checks.
