---
title: "Serverless GPU pricing 2026: August rate matrix and deployment caveats"
description: "An August 2026 GPU rate matrix for RunPod, Modal, Baseten, and Replicate—plus the product-shape and price-transparency caveats that change the decision."
pubDate: 2026-04-21
updatedDate: 2026-08-01
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed rate guide: listed prices and product descriptions come from public provider pages checked on August 1, 2026. The monthly figures are estimates, not quotes.*

**Rates checked:** August 1, 2026
**Billing basis:** published USD listed-product rates; product scope, included resources, and separately billed add-ons vary by provider

# Serverless GPU pricing 2026: August rate matrix and deployment caveats

A GPU price table is only useful when it says what is actually being bought. A **RunPod Pod** is an allocated container that keeps billing while it runs. **Modal** is a per-second container platform. **Baseten** and **Replicate** publish managed deployment rates. Putting the hourly equivalents next to each other is helpful for budgeting; treating them as identical infrastructure is not.

This refresh replaces the April snapshot with a public-rate check completed on **August 1, 2026**. The table is a selected live-data snapshot from HostFleet's `gpu-pricing.json`, rechecked against the linked provider pages for this draft. It is not a benchmark, capacity report, or inventory guarantee. For the site-wide table, use [HostFleet's live GPU pricing page](https://hostfleet.net/gpu-pricing/).

## The August public-rate matrix

All figures are USD per GPU-hour. A dash means the provider does not publish that matching product row on its public rate card; it does **not** mean the GPU is unavailable or free. Modal and Replicate list per-second prices, while Baseten lists per-minute prices; the displayed hourly equivalents preserve the provider's unrounded rate.

| GPU capacity point | RunPod Secure Cloud Pod | Modal serverless container | Baseten managed deployment | Replicate private deployment |
|---|---:|---:|---:|---:|
| T4 — 16 GB | — | $0.5904/hr | $0.6312/hr | $0.81/hr |
| L4 — 24 GB | $0.39/hr | $0.7992/hr | $0.8484/hr | — |
| A100 — 80 GB | $1.39/hr | $2.4984/hr | $4.0002/hr | $5.04/hr |
| H100 — 80 GB | $2.89/hr | $3.9492/hr | $6.4998/hr | $5.49/hr |
| B200 — 180 GB | $5.89/hr | $6.2496/hr | $9.9798/hr | — |

**Source and scope notes, checked August 1, 2026:**

- **RunPod:** the table uses exact Secure Cloud Pod entries from [RunPod pricing](https://www.runpod.io/pricing), not Community Cloud and not a Serverless capacity pool. The public page lists A100 PCIe at $1.39/hr, H100 PCIe at $2.89/hr, and B200 at $5.89/hr.
- **Modal:** [Modal pricing](https://modal.com/pricing) lists $0.000164/sec for T4, $0.000222/sec for L4, $0.000694/sec for A100 80 GB, $0.001097/sec for H100, and $0.001736/sec for B200. Each displayed hourly equivalent is the published per-second rate × 3,600.
- **Baseten:** [Baseten pricing](https://www.baseten.co/pricing/) publicly lists deployment rates of $0.01052/min for 16 GiB, $0.01414/min for 24 GiB, $0.06667/min for 80 GiB, $0.10833/min for 80 GiB H100, and $0.16633/min for 180 GiB. Each displayed hourly equivalent is the listed rate × 60. The page's plans and managed-serving features do not make this a bare-VM comparison.
- **Replicate:** [Replicate pricing](https://replicate.com/pricing) lists private-deployment hardware at $0.000225/sec for T4, $0.001400/sec for A100 80 GB, and $0.001525/sec for H100. Each displayed hourly equivalent is the listed rate × 3,600.

### Fal is intentionally absent from the price ranking

Fal belongs in a managed-inference decision, but its official [pricing page](https://fal.ai/pricing) returned **HTTP 429** during this August 1 source check. That is a source-access limitation, not evidence that Fal's rate changed. It is still enough reason not to present a fresh Fal number alongside providers whose public rate cards were readable today. A missing verifiable rate is better than a precise-looking stale one.

## The lower number is not automatically the lower deployment cost

The RunPod rows are always-on Pod rates. They are useful when you need a long-running container, notebook, worker, or endpoint and can operate the image, process, storage, observability, and shutdown policy yourself. If the Pod remains running, the GPU rate remains billable. [RunPod's Pods vs Serverless guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains why that is a different decision from an endpoint that can return to zero.

Modal's rate is a per-second compute price for a containerized workload. It is a strong fit for bursty Python jobs or an endpoint that can tolerate scaling behavior. It is not automatically cheap for a permanently warm service: holding an H100 for the full month consumes the same kind of continuous GPU time as any other warm allocation. See [Modal pricing explained](https://hostfleet.net/modal-pricing-guide-2026/) for the surrounding billing model and prototype credit.

Baseten and Replicate are managed deployment surfaces, not simple GPU rentals. Their higher hourly equivalents may be justified if serving controls, deployment workflow, autoscaling, and support remove work a team would otherwise own. They should be compared against the operational cost of running an endpoint, not only against a Pod's line item. For Replicate's product split, read [Replicate pricing explained](https://hostfleet.net/replicate-pricing-guide-2026/).

## Estimate: what one warm 80 GB GPU can mean for a month

These are **listed-product-rate estimates**, not provider quotes. The assumption is one selected product shape allocated for **720 hours** (30 days). They include whatever the provider bundles in that product but exclude taxes, separately billed storage, networking, support, extra replicas, and workload-specific scaling effects.

```text
monthly listed-product-rate estimate = published hourly equivalent × 720 hours
```

| Product shape | A100 80 GB, 720-hour estimate | H100 80 GB, 720-hour estimate |
|---|---:|---:|
| RunPod Secure Cloud Pod | about $1,001 | about $2,081 |
| Modal container | about $1,799 | about $2,843 |
| Baseten managed deployment | about $2,880 | about $4,680 |
| Replicate private deployment | about $3,629 | about $3,953 |

The estimates explain the cost of holding capacity; they do not predict a workload that truly scales down. For example, Modal's A100 number is `$0.000694 × 3,600 × 720 = $1,798.85`, while its H100 number is `$0.001097 × 3,600 × 720 = $2,843.42`. A bursty job should instead be budgeted from expected billable GPU-seconds.

## Choose the capacity class before comparing providers

A $1.39/hour A100 is not a substitute for an H100 just because both have 80 GB. Likewise, a 40 GB A100 is a different capacity class from the 80 GB entries in this matrix. The first check is VRAM, model format, context length, and expected concurrency; only then does rate comparison become useful. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) shows why a raw-weight estimate alone is not a deployment-size recommendation.

Use this order of operations:

1. **Choose the smallest VRAM tier that leaves operating headroom** for weights, runtime, KV cache, and the concurrency you intend to serve.
2. **Choose the operating model.** A job that sits idle most of the month may benefit from scale-to-zero; a deliberate always-on endpoint needs warm-capacity math.
3. **Compare the product shapes within that tier.** A self-managed Pod, a serverless container, and a managed deployment replace different amounts of operator work.
4. **Check capacity, region, and add-ons before committing.** A public list price is not an inventory reservation or a final invoice.

For a deeper A100 or H100 buying decision, use the dedicated [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) or [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/).

## Verdict

For a continuously allocated, self-managed GPU endpoint, **RunPod Secure Cloud Pods** are the lowest listed rows in this selected matrix: $1.39/hour for an 80 GB A100 and $2.89/hour for an H100. That is a useful starting point, not a universal winner; it buys a Pod and the operations responsibility that comes with one.

For a workload that can genuinely return to zero, model billable seconds on **Modal** rather than assuming a 720-hour total. For a team buying a managed serving surface, compare **Baseten** and **Replicate** after defining minimum replicas, scaling behavior, and support needs. And when a provider's public pricing page cannot be checked—as with Fal on this pass—leave the row unranked until the evidence is available.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pod rates and product distinctions; checked August 1, 2026
- [Modal pricing](https://modal.com/pricing) — GPU per-second rates; checked August 1, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — managed deployment per-minute rates and plan posture; checked August 1, 2026
- [Replicate pricing](https://replicate.com/pricing) — private-deployment per-second rates; checked August 1, 2026
- [Fal pricing](https://fal.ai/pricing) — checked August 1, 2026; returned HTTP 429 and is not used for a price claim
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`; existing selected matrix source, refreshed July 23, 2026 and rechecked against readable provider rate cards for this August 1 draft

*Need a self-managed GPU endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
