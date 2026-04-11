# WSL VS Code Line In The Sand 2026-04-11

## Intent

Stabilize the machine around a Codex-first VS Code workflow on WSL Ubuntu,
reduce remote-extension churn, and align heavier mutable runtime surfaces to
`S:`.

## Findings

- The recurring reconnect loop was not primarily Gemini.
- WSL itself showed repeated instability signals during the session:
  - prior OOM pressure and killed `node` processes
  - `Wsl/Service/E_UNEXPECTED`
  - `InitCreateProcessUtilityVm failed`
  - `UtilBindVsockAnyPort: bind failed 4`
- WSL-side chat extensions were amplifying the problem. Earlier remote exthost
  logs showed both `openai.chatgpt` and `github.copilot-chat` throwing
  `PendingMigrationError`, while Gemini had already been removed from the main
  Windows extension surface.
- Drive placement is mostly correct already:
  - Ubuntu VHDX on `S:\WSL\Ubuntu\ext4.vhdx`
  - large Ollama catalog on `S:\Models\Ollama`
  - active Linux workspace in `/home/evo/workspace`, which is `S:`-backed

## Changes Applied

### WSL config

- Backed up `C:\Users\Evo\.wslconfig`
- Removed mirrored networking
- Increased swap from `6GB` to `12GB`
- Moved the WSL swap file to `S:\WSL\swap.vhdx`

Effective config after this pass:

```ini
[wsl2]
memory=12GB
swap=12GB
swapFile=S:\\WSL\\swap.vhdx
processors=8
kernelCommandLine=cgroup_no_v1=all systemd.unified_cgroup_hierarchy=1

[experimental]
autoMemoryReclaim=gradual
```

### VS Code and remote extension cleanup

- Removed Windows-side `github.copilot-chat`
- Removed Windows-side `codeium.codeium`
- Removed stale WSL-side `github.copilot-chat`
- Removed stale WSL-side `google.gemini-cli-vscode-ide-companion`
- Cleared Copilot Chat global storage on Windows and WSL
- Pruned stale Windows WSL Remote server builds, keeping only the current build
  hash
- Cleared Windows VS Code logs
- Cleared WSL server logs and cached extension VSIX residue

### Post-cleanup remote extension surface

- Windows keeps `openai.chatgpt` and `ms-vscode-remote.remote-wsl`
- WSL remote extension surface now only keeps `openai.chatgpt`

## Verification

- WSL restarted cleanly with `12GiB` swap active and backed by
  `S:\WSL\swap.vhdx`
- Current Windows WSL Remote cache keeps only the active server build
- Fresh WSL exthost startup no longer showed the earlier
  `PendingMigrationError` chain
- Fresh exthost log only showed a stale workspace lock fallback and then normal
  eager activation
- Fresh `code .` launch from `/home/evo/workspace` succeeded after the cleanup

## Ollama Store Reconciliation

- The canonical live local Ollama store remains
  `/home/evo/workspace/models/ollama`.
- The former broader Windows-side catalog at `S:\Models\Ollama\models` was not
  the active runtime and no live Windows Ollama service/process was using it
  during this pass.
- The Windows-side catalog has been converted into an explicit cold archive at
  `S:\Models\Ollama\archive_catalog_2026-04-11`.
- `S:\Models\Ollama\README.txt` now marks the folder as non-live and points the
  operator back to the WSL canonical store.

## Low-Risk Cache Cleanup

- Left `_sandbox` alone by operator choice.
- Cleared rebuildable WSL caches under `/home/evo/.cache`, including the
  largest prior surfaces such as `camoufox`, `uv`, `pnpm`, `node-gyp`, and
  `pip`.
- Cleared rebuildable npm cache surfaces under `/home/evo/.npm`, including
  `_cacache` and `_npx`.
- Pruned stale WSL VS Code workspace-state directories, leaving only the live
  current workspace state.
- Pruned older Windows VS Code workspace-state directories, keeping only the
  recent/current set.

Approximate result from this pass:

- `/home/evo/.cache`: `~2.5G` -> `80K`
- `/home/evo/.npm`: `~1.9G` -> `1.2M`
- WSL VS Code workspace state: reduced to the single current directory
- Windows VS Code workspace state: reduced from `69` directories to `9`

## Deferred Decisions

- Keep `/home/evo/workspace/models/ollama` as the sanctioned live store unless
  the workspace tool registry and decision log are updated together.
- `_sandbox` remains the main VHDX growth surface and should be pruned or
  archived deliberately rather than with blind deletion.

## Next Review Targets

- `/home/evo/workspace/_sandbox/agent-stack`
- `/home/evo/.cache/camoufox`
- `/home/evo/.npm/_cacache`
- `/home/evo/workspace/models/ollama` versus `S:\Models\Ollama`

## Context Chain

- inherits from: `/home/evo/workspace/AGENTS.md`
- supports: `/home/evo/workspace/_docs/system-health/README.md`
- conventions: `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
