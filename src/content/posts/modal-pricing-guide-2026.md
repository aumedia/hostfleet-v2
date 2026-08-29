---
title: "Modal pricing 2026: GPU rates, region fees, and Sandbox costs"
description: "Modal pricing checked August 2026, including GPU rates, 1.5-1.75x region fees, Sandbox CPU and memory costs, and worked estimates."
pubDate: 2026-07-25
updatedDate: 2026-08-29
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet methodology and affiliate policy](https://hostfleet.net/about/) for how sourced, estimated, and measured claims are separated.*

**Source-backed rate check; estimated totals.** Modal's public prices and billing documentation were checked on **August 29, 2026**. HostFleet did not inspect a customer invoice or benchmark performance, cold starts, capacity, or regional availability. Every calculated total below exposes its resource and time assumptions.

> **Verified date:** August 29, 2026<br>
> **Currency:** public USD list rates<br>
> **Scope:** Functions, GPU tasks, Sandboxes, Notebooks, plan fees, region multipliers, CPU, memory, ephemeral disk, and Volumes

# Modal pricing 2026: GPU rates, region fees, and Sandbox costs

Modal's headline GPU rates are not always the rates that reach the bill. Three choices can change the result before a workload processes more traffic:

1. pinning a container to a broad region applies a **1.5× multiplier**;
2. pinning it to a narrow region applies a **1.75× multiplier**; and
3. Sandbox and Notebook CPU and memory use a separate rate card that is roughly **3× the standard Function rates**.

The short buying answer is still favorable to Modal for bursty work: per-second metering and scale-to-zero can avoid idle allocation. But a low-latency API pinned near its database, an interactive agent Sandbox, and an ordinary scale-to-zero Function are three different cost shapes. Do not budget all three from the GPU row alone.

## The buying answer

| Workload | Modal fit | Cost boundary to model |
|---|---|---|
| Batch or scheduled Function that releases resources | Strong | GPU + CPU + memory for total allocated seconds |
| Bursty inference Function on Modal's automatic placement | Strong | Include startup, model loading, retries, and idle retention |
| Function pinned to a broad geography such as `eu` | Viable when locality matters | Multiply base usage by **1.5** |
| Function pinned to a narrow geography such as `eu-west` | Latency purchase, not a free setting | Multiply base usage by **1.75** |
| Interactive Sandbox or Notebook | Useful, but not Function-priced | Use the separate Sandbox CPU and memory rates |
| Continuously warm GPU endpoint | Technically easy; often expensive | Recalculate at 720 allocated hours and compare a fixed Pod or VM |

The decision sequence matters. Choose Function or Sandbox first, decide whether the container must be region-pinned, then add the workspace plan and expected allocation time.

## Modal GPU prices checked August 29

[Modal's public pricing page](https://modal.com/pricing) publishes GPU rates per second. The hourly column below multiplies the native rate by 3,600. The 30-day column multiplies it by 2,592,000 seconds, or 720 hours. These are GPU-only arithmetic estimates, not separate Modal billing units.

| GPU | VRAM | Published rate | Hourly equivalent | 30-day allocated estimate |
|---|---:|---:|---:|---:|
| T4 | 16 GB | $0.000164/sec | $0.5904/hr | $425.09 |
| L4 | 24 GB | $0.000222/sec | $0.7992/hr | $575.42 |
| A10 | 24 GB | $0.000306/sec | $1.1016/hr | $793.15 |
| L40S | 48 GB | $0.000542/sec | $1.9512/hr | $1,404.86 |
| A100 | 40 GB | $0.000583/sec | $2.0988/hr | $1,511.14 |
| A100 | 80 GB | $0.000694/sec | $2.4984/hr | $1,798.85 |
| RTX PRO 6000 | 96 GB | $0.000842/sec | $3.0312/hr | $2,182.46 |
| H100 | 80 GB | $0.001097/sec | $3.9492/hr | $2,843.42 |
| H200 | 141 GB | $0.001261/sec | $4.5396/hr | $3,268.51 |
| B200 | 180 GB | $0.001736/sec | $6.2496/hr | $4,499.71 |
| B300 | 288 GB | $0.001972/sec | $7.0992/hr | $5,111.42 |

**Estimate assumptions:** one GPU stays allocated for the stated time; no CPU, memory, workspace-plan, region, Volume, tax, support, or credit adjustment. Modal's 11 source rates were also part of HostFleet's complete 21-provider check on August 27 and remain synchronized with [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

A published price is not proof of stock, quota, region access, cold-start time, throughput, or software compatibility. The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) keeps Modal's Function surface separate from Pods, VMs, and other managed deployments.

## Starter and Team do not make compute all-inclusive

Modal's plan table, checked August 29, lists:

| Plan | Base price | Included compute | Containers | GPU concurrency | Selected cost controls |
|---|---:|---:|---:|---:|---|
| Starter | $0/month + compute | $30/month | 100 | 10 | Workspace-level budgets; up to 3 seats |
| Team | $250/month + compute | $100/month | 5,000 | 50 | Environment-level budgets, billing exports, unlimited seats |
| Enterprise | Custom | Custom | Custom | Custom | Custom security, support, and commercial terms |

The phrase **plus compute** is the important one. Included compute is a credit against eligible usage, not a cheaper GPU rate. Build the gross resource estimate first, then apply the current credit and plan rules.

Modal's [billing guide](https://modal.com/docs/guide/billing) says billing reports generated through its API or CLI are available on Team and Enterprise. Those reports show cost before credits or reservations, so their sum can be higher than the invoice. That gross view is useful: it exposes which App or resource is consuming the allocation before a credit temporarily hides it.

Budgets are guardrails, not a pricing model. The public plan table lists workspace budgets across plans and environment-level budgets on Team and Enterprise. Test the enforcement behavior with a small limit before treating a budget as protection against an unlimited production retry loop.

## Region selection can add 50% or 75%

Modal's [region-selection documentation](https://modal.com/docs/guide/region-selection), checked August 29, is explicit: defining a container region applies a multiplier on top of base usage pricing.

| Placement choice | Example | Published multiplier |
|---|---|---:|
| Automatic placement | No `region=` argument | Base price |
| Broad region | `region="eu"` or `region="us"` | **1.5×** |
| Narrow region | `region="eu-west"` or `region="us-west"` | **1.75×** |

The multiplier covers the Function or Sandbox resource bundle, not only the GPU. Modal's own example adds GPU, CPU, and memory, then applies the region multiplier. If several requested regions span broad and narrow categories, the documentation says the smaller multiplier applies.

This creates a direct latency-versus-cost decision. Modal routes Function inputs through Virginia by default. A container region can move compute nearer an external database, while `routing_region=` can change the Function traffic path. A narrow container region may reduce network distance, but it also reduces the scheduling pool and raises the public usage price by 75%.

Do not pin a region because it feels production-ready. First measure whether geography materially affects end-to-end latency, data residency, or an external service's transfer bill. If it does, treat the multiplier as an explicit infrastructure requirement.

## Worked example: one L4 Function with region multipliers

Assume one L4, one physical CPU core, and 8 GiB of memory remain allocated together. Modal's August 29 standard Function rates are:

```text
L4:                       $0.00022200/sec
1 physical CPU core:     $0.00001310/sec
8 GiB memory: 8 ×        $0.00000222/sec = $0.00001776/sec
Base total:               $0.00025286/sec
```

The resulting estimates are:

| Placement | Effective hourly estimate | 100 allocated hours | 720 allocated hours |
|---|---:|---:|---:|
| Automatic placement | $0.9103 | $91.03 | $655.41 |
| Broad region at 1.5× | $1.3654 | $136.54 | $983.12 |
| Narrow region at 1.75× | $1.5930 | $159.30 | $1,146.97 |

**Estimate assumptions:** exactly one L4, one physical core, and 8 GiB remain allocated for the full duration; no plan fee, credit, Volume, other network or storage charge, tax, support, or discount. The monthly column uses 720 hours.

The narrow-region choice adds about **$68.27 per 100 allocated hours** and **$491.56 per continuously allocated 30-day month** to this specific bundle. That is not a hidden invoice fee; it is a published multiplier that is easy to miss when reading only the GPU table.

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to test a realistic allocation profile instead of defaulting to either one inference second or a full warm month.

## Sandboxes and Notebooks have a different CPU and memory rate card

The same Modal pricing page now separates ordinary resource costs from **Modal Sandbox + Notebooks Pricing**:

| Resource | Standard Function rate | Sandbox and Notebook rate | Planning effect |
|---|---:|---:|---|
| CPU | $0.0000131/core-sec | $0.00003942/core-sec | About 3× before placement multipliers |
| Memory | $0.00000222/GiB-sec | $0.00000667/GiB-sec | About 3× before placement multipliers |
| GPU | Standard GPU table | Standard GPU table | GPU price itself is not tripled |

For the same one-L4, one-core, 8-GiB bundle, a Sandbox estimate starts at **$1.1332/hour**, versus **$0.9103/hour** for a Function. At 100 allocated hours:

| Surface and placement | 100-hour estimate |
|---|---:|
| Function, automatic placement | $91.03 |
| Sandbox, automatic placement | $113.32 |
| Sandbox, broad region | $169.98 |
| Sandbox, narrow region | $198.31 |

The narrow-region Sandbox estimate is more than twice the automatic Function estimate even though both use the same GPU, CPU count, memory request, and duration. The difference comes from the higher Sandbox CPU/memory rates and the 1.75× placement multiplier.

That does not make Sandboxes a bad product. They solve a different problem: interactive or agent-controlled compute with burstable resources. It does mean a team building coding agents, isolated tool runners, or user sessions should model the Sandbox table directly instead of copying a Function estimate.

## Requested resources, actual usage, and ephemeral disk

Modal's [resource configuration guide](https://modal.com/docs/guide/resources), checked August 29, says each Function or Sandbox starts with a default request of 0.125 CPU cores and 128 MiB of memory. For CPU and memory, billing uses whichever is higher: the request or actual usage.

That rule creates two failure modes:

- over-requesting resources can raise the bill even when the application never uses them; and
- under-requesting does not create a hard price ceiling if the container bursts above the request.

Use billing exports and application metrics together. Compare requested CPU and memory with the higher observed usage, then right-size from actual workload traces rather than a one-off peak.

Ephemeral disk is also coupled to memory billing. Modal documents a **20:1 disk-to-memory ratio**: requesting 500 GiB of ephemeral disk raises the memory request to 25 GiB if it was lower. At the public standard Function memory rate, 25 GiB held for 100 hours is about **$19.98**. At the Sandbox memory rate, the same 25-GiB billing equivalent is about **$60.03** before a region multiplier.

Those disk figures are estimates using `500 GiB ÷ 20`, the respective August 29 memory rate, and 360,000 seconds. They do not include other memory the workload actually uses. The documented maximum ephemeral-disk request is 3 TiB.

## Non-preemptible pricing does not apply to GPU Functions

The public plan comparison labels non-preemptible execution as **3× base prices**, but Modal's [preemption guide](https://modal.com/docs/guide/preemption) provides the necessary boundary:

- setting `nonpreemptible=True` applies a 3× multiplier to **CPU and memory usage**;
- the parameter is **not supported for GPU Functions**; and
- Sandboxes without a GPU are not subject to preemption, while GPU Sandboxes can be preempted.

For a CPU Function requesting one physical core and 8 GiB for 100 hours, the standard CPU-plus-memory estimate is **$11.11**. Non-preemptible execution makes that component about **$33.33**. Do not multiply a GPU Function's accelerator price by three; the documentation says the setting is unavailable there.

Long batch work should still be checkpointed and idempotent. Paying for a non-preemptible CPU Function can remove one interruption mode, but it does not fix application errors or make a multi-hour task safe to restart.

## Volumes can remain billable after deletion

Modal lists Volumes at **$0.09 per GiB-month**. The pricing card also displays an “includes 1 TiB/month free” footnote without identifying the free unit in the extracted rate row, so this guide does not treat it as 1 TiB of free storage. Confirm the current dashboard and terms before subtracting it from a storage estimate.

Modal's [Volumes guide](https://modal.com/docs/guide/volumes), checked August 29, says storage usage is snapshotted daily. Deleted data may remain billable for up to four days because of underlying processing. A 500-GiB Volume therefore has a gross list-price estimate of **$45 per month** before any applicable inclusion:

```text
500 GiB × $0.09/GiB-month = $45/month
```

This is a storage-capacity estimate, not an invoice prediction. Retention time, daily snapshots, deletion lag, credits, and any included usage can change the result. For model weights and checkpoints, record both the compute shutdown path and the Volume deletion path.

## Allocation time still decides whether Modal is cheap

Region and product multipliers do not replace the original serverless question: how long are resources actually allocated?

Modal's scaling controls let an operator keep minimum containers warm, hold buffer containers, and change the idle scale-down window. Those settings buy latency with additional allocated time. Count:

1. container startup and image initialization;
2. model loading;
3. request execution;
4. retained idle time;
5. retries and failed starts; and
6. parallel containers.

Then apply the correct Function or Sandbox rates and any region multiplier. A bursty workload can still be inexpensive after a 1.75× multiplier if it releases resources quickly. A low headline rate can still be expensive when warm containers remain allocated all month.

For operational behavior beyond the rate card, read [Modal for AI inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/).

## Verdict

Modal remains a strong platform for bursty Python and GPU workloads, but its cost model now needs four explicit questions:

1. Is this a Function, Sandbox, or Notebook?
2. Does it use automatic placement, a broad region, or a narrow region?
3. What CPU, memory, disk, and GPU resources are requested or actually used?
4. How many total seconds do those resources stay allocated?

The August 29 correction is material. A one-L4, one-core, 8-GiB workload costs an estimated **$91.03 for 100 automatic-placement Function hours**, **$159.30 when that Function is narrowly region-pinned**, and **$198.31 when the same resource bundle is a narrowly pinned Sandbox**. None of those totals includes a workspace-plan fee, storage, tax, support, or credits.

Use Starter to profile one representative deployment. Export gross billing data when the workspace moves to Team. Add region pinning only when latency, residency, or an external dependency justifies the 50% or 75% uplift. And never use the GPU row as the total cost of an agent Sandbox.

If the measured deployment truly needs one self-managed GPU online continuously, compare the 720-hour Modal bundle with a fixed-capacity alternative. [RunPod's Pods-versus-Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains that different operational boundary.

## Sources

Official provider sources were checked **August 29, 2026**.

- [Modal pricing](https://modal.com/pricing) — GPU, Function CPU and memory, Sandbox and Notebook CPU and memory, Volume price, plan limits, region multiplier summary, and non-preemptible summary
- [Modal billing guide](https://modal.com/docs/guide/billing) — billing frequency, budgets, gross billing reports, credits, and tags
- [Modal region-selection guide](https://modal.com/docs/guide/region-selection) — broad and narrow multipliers, routing, and placement behavior
- [Modal resource configuration](https://modal.com/docs/guide/resources) — request-versus-actual billing, default requests, ephemeral-disk ratio, and disk maximum
- [Modal preemption guide](https://modal.com/docs/guide/preemption) — CPU and memory multiplier, unsupported GPU Function boundary, and Sandbox behavior
- [Modal Volumes guide](https://modal.com/docs/guide/volumes) — daily accounting and deletion lag
- [Modal scaling guide](https://modal.com/docs/guide/scale) — warm-container and idle-window controls
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 27, 2026
- HostFleet full source-verification ledger — `/opt/hostbot/data/ai-hosting/notes/2026-08-27-gpu-pricing-full-verification.md`
- Live article baseline — `/opt/hostbot-v2/src/content/posts/modal-pricing-guide-2026.md`

*Need a fixed GPU Pod after measuring the always-warm case? This is a labeled affiliate link: [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod). Source citations above are direct, non-affiliate links.*
