---
title: "H100 rental price per hour in 2026: 19 public rates checked"
description: "Nineteen public H100 rates checked September 2026, with Koyeb, Jarvis Labs, Northflank, lifecycle traps, and 720-hour cost estimates."
pubDate: 2026-07-29
updatedDate: 2026-09-03
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card comparison; estimated monthly totals.** This refresh uses official provider pricing pages, public vendor APIs, and HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/). It is not a capacity, latency, throughput, reliability, or current-stock benchmark. All 19 selected H100 price anchors were rechecked against live vendor sources on **September 3, 2026**.

> **Price anchors rechecked:** September 3, 2026, for all 19 rows below<br>
> **Dataset baseline:** September 3, 2026<br>
> **Currency:** public USD on-demand list prices before tax<br>
> **Comparison unit:** one listed GPU-hour or a published per-second/per-minute equivalent<br>
> **Boundary:** a public rate does not prove inventory, quota, regional access, approval, or equal performance

# H100 rental price per hour in 2026: 19 public rates checked

The cheapest selected H100 rate is now a tie: **Hyperstack and Koyeb both publish $2.50 per hour**. That does not make them interchangeable. Hyperstack's row is a one-GPU PCIe VM whose stopped state remains billable. Koyeb's row is a serverless application instance with public-preview scale-to-zero and a documented five-minute default idle period.

Jarvis Labs follows at **$2.69/GPU-hour**, Massed Compute at **$2.73/hour**, Northflank at **$2.74/GPU-hour**, and RunPod Secure Cloud at **$2.89/hour**. Northflank's number is only a GPU component; CPU and memory are extra. The other rows package different resources and lifecycle controls.

This update expands the comparison from 16 to 19 product surfaces by adding Koyeb, Jarvis Labs, and Northflank. It also updates Thunder Compute from **$3.19 to $3.20/GPU-hour**. Every other selected H100 rate matched its live official source in the September 3 full-table check.

## Current H100 price-per-hour comparison

The table is sorted by normalized hourly rate. Per-second prices are multiplied by 3,600 and per-minute prices by 60. Product shape remains visible because a PCIe VM, an SXM machine, a serverless instance, and a managed inference deployment are not equivalent purchases.

| Provider and product | H100 scope | Public list rate | Official evidence and check date |
|---|---|---:|---|
| **Hyperstack** | 1x H100 80 GB PCIe VM; 28 CPU, 180 GB RAM, local storage; Canada | **$2.50/GPU-hr** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), Sept. 3, 2026 |
| **Koyeb** | 1x H100 80 GB serverless instance; 15 vCPU, 180 GB RAM, 320 GB disk | **$2.50/hr** | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 3, 2026 |
| **Jarvis Labs** | 1x H100 80 GB SXM on-demand instance; public row lists 16 vCPU and 200 GB RAM | **$2.69/GPU-hr** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 3, 2026 |
| **Massed Compute** | 1x H100 80 GB on-demand VM; 20 vCPU, 128 GB RAM; storage shown as 1,250 with no unit | **$2.73/hr** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), Sept. 3, 2026 |
| **Northflank** | 1x H100 80 GB managed-cloud GPU component; CPU, memory, disk, and egress separate | **$2.74/GPU-hr** | [Northflank pricing](https://northflank.com/pricing), Sept. 3, 2026 |
| **RunPod Pods** | H100 PCIe Secure Cloud Pod | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 3, 2026 |
| **Thunder Compute** | 1x H100 80 GB PCIe base; 4 vCPU, 32 GB RAM, 100 GB persistent disk included | **$3.20/GPU-hr** | [Thunder pricing](https://www.thundercompute.com/pricing), Sept. 3, 2026 |
| **Verda GPU instance** | 1x H100 80 GB SXM5; selected configuration includes 30 CPU and 120 GB RAM | **$3.25/hr** | [Verda pricing](https://verda.com/pricing), Sept. 3, 2026 |
| **Lambda Cloud** | 1x H100 PCIe VM | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), Sept. 3, 2026 |
| **Novita AI instance** | 1x H100 80 GB SXM; 16 vCPU, 128 GB RAM, 60 GB container-disk quota | **$3.39/GPU-hr** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), Sept. 3, 2026 |
| **Nebius AI Cloud** | 1x H100 SXM/NVLink VM; 16 vCPU, 200 GB RAM; eu-north1 | **$3.85/GPU-hr** | [Nebius pricing](https://nebius.com/prices), Sept. 3, 2026 |
| **Modal** | H100 allocated to a serverless container | **$0.001097/sec** (**$3.9492/hr**) | [Modal pricing](https://modal.com/pricing), Sept. 3, 2026 |
| **DigitalOcean GPU Droplet** | 1x HGX H100; 20 vCPU, 240 GiB RAM, 720 GiB boot, 5 TiB scratch, 15,000 GiB transfer | **$4.41/GPU-hr** | [DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets), Sept. 3, 2026 |
| **Fal custom deployment** | H100 80 GB on-demand custom deployment | **$4.50/hr** | [Fal pricing](https://fal.ai/pricing), Sept. 3, 2026 |
| **RunPod Serverless** | H100 PRO Serverless Flex worker tier; not an exact-card reservation | **$4.79/hr** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 3, 2026 |
| **Replicate private deployment** | H100 managed model deployment | **$0.001525/sec** (**$5.49/hr**) | [Replicate pricing](https://replicate.com/pricing), Sept. 3, 2026 |
| **Paperspace Machine** | 1x H100 80 GB SXM5; 20 vCPU, 250 GB RAM, 50 GB SSD; approval may be required | **$5.95/hr** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Sept. 3, 2026 |
| **CoreWeave Inference** | Single-GPU inference rate for inference-platform customers | **$6.16/GPU-hr** | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 3, 2026 |
| **Baseten deployment** | Managed H100 deployment; 80 GiB VRAM | **$0.10833/min** (**$6.50/hr**) | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 3, 2026 |

The selected range remains **$2.50 to $6.50 per listed GPU-hour**, but it now spans 19 product surfaces. The low end includes a serverless instance and an allocated VM. The high end includes managed inference. Treating the range as a performance ranking would be benchmark theater.

## What the three new rows change

### Koyeb ties for the lowest rate, with a documented idle tail

Koyeb's official pricing page and instance reference both publish **$2.50/hour** for one H100 instance, checked September 3, 2026. The pricing card includes 15 vCPU, 180 GB RAM, and 320 GB disk. GPU availability is region-specific; the public rate is not a stock guarantee.

The operating model changes the cost calculation. Koyeb's scale-to-zero documentation explicitly includes GPU instances and labels the feature **public preview**. A GPU service can set its minimum to zero. The default idle period is five minutes, and the service wakes on a supported inbound request.

At the current H100 rate, the nominal default post-traffic idle tail is an estimate of:

    $2.50/hour × 5/60 hour = $0.2083

That is arithmetic from sourced inputs, not an invoice measurement. It excludes startup, model loading, active processing, storage, and any gradual multi-instance scale-down. A held internet connection prevents the service from becoming idle. HTTP/2 requests cannot wake a sleeping service; WebSocket has a separate limited wake path. Koyeb also counts the configured autoscaling maximum against organization quota even while the service is at zero.

The honest conclusion is narrower than "serverless means free when idle." Koyeb can scale a GPU service to zero, but protocol choice, idle qualification, wake behavior, quota, and public-preview status all belong in the deployment design.

### Jarvis Labs puts an SXM instance near the top

Jarvis Labs publishes **$2.69/GPU-hour** for a one-GPU H100 SXM on-demand instance, checked September 3, 2026. Its public row lists 16 vCPU and 200 GB RAM. On-demand compute bills per minute.

Pausing stops compute billing while preserving data, according to the official SDK documentation. Paused data continues billing at **$0.00014/GB-hour**, verified from the Jarvis Labs FAQ on August 24, 2026. Pausing or deleting releases GPU capacity, so the same card and region are not guaranteed when the workload resumes.

For example, retaining 100 GB for 160 paused hours is an estimated **$2.24**:

    100 GB × $0.00014/GB-hour × 160 hours = $2.24

The example isolates retained data and assumes no other charge. It does not claim current H100 inventory or a future resume success rate.

### Northflank's $2.74 is not an all-in VM

Northflank publishes an H100 component at **$2.74/GPU-hour**, checked September 3, 2026. Managed-cloud GPU use bills by the second once provisioned, but every workload also selects a CPU and memory compute plan. Persistent disk and network egress can add more.

The same pricing page lists CPU at **$0.01667/vCPU-hour** and memory at **$0.00833/GB-hour**, checked September 3, 2026. Northflank does not publish one model-specific minimum CPU/RAM plan for the H100, so HostFleet does not invent an all-in total. The correct formula is:

    all-in compute rate = $2.74 GPU component
                        + selected vCPU × $0.01667/hour
                        + selected memory GB × $0.00833/hour

Disk, egress, tax, and other services sit outside that formula. Northflank's [managed GPU deployment documentation](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md), checked August 31, 2026, also requires at least $50 in account credit before deployment; that is a funding prerequisite, not a quoted minimum charge.

Manual scale-to-zero is documented, but a service at zero instances is unavailable. The autoscaling docs describe configurable minimum and maximum counts, 15-second evaluations, and a five-minute downscale window; they do not establish automatic GPU scale-to-zero or request wake-up. Do not group this row with Koyeb merely because both products use managed application abstractions.

## The only selected price movement was one cent

Thunder Compute's [live pricing page](https://www.thundercompute.com/pricing) and public pricing API agree on **$3.20/GPU-hour** for the one-H100 PCIe base configuration, checked September 3, 2026. HostFleet's check of those same official surfaces on August 23, 2026 recorded the previous selected value of **$3.19/hour**.

The monthly effect is small but should not be hidden:

    ($3.20 - $3.19) × 720 hours = $7.20

The new 720-hour compute estimate is **$2,304.00**, up from $2,296.80. Thunder's base still includes four vCPUs, 32 GB RAM, and 100 GB persistent disk. Its billing documentation says compute bills per minute while the instance runs and deletion stops instance billing.

No selected rate moved by more than 10% in the September 3 full-table verification. That is useful evidence of rate-card stability, not evidence of available capacity or stable invoice totals.

## What one continuously allocated H100 costs for 30 days

These estimates multiply each sourced September 3 rate by **720 hours**. Modal and Baseten use their unrounded native rates. The estimates assume one named product stays billable continuously. They exclude separate CPU/RAM, storage, IP, network, tax, support, commitments, extra replicas, and operational work. They are not quotes or performance comparisons.

| Product shape | Rate used | 720-hour compute estimate |
|---|---:|---:|
| Hyperstack H100 PCIe VM | $2.50/hr | **$1,800.00** |
| Koyeb H100 serverless instance | $2.50/hr | **$1,800.00** |
| Jarvis Labs H100 SXM instance | $2.69/hr | **$1,936.80** |
| Massed Compute H100 VM | $2.73/hr | **$1,965.60** |
| Northflank H100 component only | $2.74/hr | **$1,972.80 plus CPU and memory** |
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,080.80** |
| Thunder Compute H100 PCIe base | $3.20/hr | **$2,304.00** |
| Verda H100 SXM5 instance | $3.25/hr | **$2,340.00** |
| Lambda H100 PCIe VM | $3.29/hr | **$2,368.80** |
| Novita H100 SXM instance | $3.39/hr | **$2,440.80** |
| Nebius H100 SXM/NVLink VM | $3.85/hr | **$2,772.00** |
| Modal H100 container | $0.001097/sec | **$2,843.42** |
| DigitalOcean HGX H100 Droplet | $4.41/hr | **$3,175.20** |
| Fal H100 custom deployment | $4.50/hr | **$3,240.00** |
| RunPod Serverless H100 tier | $4.79/hr | **$3,448.80** |
| Replicate private H100 deployment | $0.001525/sec | **$3,952.80** |
| Paperspace H100 SXM5 Machine | $5.95/hr | **$4,284.00** |
| CoreWeave Inference H100 | $6.16/hr | **$4,435.20** |
| Baseten managed H100 deployment | $0.10833/min | **$4,679.86** |

A 720-hour total is a sensitivity case, not a forecast. It is appropriate only when the product remains billable for all 30 days. Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) when the real question is useful time versus billable time.

## The off switch can reverse the rate ranking

Hourly price matters less when the wrong lifecycle action leaves the GPU meter running.

| Product | Compute-billing boundary | Important residual |
|---|---|---|
| **Hyperstack** | Hibernation deallocates the flavor; a merely stopped VM remains billable | Disks, IPs, and volumes can remain billable |
| **Koyeb** | Eligible public-preview services can reach zero after the idle policy | Wake protocol and idle conditions matter; no GPU cold-start number is claimed |
| **Jarvis Labs** | Pause stops compute billing | Retained data bills; released GPU capacity may not return |
| **Massed Compute** | Active VM total is debited per minute | Confirm the exact stop/delete action before automation |
| **Northflank** | GPU bills by the second once provisioned; manual zero makes the service unavailable | CPU, memory, disk, and egress are separate |
| **RunPod Pods** | Stop or terminate according to the required persistence model | Storage can continue; container-disk data can be erased |
| **Thunder Compute** | Deleting the instance stops instance billing | Confirm snapshot and retained-disk handling |
| **Verda** | Deletion is required; shutdown does not stop compute billing | Retained storage remains separate |
| **DigitalOcean GPU Droplets** | Destroy the Droplet; powering it off does not stop billing | Reserved resources continue charging while powered off |
| **Paperspace Machines** | Power off stops compute billing | Storage, public IPs, and add-ons can continue |
| **Modal and RunPod Serverless** | Workers can return to zero | Startup, idle windows, and warm settings determine billable allocation |

Lifecycle sources retain their own verification dates in the Sources section. This table does not imply that unlisted products lack cleanup controls; it highlights the boundaries with specific checked documentation.

A generic scheduler that calls "stop" is not portable cost control. Record the exact state transition that releases compute, the data consequence, and the resource that remains chargeable.

## Choose product shape before hourly price

### Self-managed capacity

Hyperstack, Jarvis Labs, Massed Compute, RunPod Pods, Thunder, Verda, Lambda, Novita, Nebius, DigitalOcean GPU Droplets, and Paperspace Machines are relevant when the buyer wants a VM, instance, or Pod and accepts responsibility for the image, inference server, authentication, rollout, health checks, logs, and cleanup.

Compare PCIe with SXM/NVLink/HGX, not just "H100." Check included CPU, RAM, local and persistent storage, region, account approval, and release behavior. A low rate is unusable when the available topology or product shape does not fit.

### Serverless and managed application instances

Koyeb, Modal, RunPod Serverless, and Northflank expose different application-level deployment models. Koyeb documents GPU scale-to-zero in public preview. Modal and RunPod publish serverless GPU rates with their own lifecycle controls. Northflank publishes a GPU component and does not establish automatic request-waking from zero.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion when scaling policy matters more than allocated capacity. Use the [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) and [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) for provider-specific billing boundaries.

### Managed inference deployments

Fal, Replicate, CoreWeave Inference, and Baseten offer more opinionated inference surfaces. Higher hourly equivalents may make sense when rollout controls, autoscaling, observability, serving infrastructure, or support replace engineering work. CoreWeave's public rate is specifically for inference-platform customers, not a self-serve one-GPU VM quote.

The [Replicate pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/) shows why setup, idle, and failed deployment work can matter more than prediction runtime.

## Size the workload before renting an H100

An 80 GB H100 is not automatically the right purchase because it is newer. Start with model weights, quantization, runtime overhead, KV-cache demand, context length, batch size, and required throughput. HostFleet's [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) exposes the memory calculation without pretending to benchmark every stack.

If an A100 fits the model and the workload does not need H100-specific throughput or features, compare the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). The older card can be the better infrastructure decision after a bounded workload test.

## H100 buying checklist

1. **Fix the exact hardware requirement.** Record PCIe versus SXM/NVLink/HGX, memory, topology, and minimum GPU count.
2. **Identify what the rate buys.** Separate complete VM totals, GPU components, Pods, serverless workers, and managed deployments.
3. **Confirm account eligibility and capacity.** Check region, quota, approval, credit prerequisites, and live inventory.
4. **Model billable time.** Include startup, model loading, active work, retries, idle windows, scale-down, and warm minimums.
5. **Test the off switch.** Verify whether stop, pause, hibernate, scale-to-zero, delete, or destroy ends compute billing.
6. **Add omitted resources.** Price CPU/RAM, storage, IPs, network, tax, support, and retained data.
7. **Run a bounded deployment test.** Measure provisioning, readiness, throughput, failure recovery, billed duration, and cleanup before production commitment.

## Verdict

**Koyeb and Hyperstack share the lowest selected public H100 rate at $2.50/hour**, verified September 3, 2026. Koyeb is the more elastic documented shape, with public-preview GPU scale-to-zero and a five-minute default idle period. Hyperstack is an allocated PCIe VM whose stopped state remains billable. Equal hourly numbers do not mean equal bills.

**Jarvis Labs is next at $2.69/hour**, with per-minute compute and a pause action that stops compute while retained data continues billing. **Massed Compute follows at $2.73/hour. Northflank's $2.74/hour is a GPU component, not an all-in workload price.**

Thunder's selected rate moved by one cent to **$3.20/hour**, adding only **$7.20** to a 720-hour estimate. That small change reinforces the larger point: product and lifecycle boundaries matter more than a one-cent ranking movement.

The defensible buying order is hardware fit, deployable product shape, current eligibility, billing lifecycle, complete cost, and only then hourly rate.

## Sources

Official pricing sources below were rechecked **September 3, 2026**.

- [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing)
- [Koyeb pricing](https://www.koyeb.com/pricing) and [instance reference](https://www.koyeb.com/docs/reference/instances)
- [Jarvis Labs pricing](https://jarvislabs.ai/pricing)
- [Massed Compute pricing](https://vm.massedcompute.com/pricing)
- [Northflank pricing](https://northflank.com/pricing)
- [RunPod pricing](https://www.runpod.io/pricing)
- [Thunder Compute pricing](https://www.thundercompute.com/pricing)
- [Verda pricing](https://verda.com/pricing)
- [Lambda GPU instances](https://lambda.ai/instances)
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products)
- [Nebius pricing](https://nebius.com/prices)
- [Modal pricing](https://modal.com/pricing)
- [DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets)
- [Fal pricing](https://fal.ai/pricing)
- [Replicate pricing](https://replicate.com/pricing)
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/)
- [CoreWeave pricing](https://www.coreweave.com/pricing)
- [Baseten pricing](https://www.baseten.co/pricing/)

Operating-boundary sources:

- [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — GPU inclusion, public-preview status, idle conditions, wake protocols, and default period; checked August 28, 2026
- [Koyeb autoscaling](https://www.koyeb.com/docs/run-and-scale/autoscaling) — quota and gradual scale-down behavior; checked August 28, 2026
- [Jarvis Labs FAQ](https://docs.jarvislabs.ai/faqs/) and [SDK documentation](https://docs.jarvislabs.ai/sdk/) — per-minute billing, pause, storage, and released capacity; checked August 24, 2026
- [Northflank managed GPU deployment](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md) and [autoscaling](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) — separate compute plan, billing start, credit prerequisite, and scaling boundaries; checked August 31, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped and hibernated lifecycle; checked August 13, 2026
- [Massed Compute billing](https://vm-docs.massedcompute.com/docs/billing/overview) — active-VM per-minute debit; checked August 23, 2026
- [Thunder billing](https://www.thundercompute.com/docs/billing) — running compute and deletion boundary; checked August 22, 2026
- [Verda lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — shutdown, deletion, and retained storage; checked August 15, 2026
- [DigitalOcean Droplet pricing documentation](https://docs.digitalocean.com/products/droplets/details/pricing/) — powered-off billing and destruction; checked August 20, 2026
- [Paperspace Machine limits](https://docs.digitalocean.com/products/paperspace/machines/details/limits/) — H100 approval boundary; checked August 21, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, updated September 3, 2026
- HostFleet full-source verification note — /opt/hostbot/data/ai-hosting/notes/2026-09-03-gpu-pricing-full-verification.md
- HostFleet Koyeb scale-to-zero note — /opt/hostbot/data/ai-hosting/notes/2026-08-28-koyeb-gpu-scale-to-zero-limits.md
- HostFleet Northflank autoscaling note — /opt/hostbot/data/ai-hosting/notes/2026-08-31-northflank-gpu-autoscaling-billing-boundary.md

*Need self-managed H100 capacity? These are labeled affiliate links; the source citations above remain direct. [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod) and [DigitalOcean GPU signup (affiliate)](https://hostfleet.net/go/digitalocean-gpu) support HostFleet at no extra cost to you. Re-check the exact card, region, rate, storage, and shutdown behavior before purchase.*
