# Asset Library

Workspace-local entrypoint for the recovered Evolution asset sources.

## Purpose

- Pull the recovered raw bundle out of `_archive` into a stable workspace location.
- Surface the active content-factory assets and live platform image copy beside it.
- Store the file-level mapping reports that show what is unique, duplicated, and canonical by category.

## Structure

```text
library/
├── originals/
│   ├── brand_originals/
│   ├── website_source_images/
│   ├── press_assets/
│   ├── review_hold/
│   └── migration_reports/
├── working/
│   ├── content_factory_assets -> /mnt/s/Evolution-Content-Factory/assets
│   ├── content_factory_brand -> /mnt/s/Evolution-Content-Factory/assets/brand
│   └── content_factory_horses -> /mnt/s/Evolution-Content-Factory/assets/horses
├── distribution/
│   └── platform_public_images -> projects/Evolution_Platform/public/images
├── quick-access/
└── _reports/
```

## Quick Access

The `quick-access/` folder contains symlinks to the current source locations:

- `raw_bundle` -> `originals/`
- `brand_originals` -> original logo, monogram, font, and favicon files
- `website_source_images` -> raw website imagery bundle
- `press_assets` -> recovered press logos/images
- `keep_review` -> loose media kept with the source bundle
- `migration_reports` -> reports from the original March 2026 recovery batch
- `content_factory_assets` -> structured working library on `S:`
- `content_factory_brand` -> working brand subset on `S:`
- `content_factory_horses` -> horse media on `S:`
- `live_platform_images` -> deployed/public image copy used by `Evolution_Platform`

## Canonical Mapping

Use these source-of-truth rules when deciding where an asset belongs:

- Brand originals: `originals/brand_originals`
- Website source photography/design files: `originals/website_source_images`
- Press kit assets: `originals/press_assets`
- Review-only loose files: `originals/review_hold`
- Working generated content, overlays, templates, horse media: `working/content_factory_assets`
- Live deploy copy only: `distribution/platform_public_images`

The live platform folder should be treated as a distribution copy, not the primary source, unless a file only exists there.

The archive copy remains at `/home/evo/workspace/_archive/root-cleanup/2026-03-10/_media_staging/official_review/AB_porposed` as historical provenance only.

## Reports

Generated reports live in `_reports/`:

- `source_summary.tsv` -> counts by source
- `inventory.tsv` -> one row per file
- `asset_map.tsv` -> one row per unique file hash with canonical path selection
- `unique_by_source.tsv` -> assets present in only one source
- `name_collisions.tsv` -> same filename but different content across sources
- `summary.json` -> machine-readable aggregate summary

Rebuild the reports with:

```bash
python3 /home/evo/workspace/_scripts/asset_library_map.py
```
