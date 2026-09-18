---
title: "Modal pricing 2026: GPU rates, 1.15× region fees, and idle-tail costs"
description: "Modal pricing checked September 2026: 11 GPU rates, the corrected 1.15× broad-region fee, Sandbox costs, scale-to-zero idle tails, and worked estimates."
pubDate: 2026-07-25
updatedDate: 2026-09-18
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet methodology and affiliate policy](https://hostfleet.net/about/) for how sourced, estimated, and measured claims are separated.*

**Source-backed rate check; estimated totals.** Modal's public prices and billing documentation were checked on **September 18, 2026**. HostFleet did not inspect a customer invoice or benchmark performance, cold starts, capacity, or regional availability. Every calculated total below exposes its resource and time assumptions.

> **Verified date:** September 18, 2026<br>
> **Currency:** public USD list rates<br>
> **Scope:** Functions, GPU tasks, Sandboxes, Notebooks, plan fees, region multipliers, CPU, memory, ephemeral disk, Volumes, and scale-down settings

# Modal pricing 2026: GPU rates, 1.15× region fees, and idle-tail costs

Modal is inexpensive when a workload releases resources quickly. It becomes much less serverless in cost when you keep GPU containers warm, pin them to a narrow region, or run an interactive Sandbox with its higher CPU and memory rates.

The material September correction is geographic pricing. Modal's current documentation lists a **1.15× multiplier for a broad region**, down from the 1.5× multiplier in HostFleet's August 29 source check. A narrow region remains **1.75×**. For one L4, one physical CPU core, and 8 GiB of memory, that moves the 100-hour broad-region Function estimate from $136.54 to **$104.68**.

The other bill readers miss is the idle tail. Functions scale to zero by default, but a container can remain idle for a configured scale-down window, and reserved GPU or occupied memory remains billable during that time. Scale-to-zero is not the same as zero cost immediately after a request returns.

## The buying answer

| Workload | Modal fit | Cost boundary to model |
|---|---|---|
| Batch or scheduled Function that releases resources | Strong | GPU + CPU + memory for total allocated seconds |
| Bursty inference Function with automatic placement | Strong | Include startup, model loading, retries, and the idle tail |
| Function pinned to a broad geography such as `eu` | Viable when locality matters | Multiply the resource bundle by **1.15** |
| Function pinned to a narrow geography such as `eu-west` | A latency purchase | Multiply the resource bundle by **1.75** |
| Interactive Sandbox or Notebook | Useful, but not Function-priced | Use the separate Sandbox CPU and memory rates |
| Continuously warm GPU endpoint | Easy to run; often expensive | Recalculate at 720 allocated hours and compare a fixed Pod or VM |

Choose the execution surface first: Function, Sandbox, or Notebook. Then choose placement and autoscaling behavior. Only after that should you subtract plan credits.

## Modal GPU prices checked September 18

[Modal's public pricing page](https://modal.com/pricing), checked September 18, publishes GPU rates per second. The hourly column below multiplies each source rate by 3,600. The 30-day column multiplies it by 2,592,000 seconds, or 720 hours. These are GPU-only arithmetic estimates, not separate Modal billing units.

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

**Estimate assumptions:** one GPU stays allocated for the stated time; no CPU, memory, workspace-plan, region, Volume, tax, support, reservation, or credit adjustment. Modal's 11 source rates were unchanged in HostFleet's full 21-provider verification on September 17 and were rechecked on September 18. They remain synchronized with [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

A published rate does not prove stock, quota, region access, cold-start time, throughput, or software compatibility. The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) keeps Modal Functions separate from Pods, VMs, and other managed deployment shapes.

## Starter and Team do not make compute all-inclusive

Modal's plan table, checked September 18 at [modal.com/pricing](https://modal.com/pricing), lists:

| Plan | Base price | Included compute | Containers | GPU concurrency | Selected cost controls |
|---|---:|---:|---:|---:|---|
| Starter | $0/month + compute | $30/month | 100 | 10 | Workspace-level budgets; up to 3 seats |
| Team | $250/month + compute | $100/month | 5,000 | 50 | Environment-level budgets, billing exports, unlimited seats |
| Enterprise | Custom | Custom | Custom | Custom | Custom security, support, and commercial terms |

The phrase **plus compute** is the important one. Included compute is a credit against eligible usage, not a lower GPU rate. Build the gross resource estimate first, then apply the current credit and plan rules.

Modal's [billing guide](https://modal.com/docs/guide/billing), checked September 18, says programmatic billing reports are available on Team and Enterprise. The reports show cost before credits or reservations, so their sum can exceed the invoice. That gross view is useful because it exposes which App or resource is consuming allocation before a credit hides it.

Budgets are guardrails, not a pricing model. Test enforcement with a small limit before treating a budget as protection against an unlimited production retry loop.

## Region selection now adds 15% or 75%

Modal's [region-selection documentation](https://modal.com/docs/guide/region-selection), checked September 18, applies a multiplier to any Function or Sandbox with a container region defined.

| Placement choice | Example | Current multiplier |
|---|---|---:|
| Automatic placement | No `region=` argument | Base price |
| Broad region | `region="eu"` or `region="us"` | **1.15×** |
| Narrow region | `region="eu-west"` or `region="us-west"` | **1.75×** |

The multiplier covers the Function or Sandbox resource bundle, not only the GPU. Modal's example adds GPU, CPU, and memory, then applies the multiplier. If requested regions span the broad and narrow categories, the documentation says the smaller multiplier applies.

HostFleet's August 29 source check recorded the broad multiplier as 1.5×. The September 18 vendor page says 1.15×. That is a **35-percentage-point reduction in the premium** and makes an otherwise identical broad-pinned estimate **23.3% lower** than it was under the old multiplier. This comparison identifies the difference between checks; it does not establish the exact date Modal changed the price.

Modal routes Function inputs through Virginia by default. A container region can place compute nearer an external database, while `routing_region=` changes the Function traffic path. Narrow placement can reduce network distance, but it also shrinks the scheduling pool and raises the public usage price by 75%.

Do not pin a region because it sounds production-ready. First measure whether geography materially changes end-to-end latency, data residency, or an external service's transfer bill.

## Worked example: one L4 Function with current region multipliers

Assume one L4, one physical CPU core, and 8 GiB of memory remain allocated together. Modal's September 18 standard Function rates are sourced from [its pricing page](https://modal.com/pricing):

```text
L4:                       $0.00022200/sec
1 physical CPU core:     $0.00001310/sec
8 GiB memory: 8 ×        $0.00000222/sec = $0.00001776/sec
Base total:               $0.00025286/sec
```

| Placement | Effective hourly estimate | 100 allocated hours | 720 allocated hours |
|---|---:|---:|---:|
| Automatic placement | $0.9103 | $91.03 | $655.41 |
| Broad region at 1.15× | $1.0468 | $104.68 | $753.73 |
| Narrow region at 1.75× | $1.5930 | $159.30 | $1,146.97 |

**Estimate assumptions:** exactly one L4, one physical core, and 8 GiB remain allocated for the full duration; no plan fee, credit, Volume, network or storage charge, tax, support, reservation, or discount. The monthly column uses 720 hours.

The current broad-region setting adds **$13.65 per 100 allocated hours** to this bundle. The narrow setting adds **$68.27**. Against the old 1.5× broad multiplier, the corrected broad estimate saves **$31.86 per 100 allocated hours** and **$229.39 per 720-hour month**.

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to test a realistic allocation profile instead of defaulting to either one inference second or a full warm month.

## Scale-to-zero still has a billable idle tail

Modal's [scaling guide](https://modal.com/docs/guide/scale), rechecked September 18, says Functions scale to zero by default when there are no inputs. It also defines three controls with different cost effects:

- `min_containers` keeps a floor of warm containers even while a Function is inactive;
- `buffer_containers` adds idle capacity while a Function is active; and
- `scaledown_window` is the maximum time a container may remain idle during scale-down.

The guide explicitly frames those settings as a cost-versus-latency tradeoff. It also warns that a substantially over-provisioned App may terminate containers before the full scale-down window. HostFleet's September 2 source audit recorded a default maximum of 60 seconds and a configurable range from 2 seconds to 20 minutes.

Using Modal's September 18 L4 rate of $0.000222 per GPU-second, the GPU-only upper bounds are:

| Idle or warm setting | Arithmetic | GPU component |
|---|---:|---:|
| 2-second idle window | 2 × $0.000222 | $0.000444 |
| 60-second idle window | 60 × $0.000222 | $0.013320 |
| 5-minute idle window | 300 × $0.000222 | $0.066600 |
| 20-minute idle window | 1,200 × $0.000222 | $0.266400 |
| One L4 reserved for 720 hours | 720 × $0.7992 | $575.42 |

These are **upper bounds for the idle-window examples**, not a claim that every request pays a full tail. A later request may reuse the container, or Modal may terminate it early. They also exclude CPU and memory. For the one-core, 8-GiB L4 bundle above, a continuously warm 720-hour Function is **$655.41** before region multipliers, credits, and storage.

The exact GPU allocation start and stop events remain unmeasured. Modal's documentation says container readiness can range from seconds to minutes once initialization is included; the roughly one-second statement in its [cold-start guide](https://modal.com/docs/guide/cold-start) refers to container boot, not universal model-ready or first-token latency. Do not turn either statement into a guaranteed cold-start number.

For operational behavior beyond the rate card, read [Modal for AI inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/).

## Sandboxes and Notebooks have a different rate card

Modal's pricing page, checked September 18, separates standard Function CPU and memory from **Sandbox and Notebook pricing**:

| Resource | Standard Function rate | Sandbox and Notebook rate | Planning effect |
|---|---:|---:|---|
| CPU | $0.0000131/core-sec | $0.00003942/core-sec | About 3× before placement multipliers |
| Memory | $0.00000222/GiB-sec | $0.00000667/GiB-sec | About 3× before placement multipliers |
| GPU | Standard GPU table | Standard GPU table | GPU price itself is not tripled |

For the same one-L4, one-core, 8-GiB bundle, the September 18 Sandbox estimate starts at **$1.1332/hour**, versus **$0.9103/hour** for a Function.

| Surface and placement | 100-hour estimate |
|---|---:|
| Function, automatic placement | $91.03 |
| Sandbox, automatic placement | $113.32 |
| Sandbox, broad region at 1.15× | $130.32 |
| Sandbox, narrow region at 1.75× | $198.31 |

The narrowly pinned Sandbox costs more than twice the automatic Function estimate even though both request the same GPU, CPU count, memory, and duration. The difference comes from the higher Sandbox CPU and memory rates plus the 1.75× placement multiplier.

Sandboxes solve a different problem: interactive or agent-controlled compute with burstable resources. Teams building coding agents, isolated tool runners, or user sessions should model the Sandbox table directly.

## Requested resources, actual usage, and ephemeral disk

Modal's [resource configuration guide](https://modal.com/docs/guide/resources), checked September 18, says a Function or Sandbox starts with a default request of 0.125 CPU cores and 128 MiB of memory. CPU and memory billing uses whichever is higher: the request or actual usage.

That creates two failure modes:

- over-requesting raises the bill even when the application never uses the resources; and
- under-requesting does not create a hard price ceiling if the container bursts above the request.

Ephemeral disk is coupled to memory billing through a **20:1 disk-to-memory ratio**. Requesting 500 GiB of ephemeral disk raises the memory request to 25 GiB if it was lower. At Modal's September 18 standard Function memory rate, 25 GiB held for 100 hours is about **$19.98**. At the Sandbox rate, the same billing equivalent is about **$60.03**, before any region multiplier.

Those figures use `500 GiB ÷ 20`, the current memory rates, and 360,000 seconds. They exclude other memory actually used. The documented maximum ephemeral-disk request is 3 TiB.

## Non-preemptible pricing is not a GPU-Function option

Modal's September 18 plan comparison labels non-preemptible execution as **3× base prices**, but the [preemption guide](https://modal.com/docs/guide/preemption) supplies the boundary:

- `nonpreemptible=True` applies a 3× multiplier to CPU and memory usage;
- the parameter is not supported for GPU Functions; and
- CPU-only Sandboxes are not subject to preemption, while GPU Sandboxes can be preempted.

For a CPU Function requesting one physical core and 8 GiB for 100 hours, the current CPU-plus-memory estimate is **$11.11**. Non-preemptible execution makes that component about **$33.33**. Do not multiply a GPU Function's accelerator price by three; Modal says the setting is unavailable there.

## Volumes can remain billable after deletion

Modal's pricing page, checked September 18, lists Volumes at **$0.09 per GiB-month**. The card also displays “includes 1 TiB/month free” without identifying the free unit in the extracted rate row, so this guide does not assume it means 1 TiB of free storage. Confirm the current dashboard and terms before subtracting it.

Modal's [Volumes guide](https://modal.com/docs/guide/volumes), checked September 18, says storage usage is snapshotted daily. Deleted data may remain billable for up to four days because of underlying processing. A 500-GiB Volume therefore has a gross list-price estimate of **$45 per month** before any applicable inclusion:

```text
500 GiB × $0.09/GiB-month = $45/month
```

This is a storage-capacity estimate, not an invoice prediction. Retention time, daily snapshots, deletion lag, credits, and any included usage can change the result.

## Verdict

Modal remains a strong platform for bursty Python and GPU work, but its bill follows resource allocation, not request count. Ask five questions before trusting a headline GPU rate:

1. Is this a Function, Sandbox, or Notebook?
2. Is placement automatic, broad-region at 1.15×, or narrow-region at 1.75×?
3. What CPU, memory, disk, and GPU resources are requested or actually used?
4. What warm floor and scale-down window are configured?
5. How many total seconds do those resources remain allocated?

The September correction makes broad regional placement materially cheaper than HostFleet's August baseline. The one-L4 example is **$91.03 for 100 automatic-placement Function hours**, **$104.68 for broad placement**, and **$159.30 for narrow placement**. The same 100-hour resource bundle as a Sandbox is **$113.32**, **$130.32**, or **$198.31** respectively.

Use Starter to profile one representative deployment. Do not use a 60-second scale-down maximum as a guaranteed per-request bill. Add narrow placement only when latency, residency, or an external dependency justifies the 75% uplift. If a measured deployment needs one GPU online continuously, compare the 720-hour total with a fixed-capacity alternative. [RunPod's Pods-versus-Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains that different operational boundary.

## Sources

Official provider sources were checked **September 18, 2026**, except the explicitly dated September 2 scale-down range audit.

- [Modal pricing](https://modal.com/pricing) — GPU, Function CPU and memory, Sandbox and Notebook CPU and memory, Volume price, plan limits, current region-multiplier summary, and non-preemptible summary
- [Modal billing guide](https://modal.com/docs/guide/billing) — billing frequency, gross billing reports, credits, and report availability
- [Modal region-selection guide](https://modal.com/docs/guide/region-selection) — current 1.15× and 1.75× multipliers, routing, placement, and multiple-region behavior
- [Modal resource configuration](https://modal.com/docs/guide/resources) — request-versus-actual billing, default requests, ephemeral-disk ratio, and disk maximum
- [Modal preemption guide](https://modal.com/docs/guide/preemption) — CPU and memory multiplier, unsupported GPU Function boundary, and Sandbox behavior
- [Modal Volumes guide](https://modal.com/docs/guide/volumes) — daily accounting and deletion lag
- [Modal scaling guide](https://modal.com/docs/guide/scale) — scale-to-zero default, warm-container controls, idle-window semantics, and early termination caveat
- [Modal cold-start guide](https://modal.com/docs/guide/cold-start) — boot-versus-readiness distinction and initialization behavior
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated September 17, 2026
- HostFleet full source-verification ledger — `/opt/hostbot/data/ai-hosting/notes/2026-09-17-gpu-pricing-full-verification.md`
- HostFleet Modal scale-to-zero audit — `/opt/hostbot/data/ai-hosting/notes/2026-09-02-modal-scale-to-zero-billing-boundary.md`
- Live article baseline — `/opt/hostbot-v2/src/content/posts/modal-pricing-guide-2026.md`

*Need a fixed GPU Pod after measuring the always-warm case? This is a labeled affiliate link: [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod). Source citations above are direct, non-affiliate links.*
