# Obsidian Setup

This vault is the intended fresh Obsidian home for the sidecar research layer.

## Open This Vault

For the Windows Obsidian desktop app, open the local mirror:

- `C:\Users\Evo\Research_Vault`

The workspace-native canonical copy still lives at:

- `/home/evo/workspace/research_vault`

Windows Obsidian is using the local mirror because direct file watching on the WSL UNC path was not stable.

## First Notes To Open

- [[HOME]]
- [[00_Inbox/Capture Inbox]]
- [[05_Reports/CEO Report - Latest]]
- [[05_Reports/CTO Report - Latest]]

## Intended Use

- `research_vault/` is the tracked canonical source for this research layer.
- Obsidian is the human-facing sidecar over that tracked content.
- This vault is a tracked sidecar, not DNA.
- Use this vault for capture, normalization, tagging, and review.
- Promote upward only after human review.

## Suggested First Workflow

1. Open [[HOME]] and pin it.
2. Use [[00_Inbox/Capture Inbox]] for quick manual notes.
3. Normalize important items with [[_templates/Normalized Note]].
4. Review signal in [[05_Reports/CEO Report - Latest]] and [[05_Reports/CTO Report - Latest]].

## Sync Workflow

- Before opening or after workspace-side changes: `just research-vault-pull`
- After making edits in Obsidian that you want back in the workspace: `just research-vault-push`

## Working Rule

- The tracked workspace copy at `/home/evo/workspace/research_vault` remains the citation and governance authority.
- The Windows mirror at `C:\Users\Evo\Research_Vault` is an operating convenience for Obsidian, not a second source of truth.
- OpenFang and any future semantic retrieval helpers should cite tracked files directly rather than runtime memory or mirror-only state.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
