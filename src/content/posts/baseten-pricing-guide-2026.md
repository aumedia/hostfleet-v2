---
title: "Baseten pricing 2026: GPU rates, warm costs and stopping spend"
description: "Baseten GPU rates checked November 2026, warm-replica estimates, billing API checks, and how deactivation differs from scale-to-zero and deletion."
pubDate: 2026-07-26
updatedDate: 2026-11-07
category: ai-hosting
author: Alex Harmon
draft: false
---
**Source-backed pricing guide; estimates are labeled.** Baseten's six tracked GPU rates, exact instance shapes, billing, autoscaling, request behavior, and deployment lifecycle documentation were checked on **November 7, 2026**. Rates are corroborated by the official instance reference: the public pricing page returned HTTP 200 but only a JavaScript shell, so we could not independently read its rate card. HostFleet has not run a paid Baseten experiment, authenticated to its billing API, or benchmarked throughput, availability, startup, or teardown. The commands below are documented procedures, not account-tested results. See the [HostFleet methodology](https://hostfleet.net/about/).

> **Six GPU rates and lifecycle documentation checked:** November 7, 2026
> **Rate evidence:** official instance reference; public pricing-page rate card not readable in this check
> **Evidence mode:** sourced behavior with transparent arithmetic; no paid test

# Baseten pricing 2026: GPU rates, warm costs and stopping spend

Baseten's per-minute GPU prices are clear. The harder part is deciding what replica policy those prices will fund.

A deployment with **min_replica: 0** can eventually reach zero running-replica charges, but the next synchronous request must either wait for capacity or retry while a replica starts. A deployment with one warm replica avoids the scale-from-zero path but creates a fixed 30-day floor from about **$454 on T4** to **$7,185 on B200**. A two-replica redundancy floor doubles those estimates before traffic-driven scaling or image builds.

The other easily missed cost is the descent from a burst. Baseten's documented standard defaults wait 15 minutes and remove at most 50% of running replicas at each step, resetting the timer after every removal. Once the autoscaler's windowed average has fallen below the scale-down threshold, an eight-replica deployment can retain **225 replica-minutes** across the eight-to-four, four-to-two, two-to-one, and one-to-zero stages. At the current H100 list rate, that staged reserve is about **$24.37**.

Those are different decisions: the minimum replica count sets the recurring floor, while scale-down settings shape the bill after a burst. This guide calculates both and shows how to check the eventual deployment charge against billed minutes. It also distinguishes an idle endpoint from a stopped deployment: **scale-to-zero can wake again; deactivation releases replicas and rejects requests.** Single-deployment deletion is not always available, so cleanup needs a concrete fallback.

For the cross-provider view, use [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For product fit beyond the rate card, read [Baseten for AI inference APIs and jobs](https://hostfleet.net/baseten-for-ai-inference-apis-and-jobs/). If the immediate decision is whether to hold a small endpoint warm, compare Baseten's floor with [Modal and Replicate's warm-endpoint tradeoffs](https://hostfleet.net/baseten-vs-modal-vs-replicate-warm-inference-endpoint/) before treating the lowest GPU rate as the lowest operating cost.

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

The six rate cells below come from HostFleet's live GPU pricing dataset and were rechecked against [Baseten's official instance reference](https://docs.baseten.co/deployment/resources) on **November 7, 2026**. All six raw per-minute rates are unchanged. Baseten's [billing documentation](https://docs.baseten.co/organization/billing) points to that reference for instance pricing. The [public pricing page](https://www.baseten.co/pricing/) returned a JavaScript-only shell in this check, not readable rate evidence. HostFleet's dataset-wide date remains September 24: this is a Baseten-only verification, not a refresh of every provider. Use raw per-minute rates for arithmetic; the dataset's displayed hourly values are rounded.

These are **one-GPU instance prices with the listed CPU and RAM included**, not GPU-only component prices. The exact SKUs and GiB allocations come from Baseten's instance reference. Hourly equivalents use the raw rate times 60, before cent rounding.

| GPU | Exact instance SKU | vCPU / RAM | VRAM | Public USD/min | USD/hour equivalent |
|---|---|---|---|---:|---:|
| T4 | `T4x4x16` | 4 / 16 GiB | 16 GiB | $0.01052/min | $0.6312/hr |
| L4 | `L4:4x16` | 4 / 16 GiB | 24 GiB | $0.01414/min | $0.8484/hr |
| A10G | `A10Gx4x16` | 4 / 16 GiB | 24 GiB | $0.02012/min | $1.2072/hr |
| A100 | `A100:12x144` | 12 / 144 GiB | 80 GiB | $0.06667/min | $4.0002/hr |
| H100 | `H100` | 16 / 118 GiB | 80 GiB | $0.10833/min | $6.4998/hr |
| B200 | `B200` | 16 / 224 GiB | 180 GiB | $0.16633/min | $9.9798/hr |

Baseten meters partial minutes by rounding up. Larger CPU/RAM shapes can cost more; a fractional H100 MIG is not a whole H100. This table covers the six tracked dataset cells, not every instance in Baseten's catalog. A list price does not establish GPU stock, account access, throughput, or cold-start duration.

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

**Estimate assumptions:** public USD per-minute rates verified November 7; 43,200 minutes per replica for a 30-day month; one Baseten instance per replica; no traffic-driven replicas, image builds, model distribution surcharge, negotiated discount, credit, tax, or partial-month usage. Totals are rounded to cents only after multiplication.

This table does not say that two replicas are always necessary. Baseten's autoscaling guidance says one or more warm replicas avoid scale-from-zero, while two or more provide replica redundancy. The right floor depends on the service-level requirement. A development endpoint may accept zero. A latency-sensitive production endpoint may justify one. A service that must retain a warm replica while another fails or restarts may require two.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) can vary the allocated-time assumption. Keep the unit straight: one replica for 100 hours and two replicas for 50 hours both consume 100 replica-hours before separately billed builder work.

## Baseten bills the workload lifecycle, not just inference

Baseten's [billing documentation](https://docs.baseten.co/organization/billing), checked November 7, says Dedicated Inference is metered by the minute while a workload runs on a node.

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
| Development deployment (`baseten model push --watch`) | No, per billing reference | Do not extrapolate this exception to a published deployment |

An image build is a separate billable workload. Baseten meters the builder after that workload comes up, so a build failure inside a running builder is billed until it stops even if the serving replica never starts.

Baseten says deployment usage updates hourly. That is useful for reconciliation, but it is not an instant cost cutoff. Preserve deployment and instance identifiers, and account for image-builder workloads separately from serving replica-minutes.

## How to check a dedicated deployment's bill

**Billing API contract verified November 7, 2026; walkthrough not account-tested.** A forecast is not a meter reading. Baseten's [billing usage summary API](https://docs.baseten.co/reference/management-api/billing/gets-billing-usage-summary-for-a-date-range) exposes a per-deployment breakdown for dedicated usage, including billed minutes and compute cost. Use it to check the hardware charge without confusing credits with GPU efficiency.

### 1. Pin the instance and deployment

Record the exact SKU, published deployment ID, environment, and UTC test window. For the L4 row above, the exact SKU is `L4:4x16`. A similarly named instance with more CPU or RAM may have a different rate.

Export usage before and after the workload. If the deployment already has traffic, keep baseline activity separate; a fresh deployment makes attribution simpler. Record model-ready and termination times as well as request times, because startup and warm idle minutes are billable.

### 2. Retrieve a UTC calendar-day usage window

The documented read-only endpoint requires Bearer authentication and both `start_date` and `end_date`. The interval is **start-inclusive and end-exclusive**, and both dates are **normalized to midnight UTC**. It cannot exceed 31 days or begin before January 1, 2026 UTC. Supplying a 25-minute timestamp range does not create a 25-minute meter export; query complete UTC days and isolate the deployment instead. With an existing API key in `BASETEN_API_KEY`, this example exports one UTC day:

```bash
curl --fail --silent --show-error --get \
  'https://api.baseten.co/v1/billing/usage_summary' \
  --header "Authorization: Bearer ${BASETEN_API_KEY}" \
  --data-urlencode 'start_date=2026-11-06T00:00:00Z' \
  --data-urlencode 'end_date=2026-11-07T00:00:00Z' \
  --output baseten-usage.json
```

Replace the dates with UTC day boundaries covering your completed observation window. A test crossing midnight needs both days. Do not interpret a day-normalized export as a sub-hour billing trace. This command only retrieves usage; it does not launch or stop a deployment. HostFleet has not authenticated to this endpoint for this guide.

Select `dedicated_usage.breakdown[]` by the exact `billable_resource.id` and `kind: MODEL_DEPLOYMENT`, not just a friendly name. The resource record includes `is_deleted` and can carry `model_id`, `instance_type`, and `environment_name`. Those optional fields help disambiguate records; verify the SKU independently if it is absent. Do not add training or other usage categories to the dedicated deployment's hardware meter.

### 3. Keep compute, surcharges, and credits separate

| Export field | What it tells you | How to use it |
|---|---|---|
| Per-deployment `minutes` | Integer billed usage minutes | Multiply by the applicable exact per-minute instance rate |
| Per-deployment `compute_cost` | Compute charge for that resource | Compare with the minute-based estimate |
| Per-deployment `surcharge_cost` | Model distribution surcharge | Keep separate; the docs' example is not a universal surcharge percentage |
| Per-deployment `subtotal` | Subtotal for that resource | Read alongside compute and surcharge, not as an isolated GPU meter |
| Category `total`, `credits_used`, `subtotal` | Dedicated-usage total, credits applied, and post-credit subtotal | Separate gross usage from the amount left after credits |
| Per-deployment `daily[]` | Daily minute and cost breakdown | Split the observation by date when needed |

The documented amount fields can be numbers or decimal strings. Use decimal arithmetic for reconciliation rather than binary floating-point, and use an account-specific contracted rate if applicable.

**Worked estimate:** assume one `L4:4x16` deployment reports exactly 25 billable minutes, no instance changes, and the November 7 public list rate with no discount. Its expected compute component is:

**25 × $0.01414 = $0.3535**, or about **$0.35** rounded to cents.

This is not a measured invoice or an all-in cost. Add any applicable distribution surcharge and separately attributable build work; apply credits separately. Compare at the precision returned by the API before rounding a display total to cents. If the exported compute amount differs, check the query window, SKU, negotiated rate, other replicas, and partial-minute rounding before assuming the provider overcharged.

### 4. Wait for usage refresh, but do not use it as a kill switch

Deployment usage updates hourly. After teardown, export the same window after an update and again after a later update. Unchanged exports are a useful operational check, not a documented final-settlement guarantee.

The documented summary has integer minutes and daily rows. It does not expose per-replica second-level meter events or establish the exact scale-down cutoff. Aggregate billed minutes can help attribute cost, but cannot prove cold-start latency or a second-exact idle tail. Keep lifecycle logs for those questions.

For a bounded test, use a separate wall-clock watchdog and the exact-deployment deactivation procedure below. Neither an hourly usage export nor Baseten's workspace budget provides an immediate hard spend cap for dedicated deployments.

## Default autoscaling settings create both a floor and a ceiling

Baseten's [autoscaling reference](https://docs.baseten.co/deployment/autoscaling/overview), checked November 7, publishes these standard defaults:

| Setting | Standard default | Cost or capacity effect |
|---|---:|---|
| Minimum replicas | 0 | Allows eventual scale-to-zero |
| Maximum replicas | 1 | Prevents a new deployment from adding a second replica until changed |
| Concurrency target | 1 | Initial target is one in-flight synchronous request per replica |
| Target utilization | 70% | Scaling uses request-slot occupancy, not GPU utilization |
| Autoscaling window | 60 seconds | Decisions average one minute of in-flight request load |
| Scale-down delay | 900 seconds | Replicas wait 15 minutes before each removal step |
| Maximum scale-down rate | 50% | No more than half of running replicas disappear per step |

These are standard defaults, not universal engine defaults: the current reference gives BIS-LLM a 300-second scale-down delay and 20% maximum scale-down rate. Development deployments have a fixed 0–1 replica range. Read back the actual deployment settings before applying the examples below.

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

**Estimate assumptions:** eight replicas were needed immediately before load fell to zero; the 60-second windowed average is already below the scale-down threshold when the first countdown starts; no request resets a timer; scale_down_delay stays at 900 seconds; maximum scale-down rate stays at 50%; minimum replicas is zero; and the same instance type is used throughout. The estimate excludes active serving time, billable model loading, builds, model distribution surcharges, tax, credits, and any extra partial-minute rounding.

The 225 replica-minutes are not a complete elapsed-from-last-request invoice prediction. The 60-second autoscaling window can postpone the first countdown. Returning traffic can reset a timer. A nonzero minimum replica stops the descent at that floor.

This is why a burst forecast should separate three buckets: replica-minutes while requests are active, startup minutes for new replicas, and the staged reserve after load falls.

## Scale-to-zero changes request behavior

Baseten's [request-lifecycle documentation](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) defines two synchronous backpressure policies.

**Queue on full** is the default. At zero replicas, Baseten parks a synchronous request at the routing layer while capacity starts. The parking timeout uses the configured predict-timeout duration, 1,200 seconds by default. If a replica becomes ready, the request is forwarded and a separate 1,200-second predict timeout begins. This is a documented maximum envelope, not a typical latency measurement.

**Reject on full** returns 529 immediately when no replica slot is available. At zero replicas, the first request triggers a background start, but it and later requests keep receiving 529 until a replica is ready. Clients need exponential backoff and jitter. Rejected requests do not reach a replica and do not count as admitted in-flight load for concurrency-based autoscaling.

These backpressure policies apply to synchronous HTTP requests, not WebSocket, gRPC, Chain, or Baseten Inference Stack deployments. The setting is rolling out gradually and may require support enablement. Async inference follows a separate queue and retry path. The public docs describe soft and hard load-shedding thresholds but do not publish universal numeric limits.

The buying implication is direct: minimum replicas of zero save idle compute only when the caller accepts either a parked first request or a retry loop. If neither is acceptable, budget a warm floor.

## Explicit wake-up moves the wait; it does not erase billing

Baseten's [scaling guide](https://docs.baseten.co/deployment/manage/scaling) documents an explicit wake endpoint. A deployment moves from SCALED_TO_ZERO through WAKING_UP to ACTIVE. With a minimum replica count of zero, a woken deployment heads back toward zero after the scale-down delay if no request arrives.

A cautious runbook is:

1. Wake shortly before the known traffic window.
2. Poll until the deployment reports ACTIVE.
3. Send work and retain the deployment, instance, and request identifiers.
4. Confirm the replica returns to the intended floor.
5. Reconcile the hourly-updated usage export later.

Pre-waking can move cold-start latency out of the user request path, but startup and the later warm tail remain billable. Baseten publishes no universal cold-start duration. Its [startup guide](https://docs.baseten.co/deployment/autoscaling/startup-times.md) separates acquiring resources, pulling the image, pulling BDN weights when applicable, and loading the model. Engine initialization is part of model loading; the dominant phase depends on the image, artifacts, engine, and hardware. Do not equate every startup phase with metered time: use the billing reference's workload-start boundary.

## The workspace budget does not stop Dedicated Inference

Baseten's billing page, rechecked November 7, says a monthly workspace budget sends notifications at 75%, 90%, and 100%. Enabling enforcement rejects Model API requests after the threshold, but enforcement does **not** stop Dedicated Inference deployments or training jobs. They continue running and accruing charges.

For Dedicated Inference, treat the workspace budget as an alert. The effective controls are:

- minimum replicas for the fixed warm floor;
- maximum replicas for the scale-out ceiling;
- scale-down delay and maximum scale-down rate for the tail;
- explicit deactivation or deletion when service should stop; and
- independent monitoring of hourly-updated usage.

Baseten says new workspaces receive starting credits but does not publish one fixed amount in the checked billing documentation. It also says there is no perpetual free tier. The [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) separates exact public offers from variable or unpublished credits.

## How to stop Baseten compute spend without relying on deletion

**Lifecycle and CLI documentation checked November 7, 2026; commands not account-tested.** Baseten's [deployment lifecycle guide](https://docs.baseten.co/deployment/manage/lifecycle) makes an important distinction:

| Action | What it does | What it does not establish |
|---|---|---|
| Set `min_replica: 0` | Allows an idle deployment to scale down | Does not disable the endpoint; new requests can wake it |
| Deactivate the deployment | Releases replicas, retains configuration, and makes requests fail with 400 | Does not provide a second-exact invoice cutoff or prove separate builders stopped |
| Delete one deployment | Removes an eligible version | Cannot remove the only deployment of a model or an environment-bound deployment |
| Delete the whole model | Removes all its deployments | Is not appropriate for a shared model containing other services |
| Terminate one replica | Stops that specific replica | Does not deactivate the deployment or change its desired replica policy |

### 1. Freeze the identities before testing

Use an isolated, wholly disposable model for a cleanup experiment. Record the exact model, deployment, instance, and build identifiers before sending traffic. Pin the intended hardware explicitly:

```yaml
resources:
  instance_type: "L4:4x16"
```

When `instance_type` is set, Baseten ignores the other resource fields. Its resource guide also says changing a published deployment's hardware in the dashboard **creates a copy**. Promotion can return a different deployment ID before an environment switches to it. Do not keep using an old ID or assume one replica maximum means only one billable workload across deployment copies and builds.

For a bounded test, avoid promotions, hardware changes, deployment pushes, and CI runs after identities are frozen. Autoscaling updates apply asynchronously; read back the settings before treating them as effective. If a promotion is needed, reconcile the response's deployment ID with the environment's current deployment before continuing.

### 2. Deactivate the exact deployment, then check its state

With the [Baseten CLI](https://docs.baseten.co/reference/cli/baseten/model) already authenticated, replace these values with the recorded IDs. This action interrupts service; it is for the deployment you intend to stop:

```bash
MODEL_ID='replace-with-model-id'
DEPLOYMENT_ID='replace-with-deployment-id'

baseten model deployment deactivate \
  --model-id "$MODEL_ID" \
  --deployment-id "$DEPLOYMENT_ID" \
  --yes --output json

baseten model deployment describe \
  --model-id "$MODEL_ID" \
  --deployment-id "$DEPLOYMENT_ID" \
  --output json
```

The CLI requires `--yes` when stdin is not a terminal. Preserve both outputs and independently check the exact deployment until its status is `INACTIVE`; capture replica inventory and logs as well. Baseten says the transition takes a few seconds, but that is a documentation statement, **not a measured teardown SLA or a worst-case deadline**. A successful response or `INACTIVE` is not a second-exact billing timestamp. Check any separate image-builder workload independently.

### 3. If single-deployment deletion is blocked, do not launch another version just to unlock it

The only deployment of a model and any deployment associated with an environment cannot be deleted individually. For a retained model, leave the intended deployment deactivated. For a model proven wholly disposable, whole-model deletion removes all its deployments:

```bash
# Irreversible: only for the isolated model you intend to discard in full.
baseten model delete --model-id "$MODEL_ID" --yes --output json
```

Do not run that command against a shared model. Verify absence through authenticated model/deployment inventory, and verify builders finished or stopped separately. A generic 404 alone does not distinguish successful cleanup from a wrong identifier or permission problem. If deletion fails, keep pursuing cleanup; an exhausted test allowance is not a reason to leave compute running.

### 4. Reconcile later; do not call a compute estimate a spend cap

At the verified L4 rate, **25 billed minutes × $0.01414 = $0.35350**. Against a hypothetical $0.50 target, that leaves **$0.14650**. This is arithmetic, not an admitted all-in test budget: it omits any additional startup, builder work, overlapping deployments, cleanup delay, surcharges, and partial-minute rounding.

A wall-clock watchdog is useful only if it can actually execute and verify the stop path. Without independently bounded exposure for every billable workload, this guide cannot establish a hard sub-dollar ceiling. Do not invent a cleanup reserve from the documented few-second transition.

After stopping, collect the same UTC-day, exact-ID usage export after an hourly refresh and again later. Keep compute, builder costs, distribution surcharges, and credits separate. Two unchanged exports help reconciliation but do not establish final settlement. The next step before a paid test is read-only account verification: exact quote, permissions and CLI support, disposable ownership, usage attribution, and a stop path covering every running workload.

## Three budgeting examples

### Sporadic L4 endpoint

Assume the complete observed lifecycle totals 100 replica-hours across startup, serving, and scale-down tails.

**100 hours × $0.8484/hour = $84.84**

Estimated instance charge: **about $85**, plus separately metered image-builder work and any applicable model distribution surcharge. The 100 hours are an exposed assumption, not measured Baseten usage.

### One always-warm H100

Assume one H100 replica runs all 43,200 minutes in a 30-day month.

**43,200 × $0.10833 = $4,679.86**

Estimated instance charge: **$4,679.86** before scale-out, builds, model distribution surcharges, credits, or tax.

### Two warm H100 replicas plus an eight-to-two burst

A minimum of two means an eight-replica burst will scale only to two, not zero. The total replica cost during the two 15-minute retention stages is:

**(8 × 15 + 4 × 15) × $0.10833 = $19.50**

But two replicas are already included in the fixed floor during those 30 minutes. The incremental burst tail above that floor is:

**((8 − 2) × 15 + (4 − 2) × 15) × $0.10833 = $13.00**

Use **$13.00** as the incremental burst-tail estimate on top of the **$9,359.71** two-replica monthly floor. The larger $19.50 figure is the total cost of all replicas during those two intervals, not an extra charge beyond the floor.

**Estimate assumptions:** the windowed average is already below the threshold when the timer begins; no new traffic; default 15-minute delay and 50% removal cap; the floor remains two; no startup, active serving, builder work, model distribution surcharges, credits, or tax. This example shows why a nonzero floor changes the cascade rather than simply adding a fixed line to the zero-floor tail.

If the buying question is raw accelerator rental rather than a managed inference control plane, compare the bill with the [H100 rental price table](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/). The products are not interchangeable, so a lower VM rate is not an equal-service savings claim.

## Baseten pricing verdict

Baseten's public rate card remains clear. The main budgeting mistake is treating the per-minute number as if only successful prediction time counts.

- The six HostFleet dataset rates were unchanged in the November 7 source check.
- One continuously warm replica costs about $454 to $7,185 per 30 days across the six tracked GPUs; a two-replica floor doubles that range.
- Model loading, engine initialization, warm idle time, and termination delay can all be billable.
- The standard default can scale to zero but cannot scale beyond one replica until maximum replicas is raised.
- Once windowed load is below the threshold, an eight-to-zero descent can retain 225 replica-minutes across four default delay stages.
- Queue on full can park the first synchronous request; Reject on full returns 529 until capacity is ready.
- The usage API separates deployment compute, distribution surcharges, and category credits; integer minute totals do not prove second-exact lifecycle timing.
- Scale-to-zero can wake again; deactivation releases replicas and rejects requests.
- Single-deployment deletion cannot remove an environment-bound or sole deployment; a disposable model needs a whole-model cleanup path.
- Billing usage windows are UTC calendar-day intervals, not arbitrary sub-hour meter traces.
- A workspace budget does not stop Dedicated Inference GPUs.

Choose the exact instance, set the minimum floor from the latency and redundancy requirement, cap maximum replicas from tested throughput, and forecast the full replica lifecycle. Baseten can be economical for bursty managed inference when scale-to-zero is acceptable. It can also create a substantial recurring floor when low latency or redundancy requires warm capacity.

## Sources

**Checked November 7, 2026:** six exact GPU SKUs and raw per-minute rates via the official instance reference; workload billing, budgets, autoscaling, request lifecycle, startup phases, wake behavior, deactivation/deletion restrictions, CLI commands, and billing API contract. The public pricing page returned HTTP 200 but a JavaScript shell, not readable rate evidence. No paid run, account-level export, or benchmark was performed.

- [Baseten instance reference](https://docs.baseten.co/deployment/resources) — exact SKU allocations, rates, instance-type precedence, and hardware-change copies
- [Baseten pricing](https://www.baseten.co/pricing/) — public pricing entry point; rate card not readable in this capture
- [Baseten billing and usage](https://docs.baseten.co/organization/billing) — workload metering, builds, usage refresh, credits, and budget scope
- [Baseten billing usage summary API](https://docs.baseten.co/reference/management-api/billing/gets-billing-usage-summary-for-a-date-range) — UTC-day normalization, date bounds, resource IDs, minutes, compute, surcharges, and credits
- [Baseten autoscaling overview](https://docs.baseten.co/deployment/autoscaling/overview) — standard and engine-specific defaults, staged scale-down, and scaling inputs
- [Baseten startup times](https://docs.baseten.co/deployment/autoscaling/startup-times.md) — startup phases and measurement guidance
- [Baseten request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) — parking, policy scope, retries, and timeouts
- [Baseten scaling guide](https://docs.baseten.co/deployment/manage/scaling) — asynchronous updates, readback, scale-to-zero, and explicit wake
- [Baseten deployment lifecycle](https://docs.baseten.co/deployment/manage/lifecycle) — deactivation, status, promotion IDs, and deletion restrictions
- [Baseten model CLI reference](https://docs.baseten.co/reference/cli/baseten/model) — exact-ID operations, JSON output, and noninteractive confirmation flags

HostFleet's live GPU dataset retains its September 24, 2026 dataset-wide date; only the six Baseten cells were rechecked for this guide. Hourly equivalents and scenario totals are derived from the raw per-minute rates, not the rounded hourly display values.
