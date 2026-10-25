---
title: "A100 rental prices 2026: rates, prepaid billing and cleanup"
description: "Compare 21 dated A100 rate inputs, updated Verda prices, prepaid refund rules and storage cleanup. Separate compute estimates from maximum prepaid exposure."
pubDate: 2026-07-31
updatedDate: 2026-10-25
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through the labeled signup link on this page. That does not change the analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed A100 pricing comparison; calculated totals are estimates, not measured invoices.** This update checks Verda's two A100 VM rates and its prepaid-billing, refund and storage-cleanup documentation on **October 25, 2026**. The other 19 price inputs and their billing observations retain their **October 18** verification dates; they are dated comparison inputs, not fresh purchase quotes. Verda's selected 40/80 GB inputs are now **$1.561/$2.149 per hour**, from its [pricing page](https://verda.com/pricing) and [public catalog](https://api.verda.com/v1/instance-types). A ten-minute prepayment, a refund and the final net charge are different quantities. No GPU was rented, capacity confirmed, workload benchmarked or account invoice inspected.

> **Verda A100 rates, billing and cleanup checked:** October 25, 2026<br>
> **Other 19 rate inputs and provider rules:** retained October 18, 2026 checks; not reverified today<br>
> **Currency:** public USD list prices before applicable tax<br>
> **Planning interval:** 720 billable hours, not a quoted monthly plan<br>
> **Dataset-wide baseline:** September 24, 2026; this article's A100-only check does not advance it<br>
> **Availability:** public rates do not establish regional stock, quota or account access

# A100 rental prices in 2026: dated rates, prepayments and cleanup

In the retained October 18 comparison, **Jarvis Labs has the lowest selected 40 GB rate at $0.89/GPU-hour**, while **Thunder Compute has the lowest selected 80 GB VM base at $1.09/hour**. Those October 18 list-rate observations produce estimated 720-hour compute totals of **$640.80** and **$784.80**, respectively. They do not establish equal performance or availability.

The more useful buying question is what the number includes and what ends the meter. Thunder's base includes eight vCPUs. The October 18 RunPod check resolved its Secure A100 PCIe Pod input at $1.79/hour. Lambda bills by the minute, but its credits update for usage only at the end of the weekly billing cycle. Cheap hardware is not a cheap deployment if cleanup or cost tracking is wrong.

## A100 40 GB rental prices

Check weights, KV cache, runtime workspace, context and batch size before choosing the smaller card. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains that sizing step.

| Provider / product | Native price | Hourly input | 720-hour estimate | Cost boundary | Source / verified |
|---|---:|---:|---:|---|---|
| **Jarvis Labs** | $0.89/hr | $0.89/hr | **$640.80** | One-GPU on-demand instance | [Official source](https://jarvislabs.ai/pricing), Oct. 18, 2026 |
| **Verda** | $1.561/hr | $1.561/hr | **$1,123.92** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Oct. 25, 2026 |
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
| **Verda** | $2.149/hr | $2.149/hr | **$1,547.28** | SXM4 VM; 22 CPU, 120 GB RAM; storage extra | [Official source](https://verda.com/pricing), Oct. 25, 2026 |
| **Vultr Cloud GPU** | $2.397/hr | $2.397/hr | **$1,725.84** | Selected API plan; locations list empty, stock unconfirmed | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 18, 2026 |
| **Modal** | $0.000694/sec | $2.4984/hr | **$1,798.85** | GPU allocation only; CPU and memory extra | [Official source](https://modal.com/pricing), Oct. 18, 2026 |
| **CoreWeave Inference** | $2.70/hr | $2.7/hr | **$1,944.00** | Inference-platform customers; not a self-service VM | [Official source](https://www.coreweave.com/pricing), Oct. 18, 2026 |
| **RunPod Serverless Flex** | $2.72/hr | $2.72/hr | **$1,958.40** | Worker-tier rate; not a reserved card | [Official source](https://www.runpod.io/pricing), Oct. 18, 2026 |
| **Paperspace** | $3.18/hr | $3.18/hr | **$2,289.60** | Machine compute; default SSD billed separately | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 18, 2026 |
| **Baseten** | $0.06667/min | $4.0002/hr | **$2,880.14** | Managed deployment; native price per minute | [Official source](https://www.baseten.co/pricing/), Oct. 18, 2026 |
| **Replicate** | $0.001400/sec | $5.04/hr | **$3,628.80** | Private deployment; online time includes setup and idle | [Official source](https://replicate.com/pricing), Oct. 18, 2026 |

**Separate GPU component:** [Northflank pricing](https://northflank.com/pricing), checked October 18, lists A100 80 GB at **$1.76/GPU-hour**, or **$1,267.20** for 720 GPU-component hours before CPU, memory and other resources.

The two tables contain **19 selected product rates**; the two Northflank components bring the total to **21 checked inputs**. Each conversion uses the native rate before final cent rounding. The 720-hour estimates exclude tax, credits, discounts, billing-unit rounding, extra replicas, separately billed resources and account-plan charges.

These tables expand the A100 entries in the pricing dataset behind the [live GPU pricing table](https://hostfleet.net/gpu-pricing/), retaining native precision and row-specific verification dates. Verda's two inputs were checked directly on October 25. Other providers keep this article's October 18 observations, which can differ from later partial dataset updates. Use the dates beside the rates rather than treating this page as a full-market refresh; the dataset-wide baseline remains September 24.

## RunPod: the Secure Cloud price conflict is resolved

On October 15, the [RunPod pricing page](https://www.runpod.io/pricing) showed **$1.79/hour** for A100 PCIe Secure Cloud in its visible table but **$1.59/hour** in its embedded offer. This guide excluded the Pod entry while those official representations disagreed.

The October 18 capture now agrees across the visible table, explicit Secure Cloud price attribute and embedded Secure Cloud offer: **$1.79/hour**. The selected Pod returns to the 80 GB table with a **$1,288.80** compute-only estimate for 720 hours. Using the superseded $1.59 input would understate that estimate by **$144.00**. This is a resolved source discrepancy, not proof of the date a customer-facing tariff changed.

Do not substitute Community Cloud inventory, A100 SXM or a Serverless worker when quoting this PCIe Secure Cloud Pod. The separate **$2.72/hour Serverless Flex A100 tier** was independently rechecked on the same page. A continuously billable 720-worker-hour scenario is **$1,958.40**, not a prediction that a scale-to-zero endpoint must run all month.

Stopping compute does not remove every charge. RunPod's [Pod pricing documentation](https://docs.runpod.io/pods/pricing), checked October 18, says container-disk data is erased when a Pod stops, while a retained volume disk keeps billing. Its listed volume-disk rate is **$0.10/GB-month while running** and **$0.20/GB-month while stopped**; network volumes are separate. Record the persistence model before choosing stop versus terminate.

The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the wider Pod/Serverless split. Confirm the exact card, region, storage and account-visible quote before launch.

## Verda: price the exact SKU, then separate prepayment from settled cost

Verda's [pricing page](https://verda.com/pricing) and [public instance catalog](https://api.verda.com/v1/instance-types), checked **October 25, 2026**, agree on these fixed, single-GPU on-demand rates. Both VMs include **22 CPU and 120 GB RAM**; storage is separate. The visible rows, embedded offers and API match. These are not spot or serverless prices, and the public catalog does not establish account access or stock.

| Exact VM | This guide's October 18 observation | October 25 input | Increase per hour | Increase over 720 hours |
|---|---:|---:|---:|---:|
| `1A100.40S.22V`, 40 GB SXM4 | $1.486 | **$1.561** | +$0.075 | **+$54.00** |
| `1A100.22V`, 80 GB SXM4 | $2.036 | **$2.149** | +$0.113 | **+$81.36** |

These are changes between this article's dated observations, not vendor-announced tariff effective dates. The resulting **720-hour compute estimates are $1,123.92 and $1,547.28** before storage, taxes or other charges. Use the native three-decimal inputs: multiplying rounded $1.56/$2.15 comparison cells instead changes those totals by **−$0.72/+$0.72**. Verda's [billing guide](https://docs.verda.com/welcome-to-verda/pricing-and-billing/index.md), checked October 25, also says location affects pricing. Capture the actual region and account-currency quote before deployment.

### Ten-minute prepayment is not a ten-minute nonrefundable minimum

The same billing guide describes PAYG deductions in **prepaid 10-minute increments** and says the unused portion after termination is automatically refunded **within the next billing period**. Keep these three quantities separate:

| Quantity | What it means | What the public documentation does not settle |
|---|---|---|
| Nominal compute estimate | Native hourly rate × assumed billable duration | Actual meter-start and cutoff events |
| Gross prepaid deductions | Balance deducted across billing periods before refunds | A maximum debit bound for an individual short run |
| Settled net cost | Deductions less applicable refunds, plus separately billed resources | Per-resource refund visibility or exact posting latency |

At the **October 25 $2.149/hour A100 80 GB input**, one nominal 10-minute compute block is `2.149 ÷ 6 = $0.358166…`; 20 minutes are approximately **$0.716333**. As a **designed stress scenario**, three prepaid compute blocks total **$1.0745**, before storage. This is not a claim that a 20-minute run necessarily incurs three deductions. It shows why a sub-dollar elapsed-time estimate does not by itself prove a sub-dollar maximum cash draw. Deletion latency, period alignment, storage and refund timing still need bounds.

The documented zero-balance behavior discontinues instances and deletes volumes; automatic top-up can replenish the balance. Neither is a documented per-test numerical budget cap. Check auto top-up separately, and do not rely on balance exhaustion as the cleanup mechanism.

### Shutdown, instance deletion and storage deletion are different operations

The [shutdown/deletion guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/index.md), checked October 25, says **shutdown instances continue charging**. At $2.149/hour, eight billable hours cost **$17.19** after rounding. Another 160 billable hours after a shutdown-only mistake add **$343.84**; the resulting 168-hour compute estimate is **$361.03**, before storage. These are conditional calculations, not a measured penalty.

For deletion, do not assume the console and API have identical defaults. The console guide says **no storage is selected by default**, so retained storage keeps charging. The [public API schema](https://api.verda.com/v1/openapi.json), checked October 25, says omitting `volume_ids` on an instance action deletes only the OS volume and detaches the rest. Enumerate the volumes explicitly and decide which data to retain or export.

For **disposable volumes only**, the API uses different permanence fields:

- Instance action: explicit `volume_ids` and `delete_permanently=true`.
- Standalone `DELETE /v1/volumes/{volume_id}`: request-body field **`is_permanent=true`**, not `delete_permanently`.

Permanent deletion is irreversible. The [storage-deletion guide](https://docs.verda.com/storage/deleting-storage/index.md), checked October 25, documents a **96-hour** restoration window for trashed storage and a PAYG restore charge for the deleted interval. Permanent deletion is required to free storage quota. For a disposable test, verify instance inventory, active volumes and trash; for valuable data, retain it deliberately and budget for that choice.

`PUT /v1/instances` also documents **HTTP 207 partial failures** and per-action success/error results. Inspect each resource result rather than accepting a successful-looking HTTP status as complete cleanup. A failed or filtered inventory is not proof of absence. If creation times out after submission, reconcile the resource ID and inventory before retrying: an ambiguous response does not prove that nothing was created. No action response establishes an independently measured billing-cutoff timestamp.

### Do not turn a price quote or project balance into a resource ledger

The October 25 API schema exposes only `amount` and `currency` in the balance response; it does not specify amount precision, a refund ID or per-instance usage. Instance `price_per_hour` and volume `base_hourly_cost` are quote fields, not accrued-cost counters. The [CLI cost/status guide](https://docs.verda.com/cli/cost-and-status/index.md), checked October 25, describes estimates; [audit logs](https://docs.verda.com/resources/audit-logs/index.md) describe actions and timestamps, not measured billable seconds.

Storage also needs its own quote. The October 25 [pricing page](https://verda.com/pricing) labels NVMe at **$0.2000/GiB-month**, while the API describes volume size in **GB** and exposes hourly/monthly price fields. Do not assume GB equals GiB or invent a 730-hour conversion as a vendor billing rule. Record the account-visible size, unit, type, location, currency and hourly charge separately.

**Next step:** read-only quote and inventory checks first. Establish the maximum gross prepaid exposure plus storage and cleanup allowance before a paid test. If the bounds or cost attribution remain unknown, the public rate supports a forecast—not a claimed hard spending cap. No Verda instance, deletion, refund or invoice was measured for this update.

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

**Jarvis Labs' $0.89/hour 40 GB offer and Thunder's $1.09/hour 80 GB base lead the retained October 18 rate comparison**, not a newly verified market ranking. Hardware fit, account access and complete resource cost still determine whether either is usable.

**The retained October 18 RunPod Secure A100 PCIe input is $1.79/hour. Verda's October 25 40/80 GB inputs are $1.561/$2.149 per hour**, or $1,123.92/$1,547.28 for 720 compute hours. A prepaid balance deduction is not settled usage, and an estimated 20-minute cost is not a hard maximum debit. Capture the region-specific quote, explicitly decide which volumes to retain, inspect every cleanup result and reconcile refunds separately.

For Lambda, fix the monitoring and cleanup assumptions before a trial: a credit balance can lag until the weekly cycle ends, guest poweroff keeps billing, and a successful termination response can still describe an in-progress operation. A defensible deployment budget needs both a dated rate and a verified release path.

## Choose the next A100 decision

- **You need to validate model fit before comparing providers:** use the [Llama 70B GPU guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) to check VRAM, quantization, topology, and runtime headroom rather than treating every A100 row as interchangeable capacity.
- **You need request-waking capacity rather than an allocated VM:** compare the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) for scale-to-zero behavior, startup boundaries, and idle-tail billing before choosing a managed endpoint.
- **You already know the workload shape and need a planning number:** put active time, warm retention, retries, storage, and teardown into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) instead of multiplying the selected hourly rate across every calendar hour.

## Sources and verification notes

**October 25, 2026:** Verda's two A100 native rates, visible/structured/API agreement, machine allocations, prepaid/refund documentation, deletion behavior, storage units, API fields and cost/audit documentation were rechecked. **October 18, 2026:** the other 19 comparison inputs and their provider-specific billing observations retain the earlier check. Historical RunPod October 15 and Verda October 18 values are labeled retained observations. Link reachability checks today do not reverify an older provider's price or billing terms. Conversions use native rates; 720-hour money totals round only at the end, while repeating short-interval values are explicitly approximate.

The A100 tables use official pricing pages, with these additional checks:

- **RunPod:** visible Secure Cloud table and embedded offer agree; no authenticated quote or stock check was performed.
- **Verda:** October 25 exact on-demand SKUs match visible table rows, structured offers and public API, and the current repo dataset's native `raw` cells. The comparison against October 18 is specific to this guide, not the data-agent's different prior audit window. Schema fields and examples establish a documented contract, not observed lifecycle or financial results. No dataset is modified by this draft.
- **Lambda:** rows are bound to the **1x** GPU-count tab; PCIe and SXM shapes were checked separately. API schema and response examples are documentation, not observations of a running account.
- **Vultr:** the complete [public plans response](https://api.vultr.com/v2/plans?per_page=500) supplies `vcg-a100-12c-120g-80vram` at $2.397/hour. Its marketing page returned HTTP 403. The API check does not establish deployable capacity or reconstruct monthly invoice rules.
- **Thunder:** the pricing API independently matches the A100 base; the page supplies its CPU/memory/disk inclusions.
- **Northflank:** GPU components remain outside complete-product rankings. Other products retain their own exclusions in the tables.

No hosted experiment, invoice, cold start, throughput, precise meter cutoff or storage-restoration result was measured. The actionable next step is a read-only quote, capacity and cleanup check, followed by a bounded workload test only after cost attribution and teardown are understood.

*Need self-managed Pods? This labeled affiliate link supports HostFleet at no extra cost to you: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Verify the exact GPU, region, account quote and storage behavior before purchase. Source citations remain direct and non-affiliate.*
