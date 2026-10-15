---
title: "A100 rental prices 2026: verified rates and a RunPod conflict"
description: "Compare dated A100 40 GB and 80 GB rental rates, corrected Thunder CPU inclusions, higher Verda prices, and an unresolved RunPod Secure Cloud price conflict."
pubDate: 2026-07-31
updatedDate: 2026-10-15
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through labeled signup links on this page. That does not change the analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed pricing comparison; calculated totals are estimates.** We rechecked the A100 entries in HostFleet's GPU pricing dataset against official pricing pages and public vendor APIs on **October 15, 2026**. Twenty selected rates matched; the remaining RunPod Secure Cloud entry has contradictory official prices and is excluded from the ranking. No GPU was rented, invoice measured, capacity confirmed, or performance benchmarked.

> **A100 rate checks:** October 15, 2026; 20 matched rates and one unresolved price conflict<br>
> **Vultr evidence:** official public plans API; the marketing pricing page returned HTTP 403<br>
> **Scope:** A100 entries only. The dataset-wide verification baseline remains September 24, 2026<br>
> **Currency:** public USD list rates before tax<br>
> **Estimate convention:** one named configuration billable for 720 hours, not a monthly quote

# A100 rental prices in 2026: verified rates and a RunPod conflict

The lowest selected **A100 40 GB** product is Jarvis Labs at **$0.89/GPU-hour**, or an estimated **$640.80 for 720 billable hours**. The lowest selected **A100 80 GB** VM is Thunder Compute at **$1.09/hour**, or **$784.80 for the same interval**. Both are October 15 list-rate observations, not promises that the hardware can be launched in your region.

Three corrections matter more than another decimal in a comparison table:

1. **Thunder's base now includes eight vCPUs.** The current pricing table no longer supports this guide's previous $1.25/hour minimum-VM calculation. Do not add a required CPU surcharge that is already included.
2. **Verda's A100 inputs have increased since this page's October 8 check.** The selected 40 GB and 80 GB VMs now list at **$1.442/hour** and **$1.976/hour**.
3. **RunPod's Secure Cloud A100 rate is unresolved.** Its visible table says **$1.79/hour**, while its embedded Secure Cloud offer says **$1.59/hour**. Neither is presented here as a newly verified purchase price.

These are rate-card findings. They do not establish throughput, stock, account eligibility, or equivalent deployment surfaces. A GPU component, a complete VM, a serverless worker and a managed inference replica are different products.

## A100 40 GB rental prices

First check that weights, KV cache, runtime workspace, batch and context length fit with headroom. A cheap card that cannot serve the workload is not a useful saving. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains the sizing step.

| Provider / product | Published price used | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Jarvis Labs** | $0.89/GPU/hr | $0.89/hr | **$640.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 15, 2026 |
| **Verda** | $1.442/hr | $1.442/hr | **$1,038.24** | SXM4 VM; 22 CPU and 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Oct. 15, 2026 |
| **Lambda Cloud** | $1.99/GPU/hr | $1.99/hr | **$1,432.80** | Selected 1x SXM row; not an eight-GPU per-GPU offer | [Official source](https://lambda.ai/instances), Oct. 15, 2026 |
| **Modal** | $0.000583/sec | $2.0988/hr | **$1,511.14** | GPU allocation; CPU and memory billed separately | [Official source](https://modal.com/pricing), Oct. 15, 2026 |
| **Paperspace** | $3.09/hr | $3.09/hr | **$2,224.80** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 15, 2026 |

**Northflank component, not a complete service:** its [pricing page](https://northflank.com/pricing), checked October 15, lists A100 40 GB at **$1.42/GPU-hour**. That is **$1,022.40 for 720 GPU-component hours**, before the selected CPU/memory plan, persistent disk and egress. We keep it outside the product ranking rather than inventing an A100-specific all-in shape.

## A100 80 GB rental prices

These rows sort the selected hourly inputs, not deployment performance or complete total cost. In particular, Modal's GPU rate excludes CPU and memory, while VM and managed-service inclusions differ. Every displayed hourly conversion uses the native rate before cent rounding.

| Provider / product | Published price used | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Thunder Compute** | $1.09/GPU/hr | $1.09/hr | **$784.80** | Includes 8 vCPU, 64 GB RAM, first 100 GB disk | [Official source](https://www.thundercompute.com/pricing), Oct. 15, 2026 |
| **Hyperstack** | $1.35/GPU/hr | $1.35/hr | **$972.00** | Selected PCIe VM; CPU, RAM and local storage included | [Official source](https://www.hyperstack.cloud/gpu-pricing), Oct. 15, 2026 |
| **Massed Compute** | $1.35/hr | $1.35/hr | **$972.00** | Selected base VM; do not substitute the separate SXM4 offer | [Official source](https://vm.massedcompute.com/pricing), Oct. 15, 2026 |
| **Jarvis Labs** | $1.49/GPU/hr | $1.49/hr | **$1,072.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 15, 2026 |
| **Koyeb** | $1.60/hr | $1.6/hr | **$1,152.00** | A100 application Service; not the separate A100 SXM tier | [Official source](https://www.koyeb.com/pricing), Oct. 15, 2026 |
| **Verda** | $1.976/hr | $1.976/hr | **$1,422.72** | SXM4 VM; 22 CPU and 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Oct. 15, 2026 |
| **Vultr Cloud GPU** | $2.397/hr | $2.397/hr | **$1,725.84** | API plan has an empty locations list; capacity unconfirmed | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 15, 2026 |
| **Modal** | $0.000694/sec | $2.4984/hr | **$1,798.85** | GPU allocation; CPU and memory billed separately | [Official source](https://modal.com/pricing), Oct. 15, 2026 |
| **CoreWeave Inference** | $2.70/GPU/hr | $2.7/hr | **$1,944.00** | Inference-platform customers only; not a self-service VM | [Official source](https://www.coreweave.com/pricing), Oct. 15, 2026 |
| **RunPod Serverless** | $2.72/hr | $2.72/hr | **$1,958.40** | Published worker-tier hourly rate; not a reserved card | [Official source](https://www.runpod.io/pricing), Oct. 15, 2026 |
| **Paperspace** | $3.18/hr | $3.18/hr | **$2,289.60** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 15, 2026 |
| **Baseten** | $0.06667/min | $4.0002/hr | **$2,880.14** | Managed deployment; native rate is per minute | [Official source](https://www.baseten.co/pricing/), Oct. 15, 2026 |
| **Replicate** | $0.001400/sec | $5.04/hr | **$3,628.80** | Private-model deployment; online time includes setup and idle | [Official source](https://replicate.com/pricing), Oct. 15, 2026 |

**Northflank component:** A100 80 GB is **$1.76/GPU-hour**, checked October 15 on [official pricing](https://northflank.com/pricing). The **$1,267.20** 720-hour GPU-component estimate still needs CPU, memory and other applicable resources. It is not a complete service quote.

The tables contain **18 named product rates**. The two separate Northflank components bring the matched-rate count to **20**. RunPod Secure Cloud is the additional, unresolved entry discussed below.

For the wider market, use the [live GPU pricing table](https://hostfleet.net/gpu-pricing/). This article's tables are a snapshot generated from the A100 entries in the same `gpu-pricing.json` baseline, with direct vendor checks and native-rate arithmetic. Checking the A100 subset does not make every other GPU price newly verified.

## Thunder Compute: remove the obsolete CPU surcharge

[Thunder's pricing page](https://www.thundercompute.com/pricing), checked October 15, explicitly lists **eight included vCPUs** for its **$1.09/hour A100 80 GB** base. That shape includes 64 GB RAM and the first 100 GB disk per GPU. Its [public pricing API](https://api.thundercompute.com:8443/v1/pricing) independently returns **$1.09/hour** for `a100xl_x1` and **$0.04 per additional vCPU-hour**.

The older estimate added four paid vCPUs to the GPU base:

    old scenario: $1.09 + 4 × $0.04 = $1.25/hour
    current included-eight-vCPU base: $1.09/hour
    difference over 720 billable hours: $0.16 × 720 = $115.20

This corrects the resource inclusion used in the estimate. It is not a claim that the GPU-only rate fell: the observed $1.09 base is unchanged. Additional CPU beyond the included allocation, extra disk and snapshots can still add cost. Do not apply this base to Thunder's separate Sandbox, reserved or multi-GPU products.

At today's base, eight billable hours cost an estimated **$8.72**. Keeping the instance running for 168 hours instead costs **$183.12**, including **$174.40** for the additional 160 hours. These are compute estimates before add-ons, tax and billing-unit rounding. Thunder's [billing guide](https://www.thundercompute.com/docs/billing), checked October 15, says running compute is billed per minute and instructs customers to delete finished instances to stop billing. Finishing the job is not the same as releasing the instance.

## Verda: exact rates and the cost of shutdown-only cleanup

Verda's [pricing page](https://verda.com/pricing) embeds exact one-GPU on-demand offers. Its [public instance-types API](https://api.verda.com/v1/instance-types) exposes the corresponding `price_per_hour`. Both agree on the following October 15 inputs; these are not the separate spot or serverless price fields.

| Exact VM | October 8 input on this page | October 15 input | Difference | Extra cost over 720 billable hours |
|---|---:|---:|---:|---:|
| `1A100.40S.22V`, A100 40 GB SXM4 | $1.346/hr | **$1.442/hr** | **+$0.096/hr (+7.1%)** | **$69.12** |
| `1A100.22V`, A100 80 GB SXM4 | $1.851/hr | **$1.976/hr** | **+$0.125/hr (+6.8%)** | **$90.00** |

Both shapes include 22 CPU and 120 GB RAM; storage is separate. Historical inputs come from this article's October 8 baseline; current inputs come from the October 15 page/API captures. Percentages use exact rates and are rounded to one decimal. These are differences between observations, not a vendor-announced effective date or a one-day increase. The resulting 720-hour estimates are **$1,038.24 for 40 GB** and **$1,422.72 for 80 GB**.

The lifecycle can cost more than the price change. Verda's [shutdown and deletion documentation](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/), rechecked October 15, says shut-down instances keep charging. Storage not selected for deletion also continues to charge.

For the selected 80 GB VM:

    eight useful billable hours: $1.976 × 8 = $15.808 → $15.81
    another 160 billable hours after shutdown: $1.976 × 160 = $316.16
    168 billable hours in total: $1.976 × 168 = $331.968 → $331.97

These scenarios exclude retained storage and all other additions. Deletion is the required compute-cleanup action; the public lifecycle rule does not prove a second-level ledger cutoff.

Verda's [billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), also checked October 15, describes prepaid **10-minute increments**, with an unused terminated portion refunded within the next billing period. At $1.976/hour, one nominal 10-minute prepayment is approximately **$0.3293**. That is cash-flow arithmetic, not a nonrefundable 10-minute minimum-charge claim. An immediate balance debit need not be the settled net usage cost.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) explains the useful-compute, teardown-lag and retained-resource formula. Its worked examples have their own dates; substitute this page's October 15 Verda inputs if the examples still use an older rate.

## RunPod Secure Cloud: why there is no ranked Pod price

The [official RunPod pricing page](https://www.runpod.io/pricing), captured October 15, supplies two different prices for the selected **A100 PCIe Secure Cloud** product:

| Official representation | Observed hourly value | Hypothetical 720-hour arithmetic |
|---|---:|---:|
| Visible Secure Cloud pricing table | $1.79/hr | $1,288.80 |
| Embedded structured-data Secure Cloud offer | $1.59/hr | $1,144.80 |

These are **conflicting observations**, not two selectable plans or an established discount. The hypothetical totals differ by **$144.00**, but neither is offered here as a current purchase quote. The HostFleet dataset retains its earlier $1.59 numeric cell with a source-conflict note; that retention is not fresh verification.

Do not silently select the lower number, substitute Community inventory, or extend the old statement that Secure PCIe and SXM have the same price. Confirm the exact card, cloud tier, region, storage and account-visible rate before deploying. The separate **RunPod Serverless $2.72/hour** worker-tier entry does match today's pricing page; a Pod-source conflict does not invalidate that independently checked product.

The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains Pods versus Serverless. Its rate examples have separate check dates; use a launch-time quote to resolve this conflict rather than treating another HostFleet page as new vendor evidence.

## CoreWeave: a public A100 price is not a scale-to-zero service

[CoreWeave pricing](https://www.coreweave.com/pricing), rechecked October 15, lists the selected A100 inference rate at **$2.70/GPU-hour** for inference-platform customers. Its [billing documentation](https://docs.coreweave.com/products/inference/billing) measures inference compute in GPU-hours at deployment level.

The [scaling documentation](https://docs.coreweave.com/products/inference/scaling), also checked October 15, says the minimum replica count must be at least **one** and ordinary scale-to-zero is unsupported. One selected A100 replica held billable for 720 hours therefore produces a **$1,944.00** list-rate planning floor, before other charges or contract adjustments.

The [models and deployments guide](https://docs.coreweave.com/products/inference/models) documents `disabled=true` as stopping traffic while retaining configuration. It does not establish that disabling releases the GPU or ends metering. Do not subtract disabled hours from a forecast without provider confirmation or attributable account evidence. This inference rate also must not be confused with a separately listed multi-GPU VM rate divided by GPU count.

## How to turn a rental rate into a deployment budget

Use the same sequence for every provider:

1. **Set the memory floor.** If 40 GB is insufficient after runtime and context headroom, remove the 40 GB rows.
2. **Record the actual product.** Note PCIe versus SXM, GPU count, VM versus managed endpoint, region and account access.
3. **Reconstruct the billable rate.** Add required CPU, memory and other components. Keep native per-second or per-minute precision until final rounding.
4. **Model allocation time, not just response time.** Include startup where billed, useful work, retries, idle windows and warm replicas.
5. **Define the release action.** A completed process, a shutdown, a disabled endpoint and a deleted instance can have different billing effects.
6. **Add retained resources.** Disks, snapshots, volumes, IPs and egress may outlive compute.
7. **Confirm capacity separately.** A public catalog entry is not inventory, approval or a reservation. Vultr's selected plan currently returns an empty locations list in its public API.

The 720-hour table is a sensitivity case: one named configuration remains billable continuously at its dated input, with no tax, credit, commitment, extra replica, retained resource or omitted component added. It is not a settled invoice forecast. Native-rate precision explains values such as Modal's $2.4984/hour and Baseten's $4.0002/hour equivalent; those conversions are not new hourly tariff promises.

For request-waking capacity, compare the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). As one documented example, [Koyeb's scale-to-zero guide](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked October 15, labels the feature public preview and gives eligible Standard CPU and GPU Services a **five-minute default idle period**. At its October 15 A100 rate of **$1.60/hour**, one five-minute active tail is a nominal **$0.1333**, excluding startup, useful work, extra Instances and other charges. It is not a per-request fee or proof of a measured cutoff.

## Verdict

**Jarvis Labs leads the selected 40 GB products at $0.89/GPU-hour. Thunder Compute leads the selected 80 GB VMs at $1.09/hour with eight vCPUs included.** Those October 15 rate-card leaders are not a performance or availability ranking.

Verda's exact A100 inputs are now **$1.442/hour for 40 GB** and **$1.976/hour for 80 GB**. Update old estimates, but also fix cleanup: a shutdown-only mistake can dwarf the difference between hourly offers. RunPod's Secure Cloud A100 price remains unresolved and stays out of the ranking. CoreWeave's inference minimum still needs a warm-floor budget rather than an assumed zero-idle bill.

Choose memory, product surface, capacity and lifecycle first. Then compare the complete rate for the time the provider will actually bill.

## Sources and verification notes

- **Current rate sources, checked October 15, 2026:** each table row links directly to its official page or API. Northflank's GPU-only rates are cited separately rather than ranked as all-in totals.
- **Verda:** [pricing](https://verda.com/pricing), [instance-types API](https://api.verda.com/v1/instance-types), [billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing), and [shutdown/deletion](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) support exact prices, included resources, prepaid intervals, refund timing and cleanup rules; all checked October 15.
- **Thunder:** [pricing](https://www.thundercompute.com/pricing), [public pricing API](https://api.thundercompute.com:8443/v1/pricing), and [billing](https://www.thundercompute.com/docs/billing) support the included-eight-vCPU base, optional CPU rate and deletion guidance; all checked October 15.
- **RunPod:** [pricing](https://www.runpod.io/pricing) supports the visible-versus-embedded Secure Cloud conflict and separate Serverless rate, checked October 15. No authenticated quote was obtained.
- **CoreWeave:** [pricing](https://www.coreweave.com/pricing), [billing](https://docs.coreweave.com/products/inference/billing), [scaling](https://docs.coreweave.com/products/inference/scaling), and [deployment controls](https://docs.coreweave.com/products/inference/models) support the inference rate, minimum and documented disable behavior; checked October 15. Disable-related GPU release remains unverified.
- **Vultr:** the [complete public plans response](https://api.vultr.com/v2/plans?per_page=500), checked October 15, contains `vcg-a100-12c-120g-80vram` at $2.397/hour and no listed locations. The marketing pricing page was blocked with HTTP 403; this is an API check, not a rendered-page or availability check.
- **Data and limits:** HostFleet's `gpu-pricing.json` supplies the selected product baseline and exact native rates; captured vendor labels and structured offers were matched before drafting. The September 24 dataset-wide date is unchanged. No invoice, capacity or throughput result is implied by these source checks.

*Comparing self-managed Pods? This labeled affiliate link supports HostFleet's research: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Resolve the Secure Cloud price conflict with an account-visible quote before purchase. Source citations remain direct and non-affiliate.*
