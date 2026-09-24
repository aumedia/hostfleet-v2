---
title: "A100 rental price per hour in 2026: 21 public rates checked"
description: "Twenty-one public A100 rates checked September 24, Novita’s unsupported row removed, Verda repriced, and 720-hour costs compared."
pubDate: 2026-07-31
updatedDate: 2026-09-24
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card and lifecycle comparison; calculated totals are estimates.** This refresh uses official provider pages, public vendor APIs, and HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/). All 21 retained A100 price points were rechecked against official sources on **September 24, 2026**. HostFleet did not measure invoices, transition timing, inventory, throughput, or reliability.

> **Price anchors rechecked:** September 24, 2026<br>
> **Currency:** public USD list rates before tax<br>
> **Monthly estimate:** one listed product held billable for 720 hours<br>
> **Boundary:** a catalog price does not prove stock, quota, access, or equal performance

# A100 rental price per hour in 2026: 21 public rates checked

The cheapest selected **A100 40 GB** rate is Jarvis Labs at **$0.89 per GPU-hour**, or an estimated **$640.80 for 720 active hours**. For **A100 80 GB**, Thunder Compute has the lowest minimum launchable total here: an estimated **$1.25/hour** after required CPU is added to its $1.09 GPU base. Hyperstack and Massed Compute publish complete one-GPU VM totals of **$1.35/hour**.

The September 24 refresh changes two details:

1. **Novita's prior $1.60/hour A100 80 GB row has been removed.** It was absent from both the rendered public marketplace and Novita's public products API. That is a current-catalog observation, not proof of permanent discontinuation or private-account availability.
2. **Verda raised both A100 rates.** Its exact A100 40 GB rate moved from $1.264 to **$1.282/hour**, while A100 80 GB moved from $1.735 to **$1.744/hour**. Its pricing page and public API agree.

These products are not interchangeable. The comparison spans 40 GB and 80 GB cards, PCIe and SXM4 systems, complete VMs, Pods, per-second containers, managed deployments, and GPU-only components. Choose memory and operating surface before sorting by price.

## The short answer

| Requirement | Lowest selected public rate | 720-hour planning figure | Important boundary |
|---|---:|---:|---|
| A100 40 GB | Jarvis Labs at **$0.89/hr** | **$640.80** | One-GPU on-demand row; pause releases capacity |
| A100 80 GB, lowest launchable total | Thunder Compute at **$1.25/hr estimated** | **$900.00** | $1.09 GPU base plus four required paid vCPUs |
| A100 80 GB, complete published VM total | Hyperstack or Massed Compute at **$1.35/hr** | **$972.00** | Different regions, variants, included resources, and lifecycle rules |
| A100 80 GB, request-waking service | Koyeb at **$1.60/hr while active** | **$1,152.00 if active for 720 hours** | Public-preview scale-to-zero; five-minute default idle period |
| Managed-cloud component | Northflank at **$1.42/hr for 40 GB** or **$1.76/hr for 80 GB** | GPU component only | CPU, memory, disk, and egress are separate |

All price inputs in this summary were checked September 24, 2026. The monthly values are arithmetic estimates, not vendor quotes or measured bills.

## A100 40 GB: five product rates plus one component price

If model weights, KV cache, batch, context, runtime workspace, and safety headroom do not fit, the lower 40 GB rates are irrelevant. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains that sizing step.

| Provider and product | Configuration or boundary | Public rate | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Jarvis Labs** | 1x A100 40 GB; 16 vCPU and 112 GB RAM listed | **$0.89/GPU-hr** | **$640.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 24, 2026 |
| **Verda** | 1x A100 40 GB SXM4; 22 CPU and 120 GB RAM; storage separate | **$1.282/hr** | **$923.04** | [Verda pricing](https://verda.com/pricing) and [API](https://api.verda.com/v1/instance-types), Sept. 24, 2026 |
| **Lambda Cloud** | Selected one-GPU A100 PCIe or SXM row; 40 GB | **$1.99/GPU-hr** | **$1,432.80** | [Lambda instances](https://lambda.ai/instances), Sept. 24, 2026 |
| **Modal** | A100 40 GB allocated to a serverless container | **$0.000583/sec** (**$2.0988/hr**) | **$1,511.14** | [Modal pricing](https://modal.com/pricing), Sept. 24, 2026 |
| **Paperspace** | 1x A100 40 GB; 12 vCPU and 90 GB RAM; default SSD separate | **$3.09/hr compute** | **$2,224.80 compute** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Sept. 24, 2026 |

Northflank publishes an A100 40 GB component at **$1.42/GPU-hour**, checked September 24, 2026 on [Northflank pricing](https://northflank.com/pricing). That is **$1,022.40 for 720 GPU-component hours**, before required CPU and memory. Northflank does not prescribe one A100-specific CPU/RAM shape, so this guide does not invent an all-in total.

## A100 80 GB: 14 product rates plus one component price

The table ranks complete published products. Northflank's incomplete GPU component stays below it. Thunder is the one ranked row whose minimum total requires explicit CPU arithmetic.

| Provider and product | Configuration or access boundary | Public rate used | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Thunder Compute** | 1x A100 80 GB; minimum 8 vCPU, 64 GB RAM, and 100 GB disk | **$1.09 GPU + 4 × $0.04 vCPU = $1.25/hr** | **$900.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs), Sept. 24, 2026 |
| **Hyperstack** | 1x A100 80 GB PCIe; 28 CPU, 120 GB RAM, and local storage; Canada | **$1.35/GPU-hr** | **$972.00** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), Sept. 24, 2026 |
| **Massed Compute** | 1x A100 80 GB; 16 vCPU and 96 GB RAM included | **$1.35/hr** | **$972.00** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), Sept. 24, 2026 |
| **Jarvis Labs** | 1x A100 80 GB; 16 vCPU and 112 GB RAM listed | **$1.49/GPU-hr** | **$1,072.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 24, 2026 |
| **RunPod Secure Cloud Pod** | Selected one-GPU A100 80 GB PCIe Pod; Secure SXM also $1.59/hr | **$1.59/hr** | **$1,144.80** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 24, 2026 |
| **Koyeb GPU Service** | 1x A100 80 GB; 15 vCPU, 180 GB RAM, and 320 GB disk | **$1.60/hr** | **$1,152.00** | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 24, 2026 |
| **Verda** | 1x A100 80 GB SXM4; 22 CPU and 120 GB RAM; storage separate | **$1.744/hr** | **$1,255.68** | [Verda pricing](https://verda.com/pricing) and [API](https://api.verda.com/v1/instance-types), Sept. 24, 2026 |
| **Vultr Cloud GPU** | 1x PCIe A100 80 GB; 12 vCPU, 120 GB RAM, storage, and bandwidth listed | **$2.397/hr** | **$1,725.84** | [Vultr plan API](https://api.vultr.com/v2/plans?per_page=500), Sept. 24, 2026 |
| **Modal** | A100 80 GB allocated to a serverless container | **$0.000694/sec** (**$2.4984/hr**) | **$1,798.85** | [Modal pricing](https://modal.com/pricing), Sept. 24, 2026 |
| **CoreWeave Inference** | Single-GPU inference rate; inference-platform customers only | **$2.70/GPU-hr** | **$1,944.00** | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 24, 2026 |
| **RunPod Serverless** | A100 80 GB worker tier; not an exact-card reservation | **$2.72/hr** | **$1,958.40** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 24, 2026 |
| **Paperspace** | 1x A100 80 GB; 12 vCPU and 90 GB RAM; default SSD separate | **$3.18/hr compute** | **$2,289.60 compute** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Sept. 24, 2026 |
| **Baseten** | A100 80 GiB managed deployment | **$0.06667/min** (**$4.0002/hr**) | **$2,880.14** | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 24, 2026 |
| **Replicate** | A100 80 GB private managed deployment | **$0.001400/sec** (**$5.04/hr**) | **$3,628.80** | [Replicate pricing](https://replicate.com/pricing), Sept. 24, 2026 |

Northflank's A100 80 GB component is **$1.76/GPU-hour**, or **$1,267.20 for 720 component hours**, from [official pricing](https://northflank.com/pricing) checked September 24, 2026. CPU, memory, persistent disk, and egress are additional. Its GPU number cannot be ranked as a complete service total.

Together, the guide contains **six A100 40 GB price points and 15 A100 80 GB price points: 21 public rates**.

## What changed on September 24

### Novita's A100 row was removed

HostFleet's September 21 snapshot carried a Novita A100 80 GB row at **$1.60/hour**. On September 24, neither Novita's rendered public marketplace nor its [public products API](https://api-server.novita.ai/api/v1/market/products) exposed an A100 product. The unsupported row was removed.

A missing public row does not establish permanent discontinuation, private availability, future inventory, or a technical inability to offer A100s. It establishes only that a buyer could not reproduce the prior public catalog price from either checked official surface on September 24.

This changes the count from 22 to 21 and leaves Koyeb alone at **$1.60/hour** in the current 80 GB list. Koyeb is still a serverless application instance, not a like-for-like replacement for the removed Novita VM.

### Verda raised both exact rates

| Verda offer | Sept. 21 rate | Sept. 24 rate | Derived movement | 720-hour estimate |
|---|---:|---:|---:|---:|
| A100 SXM4 40 GB | $1.264/hr | **$1.282/hr** | **+1.4%** | **$923.04** |
| A100 SXM4 80 GB | $1.735/hr | **$1.744/hr** | **+0.5%** | **$1,255.68** |

The percentages are derived from exact vendor values and rounded to one decimal. Against September 21, the 720-hour increase is **$12.96 for 40 GB** and **$6.48 for 80 GB**. The fixed shapes remain one GPU, 22 CPU, and 120 GB RAM; storage is separate. Neither movement changes the category leader.

Verda's [pricing and billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), checked September 24, says pay-as-you-go usage is prepaid in 10-minute increments and unused terminated time is returned in the next billing period. Its [lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/), checked the same day, says shutdown does not release compute billing; deletion is required.

At the current A100 80 GB rate, one nominal 10-minute prepayment is **$0.2907**:

    $1.744 / 6 = $0.2907

That is cash-flow arithmetic, not a 10-minute minimum-charge claim. The unused terminated portion is documented as a later refund, while retained storage can continue billing.

## Memory class comes before hourly price

Jarvis Labs' $0.89 A100 40 GB rate is 36 cents below Thunder's estimated $1.25 minimum A100 80 GB total. The gap matters only if the workload safely fits the smaller card.

Start with weights, precision, KV cache, batch size, context, serving-runtime workspace, and safety headroom. If the requirement exceeds 40 GB, remove every 40 GB row. Then record PCIe versus SXM4, topology, region, and minimum GPU count. “A100” alone is not a reproducible deployment shape.

## What the 720-hour estimates mean

A 30-day planning month has 720 hours. Each monthly number assumes one named product remains billable for all 720 hours. Native per-second and per-minute inputs are multiplied before rounding. Thunder's $900 estimate includes minimum paid-vCPU arithmetic; Northflank remains a component floor.

The estimates exclude tax, commitments, support, regional premiums, extra replicas, retries, labor, and storage, network, or IP charges unless explicitly included. For intermittent work, replace 720 with billable allocation time, then add startup where charged, model load, retries, idle windows, warm floors, and retained resources. The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) exposes those assumptions.

## The off switch can reverse the ranking

- **Jarvis Labs:** pause ends compute after the instance reaches the paused state; retained storage bills, and capacity is released.
- **Thunder Compute:** its [billing guide](https://www.thundercompute.com/docs/billing), checked September 24, says compute bills per minute while running and deletion stops instance billing.
- **Hyperstack:** its [states and billing guide](https://docs.hyperstack.cloud/docs/billing/states-and-billing/), checked September 24, says a stopped VM remains billable; hibernation releases compute while retained resources may bill.
- **RunPod Pods:** compute and persistent storage have separate lifecycle controls. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the split.
- **Koyeb:** its [scale-to-zero guide](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked August 28, documents a five-minute default idle period for eligible GPU Services. At $1.60/hour, one nominal five-minute tail is **$0.1333**, excluding startup and active work.
- **Verda:** shutdown keeps compute billing active; delete the instance and clean up retained storage separately.
- **Vultr:** its [stopped-instance billing documentation](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr), checked September 24, says billing continues until destruction.
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

**Jarvis Labs remains the A100 40 GB price leader at $0.89/GPU-hour**, or an estimated **$640.80 for 720 active hours**, based on its official rate checked September 24.

**Thunder Compute remains the lowest selected A100 80 GB launchable total at an estimated $1.25/hour.** This is transparent component arithmetic, not a vendor-published all-in headline. Hyperstack and Massed Compute tie at **$1.35/hour** among selected complete published VM totals.

**Novita's former $1.60/hour A100 row is gone because neither checked public surface exposed it on September 24.** Removing an unsupported rate is more useful than preserving a cheap number readers cannot reproduce.

**Verda now lists $1.282/hour for A100 40 GB and $1.744/hour for A100 80 GB.** The increases are small, but they raise the 720-hour estimates to $923.04 and $1,255.68.

The buying order is memory, exact hardware, product shape, capacity, billing lifecycle, complete cost, and then hourly rate.

## Sources

- [HostFleet GPU pricing dataset](https://hostfleet.net/gpu-pricing/) — full source verification September 24, 2026
- [Novita products API](https://api-server.novita.ai/api/v1/market/products) — no A100 product in the September 24 response
- [Verda pricing](https://verda.com/pricing) and [API](https://api.verda.com/v1/instance-types) — exact rates and shapes; checked September 24
- [Jarvis Labs](https://jarvislabs.ai/pricing), [Thunder](https://www.thundercompute.com/pricing), [Hyperstack](https://www.hyperstack.cloud/gpu-pricing), and [Massed Compute](https://vm.massedcompute.com/pricing) — low-end anchors; checked September 24
- [RunPod](https://www.runpod.io/pricing), [Koyeb](https://www.koyeb.com/pricing), [Modal](https://modal.com/pricing), [Baseten](https://www.baseten.co/pricing/), and [Replicate](https://replicate.com/pricing) — Pod, serverless, and managed rates; checked September 24
- [Lambda](https://lambda.ai/instances), [CoreWeave](https://www.coreweave.com/pricing), [Vultr API](https://api.vultr.com/v2/plans?per_page=500), [Paperspace](https://docs.digitalocean.com/products/paperspace/pricing/), and [Northflank](https://northflank.com/pricing) — remaining anchors; checked September 24

*Need a self-managed A100 endpoint? This is a labeled affiliate link; source citations remain direct. <a href="https://hostfleet.net/go/runpod" rel="sponsored nofollow">RunPod signup (+$5 credit on your first $10, affiliate)</a> supports HostFleet's testing budget at no extra cost to you. Re-check the card, region, rate, storage, and shutdown behavior before purchase.*
