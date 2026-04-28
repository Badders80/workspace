# EVO-STATION Hardware Spec

> Source of truth for machine hardware. Agents should read this before making workload recommendations.

## Host
- **Name:** EVO-STATION
- **Type:** Windows desktop + WSL2 Ubuntu
- **OS:** Windows (host) / Ubuntu 22.04+ (WSL2 guest)

## CPU
- **Model:** AMD Ryzen 5 7600X
- **Cores:** 6 physical / 12 logical
- **Features:** AVX-512, AMD-V virtualization
- **WSL Exposure:** 8 logical CPUs
- **Implication:** Good for local LLM inference up to ~13B params. Build parallelism up to `-j8`.

## GPU
- **Model:** NVIDIA GeForce RTX 3060
- **VRAM:** 12GB GDDR6
- **CUDA:** Version 13.1
- **Driver:** 591.86 (Windows)
- **Mode:** Compute only — no display output connected
- **Implication:** CUDA workloads are fine (local inference, video encoding, AI generation). Not a display GPU.

## RAM
- **Total Physical:** ~24GB
- **WSL Allocation:** 12GB (via .wslconfig or default)
- **Windows Host:** ~12GB remaining
- **Current WSL Usage:** ~4.5GB used / 11GB total / 7.1GB available
- **Swap:** 12GB allocated, ~763MB used

## Storage Architecture

### Physical Layout

The machine has two physical drives with strict separation:

| Drive | Type | Role | I/O Character | WSL Path |
|-------|------|------|---------------|----------|
| **C:** | OS Drive (SSD/NVMe) | Windows, pagefile, small apps, control-plane data | Low-churn, system-critical | `/mnt/c/` |
| **S:** | Workload Drive (SSD/NVMe) | WSL VHDX, Docker, models, datasets, caches, scratch | High I/O, high-churn, large files | `/home/evo/...` |

> **Note:** WSL reports these as virtual disks (`/dev/sd*`) because they are backed by VHDX files on the host. The physical drives are SSD-class (inferred from WSL performance and workstation class), but exact protocol (SATA vs NVMe) is masked by the virtual disk layer.

### Isolation Rules

1. **C: is for boot/system only**
   - Windows OS, pagefile, small control-plane scripts
   - NO active development work from `/mnt/c/...`
   - NO Docker or WSL VHDX storage on C:
   - NO large model files, caches, or datasets

2. **S: is for workloads only**
   - WSL Ubuntu distro VHDX lives here
   - Docker Desktop storage lives here
   - All active development under `/home/evo/...`
   - AI models, datasets, caches, scratch output
   - Large build artifacts, temp renders, exports

3. **Never cross-mount hot workloads**
   - Do NOT run active builds from `/mnt/c/...`
   - Do NOT store large mutable data on C:
   - Do NOT let Docker containers bind-mount bulk data from C:
   - Keep workspace on `/home/evo/workspace` (S:-backed WSL path)

### Why This Matters

- **C:** is smaller and system-critical. Filling it breaks Windows.
- **S:** is larger and high-I/O. Mixing OS traffic with model training, Docker layers, and build output creates contention.
- WSL I/O from `/home/evo/...` is native ext4 on the S:-backed VHDX. WSL I/O from `/mnt/c/...` is 9pfs translation layer — slower and less reliable for hot workloads.

### Storage Policy Enforcement

- `/_scripts/storage-check.sh` validates placement
- `/_docs/STORAGE_POLICY.md` governs C: vs S: decisions
- Docker Desktop configured for S:-backed storage
- WSL distro base path on S:

## WSL Configuration
- **Distro:** Ubuntu
- **CPUs:** 8 logical
- **Memory:** 12GB
- **Workspace:** `/home/evo/workspace`
- **WSL VHDX Location:** `S:\WSL_Ubuntu`

## Network
- **Tailscale:** Off (per OpenClaw status)
- **Gateway:** Local loopback (`ws://127.0.0.1:18789`)
- **Ollama:** `http://127.0.0.1:11434`
- **OpenFang:** Port 50051

## Agent Implications

| Constraint | Rule |
|------------|------|
| Local LLM limit | ~13B params (qwen3.5, gemma4, llama3.2) |
| Context ceiling | 8K-16K with local models on 12GB VRAM |
| Build parallelism | Up to `-j8` or turbopack defaults |
| Docker memory cap | ~12GB total for all containers |
| Video/AI workloads | CUDA accelerated, but 12GB VRAM ceiling |
| Storage for models | S: only — never C: |
| Scratch output | S: only — never C: |
| Cross-drive I/O | Avoid `/mnt/c/` for hot workloads |

## Change Log

- 2026-04-26: Created from live hardware detection. GPU mode confirmed compute-only.
