---
title: "Replicate pricing 2026: public models vs deployments"
description: "Replicate pricing explained: when hardware seconds apply, why official models use output metrics, and the real monthly floor for a warm deployment."
pubDate: 2026-07-26
updatedDate: 2026-07-26
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed pricing guide: product billing behavior and published hardware rates come from Replicate's public pricing page and documentation. The monthly figures are estimates, not quotes.*

**Pricing verified:** July 26, 2026

# Replicate pricing 2026: public models vs deployments

Replicate does not have one pricing model. It has three hosting shapes with different answers to the question, “Who pays to keep capacity ready?” That distinction matters more than the headline GPU rate.

This is a source-backed infrastructure cost guide, not a model-token pricing roundup. It uses Replicate's live pricing and documentation checked on **July 26, 2026**. For the current cross-provider table, see [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/). For the wider market map, see [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For product workflow and operational fit beyond the bill, see [Replicate for AI inference APIs and jobs](https://hostfleet.net/replicate-for-ai-inference-apis-and-jobs/).

## The short answer

| If you need… | Replicate path | What you pay for | Main tradeoff |
|---|---|---|---|
| A maintained model with a stable API | Official model | Model-specific output metrics, such as output images, video seconds, or input/output tokens | The billing unit is predictable, but it is not a generic GPU-hosting SKU. |
| An intermittent community-model job | Public model | Active processing time only | Setup and idle time are free, but the hardware pool and queue are shared. |
| Your own endpoint and scaling controls | Deployment or most private models | All online instance time: setup, idle, and active processing | You gain control, but warm capacity becomes a real bill. |

The buying rule: **use public models when shared-pool behavior is acceptable; price a deployment as continuously billable capacity whenever you set a nonzero minimum instance count.**

## Why “per token” and “per second” are not interchangeable

Replicate's official-model documentation says official models are always warm, have stable APIs, and use predictable model-specific metrics. Depending on the model, that can mean output images, video seconds, or input and output tokens. This is useful when an official model already fits the product, but it is not a universal model-hosting rate that you can apply to a custom deployment.

Other runtime-priced models use Replicate's published hardware rates. That is the per-second path. The price table becomes especially important when you run a private model or create a deployment, because Replicate says those instances are billed for all the time they are online—not just the seconds spent returning predictions.

That is the key decision boundary:

- **Official model:** buy a maintained inference product with a model-specific pricing metric.
- **Public model:** pay for active work while accepting shared queue and cold-boot exposure.
- **Deployment:** buy an infrastructure control plane; the rate is now an availability budget as well as an execution budget.

## Replicate's live hardware rates

The table uses rates from Replicate's public pricing page and the corresponding rows in HostFleet's current GPU pricing dataset, checked on **July 26, 2026**. Replicate publishes these rates per second; the hourly and 30-day columns are conversions for comparison. The 30-day column applies only to a single deployment or private-model instance kept online for 720 hours. It is **not** the expected cost of a public model that really scales down between requests.

| Published hardware SKU | Published rate | Equivalent per hour | 30-day, one online deployment estimate |
|---|---:|---:|---:|
| Nvidia T4 | $0.000225/sec | $0.81/hr | about $583 |
| Nvidia L40S | $0.000975/sec | $3.51/hr | about $2,527 |
| Nvidia A100 (80 GB) | $0.001400/sec | $5.04/hr | about $3,629 |
| Nvidia H100 | $0.001525/sec | $5.49/hr | about $3,953 |

**Estimate assumptions:** one online instance for **2,592,000 seconds** (720 hours in a 30-day month); published hardware rate only; one instance; no additional replicas, storage, or workload-specific charges. Formula: per-second rate × 3,600 × 720. Re-check [Replicate's pricing page](https://replicate.com/pricing) before committing a production deployment.

## The billing detail that changes the answer

Replicate's billing documentation separates public models from private models and deployments clearly.

| Product state | Is it billed? | What that means in practice |
|---|---|---|
| Public model active processing | Yes | You pay while the model runs your request. |
| Public model setup or idle time | No | Replicate absorbs the warm-pool cost, but you share capacity and can see queueing or cold boots. |
| Private-model or deployment setup | Yes | Weight download and startup time are part of the bill. |
| Private-model or deployment idle time | Yes | A warm endpoint is paid capacity even with no traffic. |
| Private-model or deployment active processing | Yes | Normal serving time is billed too. |

This is why a low per-second number can be read two ways. For a bursty public model, it is close to a work-only rate. For a deployment held warm for user-facing latency, it becomes the floor of the infrastructure bill.

## What a warm deployment really costs

Replicate's billing page says models scale down to their configured minimum number of instances—**zero by default**—and its deployment docs expose hardware plus minimum and maximum instance controls. A minimum of zero gives the platform room to scale down. A minimum of one or more means the deployment intentionally retains online capacity.

For a simple first pass, multiply the one-instance estimate by the number of instances you plan to keep warm:

    warm-capacity floor = published per-second rate × warm instances × seconds online
    traffic-driven capacity = additional online instance-seconds created by load
    monthly deployment estimate = warm-capacity floor + traffic-driven capacity

A one-instance H100 deployment held online for a full 30-day month is about **$3,953** at the current published $5.49/hour equivalent. Two intentionally warm H100 instances are about **$7,906** before traffic causes any additional scale-out. This is arithmetic, not a quote: it excludes every input not covered by the published hardware rate and assumes both instances remain online for all 720 hours.

The practical question is not whether scaling exists. It does. The question is whether the workload can tolerate returning to zero. If it cannot, budget the chosen minimum replica count before comparing providers on their cheapest single-GPU rate. For adjacent cost shapes, see [RunPod pricing: Pods vs Serverless](https://hostfleet.net/runpod-pricing-guide-2026/) and [Modal pricing: per-second GPU billing](https://hostfleet.net/modal-pricing-guide-2026/).

## Two operating edges to budget, not just document

### Shared-pool latency is the price of public-model idle savings

The public-model path is attractive precisely because setup and idle time are free to the customer. But the same billing documentation says the hardware pool is shared. A public-model request can therefore encounter a cold boot or queueing when capacity has to come online. That is often a sensible trade for asynchronous jobs, experiments, and low-duty-cycle tools. It is not the same thing as a dedicated low-latency service.

### A depleted prepaid balance is an availability event

Replicate uses prepaid credit. Its current documentation says auto reload is optional, with a minimum $5 threshold and $15 reload balance. More importantly, when the balance hits zero, Replicate prevents new work from starting and shuts down infrastructure it is running for the account.

For a deployment that matters to users, credit monitoring and auto reload are therefore part of the operating design. Treat them as a production safeguard, not finance-team cleanup.

## Replicate pricing: the practical verdict

Replicate is cheap to try when your workload can use public models and tolerate shared-pool behavior. It becomes a deliberate hosting expense when you need your own warm endpoint.

- Official models use predictable model-specific output metrics; do not force those into a generic GPU-hour comparison.
- Public models can make intermittent work economical because customers do not pay their setup or idle time.
- Deployments and most private models bill all online time, so a nonzero minimum instance count creates a real monthly floor.
- The published H100 rate works out to about **$3,953/month** for one continuously online deployment instance under the stated 30-day assumptions.
- Prepaid credit running to zero stops new work and shuts down hosted infrastructure, so availability needs a balance policy.

Pick the billing shape first, then the hardware. That produces a more useful Replicate budget than treating every model endpoint as the same kind of serverless GPU service.

## Sources

- [Replicate pricing](https://replicate.com/pricing) — checked July 26, 2026
- [Replicate billing](https://replicate.com/docs/topics/billing) — checked July 26, 2026
- [Replicate official models](https://replicate.com/docs/topics/models/official-models) — checked July 26, 2026
- [Replicate deployments](https://replicate.com/docs/topics/deployments) — checked July 26, 2026
- [Create a Replicate deployment](https://replicate.com/docs/topics/deployments/create-a-deployment) — checked July 26, 2026
- [Replicate prepaid credit](https://replicate.com/docs/topics/billing/prepaid-credit) — checked July 26, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, refreshed July 23, 2026
