create extension if not exists pgcrypto;

create type public.app_role as enum ('owner', 'investor', 'admin');
create type public.currency_code as enum ('NZD', 'USD', 'AUD', 'GBP');
create type public.horse_sex as enum ('colt', 'filly', 'gelding', 'horse', 'mare', 'unknown');
create type public.listing_status as enum ('draft', 'review', 'published', 'paused', 'closed', 'sold_out');
create type public.offer_status as enum ('submitted', 'countered', 'accepted', 'declined', 'withdrawn', 'expired');
create type public.transaction_status as enum ('payment_instruction_required', 'instructions_sent', 'funds_received', 'settled', 'cancelled');
create type public.offering_structure as enum ('equity-stake', 'lease-share', 'synthetic-demo');
create type public.media_kind as enum ('image', 'video');
create type public.document_kind as enum ('source', 'offering-brief', 'terms');
create type public.offer_event_type as enum ('submitted', 'countered', 'accepted', 'declined', 'instructions_sent', 'funds_received', 'settled');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  role public.app_role not null,
  full_name text,
  display_name text not null,
  email text,
  company_name text,
  phone text,
  bio text,
  preferred_display_currency public.currency_code not null default 'NZD',
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.horses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sire text,
  dam text,
  damsire text,
  sex public.horse_sex not null default 'unknown',
  foaled_on date,
  colour text,
  trainer_name text,
  vendor_name text,
  location text,
  overview text,
  pedigree_notes text,
  highlight_text text,
  source_reference_label text,
  source_reference_url text,
  source_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null unique,
  headline text not null,
  summary text,
  status public.listing_status not null default 'draft',
  percentage_available numeric(6,2) not null check (percentage_available > 0 and percentage_available <= 100),
  price_per_percentage_nzd numeric(14,2) not null check (price_per_percentage_nzd > 0),
  minimum_purchase_percentage numeric(6,2) not null check (minimum_purchase_percentage > 0 and minimum_purchase_percentage <= 100),
  estimated_monthly_fee_nzd numeric(14,2),
  offering_structure public.offering_structure not null default 'equity-stake',
  offer_notes text,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.listing_media (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  kind public.media_kind not null default 'image',
  url text not null,
  alt_text text,
  is_cover boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.listing_documents (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  title text not null,
  kind public.document_kind not null default 'offering-brief',
  external_url text,
  storage_bucket text,
  storage_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  investor_profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.offer_status not null default 'submitted',
  offered_percentage numeric(6,2) not null check (offered_percentage > 0 and offered_percentage <= 100),
  total_offer_nzd numeric(14,2) not null check (total_offer_nzd > 0),
  fees_nzd numeric(14,2) not null default 0,
  display_currency public.currency_code not null default 'NZD',
  display_currency_rate numeric(14,6),
  display_total_amount numeric(14,2),
  message text,
  reviewed_at timestamptz,
  counter_percentage_of_horse numeric(6,2),
  counter_price_per_percentage_nzd numeric(14,2),
  counter_total_nzd numeric(14,2),
  counter_message text,
  countered_at timestamptz,
  expires_at timestamptz,
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.offer_events (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers(id) on delete cascade,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  event_type public.offer_event_type not null,
  notes text,
  payload jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null unique references public.offers(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  investor_profile_id uuid not null references public.profiles(id) on delete cascade,
  state public.transaction_status not null default 'payment_instruction_required',
  payment_provider text,
  payment_reference text,
  instructions_summary text,
  instruction_due_at timestamptz,
  funds_received_at timestamptz,
  settled_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.ownership_positions (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  percentage_owned numeric(6,2) not null default 0 check (percentage_owned >= 0 and percentage_owned <= 100),
  average_cost_nzd numeric(14,2),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (horse_id, profile_id)
);

create index listings_status_idx on public.listings(status);
create index listings_owner_idx on public.listings(owner_profile_id);
create index offers_owner_idx on public.offers(owner_profile_id);
create index offers_investor_idx on public.offers(investor_profile_id);
create index transactions_owner_idx on public.transactions(owner_profile_id);
create index transactions_investor_idx on public.transactions(investor_profile_id);
create index ownership_positions_profile_idx on public.ownership_positions(profile_id);

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger horses_set_updated_at before update on public.horses for each row execute function public.set_updated_at();
create trigger listings_set_updated_at before update on public.listings for each row execute function public.set_updated_at();
create trigger offers_set_updated_at before update on public.offers for each row execute function public.set_updated_at();
create trigger transactions_set_updated_at before update on public.transactions for each row execute function public.set_updated_at();
create trigger ownership_positions_set_updated_at before update on public.ownership_positions for each row execute function public.set_updated_at();

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.apply_transaction_settlement()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  effective_percentage numeric(6,2);
  effective_total numeric(14,2);
begin
  if new.state = 'settled' and coalesce(old.state::text, '') <> 'settled' then
    select coalesce(counter_percentage_of_horse, offered_percentage),
           coalesce(counter_total_nzd, total_offer_nzd)
      into effective_percentage, effective_total
    from public.offers
    where id = new.offer_id;

    insert into public.ownership_positions (horse_id, profile_id, percentage_owned, average_cost_nzd)
    values (new.horse_id, new.investor_profile_id, effective_percentage, effective_total)
    on conflict (horse_id, profile_id)
    do update set
      percentage_owned = public.ownership_positions.percentage_owned + excluded.percentage_owned,
      average_cost_nzd = coalesce(public.ownership_positions.average_cost_nzd, 0) + coalesce(excluded.average_cost_nzd, 0),
      updated_at = timezone('utc', now());

    insert into public.ownership_positions (horse_id, profile_id, percentage_owned, average_cost_nzd)
    values (new.horse_id, new.owner_profile_id, greatest(100 - effective_percentage, 0), 0)
    on conflict (horse_id, profile_id)
    do update set
      percentage_owned = greatest(public.ownership_positions.percentage_owned - effective_percentage, 0),
      updated_at = timezone('utc', now());

    update public.listings
    set percentage_available = greatest(percentage_available - effective_percentage, 0),
        status = case
          when greatest(percentage_available - effective_percentage, 0) <= 0 then 'sold_out'
          else status
        end,
        updated_at = timezone('utc', now())
    where id = new.listing_id;

    insert into public.offer_events (offer_id, actor_profile_id, event_type, notes)
    values (new.offer_id, new.owner_profile_id, 'settled', 'Transaction settled and ownership ledger updated.');
  end if;

  return new;
end;
$$;

create trigger transactions_apply_settlement
after update on public.transactions
for each row execute function public.apply_transaction_settlement();

alter table public.profiles enable row level security;
alter table public.horses enable row level security;
alter table public.listings enable row level security;
alter table public.listing_media enable row level security;
alter table public.listing_documents enable row level security;
alter table public.offers enable row level security;
alter table public.offer_events enable row level security;
alter table public.transactions enable row level security;
alter table public.ownership_positions enable row level security;

create policy "profiles_select_self" on public.profiles for select to authenticated using (auth_user_id = auth.uid());
create policy "profiles_insert_self" on public.profiles for insert to authenticated with check (auth_user_id = auth.uid());
create policy "profiles_update_self" on public.profiles for update to authenticated using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());

create policy "horses_public_published"
on public.horses
for select
using (exists (select 1 from public.listings where listings.horse_id = horses.id and listings.status = 'published'));

create policy "horses_insert_authenticated"
on public.horses
for insert
to authenticated
with check (public.current_profile_id() is not null);

create policy "horses_update_owned_listing"
on public.horses
for update
to authenticated
using (exists (select 1 from public.listings where listings.horse_id = horses.id and listings.owner_profile_id = public.current_profile_id()))
with check (exists (select 1 from public.listings where listings.horse_id = horses.id and listings.owner_profile_id = public.current_profile_id()));

create policy "listings_public_published" on public.listings for select using (status = 'published');
create policy "listings_owner_select" on public.listings for select to authenticated using (owner_profile_id = public.current_profile_id());
create policy "listings_owner_insert" on public.listings for insert to authenticated with check (owner_profile_id = public.current_profile_id());
create policy "listings_owner_update" on public.listings for update to authenticated using (owner_profile_id = public.current_profile_id()) with check (owner_profile_id = public.current_profile_id());

create policy "listing_media_public_published"
on public.listing_media
for select
using (exists (select 1 from public.listings where listings.id = listing_media.listing_id and listings.status = 'published'));

create policy "listing_media_owner_manage"
on public.listing_media
for all
to authenticated
using (exists (select 1 from public.listings where listings.id = listing_media.listing_id and listings.owner_profile_id = public.current_profile_id()))
with check (exists (select 1 from public.listings where listings.id = listing_media.listing_id and listings.owner_profile_id = public.current_profile_id()));

create policy "listing_documents_public_published"
on public.listing_documents
for select
using (exists (select 1 from public.listings where listings.id = listing_documents.listing_id and listings.status = 'published'));

create policy "listing_documents_owner_manage"
on public.listing_documents
for all
to authenticated
using (exists (select 1 from public.listings where listings.id = listing_documents.listing_id and listings.owner_profile_id = public.current_profile_id()))
with check (exists (select 1 from public.listings where listings.id = listing_documents.listing_id and listings.owner_profile_id = public.current_profile_id()));

create policy "offers_participants_select"
on public.offers
for select
to authenticated
using (owner_profile_id = public.current_profile_id() or investor_profile_id = public.current_profile_id());

create policy "offers_investor_insert"
on public.offers
for insert
to authenticated
with check (investor_profile_id = public.current_profile_id());

create policy "offers_participants_update"
on public.offers
for update
to authenticated
using (owner_profile_id = public.current_profile_id() or investor_profile_id = public.current_profile_id())
with check (owner_profile_id = public.current_profile_id() or investor_profile_id = public.current_profile_id());

create policy "offer_events_participants_select"
on public.offer_events
for select
to authenticated
using (exists (select 1 from public.offers where offers.id = offer_events.offer_id and (offers.owner_profile_id = public.current_profile_id() or offers.investor_profile_id = public.current_profile_id())));

create policy "offer_events_participants_insert"
on public.offer_events
for insert
to authenticated
with check (exists (select 1 from public.offers where offers.id = offer_events.offer_id and (offers.owner_profile_id = public.current_profile_id() or offers.investor_profile_id = public.current_profile_id())));

create policy "transactions_participants_select"
on public.transactions
for select
to authenticated
using (owner_profile_id = public.current_profile_id() or investor_profile_id = public.current_profile_id());

create policy "transactions_participants_update"
on public.transactions
for update
to authenticated
using (owner_profile_id = public.current_profile_id() or investor_profile_id = public.current_profile_id())
with check (owner_profile_id = public.current_profile_id() or investor_profile_id = public.current_profile_id());

create policy "transactions_owner_insert"
on public.transactions
for insert
to authenticated
with check (owner_profile_id = public.current_profile_id());

create policy "ownership_positions_select_self"
on public.ownership_positions
for select
to authenticated
using (profile_id = public.current_profile_id());

create policy "ownership_positions_manage_self"
on public.ownership_positions
for all
to authenticated
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());
