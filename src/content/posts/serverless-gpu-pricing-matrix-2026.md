---
title: "Serverless GPU pricing 2026: rates, idle costs and shutdown traps"
description: "Compare dated serverless GPU rates and idle costs, with Salad RTX 4090/5090 prices and the cancellation, retry and shutdown rules that change your bill."
pubDate: 2026-04-21
updatedDate: 2026-10-24
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

> **Northflank GPU components, surrounding compute rates, billing API and scaling docs verified:** October 14, 2026<br>
> **Cloud Run GPU lifecycle verified:** October 4, 2026<br>
> **RunPod and Modal H100 rates verified:** October 15, 2026; Modal lifecycle checked October 15<br>
> **RunPod lifecycle and billable image-pull exception rechecked:** October 24, 2026<br>
> **Other five H100 rates verified:** September 24, 2026; original comparison dates retained<br>
> **Salad RTX 4090/5090 Lowest rates, queue retries, billing and shutdown docs verified:** October 23, 2026<br>
> **Currency and estimates:** USD list prices before tax; 720 billable hours is a planning scenario, not a monthly quote<br>
> **Evidence mode:** Official-source comparison with transparent arithmetic. HostFleet did not benchmark cold starts, throughput, capacity, reliability, or settled invoices.

# Serverless GPU pricing in 2026: rates, idle costs and shutdown traps

Serverless GPU pricing is not just an hourly-rate comparison. The bill depends on model startup, retained idle capacity, retries and whether workers have actually stopped. **This is an official-source comparison with calculated estimates, not a cold-start, throughput or invoice benchmark.** No GPU was provisioned for this refresh.

The tables separate eight application-level H100 products from Salad's consumer GPUs. Their headline rates are not interchangeable: Koyeb bundles an application instance, Northflank publishes a GPU component, Modal meters surrounding CPU and memory separately, and Baseten and Replicate sell managed deployment capacity.

**The October 23 update checks Salad's two tracked Lowest-priority rates and its shutdown contracts.** An RTX 4090 remains **$0.16/GPU-hour**, and an RTX 5090 is **$0.25/GPU-hour**. But cancelling a dispatched job does not stop its work, a stopped group can still have running instances, and exhausted prepaid credit is not a hard spending cap. Those distinctions matter more than another decimal place in the hourly price.

HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) covers 21 providers. Its dataset-wide verification date remains **September 24, 2026**; this targeted check does not advance it. The H100 prices below retain their separately stated September 24, October 14 or October 15 rate-check dates. During the October 24 revision, the cited vendor pricing pages were checked again and the quoted rates still matched; those original rate dates are retained separately from the RunPod lifecycle correction.

Before choosing an H100, confirm that 80 GB is appropriate for the weights, quantization, runtime overhead, KV cache, context, and concurrency. The [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) is the sizing step; this page starts after the hardware requirement is known.

## The short buying answer

| Need | Strong starting point | Why | Boundary to test |
|---|---|---|---|
| Lowest complete H100 headline in this set | **Koyeb** | $2.50/hour includes one H100, 15 vCPU, 180 GB RAM, and 320 GB disk | Five-minute default idle period; public-preview and protocol restrictions |
| Shortest documented default worker tail | **RunPod Serverless Flex** | Five-second default idle timeout | Normally, preparation before Running is unbilled; image pulls after worker start and handler/model loading in Running bill |
| Tunable idle retention | **Modal** | Maximum idle window is configurable from two seconds to 20 minutes ([cold-start guide](https://modal.com/docs/guide/cold-start)) | GPU, CPU, and memory can remain billable during retention |
| Explicit managed zero-replica request policy | **Baseten** | Queue-or-reject behavior and a wake endpoint are documented | Fifteen-minute default scale-down delay and per-minute rounding |
| Private managed deployment with a zero minimum | **Replicate** | Default minimum is zero | Idle shutdown is only described as “a few minutes” |
| Retryable work that fits a consumer GPU | **Salad Lowest** | RTX 4090 $0.16/GPU-hour; RTX 5090 $0.25/GPU-hour, with included vCPU/RAM; checked Oct. 23 | Different hardware from H100; most interruptible tier; job cancellation and group stop acknowledgements do not prove zero workers |

The recommendation depends on product shape, not just the smallest number. Koyeb is the lowest complete H100 bundle in this selected set. Northflank's nearby number is not a complete workload total because required CPU and memory are separate. Salad is much cheaper only because it is a different accelerator and interruption model. Cloud Run is also outside this H100 ranking: its current GPU choices are L4 and RTX PRO 6000 Blackwell, and this update does not claim a verified region-specific dollar rate for either.

## Eight selected H100 rates

Per-second prices are multiplied by 3,600 and per-minute prices by 60. The hourly equivalent is a comparison aid, not a replacement for the provider's native billing unit.

| Provider and product | Native public rate | Hourly equivalent | Product boundary | Official source and check date |
|---|---:|---:|---|---|
| **Koyeb H100 Service** | $2.50/hr | **$2.50/hr** | One H100 80 GB instance with 15 vCPU, 180 GB RAM, and 320 GB disk | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 24, 2026 |
| **Northflank managed-cloud H100** | $2.74/GPU-hr | **$2.74/GPU-hr plus CPU and memory** | GPU component only; compute plan, disk, and egress are separate | [Northflank pricing](https://northflank.com/pricing), Oct. 14, 2026 |
| **Modal H100 Function** | $0.001097/sec | **$3.9492/hr** | GPU allocation; CPU, memory, and storage use separate meters | [Modal pricing](https://modal.com/pricing), Oct. 15, 2026 |
| **Fal custom deployment** | $4.50/hr | **$4.50/hr** | Public custom-deployment list rate; commitments excluded | [Fal pricing](https://fal.ai/pricing), Sept. 24, 2026 |
| **RunPod Serverless H100 PRO** | $4.79/hr | **$4.79/hr** | Flex worker price, not an exact-card VM reservation | [RunPod pricing](https://www.runpod.io/pricing), Oct. 15, 2026 |
| **Replicate private Deployment** | $0.001525/sec | **$5.49/hr** | Online managed Deployment instance, including setup and idle time | [Replicate pricing](https://replicate.com/pricing), Sept. 24, 2026 |
| **CoreWeave Inference** | $6.16/GPU-hr | **$6.16/GPU-hr** | Single-GPU inference-platform rate; account access applies | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 24, 2026 |
| **Baseten Dedicated Inference** | $0.10833/min | **$6.4998/hr** | Managed workload time; partial minutes round up | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 24, 2026 |

The range is **$2.50 to $6.4998 per H100 hour equivalent**, based on the separately dated official sources in the table: Northflank October 14, RunPod and Modal October 15, and the other five September 24. Host resources, management layer, access model, scaling policy, and included storage differ. The [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) is the broader comparison for VMs, Pods, hardware variants, and more providers.

## What one continuously billable month costs

The following sensitivity case assumes exactly one listed product remains billable for 720 hours. It is not a forecast for a service that reliably reaches zero.

| Product | Rate: RunPod/Modal Oct. 15; Northflank Oct. 14; others Sept. 24 | 720-hour estimate |
|---|---:|---:|
| Koyeb H100 Service | $2.50/hr | **$1,800.00** |
| Northflank H100 component | $2.74/GPU-hr | **$1,972.80 plus CPU and memory** |
| Modal H100 Function | $0.001097/sec | **$2,843.42 plus CPU and memory** |
| Fal H100 custom deployment | $4.50/hr | **$3,240.00** |
| RunPod Serverless H100 PRO | $4.79/hr | **$3,448.80** |
| Replicate private H100 Deployment | $0.001525/sec | **$3,952.80** |
| CoreWeave Inference H100 | $6.16/GPU-hr | **$4,435.20** |
| Baseten H100 deployment | $0.10833/min | **$4,679.86** |

Each estimate is the official rate at its stated verification date multiplied by 720 hours, with conversion performed before rounding. Tax, commitments, credits, extra replicas, retries, storage, networking, and surrounding resource meters are excluded unless the product bundle explicitly includes them. Replace 720 with observed billable duration in the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/).

## Scale-to-zero and idle-cost matrix

The useful question is not whether a product can display zero replicas. It is which phases remain billable before and after useful inference.

| Product | Can the checked product reach zero automatically? | Documented default after traffic | Derived one-GPU reserve | Main caveat |
|---|---|---:|---:|---|
| **RunPod Flex** | Yes, with zero Active workers | 5-second idle timeout | **$0.006653** at the Oct. 15 H100 rate | Normally, pre-Running preparation is unbilled; an image pull after worker start and handler/model loading in Running bill |
| **Modal Function** | Yes; zero is default without warm minimums | [60-second maximum idle window](https://modal.com/docs/guide/cold-start) | **$0.065820 GPU upper bound** at the Oct. 15 rate | Idle GPU reservation and residual memory can bill; CPU/memory meters are separate; the window is a maximum, not guaranteed retention |
| **Koyeb GPU Service** | Yes for eligible Internet-facing Services | 5-minute idle period | **$0.2083** at the Sept. 24 H100 rate | Public preview; open connections and HTTP/2 affect sleep or wake behavior |
| **Baseten Dedicated Inference** | Yes when `min_replica` is zero | 900-second scale-down delay | **$1.6250** at the Sept. 24 H100 rate | Model load and engine initialization bill; removal can be staged |
| **Replicate Deployment** | Yes when minimum instances are zero | “A few minutes” | **$0.0915 per observed online minute** at the Sept. 24 H100 rate | No numeric public cooldown, so no fixed tail total is defensible |
| **Northflank managed GPU service** | Automatic zero is not established; manual zero is documented | 5-minute moving downscale window, not a fixed billed tail | **$0.2283 H100 component for an assumed five minutes**, Oct. 14 rate | CPU and memory are additional; zero makes the service unavailable; aggregate GPU-hours do not identify a per-replica cutoff |
| **Fal custom deployment** | Yes with the documented zero default | 60-second idle window plus up to 5 seconds termination grace | **$0.08125** if both intervals are fully consumed at the Sept. 24 H100 rate | SETUP, IDLE, RUNNING, DRAINING, and TERMINATING bill |
| **CoreWeave Inference** | Not evaluated in this lifecycle refresh | Not evaluated | Not estimated | The price row is retained without inventing a zero-capacity policy |
| **Cloud Run GPU service (L4 or RTX PRO 6000)** | Yes with `min=0`; request-driven wake | No fixed default quoted; at most 15 minutes idle after a request without a minimum | **Up to 900 billed post-request instance-seconds** as a bound, not a dollar quote | GPU, CPU and memory bill for the instance lifecycle; GPU sticker price alone is incomplete |

These are arithmetic planning values, not measured charges. RunPod lifecycle docs were rechecked October 24 and Modal lifecycle docs October 15; Koyeb August 28; Northflank October 14; Baseten September 1; Replicate September 4; and Fal September 8. H100 rates used here retain September 24 checks except Northflank, rechecked October 14, and RunPod/Modal, rechecked October 15. The Northflank five-minute amount is an illustrative duration, not a documented maximum or measured charge.

## Salad: low hourly rates do not guarantee a cheap completed job

**Public prices and the billing, lifecycle, autoscaling, queue and API documentation below were checked October 23, 2026.** These are the two Salad cells in HostFleet's `gpu-pricing.json`, cross-checked against the static priority table on [Salad's pricing page](https://salad.com/pricing/). They are not dynamic availability-widget quotes.

| GPU / priority | VRAM | Public GPU rate, checked Oct. 23 | Assumed 15 running minutes | Assumed 720 running hours |
|---|---:|---:|---:|---:|
| RTX 4090 / Lowest | 24 GB | **$0.160/hour** | **$0.0400** | **$115.20** |
| RTX 5090 / Lowest | 32 GB | **$0.250/hour** | **$0.0625** | **$180.00** |

The estimates assume one one-GPU instance is continuously billable for the stated duration. They exclude other charges and tax; they are not measured bills, availability promises or throughput comparisons. The 720-hour convention matches this article's H100 table, not Salad's public 730-hour monthly display. GPU groups include vCPU and RAM without an extra CPU/RAM charge, but the exact account-visible allocation, quota and available capacity were not verified. Lowest is the most interruptible priority. Neither GPU belongs in an H100 ranking.

### Billing starts at running, not model readiness

Salad's [Container Engine billing guide](https://docs.salad.com/container-engine/explanation/billing-pricing/billing.md) meters running instances per second; allocation and image downloading are unbilled. Its [deployment lifecycle](https://docs.salad.com/container-engine/explanation/container-groups/deployment-lifecycle.md) says the container has started when an instance reaches `running`, but startup scripts or model downloads can still be underway before readiness. Do not extend the unbilled platform-preparation rule to all model initialization.

The rate-equivalent compute formula is:

    sum of running seconds across all instances × GPU hourly rate / 3,600

At the October 23 RTX 4090 rate, **1,500 aggregate running seconds** have a list-price value of `$0.16 × 1,500 / 3,600 = $0.066667`, rounded to six decimals. Those could be one instance for 25 minutes or multiple instances whose running durations sum to 25 minutes. This is arithmetic, not a promise that a job plus cleanup will stay within 25 minutes or cost less than ten cents. Model startup, idle time, retry work and replacement overlap belong in the total whenever they fall inside a running interval. Do not add a second blanket retry multiplier after already counting every instance interval.

### Five ways a completed control-plane action can leave compute running

| What you do | What the checked documentation actually establishes | Cost consequence |
|---|---|---|
| Cancel a dispatched job | The job becomes `cancelled` and its output is discarded, but the instance runs the job to the end | Cancellation is not a compute kill switch |
| Stop a container group | The API returns **202 Accepted**; individual instances can remain running after group status is `Stopped` while the signal propagates | A stop acknowledgement or group label is not proof of the last billed second |
| Delete a container group | The API also returns **202 Accepted**; queue docs warn an old worker can briefly keep accepting work after stop/delete | A disappeared resource or 404 alone does not establish physical-worker termination |
| Delete the queue | Pending jobs are removed and groups are permanently detached, but the groups keep running | Queue cleanup is not compute cleanup; recreating the queue name does not reconnect the groups |
| Let prepaid balance run out | Usage is shut down as soon as possible; overrun can be invoiced the following month | A small balance or disabled auto-recharge is not a provider-enforced spending cap |

Sources for these boundaries are the [Using Queues guide](https://docs.salad.com/container-engine/how-to-guides/job-processing/using-queues.md), [Job Queue limitations](https://docs.salad.com/container-engine/explanation/job-processing/job-queues.md), [deployment lifecycle](https://docs.salad.com/container-engine/explanation/container-groups/deployment-lifecycle.md), [stop API](https://docs.salad.com/reference/saladcloud-api/container-groups/stop-container-group.md), [delete API](https://docs.salad.com/reference/saladcloud-api/container-groups/delete-container-group.md) and [organization billing guide](https://docs.salad.com/general/explanation/billing.md), all checked October 23. The lifecycle describes stop propagation as taking several minutes; it does not supply a precise guaranteed cleanup deadline for a dollar cap.

### One client request can still mean four attempts

The [Job Queue documentation](https://docs.salad.com/container-engine/explanation/job-processing/job-queues.md) allows three retries after the first attempt: **four total attempts**. Failures retry immediately without backoff and can return to the same instance. Interruption detection waits for the job lease, which can take several minutes. A response body over the documented **10 MB** limit can cause all four full attempts to fail.

Keep handlers idempotent, write large results to durable storage and return a small reference, and record an application attempt ID. In the [job event contract](https://docs.salad.com/container-engine/how-to-guides/job-processing/using-queues.md), a retry appears as `failed` followed by another `started`, not a special retry event. Disabling client retries therefore does not establish exactly-once execution.

### How to check the bill without inventing a shutdown time

The [autoscaling settings](https://docs.salad.com/container-engine/reference/autoscaling/settings.md) permit a zero minimum, a maximum up to the project quota, and a control period from 15 to 1,800 seconds. A desired maximum of one is useful for a small test, but the checked sources do not independently establish that it prevents all old/new physical-worker overlap during replacements. Capture every instance and machine identity rather than assuming replica configuration is a physical-concurrency ledger.

For a normal planned shutdown, stop new submissions and let queued work drain before stopping the disposable group. For runaway work or a lost observer, request termination promptly rather than waiting indefinitely for a drain. Keep observing individual workers through termination before final group/queue deletion; deletion that removes visibility first leaves teardown unverified. This is an operator workflow, not an account-tested guarantee.

The [instance-list schema](https://docs.salad.com/reference/saladcloud-api/container-groups/list-container-group-instances.md) exposes identity, state and update time, but its CPU-usage counters are not GPU billable seconds. Polling gives duration bounds, not an exact invoice timer. For one uninterrupted running interval, if the last nonrunning observation is at `t0`, the first running at `t1`, the last running at `t2` and the next nonrunning at `t3`, its duration lies between `max(0, t2 - t1)` and `max(0, t3 - t0)`, conditional on no missed transitions. Sum across all worker identities; missing observations invalidate precise attribution.

Reconcile those estimates with the narrowest available usage record after charges settle. The [organization billing guide](https://docs.salad.com/general/explanation/billing.md) documents project-level usage graphs; these checked sources do not establish a per-instance settled-charge ledger or settlement-lag guarantee. An account balance delta alone does not isolate this job's bill.

**Buying decision:** Salad is a candidate for interruptible, idempotent queue work that fits consumer-GPU memory. Confirm the account quote, complete resource shape, workload completion time, retries, worker overlap and cleanup behavior before forecasting cost per successful job. If a test requires a hard dollar ceiling and the maximum billable tail cannot be supported, do not describe that test as bounded by the headline rate or prepaid balance.

## Cloud Run GPU: zero minimum is not request-only billing

**Checked October 4, 2026 against official Google documentation.** This row is deliberately outside the H100 price ranking. Cloud Run offers one NVIDIA L4 with 24 GB VRAM or one NVIDIA RTX PRO 6000 Blackwell with 96 GB VRAM per instance. Google's [GPU configuration guide](https://docs.cloud.google.com/run/docs/configuring/services/gpu) says GPU services must use **instance-based billing**. GPU, CPU and memory can therefore accrue while the instance starts, serves, sits idle and shuts down; there is no per-request GPU fee. A minimum instance is billed at the full instance rate while idle.

Set `min=0` if the workload tolerates waking from zero and you want to avoid a standing one-instance floor. That does **not** mean each request is charged only for inference seconds. Google's [billing-settings documentation](https://docs.cloud.google.com/run/docs/configuring/billing-settings) says an instance without a minimum never stays idle more than 15 minutes after processing a request. Treat **900 seconds as a documented upper bound** for one otherwise idle instance's post-request dwell, not as a guaranteed cooldown or an observed bill. Startup and shutdown are outside that post-request bound. Subsequent traffic, multiple instances or a configured minimum change the total.

The cost model is straightforward but cannot yet be filled with a defensible dollar number here:

`billable instance-seconds × (GPU rate per second + configured vCPU count × vCPU rate per second + configured GiB × memory rate per GiB-second)`, plus any separately billed items. Select the GPU rate for the actual redundancy mode.

Check the exact region, GPU, CPU and RAM configuration in [Google's Cloud Run pricing](https://cloud.google.com/run/pricing) before doing the arithmetic. GPU zonal redundancy is enabled by default for new services and carries a different GPU rate; disabling it changes failover guarantees, so do not treat the cheaper mode as an identical product. This October 4 source check did **not** extract a verified region/SKU/redundancy-specific rate from the public pricing table. Cloud Run is therefore unpriced in this comparison; no monthly floor or tail-dollar estimate is implied.

For capacity planning, Google's [GPU best practices](https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices) say GPU utilization is **not** an autoscaling input. Set concurrency for the serving engine rather than assuming an overloaded GPU automatically adds instances. Record instance time, startup and request latency, and GPU metrics from [Cloud Run monitoring](https://docs.cloud.google.com/run/docs/monitoring); reconcile them to a billing export before presenting a measured cost or cold-start figure. Google's instance-start statement is not a model-ready latency guarantee: image and model loading and readiness still matter.

**Decision:** Cloud Run is worth testing if a request-driven service, managed autoscaling and zero minimum fit the workload. If the purchase hinges on a price comparison, first capture the official price for the exact region, GPU, CPU, RAM and redundancy configuration. If it hinges on a latency SLO, test model readiness and the variable idle tail in an isolated project; this article supplies neither a benchmark nor an invoice result.

## Northflank: price the whole service, then check its GPU-hours

**GPU components, CPU/memory prices, billing API and scaling documentation checked October 14, 2026. This is a documented workflow, not an account-tested billing result.** Northflank is relevant when you want managed GPU services with configurable surrounding resources. It should not be bought on the assumption that manual zero provides a request-waking inference endpoint.

### Five GPU components, not five complete instance prices

These rows come from the Northflank cells in HostFleet's `gpu-pricing.json` and were cross-checked against the live [Northflank pricing page](https://northflank.com/pricing). All five are unchanged. The [managed GPU guide](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md), checked October 14, says GPU time is billed by the second once provisioned; model readiness is not the stated billing start. Each example assumes **one GPU** continuously billable for the stated interval; CPU, memory, persistent disk, networking, tax and credits are excluded.

| GPU | VRAM | GPU-only rate, checked Oct. 14, 2026 | Illustrative five-minute GPU cost | 720-hour GPU-only estimate |
|---|---:|---:|---:|---:|
| L4 | 24 GB | $0.80/GPU-hour | $0.0667 | $576.00 |
| A100 | 40 GB | $1.42/GPU-hour | $0.1183 | $1,022.40 |
| A100 | 80 GB | $1.76/GPU-hour | $0.1467 | $1,267.20 |
| H100 | 80 GB | $2.74/GPU-hour | $0.2283 | $1,972.80 |
| RTX PRO 6000 | 96 GB | $3.00/GPU-hour | $0.2500 | $2,160.00 |

Five minutes here is a **chosen cost scenario**, not a measured cooldown or a guaranteed billing cutoff. The [autoscaler documentation](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) describes evaluation every 15 seconds and a moving five-minute downscale window. That policy does not promise that the excess replica stops billing exactly five minutes after the last request. The [manual scaling documentation](https://northflank.com/docs/v1/application/scale/scale-instances.md) says zero instances makes the service unavailable; request-driven waking from zero is not established by these sources.

The public pricing page separately lists **$0.01667/vCPU-hour** and **$0.00833/GB-hour of memory**, checked October 14. Using its displayed units, an illustrative one-L4 service with four vCPU and 16 GB RAM has this hourly compute estimate:

    $0.80 + (4 × $0.01667) + (16 × $0.00833) = $0.99996/hour

That is about **$1.00/hour**, or **$719.97 over 720 hours**, before disk, networking and other charges. It is arithmetic for a hypothetical configuration, not a recommended SKU, guaranteed available plan or tested memory requirement. Use the actual selected compute-plan quote before committing. The Billing API reports memory quantities in **GiB-hours**; preserve those units when reconciling usage rather than silently substituting decimal GB. Each additional replica repeats its configured GPU, CPU and memory allocation.

### Reconcile one service without charging it for the whole account

Northflank's [Billing API overview](https://northflank.com/docs/v1/api/billing-api.md), [usage list](https://northflank.com/docs/v1/api/team/billing/list-usage.md) and [hourly usage detail](https://northflank.com/docs/v1/api/team/billing/get-usage.md) document a read-only route to service attribution:

1. **Resolve identity and scope first.** Use an authorised billing-read token. The overview's identifier section specifies permanent `uid` values for billing project filters, while a later section says `uuid`. The exact [project-list reference](https://northflank.com/docs/v1/api/team/projects/list-projects.md) documents `data.projects[].uid`. Use that as the candidate for `projectId`, verify the filtered response resolves the intended project, and stop on a mismatch. Do not guess an alias or substitute the human-readable project path ID. A team-scoped token must not send `teamId`; inspect its returned scope.
2. **List the billing hours.** Request `GET /v1/billing/usage` with `granularity=hour`, the verified project filter, `resourceType=service`, and explicit Unix-second bounds. `startTime` is inclusive; `endTime` is exclusive. Include every billing hour overlapping provisioning through cleanup, not just request-processing time. Follow the returned `pagination.cursor` while `hasNextPage` is true; hourly pages contain at most 100 entries.
3. **Drill into each returned hour.** Use its API-returned timestamp in `GET /v1/billing/usage/{timestamp}` with the same project and resource-type filters. Follow resource page-number pagination, checking `pagination.unit` and `hasNextPage`. The hierarchy depends on token scope: walk the returned PaaS teams/projects/resources to `items[]` and match the intended service's permanent identifier to the item `id`. No individual-service filter is documented. If the account still receives the legacy contract, the documented `removeLegacyFields=true` option selects the current contract.
4. **Extract the item, not a convenient top-level total.** On the usage **list**, filters narrow the PaaS total. On hourly **detail**, they narrow the nested breakdown but do **not** narrow the top-level PaaS total. Therefore `data.total` or `data.paas.price.total` from detail is not the cost of your selected service. Preserve the matched item's `price.gpu`, CPU, memory and storage components separately.
5. **Keep quantities and components separate.** Retain `usage.gpuOnDemandHours` and `gpuSpotHours`, and the separate build/run CPU and memory quantities. A service with one unchanged on-demand GPU model can compare its on-demand GPU-hours with the matching list rate; do not mix GPU types, Spot and on-demand pricing, or negotiated rates. Item `duration` is documented as billed resource seconds, not individual-replica GPU seconds.
6. **Check completeness and settlement.** [Usage breakdowns update hourly](https://northflank.com/docs/v1/application/billing/monitor-spending.md), not in real time. Retain full raw responses, deduplicate by billing hour plus item ID, and read again after a later hourly refresh. Report changing figures as provisional. Component amounts and quantities can retain sub-cent precision even when totals are rounded to cents. Organisation-billed team responses omit customer-level categories such as BYOC and metered network spend; omission is not zero cost.

Run this read-only check against an existing usage hour before paying for a trial. If the service identity, GPU quantities or page completeness cannot be established, fix attribution first. This article does not include an authenticated API result or a paid experiment.

### GPU-seconds are aggregate work, not a replica stopwatch

Consider a **hypothetical** service with one L4 per replica: one replica for ten billable minutes, then two replicas for five. Assuming no other billable phases:

    (1 × 10 + 2 × 5) / 60 = 1/3 GPU-hour
    1/3 × $0.80 = $0.266666… in GPU-only cost
    1/3 × 3,600 = 1,200 aggregate GPU-seconds

The elapsed interval is 900 seconds, not 1,200. Conversely, a service-level API quantity of one-third GPU-hour would not uniquely recover this timeline: one replica for 20 minutes or two for ten can produce the same aggregate. Keep lifecycle logs for interpretation, but do not publish an exact second-replica cutoff from an hourly service total. CPU, memory, builds and retained resources still need their own reconciliation.

### Credit and invoice thresholds are not experiment caps

The [managed GPU deployment guide](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md) requires at least **$50 account credit** before deploying GPUs, checked October 14. Separately, the [billing-threshold documentation](https://northflank.com/docs/v1/application/billing/billing-thresholds.md) gives new accounts a **$50 invoice threshold**. Hitting that threshold creates an invoice, applies credits, charges the remaining balance and resets the cycle; it does not stop the experiment at $50. Billing alerts notify you rather than documenting an automatic stop.

For a bounded trial, set a replica ceiling and an independent elapsed-time stop using the full compute quote, including provisioning and a cleanup allowance. Confirm zero managed compute afterward, and check volumes and builds separately: manual zero leaves the service unavailable but can leave CI enabled. Account-credit suspension and hourly billing updates are not precise small-test budget controls.

**Buying decision:** Northflank's GPU component can be attractive, but compare the complete service quote and decide whether an unavailable manual-zero state fits the workload. Its documented API can support service-level cost attribution; it does not establish automatic request waking or an individual replica's exact billed tail.

## Provider lifecycle notes

### RunPod: unbilled preparation ends when the worker starts Running

RunPod's [Serverless pricing guide](https://docs.runpod.io/serverless/pricing) and [worker overview](https://docs.runpod.io/serverless/workers/overview), both rechecked October 24, distinguish the normal preparation path from a billable exception. Image pulls and cached-model downloads **normally happen while the worker is scaled down**, before `Running`, and that preparation is unbilled. **If a worker starts before its image is on the host, the image pull happens during the cold start and is billed.** The activity alone does not determine the charge: the worker's running state does. Once the worker is `Running`, its cold start (including any image pull after worker start), handler/model loading, request execution, and post-request idle timeout are billable until it fully stops, with time rounded up to the nearest second. Reading model weights from a network volume after Running begins is also within the billed interval. Do not call the entire cold start free: normal unbilled pre-Running preparation is distinct from billed startup after worker start. No startup-duration dollar estimate is asserted here because HostFleet has not measured that interval.

The [endpoint configuration docs](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), rechecked October 24, give Flex endpoints a five-second default idle timeout and a zero Active-worker default. At the [October 15 H100 PRO Flex rate](https://www.runpod.io/pricing), the nominal one-worker tail is `$4.79 × 5 / 3,600 = $0.0066528`. That is idle-time arithmetic, not a complete cold-start or request cost. Longer configured retention, parallel workers, retries, billed startup/execution, and storage add cost. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers Pods versus Serverless; use the current official lifecycle sources above for the clarified startup boundary.

### Modal: scale-to-zero is default, but retained resources bill

Modal's [scaling docs](https://modal.com/docs/guide/scale), rechecked October 15, say Functions scale to zero by default when they have no inputs. `min_containers` creates a warm floor, and `scaledown_window` is a maximum rather than a retention guarantee. The [cold-start guide](https://modal.com/docs/guide/cold-start), checked October 15, supplies the numeric settings: two seconds to 20 minutes, with a 60-second default maximum.

At the [October 15 H100 rate](https://modal.com/pricing), the GPU portion of that default upper bound is `$0.001097 × 60 = $0.065820`. Modal may terminate earlier or reuse the container. The [cold-start guide](https://modal.com/docs/guide/cold-start) explicitly says idle GPU reservation and residual memory occupancy remain billable. The [billing docs](https://modal.com/docs/guide/billing), rechecked October 15, cover general billing and usage reporting, not those specific idle-resource rules. Use the [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) for CPU, memory, region, Sandbox, and storage meters.

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

Use one isolated lifecycle smoke test before projecting production cost. Before calling its budget bounded, establish an upper bound on all billable worker time, including retries, overlap, observation delay and teardown; a prepaid balance or alert is not enough:

1. **Pin the workload.** Record image digest, model revision, GPU class, region, runtime, concurrency, and autoscaling settings.
2. **Isolate the bill.** Use a dedicated project or deployment and disable unrelated traffic.
3. **Start at zero and set a desired maximum of one.** Use documented request waking or queue-driven scale-up; independently observe physical workers, including replacements, rather than assuming the desired count proves a concurrency bound.
4. **Capture state transitions.** Separate allocation, image transfer, container start, model load, readiness, request work, idle retention, stopping, and deletion.
5. **Record retries and boot identity.** One logical job can produce multiple attempts or workers.
6. **Prove zero.** Use individual-worker state or telemetry, not only group status, a 202 acknowledgement, cancellation or a deleted resource. Keep an independent stop observer; elapsed time alone does not establish GPU release.
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

**RunPod has the shortest documented default tail at five seconds**. Its October 24 lifecycle check distinguishes normal unbilled preparation while scaled down from billed startup, requests, and idle timeout in Running, including an image pull if the worker starts before the image is on the host; the five-second tail is not the whole startup or request bill. **Modal documents a configurable maximum idle window from two seconds to 20 minutes**, while surrounding CPU and memory remain separate. **Baseten documents the clearest zero-replica request policies**, but its 15-minute default delay can outweigh a short request. **Replicate can return toward zero without publishing a numeric cooldown.**

**Salad illustrates both startup and shutdown risk.** Its October 23 Lowest prices are $0.16/GPU-hour for RTX 4090 and $0.25/GPU-hour for RTX 5090. Model initialization after `running` bills; cancelling a job, stopping its group or deleting its queue does not independently prove zero workers. Its low compute rate is useful only when completed-job cost includes retry work and the full running interval.

Northflank adds a separate attribution lesson: its GPU component is not the complete service price, and a service-level GPU-hour total cannot identify a particular replica’s idle tail. Manual zero makes the service unavailable; automatic request waking is not established by the checked documentation.

Cloud Run illustrates the same principle: a zero minimum does not make instance time free between requests, and its L4/RTX products cannot be inserted into an H100 rate ranking without a like-for-like hardware and price basis. The defensible buying order is hardware fit, complete product price, wake behavior, billable lifecycle, and then measured workload evidence. The smallest hourly number matters only after the endpoint can become ready, serve correctly, and stop charging in the way the forecast assumes.

## Continue the deployment decision

- **Need to establish the hardware floor first?** Use the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) to separate like-for-like H100 capacity from managed endpoint pricing before comparing a serverless lifecycle.
- **Already know the traffic shape?** Put startup, active work, idle retention, retries, and warm capacity into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) instead of extending an hourly headline rate across every calendar hour.
- **Choosing a warm managed serving surface?** Compare the operating trade-offs in [Fal vs Baseten vs Modal for one warm H100 deployment](https://hostfleet.net/fal-vs-baseten-vs-modal-warm-h100-deployment/) after deciding whether the endpoint should remain warm at all.

## Sources

Cloud Run GPU lifecycle claims were checked against official Google documentation on **October 4, 2026**. No Cloud Run dollar rate or measured lifecycle result is asserted. The original H100 comparison retains September 24 checks except Northflank, checked October 14, and RunPod/Modal, checked October 15.

- [Cloud Run GPU configuration](https://docs.cloud.google.com/run/docs/configuring/services/gpu) — GPU options, instance billing, minimum-instance charges and redundancy setting; checked Oct. 4
- [Cloud Run billing settings](https://docs.cloud.google.com/run/docs/configuring/billing-settings) and [minimum instances](https://docs.cloud.google.com/run/docs/configuring/min-instances) — whole-instance billing, zero minimum and the 15-minute maximum idle dwell; checked Oct. 4
- [Cloud Run GPU best practices](https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices) and [monitoring](https://docs.cloud.google.com/run/docs/monitoring) — concurrency/autoscaling and observable lifecycle metrics; checked Oct. 4
- [Cloud Run pricing](https://cloud.google.com/run/pricing) — official price lookup, with no rate extracted or quoted in this update; checked Oct. 4

Five H100 rates retain their official-source checks from **September 24, 2026**; Northflank’s H100 and four other GPU components were rechecked **October 14, 2026**, while RunPod and Modal H100 prices were rechecked **October 15, 2026** and are unchanged. Salad's two selected Lowest rates and its billing, lifecycle, queue and shutdown documentation were checked **October 23, 2026**. Other lifecycle dates are listed beside each source.

- [Koyeb pricing](https://www.koyeb.com/pricing) — H100 rate and included resources; checked Sept. 24
- [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — GPU eligibility, preview status, idle conditions, wake path, and protocol boundary; checked Aug. 28
- [Northflank pricing](https://northflank.com/pricing) — five GPU components and separate CPU/memory rates; checked Oct. 14
- [Northflank Billing API](https://northflank.com/docs/v1/api/billing-api.md), [usage list](https://northflank.com/docs/v1/api/team/billing/list-usage.md), [hourly detail](https://northflank.com/docs/v1/api/team/billing/get-usage.md), and [project list](https://northflank.com/docs/v1/api/team/projects/list-projects.md) — scope, identifiers, pagination, service components, GPU-hour quantities and documented uid/uuid conflict; checked Oct. 14
- [Northflank managed GPUs](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md), [spending monitor](https://northflank.com/docs/v1/application/billing/monitor-spending.md), and [invoice thresholds](https://northflank.com/docs/v1/application/billing/billing-thresholds.md) — provisioned-time billing, credit prerequisite, hourly refresh and payment triggers rather than experiment caps; checked Oct. 14
- [Northflank autoscaling](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) and [manual scaling](https://northflank.com/docs/v1/application/scale/scale-instances.md) — evaluation interval, moving downscale window and unavailable manual-zero state; checked Oct. 14
- [Modal pricing](https://modal.com/pricing) — H100 $0.001097/second; checked Oct. 15
- [Modal scaling](https://modal.com/docs/guide/scale) — zero default, warm minimums, and maximum-window behavior; checked Oct. 15
- [Modal cold-start guide](https://modal.com/docs/guide/cold-start) — 60-second default idle maximum, configurable two-second to 20-minute range, and billable idle GPU reservation/residual memory; checked Oct. 15
- [Modal billing](https://modal.com/docs/guide/billing) — general billing and usage reporting; checked Oct. 15
- [Fal pricing](https://fal.ai/pricing) — H100 list rate; checked Sept. 24
- [Fal scaling](https://fal.ai/docs/documentation/deployment/scale-your-application), [serverless billing](https://fal.ai/docs/documentation/serverless/pricing), and [runner lifecycle](https://fal.ai/docs/documentation/deployment/runners) — zero default, idle window, termination grace, and billable phases; checked Sept. 8
- [RunPod pricing](https://www.runpod.io/pricing) — H100 PRO Flex $4.79/hour; checked Oct. 15
- [RunPod Serverless pricing](https://docs.runpod.io/serverless/pricing), [worker overview](https://docs.runpod.io/serverless/workers/overview), and [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) — normally unbilled preparation while scaled down, the billable image-pull exception after worker start, billed handler/model loading and waiting in Running, per-second rounding, zero Active-worker default, and five-second idle timeout; rechecked Oct. 24
- [Replicate pricing](https://replicate.com/pricing) — private H100 rate; checked Sept. 24
- [Replicate billing](https://replicate.com/docs/topics/billing) and [Deployment configuration](https://replicate.com/docs/topics/deployments/create-a-deployment) — online billing, setup, idle, and configurable minimum; checked Sept. 4
- [CoreWeave pricing](https://www.coreweave.com/pricing) — H100 inference rate and access boundary; checked Sept. 24
- [Baseten pricing](https://www.baseten.co/pricing/) — H100 per-minute rate; checked Sept. 24
- [Baseten autoscaling](https://docs.baseten.co/deployment/autoscaling/overview), [request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle), [scaling operations](https://docs.baseten.co/deployment/manage/scaling), and [billing](https://docs.baseten.co/organization/billing) — defaults, zero-replica behavior, the wake endpoint, metered phases, and rounding; scaling operations rechecked Sept. 28
- [Salad pricing](https://salad.com/pricing/) and [Container Engine billing](https://docs.salad.com/container-engine/explanation/billing-pricing/billing.md) — RTX 4090/5090 Lowest rates, included vCPU/RAM, priority distinctions and per-second running meter; checked Oct. 23
- [Salad deployment lifecycle](https://docs.salad.com/container-engine/explanation/container-groups/deployment-lifecycle.md) and [autoscaling settings](https://docs.salad.com/container-engine/reference/autoscaling/settings.md) — running-to-ready initialization, group versus worker status, propagation and desired scaling configuration; checked Oct. 23
- [Salad Job Queues](https://docs.salad.com/container-engine/explanation/job-processing/job-queues.md) and [Using Queues](https://docs.salad.com/container-engine/how-to-guides/job-processing/using-queues.md) — four attempts, response-size limit, cancelled work, deletion/detachment and stale-worker behavior; checked Oct. 23
- [Salad stop](https://docs.salad.com/reference/saladcloud-api/container-groups/stop-container-group.md), [delete](https://docs.salad.com/reference/saladcloud-api/container-groups/delete-container-group.md) and [instance list](https://docs.salad.com/reference/saladcloud-api/container-groups/list-container-group-instances.md) — accepted operations and observable instance fields, not an exact billing ledger; checked Oct. 23
- [Salad organization billing](https://docs.salad.com/general/explanation/billing.md) — delayed balance-exhaustion shutdown, possible overrun invoice and project usage graphs; checked Oct. 23
- HostFleet GPU dataset: 21-provider catalog with dataset-wide verification date Sept. 24, 2026. This article separately checks Northflank’s five components on Oct. 14, RunPod/Modal H100 prices on Oct. 15, and Salad’s two Lowest prices on Oct. 23; it does not advance the dataset-wide date or modify the dataset.

*Need an allocated GPU Pod after testing the serverless lifecycle? This is a labeled affiliate link; source citations above remain direct. <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> supports HostFleet at no extra cost to you. Re-check the exact GPU, cloud tier, region, storage, and current price before purchase.*
