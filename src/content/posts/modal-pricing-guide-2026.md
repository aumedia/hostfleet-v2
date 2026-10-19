---
title: "Modal pricing 2026: GPU rates and how to reconcile the bill"
description: "Modal pricing checked October 19, 2026: 11 GPU rates, full resource costs, idle windows, and a billing workflow for closed hours, App attribution, and credits."
pubDate: 2026-07-25
updatedDate: 2026-10-19
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet methodology and affiliate policy](https://hostfleet.net/about/) for how sourced, estimated, and measured claims are separated.*

**Source-backed pricing and billing guide; estimates are labeled.** Modal's public rates, plan ceilings, resource rules, region multipliers, and billing documentation were checked on **October 19, 2026**. HostFleet did not run a paid deployment, access a customer billing report, inspect a settled invoice, or benchmark performance, cold starts, capacity, or regional availability. The billing workflow below is documentation-backed, not a completed experiment.

> **Pricing and documentation verified:** October 19, 2026<br>
> **Currency:** public USD list rates; account-specific rates can differ<br>
> **Evidence:** sourced behavior and transparent arithmetic, not measured bills

# Modal pricing 2026: GPU rates and how to reconcile the bill

Modal's price is not just GPU seconds. Add CPU and memory, execution surface, region selection, warm containers, and retained storage. Then distinguish gross resource cost from the amount invoiced after adjustments.

The operational trap in this refresh is the billing report itself. An hourly query excludes a partial final interval. A report requested immediately after a short job can therefore omit the hour containing that job. A missing row is not evidence that the work was free, and an hourly report bucket is not an hourly minimum charge.

The short answer: **one L4 is $0.000222 per GPU-second, or $0.7992 per GPU-hour**, before CPU, memory, placement, and other charges. A Function with one L4, one physical core, and 8 GiB held for 100 hours has a gross automatic-placement estimate of **$91.03**. The same bundle becomes **$104.68** with broad-region placement or **$159.30** with narrow placement. These estimates use the [October 19 public rate card](https://modal.com/pricing) and [region rules](https://modal.com/docs/guide/region-selection), not a measured invoice.

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

## Modal GPU prices rechecked October 19

[Modal's public pricing page](https://modal.com/pricing), rechecked October 19, publishes GPU rates per second. The hourly column below multiplies each source rate by 3,600. The 30-day column multiplies it by 2,592,000 seconds, or 720 hours. These are GPU-only arithmetic estimates, not separate Modal billing units.

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

**Estimate assumptions:** one GPU stays allocated for the stated time; no CPU, memory, workspace-plan, region, Volume, tax, support, reservation, or credit adjustment. All 11 raw Modal rates match the existing dataset cells and the October 19 provider check. The sitewide dataset verification date remains September 24: this is a Modal-only refresh, not a full-provider audit. The same rates appear in [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

A published rate does not prove stock, quota, region access, cold-start time, throughput, or software compatibility. The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) keeps Modal Functions separate from Pods, VMs, and other managed deployment shapes.

## Starter and Team do not make compute all-inclusive

Modal's plan table at [modal.com/pricing](https://modal.com/pricing) lists the following public prices and limits. All prices and limits below were rechecked October 19, 2026:

| Plan | Base price | Included compute | Containers | GPU concurrency | Selected cost controls |
|---|---:|---:|---:|---:|---|
| Starter | $0/month + compute | $30/month | 100 | 10 | Workspace-level budgets; up to 3 seats |
| Team | $250/month + compute | $100/month | 5,000 | 50 | Environment-level budgets, billing exports, unlimited seats |
| Enterprise | Custom | Custom | Custom | Custom | Custom security, support, and commercial terms |

### GPU concurrency is not throughput

Modal's [pricing page](https://modal.com/pricing), checked **October 19, 2026**, publishes **10 GPU concurrency and 100 containers for Starter**, versus **50 GPU concurrency and 5,000 containers for Team**. The container ceiling is not an alternative GPU allowance. For a design that requires 11 simultaneously running one-GPU containers, Starter's published 10-GPU ceiling is already insufficient. Team's published 50-GPU ceiling is a larger planning envelope, not a guarantee that 11 compatible GPUs will be available when you launch.

This limit also does not translate into a requests-per-second figure. Input concurrency inside a container, batch size, model loading, and work duration determine service throughput; the plan table does not measure any of them. Check the target workspace's effective quota and chosen GPU's availability before promising a launch size. HostFleet has **not** tested actual concurrent launches or inventory.

A 10-container L4 fleet held for 100 hours illustrates the cost boundary: `10 × $0.000222/GPU-second × 360,000 seconds = $799.20` for **GPU allocation alone**, using Modal's October 19 public rate. CPU, memory, region multipliers, storage, credits, and plan charges are excluded. Modal's [resource guide](https://modal.com/docs/guide/resources), checked October 19, says CPU and memory billing uses the higher of requested or actual usage; a large ephemeral-disk request can also raise the billable memory request at a **20:1 disk-to-memory ratio**. Do not multiply a GPU-only row by a concurrency ceiling and call it a complete invoice.

The phrase **plus compute** is the important one. Included compute is a credit against eligible usage, not a lower GPU rate. Build the gross resource estimate first, then apply the current credit and plan rules.

Modal's [billing guide](https://modal.com/docs/guide/billing), checked October 19, says programmatic billing reports are available on Team and Enterprise. The reports show cost before credits or reservations, so their sum can exceed the invoice. That gross view is useful because it exposes which App or resource is consuming allocation before a credit hides it.

### Workspace budget, spend limit, and Environment budget are different

Modal's [budget guide](https://modal.com/docs/guide/budgets), checked October 19, distinguishes three controls:

| Control | What it caps | What it does not establish |
|---|---|---|
| Workspace budget, also called usage limit | Total cycle usage **before credits** | The same amount of out-of-pocket spend |
| Workspace spend limit | Net charges **after credits** | A cutoff for work still covered by applicable credits |
| Environment budget, Team/Enterprise | Compute usage in one Environment | A full invoice cap including storage, reservations, and network egress |

Modal calls the Workspace budget the hard outer usage cap. Environment budgets are enforced together with it; their sum does not raise it. The documentation's example is a $100 usage limit minus $30 credit producing a default $70 spend limit. Those are example inputs, not extra plan entitlements.

The guide does not specify second-exact enforcement latency or an overshoot bound. For a short test, use a separate cleanup deadline and monitor lifecycle independently; delayed billing exports are not a live abort signal. Do not change a shared Workspace's limits just to isolate one experiment.

## Region selection now adds 15% or 75%

Modal's [region-selection documentation](https://modal.com/docs/guide/region-selection), checked October 19, applies a multiplier to any Function or Sandbox with a container region defined.

| Placement choice | Example | Current multiplier |
|---|---|---:|
| Automatic placement | No `region=` argument | Base price |
| Broad region | `region="eu"` or `region="us"` | **1.15×** |
| Narrow region | `region="eu-west"` or `region="us-west"` | **1.75×** |

The multiplier covers the Function or Sandbox resource bundle, not only the GPU. Modal's example adds GPU, CPU, and memory, then applies the multiplier. If requested regions span the broad and narrow categories, the documentation says the smaller multiplier applies.

Modal routes Function inputs through Virginia by default. A container region can place compute nearer an external database, while `routing_region=` changes the Function traffic path. Narrow placement can reduce network distance, but it also shrinks the scheduling pool and raises the public usage price by 75%.

Do not pin a region because it sounds production-ready. First measure whether geography materially changes end-to-end latency, data residency, or an external service's transfer bill.

## Worked example: one L4 Function with current region multipliers

Assume one L4, one physical CPU core, and 8 GiB of memory remain allocated together. Modal's October 19 standard Function rates are sourced from [its pricing page](https://modal.com/pricing):

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

At these rates, broad placement adds **$13.65 per 100 allocated hours** to the automatic-placement bundle; narrow placement adds **$68.27**. These differences use the unrounded resource rate before rounding the final totals.

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to test a realistic allocation profile instead of defaulting to either one inference second or a full warm month.

## Scale-to-zero still has a billable idle tail

Modal's [scaling guide](https://modal.com/docs/guide/scale), rechecked October 19, says Functions scale to zero by default when there are no inputs. It also defines three controls with different cost effects:

- `min_containers` keeps a floor of warm containers even while a Function is inactive;
- `buffer_containers` adds idle capacity while a Function is active; and
- `scaledown_window` is the maximum time a container may remain idle during scale-down.

The guide explicitly frames those settings as a cost-versus-latency tradeoff. It also warns that a substantially over-provisioned App may terminate containers before the full scale-down window. The [cold-start guide](https://modal.com/docs/guide/cold-start), rechecked October 19, gives a default maximum idle time of 60 seconds and a configurable range from 2 seconds to 20 minutes.

Using Modal's October 19 L4 rate of $0.000222 per GPU-second, the GPU-component estimates for the stated allocated durations are:

| Idle or warm setting | Arithmetic | GPU component |
|---|---:|---:|
| 2-second idle window | 2 × $0.000222 | $0.000444 |
| 60-second idle window | 60 × $0.000222 | $0.013320 |
| 5-minute idle window | 300 × $0.000222 | $0.066600 |
| 20-minute idle window | 1,200 × $0.000222 | $0.266400 |
| One L4 reserved for 720 hours | 720 × $0.7992 | $575.42 |

These are **duration-based estimates**, not measured scale-down charges, all-in caps, or a claim that every request pays a full tail. A later request may reuse the container, or Modal may terminate it early. They also exclude CPU and memory. For the one-core, 8-GiB L4 bundle above, a continuously warm 720-hour Function is **$655.41** before region multipliers, credits, and storage.

The exact GPU allocation start and stop events remain unmeasured. Modal's documentation says container readiness can range from seconds to minutes once initialization is included; the roughly one-second statement in its [cold-start guide](https://modal.com/docs/guide/cold-start) refers to container boot, not universal model-ready or first-token latency. Do not turn either statement into a guaranteed cold-start number.

For operational behavior beyond the rate card, read [Modal for AI inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/).

## Sandboxes and Notebooks have a different rate card

Modal's pricing page, checked October 19, separates standard Function CPU and memory from **Sandbox and Notebook pricing**:

| Resource | Standard Function rate | Sandbox and Notebook rate | Planning effect |
|---|---:|---:|---|
| CPU | $0.0000131/core-sec | $0.00003942/core-sec | About 3× before placement multipliers |
| Memory | $0.00000222/GiB-sec | $0.00000667/GiB-sec | About 3× before placement multipliers |
| GPU | Standard GPU table | Standard GPU table | GPU price itself is not tripled |

For the same one-L4, one-core, 8-GiB bundle, the October 19 Sandbox estimate starts at **$1.1332/hour**, versus **$0.9103/hour** for a Function.

| Surface and placement | 100-hour estimate |
|---|---:|
| Function, automatic placement | $91.03 |
| Sandbox, automatic placement | $113.32 |
| Sandbox, broad region at 1.15× | $130.32 |
| Sandbox, narrow region at 1.75× | $198.31 |

The narrowly pinned Sandbox costs more than twice the automatic Function estimate even though both request the same GPU, CPU count, memory, and duration. The difference comes from the higher Sandbox CPU and memory rates plus the 1.75× placement multiplier.

Sandboxes solve a different problem: interactive or agent-controlled compute with burstable resources. Teams building coding agents, isolated tool runners, or user sessions should model the Sandbox table directly.

## Requested resources, actual usage, and ephemeral disk

Modal's [resource configuration guide](https://modal.com/docs/guide/resources), checked October 19, says a Function or Sandbox starts with a default request of 0.125 CPU cores and 128 MiB of memory. CPU and memory billing uses whichever is higher: the request or actual usage.

That creates two failure modes:

- over-requesting raises the bill even when the application never uses the resources; and
- under-requesting does not create a hard price ceiling if the container bursts above the request.

Ephemeral disk is coupled to memory billing through a **20:1 disk-to-memory ratio**. Requesting 500 GiB of ephemeral disk raises the memory request to 25 GiB if it was lower. At Modal's October 19 standard Function memory rate, 25 GiB held for 100 hours is about **$19.98**. At the Sandbox rate, the same billing equivalent is about **$60.03**, before any region multiplier.

Those figures use `500 GiB ÷ 20`, the current memory rates, and 360,000 seconds. They exclude other memory actually used. The documented maximum ephemeral-disk request is 3 TiB.

## Non-preemptible pricing is not a GPU-Function option

Modal's October 19 plan comparison labels non-preemptible execution as **3× base prices**, but the [preemption guide](https://modal.com/docs/guide/preemption) supplies the boundary:

- `nonpreemptible=True` applies a 3× multiplier to CPU and memory usage;
- the parameter is not supported for GPU Functions; and
- CPU-only Sandboxes are not subject to preemption, while GPU Sandboxes can be preempted.

For a CPU Function requesting one physical core and 8 GiB for 100 hours, the current CPU-plus-memory estimate is **$11.11**. Non-preemptible execution makes that component about **$33.33**. Do not multiply a GPU Function's accelerator price by three; Modal says the setting is unavailable there.

## Volumes can remain billable after deletion

Modal's pricing page, checked October 19, lists Volumes at **$0.09 per GiB-month**. The card also displays “includes 1 TiB/month free” without identifying the free unit in the extracted rate row, so this guide does not assume it means 1 TiB of free storage. Confirm the current dashboard and terms before subtracting it.

Modal's [Volumes guide](https://modal.com/docs/guide/volumes), checked October 19, says storage usage is snapshotted daily. Deleted data may remain billable for up to four days because of underlying processing. A 500-GiB Volume therefore has a gross list-price estimate of **$45 per month** before any applicable inclusion:

```text
500 GiB × $0.09/GiB-month = $45/month
```

This is a storage-capacity estimate, not an invoice prediction. Retention time, daily snapshots, deletion lag, credits, and any included usage can change the result.

## How to reconcile Modal usage without losing the final hour

The [billing guide](https://modal.com/docs/guide/billing) and [Workspace SDK reference](https://modal.com/docs/sdk/py/latest/Workspace), checked October 19, describe separate rate, report, and summary interfaces. They answer different questions.

| Interface | Useful for | Boundary |
|---|---|---|
| `Workspace.billing.rates()` | Current Workspace resource prices as `Decimal` values | Public rounded hourly cells are not a substitute for account rates |
| `Workspace.billing.report()` | Per-object, per-resource cost over time | Default daily buckets; excludes a partial final interval |
| `Workspace.billing.summary()` | Cycle `metered_cost`, `billed_cost`, and `adjustments` | Workspace-wide reconciliation, not a per-request meter |

Programmatic billing exports require **Team or Enterprise**. Starter's lack of report access does not prove zero usage. Use the available dashboard and invoices; do not assume this workflow works on every plan.

### 1. Identify the App before using tags

For an isolated cost check, record a newly created App's immutable object ID, Environment, deployment/configuration identity, and UTC observation times. Set unique tags before deployment and leave them unchanged during collection. Keep unrelated traffic out of that App.

Requesting `tag_names=["*"]` includes tags in output; it does not create a per-trial time filter. Modal says tags apply to the **entire report interval even if added or removed during it**. Retagging a busy App halfway through an hour cannot cleanly split that hour's cost between two trials. Match object ID and interval first; treat tags as labels, not proof of isolation.

### 2. Query closed UTC hours, not the instant the job returns

The report API rounds `start` down to the interval boundary. Its `end` is exclusive, and it **excludes partial final intervals**. Specify `resolution="h"` for hourly rather than accepting the daily default.

Illustrative timing, not a measured run: an isolated job and its cleanup fall between 10:05 and 10:08 UTC. Querying through 10:08 can omit the 10:00–11:00 bucket. After 11:00 has passed, request the closed interval from 10:00 inclusive to 11:00 exclusive, then allow a collection buffer. If cleanup crosses 11:00, include the next hour too, after that hour closes.

```python
# Read-only report example. Replace times with the closed UTC interval
# containing your observation and cleanup. Requires existing report access.
from datetime import datetime, timezone
import modal

workspace = modal.Workspace.from_context()
rates = workspace.billing.rates()
rows = workspace.billing.report(
    start=datetime(2026, 10, 18, 10, 0, tzinfo=timezone.utc),
    end=datetime(2026, 10, 18, 11, 0, tzinfo=timezone.utc),
    resolution="h",
    tag_names=["*"],
)
# Preserve raw rows and all resource keys; identify your exact App object.
# Keep Decimal values lossless rather than converting them to floats.
```

The SDK signature and interval behavior are source-verified; HostFleet has not executed this account-gated example. It retrieves Workspace rows, so unrelated objects must not be added to the target App's cost. The reporting interval is a visibility boundary, **not a minimum usage-time increment**: Modal's billing guide explicitly says there are no minimum usage-time increments.

### 3. Allow for collection lag and distinguish gross from net

Modal says data is generally available within minutes, but collection delays can occur. It recommends a buffer after the query interval; it does not guarantee one settlement deadline. Requery the **same closed interval**, preserve each export, and treat missing rows as unknown rather than zero. Repeated identical exports are useful provisional evidence, not a guarantee of final completeness.

Keep GPU, CPU, memory, and every other returned resource key separate; Modal warns that the resource breakdown can change. Check broader Environment or Workspace costs for builds and ancillary objects outside the target App. An App-only subtotal can miss those charges.

Granular reports are **before credits, reservations, and the network-egress allowance**. Compare their gross resource totals with the cycle summary's `metered_cost`, then inspect `adjustments` and `billed_cost` to explain invoice differences. Do not force a gross resource export to equal the amount charged to a card.

### 4. Do not turn cost buckets into exact stop timestamps

A narrowly isolated L4 resource charge divided by the exact matching Workspace L4-per-second rate can produce **equivalent aggregate billed seconds**. That is derived arithmetic, not a measured allocation-start or stop time. Confirm the resource mapping, unchanged rate, cost precision, and isolation before using it. If amounts are quantized, the charge increment divided by the rate sets a lower bound on duration resolution.

Use the [Function API](https://modal.com/docs/sdk/py/latest/Function)'s `get_current_stats()` for current container/input counts and `autoscaler.settings()` for effective settings. The [App CLI](https://modal.com/docs/cli/latest/app) documents `info --json`, `list --json`, and `stop` for lifecycle evidence and teardown of the exact App. An exit log, zero-count snapshot, or successful stop command is not by itself a settled meter reading. A different container UUID in a different App also says nothing about whether the original App stopped.

For a small deployment evaluation, capture rates and settings before work; observe and stop the original App; then reconcile all closed hours after cleanup. HostFleet's scale-to-zero smoke remains **designed, unrun, and gated on existing account access**. No phase-exact idle-tail result or paid-spend measurement is claimed here.

## Verdict

Modal remains a strong platform for bursty Python and GPU work, but its bill follows resource allocation, not request count. Ask six questions before trusting a headline GPU rate:

1. Is this a Function, Sandbox, or Notebook?
2. Is placement automatic, broad-region at 1.15×, or narrow-region at 1.75×?
3. What CPU, memory, disk, and GPU resources are requested or actually used?
4. What warm floor and scale-down window are configured?
5. How many total seconds do those resources remain allocated?
6. Is the report complete for the closed observation interval, and is it gross usage or net invoiced cost?

Using the October 19 public rates, the one-L4 example is **$91.03 for 100 automatic-placement Function hours**, **$104.68 for broad placement**, and **$159.30 for narrow placement**. The same 100-hour resource bundle as a Sandbox is **$113.32**, **$130.32**, or **$198.31** respectively.

Use Starter to profile one representative deployment. Do not use a 60-second scale-down maximum as a guaranteed per-request bill. Add narrow placement only when latency, residency, or an external dependency justifies the 75% uplift. If a measured deployment needs one GPU online continuously, compare the 720-hour total with a fixed-capacity alternative. [RunPod's Pods-versus-Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains that different operational boundary.

## Continue the deployment decision

The GPU rate is only useful after the serving lifecycle is chosen. Follow the next question that matches the workload:

- **Need request-driven scale-to-zero?** Compare wake behavior, idle windows, and published billing shapes in the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).
- **Need to budget a measured traffic pattern?** Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to separate useful runtime from warm, startup, and retained-resource time.
- **Need one GPU online continuously?** Compare the full Pod-versus-Serverless boundary in [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/).

## Sources and verification notes

All linked Modal sources below were checked **October 19, 2026**. The prices and examples use public USD list rates; the billing workflow is sourced, not account-tested. No benchmark, paid smoke, exact billing-cutoff timestamp, or final report precision was measured.

- [Modal pricing](https://modal.com/pricing) — all 11 GPU rates, Function and Sandbox/Notebook resource prices, plan charges, credits, concurrency ceilings, and Volume rate
- [Billing guide](https://modal.com/docs/guide/billing) — no minimum time increment, Team/Enterprise reports, collection lag, tag attribution, and gross report basis
- [Workspace SDK](https://modal.com/docs/sdk/py/latest/Workspace) — exact account rates, interval rounding/exclusion, changing resource keys, and cycle metered/billed cost with adjustments
- [Budgets](https://modal.com/docs/guide/budgets) — pre-credit Workspace usage, post-credit spend, and compute-only Environment limits
- [Region selection](https://modal.com/docs/guide/region-selection) — 1.15× broad and 1.75× narrow multipliers and placement scope
- [Resources](https://modal.com/docs/guide/resources) — higher-of-request-or-use CPU/memory billing, limits, and 20:1 disk-to-memory adjustment
- [Scaling](https://modal.com/docs/guide/scale) and [cold starts](https://modal.com/docs/guide/cold-start) — warm floor, idle buffer, configurable maximum idle window, early termination, and readiness caveats
- [Function SDK](https://modal.com/docs/sdk/py/latest/Function) and [App CLI](https://modal.com/docs/cli/latest/app) — passive state inspection, effective autoscaler settings, and explicit App teardown
- [Preemption](https://modal.com/docs/guide/preemption) — non-preemptible CPU/memory pricing and unsupported GPU Function setting
- [Volumes](https://modal.com/docs/guide/volumes) — daily usage snapshots and possible four-day deletion-billing lag

The rate table was reconciled with HostFleet's existing GPU dataset, whose sitewide verification date remains September 24, 2026. This refresh does not redate other providers. HostFleet's October 19 Modal billing-attribution audit informs the workflow; its proposed paid experiment has not been run. See the [methodology](https://hostfleet.net/about/) for the distinction between sourced, estimated, and measured evidence.

*Need a fixed GPU Pod after measuring the always-warm case? This is a labeled affiliate link: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Source citations above are direct, non-affiliate links.*
