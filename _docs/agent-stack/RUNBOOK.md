# Runbook

Updated: 2026-04-09

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
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local-debug
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route local-audit
```

Alternative hosted routes:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter-qwen
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter-nemotron
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route openrouter-glm
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh route groq
```

Route notes:

- `local`: daily default on this machine (`ollama/qwen3.5:latest`)
- `local-debug`: local debugger lane (`ollama/deepseek-coder-v2:16b`)
- `local-audit`: local audit lane (`ollama/granite4:7b-a1b-h`)
- `openrouter-qwen`: paid `qwen/qwen3.6-plus` review lane
- `openrouter-nemotron`: free `nvidia/nemotron-3-super-120b-a12b:free` backup review lane
- `openrouter-glm`: paid `z-ai/glm-5.1` experimental coding or review lane
- `groq`: hosted fallback lane

6. After the route is selected, start OpenFang from the sidecar launcher:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh start
```

7. Verify the daemon and active hands:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh status
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh hand active
```

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

3. Verify one bounded hand is active:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh hand active
```

4. Verify OpenFang can complete one bounded task and report back. Use an
explicit direct prompt; vague instructions still invite unnecessary clarifying
questions.

5. Verify no write attempt lands outside the current allowlist.

## Daily Operating Rules

- No hidden route switching between local and hosted providers.
- Keep only one or two bounded workstreams active at a time.
- Stop immediately on budget ambiguity, allowlist breach, or unclear task authority.
- Paperclip is retired from the live surface. Do not route new work through a
  Paperclip-style ticket layer in this stack.

## Shutdown

1. Stop OpenFang:

```bash
/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh stop
```

2. Stop Ollama:

```bash
/home/evo/workspace/_sandbox/agent-stack/ollama-trial.sh stop
```

3. Capture outcomes, blockers, and next steps in the governed docs if the
   operating model changed.

## Notes

Exact install and start commands should be verified against the current official
docs at install time. This runbook captures the operating sequence and
guardrails, not a frozen vendor command reference.

OpenFang currently expects `~/.openfang`; on this machine that path remains a
documented symlink back into the workspace sidecar.

OpenFang route choice is manual by design in this phase. `local`,
`local-debug`, `local-audit`, `openrouter-qwen`, `openrouter-nemotron`,
`openrouter-glm`, and `groq` are explicit human choices; there is no automatic
fallback between them.

The WSL-local Ollama install depends on both the sidecar binary and the bundled
runtime library tree under `ollama/lib/ollama`. If a future reinstall copies
only the binary, Ollama can boot but silently fall back to CPU-only inference.

Historical Paperclip launchers, writeback helpers, and operator docs were
archived on 2026-04-09 to `/home/evo/_archive/agent-stack/2026-04-09/`.

`_docs/openfang-wizard/` is the tracked source of truth for wizard files and
hands. The older `_sandbox/openfang-wizard/` duplicate surface was retired in
the same cleanup pass.

If Ollama stops using the GPU after a reinstall, check
`/home/evo/workspace/_logs/agent-stack/ollama-serve.log` first. The expected
good path on this machine logs `library=CUDA`, `name=CUDA0`, and full layer
offload to the RTX 3060.

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
