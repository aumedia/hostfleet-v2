---
title: "H100 rental price per hour in 2026: 10 public cloud rates checked"
description: "H100 price per hour across 10 public rates, with GPU variants, single-GPU eligibility, stopped-VM billing, and 720-hour cost estimates."
pubDate: 2026-07-29
updatedDate: 2026-08-13
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check; estimated monthly totals.** The public provider pages and HostFleet rate dataset used here were checked on **August 13, 2026**. These are list prices and transparent arithmetic—not performance benchmarks, inventory checks, negotiated quotes, or complete invoices.

# H100 rental price per hour in 2026: 10 public cloud rates checked

The lowest selected public H100 rate in this comparison is now **$2.50 per GPU-hour** for a one-GPU Hyperstack H100 PCIe VM in Canada. RunPod Secure Cloud follows at **$2.89/hour**. But the useful buying answer is not simply “pick $2.50”: H100 variants differ, regions differ, and some providers sell a one-GPU VM while others sell serverless allocation or an account-gated inference platform.

This refresh adds **Hyperstack, Nebius AI Cloud, and CoreWeave Inference** to the existing seven-rate guide. It uses the same August 13 data behind [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/), while exposing the product boundaries that a sortable rate table cannot fully explain.

> **Verified date:** August 13, 2026
>
> **Currency:** public USD list rates before tax
>
> **Comparison unit:** one listed GPU-hour or its per-second/per-minute equivalent
>
> **Boundary:** a public price is not proof of stock, quota, region access, or deployment eligibility

## Current H100 price-per-hour comparison

The table is sorted by the selected public hourly rate. Per-second and per-minute prices are converted using 3,600 seconds or 60 minutes. The exact H100 variant and surrounding product remain visible because PCIe, SXM/NVLink, a serverless worker, and managed serving are not interchangeable purchases.

| Provider and product shape | H100 scope | Public list rate | Official evidence, checked Aug. 13, 2026 |
|---|---|---:|---|
| **Hyperstack** | 1x H100 80 GB PCIe VM; Canada | **$2.50/GPU-hr** | [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) |
| **RunPod Pods** | H100 PCIe, Secure Cloud, self-managed Pod | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing) |
| **Lambda Cloud** | 1x H100 PCIe VM | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances) |
| **Nebius AI Cloud** | 1x H100 SXM/NVLink VM with prescribed CPU and RAM; eu-north1 | **$3.85/GPU-hr** | [Nebius pricing](https://nebius.com/prices) |
| **Modal** | H100 allocated to a serverless container | **$3.9492/hr** | [Modal pricing](https://modal.com/pricing), $0.001097/sec |
| **Fal** | H100 80 GB custom deployment | **$4.50/hr** | [Fal pricing](https://fal.ai/pricing) |
| **RunPod Serverless** | H100 worker tier; not an exact-card reservation | **$4.55/hr** | [RunPod pricing](https://www.runpod.io/pricing) |
| **Replicate** | Private H100 model deployment | **$5.49/hr** | [Replicate pricing](https://replicate.com/pricing), $0.001525/sec |
| **CoreWeave Inference** | Single-GPU inference rate for inference-platform customers | **$6.16/GPU-hr** | [CoreWeave pricing](https://www.coreweave.com/pricing) |
| **Baseten** | Managed H100 deployment; 80 GiB VRAM | **$6.50/hr** | [Baseten pricing](https://www.baseten.co/pricing/), $0.10833/min |

The selected public-rate range is **$2.50 to $6.50 per listed GPU-hour**. That is a price range across ten different products, not a claim that all ten can deliver the same instance today or that the cheapest line has the best throughput, support, networking, or deployment controls.

## What changed: three new rates, three different caveats

### Hyperstack sets the new selected low, but stopping the VM does not stop the bill

Hyperstack publishes **$2.50 per GPU-hour** for H100 PCIe and bills on-demand usage per minute. Its official flavor catalog shows a one-GPU configuration in `CANADA-1` with 28 CPU, 180 GB RAM, a 100 GB root disk, and 750 GB of ephemeral storage. The fixed CPU, RAM, root disk, and ephemeral disk are included in the GPU flavor price; public IPs and shared storage are separate.

The billing-state caveat is unusually important. Hyperstack says a stopped VM remains billed because the hardware stays reserved. **Deletion** ends VM billing. Hibernation deallocates the flavor hardware, but saved root-disk data, retained public IPs, and attached volumes can continue billing, while ephemeral-disk data is lost.

Hyperstack also lists H100 NVLink at $2.60/hour and H100 SXM at $3.20/hour. This comparison uses the explicitly cataloged one-GPU PCIe flavor; it does not present $2.50 as a provider-wide price for every H100 configuration.

### Nebius is an all-in one-GPU SXM/NVLink VM rate

Nebius publishes **$3.85 per GPU-hour** for a one-GPU H100 SXM/NVLink VM in `eu-north1`. The unified rate includes the prescribed 16 vCPUs and 200 GB of RAM. Running compute uses one-second billing with an hourly pricing unit, so partial hours are proportional.

Unlike Hyperstack's stopped state, a stopped Nebius VM no longer accrues GPU, vCPU, or RAM charges. Existing volumes remain billable. Nebius also says availability depends on region, project quota, and physical capacity, so the public price should not be read as a stock promise.

That makes Nebius a more direct one-GPU VM comparison than an abstract accelerator rate, but it is an **SXM/NVLink** product rather than the PCIe configurations selected for Hyperstack, RunPod, and Lambda.

### CoreWeave's $6.16 rate is not a self-serve one-GPU VM quote

CoreWeave's North America table publishes **$6.16 per hour** in its “Inference Single GPU” column for HGX H100. A footnote limits GPU-based pricing to CoreWeave inference-platform customers and directs buyers to an account executive. The same page lists the full eight-GPU H100 on-demand instance at **$49.24/hour**.

HostFleet uses the vendor's explicit $6.16 single-GPU inference figure; it does not derive that number by dividing the eight-GPU instance. The row belongs in a public-rate comparison, but not in a shortlist for someone who needs a self-serve, one-GPU VM today. Reserved-capacity discounts advertised by CoreWeave are also excluded because they are quote-led commitments, not the public on-demand baseline.

## What one continuously allocated H100 costs for 30 days

The following figures are estimates, not vendor quotes. Each multiplies the public hourly rate—or the vendor's unrounded per-second rate—by **720 hours** for a 30-day month. They exclude separately billed storage, public IPs, network transfer where applicable, support, taxes, commitments, extra replicas, and other infrastructure.

| Product shape | Rate used | 720-hour listed-rate estimate |
|---|---:|---:|
| Hyperstack 1x H100 PCIe VM | $2.50/hr | **$1,800** |
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,081** |
| Lambda 1x H100 PCIe VM | $3.29/hr | **$2,369** |
| Nebius 1x H100 SXM/NVLink VM | $3.85/hr | **$2,772** |
| Modal H100 container | $0.001097/sec | **$2,843** |
| Fal H100 custom deployment | $4.50/hr | **$3,240** |
| RunPod Serverless H100 tier | $4.55/hr | **$3,276** |
| Replicate private H100 deployment | $5.49/hr | **$3,953** |
| CoreWeave Inference H100 | $6.16/hr | **$4,435** |
| Baseten managed H100 deployment | $6.50/hr | **$4,680** |

Modal's total retains its published per-second input: $0.001097 × 3,600 × 720 = $2,843.42. The other figures multiply the displayed hourly rate by 720 and round to the nearest dollar.

A scale-to-zero service can cost much less when the GPU actually releases between requests. A stopped Hyperstack VM does not qualify for that assumption because the vendor says the reserved hardware keeps billing. Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to compare low utilization with always-warm allocation, but apply each provider's real shutdown and minimum-capacity behavior.

## Why the lowest advertised H100 number still needs a label

RunPod publicly shows **$1.99/hour** for an H100 PCIe in Community Cloud. The main table uses the **$2.89/hour Secure Cloud** rate because Community and Secure Cloud are distinct supply choices. The $1.99 figure is real, but presenting it as an unlabeled general floor would hide that boundary.

Fal similarly advertises H100 pricing as low as **$1.89/hour** with committed use. Its public custom-deployment list-rate column shows **$4.50/hour**, which is the comparable row above. Commitment eligibility and duration are part of the price.

Hyperstack's $2.50 line is an on-demand one-GPU PCIe VM, but it is tied to the cataloged region and flavor. Nebius's $3.85 line is an all-in one-GPU SXM/NVLink VM. CoreWeave's $6.16 line is an inference-platform price with account eligibility. Each number is accurate only with its label attached.

## Which H100 product shape should you shortlist?

### For a self-managed one-GPU endpoint

Start with **Hyperstack at $2.50/hour**, **RunPod Secure Cloud at $2.89/hour**, **Lambda at $3.29/GPU-hour**, and **Nebius at $3.85/GPU-hour**. Then filter by H100 variant, region, surrounding CPU/RAM/storage, image workflow, availability, and billing state.

RunPod's lower-rate Pod leaves the container image, inference server, authentication, health checks, logging, and lifecycle discipline to the buyer. [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the difference between a continuously allocated Pod and its Serverless workers.

### For work that can genuinely return to zero

Modal, RunPod Serverless, Replicate, and Baseten expose serverless or managed serving surfaces with different scaling controls. Their hourly equivalents are useful for normalized budgeting, but total cost depends on worker startup, model load, idle timeout, minimum replicas, and how many seconds remain allocated.

[HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better next comparison for this workload. Do not pay a serverless premium while configuring capacity to stay warm all month unless the managed controls justify it.

### For an enterprise inference platform

CoreWeave's single-GPU inference rate belongs here. It is useful public pricing evidence for an inference-platform buyer who can meet the account path. It is not evidence that a developer can click through and launch a standalone one-GPU VM at $6.16/hour.

Fal's custom deployments and the managed deployment products from Replicate and Baseten also belong in an operational comparison, not a bare-card contest. Their higher prices can be rational when the platform replaces enough deployment and serving work.

## A five-check buying sequence

1. **Fix the hardware requirement.** Confirm H100 PCIe versus SXM/NVLink, memory, multi-GPU topology, and runtime headroom. A model fitting in 80 GB does not make every H100 product equivalent. [HostFleet's VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) helps with memory sizing, not throughput prediction.
2. **Confirm the smallest deployable shape.** Ask whether the public number buys one GPU, an eight-GPU node, a worker tier, or only an inference-platform allocation.
3. **Check region, quota, and live stock.** A rate card proves the price, not that the capacity is available to your project.
4. **Test the off switch.** Document whether stop, scale-to-zero, hibernate, or delete actually ends GPU billing and what data survives.
5. **Price the missing resources.** Include storage, public IPs, network transfer, CPU/RAM, replicas, taxes, support, and commitment terms before treating the GPU line as the invoice.

## Verdict

**Hyperstack's one-GPU H100 PCIe VM at $2.50/hour is the new selected public-rate low in this ten-product check.** It is about **$1,800 for 720 allocated hours** before separately billed resources. The main operational catch is that a stopped VM remains billed; deletion or hibernation changes the lifecycle and data behavior.

**RunPod Secure Cloud at $2.89/hour** remains the next low selected self-managed rate and has the stronger existing HostFleet deployment trail. **Nebius at $3.85/hour** is the clearest newly added SXM/NVLink one-GPU alternative with CPU and RAM included. **CoreWeave at $6.16/hour** should be read as an account-gated inference-platform rate, not a self-serve VM offer.

The buyer move is to shortlist by deployable product shape first, then compare the hourly number. An unlabeled H100 price is not yet a usable infrastructure decision.

## Sources

- [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) — H100 PCIe, NVLink, and SXM per-GPU rates, per-minute statement, and transfer-fee note; checked August 13, 2026
- [Hyperstack pricebook](https://docs.hyperstack.cloud/docs/billing/pricebook/) — included VM resources, separately billed resources, and state-billing overview; checked August 13, 2026
- [Hyperstack flavor catalog](https://docs.hyperstack.cloud/docs/hardware/flavors/) — one-GPU H100 PCIe flavor, resources, and region; checked August 13, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped, hibernated, and deleted billing behavior; checked August 13, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — H100 Community, Secure Cloud, and Serverless rates; checked August 13, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — one-GPU H100 PCIe and H100 SXM rates; checked August 13, 2026
- [Nebius pricing](https://nebius.com/prices) — one-GPU H100 unified on-demand rate; checked August 13, 2026
- [Nebius compute pricing](https://docs.nebius.com/compute/resources/pricing) — billing unit and stopped-resource behavior; checked August 13, 2026
- [Nebius GPU VM types](https://docs.nebius.com/compute/virtual-machines/types) — H100 preset, region, and capacity caveat; checked August 13, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate; checked August 13, 2026
- [Fal pricing](https://fal.ai/pricing) — custom-deployment list rate and separately advertised committed-use floor; checked August 13, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 per-second and hourly rates; checked August 13, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — H100 single-GPU inference and eight-GPU on-demand rates plus eligibility footnote; checked August 13, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 per-minute and hourly managed-deployment rate; checked August 13, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, fully verified August 13, 2026
- HostFleet provider research — `/opt/hostbot/data/ai-hosting/notes/2026-08-12-coreweave-gpu-pricing.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-13-nebius-gpu-pricing.md`, and `/opt/hostbot/data/ai-hosting/notes/2026-08-13-hyperstack-gpu-pricing.md`

*Need a self-managed H100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: <a href="https://hostfleet.net/go/runpod" rel="sponsored nofollow">RunPod (+$5 credit on your first $10)</a>. Links are labeled, and source citations in this article are never affiliate links.*
