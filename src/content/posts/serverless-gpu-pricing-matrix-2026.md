---
title: "Serverless GPU pricing in 2026: H100 rates, scale-to-zero, and idle tails"
description: "Eight H100 serverless and managed deployment rates compared with documented scale-to-zero behavior, idle tails, startup-billing boundaries, and complete-cost caveats."
pubDate: 2026-04-21
updatedDate: 2026-09-07
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card and lifecycle comparison; calculated costs are estimates.** All eight H100 price inputs were rechecked against official provider pages on **September 7, 2026**. Scale-to-zero, cooldown, and billing claims come from the linked provider documentation checked between August 28 and September 4. HostFleet did not benchmark cold starts, throughput, availability, or settled invoices for this update.

# Serverless GPU pricing in 2026: H100 rates, scale-to-zero, and idle tails

The selected H100 headlines run from **$2.50/hour for Koyeb** to **$0.10833/minute, or $6.4998/hour, for Baseten** as of September 7, 2026. That spread is real. It is not a clean ranking of equivalent products.

Koyeb's price includes one application instance with CPU, memory, and disk. Northflank's **$2.74/GPU-hour** is only a GPU component. Modal meters the GPU, CPU, and memory separately. Replicate and Baseten sell managed deployment surfaces. RunPod's Serverless rate applies to Flex worker time rather than an exact reserved-card VM.

The more useful comparison is what happens after traffic stops. RunPod documents a five-second default worker idle timeout. Modal's default maximum idle window is 60 seconds. Koyeb's GPU scale-to-zero preview defaults to five minutes. Baseten defaults to a 15-minute scale-down delay. Replicate says an idle Deployment remains online for “a few minutes” but does not publish a numeric default. Northflank documents manual zero, not automatic request-waking from zero.

> **Price verification:** September 7, 2026<br>
> **Currency:** public USD list rates before tax<br>
> **Planning month:** 720 billable hours<br>
> **Evidence boundary:** no inventory, quota, cold-start, throughput, or SLA claim

HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/) contains 21 providers and 147 displayed price cells, all rechecked September 7, 2026. This page narrows that dataset to eight H100 serverless, application-runtime, and managed-inference products, then adds the lifecycle rules that the raw price table cannot show.

## The short buying answer

| Workload need | Strong starting point | Why | Boundary to test |
|---|---|---|---|
| Request-waking GPU service with one bundled rate | **Koyeb** | $2.50/hour includes 15 vCPU, 180 GB RAM, and 320 GB disk; eligible GPU Services can scale to zero | Public preview; default five-minute idle tail; HTTP/2 cannot wake a sleeping Service |
| Fine control over container retention | **Modal** | Per-second GPU metering and a configurable 2-second to 20-minute maximum idle window | CPU and memory are separate; the configured window is an upper bound, not guaranteed retention |
| Very short documented default worker tail | **RunPod Serverless Flex** | Five-second default idle timeout and zero Active workers by default | Official sources conflict on initialization billing and on several per-second equivalents |
| Managed inference with explicit zero-replica request policies | **Baseten** | `min_replica: 0`, queue-or-reject behavior, and an explicit wake endpoint are documented | Fifteen-minute default delay; model loading and engine initialization are billable |
| Private deployment with configurable minimum capacity | **Replicate** | Default minimum is zero and instances scale down toward it | The idle period is only described as “a few minutes”; no numeric tail should be assumed |
| Configurable managed GPU component | **Northflank** | $2.74/GPU-hour can be combined with a chosen CPU and memory plan | Not an all-in rate; automatic zero and request wake-up are not established |

The prices in this table are from the official provider sources linked below and were checked September 7, 2026. The operational rules do not prove that the first request succeeds, how long a model takes to become ready, or whether GPU capacity is available in the required region.

## Eight selected H100 rates

Per-second prices are multiplied by 3,600 and per-minute prices by 60. The hourly equivalent is a comparison aid, not a new vendor billing unit.

| Provider and product | Native public price | Hourly equivalent | Price boundary | Official rate source and check date |
|---|---:|---:|---|---|
| **Koyeb H100 Service** | $2.50/hr | **$2.50/hr** | One H100 80 GB Instance with 15 vCPU, 180 GB RAM, and 320 GB disk | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 7, 2026 |
| **Northflank managed-cloud H100** | $2.74/GPU-hr | **$2.74/GPU-hr plus CPU and memory** | GPU component only; compute plan, persistent disk, and egress are separate | [Northflank pricing](https://northflank.com/pricing), Sept. 7, 2026 |
| **Modal H100 Function** | $0.001097/sec | **$3.9492/hr** | GPU allocation; CPU, memory, and storage add separate meters | [Modal pricing](https://modal.com/pricing), Sept. 7, 2026 |
| **Fal custom deployment** | $4.50/hr | **$4.50/hr** | Public custom-deployment list rate; committed-use figures are excluded | [Fal pricing](https://fal.ai/pricing), Sept. 7, 2026 |
| **RunPod Serverless H100 PRO** | $4.79/hr | **$4.79/hr** | Public Flex worker tier; not an exact-card reservation quote | [RunPod pricing](https://www.runpod.io/pricing), Sept. 7, 2026 |
| **Replicate private Deployment** | $0.001525/sec | **$5.49/hr** | Online managed Deployment instance, including setup and idle time | [Replicate pricing](https://replicate.com/pricing), Sept. 7, 2026 |
| **CoreWeave Inference** | $6.16/GPU-hr | **$6.16/GPU-hr** | Single-GPU inference-platform rate; account-executive access applies | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 7, 2026 |
| **Baseten Dedicated Inference** | $0.10833/min | **$6.4998/hr** | Managed deployment workload time; partial minutes round up | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 7, 2026 |

The selected public range is **$2.50 to $6.4998 per H100 hour equivalent**, based on the sources checked September 7, 2026. Koyeb is the lowest complete bundled price in this set. Northflank's nearby number cannot be ranked as a complete workload total because required CPU and memory remain unpriced until the operator selects a plan.

For bare VMs, Pods, hardware variants, and a larger provider set, use the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/). This article stays focused on application-level and managed deployment surfaces.

## Scale-to-zero and idle-cost matrix

The most dangerous phrase in this market is “pay only when used.” Providers define “used” differently. Some count startup and model load, some retain idle capacity, and some allow a permanent warm floor.

| Product | Can the checked product reach zero automatically? | Documented default after traffic | H100 planning unit | Important caveat |
|---|---|---:|---:|---|
| **RunPod Flex** | Yes, when Active workers are zero | 5-second idle timeout | **$0.006653 nominal idle tail** | Startup billing is unresolved because official docs conflict |
| **Modal Function** | Yes; zero is the default without warm minimums | 60-second maximum idle window | **$0.065820 GPU upper bound** | May terminate earlier or reuse the container; CPU and memory are extra |
| **Koyeb GPU Service** | Yes, for eligible Internet-facing Services | 5-minute idle period | **$0.2083 nominal idle tail** | Public preview; open connections prevent idleness; HTTP/2 cannot wake it |
| **Baseten Dedicated Inference** | Yes when `min_replica` is zero | 900-second scale-down delay | **$1.6250 one-replica reserve** | Per-minute rounding; multi-replica scale-down can require repeated delays |
| **Replicate Deployment** | Yes when minimum instances are zero | “A few minutes” | **$0.0915 per observed online minute** | No public numeric cooldown, so no fixed tail estimate is defensible |
| **Northflank managed GPU service** | Automatic zero is not established; manual zero is documented | 5-minute moving downscale window | **$0.2283 H100 component reserve** | Manual zero makes the service unavailable; CPU and memory are additional |
| **Fal custom deployment** | Not evaluated in this lifecycle refresh | Not evaluated | Not estimated | Price row is retained without inventing a zero-capacity behavior |
| **CoreWeave Inference** | Not evaluated in this lifecycle refresh | Not evaluated | Not estimated | Price and access boundary are retained without a cooldown claim |

Every dollar figure in this matrix is derived from the September 7 official H100 price and the linked documented interval. It excludes startup, active work, CPU, memory, storage, retries, multiple workers, credits, tax, and network charges unless the provider bundle explicitly includes the resource. None is a measured invoice.

## What the documented tails actually mean

### RunPod: five seconds is small, but startup remains unresolved

RunPod's [Serverless pricing guide](https://docs.runpod.io/serverless/pricing), checked August 30, says compute is rounded to the nearest second and describes startup, execution, and idle timeout as chargeable worker phases. Its [worker overview](https://docs.runpod.io/serverless/workers/overview), checked the same day, labels the `Initializing` state as not billed. Those statements conflict, so this comparison does not add a startup-cost estimate.

The [endpoint settings documentation](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked August 30, gives Flex endpoints a five-second default idle timeout. At the H100 Flex rate checked September 7:

    $4.79 × 5 / 3,600 = $0.0066528

That is the nominal tail after execution for one worker. It is not a complete request price. A longer operator-configured timeout, concurrent workers, initialization, execution, storage, and retries can all cost more. RunPod's official endpoint-settings per-second table also fails to reproduce several current public hourly Flex prices, so the comparison keeps **$4.79/hour** from the public rate page rather than silently substituting a conflicting conversion.

The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) documents that conflict and the Pod-versus-Flex allocation break-even in more detail.

### Modal: the idle window is tunable and billable

Modal's [scaling documentation](https://modal.com/docs/guide/scale), checked September 2, says Functions scale to zero by default when they have no inputs. `min_containers` creates a continuously warm floor. `scaledown_window` sets a maximum idle duration from two seconds through 20 minutes, with a 60-second default maximum.

At the Modal H100 price checked September 7, the GPU part of that default upper bound is:

    $0.001097 × 60 = $0.065820

This is not a mandatory one-minute charge. Modal may terminate an over-provisioned container before the maximum, or a later request may reuse it. Its [billing documentation](https://modal.com/docs/guide/billing), checked September 2, says idle GPU reservation and remaining memory occupancy can still bill. The total also needs CPU and memory.

Use the [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) when region placement, Sandbox rates, storage, and surrounding resource meters matter.

### Koyeb: GPU scale-to-zero is real, with protocol boundaries

Koyeb's [scale-to-zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked August 28, explicitly includes GPU Instances. An eligible Internet-facing Service can set its minimum to zero. The default idle period is five minutes, and a supported inbound request wakes the Service to at least one Instance.

At Koyeb's H100 price checked September 7, the nominal default post-traffic tail is:

    $2.50 × 5 / 60 = $0.2083

The feature is in public preview. No traffic, held connection, or new deployment can occur during the idle period. HTTP/2 cannot wake a sleeping Service, and gradual multi-instance downscale can add roughly one removal step per minute. The arithmetic above applies to one Instance and excludes wake time, model initialization, active work, storage, and network usage.

### Baseten: one replica waits 15 minutes; a burst can wait much longer

Baseten's [autoscaling documentation](https://docs.baseten.co/deployment/autoscaling/overview), checked September 1, sets the standard defaults at `min_replica: 0`, `max_replica: 1`, a 60-second autoscaling window, a 900-second scale-down delay, and a maximum 50% removal per step.

For one H100 replica, the September 7 public per-minute price gives this planning reserve after load falls away:

    $0.10833 × 15 = $1.62495

The value rounds to **$1.6250**. It excludes request work and billable model loading. Baseten's [billing documentation](https://docs.baseten.co/organization/billing), checked September 1, says scheduling and image pull before the workload starts are unmetered, while model loading, engine initialization, serving, and warm idle time are metered by the minute with partial minutes rounded up.

A burst to eight replicas has a different shape. With the default 50% removal cap and a fresh 15-minute delay between steps, the documented sequence is eight to four, four to two, two to one, then one to zero. That creates **225 replica-minutes** of staged delay after the first countdown begins. At the September 7 H100 rate, the derived reserve is about **$24.37**, before any delay caused by the 60-second averaging window.

The request path also matters. Baseten's [request-lifecycle documentation](https://docs.baseten.co/deployment/autoscaling/request-lifecycle), checked September 1, says Queue on full can park the first request while a replica wakes; Reject on full returns `529` until capacity is ready. This is why scale-to-zero is both a cost decision and an API behavior decision. The [Baseten pricing guide](https://hostfleet.net/baseten-pricing-guide-2026/) covers the full replica sequence and budget boundaries.

### Replicate: zero is configurable, but the cooldown is not numeric

Replicate's [Deployment configuration documentation](https://replicate.com/docs/topics/deployments/create-a-deployment), checked September 4, says Deployments can set minimum and maximum instance counts, with a platform-wide default minimum of zero. Its [billing guide](https://replicate.com/docs/topics/billing), checked September 4, says instances are charged for every second they are online, including model setup, predictions, and idle time.

Replicate says an idle instance stays online for “a few minutes” before shutdown. It does not publish the number or expose a setting for it in the checked public documentation. At the H100 price checked September 7, each observed online minute costs:

    $0.001525 × 60 = $0.0915

Do not multiply that by an assumed three-, five-, or ten-minute cooldown. Measure instance reuse and reconcile it with isolated billing. Prediction `metrics.predict_time` is not a billing timer because it excludes queue wait and does not cover setup or post-request idle time. The [Replicate pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/) explains the deployment and failure-cost boundary.

### Northflank: a five-minute downscale window is not request-waking zero

Northflank bills its H100 GPU component by the second once provisioned. The **$2.74/GPU-hour** price checked September 7 excludes the separately chosen CPU and memory plan, persistent disk, and egress.

Its [autoscaling documentation](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md), checked August 31, describes 15-second evaluations and a five-minute moving window for downscale decisions. Its [manual scaling documentation](https://northflank.com/docs/v1/application/scale/scale-instances.md), checked the same day, allows zero instances but says the service is unavailable at zero. The public docs do not establish that autoscaling accepts zero as its minimum or that a request wakes a zero-instance service.

Five minutes of the H100 GPU component is:

    $2.74 × 5 / 60 = $0.2283

Treat that as a conservative component reserve for one excess instance during the documented downscale window, not as a proven billable tail. CPU, memory, evaluation alignment, container termination, and the exact billing cutoff remain outside the calculation.

## Eight hours versus one warm planning month

The next table isolates continuous billable allocation. The short column assumes exactly eight billable hours. The month column assumes one listed product stays billable for **720 hours**, the length of a 30-day planning month. It is not a prediction for a service that reliably returns to zero.

| Product | Eight billable hours | 720 billable hours | Important exclusion |
|---|---:|---:|---|
| Koyeb H100 Service | **$20.00** | **$1,800.00** | Availability, tax, overages, and separate services |
| Northflank H100 component | **$21.92** | **$1,972.80** | CPU, memory, persistent disk, and egress |
| Modal H100 Function | **$31.59** | **$2,843.42** | CPU, memory, storage, and other meters |
| Fal H100 custom deployment | **$36.00** | **$3,240.00** | Other product charges and commitment terms |
| RunPod Serverless H100 PRO | **$38.32** | **$3,448.80** | Startup ambiguity, storage, and worker lifecycle |
| Replicate private H100 Deployment | **$43.92** | **$3,952.80** | Setup, idle duration, and other managed-product charges |
| CoreWeave Inference H100 | **$49.28** | **$4,435.20** | Eligibility and surrounding platform costs |
| Baseten H100 deployment | **$52.00** | **$4,679.86** | Model load, partial-minute rounding, and other workloads |

These are arithmetic estimates from the official rates checked September 7, 2026. Modal uses `$0.001097 × 3,600 × hours`; Baseten uses `$0.10833 × 60 × hours`; Replicate uses `$0.001525 × 3,600 × hours`; the other rows multiply the public hourly value. Totals are rounded to cents only after calculation.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) is the better next step once you know billable duration. Request latency is not billable duration: add startup where charged, model load, execution, retry work, the idle tail, and any retained warm floor.

## A deployment test that does not produce benchmark theater

Before choosing a platform from the table, run one bounded smoke gate:

1. **Pin the workload.** Record image digest, model revision, GPU class, region, runtime, concurrency, and autoscaling configuration.
2. **Start at one worker.** Set the minimum to zero only where documented, cap the maximum at one, and disable unrelated traffic.
3. **Separate timestamps.** Capture client send/receive, container start, model-load start/end, handler readiness, request work, and worker termination.
4. **Prove zero.** Use provider state or telemetry rather than assuming that an elapsed timeout means the GPU was released.
5. **Reconcile billing.** Compare the narrowest provider usage record with the lifecycle log after charges settle. Stop if traffic cannot be isolated.
6. **Repeat only after attribution works.** Five valid trials can show a range; they cannot justify p95 or p99 claims.
7. **Destroy retained resources.** Check volumes, disks, replicas, and deployment minimums after the test.

Label observed timings and charges **measured**, official rules **sourced**, arithmetic **derived**, and any missing billing phase **unverified**. A cold-start result belongs to the pinned image, model, account, region, and date—not to an entire provider forever.

## Selection checklist

Choose in this order:

1. **Hardware fit:** GPU model, VRAM, topology, count, and regional availability.
2. **Product shape:** bundled Service, configurable Function, worker endpoint, managed Deployment, or GPU component.
3. **Complete price:** GPU, CPU, memory, storage, network, IP, and platform fees.
4. **Zero-capacity behavior:** automatic, manual, unavailable at zero, or not established.
5. **First-request behavior:** queued, rejected, retried, or protocol-limited while waking.
6. **Billable lifecycle:** initialization, model load, active work, idle window, staged downscale, and teardown.
7. **Operational evidence:** isolated usage records, lifecycle logs, and cleanup confirmation.

Apply promotional credit only after the base workload is understood. The [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) separates exact public offers from access, quota, and recurring cost.

## Verdict

**Koyeb has the lowest complete bundled H100 headline in this selected comparison at $2.50/hour**, checked September 7, 2026. Its GPU scale-to-zero path is documented, but it carries a five-minute default idle period, public-preview status, and protocol restrictions.

**RunPod has the shortest documented default tail here at five seconds**, but its official sources still conflict on initialization billing. **Modal offers the widest useful retention control**, from a two-second minimum maximum-idle setting through 20 minutes, with a 60-second default. **Baseten exposes the clearest managed zero-replica request policies**, while its 15-minute default delay and staged multi-replica removal can create a substantial warm tail.

**Replicate can return Deployments toward a zero minimum, but its public cooldown is not numeric. Northflank's manual zero is not request-waking serverless, and its $2.74 figure is not an all-in workload price.** Fal and CoreWeave remain in the price comparison without unsupported lifecycle assumptions.

The defensible buying order is product fit, complete rate, wake behavior, billable lifecycle, and then measured workload evidence. The lowest hourly number matters only after the endpoint can actually become ready, serve correctly, and stop charging in the way the forecast assumes.

## Sources

Rate pages below were rechecked September 7, 2026. Lifecycle dates identify the bounded evidence check used for each claim.

- [Koyeb pricing](https://www.koyeb.com/pricing) — H100 rate and included resources; rechecked September 7, 2026
- [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) and [autoscaling](https://www.koyeb.com/docs/run-and-scale/autoscaling) — GPU eligibility, preview status, idle conditions, request wake-up, protocols, and gradual downscale; checked August 28, 2026
- [Northflank pricing](https://northflank.com/pricing) and [managed GPU documentation](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md) — H100 component price, required compute plan, per-second billing, storage, egress, and regional boundary; rate rechecked September 7, lifecycle checked August 31, 2026
- [Northflank autoscaling](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) and [manual scaling](https://northflank.com/docs/v1/application/scale/scale-instances.md) — downscale window, evaluation cadence, manual zero, and unavailable-at-zero boundary; checked August 31, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate and separate resource meters; rechecked September 7, 2026
- [Modal scaling](https://modal.com/docs/guide/scale) and [billing](https://modal.com/docs/guide/billing) — default zero, warm floors, idle-window range, early termination caveat, and billable idle resources; checked September 2, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment list rate and commitment boundary; rechecked September 7, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — H100 PRO Flex hourly rate; rechecked September 7, 2026
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing), [worker overview](https://docs.runpod.io/serverless/workers/overview), and [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — per-second rounding, conflicting initialization labels, worker types, zero defaults, and idle timeout; checked August 30, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 Deployment rate; rechecked September 7, 2026
- [Replicate billing](https://replicate.com/docs/topics/billing) and [Deployment configuration](https://replicate.com/docs/topics/deployments/create-a-deployment) — online-instance billing, setup and idle scope, configurable minimums, and nonnumeric idle period; checked September 4, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — H100 inference rate and access boundary; rechecked September 7, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 per-minute rate; rechecked September 7, 2026
- [Baseten autoscaling](https://docs.baseten.co/deployment/autoscaling/overview), [request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle), and [billing](https://docs.baseten.co/organization/billing) — defaults, staged downscale, zero-replica request policies, metered phases, and rounding; checked September 1, 2026
- HostFleet live dataset: `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated September 7, 2026
- HostFleet evidence notes: `/opt/hostbot/data/ai-hosting/notes/2026-09-07-gpu-pricing-full-verification.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-28-koyeb-gpu-scale-to-zero-limits.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-30-runpod-serverless-billing-boundary.md`, `/opt/hostbot/data/ai-hosting/notes/2026-08-31-northflank-gpu-autoscaling-billing-boundary.md`, `/opt/hostbot/data/ai-hosting/notes/2026-09-01-baseten-autoscaling-billing-boundary.md`, `/opt/hostbot/data/ai-hosting/notes/2026-09-02-modal-scale-to-zero-billing-boundary.md`, and `/opt/hostbot/data/ai-hosting/notes/2026-09-04-replicate-deployment-idle-cost-boundary.md`

*Need an allocated GPU Pod after testing the serverless lifecycle? This is a labeled affiliate link; source citations above remain direct. [RunPod signup (affiliate)](https://hostfleet.net/go/runpod) supports HostFleet at no extra cost to you. Re-check the exact GPU, cloud tier, region, storage, and current price before purchase.*
