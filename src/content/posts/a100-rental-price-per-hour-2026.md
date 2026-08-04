---
title: "A100 rental price per hour: August 2026 source check for 40 GB and 80 GB GPUs"
description: "A source-checked August 2026 comparison of A100 rental prices, separating 40 GB and 80 GB cards, product scope, and the cost of keeping capacity warm."
pubDate: 2026-07-31
updatedDate: 2026-08-04
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source check:** August 3, 2026
**What this is:** a source-backed rate comparison, not a benchmark, capacity report, or inventory guarantee

# A100 rental price per hour: August 2026 source check for 40 GB and 80 GB GPUs

An A100 rental can start at **$1.39 per GPU-hour** in HostFleet's currently verified 80 GB comparison, but that number is only useful if the workload needs an 80 GB card and the buyer can operate a dedicated Pod. A 40 GB A100 is a different capacity class, while serverless and managed rows are different products even when the GPU name matches.

This update uses the public-rate evidence rechecked on August 3 for RunPod, Modal, Baseten, Replicate, and Lambda Cloud. The table deliberately excludes Fal: its public pricing page returned a security checkpoint during that check, so there is no newly verified A100 Fal rate to present. For the full cross-GPU reference, see [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

## The A100 rates that can be compared honestly

All amounts are published USD listed-product rates per GPU-hour. Per-second and per-minute rates are converted exactly by multiplying by 3,600 or 60. A rate is not an availability promise, and it does not make the surrounding CPU, RAM, storage, networking, support, or deployment controls identical.

| Provider and product shape | A100 configuration | Published rate | Why the scope matters |
|---|---|---:|---|
| **RunPod Pods** | A100 PCIe, 80 GB, Secure Cloud dedicated Pod | **$1.39/hr** | Always-on, self-managed container-shaped machine |
| **Lambda Cloud** | 1x A100 PCIe or SXM VM, 40 GB | **$1.99/GPU-hr** | Conventional GPU VM; published 1x-instance rate |
| **Modal** | A100, 40 GB serverless container | **$2.0988/hr** ($0.000583/sec) | Billed per second; can scale down if the app actually becomes idle |
| **Modal** | A100, 80 GB serverless container | **$2.4984/hr** ($0.000694/sec) | Same billing model, but double the VRAM of the 40 GB row |
| **RunPod Serverless** | A100, 80 GB worker tier | **$2.72/hr** | Worker-capacity tier rather than a named dedicated card reservation |
| **Baseten** | A100, 80 GiB managed dedicated deployment | **$4.00/hr** ($0.06667/min) | Managed model-serving product, not a raw VM |
| **Replicate** | A100, 80 GB private model deployment | **$5.04/hr** ($0.001400/sec) | Managed private deployment with platform-specific controls |

The lowest row is **not** a universal A100 market floor. RunPod also lists a $1.19/hour Community Cloud A100 PCIe rate, but the table uses its $1.39/hour Secure Cloud rate. Community Cloud and Secure Cloud have different operating and availability tradeoffs, so calling the lower Community number the default price would collapse two products into one.

## First decision: is 40 GB enough?

The A100 label hides the biggest pricing trap in this category: **40 GB and 80 GB are not substitute capacity choices**. Lambda's 1x A100 VM and Modal's 40 GB A100 are valid options when the model, batch size, and runtime headroom fit within 40 GB. They are not a cheaper way to satisfy an 80 GB requirement.

For example, HostFleet's [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why an 80 GB-class GPU is the first normal single-card capacity point for 8-bit Llama 70B weights, while BF16/FP16 requires substantially more memory or multiple GPUs. That is a memory-capacity statement, not a throughput claim. Quantization, context length, KV cache, concurrency, and framework overhead still decide whether a deployment fits.

Once 80 GB is required, the relevant low-rate comparison begins with the **$1.39/hour RunPod Secure Cloud A100 PCIe Pod**, not with the 40 GB rows. If 40 GB really is sufficient, Lambda's $1.99/GPU-hour VM and Modal's $2.0988/hour serverless container are different operating-model choices rather than merely a $0.11/hour spread.

## Second decision: do you need capacity warm?

The rate card becomes a budget only after the allocation pattern is clear. These figures are **estimates**, derived from the sourced rates, for one listed product held for 720 hours (30 days):

```text
monthly listed-product estimate = published hourly rate × 720 hours
```

| Product shape | Rate used | 720-hour estimate |
|---|---:|---:|
| RunPod Secure Cloud A100 PCIe, 80 GB | $1.39/hr | about **$1,001** |
| Lambda 1x A100, 40 GB | $1.99/hr | about **$1,433** |
| Modal A100, 40 GB | $0.000583/sec | about **$1,511** |
| Modal A100, 80 GB | $0.000694/sec | about **$1,799** |
| RunPod Serverless A100 tier | $2.72/hr | about **$1,958** |
| Baseten A100, 80 GiB | $4.00/hr | about **$2,880** |
| Replicate private A100, 80 GB | $5.04/hr | about **$3,629** |

The two Modal calculations use the unrounded public rates: `$0.000583 × 3,600 × 720 = $1,511.14` and `$0.000694 × 3,600 × 720 = $1,798.85`. Every other row uses the displayed hourly rate multiplied by 720 and rounded to the nearest dollar. These are listed-product estimates, not quotes. They exclude separately billed add-ons, taxes, extra replicas, and the effect of scaling.

A workload that truly returns to zero should not be budgeted with 720-hour math. Model it from expected billable GPU-seconds, cold-start behavior, and the time a minimum replica remains allocated. [RunPod Pods versus Serverless pricing](https://hostfleet.net/runpod-pricing-guide-2026/) explains why a lower dedicated hourly rate can still be the wrong purchase for a bursty workload.

## What each price buys

### RunPod: lowest verified dedicated 80 GB rate, with operations attached

RunPod's $1.39/hour Secure Cloud A100 PCIe is the lowest verified **80 GB dedicated** rate in this comparison. It is a useful starting point when a team wants a continuously available GPU and owns the container image, serving process, networking, monitoring, security posture, and shutdown discipline. The bill continues while the Pod runs.

That is a clear trade, not a flaw. It is often cheaper than a managed serving layer precisely because the operator is taking on more of the system. Read [RunPod for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) for the deployment-shape tradeoff before selecting it only on price.

### Lambda: a conventional 40 GB GPU VM rate

Lambda's $1.99/GPU-hour row is the listed rate for a 1x A100 PCIe or SXM 40 GB instance. The number covers an instance-shaped product rather than a bare-card abstraction. That can be a better fit for operators who want VM control, but it means CPU, RAM, local storage, region, instance count, and capacity must be checked alongside the headline GPU rate.

The August source check does not establish a quota, queue-time, or availability guarantee. It only confirms the public 1x A100 listed rate.

### Modal and RunPod Serverless: the right question is allocated seconds

Modal publishes distinct 40 GB and 80 GB A100 rates, while RunPod Serverless publishes an 80 GB A100 worker tier. Both can be sensible for batch jobs or endpoints that really release GPU capacity between work. The practical test is whether the workload can tolerate cold starts and whether its idle period is long enough to avoid paying warm capacity.

A permanently warm Modal 80 GB A100 has a GPU-only 720-hour estimate of about $1,799—higher than the RunPod Pod example. The serverless label changes the billing opportunity; it does not erase the cost of an allocated GPU. For a wider billing-model comparison, use [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

### Baseten and Replicate: higher rate, different serving surface

Baseten's $4.00/hour A100 80 GiB and Replicate's $5.04/hour private A100 80 GB are managed deployment products. Their price should be evaluated against the platform work they remove—model serving, deployment workflow, scaling controls, and operational support—not against a Pod as if the products were equivalent.

For the billing details that change those tradeoffs, see [Baseten pricing explained](https://hostfleet.net/baseten-pricing-guide-2026/) and [Replicate pricing explained](https://hostfleet.net/replicate-pricing-guide-2026/).

## A practical A100 selection sequence

1. **Set the memory floor first.** Establish whether the deployed model, KV cache, batch size, and expected concurrency fit inside 40 GB. If not, remove 40 GB rows before looking at price.
2. **Decide whether the GPU must stay warm.** A permanently available endpoint is a capacity purchase. A queueable batch job may be a billable-seconds purchase.
3. **Compare like product shapes.** Compare a self-managed Pod with a VM when both satisfy the operating requirements; compare managed deployment platforms when the serving layer is in scope.
4. **Check the missing bill components.** Validate storage, network, CPU/RAM, minimum replicas, region, quota, tax, and any committed-use terms before treating the rate as a final budget.
5. **Run a bounded deployment test.** Record image pull, model-load time, first-ready time, cold-start behavior, allocation failures, and billed duration. Published rates are evidence about price, not proof of workload performance.

## Verdict

For a continuously allocated **80 GB A100** where the team can operate its own endpoint, RunPod Secure Cloud's **$1.39/hour A100 PCIe** is the lowest currently verified dedicated rate in this comparison. It is not the right choice solely because it is cheap: it transfers operational responsibility to the buyer.

For a 40 GB workload, Lambda and Modal expose lower-capacity options with different control planes. For bursty work, serverless pricing can win only if allocation really drops between jobs. For managed serving, Baseten and Replicate are more expensive per listed GPU-hour because the product includes a different operational surface.

The reliable way to compare an A100 rental is therefore: memory class first, warm-versus-bursty behavior second, provider rate third. A GPU name alone is not enough.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — A100 PCIe Secure and Community Cloud, and Serverless A100 rates; source-checked August 3, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; source-checked August 3, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x A100 PCIe/SXM 40 GB rate; source-checked August 3, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — A100 80 GiB per-minute deployment rate; source-checked August 3, 2026
- [Replicate pricing](https://replicate.com/pricing) — private A100 80 GB per-second deployment rate; source-checked August 3, 2026
- [Fal pricing](https://fal.ai/pricing) — access checkpoint observed August 3, 2026; excluded from current A100 rate claims
- HostFleet GPU pricing data — `/opt/hostbot-v2/src/data/gpu-pricing.json`; table values cross-checked against the August 3 source-check note

*Need a self-managed A100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
