---
title: "RunPod pricing 2026: Pods vs Serverless GPU cost guide"
description: "Compare RunPod Pods and Serverless pricing: selected Secure Cloud GPU rates, monthly cost estimates, billing behavior, and when scale-to-zero saves money."
pubDate: 2026-07-24
updatedDate: 2026-07-24
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed pricing guide: published rates and billing behavior come from RunPod's public pricing and documentation. The monthly examples are estimates, not quotes.*

**Pricing verified:** July 24, 2026

# RunPod pricing 2026: Pods vs Serverless GPU cost guide

RunPod sells two different operating models. **Pods** are dedicated, always-on containers; **Serverless** runs workers that can scale to zero. A low hourly GPU rate is not enough to choose between them: an idle Serverless endpoint can cost nothing, while a worker kept warm is continuous GPU spend.

This is a selected-rate guide, not a complete catalog of every GPU and variant RunPod lists. It uses the live public pricing page checked on **July 24, 2026**. It is not a performance benchmark, and it does not promise inventory in every region. For the wider market, start with [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/); for product-shape tradeoffs, see our [RunPod review for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/).

## The short answer

| If your workload is… | Start with | Why |
|---|---|---|
| A batch job or endpoint idle most of the day | **Serverless** | Flex workers can scale to zero. |
| A latency-sensitive public endpoint | **Serverless with active workers** | Warm workers can avoid cold starts, but are continuously billable. |
| A model server, notebook, or long-running worker | **Pods** | Dedicated, always-on compute is simpler to budget. |

The practical rule is simple: choose Serverless for genuine idle time and Pods for deliberate uptime.

## Selected published GPU rates

Rates below are USD per GPU-hour from RunPod's live public pricing page, checked July 24, 2026. **Pods** are exact Secure Cloud on-demand entries. **Serverless is a published capacity tier, not an exact-card guarantee**: a tier label names the pool from which a worker may be assigned. The table intentionally samples useful capacity points instead of claiming complete catalog coverage.

| Capacity point | Secure Cloud Pod | Serverless published tier |
|---|---:|---:|
| L4 — 24 GB | $0.39/hr | 24 GB pool (L4, A5000, 3090, MIG 24 GB): $0.69/hr |
| RTX 4090 — 24 GB | $0.69/hr | 4090: $1.10/hr |
| RTX 5090 — 32 GB | $0.99/hr | 5090: $1.58/hr |
| A40 — 48 GB | $0.44/hr | 48 GB pool (A6000, A40): $1.22/hr |
| L40S — 48 GB | $0.99/hr | 48 GB pool (L40, L40S, 6000 Ada, MIG 48 GB): $1.75/hr |
| RTX 6000 Pro — 96 GB | $1.99/hr | RTX 6000 Pro: $3.49/hr |
| A100 PCIe — 80 GB | $1.39/hr | A100: $2.72/hr |
| H100 PCIe — 80 GB | $2.89/hr | H100: $4.55/hr |
| H200 — 141 GB | $4.39/hr | H200: $5.93/hr |
| B200 — 180 GB | $5.89/hr | B200: $8.64/hr |
| B300 — 288 GB | $7.39/hr | B300: $9.98/hr |

RunPod also lists other Pod variants and Serverless tiers, including a 16 GB class and RTX PRO 4500 Blackwell. Re-check the [RunPod pricing page](https://www.runpod.io/pricing) for the exact card, cloud type, region, and availability before committing a production workload.

## Why the two columns are different

A Pod is machine-shaped infrastructure: choose hardware, start a container, and pay while it runs. Serverless is an execution model. RunPod documents billing for worker start time, request execution, and the configured idle timeout after a request. Flex workers can scale to zero; active workers stay ready and bill while they wait. See RunPod's [Serverless pricing documentation](https://docs.runpod.io/serverless/pricing) and [endpoint configuration reference](https://docs.runpod.io/serverless/endpoints/endpoint-configurations).

That makes the higher Serverless hourly rate reasonable only when genuine idle time offsets it. The documented defaults are active workers **0**, maximum workers **3**, and idle timeout **5 seconds**. They make a small experiment inexpensive, but they can produce cold starts and a small initial concurrency ceiling.

## Estimate: one GPU left on all month

These are **GPU-only estimates**, not quotes. Assumptions: one GPU, **720 hours in a 30-day month**, no storage, network-volume, disk, or egress charges. Formula: `hourly rate × 720`.

| GPU | Pods, always on | Serverless worker, kept warm all month | Difference |
|---|---:|---:|---:|
| L4 24 GB | about $281/mo | about $497/mo | about $216/mo |
| RTX 4090 24 GB | about $497/mo | about $792/mo | about $295/mo |
| A100 80 GB | about $1,001/mo | about $1,958/mo | about $958/mo |
| H100 80 GB | about $2,081/mo | about $3,276/mo | about $1,195/mo |

This does not mean Pods always win. An L4 Serverless worker that accrues 100 billable worker-hours costs about **$69** in GPU charges, rather than about $497. Calculate active worker-hours before paying to keep capacity warm. For a quick sensitivity check before choosing a product shape, use our [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to compare 1%, 10%, and always-warm H100 allocation assumptions.

```text
monthly Serverless GPU cost = Serverless hourly rate × billable worker hours
monthly Pod GPU cost = Pod hourly rate × running hours
```

If both run all month, the selected Pod entries above cost less in GPU charges. If the endpoint scales down for most of the month, Serverless can cost materially less despite its higher rate.

## Costs outside the GPU table

GPU price is not the whole bill. RunPod distinguishes container disks, volume disks, and network volumes; a stopped Pod can retain chargeable storage. Its billing documentation also describes prepaid credits and a default account spend limit of **$80 per hour** across resources. Read the [billing overview](https://docs.runpod.io/accounts-billing/billing) and [Pods pricing documentation](https://docs.runpod.io/pods/pricing) before treating a stopped workload as free.

For a public model API, measure cold-start behavior with the actual image and model before setting an SLA. For async work, start with Serverless and let workers scale down. If traffic becomes steady enough to keep a worker warm most of the day, revisit the Pod math. For a cross-provider decision, compare [RunPod, Modal, and Replicate for a small inference API](https://hostfleet.net/runpod-vs-modal-vs-replicate-small-inference-api/).

## Final verdict

- Pick **Serverless** for intermittent GPU work and treat cold starts or warm-worker spend as an explicit choice.
- Pick **Pods** for a GPU you intend to keep running, then manage storage and prepaid balance deliberately.
- Use these selected rates as a starting point; confirm the exact card and current price in RunPod before deploying.

If your application does not need to host a model itself, a CPU-first backend calling an external provider can be a better fit; [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/) explains that boundary.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — checked July 24, 2026
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing) — checked July 24, 2026
- [RunPod Serverless endpoint configuration](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — checked July 24, 2026
- [RunPod Pods pricing](https://docs.runpod.io/pods/pricing) — checked July 24, 2026
- [RunPod billing overview](https://docs.runpod.io/accounts-billing/billing) — checked July 24, 2026

*Signing up for something covered here? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
