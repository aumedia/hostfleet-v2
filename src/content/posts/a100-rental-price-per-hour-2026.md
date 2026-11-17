---
title: "A100 rental prices 2026: updated rates and regional quotes"
description: "Compare dated A100 rental rates, higher RunPod and Verda costs, regional price differences and Lambda’s current public tariff. Estimates, not benchmarks."
pubDate: 2026-07-31
updatedDate: 2026-11-17
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through the labeled signup link below. It does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed A100 rental comparison; totals are calculated estimates, not measured invoices.** This November 17, 2026 refresh checks five selected inputs: Verda's 40/80 GB VMs, RunPod's Secure PCIe Pod and Serverless Flex tier, and Lambda's one-GPU PCIe tariff. The other **16 comparison inputs retain October 18 checks**. Billing and cleanup documentation retains its separately stated October 18 or October 25 date. No GPU was rented, stock confirmed, throughput benchmarked or invoice inspected.

> **Five selected price inputs checked:** November 17, 2026<br>
> **Lambda:** current public table captured after the previously announced November 16 effective instant; no future-effective notice remains in this capture<br>
> **Other 16 inputs:** October 18, 2026; not reverified today<br>
> **Dataset-wide baseline:** September 24, 2026; this targeted refresh does not advance it<br>
> **Currency and planning:** public USD list prices before tax; 720 billable hours is a scenario, not a monthly plan

# A100 rental prices in 2026: compare exact products, regions and dates

**Verda's headline A100 40/80 GB VM rates are now $1.716/$2.398 per hour; RunPod's selected Secure PCIe Pod is $2.09/hour and its separate A100 Flex worker tier is $2.99/hour.** All four are higher than this guide's November 10 observations. Lambda's one-GPU A100 40 GB PCIe and SXM shapes still list **$1.99/GPU-hour**, now after the previously announced tariff's effective date rather than before it.

| Selected input | November 10 observation | November 17 observation | 720-hour compute estimate | Increase over prior input |
|---|---:|---:|---:|---:|
| Verda A100 40 GB headline VM | $1.657/hr | **$1.716/hr** | **$1,235.52** | **$42.48** |
| Verda A100 80 GB headline VM | $2.316/hr | **$2.398/hr** | **$1,726.56** | **$59.04** |
| RunPod A100 Secure PCIe Pod | $1.79/hr | **$2.09/hr** | **$1,504.80** | **$216.00** |
| RunPod A100 Serverless Flex | $2.72/hr | **$2.99/hr** | **$2,152.80** | **$194.40** |

Sources for the new observations: [Verda pricing](https://verda.com/pricing), its [instance-types API](https://api.verda.com/v1/instance-types), and [RunPod pricing](https://www.runpod.io/pricing), checked November 17. The prior inputs are this guide's November 10 saved checks, not vendor-announced change dates. These scenarios assume 720 continuously billable hours at the selected input and exclude storage and other charges. Flex worker-hours and allocated Pod hours are not equivalent useful work.

The retained October 18 comparison has Jarvis Labs' **$0.89/hour** 40 GB offer and Thunder's **$1.09/hour** 80 GB base at its low end. Those observations are useful shortlist inputs, **not a newly verified cheapest-provider claim**. Hardware variant, stock, host resources and release operations can change the buying decision.

## A100 40 GB: selected VM and GPU-allocation inputs

Check model weights, KV cache, runtime workspace, context and concurrency before choosing the smaller card. The [VRAM sizing guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains the assumptions. Lambda's freshly checked one-GPU public tariff is shown separately below, with its own configuration and effective-date context.

| Provider / product | Native price | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Jarvis Labs** | $0.89/hr | $0.89/hr | **$640.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 18, 2026 |
| **Verda** | $1.716/hr | $1.716/hr | **$1,235.52** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Nov. 17, 2026 |
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
| **RunPod Secure Pods** | $2.09/hr | $2.09/hr | **$1,504.80** | Secure Cloud A100 PCIe Pod; disks extra | [Official source](https://www.runpod.io/pricing), Nov. 17, 2026 |
| **Verda** | $2.398/hr | $2.398/hr | **$1,726.56** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Nov. 17, 2026 |
| **Vultr Cloud GPU** | $2.397/hr | $2.397/hr | **$1,725.84** | Selected API plan; locations list empty, stock unconfirmed | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 18, 2026 |
| **Modal** | $0.000694/sec | $2.4984/hr | **$1,798.85** | GPU allocation only; CPU and memory extra | [Official source](https://modal.com/pricing), Oct. 18, 2026 |
| **CoreWeave Inference** | $2.70/hr | $2.7/hr | **$1,944.00** | Inference-platform customers; not a self-service VM | [Official source](https://www.coreweave.com/pricing), Oct. 18, 2026 |
| **RunPod Serverless Flex** | $2.99/hr | $2.99/hr | **$2,152.80** | Worker-tier rate; not a reserved card | [Official source](https://www.runpod.io/pricing), Nov. 17, 2026 |
| **Paperspace** | $3.18/hr | $3.18/hr | **$2,289.60** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 18, 2026 |
| **Baseten** | $0.06667/min | $4.0002/hr | **$2,880.14** | Managed deployment; native price per minute | [Official source](https://www.baseten.co/pricing/), Oct. 18, 2026 |
| **Replicate** | $0.001400/sec | $5.04/hr | **$3,628.80** | Private deployment; online time includes setup and idle | [Official source](https://replicate.com/pricing), Oct. 18, 2026 |


**Separate GPU component:** [Northflank pricing](https://northflank.com/pricing), checked October 18, lists **$1.76/GPU-hour**, or **$1,267.20** for 720 GPU-component hours before other resources.

There are **18 product rows above, two Northflank components, and one separately checked Lambda tariff below**. The tables extend the A100 entries behind our [GPU pricing table](https://hostfleet.net/gpu-pricing/), using direct official checks where they differ from older dataset cells. This article does not modify the dataset. Each row keeps its own evidence date; a recent article update does not refresh every provider.

For hourly inputs, multiply by 720. For per-second inputs, multiply by 3,600 and then 720; for per-minute inputs, multiply by 60 and then 720. Preserve native precision and round only the final money total. All estimates exclude tax, discounts, credits, separately billed resources, additional replicas, account-plan charges and billing-unit rounding. No public catalog row establishes account access, quota or regional stock.

## Verda: exact SKU and region matter

**Prices and machine shapes checked November 17, 2026.** The [pricing page](https://verda.com/pricing) and [public instance-types API](https://api.verda.com/v1/instance-types) agree on the following headline one-GPU on-demand USD inputs. Each includes **22 CPU and 120 GB RAM**, with storage separate. Do not substitute neighboring Spot or Serverless fields.

| Exact SKU | November 10 observation | November 17 headline price | Difference per hour | Difference over 720 hours |
|---|---:|---:|---:|---:|
| `1A100.40S.22V`, SXM4 40 GB | $1.657 | **$1.716** | +$0.059 | **+$42.48** |
| `1A100.22V`, SXM4 80 GB | $2.316 | **$2.398** | +$0.082 | **+$59.04** |

These are differences between saved observations, not proof the increase happened today. The current headline 80 GB estimate is `2.398 × 720 = $1,726.56`. Rounding the hourly input to $2.40 before multiplication would overstate that scenario by **$1.44**.

**The API also exposes different regional prices.** In the same November 17 capture, `location_prices` lists **$2.386/hour** for the 80 GB SKU in FIN-01, FIN-02 and FIN-03, below the headline `price_per_hour` of $2.398. The 40 GB SKU lists **$1.699/hour in FIN-02**, versus **$1.716/hour in FIN-01 and FIN-03**. At 720 hours the selected regional inputs would give **$1,717.92** for 80 GB and **$1,223.28** for 40 GB in FIN-02, before storage.

The comparison tables use the public headline inputs for consistency, not a claim that every region charges that amount. Save the exact SKU, location, native quote and timestamp before launch; the catalog alone establishes neither your final account quote nor stock.

### Prepaid cash draw is not the same as settled usage

The [Verda billing guide](https://docs.verda.com/welcome-to-verda/pricing-and-billing/index.md), **checked October 25**, describes prepaid **10-minute increments** and refunds the unused terminated portion within the next billing period. That check date is retained; today's price check does not reverify the refund policy.

At the **November 17 headline $2.398/hour 80 GB rate**, ignoring region-specific pricing:

    one nominal 10-minute block = $2.398 / 6 ≈ $0.399667
    20 nominal minutes ≈ $0.799333
    three nominal prepaid blocks = $1.199

The three-block case is a stress scenario, not a claim that a 20-minute run necessarily incurs three deductions. Gross prepaid deductions, refunds and final net usage are different quantities. An elapsed-time estimate below one dollar does not establish a maximum debit below one dollar. Storage, period alignment, creation time and delayed cleanup need separate allowances.

### Shutdown is not release, and deletion is not always complete cleanup

Verda's [lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/index.md), **checked October 25**, says shutdown instances continue charging. With today's selected 80 GB rate, eight billable hours cost an estimated **$19.18**; an additional 160 unattended billable hours add **$383.68**. Those assumptions produce **$402.86** for 168 billable hours, before storage. This is a conditional failure scenario, not an observed penalty.

The same retained console guide says no storage is selected for deletion by default. The October 25 [API schema](https://api.verda.com/v1/openapi.json) instead says omitting `volume_ids` on an instance action deletes only the OS volume and detaches the rest. Inspect the exact interface you use and enumerate storage explicitly.

For disposable data, the instance action uses `delete_permanently=true`; standalone `DELETE /v1/volumes/{volume_id}` uses the different request-body field **`is_permanent=true`**. Permanent deletion is irreversible. The [storage-deletion guide](https://docs.verda.com/storage/deleting-storage/index.md), checked October 25, documents a **96-hour** restoration window and a PAYG restore charge covering the deleted interval. Preserve valuable data deliberately rather than using permanent deletion as a default.

The retained API contract documents **HTTP 207 partial failures** for `PUT /v1/instances`. Inspect every per-resource result. Check instance inventory, active volumes and trash; a failed or filtered list is not proof of absence. If creation times out after submission, reconcile the request and inventory before retrying to avoid duplicate resources.

The October 25 schema exposes a balance `amount` and `currency`, not an attributable per-instance usage ledger. `price_per_hour` and volume quote fields are not accrued charges. The [CLI cost/status guide](https://docs.verda.com/cli/cost-and-status/index.md) describes estimates; [audit logs](https://docs.verda.com/resources/audit-logs/index.md) describe actions, not independently measured billable seconds. Reconcile attributable usage and refunds separately from lifecycle observations.

## Lambda: the public tariff is no longer future-only

**Public page checked November 17, 2026.** The [instances page](https://lambda.ai/instances) lists the following **1x GPU** A100 40 GB configurations. This capture is after **November 16, 2026 at 00:00 UTC**, the effective instant in the guide's saved November 10 announcement. Today's captured source no longer contains that future-effective notice; the public prices remain $1.99/GPU-hour.

| One-GPU shape | CPU / RAM / storage | Public price | 720-hour compute scenario |
|---|---|---:|---:|
| A100 PCIe 40 GB | 30 vCPU, 225 GiB RAM, 512 GiB SSD | $1.99/GPU-hour | $1,432.80 |
| A100 SXM 40 GB | 30 vCPU, 220 GiB RAM, 512 GiB SSD | $1.99/GPU-hour | $1,432.80 |

**Source and date for both rows:** [Lambda instances](https://lambda.ai/instances), November 17, 2026. The comparison counts only the PCIe shape as its selected Lambda input; the SXM row clarifies the separate configuration, not a second selected rate.

This is a current public table observation, **not an authenticated account quote, available-capacity check or evidence of how a job spanning the transition was billed**. The scenario assumes one GPU and 720 billable hours at the displayed rate. Match the 1x tab rather than borrowing a multi-GPU row; distinguish prices per GPU from complete-instance API quotes before multiplying by GPU count. The useful update is the evidence status, even though the number is unchanged.

### Keep Lambda's older billing checks separate

The following official documentation retains its **October 18, 2026** check date:

- [Managing billing](https://docs.lambda.ai/public-cloud/manage-billing/) says credits appear immediately but usage is applied against them after the weekly billing cycle. An unchanged balance is not evidence that a run was free or a reliable short-test abort signal.
- [Instance management](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/) warns guest `shutdown` or `poweroff` enters **Alert** while billing continues. Use provider termination instead.
- The [Cloud API schema](https://docs.lambda.ai/api/cloud/) has a termination example whose `terminated_instances` array still contains status **`terminating`**. A successful response is not proof of completed teardown or a precise billing cutoff.
- [Billing](https://docs.lambda.ai/public-cloud/billing/) specifies one-minute increments, launch/health-check start conditions and termination as the end. Filesystems bill while they exist, even unmounted; the example storage rate is illustrative, not a current quote. The [filesystem guide](https://docs.lambda.ai/public-cloud/filesystems/) describes these separately retained resources.

Record exact resource IDs and lifecycle timestamps, confirm final inventory, and reconcile Usage and invoice evidence. If per-resource attribution or posting lag is unknown, leave it unknown rather than turning a balance delta into a measured bill.

## RunPod: both selected A100 rates increased

**Public rates checked November 17, 2026.** The [pricing page](https://www.runpod.io/pricing) lists **$2.09/hour** for Secure Cloud A100 PCIe Pods and **$2.99/hour** for the A100 Serverless Flex worker tier. The Secure price agrees across the visible table, FAQ and embedded Secure Cloud offer. Neither input is Community Cloud, a reserved cluster or proof of account-visible stock.

At 720 continuously billable hours, those inputs give **$1,504.80** for the selected Pod and **$2,152.80** for the Flex tier. Compared with this guide's November 10 $1.79/$2.72 observations, the same scenarios rise **$216.00/$194.40**. Source retrieval dates do not establish when RunPod changed the tariff.

At 100 billable worker-hours, Flex gives **$299.00**; a Pod released after 100 allocated hours gives **$209.00**. These compute-only sensitivities do not establish equal performance, host resources or an all-in bill. A bursty endpoint need not accumulate 720 worker-hours, but a completed request alone does not establish worker release.

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

Against this guide's November 10 observations, the headline 720-hour scenarios rise **$42.48/$59.04** for Verda 40/80 GB and **$216.00/$194.40** for RunPod Pod/Flex. Verda's regional fields can change the selected input again. Lambda's unchanged price is now captured after the announced effective instant. Check the exact product, region and quote status as carefully as the headline number.

## Continue the deployment decision

- **Need help deciding between 40 and 80 GB?** Use the [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before treating a rate ordering as a hardware recommendation.
- **Need a request-waking endpoint?** Compare the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) for startup, idle tails and warm minimums.
- **Already have the configuration?** Put useful work, billed startup, idle retention and storage into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) using your own dated quote.

## Sources and verification scope

**November 17, 2026 — five selected inputs:** [Verda pricing](https://verda.com/pricing) and [public instance catalog](https://api.verda.com/v1/instance-types) for two exact on-demand A100 VMs, headline and regional fields; [RunPod pricing](https://www.runpod.io/pricing) for Secure PCIe Pods and the A100 Flex tier; [Lambda instances](https://lambda.ai/instances) for one-GPU PCIe/SXM shapes captured after the previously announced effective instant. Public source inspection only, not rendered-console, authenticated quote or inventory evidence. Source bodies, UTC retrieval times, hashes, calculations and internal-link checks are saved in HostFleet's November 17 A100 evidence ledger.

**November 10, 2026 — comparison history:** the prior Verda and RunPod prices in the change tables are this guide's saved observations. The Lambda page then contained the November 16, 00:00 UTC effective-date notice. Those records establish historical comparison inputs, not today's account prices or a change date for Verda/RunPod.

**October 25, 2026 retained evidence:** Verda prepayment/refund, shutdown, storage deletion, API field names and partial failures, quote-versus-ledger distinctions. These documentation checks do not inherit today's date. The older lifecycle sources do not establish today's account prices.

**October 18, 2026 retained evidence:** the other 16 comparison rates, direct official links beside them, and the separately cited Lambda, RunPod storage, Thunder, CoreWeave and Koyeb lifecycle rules. Vultr's selected API plan `vcg-a100-12c-120g-80vram` had an empty `locations` list; its marketing page was HTTP 403. That observation is not today's capacity check. Northflank remains GPU-component-only. Baseten's native per-minute input is retained historical pricing evidence, not a fresh JavaScript-page extraction.

Conversions preserve native rates and round final money totals. Historical ranking and documentation are labeled, not relabeled current. The dataset-wide baseline remains September 24. No paid deployment, performance test, account invoice, storage restoration, exact meter cutoff or spending cap was measured. The next step is a read-only quote, access and cleanup check before a bounded deployment test.

*Need self-managed Pods? This labeled affiliate link supports HostFleet at no extra cost to you: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Verify the exact GPU, region, account quote and storage behavior before purchase. All source citations remain direct and non-affiliate.*
