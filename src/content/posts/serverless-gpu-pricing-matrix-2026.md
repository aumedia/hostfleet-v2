---
title: "Serverless GPU pricing in 2026: August 10 rates and deployment matrix"
description: "An August 10, 2026 source-backed GPU deployment price matrix that separates Pods, serverless workers, managed inference, and GPU VMs instead of treating unlike rates as one market."
pubDate: 2026-04-21
updatedDate: 2026-08-10
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check.** All provider rates and plan limits in this guide were checked against public vendor pricing pages on **August 10, 2026**. This is a rate-card comparison, not a capacity, throughput, latency, queue-time, or availability benchmark.

# Serverless GPU pricing in 2026: August 10 rates and deployment matrix

A GPU price only becomes useful after you identify the product around it. A RunPod Pod and a Lambda VM are allocated infrastructure that keeps billing while it is on. RunPod Serverless and Modal bill workers that can scale down. Fal, Baseten, and Replicate sell managed deployment surfaces. Those are different operational choices, so this table does not pretend they have one universal winner.

For the machine-readable reference behind the comparison, see [HostFleet's GPU pricing table](https://hostfleet.net/gpu-pricing/).

> **Verified date:** August 10, 2026<br>
> **Billing basis:** published USD list rates, normalized to GPU-hours where a vendor publishes per-second or per-minute pricing. Included resources and separately billed extras vary by product.

## August 10 GPU deployment price matrix

All figures are rounded to cents per GPU-hour. A dash means this source check has no matching public product row; it does not mean the provider does not offer that GPU. The official rate sources and precise inputs are listed below.

| GPU / VRAM | RunPod Pod | RunPod Serverless | Modal | Fal custom deployment | Baseten deployment | Replicate private deployment | Lambda VM |
|---|---:|---:|---:|---:|---:|---:|---:|
| T4 / 16 GB | — | — | $0.59 | — | $0.63 | $0.81 | — |
| L4 / 24 GB | $0.39 | $0.69 | $0.80 | — | $0.85 | — | — |
| A10 / A10G / 24 GB | — | — | $1.10 | — | $1.21 | — | $1.29 |
| RTX 4090 / 24 GB | $0.69 | $1.10 | — | — | — | — | — |
| RTX 5090 / 32 GB | $0.99 | $1.58 | — | — | — | — | — |
| A40 / RTX A6000 / 48 GB | $0.44 | $1.22 | — | — | — | — | $1.09 |
| L40S / 48 GB | $0.99 | $1.75 | $1.95 | — | — | $3.51 | — |
| RTX PRO 6000 / 96 GB | $1.99 | $3.49 | $3.03 | $2.99 | — | — | — |
| A100 / 40 GB | — | — | $2.10 | — | — | — | $1.99 |
| A100 / 80 GB | $1.39 | $2.72 | $2.50 | — | $4.00 | $5.04 | — |
| H100 / 80 GB | $2.89 | $4.55 | $3.95 | $4.50 | $6.50 | $5.49 | $3.29 |
| H200 / 141 GB | $4.39 | $5.93 | $4.54 | $4.50 | — | — | — |
| B200 / 180 GB | $5.89 | $8.64 | $6.25 | $6.25 | $9.98 | — | $6.99 |
| B300 / 288 GB | $7.39 | $9.98 | $7.10 | $8.50 | — | — | — |

### How the conversions work

[Modal's public rate card](https://modal.com/pricing) lists per-second GPU rates. On August 10, the tracked inputs were T4 **$0.000164/sec**, L4 **$0.000222/sec**, A10 **$0.000306/sec**, A100 80 GB **$0.000694/sec**, H100 **$0.001097/sec**, B200 **$0.001736/sec**, and B300 **$0.001972/sec**. The table multiplies each by 3,600.

[Baseten's public rate card](https://www.baseten.co/pricing/) lists per-minute dedicated-deployment rates: T4 **$0.01052/min**, L4 **$0.01414/min**, A10G **$0.02012/min**, A100 80 GB **$0.06667/min**, H100 **$0.10833/min**, and B200 **$0.16633/min** as of August 10. The table multiplies those figures by 60.

[Replicate's public pricing](https://replicate.com/pricing) lists private-deployment hardware at **$0.000225/sec** for T4, **$0.000975/sec** for L40S, **$0.001400/sec** for A100 80 GB, and **$0.001525/sec** for H100 as of August 10. [Lambda's instance page](https://lambda.ai/instances) lists its selected configuration prices per GPU-hour; the surrounding vCPU, RAM, and local-storage bundle depends on the exact VM.

## What changed in the August 10 check

No displayed GPU list rate changed in this full check. That is still useful information: it means the matrix is current rather than silently carrying an old rate card.

The one material plan-limit update was at Modal. Its Team plan now publicly lists **5,000 containers**, replacing the prior tracked 1,000-container limit. This is a plan limit, not a GPU price or a promise that 5,000 workers can start at once. Modal's published Team plan also has 50 GPU concurrency; readers should validate their exact account limits and workload behavior before designing around either number.

Fal's custom-deployment list rates remain separate from the lower committed-use figures on its pricing page. The matrix keeps the public list rate so a commitment floor is not presented as a comparable on-demand-style rate.

## Pick the product shape before reading the price

### Pods and VMs fit capacity you will actually keep allocated

A RunPod Pod and a Lambda VM keep charging while the instance remains allocated. Their rates can look low next to managed deployment products because the operator takes on image selection, server process management, authentication, health checks, observability, storage, and shutdown discipline.

For the split between those RunPod products, read [RunPod's Pods versus Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/). The [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) keep card variants and capacity classes distinct before applying a monthly estimate.

### Scale-to-zero changes the bill only when work really stops

RunPod Serverless and Modal can make a bursty workload cheaper than continuously allocated capacity—but only when workers actually release between requests and their cold-start or queue behavior fits the service. A 720-hour calculation is the wrong model for a job that spends most of the month at zero.

Modal's per-second pricing is useful for estimating billable GPU-seconds. Its **$3.95/hour** H100 equivalent as of August 10 is not a recommendation to leave a container warm for a month. For product-specific tradeoffs, see [Modal's pricing guide](https://hostfleet.net/modal-pricing-guide-2026/).

To turn a published rate into a budget decision, use [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to compare the same H100 product at 1% allocation, 10% allocation, and a continuously warm 30-day deployment. The lower-allocation scenarios only apply when the product and workload can actually release capacity between jobs.

### Managed deployment rates are not bare-card rental quotes

Fal, Baseten, and Replicate price managed deployment surfaces rather than raw GPU rental. A higher public rate may include controls or operating assumptions a Pod does not. Compare their minimum replicas, scaling controls, billing during startup, and separately billed services before treating two hourly equivalents as substitutes.

Use [Fal for inference APIs and jobs](https://hostfleet.net/fal-for-ai-inference-apis-and-jobs/), [Baseten's pricing guide](https://hostfleet.net/baseten-pricing-guide-2026/), and [Replicate's pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/) for those caveats.

## A transparent warm-H100 estimate

This is an estimate, not a vendor quote. It assumes one named H100 product remains allocated for **720 hours** (30 days):

```text
listed-rate capacity estimate = published hourly equivalent × 720 hours
```

| H100 product shape | Rate used (verified August 10) | 30-day listed-rate estimate |
|---|---:|---:|
| RunPod Secure Cloud PCIe Pod | $2.89/hr | about $2,081 |
| Lambda 1x H100 PCIe VM | $3.29/GPU-hr | about $2,369 |
| Modal H100 container | $0.001097/sec | about $2,843 |
| Fal H100 custom deployment | $4.50/hr | about $3,240 |
| Replicate private H100 deployment | $5.49/hr | about $3,953 |
| Baseten H100 deployment | $0.10833/min | about $4,680 |

These estimates multiply the source-listed compute rate by 720. They include whatever the named product bundles, and exclude separately billed storage, networking, taxes, support, minimums, additional replicas, and workload-specific scaling behavior. They help plan continuously allocated capacity; they do not predict the cost of a job that truly returns to zero.

## Verdict

Use this matrix to narrow a deployment shape, not to claim a universal cheapest GPU. For continuously allocated, self-managed capacity, the selected RunPod Pod rates are lower public starting points in several GPU classes, with corresponding operational responsibility. For bursty jobs, estimate billable GPU-seconds on Modal or a Serverless surface. For managed inference, compare Fal, Baseten, and Replicate after defining warm-replica and control requirements.

Re-check the exact GPU variant, region, capacity, commitment tier, and add-ons before purchase. A public rate table is a starting point—not an invoice or a production-capacity promise.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Pods and Serverless public rate tables; accessed August 10, 2026
- [Modal pricing](https://modal.com/pricing) — GPU per-second rates and public container/concurrency plan limits; accessed August 10, 2026
- [Fal pricing](https://fal.ai/pricing) — custom-deployment list and committed-use rate tables; accessed August 10, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — managed deployment per-minute GPU rates; accessed August 10, 2026
- [Replicate pricing](https://replicate.com/pricing) — private-deployment hardware per-second rates; accessed August 10, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — VM configuration and per-GPU-hour rates; accessed August 10, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 10, 2026
- HostFleet full-verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-10-gpu-pricing-full-verification.md`

*Need a self-managed GPU endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
