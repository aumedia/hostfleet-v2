---
title: "Serverless GPU pricing 2026: H100 rates and what scale-to-zero actually bills"
description: "Source-checked H100 rates and idle-tail rules, now with Cloud Run GPU instance billing and an explicit unpriced scale-to-zero boundary."
pubDate: 2026-04-21
updatedDate: 2026-10-04
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

> **Cloud Run GPU lifecycle verified:** October 4, 2026<br>
> **H100 rates verified:** September 24, 2026; these eight rates were not rechecked in this update<br>
> **Salad lifecycle and RTX 4090 rate verified:** September 26, 2026<br>
> **Evidence mode:** Official-source comparison with transparent arithmetic. HostFleet did not benchmark cold starts, throughput, capacity, reliability, or settled invoices.

# Serverless GPU pricing in 2026: H100 rates and what scale-to-zero actually bills

Serverless GPU pricing is not just an hourly-rate comparison. A service can advertise scale-to-zero and still bill for model loading, idle retention, or staged scale-down after the request has finished. This is an official-source comparison, not a measured cold-start or invoice benchmark. The new Cloud Run GPU section was checked October 4, 2026; the eight H100 prices below remain a separately dated September 24 snapshot and should be rechecked before buying.

The selected H100 headlines currently run from **$2.50/hour for Koyeb** to **$0.10833/minute, or $6.4998/hour, for Baseten**. Those official rates were checked September 24, 2026. They are not equivalent products: Koyeb bundles an application instance, Northflank publishes a GPU component, Modal meters surrounding CPU and memory separately, and Baseten and Replicate sell managed deployment capacity.

The earlier Salad boundary remains important: its Container Engine distinguishes unbilled platform preparation from billable running-to-ready time. Salad's public RTX 4090 price remains **from $0.16/GPU-hour**, checked September 26. Allocation and image download are unbilled, but billing starts when the container enters `running`. Salad's lifecycle documentation says model download, model load, and warmup can continue after that transition. “Cold start is free” is therefore too broad: platform provisioning can be free while running-to-ready initialization is billable.

HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) contains the complete 21-provider, 147-cell dataset verified September 24. This page narrows that dataset to application-level H100 products, then compares the lifecycle rules that determine whether scale-to-zero actually lowers the bill.

Before choosing an H100, confirm that 80 GB is appropriate for the weights, quantization, runtime overhead, KV cache, context, and concurrency. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) is the sizing step; this page starts after the hardware requirement is known.

## The short buying answer

| Need | Strong starting point | Why | Boundary to test |
|---|---|---|---|
| Lowest complete H100 headline in this set | **Koyeb** | $2.50/hour includes one H100, 15 vCPU, 180 GB RAM, and 320 GB disk | Five-minute default idle period; public-preview and protocol restrictions |
| Shortest documented default worker tail | **RunPod Serverless Flex** | Five-second default idle timeout | Official docs still conflict on initialization billing |
| Tunable idle retention | **Modal** | Maximum idle window is configurable from two seconds to 20 minutes | GPU, CPU, and memory can remain billable during retention |
| Explicit managed zero-replica request policy | **Baseten** | Queue-or-reject behavior and a wake endpoint are documented | Fifteen-minute default scale-down delay and per-minute rounding |
| Private managed deployment with a zero minimum | **Replicate** | Default minimum is zero | Idle shutdown is only described as “a few minutes” |
| Retryable work that fits a consumer GPU | **Salad Lowest** | RTX 4090 starts at $0.16/GPU-hour with included vCPU and RAM | No H100; most interruptible tier; running-to-ready initialization is billable |

The recommendation depends on product shape, not just the smallest number. Koyeb is the lowest complete H100 bundle in this selected set. Northflank's nearby number is not a complete workload total because required CPU and memory are separate. Salad is much cheaper only because it is a different accelerator and interruption model. Cloud Run is also outside this H100 ranking: its current GPU choices are L4 and RTX PRO 6000 Blackwell, and this update does not claim a verified region-specific dollar rate for either.

## Eight selected H100 rates

Per-second prices are multiplied by 3,600 and per-minute prices by 60. The hourly equivalent is a comparison aid, not a replacement for the provider's native billing unit.

| Provider and product | Native public rate | Hourly equivalent | Product boundary | Official source and check date |
|---|---:|---:|---|---|
| **Koyeb H100 Service** | $2.50/hr | **$2.50/hr** | One H100 80 GB instance with 15 vCPU, 180 GB RAM, and 320 GB disk | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 24, 2026 |
| **Northflank managed-cloud H100** | $2.74/GPU-hr | **$2.74/GPU-hr plus CPU and memory** | GPU component only; compute plan, disk, and egress are separate | [Northflank pricing](https://northflank.com/pricing), Sept. 24, 2026 |
| **Modal H100 Function** | $0.001097/sec | **$3.9492/hr** | GPU allocation; CPU, memory, and storage use separate meters | [Modal pricing](https://modal.com/pricing), Sept. 24, 2026 |
| **Fal custom deployment** | $4.50/hr | **$4.50/hr** | Public custom-deployment list rate; commitments excluded | [Fal pricing](https://fal.ai/pricing), Sept. 24, 2026 |
| **RunPod Serverless H100 PRO** | $4.79/hr | **$4.79/hr** | Flex worker price, not an exact-card VM reservation | [RunPod pricing](https://www.runpod.io/pricing), Sept. 24, 2026 |
| **Replicate private Deployment** | $0.001525/sec | **$5.49/hr** | Online managed Deployment instance, including setup and idle time | [Replicate pricing](https://replicate.com/pricing), Sept. 24, 2026 |
| **CoreWeave Inference** | $6.16/GPU-hr | **$6.16/GPU-hr** | Single-GPU inference-platform rate; account access applies | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 24, 2026 |
| **Baseten Dedicated Inference** | $0.10833/min | **$6.4998/hr** | Managed workload time; partial minutes round up | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 24, 2026 |

The range is **$2.50 to $6.4998 per H100 hour equivalent**, based on the official sources checked September 24. Host resources, management layer, access model, scaling policy, and included storage differ. The [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) is the broader comparison for VMs, Pods, hardware variants, and more providers.

## What one continuously billable month costs

The following sensitivity case assumes exactly one listed product remains billable for 720 hours. It is not a forecast for a service that reliably reaches zero.

| Product | Rate verified Sept. 24, 2026 | 720-hour estimate |
|---|---:|---:|
| Koyeb H100 Service | $2.50/hr | **$1,800.00** |
| Northflank H100 component | $2.74/GPU-hr | **$1,972.80 plus CPU and memory** |
| Modal H100 Function | $0.001097/sec | **$2,843.42 plus CPU and memory** |
| Fal H100 custom deployment | $4.50/hr | **$3,240.00** |
| RunPod Serverless H100 PRO | $4.79/hr | **$3,448.80** |
| Replicate private H100 Deployment | $0.001525/sec | **$3,952.80** |
| CoreWeave Inference H100 | $6.16/GPU-hr | **$4,435.20** |
| Baseten H100 deployment | $0.10833/min | **$4,679.86** |

Each estimate is the September 24 official rate multiplied by 720 hours, with conversion performed before rounding. Tax, commitments, credits, extra replicas, retries, storage, networking, and surrounding resource meters are excluded unless the product bundle explicitly includes them. Replace 720 with observed billable duration in the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/).

## Scale-to-zero and idle-cost matrix

The useful question is not whether a product can display zero replicas. It is which phases remain billable before and after useful inference.

| Product | Can the checked product reach zero automatically? | Documented default after traffic | Derived one-GPU reserve | Main caveat |
|---|---|---:|---:|---|
| **RunPod Flex** | Yes, with zero Active workers | 5-second idle timeout | **$0.006653** at the Sept. 24 H100 rate | Startup billing remains unresolved because official docs conflict |
| **Modal Function** | Yes; zero is default without warm minimums | 60-second maximum idle window | **$0.065820 GPU upper bound** at the Sept. 24 rate | CPU and memory are separate; the window is a maximum, not guaranteed retention |
| **Koyeb GPU Service** | Yes for eligible Internet-facing Services | 5-minute idle period | **$0.2083** at the Sept. 24 H100 rate | Public preview; open connections and HTTP/2 affect sleep or wake behavior |
| **Baseten Dedicated Inference** | Yes when `min_replica` is zero | 900-second scale-down delay | **$1.6250** at the Sept. 24 H100 rate | Model load and engine initialization bill; removal can be staged |
| **Replicate Deployment** | Yes when minimum instances are zero | “A few minutes” | **$0.0915 per observed online minute** at the Sept. 24 H100 rate | No numeric public cooldown, so no fixed tail total is defensible |
| **Northflank managed GPU service** | Automatic zero is not established; manual zero is documented | 5-minute moving downscale window | **$0.2283 H100 component reserve** at the Sept. 24 rate | CPU and memory are additional; zero makes the service unavailable |
| **Fal custom deployment** | Yes with the documented zero default | 60-second idle window plus up to 5 seconds termination grace | **$0.08125** if both intervals are fully consumed at the Sept. 24 H100 rate | SETUP, IDLE, RUNNING, DRAINING, and TERMINATING bill |
| **CoreWeave Inference** | Not evaluated in this lifecycle refresh | Not evaluated | Not estimated | The price row is retained without inventing a zero-capacity policy |
| **Cloud Run GPU service (L4 or RTX PRO 6000)** | Yes with `min=0`; request-driven wake | No fixed default quoted; at most 15 minutes idle after a request without a minimum | **Up to 900 billed post-request instance-seconds** as a bound, not a dollar quote | GPU, CPU and memory bill for the instance lifecycle; GPU sticker price alone is incomplete |

These are arithmetic planning values, not measured charges. RunPod lifecycle docs were checked August 30; Koyeb August 28; Northflank August 31; Baseten September 1; Modal September 2; Replicate September 4; and Fal September 8. The H100 rates used in every calculation were rechecked September 24.

## Salad: “unbilled cold start” ends before the model is ready

Salad belongs in a serverless GPU buying comparison, but not in the H100 ranking. The [public pricing page](https://salad.com/pricing/), checked September 26, lists an RTX 4090 from **$0.16/GPU-hour**, includes the displayed vCPU and RAM, and labels Lowest as the most interruptible priority. Salad did not expose an H100 row in the checked table.

The lifecycle is more useful than the headline:

1. **`allocating`: unbilled.** The platform is finding a node.
2. **`downloading`: unbilled.** The container image is being transferred.
3. **`creating`: unbilled under the checked billing language.** The container has not entered the billable running state.
4. **`running`: billable per second.** The container has started, but the model may still need to download, load into VRAM, and warm up.
5. **`ready`: work can be routed after the readiness probe passes.** Time from `running` to `ready` belongs inside the billable interval.

At the September 26 public from-price, one observed running second has a nominal list-price value of:

    $0.16 / 3,600 = $0.00004444

That is a derived estimate, not a settled invoice. Salad's [general billing documentation](https://docs.salad.com/general/explanation/billing) exposes project-level usage graphs, not a promised per-instance per-second billing ledger. The defensible experiment is therefore to reconstruct `running` intervals from instance state and system events, then reconcile the project usage total in an isolated project.

Salad's Job Queue autoscaler supports minimum replicas of zero, maximum replicas from one to 500 subject to quota, a desired queue length from one to 100, and a control period from 15 to 1,800 seconds. Those are configuration ranges, not startup-speed claims. A first queued job can wait through allocation, image transfer, container creation, model initialization, and readiness before work begins.

Retries also matter. Salad documents up to three retries after the first attempt, and node interruptions count as failures. A cheap, interruptible worker can therefore perform more than one billable attempt for one logical job. Use an idempotency key and record every job event rather than treating one client submission as one execution.

## Cloud Run GPU: zero minimum is not request-only billing

**Checked October 4, 2026 against official Google documentation.** This row is deliberately outside the H100 price ranking. Cloud Run offers one NVIDIA L4 with 24 GB VRAM or one NVIDIA RTX PRO 6000 Blackwell with 96 GB VRAM per instance. Google's [GPU configuration guide](https://docs.cloud.google.com/run/docs/configuring/services/gpu) says GPU services must use **instance-based billing**. GPU, CPU and memory can therefore accrue while the instance starts, serves, sits idle and shuts down; there is no per-request GPU fee. A minimum instance is billed at the full instance rate while idle.

Set `min=0` if the workload tolerates waking from zero and you want to avoid a standing one-instance floor. That does **not** mean each request is charged only for inference seconds. Google's [billing-settings documentation](https://docs.cloud.google.com/run/docs/configuring/billing-settings) says an instance without a minimum never stays idle more than 15 minutes after processing a request. Treat **900 seconds as a documented upper bound** for one otherwise idle instance's post-request dwell, not as a guaranteed cooldown or an observed bill. Startup and shutdown are outside that post-request bound. Subsequent traffic, multiple instances or a configured minimum change the total.

The cost model is straightforward but cannot yet be filled with a defensible dollar number here:

`billable instance-seconds × (GPU rate per second + configured vCPU count × vCPU rate per second + configured GiB × memory rate per GiB-second)`, plus any separately billed items. Select the GPU rate for the actual redundancy mode.

Check the exact region, GPU, CPU and RAM configuration in [Google's Cloud Run pricing](https://cloud.google.com/run/pricing) before doing the arithmetic. GPU zonal redundancy is enabled by default for new services and carries a different GPU rate; disabling it changes failover guarantees, so do not treat the cheaper mode as an identical product. This October 4 source check did **not** extract a verified region/SKU/redundancy-specific rate from the public pricing table. Cloud Run is therefore unpriced in this comparison; no monthly floor or tail-dollar estimate is implied.

For capacity planning, Google's [GPU best practices](https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices) say GPU utilization is **not** an autoscaling input. Set concurrency for the serving engine rather than assuming an overloaded GPU automatically adds instances. Record instance time, startup and request latency, and GPU metrics from [Cloud Run monitoring](https://docs.cloud.google.com/run/docs/monitoring); reconcile them to a billing export before presenting a measured cost or cold-start figure. Google's instance-start statement is not a model-ready latency guarantee: image and model loading and readiness still matter.

**Decision:** Cloud Run is worth testing if a request-driven service, managed autoscaling and zero minimum fit the workload. If the purchase hinges on a price comparison, first capture the official price for the exact region, GPU, CPU, RAM and redundancy configuration. If it hinges on a latency SLO, test model readiness and the variable idle tail in an isolated project; this article supplies neither a benchmark nor an invoice result.

## Provider lifecycle notes

### RunPod: a five-second tail, with initialization still unresolved

RunPod's [Serverless pricing guide](https://docs.runpod.io/serverless/pricing), checked August 30, describes startup, execution, and idle timeout as chargeable phases. Its [worker overview](https://docs.runpod.io/serverless/workers/overview), checked the same day, labels `Initializing` as not billed. Because those official sources conflict, this guide does not price startup.

The [endpoint configuration docs](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), checked August 30, give Flex endpoints a five-second default idle timeout. At the September 24 H100 Flex rate, the nominal one-worker tail is `$4.79 × 5 / 3,600 = $0.0066528`. Longer configured retention, parallel workers, retries, execution, and storage add cost. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers Pods versus Serverless and the source conflict in detail.

### Modal: scale-to-zero is default, but retained resources bill

Modal's [scaling docs](https://modal.com/docs/guide/scale), checked September 2, say Functions scale to zero by default when they have no inputs. `min_containers` creates a warm floor. `scaledown_window` is configurable from two seconds to 20 minutes, with a 60-second default maximum.

At the September 24 H100 rate, the GPU portion of that default upper bound is `$0.001097 × 60 = $0.065820`. Modal may terminate earlier or reuse the container. Its [billing docs](https://modal.com/docs/guide/billing), checked September 2, say idle GPU reservation and remaining memory occupancy can still bill. Use the [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) for CPU, memory, region, Sandbox, and storage meters.

### Koyeb: request-waking zero has protocol boundaries

Koyeb's [scale-to-zero docs](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked August 28, include GPU Instances. An eligible Internet-facing Service can set its minimum to zero. The default idle period is five minutes, producing `$2.50 × 5 / 60 = $0.2083` at the September 24 H100 rate.

The feature is in public preview. Open connections prevent idleness, HTTP/2 cannot wake a sleeping Service, and gradual multi-instance downscale can add removal steps. The calculation above is one instance's nominal post-traffic interval, not a complete request cost.

### Baseten: the default delay can dominate a short request

Baseten's [autoscaling docs](https://docs.baseten.co/deployment/autoscaling/overview), checked September 1, default to `min_replica: 0`, `max_replica: 1`, a 60-second traffic window, a 900-second scale-down delay, and at most 50% removal per step.

For one H100 replica, `$0.10833 × 15 = $1.62495`, rounded to **$1.6250**. Baseten's [billing docs](https://docs.baseten.co/organization/billing), checked September 1, say image pull before workload start is free, while model loading, engine initialization, serving, and warm idle time are metered by the minute with partial minutes rounded up. The [Baseten pricing guide](https://hostfleet.net/baseten-pricing-guide-2026/) shows how staged multi-replica scale-down expands the tail.

### Replicate: zero minimum does not reveal the cooldown

Replicate's [Deployment configuration docs](https://replicate.com/docs/topics/deployments/create-a-deployment), checked September 4, allow configurable minimum and maximum instances, with a platform default minimum of zero. Its [billing guide](https://replicate.com/docs/topics/billing), checked September 4, bills every online second, including model setup, predictions, and idle time.

The idle period is only “a few minutes.” At the September 24 H100 rate, each observed online minute costs `$0.001525 × 60 = $0.0915`. Do not multiply that value by an invented cooldown. The [Replicate pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/) explains why prediction timing is not a complete billing timer.

## How to test scale-to-zero without benchmark theater

Use one bounded lifecycle smoke test before projecting production cost:

1. **Pin the workload.** Record image digest, model revision, GPU class, region, runtime, concurrency, and autoscaling settings.
2. **Isolate the bill.** Use a dedicated project or deployment and disable unrelated traffic.
3. **Start at zero and cap at one.** Do this only where the provider documents request waking or queue-driven scale-up.
4. **Capture state transitions.** Separate allocation, image transfer, container start, model load, readiness, request work, idle retention, stopping, and deletion.
5. **Record retries and boot identity.** One logical job can produce multiple attempts or workers.
6. **Prove zero.** Use provider state or telemetry; elapsed time alone does not establish GPU release.
7. **Reconcile billing.** Compare the narrowest provider usage record with the lifecycle log after charges settle.
8. **Clean up retained resources.** Check warm minimums, deployments, volumes, snapshots, disks, and queued retries.

Label official lifecycle rules **sourced**, timestamp observations **measured**, rate multiplication **derived**, and any phase that cannot be attributed **unverified**. Five runs can show a range; they do not justify universal p95 claims.

## Selection checklist

Choose in this order:

1. **Hardware fit:** accelerator, VRAM, topology, count, and region.
2. **Product shape:** bundled Service, Function, worker endpoint, managed Deployment, or GPU component.
3. **Complete price:** GPU, CPU, memory, storage, network, platform fees, and tax.
4. **Zero behavior:** automatic, manual, unavailable at zero, or not established.
5. **Wake path:** queued, rejected, retried, or protocol-limited.
6. **Billable lifecycle:** allocation, image pull, container start, model load, active work, idle tail, staged downscale, and teardown.
7. **Evidence:** isolated usage records, state logs, and cleanup confirmation.

Apply promotional credit only after the base lifecycle is understood. The [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) separates credit amount from GPU access and enforced spending controls.

## Verdict

**Koyeb has the lowest complete H100 headline in this selected comparison at $2.50/hour**, verified September 24. Its documented scale-to-zero path still carries a five-minute default idle period, public-preview status, and protocol restrictions.

**RunPod has the shortest documented default tail at five seconds**, but its official initialization-billing statements conflict. **Modal offers the broadest retention control**, while surrounding CPU and memory remain separate. **Baseten documents the clearest zero-replica request policies**, but its 15-minute default delay can outweigh a short request. **Replicate can return toward zero without publishing a numeric cooldown.**

**Salad is the useful warning against calling an entire cold start free.** Its checked public RTX 4090 from-price is $0.16/GPU-hour, and platform allocation plus image download are unbilled. Once the container is `running`, however, model initialization can still be underway and the meter is active. That distinction belongs in any serverless GPU cost model.

Cloud Run illustrates the same principle: a zero minimum does not make instance time free between requests, and its L4/RTX products cannot be inserted into an H100 rate ranking without a like-for-like hardware and price basis. The defensible buying order is hardware fit, complete product price, wake behavior, billable lifecycle, and then measured workload evidence. The smallest hourly number matters only after the endpoint can become ready, serve correctly, and stop charging in the way the forecast assumes.

## Sources

Cloud Run GPU lifecycle claims were checked against official Google documentation on **October 4, 2026**. No Cloud Run dollar rate or measured lifecycle result is asserted. The H100 rates below retain their September 24 verification date.

- [Cloud Run GPU configuration](https://docs.cloud.google.com/run/docs/configuring/services/gpu) — GPU options, instance billing, minimum-instance charges and redundancy setting; checked Oct. 4
- [Cloud Run billing settings](https://docs.cloud.google.com/run/docs/configuring/billing-settings) and [minimum instances](https://docs.cloud.google.com/run/docs/configuring/min-instances) — whole-instance billing, zero minimum and the 15-minute maximum idle dwell; checked Oct. 4
- [Cloud Run GPU best practices](https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices) and [monitoring](https://docs.cloud.google.com/run/docs/monitoring) — concurrency/autoscaling and observable lifecycle metrics; checked Oct. 4
- [Cloud Run pricing](https://cloud.google.com/run/pricing) — official price lookup, with no rate extracted or quoted in this update; checked Oct. 4
- HostFleet research note: `/opt/hostbot/data/ai-hosting/notes/2026-10-04-cloud-run-gpu-scale-to-zero-billing-boundary.md`

H100 rates were rechecked against the official pricing pages on **September 24, 2026**. Salad pricing and lifecycle documentation were checked **September 26, 2026**. Other lifecycle dates are listed beside each source.

- [Koyeb pricing](https://www.koyeb.com/pricing) — H100 rate and included resources; checked Sept. 24
- [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — GPU eligibility, preview status, idle conditions, wake path, and protocol boundary; checked Aug. 28
- [Northflank pricing](https://northflank.com/pricing) — H100 component rate and separate resources; checked Sept. 24
- [Northflank autoscaling](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) and [manual scaling](https://northflank.com/docs/v1/application/scale/scale-instances.md) — downscale window and manual zero; checked Aug. 31
- [Modal pricing](https://modal.com/pricing) — H100 rate; checked Sept. 24
- [Modal scaling](https://modal.com/docs/guide/scale) and [billing](https://modal.com/docs/guide/billing) — zero default, idle window, warm floors, and billable retained resources; checked Sept. 2
- [Fal pricing](https://fal.ai/pricing) — H100 list rate; checked Sept. 24
- [Fal scaling](https://fal.ai/docs/documentation/deployment/scale-your-application), [serverless billing](https://fal.ai/docs/documentation/serverless/pricing), and [runner lifecycle](https://fal.ai/docs/documentation/deployment/runners) — zero default, idle window, termination grace, and billable phases; checked Sept. 8
- [RunPod pricing](https://www.runpod.io/pricing) — H100 PRO Flex rate; checked Sept. 24
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing), [worker overview](https://docs.runpod.io/serverless/workers/overview), and [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — rounding, initialization conflict, zero defaults, and idle timeout; checked Aug. 30
- [Replicate pricing](https://replicate.com/pricing) — private H100 rate; checked Sept. 24
- [Replicate billing](https://replicate.com/docs/topics/billing) and [Deployment configuration](https://replicate.com/docs/topics/deployments/create-a-deployment) — online billing, setup, idle, and configurable minimum; checked Sept. 4
- [CoreWeave pricing](https://www.coreweave.com/pricing) — H100 inference rate and access boundary; checked Sept. 24
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 per-minute rate; checked Sept. 24
- [Baseten autoscaling](https://docs.baseten.co/deployment/autoscaling/overview), [request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle), [scaling operations](https://docs.baseten.co/deployment/manage/scaling), and [billing](https://docs.baseten.co/organization/billing) — defaults, zero-replica behavior, the wake endpoint, metered phases, and rounding; scaling operations rechecked Sept. 28
- [Salad pricing](https://salad.com/pricing/) — RTX 4090 from-price, included resources, and Lowest-tier caveat; checked Sept. 26
- [Salad Container Engine billing](https://docs.salad.com/container-engine/explanation/billing-pricing/billing), [general billing and usage](https://docs.salad.com/general/explanation/billing), [deployment lifecycle](https://docs.salad.com/container-engine/explanation/container-groups/deployment-lifecycle), [Job Queue autoscaling](https://docs.salad.com/container-engine/explanation/infrastructure-platform/autoscaling), [autoscaling settings](https://docs.salad.com/container-engine/reference/autoscaling/settings), and [Job Queues](https://docs.salad.com/container-engine/explanation/job-processing/job-queues) — state meter, project-level usage graphs, model-initialization boundary, queue ranges, and retries; general billing rechecked Sept. 28
- HostFleet dataset: `/opt/hostbot-v2/src/data/gpu-pricing.json`, 21 providers and 147 cells fully checked Sept. 24, 2026
- HostFleet evidence notes: `/opt/hostbot/data/ai-hosting/notes/2026-09-24-gpu-pricing-full-verification.md` and `/opt/hostbot/data/ai-hosting/notes/2026-09-26-salad-queue-scale-to-zero-billing-boundary.md`

*Need an allocated GPU Pod after testing the serverless lifecycle? This is a labeled affiliate link; source citations above remain direct. <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> supports HostFleet at no extra cost to you. Re-check the exact GPU, cloud tier, region, storage, and current price before purchase.*
