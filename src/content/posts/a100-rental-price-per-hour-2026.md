---
title: "A100 rental price per hour in 2026: 21 rates and the CoreWeave floor"
description: "Twenty-one public A100 rates, with Verda 40 GB and 80 GB prices rechecked October 5 and the other 19 anchors dated September 29."
pubDate: 2026-07-31
updatedDate: 2026-10-05
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card and lifecycle comparison; calculated totals are estimates.** This refresh uses official provider pages, public vendor APIs, HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/), and CoreWeave's deployment documentation. The 19 non-Verda price points retain their **September 29, 2026** official-source checks; the two Verda A100 rates were rechecked against Verda's pricing page and public instance-types API on **October 5, 2026**. This is a targeted price update, not a fresh 21-provider audit. HostFleet did not measure invoices, transition timing, inventory, throughput, or reliability.

> **Price anchors:** Verda A100 rates October 5, 2026; other 19 rates September 29, 2026<br>
> **Currency:** public USD list rates before tax<br>
> **Monthly estimate:** one listed product held billable for 720 hours<br>
> **Boundary:** a catalog price does not prove stock, quota, access, or equal performance

# A100 rental price per hour in 2026: 21 rates and the CoreWeave floor

The cheapest selected **A100 40 GB** rate is Jarvis Labs at **$0.89 per GPU-hour**, or an estimated **$640.80 for 720 active hours**. For **A100 80 GB**, Thunder Compute has the lowest minimum launchable total here: an estimated **$1.25/hour** after required CPU is added to its $1.09 GPU base. Hyperstack and Massed Compute publish complete one-GPU VM totals of **$1.35/hour**.

Two recent changes matter for the cost calculation:

1. **Verda raised both A100 rates again on October 5.** Its official page and public API list A100 40 GB at **$1.307/hour** and A100 80 GB at **$1.815/hour**. The resulting 720-hour estimates are **$941.04** and **$1,306.80**. These are source-backed rates and arithmetic estimates, not measured invoices.
2. **CoreWeave's $2.70/GPU-hour A100 inference rate carries a documented warm floor.** Dedicated Inference requires `autoscaling.min` of at least one and does not support ordinary scale-to-zero. CoreWeave exposes `disabled=true`, but its public docs do not say whether disabling releases the replica or stops GPU-hour metering.

These products are not interchangeable. The comparison spans 40 GB and 80 GB cards, PCIe and SXM4 systems, complete VMs, Pods, per-second containers, managed deployments, and GPU-only components. Choose memory and operating surface before sorting by price.

## The short answer

| Requirement | Lowest selected public rate | 720-hour planning figure | Important boundary |
|---|---:|---:|---|
| A100 40 GB | Jarvis Labs at **$0.89/hr** | **$640.80** | One-GPU on-demand row; pause releases capacity |
| A100 80 GB, lowest launchable total | Thunder Compute at **$1.25/hr estimated** | **$900.00** | $1.09 GPU base plus four required paid vCPUs |
| A100 80 GB, complete published VM total | Hyperstack or Massed Compute at **$1.35/hr** | **$972.00** | Different regions, variants, included resources, and lifecycle rules |
| A100 80 GB, request-waking service | Koyeb at **$1.60/hr while active** | **$1,152.00 if active for 720 hours** | Public-preview scale-to-zero; five-minute default idle period |
| Managed-cloud component | Northflank at **$1.42/hr for 40 GB** or **$1.76/hr for 80 GB** | GPU component only | CPU, memory, disk, and egress are separate |

The selected summary leaders were checked September 29, 2026; the Verda rates elsewhere on this page were rechecked October 5. The monthly values are arithmetic estimates, not vendor quotes or measured bills.

## A100 40 GB: five product rates plus one component price

If model weights, KV cache, batch, context, runtime workspace, and safety headroom do not fit, the lower 40 GB rates are irrelevant. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains that sizing step.

| Provider and product | Configuration or boundary | Public rate | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Jarvis Labs** | 1x A100 40 GB; 16 vCPU and 112 GB RAM listed | **$0.89/GPU-hr** | **$640.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 29, 2026 |
| **Verda** | 1x A100 40 GB SXM4; 22 CPU and 120 GB RAM; storage separate | **$1.307/hr** | **$941.04** | [Verda pricing](https://verda.com/pricing) and [API](https://api.verda.com/v1/instance-types), Oct. 5, 2026 |
| **Lambda Cloud** | Selected one-GPU A100 PCIe or SXM row; 40 GB | **$1.99/GPU-hr** | **$1,432.80** | [Lambda instances](https://lambda.ai/instances), Sept. 29, 2026 |
| **Modal** | A100 40 GB allocated to a serverless container | **$0.000583/sec** (**$2.0988/hr**) | **$1,511.14** | [Modal pricing](https://modal.com/pricing), Sept. 29, 2026 |
| **Paperspace** | 1x A100 40 GB; 12 vCPU and 90 GB RAM; default SSD separate | **$3.09/hr compute** | **$2,224.80 compute** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Sept. 29, 2026 |

Northflank publishes an A100 40 GB component at **$1.42/GPU-hour**, checked September 29, 2026 on [Northflank pricing](https://northflank.com/pricing). That is **$1,022.40 for 720 GPU-component hours**, before required CPU and memory. Northflank does not prescribe one A100-specific CPU/RAM shape, so this guide does not invent an all-in total.

## A100 80 GB: 14 product rates plus one component price

The table ranks complete published products. Northflank's incomplete GPU component stays below it. Thunder is the one ranked row whose minimum total requires explicit CPU arithmetic.

| Provider and product | Configuration or access boundary | Public rate used | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Thunder Compute** | 1x A100 80 GB; minimum 8 vCPU, 64 GB RAM, and 100 GB disk | **$1.09 GPU + 4 × $0.04 vCPU = $1.25/hr** | **$900.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs), Sept. 29, 2026 |
| **Hyperstack** | 1x A100 80 GB PCIe; 28 CPU, 120 GB RAM, and local storage; Canada | **$1.35/GPU-hr** | **$972.00** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), Sept. 29, 2026 |
| **Massed Compute** | 1x A100 80 GB; 16 vCPU and 96 GB RAM included | **$1.35/hr** | **$972.00** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), Sept. 29, 2026 |
| **Jarvis Labs** | 1x A100 80 GB; 16 vCPU and 112 GB RAM listed | **$1.49/GPU-hr** | **$1,072.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 29, 2026 |
| **RunPod Secure Cloud Pod** | Selected one-GPU A100 80 GB PCIe Pod; Secure SXM also $1.59/hr | **$1.59/hr** | **$1,144.80** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 29, 2026 |
| **Koyeb GPU Service** | 1x A100 80 GB; 15 vCPU, 180 GB RAM, and 320 GB disk | **$1.60/hr** | **$1,152.00** | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 29, 2026 |
| **Verda** | 1x A100 80 GB SXM4; 22 CPU and 120 GB RAM; storage separate | **$1.815/hr** | **$1,306.80** | [Verda pricing](https://verda.com/pricing) and [API](https://api.verda.com/v1/instance-types), Oct. 5, 2026 |
| **Vultr Cloud GPU** | 1x PCIe A100 80 GB; 12 vCPU, 120 GB RAM, storage, and bandwidth listed | **$2.397/hr** | **$1,725.84** | [Vultr plan API](https://api.vultr.com/v2/plans?per_page=500), Sept. 29, 2026 |
| **Modal** | A100 80 GB allocated to a serverless container | **$0.000694/sec** (**$2.4984/hr**) | **$1,798.85** | [Modal pricing](https://modal.com/pricing), Sept. 29, 2026 |
| **CoreWeave Inference** | Single-GPU inference rate; inference-platform customers only | **$2.70/GPU-hr** | **$1,944.00** | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 29, 2026 |
| **RunPod Serverless** | A100 80 GB worker tier; not an exact-card reservation | **$2.72/hr** | **$1,958.40** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 29, 2026 |
| **Paperspace** | 1x A100 80 GB; 12 vCPU and 90 GB RAM; default SSD separate | **$3.18/hr compute** | **$2,289.60 compute** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Sept. 29, 2026 |
| **Baseten** | A100 80 GiB managed deployment | **$0.06667/min** (**$4.0002/hr**) | **$2,880.14** | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 29, 2026 |
| **Replicate** | A100 80 GB private managed deployment | **$0.001400/sec** (**$5.04/hr**) | **$3,628.80** | [Replicate pricing](https://replicate.com/pricing), Sept. 29, 2026 |

Northflank's A100 80 GB component is **$1.76/GPU-hour**, or **$1,267.20 for 720 component hours**, from [official pricing](https://northflank.com/pricing) checked September 29, 2026. CPU, memory, persistent disk, and egress are additional. Its GPU number cannot be ranked as a complete service total.

Together, the guide contains **six A100 40 GB price points and 15 A100 80 GB price points: 21 public rates**.

## What changed on October 5: Verda's A100 rates

Verda's [pricing page](https://verda.com/pricing) and [public instance-types API](https://api.verda.com/v1/instance-types), checked **October 5, 2026**, agree on both exact one-GPU on-demand rates and the selected 22-CPU/120-GB instance shapes. These are fixed A100 SXM4 VM offers, not spot or serverless prices.

| Verda offer | Sept. 29 rate in this guide | Oct. 5 live rate | Change from Sept. 29 | New 720-hour estimate |
|---|---:|---:|---:|---:|
| A100 SXM4 40 GB | $1.288/hr | **$1.307/hr** | **+$0.019/hr (+1.5%)** | **$941.04** |
| A100 SXM4 80 GB | $1.797/hr | **$1.815/hr** | **+$0.018/hr (+1.0%)** | **$1,306.80** |

Compared with the previously displayed rates, a continuously billable 720-hour allocation rises **$13.68** for 40 GB and **$12.96** for 80 GB. The percentage changes use exact rates and are rounded to one decimal. Neither change moves the lowest selected 40 GB or 80 GB offer, but the Verda rows and budget arithmetic should no longer use September's prices. The remaining 19 price points were **not** rechecked on October 5 and retain their September 29 source dates.

Verda's [pricing and billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), checked September 29, says pay-as-you-go usage is prepaid in 10-minute increments and unused terminated time is returned in the next billing period. Its [lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/), checked the same day, says shutdown does not release compute billing; deletion is required. Those lifecycle claims were not re-audited in this targeted price update.

At **$1.815/hour**, one nominal 10-minute A100 80 GB prepayment is **$0.3025**. This is cash-flow arithmetic, not a 10-minute minimum-charge claim. The unused terminated portion is documented as a later refund, while retained storage can continue billing.

### CoreWeave's A100 rate has a one-replica documented floor

CoreWeave's [pricing page](https://www.coreweave.com/pricing), checked September 29, lists its North America A100 Dedicated Inference rate at **$2.70 per GPU-hour** for inference-platform customers. Its [billing documentation](https://docs.coreweave.com/products/inference/billing), checked the same day, says on-demand deployments are measured in GPU-hours at deployment level.

CoreWeave's [scaling documentation](https://docs.coreweave.com/products/inference/scaling), checked September 29, establishes three useful boundaries:

- `autoscaling.min` must be at least **1**; ordinary scale-to-zero is not supported.
- Scale-down recommendations are stabilized for about **five minutes** before replicas above the minimum are removed. At the A100 list rate, one five-minute extra-replica tail is a nominal **$0.225**, calculated as `$2.70 × 5 / 60`. This does not apply to the mandatory minimum replica.
- One A100 replica held billable for 720 hours is **$1,944.00**, before storage, discounts, credits, tax, or contract terms.

CoreWeave's [models and deployments guide](https://docs.coreweave.com/products/inference/models), checked September 29, says `disabled=true` stops traffic and preserves deployment configuration. It does **not** say that disabling releases replicas, identify when GPU metering stops, or promise that re-enabling preserves a warm runtime. Configuration retention is not GPU warmth.

Do not call CoreWeave Dedicated Inference scale-to-zero, and do not subtract disabled hours from a forecast without account-specific evidence. Budget the one-replica floor until a controlled test or written provider answer proves otherwise. The public-preview [FOCUS export](https://docs.coreweave.com/billing/focus-export-api) reports GPU-hour quantities at hourly grain but has no dollar fields or per-resource rows; an isolated SKU, zone, and cluster bucket is needed for an attributable disable test.

## Memory class comes before hourly price

Jarvis Labs' $0.89 A100 40 GB rate is 36 cents below Thunder's estimated $1.25 minimum A100 80 GB total. The gap matters only if the workload safely fits the smaller card.

Start with weights, precision, KV cache, batch size, context, serving-runtime workspace, and safety headroom. If the requirement exceeds 40 GB, remove every 40 GB row. Then record PCIe versus SXM4, topology, region, and minimum GPU count. “A100” alone is not a reproducible deployment shape.

## What the 720-hour estimates mean

A 30-day planning month has 720 hours. Each monthly number assumes one named product remains billable for all 720 hours. Native per-second and per-minute inputs are multiplied before rounding. Thunder's $900 estimate includes minimum paid-vCPU arithmetic; Northflank remains a component floor.

The estimates exclude tax, commitments, support, regional premiums, extra replicas, retries, labor, and storage, network, or IP charges unless explicitly included. For intermittent work, replace 720 with billable allocation time, then add startup where charged, model load, retries, idle windows, warm floors, and retained resources. The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) exposes those assumptions.

## The off switch can reverse the ranking

- **Jarvis Labs:** pause ends compute after the instance reaches the paused state; retained storage bills, and capacity is released.
- **Thunder Compute:** its [billing guide](https://www.thundercompute.com/docs/billing), checked September 29, says compute bills per minute while running and deletion stops instance billing.
- **Hyperstack:** its [states and billing guide](https://docs.hyperstack.cloud/docs/billing/states-and-billing/), checked September 29, says a stopped VM remains billable; hibernation releases compute while retained resources may bill.
- **RunPod Pods:** compute and persistent storage have separate lifecycle controls. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the split.
- **Koyeb:** its [scale-to-zero guide](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked September 29, documents a five-minute default idle period for eligible GPU Services. At the official **$1.60/hour** A100 rate checked September 29 on [Koyeb pricing](https://www.koyeb.com/pricing), one nominal five-minute tail is **$0.1333**, excluding startup and active work.
- **Verda:** shutdown keeps compute billing active; delete the instance and clean up retained storage separately.
- **CoreWeave Inference:** enabled autoscaling has a one-replica minimum. `disabled=true` stops traffic, but its compute-billing outcome is undocumented.
- **Vultr:** its [stopped-instance billing documentation](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr), checked September 29, says billing continues until destruction.
- **Paperspace:** `Off` ends Machine compute, but the default disk and any static IP are separate resources.
- **Northflank:** manual zero makes the service unavailable; checked docs do not establish request wake-up from zero.
- **Modal and RunPod Serverless:** workers can reach zero, but startup, execution, idle windows, and warm settings determine billable allocation.

Use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) when request-driven wake behavior matters more than VM ownership.

## Buying checklist

1. Set the 40 GB or 80 GB memory floor.
2. Record PCIe or SXM4, topology, region, and GPU count.
3. Add required CPU, memory, storage, IP, and egress.
4. Confirm account eligibility, quota, approval, and live inventory.
5. Verify which lifecycle action ends compute billing.
6. Run a bounded deployment and billing test.
7. Alert on extra replicas and retained resources.

## Verdict

**Jarvis Labs remains the A100 40 GB price leader at $0.89/GPU-hour**, or an estimated **$640.80 for 720 active hours**, based on its official rate checked September 29.

**Thunder Compute remains the lowest selected A100 80 GB launchable total at an estimated $1.25/hour.** This is transparent component arithmetic, not a vendor-published all-in headline. Hyperstack and Massed Compute tie at **$1.35/hour** among selected complete published VM totals.

**Verda now lists $1.307/hour for A100 40 GB and $1.815/hour for A100 80 GB**, checked October 5 on its official pricing page and API. The 720-hour estimates are **$941.04** and **$1,306.80**, respectively; storage remains separate.

**CoreWeave's $2.70/hour A100 inference line should be budgeted as a $1,944.00 720-hour floor for one enabled replica.** Public docs establish the minimum replica and disable control, but not whether disabling ends GPU metering. Treat that cost escape hatch as unresolved.

The buying order is memory, exact hardware, product shape, capacity, billing lifecycle, complete cost, and then hourly rate.

## Continue the deployment decision

- **Still sizing the model?** Use the [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) to establish whether 40 GB is genuinely enough before optimizing an A100 hourly rate.
- **Already know the provider and expected run pattern?** Put startup, active time, idle tail, and warm capacity into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) rather than planning around 720 allocated hours by default.
- **Need an endpoint that can return to zero?** Compare the lifecycle and deployment boundaries in the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) before treating a VM or Pod rate as an application-serving cost.

## Sources

- [HostFleet GPU pricing dataset](https://hostfleet.net/gpu-pricing/) — comparison baseline; this article rechecked its two Verda A100 anchors October 5, while the other 19 retained rates date to September 29
- [Verda pricing](https://verda.com/pricing) and [API](https://api.verda.com/v1/instance-types) — exact one-GPU on-demand A100 rates and shapes; checked October 5, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing), [billing](https://docs.coreweave.com/products/inference/billing), [scaling](https://docs.coreweave.com/products/inference/scaling), [models and deployments](https://docs.coreweave.com/products/inference/models), and [FOCUS export](https://docs.coreweave.com/billing/focus-export-api) — rate, one-replica minimum, disable semantics, and meter limits; checked September 29
- [Jarvis Labs](https://jarvislabs.ai/pricing), [Thunder](https://www.thundercompute.com/pricing), [Hyperstack](https://www.hyperstack.cloud/gpu-pricing), and [Massed Compute](https://vm.massedcompute.com/pricing) — low-end anchors; checked September 29
- [RunPod](https://www.runpod.io/pricing), [Koyeb](https://www.koyeb.com/pricing), [Modal](https://modal.com/pricing), [Baseten](https://www.baseten.co/pricing/), and [Replicate](https://replicate.com/pricing) — Pod, serverless, and managed rates; checked September 29
- [Lambda](https://lambda.ai/instances), [Vultr API](https://api.vultr.com/v2/plans?per_page=500), [Paperspace](https://docs.digitalocean.com/products/paperspace/pricing/), and [Northflank](https://northflank.com/pricing) — remaining anchors; checked September 29

*Need a self-managed A100 endpoint? This is a labeled affiliate link; source citations remain direct. <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (+$5 credit on your first $10, affiliate)</a> supports HostFleet's testing budget at no extra cost to you. Re-check the card, region, rate, storage, and shutdown behavior before purchase.*
