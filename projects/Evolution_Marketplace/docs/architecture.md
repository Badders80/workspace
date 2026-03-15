# Architecture

## Surfaces

- `src/app/(public)` contains marketplace browse, listing, and order-ticket surfaces.
- `src/app/(auth)` contains authentication entry points.
- `src/app/(dashboard)` contains protected operational surfaces with a sidebar and topbar shell.

## Module Design

- `src/modules/profiles` handles onboarding shape and profile persistence.
- `src/modules/listings` owns marketplace listing schemas, reads, and writes.
- `src/modules/offers` owns submission, countering, acceptance, and decline logic.
- `src/modules/transactions` owns state updates after acceptance.
- `src/modules/ownership` reads settled ownership positions.
- `src/modules/currency` provides display-only FX conversion beside NZD.
- `src/modules/payments` exposes a manual instruction adapter for the MVP.
- `src/modules/ingestion` holds normalized local demo fixtures and source context.
- `src/modules/auth/demo-session` provides local persona switching for Phase 1 iteration.

## Data Model

- `profiles`: owner and investor identity, preferred display currency, and auth linkage.
- `horses`: normalized horse and source metadata.
- `listings`: offering terms and public status.
- `listing_media` and `listing_documents`: public asset and document references.
- `offers`: investor proposal plus owner counter state on the same record.
- `offer_events`: workflow history trail.
- `transactions`: post-acceptance operational state.
- `ownership_positions`: whole-horse ownership ledger.

## Workflow State

1. Owner creates and publishes a listing.
2. Investor submits an offer in NZD terms.
3. Owner accepts, declines, or counters.
4. Accepted offers generate a transaction in `payment_instruction_required`.
5. Operator advances the transaction through `instructions_sent`, `funds_received`, and `settled`.
6. Settlement trigger updates ownership positions and listing availability.

## Payment Layer

- The MVP uses a manual payment instruction adapter rather than a live processor.
- This keeps transaction-state architecture clean without blocking the build on payment integration.
- A future adapter can replace the manual instruction builder without rewriting listing or offer logic.

## Demo Auth Bypass

- `DEV_AUTH_BYPASS=true` enables local `visitor`, `investor`, and `owner` personas.
- Dashboard access and ticket views can be reviewed without live Supabase auth during Phase 1.
- Demo actions do not persist data; they exist to unblock workflow and UI iteration.

## Public vs Dashboard Split

- Public pages emphasize listing review, filtering, and ticket access.
- Dashboard pages emphasize table/detail/edit flows, operational status, and state transitions.
- This mirrors the requested OpenClaw-style structural separation without borrowing visual identity.
