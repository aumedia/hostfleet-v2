---
title: "Baseten pricing 2026: GPU rates, warm replicas, and the charges buyers miss"
description: "Baseten pricing explained with current GPU rates, warm-replica estimates, billable build and cold-start phases, autoscaling defaults, and budget limits."
pubDate: 2026-07-26
updatedDate: 2026-08-27
category: ai-hosting
author: Alex Harmon
draft: false
---

**Source-backed pricing guide; estimates are labeled.** This refresh uses Baseten's public pricing, resource, billing, autoscaling, request-lifecycle, and cold-start documentation checked on **August 27, 2026**. HostFleet did not benchmark performance, capacity, or cold-start latency. Read the [HostFleet methodology and affiliate policy](https://hostfleet.net/about/) for how sourced and measured claims are separated.

**Pricing verified:** August 27, 2026

# Baseten pricing 2026: GPU rates, warm replicas, and the charges buyers miss

Baseten bills dedicated inference by the minute, but "per minute" is not the same as "per request." A replica costs money while it starts, loads a model, serves traffic, or sits warm. Baseten's current billing documentation also says image-builder workloads are metered and partial minutes round up.

That makes the useful budgeting question: **how many replica-minutes will the whole deployment lifecycle consume?**

The August refresh adds three hardware choices that were missing from the earlier guide—fractional H100, H200, and RTX Pro 6000—and documents two cost controls that are easy to misread. A workspace budget sends alerts, but its enforcement switch does not stop dedicated deployments. Baseten's default maximum replica count is one, so a new deployment does not scale out until that ceiling is raised.

For a market-wide rate view, start with [the serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For the product workflow and operational fit rather than the bill, read [Baseten for AI inference APIs and jobs](https://hostfleet.net/baseten-for-ai-inference-apis-and-jobs/).

## Baseten pricing: the short answer

| Workload shape | Cost behavior | What to budget |
|---|---|---|
| Development deployment | Baseten documents development deployments as unbilled | Do not assume that makes every build free; image-builder workloads are separately listed as billable |
| Sporadic endpoint with minimum replicas at 0 | No GPU charge after it has scaled to zero | Billable starts, model loading, serving time, and the scale-down tail |
| Latency-sensitive endpoint with one warm replica | Replica rate runs continuously | One 720-hour monthly floor before traffic-driven replicas |
| Production layout following Baseten's recommendation of at least two minimum replicas | At least two replicas stay warm | Double the one-replica floor before scale-out |
| Multi-GPU or multi-node model | Every replica or node adds its instance minutes | Multiply the full instance rate by GPU count, node count, replicas, and runtime |

The practical rule is simple: **use replica-minutes for a sleeping deployment and 720-hour math for capacity you deliberately keep warm.**

## The six Baseten rates in HostFleet's live GPU dataset

The following dedicated-deployment rates come from HostFleet's live GPU pricing dataset and were rechecked against [Baseten's official pricing page](https://www.baseten.co/pricing/) on **August 27, 2026**. The per-hour figure is the published per-minute rate multiplied by 60. The monthly figure assumes one replica runs for 43,200 minutes, or 720 hours, in a 30-day month.

| Baseten GPU instance | VRAM | Published rate | Hourly equivalent | 100 replica-hours | One warm replica, 30 days |
|---|---:|---:|---:|---:|---:|
| T4 | 16 GiB | $0.01052/min | $0.63/hr | about $63 | about $454 |
| L4 | 24 GiB | $0.01414/min | $0.85/hr | about $85 | about $611 |
| A10G | 24 GiB | $0.02012/min | $1.21/hr | about $121 | about $869 |
| A100 | 80 GiB | $0.06667/min | $4.00/hr | about $400 | about $2,880 |
| H100 | 80 GiB | $0.10833/min | $6.50/hr | about $650 | about $4,680 |
| B200 | 180 GiB | $0.16633/min | $9.98/hr | about $998 | about $7,185 |

**Estimate assumptions:** one instance per replica; public list rate; 100 or 720 billable replica-hours; no traffic-driven scale-out; no negotiated discount; and no taxes. Totals are rate conversions, not Baseten quotes. Availability, quota, cold-start speed, and throughput were not tested.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) is useful for changing the allocation assumption. It does not replace replica accounting: two replicas running for 50 hours consume the same 100 replica-hours as one replica running for 100 hours.

## The expanded Baseten instance list changes the buying decision

Baseten's [resource reference](https://docs.baseten.co/deployment/resources) now exposes more one-GPU configurations than the six headline rates in HostFleet's cross-provider dataset. The following prices and resource allocations were checked on **August 27, 2026**. They are complete instance prices with the listed CPU and RAM, not bare GPU component rates.

| Exact Baseten instance | GPU allocation | vCPU / RAM | Published rate | Hourly equivalent | One warm replica, 30 days |
|---|---|---:|---:|---:|---:|
| T4x8x32 | 1× T4, 16 GiB VRAM | 8 / 32 GiB | $0.01504/min | $0.90/hr | about $650 |
| T4x16x64 | 1× T4, 16 GiB VRAM | 16 / 64 GiB | $0.02408/min | $1.44/hr | about $1,040 |
| A10Gx8x32 | 1× A10G, 24 GiB VRAM | 8 / 32 GiB | $0.02424/min | $1.45/hr | about $1,047 |
| A10Gx16x64 | 1× A10G, 24 GiB VRAM | 16 / 64 GiB | $0.03248/min | $1.95/hr | about $1,403 |
| H100MIG | Fractional H100, 40 GiB VRAM | 8 / 59 GiB | $0.06250/min | $3.75/hr | $2,700 |
| H200 | 1× H200, 141 GiB VRAM | 16 / 200 GiB | $0.12500/min | $7.50/hr | $5,400 |
| RTX-PRO-6000 | 1× RTX Pro 6000, 96 GiB VRAM | 16 / 116 GiB | $0.06667/min | $4.00/hr | about $2,880 |

These additions matter for more than completeness.

First, **GPU name does not determine the entire instance price**. Baseten offers T4 and A10G variants with more CPU and system memory. Choosing the accelerator field and broad resource constraints can map to a larger instance. Baseten says selecting an exact instance type is the way to make the SKU consistent.

Second, the fractional H100 is not a cheap full H100. Baseten describes H100MIG as 3/7 of the compute and half the memory, with 40 GiB VRAM. Its $3.75 hourly equivalent is below the full H100's $6.50, but the allocation is different.

Third, A100 and RTX Pro 6000 have the same listed per-minute rate in this snapshot while exposing 80 GiB and 96 GiB of VRAM respectively. That does **not** prove equal speed or make the RTX option universally better. It does mean memory fit should be checked before choosing on GPU-generation labels alone. The [VRAM guide for Llama 70B and other open models](https://hostfleet.net/what-gpu-to-run-llama-70b/) provides the sizing framework; it is not a Baseten performance benchmark.

## Exactly what Baseten bills

Baseten's [billing and usage documentation](https://docs.baseten.co/organization/billing) gives a more precise lifecycle map than the marketing phrase "only pay for the compute you use." The following behavior was checked on **August 27, 2026**.

| Lifecycle phase | Billed? | Cost implication |
|---|---|---|
| Image build after a deployment push | Yes | Heavy install steps can add cost on every build |
| Image pull before a workload starts | No | Scheduling and pulling are outside the metered window |
| Cold start and model load | Yes | The first request can wait while billable minutes accumulate |
| Serving requests | Yes | Ordinary dedicated-inference usage |
| Idle warm replica | Yes | A minimum replica is paid readiness, even with zero requests |
| Autoscaling termination | Yes, until termination | The scale-down tail is part of replica time |
| Replica crash or out-of-memory failure mid-request | Yes, until termination | Failed work can still consume billable runtime |
| Failed boot where the replica never comes up | No | No running workload means zero replica minutes |
| Scaled to zero with no traffic | No | This is the true zero-GPU-charge state |
| Development deployment | No | Baseten lists the watched development deployment as unbilled |

Baseten also says partial minutes round up. For long-running replicas this has little effect. For many short builds, failures, or start-stop cycles, it can make a simple seconds-times-rate estimate too optimistic.

There is another boundary worth preserving: image builds are workloads of their own. A failed replica boot is documented as free when it never comes up, but a build failure inside a running builder is billed until that build stops. "The model never served a request" is therefore not enough evidence that the attempt cost nothing.

## Baseten autoscaling defaults, translated into cost

The current [autoscaling documentation](https://docs.baseten.co/deployment/autoscaling/overview) publishes these defaults. They were checked on **August 27, 2026**.

| Setting | Default | Cost meaning |
|---|---:|---|
| Minimum replicas | 0 | The deployment can eventually reach zero GPU cost |
| Maximum replicas | 1 | It cannot scale beyond one replica until you raise the ceiling |
| Concurrency target | 1 | One in-flight request per replica is the initial scaling target |
| Target utilization | 70% | Scale-up triggers before the concurrency target is completely full |
| Autoscaling window | 60 seconds | Decisions use a one-minute average of in-flight requests |
| Scale-down delay | 900 seconds | A quiet replica normally stays up for 15 minutes before removal |
| Maximum scale-down rate | 50% | At most half the running replicas are removed in each scale-down step |

Two defaults deserve special attention.

**Maximum replicas starts at one.** A deployment may be described as autoscaling, but that ceiling prevents horizontal scale-out until it is changed. Raising it unlocks capacity and also raises the possible bill. The cost guardrail is the ceiling itself, not the word autoscaling.

**Scale-down waits 15 minutes by default.** At the tracked H100 rate, one 15-minute tail costs about $1.62: 15 × $0.10833. Ten such tails in a day would be roughly $16.25, assuming each event retains one otherwise-idle H100 replica for the full delay. These are exposed estimates based on the August 27 rate and default delay; real events can overlap or be interrupted by new traffic.

Baseten recommends at least two minimum replicas for production to remove scale-from-zero cold starts and provide redundancy. Following that recommendation creates a substantial warm floor:

| Production warm floor | L4 estimate | H100 estimate |
|---|---:|---:|
| One warm replica for 30 days | about $611 | about $4,680 |
| Two warm replicas for 30 days | about $1,222 | about $9,360 |

Those are instance-charge estimates before additional replicas, builds, or taxes. Redundancy may be the correct design; it still belongs in the budget.

## A Baseten workspace budget is an alert, not a GPU kill switch

Baseten's billing documentation says workspace budget emails are sent at 75%, 90%, and 100% of the configured monthly amount. The enforcement option sounds like a hard cap, but its scope is narrower: **enforcement rejects Model API requests; it does not stop dedicated deployments or training jobs.**

That distinction matters here because this guide covers dedicated inference. A warm GPU replica can continue accruing charges after the workspace budget threshold is reached. Treat the budget as observability for dedicated deployments, then use minimum replicas, maximum replicas, deployment cleanup, and external alerts as the operational controls.

Baseten also documents starting credits for new workspaces, but it does not publish a fixed credit amount on the billing page and says there is no perpetual free tier. Do not build a forecast around an assumed signup amount. The [GPU cloud free-credits comparison](https://hostfleet.net/gpu-cloud-free-credits-2026/) keeps exact public offers separate from programs whose amount or eligibility is not publicly fixed.

## Three honest monthly estimates

Use this formula for dedicated inference:

    estimated compute charge =
      serving replica-minutes
      + warm idle replica-minutes
      + cold-start replica-minutes
      + scale-down-tail replica-minutes
      + billable image-builder minutes

Then multiply each bucket by the applicable instance rate. Round partial metered minutes up when modeling many short events.

### 1. Intermittent L4 endpoint

Assume the L4 consumes 100 total replica-hours across starts, loading, serving, idle warm time, and scale-down tails.

    100 hours × $0.8484/hour = $84.84

Estimated dedicated instance charge: **about $85**, plus any separately metered image builds. The $0.8484 conversion uses the published $0.01414 per-minute L4 rate checked August 27, 2026.

### 2. One always-warm H100

Assume one H100 replica remains up for all 43,200 minutes of a 30-day month.

    43,200 minutes × $0.10833/minute = $4,679.86

Estimated dedicated instance charge: **about $4,680**, before extra replicas or builds. The source is Baseten's official H100 rate checked August 27, 2026.

### 3. Two warm H100 replicas

Assume a production minimum of two H100 replicas for the same 30-day month.

    2 × 43,200 minutes × $0.10833/minute = $9,359.71

Estimated dedicated instance charge: **about $9,360**, before traffic-driven scale-out or builds. This exposes the high-availability floor; it is not a recommendation for every endpoint.

If raw GPU rental is the main buying lens, compare the managed-inference bill with the current [H100 rental price table](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [RunPod Pods-versus-Serverless guide](https://hostfleet.net/runpod-pricing-guide-2026/). The products are not interchangeable: Baseten's instance price buys a managed deployment control plane, while lower-level GPU rentals leave more deployment work with the operator.

## Cold starts affect both cost and request behavior

Baseten's [request-lifecycle documentation](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) says a synchronous request can be parked while a scaled-to-zero deployment starts. The default predict timeout is 1,200 seconds, and the parking timeout matches it. If no replica becomes available before that window closes, the parked request fails.

Async behavior has another boundary: the first request can park, but later async requests that arrive while capacity is still unavailable can receive a 429 capacity error. This is not a measured latency claim. It is the documented request path checked August 27, 2026.

Scale-to-zero therefore exchanges a lower idle bill for a slower and more failure-sensitive first-request path. Keep replicas warm when that trade is unacceptable, but price the full replica count first.

## Baseten pricing verdict

Baseten's pricing is transparent at the instance-minute level. The misleading part is not the rate card; it is budgeting only the prediction window.

- Six headline GPU rates remain unchanged in HostFleet's August 27 source check.
- The resource reference adds H100MIG, H200, and RTX Pro 6000 choices that materially widen the VRAM and price ladder.
- Image builds, cold starts, warm idle time, and termination tails can all be billable.
- The default deployment can scale to zero but cannot scale beyond one replica until maximum replicas is raised.
- Baseten's workspace budget does not enforce a hard cap on dedicated GPU deployments.
- Two warm production replicas double the monthly floor before traffic adds more capacity.

Choose the smallest exact instance that fits, model every billable lifecycle bucket, and set replica floors and ceilings deliberately. That produces a Baseten estimate you can operate, rather than a per-minute rate that looks cheap in isolation.

## Sources

All web sources below were accessed **August 27, 2026**.

- [Baseten cloud pricing](https://www.baseten.co/pricing/)
- [Baseten instance resource and price reference](https://docs.baseten.co/deployment/resources)
- [Baseten billing and usage](https://docs.baseten.co/organization/billing)
- [Baseten autoscaling overview](https://docs.baseten.co/deployment/autoscaling/overview)
- [Baseten request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle)
- [Baseten cold starts](https://docs.baseten.co/deployment/autoscaling/cold-starts)
- HostFleet live GPU pricing dataset: /opt/hostbot-v2/src/data/gpu-pricing.json, updated August 27, 2026
- HostFleet full source-verification ledger: /opt/hostbot/data/ai-hosting/notes/2026-08-27-gpu-pricing-full-verification.md
