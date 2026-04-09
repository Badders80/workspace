# Install Notes

Updated: 2026-04-09

## Scope

These notes govern the active OpenFang + Ollama sidecar under
`/home/evo/workspace/_sandbox/agent-stack/`.

Do not install it under `projects/` and do not treat `/home/evo/` as the
source of truth.

Paperclip is no longer part of the live install surface. Its runtime, launchers,
and operator docs were archived on 2026-04-09 to
`/home/evo/_archive/agent-stack/2026-04-09/`.

## Verified Baseline

- `just check` was green before the Paperclip retirement pass began.
- `just 1.21.0` is available in WSL.
- Interactive shells expose:
  - `node v20.20.1`
  - `pnpm 10.32.1`
- Non-interactive shells still need `nvm` loaded explicitly.
- The official Ollama Linux release `v0.20.2` is installed locally for the
  WSL-only inference path.
- OpenFang latest release `v0.5.7` was published on 2026-03-31, but its GitHub
  release still has no Linux binary assets attached. The latest installable
  official Linux tarball remains `v0.5.6`, and that binary currently reports
  `openfang 0.5.5`.

## Required Workarounds

Use `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh` for any
non-interactive Node or pnpm launch. This keeps the install path stable without
rewriting shell startup.

Examples:

```bash
/home/evo/workspace/_sandbox/agent-stack/with-node20.sh node -v
/home/evo/workspace/_sandbox/agent-stack/with-node20.sh pnpm -v
```

The Codex sandbox shim at `C:\Users\Evo\.codex\.sandbox-bin\codex` can arrive
with Windows CRLF line endings, which breaks Linux execution with
`/usr/bin/env: 'bash\r': No such file or directory`. The sidecar wrapper
generates Linux-safe `codex` and `git` shims under
`/home/evo/workspace/_sandbox/agent-stack/.sandbox-bin-linux/` and puts them
ahead of the Windows shim in `PATH`.

For the WSL-local Ollama path, copying only the `ollama` binary is not enough.
The manual install must also copy the bundled runtime tree under:

- `/home/evo/workspace/_sandbox/agent-stack/ollama/lib/ollama`

Without that library tree, Ollama can boot and serve models but fall back to
CPU-only inference because the CUDA backend is missing from the sidecar install.

## OpenFang Path Workaround

The current OpenFang CLI accepts `--config`, but `openfang init --quick` still
writes its primary state to `~/.openfang`.

To keep `/home/evo/workspace` as the source of truth, the path is documented and
redirected as a symlink:

- `/home/evo/.openfang -> /home/evo/workspace/_sandbox/agent-stack/openfang/state`

This preserves the CLI's default path expectations while keeping the real state
inside the workspace sidecar.

## Install Order

1. Install or verify Ollama first.
2. Prove one direct local model call plus GPU offload.
3. Install or verify OpenFang under the sidecar.
4. Configure OpenFang with explicit manual routes.
5. Install or refresh tracked hands from `_docs/openfang-wizard/`.
6. Prove each intended route independently before daily use.

## Current Status

- Folder scaffold: done.
- Wrapper script: done.
- WSL-only Ollama install: done.
- Ollama runtime libraries copied into the sidecar under `ollama/lib/ollama`:
  done.
- Ollama daemon boot on `127.0.0.1:11434`: verified.
- Ollama model store at `/home/evo/workspace/models/ollama`: verified.
- Local proof model `qwen3:14b`: pulled and callable through the direct API.
- GPU offload on the RTX 3060 inside WSL: verified.
- OpenFang install: done.
- OpenFang local default route `ollama/qwen3.5:latest`: verified.
- OpenFang local specialist routes `local-debug` and `local-audit`: verified.
- OpenFang hosted review lanes `openrouter-qwen`, `openrouter-nemotron`,
  `openrouter-glm`, and `groq`: configured and available through explicit route
  selection.
- Paperclip live surface: retired and archived.
- Duplicate `_sandbox/openfang-wizard/` surface: retired and archived so
  `_docs/openfang-wizard/` remains the tracked source of truth.

## Current Local Runtime

The sanctioned local inference runtime for this sidecar is:

- Ollama binary:
  `/home/evo/workspace/_sandbox/agent-stack/ollama/bin/ollama`
- Ollama runtime libs:
  `/home/evo/workspace/_sandbox/agent-stack/ollama/lib/ollama`
- model store:
  `/home/evo/workspace/models/ollama`
- daemon bind:
  `127.0.0.1:11434`
- direct proof model:
  `qwen3:14b`
- OpenFang daily default route:
  `ollama/qwen3.5:latest`
- log file:
  `/home/evo/workspace/_logs/agent-stack/ollama-serve.log`

## OpenFang Manual Routes

OpenFang route selection remains explicit:

- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local-debug`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local-audit`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter-qwen`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter-nemotron`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter-glm`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route groq`

Operating rule:

- `local` is the daily default and never silently falls through to hosted.
- Hosted routes are deliberate human selections for bounded review or audit work.
- Automatic fallback is deferred until the sidecar earns enough trust.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
