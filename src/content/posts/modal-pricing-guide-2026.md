---
title: "Modal pricing 2026: GPU rates, Sandbox costs and stopping usage"
description: "Modal GPU rates verified November 2026, Function versus Sandbox estimates, resource floors, termination checks and how to reconcile usage after cleanup."
pubDate: 2026-07-25
updatedDate: 2026-11-08
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through labeled affiliate links. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed guide, not a benchmark.** Modal's public pricing and the documentation cited below were checked **November 8, 2026**. Cost examples are estimates with stated assumptions. HostFleet did not launch a paid workload, inspect an account invoice, measure shutdown latency, or test GPU availability for this refresh.

> **Verified:** November 8, 2026 · Public USD list rates · Compute estimates before credits, tax and account-specific discounts

# Modal pricing 2026: GPU rates, Sandbox costs and stopping usage

Modal's price depends on more than the GPU. Choose the execution surface, count requested or consumed CPU and memory, add any region multiplier, and budget the complete resource lifetime.

**The short answer:** an L4 costs **$0.000222 per GPU-second**, equivalent to **$0.7992/hour**, before other resources. At the [November 8 rate card](https://modal.com/pricing), one L4 plus one physical CPU core and 8 GiB for 100 allocated hours is about **$91.03 as a Function** or **$113.32 as a Sandbox**, with automatic placement. These are gross resource estimates, not invoices.

The trap for coding-agent teams is treating a Sandbox like a request-driven Function. A command can finish while the Sandbox remains available, and an open tunnel connection can prevent its idle timeout. A large resource request also remains a billing floor while the Sandbox is doing little work.

## Choose the cost model before the GPU

| Workload | What to budget | First control to inspect |
|---|---|---|
| Bursty inference Function | Loading, useful processing and allocated idle tail | Warm floor and scale-down window |
| Agent-controlled CPU Sandbox | Higher of requested or actual CPU and memory over its lifetime | Requests, burst limits and termination |
| GPU Sandbox | Standard GPU rate plus Sandbox CPU and memory | GPU reservation and whole-Sandbox lifetime |
| Geographically pinned workload | Full resource bundle plus placement multiplier | Whether broad placement is sufficient |
| Continuously warm service | Full 720-hour allocation, not useful request seconds | Fixed-capacity alternatives |

Use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) to compare deployment shapes, not just nominal hourly rates.

## Modal GPU prices: verified November 8

The table uses Modal's cells in HostFleet's `gpu-pricing.json`, rechecked against the [official pricing page](https://modal.com/pricing) on **November 8, 2026**. All 11 raw per-second rates are unchanged. Hourly and 30-day values use those exact source rates, not rounded headline hours.

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

**Assumptions:** one GPU allocated for the full duration; 3,600 seconds/hour and 720 hours/30-day month. CPU, memory, placement, storage, network, workspace charges, tax and credits are excluded. These are arithmetic equivalents, not minimum billing increments or availability guarantees.

For the cross-provider dataset, use the [live GPU pricing table](https://hostfleet.net/gpu-pricing/). Its sitewide verification baseline remains September 24; this provider-only check does not redate other vendors. Catalog pricing does not prove stock, quota, compatibility, throughput or cold-start latency.

## CPU and memory: Functions and Sandboxes have different rates

[Modal pricing](https://modal.com/pricing), verified **November 8, 2026**, publishes:

| Resource | Function | Sandbox |
|---|---:|---:|
| Physical CPU core-second | $0.0000131 | $0.00003942 |
| GiB-second of memory | $0.00000222 | $0.00000667 |
| GPU | GPU table above | Same GPU table |

One physical core is equivalent to two vCPUs. Modal describes Sandbox CPU and memory as non-preemptible rates of approximately three times the base rate. **Use the published decimals**, rather than multiplying the rounded Function rate by three. Do not triple the GPU rate.

The [resource guide](https://modal.com/docs/guide/resources.md) says CPU and memory are billed at the higher of request or actual use. Default requests are 0.125 physical cores and 128 MiB, equivalent to 0.125 GiB. A request is a floor, not a limit. Reducing it does not cap a program that bursts to consume more.

For Functions, a large ephemeral-disk request can raise the memory billing floor at a 20:1 disk-to-memory ratio. For example, a 500-GiB request implies at least 25 GiB of memory request. The [Sandbox resource guide](https://modal.com/docs/guide/sandbox-resources.md) separately says Sandbox disk size cannot be increased; do not copy the Function's enlarged-disk configuration into a Sandbox sizing plan.

### One L4, one core, 8 GiB: what 100 hours actually means

Using November 8 public rates and [placement rules](https://modal.com/docs/guide/region-selection.md):

| Surface and placement | Hourly resource estimate | 100 allocated hours |
|---|---:|---:|
| Function, automatic | $0.9103 | $91.03 |
| Function, broad region | $1.0468 | $104.68 |
| Function, narrow region | $1.5930 | $159.30 |
| Sandbox, automatic | $1.1332 | $113.32 |
| Sandbox, broad region | $1.3032 | $130.32 |
| Sandbox, narrow region | $1.9831 | $198.31 |

For the Function, the unrounded per-second calculation is:

```text
$0.000222 + $0.0000131 + (8 × $0.00000222) = $0.00025286
```

For the Sandbox it is:

```text
$0.000222 + $0.00003942 + (8 × $0.00000667) = $0.00031478
```

**Assumptions:** those exact resources are billable throughout, with no usage above the request; one GPU; no other billable objects, storage, transfer, plan fee, tax or credit. Actual CPU/memory bursting can raise the charge.

Broad placement such as `eu` or `us` multiplies the full resource bundle by **1.15**. Narrow placement such as `eu-west` multiplies it by **1.75**. Automatic placement uses base prices. Modal documents the smaller multiplier when a region list spans both categories. Pin compute only when locality justifies the cost and reduced scheduling pool; no latency improvement was measured here.

## Sandbox requests versus limits: budget a timeline, not a peak

The [Sandbox resource documentation](https://modal.com/docs/guide/sandbox-resources.md), checked November 8, supports `(request, limit)` tuples. CPU limits throttle execution; exceeding a hard memory limit can cause an out-of-memory kill. A low request plus a higher limit permits opportunistic bursting; it does not guarantee those peak resources will be available.

For a CPU-only Sandbox, the model is:

```text
Sum over time of:
  max(CPU request, actual cores) × CPU rate
+ max(memory request, actual GiB) × memory rate
```

Apply a region multiplier if selected. For GPU Sandboxes, separately add allocated GPU time. When using averages, average the **billable higher-of-request-or-use values**, not raw CPU use that falls below the request floor.

### A ten-minute, two-phase estimate

Assume one CPU-only Sandbox lives for exactly 600 billable seconds: 60 seconds using 4 physical cores and 8 GiB, then 540 seconds using no more than the default request of 0.125 core and 0.125 GiB. Assume automatic placement and no other charges. November 8 Sandbox rates produce:

| Resource policy | 60-second work phase | 540-second quiet phase | Estimated CPU + memory total |
|---|---:|---:|---:|
| Request 4 cores and 8 GiB throughout | $0.0126624 | $0.1139616 | $0.1266240 |
| Default requests, limits permitting 4 cores and 8 GiB | $0.0126624 | $0.0031111 | $0.0157735 |

The first policy pays the large floor for all ten minutes. The second pays the burst during work, then the small floor **only if actual usage really falls that low**. A loaded interpreter, cached dataset or running server may retain much more than 128 MiB. Substitute observed quiet-phase memory before using the second result.

These are illustrative resource timelines, not measured savings, equivalent-performance promises, or all-in spend caps. Startup and cleanup time outside the assumed 600 seconds, GPUs, builds, persistent storage, network, credits and taxes are excluded. Reducing requests can also reduce scheduling guarantees. Use Sandbox metrics for CPU, memory, CPU pressure and exit reasons before trading reservations for bursting.

## Sandbox command completion is not Sandbox cleanup

The [Sandbox guide](https://modal.com/docs/guide/sandboxes.md) and [Python SDK](https://modal.com/docs/sdk/py/latest/Sandbox.md), checked November 8, distinguish these boundaries:

| Boundary | Meaning | Cost implication |
|---|---|---|
| `sb.exec(..., timeout=...)` | Timeout for that command's exec session | Not a whole-Sandbox lifetime setting |
| `Sandbox.create(timeout=...)` | Maximum Sandbox lifetime; default 300 seconds, configurable up to 24 hours | Bounds intended lifetime, not a complete invoice |
| `idle_timeout` | Terminates an inactive Sandbox | Activity can keep it alive |
| `terminate()` | Requests Sandbox termination; defaults to `wait=False` | Return alone does not prove termination completed |
| `terminate(wait=True)` | Waits for termination and returns exit code | Stronger lifecycle evidence, not a metered cutoff timestamp |
| `poll()` | `None` while running, otherwise exit code | A nonzero exit code can still mean it has stopped |

An active exec command, writes to the Sandbox's stdin, or an open TCP connection through a tunnel count as activity. Do not assume “no new agent messages” means an idle timer is counting down. A terminal session or client connection may keep the Sandbox active.

A Sandbox's **entrypoint** exiting can finish the Sandbox. An individual command launched through `exec` is different: the guide's examples run multiple commands against one Sandbox before explicitly terminating it. Preserve that distinction in your agent session manager.

### Stop the exact Sandbox, then verify

Record `sb.object_id` immediately after successful creation and keep it outside the worker process. For an already-created Sandbox you intend to interrupt, the following uses the documented SDK methods; **it was not account-tested for this article**:

```python
import modal

sandbox_id = "replace-with-the-recorded-sandbox-id"
sb = modal.Sandbox.from_id(sandbox_id)
exit_code = sb.terminate(wait=True)
state = sb.poll()
if state is None:
    raise RuntimeError("Sandbox still reports running; cleanup is incomplete")
print({"sandbox_id": sandbox_id, "exit_code": exit_code, "state": state})
```

Use `try/finally` around normal work, plus an independent controller that retains the exact ID if the launching client dies. Configure the intended maximum lifetime and idle timeout before creation. A local wait can fail or hang, so the controller still needs its own observation deadline and a way to retry cleanup.

Do not turn a successful termination response into a promise of second-exact billing cutoff or a bounded teardown delay. Neither was measured. Inspect associated persistent storage separately: terminating compute does not establish that retained data is gone. If creation fails before an ID is recorded, investigate inventory rather than repeatedly launching replacements.

GPU Sandboxes are supported on the `gvisor` runtime according to the November 8 resource guide and can be preempted. CPU Sandboxes are non-preemptible. The [preemption reference](https://modal.com/docs/guide/preemption.md) also says the non-preemptible option is unsupported for GPU Functions. Paying Sandbox CPU rates does not make a GPU reservation interruption-proof.

## Functions still have a billable warm tail

The [scaling](https://modal.com/docs/guide/scale.md) and [cold-start](https://modal.com/docs/guide/cold-start.md) guides, rechecked November 8, distinguish a warm floor (`min_containers`), an active buffer (`buffer_containers`) and the maximum idle scale-down window (`scaledown_window`). The default maximum idle window is 60 seconds, configurable from two seconds to 20 minutes; over-provisioned Functions can terminate containers earlier.

At November 8's L4 rate, a full 60-second allocated idle tail is **$0.01332 for the GPU alone**. A 20-minute tail is **$0.26640**. Neither is a guaranteed per-request surcharge: requests can reuse a container, and the actual tail can be shorter. CPU and memory remain separate.

One L4 plus one core and 8 GiB held continuously for 720 hours instead estimates **$655.41 as an automatic-placement Function**, before credits and other charges. The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) helps separate useful work from retained allocation. Read [Modal for AI inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/) for the deployment context.

## Plans and budgets: gross usage is not net spend

[Modal's plan table](https://modal.com/pricing), checked **November 8, 2026**, lists Starter at **$0/month plus compute**, with **$30/month compute credits**, up to **100 containers** and **10 GPU concurrency**. Team lists **$250/month plus compute**, **$100/month compute credits**, **5,000 containers** and **50 GPU concurrency**. Enterprise is custom. These are infrastructure workspace terms, not model subscription prices.

Concurrency limits are not GPU stock or throughput guarantees. Included compute applies to Functions and Sandboxes; it is not a discount to the listed GPU rate. Estimate gross resources before subtracting applicable credits. See the [GPU free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) for trial controls.

The [budget guide](https://modal.com/docs/guide/budgets.md), checked November 8, separates:

- **Workspace budget:** total usage before credits, the outer usage cap.
- **Workspace spend limit:** net out-of-pocket charges after credits. Work covered by remaining applicable credits can continue.
- **Environment budget:** compute usage for one Environment on Team/Enterprise; not storage, reservations or network egress.

Owners and Managers can change these limits. Environment budgets cannot raise the Workspace outer cap. The documentation does not establish a second-exact enforcement delay or overshoot bound. Use budgets alongside lifetime settings and cleanup, not as a reason to stop monitoring a live workload.

## Volumes: the free inclusion is now explicit

The [November 8 pricing page](https://modal.com/pricing) lists **$0.09/GiB-month** and explicitly says in its FAQ: **“Volumes include up to 1 TiB free.”** This resolves the ambiguity in the older short rate-card footnote; 1 TiB is 1,024 GiB. Verify your Workspace's actual adjustments before assuming the remaining free allowance belongs to one deployment.

For example, at November 8's rate, **1,500 GiB held for a full month** has a gross resource estimate of **$135**. Assuming the full 1,024-GiB inclusion is available and applies, the remainder is **476 × $0.09 = $42.84**. No other adjustments or taxes are included; sharing the allowance changes this estimate.

The [Volume documentation](https://modal.com/docs/guide/volumes.md) says usage is snapshotted daily and deleted data can remain billable for up to four days. A terminated Sandbox therefore does not prove the storage meter has cleared. Preserve required data and delete only disposable resources; reconcile storage adjustments separately from compute credits.

## Reconcile the bill after cleanup

The [billing guide](https://modal.com/docs/guide/billing.md) says there are no minimum usage-time increments. Programmatic billing reports are available on Team and Enterprise, but report visibility is not instantaneous.

The [Workspace SDK](https://modal.com/docs/sdk/py/latest/Workspace.md), checked November 8, documents the following workflow:

1. Capture account-specific rates through `Workspace.billing.rates()`; preserve `Decimal` precision.
2. Retain exact App/Sandbox IDs, effective resources, region, lifecycle times and any tags. Do not attribute an entire shared Workspace to one experiment.
3. Query `Workspace.billing.report()` over **closed UTC intervals**. The start rounds to the interval beginning; the exclusive end drops a partial final interval. An hourly query ending at 10:20 can therefore omit the hour containing a 10:10 run. A missing row is unknown, not free compute.
4. Allow collection lag, then repeat the same closed window. Preserve GPU, CPU, memory and every other resource key; Modal warns these keys can change. Check ancillary objects outside the target App as well.
5. Compare gross resource totals to the cycle summary's `metered_cost`, then inspect `adjustments` and `billed_cost`. Granular reports exclude credit, reservation and network-allowance adjustments; a free-Volume adjustment can also explain the summary.

Repeated identical exports are provisional reconciliation evidence, not a documented settlement guarantee. Equivalent billed seconds calculated from a cost and its rate are aggregate arithmetic, not a measured start/stop trace. An hourly report bucket is not an hourly billing minimum.

## Verdict and next step

Modal fits bursty GPU Functions and isolated agent sessions, but the two should not share a simplistic “GPU seconds only” budget. For Functions, model warm floors and idle tails. For Sandboxes, model request floors, actual bursts and the lifetime of the whole session.

Before a production decision, profile one representative workload, retain the exact identity, stop it deliberately, and reconcile the complete closed billing window. No paid test was performed for this guide. Compare a genuinely always-warm workload with [RunPod's Pods-versus-Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/), including persistent resources and operational effort.

## Source notes

All linked Modal pricing and documentation sources were checked **November 8, 2026**. This refresh reuses the live guide's GPU dataset and resource examples, corrects the Volume inclusion explanation from the current FAQ, and adds Sandbox request/limit and lifecycle guidance. Claims are sourced; calculations are estimated. There are no measured performance, teardown, stock or invoice results. Other providers and the dataset-wide verification date were not refreshed.

*Fixed-capacity alternative after measuring your workload: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). This is a labeled affiliate link; all source citations above are direct, non-affiliate links.*
