---
title: "H100 rental price per hour in 2026: cloud GPU rates compared"
description: "H100 rental price per hour: compare current cloud GPU rates, pricing scopes, and always-on cost estimates before choosing an H100 provider."
pubDate: 2026-07-29
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed price guide: every listed rate comes from an official provider page or the dated HostFleet dataset. It is not a benchmark or an inventory guarantee.*

**Rates checked:** July 29, 2026  
**HostFleet comparison data:** July 23, 2026 (Lambda H100 row added July 27)

# H100 rental price per hour in 2026: cloud GPU rates compared

An **H100 costs about $2.89 to $6.50 per GPU-hour** in the current HostFleet comparison for public self-serve and managed deployment options. That range is useful only after you separate the products behind it: a dedicated RunPod Pod, a Lambda VM, and a serverless or managed deployment are not interchangeable purchases.

The lowest comparable entry in this table is **RunPod Secure Cloud H100 PCIe at $2.89/hour**. Lambda's one-GPU H100 PCIe instance is **$3.29/GPU-hour**. Modal's H100 is **$0.001097/second**, or **$3.9492/hour** before rounding. Those are published rates, not a promise that capacity will be available in a particular region or that the final bill contains only GPU time.

For the wider GPU market and the live data source behind this page, use [HostFleet's GPU pricing table](https://hostfleet.net/gpu-pricing/). If the real decision is dedicated Pods versus workers that can return to zero, read [RunPod Pods vs Serverless pricing](https://hostfleet.net/runpod-pricing-guide-2026/) before choosing from a rate card.

## H100 price per hour: current comparison

The table is a live-data snapshot from `gpu-pricing.json`. Rates are USD **per GPU-hour**. A listed hourly rate is not automatically a like-for-like comparison: the scope column names what is being bought.

| Provider and product shape | H100 scope in this comparison | Published rate | Price source and as-of date |
|---|---|---:|---|
| **RunPod Pods** | H100 PCIe, Secure Cloud, dedicated always-on container | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked July 29, 2026 |
| **Lambda Cloud** | 1x H100 PCIe instance; rate is per GPU-hour | **$3.29/hr** | [Lambda GPU instances](https://lambda.ai/instances), checked July 29, 2026 |
| **Modal** | Serverless H100 allocated to a container; $0.001097/sec | **$3.9492/hr** | [Modal pricing](https://modal.com/pricing), checked July 29, 2026 |
| **Fal** | H100 custom-deployment list rate | **$3.99/hr** | [Fal pricing](https://fal.ai/pricing), HostFleet dataset source checked July 23, 2026; the public page returned an access challenge on July 29 |
| **RunPod Serverless** | H100 worker capacity tier, not an exact-card reservation | **$4.55/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked July 29, 2026 |
| **Replicate** | Private model deployment H100; $0.001525/sec | **$5.49/hr** | [Replicate pricing](https://replicate.com/pricing), checked July 29, 2026 |
| **Baseten** | Managed H100 deployment, 80 GiB VRAM; $0.10833/min | **$6.50/hr** | [Baseten pricing](https://www.baseten.co/pricing/), checked July 29, 2026 |

**Important scope note:** RunPod's public page also shows a **$1.99/hour Community Cloud** rate for an H100 PCIe. HostFleet uses the **$2.89/hour Secure Cloud** rate in its like-for-like Pods row. Community and Secure Cloud have different availability and operating tradeoffs, so treating $1.99 as a universal market floor would be misleading.

Fal's $3.99 number remains visible as a dated dataset entry rather than a newly verified rate. Its official public pricing page blocked an unauthenticated fetch on July 29. That is a source-access limitation, not evidence that the price changed; still, re-check it in a browser before using Fal in a purchase decision.

## What a warm H100 costs per month

An hourly GPU price becomes a serious commitment when the deployment stays allocated. The following are **GPU-only estimates**, not provider quotes.

```text
monthly GPU estimate = published hourly GPU rate × 720 hours
```

The assumption is one GPU held for 30 days, with no CPU, RAM, storage, network, taxes, or support charges. Under that assumption:

| Product shape | Hourly rate used | 720-hour GPU-only estimate |
|---|---:|---:|
| RunPod Pods Secure Cloud H100 PCIe | $2.89/hr | about **$2,081** |
| Lambda 1x H100 PCIe | $3.29/hr | about **$2,369** |
| Modal H100 | $0.001097/sec | about **$2,843** |
| RunPod Serverless H100 tier | $4.55/hr | about **$3,276** |
| Replicate private H100 deployment | $5.49/hr | about **$3,953** |
| Baseten H100 deployment | $6.50/hr | about **$4,680** |

The Modal calculation uses its unrounded per-second rate: `$0.001097 × 3,600 × 720 = $2,843.42`. The other rows use the displayed rate multiplied by 720 and rounded to the nearest dollar. These examples explain the cost of keeping capacity allocated; they do **not** predict a workload that genuinely scales down between requests.

## The cheapest number is not always the cheapest deployment

### RunPod: the lowest Secure Cloud rate, with more infrastructure to own

At **$2.89/hour for a Secure Cloud H100 PCIe**, RunPod is the lowest currently verified rate in this table's dedicated, self-serve scope. A Pod is a container-shaped machine: you choose the hardware and remain responsible for the image, server process, networking, observability, and stopping it when work ends.

That makes it a sensible starting point for a team that needs a continuously available H100 and can operate the endpoint. It is not a scale-to-zero default. The current public pricing page distinguishes Pods from Serverless, and it distinguishes Secure Cloud from Community Cloud. Use [RunPod for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) for the product-shape tradeoff, not just the rate.

### Lambda: a VM rate with a defined instance shape

Lambda's **$3.29/GPU-hour** figure is for a 1x H100 PCIe instance, not a bare GPU abstraction. Its public table attaches the GPU to an instance with CPU, RAM, and local storage. That can make planning simpler for an operator who wants a conventional VM, but it also means the number should not be compared as if every provider supplies the same surrounding resources.

Lambda also lists H100 SXM variants and larger multi-GPU instances at different per-GPU prices. This page deliberately uses its 1x H100 PCIe row because it is the closest match to the other single-GPU H100 entries.

### Modal, Replicate, Baseten, and Fal: pay for a serving surface, not only a card

Modal and Replicate publish per-second H100 rates. Baseten publishes a per-minute managed-deployment rate. Those billing units are easy to convert to hourly numbers, but the customer is buying a deployment surface with its own container, scaling, and platform rules—not simply renting a VM.

- **Modal** is the cleanest fit when a Python-native workload can actually scale down. A warm H100 still consumes roughly $2,843 of GPU time in a 30-day month, so its serverless label does not make an always-ready endpoint cheap. See [Modal pricing explained](https://hostfleet.net/modal-pricing-guide-2026/) for the billing model.
- **Replicate** lists $5.49/hour for a private H100 deployment. Its published rate should be evaluated with the deployment's scaling settings and model-serving constraints, not compared only with a raw VM price.
- **Baseten** lists $6.50/hour for an 80 GiB H100 deployment. The higher rate can be rational when its managed serving layer removes work that would otherwise be carried by an infrastructure team; it is not the budget choice for an idle endpoint. See [Baseten pricing explained](https://hostfleet.net/baseten-pricing-guide-2026/).
- **Fal** lists a $3.99/hour H100 rate in the dated HostFleet dataset, plus an advertised committed-use floor of $1.89/hour. Do not rank the committed-use figure against on-demand prices: it has a different commitment requirement, and the current public price page needs a fresh browser check.

For a broader explanation of why provider billing model matters as much as GPU hourly rate, see [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## Which H100 option fits the job?

Choose by operating model first, then compare the correct rate:

- **You want a dedicated H100 and can run the stack:** start by checking a RunPod Secure Cloud Pod. It is the lowest verified dedicated entry in this table, but its GPU bill continues while the Pod runs.
- **You want a conventional GPU VM:** compare Lambda's 1x H100 PCIe instance with the actual CPU, RAM, storage, region, and capacity you need.
- **You have bursty GPU jobs:** compare Modal and RunPod Serverless using expected billable GPU-seconds and cold-start tolerance. Do not use 720-hour math for a job that truly returns to zero.
- **You need a managed model-serving control plane:** compare Baseten, Replicate, and Fal after defining minimum replicas, request patterns, and support needs. Their rate cards describe a different product than a self-managed Pod.

## Verdict

For a continuously allocated, self-managed H100, **RunPod Secure Cloud's $2.89/hour H100 PCIe** is the current lowest verified entry in this comparison. **Lambda at $3.29/GPU-hour** is the next clear single-instance alternative. If the workload can genuinely scale down, a serverless provider may cost less overall despite a higher hourly equivalent; if it needs a warm endpoint all month, the GPU-only floor is already roughly **$2,000 to $4,700** before supporting infrastructure.

Treat that range as a capacity-budget decision, not a benchmark result. Verify exact GPU variant, cloud type, minimum-replica setting, storage, and regional availability before committing.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud, Community Cloud, and Serverless H100 rates; checked July 29, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate; checked July 29, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x H100 PCIe and H100 SXM instance rates; checked July 29, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 80 GiB per-minute and hourly rate; checked July 29, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 per-second and hourly rate; checked July 29, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 list and committed-use pricing source; HostFleet source check July 23, 2026; unauthenticated access challenge observed July 29, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, refreshed July 23, 2026, with Lambda H100 data added July 27, 2026

*Need a self-managed H100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*


