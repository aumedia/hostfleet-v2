---
title: "H100 rental price per hour in 2026: six public cloud rates checked"
description: "H100 rental price per hour: six public cloud rates, what each product shape includes, and the monthly cost of a warm H100."
pubDate: 2026-07-29
updatedDate: 2026-08-06
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed price check.** Provider pages in this guide were checked on **August 6, 2026**. These are published rates and conversions, not benchmarks, capacity guarantees, or complete invoices.

# H100 rental price per hour in 2026: six public cloud rates checked

A public H100 rate can start at **$2.89 per GPU-hour** for a RunPod Secure Cloud PCIe Pod, but that does not mean every H100 deployment costs $2.89 an hour. The six entries below span a self-managed Pod, a conventional VM, scale-to-zero workers, and managed model-serving deployments. Their hourly figures answer different operational questions.

For a raw rate-card comparison across more GPU types, start with [HostFleet's GPU pricing table](https://hostfleet.net/gpu-pricing/). This page narrows the decision to the H100: what the rate buys, which evidence is current, and what always-warm capacity costs.

## Current H100 price per hour comparison

All figures are USD per GPU-hour. Per-second and per-minute prices are converted using 3,600 seconds or 60 minutes. The scope column matters: a managed deployment is not equivalent to a VM with the same GPU.

| Provider and product shape | H100 scope | Published rate | Evidence and as-of |
|---|---|---:|---|
| **RunPod Pods** | H100 PCIe, Secure Cloud, dedicated container | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 6, 2026 |
| **Lambda Cloud** | 1x H100 PCIe VM; 80 GB VRAM, 225 GiB RAM, 1 TiB SSD shown with the instance | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), checked Aug. 6, 2026 |
| **Modal** | H100 allocated to a serverless container | **$3.9492/hr** | [Modal pricing](https://modal.com/pricing), $0.001097/sec, checked Aug. 6, 2026 |
| **RunPod Serverless** | H100 worker tier; not an exact-card reservation | **$4.55/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 6, 2026 |
| **Replicate** | Private H100 model deployment | **$5.49/hr** | [Replicate pricing](https://replicate.com/pricing), $0.001525/sec, checked Aug. 6, 2026 |
| **Baseten** | Managed H100 deployment; 80 GiB VRAM | **$6.50/hr** | [Baseten pricing](https://www.baseten.co/pricing/), $0.10833/min, checked Aug. 6, 2026 |

The comparison range is **$2.89 to $6.50 per listed accelerator-hour**, but it is not a universal market range. It deliberately excludes product shapes that are not publicly priced or cannot be compared with sufficient confidence.

### The useful low-rate caveat

RunPod also displays **$1.99/hr** for an H100 PCIe in Community Cloud. This guide uses the **$2.89/hr Secure Cloud** rate for the dedicated-Pod row because Community and Secure Cloud are different supply and operating choices. The $1.99 rate is public list pricing, but treating it as an always-available floor would hide that distinction.

Lambda's $3.29 rate is likewise specific: it is the 1x H100 PCIe instance, not a provider-wide rate for every H100 form factor. The same page lists H100 SXM and larger instance shapes at different prices.

## What a warm H100 costs for a month

The budgeting mistake is to apply a serverless label to an endpoint that never releases capacity. For one H100 held for a 30-day month, this rate-card capacity estimate multiplies each provider's listed compute rate by 720 hours. Included resources vary by product; separately billed storage, network, taxes, support, minimums, and other add-ons are excluded. It is an estimate, not a vendor quote.

| Product shape | Rate used | 720-hour listed-rate estimate |
|---|---:|---:|
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,081** |
| Lambda 1x H100 PCIe VM | $3.29/hr | **$2,369** |
| Modal H100 | $0.001097/sec | **$2,843** |
| RunPod Serverless H100 tier | $4.55/hr | **$3,276** |
| Replicate private H100 deployment | $5.49/hr | **$3,953** |
| Baseten managed H100 deployment | $6.50/hr | **$4,680** |

Modal uses its unrounded rate: $0.001097 multiplied by 3,600 multiplied by 720 equals $2,843.42. The other rows use the displayed hourly rate times 720 and round to the nearest dollar. A workload that genuinely returns to zero needs an estimate based on billable accelerator-seconds instead.

## What each price buys

### RunPod Pods: lowest checked dedicated rate, more operations to own

At $2.89/hr for an H100 PCIe in Secure Cloud, RunPod is the lowest directly checked rate in this table for a dedicated self-managed shape. A Pod fits a team that can own its image, inference server, authentication, health checks, logging, and stop discipline. The GPU bill continues while the Pod runs.

Read [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) before assuming that Pods and Serverless have interchangeable cost behavior. For the deployment tradeoffs beyond the rate card, see [RunPod for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/).

### Lambda: a conventional VM with an explicit instance bundle

Lambda attaches its $3.29/GPU-hour H100 PCIe rate to a published 1x VM configuration rather than selling an abstract accelerator alone. That makes it easier to evaluate when the workload needs a normal machine and persistent surrounding resources. CPU, RAM, storage, region, and available capacity still belong in the decision.

### Modal and RunPod Serverless: lower total cost only when capacity is released

Modal bills the H100 at $0.001097 per second, or $3.9492 for a fully allocated hour. RunPod Serverless lists an H100 worker tier at $4.55/hr in the dated August 3 public-source check. Neither number predicts the bill by itself: the relevant question is whether the job can scale down between bursts without a cold-start or latency problem.

For the product-shape differences, use [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). A permanently warm Modal container still produces roughly a $2,843 listed-rate month under the assumptions above.

### Replicate and Baseten: higher rates buy a managed serving surface

Replicate's private H100 rate is $0.001525 per second, or $5.49/hr. Baseten's public page shows an 80 GiB H100 at $0.10833 per minute, or $6.4998/hr rounded to $6.50. These are managed deployment surfaces, not bare VMs. Compare them against the operational work they remove, not solely against the lowest dedicated rate.

That can be rational when deployment controls and managed serving are the bottleneck. It is not the budget choice for an idle endpoint. For the billing and warm-capacity tradeoff, read [Baseten pricing explained](https://hostfleet.net/baseten-pricing-guide-2026/).

## Verdict

For a self-managed H100 that stays allocated, the currently checked rate to beat here is **RunPod Secure Cloud H100 PCIe at $2.89/hr**. **Lambda's $3.29/GPU-hour 1x H100 PCIe VM** is the clearest conventional-VM alternative. For an endpoint held warm all month, the listed-rate range is roughly **$2,081 to $4,680** across the six included product shapes; included resources and separately billed add-ons vary by provider.

That is a capacity budget, not a performance ranking. Before committing, re-check the precise H100 variant, cloud tier, instance shape, minimum-capacity setting, region, and availability.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — H100 PCIe Community and Secure Cloud rates checked Aug. 6, 2026; Serverless table checked Aug. 6, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x H100 PCIe rate and instance configuration, checked Aug. 6, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate, checked Aug. 6, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 per-second and hourly rate, checked Aug. 6, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 80 GiB per-minute rate, checked Aug. 6, 2026

*Need a self-managed H100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
