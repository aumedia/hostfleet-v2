---
title: "A100 rental prices 2026: exact rates and effective dates"
description: "Compare dated A100 rental rates, updated Verda costs and RunPod inputs. Separate Lambda’s future tariff, prepaid exposure and confirmed cleanup."
pubDate: 2026-07-31
updatedDate: 2026-11-10
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through the labeled signup link below. It does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed A100 pricing comparison; totals are calculated estimates, not measured invoices.** This November 10, 2026 refresh checks Verda's exact 40 GB and 80 GB VMs, RunPod's A100 Secure PCIe Pod and Serverless Flex tier, and Lambda's public price announcement. The other **16 comparison inputs retain October 18 checks**. Billing and cleanup documentation retains its separately stated October 18 or October 25 date. No GPU was rented, stock confirmed, throughput benchmarked or invoice inspected.

> **Selected Verda and RunPod rates checked:** November 10, 2026<br>
> **Lambda announcement checked:** November 10; effective November 16, 2026 at 00:00 UTC, not a current account quote<br>
> **Other 16 price inputs:** October 18, 2026; not reverified today<br>
> **Dataset-wide baseline:** September 24, 2026; this targeted article refresh does not advance it<br>
> **Currency and planning:** public USD list prices before tax; 720 billable hours is a scenario, not a monthly plan

# A100 rental prices in 2026: exact rates and the date they apply

**Verda's selected A100 40/80 GB VMs now list $1.657/$2.316 per hour.** At 720 billable hours, those rates give **$1,193.04/$1,667.52** in compute, before storage. RunPod's selected Secure PCIe Pod remains **$1.79/hour**, while its separate Flex worker tier remains **$2.72/hour**. All four inputs were checked November 10 against the official sources below.

Lambda illustrates a different trap: the public table captured today explicitly takes effect next week. Its announced one-GPU A100 40 GB rate is **$1.99/GPU-hour**, but the page directs buyers to log in for current pricing. A fresh retrieval date is not automatically a current tariff.

The retained October 18 comparison has Jarvis Labs' **$0.89/hour** 40 GB offer and Thunder's **$1.09/hour** 80 GB base at its low end. Those observations are useful shortlist inputs, **not a newly verified cheapest-provider claim**. Hardware variant, stock, required host resources and the release operation can change the buying decision.

## A100 40 GB: selected VM and GPU-allocation inputs

Check model weights, KV cache, runtime workspace, context and concurrency before choosing the smaller card. The [VRAM sizing guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains the assumptions. Lambda's future-effective quote is shown separately below rather than placed among current or historical comparison inputs without qualification.

| Provider / product | Native price | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Jarvis Labs** | $0.89/hr | $0.89/hr | **$640.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 18, 2026 |
| **Verda** | $1.657/hr | $1.657/hr | **$1,193.04** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Nov. 10, 2026 |
| **Modal** | $0.000583/sec | $2.0988/hr | **$1,511.14** | GPU allocation only; CPU and memory extra | [Official source](https://modal.com/pricing), Oct. 18, 2026 |
| **Paperspace** | $3.09/hr | $3.09/hr | **$2,224.80** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 18, 2026 |


**Separate GPU component:** [Northflank pricing](https://northflank.com/pricing), checked October 18, lists **$1.42/GPU-hour**, or **$1,022.40** for 720 GPU-component hours before CPU, memory, storage and egress. This is not a complete service quote and is not ranked with VMs.

## A100 80 GB: products with different operating boundaries

A VM, Pod, application Instance, serverless worker and managed replica do not buy the same service. Modal's GPU allocation excludes CPU and memory; other rows have their own inclusions. These are rate inputs, not equal-performance comparisons.

| Provider / product | Native price | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Thunder Compute** | $1.09/hr | $1.09/hr | **$784.80** | 8 vCPU, 64 GB RAM, first 100 GB disk included | [Official source](https://www.thundercompute.com/pricing), Oct. 18, 2026 |
| **Hyperstack** | $1.35/hr | $1.35/hr | **$972.00** | Selected PCIe VM; CPU, RAM and local storage included | [Official source](https://www.hyperstack.cloud/gpu-pricing), Oct. 18, 2026 |
| **Massed Compute** | $1.35/hr | $1.35/hr | **$972.00** | Base VM; not its separate SXM4 offer | [Official source](https://vm.massedcompute.com/pricing), Oct. 18, 2026 |
| **Jarvis Labs** | $1.49/hr | $1.49/hr | **$1,072.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 18, 2026 |
| **Koyeb** | $1.60/hr | $1.6/hr | **$1,152.00** | A100 application Instance; not the separate SXM tier | [Official source](https://www.koyeb.com/pricing), Oct. 18, 2026 |
| **RunPod Secure Pods** | $1.79/hr | $1.79/hr | **$1,288.80** | Secure Cloud A100 PCIe Pod; disks extra | [Official source](https://www.runpod.io/pricing), Nov. 10, 2026 |
| **Verda** | $2.316/hr | $2.316/hr | **$1,667.52** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Nov. 10, 2026 |
| **Vultr Cloud GPU** | $2.397/hr | $2.397/hr | **$1,725.84** | Selected API plan; locations list empty, stock unconfirmed | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 18, 2026 |
| **Modal** | $0.000694/sec | $2.4984/hr | **$1,798.85** | GPU allocation only; CPU and memory extra | [Official source](https://modal.com/pricing), Oct. 18, 2026 |
| **CoreWeave Inference** | $2.70/hr | $2.7/hr | **$1,944.00** | Inference-platform customers; not a self-service VM | [Official source](https://www.coreweave.com/pricing), Oct. 18, 2026 |
| **RunPod Serverless Flex** | $2.72/hr | $2.72/hr | **$1,958.40** | Worker-tier rate; not a reserved card | [Official source](https://www.runpod.io/pricing), Nov. 10, 2026 |
| **Paperspace** | $3.18/hr | $3.18/hr | **$2,289.60** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 18, 2026 |
| **Baseten** | $0.06667/min | $4.0002/hr | **$2,880.14** | Managed deployment; native price per minute | [Official source](https://www.baseten.co/pricing/), Oct. 18, 2026 |
| **Replicate** | $0.001400/sec | $5.04/hr | **$3,628.80** | Private deployment; online time includes setup and idle | [Official source](https://replicate.com/pricing), Oct. 18, 2026 |


**Separate GPU component:** [Northflank pricing](https://northflank.com/pricing), checked October 18, lists **$1.76/GPU-hour**, or **$1,267.20** for 720 GPU-component hours before other resources.

There are **18 product rows above, two Northflank components, and one separately dated Lambda announcement below**. The tables extend the A100 entries behind our [GPU pricing table](https://hostfleet.net/gpu-pricing/), using direct official checks where they differ from older dataset cells. This article does not modify the dataset. Each row keeps its own evidence date; a recent article update does not refresh every provider.

For hourly inputs, multiply by 720. For per-second inputs, multiply by 3,600 and then 720; for per-minute inputs, multiply by 60 and then 720. Preserve native precision and round only the final money total. All estimates exclude tax, discounts, credits, separately billed resources, additional replicas, account-plan charges and billing-unit rounding. No public catalog row establishes account access, quota or regional stock.

## Verda: an exact SKU changes the long-run estimate

**Price and machine shape checked November 10, 2026.** The [pricing page](https://verda.com/pricing) and [public instance-types API](https://api.verda.com/v1/instance-types) agree on these fixed one-GPU on-demand USD inputs. Each includes **22 CPU and 120 GB RAM**, with storage separate. Do not substitute the neighboring Spot or Serverless fields.

| Exact SKU | This guide's October 25 price | November 10 price | Difference per hour | Difference over 720 hours |
|---|---:|---:|---:|---:|
| `1A100.40S.22V`, SXM4 40 GB | $1.561 | **$1.657** | +$0.096 | **+$69.12** |
| `1A100.22V`, SXM4 80 GB | $2.149 | **$2.316** | +$0.167 | **+$120.24** |

These are differences between saved observations, not vendor-announced effective dates or proof that the increase happened today. The current 80 GB estimate is `2.316 × 720 = $1,667.52`. Calculating from a two-decimal $2.32 display instead would overstate that scenario by **$2.88**. Use the exact quote and save the region, currency and timestamp.

### Prepaid cash draw is not the same as settled usage

The [Verda billing guide](https://docs.verda.com/welcome-to-verda/pricing-and-billing/index.md), **checked October 25**, describes prepaid **10-minute increments** and refunds the unused terminated portion within the next billing period. That check date is retained; today's price check does not reverify the refund policy.

At the **November 10 $2.316/hour 80 GB rate**:

    one nominal 10-minute block = $2.316 / 6 = $0.386
    20 nominal minutes = $0.772
    three nominal prepaid blocks = $1.158

The three-block case is a stress scenario, not a claim that a 20-minute run necessarily incurs three deductions. Gross prepaid deductions, refunds and final net usage are different quantities. An elapsed-time estimate below one dollar does not establish a maximum debit below one dollar. Storage, period alignment, creation time and delayed cleanup need separate allowances.

### Shutdown is not release, and deletion is not always complete cleanup

Verda's [lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/index.md), **checked October 25**, says shutdown instances continue charging. With today's selected 80 GB rate, eight billable hours cost an estimated **$18.53**; an additional 160 unattended billable hours add **$370.56**. Those assumptions produce **$389.09** for 168 billable hours, before storage. This is a conditional failure scenario, not an observed penalty.

The same retained console guide says no storage is selected for deletion by default. The October 25 [API schema](https://api.verda.com/v1/openapi.json) instead says omitting `volume_ids` on an instance action deletes only the OS volume and detaches the rest. Inspect the exact interface you use and enumerate storage explicitly.

For disposable data, the instance action uses `delete_permanently=true`; standalone `DELETE /v1/volumes/{volume_id}` uses the different request-body field **`is_permanent=true`**. Permanent deletion is irreversible. The [storage-deletion guide](https://docs.verda.com/storage/deleting-storage/index.md), checked October 25, documents a **96-hour** restoration window and a PAYG restore charge covering the deleted interval. Preserve valuable data deliberately rather than using permanent deletion as a default.

The retained API contract documents **HTTP 207 partial failures** for `PUT /v1/instances`. Inspect every per-resource result. Check instance inventory, active volumes and trash; a failed or filtered list is not proof of absence. If creation times out after submission, reconcile the request and inventory before retrying to avoid duplicate resources.

The October 25 schema exposes a balance `amount` and `currency`, not an attributable per-instance usage ledger. `price_per_hour` and volume quote fields are not accrued charges. The [CLI cost/status guide](https://docs.verda.com/cli/cost-and-status/index.md) describes estimates; [audit logs](https://docs.verda.com/resources/audit-logs/index.md) describe actions, not independently measured billable seconds. Reconcile attributable usage and refunds separately from lifecycle observations.

## Lambda: the same number can have a different evidence status

**Announcement checked November 10, 2026.** The [instances page](https://lambda.ai/instances) states that its displayed prices take effect **November 16, 2026 at 00:00 UTC**. Until then, it directs customers to log in for current prices. We did not inspect an authenticated quote.

The **1x GPU tab** announces these A100 40 GB configurations:

| Announced one-GPU shape | CPU / RAM / storage | Announced price | 720-hour future-tariff scenario |
|---|---|---:|---:|
| A100 PCIe 40 GB | 30 vCPU, 225 GiB RAM, 512 GiB SSD | $1.99/GPU-hour | $1,432.80 |
| A100 SXM 40 GB | 30 vCPU, 220 GiB RAM, 512 GiB SSD | $1.99/GPU-hour | $1,432.80 |

**Source and date for both rows:** [Lambda instances](https://lambda.ai/instances), November 10 capture; effective November 16 at 00:00 UTC. The comparison counts only the PCIe shape as its selected Lambda input; the SXM row clarifies the separate configuration, not a second selected rate.

The prior guide observed $1.99/hour on October 18, too. An unchanged number does not prove today's account rate. The scenario assumes one GPU and all 720 billable hours under the announced tariff; it is not a quote for a job launched now or a claim about billing across the transition date. Check the account quote before scheduling work, and distinguish prices **per GPU** from complete-instance API quotes before multiplying by GPU count.

### Keep Lambda's older billing checks separate

The following official documentation retains its **October 18, 2026** check date:

- [Managing billing](https://docs.lambda.ai/public-cloud/manage-billing/) says credits appear immediately but usage is applied against them after the weekly billing cycle. An unchanged balance is not evidence that a run was free or a reliable short-test abort signal.
- [Instance management](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/) warns guest `shutdown` or `poweroff` enters **Alert** while billing continues. Use provider termination instead.
- The [Cloud API schema](https://docs.lambda.ai/api/cloud/) has a termination example whose `terminated_instances` array still contains status **`terminating`**. A successful response is not proof of completed teardown or a precise billing cutoff.
- [Billing](https://docs.lambda.ai/public-cloud/billing/) specifies one-minute increments, launch/health-check start conditions and termination as the end. Filesystems bill while they exist, even unmounted; the example storage rate is illustrative, not a current quote. The [filesystem guide](https://docs.lambda.ai/public-cloud/filesystems/) describes these separately retained resources.

Record exact resource IDs and lifecycle timestamps, confirm final inventory, and reconcile Usage and invoice evidence. If per-resource attribution or posting lag is unknown, leave it unknown rather than turning a balance delta into a measured bill.

## RunPod: unchanged A100 rates, different allocation models

**Public rates checked November 10, 2026.** The [pricing page](https://www.runpod.io/pricing) lists **$1.79/hour** for Secure Cloud A100 PCIe Pods and **$2.72/hour** for the A100 Serverless Flex worker tier. The Secure rate agrees across the visible table, FAQ and embedded Secure Cloud offer. Neither rate is Community Cloud, a reserved cluster or proof of account-visible stock.

At 720 continuously billable hours, those inputs give **$1,288.80** for the selected Pod and **$1,958.40** for the Flex tier. At 100 billable worker-hours, Flex gives **$272.00**; a Pod released after 100 allocated hours gives **$179.00**. These compute-only sensitivities do not establish equal performance, host resources or an all-in bill. A bursty endpoint need not accumulate 720 worker-hours, but a completed request alone does not establish worker release.

This guide's October 15 capture had a $1.59 embedded Pod offer conflicting with the $1.79 visible price. The October 18 check resolved that discrepancy; today's check reconfirms $1.79. The obsolete $1.59 input would understate a 720-hour scenario by **$144.00**. This is source-history context, not an inferred tariff-change date.

The [Pod pricing documentation](https://docs.runpod.io/pods/pricing), **checked October 18**, says container-disk data is erased on stop while retained volume disk keeps billing. It lists volume disk at **$0.10/GB-month running** and **$0.20/GB-month stopped**; network volumes are separate. Those storage rates were not rechecked today. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers worker lifecycle and wider billing boundaries with its own dates.

## Thunder and CoreWeave: two different budgeting boundaries

**The prices and documentation in this section retain October 18, 2026 checks; none was reverified today.**

**Thunder:** its [pricing page](https://www.thundercompute.com/pricing) and [public pricing API](https://api.thundercompute.com:8443/v1/pricing), checked October 18, support the **$1.09/hour** A100 base. The page includes **eight vCPUs, 64 GB RAM and the first 100 GB disk per GPU**. Additional vCPUs cost **$0.04/vCPU-hour**. Do not resurrect the obsolete calculation that added four mandatory paid CPUs to the base. Its [billing guide](https://www.thundercompute.com/docs/billing) documents per-minute running compute and instructs customers to delete finished instances to stop billing.

**CoreWeave:** the **$2.70/GPU-hour** A100 rate on [official pricing](https://www.coreweave.com/pricing), checked October 18, is for inference-platform customers, not a self-service one-GPU VM quote. Its [scaling guide](https://docs.coreweave.com/products/inference/scaling) requires at least **one replica** and says scale-to-zero is unsupported. Holding one selected A100 replica billable for 720 hours gives the **$1,944.00** GPU list-rate planning floor before other charges. The [billing guide](https://docs.coreweave.com/products/inference/billing) measures deployment compute in GPU-hours. The [deployment guide](https://docs.coreweave.com/products/inference/models) says disabling stops traffic and preserves configuration; it does not establish GPU release or zero charges.

## Koyeb: include the idle tail

For request-waking workloads, consult the [serverless GPU matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). Koyeb's [scale-to-zero guide](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked October 18, still labels the feature public preview and gives eligible Standard CPU/GPU Instances a **five-minute default idle period**. At the selected $1.60/hour A100 rate, that nominal tail is **$0.1333**, excluding startup, useful work, other Instances and additional resources. It is not a per-request charge or a measured cutoff.

## Make the shortlist actionable

1. **Fit the workload first.** Match GPU memory, PCIe/SXM variant, count and runtime headroom; a cheaper card that cannot hold the workload is not an alternative.
2. **Get a current quote.** Record native unit, exact SKU, region, resources, account access and effective date. Public list prices do not establish stock.
3. **Price the full allocation.** Add applicable startup, useful work, retries, warm retention, extra replicas and cleanup time. Price storage independently.
4. **Test the correct release path.** Guest poweroff, a completed job, an accepted delete request and confirmed teardown are different events.
5. **Keep measurement honest.** Reconcile resource IDs against attributable usage, refunds and invoices. No rate table measures throughput or a second-exact billing cutoff.

The concrete change is Verda's **+$69.12/+$120.24** for the same 720-hour 40/80 GB scenarios versus this guide's October 25 inputs. RunPod's selected A100 rates are unchanged. Lambda's displayed price is future-effective even though its number matches a historical observation. Check the quote's status as carefully as its value.

## Continue the deployment decision

- **Need help deciding between 40 and 80 GB?** Use the [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before treating a rate ordering as a hardware recommendation.
- **Need a request-waking endpoint?** Compare the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) for startup, idle tails and warm minimums.
- **Already have the configuration?** Put useful work, billed startup, idle retention and storage into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) using your own dated quote.

## Sources and verification scope

**November 10, 2026:** [Verda pricing](https://verda.com/pricing) visible rows, structured offers and [public instance catalog](https://api.verda.com/v1/instance-types) for the two exact on-demand A100 VMs; [RunPod pricing](https://www.runpod.io/pricing) for Secure PCIe Pods and the Flex tier; [Lambda instances](https://lambda.ai/instances) for the one-GPU A100 shapes and future-effective notice. Public source inspection only, not rendered-console, authenticated quote or inventory evidence. Captures, retrieval times and hashes are saved in HostFleet's November 10 A100 evidence ledger.

**October 25, 2026 retained evidence:** Verda prepayment/refund, shutdown, storage deletion, API field names and partial failures, quote-versus-ledger distinctions. These documentation checks do not inherit today's date. The historical Verda prices in the change table are this guide's October 25 observations.

**October 18, 2026 retained evidence:** the other 16 comparison rates, direct official links beside them, and the separately cited Lambda, RunPod storage, Thunder, CoreWeave and Koyeb lifecycle rules. Vultr's selected API plan `vcg-a100-12c-120g-80vram` had an empty `locations` list; its marketing page was HTTP 403. That observation is not today's capacity check. Northflank remains GPU-component-only. Baseten's native per-minute input is retained historical pricing evidence, not a fresh JavaScript-page extraction.

Conversions preserve native rates and round final money totals. Historical ranking and documentation are labeled, not relabeled current. The dataset-wide baseline remains September 24. No paid deployment, performance test, account invoice, storage restoration, exact meter cutoff or spending cap was measured. The next step is a read-only quote, access and cleanup check before a bounded deployment test.

*Need self-managed Pods? This labeled affiliate link supports HostFleet at no extra cost to you: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Verify the exact GPU, region, account quote and storage behavior before purchase. All source citations remain direct and non-affiliate.*
