---
title: "A100 rental price per hour in 2026: 40 GB and 80 GB cloud rates"
description: "A100 rental price per hour: compare current 40 GB and 80 GB cloud rates, product scopes, and warm-capacity costs before you rent."
pubDate: 2026-07-31
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed price guide: every listed rate comes from a public provider page checked on July 31, 2026. It is not a benchmark, availability report, or inventory guarantee.*

**Rates checked:** July 31, 2026  
**Billing basis:** published USD listed-product rates; included resources and separately billed add-ons vary by provider

# A100 rental price per hour in 2026: 40 GB and 80 GB cloud rates

An A100 rental currently starts at **$1.39 per GPU-hour for an 80 GB RunPod Secure Cloud Pod** in this comparison. That is not a universal cheapest-A100 answer, because the same name covers two memory sizes and several products: a conventional GPU VM, an always-on Pod, a serverless worker, or a managed deployment.

The important split is **40 GB versus 80 GB**. Modal and Lambda expose a 40 GB A100 rate; the RunPod, Baseten, and Replicate rows below are 80 GB. An 80 GB card has twice the VRAM, so putting it in a single price ranking with a 40 GB card would hide the thing a buyer is actually paying for.

For the wider market snapshot, use [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/). If the decision is really between a continuously allocated Pod and workers that can return to zero, read [RunPod Pods vs Serverless pricing](https://hostfleet.net/runpod-pricing-guide-2026/) first.

## A100 price per hour: current public rates

All values below are published rates converted to USD per GPU-hour where necessary. The scope column deliberately names the product; no row promises capacity in a chosen region.

| Provider and product shape | A100 configuration in this comparison | Published rate | Source and as-of date |
|---|---|---:|---|
| **RunPod Pods** | A100 PCIe, 80 GB, Secure Cloud, dedicated Pod | **$1.39/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked July 31, 2026 |
| **Lambda Cloud** | 1x A100 PCIe, 40 GB VM | **$1.99/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), checked July 31, 2026 |
| **Modal** | A100, 40 GB, serverless container; $0.000583/sec | **$2.0988/hr** | [Modal pricing](https://modal.com/pricing), checked July 31, 2026 |
| **Modal** | A100, 80 GB, serverless container; $0.000694/sec | **$2.4984/hr** | [Modal pricing](https://modal.com/pricing), checked July 31, 2026 |
| **RunPod Serverless** | A100, 80 GB worker tier | **$2.72/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked July 31, 2026 |
| **Baseten** | A100, 80 GiB, managed dedicated deployment; $0.06667/min | **$4.00/hr** | [Baseten pricing](https://www.baseten.co/pricing/), checked July 31, 2026 |
| **Replicate** | A100, 80 GB, private model deployment; $0.001400/sec | **$5.04/hr** | [Replicate pricing](https://replicate.com/pricing), checked July 31, 2026 |

**Why the RunPod row uses $1.39:** RunPod also publishes a $1.19/hour Community Cloud rate for the A100 PCIe. This page uses the $1.39/hour **Secure Cloud** rate for the dedicated-Pod comparison, since Community and Secure Cloud are separate product choices. Treating the Community rate as a universal market floor would make the comparison look cleaner than it is.

**Why there is no Fal row:** Fal's current public pricing page returned HTTP 429 on this check and its published custom-deployment list does not establish a current A100 rate. A missing verifiable rate is more useful than a stale one.

## What a warm A100 costs per month

The following are **720-hour estimates derived from each product's published rate**, not provider quotes. Each assumes one listed product shape stays allocated for 720 hours (30 days). An estimate includes whatever resources the provider bundles in that listed shape. It excludes separately billed add-ons, taxes, storage or networking not included in the rate, support, scaling effects, and additional replicas.

```text
monthly listed-product-rate estimate = published rate × 720 hours
```

| Product shape | Published rate used | 720-hour estimate from listed rate |
|---|---:|---:|
| RunPod Secure Cloud A100 PCIe, 80 GB | $1.39/hr | about **$1,001** |
| Lambda 1x A100 PCIe, 40 GB | $1.99/hr | about **$1,433** |
| Modal A100, 40 GB | $0.000583/sec | about **$1,511** |
| Modal A100, 80 GB | $0.000694/sec | about **$1,799** |
| RunPod Serverless A100 tier | $2.72/hr | about **$1,958** |
| Baseten A100 deployment, 80 GiB | $4.00/hr | about **$2,880** |
| Replicate private A100 deployment, 80 GB | $5.04/hr | about **$3,629** |

The Modal figures use its unrounded published per-second rates: `$0.000583 × 3,600 × 720 = $1,511.14` for 40 GB and `$0.000694 × 3,600 × 720 = $1,798.85` for 80 GB. A workload that actually scales to zero should be budgeted from billable GPU-seconds, not by applying this always-warm example.

## Start with VRAM, then pick the operating model

### 40 GB A100: a lower price tier with a hard memory boundary

Lambda's 1x A100 PCIe VM and Modal's A100 40 GB container are not interchangeable, but they make the same capacity point visible: **40 GB is a different deployment constraint from 80 GB**. It can fit many vision, embedding, batch, and smaller-model workloads. It is not the same single-GPU option for a workload that needs an 80 GB weight footprint plus runtime headroom.

For a practical example, [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why an 80 GB-class GPU is the first normal single-card capacity point for 8-bit Llama 70B weights, while BF16/FP16 needs considerably more memory or multiple GPUs. That is a capacity statement, not a performance claim.

### 80 GB A100: compare the product around the card

The low 80 GB dedicated option in this table is RunPod's **$1.39/hour Secure Cloud A100 PCIe Pod**. It is a self-managed container-shaped machine, so the operator owns the image, server process, observability, and shutdown discipline. The bill continues while the Pod is running.

RunPod Serverless and Modal can make more sense for work that truly returns to zero, but their hourly equivalents are not a promise of a smaller bill for a permanently warm endpoint. Modal's 80 GB price is **$2.4984/hour** before surrounding compute; RunPod Serverless lists an A100 tier at **$2.72/hour**. The correct comparison is expected active and idle allocation time, plus cold-start tolerance—not a slogan about serverless.

### Managed A100 deployments trade a higher rate for a different surface

Baseten and Replicate are not raw VM rentals. Their published A100 rows cover managed deployment products with their own serving, scaling, and account rules. **Baseten's $4.00/hour** A100 deployment and **Replicate's $5.04/hour** private A100 deployment should therefore be compared against the operational work they replace, not only against a Pod's GPU line item.

For those product and billing details, see [Baseten pricing explained](https://hostfleet.net/baseten-pricing-guide-2026/) and [Replicate pricing explained](https://hostfleet.net/replicate-pricing-guide-2026/). The broader [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is useful context, but its April snapshot is not a substitute for the July 31 provider checks on this page.

## Which A100 option fits the job?

- **You need the lowest currently verified 80 GB dedicated rate and can operate an endpoint:** start with a RunPod Secure Cloud A100 PCIe Pod, then check the exact region, storage, and availability you need.
- **You want a conventional GPU VM and 40 GB is sufficient:** compare Lambda's 1x A100 PCIe configuration with the CPU, RAM, storage, and instance count required by the application.
- **You have bursty Python jobs or inference that can really scale down:** model Modal and RunPod Serverless from billable seconds and cold-start behavior instead of the 720-hour estimate.
- **You need a managed model-serving surface:** compare Baseten and Replicate after defining minimum replicas, traffic pattern, deployment controls, and support requirements.

## Verdict

For an **80 GB A100 that stays allocated**, RunPod Secure Cloud's **$1.39/hour A100 PCIe** is the lowest currently verified dedicated rate in this comparison. The honest caveat is that it buys a Pod, not a managed serving platform. A 40 GB A100 can be cheaper in a different product shape, but it is not a substitute for 80 GB when VRAM is the constraint.

For an always-warm 80 GB A100, the 720-hour estimates from these public listed rates span roughly **$1,001 to $3,629**. That range reflects different product shapes and bundled resources, not comparable bare-GPU charges. Pick the memory class first, then compare the products that deliver it.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — A100 PCIe Secure and Community Cloud, A100 SXM, and Serverless A100 rates; checked July 31, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; checked July 31, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — A100 PCIe and A100 SXM instance tables and per-GPU rates; checked July 31, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — dedicated A100 80 GiB per-minute and hourly rate; checked July 31, 2026
- [Replicate pricing](https://replicate.com/pricing) — private A100 80 GB per-second and hourly rate; checked July 31, 2026
- [Fal pricing](https://fal.ai/pricing) — checked July 31, 2026; returned HTTP 429 and is not used for an A100 price claim

*Need a self-managed A100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*

