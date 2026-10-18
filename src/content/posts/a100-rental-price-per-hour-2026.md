---
title: "A100 rental prices 2026: 21 rates and billing traps"
description: "Compare 21 A100 rate inputs, resolved RunPod Secure pricing, higher Verda rates and Lambda billing traps: delayed credits and unfinished termination."
pubDate: 2026-07-31
updatedDate: 2026-10-18
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through the labeled signup link on this page. That does not change the analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed A100 pricing comparison; calculated totals are estimates, not measured invoices.** We checked all 21 selected A100 rate inputs against official pricing pages and public vendor APIs on **October 18, 2026**. RunPod's previous Secure Cloud price conflict is resolved, Verda's exact rates have increased again, and Lambda's billing documentation explains why an unchanged credit balance does not establish zero spend. No GPU was rented, capacity confirmed, workload benchmarked or account invoice inspected.

> **Selected A100 rates and cited billing rules checked:** October 18, 2026<br>
> **Currency:** public USD list prices before applicable tax<br>
> **Planning interval:** 720 billable hours, not a quoted monthly plan<br>
> **Dataset-wide baseline:** September 24, 2026; this article's A100-only check does not advance it<br>
> **Availability:** public rates do not establish regional stock, quota or account access

# A100 rental prices in 2026: 21 rates and billing traps

For the selected products, **Jarvis Labs has the lowest 40 GB rate at $0.89/GPU-hour**, while **Thunder Compute has the lowest 80 GB VM base at $1.09/hour**. Those October 18 list-rate observations produce estimated 720-hour compute totals of **$640.80** and **$784.80**, respectively. They do not establish equal performance or availability.

The more useful buying question is what the number includes and what ends the meter. Thunder's base includes eight vCPUs. RunPod's Secure A100 PCIe Pod is now consistently listed at $1.79/hour. Lambda bills by the minute, but its credits update for usage only at the end of the weekly billing cycle. Cheap hardware is not a cheap deployment if cleanup or cost tracking is wrong.

## A100 40 GB rental prices

Check weights, KV cache, runtime workspace, context and batch size before choosing the smaller card. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains that sizing step.

| Provider / product | Native price | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Jarvis Labs** | $0.89/hr | $0.89/hr | **$640.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 18, 2026 |
| **Verda** | $1.486/hr | $1.486/hr | **$1,069.92** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Oct. 18, 2026 |
| **Lambda Cloud** | $1.99/hr | $1.99/hr | **$1,432.80** | 1x PCIe 40 GB VM; 30 vCPU, 225 GiB RAM, 512 GiB SSD | [Official source](https://lambda.ai/instances), Oct. 18, 2026 |
| **Modal** | $0.000583/sec | $2.0988/hr | **$1,511.14** | GPU allocation only; CPU and memory extra | [Official source](https://modal.com/pricing), Oct. 18, 2026 |
| **Paperspace** | $3.09/hr | $3.09/hr | **$2,224.80** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 18, 2026 |

**Separate GPU component:** [Northflank pricing](https://northflank.com/pricing), checked October 18, lists A100 40 GB at **$1.42/GPU-hour**. Its **$1,022.40** 720-hour GPU-component total excludes CPU, memory, persistent disk and egress. We keep it outside the product ordering because it is not a complete service quote.

## A100 80 GB rental prices

These are rate-only orderings across different products: a VM, Pod, application Instance, serverless worker and managed replica do not buy the same operational surface. Modal's GPU allocation excludes CPU and memory; the other inclusions also differ.

| Provider / product | Native price | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Thunder Compute** | $1.09/hr | $1.09/hr | **$784.80** | 8 vCPU, 64 GB RAM, first 100 GB disk included | [Official source](https://www.thundercompute.com/pricing), Oct. 18, 2026 |
| **Hyperstack** | $1.35/hr | $1.35/hr | **$972.00** | Selected PCIe VM; CPU, RAM and local storage included | [Official source](https://www.hyperstack.cloud/gpu-pricing), Oct. 18, 2026 |
| **Massed Compute** | $1.35/hr | $1.35/hr | **$972.00** | Base VM; not its separate SXM4 offer | [Official source](https://vm.massedcompute.com/pricing), Oct. 18, 2026 |
| **Jarvis Labs** | $1.49/hr | $1.49/hr | **$1,072.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 18, 2026 |
| **Koyeb** | $1.60/hr | $1.6/hr | **$1,152.00** | A100 application Instance; not the separate SXM tier | [Official source](https://www.koyeb.com/pricing), Oct. 18, 2026 |
| **RunPod Secure Pods** | $1.79/hr | $1.79/hr | **$1,288.80** | Secure Cloud A100 PCIe Pod; disks extra | [Official source](https://www.runpod.io/pricing), Oct. 18, 2026 |
| **Verda** | $2.036/hr | $2.036/hr | **$1,465.92** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Oct. 18, 2026 |
| **Vultr Cloud GPU** | $2.397/hr | $2.397/hr | **$1,725.84** | Selected API plan; locations list empty, stock unconfirmed | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 18, 2026 |
| **Modal** | $0.000694/sec | $2.4984/hr | **$1,798.85** | GPU allocation only; CPU and memory extra | [Official source](https://modal.com/pricing), Oct. 18, 2026 |
| **CoreWeave Inference** | $2.70/hr | $2.7/hr | **$1,944.00** | Inference-platform customers; not a self-service VM | [Official source](https://www.coreweave.com/pricing), Oct. 18, 2026 |
| **RunPod Serverless Flex** | $2.72/hr | $2.72/hr | **$1,958.40** | Worker-tier rate; not a reserved card | [Official source](https://www.runpod.io/pricing), Oct. 18, 2026 |
| **Paperspace** | $3.18/hr | $3.18/hr | **$2,289.60** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 18, 2026 |
| **Baseten** | $0.06667/min | $4.0002/hr | **$2,880.14** | Managed deployment; native price per minute | [Official source](https://www.baseten.co/pricing/), Oct. 18, 2026 |
| **Replicate** | $0.001400/sec | $5.04/hr | **$3,628.80** | Private deployment; online time includes setup and idle | [Official source](https://replicate.com/pricing), Oct. 18, 2026 |

**Separate GPU component:** [Northflank pricing](https://northflank.com/pricing), checked October 18, lists A100 80 GB at **$1.76/GPU-hour**, or **$1,267.20** for 720 GPU-component hours before CPU, memory and other resources.

The two tables contain **19 selected product rates**; the two Northflank components bring the total to **21 checked inputs**. Each conversion uses the native rate before final cent rounding. The 720-hour estimates exclude tax, credits, discounts, billing-unit rounding, extra replicas, separately billed resources and account-plan charges.

These tables start from the A100 entries in the same `gpu-pricing.json` baseline used by the [live GPU pricing table](https://hostfleet.net/gpu-pricing/), then apply this article's direct vendor checks. The wider dataset has its own verification scope: the Verda inputs below supersede its retained October 15 A100 values for this calculation. This draft does not represent a full-market dataset refresh.

## RunPod: the Secure Cloud price conflict is resolved

On October 15, the [RunPod pricing page](https://www.runpod.io/pricing) showed **$1.79/hour** for A100 PCIe Secure Cloud in its visible table but **$1.59/hour** in its embedded offer. This guide excluded the Pod entry while those official representations disagreed.

The October 18 capture now agrees across the visible table, explicit Secure Cloud price attribute and embedded Secure Cloud offer: **$1.79/hour**. The selected Pod returns to the 80 GB table with a **$1,288.80** compute-only estimate for 720 hours. Using the superseded $1.59 input would understate that estimate by **$144.00**. This is a resolved source discrepancy, not proof of the date a customer-facing tariff changed.

Do not substitute Community Cloud inventory, A100 SXM or a Serverless worker when quoting this PCIe Secure Cloud Pod. The separate **$2.72/hour Serverless Flex A100 tier** was independently rechecked on the same page. A continuously billable 720-worker-hour scenario is **$1,958.40**, not a prediction that a scale-to-zero endpoint must run all month.

Stopping compute does not remove every charge. RunPod's [Pod pricing documentation](https://docs.runpod.io/pods/pricing), checked October 18, says container-disk data is erased when a Pod stops, while a retained volume disk keeps billing. Its listed volume-disk rate is **$0.10/GB-month while running** and **$0.20/GB-month while stopped**; network volumes are separate. Record the persistence model before choosing stop versus terminate.

The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the wider Pod/Serverless split. Confirm the exact card, region, storage and account-visible quote before launch.

## Verda: refresh the exact SKU, not the rounded headline

Verda's [pricing page](https://verda.com/pricing) and [public instance catalog](https://api.verda.com/v1/instance-types) agree on these October 18 one-GPU on-demand inputs. Both shapes include **22 CPU and 120 GB RAM**; storage is separate. These are not spot or serverless prices.

| Exact VM | Previous October 15 observation | October 18 input | Change per hour | Change over 720 hours |
|---|---:|---:|---:|---:|
| `1A100.40S.22V`, 40 GB SXM4 | $1.442 | **$1.486** | +$0.044 | **+$31.68** |
| `1A100.22V`, 80 GB SXM4 | $1.976 | **$2.036** | +$0.060 | **+$43.20** |

The previous values are this guide's retained October 15 source observations, not current purchase quotes. The roughly **3.1%** and **3.0%** increases compare retrievals; they are not a vendor-announced effective date. Use exact native values in a forecast rather than multiplying a rounded two-decimal comparison cell.

Verda's [shutdown/deletion guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/), checked October 18, says shutdown instances continue charging. At the selected 80 GB rate:

- Eight billable hours: `2.036 × 8 = $16.288`, or **$16.29**.
- Another 160 billable hours after a shutdown-only mistake: **$325.76**.
- The resulting 168-hour compute total: **$342.05**, before retained storage and other charges.

Its [billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), also checked October 18, describes prepaid **10-minute increments**, with the unused portion after termination refunded within the next billing period. One nominal 10-minute prepayment at $2.036/hour is approximately **$0.3393**. That is cash-flow arithmetic, not evidence of a nonrefundable 10-minute minimum. Delete the compute instance and explicitly choose which storage to delete; unselected storage remains chargeable.

## Lambda: credits and termination responses are not settled usage

Lambda's [one-GPU catalog](https://lambda.ai/instances), checked October 18, has separate **A100 40 GB PCIe and SXM rows at $1.99/GPU-hour**. The comparison table uses the PCIe configuration: **30 vCPU, 225 GiB RAM and 512 GiB SSD**. The one-GPU SXM row has **30 vCPU, 220 GiB RAM and 512 GiB SSD**. Equal GPU prices do not make their memory, topology or host configuration identical.

Keep three kinds of evidence separate:

| Evidence | What it tells you | What it does not establish |
|---|---|---|
| Catalog price or API instance-type quote | The listed rate and machine shape | Accrued spend or current stock |
| Credit balance | Credits awarded and usage applied after the weekly cycle | A live spending meter |
| Termination API response | The control plane accepted and reported the operation | Immediate completion or a second-exact billing cutoff |

### Do not multiply a whole-instance API quote twice

The [public Cloud API schema](https://docs.lambda.ai/api/cloud/), checked October 18, defines `price_cents_per_hour` as the instance-type price in US cents per hour and exposes GPU count separately as `specs.gpus`. It is not a per-GPU accrued-charge counter.

For a complete-instance API quote, convert cents to dollars **once**. Only multiply by GPU count when starting from a price explicitly quoted **per GPU** for that exact multi-GPU configuration. Do not take a one-GPU table rate as proof of a multi-GPU offer, or multiply a whole-instance quote by GPU count again.

### An unchanged credit balance does not mean the run was free

Lambda's [Managing billing guide](https://docs.lambda.ai/public-cloud/manage-billing/), checked October 18, says new credits appear immediately but recent service usage is not reflected against those credits until the current weekly billing cycle ends. The same guide points to **Usage** for cost monitoring and **Payment History** for invoices.

A credit-balance delta is therefore unsuitable as the live abort signal for a short GPU test. The public guide does not establish the Usage view's refresh lag or per-instance settlement precision. Record the resource ID, quote and lifecycle timestamps, inspect the available Usage evidence, and reconcile the eventual invoice or credit application. A delayed balance is not an automatic spending cap.

### Finish teardown, then reconcile the meter

Lambda's [instance-management guide](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/), checked October 18, warns that guest `shutdown` or `poweroff` puts the instance into **Alert** while billing continues. Use Lambda's console or Cloud API termination operation instead.

Even the API response needs interpretation: the documented termination response calls its array `terminated_instances`, but its HTTP 200 example contains an instance whose status is **`terminating`**. Check the exact resource's terminal state and inventory rather than treating the array name or successful HTTP response as completed cleanup. Terminal-state observation is lifecycle evidence, not independently measured ledger cessation.

The [billing guide](https://docs.lambda.ai/public-cloud/billing/), checked October 18, specifies **one-minute increments**, ties the start to launch and passing health checks, and names termination as the end. It does not settle partial-minute rounding or a precise asynchronous cutoff. At the $1.99/hour PCIe input, eight billable hours are **$15.92**; an extra 160 billable hours are **$318.40**. Those are conditional rate-times-time estimates, not a measured shutdown penalty.

Persistent filesystems remain another meter: the same billing guide says they bill while they exist, even when unmounted. Its example storage rate is explicitly illustrative, **not a current list quote**. Confirm the creation-time price, required data retention and separate filesystem cleanup. The [filesystem guide](https://docs.lambda.ai/public-cloud/filesystems/) explains those resources; the API's approximate `bytes_used` updates every few hours, so it is not an instantaneous cost cutoff either. Export needed data before destructive cleanup.

## Thunder and CoreWeave: two different budgeting boundaries

**Thunder:** its [pricing page](https://www.thundercompute.com/pricing) and [public pricing API](https://api.thundercompute.com:8443/v1/pricing), checked October 18, support the **$1.09/hour** A100 base. The page includes **eight vCPUs, 64 GB RAM and the first 100 GB disk per GPU**. Additional vCPUs cost **$0.04/vCPU-hour**. Do not resurrect the obsolete calculation that added four mandatory paid CPUs to the base. Its [billing guide](https://www.thundercompute.com/docs/billing) documents per-minute running compute and instructs customers to delete finished instances to stop billing.

**CoreWeave:** the **$2.70/GPU-hour** A100 rate on [official pricing](https://www.coreweave.com/pricing), checked October 18, is for inference-platform customers, not a self-service one-GPU VM quote. Its [scaling guide](https://docs.coreweave.com/products/inference/scaling) requires at least **one replica** and says scale-to-zero is unsupported. Holding one selected A100 replica billable for 720 hours gives the **$1,944.00** GPU list-rate planning floor before other charges. The [billing guide](https://docs.coreweave.com/products/inference/billing) measures deployment compute in GPU-hours. The [deployment guide](https://docs.coreweave.com/products/inference/models) says disabling stops traffic and preserves configuration; it does not establish GPU release or zero charges.

## Turn the price table into a launch decision

1. **Set memory and topology requirements.** Remove 40 GB rows if the workload needs 80 GB after runtime headroom. Distinguish PCIe from SXM and single-card from multi-card configurations.
2. **Capture an account-visible quote.** Record the exact SKU, region, GPU count, native rate and included CPU, RAM and disk. Check stock separately; Vultr's selected public plan still has an empty locations list in the October 18 API capture.
3. **Budget allocation time.** Include applicable startup, useful work, retries, idle retention and warm replicas. The [GPU cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) exposes those assumptions; its inputs retain their own dates.
4. **Name the release operation.** A process exit, guest shutdown, accepted termination request and confirmed teardown are different events. Arrange control-plane cleanup that remains available if the guest fails.
5. **Inventory retained resources.** Account for disks, volumes, snapshots, addresses and any separate storage meter.
6. **Reconcile cost after cleanup.** Match resource IDs to the available usage and invoice evidence. Keep taxes and credits separate from raw compute; never label rate-equivalent minutes as directly measured billed time.

For request-waking workloads, consult the [serverless GPU matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). Koyeb's [scale-to-zero guide](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked October 18, still labels the feature public preview and gives eligible Standard CPU/GPU Instances a **five-minute default idle period**. At the selected $1.60/hour A100 rate, that nominal tail is **$0.1333**, excluding startup, useful work, other Instances and additional resources. It is not a per-request charge or a measured cutoff.

## Verdict

**Jarvis Labs' $0.89/hour 40 GB offer and Thunder's $1.09/hour 80 GB base lead these selected rate-only tables**, checked October 18. Hardware fit, account access and complete resource cost still determine whether either is usable.

**RunPod Secure A100 PCIe is back in the comparison at a consistently sourced $1.79/hour. Verda's selected 40/80 GB inputs are now $1.486/$2.036 per hour.** Update old estimates without treating a price observation as a reservation.

For Lambda, fix the monitoring and cleanup assumptions before a trial: a credit balance can lag until the weekly cycle ends, guest poweroff keeps billing, and a successful termination response can still describe an in-progress operation. A defensible deployment budget needs both a dated rate and a verified release path.

## Sources and verification notes

Every current price and billing rule linked above was checked on **October 18, 2026**. Historical RunPod October 15 prices and Verda October 15 values are explicitly labeled retained observations from this guide's previous version. Conversions and scenarios use the displayed native rates, expose their assumptions and round only final money totals.

The A100 tables use official pricing pages, with these additional checks:

- **RunPod:** visible Secure Cloud table and embedded offer agree; no authenticated quote or stock check was performed.
- **Verda:** exact on-demand SKUs match the pricing page's structured offers and public API; these article inputs supersede the wider dataset's older A100 values without changing that dataset.
- **Lambda:** rows are bound to the **1x** GPU-count tab; PCIe and SXM shapes were checked separately. API schema and response examples are documentation, not observations of a running account.
- **Vultr:** the complete [public plans response](https://api.vultr.com/v2/plans?per_page=500) supplies `vcg-a100-12c-120g-80vram` at $2.397/hour. Its marketing page returned HTTP 403. The API check does not establish deployable capacity or reconstruct monthly invoice rules.
- **Thunder:** the pricing API independently matches the A100 base; the page supplies its CPU/memory/disk inclusions.
- **Northflank:** GPU components remain outside complete-product rankings. Other products retain their own exclusions in the tables.

No hosted experiment, invoice, cold start, throughput, precise meter cutoff or storage-restoration result was measured. The actionable next step is a read-only quote, capacity and cleanup check, followed by a bounded workload test only after cost attribution and teardown are understood.

*Need self-managed Pods? This labeled affiliate link supports HostFleet at no extra cost to you: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Verify the exact GPU, region, account quote and storage behavior before purchase. Source citations remain direct and non-affiliate.*
