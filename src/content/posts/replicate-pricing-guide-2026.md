---
title: "Replicate pricing 2026: GPU rates, idle-tail costs, and deployment floors"
description: "Replicate GPU pricing checked September 2026, with all 17 hardware rates, billable idle-tail math, warm floors, and metric limits."
pubDate: 2026-07-26
updatedDate: 2026-09-20
category: ai-hosting
author: Alex Harmon
draft: false
---

**Source-backed pricing guide; estimates are labeled.** This refresh uses Replicate's live pricing, billing, deployment, monitoring, API, official-model, and prepaid-credit documentation checked on **September 20, 2026**. HostFleet did not run a Replicate Deployment or measure its idle cutoff, cold-start latency, throughput, queue time, or availability. See the [HostFleet methodology](https://hostfleet.net/about/) for the evidence boundary.

> **Pricing verified:** September 20, 2026<br>
> **Currency:** public USD list rates<br>
> **Evidence mode:** sourced platform behavior plus transparent arithmetic; no Replicate billing experiment

# Replicate pricing 2026: GPU rates, idle-tail costs, and deployment floors

Replicate pricing is simple at the rate-card level and easy to underestimate at the lifecycle level. Public models generally bill active processing while Replicate absorbs setup and idle time. Most private models and Deployments bill every second an instance is online: setup, active work, and idle waiting. Official models use their own output- or input-based metrics instead of the generic GPU-second table.

The most important correction in this refresh is that a Deployment with a minimum of zero does **not** stop billing as soon as a prediction finishes. Replicate says the instance remains idle for “a few minutes” before shutting down. The public documentation does not expose one numeric idle duration, so this guide prices each observed online minute instead of inventing a universal cutoff. At current list rates, one billable minute costs **$0.0135 on a T4** and **$0.0915 on an H100**.

Replicate's prediction metrics do not close that gap. `predict_time` covers active CPU or GPU time and excludes time waiting to start. `total_time` covers the prediction's end-to-end completion time, but it ends with the prediction and therefore cannot represent the post-request idle window. The Deployment dashboard shows instance state, but its historical view is aggregated into 15-minute intervals. For cost control, online instance time is the quantity that matters.

For broader market context, use HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) and [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For product fit beyond the bill, read [Replicate for AI inference APIs and jobs](https://hostfleet.net/replicate-for-ai-inference-apis-and-jobs/).

## Replicate pricing: the short answer

| Product shape | What the customer pays for | Cost boundary to model |
|---|---|---|
| Public model | Active processing | Shared capacity can add queue and setup delay, but setup and idle time are not billed to the customer |
| Most private models | Setup, idle, and active instance time | Dedicated capacity makes cold boots and gaps between requests billable |
| Fast-booting fine-tune | Active processing | The exception applies only when Replicate labels the version as fast booting |
| Deployment | Every second its instances are online | Minimum instances create a warm floor; zero minimum still leaves a billable idle tail |
| Official model | Model-specific input or output metric | This is not generic GPU-second pricing |
| H200 or large multi-GPU configuration | Contract-qualified instance time | The public price does not reveal the minimum committed spend |

Choose the product shape before comparing GPU rates. A $5.49/hour H100 means something different when it is a continuously warm Deployment, an autoscaled Deployment with billable setup and idle time, or a public model that charges only while processing.

## Replicate rates in HostFleet's live GPU dataset

HostFleet's live data file was updated **September 17, 2026**. It contains four single-GPU Replicate rows, and every Replicate cell below was rechecked against [Replicate's pricing page](https://replicate.com/pricing) on **September 20, 2026**.

| GPU | VRAM | Public rate | Hourly equivalent | One online minute | 730-hour warm estimate |
|---|---:|---:|---:|---:|---:|
| T4 | 16 GB | $0.000225/sec | $0.81/hr | $0.0135 | $591.30 |
| L40S | 48 GB | $0.000975/sec | $3.51/hr | $0.0585 | $2,562.30 |
| A100 | 80 GB | $0.001400/sec | $5.04/hr | $0.0840 | $3,679.20 |
| H100 | 80 GB | $0.001525/sec | $5.49/hr | $0.0915 | $4,007.70 |

**Estimate assumptions:** one named configuration remains online for 730 hours, the average month used for comparison; September 20 public USD rate; no additional replicas, contract adjustment, credits, tax, or unrelated model-specific charge. The minute and monthly columns are arithmetic from the published rate, not measured invoices or performance comparisons.

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to replace 730 hours with the billable duty cycle you actually observe. For a Replicate Deployment, that duty cycle must include setup and idle online time, not just prediction runtime.

## All 17 published GPU configurations

Replicate still publishes **17 GPU configurations**. Six appear in the primary hardware list without a committed-spend note. Eleven appear as additional H200 or multi-GPU capacity that Replicate marks as available with committed-spend contracts. Every rate in this table comes from [Replicate pricing](https://replicate.com/pricing), checked **September 20, 2026**.

| Published configuration | Public rate | Hourly equivalent | 730-hour online estimate | Access note |
|---|---:|---:|---:|---|
| Nvidia T4, 1 GPU | $0.000225/sec | $0.81/hr | $591.30 | No committed-spend note |
| Nvidia L40S, 1 GPU | $0.000975/sec | $3.51/hr | $2,562.30 | No committed-spend note |
| Nvidia L40S, 2 GPUs | $0.001950/sec | $7.02/hr | $5,124.60 | No committed-spend note |
| Nvidia A100 80 GB, 1 GPU | $0.001400/sec | $5.04/hr | $3,679.20 | No committed-spend note |
| Nvidia A100 80 GB, 2 GPUs | $0.002800/sec | $10.08/hr | $7,358.40 | No committed-spend note |
| Nvidia H100, 1 GPU | $0.001525/sec | $5.49/hr | $4,007.70 | No committed-spend note |
| Nvidia L40S, 4 GPUs | $0.003900/sec | $14.04/hr | $10,249.20 | Committed spend |
| Nvidia L40S, 8 GPUs | $0.007800/sec | $28.08/hr | $20,498.40 | Committed spend |
| Nvidia A100 80 GB, 4 GPUs | $0.005600/sec | $20.16/hr | $14,716.80 | Committed spend |
| Nvidia A100 80 GB, 8 GPUs | $0.011200/sec | $40.32/hr | $29,433.60 | Committed spend |
| Nvidia H100, 2 GPUs | $0.003050/sec | $10.98/hr | $8,015.40 | Committed spend |
| Nvidia H100, 4 GPUs | $0.006100/sec | $21.96/hr | $16,030.80 | Committed spend |
| Nvidia H100, 8 GPUs | $0.012200/sec | $43.92/hr | $32,061.60 | Committed spend |
| Nvidia H200, 1 GPU | $0.001525/sec | $5.49/hr | $4,007.70 | Committed spend |
| Nvidia H200, 2 GPUs | $0.003050/sec | $10.98/hr | $8,015.40 | Committed spend |
| Nvidia H200, 4 GPUs | $0.006100/sec | $21.96/hr | $16,030.80 | Committed spend |
| Nvidia H200, 8 GPUs | $0.012200/sec | $43.92/hr | $32,061.60 | Committed spend |

The monthly estimate is:

    published hourly rate × 730 hours

It assumes the whole configuration remains online. It does not divide an eight-GPU row and imply that one-eighth can be rented separately. Absence of a committed-spend note is also not proof of stock, quota, regional availability, or launch permission.

For raw accelerator-market context, compare exact product boundaries in the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). Replicate Deployments are managed inference capacity, not generic GPU virtual machines.

## What Replicate bills during an instance lifecycle

Replicate's [billing documentation](https://replicate.com/docs/topics/billing), checked September 20, describes setup, active, idle, and offline states.

| Product or state | Setup billed? | Idle billed? | Active billed? | Planning consequence |
|---|---:|---:|---:|---|
| Public model | No | No | Yes | Intermittent traffic avoids a customer-paid warm floor, but uses shared capacity |
| Most private models | Yes | Yes | Yes | Setup and gaps between requests belong in the forecast |
| Fast-booting fine-tune | No | No | Yes | Verify that Replicate labels the exact version as fast booting |
| Deployment | Yes | Yes | Yes | Every online instance contributes to the bill |
| Offline instance | No | No | No | Billing stops only after the instance has gone offline |
| Official model | Model-specific | Model-specific | Model-specific | Use the model's published unit price rather than this hardware table |

The [official-model documentation](https://replicate.com/docs/topics/models/official-models), checked September 20, says official models are always warm and use metrics such as output images, video duration, or input and output tokens. Those prices should not be blended with private-hardware runtime.

## Zero minimum still has an idle-tail cost

Replicate says models scale down to the configured minimum, which is zero by default. Deployments can change both minimum and maximum instance counts. Zero therefore removes the intentional always-warm floor, but it does not mean the instance disappears when the response is returned. The billing page says an instance remains idle for “a few minutes” before shutdown so it can serve another request without setting up again.

The public documentation checked September 20 does not provide one numeric idle duration or a public setting that controls it. A fixed three-, five-, or ten-minute assumption would be guesswork. The defensible unit is cost per observed online minute:

| Configuration | Each online minute | Each 10 online minutes | Each online hour |
|---|---:|---:|---:|
| T4, 1 GPU | $0.0135 | $0.1350 | $0.81 |
| L40S, 1 GPU | $0.0585 | $0.5850 | $3.51 |
| A100 80 GB, 1 GPU | $0.0840 | $0.8400 | $5.04 |
| H100, 1 GPU | $0.0915 | $0.9150 | $5.49 |
| H100, 8 GPUs | $0.7320 | $7.3200 | $43.92 |

**Estimate assumptions:** one instance or named multi-GPU configuration remains online for the full interval; September 20 public rates; no credits, discount, tax, or downstream-model charge. These rows price a duration; they do not claim Replicate's idle tail lasts 10 minutes. The eight-H100 configuration is contract-qualified.

The cost model for a Deployment that scales to zero is:

    billable setup seconds
    + active prediction seconds
    + billable idle seconds before shutdown
    = online instance-seconds

Then multiply online instance-seconds by the configuration's per-second rate. If traffic arrives during the idle window, the same warm instance may be reused and the idle interval becomes part of a longer online session. If traffic is sparse enough for the instance to go offline between requests, each new cold session can add setup and another idle tail.

This makes traffic shape important. Ten predictions packed into one warm session do not have the same lifecycle cost as ten isolated predictions that each create a new session, even when active GPU time is identical. HostFleet has designed a capped boot-UUID experiment to locate that boundary, but it remains unmeasured and account-gated. This article does not turn the design into a benchmark result.

## Why `predict_time` is not the billable duration

Replicate's [HTTP API reference](https://replicate.com/docs/reference/http), checked September 20, documents prediction timestamps plus two timing metrics:

- `predict_time` is CPU or GPU time used while the prediction is running and excludes time waiting to start.
- `total_time` is the total time the prediction took to complete.
- `created_at`, `started_at`, and `completed_at` locate the prediction lifecycle.

Those fields are useful for latency and active-work analysis, but neither metric is a complete Deployment bill. Setup can precede active prediction work, and billable idle time can continue after `completed_at`. A cost report that multiplies `predict_time` by the hardware rate will undercount a Deployment whenever it paid for setup or idle online time.

The [Deployment monitoring guide](https://replicate.com/docs/topics/deployments/monitor-a-deployment), checked September 20, exposes latency, throughput, errors, instance status, queue depth, and GPU-memory usage. It says historical metrics cover up to 24 hours and are aggregated into 15-minute intervals. That is useful for capacity trends, but a 15-minute bucket is too coarse to establish an exact scale-to-zero cutoff described only as “a few minutes.”

A practical reconciliation needs one of these:

1. Precise online-instance usage from Replicate's billing or account records.
2. An isolated Deployment and charge delta with no unrelated traffic.
3. Model instrumentation that records a boot identifier, so warm reuse can be distinguished from a new setup.

Without that evidence, label per-minute arithmetic as an estimate and leave the idle duration unknown.

## Minimum and maximum instances define different cost boundaries

A nonzero minimum is the predictable part of a Deployment bill. Using the September 20 rates, these are the one-instance warm floors:

| Warm minimum | T4 floor | A100 80 GB floor | H100 floor |
|---:|---:|---:|---:|
| 1 instance for 24 hours | $19.44 | $120.96 | $131.76 |
| 1 instance for 730 hours | $591.30 | $3,679.20 | $4,007.70 |
| 2 instances for 730 hours | $1,182.60 | $7,358.40 | $8,015.40 |

**Estimate assumptions:** all minimum instances remain online continuously; 24-hour day or 730-hour comparison month; September 20 public rates; no additional replicas, contract change, credits, tax, or model-specific charge.

A maximum is different. It caps simultaneous scale-out, not monthly spend. Five H100 instances online together have a list-price run rate of **$27.45/hour**, sourced from the September 20 $5.49/hour rate. They may run for seconds or hours, and the maximum setting says nothing about request volume, setup retries, or the duration of each idle tail.

Start at minimum zero when cold setup is acceptable. Keep a nonzero minimum only when tested latency and availability requirements justify the floor. Set the maximum from a tested concurrency target and a tolerable concurrent run rate. For different lifecycle shapes, compare the [RunPod Pods and Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) and [Modal per-second pricing guide](https://hostfleet.net/modal-pricing-guide-2026/); matching GPU names do not make their billing boundaries interchangeable.

## Setup failures and retries are also online time

Replicate says private-model and Deployment instances bill setup, idle, and active time. Its billing page also says failed and canceled runs for these products are billed for the time their instances were active as normal. The wording elsewhere on the page discusses other failure contexts differently, so the safe claim is specific: online private-model and Deployment instance time remains the billing boundary.

The monitoring guide, checked September 20, says Deployment setup has a **10-minute default timeout**. Custom timeouts from one minute through three hours and setup-failure email notifications require an enterprise contract. A timeout is a ceiling, not evidence that each failure consumes the full interval.

At the full default timeout, one failed setup would expose approximately **$0.14 on T4**, **$0.84 on A100**, or **$0.92 on H100**, based on September 20 rates. Those figures equal per-second price multiplied by 600 seconds and are estimates, not measured Replicate incidents. Retries multiply the exposure, so automatic retry loops need a cap even when no prediction succeeds.

## H200 at the H100 rate is contract-qualified

Replicate lists one H100 and one H200 at the same **$0.001525/second ($5.49/hour)** rate as of September 20. The access boundary changes the buying decision. The one-H100 row appears in the primary list without a committed-spend note, while every H200 row is marked as committed-spend capacity.

Before planning around H200, ask Replicate for the minimum spend, term, GPU count, region, capacity start date, and whether the public unit rate survives the contract structure. A public price is useful for arithmetic, but it does not disclose the smallest purchasable commitment.

## Prepaid credit can shut down warm capacity

Replicate's [prepaid-credit documentation](https://replicate.com/docs/topics/billing/prepaid-credit), checked September 20, says auto reload is optional, the published minimum reload threshold is **$5**, and the minimum reload balance is **$15**. When credit reaches zero, Replicate says it prevents new work from starting and shuts down infrastructure running for the account. A prediction can rarely overrun the balance, in which case Replicate charges the outstanding amount to the default payment method at month end.

For a production Deployment, monitor the credit balance separately from request health. A configured warm minimum is not dependable capacity if the payment balance can turn the infrastructure off.

## Replicate pricing checklist

Before launch, record:

- **Product shape:** public model, private model, Deployment, or official model.
- **Hardware access:** primary-list configuration or committed-spend capacity.
- **Minimum instances:** intentional always-warm floor.
- **Maximum instances:** maximum concurrent list-price run rate.
- **Setup behavior:** observed setup duration, failure rate, and retry cap.
- **Idle behavior:** observed online tail; do not substitute “a few minutes” with an invented constant.
- **Metrics boundary:** `predict_time` for active work, not complete billed lifetime.
- **Payment control:** credit balance, reload settings, and alert owner.

Estimate Deployment compute as:

    warm-floor instance-seconds
    + successful setup seconds
    + failed setup seconds
    + active prediction seconds
    + billable idle seconds
    = total online instance-seconds

Multiply by the exact configuration rate. Keep official-model metric pricing and any downstream-model charges outside that hardware-lifecycle equation.

## Replicate pricing verdict

Replicate's public rate card remained unchanged in this September 20 check: 17 GPU configurations, with six in the primary list and 11 marked as committed-spend capacity. The rate card is not the hard part. The hard part is measuring the online lifecycle.

- Public models generally bill active processing, while most private models and Deployments bill setup, active, and idle instance time.
- A zero minimum removes the permanent warm floor but not the post-request idle tail.
- Replicate describes that tail only as “a few minutes,” so a universal numeric cooldown remains unverified.
- Each online minute currently costs $0.0135 on T4 through $0.0915 on single-H100 hardware.
- `predict_time` and `total_time` do not expose the complete setup-plus-post-request-idle billing window.
- Nonzero minimums create clear warm floors; maximums cap concurrency rather than monthly spend.
- Setup failures, retry loops, and depleted prepaid credit are operational billing risks.

Replicate fits teams that value a managed model and Deployment surface more than the lowest raw GPU-hour. The honest forecast is not request count multiplied by `predict_time`. It is the total time every paid instance remains online.

## Sources

Official web sources below were checked **September 20, 2026**.

- [Replicate pricing](https://replicate.com/pricing) — all 17 GPU configurations, per-second and hourly rates, and committed-spend labels
- [Replicate billing](https://replicate.com/docs/topics/billing) — setup, active, idle, and offline states; public/private/Deployment billing; the “few minutes” idle description; failed and canceled runs
- [Replicate Deployments](https://replicate.com/docs/topics/deployments) — configurable hardware, minimum instances, and maximum instances
- [Create a Deployment](https://replicate.com/docs/topics/deployments/create-a-deployment) — minimum and maximum settings
- [Monitor a Deployment](https://replicate.com/docs/topics/deployments/monitor-a-deployment) — dashboard metrics, 24-hour history, 15-minute aggregation, setup timeout, and enterprise-only controls
- [Replicate HTTP API reference](https://replicate.com/docs/reference/http) — prediction timestamps, `predict_time`, and `total_time`
- [Replicate official models](https://replicate.com/docs/topics/models/official-models) — always-warm behavior and model-specific pricing units
- [Replicate prepaid credit](https://replicate.com/docs/topics/billing/prepaid-credit) — reload limits and zero-balance shutdown behavior
- HostFleet GPU dataset: /opt/hostbot-v2/src/data/gpu-pricing.json, updated September 17, 2026; Replicate cells rechecked September 20
- Existing HostFleet baseline: /opt/hostbot-v2/src/content/posts/replicate-pricing-guide-2026.md
- HostFleet research note: /opt/hostbot/data/ai-hosting/notes/2026-09-04-replicate-deployment-idle-cost-boundary.md
