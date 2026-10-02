---
title: "RunPod pricing 2026: 42 Pod prices, 13 Serverless tiers, and stopped-Pod costs"
description: "RunPod pricing checked October 2026: 42 Pod prices, 13 Serverless tiers, stopped-Pod storage costs, restart risk, and break-even math."
pubDate: 2026-07-24
updatedDate: 2026-10-02
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed pricing and lifecycle refresh with derived estimates.** RunPod's public rate card was checked on **October 2, 2026**; the page itself says **Updated September 27, 2026**. All 42 Pod price points and 13 Serverless Flex tiers matched HostFleet's September 17 table. Pod stop, termination, storage, restart, billing-history, Serverless, and account-billing documentation were rechecked October 2. HostFleet did not create a paid resource, inspect an invoice, test restart capacity, or benchmark performance. Dollar differences, 720-hour totals, storage conversions, percentages, and break-even points below are arithmetic estimates from the cited public rates.

> **RunPod rate card rechecked:** October 2, 2026; provider page says updated September 27<br>
> **Pod and Serverless lifecycle rules rechecked:** October 2, 2026<br>
> **Dataset boundary:** HostFleet's sitewide [GPU pricing dataset](https://hostfleet.net/gpu-pricing/) was updated September 24; RunPod's complete provider card was independently rechecked October 2<br>
> **Estimate conventions:** one GPU, public USD list rates before tax, 720 hours for compute comparisons, and 730 hours for storage-month conversions

# RunPod pricing 2026: 42 Pod prices, 13 Serverless tiers, and stopped-Pod costs

RunPod publishes **21 Pod products with separate Community Cloud and Secure Cloud prices: 42 Pod price points**. It also publishes **13 Serverless Flex tiers**. The lowest number is not automatically the right comparison because Pods, Flex workers, and retained storage stop billing at different times.

The material October update is not a GPU-rate change. It is the cost boundary around a stopped Pod. RunPod documents that stopping releases the GPU, clears the container disk, preserves the local volume disk mounted at `/workspace`, and raises that local-volume rate from **$0.10 to $0.20 per GB-month**. Starting again is capacity-dependent and can return a Pod with zero GPUs. Termination deletes the Pod and its local volume disk, while a separately created network volume persists independently.

The October 2 rate check found all 55 public values unchanged from the September 17 HostFleet table. The Secure-versus-Community spread still ranges from **$0.05/hour for L4** to **$1.00/hour for H200**. As a percentage of the Community rate, it ranges from **9.0% for the 48 GB Pro 6000 MIG** to **127.3% for RTX 3090**. Those spreads are price differences, not proof that both supply pools have equal availability, host hardware, location, or performance.

## The buying answer

| Workload | RunPod surface or action to test first | Cost boundary |
|---|---|---|
| Sustained job where you manage the container | Running Pod | Compute bills while running; compare Community and Secure availability separately |
| Short pause where `/workspace` must survive | Stop the Pod | GPU is released; local volume persists at $0.20/GB-month; restart capacity is not reserved |
| Disposable environment after output export | Terminate the Pod | Pod and local volume are deleted; separately created network volumes survive |
| Bursty endpoint with real idle gaps | Serverless Flex | Count the disputed startup boundary, execution, idle timeout, retries, and parallel workers |
| Low-latency endpoint that must stay warm | Active Serverless or Pod | Active pricing is sales-negotiated; compare the actual quote with Pod allocation |
| Checkpoints or weights that must outlive the Pod | Network volume | Storage bills independently of Pod state and termination |
| Cheapest possible listed Pod rate | Community Cloud | Treat availability and configuration as separate acceptance tests |

Community Cloud is not simply Secure Cloud with a discount coupon. RunPod presents them as separate supply surfaces. Record which one was selected in every estimate and verify the exact console configuration before reserving money or capacity.

## Every public Pod price and the Secure Cloud premium

[RunPod's public pricing page](https://www.runpod.io/pricing), accessed **October 2, 2026** and labeled updated September 27, exposed the 21 Community/Secure pairs below. The hourly premium is Secure minus Community. The 720-hour premium multiplies that difference by 720; it is not a RunPod quote.

| GPU product | Community | Secure | Secure premium/hr | Premium for 720 hours | Premium vs Community |
|---|---:|---:|---:|---:|---:|
| RTX A5000 | $0.16 | $0.27 | $0.11 | $79.20 | 68.8% |
| RTX 3090 | $0.22 | $0.50 | $0.28 | $201.60 | 127.3% |
| A40 | $0.35 | $0.49 | $0.14 | $100.80 | 40.0% |
| L4 | $0.44 | $0.49 | $0.05 | $36.00 | 11.4% |
| RTX A6000 | $0.33 | $0.53 | $0.20 | $144.00 | 60.6% |
| Pro 6000 MIG 24GB | $0.50 | $0.59 | $0.09 | $64.80 | 18.0% |
| RTX 4090 | $0.34 | $0.74 | $0.40 | $288.00 | 117.6% |
| RTX 6000 Ada | $0.74 | $0.84 | $0.10 | $72.00 | 13.5% |
| L40 | $0.69 | $0.82 | $0.13 | $93.60 | 18.8% |
| RTX 5090 | $0.69 | $0.99 | $0.30 | $216.00 | 43.5% |
| L40S | $0.79 | $1.09 | $0.30 | $216.00 | 38.0% |
| Pro 6000 MIG 48GB | $1.00 | $1.09 | $0.09 | $64.80 | 9.0% |
| A100 PCIe | $1.19 | $1.59 | $0.40 | $288.00 | 33.6% |
| A100 SXM | $1.39 | $1.59 | $0.20 | $144.00 | 14.4% |
| RTX Pro 6000 | $1.69 | $2.09 | $0.40 | $288.00 | 23.7% |
| H100 PCIe | $1.99 | $2.89 | $0.90 | $648.00 | 45.2% |
| H100 NVL | $2.59 | $3.19 | $0.60 | $432.00 | 23.2% |
| H100 SXM | $2.69 | $3.49 | $0.80 | $576.00 | 29.7% |
| H200 | $3.59 | $4.59 | $1.00 | $720.00 | 27.9% |
| B200 | $5.98 | $6.79 | $0.81 | $583.20 | 13.5% |
| B300 | $6.94 | $7.89 | $0.95 | $684.00 | 13.7% |

**Estimate assumptions:** one listed product stays allocated for 720 hours; no savings plan, storage, tax, support, credit-card failure, duplicate Pod, regional adjustment, or negotiated discount. The percentage column divides the hourly premium by the Community rate. Public pricing does not prove stock, quota, provisioning success, region access, host CPU/RAM equivalence, or throughput.

This October 2 table exposes why a percentage-only comparison can mislead. The RTX 3090 Secure row is 127.3% above Community, but its 720-hour dollar spread is $201.60. H200's percentage spread is only 27.9%, but the same planning month adds $720. Budget the absolute difference, then decide whether the available Secure configuration is worth it.

Card memory, PCIe versus SXM or NVL, host resources, and measured throughput can dominate a small hourly difference. Use the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) when the accelerator and provider boundary matter more than RunPod's product labels.

## Every public Serverless Flex tier

The same [RunPod pricing page](https://www.runpod.io/pricing), accessed **October 2, 2026**, published these Flex rates:

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

A pooled tier is not an exact-card reservation. Selecting the 24 GB L4/A5000/3090/MIG tier does not prove which card will serve a request or that its performance matches the L4 Pod row. RunPod's endpoint documentation allows up to three GPU categories in priority order and can spread workers across priorities when an endpoint has five or more workers.

For cross-provider alternatives and their lifecycle differences, use HostFleet's [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## Pod versus Flex break-even

This comparison asks one narrow question: how many Flex worker-hours equal a Secure Pod held for a 720-hour month?

    Pod month = Secure Pod hourly rate × 720
    Flex break-even hours = Pod month ÷ Flex hourly rate
    Break-even share = Flex break-even hours ÷ 720

All input rates come from [RunPod's public pricing page](https://www.runpod.io/pricing), accessed **October 2, 2026**. Results are derived estimates.

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

This is not a utilization forecast. Flex bills worker allocation, not successful output. A Pod released after each job can cost far less than its 720-hour total. A Flex worker held by an Active-worker setting or a long idle timeout can cost more than request execution suggests.

Use HostFleet's [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to replace 720 hours with your expected allocation pattern.

## RunPod's official startup-billing descriptions conflict

RunPod's [Serverless pricing guide](https://docs.runpod.io/serverless/pricing), checked **October 2, 2026**, says billing starts when a worker starts and ends when it fully stops, rounded up to the nearest second. It includes container initialization and model loading, request execution, and the idle timeout.

RunPod's [worker overview](https://docs.runpod.io/serverless/workers/overview), checked the same day, labels the Initializing state—image download, code load, and cached-model download—as not billed, while Running is billed.

Those pages do not establish one unambiguous startup boundary. This guide therefore labels startup billing as a **conflict between official sources**. It does not call cold starts free and does not invent a startup charge. Check the console rate and reconcile one isolated worker lifecycle against billing history before projecting traffic.

The public hourly table and [endpoint-settings documentation](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), also checked October 2, disagree on several rates. For example, the documentation's H100 Pro figure of $0.00116/second converts to $4.176/hour, while the public Flex table says $4.79/hour. The L40/L40S/6000 Ada documentation figure of $0.00053/second converts to $1.908/hour, while the public table says $1.75/hour.

Because the Serverless pricing guide sends buyers to the public pricing page for compute rates, the tables above use the public Flex rates. Confirm the rate displayed for the exact endpoint before launch.

## Idle tails are small once and material at volume

RunPod's [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked **October 2, 2026**, list zero Active workers, three maximum workers, one GPU per worker, and a five-second idle timeout as defaults. The worker stays billable during the idle timeout.

Using the public October 2 Flex rates:

| Flex tier | One five-second tail | 1,440 isolated tails |
|---|---:|---:|
| L4 class at $0.69/hr | $0.000958 | $1.38 |
| A100 at $2.72/hr | $0.003778 | $5.44 |
| H100 Pro at $4.79/hr | $0.006653 | $9.58 |
| B300 at $9.98/hr | $0.013861 | $19.96 |

**Estimate assumptions:** hourly rate × 5 ÷ 3,600; the 1,440-tail case assumes one isolated tail each minute for 24 hours with no overlap. It excludes initialization, execution, retries, storage, concurrency, and discounts. Requests that reuse a running worker can share a tail.

A longer timeout can reduce cold starts but increases warm idle cost. A shorter timeout cuts idle spend while potentially increasing startup frequency and latency. Measure both sides on the real endpoint.

## Stopping a Pod releases the GPU but not every bill

RunPod's [Manage Pods documentation](https://docs.runpod.io/pods/manage-pods), checked **October 2, 2026**, makes the stop boundary explicit. Stopping releases the GPU and clears the container disk. The local volume disk mounted at `/workspace` survives, but it bills at the stopped rate. Starting the Pod again attempts to find capacity; RunPod warns that changed availability can return a Pod with zero GPUs.

Termination is different. It deletes the Pod and its local volume disk. A separately created network volume is independent of the Pod and survives both stop and termination.

| Resource or action | Running Pod | Stopped Pod | Terminated Pod |
|---|---|---|---|
| GPU compute | Billed per second | GPU released; no reservation is retained | No Pod compute |
| Container disk | $0.10/GB-month, billed per second | Cleared; no retained container-disk charge | Deleted |
| Local volume disk (`/workspace`) | $0.10/GB-month, billed per second | Preserved at **$0.20/GB-month**, billed per second | Deleted |
| Standard network volume below 1 TB | $0.07/GB-month, billed hourly | Persists independently | Persists independently |
| Restart path | Already allocated | Capacity-dependent; zero GPUs is possible | Create a new Pod |

The storage prices come from [RunPod's Pods pricing documentation](https://docs.runpod.io/pods/pricing) and public rate card, checked **October 2, 2026**. The public table lists standard network storage above 1 TB at **$0.05/GB-month**. It uses “under 1 TB” and “over 1 TB,” so this guide makes no claim about the exact 1 TB boundary.

### What retained storage costs

These estimates use a 730-hour month only to normalize the monthly capacity rates. They assume provisioned capacity remains for the entire month and exclude tax, discounts, data transfer, compute, and other storage tiers.

| Retained capacity | Running local volume | Stopped local volume | Standard network volume below 1 TB |
|---:|---:|---:|---:|
| 10 GB | **$1/month** | **$2/month** | **$0.70/month** |
| 100 GB | **$10/month** | **$20/month** | **$7/month** |
| 500 GB | **$50/month** | **$100/month** | **$35/month** |

For a shorter example, 100 GB of local volume left on a stopped Pod for 160 hours costs an estimated **$4.38**:

    100 GB × $0.20/GB-month × 160/730 month = $4.38

The same provisioned capacity on standard network storage would be about **$1.53** for 160 hours at the under-1-TB rate. That is price arithmetic, not a performance comparison. RunPod describes local volume as fast local storage; network-volume performance and availability differ, and the network product bills hourly instead of per second.

### The operational choice is stop, terminate, or decouple storage

- **Stop** when `/workspace` must survive and the doubled local-storage rate is acceptable. Do not treat stop as a capacity reservation.
- **Terminate** after exporting outputs when the environment is disposable. This is the cutoff for the Pod and local volume.
- **Use a network volume** when data must outlive Pod deletion or move between compatible Pods. Budget it independently and verify data-center constraints.
- **Back up critical data externally.** RunPod's [storage guide](https://docs.runpod.io/pods/storage/types), checked October 2, says the platform is not designed for long-term cloud storage.

The [Pod billing-history endpoint](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history), checked October 2, can filter by `podId` and returns `gpuAmount`, `cpuAmount`, `diskAmount`, and `totalAmount`. Its smallest published bucket is one hour. That is enough to reconcile compute-versus-disk totals over a controlled window, but not to manufacture a second-level stop cutoff from an hourly aggregate. Network volumes have a separate [billing-history endpoint](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history).

## Prepaid credit is an uptime dependency

RunPod's [billing overview](https://docs.runpod.io/accounts-billing/billing), checked **October 2, 2026**, documents prepaid credits, a minimum balance equal to one hour of the selected Pod configuration before deployment, a default account-wide spend limit of **$80/hour**, billing deductions every five minutes, and auto-pay attempts limited to once per hour.

At zero balance, Pods with a network volume stop; Pods without one terminate and their data cannot be recovered. Network-volume storage can continue charging after compute stops. If a zero balance persists, RunPod says the unfunded volume may eventually terminate.

Serverless capacity has separate account limits. The worker overview lists a default combined cap of five Flex and Active workers. Published balance thresholds raise the cap from 10 workers at a $100-or-higher balance to 60 workers at $900 or higher. These are account limits, not capacity guarantees.

Dormant endpoints require another check. Endpoint settings say RunPod reduces maximum workers to two after three days without requests and sets maximum workers to zero after seven days. An operator must raise the value before reuse. Test disaster-recovery endpoints instead of assuming one request will reactivate them.

## Practical RunPod cost checklist

1. **Record the product boundary.** Community or Secure Cloud, exact card variant, region, and whether a Serverless tier can substitute GPUs.
2. **Capture the dated rate.** Public values can move by more than 10%; retain the console price used for the decision.
3. **Model allocated time.** A running Pod bills until stop or termination. Flex planning must include the disputed startup boundary, execution, idle tails, retries, and parallel workers.
4. **Choose the cleanup state.** Stop preserves local volume at double the running rate and releases the GPU; termination deletes the Pod and local volume.
5. **Separate storage.** Track container, local-volume, and network-volume lifecycle independently from compute.
6. **Test scale-to-zero.** Confirm zero Active workers, the idle timeout, and the observed return-to-zero state.
7. **Reconcile one billing sample.** Use Pod-scoped billing history for Pod GPU and disk totals, and Serverless [billing history](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history) for endpoint costs.
8. **Protect the prepaid balance.** Set alerts and auto-pay headroom for peak aggregate burn plus a payment-failure window.
9. **Test reactivation.** A stopped Pod does not reserve its GPU; a dormant Serverless endpoint can also require a manual maximum-worker increase.

The [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) covers product fit beyond the rate card.

## Verdict

RunPod's cost model is coherent only after the supply and lifecycle boundaries are explicit:

- Community and Secure Cloud publish separate prices for the same 21 product labels; all 42 values were unchanged in the October 2 check.
- Secure premiums still span **9.0% to 127.3%**, or **$36 to $720** over 720 hours.
- Secure Pods can beat public Flex rates for sustained allocation, but the selected break-even points range from about **289 to 569 Flex hours**.
- Stopping a Pod releases the GPU but doubles local-volume storage to **$0.20/GB-month**, clears container disk, and does not reserve restart capacity.
- Termination deletes the Pod and local volume; network storage remains independent.
- Serverless startup billing remains contradictory across official pages, and prepaid-balance failure can stop or terminate workloads.

Start with the exact product that fits memory and topology. Then test availability, worker lifecycle, one settled billing sample, and cleanup. The cheapest headline rate is useful only if those four checks agree with the workload.

## Sources

RunPod's public rate card and the official provider documentation used in this refresh were checked **October 2, 2026**.

- [RunPod public pricing](https://www.runpod.io/pricing) — 21 Community/Secure Pod pairs, 13 Serverless Flex tiers, and storage rates; accessed October 2, page labeled updated September 27
- [RunPod Pods pricing](https://docs.runpod.io/pods/pricing) — running/stopped disk rates, compute metering, and storage granularity
- [RunPod Manage Pods](https://docs.runpod.io/pods/manage-pods) — stop, restart, zero-GPU capacity outcome, termination, and retained-data behavior
- [RunPod storage types](https://docs.runpod.io/pods/storage/types) — container, local volume, and network-volume persistence boundaries
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing) — billed phases, per-second rounding, storage, and Flex-versus-Active boundary
- [RunPod worker overview](https://docs.runpod.io/serverless/workers/overview) — worker-state billing labels and worker limits
- [RunPod endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — per-second table, idle timeout, GPU priority, and dormancy behavior
- [RunPod billing overview](https://docs.runpod.io/accounts-billing/billing) — prepaid credits, auto-pay, zero-balance behavior, and storage summary
- [RunPod Pod billing history](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history) — Pod filtering, hourly minimum bucket, and GPU/CPU/disk totals
- [RunPod network-volume billing history](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history) — volume filtering and storage totals
- [RunPod Serverless billing history](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history) — endpoint filtering and cost categories
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, sitewide dataset updated September 24, 2026
- HostFleet RunPod lifecycle evidence note — /opt/hostbot/data/ai-hosting/notes/2026-10-02-runpod-pod-stop-storage-billing-boundary.md
- HostFleet full verification ledger — /opt/hostbot/data/ai-hosting/notes/2026-09-17-gpu-pricing-full-verification.md
- Live article baseline — /opt/hostbot-v2/src/content/posts/runpod-pricing-guide-2026.md

*Need a self-managed GPU endpoint? This labeled affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Source citations above remain direct, non-affiliate links.*
