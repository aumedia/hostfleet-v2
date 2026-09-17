---
title: "RunPod pricing 2026: 42 Pod prices, 13 Serverless tiers, and break-even math"
description: "RunPod pricing checked September 2026: all 42 Pod prices, Secure-vs-Community premiums, 13 Flex tiers, break-even math, storage, and billing caveats."
pubDate: 2026-07-24
updatedDate: 2026-09-17
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed pricing refresh with derived estimates.** RunPod's public rate card and billing documentation were checked on **September 17, 2026**. HostFleet did not benchmark performance, inspect an invoice, test inventory, or verify capacity in any region. Dollar differences, 720-hour totals, percentages, and break-even points below are arithmetic estimates from the cited public rates.

> **Rates verified:** September 17, 2026<br>
> **Billing and lifecycle rules verified:** September 17, 2026<br>
> **Dataset boundary:** HostFleet's complete 21-provider, 148-cell [GPU pricing dataset](https://hostfleet.net/gpu-pricing/) was source-checked September 17<br>
> **Estimate convention:** one GPU, public USD list rates before tax, and 720 hours for a 30-day planning month

# RunPod pricing 2026: 42 Pod prices, 13 Serverless tiers, and break-even math

RunPod publishes **21 Pod products with separate Community Cloud and Secure Cloud prices: 42 Pod price points**. It also publishes **13 Serverless Flex tiers**. The lowest number is not automatically the right comparison because Pods, Flex workers, and retained storage stop billing at different times.

The September 17 full-dataset audit moved three tracked Secure Cloud cells by more than 10% against HostFleet's September 10 dataset snapshot: A40 from **$0.44 to $0.49/hour**, L40S from **$0.99 to $1.09/hour**, and A100 80 GB from **$1.39 to $1.59/hour**. The live RunPod guide had already adopted those vendor-page rates on September 9, so this refresh reconciles the sitewide dataset rather than pretending RunPod changed the same rates twice.

The more useful buyer question is what Secure Cloud costs above the like-named Community row. On the September 17 public table, that spread ranges from **$0.05/hour for L4** to **$1.00/hour for H200**. As a percentage of the Community rate, it ranges from **9.0% for the 48 GB Pro 6000 MIG** to **127.3% for RTX 3090**. Those spreads are price differences, not proof that both supply pools have equal availability, host hardware, location, or performance.

## The buying answer

| Workload | RunPod surface to test first | Cost boundary |
|---|---|---|
| Sustained job where you can manage the container | Pod | Pay until the Pod is released; compare Community and Secure availability separately |
| Bursty endpoint with real idle gaps | Serverless Flex | Count initialization uncertainty, execution, idle timeout, retries, and parallel workers |
| Low-latency endpoint that must stay warm | Active Serverless or Pod | Active pricing is sales-negotiated; compare the actual quote with Pod allocation |
| Checkpoints or weights that must survive compute deletion | Network volume | Storage keeps billing independently of compute |
| Cheapest possible listed Pod rate | Community Cloud | Treat availability and configuration as separate acceptance tests |

Community Cloud is not simply Secure Cloud with a discount coupon. RunPod presents them as separate supply surfaces. Record which one was selected in every estimate and verify the exact console configuration before reserving money or capacity.

## Every public Pod price and the Secure Cloud premium

[RunPod's public pricing page](https://www.runpod.io/pricing), checked **September 17, 2026**, exposed the 21 Community/Secure pairs below. The hourly premium is Secure minus Community. The 720-hour premium multiplies that difference by 720; it is not a RunPod quote.

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

This table exposes why a percentage-only comparison can mislead. The RTX 3090 Secure row is 127.3% above Community, but its 720-hour dollar spread is $201.60. H200's percentage spread is only 27.9%, but the same planning month adds $720. Budget the absolute difference, then decide whether the available Secure configuration is worth it.

Card memory, PCIe versus SXM or NVL, host resources, and measured throughput can dominate a small hourly difference. Use the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) when the accelerator and provider boundary matter more than RunPod's product labels.

## Every public Serverless Flex tier

The same [RunPod pricing page](https://www.runpod.io/pricing), checked **September 17, 2026**, published these Flex rates:

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

All input rates come from [RunPod's public pricing page](https://www.runpod.io/pricing), checked **September 17, 2026**. Results are derived estimates.

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

RunPod's [Serverless pricing guide](https://docs.runpod.io/serverless/pricing), checked **September 17, 2026**, says billing starts when a worker starts and ends when it fully stops, rounded up to the nearest second. It includes container initialization and model loading, request execution, and the idle timeout.

RunPod's [worker overview](https://docs.runpod.io/serverless/workers/overview), checked the same day, labels the Initializing state—image download, code load, and cached-model download—as not billed, while Running is billed.

Those pages do not establish one unambiguous startup boundary. This guide therefore labels startup billing as a **conflict between official sources**. It does not call cold starts free and does not invent a startup charge. Check the console rate and reconcile one isolated worker lifecycle against billing history before projecting traffic.

The public hourly table and [endpoint-settings documentation](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), also checked September 17, disagree on several rates. For example, the documentation's H100 Pro figure of $0.00116/second converts to $4.176/hour, while the public Flex table says $4.79/hour. The L40/L40S/6000 Ada documentation figure of $0.00053/second converts to $1.908/hour, while the public table says $1.75/hour.

Because the Serverless pricing guide sends buyers to the public pricing page for compute rates, the tables above use the public Flex rates. Confirm the rate displayed for the exact endpoint before launch.

## Idle tails are small once and material at volume

RunPod's [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked **September 17, 2026**, list zero Active workers, three maximum workers, one GPU per worker, and a five-second idle timeout as defaults. The worker stays billable during the idle timeout.

Using the public September 17 Flex rates:

| Flex tier | One five-second tail | 1,440 isolated tails |
|---|---:|---:|
| L4 class at $0.69/hr | $0.000958 | $1.38 |
| A100 at $2.72/hr | $0.003778 | $5.44 |
| H100 Pro at $4.79/hr | $0.006653 | $9.58 |
| B300 at $9.98/hr | $0.013861 | $19.96 |

**Estimate assumptions:** hourly rate × 5 ÷ 3,600; the 1,440-tail case assumes one isolated tail each minute for 24 hours with no overlap. It excludes initialization, execution, retries, storage, concurrency, and discounts. Requests that reuse a running worker can share a tail.

A longer timeout can reduce cold starts but increases warm idle cost. A shorter timeout cuts idle spend while potentially increasing startup frequency and latency. Measure both sides on the real endpoint.

## Storage has its own lifecycle

RunPod's [Pods pricing documentation](https://docs.runpod.io/pods/pricing), checked **September 17, 2026**, publishes:

| Storage type | Running Pod | Stopped Pod | Lifecycle boundary |
|---|---:|---:|---|
| Container disk | $0.10/GB-month | Not charged | Temporary; erased when the Pod stops |
| Volume disk | $0.10/GB-month | $0.20/GB-month | Persistent until the Pod is deleted |
| Network volume below 1 TB | $0.07/GB-month | $0.07/GB-month | Portable; billed hourly |
| Network volume above 1 TB | $0.05/GB-month | $0.05/GB-month | Lower public rate above the threshold |

At those public rates, retaining 100 GB for one month is an estimated **$10** for running volume disk, **$20** for stopped volume disk, or **$7** for a sub-1-TB network volume. Those estimates multiply listed capacity rates by 100 GB and exclude tax or discounts.

Container and volume disks bill per second; network volumes bill hourly. The Serverless guide lists container disk at approximately $0.10/GB-month in five-minute intervals. Returning compute to zero does not make retained storage free.

## Prepaid credit is an uptime dependency

RunPod's [billing overview](https://docs.runpod.io/accounts-billing/billing), checked **September 17, 2026**, documents prepaid credits, a minimum balance equal to one hour of the selected Pod configuration before deployment, a default account-wide spend limit of **$80/hour**, billing deductions every five minutes, and auto-pay attempts limited to once per hour.

At zero balance, Pods with a network volume stop; Pods without one terminate and their data cannot be recovered. Network-volume storage can continue charging after compute stops. If a zero balance persists, RunPod says the unfunded volume may eventually terminate.

Serverless capacity has separate account limits. The worker overview lists a default combined cap of five Flex and Active workers. Published balance thresholds raise the cap from 10 workers at a $100-or-higher balance to 60 workers at $900 or higher. These are account limits, not capacity guarantees.

Dormant endpoints require another check. Endpoint settings say RunPod reduces maximum workers to two after three days without requests and sets maximum workers to zero after seven days. An operator must raise the value before reuse. Test disaster-recovery endpoints instead of assuming one request will reactivate them.

## Practical RunPod cost checklist

1. **Record the product boundary.** Community or Secure Cloud, exact card variant, region, and whether a Serverless tier can substitute GPUs.
2. **Capture the dated rate.** Public values can move by more than 10%; retain the console price used for the decision.
3. **Model allocated time.** Pods bill until release. Flex planning must include the disputed startup boundary, execution, idle tails, retries, and parallel workers.
4. **Separate storage.** Track container, volume, and network-volume lifecycle independently from compute.
5. **Test scale-to-zero.** Confirm zero Active workers, the idle timeout, and the observed return-to-zero state.
6. **Reconcile one billing sample.** RunPod's [API v2 billing history](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history) can filter one endpoint and separate GPU, CPU, disk, platform-fee, and total amounts by time bucket.
7. **Protect the prepaid balance.** Set alerts and auto-pay headroom for peak aggregate burn plus a payment-failure window.
8. **Test reactivation.** Check maximum workers before relying on a dormant endpoint.

The [RunPod deployment review](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) covers product fit beyond the rate card.

## Verdict

RunPod's cost model is coherent only after the supply and lifecycle boundaries are explicit:

- Community and Secure Cloud publish separate prices for the same 21 product labels.
- Secure premiums vary widely: the September 17 table spans **9.0% to 127.3%**, or **$36 to $720** over 720 hours.
- Secure Pods can beat public Flex rates for sustained allocation, but the selected break-even points range from about **289 to 569 Flex hours**.
- Serverless startup billing remains contradictory across official pages.
- Storage and prepaid balance failures can outlive or terminate compute in ways the GPU rate does not show.

Start with the exact product that fits memory and topology. Then test availability, worker lifecycle, one settled billing sample, and cleanup. The cheapest headline rate is useful only if those four checks agree with the workload.

## Sources

Official provider sources were checked **September 17, 2026**.

- [RunPod public pricing](https://www.runpod.io/pricing) — 21 Community/Secure Pod pairs and 13 Serverless Flex tiers
- [RunPod Pods pricing](https://docs.runpod.io/pods/pricing) — compute billing, storage rates, minimum balance, and spend-limit boundary
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing) — billed phases, per-second rounding, storage, and Flex-versus-Active boundary
- [RunPod worker overview](https://docs.runpod.io/serverless/workers/overview) — worker-state labels and worker limits
- [RunPod endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — per-second table, idle timeout, GPU priority, and dormancy behavior
- [RunPod billing overview](https://docs.runpod.io/accounts-billing/billing) — prepaid credits, auto-pay, zero-balance behavior, and storage summary
- [RunPod API v2 billing history](https://docs.runpod.io/api-reference-v2/billing/get-serverless-billing-history) — endpoint filtering and cost categories
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, fully source-checked September 17, 2026
- HostFleet full verification ledger — /opt/hostbot/data/ai-hosting/notes/2026-09-17-gpu-pricing-full-verification.md
- Live article baseline — /opt/hostbot-v2/src/content/posts/runpod-pricing-guide-2026.md

*Need a self-managed GPU endpoint? This labeled affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Source citations above remain direct, non-affiliate links.*
