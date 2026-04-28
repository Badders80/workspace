# Research Note Schema

Use normalized notes to keep research comparable, searchable, and ready for review.

> **Primary schema:** See [[AGENT]] for the vault's operating system, workflows, and provenance rules. This file defines frontmatter conventions only.

## Core Frontmatter

```yaml
---
note_type: normalized_note
status: raw
source_type: website
source_title:
source_url:
author:
captured_at:
published_at:
entities: []
topics: []
confidence: 0.5
review_roles:
  - CEO
  - CTO
tags: []
promotion_candidate: false
---
```

## Recommended Status Values

- `raw` - captured but not yet cleaned up
- `normalized` - in standard structure and ready for review
- `reviewed` - reviewed by at least one role
- `promoted` - explicitly lifted into a governed output
- `archived` - kept for memory but not active

## Recommended Note Types

- `manual_capture`
- `normalized_note`
- `source_profile`
- `entity_note`
- `topic_note`
- `review_note`
- `report`

## Minimal Tag Rule

Keep tags lightweight. Start with only a few cross-cutting tags when needed:

- `rwa`
- `racehorse-ownership`
- `investor-relations`
- `regulation`
- `competitor`

If a concept needs lots of detail, promote it to an entity or topic note instead of multiplying tags.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
