---
title: "Baseten pricing 2026: rates, replica tails, and scale-to-zero costs"
description: "Baseten GPU pricing checked September 2026, with replica lifecycle billing, staged scale-down costs, request policies, and warm-floor estimates."
pubDate: 2026-07-26
updatedDate: 2026-09-02
category: ai-hosting
author: Alex Harmon
draft: false
---

**Source-backed pricing guide; estimates are labeled.** This refresh uses Baseten's public pricing and resource tables plus its billing, autoscaling, cold-start, scaling, and request-lifecycle documentation checked on **September 2, 2026**. HostFleet did not benchmark throughput, capacity, availability, or cold-start speed. See the [HostFleet methodology](https://hostfleet.net/about/) for how sourced and measured claims are separated.

> **Pricing verified:** September 2, 2026
> **Evidence mode:** sourced behavior with transparent arithmetic; no Baseten billing experiment

# Baseten pricing 2026: rates, replica tails, and scale-to-zero costs

Baseten's per-minute GPU rates are only the first line of the bill. Dedicated Inference charges while a replica loads the model, serves traffic, remains warm, and waits to be removed. Image builds are separate billable workloads. A deployment at zero replicas has no running-replica charge, but the next wake-up is billable after the workload starts.

The most important planning detail is the scale-down sequence. Baseten's standard defaults wait 15 minutes and remove at most 50% of replicas per step, then reset the timer. Eight idle replicas therefore do not disappear after one 15-minute delay. The documented sequence is eight to four, four to two, two to one, and eventually one to zero, with another delay between each step.

The four documented retention stages create a **225-replica-minute staged-delay estimate** once the autoscaler's windowed average is already below the scale-down threshold and the first 900-second countdown begins. At the [current H100 list rate](https://www.baseten.co/pricing/), verified September 2, that staged reserve is about **$24.37**. The default 60-second averaging window can postpone the first countdown, so elapsed time and cost measured from the instant raw traffic stops can be higher. This is not a request charge or a settled invoice prediction.

For the cross-provider view, use [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For product fit beyond the rate card, read [Baseten for AI inference APIs and jobs](https://hostfleet.net/baseten-for-ai-inference-apis-and-jobs/).

## Baseten pricing: the short answer

| Deployment shape | Cost boundary | Operational consequence |
|---|---|---|
| `min_replica: 0`, no traffic | No running-replica charge after scale-down completes | The next request can wait or receive `529`, depending on the request policy |
| One warm replica | Per-minute instance rate runs continuously | Avoids scale-from-zero, but not cold starts for traffic-driven replicas |
| Several replicas after a burst | Each replica remains billable until its termination step | The 50% removal cap can create several full delay periods |
| Image build | Billed as a separate builder workload after it comes up | Repeated heavy or failed builds can add cost before a model serves traffic |
| Failed replica boot | Unbilled if the replica never comes up | This does not make a failed image build free |
| Workspace budget reached | Dedicated deployments continue running | The budget is an alert for this product, not a GPU kill switch |

The practical budgeting unit is **replica-minutes**, not prediction seconds.

## Six Baseten rates in HostFleet's live GPU table

The six cells below come from HostFleet's live `gpu-pricing.json` dataset and were individually rechecked against [Baseten's public pricing page](https://www.baseten.co/pricing/) on **September 2, 2026**. The hourly equivalents are the published per-minute prices multiplied by 60. The monthly estimates use 43,200 minutes, or 720 hours, for a 30-day month.

| GPU instance | VRAM | Public list rate | Hourly equivalent | One warm replica for 30 days |
|---|---:|---:|---:|---:|
| T4 | 16 GB | $0.01052/min | $0.6312/hr | about $454 |
| L4 | 24 GB | $0.01414/min | $0.8484/hr | about $611 |
| A10G | 24 GB | $0.02012/min | $1.2072/hr | about $869 |
| A100 | 80 GB | $0.06667/min | about $4.00/hr | about $2,880 |
| H100 | 80 GB | $0.10833/min | about $6.50/hr | about $4,680 |
| B200 | 180 GB | $0.16633/min | about $9.98/hr | about $7,185 |

**Estimate assumptions:** one Baseten instance per replica; public USD list price verified September 2; 43,200 billable minutes; no traffic-driven replicas, image builds, surcharge, negotiated discount, credit, or tax. Baseten rounds partial metered minutes up. These are rate conversions, not quotes. GPU stock, quota, performance, and cold-start duration are unmeasured.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) can vary the allocated-time assumption. Keep the unit straight: one replica for 100 hours and two replicas for 50 hours both consume 100 replica-hours before separately billed build work.

## Baseten bills the workload lifecycle, not just inference

Baseten's [billing documentation](https://docs.baseten.co/organization/billing) says Dedicated Inference is metered by the minute while a workload runs on a node. Partial minutes round up. The current lifecycle map, checked September 2, is more useful than the phrase “pay for compute used.”

| Lifecycle phase | Billed? | Planning implication |
|---|---|---|
| Scheduling before a workload starts | No | Queue time before node work is outside the metered window |
| Image pull onto the node | No | Container transfer before start is unmetered |
| Model loading and engine initialization | Yes | Cold-start minutes count after the replica comes up |
| Request execution | Yes | Normal serving time |
| Idle warm replica | Yes | Readiness has a per-minute price even with no requests |
| Autoscaling termination window | Yes, until termination | Scale-down delay and staged removal belong in the forecast |
| Replica crash or OOM mid-request | Yes, until termination | Failed work can still consume paid minutes |
| Failed boot where the replica never came up | No | Zero running workload means zero replica minutes |
| Draining, cleanup, and node recycling after termination | No | Post-termination platform work is outside metering |
| Scaled to zero with no traffic | No | This is the zero-running-replica state |
| Development deployment created with `truss push --watch` | No | The separate image-builder workload can still be billed |

An image build deserves its own line item. Baseten meters the builder from the moment that workload comes up. A build failure inside the running builder is billed until it stops, even if the serving replica never starts.

Baseten says usage data updates hourly. That is adequate for daily reconciliation, but it is not an instantaneous circuit breaker. Preserve deployment and instance identifiers when exporting usage so warm capacity, scale-out, and builder minutes can be attributed instead of treated as a single unexplained total.

## The defaults create both a cost floor and a capacity ceiling

Baseten's [autoscaling reference](https://docs.baseten.co/deployment/autoscaling/overview), checked September 2, publishes these standard defaults:

| Setting | Standard default | What it means for cost or traffic |
|---|---:|---|
| Minimum replicas | 0 | Allows eventual scale-to-zero |
| Maximum replicas | 1 | A new deployment cannot scale beyond one replica until changed |
| Concurrency target | 1 | One in-flight synchronous request per replica is the initial target |
| Target utilization | 70% | Scaling uses request-slot occupancy, not GPU utilization |
| Autoscaling window | 60 seconds | Decisions average one minute of in-flight request load |
| Scale-down delay | 900 seconds | Idle replicas wait 15 minutes before each removal step |
| Maximum scale-down rate | 50% | No more than half of running replicas disappear per step |

The autoscaler estimates desired replicas from average in-flight synchronous requests divided by `concurrency_target × target_utilization`, rounded up. Async inference requests are not included in that in-flight count. Raising concurrency can reduce replica count, but it is only defensible after the model and engine have been benchmarked on the exact instance.

The default `max_replica: 1` is a real capacity boundary. A deployment can be configured for autoscaling and still have no permission to add a second replica. Raising the ceiling expands both throughput potential and the possible bill.

## Why an eight-replica burst creates a 225-replica-minute staged-delay reserve

Baseten documents a halve-and-wait pattern at the standard 50% maximum scale-down rate. If traffic falls from eight needed replicas to zero and never returns, the four retention stages below begin only after the autoscaler's windowed average is already below the scale-down threshold and the first 900-second countdown starts:

| Retention stage after the first timer begins | Replicas retained during interval | Replica-minutes in interval |
|---|---:|---:|
| First 15 minutes | 8 | 120 |
| Second 15 minutes | 4 | 60 |
| Third 15 minutes | 2 | 30 |
| Fourth 15 minutes | 1 | 15 |
| **Total** | — | **225 replica-minutes** |

At three current list rates, that tail becomes:

| Instance | Formula | Derived scale-down reserve |
|---|---:|---:|
| L4 | 225 × $0.01414 | $3.18 |
| H100 | 225 × $0.10833 | $24.37 |
| B200 | 225 × $0.16633 | $37.42 |

**Estimate assumptions:** eight replicas were necessary immediately before load fell to zero; the default 60-second autoscaling window has already averaged in-flight load below the scale-down threshold when the first timer begins; no new requests reset a timer; `scale_down_delay` remains 900 seconds; `max_scale_down_rate` remains 50%; `min_replica` is zero; every stage lasts the full delay; and the same instance type is used throughout. The estimate excludes serving time, billable cold starts, image builds, surcharges, taxes, and any partial-minute rounding beyond the exact 15-minute intervals.

The 225 replica-minutes count only the four documented 900-second retention stages. They are not a complete elapsed-from-traffic-drop tail. Measured from the instant raw traffic stops, the 60-second averaging window can postpone the first countdown and add billable replica time; the exact addition depends on the recent request pattern.

This is a planning reserve, not a claim that every burst produces the full tail. If traffic returns during a delay, capacity remains active and the timeline changes. If the deployment only reached one replica, its one-delay nominal reserve is much smaller: about **$0.21 on L4**, **$1.62 on H100**, or **$2.49 on B200** at the September 2 rates.

A shorter delay can reduce idle minutes but increase replica churn and billable cold starts. A longer delay buys readiness through traffic dips. The right value comes from the actual arrival pattern and observed startup time, neither of which HostFleet measured here.

## Scale-to-zero does not define one universal request experience

Baseten's [request-lifecycle documentation](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) exposes two synchronous backpressure policies.

### Queue on full: wait for capacity

**Queue on full** is the default. When the deployment is at zero replicas, Baseten parks a synchronous request at the routing layer while a replica starts. The parking timeout uses the configured predict-timeout duration, which defaults to 1,200 seconds. If no replica becomes ready in that window, the request fails with `500`.

If a replica becomes ready, the parked request is forwarded and a separate predict timeout begins. That timeout also defaults to 1,200 seconds. Under the published defaults, a synchronous request can therefore spend up to 1,200 seconds parked and then up to another 1,200 seconds in inference. This is a documented timeout envelope, not a typical latency claim.

### Reject on full: retry until a replica is ready

**Reject on full** returns `529` immediately when no replica slot is available. At zero replicas, the first request triggers a background start, but that request and later synchronous requests continue receiving `529` until a replica becomes ready. Clients need exponential backoff and jitter.

Rejected requests do not reach a replica and do not contribute to concurrency-based autoscaling. The first request can wake zero capacity, but a stream of rejected requests is not equivalent to admitted in-flight load for scale-out math.

The reject policy applies to synchronous HTTP requests. Async inference uses its own queue and retry path. Queue load shedding can also return `429` at memory pressure or a soft queue limit and `529` at a hard limit; Baseten describes those limits but does not publish universal numeric thresholds.

The buying implication is simple: `min_replica: 0` saves idle compute only when the application accepts either a parked first request or a retry loop. If neither is acceptable, keep a replica warm and budget the monthly floor.

## Explicit wake-up is useful, but still starts a billing cycle

Baseten's [scaling guide](https://docs.baseten.co/deployment/manage/scaling) documents a wake endpoint in addition to console controls. A deployment moves from `SCALED_TO_ZERO` through `WAKING_UP` to `ACTIVE`. Operators can poll status and send work only after it is active.

With `min_replica: 0`, an explicitly woken deployment heads back toward zero after the scale-down delay if no request arrives. Pre-waking before a demo or batch can move the cold wait out of the user request path, but it does not make startup or the warm tail free.

A cautious runbook is:

1. Wake the deployment before the known traffic window.
2. Poll until the deployment reports `ACTIVE` rather than guessing a fixed startup time.
3. Send the workload and record the deployment, instance, and request identifiers.
4. Confirm the replica returns to zero after the intended delay.
5. Reconcile the hourly-updated usage export later.

Baseten publishes no universal cold-start duration. Its [cold-start guide](https://docs.baseten.co/deployment/autoscaling/cold-starts) breaks startup into container pull, weight loading, and engine initialization; the dominant phase depends on the image, artifact, engine, and hardware. Do not copy a cold-start number from a different model and treat it as a budget input.

## Exact instance choice matters beyond the six headline rows

The [Baseten instance reference](https://docs.baseten.co/deployment/resources), checked September 2, lists complete instance prices with CPU and system RAM included. Selected one-GPU options outside the six cross-provider cells include:

| Exact instance | Allocation | Public rate | Hourly equivalent |
|---|---|---:|---:|
| `T4x8x32` | T4, 8 vCPU, 32 GiB RAM | $0.01504/min | about $0.90/hr |
| `A10Gx8x32` | A10G, 8 vCPU, 32 GiB RAM | $0.02424/min | about $1.45/hr |
| `H100MIG` | Fractional H100, 40 GiB VRAM | $0.06250/min | $3.75/hr |
| `H200` | H200, 141 GiB VRAM | $0.12500/min | $7.50/hr |
| `RTX-PRO-6000` | RTX Pro 6000, 96 GiB VRAM | $0.06667/min | about $4.00/hr |

**Estimate assumptions:** public USD rates verified September 2; hourly equivalents equal per-minute price × 60; one running instance; no discounts, surcharge, credits, or tax.

GPU name alone does not determine the whole instance price. T4 and A10G have CPU/RAM variants, while H100MIG is a fractional allocation rather than a discounted full H100. Select the exact SKU that meets VRAM, CPU, and RAM needs. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) helps with memory sizing but is not a Baseten performance benchmark.

## The workspace budget does not stop dedicated GPUs

Baseten's billing documentation says a monthly workspace budget sends email at 75%, 90%, and 100%. Enabling enforcement rejects Model API requests after the threshold, but enforcement does **not** stop Dedicated Inference deployments or training jobs. They continue running and accruing charges.

For this product, use the budget as an alert. The actual controls are:

- `min_replica` for the warm floor;
- `max_replica` for the scale-out ceiling;
- `scale_down_delay` and maximum scale-down rate for the tail;
- deployment deactivation or deletion when service should stop; and
- independent monitoring of the usage export and running replicas.

Baseten provides starting credits to new workspaces but does not publish one fixed amount in the checked billing documentation. It also says there is no perpetual free tier. The [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) separates exact public offers from variable or unpublished credits.

## Three budgeting patterns

### Sporadic L4 endpoint

Assume total observed lifecycle usage across startup, inference, and tails is 100 replica-hours.

~~~text
100 hours × $0.8484/hour = $84.84
~~~

Estimated instance charge: **about $85**, plus separately metered image-builder work. The rate was verified September 2. The 100 hours are an exposed assumption, not measured Baseten usage.

### One always-warm H100

Assume one H100 replica runs all 43,200 minutes in a 30-day month.

~~~text
43,200 minutes × $0.10833/minute = $4,679.86
~~~

Estimated instance charge: **about $4,680**, before scale-out, builds, credits, surcharge, or tax.

### Two warm H100 replicas

Assume a redundancy floor of two H100 replicas for the same month.

~~~text
2 × 43,200 minutes × $0.10833/minute = $9,359.71
~~~

Estimated instance charge: **about $9,360** before traffic-driven replicas or builder workloads. Baseten suggests at least two warm replicas when production redundancy is required; that is not a universal recommendation for every endpoint.

If the buying question is raw accelerator rental rather than a managed inference control plane, compare the bill with the [H100 rental price table](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/). The products are not interchangeable, so rate differences should not be presented as equal-service savings.

## Baseten pricing verdict

Baseten's public rate card is clear. The budgeting trap is treating the per-minute number as though only successful predictions count.

- Six HostFleet dataset rates were unchanged in the September 2 source check.
- Model loading, engine initialization, warm idle time, and termination delay can all be billable.
- The default deployment can scale to zero but cannot scale beyond one replica until `max_replica` is raised.
- Once windowed load is below the scale-down threshold, the default 50% scale-down cap can retain an eight-replica burst through four paid 15-minute stages; the 60-second averaging window can postpone the first stage when measured from raw traffic stop.
- Queue on full can park the first synchronous request; Reject on full returns `529` until capacity is ready.
- A workspace budget does not stop Dedicated Inference GPUs.

Choose the exact instance, measure the real concurrency and cold-start path, and forecast the complete replica lifecycle. Baseten can be economical for bursty managed inference when scale-to-zero is operationally acceptable. It can also carry a large warm floor when low latency, redundancy, or slow scale-down is the priority.

## Sources

Official web sources below were checked **September 2, 2026**.

- [Baseten pricing](https://www.baseten.co/pricing/) — six public per-minute GPU rates
- [Baseten instance reference](https://docs.baseten.co/deployment/resources) — exact SKU allocations and per-minute prices
- [Baseten billing and usage](https://docs.baseten.co/organization/billing) — metering phases, rounding, usage refresh, credits, and budget scope
- [Baseten autoscaling overview](https://docs.baseten.co/deployment/autoscaling/overview) — defaults, ranges, scale-down sequence, and scaling inputs
- [Baseten cold starts](https://docs.baseten.co/deployment/autoscaling/cold-starts) — startup phases and warm-replica tradeoff
- [Baseten request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) — parking, request policies, load shedding, retries, and timeouts
- [Baseten scaling guide](https://docs.baseten.co/deployment/manage/scaling) — scale-to-zero, explicit wake flow, and state transitions
- HostFleet live GPU dataset: `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 27, 2026; Baseten cells rechecked September 2
- HostFleet Baseten evidence note: `/opt/hostbot/data/ai-hosting/notes/2026-09-01-baseten-autoscaling-billing-boundary.md`
