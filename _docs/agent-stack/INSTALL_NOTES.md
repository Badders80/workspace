# Install Notes

Updated: 2026-04-06

## Scope

Install the Paperclip + OpenFang stack as a workspace-side operating layer
under `/home/evo/workspace/_sandbox/agent-stack/`.

Do not install it under `projects/` and do not treat `/home/evo/` as the
source of truth.

## Verified Baseline

- `just check` was green before this scaffold work started.
- `just 1.21.0` is available in WSL.
- `paperclipai@2026.325.0` resolves through `npx`.
- Interactive shells expose:
  - `node v20.20.1`
  - `pnpm 10.32.1`
- Non-interactive shells currently do not expose `node` or `pnpm` until `nvm`
  is loaded.
- No listeners were reported on ports `3100` or `4200` during the preflight
  recheck in this session.
- The official Ollama Linux release `v0.20.2` is installed locally for the
  WSL-only inference path.
- OpenFang latest release `v0.5.7` was published on 2026-03-31, but its GitHub
  release currently has no binary assets attached. The latest installable
  official Linux tarball is `v0.5.6`, and that binary currently reports
  `openfang 0.5.5`.

## Required Workarounds

Use `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh` for any
non-interactive Node or pnpm launch. This keeps the first install path stable
without rewriting shell startup yet.

Examples:

```bash
/home/evo/workspace/_sandbox/agent-stack/with-node20.sh node -v
/home/evo/workspace/_sandbox/agent-stack/with-node20.sh pnpm -v
```

As of 2026-04-06, `with-node20.sh` also intercepts `paperclipai` launches and
routes them through `/home/evo/workspace/_sandbox/agent-stack/paperclip-local.sh`.
That local runtime pins `jsdom@27.0.1` and `cssstyle@5.3.7` because the current
transient `npx paperclipai` dependency graph can crash on startup with
`ERR_REQUIRE_ASYNC_MODULE`.

Paperclip also needs to be detached into its own session when launched from a
one-shot `wsl.exe` shell, otherwise it can bind to `3100` and then disappear as
the launching shell exits. Use:

```bash
/home/evo/workspace/_sandbox/agent-stack/paperclip-trial.sh start
```

The Codex sandbox shim at `C:\Users\Evo\.codex\.sandbox-bin\codex` can also
arrive with Windows CRLF line endings, which breaks Linux execution with
`/usr/bin/env: 'bash\r': No such file or directory`. The sidecar wrapper now
generates a Linux-safe `codex` shim under
`/home/evo/workspace/_sandbox/agent-stack/.sandbox-bin-linux/` and puts it
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

1. Ollama first.
2. Prove one direct local model call plus GPU offload.
3. Configure OpenFang with explicit manual routes.
4. Prove each route independently.
5. Connect OpenFang into Paperclip as the only executor.

## Planned First Proofs

1. Ollama: one direct local model call through `127.0.0.1:11434`.
2. Ollama: confirm the active model offloads to the NVIDIA GPU inside WSL.
3. OpenFang: one Hand active on the local Ollama route, then prove wake ->
   execute -> report.
4. Paperclip: onboard Evolution Stables and set the company monthly budget
   field to `0` cents so it matches the trial daily cap of `0`.
5. Integration: prove ticket raised -> OpenFang heartbeat -> work completes ->
   result logged.

## Current Status

- Folder scaffold: done.
- Wrapper script: done.
- WSL-only Ollama install: done.
- Ollama runtime libraries copied into the sidecar under `ollama/lib/ollama`:
  done.
- Ollama daemon boot on `127.0.0.1:11434`: verified.
- Ollama model store at `/home/evo/workspace/models/ollama`: verified.
- Local model `qwen3:14b`: pulled and callable.
- GPU offload on the RTX 3060 inside WSL: verified.
- Windows Ollama installer processes and downloaded installer: removed.
- OpenFang install: done.
- OpenFang init: done.
- OpenFang manual route split (`local`, `openrouter`, `groq`): done.
- OpenFang local route proof with local embeddings and no hosted provider
  bleed-through: verified.
- OpenFang hosted route proof for `openrouter` and `groq`: verified at config
  and key-isolation level.
- Paperclip onboard: done.
- Paperclip local UI on `127.0.0.1:3100`: verified.
- Trial operator budget cap: set to `0`.
- Paperclip company creation: done.
- Paperclip company `budgetMonthlyCents = 0`: verified.
- Paperclip company agents currently provisioned with `adapterType: codex_local`:
  verified.
- OpenFang wired as the live Paperclip executor: not yet.

## Known Blockers

- Current Paperclip docs describe company and agent budgets as monthly
  `budgetMonthlyCents`, not daily caps. Daily limits will need to be enforced
  as an operator rule or mapped onto a conservative monthly cap until a better
  control exists. For this trial, the mapped target is `0` cents on the first
  company record.
- The local Paperclip data layer exists and the UI now stays up when launched
  through `paperclip-trial.sh`, and the first company is present with
  `budgetMonthlyCents = 0`, but the live agent adapter path still points
  directly at `codex_local` instead of OpenFang.
- `local` is now intentionally isolated, but hosted route choice remains a
  human action. There is no automatic fallback chain yet.

## Current Local Runtime

The sanctioned local inference runtime for this sidecar is now:

- Ollama binary:
  `/home/evo/workspace/_sandbox/agent-stack/ollama/bin/ollama`
- Ollama runtime libs:
  `/home/evo/workspace/_sandbox/agent-stack/ollama/lib/ollama`
- model store:
  `/home/evo/workspace/models/ollama`
- daemon bind:
  `127.0.0.1:11434`
- proven default model:
  `qwen3:14b`
- log file:
  `/home/evo/workspace/_logs/agent-stack/ollama-serve.log`

The current proof state is:

- direct local API call: verified
- deterministic exact-string response: verified
- CUDA discovery in WSL: verified
- full model offload to GPU: verified

## OpenFang Manual Routes

OpenFang now supports three explicit manual routes through:

- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route groq`

The launcher prints the active route and config file on `route show` and
`status`, and rewrites the active OpenFang `secrets.env` so only the selected
provider key remains available to the kernel.

Current route files:

- `openfang/state/routes/local.toml`
- `openfang/state/routes/openrouter.toml`
- `openfang/state/routes/groq.toml`

Operating rule:

- `local` never silently falls through to hosted.
- `openrouter` and `groq` are deliberate human selections.
- Automatic fallback is deferred until the sidecar earns enough trust.

Before Paperclip reconnection:

1. Keep the documented `~/.openfang` symlink target, but treat the workspace
   sidecar directory as the only source of truth.
2. Keep the launcher route-driven and fail-closed per selected route.
3. Prove one deterministic prompt through OpenFang on the `local` route
   against WSL Ollama.
4. Prove one deterministic prompt through OpenFang on the intended hosted route
   for this trial phase.
5. Decide which route should be active before Paperclip is started.
6. Reconnect Paperclip only after the chosen route behaves predictably.

Current runtime truth:

- The first company exists: `Evolution Stables`
- The company budget is stamped to `0` cents
- The current Paperclip agents (`CEO`, `FoundingEngineer`) run through
  `codex_local`
- OpenFang remains a validated sidecar runtime, not the active Paperclip
  execution adapter

If the Telegram channel is needed later, add `TELEGRAM_BOT_TOKEN` back into the
route-managed secrets flow before enabling that channel.
   before touching ticket orchestration.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
