---
title: "RunPod pricing 2026: updated GPU rates and billing rules"
description: "Compare 42 RunPod Pod prices and 13 Flex tiers, updated break-even math, worker billing states, retained storage and endpoint cost reconciliation."
pubDate: 2026-07-24
updatedDate: 2026-10-17
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission through labeled signup links on this page. That does not change the analysis. Read our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed pricing guide; calculated costs are estimates, not measured bills.** We checked RunPod's public pricing page and the official billing, worker, endpoint and Pod documentation on **October 17, 2026**. The public page labels itself **Updated October 8, 2026**. We did not rent a GPU, obtain an authenticated quote, confirm capacity, inspect an invoice or benchmark performance.

> **Rates verified:** October 17, 2026 — 42 Pod prices and 13 Serverless Flex tiers<br>
> **Lifecycle and billing API documentation checked:** October 17, 2026<br>
> **Currency and assumptions:** public USD list prices before tax; one GPU; 720 billable hours for compute comparisons; 730 hours only for illustrative storage-month conversion<br>
> **Dataset scope:** only RunPod was checked for this refresh. The dataset-wide September 24 verification date is unchanged.

# RunPod pricing 2026: Pods, Serverless and what actually bills

The buying distinction is simple: **a Pod charges for allocated infrastructure; Serverless Flex charges while workers run; retained storage can bill after compute stops.** A cheap hourly rate does not tell you when the meter ends.

Three findings change this guide's earlier estimates:

- **The Pod price conflict is resolved in today's public source.** For all 21 products, the visible Secure price, explicit Community/Secure attributes and matching structured offers agree. The selected A100 PCIe Secure rate is **$1.79/hour**, not the older **$1.59/hour** input. This is a public rate-card check, not an account-visible purchase quote.
- **More Secure rates differ from the October 2 guide than the dataset subset alone shows.** Fifteen of the 21 Secure prices changed between those observations; the 21 Community prices are unchanged. H100 SXM is now **$3.99/hour**, for example. Do not infer that the vendor changed them today.
- **B300 Flex is now $10.65/hour**, versus the guide's older **$9.98/hour** observation. Its Flex row specifies **280 GB**, whereas the B300 Pod row specifies **288 GB**. They are not an exact memory-equivalent comparison.

All current figures above come from the [official pricing page](https://www.runpod.io/pricing), checked October 17. Historical figures are the October 2 observations retained in this article's previous version, not an announced effective date.

## Which RunPod product fits the workload?

| Workload | Surface to evaluate first | Budget boundary |
|---|---|---|
| Sustained job; you manage the container | On-demand Pod | Running allocation, storage and the exact Community/Secure configuration |
| Bursty API with meaningful idle gaps | Serverless Flex | Worker cold start, execution, waiting timeout, retries and all parallel workers |
| Endpoint that must remain warm | Active Serverless or a running Pod | Active workers keep billing without requests; get an Active-rate quote |
| Short pause with local data to retain | Stopped Pod | GPU released; local volume remains billable; restart capacity not reserved |
| Disposable environment after export | Terminated Pod | Pod-local data deleted; separately created network storage survives |
| Weights/checkpoints that must outlive compute | Network volume | Its storage lifecycle is independent of the Pod |

Community and Secure Cloud are different supply surfaces, not interchangeable performance promises. Before comparing rates, record exact GPU variant, GPU count, host resources, region and capacity. See our [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) for product fit beyond pricing.

## Every public Pod price: Community versus Secure

**Verified October 17, 2026.** The [public RunPod pricing page](https://www.runpod.io/pricing) supplies all 21 pairs below. The premium is Secure minus Community; the 720-hour column is that difference multiplied by 720. These are on-demand list inputs, not savings-plan or all-in quotes.

| GPU product | Community/hr | Secure/hr | Secure premium/hr | Premium over 720 hours | Premium vs Community |
|---|---:|---:|---:|---:|---:|
| RTX A5000 | $0.16 | $0.27 | $0.11 | $79.20 | 68.8% |
| RTX 3090 | $0.22 | $0.50 | $0.28 | $201.60 | 127.3% |
| A40 | $0.35 | $0.59 | $0.24 | $172.80 | 68.6% |
| L4 | $0.44 | $0.59 | $0.15 | $108.00 | 34.1% |
| RTX A6000 | $0.33 | $0.59 | $0.26 | $187.20 | 78.8% |
| Pro 6000 MIG 24GB | $0.50 | $0.69 | $0.19 | $136.80 | 38.0% |
| RTX 4090 | $0.34 | $0.89 | $0.55 | $396.00 | 161.8% |
| RTX 6000 Ada | $0.74 | $0.99 | $0.25 | $180.00 | 33.8% |
| L40 | $0.69 | $0.82 | $0.13 | $93.60 | 18.8% |
| RTX 5090 | $0.69 | $1.19 | $0.50 | $360.00 | 72.5% |
| L40S | $0.79 | $1.09 | $0.30 | $216.00 | 38.0% |
| Pro 6000 MIG 48GB | $1.00 | $1.29 | $0.29 | $208.80 | 29.0% |
| A100 PCIe | $1.19 | $1.79 | $0.60 | $432.00 | 50.4% |
| A100 SXM | $1.39 | $1.79 | $0.40 | $288.00 | 28.8% |
| RTX Pro 6000 | $1.69 | $2.49 | $0.80 | $576.00 | 47.3% |
| H100 PCIe | $1.99 | $2.89 | $0.90 | $648.00 | 45.2% |
| H100 NVL | $2.59 | $3.19 | $0.60 | $432.00 | 23.2% |
| H100 SXM | $2.69 | $3.99 | $1.30 | $936.00 | 48.3% |
| H200 | $3.59 | $5.29 | $1.70 | $1,224.00 | 47.4% |
| B200 | $5.98 | $7.99 | $2.01 | $1,447.20 | 33.6% |
| B300 | $6.94 | $8.99 | $2.05 | $1,476.00 | 29.5% |

**Estimate assumptions:** one listed GPU product stays allocated for all 720 hours, with no tax, storage, extra GPU, credit, negotiated discount or commitment adjustment. Percentages divide the difference by Community price. Equal product names do not prove equal host resources, stock or throughput.

The smallest absolute spread is now **$0.11/hour for RTX A5000**, or **$79.20 over 720 hours**. The largest is **$2.05/hour for B300**, or **$1,476.00**. Percentage spreads range from **18.8% for L40** to **161.8% for RTX 4090**. A percentage alone can hide the larger dollar exposure of an expensive card.

For A100 PCIe, **$1.79 × 720 = $1,288.80** of Secure compute, compared with **$1,144.80** using the guide's old $1.59 input: **$144.00 more** under the same allocation assumption. H100 SXM's current **$3.99/hour** instead of the older **$3.49/hour** adds **$360.00** over 720 hours. Both comparisons use today's cited rate and the October 2 baseline; neither establishes a vendor change date.

Compare accelerator variants and other providers in the [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental guide](https://hostfleet.net/h100-rental-price-per-hour-2026/). Those pages have their own verification dates; this guide's dated RunPod inputs do not reverify their other providers.

## Every public Serverless Flex tier

**Verified October 17, 2026.** These are the hourly Flex inputs on the [same official rate card](https://www.runpod.io/pricing). RunPod's [Serverless pricing documentation](https://docs.runpod.io/serverless/pricing.md), also checked October 17, describes per-second compute billing, rounded up to the nearest second. The public hourly figures below remain the calculation inputs; converting them to seconds is not a separate quoted tariff.

| Public Flex tier | Vendor memory label | Flex hourly input |
|---|---:|---:|
| A4000, A4500, RTX 4000, RTX 2000 | 16 GB | $0.58/hr |
| L4, A5000, 3090, MIG 24GB | 24 GB | $0.69/hr |
| RTX 4090 Pro | 24 GB | $1.10/hr |
| RTX PRO 4500 Blackwell | 32 GB | $1.15/hr |
| RTX 5090 Pro | 32 GB | $1.58/hr |
| A6000, A40 | 48 GB | $1.22/hr |
| L40 / L40S / 6000 Ada / MIG | 48 GB | $1.75/hr |
| A100 | 80 GB | $2.72/hr |
| H100 Pro | 80 GB | $4.79/hr |
| RTX 6000 Pro | 96 GB | $3.49/hr |
| H200 | 141 GB | $5.93/hr |
| B200 | 180 GB | $8.64/hr |
| B300 | 280 GB | $10.65/hr |

A pooled label is not an exact-card reservation. The 24 GB L4/A5000/3090/MIG tier does not promise that every request runs on an L4. RunPod's [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked October 17, allow up to three GPU selections in priority order and describe distribution across priorities with five or more workers. Record the GPU actually observed before making a performance comparison.

B300's **$10.65/hour** input is **6.7% above** the guide's earlier $9.98 observation. The other 12 Flex prices match that baseline. Preserving the vendor's **280 GB Flex / 288 GB Pod** distinction matters more than silently forcing both into a single cross-provider memory label.

Use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) for other deployment surfaces. For the wider dated catalog, use our [GPU pricing table](https://hostfleet.net/gpu-pricing/). The article tables extend the selected RunPod entries from the same `gpu-pricing.json` baseline with checks of the complete public provider card; they are snapshots, not automatic account-price lookups.

## Pod versus Flex: updated break-even math

This calculation asks how many **aggregate Flex worker-hours** equal one Secure Pod kept allocated for 720 hours. It does not compare successful requests, throughput or all-in deployment cost.

    Pod compute = Secure Pod rate × 720
    Flex break-even worker-hours = Pod compute ÷ Flex rate
    Share of 720 hours = Secure Pod rate ÷ Flex rate

**All current inputs: official public pricing, verified October 17, 2026.**

| Capacity point | Secure Pod | Flex | Pod for 720 hours | Flex compute-only break-even |
|---|---:|---:|---:|---:|
| L4 / 24 GB pooled tier | $0.59/hr | $0.69/hr | $424.80 | 615.7 hours (85.5%) |
| RTX 4090 / 24 GB tier | $0.89/hr | $1.10/hr | $640.80 | 582.5 hours (80.9%) |
| RTX 5090 / 32 GB tier | $1.19/hr | $1.58/hr | $856.80 | 542.3 hours (75.3%) |
| A40 / 48 GB pooled tier | $0.59/hr | $1.22/hr | $424.80 | 348.2 hours (48.4%) |
| L40S / 48 GB pooled tier | $1.09/hr | $1.75/hr | $784.80 | 448.5 hours (62.3%) |
| RTX Pro 6000 / 96 GB tier | $2.49/hr | $3.49/hr | $1,792.80 | 513.7 hours (71.3%) |
| A100 PCIe / 80 GB tier | $1.79/hr | $2.72/hr | $1,288.80 | 473.8 hours (65.8%) |
| H100 PCIe / 80 GB tier | $2.89/hr | $4.79/hr | $2,080.80 | 434.4 hours (60.3%) |
| H200 / 141 GB tier | $5.29/hr | $5.93/hr | $3,808.80 | 642.3 hours (89.2%) |
| B200 / 180 GB tier | $7.99/hr | $8.64/hr | $5,752.80 | 665.8 hours (92.5%) |
| B300: 288 GB Pod / 280 GB Flex | $8.99/hr | $10.65/hr | $6,472.80 | 607.8 hours (84.4%) |

**Assumptions:** one GPU per worker; no storage, tax, Active discount, credits or extra charges; no assertion that a pooled Flex tier is performance-equivalent to the Pod. Hours are aggregate across workers, not necessarily wall-clock endpoint hours. Ten simultaneous workers consume ten worker-hours in one elapsed hour. The B300 row also has the stated memory-label mismatch.

For the 24 GB L4-class comparison, the new compute-only crossover is **615.7 Flex worker-hours**, rather than the previous **511.3-hour** estimate. At **100 billable Flex worker-hours**, $0.69/hour gives **$69.00**, versus **$424.80** for an L4 Secure Pod held for 720 hours at $0.59/hour. But releasing that Pod after the same 100 allocated hours would cost **$59.00** of compute instead. The apparent Flex saving depends on comparing demand-led allocation with an always-on Pod, not simply the word “serverless.”

Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to replace 720 with useful work, startup, idle tails, retries, teardown lag and retained resources. A worker's response time is not its whole billable lifetime.

## Startup billing is clearer now: Initializing is not model loading

The [Serverless pricing guide](https://docs.runpod.io/serverless/pricing.md) and [worker lifecycle guide](https://docs.runpod.io/serverless/workers/overview.md), checked October 17, now describe the same boundary: **compute bills while a worker is running**. This supersedes this article's older statement that the startup descriptions conflict. It resolves a documentation interpretation, not a measured invoice cutoff.

| Worker phase or console state | Documented compute treatment | Practical meaning |
|---|---|---|
| Initializing | Scaled down; not billed | Host normally pulls image or downloads cached models before container startup |
| Cold start within Running | Billed | Container starts; handler loads its model and becomes ready |
| Processing within Running | Billed | Worker executes requests |
| Waiting within Running | Billed | Worker waits for another job during idle timeout |
| Idle | Already scaled down; not billed | Not the same as waiting during the timeout |
| Active worker with no job | Keeps running and billing | An empty queue does not make an Active worker free |

**Important exception:** image pulls are normally outside running compute, but the worker guide says a pull is billed if the worker starts before the image is present on its host. Do not promise universally free image downloads. Loading model weights inside the running handler is also not the same as downloading cached weights while scaled down.

### A separate rate-table discrepancy remains

Clearer lifecycle language does not resolve every pricing source. The [endpoint-settings per-second table](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked October 17, still differs from the public hourly card. Its H100 figure of **$0.00116/second** converts to **$4.176/hour**, versus public Flex **$4.79/hour**. Its L40/L40S/6000 Ada figure of **$0.00053/second** converts to **$1.908/hour**, versus public **$1.75/hour**.

This guide consistently uses the public hourly card because the Serverless pricing documentation points there for compute prices. Confirm the effective quote for the exact account and endpoint before reconstructing charges. Do not combine one page's per-second input with another page's hourly rate as though they were identical tariffs.

## Idle tails: count worker waits, not successful requests

The October 17 [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md) list defaults of **zero Active workers, three maximum workers, one GPU per worker and a five-second idle timeout**. FlashBoot is enabled by default. A waiting worker remains Running and billed.

At the October 17 public Flex inputs:

| Flex tier | One five-second tail | 1,440 isolated tails |
|---|---:|---:|
| L4-class at $0.69/hr | $0.000958 | $1.38 |
| A100 at $2.72/hr | $0.003778 | $5.44 |
| H100 Pro at $4.79/hr | $0.006653 | $9.58 |
| B300 at $10.65/hr | $0.014792 | $21.30 |

**Derived assumptions:** hourly rate × 5/3,600 per tail; 1,440 independent, nonoverlapping tails. The scenario excludes cold start, execution, retries, rounding effects, storage, discounts and other workers. Requests sharing a running worker can share a tail; multiple workers can produce multiple tails. It is not a fee applied to every request.

Queue-based endpoints advertise automatic retries. Turning off client retries does not prove a single provider execution. Capture request/job ID, attempt count, worker ID and process identity when measuring. The worker guide also mentions extra workers during spikes; do not treat a nominal maximum as a verified small-experiment spend cap without checking its effective behavior.

## Stopping a Pod: GPU released, storage retained

The [Pod management guide](https://docs.runpod.io/pods/manage-pods.md), rechecked October 17, says stopping releases the GPU, clears the container disk and preserves the local volume normally mounted at `/workspace`. Restart depends on available capacity and can return zero GPUs. Stop is not a reservation.

Termination deletes the Pod and its local data. A separately created network volume survives both stop and termination; if `/workspace` is backed by that network volume rather than local volume, follow the network-volume lifecycle instead.

**Storage prices and granularity: [Pods pricing](https://docs.runpod.io/pods/pricing.md), verified October 17, 2026.**

| Resource | Running Pod | Stopped Pod | After Pod termination |
|---|---|---|---|
| GPU compute | Per-second compute | Released | No Pod compute |
| Container disk | $0.10/GB-month; per second | Cleared; not charged | Deleted |
| Local volume disk | $0.10/GB-month; per second | $0.20/GB-month; per second | Deleted |
| Standard network volume below 1 TB | $0.07/GB-month; hourly | Persists independently | Persists independently |

The public documentation lists standard network storage above 1 TB at **$0.05/GB-month**. Its “under”/“over” wording does not establish the exact 1 TB boundary. The product-specific page and billing summary distinguish hourly network-volume billing from the billing overview's broad per-second statement; use the specific storage rule rather than applying compute granularity universally.

For **100 GB** retained for a full nominal month, the cited rates imply **$10 running local**, **$20 stopped local**, or **$7 network storage below 1 TB**. For a 160-hour pause, an illustrative 730-hour conversion gives:

    stopped local: 100 × $0.20 × 160/730 = $4.38
    network:       100 × $0.07 × 160/730 = $1.53

These are capacity-rate estimates excluding compute, tax, credits and other charges, not measured bills or storage-performance comparisons. A 730-hour divisor is an exposed planning assumption, not a newly verified provider proration rule. Back up critical data externally: RunPod's [storage guidance](https://docs.runpod.io/pods/storage/types.md), checked October 17, says it is not designed for long-term cloud storage.

For Serverless, the separate [pricing guide](https://docs.runpod.io/serverless/pricing.md), checked October 17, describes container disk at **approximately $0.10/GB-month in five-minute intervals**, plus independently persistent network volumes. Zero running compute is not proof of a zero endpoint/storage bill.

## Reconcile endpoint cost without inventing billed seconds

A useful first audit answers **“what did this endpoint cost?”** before trying to assign dollars to cold start, execution and waiting. RunPod documents two Serverless billing contracts, checked October 17; they are not interchangeable schemas.

| API contract | Endpoint scope | Documented output | Limit |
|---|---|---|---|
| [v1 endpoint billing](https://docs.runpod.io/api-reference/billing/GET/billing/endpoints.md): `GET https://rest.runpod.io/v1/billing/endpoints` | `endpointId`, `grouping=endpointId`, explicit UTC dates, `bucketSize=hour` | Array of grouped records with `endpointId`, `time`, `amount`; `timeBilledMs` and `diskSpaceBilledGb` documented for applicable resources | Billed milliseconds do not apply to every resource; verify actual field presence and scope |
| [v2 Serverless billing](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history.md): `GET https://api.runpod.io/v2/billing/serverless` | `serverlessId`, explicit UTC dates, `bucketSize=hour` | `records` with endpoint ID, bucket start/end and GPU/CPU/disk/total USD; metadata query, totals and counts | No documented `timeBilledMs` field; amount-only output cannot directly measure billed lifetime |

Use this workflow for one dedicated endpoint:

1. **Capture the quote and identity.** Record endpoint ID, account/team scope, actual GPU selection, GPU count, Active/max workers, idle timeout, FlashBoot and storage. Map v1 `endpointId` to v2 `serverlessId` before comparing records.
2. **Take a baseline, then isolate the work.** Keep exact UTC request and worker events, all attempts and cleanup evidence. A job result's `delayTime + executionTime` is not documented as total billed worker lifetime.
3. **Fetch every intersecting hourly bucket.** v2 rounds start down and end up to bucket boundaries. Read `metadata.query` for the resolved window and match every returned `serverlessId`. Its buckets are half-open `[startTime, endTime)`. Do not mix `lastN` with explicit start/end; it can include an unfinished bucket.
4. **Reconcile all categories.** Preserve GPU, CPU, disk and total amounts, plus credits, discounts and the original payload. Check record counts and category sums against metadata. v2 `feeAmount` is deprecated and always zero: platform charges are already included in GPU/CPU amounts, not another fee to add.
5. **Keep the time claim separate.** Dividing dollars by a matching effective rate yields *derived rate-equivalent seconds*. It does not independently measure lifetime or split startup from waiting. Even a populated v1 billed-time field needs independent lifecycle evidence for phase attribution.
6. **Confirm finality and cleanup.** Documentation does not promise settlement delay; repeated unchanged records alone are not proof of invoice-final amounts. The [endpoint delete contract](https://docs.runpod.io/api-reference/endpoints/DELETE/endpoints/endpointId.md) documents HTTP 204 success, not an immediate billing cutoff. Verify endpoint absence and workers stopped; cancellation or queue purge alone does not establish teardown.

Preserve returned number precision, for example with decimal parsing rather than binary floating-point arithmetic. Do not sum v1 and v2 amounts as independent charges for the same work. If attribution or reconciliation fails, report latency separately and mark cost decomposition unresolved; do not label the remainder “cold-start cost.” These are documented contracts and a proposed audit method, **not account responses or an experiment we ran**.

For Pods, use the separate [Pod billing history](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history.md) filtered by `podId`. Network volumes have their own [billing history](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history.md). Hourly cost buckets can reconcile categories but cannot establish a second-exact release cutoff.

## Prepaid balance and dormant endpoints are operational limits

The [billing overview](https://docs.runpod.io/accounts-billing/billing.md), checked October 17, describes prepaid credit, a minimum balance of one hour of the selected Pod configuration before deployment, billing runs every five minutes and auto-pay attempts limited to once per hour. That balance requirement is not a one-hour minimum usage charge.

The documented default spend limit is **$80/hour across all resources**, not a cumulative experiment budget. At zero balance, Pods with a network volume stop; those without one terminate and lose their data. Network-volume storage can continue charging and may eventually be deleted if unfunded. Set balance alerts and maintain payment headroom; an alert is not a substitute for teardown.

The [worker guide](https://docs.runpod.io/serverless/workers/overview.md), checked October 17, lists a default combined limit of five Flex and Active workers. Balance-based limits are account ceilings, not capacity guarantees. Check the actual account rather than planning production around a default.

Dormancy is separate from normal five-second scale-down. The [endpoint guide](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md), checked October 17, says three days without requests reduces max workers to two and seven days sets it to zero. You must raise that value yourself before reuse. Test recovery endpoints instead of assuming the next request restores capacity.

## Verdict: compare allocation, then verify the bill

**Pods suit sustained allocation when the exact available configuration fits. Flex suits genuine gaps between worker lifetimes. Active workers trade a warm running floor for readiness.** Those are deployment choices, not a benchmark ranking.

Use today's complete tables rather than the guide's older Secure inputs: A100 PCIe is **$1.79/hour**, H100 SXM **$3.99/hour**, and B300 Flex **$10.65/hour** on the October 17 public rate card. The selected compute-only break-even points now span **348.2 to 665.8 aggregate Flex worker-hours** against a 720-hour Secure Pod, with the product and memory caveats above.

The startup documentation now distinguishes unbilled scaled-down preparation from billed handler startup and waiting. The remaining public-hourly versus docs-per-second discrepancy still needs an account quote. Stopping a Pod releases compute but preserves billable local storage; an hourly API amount does not prove startup seconds.

Before committing to a provider, capture the exact available shape and quote, run one controlled billing reconciliation, and verify cleanup. Until then, these are sourced rates and explicit estimates—not measured savings.

## Sources and verification notes

All linked official sources in this refresh were retrieved successfully on **October 17, 2026**:

- [Public rate card](https://www.runpod.io/pricing): all 42 Pod values, matching structured Community/Secure offers, all 13 Flex rates, and the page's October 8 update label. Historical comparisons use the October 2 article baseline, not inferred vendor effective dates.
- [Pods pricing](https://docs.runpod.io/pods/pricing.md), [management](https://docs.runpod.io/pods/manage-pods.md) and [storage](https://docs.runpod.io/pods/storage/types.md): compute/storage granularity, stopped local storage, restart risk and persistence.
- [Serverless pricing](https://docs.runpod.io/serverless/pricing.md), [worker lifecycle](https://docs.runpod.io/serverless/workers/overview.md) and [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations.md): running versus scaled-down treatment, billed startup exception, storage, defaults, retries and the remaining rate discrepancy.
- [Operation reference](https://docs.runpod.io/serverless/endpoints/operation-reference.md), [v1 billing](https://docs.runpod.io/api-reference/billing/GET/billing/endpoints.md), [v2 billing](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history.md) and [deletion](https://docs.runpod.io/api-reference/endpoints/DELETE/endpoints/endpointId.md): job/API boundaries and proposed attribution workflow. No authenticated response or paid run was obtained.
- [Billing overview](https://docs.runpod.io/accounts-billing/billing.md), [Pod billing history](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history.md) and [network-volume billing history](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history.md): prepaid failure behavior and separate resource-level cost records.
- HostFleet's GPU dataset supplies the selected-product baseline; today's complete RunPod-card check does not advance its September 24 dataset-wide date. All costs beyond directly published prices are calculations with assumptions exposed above. No stock, invoice or throughput verification is implied.

*Need a self-managed GPU Pod? This labeled affiliate link supports HostFleet's research: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Verify the exact account-visible quote and available configuration before purchase. Source citations remain direct and non-affiliate.*
