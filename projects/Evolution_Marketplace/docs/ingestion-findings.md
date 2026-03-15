# Ingestion Findings

Source pages reviewed on March 11, 2026:

1. [Inspire Racing listing](https://www.inspireracing.co.nz/horse-available/12473/sword-of-state-x-home-alone)
2. [LOVERACING breeding profile](https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx)
3. [B.A.X LTD horse page](https://www.baxltd.com/istoleamanolo)

## Key Findings

- Inspire Racing exposed structured commercial copy including percentage-share pricing and an approximate monthly contribution, but the pricing was expressed as `NZD 3,197 per 2.5% share` rather than directly as price-per-whole-horse-percentage. The seed normalizes this to `NZD 1,278.80 per 1%`.
- Inspire Racing also exposed source media through Prism-hosted image metadata, which was reliable enough to pull into the demo as a local copied asset.
- LOVERACING exposed a breeding-profile page, not a live marketplace page. It supplied pedigree data, birth date, age/sex, and colour, but no availability, commercial terms, or investor workflow fields.
- B.A.X LTD exposed lease/share language and monthly fees by share size, but no explicit upfront valuation. The seed therefore uses manual NZD pricing assumptions while preserving the source attribution and lease-style notes.
- B.A.X LTD exposed an `og:image` asset that was reliable enough to copy into the demo set locally.

## Normalization Issues

- pricing structure mismatch: some pages expose per-share pricing, some only monthly fees, and some no commercial terms at all
- sale vs profile mismatch: the LOVERACING page is informational pedigree data rather than an active offering
- lease vs ownership mismatch: B.A.X uses lease-share wording that does not map neatly to outright ownership stakes
- trainer/vendor inconsistency: trainer and vendor names appear in different places and formats across sources
- imagery stability: Inspire Racing and B.A.X exposed usable image assets, but LOVERACING did not provide a horse-specific image on the reviewed page, so the seed set still mixes pulled-through source media with a fallback placeholder
- selector brittleness: page structures differ substantially, so scraping would be fragile without a dedicated ingestion pipeline

## MVP Decision

- Manual listing creation remains the primary supported ingestion path.
- Optional enrichment from public pages is treated as demo assistance only.
- The three required demo horses are included with source attribution notes and normalized fallback assumptions where source data was incomplete.
