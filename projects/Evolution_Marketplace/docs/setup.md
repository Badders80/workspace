# Setup

## Local Run

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. For local Phase 1 iteration, leave Supabase values blank and keep `DEV_AUTH_BYPASS=true`.
4. Populate these when you want live auth and persistence:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - optional `SUPABASE_SERVICE_ROLE_KEY`
   - optional display FX snapshot values
5. Apply the schema in [`supabase/migrations/0001_initial_schema.sql`](/home/evo/workspace/projects/Evolution_Marketplace/supabase/migrations/0001_initial_schema.sql).
6. Run the seed script in [`supabase/seed.sql`](/home/evo/workspace/projects/Evolution_Marketplace/supabase/seed.sql).
7. Start the app with `pnpm dev`.

## Supabase Notes

- The app is built for Supabase Auth plus Postgres tables in `public`.
- Profiles use a separate `profiles.id` primary key and an optional `auth_user_id` link to `auth.users`.
- This allows demo seed owner profiles to exist without seeding auth accounts directly.
- Public listing reads are RLS-safe for published listings.
- Ownership updates happen when transactions move to `settled`.

## Demo Mode

- With `DEV_AUTH_BYPASS=true`, the app exposes local `visitor`, `investor`, and `owner` personas.
- Public pages, dashboard routes, and ticket views all work from local demo fixtures without Supabase.
- Mutating actions remain preview-only in demo mode and redirect back with a status message instead of persisting changes.
- The header and dashboard shell include a persona switcher so flows can be reviewed quickly.

## Recommended Verification

1. Switch into `Owner` mode from the header or dashboard shell.
2. Review listing create/edit screens from `/dashboard/listings`.
3. Switch into `Investor` mode.
4. Open a listing and continue into `/marketplace/[slug]/ticket`.
5. Review offer submission, owner response, transaction, and ownership surfaces.
6. Configure Supabase and re-run the same flow when ready for persistence.
