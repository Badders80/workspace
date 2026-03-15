insert into public.profiles (
  id,
  role,
  display_name,
  email,
  company_name,
  preferred_display_currency,
  onboarding_complete
)
values
  ('11111111-1111-4111-8111-111111111111', 'owner', 'Inspire Racing', 'owners@inspireracing.example', 'Inspire Racing', 'NZD', true),
  ('22222222-2222-4222-8222-222222222222', 'owner', 'Evolution Demo Syndication', 'owners@evolutiondemo.example', 'Evolution Demo Syndication', 'NZD', true),
  ('33333333-3333-4333-8333-333333333333', 'owner', 'B.A.X LTD', 'owners@baxltd.example', 'B.A.X LTD', 'NZD', true)
on conflict (id) do nothing;

insert into public.horses (
  id,
  slug,
  name,
  sire,
  dam,
  damsire,
  sex,
  foaled_on,
  colour,
  trainer_name,
  vendor_name,
  location,
  overview,
  pedigree_notes,
  highlight_text,
  source_reference_label,
  source_reference_url,
  source_notes
)
values
  (
    'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa',
    'sword-of-state-x-home-alone',
    'Sword of State x Home Alone',
    'Sword of State',
    'Home Alone',
    'O''Reilly',
    'colt',
    '2024-10-08',
    null,
    'Allan Sharrock',
    'Inspire Racing',
    'New Zealand',
    'An athletic colt with physical scope and a pedigree that blends precocity with New Zealand staying depth through the female line.',
    'The source references O''Reilly and Zabeel through the female family and positions the colt as a 1200m-1600m profile.',
    'Outstanding value colt by a rapidly ascending young sire.',
    'Inspire Racing listing',
    'https://www.inspireracing.co.nz/horse-available/12473/sword-of-state-x-home-alone',
    'Commercial terms were partly structured on-page and partly prose. A local placeholder image is used for the demo seed.'
  ),
  (
    'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb',
    'first-gear-nz-2021',
    'First Gear (NZ)',
    'Derryn (AUS)',
    'A''Guin Ace (NZ)',
    null,
    'gelding',
    '2021-10-02',
    'Bay',
    null,
    'Evolution Demo Syndication',
    'New Zealand',
    'A deliberately synthetic marketplace record used to validate normalization when the source is a breeding or stud-book profile rather than a live offering.',
    'The underlying source surfaced birth date, colour, sex, sire, and dam but no listing or commercial intent.',
    'Synthetic fallback listing derived from a non-commercial source page.',
    'LOVERACING breeding profile',
    'https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx',
    'This seed carries pedigree data from a breeding profile while manually supplying marketplace economics for the MVP demo.'
  ),
  (
    'cccccccc-3333-4333-8333-cccccccccccc',
    'i-stole-a-manolo',
    'I Stole A Manolo',
    'Satono Aladdin',
    'Canuhandleajandal',
    'Jimmy Choux',
    'filly',
    null,
    null,
    'Wexford Stables',
    'B.A.X LTD',
    'New Zealand',
    'A smart, scopey filly with educational work completed and an ownership story shaped more like a managed lease-share than a disclosed outright sale.',
    'The source references a physically athletic type and close relatives including Aspen Colorado and Canuhandleajandal.',
    'Lease-share commercial language normalized for marketplace consistency.',
    'B.A.X LTD horse page',
    'https://www.baxltd.com/istoleamanolo',
    'Monthly fee data was usable, but valuation and image access were not stable enough to rely on directly for the demo seed.'
  )
on conflict (id) do nothing;

insert into public.listings (
  id,
  horse_id,
  owner_profile_id,
  slug,
  headline,
  summary,
  status,
  percentage_available,
  price_per_percentage_nzd,
  minimum_purchase_percentage,
  estimated_monthly_fee_nzd,
  offering_structure,
  offer_notes,
  published_at
)
values
  (
    'dddddddd-1111-4111-8111-dddddddddddd',
    'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa',
    '11111111-1111-4111-8111-111111111111',
    'sword-of-state-x-home-alone',
    'Sword of State x Home Alone',
    'A value-led colt placement with strong Australasian sire momentum, Sharrock training, and a low-friction entry point for new owners.',
    'published',
    25.00,
    1278.80,
    1.00,
    38.80,
    'equity-stake',
    'Source pricing was published as NZD 3,197 per 2.5 percent share. The seed normalizes this to whole-horse percentage pricing.',
    timezone('utc', now())
  ),
  (
    'eeeeeeee-2222-4222-8222-eeeeeeeeeeee',
    'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb',
    '22222222-2222-4222-8222-222222222222',
    'first-gear-nz-2021',
    'First Gear (NZ) 2021',
    'A manually normalized demo listing built from breeding-profile data to test non-commercial source ingestion and fallback offer mechanics.',
    'published',
    20.00,
    980.00,
    2.50,
    42.00,
    'synthetic-demo',
    'LOVERACING exposes pedigree data but no sale pricing or availability. Commercial terms here are synthetic and clearly marked as demo-only.',
    timezone('utc', now())
  ),
  (
    'ffffffff-3333-4333-8333-ffffffffffff',
    'cccccccc-3333-4333-8333-cccccccccccc',
    '33333333-3333-4333-8333-333333333333',
    'i-stole-a-manolo',
    'I Stole A Manolo',
    'A 2YO filly profile carrying lease-share source language, normalized into whole-horse percentage terms for consistent marketplace handling.',
    'published',
    35.00,
    1450.00,
    1.00,
    65.00,
    'lease-share',
    'The source exposed monthly fees by share size but no clear upfront valuation. Upfront NZD pricing is therefore a demo assumption.',
    timezone('utc', now())
  )
on conflict (id) do nothing;

insert into public.listing_media (
  id,
  listing_id,
  kind,
  url,
  alt_text,
  is_cover,
  sort_order
)
values
  ('10101010-1111-4111-8111-101010101010', 'dddddddd-1111-4111-8111-dddddddddddd', 'image', '/demo/inspire-racing.svg', 'Editorial placeholder for Sword of State x Home Alone', true, 0),
  ('20202020-2222-4222-8222-202020202020', 'eeeeeeee-2222-4222-8222-eeeeeeeeeeee', 'image', '/demo/first-gear.svg', 'Editorial placeholder for First Gear (NZ)', true, 0),
  ('30303030-3333-4333-8333-303030303030', 'ffffffff-3333-4333-8333-ffffffffffff', 'image', '/demo/i-stole-a-manolo.svg', 'Editorial placeholder for I Stole A Manolo', true, 0)
on conflict (id) do nothing;

insert into public.listing_documents (
  id,
  listing_id,
  title,
  kind,
  external_url,
  sort_order
)
values
  ('40404040-1111-4111-8111-404040404040', 'dddddddd-1111-4111-8111-dddddddddddd', 'Source Listing', 'source', 'https://www.inspireracing.co.nz/horse-available/12473/sword-of-state-x-home-alone', 0),
  ('50505050-1111-4111-8111-505050505050', 'dddddddd-1111-4111-8111-dddddddddddd', 'Demo Seed Notes', 'offering-brief', '/demo/inspire-racing-notes.txt', 1),
  ('60606060-2222-4222-8222-606060606060', 'eeeeeeee-2222-4222-8222-eeeeeeeeeeee', 'Source Breeding Profile', 'source', 'https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx', 0),
  ('70707070-2222-4222-8222-707070707070', 'eeeeeeee-2222-4222-8222-eeeeeeeeeeee', 'Normalization Notes', 'offering-brief', '/demo/first-gear-notes.txt', 1),
  ('80808080-3333-4333-8333-808080808080', 'ffffffff-3333-4333-8333-ffffffffffff', 'Source Horse Page', 'source', 'https://www.baxltd.com/istoleamanolo', 0),
  ('90909090-3333-4333-8333-909090909090', 'ffffffff-3333-4333-8333-ffffffffffff', 'Demo Seed Notes', 'offering-brief', '/demo/i-stole-a-manolo-notes.txt', 1)
on conflict (id) do nothing;

insert into public.ownership_positions (
  id,
  horse_id,
  profile_id,
  percentage_owned,
  average_cost_nzd
)
values
  ('12121212-1111-4111-8111-121212121212', 'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 100.00, 0),
  ('23232323-2222-4222-8222-232323232323', 'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', 100.00, 0),
  ('34343434-3333-4333-8333-343434343434', 'cccccccc-3333-4333-8333-cccccccccccc', '33333333-3333-4333-8333-333333333333', 100.00, 0)
on conflict (horse_id, profile_id) do nothing;
