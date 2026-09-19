---
title: "Baseten pricing 2026: warm replica costs and scale-to-zero tails"
description: "Baseten GPU pricing verified September 2026, with one- and two-replica monthly floors, staged scale-down costs, and billing boundaries."
pubDate: 2026-07-26
updatedDate: 2026-09-19
category: ai-hosting
author: Alex Harmon
draft: false
---
**Source-backed pricing guide; estimates are labeled.** This refresh uses Baseten's public pricing and resource tables plus its billing, autoscaling, cold-start, scaling, and request-lifecycle documentation checked on **September 19, 2026**. HostFleet did not benchmark throughput, capacity, availability, or cold-start speed. See the [HostFleet methodology](https://hostfleet.net/about/) for how sourced and measured claims are separated.

> **Pricing verified:** September 19, 2026
> **Evidence mode:** sourced behavior with transparent arithmetic; no Baseten billing experiment

# Baseten pricing 2026: warm replica costs and scale-to-zero tails

Baseten's per-minute GPU prices are clear. The harder part is deciding what replica policy those prices will fund.

A deployment with **min_replica: 0** can eventually reach zero running-replica charges, but the next synchronous request must either wait for capacity or retry while a replica starts. A deployment with one warm replica avoids the scale-from-zero path but creates a fixed 30-day floor from about **$454 on T4** to **$7,185 on B200**. A two-replica redundancy floor doubles those estimates before traffic-driven scaling or image builds.

The other easily missed cost is the descent from a burst. Baseten's documented standard defaults wait 15 minutes and remove at most 50% of running replicas at each step, resetting the timer after every removal. Once the autoscaler's windowed average has fallen below the scale-down threshold, an eight-replica deployment can retain **225 replica-minutes** across the eight-to-four, four-to-two, two-to-one, and one-to-zero stages. At the current H100 list rate, that staged reserve is about **$24.37**.

Those are different decisions: the minimum replica count sets the recurring floor, while scale-down settings shape the bill after a burst. This guide calculates both.

For the cross-provider view, use [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For product fit beyond the rate card, read [Baseten for AI inference APIs and jobs](https://hostfleet.net/baseten-for-ai-inference-apis-and-jobs/).

## Baseten pricing: the short answer

| Deployment choice | Cost boundary | Operational consequence |
|---|---|---|
| **min_replica: 0**, no traffic | No running-replica charge after scale-down finishes | The next synchronous request waits or receives 529, depending on the backpressure policy |
| **min_replica: 1** | One instance rate runs continuously | Avoids scale-from-zero, but replicas added during scale-out still cold-start |
| **min_replica: 2** | Two instance rates run continuously | Adds a warm redundancy floor at twice the one-replica cost |
| Replicas above the floor after a burst | Every replica remains billable until its termination step | The 50% removal cap can create several full delay periods |
| Image build | Separate billable builder workload after it comes up | Repeated heavy or failed builds can add cost before a model serves traffic |
| Workspace budget reached | Dedicated deployments continue running | The budget is an alert for Dedicated Inference, not a GPU kill switch |

The practical budgeting unit is **replica-minutes**, not successful prediction seconds.

## Six current Baseten GPU rates

The six cells below come from HostFleet's live GPU pricing dataset. Each was rechecked against [Baseten's public pricing page](https://www.baseten.co/pricing/) and [instance reference](https://docs.baseten.co/deployment/resources) on **September 19, 2026**. All six were unchanged from HostFleet's September 17 dataset.

| GPU instance | VRAM | Public list rate | Hourly equivalent |
|---|---:|---:|---:|
| T4 | 16 GB | $0.01052/min | $0.6312/hr |
| L4 | 24 GB | $0.01414/min | $0.8484/hr |
| A10G | 24 GB | $0.02012/min | $1.2072/hr |
| A100 | 80 GB | $0.06667/min | about $4.00/hr |
| H100 | 80 GB | $0.10833/min | about $6.50/hr |
| B200 | 180 GB | $0.16633/min | about $9.98/hr |

Baseten meters partial minutes by rounding up. GPU stock, quota, throughput, and cold-start duration are not established by a public list price.

## What one or two warm replicas cost for 30 days

A warm floor is the cleanest recurring estimate because it does not depend on request volume. One 30-day replica contains 43,200 billable minutes; two contain 86,400.

| GPU | One warm replica | Two warm replicas |
|---|---:|---:|
| T4 | $454.46 | $908.93 |
| L4 | $610.85 | $1,221.70 |
| A10G | $869.18 | $1,738.37 |
| A100 | $2,880.14 | $5,760.29 |
| H100 | $4,679.86 | $9,359.71 |
| B200 | $7,185.46 | $14,370.91 |

**Estimate assumptions:** public USD per-minute rates verified September 19; 43,200 minutes per replica for a 30-day month; one Baseten instance per replica; no traffic-driven replicas, image builds, negotiated discount, credit, tax, or partial-month usage. Totals are rounded to cents only after multiplication.

This table does not say that two replicas are always necessary. Baseten's cold-start guidance says one or more warm replicas avoid scale-from-zero, while two or more provide replica redundancy. The right floor depends on the service-level requirement. A development endpoint may accept zero. A latency-sensitive production endpoint may justify one. A service that must retain a warm replica while another fails or restarts may require two.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) can vary the allocated-time assumption. Keep the unit straight: one replica for 100 hours and two replicas for 50 hours both consume 100 replica-hours before separately billed builder work.

## Baseten bills the workload lifecycle, not just inference

Baseten's [billing documentation](https://docs.baseten.co/organization/billing), checked September 19, says Dedicated Inference is metered by the minute while a workload runs on a node.

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

An image build is a separate billable workload. Baseten meters the builder after that workload comes up, so a build failure inside a running builder is billed until it stops even if the serving replica never starts.

Baseten says deployment usage updates hourly. That is useful for reconciliation, but it is not an instant cost cutoff. Preserve deployment and instance identifiers in exported usage so warm capacity, scale-out replicas, and builder minutes do not collapse into one unexplained total.

## Default autoscaling settings create both a floor and a ceiling

Baseten's [autoscaling reference](https://docs.baseten.co/deployment/autoscaling/overview), checked September 19, publishes these standard defaults:

| Setting | Standard default | Cost or capacity effect |
|---|---:|---|
| Minimum replicas | 0 | Allows eventual scale-to-zero |
| Maximum replicas | 1 | Prevents a new deployment from adding a second replica until changed |
| Concurrency target | 1 | Initial target is one in-flight synchronous request per replica |
| Target utilization | 70% | Scaling uses request-slot occupancy, not GPU utilization |
| Autoscaling window | 60 seconds | Decisions average one minute of in-flight request load |
| Scale-down delay | 900 seconds | Replicas wait 15 minutes before each removal step |
| Maximum scale-down rate | 50% | No more than half of running replicas disappear per step |

The default **max_replica: 1** is easy to overlook. A deployment can have autoscaling enabled while still being unable to add a second replica. Raising that ceiling expands both capacity and the possible bill.

The autoscaler estimates desired replicas from average in-flight synchronous requests divided by concurrency target times target utilization, rounded up. Async requests are not included in that in-flight count. Raising concurrency can reduce replica count only if the model and engine have actually demonstrated that concurrency on the selected instance.

## One idle replica and an eight-replica burst are different tails

At the default 900-second delay, a one-replica deployment that has already crossed the scale-down threshold retains a nominal 15-minute reserve:

| GPU | One-replica 15-minute reserve |
|---|---:|
| T4 | $0.16 |
| L4 | $0.21 |
| A10G | $0.30 |
| A100 | $1.00 |
| H100 | $1.62 |
| B200 | $2.49 |

An eight-replica deployment is not eight times that single delay. With the default 50% maximum scale-down rate, the documented sequence retains eight replicas for 15 minutes, then four, then two, then one.

| Stage after the first timer begins | Replicas retained | Replica-minutes |
|---|---:|---:|
| First 15 minutes | 8 | 120 |
| Second 15 minutes | 4 | 60 |
| Third 15 minutes | 2 | 30 |
| Fourth 15 minutes | 1 | 15 |
| **Total** | — | **225** |

The resulting staged reserve is:

| GPU | 225-replica-minute reserve |
|---|---:|
| T4 | $2.37 |
| L4 | $3.18 |
| A10G | $4.53 |
| A100 | $15.00 |
| H100 | $24.37 |
| B200 | $37.42 |

**Estimate assumptions:** eight replicas were needed immediately before load fell to zero; the 60-second windowed average is already below the scale-down threshold when the first countdown starts; no request resets a timer; scale_down_delay stays at 900 seconds; maximum scale-down rate stays at 50%; minimum replicas is zero; and the same instance type is used throughout. The estimate excludes active serving time, billable model loading, builds, tax, credits, and any extra partial-minute rounding.

The 225 replica-minutes are not a complete elapsed-from-last-request invoice prediction. The 60-second autoscaling window can postpone the first countdown. Returning traffic can reset a timer. A nonzero minimum replica stops the descent at that floor.

This is why a burst forecast should separate three buckets: replica-minutes while requests are active, startup minutes for new replicas, and the staged reserve after load falls.

## Scale-to-zero changes request behavior

Baseten's [request-lifecycle documentation](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) defines two synchronous backpressure policies.

**Queue on full** is the default. At zero replicas, Baseten parks a synchronous request at the routing layer while capacity starts. The parking timeout uses the configured predict-timeout duration, 1,200 seconds by default. If a replica becomes ready, the request is forwarded and a separate 1,200-second predict timeout begins. This is a documented maximum envelope, not a typical latency measurement.

**Reject on full** returns 529 immediately when no replica slot is available. At zero replicas, the first request triggers a background start, but it and later requests keep receiving 529 until a replica is ready. Clients need exponential backoff and jitter. Rejected requests do not reach a replica and do not count as admitted in-flight load for concurrency-based autoscaling.

Async inference follows a separate queue and retry path. The public docs describe soft and hard load-shedding thresholds but do not publish universal numeric limits.

The buying implication is direct: minimum replicas of zero save idle compute only when the caller accepts either a parked first request or a retry loop. If neither is acceptable, budget a warm floor.

## Explicit wake-up moves the wait; it does not erase billing

Baseten's [scaling guide](https://docs.baseten.co/deployment/manage/scaling) documents an explicit wake endpoint. A deployment moves from SCALED_TO_ZERO through WAKING_UP to ACTIVE. With a minimum replica count of zero, a woken deployment heads back toward zero after the scale-down delay if no request arrives.

A cautious runbook is:

1. Wake shortly before the known traffic window.
2. Poll until the deployment reports ACTIVE.
3. Send work and retain the deployment, instance, and request identifiers.
4. Confirm the replica returns to the intended floor.
5. Reconcile the hourly-updated usage export later.

Pre-waking can move cold-start latency out of the user request path, but startup and the later warm tail remain billable. Baseten publishes no universal cold-start duration. Its [cold-start guide](https://docs.baseten.co/deployment/autoscaling/cold-starts) breaks startup into container pull, weight loading, and engine initialization; the dominant phase depends on the image, artifacts, engine, and hardware.

## The workspace budget does not stop Dedicated Inference

Baseten's billing page says a monthly workspace budget sends notifications at 75%, 90%, and 100%. Enabling enforcement rejects Model API requests after the threshold, but enforcement does **not** stop Dedicated Inference deployments or training jobs. They continue running and accruing charges.

For Dedicated Inference, treat the workspace budget as an alert. The effective controls are:

- minimum replicas for the fixed warm floor;
- maximum replicas for the scale-out ceiling;
- scale-down delay and maximum scale-down rate for the tail;
- explicit deactivation or deletion when service should stop; and
- independent monitoring of hourly-updated usage.

Baseten says new workspaces receive starting credits but does not publish one fixed amount in the checked billing documentation. It also says there is no perpetual free tier. The [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) separates exact public offers from variable or unpublished credits.

## Three budgeting examples

### Sporadic L4 endpoint

Assume the complete observed lifecycle totals 100 replica-hours across startup, serving, and scale-down tails.

**100 hours × $0.8484/hour = $84.84**

Estimated instance charge: **about $85**, plus separately metered image-builder work. The 100 hours are an exposed assumption, not measured Baseten usage.

### One always-warm H100

Assume one H100 replica runs all 43,200 minutes in a 30-day month.

**43,200 × $0.10833 = $4,679.86**

Estimated instance charge: **$4,679.86** before scale-out, builds, credits, or tax.

### Two warm H100 replicas plus one eight-to-zero burst

A minimum of two means an eight-replica burst will scale only to two, not zero. The total replica cost during the two 15-minute retention stages is:

**(8 × 15 + 4 × 15) × $0.10833 = $19.50**

But two replicas are already included in the fixed floor during those 30 minutes. The incremental burst tail above that floor is:

**((8 − 2) × 15 + (4 − 2) × 15) × $0.10833 = $13.00**

Use **$13.00** as the incremental burst-tail estimate on top of the **$9,359.71** two-replica monthly floor. The larger $19.50 figure is the total cost of all replicas during those two intervals, not an extra charge beyond the floor.

**Estimate assumptions:** the windowed average is already below the threshold when the timer begins; no new traffic; default 15-minute delay and 50% removal cap; the floor remains two; no startup, active serving, builder work, credits, or tax. This example shows why a nonzero floor changes the cascade rather than simply adding a fixed line to the zero-floor tail.

If the buying question is raw accelerator rental rather than a managed inference control plane, compare the bill with the [H100 rental price table](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/). The products are not interchangeable, so a lower VM rate is not an equal-service savings claim.

## Baseten pricing verdict

Baseten's public rate card remains clear. The main budgeting mistake is treating the per-minute number as if only successful prediction time counts.

- The six HostFleet dataset rates were unchanged in the September 19 source check.
- One continuously warm replica costs about $454 to $7,185 per 30 days across the six tracked GPUs; a two-replica floor doubles that range.
- Model loading, engine initialization, warm idle time, and termination delay can all be billable.
- The standard default can scale to zero but cannot scale beyond one replica until maximum replicas is raised.
- Once windowed load is below the threshold, an eight-to-zero descent can retain 225 replica-minutes across four default delay stages.
- Queue on full can park the first synchronous request; Reject on full returns 529 until capacity is ready.
- A workspace budget does not stop Dedicated Inference GPUs.

Choose the exact instance, set the minimum floor from the latency and redundancy requirement, cap maximum replicas from tested throughput, and forecast the full replica lifecycle. Baseten can be economical for bursty managed inference when scale-to-zero is acceptable. It can also create a substantial recurring floor when low latency or redundancy requires warm capacity.

## Sources

Official sources below were checked **September 19, 2026**.

- [Baseten pricing](https://www.baseten.co/pricing/) — public per-minute GPU rates
- [Baseten instance reference](https://docs.baseten.co/deployment/resources) — SKU allocations and prices
- [Baseten billing and usage](https://docs.baseten.co/organization/billing) — metering phases, rounding, usage refresh, credits, and budget scope
- [Baseten autoscaling overview](https://docs.baseten.co/deployment/autoscaling/overview) — defaults, ranges, staged scale-down, and scaling inputs
- [Baseten cold starts](https://docs.baseten.co/deployment/autoscaling/cold-starts) — startup phases and warm-replica guidance
- [Baseten request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) — parking, request policies, load shedding, retries, and timeouts
- [Baseten scaling guide](https://docs.baseten.co/deployment/manage/scaling) — scale-to-zero and explicit wake behavior
- HostFleet live GPU dataset: /opt/hostbot-v2/src/data/gpu-pricing.json, updated September 17, 2026; Baseten cells rechecked September 19
- HostFleet evidence note: /opt/hostbot/data/ai-hosting/notes/2026-09-01-baseten-autoscaling-billing-boundary.md
