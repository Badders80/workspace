# AGENTS.md

All agents working in this repository must:

1. Inspect the repository structure before writing code.
2. Produce an implementation plan before major changes.
3. Prefer modular, production-minded architecture.
4. Keep marketplace logic separated from UI presentation where practical.
5. Keep public marketplace pages distinct from authenticated dashboard surfaces.
6. Treat OpenClaw as a dashboard architecture reference only, never a brand/style reference.
7. Avoid unnecessary refactors unrelated to the active task.
8. Keep the product institutional, restrained, and investment-grade.
9. Use NZD as the native asset currency for MVP.
10. Express all ownership/listing percentages as percentages of the total horse.
11. Treat scraping and enrichment as optional demo-ingestion support unless explicitly building a durable ingestion layer.
12. Clearly document assumptions, TODOs, external dependencies, and ingestion limitations.
13. Follow the explicit project phase model and optimize only for the current phase.

## Project Phase Model

Current phase: `Phase 1 - Functional Marketplace Core`

Prioritize:

- listing management
- offer submission
- order ticket flow
- transaction states
- ownership updates
- search and filtering
- dashboard structure
- dev-friendly iteration
- cap-table integrity
- demo data

Do not optimize for:

- marketing copy
- product storytelling
- brand narrative
- landing page messaging
- SEO-oriented public content

In Phase 1, pages should feel like a working marketplace, dashboard, or operations console.
