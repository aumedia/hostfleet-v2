---
title: "RunPod pricing 2026: Pods vs Serverless after the August rate changes"
description: "RunPod Pod and Serverless rates checked August 18, with price increases, break-even worker hours, storage costs, and a documentation mismatch."
pubDate: 2026-07-24
updatedDate: 2026-08-18
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check; estimated break-even totals.** RunPod's public pricing page and billing documentation were checked on **August 18, 2026**. The historical comparison uses HostFleet's August 10 full-verification note. The monthly totals, percentage changes, and break-even hours are transparent arithmetic—not invoice predictions, capacity checks, or performance benchmarks.

# RunPod pricing 2026: Pods vs Serverless after the August rate changes

RunPod still has two fundamentally different cost shapes. **Pods** are dedicated containers billed while allocated. **Serverless Flex workers** can scale to zero, but their higher hourly rate applies during startup, execution, and the configured idle window.

The practical answer remains simple: **Serverless wins when it avoids enough idle time. A Secure Cloud Pod wins when capacity stays allocated for most of the month.** What changed is the crossover. RunPod raised several public Secure Cloud Pod rates after HostFleet's August 10 check, and the public H100 Serverless rate moved from $4.55 to $4.79 per hour.

> **Verified date:** August 18, 2026<br>
> **Currency:** public USD list rates<br>
> **Scope:** selected Secure Cloud on-demand Pods, Serverless Flex workers, storage, and public account limits<br>
> **Boundary:** a published rate does not prove inventory, region access, quota, or equivalent performance

## What changed since the August 10 RunPod check

The old column below comes from HostFleet's full source verification on **August 10, 2026**. The current column comes from [RunPod's public pricing page](https://www.runpod.io/pricing), checked **August 18, 2026**. These are public list-rate observations, not invoices or negotiated offers.

| Product | August 10 rate | August 18 rate | Change |
|---|---:|---:|---:|
| Secure Cloud L4 Pod | $0.39/hr | $0.49/hr | **+25.6%** |
| Secure Cloud RTX 4090 Pod | $0.69/hr | $0.74/hr | **+7.2%** |
| Secure Cloud RTX PRO 6000 Pod | $1.99/hr | $2.09/hr | **+5.0%** |
| Secure Cloud H200 Pod | $4.39/hr | $4.59/hr | **+4.6%** |
| Secure Cloud B200 Pod | $5.89/hr | $6.79/hr | **+15.3%** |
| Secure Cloud B300 Pod | $7.39/hr | $7.89/hr | **+6.8%** |
| H100 PRO Serverless Flex tier | $4.55/hr | $4.79/hr | **+5.3%** |

The percentage column is an estimate using `(August 18 rate ÷ August 10 rate − 1) × 100`, rounded to one decimal place. Selected A40, L40S, A100 PCIe, and H100 PCIe Secure Cloud Pod rates did not change in this bounded comparison.

The L4 and B200 increases are the most material. The L4 Pod is still inexpensive in absolute terms, but its always-on 30-day estimate rises from $280.80 to $352.80. The B200 Pod rises from $4,240.80 to $4,888.80 for the same 720-hour assumption. Both calculations use the dated public rates above and exclude storage and other charges.

## A current RunPod documentation mismatch buyers should not ignore

RunPod's public pricing page lists the H100 PRO Serverless Flex tier at **$4.79/hour** on August 18. The [Serverless endpoint settings reference](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked the same day, lists H100 PRO at **$0.00116/second**. Multiplying that documentation figure by 3,600 produces **$4.176/hour**, which does not reconcile with the public Flex table.

This guide uses **$4.79/hour** for H100 Flex estimates because RunPod's [Serverless pricing documentation](https://docs.runpod.io/serverless/pricing), checked August 18, directs readers to the public pricing page for compute rates. That choice does not resolve the inconsistency. Before approving a budget, confirm the rate shown for the exact GPU tier in the RunPod console and retain a dated capture.

That evidence boundary matters more than choosing the lower-looking number. A rate guide should not silently combine two official figures that disagree.

## Pods versus Serverless: the updated break-even table

The selected list rates below come from [RunPod's public pricing page](https://www.runpod.io/pricing), checked **August 18, 2026**. Pod prices are Secure Cloud on-demand rates. Serverless prices are Flex-worker tier rates; a tier can represent a GPU pool rather than guarantee one exact card.

The last three columns are estimates:

```text
Pod month = Secure Cloud Pod rate × 720 hours
Flex break-even hours = Pod month ÷ Serverless Flex rate
Break-even share = Flex break-even hours ÷ 720
```

| Capacity point | Secure Cloud Pod | Serverless Flex | Pod for 720 hours | Flex break-even vs always-on Pod |
|---|---:|---:|---:|---:|
| L4 / 24 GB tier | $0.49/hr | $0.69/hr | $352.80 | 511.3 hours (71%) |
| A40 / 48 GB tier | $0.44/hr | $1.22/hr | $316.80 | 259.7 hours (36%) |
| L40S / 48 GB tier | $0.99/hr | $1.75/hr | $712.80 | 407.3 hours (57%) |
| A100 PCIe / 80 GB tier | $1.39/hr | $2.72/hr | $1,000.80 | 367.9 hours (51%) |
| H100 PCIe / 80 GB tier | $2.89/hr | $4.79/hr | $2,080.80 | 434.4 hours (60%) |
| H200 | $4.59/hr | $5.93/hr | $3,304.80 | 557.3 hours (77%) |
| B200 | $6.79/hr | $8.64/hr | $4,888.80 | 565.8 hours (79%) |
| B300 | $7.89/hr | $9.98/hr | $5,680.80 | 569.2 hours (79%) |

**Estimate assumptions:** one GPU; a 30-day month of 720 hours; public list rates checked August 18; compute only; no storage, tax, support, negotiated discount, or commitment. The Serverless column assumes one GPU per worker. Availability, card performance, region, and throughput remain unmeasured.

The table is not a universal Pod-versus-Serverless verdict. It compares a Pod held continuously for 720 hours with a Flex worker billed for fewer hours. If an operator reliably starts and stops a Pod around work, the lower Pod hourly rate can remain attractive without paying for an always-on month.

## The H100 crossover moved down

One Secure Cloud H100 PCIe Pod held for 720 hours is still estimated at **$2,080.80** from the August 18 public **$2.89/hour** rate. At the refreshed public H100 Flex rate of **$4.79/hour**, that budget buys about **434.4 billable worker-hours**, or roughly 60% of the month.

```text
Always-on Pod: $2.89 × 720 = $2,080.80
Flex break-even: $2,080.80 ÷ $4.79 = 434.4 worker-hours
```

At the August 10 H100 Flex rate of $4.55/hour, the same Pod budget bought about 457.3 worker-hours. The new public rate therefore lowers the crossover by about 22.9 hours.

For a burstier example, 100 H100 Flex worker-hours are estimated at **$479** using the August 18 public rate. Six hundred worker-hours are estimated at **$2,874**, which is above the continuously allocated Pod estimate. Both exclude startup surprises, storage, tax, and other infrastructure.

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) when you need 1%, 10%, and always-warm sensitivity checks. For cross-provider H100 product shapes, use the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/).

## Serverless billing begins before useful inference

RunPod's [Serverless pricing documentation](https://docs.runpod.io/serverless/pricing), checked **August 18, 2026**, says workers bill from start until full stop, rounded up to the nearest second. Billable time includes:

1. container initialization and model loading;
2. request execution; and
3. the idle timeout after work completes.

Flex workers can scale to zero. Active workers run continuously, and the current documentation describes their discount as available through a sales inquiry rather than publishing a numeric Active-worker rate. This guide therefore uses public Flex rates only.

The [endpoint settings reference](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked August 18, lists these public defaults:

| Setting | Default | Cost or reliability effect |
|---|---:|---|
| Active workers | 0 | Permits scale-to-zero and cold starts. |
| Maximum workers | 3 | Caps initial concurrency and spend until changed. |
| GPUs per worker | 1 | More GPUs multiply the allocation. |
| Idle timeout | 5 seconds | Billed after a request while the worker waits. |
| Execution timeout | 600 seconds | Limits a job before the worker stops; configurable. |
| Job TTL | 24 hours | Queue delay consumes part of the job lifespan. |

Those are configuration defaults, not measured behavior. Count actual image pull, startup, model load, execution, retry, and idle seconds from a representative deployment. The [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) covers the operational fit beyond the rate card, while the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) compares other deployment surfaces.

## Storage can outlive the Pod

RunPod's [Pods pricing documentation](https://docs.runpod.io/pods/pricing), checked **August 18, 2026**, publishes these storage rates:

| Storage type | Running Pod | Stopped Pod | Billing boundary |
|---|---:|---:|---|
| Container disk | $0.10/GB-month | Not charged | Temporary; erased when the Pod stops. |
| Volume disk | $0.10/GB-month | $0.20/GB-month | Persistent until the Pod is deleted. |
| Network volume under 1 TB | $0.07/GB-month | $0.07/GB-month | Portable between Pods; billed hourly. |
| Network volume over 1 TB | $0.05/GB-month | $0.05/GB-month | Lower public rate above the threshold. |

For a 100 GB allocation kept for a full billing month, those August 18 rates imply about **$10** for a running volume disk, **$20** for a stopped volume disk, or **$7** for a sub-1-TB network volume. These are arithmetic estimates, not quotes. Container and volume disks bill per second; network volumes bill hourly. RunPod says Pods have no data ingress or egress fees, but critical data still needs an external backup.

Stopping compute is therefore not the same as reaching a zero bill. Persistent storage needs its own deletion and retention policy.

## Prepaid credit is an uptime dependency

RunPod's [billing overview](https://docs.runpod.io/accounts-billing/billing), checked **August 18, 2026**, describes a prepaid-credit system, a default **$80/hour** spend limit across resources, and a requirement to hold at least one hour of credit for the selected Pod configuration before deployment.

At a zero balance, RunPod says Pods with a network volume are stopped and preserve data on that volume. Pods without one are terminated and their data cannot be recovered. Storage can continue charging; an unfunded network volume may eventually be terminated.

For production workloads:

- set low-balance alerts and auto-pay;
- choose a reload threshold that covers realistic peak burn;
- monitor aggregate spend against the account limit;
- keep critical state outside ephemeral storage; and
- rehearse recovery from a stopped or terminated workload.

The listed GPU price is only one production dependency. Balance automation and storage lifecycle can decide whether the service stays online.

## Which RunPod product should you choose?

Choose **Serverless Flex** when demand has long idle gaps, workers genuinely return to zero, and cold starts or queueing fit the application. Start with zero Active workers, measure real allocation time, and buy warm capacity only when latency evidence supports it.

Choose a **Pod** for notebooks, persistent model servers, long training jobs, or workers that intentionally stay available. Treat the 720-hour figure as a planning ceiling, then lower it only if the operating process really releases the Pod without losing required data.

Choose the GPU only after sizing the workload. The [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and H100 guide keep card variants and product shapes visible. A newer card is not automatically cheaper if an older GPU meets the measured memory, latency, and throughput requirement.

## Verdict

RunPod's August rate changes do not reverse the core buying rule: **allocation time decides whether Pods or Serverless cost less.** They do change the crossover numbers enough that an old spreadsheet can now make the wrong call.

- The public Secure Cloud L4 and B200 increases are the largest changes in this check.
- H100 Flex now crosses the always-on H100 Pod estimate at about 434 worker-hours, down from about 457 hours on the August 10 rate.
- H200, B200, and B300 Flex only beat an always-on selected Pod when they eliminate roughly 21% to 23% of monthly allocation time.
- Storage, startup, idle timeout, and prepaid-balance behavior still belong in the decision.
- RunPod's conflicting H100 hourly and per-second documentation should be confirmed in the console before purchase.

Measure one representative week, count every billable worker phase, and project the result into a 720-hour month. If the result sits near the crossover, choose based on latency, operational effort, inventory, and failure recovery rather than a few cents on the rate card.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — current Secure Cloud Pod and Serverless Flex public rate tables; checked August 18, 2026
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing) — worker types, billable phases, rounding, storage, and spend limit; checked August 18, 2026
- [RunPod endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — defaults and published per-second GPU table, including the H100 inconsistency; checked August 18, 2026
- [RunPod Pods pricing](https://docs.runpod.io/pods/pricing) — Pod billing, savings plans, storage rates, and account limits; checked August 18, 2026
- [RunPod billing overview](https://docs.runpod.io/accounts-billing/billing) — prepaid credits, low-balance behavior, auto-pay, minimum balance, and spend limit; checked August 18, 2026
- HostFleet full-verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-10-gpu-pricing-full-verification.md`, historical RunPod baseline checked August 10, 2026

*Need a self-managed GPU endpoint? Using this labeled affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Source citations above are direct, non-affiliate links.*
