---
title: "A100 rental price per hour in 2026: 12 public rates checked"
description: "A100 rental prices across 12 public rates, with separate 40 GB and 80 GB comparisons plus the billing catches behind the cheapest offers."
pubDate: 2026-07-31
updatedDate: 2026-08-15
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check; estimated monthly totals.** The A100 prices below come from public provider rate cards and documentation. This bounded refresh adds Verda rates checked on **August 15, 2026** to the August 6 full-table baseline and the August 12–14 provider additions. It is not a benchmark, inventory guarantee, negotiated quote, or complete invoice.

# A100 rental price per hour in 2026: 12 public rates checked

The cheapest public A100 40 GB rate in this check is **Verda at $1.29/hour** for a one-GPU SXM4 instance. The cheapest selected A100 80 GB rate remains **Hyperstack at $1.35/GPU-hour** for a PCIe VM. Those are different memory capacities and different hardware configurations, so neither number is an honest substitute for the other.

Verda, formerly DataCrunch, is the useful new addition because it publishes two clear one-GPU configurations: **A100 40 GB SXM4 at $1.29/hour** and **A100 80 GB SXM4 at $1.79/hour**. Both include a fixed CPU and RAM allocation. Storage is separate, and shutting down the instance does not stop compute billing; the instance has to be deleted.

This guide uses the same provider data behind [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/), but preserves product shape and source-check dates so a low number is not mistaken for a like-for-like deployment offer.

> **Latest provider verification:** August 15, 2026<br>
> **Full-table baseline:** August 6, 2026, with bounded additions verified August 12–15<br>
> **Currency:** public USD list rates before tax<br>
> **Comparison unit:** one listed GPU-hour or its per-second/per-minute equivalent<br>
> **Boundary:** public rates do not prove stock, quota, regional access, or equivalent performance

## A100 40 GB prices

A100 40 GB is its own capacity class. The table should not be combined with 80 GB offers when the deployment needs more than 40 GB for weights, KV cache, batching, and runtime overhead.

| Provider and product | Configuration | Public rate | 720-hour estimate | Official evidence and check date |
|---|---|---:|---:|---|
| **Verda GPU instance** | 1x A100 40 GB SXM4; 22 CPU and 120 GB RAM included | **$1.29/hr** | **$928.80** | [Verda pricing](https://verda.com/pricing), checked Aug. 15, 2026 |
| **Lambda Cloud VM** | 1x A100 PCIe or SXM, 40 GB | **$1.99/GPU-hr** | **$1,432.80** | [Lambda GPU instances](https://lambda.ai/instances), checked Aug. 6, 2026 |
| **Modal container** | A100 40 GB | **$0.000583/sec** (**$2.0988/hr**) | **$1,511.14** | [Modal pricing](https://modal.com/pricing), checked Aug. 6, 2026 |

The monthly figures are estimates calculated as published hourly-equivalent rate × 720 hours. Modal retains its native per-second input before rounding. They exclude storage, networking, taxes, support, extra replicas, and other infrastructure.

## A100 80 GB prices

A100 80 GB gives a deployment twice the device memory, but the products below still vary substantially: PCIe and SXM hardware, VMs, Pods, containers, serverless workers, and managed deployments are not interchangeable.

| Provider and product | Configuration or access boundary | Public rate | 720-hour estimate | Official evidence and check date |
|---|---|---:|---:|---|
| **Hyperstack VM** | 1x A100 80 GB PCIe; Canada | **$1.35/GPU-hr** | **$972.00** | [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing), checked Aug. 13, 2026 |
| **RunPod Secure Cloud Pod** | A100 80 GB PCIe | **$1.39/hr** | **$1,000.80** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 6, 2026 |
| **Novita AI instance** | 1x A100 80 GB SXM; zero inventory observed at check time | **$1.60/GPU-hr** | **$1,152.00** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), checked Aug. 14, 2026 |
| **Verda GPU instance** | 1x A100 80 GB SXM4; 22 CPU and 120 GB RAM included | **$1.79/hr** | **$1,288.80** | [Verda pricing](https://verda.com/pricing), checked Aug. 15, 2026 |
| **Modal container** | A100 80 GB | **$0.000694/sec** (**$2.4984/hr**) | **$1,798.85** | [Modal pricing](https://modal.com/pricing), checked Aug. 6, 2026 |
| **CoreWeave Inference** | A100 80 GB; inference-platform customers | **$2.70/GPU-hr** | **$1,944.00** | [CoreWeave pricing](https://www.coreweave.com/pricing), checked Aug. 12, 2026 |
| **RunPod Serverless** | A100 80 GB worker tier | **$2.72/hr** | **$1,958.40** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 6, 2026 |
| **Baseten deployment** | A100 80 GiB managed deployment | **$0.06667/min** (**$4.0002/hr**) | **$2,880.14** | [Baseten pricing](https://www.baseten.co/pricing/), checked Aug. 6, 2026 |
| **Replicate private deployment** | A100 80 GB managed deployment | **$0.001400/sec** (**$5.04/hr**) | **$3,628.80** | [Replicate pricing](https://replicate.com/pricing), checked Aug. 6, 2026 |

This is a comparison of **12 public rates across the two memory tiers**, not 12 equivalent rental offers. Hyperstack, RunPod Pods, Verda, Lambda, and Novita expose self-managed instance or Pod shapes. Modal and RunPod Serverless expose allocation-oriented containers or workers. Baseten and Replicate sell managed deployment products. CoreWeave's single-GPU inference price has an account-eligibility condition.

Novita's 720-hour figure remains in the table even though public inventory showed zero units on August 14. It is the arithmetic implied by a catalog price, not a claim that a buyer could actually purchase 720 hours.

## What Verda changes

### It creates a new low for 40 GB, not a universal A100 winner

Verda's **$1.29/hour A100 40 GB SXM4** is 70 cents below Lambda's $1.99 one-GPU 40 GB rate in this public check. Over 720 allocated hours, the simple difference is **$504**. That is an estimate derived from `$0.70 × 720`; it is not a promise about the final invoices or relative performance.

The more important boundary is memory. A deployment that requires 80 GB cannot save $504 by selecting a 40 GB card that does not fit. For memory-heavy open-weight inference, [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains how weights, quantization, KV cache, and runtime headroom affect the capacity decision. It is a sizing guide, not a throughput benchmark.

At 80 GB, Verda's **$1.79/hour** rate does not beat Hyperstack's $1.35 PCIe rate, RunPod Secure Cloud's $1.39 PCIe rate, or Novita's $1.60 catalog rate. Verda is an SXM4 configuration, however, while Hyperstack and the selected RunPod row are PCIe. Buyers who need an exact interconnect or topology should compare the hardware configuration before the price order.

### The displayed rate includes CPU and RAM

Verda's official pricing table couples each GPU rate to a fixed one-GPU configuration. Both A100 rows include **22 CPU and 120 GB RAM**, so HostFleet does not add separate CPU or RAM charges to the $1.29 and $1.79 compute rates.

Persistent resources are a different line item. Verda lists NVMe block storage, NVMe shared filesystem, and container-registry storage at **$0.20/GiB-month**, checked August 15, 2026. That means 100 GiB retained for a full billing month is a simple **$20 storage estimate**, before any other charges. The official pages checked did not publish a network transfer price or included transfer allowance, so this guide does not assume egress is free.

### Shutdown is not the off switch

Verda's Cloud Console billing is prepaid in 10-minute increments. Its billing documentation says unused time is refunded in the next billing period when a resource is terminated before the billed interval ends. The key lifecycle catch is separate: **shutting down an instance does not stop billing**. Verda says the instance must be deleted to stop the compute charge, and retained storage continues billing.

For a test deployment, the safe cost-control procedure is therefore to record the exact deletion step, verify that the instance disappears from billable resources, and separately decide which volumes or registry data must remain. Treating an operating-system shutdown as the end of the meter can erase the apparent hourly-price advantage.

## What 720-hour math can and cannot tell you

A 30-day planning month contains **720 hours**. Multiplying a rate by 720 is appropriate when one listed product remains allocated continuously. It gives a useful warm-capacity floor, but it does not predict a complete bill.

The estimate assumes:

- one GPU product is allocated for all 720 hours;
- no second replica, failed replacement, or overlapping rollout is billed;
- the published rate remains unchanged; and
- all excluded resources are added separately.

It excludes persistent storage, network transfer where charged, public IPs, support, taxes, commitments, regional premiums, and operational overhead. It also does not account for a product being unavailable to the account.

A bursty workload should use actual billable allocation instead. Startup, image pulls, model loading, minimum billing intervals, retries, idle windows, and scale-down behavior all affect that number. [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) shows the assumptions behind always-warm, 10% allocation, and 1% allocation scenarios.

## Choose the operating surface after memory

Once the deployment's memory floor is fixed, sort the providers by how much of the serving stack they replace.

1. **Self-managed and continuously allocated:** Verda, Hyperstack, RunPod Pods, and Lambda put more infrastructure responsibility on the buyer. Compare images, root and persistent storage, network scope, stock, regions, quota, and the exact action that stops billing.
2. **Bursty container or worker:** Modal and RunPod Serverless can align the bill more closely with allocation, but only if the workload releases the GPU. Model-load time and minimum warm capacity can dominate low-duty-cycle estimates.
3. **Managed serving:** Baseten, Replicate, and eligible CoreWeave offerings charge for a more opinionated deployment surface. Compare autoscaling, rollout controls, observability, and operational work removed rather than treating the hourly equivalent as a bare GPU card.
4. **Catalog-only capacity:** a visible price is valid market evidence, but it should not enter a launch plan until the exact GPU, region, quota, and stock are available to the account.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion when the choice is between worker and managed-deployment products. [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains why Pod and Serverless rates need different allocation and storage assumptions.

## A practical A100 buying checklist

1. **Set the memory floor.** Remove all 40 GB rows if weights plus runtime headroom require 80 GB.
2. **Confirm the exact hardware.** Record PCIe versus SXM, topology, region, and smallest deployable GPU count.
3. **Prove capacity.** Verify account eligibility, quota, and live inventory. A public rate proves price, not availability.
4. **Test the off switch.** Document whether stop, shutdown, scale-to-zero, hibernate, or delete actually ends compute billing.
5. **Price retained resources.** Add storage, public IPs, network transfer, support, taxes, and replicas.
6. **Run a bounded deployment test.** Measure time-to-ready, model loading, allocation failures, billed duration, and deletion behavior before production traffic.

## Verdict

**For A100 40 GB, Verda is the new public-rate leader in this check at $1.29/hour.** The transparent 720-hour compute estimate is **$928.80**, with 22 CPU and 120 GB RAM included. Storage is separate, shutdown does not stop billing, and public pricing does not guarantee capacity.

**For A100 80 GB, Hyperstack remains the selected public-rate leader at $1.35/GPU-hour**, or **$972 for 720 allocated hours** before excluded resources. RunPod Secure Cloud follows at $1.39/hour. Verda's $1.79/hour offer is not the cheapest 80 GB row, but it adds a clearly specified one-GPU SXM4 option with CPU and RAM included.

The honest buying order is required memory, exact hardware, deployable product shape, live eligibility, billing lifecycle, and then hourly price. A $1.29 A100 is only cheaper if 40 GB actually fits and the operator knows how to stop the meter.

## Sources

- [Verda GPU instance pricing](https://verda.com/pricing) — A100 40 GB and 80 GB instance rates, fixed CPU/RAM configurations, reserved and spot boundaries, and storage prices; checked August 15, 2026
- [Verda pricing and billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing/) — pay-as-you-go 10-minute billing increments and unused-time refund behavior; checked August 15, 2026
- [Verda shutdown, hibernate, and delete documentation](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — shutdown, deletion, and retained-storage billing behavior; checked August 15, 2026
- [Verda company page](https://verda.com/company) — DataCrunch-to-Verda identity; checked August 15, 2026
- [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) — A100 80 GB PCIe rate; checked August 13, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pod and Serverless A100 rates; checked August 6, 2026
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products) — A100 price and observed inventory; checked August 14, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — one-GPU A100 40 GB VM rate; checked August 6, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; checked August 6, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — A100 single-GPU inference rate and eligibility boundary; checked August 12, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — A100 80 GiB per-minute managed-deployment rate; checked August 6, 2026
- [Replicate pricing](https://replicate.com/pricing) — private A100 80 GB per-second deployment rate; checked August 6, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, full-table baseline August 6 with provider additions verified August 12–15, 2026
- HostFleet verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-15-verda-datacrunch-gpu-pricing.md`

*Need a self-managed A100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: <a href="https://hostfleet.net/go/runpod" rel="sponsored nofollow">RunPod (+$5 credit on your first $10)</a>. Links are labeled, and source citations in this article are never affiliate links.*
