---
title: "GPU cloud cost calculator: estimate a warm endpoint vs billable seconds (2026)"
description: "A source-backed GPU cloud cost calculator: use published rates to separate an always-warm endpoint budget from a bursty billable-seconds estimate."
pubDate: 2026-08-09
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed inputs; estimated totals.** The published GPU rates used below were checked against provider price pages on **August 6, 2026**. The calculations are transparent planning estimates, not benchmarks, capacity guarantees, or complete invoices.

# GPU cloud cost calculator: estimate a warm endpoint vs billable seconds

A GPU cost calculator should start with one question: **will the accelerator stay allocated, or will it really return to zero?**

That is more important than picking the lowest hourly number. A dedicated Pod, VM, permanently warm serverless worker, and managed deployment may all expose an H100 rate, but their billable time and operational responsibility differ. The useful estimate is therefore not “GPU price × 30 days” by default. It is the rate for the actual product shape multiplied by the time that product is allocated.

This guide is source-backed rather than benchmark-backed. Its rate inputs come from the current [HostFleet GPU pricing table](https://hostfleet.net/gpu-pricing/) and the published provider pages listed in Sources. It does not claim a GPU is in stock, that any provider delivers the same throughput, or that a workload will have a particular cold-start time.

> **Rate-input date:** August 6, 2026  
> **Currency:** USD list rates  
> **Scope:** GPU compute only unless a provider's named product includes other resources

## The two calculations that matter

### 1. Always-warm capacity

Use this when a GPU remains allocated continuously: a dedicated Pod or VM, a fixed minimum replica, or a serverless container deliberately kept warm.

```text
monthly GPU-capacity estimate = published hourly-equivalent rate × allocated hours
```

For a 30-day planning month, allocated hours are **720**. For a 31-day month, use 744. This is deliberately simple: it creates a capacity ceiling before storage, egress, taxes, support, extra replicas, and any product-specific minimums.

### 2. Bursty allocated time

Use this when the product can release capacity and the workload actually allows it to do so.

```text
bursty GPU estimate = published per-second rate × total allocated GPU-seconds
```

Total allocated seconds should include the time the provider bills for the running workload, not only the time a user waits for a response. Track startup, image pull, model load, execution, retry, and shutdown behavior in the product you choose. A scale-to-zero label helps only if capacity is released between real pieces of work.

## Rate-card calculator examples

The table uses published H100 rates from the August 6 source check. It is not a ranking: the rows represent different products. All monthly figures use 720 allocated hours and exclude separately billed items.

| Product shape | Published H100 rate used | Calculation | 30-day GPU-only estimate | What the result means |
|---|---:|---|---:|---|
| RunPod Secure Cloud PCIe Pod | $2.89/hr | $2.89 × 720 | **$2,081** | Dedicated, self-managed capacity held for a full 30 days |
| Lambda 1x H100 PCIe VM | $3.29/GPU-hr | $3.29 × 720 | **$2,369** | A conventional VM instance held for a full 30 days |
| Modal H100 container | $0.001097/sec ($3.9492/hr) | $0.001097 × 3,600 × 720 | **$2,843** | The GPU component if an H100 container is allocated continuously |
| Fal H100 custom deployment | $4.50/hr | $4.50 × 720 | **$3,240** | A custom-deployment list-rate capacity estimate, not its committed-use floor |
| Baseten H100 deployment | $0.10833/min ($6.4998/hr) | $0.10833 × 60 × 720 | **$4,680** | A managed deployment rate held for a full 30 days |

The inputs are published list rates checked August 6, 2026: RunPod Secure Cloud H100 PCIe $2.89/hr, Lambda 1x H100 PCIe $3.29/GPU-hr, Modal $0.001097/sec, Fal custom deployment $4.50/hr, and Baseten $0.10833/min. The calculations use unrounded rates where they are published in smaller billing units, then round the final dollar result.

For the exact hardware/product distinctions behind this table, use [HostFleet's H100 rental-price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/). An H100 PCIe Pod, an H100 VM, and a managed H100 deployment are not interchangeable merely because the accelerator label has 80 GB of VRAM.

## A bursty example: do not multiply by 720 when the GPU is not warm

Assume a batch workflow allocates a Modal H100 for **10 minutes** per run and completes **100 runs** in a month. The transparent GPU-only estimate is:

```text
100 runs × 10 minutes × 60 seconds = 60,000 allocated GPU-seconds
60,000 × $0.001097/sec = $65.82
```

That **$65.82** is not an invoice prediction. It excludes Modal CPU, memory, storage, networking, and any time not captured by the ten-minute assumption. It also assumes the workload can actually release the GPU after each run. The same H100 rate held allocated for 720 hours produces the $2,843 capacity estimate in the table instead.

This is why a cost model should use recorded allocated time once the workload exists. If you do not yet have those observations, make the startup and execution assumptions explicit and use the result as a budget range—not a claim about production cost. [Modal's pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) explains the provider's per-second GPU pricing and the warm-capacity caveat in more detail.

## Pick the GPU before doing arithmetic

A cheaper rate cannot rescue a GPU that lacks the required memory. Start with VRAM and deployment constraints, then apply the correct product rate. The 40 GB and 80 GB A100 variants, for example, belong in different planning rows; combining them into one “A100 price” makes the estimate look tidier and less useful. See [A100 rental prices by VRAM class](https://hostfleet.net/a100-rental-price-per-hour-2026/) before using a card label as a capacity assumption.

For open-weight models, memory headroom also depends on the model format, context length, concurrent requests, runtime overhead, and whether the model is fully resident on the GPU. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) is the companion check before treating an 80 GB price as a sizing recommendation.

## A practical calculator worksheet

Use this order for a defensible first estimate:

1. **Name the deployment shape.** Is this a self-managed Pod, VM, serverless worker, or managed endpoint? Do not swap a managed rate for a bare-GPU rate.
2. **Name the exact GPU and variant.** Record VRAM and, where relevant, PCIe, SXM, or a provider tier rather than only “H100.”
3. **Choose a billing-time model.** Use allocated hours for warm capacity or measured/assumed allocated seconds for bursty work.
4. **Write the rate source and date beside the input.** Rate cards change; this guide's inputs are as of August 6, 2026.
5. **Add non-GPU charges separately.** Storage, network transfer, CPU/RAM, image registries, observability, additional replicas, taxes, and support can materially change the bill. Do not silently fold unknown charges into a made-up GPU total.
6. **Make an allocation check before migration.** Price does not prove quota, regional capacity, cold-start behavior, or deployment suitability.

The live [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the best starting point for selecting comparable public rates. Its purpose is to show product shape alongside price, not to crown one universal cheapest GPU.

## Credits change the test budget, not the calculator

A free credit can reduce an initial bill, but it should be kept outside the base cost calculation. First calculate the workload from the listed rate. Then subtract only a credit whose account, plan, expiry, and GPU eligibility you have confirmed. That avoids treating a promotional balance as recurring unit economics.

For example, [HostFleet's GPU cloud credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) records Modal's public $30 monthly Starter credit as checked August 2, 2026. At the published H100 rate used above, $30 corresponds to roughly 7.6 GPU-hours before other metered resources. It is useful for a bounded deployment test; it is not a substitute for a warm-production budget.

## Verdict

The honest GPU cloud cost calculator has two modes: **rate × allocated hours** for capacity you keep warm, and **rate × allocated seconds** for work that genuinely scales down. Start with the correct GPU and product shape, retain the source date, and list exclusions beside the result.

If you need self-managed capacity that stays allocated, the August 6 source check places RunPod Secure Cloud H100 PCIe at $2.89/hr before excluded charges. If the workload is bursty, model real allocated seconds on a per-second product rather than multiplying an hourly rate by 720 out of habit. Then re-check the exact rate, tier, availability, and billing rules before purchase.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pods and Serverless public rate tables; checked August 6, 2026
- [Modal pricing](https://modal.com/pricing) — published per-second GPU rates; checked August 6, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment list and separately advertised committed-use rates; checked August 6, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — published deployment per-minute rates; checked August 6, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x H100 PCIe VM rate; checked August 6, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 6, 2026
- HostFleet full-verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-06-gpu-pricing-full-verification.md`

*Need a self-managed GPU endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*

