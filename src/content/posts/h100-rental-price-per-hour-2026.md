---
title: "H100 rental price per hour in 2026: seven public cloud rates checked"
description: "H100 rental price per hour: seven public cloud rates, the product shape behind each rate, and listed always-warm monthly costs."
pubDate: 2026-07-29
updatedDate: 2026-08-08
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed price check.** The provider pages and the HostFleet rate dataset used here were rechecked on **August 8, 2026**. These are published list prices and arithmetic conversions—not performance benchmarks, capacity guarantees, or complete invoices.

# H100 rental price per hour in 2026: seven public cloud rates checked

A public H100 price can start at **$2.89 per GPU-hour** for a RunPod Secure Cloud PCIe Pod. That is not a universal answer to “what does an H100 cost?” The seven entries below cover a self-managed Pod, a conventional VM, serverless containers, and managed deployment surfaces. The hardware label is similar; the operational product is not.

This refresh adds Fal’s publicly listed H100 custom-deployment rate and keeps its lower committed-use figure out of the on-demand comparison. For the machine-readable cross-GPU reference, use [HostFleet’s live GPU pricing table](https://hostfleet.net/gpu-pricing/).

## Current H100 price-per-hour comparison

All figures are USD per GPU-hour. Per-second and per-minute prices are converted using 3,600 seconds or 60 minutes. A rate row is not an availability promise, and an H100 PCIe, SXM, or managed instance should not be treated as interchangeable merely because each has 80 GB of VRAM.

| Provider and product shape | H100 scope | Published list rate | Evidence, rechecked Aug. 8, 2026 |
|---|---|---:|---|
| **RunPod Pods** | H100 PCIe, Secure Cloud, dedicated container | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing) |
| **Lambda Cloud** | 1x H100 PCIe VM; 80 GB VRAM, 225 GiB RAM, 1 TiB SSD | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances) |
| **Modal** | H100 allocated to a serverless container | **$3.9492/hr** | [Modal pricing](https://modal.com/pricing), $0.001097/sec |
| **Fal** | H100 80 GB custom deployment | **$4.50/hr** | [Fal pricing](https://fal.ai/pricing) |
| **RunPod Serverless** | H100 worker tier; not an exact-card reservation | **$4.55/hr** | [RunPod pricing](https://www.runpod.io/pricing) |
| **Replicate** | Private H100 model deployment | **$5.49/hr** | [Replicate pricing](https://replicate.com/pricing), $0.001525/sec |
| **Baseten** | Managed H100 deployment; 80 GiB VRAM | **$6.50/hr** | [Baseten pricing](https://www.baseten.co/pricing/), $0.10833/min |

The included range is **$2.89 to $6.50 per listed accelerator-hour**. It is a selected public-rate comparison, not a claim that all H100 supply is available at those prices, nor a claim that all seven products deliver the same latency, support, networking, or deployment controls.

### Why the lowest advertised H100 figure is not the comparison baseline

RunPod also publicly displays **$1.99/hr** for an H100 PCIe in Community Cloud. This table uses the **$2.89/hr Secure Cloud** rate for the self-managed Pod row because Community and Secure Cloud are distinct supply choices. The $1.99 figure is a real public rate; calling it an always-available floor would hide that distinction.

Fal’s page similarly advertises an H100 as low as **$1.89/hr** with committed use. Its public custom-deployment list-rate column shows **$4.50/hr**, which is the rate used here. A committed-use floor is not substituted into an on-demand rate-card comparison because its eligibility and commitment differ.

Lambda’s $3.29 figure is specifically its 1x H100 PCIe VM. The same source lists H100 SXM at $4.29 per GPU-hour and shows different instance configurations. It is therefore a clear VM price point, not a provider-wide H100 average.

## What a continuously warm H100 costs for 30 days

For one H100 held for a 30-day month, this listed-rate estimate multiplies each published compute rate by **720 hours**. It excludes separately billed storage, network transfer, taxes, support, minimums, and any commitment discounts. Included resources also differ by product. This is budgeting arithmetic, not a vendor quote.

| Product shape | Rate used | 720-hour listed-rate estimate |
|---|---:|---:|
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,081** |
| Lambda 1x H100 PCIe VM | $3.29/hr | **$2,369** |
| Modal H100 container | $0.001097/sec | **$2,843** |
| Fal H100 custom deployment | $4.50/hr | **$3,240** |
| RunPod Serverless H100 tier | $4.55/hr | **$3,276** |
| Replicate private H100 deployment | $5.49/hr | **$3,953** |
| Baseten managed H100 deployment | $6.50/hr | **$4,680** |

Modal’s total uses its unrounded published rate: $0.001097 × 3,600 × 720 = $2,843.42. The remaining rows multiply the displayed hourly figure by 720 and round to the nearest dollar. A workload that actually releases capacity between bursts needs a billable-seconds estimate instead; an “autoscaling” label does not make a permanently warm endpoint free.

## What the listed price buys—and what it does not

### RunPod Pods: lowest checked dedicated rate, with infrastructure work left to you

At $2.89/hr for Secure Cloud H100 PCIe, RunPod is the lowest directly checked dedicated self-managed option here. It fits a team that will own its image, inference server, authentication, health checks, logs, and stop discipline. The GPU charge continues while the Pod runs.

[RunPod’s pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains why Pods and Serverless do not have interchangeable cost behavior. For the product and operations tradeoffs beyond the rate card, see [RunPod for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/).

### Lambda: a conventional VM with a published surrounding-resource bundle

Lambda attaches the $3.29/GPU-hour 1x H100 PCIe price to a specific VM configuration rather than selling an abstract accelerator. That is useful when the workload needs a normal machine and explicitly listed RAM and local SSD alongside the GPU. It does not establish current capacity or a particular region’s availability.

### Modal, Fal, and RunPod Serverless: cost only falls when capacity is released

Modal bills an allocated H100 at $0.001097 per second, or $3.9492 for a full hour. Fal lists $4.50/hr for an H100 custom deployment. RunPod lists an H100 Serverless worker tier at $4.55/hr. These are not interchangeable service contracts, but they share one budgeting rule: if capacity remains warm for a whole month, rate-card multiplication is the relevant first estimate.

For the broader product-shape comparison, use [HostFleet’s serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). It is the right companion before assuming that a scale-to-zero workflow will meet a latency target.

### Replicate and Baseten: managed serving surfaces at higher listed rates

Replicate lists private H100 deployment hardware at $0.001525 per second, or $5.49/hr. Baseten lists an H100 at $0.10833 per minute, or $6.4998/hr rounded to $6.50. These are managed deployment surfaces rather than bare VMs. Their higher listed rates should be compared with the operational work they remove—not only with the lowest self-managed GPU rate.

For Baseten’s billing terminology and always-warm estimates, see [Baseten pricing explained](https://hostfleet.net/baseten-pricing-guide-2026/).

## Verdict

For a self-managed H100 that stays allocated, the checked rate to beat is **RunPod Secure Cloud H100 PCIe at $2.89/hr**. **Lambda’s 1x H100 PCIe VM at $3.29/GPU-hour** is the clearest conventional-VM alternative. For a single H100 held warm for 30 days, the selected public-rate range is about **$2,081 to $4,680** before excluded charges, with Fal’s **$3,240** list-rate estimate now visible in the middle of the comparison.

That is a capacity budget, not a performance ranking. Before committing, re-check the exact H100 variant, cloud tier, minimum-capacity setting, instance shape, region, and current availability.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — H100 PCIe Community and Secure Cloud rates; Serverless H100 tier; rechecked August 8, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x H100 PCIe price and displayed configuration; rechecked August 8, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate; rechecked August 8, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment list rate and separately displayed committed-use floor; rechecked August 8, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 per-second and hourly rate; rechecked August 8, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 per-minute rate; rechecked August 8, 2026
- HostFleet GPU-price verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-06-gpu-pricing-full-verification.md`
- HostFleet GPU-pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 6, 2026

*Need a self-managed H100 endpoint? Using our affiliate link supports HostFleet’s testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
