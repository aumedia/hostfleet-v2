---
title: "Modal pricing 2026: GPU rates, plan fees, and warm-container costs"
description: "Modal pricing explained with August 2026 GPU rates, Starter and Team limits, supporting-resource charges, and warm-container cost estimates."
pubDate: 2026-07-25
updatedDate: 2026-08-12
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check; estimated totals.** Modal's public rates, plan limits, and supporting-resource prices were checked on **August 12, 2026**. The monthly figures below are transparent arithmetic, not invoice predictions, capacity guarantees, or performance benchmarks.

# Modal pricing 2026: GPU rates, plan fees, and warm-container costs

Modal's pricing is easy to misread because three separate decisions land on the same bill: the workspace plan, metered compute, and how long containers remain allocated. The GPU rate may be quoted per second, but one GPU deliberately kept warm for a month is still an always-on cost.

The short version: **Modal is compelling when work is bursty and containers genuinely scale down. It is expensive when low latency requires GPU capacity to sit ready all month.** Starter's included compute is useful for testing, but it does not change that production cost shape.

This is a source-backed refresh of HostFleet's Modal pricing guide. It uses [Modal's live pricing page](https://modal.com/pricing), checked August 12, 2026, and the August 10 dataset behind [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/). It covers infrastructure billing, not model-token or subscription pricing.

> **Verified date:** August 12, 2026<br>
> **Currency:** USD public list rates<br>
> **Scope:** GPU, CPU, memory, volumes, and public workspace-plan charges

## The buying answer in one table

| Workload shape | Modal fit | Cost rule to use |
|---|---|---|
| Scheduled batch job that releases its container | Strong | Native per-second rates × total allocated seconds |
| Uneven inference API that can tolerate cold starts | Strong | Metered allocation, including startup and idle time |
| API with one GPU held warm continuously | Technically easy, financially substantial | GPU + CPU + memory × 2,592,000 seconds per 30-day month |
| Cheapest predictable always-on GPU box | Usually weak | Compare a fixed Pod or VM before committing |

Do not decide from the hourly equivalent alone. First decide whether the workload can return to zero.

## Modal GPU price table

[Modal's public rate card](https://modal.com/pricing), checked **August 12, 2026**, publishes GPU prices per second. The hourly column multiplies the native rate by 3,600; the 30-day column multiplies it by **2,592,000 seconds** (720 hours). Those two columns are estimates for comparison, not separate Modal billing units.

| GPU | VRAM | Published price | Hourly equivalent | 30-day continuously allocated estimate |
|---|---:|---:|---:|---:|
| T4 | 16 GB | $0.000164/sec | $0.59/hr | about $425 |
| L4 | 24 GB | $0.000222/sec | $0.80/hr | about $575 |
| A10 | 24 GB | $0.000306/sec | $1.10/hr | about $793 |
| L40S | 48 GB | $0.000542/sec | $1.95/hr | about $1,405 |
| A100 | 40 GB | $0.000583/sec | $2.10/hr | about $1,511 |
| A100 | 80 GB | $0.000694/sec | $2.50/hr | about $1,799 |
| RTX PRO 6000 | 96 GB | $0.000842/sec | $3.03/hr | about $2,182 |
| H100 | 80 GB | $0.001097/sec | $3.95/hr | about $2,843 |
| H200 | 141 GB | $0.001261/sec | $4.54/hr | about $3,269 |
| B200 | 180 GB | $0.001736/sec | $6.25/hr | about $4,500 |
| B300 | 288 GB | $0.001972/sec | $7.10/hr | about $5,111 |

**Estimate assumptions:** one GPU remains allocated for all 720 hours of a 30-day month; GPU charge only; no CPU, memory, volume, network, workspace-plan, tax, or support charges. The table mirrors the Modal rows in `/opt/hostbot-v2/src/data/gpu-pricing.json`, whose provider-rate inputs were fully rechecked August 10, and was rechecked directly against Modal's public page August 12.

The table is not evidence that every card is immediately available or equally fast for a workload. VRAM, region, quota, model-loading time, concurrency, and real throughput still need a prototype. For a cross-provider view that keeps Pods, VMs, scale-to-zero workers, and managed deployments separate, use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## Starter versus Team: plan price is only the first line

[Modal's plan table](https://modal.com/pricing), checked **August 12, 2026**, lists:

| Public plan | Base price | Included monthly compute | Containers | GPU concurrency |
|---|---:|---:|---:|---:|
| Starter | $0/month plus compute | $30 | 100 | 10 |
| Team | $250/month plus compute | $100 | 5,000 | 50 |

The important phrase is **plus compute**. The plan controls workspace features and limits; it does not turn the GPU table into an all-inclusive allowance.

The material August change is the Team container limit. Modal now lists **5,000 containers**, up from the previously tracked 1,000. That does not mean 5,000 simultaneous GPU workers: the same public Team row lists **50 GPU concurrency**. Container count and GPU concurrency solve different capacity questions, and neither is a guarantee of instant capacity for a particular card or region.

Treat the included compute as a credit against eligible usage, not as a lower public GPU rate. Budget from gross resource usage first, then apply the plan's current credit rules. A prototype that fits inside Starter's $30 monthly compute inclusion does not prove that a continuously warm production deployment will be inexpensive.

## GPU is not the whole compute bill

[Modal's pricing page](https://modal.com/pricing), checked **August 12, 2026**, also lists the following supporting-resource rates:

| Resource | Published price | Planning note |
|---|---:|---|
| CPU | $0.0000131 per physical core-second | The page states a 0.125-core minimum per container. |
| Memory | $0.00000222 per GiB-second | Multiply by requested GiB and allocated seconds. |
| Volumes | $0.09 per GiB-month | The page says the Volumes price includes 1 TiB/month free. |

Modal's [billing guide](https://modal.com/docs/guide/billing), checked August 12, says customers pay for resources they use or request, with no required reservations and no minimum usage-time increment. “Per second” therefore describes metering granularity; it does not mean CPU and memory disappear from a GPU function's cost.

### Example: one L4, one CPU core, and 8 GiB of memory

This estimate uses the August 12 public prices above and assumes the same resources remain allocated together:

```text
L4 GPU:                  $0.00022200/sec
1 physical CPU core:    $0.00001310/sec
8 GiB memory: 8 ×       $0.00000222/sec = $0.00001776/sec
Total allocated rate:   $0.00025286/sec
```

At **100 allocated hours**, the compute estimate is:

```text
$0.00025286 × 360,000 seconds = $91.03
```

At **720 allocated hours**, it becomes:

```text
$0.00025286 × 2,592,000 seconds = $655.41
```

These are estimated metered-compute totals before workspace-plan charges or credits, volumes, network charges outside published inclusions, taxes, and support. They assume exactly one L4, one physical core, and 8 GiB remain allocated for the stated time. Change any requested resource or allocation time and the estimate changes with it.

This is the useful comparison: 100 allocated hours cost about $91 in this configuration, while a deliberately warm month costs about $655. The savings come from releasing resources, not from calling the workload serverless.

## Warm settings are latency purchases

Modal gives operators explicit controls over how containers scale:

- `min_containers` keeps a minimum number of containers warm even when a Function is inactive.
- `buffer_containers` holds extra capacity while a Function is active.
- `scaledown_window` controls how long an idle container may remain before scaling down.

Modal's [scaling guide](https://modal.com/docs/guide/scale), checked August 12, describes these as a cost-versus-latency tradeoff: a larger warm pool or idle buffer raises cost but reduces the chance that an input waits for a new container. Its [cold-start guide](https://modal.com/docs/guide/cold-start), checked the same day, lists a default maximum idle time of **60 seconds** before shutdown.

That 60-second default is not a flat billing minimum. It is an idle window that can add allocated time after work, and operators can change it. A workload with many isolated requests may spend materially more billed time starting, loading, waiting, and scaling down than the visible inference duration suggests.

For latency-sensitive production, measure at least:

1. container startup and image initialization;
2. model-loading time;
3. request execution time;
4. idle time retained after the request;
5. retries and failed starts; and
6. the number of containers allocated in parallel.

Then price those observed allocated seconds. The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) provides a companion worksheet for 1%, 10%, and continuously warm duty cycles.

## Timeouts should shape the request path

Modal's [timeout guide](https://modal.com/docs/guide/timeouts), checked August 12, says Functions default to **300 seconds** and can be configured from **1 second to 24 hours**. That range supports substantial batch work, but it does not make a long synchronous web request good architecture.

Keep short inference on the request path. Put document processing, fine-tuning preparation, media generation, or large fan-out work behind an async job with polling, a callback, or queue status. That architecture lets work finish and capacity release instead of turning a user connection into an accidental warm-container policy.

For operational fit beyond the rate card, see [Modal for inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/).

## When Modal is the right buy

Modal is a strong starting point when all three statements are true:

- the team is comfortable deploying Python functions and containers rather than managing GPU VMs;
- demand is uneven enough that resources can spend meaningful time at zero; and
- cold-start behavior can be measured and managed without holding expensive capacity warm all month.

It is a weaker cost fit when the deployment needs one predictable GPU online continuously. In that case, compare Modal's 720-hour GPU-plus-supporting-resource estimate with a fixed Pod or VM. [RunPod's Pods-versus-Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the dedicated-capacity alternative and its operational burden.

Do not compare the two as identical products. Modal bundles a serverless execution environment and scaling controls; a Pod gives the operator more infrastructure responsibility. The right comparison includes engineering time, startup behavior, observability, storage, and shutdown discipline—not only the card name.

## Verdict

Modal's rate card is transparent. The hard part is deciding what stays allocated.

- Use **Starter** to validate intermittent jobs and the real allocation profile.
- Use the native per-second rates for estimates; hourly equivalents are only comparison aids.
- Add CPU and memory to GPU calculations instead of calling the GPU row a total bill.
- Treat `min_containers`, buffers, and longer idle windows as deliberate latency purchases.
- Recalculate against 720 hours before keeping any GPU warm continuously.

The August 12 buyer takeaway is not that Modal became cheaper: the tracked resource rates were unchanged. The meaningful correction is that Team now lists 5,000 containers, while GPU concurrency remains 50. That expands a plan limit without changing the basic economics of warm GPU capacity.

If your workload truly needs a self-managed GPU to remain online, a RunPod Pod may be the cleaner cost shape. Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.

## Sources

- [Modal pricing](https://modal.com/pricing) — workspace plans, included compute, GPU/CPU/memory/volume rates, and public plan limits; checked August 12, 2026
- [Modal billing guide](https://modal.com/docs/guide/billing) — usage/request billing and metering behavior; checked August 12, 2026
- [Modal Volumes guide](https://modal.com/docs/guide/volumes) — storage accounting and persistence behavior; checked August 12, 2026
- [Modal GPU guide](https://modal.com/docs/guide/gpu) — GPU configuration reference; checked August 12, 2026
- [Modal cold-start guide](https://modal.com/docs/guide/cold-start) — idle-window behavior and warm-container tradeoffs; checked August 12, 2026
- [Modal scaling guide](https://modal.com/docs/guide/scale) — `min_containers`, `buffer_containers`, and `scaledown_window`; checked August 12, 2026
- [Modal timeout guide](https://modal.com/docs/guide/timeouts) — default and configurable Function timeouts; checked August 12, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 10, 2026
- HostFleet full-verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-10-gpu-pricing-full-verification.md`
