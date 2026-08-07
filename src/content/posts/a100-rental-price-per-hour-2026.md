---
title: "A100 rental price per hour in 2026: 40 GB vs 80 GB rates checked"
description: "A source-backed August 2026 A100 price comparison that separates 40 GB and 80 GB cards, Pods, serverless workers, VMs, and managed deployments before estimating a warm monthly bill."
pubDate: 2026-07-31
updatedDate: 2026-08-07
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check:** August 6, 2026. Provider rate cards were checked against their public pricing pages. This is not a benchmark, capacity report, or availability guarantee.

# A100 rental price per hour in 2026: 40 GB vs 80 GB rates checked

An A100 can cost **$1.39 per GPU-hour** in the current public-rate comparison, but that is not a universal A100 price. It is a specific **80 GB RunPod Secure Cloud Pod**. A 40 GB A100 is a different memory class, and a serverless worker or managed deployment is a different product from a self-managed Pod even when all of them use an A100.

This is a source-backed refresh using HostFleet's complete August 6 pricing verification and its machine-readable [GPU pricing table](https://hostfleet.net/gpu-pricing/). It is deliberately a rate-card guide: it can tell you what a provider publicly lists, but not whether a GPU will be in stock, how quickly it will start, or how it will perform on your model.

> **Verified date:** August 6, 2026<br>
> **Rate basis:** public USD list prices, normalized to GPU-hours where a vendor publishes per-second or per-minute billing<br>
> **Important boundary:** CPU, RAM, storage, network, taxes, minimums, support, and deployment controls differ by product

## A100 prices, separated by memory and product shape

| Provider and product shape | A100 configuration | Public rate | What is actually being priced |
|---|---|---:|---|
| **RunPod Pods** | A100 PCIe, 80 GB, Secure Cloud | **$1.39/hr** | A continuously allocated, self-managed container-shaped machine |
| **Lambda Cloud** | 1x A100 PCIe or SXM, 40 GB | **$1.99/GPU-hr** | A conventional GPU VM instance |
| **Modal** | A100, 40 GB | **$2.10/hr** ($0.000583/sec) | GPU allocated to a serverless container |
| **Modal** | A100, 80 GB | **$2.50/hr** ($0.000694/sec) | GPU allocated to a serverless container |
| **RunPod Serverless** | A100, 80 GB worker tier | **$2.72/hr** | A serverless worker tier, not a named dedicated-card reservation |
| **Baseten** | A100, 80 GiB | **$4.00/hr** ($0.06667/min) | A managed model-serving deployment |
| **Replicate** | A100, 80 GB | **$5.04/hr** ($0.001400/sec) | A private managed model deployment |

The lowest row is not an all-provider market floor. RunPod also publicly lists an **A100 PCIe Community Cloud rate of $1.19/hr**, but this comparison uses the **$1.39/hr Secure Cloud** rate for its Pod baseline. Community Cloud and Secure Cloud are different supply choices. Presenting the Community figure as the default price would blur a real operating tradeoff.

The table also does not combine 40 GB and 80 GB into one cheapest-A100 number. Lambda's $1.99 VM rate and Modal's $2.10/hour rate are valid 40 GB choices; neither makes an 80 GB requirement disappear.

## Start with memory, not the cheapest line item

The A100 name hides the first decision: does the model, context length, KV cache, batch size, and concurrency target actually fit in **40 GB**, or is **80 GB** the working floor? That is a capacity decision before it is a hosting decision.

For example, HostFleet's [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why an 80 GB-class card is the first normal single-GPU capacity point for 8-bit Llama 70B weights. It is not a throughput promise: quantization, context length, runtime overhead, and concurrent users still matter. But it illustrates why a $1.99 40 GB VM cannot be substituted into an 80 GB deployment plan.

Use this quick filter:

1. If the workload fits inside 40 GB with safe runtime headroom, compare Lambda's VM and Modal's serverless container on operational fit.
2. If it needs 80 GB, discard 40 GB rows before comparing price. The selected low-rate self-managed starting point is then RunPod's $1.39/hour Secure Cloud PCIe Pod.
3. If it needs a managed serving layer, compare Baseten and Replicate as managed deployment products rather than treating either price as bare-card rental.

## The monthly cost of keeping an A100 warm

The following figures are **estimates**, not vendor quotes. They assume one listed product remains allocated for 720 hours, or 30 days:

```text
listed-rate capacity estimate = published hourly equivalent × 720 hours
```

| Product shape | Rate used | 30-day listed-rate estimate |
|---|---:|---:|
| RunPod Secure Cloud A100 PCIe Pod, 80 GB | $1.39/hr | about **$1,001** |
| Lambda 1x A100 VM, 40 GB | $1.99/GPU-hr | about **$1,433** |
| Modal A100 container, 40 GB | $0.000583/sec | about **$1,511** |
| Modal A100 container, 80 GB | $0.000694/sec | about **$1,799** |
| RunPod Serverless A100 tier, 80 GB | $2.72/hr | about **$1,958** |
| Baseten A100 deployment, 80 GiB | $4.00/hr | about **$2,880** |
| Replicate private A100 deployment, 80 GB | $5.04/hr | about **$3,629** |

The two Modal estimates retain the unrounded provider inputs: `$0.000583 × 3,600 × 720 = $1,511.14` and `$0.000694 × 3,600 × 720 = $1,798.85`. The other rows multiply the displayed hourly rate by 720 and round to the nearest dollar. These are listed-product capacity estimates only. They exclude separately billed add-ons, taxes, additional replicas, and the effect of scaling down.

A job that really returns to zero should not be budgeted with 720-hour math. Estimate its billable GPU-seconds, minimum-warm time, cold-start tolerance, and queue behavior instead. The product difference is central to [RunPod's Pods versus Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/): a lower Pod rate can still be a worse purchase for work that only needs a GPU intermittently.

## What each price buys—and leaves you to own

### RunPod: the low-rate 80 GB starting point, with operations attached

At $1.39/hour for the selected Secure Cloud A100 PCIe Pod, RunPod is the low-price starting point here for a continuously allocated **80 GB** self-managed shape. That means the team owns the container image, inference server, authentication, health checks, logs, storage decisions, and shutdown discipline. The bill continues while the Pod is running.

That division of responsibility is often why the rate is lower than a managed serving product. It is a valid trade when the team can operate the endpoint, not a reason to call it universally best. [RunPod for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) covers that deployment-shape choice beyond the rate card.

### Lambda and Modal: two 40 GB choices with different control planes

Lambda's $1.99/GPU-hour entry is for a published 1x A100 PCIe or SXM 40 GB VM configuration. It is the natural row to inspect when you need a normal instance-shaped environment. The final decision still needs the precise instance bundle, region, capacity, storage, and network requirements.

Modal publishes distinct 40 GB and 80 GB A100 prices and bills by the second. It fits an application that can release GPU capacity between bursts and accept its startup behavior. The $2.10/hour figure is an hourly equivalent of a per-second rate, not evidence that leaving the container warm is economical.

### RunPod Serverless: compare allocated time, not its label

RunPod Serverless's $2.72/hour A100 80 GB tier is a worker-capacity tier. It is useful for workloads that can tolerate a serverless lifecycle, but it should not be presented as an exact-card reservation or compared one-for-one with a Pod without explaining that boundary.

For a broader view of how Pods, workers, VMs, and managed deployment surfaces differ, use HostFleet's [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). Its table keeps unlike product shapes visible instead of declaring one generic GPU-cloud winner.

### Baseten and Replicate: higher rate, different serving surface

Baseten's $4.00/hour A100 80 GiB and Replicate's $5.04/hour private A100 80 GB are managed deployment products. Their value proposition is not equivalent to a raw VM: deployment workflow, model-serving controls, scaling, and platform operations are part of the product.

That may be worth paying for if managed serving is the bottleneck. It is not an honest reason to compare their per-hour number directly with a Pod and claim the Pod is the same service for less. Before choosing either, check the specific billing behavior and minimum capacity in [Baseten's pricing guide](https://hostfleet.net/baseten-pricing-guide-2026/) and [Replicate's pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/).

## A practical A100 selection sequence

1. **Set the memory floor.** Remove 40 GB options if the model and its runtime headroom need 80 GB.
2. **Decide whether capacity must stay warm.** An always-ready endpoint is a capacity purchase; a queueable batch job may be a billable-seconds purchase.
3. **Compare like product shapes.** Pod to VM is a useful control-plane comparison; managed deployment to managed deployment is a useful serving-surface comparison.
4. **Price the missing components.** Check storage, egress, CPU/RAM, minimum replicas, region, capacity, tax, and commitment terms. None of those are proved by a single GPU-rate row.
5. **Run a bounded deployment test.** Record image pull, model load, time-to-ready, cold-start behavior, allocation failures, and billed duration. Public prices are source evidence, not a benchmark result.

## Verdict

For a continuously allocated self-managed **80 GB A100**, the selected low-rate public starting point is **RunPod Secure Cloud A100 PCIe at $1.39/hour**. That is a price advantage paired with operational responsibility.

For a workload that truly fits in 40 GB, Lambda's $1.99/GPU-hour VM and Modal's $2.10/hour serverless equivalent are different, credible choices. For bursty work, serverless can reduce the total only when capacity genuinely releases. For managed model serving, Baseten and Replicate are higher listed rates for a different operational surface.

The dependable order is: memory class first, warm-versus-bursty behavior second, provider rate third. An A100 label alone is not a purchase decision.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud and Community A100 PCIe, plus Serverless A100 rates; checked August 6, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; checked August 6, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x A100 PCIe/SXM 40 GB rate; checked August 6, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — A100 80 GiB per-minute deployment rate; checked August 6, 2026
- [Replicate pricing](https://replicate.com/pricing) — private A100 80 GB per-second deployment rate; checked August 6, 2026
- HostFleet full verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-06-gpu-pricing-full-verification.md`
- HostFleet GPU-pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 6, 2026

*Need a self-managed A100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
