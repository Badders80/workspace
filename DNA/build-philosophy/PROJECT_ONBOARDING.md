# Project Onboarding

> How to add a new project to the Evolution workspace.

## Rule

Nothing is added without a home in the structure.

## Steps

### 1. Scaffold the project

```bash
cd /home/evo/workspace
bash _scripts/new-project.sh <ProjectName> <domain> <description>
```

Example:
```bash
bash _scripts/new-project.sh Evolution_API api "Internal API gateway for ecosystem services"
```

This creates:
- `projects/Evolution_API/` from `_template/`
- `orchestration/streams/api/` (STATE, MEMORY_LOG, ROADMAP)
- `orchestration/roles/PM_API.md`
- Entry in `MANIFEST.md`
- `.env` symlink to central vault

### 2. Customize the project

Edit the generated files:
- `projects/Evolution_API/README.md` — add project-specific details
- `projects/Evolution_API/Justfile` — add real build commands
- `orchestration/streams/api/STATE.md` — set current truth
- `orchestration/roles/PM_API.md` — set domain focus

### 3. Register in conventions

If the project has markdown files that agents should discover, add them to:
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`

### 4. Verify

```bash
cd /home/evo/workspace/projects/Evolution_API
just check
```

### 5. Update bootstrap

If the new project changes workspace topology, update:
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`

## What Every Project Must Have

| File | Purpose |
|------|---------|
| `README.md` | Project overview + Context Chain + ecosystem awareness |
| `AGENTS.md` | Project-level agent rules |
| `CLAUDE.md` | Claude-specific overrides |
| `Justfile` | Build commands including `just check` |
| `.gitignore` | Ignore node_modules, .env, build artifacts |
| `.env` | Symlink to `/home/evo/.env` (central vault) |

## What the Ecosystem Creates For You

| File | Location | Purpose |
|------|----------|---------|
| `PM_<DOMAIN>.md` | `orchestration/roles/` | Product Manager operating contract |
| `STATE.md` | `orchestration/streams/<domain>/` | Current domain truth |
| `MEMORY_LOG.md` | `orchestration/streams/<domain>/` | Session history |
| `ROADMAP.md` | `orchestration/streams/<domain>/` | Future work |
| `MANIFEST.md` entry | Workspace root | Project registry |

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
