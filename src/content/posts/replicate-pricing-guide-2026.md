---
title: "Replicate pricing 2026: 17 GPU rates and warm deployment costs"
description: "Replicate GPU pricing checked August 21, including 17 published hardware rows, committed-spend H200 capacity, and transparent warm deployment estimates."
pubDate: 2026-07-26
updatedDate: 2026-08-21
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission from some links on this site. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed pricing guide; estimated monthly costs.** Replicate's product rules and hardware rates below come from its official pricing and documentation pages, checked **August 21, 2026**. The monthly figures are arithmetic estimates, not invoices or measured benchmarks.

> **Pricing verified: August 21, 2026**
>
> **Currency: public USD rates**
>
> **Evidence boundary: a published row does not prove immediate capacity, account eligibility, or equal performance across GPU types**

# Replicate pricing 2026: 17 GPU rates and warm deployment costs

Replicate does not have one universal price. Public models, official models, private models, and deployments put the warm-capacity bill in different places. That product shape matters more than the cheapest number in the hardware table.

The current rate card also has an important boundary that the headline prices hide: Replicate publishes **17 GPU hardware rows**, but 11 sit in an additional-hardware section that explicitly requires committed spend. The H200 looks especially attractive at **$5.49/hour**, the same public rate as the H100, but Replicate labels every H200 configuration as committed-spend capacity. It is a sales-qualified option, not proof of an on-demand H200 you can launch immediately.

For the wider market, use HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) and [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For Replicate's workflow, limits, and operational fit beyond the bill, see [Replicate for AI inference APIs and jobs](https://hostfleet.net/replicate-for-ai-inference-apis-and-jobs/).

## The short answer

| If you need… | Replicate product shape | What becomes billable | Buying warning |
|---|---|---|---|
| A maintained model with a stable API | Official model | A model-specific metric such as an output image, video second, or input/output token | This is a managed inference product, not a generic GPU-hour SKU. |
| An intermittent public-model job | Public model | Active processing time for most runtime-priced models | Setup and idle time are free to you, but the hardware pool and queue are shared by default. |
| A fast-booting fine-tune | Eligible public or private fine-tune | Active processing time | Only versions explicitly labeled fast booting get this exception. |
| Your own endpoint and scaling controls | Deployment or most private models | All online instance time: setup, idle, and active processing | A nonzero minimum instance count creates a warm-capacity floor. |
| H200 or larger multi-GPU capacity | Additional hardware under committed spend | Contract-qualified online instance time | A public rate is not self-serve availability. |

The practical rule is simple: **choose the billing shape before the GPU**. Public models can hide idle cost. Deployments expose it in exchange for dedicated control.

## Replicate's 17 published GPU hardware rates

Replicate publishes per-second and hourly equivalents. The table below preserves both rather than converting an hourly figure back into fake precision. The 30-day column is HostFleet's estimate for one configuration kept online for 720 hours.

### Public rows without a committed-spend note

| Published hardware SKU | Published rate | Published hourly equivalent | 30-day online estimate |
|---|---:|---:|---:|
| Nvidia T4, 1 GPU | $0.000225/sec | $0.81/hr | $583.20 |
| Nvidia L40S, 1 GPU | $0.000975/sec | $3.51/hr | $2,527.20 |
| Nvidia L40S, 2 GPUs | $0.001950/sec | $7.02/hr | $5,054.40 |
| Nvidia A100 80 GB, 1 GPU | $0.001400/sec | $5.04/hr | $3,628.80 |
| Nvidia A100 80 GB, 2 GPUs | $0.002800/sec | $10.08/hr | $7,257.60 |
| Nvidia H100, 1 GPU | $0.001525/sec | $5.49/hr | $3,952.80 |

**Source and date for every published rate in this table:** [Replicate pricing](https://replicate.com/pricing), checked **August 21, 2026**. The page does not attach a committed-spend note to these six rows. That does not guarantee stock, quota, region access, or launch permission for a specific account.

### Additional rows marked as committed-spend capacity

| Published hardware SKU | Published rate | Published hourly equivalent | 30-day online estimate |
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

**Source and date for every published rate and restriction in this table:** [Replicate pricing](https://replicate.com/pricing), checked **August 21, 2026**. Replicate says H200 capacity is available with committed-spend contracts and labels the other additional multi-GPU rows the same way. Treat these as contract anchors, not launchable on-demand quotes.

### How the monthly column was calculated

The monthly estimates use one transparent assumption:

    published per-second rate × 3,600 seconds × 720 hours

That is one named hardware configuration online for a 30-day planning month. It assumes the rate stays unchanged and the configuration remains online continuously. It excludes traffic-driven replicas, storage, data transfer, tax, support, contract discounts, failed setup work, and any product-specific charges not present in the public hardware row. It also makes no performance-equivalence claim.

The table intentionally shows the full configuration price. It does not divide an eight-GPU total and pretend a single GPU can be rented separately. For cross-provider H100 variants and product boundaries, use the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/).

## Public models and deployments bill different lifecycle phases

Replicate's billing documentation breaks an instance lifecycle into setup, active, idle, and offline states. The customer does not pay the same phases for every product.

| Product or state | Setup billed? | Idle billed? | Active processing billed? | Operational consequence |
|---|---:|---:|---:|---|
| Public model | No | No | Yes | You avoid the warm floor but share a hardware pool and request queue by default. |
| Most private models | Yes | Yes | Yes | Dedicated capacity exposes startup and idle time in the bill. |
| Fast-booting fine-tune | No | No | Yes | This exception applies only where Replicate labels the version as fast booting. |
| Deployment | Yes | Yes | Yes | Hardware and scaling controls make every online instance part of the capacity budget. |
| Official model | Model-specific | Model-specific | Priced by published input/output metric | Official models are always warm, stable-API products rather than generic runtime-priced hardware. |

**Source and date:** [Replicate billing](https://replicate.com/docs/topics/billing) and [official-model documentation](https://replicate.com/docs/topics/models/official-models), checked **August 21, 2026**.

This is why the same per-second hardware number can imply two very different budgets. A public-model request can be close to work-only billing. A private model or deployment held warm turns the rate into an availability floor.

## What minimum instances do to the bill

Replicate says models scale down to a minimum of zero instances by default, and deployments let you customize the minimum and maximum. The deployment documentation also says a minimum can keep instances warm, while a maximum limits scale-out and therefore constrains one part of the spending envelope.

A useful first-pass model is:

    warm floor = hardware rate × minimum instances × online seconds
    scale-out cost = hardware rate × extra instance-seconds created by traffic
    estimated deployment bill = warm floor + scale-out cost

At the August 21 public rates:

- A T4 deployment kept at one minimum instance for 720 hours has a compute floor of **$583.20**.
- A one-GPU L40S deployment kept warm for 720 hours has a compute floor of **$2,527.20**.
- A one-GPU H100 deployment kept warm for 720 hours has a compute floor of **$3,952.80**.
- The published one-GPU H200 arithmetic also produces **$3,952.80**, but that row requires committed spend and should not be budgeted as self-serve capacity.

These are estimates derived from [Replicate's August 21 pricing page](https://replicate.com/pricing), using the 720-hour assumptions above. They are not quotes. A minimum of zero removes the intentional always-warm floor, but setup, active work, and idle time remain billable whenever a deployment instance is online.

The deeper choice is latency versus idle cost. If requests can tolerate a cold boot, start with a minimum of zero and observe setup time, queue time, and billable instance-seconds. If the endpoint must respond from warm capacity, budget the minimum replica count before looking at traffic growth.

For adjacent billing shapes, compare the [RunPod Pods and Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) and [Modal per-second pricing guide](https://hostfleet.net/modal-pricing-guide-2026/). Their rates are not interchangeable with Replicate's managed deployment surface, but the lifecycle comparison is useful.

## H200 at the H100 price is not a free upgrade

The public rate card assigns both one-GPU H100 and one-GPU H200 the same **$0.001525/second ($5.49/hour)** rate as of August 21. Reading only that number makes H200 look like the obvious choice.

The restriction changes the answer. H100 appears in Replicate's primary hardware list without a committed-spend note. H200 appears under additional hardware with a committed-spend requirement. Before treating H200 as a candidate, ask for the minimum spend, term, capacity reservation, region, start date, GPU count, and whether the published rate survives the contract structure.

A rate card tells you the unit price. It does not tell you the smallest contract you can actually buy.

## Prepaid credit can become an availability dependency

Replicate's prepaid-credit documentation says auto reload is optional. As of **August 21, 2026**, the published minimum auto-reload threshold is **$5** and the minimum reload balance is **$15**. When the balance reaches zero, Replicate says it blocks new work and shuts down infrastructure running for the account.

**Source and date:** [Replicate prepaid credit](https://replicate.com/docs/topics/billing/prepaid-credit), checked **August 21, 2026**.

For a user-facing deployment, this belongs in the runbook:

- Enable auto reload or maintain a separate balance-control process.
- Alert before the threshold rather than waiting for a failed prediction.
- Test what the application does when new work is rejected.
- Keep a hard maximum-instance limit so a traffic spike cannot expand without a bound.

The payment mechanism is therefore part of deployment reliability, not bookkeeping after the fact.

## Who Replicate pricing fits

### Good fit: intermittent public-model work

Replicate is attractive when an existing public model fits and the workload can tolerate shared-pool queueing or cold boots. Setup and idle time are not billed to the customer for public models, which is a clean cost shape for experiments, asynchronous jobs, and low-duty-cycle features.

### Good fit: teams that want deployment controls without managing GPU VMs

Deployments provide hardware selection, minimum and maximum instances, a private endpoint, scaling, rollouts, and monitoring. The price can be rational when those controls replace infrastructure work the team would otherwise own.

### Weak fit: buyers shopping only for the cheapest raw GPU-hour

Replicate's deployment rate includes a managed product surface, and private/deployment instances bill setup and idle time. If the requirement is simply a long-running shell on the cheapest card, compare exact GPU VM or Pod products instead of reading Replicate as bare rental.

### Contract-first fit: H200 and large multi-GPU deployments

The public numbers are useful planning anchors, but eligibility comes before arithmetic. Get the committed-spend terms before designing around those rows.

## Verdict

Replicate's pricing is straightforward only after separating product shapes:

- Public models bill active processing and can avoid a customer-paid warm floor.
- Most private models and deployments bill setup, idle, and active time.
- Official models use model-specific input/output metrics rather than generic GPU seconds.
- Six GPU configurations appear without a committed-spend note; 11 additional rows require committed spend.
- H200 is publicly priced at the H100 rate, but it is contract-qualified capacity.
- A nonzero deployment minimum turns the hourly rate into a predictable monthly floor.

For most teams, the right sequence is: choose public model versus deployment, choose cold versus warm capacity, verify account access, then select hardware. Re-check the official rate and contract boundary immediately before purchase.

## Sources

- [Replicate pricing](https://replicate.com/pricing) — all 17 GPU hardware rows and committed-spend labels; checked August 21, 2026
- [Replicate billing](https://replicate.com/docs/topics/billing) — lifecycle billing, public/private model rules, deployments, and fast-booting fine-tunes; checked August 21, 2026
- [Replicate official models](https://replicate.com/docs/topics/models/official-models) — always-warm behavior, stable API, and model-specific pricing metrics; checked August 21, 2026
- [Replicate deployments](https://replicate.com/docs/topics/deployments) — hardware control, autoscaling, warm minimums, and maximum instances; checked August 21, 2026
- [Create a Replicate deployment](https://replicate.com/docs/topics/deployments/create-a-deployment) — hardware, minimum-instance, and maximum-instance configuration; checked August 21, 2026
- [Replicate prepaid credit](https://replicate.com/docs/topics/billing/prepaid-credit) — auto reload and zero-balance behavior; checked August 21, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, cross-checked as the live-site data baseline; dataset-level verified date August 13, 2026
- Existing HostFleet Replicate pricing guide — /opt/hostbot-v2/src/content/posts/replicate-pricing-guide-2026.md, used as the refresh baseline
