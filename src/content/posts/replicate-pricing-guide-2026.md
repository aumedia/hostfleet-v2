---
title: "Replicate pricing 2026: GPU rates, setup billing, and deployment floors"
description: "Replicate GPU pricing checked September 2026, with 17 hardware rates, setup-failure costs, warm deployment floors, and contract boundaries."
pubDate: 2026-07-26
updatedDate: 2026-09-03
category: ai-hosting
author: Alex Harmon
draft: false
---

**Source-backed pricing guide; estimates are labeled.** This refresh uses Replicate's live pricing page and its billing, deployment, monitoring, official-model, and prepaid-credit documentation checked on **September 3, 2026**. HostFleet did not benchmark throughput, boot time, queue time, availability, or GPU performance. See the [HostFleet methodology](https://hostfleet.net/about/) for the evidence boundary.

> **Pricing verified:** September 3, 2026<br>
> **Currency:** public USD list rates<br>
> **Evidence mode:** sourced platform behavior plus transparent arithmetic; no Replicate billing experiment

# Replicate pricing 2026: GPU rates, setup billing, and deployment floors

Replicate pricing makes sense only after you choose the product shape. Public models generally charge for active processing while Replicate absorbs setup and idle time. Most private models and deployments put setup, idle, and active instance time on your bill. Official models use their own per-output or per-input metrics instead of the generic GPU-second table.

That distinction matters when a deployment fails. Replicate says failed and canceled runs on private models and deployments are billed for the time their instances were active as normal. The deployment setup timeout defaults to 10 minutes, while custom timeouts from one minute to three hours are restricted to enterprise contracts. A failed setup can therefore be a cost event even though it returns no useful prediction.

The current hardware card still publishes **17 GPU configurations**. Six appear without a committed-spend note. Eleven additional multi-GPU or H200 rows are marked as committed-spend capacity. A public price is a planning anchor, not proof that an account can launch the hardware.

For broader context, use HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) and [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For workflow and product fit beyond cost, read [Replicate for AI inference APIs and jobs](https://hostfleet.net/replicate-for-ai-inference-apis-and-jobs/).

## Replicate pricing: the short answer

| Workload shape | Customer-paid lifecycle | Main cost boundary |
|---|---|---|
| Public model | Active processing | Setup and idle time are free to the customer, but the pool and queue are shared by default |
| Most private models | Setup, idle, and active time | Dedicated capacity exposes cold boot and warm gaps in the bill |
| Fast-booting fine-tune | Active processing | The exception applies only to versions Replicate labels as fast booting |
| Deployment | Setup, idle, and active time | Minimum instances create a warm floor; failed and canceled runs still consume normal active instance time |
| Official model | Model-specific input or output metric | It is not a generic GPU-second product |
| H200 or large multi-GPU configuration | Contract-qualified instance time | Published rates sit behind a committed-spend requirement |

The practical buying order is: product shape, cold-versus-warm policy, account eligibility, exact GPU, then rate.

## Four Replicate rows in HostFleet's live GPU dataset

HostFleet's live data file contains four single-GPU Replicate rows. The dataset was updated August 27, and every cell below was rechecked against [Replicate's live pricing page](https://replicate.com/pricing) on **September 3, 2026**.

| GPU | VRAM | Public rate | Hourly equivalent | 30-day warm estimate |
|---|---:|---:|---:|---:|
| T4 | 16 GB | $0.000225/sec | $0.81/hr | $583.20 |
| L40S | 48 GB | $0.000975/sec | $3.51/hr | $2,527.20 |
| A100 | 80 GB | $0.001400/sec | $5.04/hr | $3,628.80 |
| H100 | 80 GB | $0.001525/sec | $5.49/hr | $3,952.80 |

**Estimate assumptions:** one named configuration remains online for 720 hours; published USD rate is unchanged; no additional traffic-driven instances, committed-spend discount, tax, or unrelated model-specific charge. The monthly column equals the published hourly equivalent multiplied by 720. It is a capacity-floor estimate, not a quote or performance comparison.

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to replace 720 hours with the observed billable duty cycle. Replicate's deployment bill should use online instance time, not just prediction runtime.

## All 17 published GPU configurations

Replicate publishes both per-second and hourly values. The tables preserve the vendor's figures rather than manufacturing extra precision.

### Six rows without a committed-spend note

| Published configuration | Public rate | Published hourly equivalent | 30-day online estimate |
|---|---:|---:|---:|
| Nvidia T4, 1 GPU | $0.000225/sec | $0.81/hr | $583.20 |
| Nvidia L40S, 1 GPU | $0.000975/sec | $3.51/hr | $2,527.20 |
| Nvidia L40S, 2 GPUs | $0.001950/sec | $7.02/hr | $5,054.40 |
| Nvidia A100 80 GB, 1 GPU | $0.001400/sec | $5.04/hr | $3,628.80 |
| Nvidia A100 80 GB, 2 GPUs | $0.002800/sec | $10.08/hr | $7,257.60 |
| Nvidia H100, 1 GPU | $0.001525/sec | $5.49/hr | $3,952.80 |

**Source and date for every rate:** [Replicate pricing](https://replicate.com/pricing), checked **September 3, 2026**. Absence of a committed-spend note is not a guarantee of stock, quota, region access, or launch permission.

### Eleven rows marked as committed-spend capacity

| Published configuration | Public rate | Published hourly equivalent | 30-day online estimate |
|---|---:|---:|---:|
| Nvidia L40S, 4 GPUs | $0.003900/sec | $14.04/hr | $10,108.80 |
| Nvidia L40S, 8 GPUs | $0.007800/sec | $28.08/hr | $20,217.60 |
| Nvidia A100 80 GB, 4 GPUs | $0.005600/sec | $20.16/hr | $14,515.20 |
| Nvidia A100 80 GB, 8 GPUs | $0.011200/sec | $40.32/hr | $29,030.40 |
| Nvidia H100, 2 GPUs | $0.003050/sec | $10.98/hr | $7,905.60 |
| Nvidia H100, 4 GPUs | $0.006100/sec | $21.96/hr | $15,811.20 |
| Nvidia H100, 8 GPUs | $0.012200/sec | $43.92/hr | $31,622.40 |
| Nvidia H200, 1 GPU | $0.001525/sec | $5.49/hr | $3,952.80 |
| Nvidia H200, 2 GPUs | $0.003050/sec | $10.98/hr | $7,905.60 |
| Nvidia H200, 4 GPUs | $0.006100/sec | $21.96/hr | $15,811.20 |
| Nvidia H200, 8 GPUs | $0.012200/sec | $43.92/hr | $31,622.40 |

**Source and date for every rate and restriction:** [Replicate pricing](https://replicate.com/pricing), checked **September 3, 2026**. Replicate marks H200 capacity and these additional multi-GPU configurations as available with committed-spend contracts.

The 30-day estimate uses:

    published per-second rate × 3,600 seconds × 720 hours

It assumes the whole published configuration remains online. It does not divide an eight-GPU rate and imply that one-eighth can be rented separately. The estimate excludes traffic-driven scale-out beyond the named configuration, contract adjustments, tax, and performance differences.

For raw accelerator-market context, compare exact product boundaries in the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). Replicate deployments are managed inference capacity, not generic GPU VMs.

## What Replicate bills during the instance lifecycle

Replicate's [billing documentation](https://replicate.com/docs/topics/billing), checked September 3, separates an instance into setup, active, idle, and offline states.

| Product or state | Setup billed to customer? | Idle billed? | Active billed? | Planning consequence |
|---|---:|---:|---:|---|
| Public model | No | No | Yes | Good cost shape for intermittent work, with shared-pool queue and boot exposure |
| Most private models | Yes | Yes | Yes | Setup failures and warm gaps belong in the forecast |
| Fast-booting fine-tune | No | No | Yes | Verify the version has the fast-booting label |
| Deployment | Yes | Yes | Yes | Every online instance contributes to the capacity bill |
| Offline instance | No | No | No | The platform has scaled down to the configured minimum, zero by default |
| Official model | Model-specific | Model-specific | Model-specific | Price comes from the model's published input/output metric |

The [official-model documentation](https://replicate.com/docs/topics/models/official-models) says official models are always warm, have stable APIs, and use metrics such as an output image, video duration, or input/output tokens. Those prices should not be mixed with the hardware-runtime table.

Replicate describes deployment idle time as a few minutes before shutdown, but it does not publish one universal idle duration in the checked billing page. Do not put an invented idle-tail constant in a production forecast. Export actual online instance time or observe the deployment metrics, then multiply by the exact hardware rate.

## A setup failure can still be billable

The billing page is explicit: private-model and deployment instances charge setup, idle, and active time. It also says failed and canceled runs for those products are billed for the time the instances were active as normal.

The [deployment monitoring guide](https://replicate.com/docs/topics/deployments/monitor-a-deployment), checked September 3, adds these operational boundaries:

- The default setup timeout is 10 minutes.
- Custom setup timeouts are enterprise-only and can be set from one minute to three hours.
- Setup-failure email notifications are available only to users with an enterprise contract.
- The monitoring view exposes instances that are starting, idle, or processing.

A timeout is a limit, not a promise that every failed setup runs for the full interval. The useful planning question is the maximum billable setup exposure under an assumed full timeout.

| Configuration | Full 10-minute setup at current rate | Full 3-hour setup at current rate |
|---|---:|---:|
| T4, 1 GPU | about $0.14 | $2.43 |
| A100 80 GB, 1 GPU | $0.84 | $15.12 |
| H100, 1 GPU | about $0.92 | $16.47 |
| H100, 8 GPUs | $7.32 | $131.76 |

**Estimate assumptions:** one instance stays online in setup for the entire stated timeout; no retry launches another instance; September 3 public rate; no discount or tax. The three-hour column is a boundary for an enterprise-configured timeout, not a default. The eight-H100 row also requires committed spend.

The formulas are simple:

    setup exposure = published per-second rate × timeout seconds
    repeated failure exposure = setup exposure × failed instance attempts

A five-attempt H100 failure loop that consumes the full default timeout each time would be about **$4.58** before any useful prediction completes: $0.915 per attempt multiplied by five, rounded at the end. That is an estimate, not a measured Replicate incident.

The cost may be small relative to a production bill, but the operational signal is important. If you have an enterprise contract, enable Replicate's setup-failure email alerts. On every plan, stop automatic retry storms and inspect image size, weight loading, and initialization rather than assuming unsuccessful work is free.

## Minimum and maximum instances define different boundaries

Replicate says models scale down to zero instances by default. Deployments let operators change both the minimum and maximum. The [deployment overview](https://replicate.com/docs/topics/deployments) says a minimum keeps instances warm, while a maximum limits scale-out. The [deployment creation guide](https://replicate.com/docs/topics/deployments/create-a-deployment) shows minimum and maximum fields in both settings and API examples; its one-to-five example is an example, not a documented default.

A minimum creates a predictable compute floor:

| Warm minimum | T4 floor | A100 80 GB floor | H100 floor |
|---:|---:|---:|---:|
| 1 instance for 24 hours | $19.44 | $120.96 | $131.76 |
| 1 instance for 30 days | $583.20 | $3,628.80 | $3,952.80 |
| 2 instances for 30 days | $1,166.40 | $7,257.60 | $7,905.60 |

**Estimate assumptions:** all minimum instances remain online continuously; 24-hour day or 720-hour month; September 3 public rates; no extra replicas, contract change, tax, or model-specific charge.

A maximum is a scale-out ceiling, not a monthly budget. For example, five H100 instances online together have a nominal compute run rate of **$27.45/hour** at the September 3 rate. They do not necessarily stay online for an hour, and maximum instances do not predict request volume, setup retries, or how long instances remain idle.

Start with minimum zero when cold boots are acceptable. Keep a nonzero minimum only when the latency and availability requirement justifies the floor. Set a maximum from a tested concurrency target and a tolerable run rate, not from a guess that the autoscaler will rarely reach it.

For different billing shapes, compare the [RunPod Pods and Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) and [Modal per-second pricing guide](https://hostfleet.net/modal-pricing-guide-2026/). Their lifecycle rules differ, so the same GPU name does not make the services interchangeable.

## H200 at the H100 rate is contract-qualified

Replicate still publishes one H100 and one H200 at the same **$0.001525/second ($5.49/hour)** rate, verified September 3. The product boundary changes the buying decision.

The one-H100 row appears in the primary hardware list without a committed-spend note. Every H200 row appears in the additional-hardware section with a committed-spend requirement. Before building around H200, ask for:

- minimum spend and contract term;
- GPU count and reserved capacity;
- eligible region and start date;
- whether the public rate survives the contract structure; and
- what happens when requested capacity is unavailable.

The published number is useful, but the smallest purchasable contract can matter more than the per-GPU arithmetic.

## Prepaid credit is also a runtime dependency

Replicate's [prepaid-credit documentation](https://replicate.com/docs/topics/billing/prepaid-credit), checked September 3, says credit is purchased upfront and deducted as usage occurs. Auto reload is optional. The published minimum threshold is **$5**, and the minimum reload balance is **$15**.

When the balance reaches zero, Replicate says it prevents new work from starting and shuts down infrastructure running for the account. A prediction can rarely overrun the balance, in which case the default payment method is charged for the outstanding amount at month end.

Those are payment-control figures, not GPU prices. For a user-facing deployment:

1. Enable auto reload or operate an equivalent balance process.
2. Alert well before the threshold.
3. Test the application path for blocked new work.
4. Keep a maximum-instance ceiling to limit concurrent expansion.
5. Reconcile credits and instance metrics separately.

A warm minimum is not reliable capacity if the credit balance can shut it down.

## A practical Replicate cost checklist

Before launch, record these inputs:

- **Product shape:** public model, private model, deployment, or official model.
- **Hardware eligibility:** self-serve-looking row versus committed-spend row.
- **Minimum instances:** the intentional warm floor.
- **Maximum instances:** the maximum concurrent compute run rate.
- **Setup behavior:** observed boot duration, failure rate, and retry policy.
- **Alerting access:** Replicate's setup-failure email notifications require an enterprise contract; otherwise use your own monitoring path.
- **Timeout access:** 10-minute default versus enterprise custom timeout.
- **Idle behavior:** observed online tail rather than an assumed universal value.
- **Payment control:** credit balance, threshold, reload target, and alert owner.

Then estimate:

    warm floor
    + successful setup seconds
    + failed setup seconds
    + active processing seconds
    + billable idle seconds
    = total deployment instance-seconds

Multiply the total by the exact configuration rate. Keep official-model metric pricing outside this equation.

## Replicate pricing verdict

Replicate's rate card has not become more complicated; the product boundaries are what make careless estimates fail.

- The live page still publishes 17 GPU configurations.
- Six rows lack a committed-spend note; 11 are contract-qualified.
- Public models generally bill active processing while most private models and deployments bill setup, idle, and active instance time.
- Failed and canceled private-model or deployment work is billed for normal active instance time.
- Deployment setup defaults to a 10-minute timeout; custom one-minute-to-three-hour timeouts require enterprise access.
- Minimum instances create a warm floor, while maximum instances cap concurrent scale-out rather than guaranteeing a monthly total.
- A zero prepaid balance can block work and shut down running infrastructure.

Replicate fits teams that value a managed model and deployment surface more than the lowest bare GPU-hour. The clean forecast is not requests multiplied by runtime. It is the complete online-instance lifecycle, including unsuccessful setup and idle capacity.

## Sources

Official web sources below were checked **September 3, 2026**.

- [Replicate pricing](https://replicate.com/pricing) — 17 GPU rows, hourly equivalents, and committed-spend labels
- [Replicate billing](https://replicate.com/docs/topics/billing) — instance lifecycle, public/private/deployment billing, and failed or canceled runs
- [Replicate official models](https://replicate.com/docs/topics/models/official-models) — always-warm behavior, stable APIs, and model-specific metrics
- [Replicate deployments](https://replicate.com/docs/topics/deployments) — hardware choice, scale-to-zero, minimums, and maximums
- [Create a deployment](https://replicate.com/docs/topics/deployments/create-a-deployment) — settings and API configuration fields
- [Monitor a deployment](https://replicate.com/docs/topics/deployments/monitor-a-deployment) — instance metrics, enterprise-only setup-failure alerts, default timeout, and enterprise custom range
- [Replicate prepaid credit](https://replicate.com/docs/topics/billing/prepaid-credit) — reload thresholds and zero-balance shutdown behavior
- HostFleet GPU dataset: /opt/hostbot-v2/src/data/gpu-pricing.json, updated August 27, 2026; Replicate cells rechecked September 3
- Existing HostFleet baseline: /opt/hostbot-v2/src/content/posts/replicate-pricing-guide-2026.md
- HostFleet research note: /opt/hostbot/data/ai-hosting/notes/2026-06-22-replicate-pricing-limits.md
