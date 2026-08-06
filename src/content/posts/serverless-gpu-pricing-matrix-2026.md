---
title: "Serverless GPU pricing in 2026: August 6 rates and deployment matrix"
description: "An August 6, 2026 source-backed GPU deployment price matrix, separating Pods, serverless workers, managed inference, and GPU VMs instead of treating unlike rates as one market."
pubDate: 2026-04-21
updatedDate: 2026-08-06
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check.** All provider rates in this guide were checked against public vendor pricing pages on **August 6, 2026**. The table is a rate-card comparison, not a capacity, throughput, latency, or availability benchmark.

# Serverless GPU pricing in 2026: August 6 rates and deployment matrix

The lowest listed GPU rate is useful only after you identify the product wrapped around it. A RunPod Pod is continuously allocated infrastructure. RunPod Serverless and Modal bill workers that can scale down. Fal, Baseten, and Replicate sell managed deployment surfaces. Lambda sells full VM instance shapes.

That distinction is why this table does not name an overall winner. It shows what is publicly priced today and what each price shape is for. For the machine-readable reference used to build the matrix, open [HostFleet's GPU pricing table](https://hostfleet.net/gpu-pricing/).

> **Verified date:** August 6, 2026<br>
> **Billing basis:** published USD list rates, normalized to GPU-hours where vendors publish per-second or per-minute rates. Included resources and separately billed extras vary by product.

## August 6 GPU deployment price matrix

All figures are rounded to cents per GPU-hour. A dash means this source check has no matching public product row; it does not mean the provider lacks that GPU. Precise per-second or per-minute inputs are listed below the table.

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

Modal publishes per-second rates: T4 **$0.000164/sec**, L4 **$0.000222/sec**, A10 **$0.000306/sec**, A100 80 GB **$0.000694/sec**, H100 **$0.001097/sec**, B200 **$0.001736/sec**, and B300 **$0.001972/sec**. The table multiplies those rates by 3,600.

Baseten publishes per-minute deployment rates: T4 **$0.01052/min**, L4 **$0.01414/min**, A10G **$0.02012/min**, A100 80 GB **$0.06667/min**, H100 **$0.10833/min**, and B200 **$0.16633/min**. The table multiplies those rates by 60.

Replicate publishes private-deployment hardware at **$0.000225/sec** for T4, **$0.000975/sec** for L40S, **$0.001400/sec** for A100 80 GB, and **$0.001525/sec** for H100. Lambda's entries are published per-GPU-hour instance prices; the surrounding vCPU, RAM, and local-storage bundle depends on the exact instance.

## What changed in this full check

Fal is back in the current matrix because its public price table was accessible on this check. Its H100 custom-deployment list price is now **$4.50/hr**, up from the prior tracked **$3.99/hr**. The public page separately advertises lower committed-use figures; this guide uses its list price so it does not mix commitment tiers with on-demand-style rates.

RunPod's displayed RTX A6000 comparator is now **$0.53/hr**, while the combined 48 GB row keeps the cheaper public A40 baseline at **$0.44/hr**. That row is not a claim that an A40 and RTX A6000 are interchangeable; it is a compact view of the lowest selected 48 GB Pod rate.

All other tracked rates in this matrix matched the previous verified dataset. That is evidence about published list prices only. It does not establish capacity, region availability, cold-start time, queue delay, support quality, or performance.

## Pick the product shape before reading the price

### Pods and VMs fit capacity you will actually keep allocated

A RunPod Pod and a Lambda VM keep charging while the instance stays allocated. Their prices can look low next to managed deployment products because the operator owns more work: image choice, server process, authentication, health checks, logs, storage, and shutdown discipline.

For the exact product split and selected Pod rates, read [RunPod's Pods versus Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/). The [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) separate card variants and capacity classes before applying a monthly estimate.

### Scale-to-zero only changes the bill when work really stops

RunPod Serverless and Modal can make a bursty workload cheaper than a continuously allocated GPU—but only if workers are actually released between bursts and the cold-start/queue behavior fits the product. A 720-hour calculation is the wrong model for a job that spends most of the month at zero.

Modal's clean per-second pricing is useful for that workload shape. Its $3.95 H100 hourly equivalent is not an instruction to leave a container warm for a month; it is the rate you use to estimate billable GPU-seconds. See the provider-specific caveats in [Modal's pricing guide](https://hostfleet.net/modal-pricing-guide-2026/).

### Managed deployment rates are not bare-card rental quotes

Fal, Baseten, and Replicate price managed deployment surfaces. Their rate cards may include controls or operating assumptions that a raw Pod does not. Treat the higher number as the price of a different product, then check minimum replicas, scaling controls, billing during startup, and any separately billed services.

For those details, use [Fal for inference APIs and jobs](https://hostfleet.net/fal-for-ai-inference-apis-and-jobs/), [Baseten's pricing guide](https://hostfleet.net/baseten-pricing-guide-2026/), and [Replicate's pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/).

## A transparent warm-H100 estimate

This is an estimate, not a vendor quote. It assumes one named H100 product remains allocated for **720 hours** (30 days):

```text
listed-rate capacity estimate = published hourly equivalent × 720 hours
```

| H100 product shape | Rate used | 30-day listed-rate estimate |
|---|---:|---:|
| RunPod Secure Cloud PCIe Pod | $2.89/hr | about $2,081 |
| Lambda 1x H100 PCIe VM | $3.29/GPU-hr | about $2,369 |
| Modal H100 container | $0.001097/sec | about $2,843 |
| Fal H100 custom deployment | $4.50/hr | about $3,240 |
| Replicate private H100 deployment | $5.49/hr | about $3,953 |
| Baseten H100 deployment | $0.10833/min | about $4,680 |

These figures multiply each provider's listed compute rate by 720. They include what that named product bundles, and exclude separately billed storage, networking, taxes, support, minimums, additional replicas, and workload-specific scaling behavior. They are useful for capacity planning; they do not predict the cost of a job that really returns to zero.

## Verdict

Use the matrix to narrow a deployment shape, not to declare a universal cheapest GPU. For continuously allocated self-managed capacity, the selected RunPod Pod rates are the lower public starting points in several GPU classes, with corresponding operational responsibility. For bursty jobs, estimate billable seconds on Modal or a Serverless surface. For managed inference, compare Fal, Baseten, and Replicate after defining warm-replica and control requirements.

Re-check the exact GPU variant, region, capacity, commitment tier, and add-ons before purchase. A public rate table is a starting point—not an invoice or a production-capacity promise.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Pods and Serverless public rate tables; accessed August 6, 2026
- [Modal pricing](https://modal.com/pricing) — published GPU per-second rates; accessed August 6, 2026
- [Fal pricing](https://fal.ai/pricing) — published custom-deployment list and committed-use rates; accessed August 6, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — published deployment per-minute rates; accessed August 6, 2026
- [Replicate pricing](https://replicate.com/pricing) — published private-deployment hardware per-second rates; accessed August 6, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — published VM configuration and per-GPU-hour rates; accessed August 6, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 6, 2026
- HostFleet full-verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-06-gpu-pricing-full-verification.md`

*Need a self-managed GPU endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
