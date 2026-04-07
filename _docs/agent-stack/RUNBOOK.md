# Runbook

Updated: 2026-04-06

## Startup Order

1. Run `just check`.
2. Confirm the active write scope still matches `ALLOWLIST_POLICY.md`.
3. Start Ollama from the sidecar launcher:

```bash
/home/evo/workspace/_sandbox/agent-stack/ollama-trial.sh start
```

4. Verify the local model store and daemon state:

```bash
/home/evo/workspace/_sandbox/agent-stack/ollama-trial.sh status
```

5. Select the OpenFang route explicitly before startup:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local
```

Alternative hosted routes:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route groq
```

6. After the route is selected, start OpenFang from the sidecar launcher:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh start
```

7. Start Paperclip through the trial launcher:

```bash
/home/evo/workspace/_sandbox/agent-stack/paperclip-trial.sh start
```

8. Confirm OpenFang is the only registered executor before opening live work.
   Current runtime truth: this is not yet true. The live Paperclip company
   agents still execute via `codex_local`, so OpenFang checks below validate
   the sidecar only, not the Paperclip dispatch path.

## Ollama-Only Smoke Tests

1. Verify the wrapper resolves Node 20:

```bash
/home/evo/workspace/_sandbox/agent-stack/with-node20.sh node -v
```

2. Verify Ollama is live on the intended local bind and model store:

```bash
/home/evo/workspace/_sandbox/agent-stack/ollama-trial.sh status
```

3. Verify the local model inventory:

```bash
/home/evo/workspace/_sandbox/agent-stack/ollama/bin/ollama list
```

4. Verify one deterministic local API call:

```bash
curl -s http://127.0.0.1:11434/api/generate \
  -d '{"model":"qwen3:14b","prompt":"Reply with exactly: GPU_OK","stream":false,"options":{"temperature":0}}'
```

5. Verify the Ollama log shows CUDA discovery and full GPU offload for the
active model:

```bash
grep -E 'CUDA0|offloaded 41/41 layers to GPU' /home/evo/workspace/_logs/agent-stack/ollama-serve.log
```

## OpenFang Route Checks

1. Show the current route:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route show
```

2. Verify OpenFang is live on the intended provider and model:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh status
```

3. Verify one bounded Hand is active:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh hand active
```

4. Verify OpenFang can complete one bounded task and report back.
Use an explicit direct prompt. The stock `researcher` hand tends to ask
clarifying questions if the test instruction is vague.

5. Treat the above as OpenFang-only proof unless the Paperclip agent adapter has
   been explicitly migrated away from `codex_local`.
6. Verify Paperclip can create one ticket, dispatch it, and log the result.
7. Verify no write attempt lands outside the current allowlist.

## Daily Operating Rules

- No work runs outside the ticket system.
- No separate autonomous role runtimes in v1.0.
- Keep only one or two bounded workstreams active at a time.
- Stop immediately on budget cap, allowlist breach, or unclear task authority.

## Paperclip Writeback

Use the local API wrapper when you need low-noise ticket updates from this
desktop shell:

```powershell
powershell -ExecutionPolicy Bypass -File `
  "\\wsl.localhost\Ubuntu\home\evo\workspace\_sandbox\agent-stack\paperclip-issue-writeback.ps1" `
  -Action issue-get `
  -Issue EVO-1
```

Add a comment:

```powershell
powershell -ExecutionPolicy Bypass -File `
  "\\wsl.localhost\Ubuntu\home\evo\workspace\_sandbox\agent-stack\paperclip-issue-writeback.ps1" `
  -Action issue-comment `
  -Issue EVO-1 `
  -Body "Delivery note"
```

Update an issue and attach a comment in one call:

```powershell
powershell -ExecutionPolicy Bypass -File `
  "\\wsl.localhost\Ubuntu\home\evo\workspace\_sandbox\agent-stack\paperclip-issue-writeback.ps1" `
  -Action issue-update `
  -Issue EVO-1 `
  -Status done `
  -Body "Close-out note"
```

This path is only valid while the instance stays on `deploymentMode:
local_trusted` and the server is private on localhost. If Paperclip moves to a
different auth or exposure mode, do not assume these unauthenticated local
calls remain valid.

## Shutdown

1. Stop Paperclip.

```bash
/home/evo/workspace/_sandbox/agent-stack/paperclip-trial.sh stop
```

2. Stop OpenFang.
3. Stop Ollama.
4. Capture outcomes, blockers, and next steps in the governed docs if the
   operating model changed.

## Notes

Exact install and start commands should be verified against the current official
docs at install time. This runbook captures the operating sequence and guardrails,
not a frozen vendor command reference.

OpenFang currently expects `~/.openfang`; on this machine that path remains a
documented symlink back into the workspace sidecar.

OpenFang route choice is manual by design in this phase. `local`, `openrouter`,
and `groq` are explicit human choices; there is no automatic hosted fallback.

As of 2026-04-06, the first live Paperclip company exists and is budgeted at
`0`, but its agents still use the `codex_local` adapter. Do not read OpenFang
health alone as proof that Paperclip has been migrated to OpenFang execution.

The WSL-local Ollama install depends on both the sidecar binary and the bundled
runtime library tree under `ollama/lib/ollama`. If a future reinstall copies
only the binary, Ollama can boot but silently fall back to CPU-only inference.

The `researcher` hand heartbeat loop is hourly by default on this machine, so a
manual bounded message is the fastest smoke-test path after activation.

Paperclip needs a stronger detach than plain `nohup` when started from a short
`wsl.exe` shell on this machine. `paperclip-trial.sh` uses `setsid` plus the
Node 20 wrapper so the service survives after the launching shell exits.

If a Paperclip run fails with `/usr/bin/env: 'bash\r': No such file or
directory`, restart Paperclip after confirming the sidecar wrapper is the active
launch path. That error indicates a CRLF shell shim was executed instead of the
Linux-safe `codex` shim generated by `with-node20.sh`.

If Ollama stops using the GPU after a reinstall, check
`/home/evo/workspace/_logs/agent-stack/ollama-serve.log` first. The expected
good path on this machine logs `library=CUDA`, `name=CUDA0`, and full layer
offload to the RTX 3060.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
