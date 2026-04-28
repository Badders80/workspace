# Research Vault Home

This is the working home for the sidecar research layer.

## Core Surfaces

- [[index]] — master catalog of all wiki pages
- [[log]] — append-only operation log
- [[AGENT]] — the vault's operating system (brain's constitution)
- [[raw/inbox/Capture Inbox]]
- [[SCHEMA]]
- [[OBSIDIAN_SETUP]]
- [[wiki/reviews/Review Queue]]
- [[wiki/reports/CEO Report - Latest]]
- [[wiki/reports/CTO Report - Latest]]

## Seeded Sources

- [[raw/sources/tokinvest_capital/last-6-months]]
- [[raw/sources/evolutionstables_website/last-6-months]]
- [[raw/sources/tokinvest_cap_x/source-profile]]
- [[raw/sources/evolutionstable_x/source-profile]]
- [[raw/sources/alex-baddeley_linkedin/source-profile]]
- [[raw/sources/evolution_linkedin_admin/source-profile]]

## Folder Map (Karpathy LLM Wiki Pattern)

- `raw/` — immutable source documents. AI reads, never modifies.
  - `raw/inbox/` — fresh captures waiting to be ingested
  - `raw/sources/` — curated source notes (websites, socials, publications)
  - `raw/bootstrap/` — workspace docs used to seed the wiki
- `wiki/` — AI-generated knowledge base. Append-only, never overwritten.
  - `wiki/entities/` — people, companies, brands, projects, regulators
  - `wiki/topics/` — cross-cutting themes (tokenization, regulation, competitors)
  - `wiki/reviews/` — role-based filters and review queues
  - `wiki/reports/` — readable current reports
  - `wiki/promoted/` — research outputs promoted upward
  - `wiki/_templates/` — note templates
- `index.md` — master catalog of all wiki pages
- `log.md` — append-only record of all ingest, query, and lint operations
- `AGENT.md` — the vault's operating system (brain's constitution)

## Guardrails

- Research can flow toward DNA, but DNA does not depend on research.
- Tags support discovery; folders, note types, and frontmatter carry structure.
- No crawler or agent should write directly into DNA from this vault.
- Promotion into governed docs is always human-reviewed.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
