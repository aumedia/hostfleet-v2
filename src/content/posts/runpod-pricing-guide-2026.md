---
title: "RunPod pricing 2026: current Pods, Flex and allocation costs"
description: "Compare 42 Pod prices and 13 Flex tiers checked November 19, with higher Secure rates, updated break-even math and billing-source caveats."
pubDate: 2026-07-24
updatedDate: 2026-11-19
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through labeled signup links on this page. That does not change the analysis. Read our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed pricing guide; calculated costs are estimates, not measured bills.** We checked RunPod's public rate card and the official billing, worker and Pod documentation on **November 19, 2026**. We did not rent a GPU, obtain an authenticated quote, confirm capacity, inspect an invoice or benchmark performance.

> **Rates verified:** November 19, 2026 — all 42 Community/Secure Pod prices and 13 Serverless Flex tiers<br>
> **Billing documentation checked:** November 19, 2026; source conflicts and retired API-reference paths are noted below<br>
> **Assumptions:** public USD list prices before tax; one GPU; 720 allocated hours for compute comparisons; 730 hours only for illustrative storage-month conversion<br>
> **Dataset scope:** this article's checks do not advance the dataset-wide September 24 verification date.

# RunPod pricing 2026: current Pods, Flex and the cost of staying allocated

**RunPod pricing depends on what stays allocated, not just how long a request takes.** Pods charge for their allocated infrastructure. Serverless Flex charges while workers run, including model loading and idle waiting. Persistent storage can bill after compute stops.

The November 19 check finds **nine higher Secure Pod prices and five higher Flex prices** than our November 2 guide. All 21 Community prices are unchanged. These are differences between observations, not a claim that the vendor changed prices today.

The practical result is not one universal winner: Secure A100 PCIe becomes more expensive relative to Flex, while higher H100 Flex pricing brings its compute-only crossover earlier. L4's Secure Pod price rises even though its pooled Flex price does not. Recalculate the exact pair you plan to use.

## Which product fits your workload?

| Workload | Surface to evaluate first | What keeps billing |
|---|---|---|
| Sustained job; you manage the container | On-demand Pod | Running allocation plus storage |
| Bursty API with real gaps | Serverless Flex | Every running worker: startup, execution and waiting |
| Endpoint that must remain warm | Active Serverless or a Pod | Allocated warm capacity even without requests; get an Active quote |
| Paused job with local data retained | Stopped Pod | Retained local volume, without a GPU reservation |
| Disposable environment after export | Terminated Pod | Separately created persistent storage can survive |

Community and Secure are different supply surfaces, not performance-equivalent offers. Record GPU variant, GPU count, host resources, region and available capacity. Our [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) covers the operational split.

## Every public Pod price: Community versus Secure

**Verified November 19, 2026, from the [official pricing card](https://www.runpod.io/pricing).** Explicit Community/Secure HTML attributes agree numerically with the embedded structured offers for all 21 products. The visible default is Secure. Prices are on-demand list inputs, not account quotes or capacity guarantees.

| GPU product | Community/hr | Secure/hr | Secure premium/hr | Premium over 720 hours | Premium vs Community |
|---|---:|---:|---:|---:|---:|
| RTX A5000 | $0.16 | $0.27 | $0.11 | $79.20 | 68.8% |
| RTX 3090 | $0.22 | $0.50 | $0.28 | $201.60 | 127.3% |
| A40 | $0.35 | $0.59 | $0.24 | $172.80 | 68.6% |
| L4 | $0.44 | $0.69 | $0.25 | $180.00 | 56.8% |
| RTX A6000 | $0.33 | $0.69 | $0.36 | $259.20 | 109.1% |
| Pro 6000 MIG 24GB | $0.50 | $0.69 | $0.19 | $136.80 | 38.0% |
| RTX 4090 | $0.34 | $0.89 | $0.55 | $396.00 | 161.8% |
| RTX 6000 Ada | $0.74 | $1.09 | $0.35 | $252.00 | 47.3% |
| L40 | $0.69 | $0.82 | $0.13 | $93.60 | 18.8% |
| RTX 5090 | $0.69 | $1.39 | $0.70 | $504.00 | 101.4% |
| L40S | $0.79 | $1.09 | $0.30 | $216.00 | 38.0% |
| Pro 6000 MIG 48GB | $1.00 | $1.39 | $0.39 | $280.80 | 39.0% |
| A100 PCIe | $1.19 | $2.09 | $0.90 | $648.00 | 75.6% |
| A100 SXM | $1.39 | $2.19 | $0.80 | $576.00 | 57.6% |
| RTX Pro 6000 | $1.69 | $2.69 | $1.00 | $720.00 | 59.2% |
| H100 PCIe | $1.99 | $2.89 | $0.90 | $648.00 | 45.2% |
| H100 NVL | $2.59 | $3.19 | $0.60 | $432.00 | 23.2% |
| H100 SXM | $2.69 | $4.39 | $1.70 | $1,224.00 | 63.2% |
| H200 | $3.59 | $5.29 | $1.70 | $1,224.00 | 47.4% |
| B200 | $5.98 | $7.99 | $2.01 | $1,447.20 | 33.6% |
| B300 | $6.94 | $8.99 | $2.05 | $1,476.00 | 29.5% |

**Estimate assumptions:** one GPU allocated for all 720 hours, excluding tax, storage, credits, discounts and other charges. Percentage premium divides the rate difference by Community price. Equal GPU names do not establish equal resources, stock or throughput.

For A100 PCIe, Secure compute is **$2.09 × 720 = $1,504.80**, compared with **$1.19 × 720 = $856.80** on the Community list input: **$648.00 more** before other charges. That is $216.00 more Secure compute than the November 2 observation under identical time assumptions.

### Which Secure Pod prices increased?

**Historical inputs:** HostFleet's November 2 source-backed guide. **Current inputs:** official card checked November 19. The card's metadata says `dateModified: 2026-11-12`; that is a page-level marker, not an effective date for each price.

| Secure GPU | November 2/hr | November 19/hr | Increase | Extra over 720 hours |
|---|---:|---:|---:|---:|
| A100 PCIe | $1.79 | $2.09 | 16.76% | $216.00 |
| A100 SXM | $1.79 | $2.19 | 22.35% | $288.00 |
| H100 SXM | $3.99 | $4.39 | 10.03% | $288.00 |
| L4 | $0.59 | $0.69 | 16.95% | $72.00 |
| Pro 6000 MIG 48GB | $1.29 | $1.39 | 7.75% | $72.00 |
| RTX 5090 | $1.19 | $1.39 | 16.81% | $144.00 |
| RTX 6000 Ada | $0.99 | $1.09 | 10.10% | $72.00 |
| RTX A6000 | $0.59 | $0.69 | 16.95% | $72.00 |
| RTX Pro 6000 | $2.49 | $2.69 | 8.03% | $144.00 |

The other 12 Secure prices and all Community prices match the November 2 baseline. Compare exact variants and other providers in the [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental guide](https://hostfleet.net/h100-rental-price-per-hour-2026/); those pages retain their own verification dates.

## Every public Serverless Flex tier

**Rates and memory labels verified November 19, 2026**, on the [official pricing page](https://www.runpod.io/pricing). These are Flex prices, not Active-worker discounts. PRO badges are shown as Pro in the labels below; pooled tiers are not exact-card reservations.

| Flex tier | Memory label | November 2/hr | November 19/hr | Observed change |
|---|---:|---:|---:|---:|
| A4000, A4500, RTX 4000, RTX 2000 | 16 GB | $0.58 | $0.58 | Unchanged |
| L4, A5000, 3090, MIG 24GB | 24 GB | $0.75 | $0.75 | Unchanged |
| RTX 4090 Pro | 24 GB | $1.34 | $1.34 | Unchanged |
| RTX PRO 4500 Blackwell | 32 GB | $1.15 | $1.15 | Unchanged |
| RTX 5090 Pro | 32 GB | $1.79 | $1.89 | +5.59% |
| A6000, A40 | 48 GB | $1.22 | $1.22 | Unchanged |
| L40, L40S, 6000 Ada, MIG 48GB | 48 GB | $1.75 | $1.89 | +8.00% |
| A100 | 80 GB | $2.72 | $2.99 | +9.93% |
| H100 Pro | 80 GB | $5.39 | $5.89 | +9.28% |
| RTX 6000 Pro | 96 GB | $3.49 | $3.69 | +5.73% |
| H200 | 141 GB | $6.99 | $6.99 | Unchanged |
| B200 | 180 GB | $10.79 | $10.79 | Unchanged |
| B300 | 288 GB | $11.99 | $11.99 | Unchanged |

Five Flex tiers are higher: RTX 5090 Pro, pooled L40-class, A100, H100 Pro and RTX 6000 Pro. The eight other rates and all 13 memory labels match November 2. Historical columns record our earlier observation, not a vendor-announced tariff date.

The [Serverless pricing guide](https://docs.runpod.io/serverless/pricing.md), checked November 19, describes billing from worker start until full stop, rounded up to the nearest second. Dividing an hourly card price by 3,600 is arithmetic, not an independently quoted per-second tariff.

A pooled L4/A5000/3090/MIG tier does not promise an L4 for every request. The [endpoint guide](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked November 19, allows three GPU priorities and describes distribution across priorities with five or more workers. Record the actual GPU before comparing performance.

These tables extend the selected-product baseline in HostFleet's `gpu-pricing.json` to the complete current RunPod card. The [live GPU pricing table](https://hostfleet.net/gpu-pricing/) uses that dataset; this article is a dated source snapshot, not an automatic account-price lookup. Its dataset-wide date remains September 24. The [serverless GPU matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) covers the wider catalog with provider-specific dates.

## Pod versus Flex: updated break-even math

How many **aggregate Flex worker-hours** cost the same as one Secure Pod held for 720 hours? This compares compute dollars, not throughput or completed requests.

    Pod compute = Secure Pod rate × 720
    Flex break-even worker-hours = Pod compute ÷ Flex rate
    Share of 720 hours = Secure Pod rate ÷ Flex rate

**All price inputs: official rate card, verified November 19, 2026.**

| Capacity point | Secure Pod/hr | Flex/hr | Pod for 720 hours | Flex compute-only break-even |
|---|---:|---:|---:|---:|
| L4 / relevant Flex tier | $0.69 | $0.75 | $496.80 | 662.4 hours (92.0%) |
| RTX 4090 / relevant Flex tier | $0.89 | $1.34 | $640.80 | 478.2 hours (66.4%) |
| RTX 5090 / relevant Flex tier | $1.39 | $1.89 | $1,000.80 | 529.5 hours (73.5%) |
| A40 / relevant Flex tier | $0.59 | $1.22 | $424.80 | 348.2 hours (48.4%) |
| L40S / relevant Flex tier | $1.09 | $1.89 | $784.80 | 415.2 hours (57.7%) |
| RTX Pro 6000 / relevant Flex tier | $2.69 | $3.69 | $1,936.80 | 524.9 hours (72.9%) |
| A100 PCIe / relevant Flex tier | $2.09 | $2.99 | $1,504.80 | 503.3 hours (69.9%) |
| H100 PCIe / relevant Flex tier | $2.89 | $5.89 | $2,080.80 | 353.3 hours (49.1%) |
| H200 / relevant Flex tier | $5.29 | $6.99 | $3,808.80 | 544.9 hours (75.7%) |
| B200 / relevant Flex tier | $7.99 | $10.79 | $5,752.80 | 533.2 hours (74.1%) |
| B300 / relevant Flex tier | $8.99 | $11.99 | $6,472.80 | 539.8 hours (75.0%) |

**Assumptions:** one GPU per worker; no storage, tax, credits, discounts or additional charges; no performance equivalence between a pooled Flex tier and a Pod. Ten workers running for one elapsed hour consume ten worker-hours. Active workers need a separate quote.

The A100 PCIe crossover rises from **473.8 to 503.3 aggregate worker-hours** because the Secure Pod increases proportionally more than Flex. H100 PCIe moves the other way: its Pod stays at $2.89/hour while Flex rises to $5.89/hour, lowering crossover from **386.0 to 353.3 hours**. Neither result proves which option finishes your workload faster.

For L4-class capacity, 100 billable Flex worker-hours cost **$75.00**, versus **$496.80** for the Secure L4 Pod held for 720 hours. Release the Pod after the same 100 allocated hours and compute would instead be **$69.00**. The apparent saving depends on avoiding unnecessary allocation, not just using “serverless.”

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to model startup, useful work, waiting, retries, teardown and retained resources. Respect its own input dates; a newly checked rate on this page does not reverify other pages.

## Startup billing: Initializing is not model loading

The [Serverless pricing guide](https://docs.runpod.io/serverless/pricing.md) and [worker lifecycle guide](https://docs.runpod.io/serverless/workers/overview.md), checked November 19, describe the same boundary: **compute bills while a worker is running**. This is a documented lifecycle boundary, not a measured invoice cutoff.

| Worker phase or console state | Documented compute treatment | Practical meaning |
|---|---|---|
| Initializing | Scaled down; not billed | Host normally pulls image or downloads cached models before container startup |
| Cold start within Running | Billed | Container starts; handler loads its model and becomes ready |
| Processing within Running | Billed | Worker executes requests |
| Waiting within Running | Billed | Worker waits for another job during idle timeout |
| Idle | Already scaled down; not billed | Not the same as waiting during the timeout |
| Active worker with no job | Keeps running and billing | An empty queue does not make an Active worker free |

**Important exception:** image pulls are normally outside running compute, but the worker guide says a pull is billed if the worker starts before the image is present on its host. Do not promise universally free image downloads. Loading model weights inside the running handler is also not the same as downloading cached weights while scaled down.

### Initialization wording still conflicts across pages

The [endpoint settings page](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked November 19, also says under “Initialization timeout” that workers are billed while they initialize. It does not reconcile that wording with the worker lifecycle table's unbilled **Initializing** state. Treat the running-versus-scaled-down split above as the stated lifecycle model, not proof that every event called “initialization” is free. Capture container start, model loading and worker state separately; the public wording does not establish an invoice cutoff for a particular run.

### A separate rate-table discrepancy remains

Clearer lifecycle language does not resolve every pricing source. The [endpoint-settings per-second table](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked November 19, still differs from the public hourly card. Its H100 figure of **$0.00116/second** converts to **$4.176/hour**, versus public Flex **$5.89/hour**. Its L40/L40S/6000 Ada figure of **$0.00053/second** converts to **$1.908/hour**, versus public **$1.89/hour**.

This guide consistently uses the public hourly card because the Serverless pricing documentation points there for compute prices. For the L4-class row, the docs' $0.00019/second yields $0.684/hour rather than the public card's $0.75/hour. Confirm the effective quote for the exact account and endpoint before reconstructing charges. Do not combine one page's per-second input with another page's hourly rate as though they were identical tariffs.

## Idle tails: console and REST v2 defaults differ

The [endpoint-settings guide](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked **November 19, 2026**, now distinguishes these creation defaults:

| Setting | Console default | REST v2 default documented in the guide |
|---|---|---|
| Idle timeout | 5 seconds | `workers.idleTimeout`: 10 seconds |
| Execution timeout | 600 seconds | `timeout`: 300000 milliseconds (5 minutes) |
| FlashBoot | Enabled | `flashboot`: `OFF`; set `FLASHBOOT` to enable |

The console also lists zero Active workers, three maximum workers and one GPU per worker. Do not treat a console default as the configuration of an API-created endpoint: inspect the actual returned settings. The guide says REST v2 requires `type` and `scaling`, and has no endpoint-level job TTL field.

A waiting worker remains Running and billed. At the **November 19 public Flex inputs**, isolated tails cost:

| Flex tier | One five-second tail | 1,440 five-second tails | 1,440 ten-second tails |
|---|---:|---:|---:|
| L4-class at $0.75/hr | $0.001042 | $1.50 | $3.00 |
| A100 at $2.99/hr | $0.004153 | $5.98 | $11.96 |
| H100 Pro at $5.89/hr | $0.008181 | $11.78 | $23.56 |
| B300 at $11.99/hr | $0.016653 | $23.98 | $47.96 |

**Derived assumptions:** hourly rate × timeout seconds / 3,600; 1,440 independent, nonoverlapping worker tails. This excludes cold start, execution, retries, rounding effects, storage and discounts. Requests can share a running worker's tail; multiple workers can create multiple tails. It is not a fixed fee applied to each request. Under this scenario, doubling the configured timeout doubles the waiting component, not necessarily the full bill.

Queue-based endpoints advertise automatic retries. Turning off client retries does not prove a single provider execution. Capture request/job ID, attempt count, worker ID and process identity when measuring. The worker guide also mentions extra workers during spikes; do not treat a nominal maximum as a verified small-experiment spend cap without checking its effective behavior.

## A $0.25 L4 smoke test is a plan, not a hard cap

Using the **November 19** public L4-class Flex rate of **$0.75/hour**, ten cumulative billable worker-minutes cost:

    $0.75 × 10/60 = $0.125 of compute
    $0.125 + $0.10 assumed other-cost reserve = $0.225
    $0.25 planning target − $0.225 = $0.025 headroom

The $0.10 reserve is an **unmeasured assumption** for all other charges, storage and cleanup. It is not a quoted fee or a proven upper bound. This envelope only holds if aggregate running time really stays within ten worker-minutes on a supported one-running-worker configuration. Ten wall-clock minutes with two concurrent workers can mean twenty worker-minutes. A nominal max-workers setting alone is not proof of that bound; the worker docs also describe extra workers during spikes.

Before any paid smoke test, confirm the account quote, endpoint/GPU identity, actual concurrency controls, all retry paths, supported shutdown action and attributable billing precision. Include handler/model startup and idle waiting in the time allowance; stop when a gate cannot be established. RunPod's documented default **$80/hour account-wide limit is not a $0.25 per-run cap**. Execution timeout limits a job, not the endpoint's entire spend.

We designed this example; we did not execute it, validate the reserve or verify a watchdog cutoff. The [billing overview](https://docs.runpod.io/accounts-billing/billing.md), checked November 19, says credits are non-refundable and evaluation can start with $10. A sub-dollar usage estimate is not a promise of a sub-dollar deposit.

## Stopping a Pod: GPU released, storage retained

The [Pod management guide](https://docs.runpod.io/pods/manage-pods.md), rechecked November 19, says stopping releases the GPU, clears the container disk and preserves the local volume normally mounted at `/workspace`. Restart depends on available capacity: the console may offer a zero-GPU start, whereas the REST start action fails with HTTP 400 when the host lacks the requested GPUs. Stop is not a reservation.

Termination deletes the Pod and its local data. A separately created network volume survives both stop and termination; if `/workspace` is backed by that network volume rather than local volume, follow the network-volume lifecycle instead.

**Storage prices and granularity: [Pods pricing](https://docs.runpod.io/pods/pricing.md), verified November 19, 2026.**

| Resource | Running Pod | Stopped Pod | After Pod termination |
|---|---|---|---|
| GPU compute | Per-second compute | Released | No Pod compute |
| Container disk | $0.10/GB-month; per second | Cleared; not charged | Deleted |
| Local volume disk | $0.10/GB-month; per second | $0.20/GB-month; per second | Deleted |
| Standard network volume below 1 TB | $0.07/GB-month; hourly | Persists independently | Persists independently |

The public documentation lists standard network storage above 1 TB at **$0.05/GB-month**. The pricing page uses “under”/“over” wording, while the storage-types overview says “first 1 TB” and “beyond.” This example stays below that boundary rather than assuming a charge at exactly 1 TB. The product-specific page and billing summary distinguish hourly network-volume billing from the billing overview's broad per-second statement; use the specific storage rule rather than applying compute granularity universally.

For **100 GB** retained for a full nominal month, the cited rates imply **$10 running local**, **$20 stopped local**, or **$7 network storage below 1 TB**. For a 160-hour pause, an illustrative 730-hour conversion gives:

    stopped local: 100 × $0.20 × 160/730 = $4.38
    network:       100 × $0.07 × 160/730 = $1.53

These are capacity-rate estimates excluding compute, tax, credits and other charges, not measured bills or storage-performance comparisons. A 730-hour divisor is an exposed planning assumption, not a newly verified provider proration rule. Back up critical data externally: RunPod's [Pods pricing guidance](https://docs.runpod.io/pods/pricing.md), checked November 19, says it is not designed for long-term cloud storage.

For Serverless, the separate [pricing guide](https://docs.runpod.io/serverless/pricing.md), checked November 19, describes container disk at **approximately $0.10/GB-month in five-minute intervals**, plus independently persistent network volumes. Zero running compute is not proof of a zero endpoint/storage bill.

## Reconcile cost using the current billing contract

The [v2 Serverless billing reference](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history.md), checked **November 19, 2026**, documents `GET https://api.runpod.io/v2/billing/serverless`. Filter by `serverlessId` and use explicit UTC `startTime`/`endTime` with `bucketSize=hour` for an isolated endpoint audit.

1. **Capture identity and the quote.** Save endpoint ID, actual GPU, GPU count, Active/max workers, idle timeout, FlashBoot, storage and all attempts.
2. **Collect every intersecting bucket.** The API rounds the start down and end up to bucket boundaries. Read the resolved window in `metadata.query`; records use half-open `[startTime, endTime)` ranges. Do not mix explicit dates with `lastN`, which can include an unfinished current bucket.
3. **Reconcile categories and totals.** Preserve GPU, CPU, disk and total amounts, original precision, endpoint IDs, record counts and metadata totals. `feeAmount` is deprecated and always zero; platform charges are included in GPU/CPU amounts, not another fee to add.
4. **Keep billed-time claims separate.** This schema documents money, not `timeBilledMs`. Dollars divided by a matching effective rate give derived rate-equivalent seconds, not independently observed worker lifetime. Request `delayTime + executionTime` does not prove total billed lifetime or isolate model loading from waiting.
5. **Verify cleanup and finality independently.** Confirm the intended endpoint and its workers are gone and inspect persistent storage. A canceled job or empty queue does not establish teardown. Repeated unchanged cost records alone do not prove invoice-final settlement; the reference does not promise a settlement delay.

Our older v1 endpoint-billing and endpoint-deletion documentation paths now resolve to a general API overview rather than the old operation contracts. A successful page fetch is not evidence that their former billed-time fields or HTTP 204 delete contract remain current. This refresh therefore does not present those old schemas as today's documented interface. Use the current API reference and account-visible controls for cleanup; we did not execute a deletion or query account billing.

For Pods, use the separate [Pod billing history](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history.md) filtered by `podId`. Network storage has its own [billing history](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history.md). These references were checked November 19. Hourly cost buckets cannot establish a second-exact release cutoff.

## Prepaid balance and dormant endpoints are operational limits

The [billing overview](https://docs.runpod.io/accounts-billing/billing.md), checked November 19, describes prepaid credit, a minimum balance of one hour of the selected Pod configuration before deployment, billing runs every five minutes and auto-pay attempts limited to once per hour. That balance requirement is not a one-hour minimum usage charge.

The documented default spend limit is **$80/hour across all resources**, not a cumulative experiment budget. At zero balance, Pods with a network volume stop; those without one terminate and lose their data. Network-volume storage can continue charging and may eventually be deleted if unfunded. Set balance alerts and maintain payment headroom; an alert is not a substitute for teardown.

The [worker guide](https://docs.runpod.io/serverless/workers/overview.md), checked November 19, lists a default combined limit of five Flex and Active workers. Balance-based limits are account ceilings, not capacity guarantees. Check the actual account rather than planning production around a default.

Dormancy is separate from the configured worker idle timeout. The [endpoint guide](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked November 19, says three days without requests reduces max workers to two and seven days sets it to zero. You must raise that value yourself before reuse. Test recovery endpoints instead of assuming the next request restores capacity.

## Verdict: choose allocation first, then check the actual quote

**Pods fit sustained allocation when the exact configuration suits your job. Flex fits real gaps between running workers. Active workers buy warm capacity with a continuing bill.** None is a benchmark winner by name alone.

The November 19 card raises nine Secure Pod and five Flex inputs against our November 2 observation. The illustrated compute-only crossovers now span **348.2 to 662.4 aggregate Flex worker-hours** against a Secure Pod held for 720 hours. Higher prices do not move every crossover in the same direction.

Before buying, save the available configuration and account quote. Count startup, execution, waiting and every worker, then check retained storage. After one isolated workload, reconcile billing categories and verify cleanup. A headline hourly price, a completed request and a small prepaid balance each answer a different question.

## Choose the next RunPod decision

- **Choosing Pods versus Serverless:** read the [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) for workload fit and operating tradeoffs.
- **Comparing providers:** use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) with its provider-specific verification dates.
- **Estimating a workload:** use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) and substitute your current quote where its dated input differs.

## Sources and verification notes

Official evidence retrieved **November 19, 2026**:

- [Public pricing card](https://www.runpod.io/pricing): all 42 Pod prices, the matching HTML attributes and structured offers, and all 13 Flex rates and memory labels. The page's November 12 metadata is not an individual tariff effective date.
- [Pods pricing](https://docs.runpod.io/pods/pricing.md), [Pod management](https://docs.runpod.io/pods/manage-pods.md) and [storage types](https://docs.runpod.io/pods/storage/types.md): compute/storage granularity, stop versus termination, persistence and restart capacity risk. Storage examples cover ordinary local and standard network volumes, not every storage product.
- [Serverless pricing](https://docs.runpod.io/serverless/pricing.md), [worker lifecycle](https://docs.runpod.io/serverless/workers/overview.md) and [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md): billed running time, image-pull exception, retries, console/API defaults and the unresolved initialization wording and rate-table differences.
- [Account billing](https://docs.runpod.io/accounts-billing/billing.md), [v2 Serverless billing](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history.md), [Pod billing](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history.md) and [network-volume billing](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history.md): prepaid behavior and resource-scoped cost records.

Historical November 2 rates come from HostFleet's earlier guide, preserved in the research evidence. HostFleet's `gpu-pricing.json` supplies the selected-product baseline, not the complete card or a universal fresh verification date. Its dataset-wide date remains September 24. Every total, premium, crossover and tail cost above is arithmetic under stated assumptions; no availability, throughput, invoice settlement or exact bill cutoff is implied.

*Need a self-managed GPU Pod? This labeled affiliate link supports HostFleet's research: <a href="https://hostfleet.net/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Verify the account-visible quote and available configuration before purchase. Source citations remain direct and non-affiliate.*
