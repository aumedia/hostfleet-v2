---
title: "RunPod pricing 2026: 42 Pod prices, 13 Serverless tiers, and break-even math"
description: "All 42 public RunPod Pod prices and 13 Serverless Flex tiers checked September 2026, with updated break-even math, storage, idle-tail, and billing caveats."
pubDate: 2026-07-24
updatedDate: 2026-09-09
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed pricing refresh with derived estimates.** This guide uses RunPod's public pricing page and product documentation retrieved on **September 9, 2026**. It is not a benchmark, inventory check, invoice, negotiated quote, or performance comparison.

> **Rates verified:** September 9, 2026  
> **Billing and lifecycle rules verified:** September 9, 2026  
> **Dataset boundary:** HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) is a September 7 baseline; RunPod changed its public page later that day, so the September 9 vendor page takes precedence here  
> **Estimate convention:** one GPU, public USD list rates before tax, and 720 hours for a 30-day planning month

# RunPod pricing 2026: 42 Pod prices, 13 Serverless tiers, and break-even math

RunPod's rate card currently exposes **21 Pod products with separate Community Cloud and Secure Cloud prices: 42 public Pod price points**. It also exposes **13 Serverless Flex tiers**. The hard part is not finding a low number. It is comparing products that stop billing at different times.

A Pod is dedicated capacity billed while it remains allocated. Serverless Flex can return to zero, but its billed window can include execution, idle time, and—according to one official guide—startup. Storage has a separate lifecycle. Community and Secure Cloud are also different supply surfaces, so their prices should not be mixed without labeling the source.

Three selected Secure Cloud rates changed between HostFleet's September 7 dataset capture and the public page retrieved September 9:

- A40 moved from **$0.44/hour to $0.49/hour**.
- L40S moved from **$0.99/hour to $1.09/hour**.
- A100 PCIe moved from **$1.39/hour to $1.59/hour**.

The page also now lists Secure Cloud H100 SXM at **$3.49/hour**, versus **$3.29/hour** in the September 7 dataset note. These are observed public-page differences, not a claim about contract rates or every region.

The buying answer is:

- Use **Community Cloud Pods** when the lower rate matters more than the different supply boundary and the exact configuration is available.
- Use **Secure Cloud Pods** when you want the selected Secure rate and expect to keep the GPU useful for a large share of the month.
- Use **Serverless Flex** when traffic has real idle gaps and workers reliably return to zero.
- Use **Active Serverless workers** only after latency measurements justify always-warm capacity; RunPod advertises sales-negotiated discounts but does not publish a numeric Active rate.

## Every public Pod price

The table below transcribes all 21 Pod products from [RunPod's public pricing page](https://www.runpod.io/pricing), retrieved **September 9, 2026**. The 720-hour column is arithmetic from the Secure Cloud rate, not a RunPod quote.

The rendered September 9 Community Cloud toggle shows **$1.00/hour** for Pro 6000 MIG 48GB and **$0.50/hour** for Pro 6000 MIG 24GB; Secure Cloud shows **$1.09/hour** and **$0.59/hour**, respectively. The table includes all four live values rather than treating the MIG products as Secure-only.

| GPU product | Community Cloud | Secure Cloud | Secure Cloud for 720 hours |
|---|---:|---:|---:|
| RTX A5000 | $0.16/hr | $0.27/hr | $194.40 |
| RTX 3090 | $0.22/hr | $0.50/hr | $360.00 |
| A40 | $0.35/hr | $0.49/hr | $352.80 |
| L4 | $0.44/hr | $0.49/hr | $352.80 |
| RTX A6000 | $0.33/hr | $0.53/hr | $381.60 |
| Pro 6000 MIG 24GB | $0.50/hr | $0.59/hr | $424.80 |
| RTX 4090 | $0.34/hr | $0.74/hr | $532.80 |
| RTX 6000 Ada | $0.74/hr | $0.84/hr | $604.80 |
| L40 | $0.69/hr | $0.82/hr | $590.40 |
| RTX 5090 | $0.69/hr | $0.99/hr | $712.80 |
| L40S | $0.79/hr | $1.09/hr | $784.80 |
| Pro 6000 MIG 48GB | $1.00/hr | $1.09/hr | $784.80 |
| A100 PCIe | $1.19/hr | $1.59/hr | $1,144.80 |
| A100 SXM | $1.39/hr | $1.59/hr | $1,144.80 |
| RTX Pro 6000 | $1.69/hr | $2.09/hr | $1,504.80 |
| H100 PCIe | $1.99/hr | $2.89/hr | $2,080.80 |
| H100 NVL | $2.59/hr | $3.19/hr | $2,296.80 |
| H100 SXM | $2.69/hr | $3.49/hr | $2,512.80 |
| H200 | $3.59/hr | $4.59/hr | $3,304.80 |
| B200 | $5.98/hr | $6.79/hr | $4,888.80 |
| B300 | $6.94/hr | $7.89/hr | $5,680.80 |

**Estimate assumptions:** one listed GPU product allocated continuously for 720 hours; no savings plan, storage, tax, support, credit-card failure, duplicate Pod, regional premium, or negotiated discount. The public page does not prove current stock, quota, location, provisioning success, or equal performance.

The cheapest row is not automatically the cheapest completed job. Card memory, PCIe versus SXM or NVL, host resources, regional availability, and measured throughput can dominate a small hourly gap. Use the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) when the exact accelerator and provider boundary matter more than RunPod's product labels.

## Every public Serverless Flex tier

RunPod's public page groups several physical cards into shared Serverless tiers. The table below lists all 13 public Flex rates retrieved **September 9, 2026** from [RunPod pricing](https://www.runpod.io/pricing).

| Public Flex tier | Memory label | Flex rate |
|---|---:|---:|
| A4000 / A4500 / RTX 4000 / RTX 2000 | 16 GB | $0.58/hr |
| L4 / A5000 / 3090 / MIG | 24 GB | $0.69/hr |
| RTX 4090 Pro | 24 GB | $1.10/hr |
| RTX PRO 4500 Blackwell | 32 GB | $1.15/hr |
| RTX 5090 Pro | 32 GB | $1.58/hr |
| A6000 / A40 | 48 GB | $1.22/hr |
| L40 / L40S / 6000 Ada / MIG | 48 GB | $1.75/hr |
| A100 | 80 GB | $2.72/hr |
| H100 Pro | 80 GB | $4.79/hr |
| RTX 6000 Pro | 96 GB | $3.49/hr |
| H200 | 141 GB | $5.93/hr |
| B200 | 180 GB | $8.64/hr |
| B300 | 280 GB | $9.98/hr |

A pooled tier is not an exact-card reservation. Selecting the 24 GB L4/A5000/3090 tier, for example, does not prove which card will serve a request or that its performance matches the L4 Pod row. RunPod's endpoint documentation allows up to three GPU categories in priority order and can distribute workers across priorities when an endpoint has five or more workers.

For cross-provider Serverless alternatives and their lifecycle differences, use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## Pod versus Flex break-even after the September rate changes

The comparison below uses the selected Secure Cloud Pod and the closest public Flex tier. It answers one narrow question: how many Flex worker-hours equal a Pod held for a full 720-hour month?

    Pod month = Secure Cloud Pod hourly rate × 720
    Flex break-even hours = Pod month ÷ public Flex hourly rate
    Break-even share = Flex break-even hours ÷ 720

All input rates come from [RunPod's public pricing page](https://www.runpod.io/pricing), retrieved **September 9, 2026**. The results are derived estimates.

| Capacity point | Secure Pod | Flex | Pod for 720 hours | Flex break-even |
|---|---:|---:|---:|---:|
| L4 / 24 GB tier | $0.49/hr | $0.69/hr | $352.80 | 511.3 hours (71.0%) |
| RTX 4090 / 24 GB tier | $0.74/hr | $1.10/hr | $532.80 | 484.4 hours (67.3%) |
| RTX 5090 / 32 GB tier | $0.99/hr | $1.58/hr | $712.80 | 451.1 hours (62.7%) |
| A40 / 48 GB tier | $0.49/hr | $1.22/hr | $352.80 | 289.2 hours (40.2%) |
| L40S / 48 GB tier | $1.09/hr | $1.75/hr | $784.80 | 448.5 hours (62.3%) |
| RTX Pro 6000 / 96 GB tier | $2.09/hr | $3.49/hr | $1,504.80 | 431.2 hours (59.9%) |
| A100 PCIe / 80 GB tier | $1.59/hr | $2.72/hr | $1,144.80 | 420.9 hours (58.5%) |
| H100 PCIe / 80 GB tier | $2.89/hr | $4.79/hr | $2,080.80 | 434.4 hours (60.3%) |
| H200 / 141 GB tier | $4.59/hr | $5.93/hr | $3,304.80 | 557.3 hours (77.4%) |
| B200 / 180 GB tier | $6.79/hr | $8.64/hr | $4,888.80 | 565.8 hours (78.6%) |
| B300 / 280–288 GB boundary | $7.89/hr | $9.98/hr | $5,680.80 | 569.2 hours (79.1%) |

The September 9 changes materially move three crossover points. Against the September 1 article baseline, A40 rises from about **260 to 289 Flex hours**, L40S from about **407 to 448 hours**, and A100 PCIe from about **368 to 421 hours**. The old figures used the September 1 rates; the new figures use the September 9 official page.

This is not a utilization forecast. Flex bills allocation time, not successful output. A Pod released after each job can cost far less than its 720-hour column. A Flex worker held warm by an Active-worker setting or long idle timeout can cost more than request execution alone suggests.

Use [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to replace 720 with the allocation pattern you actually expect.

## RunPod's own Serverless billing sources still conflict

RunPod's [Serverless pricing guide](https://docs.runpod.io/serverless/pricing), checked **September 9, 2026**, says billing begins when a worker starts and ends when it fully stops, rounded up to the nearest second. It explicitly includes three billable phases:

1. container initialization and model loading;
2. request execution; and
3. the idle timeout after execution.

RunPod's [worker overview](https://docs.runpod.io/serverless/workers/overview), checked the same day, labels the Initializing state—image download, code load, and cached-model download—as **not billed**. It labels Running as billed.

Those descriptions do not establish one unambiguous startup boundary. This guide therefore treats initialization billing as **conflicting official sources**. It does not call cold starts free and does not invent a startup charge.

The public hourly table and endpoint-settings table also disagree. RunPod's [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked **September 9, 2026**, lists per-second figures that convert as follows:

| Tier | Endpoint-settings rate | Derived hourly rate | Public Flex rate |
|---|---:|---:|---:|
| H100 Pro | $0.00116/sec | $4.176/hr | $4.79/hr |
| 6000s PRO (96 GB doc label) | $0.00111/sec | $3.996/hr | $3.49/hr |
| L40 / L40S / 6000 Ada | $0.00053/sec | $1.908/hr | $1.75/hr |
| H200 Pro | $0.00155/sec | $5.58/hr | $5.93/hr |
| B200 | $0.00240/sec | $8.64/hr | $8.64/hr |

The derived column multiplies the official per-second figure by 3,600. The disagreement is not a simple rounding issue or a consistent markup: H100 and H200 are higher on the public page, while the 96 GB PRO row and the L40 tier are lower. Because the Serverless pricing guide links buyers to the public pricing page for compute rates, this article uses that hourly Flex table and tells operators to confirm the console rate for the exact endpoint.

## The default five-second tail is small once and expensive at volume

RunPod's endpoint settings, checked **September 9, 2026**, list zero Active workers, three maximum workers, one GPU per worker, and a five-second idle timeout as defaults. The worker remains billable during the idle timeout.

Using the public September 9 Flex rates, the nominal five-second tail is:

| Flex tier | Formula | One five-second tail | 1,440 isolated tails |
|---|---:|---:|---:|
| L4 class | $0.69 × 5 ÷ 3,600 | $0.000958 | $1.38 |
| A100 | $2.72 × 5 ÷ 3,600 | $0.003778 | $5.44 |
| H100 Pro | $4.79 × 5 ÷ 3,600 | $0.006653 | $9.58 |
| B300 | $9.98 × 5 ÷ 3,600 | $0.013861 | $19.96 |

These are arithmetic illustrations, not per-request quotes. The 1,440-tail column assumes one isolated tail per minute for 24 hours, with no overlap. It excludes initialization, execution, retries, storage, multiple workers, and discounts. Real requests that reuse an already-running worker can share one idle tail.

A longer timeout can reduce repeated cold starts but increases warm idle cost. A shorter timeout can cut idle spend while increasing startup frequency and latency. Measure the actual endpoint rather than optimizing one side of that tradeoff in isolation.

## Storage survives different compute actions

RunPod's [Pods pricing documentation](https://docs.runpod.io/pods/pricing), checked **September 9, 2026**, publishes:

| Storage type | Running Pod | Stopped Pod | Lifecycle boundary |
|---|---:|---:|---|
| Container disk | $0.10/GB-month | Not charged | Temporary; erased when the Pod stops |
| Volume disk | $0.10/GB-month | $0.20/GB-month | Persistent until the Pod is deleted |
| Network volume below 1 TB | $0.07/GB-month | $0.07/GB-month | Portable; billed hourly |
| Network volume above 1 TB | $0.05/GB-month | $0.05/GB-month | Lower public rate above the threshold |

At those September 9 rates, retaining 100 GB for a full month is approximately **$10** for running volume disk, **$20** for stopped volume disk, or **$7** for a sub-1-TB network volume. Those are simple rate-times-capacity estimates.

Container and volume disks bill per second; network volumes bill hourly. Serverless container disk is listed at approximately **$0.10/GB-month in five-minute intervals**, while Serverless network-volume rates match the $0.07 and $0.05 tiers. Returning compute to zero does not make every retained resource free.

## Prepaid credit is an uptime dependency

RunPod's [billing overview](https://docs.runpod.io/accounts-billing/billing), checked **September 9, 2026**, documents:

- prepaid credits deducted as resources run;
- a minimum balance equal to one hour of the selected Pod configuration before deployment;
- a default account-wide spend limit of **$80/hour**;
- billing deductions every five minutes;
- auto-pay attempts limited to once per hour; and
- at a zero balance, Pods with a network volume stop while Pods without one terminate and their data cannot be recovered.

Network-volume storage can continue charging after the Pod stops. If a zero balance persists, RunPod says the unfunded volume may eventually terminate. A low rate does not protect production if the credit card fails or a balance alert arrives too late.

Serverless capacity has separate limits. The worker overview, checked September 9, lists a default combined cap of five Flex and Active workers. Published balance thresholds raise the cap from 10 workers at a $100-or-higher balance to 60 workers at $900 or higher. Those are account limits, not inventory guarantees.

Endpoint dormancy adds another failure mode. The endpoint settings say RunPod reduces maximum workers to two after three days without requests and sets maximum workers to zero after seven days. The operator must manually raise the value before reuse. A rarely used disaster-recovery endpoint needs a reactivation check, not an assumption that one request will wake it.

## A practical RunPod cost checklist

1. **Pick the exact product boundary.** Record Community versus Secure Cloud, the card variant, region, and whether Serverless can substitute GPUs within a tier.
2. **Use the current rate.** Keep a dated capture of the console rate; the public page changed after HostFleet's September 7 dataset check.
3. **Model allocated time.** For Pods, count the hours until release. For Flex, count startup uncertainty, execution, idle tails, retries, and concurrent workers.
4. **Separate storage.** Record container, volume, and network-volume deletion behavior instead of assuming stop means free.
5. **Test scale-to-zero.** Confirm zero Active workers, the idle timeout, and the actual return-to-zero state.
6. **Reconcile billing.** RunPod's [API v2 billing history](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history), checked September 9, can filter one endpoint and separates GPU, CPU, disk, platform-fee, and total amounts by time bucket.
7. **Protect the prepaid balance.** Set alerts, auto-pay, and a threshold that covers peak aggregate burn plus a payment-failure window.
8. **Test reactivation.** Verify maximum workers before relying on a dormant endpoint.

The [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) covers product fit beyond pricing.

## Verdict

RunPod still has a coherent economic split: Pods for sustained or operator-controlled allocation, Serverless Flex for genuine idle gaps, and Active workers for latency-sensitive workloads that justify a warm floor.

The September 9 rate card changes the exact crossover math. The selected Secure Cloud A100 PCIe Pod is now **$1.59/hour**, or **$1,144.80 for 720 hours**, and equals about **420.9 Flex A100 worker-hours** at $2.72/hour. A40's selected crossover is about 289 hours; L40S is about 448 hours.

Do not turn those figures into a universal recommendation. Community and Secure supply differ, pooled Flex tiers are not exact-card reservations, the official startup-billing descriptions conflict, and storage survives some compute actions. The defensible decision is the one that survives an isolated deployment test, a settled billing check, and a cleanup drill.

## Sources

- [RunPod public pricing](https://www.runpod.io/pricing) — all 21 Community/Secure Pod pairs and all 13 public Serverless Flex tiers; retrieved September 9, 2026
- [RunPod Pods pricing](https://docs.runpod.io/pods/pricing) — per-second compute, savings-plan boundary, storage rates, minimum balance, and spend limit; checked September 9, 2026
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing) — per-second rounding, billed phases, storage, and Flex-versus-Active boundary; checked September 9, 2026
- [RunPod worker overview](https://docs.runpod.io/serverless/workers/overview) — worker-state billing labels, GPU initialization boundary, and account worker caps; checked September 9, 2026
- [RunPod endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — per-second tier table, defaults, idle tail, GPU priority, and dormant-endpoint scale-down; checked September 9, 2026
- [RunPod billing overview](https://docs.runpod.io/accounts-billing/billing) — prepaid credits, zero-balance behavior, auto-pay, storage summary, and account spend limit; checked September 9, 2026
- [RunPod API v2 billing history](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history) — endpoint filtering, time buckets, and separated cost categories; checked September 9, 2026
- Local baseline: /opt/hostbot-v2/src/data/gpu-pricing.json — full 21-provider dataset verified September 7, 2026
- Existing live article baseline: /opt/hostbot-v2/src/content/posts/runpod-pricing-guide-2026.md — rates and crossover estimates checked September 1, 2026
- Evidence note: /opt/hostbot/data/ai-hosting/notes/2026-09-07-gpu-pricing-full-verification.md — September 7 full-dataset verification boundary

*Need a self-managed GPU endpoint? This labeled affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Source citations above remain direct, non-affiliate links.*
