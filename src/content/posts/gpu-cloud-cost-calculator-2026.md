---
title: "GPU cloud cost calculator (2026): warm endpoint vs 1%-utilization job"
description: "A source-backed GPU cloud cost calculator refresh: use the same public H100 rate to model an always-warm endpoint, a 10% duty-cycle worker, and a genuinely bursty 1% job."
pubDate: 2026-08-09
updatedDate: 2026-08-11
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed inputs; estimated totals.** The published rates in this refresh were checked against provider pricing pages on **August 10, 2026**. The cost figures below are transparent arithmetic, not benchmarks, capacity guarantees, or invoice predictions.

# GPU cloud cost calculator: warm endpoint vs 1%-utilization job

The most expensive mistake in GPU cost planning is not choosing the wrong hourly rate. It is applying the right rate to the wrong amount of billable time.

An H100 that is allocated all month and a job that needs an H100 for a few minutes per run can carry the same published hourly-equivalent price while producing radically different bills. A serverless label does not automatically make the second case cheap: the worker must actually release capacity between jobs, and startup, model loading, retries, and minimums can all add billed time.

This is a source-backed refresh rather than a benchmark. It uses the August 10 public-rate check behind [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/) to show the planning question that matters: **how many GPU-hours are truly allocated?** It does not claim that any GPU is in stock, that products have equal throughput, or that a workload will meet a particular latency target.

> **Rate-input date:** August 10, 2026<br>
> **Currency:** USD public list rates<br>
> **Scope:** GPU compute only unless a named product bundles other resources

## Start with allocated time, not calendar time

Use one of two models.

### Always-warm capacity

Use this for a Pod or VM that remains on, a managed endpoint with a fixed warm replica, or any worker deliberately kept alive.

```text
monthly capacity estimate = hourly-equivalent GPU rate × allocated hours
```

A 30-day planning month has **720 hours**. For one H100 held warm continuously, multiplying the rate by 720 is the appropriate first estimate—even if the endpoint receives little traffic.

### Bursty allocated time

Use this only when the service and workload genuinely return capacity to zero between pieces of work.

```text
bursty estimate = per-second GPU rate × total allocated GPU-seconds
```

Count the time the provider bills: image pull, startup, model loading, execution, retries, shutdown, and any configured idle window. User-visible request time alone is not a safe proxy. If the product bills by a smaller unit, retain that source rate instead of rounding it to an hourly number before doing arithmetic.

## The duty-cycle worksheet

The table applies three planning assumptions to five publicly listed H100 products. It is not a provider ranking: these are different deployment surfaces.

- **1% allocation:** 7.2 GPU-hours in a 30-day month
- **10% allocation:** 72 GPU-hours
- **100% allocation:** 720 GPU-hours (always warm)

| H100 product shape | Published rate used | 1% allocation estimate | 10% allocation estimate | Always-warm 30-day estimate |
|---|---:|---:|---:|---:|
| RunPod Secure Cloud PCIe Pod | $2.89/hr | $20.81 | $208.08 | $2,080.80 |
| Lambda 1x H100 PCIe VM | $3.29/GPU-hr | $23.69 | $236.88 | $2,368.80 |
| Modal H100 container | $0.001097/sec ($3.9492/hr) | $28.43 | $284.34 | $2,843.42 |
| Fal H100 custom deployment | $4.50/hr | $32.40 | $324.00 | $3,240.00 |
| Baseten H100 deployment | $0.10833/min ($6.4998/hr) | $46.80 | $467.99 | $4,679.86 |

Each estimate is published hourly-equivalent rate × 7.2, 72, or 720 hours. Modal's figures use its published per-second rate before rounding; Baseten's use its published per-minute rate before rounding. The H100 inputs were rechecked August 10: RunPod Secure Cloud PCIe **$2.89/hr**, Lambda 1x H100 PCIe **$3.29/GPU-hr**, Modal **$0.001097/sec**, Fal custom deployment **$4.50/hr**, and Baseten **$0.10833/min**.

The 1% and 10% columns are conditional planning estimates, not promises that each product will bill only that amount. A self-managed Pod or VM can only realize those lower allocation hours if it is stopped or released when idle. A managed endpoint may need minimum capacity or warm replicas. Verify the exact product's deployment and billing behavior before using a low-duty-cycle number in a budget.

For the hardware and product distinctions behind the rates, see [HostFleet's H100 rental-price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/). An H100 PCIe Pod, an H100 VM, and a managed H100 deployment should not be treated as identical because all are labeled “H100 80 GB.”

## A concrete bursty-job calculation

Assume a batch service allocates a Modal H100 for **10 minutes** per run and completes **100 runs** during a month. The transparent GPU-only estimate is:

```text
100 runs × 10 minutes × 60 seconds = 60,000 allocated GPU-seconds
60,000 × $0.001097/sec = $65.82
```

That $65.82 estimate depends on an explicit assumption: every run, including its billable setup and shutdown time, fits in ten minutes, and the H100 is released afterward. It excludes CPU, memory, storage, networking, and any work that occurs outside that ten-minute window. If the service instead keeps the container allocated continuously, the same published GPU rate produces the $2,843.42 always-warm estimate in the table.

[Modal's pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) explains why per-second billing alone does not guarantee low monthly cost. The useful input after launch is observed allocated time from the product's billing and runtime records—not request count multiplied by an optimistic latency target.

## Pick VRAM and product shape before using the worksheet

A low estimate is not useful if the selected GPU cannot hold the deployment. Keep **A100 40 GB** and **A100 80 GB** in separate planning rows; they are not equivalent capacity choices with different prices. [HostFleet's A100 price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) keeps those variants distinct.

For an open-weight model, the memory requirement also depends on model format, context length, concurrent requests, runtime overhead, and whether the full model stays resident on the GPU. Read [the Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before turning an 80 GB rate into a deployment recommendation.

The broader [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the companion rate card. It separates Pods, VMs, scale-to-zero workers, and managed deployment products so an hourly figure is not mistaken for a like-for-like offer.

## A worksheet that stays honest

Before approving a GPU budget, write down these inputs beside the calculation:

1. **Exact product and GPU variant.** Record the provider tier and VRAM, not only “H100.”
2. **Billing rule and source date.** Use the rate's native unit where possible and retain the official source URL. The figures here are as of August 10, 2026.
3. **Allocation assumption.** State whether the resource stays warm, has a fixed minimum, or can truly return to zero.
4. **Measured setup overhead.** Once a prototype exists, record image pull, model load, retry, and idle time instead of assuming only useful compute is billed.
5. **Excluded charges.** Track storage, network transfer, CPU/RAM, replicas, support, taxes, and any commitment separately. Do not hide unknown costs in a made-up GPU total.
6. **Allocation proof.** Check account limits, quota, region, and capacity before treating a rate-card result as deployable infrastructure.

Credits should sit outside the base calculation. First estimate the workload from the listed rate, then subtract only a credit whose plan, expiry, and GPU eligibility are confirmed. [HostFleet's GPU cloud credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) covers those account-level conditions; a promotional balance is not recurring unit economics.

## Verdict

For GPU cost planning, the honest first question is not “which H100 is cheapest?” It is **“will this GPU be allocated for 7.2, 72, or 720 hours?”**

Use the warm-capacity calculation for infrastructure that remains allocated. Use billable GPU-seconds for work that demonstrably scales down. The 1% and 10% examples are useful sensitivity checks, but they become real only after the product's allocation behavior is verified. Re-check the exact rate, variant, capacity controls, and add-ons before purchase.

If you need a self-managed GPU endpoint that stays allocated, RunPod's Secure Cloud PCIe H100 public list rate was **$2.89/hr** in the August 10 check, before excluded charges. Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud PCIe Pod public list rates; checked August 10, 2026
- [Modal pricing](https://modal.com/pricing) — published per-second GPU rates; checked August 10, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment public list rate and separately advertised committed-use rates; checked August 10, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — published dedicated-deployment per-minute GPU rates; checked August 10, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — 1x H100 PCIe VM public rate; checked August 10, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 10, 2026
- HostFleet verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-10-gpu-pricing-full-verification.md`
