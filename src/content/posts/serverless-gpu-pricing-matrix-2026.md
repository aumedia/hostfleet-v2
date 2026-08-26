---
title: "Serverless GPU pricing in 2026: H100 rates and the costs hiding behind them"
description: "Compare eight H100 serverless and managed deployment rates, including Koyeb and Northflank, without confusing GPU components, instances, and inference platforms."
pubDate: 2026-04-21
updatedDate: 2026-08-26
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card comparison; estimated usage totals.** The Koyeb prices in this refresh were checked against its official pricing and instance-reference pages on **August 25, 2026**. Northflank's prices and cost components were checked on **August 26, 2026**. The other selected H100 rates were rechecked against official provider pricing pages on **August 23, 2026**. This is not a capacity, cold-start, latency, throughput, reliability, or availability benchmark.

# Serverless GPU pricing in 2026: H100 rates and the costs hiding behind them

The cheapest selected H100 headline in this serverless and managed-deployment comparison is **Koyeb at $2.50/hour**. Northflank follows at **$2.74 per GPU-hour**. Those two numbers look almost interchangeable, but they describe different cost boundaries: Koyeb's one-GPU instance price includes a fixed CPU, RAM, and disk bundle, while Northflank's number is only the GPU component.

That is the central problem with serverless GPU pricing. Per-second billing, autoscaling, and a serverless label do not prove that two products include the same resources or return to zero under the same conditions. A managed model deployment can also cost more per GPU-hour while removing work that an operator would otherwise have to build.

HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) is generated from `gpu-pricing.json` and currently exposes **21 provider columns**. Its top-level full-table verification date remains August 13 because later additions were checked provider by provider: Koyeb on August 25 and Northflank on August 26. This article narrows that larger dataset to eight H100 deployment products whose public rates can be compared only after their product boundaries are made explicit.

> **Currency:** public USD list rates before tax  
> **Comparison unit:** one published H100 rate or its hourly equivalent  
> **Usage examples:** eight billable GPU-hours and 720 billable hours  
> **Boundary:** a listed rate does not prove inventory, quota, regional access, approval, equal hardware topology, or equal performance

## Selected H100 serverless and managed deployment rates

Per-second rates are multiplied by 3,600 and per-minute rates by 60. The table uses public list pricing rather than commitments or negotiated discounts. The product-boundary column matters as much as the number.

| Provider and product | Native public rate | Hourly equivalent | What the price includes or excludes | Official source and check date |
|---|---:|---:|---|---|
| **Koyeb H100 instance** | $2.50/hr | **$2.50/hr** | One H100 80 GB instance with 15 vCPU, 180 GB RAM, and 320 GB disk; GPU availability is region-specific | [Koyeb pricing](https://www.koyeb.com/pricing) and [instance reference](https://www.koyeb.com/docs/reference/instances), Aug. 25, 2026 |
| **Northflank managed-cloud GPU** | $2.74/GPU-hr | **$2.74/GPU-hr plus CPU and memory** | GPU component only; vCPU, RAM, persistent disk, and egress are separate | [Northflank pricing](https://northflank.com/pricing) and [GPU deployment docs](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md), Aug. 26, 2026 |
| **Modal H100 container** | $0.001097/sec | **$3.9492/hr** | GPU allocation; CPU, memory, storage, and other resources are separately metered | [Modal pricing](https://modal.com/pricing), Aug. 23, 2026 |
| **Fal custom deployment** | $4.50/hr list | **$4.50/hr** | Custom-deployment list rate; lower committed-use figures are excluded | [Fal pricing](https://fal.ai/pricing), Aug. 23, 2026 |
| **RunPod Serverless H100 PRO** | $4.79/hr | **$4.79/hr** | Serverless Flex worker tier; it is not a reserved exact-card VM quote | [RunPod pricing](https://www.runpod.io/pricing), Aug. 23, 2026 |
| **Replicate private deployment** | $0.001525/sec | **$5.49/hr** | Managed private model deployment rather than a bare GPU VM | [Replicate pricing](https://replicate.com/pricing), Aug. 23, 2026 |
| **CoreWeave Inference** | $6.16/GPU-hr | **$6.16/GPU-hr** | Single-GPU inference rate for inference-platform customers; account-executive access applies | [CoreWeave pricing](https://www.coreweave.com/pricing), Aug. 23, 2026 |
| **Baseten H100 deployment** | $0.10833/min | **$6.4998/hr** | Managed dedicated deployment rate, normalized from the public per-minute figure | [Baseten pricing](https://www.baseten.co/pricing/), Aug. 23, 2026 |

The selected range is **$2.50 to $6.4998 per listed H100 hour**. That spread is real, but it is not a ranking of equivalent machines. Koyeb publishes a bundled application instance. Northflank publishes a GPU component. Modal separately meters surrounding resources. Replicate and Baseten sell managed deployment surfaces. CoreWeave's selected rate has an inference-platform eligibility boundary.

For a broader card-level comparison that also includes allocated Pods and GPU VMs, use the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/).

## What eight billable hours and a warm month would cost

The calculations below are estimates, not provider quotes. The short-run column assumes exactly eight billable hours at the public rate. The warm-month column assumes the product remains billable for all **720 hours** of a 30-day planning month. It does not assume that every product should be run that way.

| Product | Eight billable hours | 720 billable hours | Important exclusion |
|---|---:|---:|---|
| Koyeb H100 instance | **$20.00** | **$1,800.00** | Availability, tax, overages, and any separate services |
| Northflank H100 GPU component | **$21.92** | **$1,972.80** | CPU, memory, persistent disk, and egress |
| Modal H100 container | **$31.59** | **$2,843.42** | CPU, memory, storage, and non-GPU meters |
| Fal H100 custom deployment | **$36.00** | **$3,240.00** | Other product charges and any commitment terms |
| RunPod Serverless H100 PRO | **$38.32** | **$3,448.80** | Storage, network, and workload-specific worker behavior |
| Replicate H100 private deployment | **$43.92** | **$3,952.80** | Other managed-product charges |
| CoreWeave Inference H100 | **$49.28** | **$4,435.20** | Eligibility and surrounding platform costs |
| Baseten H100 deployment | **$52.00** | **$4,679.86** | Other deployment and resource charges |

Each estimate uses the sourced rate in the first table. Modal is `$0.001097 x 3,600 x hours`; Baseten is `$0.10833 x 60 x hours`; the remaining rows multiply the published hourly figure by 8 or 720. Totals are rounded to cents after calculation.

The Northflank row is deliberately labeled as incomplete. Its official pricing page lists CPU at **$0.01667 per vCPU-hour**, memory at **$0.00833 per GB-hour**, persistent disk at **$0.15 per GB-month**, and ordinary egress at **$0.06 per GB**, all checked August 26, 2026 on [Northflank pricing](https://northflank.com/pricing). Northflank does not prescribe one minimum CPU and RAM plan for each GPU, so inventing a representative all-in H100 total would create false precision.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) is the better tool once you know billable duration, idle behavior, and retained resources. A 720-hour multiplication is useful for exposing the cost of continuous allocation; it is the wrong forecast for a workload that reliably releases capacity between jobs.

## Koyeb: a low all-in headline, but serverless does not mean proven scale-to-zero

Koyeb's official pricing page lists one H100 instance at **$2.50/hour** with 15 vCPU, 180 GB RAM, and 320 GB disk. Its instance-reference page independently agrees on the hourly price. Both sources were checked August 25, 2026. The reference says GPU types are limited to specific regions.

Koyeb positions the product as serverless compute and supports autoscaling. That is useful, but the checked public sources do not establish a GPU scale-to-zero guarantee, cold-start time, current inventory, quota, or provisioning time. A buyer should therefore separate three questions:

1. Can the service change replica count automatically?
2. Can the GPU deployment reach zero billable instances for this configuration?
3. How long does it take to become ready again, including image pull and model load?

Only the first is established by the checked public material. Do not forecast zero idle cost until the second and third are tested on the actual account and workload.

Koyeb's pricing and instance-reference pages also disagree about CPU and RAM allocations for its L4, RTX A6000, and L40S products. They agree on the selected H100 price and resources, so the contradiction does not change this H100 row. It is still a warning that product configuration should be captured beside every price rather than inferred from a provider name.

## Northflank: low GPU component, incomplete instance total

Northflank's **$2.74/GPU-hour** H100 figure is not an all-in workload price. Its managed-cloud deployment requires a separately configured CPU and memory plan. The platform bills GPU use by the second once provisioned, and the official docs say a managed-cloud GPU project requires at least **$50 in account credit**. These terms were checked August 26, 2026 on [Northflank's pricing page](https://northflank.com/pricing) and [managed-cloud GPU documentation](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md).

The honest formula is:

    all-in compute rate = GPU component + vCPU component + memory component

Persistent disk and egress remain separate. Northflank lets users choose one, two, four, or eight GPUs, and model availability varies by region. Its managed-cloud GPUs do not currently support timeslicing. None of those public statements proves live stock, allocation latency, quota, or scale-to-zero.

This is why sorting a multi-provider table by the displayed GPU number alone can produce a false winner. Northflank may be economical for a workload with a lean CPU and RAM plan, but the actual result cannot be known until those components are specified.

## Per-second billing is not the same as paying only for inference

Per-second pricing removes coarse hourly rounding. It does not automatically remove initialization, model loading, retries, idle timeout, warm replicas, or minimum capacity from the bill.

Use this billable-time model:

    billable time = startup + model load + request work + idle window + retries + teardown delay

The request itself may occupy only a fraction of that interval. A platform can still be the right choice when the managed surface reduces engineering and operational work, but the justification should be based on the whole deployment rather than a normalized GPU-hour alone.

Modal is the clearest example of transparent per-second metering in this set. Its H100 rate was **$0.001097/second**, or **$3.9492/hour**, when rechecked August 23, 2026 on [Modal pricing](https://modal.com/pricing). CPU and memory remain separate meters. [HostFleet's Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) shows how to keep those inputs visible instead of treating the GPU conversion as a finished invoice.

RunPod exposes a different choice inside one provider. Pods are allocated infrastructure, while Serverless bills worker activity. The H100 Serverless PRO Flex rate was **$4.79/hour** when rechecked August 23, 2026; an allocated Secure Cloud H100 PCIe Pod was **$2.89/hour** on the same official [RunPod pricing page](https://www.runpod.io/pricing). The lower Pod rate wins only when enough paid capacity is used to justify keeping the Pod allocated and operating it. [HostFleet's RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers that break-even boundary.

## A practical selection order

Choose a deployment surface in this order:

1. **Fix the hardware requirement.** Record GPU model, VRAM, count, and any PCIe, SXM, or NVLink requirement. H100 is not one fungible configuration.
2. **Fix the product shape.** Decide whether you need an allocated VM or Pod, a serverless application instance, a worker runtime, or a managed model deployment.
3. **Reconstruct the all-in rate.** Add CPU, memory, storage, network, IP, support, and minimum-replica costs that the headline excludes.
4. **Measure billable lifecycle.** Capture provisioning, image pull, model load, idle timeout, retries, and teardown—not only request latency.
5. **Test release behavior.** Verify the exact action that returns the deployment to zero GPU compute cost and what data or capacity is lost.
6. **Check access before migration.** Confirm account approval, quota, region, and current capacity before moving the workload.
7. **Model failure time.** Calculate what happens if scale-down, teardown, or a scheduler fails for a day or a week.

Credits should be applied after the base workload estimate, not used to hide it. The [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) separates a promotional balance from GPU access, quota, and recurring economics.

## Verdict

Koyeb has the lowest selected all-in H100 headline at **$2.50/hour**, checked August 25, 2026. Northflank's **$2.74/GPU-hour** looks close, but it excludes CPU and memory and therefore cannot be ranked as a complete instance total. Modal, Fal, RunPod Serverless, Replicate, CoreWeave Inference, and Baseten occupy progressively more managed or product-specific deployment surfaces, so their higher normalized rates should not be read as bare-card rental quotes.

For a bursty workload, the winning product is the one that actually releases capacity, starts within the application's tolerance, and exposes a predictable all-in bill. For a continuously busy endpoint, an allocated Pod or VM can be cheaper per hour, provided the team can operate it and keep utilization high.

The honest comparison is not serverless versus serverless. It is **one billable lifecycle versus another**.

## Sources

All prices and product claims retain the check dates stated in the article.

- [Koyeb pricing](https://www.koyeb.com/pricing) and [GPU instance reference](https://www.koyeb.com/docs/reference/instances) — H100 price, included resources, billing, autoscaling positioning, and regional availability; checked August 25, 2026
- [Northflank pricing](https://northflank.com/pricing) — GPU, CPU, memory, disk, and egress component prices; checked August 26, 2026
- [Northflank managed-cloud GPU deployment documentation](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md) — billing start, GPU counts, credit requirement, regional variation, and timeslicing boundary; checked August 26, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate and surrounding resource meters; rechecked August 23, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment list rate and commitment boundary; rechecked August 23, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — H100 Serverless and Secure Cloud Pod rates; rechecked August 23, 2026
- [Replicate pricing](https://replicate.com/pricing) — private-deployment H100 rate; rechecked August 23, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — inference single-GPU rate and eligibility boundary; rechecked August 23, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 per-minute dedicated-deployment rate; rechecked August 23, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`
- HostFleet provider notes — `/opt/hostbot/data/ai-hosting/notes/2026-08-10-gpu-pricing-full-verification.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-12-coreweave-gpu-pricing.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-25-koyeb-gpu-pricing.md`, and `/opt/hostbot/data/ai-hosting/notes/2026-08-26-northflank-gpu-pricing.md`

*Need a continuously allocated GPU Pod after comparing the lifecycle? This is a labeled affiliate link; every source above remains direct: [RunPod signup with $5 credit after the first $10 spend (affiliate)](https://hostfleet.net/go/runpod). Confirm the exact GPU, cloud tier, region, storage, and current rate before purchase.*
