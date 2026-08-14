---
title: "A100 rental price per hour in 2026: 10 public rates checked"
description: "A100 rental prices across 10 public rates, separating 40 GB from 80 GB and catalog prices from deployable capacity."
pubDate: 2026-07-31
updatedDate: 2026-08-14
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check; estimated monthly totals.** This refresh combines HostFleet's August 6 full A100 check with provider expansions verified on **August 12–14, 2026**. The rates are public list prices and the monthly figures are transparent arithmetic—not benchmarks, inventory guarantees, negotiated quotes, or complete invoices.

# A100 rental price per hour in 2026: 10 public rates checked

The lowest selected public rate in this A100 comparison is now **$1.35 per GPU-hour** for a one-GPU Hyperstack A100 80 GB PCIe VM in Canada. RunPod Secure Cloud follows at **$1.39/hour**. Novita AI lists an A100 80 GB SXM product at **$1.60/hour**, but its public inventory reported zero available units when checked on August 14.

That availability result is the useful lesson. A catalog rate can establish what a provider charges without proving that a buyer can launch the product. This source-backed refresh adds **Hyperstack, Novita AI, and CoreWeave Inference** to the existing guide, using the same data structure behind [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

> **Latest provider verification:** August 14, 2026<br>
> **Currency:** public USD list rates before tax<br>
> **Comparison unit:** one listed GPU-hour or its per-second/per-minute equivalent<br>
> **Boundary:** A100 40 GB and 80 GB, PCIe and SXM, VMs, Pods, workers, and managed deployments are not interchangeable products

## Current A100 prices: 40 GB and 80 GB kept separate

Each row retains its product shape and source-check date. Per-second rates use 3,600 seconds per hour; per-minute rates use 60 minutes per hour.

| Provider and product | A100 configuration | Public rate | Official evidence and check date |
|---|---|---:|---|
| **Hyperstack VM** | 1x A100 80 GB PCIe; Canada | **$1.35/GPU-hr** | [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing), checked Aug. 13, 2026 |
| **RunPod Secure Cloud Pod** | A100 80 GB PCIe | **$1.39/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 6, 2026 |
| **Novita AI instance** | 1x A100 80 GB SXM; zero inventory observed | **$1.60/GPU-hr** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), checked Aug. 14, 2026 |
| **Lambda Cloud VM** | 1x A100 PCIe or SXM, 40 GB | **$1.99/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), checked Aug. 6, 2026 |
| **Modal container** | A100 40 GB | **$0.000583/sec** (**$2.0988/hr**) | [Modal pricing](https://modal.com/pricing), checked Aug. 6, 2026 |
| **Modal container** | A100 80 GB | **$0.000694/sec** (**$2.4984/hr**) | [Modal pricing](https://modal.com/pricing), checked Aug. 6, 2026 |
| **CoreWeave Inference** | A100 80 GB; inference-platform customers | **$2.70/GPU-hr** | [CoreWeave pricing](https://www.coreweave.com/pricing), checked Aug. 12, 2026 |
| **RunPod Serverless** | A100 80 GB worker tier | **$2.72/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 6, 2026 |
| **Baseten deployment** | A100 80 GiB | **$0.06667/min** (**$4.0002/hr**) | [Baseten pricing](https://www.baseten.co/pricing/), checked Aug. 6, 2026 |
| **Replicate private deployment** | A100 80 GB | **$0.001400/sec** (**$5.04/hr**) | [Replicate pricing](https://replicate.com/pricing), checked Aug. 6, 2026 |

This is a comparison of **ten public rates**, not ten interchangeable rental offers. Hyperstack, RunPod Pods, and Lambda expose self-managed capacity. Modal and RunPod Serverless expose allocation-oriented worker or container surfaces. Baseten and Replicate sell managed deployment products. CoreWeave's single-GPU inference rate has an account-eligibility condition. Novita's price was public, but its A100 inventory state was `none` at verification time.

## What changed in this refresh

### Hyperstack is the new selected price leader—with a billing-state catch

Hyperstack publishes **$1.35 per GPU-hour** for A100 80 GB PCIe, checked August 13, 2026 on its [official GPU pricing page](https://www.hyperstack.cloud/gpu-pricing). Its [flavor catalog](https://docs.hyperstack.cloud/docs/hardware/flavors/) shows a one-GPU `CANADA-1` configuration with 28 CPU, 120 GB RAM, a 100 GB root disk, and 750 GB of ephemeral storage. The fixed CPU, RAM, root disk, and ephemeral disk are included in the flavor rate; public IPs and shared storage are separate.

The catch is lifecycle billing. Hyperstack's [states-and-billing documentation](https://docs.hyperstack.cloud/docs/billing/states-and-billing/), checked August 13, says a stopped VM continues billing because the hardware remains reserved. Deletion ends VM billing. Hibernation deallocates the flavor hardware, but retained root-disk data, public IPs, and attached volumes can continue to incur charges, while ephemeral-disk data is lost.

Hyperstack's rate is four cents per hour below the selected RunPod Secure Cloud rate. That difference is only **$28.80 over 720 allocated hours**, an estimate derived from `$0.04 × 720`. Region fit, stock, image workflow, storage, and shutdown behavior can outweigh it quickly.

### Novita's $1.60 rate was not deployable in the observed inventory

Novita's public marketplace API returned an A100 80 GB SXM one-GPU product with an official fixed-point price value of `160000`. Novita's public client conversion divides that value by 100,000, producing the **$1.60/GPU-hour** rate shown above. The same August 14 API response reported availability `none` and a maximum available count of zero.

The product bundles 14 vCPU, 240 GB RAM, and a 60 GB free container-disk quota. Novita's [GPU-instance pricing documentation](https://novita.ai/docs/guides/gpu-instance-pricing), checked August 14, says billing is per second and settled hourly; compute billing ends when the instance is stopped. Storage above the free container-disk quota is separate.

HostFleet therefore treats $1.60 as a **catalog rate**, not a launch recommendation. Inventory is volatile and could return after publication, but a later stock change would not make the August 14 observation false. Buyers should recheck the marketplace immediately before budgeting a deployment.

### CoreWeave's $2.70 figure is an inference-platform rate

CoreWeave's North America pricing table publishes **$2.70 per hour** in its explicit single-GPU inference column for A100 80 GB, checked August 12, 2026. The vendor separately lists an eight-GPU on-demand A100 instance at **$21.60/hour**. HostFleet uses the vendor's single-GPU inference number; it does not derive it by dividing the full-node price.

The footnote matters more than the arithmetic: GPU-based pricing applies to CoreWeave inference-platform customers and directs buyers to an account executive. The rate belongs in a public data comparison, but it is not evidence of a self-serve, one-GPU VM that any new account can launch.

## What 720 allocated hours would cost

These totals are **estimates**, not provider quotes. Each assumes one listed product remains allocated for a 30-day, 720-hour month. Per-second and per-minute products retain their native published inputs. The figures exclude storage, network transfer where applicable, public IPs, taxes, support, commitments, extra replicas, and other infrastructure.

| Product shape | Rate input and source-check date | 720-hour listed-rate estimate |
|---|---:|---:|
| Hyperstack 1x A100 80 GB PCIe VM | $1.35/hr, Aug. 13 | **$972.00** |
| RunPod Secure Cloud A100 80 GB PCIe Pod | $1.39/hr, Aug. 6 | **$1,000.80** |
| Novita 1x A100 80 GB SXM catalog product | $1.60/hr, Aug. 14 | **$1,152.00** |
| Lambda 1x A100 40 GB VM | $1.99/hr, Aug. 6 | **$1,432.80** |
| Modal A100 40 GB container | $0.000583/sec, Aug. 6 | **$1,511.14** |
| Modal A100 80 GB container | $0.000694/sec, Aug. 6 | **$1,798.85** |
| CoreWeave Inference A100 80 GB | $2.70/hr, Aug. 12 | **$1,944.00** |
| RunPod Serverless A100 80 GB tier | $2.72/hr, Aug. 6 | **$1,958.40** |
| Baseten A100 80 GiB deployment | $0.06667/min, Aug. 6 | **$2,880.14** |
| Replicate private A100 80 GB deployment | $0.001400/sec, Aug. 6 | **$3,628.80** |

The math is `rate × 720 hours`; Modal and Replicate first convert their published per-second inputs, while Baseten converts its per-minute input. Novita's $1,152 estimate is deliberately retained even though observed inventory was zero: it shows the cost implied by the catalog rate, not a claim that 720 hours could be purchased.

A workload that genuinely releases GPU capacity should not use 720-hour math. Estimate billable GPU-seconds, startup and model-load time, retries, idle windows, and minimum warm capacity instead. HostFleet's [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) explains the allocation assumptions behind warm, 10%, and 1% duty-cycle estimates.

## Choose memory and product shape before price

The first filter remains memory. A100 40 GB and 80 GB are different capacity classes. If the model, context, KV cache, batch size, and runtime overhead require more than 40 GB, Lambda's $1.99 row and Modal's 40 GB row are not lower-cost substitutes for an 80 GB deployment.

For open-weight models, [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) shows why weight format and runtime headroom determine whether a single 80 GB card is plausible. It is a memory-sizing guide, not a throughput benchmark.

Then choose the operating surface:

1. **Self-managed, always allocated:** compare Hyperstack, RunPod Pods, and other VM-shaped capacity on stock, region, image support, persistent storage, network, and the exact action that stops billing.
2. **Bursty worker:** compare Modal and RunPod Serverless on actual allocated time, startup behavior, queueing, and minimum capacity.
3. **Managed serving:** compare Baseten, Replicate, and eligible CoreWeave offerings on deployment controls and operational work replaced—not only their hourly equivalents.
4. **Catalog-only or unavailable capacity:** keep the rate for market context, but do not put it in a launch plan until the exact region and shape are available to the account.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion for comparing workers and managed deployments. [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the lifecycle and storage differences between its Pods and Serverless products.

## A practical A100 buying checklist

1. **Fix the VRAM floor.** Remove every 40 GB row if the deployment needs 80 GB.
2. **Confirm the exact variant.** PCIe and SXM are not identical hardware configurations just because both are A100s.
3. **Prove launch eligibility.** Check account quota, region, smallest deployable shape, and live inventory. A public number is only price evidence.
4. **Test the off switch.** Document whether stop, scale-to-zero, hibernate, or delete ends compute billing and what storage survives.
5. **Add excluded resources.** Price persistent storage, public IPs, transfer, CPU/RAM where separate, replicas, taxes, and support.
6. **Run a bounded deployment test.** Measure time-to-ready, model load, allocation failures, billed duration, and the shutdown path before committing production traffic.

## Verdict

**Hyperstack's one-GPU A100 80 GB PCIe VM at $1.35/hour is the new selected public-rate low.** The simple 720-hour estimate is **$972**, before separately billed resources. But a stopped VM continues billing, and the public price does not prove stock.

**RunPod Secure Cloud at $1.39/hour** is only four cents higher and remains a strong self-managed comparison point with a clearly separated Community, Secure Cloud, and Serverless product structure. **Novita's $1.60/hour A100 80 GB SXM rate is attractive on paper, but it was catalog-only in the August 14 check because the public inventory showed zero units.** CoreWeave's $2.70 rate belongs to inference-platform buyers, not a self-serve VM shortlist.

The honest buying order is: required memory, deployable shape, live eligibility, billing lifecycle, then hourly price. A low catalog number is useful data; it is not capacity until the account can launch it.

## Sources

- [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) — A100 PCIe rate and on-demand billing unit; checked August 13, 2026
- [Hyperstack flavor catalog](https://docs.hyperstack.cloud/docs/hardware/flavors/) — one-GPU A100 resources and region; checked August 13, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped, hibernated, and deleted billing behavior; checked August 13, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pod and Serverless A100 rates; checked August 6, 2026
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products) — A100 product price, resources, billing methods, and observed inventory; checked August 14, 2026
- [Novita GPU-instance pricing](https://novita.ai/docs/guides/gpu-instance-pricing) — billing lifecycle and storage scope; checked August 14, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — one-GPU A100 40 GB VM rate; checked August 6, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; checked August 6, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — A100 single-GPU inference and eight-GPU on-demand rates plus eligibility footnote; checked August 12, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — A100 80 GiB per-minute managed-deployment rate; checked August 6, 2026
- [Replicate pricing](https://replicate.com/pricing) — private A100 80 GB per-second deployment rate; checked August 6, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, provider expansions verified August 12–14, 2026
- HostFleet verification notes — `/opt/hostbot/data/ai-hosting/notes/2026-08-12-coreweave-gpu-pricing.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-13-hyperstack-gpu-pricing.md`, and `/opt/hostbot/data/ai-hosting/notes/2026-08-14-novita-gpu-pricing.md`

*Need a self-managed A100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
