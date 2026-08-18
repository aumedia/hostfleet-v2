---
title: "H100 rental price per hour in 2026: 12 public cloud rates checked"
description: "Twelve public H100 cloud rates compared, plus why a cheaper-looking marketplace price can fail the current, launchable-offer test."
pubDate: 2026-07-29
updatedDate: 2026-08-18
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate check; estimated monthly totals.** This is a bounded provider expansion, not a fresh benchmark or a claim that every listed GPU was available to every account. The ten-rate baseline was checked on **August 13, 2026**; Novita was checked on **August 14**, Verda on **August 15**, TensorDock's public evidence on **August 17**, and RunPod's Serverless H100 rate was refreshed on **August 18**. HostFleet measured TensorDock's unauthenticated inventory response only; all performance, reliability, and availability comparisons remain unmeasured.

# H100 rental price per hour in 2026: 12 public cloud rates checked

The cheapest selected public H100 rate in this comparison remains **Hyperstack at $2.50 per GPU-hour** for a one-GPU H100 PCIe VM in Canada. RunPod Secure Cloud follows at **$2.89/hour**. This refresh expands the guide from 10 to 12 public rates by adding **Verda at $3.25/hour** and **Novita AI at $3.39/hour**.

A cheaper-looking number did not make the table. TensorDock publishes a **$2.25/hour typical H100 SXM5 GPU-only rate**, but the vendor labels its table as variable by host and last updated July 24, 2024. CPU, RAM, and storage are extra, and HostFleet could not reproduce a current public host offer on August 17. That is useful market context, but it is not strong enough evidence for a current price winner.

This guide uses the same rate model as [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/): on-demand public prices qualify only when the exact product shape and pricing boundary are clear. A low number is not automatically a launchable one-GPU VM.

> **Latest provider check:** August 18, 2026<br>
> **Full-table baseline:** August 13, 2026, with bounded additions checked August 14-17 and RunPod Serverless refreshed August 18<br>
> **Currency:** public USD list rates before tax<br>
> **Comparison unit:** one listed GPU-hour or its published per-second/per-minute equivalent<br>
> **Boundary:** a public price does not prove current inventory, quota, regional access, or equivalent performance

## Current H100 price-per-hour comparison

The table is sorted by the selected public hourly rate. Per-second and per-minute prices are converted using 3,600 seconds or 60 minutes. The hardware and product shape remain visible because PCIe, SXM/NVLink, a self-managed VM, a serverless worker, and managed serving are not interchangeable purchases.

| Provider and product | H100 scope | Public list rate | Official evidence and check date |
|---|---|---:|---|
| **Hyperstack** | 1x H100 80 GB PCIe VM; Canada | **$2.50/GPU-hr** | [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing), checked Aug. 13, 2026 |
| **RunPod Pods** | H100 PCIe, Secure Cloud, self-managed Pod | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 13, 2026 |
| **Verda GPU instance** | 1x H100 80 GB SXM5; 30 CPU and 120 GB RAM included | **$3.25/hr** | [Verda pricing](https://verda.com/pricing), checked Aug. 15, 2026 |
| **Lambda Cloud** | 1x H100 PCIe VM | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), checked Aug. 13, 2026 |
| **Novita AI instance** | 1x H100 80 GB SXM; 16 vCPU, 128 GB RAM, and 60 GB container disk quota | **$3.39/GPU-hr** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), checked Aug. 14, 2026 |
| **Nebius AI Cloud** | 1x H100 SXM/NVLink VM with prescribed CPU and RAM; eu-north1 | **$3.85/GPU-hr** | [Nebius pricing](https://nebius.com/prices), checked Aug. 13, 2026 |
| **Modal** | H100 allocated to a serverless container | **$0.001097/sec** (**$3.9492/hr**) | [Modal pricing](https://modal.com/pricing), checked Aug. 13, 2026 |
| **Fal** | H100 80 GB custom deployment | **$4.50/hr** | [Fal pricing](https://fal.ai/pricing), checked Aug. 13, 2026 |
| **RunPod Serverless** | H100 worker tier; not an exact-card reservation | **$4.79/hr** | [RunPod pricing](https://www.runpod.io/pricing), checked Aug. 18, 2026 |
| **Replicate** | Private H100 model deployment | **$0.001525/sec** (**$5.49/hr**) | [Replicate pricing](https://replicate.com/pricing), checked Aug. 13, 2026 |
| **CoreWeave Inference** | Single-GPU inference rate for inference-platform customers | **$6.16/GPU-hr** | [CoreWeave pricing](https://www.coreweave.com/pricing), checked Aug. 13, 2026 |
| **Baseten** | Managed H100 deployment; 80 GiB VRAM | **$0.10833/min** (**$6.50/hr**) | [Baseten pricing](https://www.baseten.co/pricing/), checked Aug. 13, 2026 |

The selected public-rate range is **$2.50 to $6.50 per listed GPU-hour**. That is a normalized price range across 12 products, not evidence that all 12 expose the same capacity, surrounding resources, control plane, stock, or support.

## What the two new qualifying rates change

### Verda becomes the third-lowest selected rate

Verda, formerly DataCrunch, publishes a one-GPU H100 SXM5 configuration at **$3.25/hour**, checked August 15, 2026. The selected configuration includes **30 CPU and 120 GB RAM**; a second H100 configuration with 32 CPU and 185 GB RAM carries the same published rate. Storage is separate.

The billing lifecycle matters more than the four-cent gap to Lambda. Verda's Cloud Console uses prepaid 10-minute billing increments and says unused time is refunded in the next billing period when a resource is terminated early. Shutting down the instance does **not** stop compute billing. The instance must be deleted, while retained storage continues to charge. Those terms were checked on the official [Verda billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing/) and [instance lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) on August 15, 2026.

Verda therefore belongs in the shortlist for an operator who wants a self-managed SXM5 VM and can make deletion part of the cost-control runbook. Its $3.25 rate is not a scale-to-zero claim and does not establish current stock.

### Novita adds a lower-cost SXM catalog offer with observed, volatile stock

Novita's official marketplace API exposed a one-GPU H100 80 GB SXM product at **$3.39/hour** on August 14, 2026. Its fixed product shape included **16 vCPU, 128 GB RAM, and a 60 GB free container-disk quota**. Public inventory reported low availability, with a maximum of two GPUs in California and Iceland at capture time.

That availability observation is volatile. It shows that the catalog row was connected to nonzero public inventory during the check; it does not promise that two cards remain available now. Novita says compute is billed per second and settled hourly, beginning after instance creation succeeds and image pulling starts, and ending when the instance is stopped. Disk above the free container quota and volume storage are separate charges. These terms were checked against Novita's [GPU instance pricing documentation](https://novita.ai/docs/guides/gpu-instance-pricing) on August 14, 2026.

Novita is now the fifth-lowest selected rate, behind Lambda by 10 cents per hour. The useful distinction is not that small price gap; it is SXM versus PCIe, included resources, live regional capacity, and whether Novita's stop-based billing fits the deployment workflow.

## Why TensorDock's advertised $2.25 H100 rate is excluded

TensorDock is a marketplace of independent hosts, not one uniform cloud inventory. Its public GPU table says hosts set pricing and labels the figures as **typical hourly prices that vary by host**. The H100 SXM5 reference is **$2.25/hour**, but that table is marked **Last Updated: July 24, 2024** and tells buyers to check the dashboard for live pricing and availability. HostFleet accessed the page on August 17, 2026.

Three evidence problems prevent that number from replacing Hyperstack as the selected low:

1. **It is dated reference pricing.** A table last updated in 2024 cannot establish the current cheapest H100 rental in August 2026.
2. **It is GPU-only.** TensorDock says CPU, RAM, and storage are configured and billed separately. The public table also contains an unresolved RAM-minimum contradiction, so HostFleet does not manufacture an all-in VM total from it.
3. **No current public offer was reproducible.** On August 17, the documented unauthenticated inventory endpoint returned success with an empty host list, and the unauthenticated dashboard query also returned no GPUs. This is a bounded measurement of public responses, not proof that logged-in users have no inventory.

TensorDock also documents sharp lifecycle boundaries. Stopping a VM without releasing its GPU continues billing at the running-server rate; releasing the GPU reduces the bill to storage only. A depleted prepaid balance causes servers to be deleted automatically. Its reliability policy distinguishes Top Hosts from Standard Hosts and says Standard Hosts may have little or no redundancy, recommending offsite backups, load balancing across hosts for inference, and checkpoints for training.

The conclusion is not that TensorDock is bad or that $2.25 never appears. The conclusion is narrower: **HostFleet cannot call it a current, reproducible H100 rental price from the public evidence available on August 17.** It stays outside the ranked table until a current host/configuration price or official live catalog feed is reproducible.

## What one continuously allocated H100 costs for 30 days

These figures are estimates, not vendor quotes. Each multiplies the public hourly rate, or the vendor's unrounded per-second rate, by **720 hours** for a 30-day month. They assume one listed product remains billable continuously. They exclude storage, public IPs, network transfer where charged, taxes, support, commitments, additional replicas, and operational overhead.

| Product shape | Rate used | 720-hour compute estimate |
|---|---:|---:|
| Hyperstack 1x H100 PCIe VM | $2.50/hr | **$1,800.00** |
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,080.80** |
| Verda 1x H100 SXM5 instance | $3.25/hr | **$2,340.00** |
| Lambda 1x H100 PCIe VM | $3.29/hr | **$2,368.80** |
| Novita 1x H100 SXM instance | $3.39/hr | **$2,440.80** |
| Nebius 1x H100 SXM/NVLink VM | $3.85/hr | **$2,772.00** |
| Modal H100 container | $0.001097/sec | **$2,843.42** |
| Fal H100 custom deployment | $4.50/hr | **$3,240.00** |
| RunPod Serverless H100 tier | $4.79/hr | **$3,448.80** |
| Replicate private H100 deployment | $0.001525/sec | **$3,952.80** |
| CoreWeave Inference H100 | $6.16/hr | **$4,435.20** |
| Baseten managed H100 deployment | $0.10833/min | **$4,679.86** |

Modal's estimate uses $0.001097 × 3,600 × 720. Baseten's uses $0.10833 × 60 × 720. The other estimates use displayed hourly rates. Small differences from a provider invoice can result from native billing precision, rounding, minimum increments, and resources outside the GPU line.

For a workload that releases the GPU between jobs, 720-hour math is the wrong forecast. Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to expose the allocation assumption, then add startup, model-loading, idle-timeout, retry, and minimum-capacity behavior for the actual product.

## Choose by product shape before price

### Self-managed one-GPU capacity

Hyperstack, RunPod Pods, Verda, Lambda, Novita, and Nebius are the most relevant rows when the buyer wants a one-GPU VM or Pod and is prepared to own the image, inference server, authentication, rollout, health checks, logging, and lifecycle controls.

Do not sort these six by price alone. Confirm PCIe versus SXM/NVLink, the exact region, included CPU and RAM, root and persistent storage, image workflow, account quota, and what action actually ends compute billing. Verda requires deletion; Novita documents stop as the end of compute billing; Hyperstack keeps a stopped VM billable because the hardware remains reserved.

[RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the operational and cost boundary between a continuously allocated Pod and a Serverless worker.

### Bursty serverless allocation

Modal and RunPod Serverless can align spend with billable allocation when the worker really returns to zero. Their hourly equivalents are normalization tools, not a prediction of the bill for a bursty workload. Image pulls, model loading, concurrency, retries, idle windows, minimum workers, and warm pools can dominate low-utilization cost.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion when the decision is about worker controls rather than bare capacity.

### Managed inference deployment

Fal, Replicate, CoreWeave Inference, and Baseten expose more opinionated deployment surfaces. Their higher hourly equivalents can make sense when autoscaling, rollout controls, serving infrastructure, or support replace enough engineering work. CoreWeave's public $6.16 rate is specifically for inference-platform customers, not evidence that any developer can launch a self-serve one-GPU VM.

Compare the operational work removed, not just the GPU line. Paying a managed-serving premium while configuring one replica to remain warm all month can be rational, but it should be a deliberate platform decision.

## H100 or A100: check memory and workload before upgrading

An 80 GB H100 is not automatically the right purchase because it is newer. Start with model weights, quantization, KV-cache needs, batch size, context length, runtime overhead, and required throughput. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains capacity sizing without pretending to benchmark every runtime.

If 40 GB or 80 GB A100 capacity fits and the workload does not need H100-specific throughput or features, compare the [current A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). A cheaper older GPU can still be the better infrastructure choice when it meets latency and throughput targets in a real deployment test.

## A six-check H100 buying sequence

1. **Fix the hardware requirement.** Record H100 PCIe versus SXM/NVLink, 80 GB memory, topology, and smallest acceptable GPU count.
2. **Confirm the deployable shape.** Determine whether the rate buys a one-GPU VM, a Pod, a serverless worker tier, or an account-gated inference allocation.
3. **Prove current capacity.** Check region, quota, account eligibility, and live inventory. A rate card proves a price boundary, not stock.
4. **Test the off switch.** Document whether stop, release, hibernate, scale-to-zero, or delete ends GPU billing and what data survives.
5. **Price missing resources.** Add storage, public IPs, CPU/RAM where separate, network transfer, support, taxes, and replicas.
6. **Run a bounded deployment test.** Measure provisioning, image pull, model-load time, time-to-ready, billed duration, failure recovery, and cleanup before committing production traffic.

## Verdict

**Hyperstack remains the selected public-rate leader at $2.50 per GPU-hour**, or an estimated **$1,800 for 720 allocated hours**, based on its one-GPU H100 PCIe flavor checked August 13, 2026. Its important catch is that stopping the VM does not stop compute billing.

**RunPod Secure Cloud remains second at $2.89/hour. Verda enters third at $3.25/hour, and Novita enters fifth at $3.39/hour.** Verda is the more clearly specified new SXM5 configuration, with CPU and RAM included but deletion required to stop compute billing. Novita exposed a lower-resource SXM product with low, nonzero public inventory during the August 14 capture; that stock observation can change at any time.

**TensorDock's $2.25 typical H100 reference does not become the winner.** It is a host-variable, GPU-only figure from a table last updated in 2024, and no current unauthenticated public offer was reproducible on August 17. That is exactly the kind of number a buyer should investigate without treating it as a launchable quote.

The useful order is hardware fit, deployable product shape, current eligibility, billing lifecycle, complete cost, and then hourly price. A cheaper H100 line is only cheaper when it describes capacity the account can actually launch and operate safely.

## Sources

- [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) — H100 PCIe public rate; checked August 13, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped, hibernated, and deleted billing behavior; checked August 13, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pod rate checked August 13 and Serverless H100 rate refreshed August 18, 2026
- [Verda GPU instance pricing](https://verda.com/pricing) — H100 SXM5 configuration, included CPU/RAM, and separate storage price; checked August 15, 2026
- [Verda pricing and billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing/) — pay-as-you-go billing increments; checked August 15, 2026
- [Verda instance lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — shutdown, deletion, and retained-storage billing; checked August 15, 2026
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products) — H100 product, fixed resources, price, and observed inventory; checked August 14, 2026
- [Novita GPU instance pricing](https://novita.ai/docs/guides/gpu-instance-pricing) — per-second compute and storage billing boundaries; checked August 14, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — one-GPU H100 PCIe rate; checked August 13, 2026
- [Nebius pricing](https://nebius.com/prices) — unified one-GPU H100 SXM/NVLink VM rate; checked August 13, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate; checked August 13, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment on-demand rate; checked August 13, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 deployment rate; checked August 13, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — H100 single-GPU inference rate and eligibility boundary; checked August 13, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — managed H100 deployment rate; checked August 13, 2026
- [TensorDock marketplace pricing](https://www.tensordock.com/cloud-gpus.html) — dated typical GPU-only rates, separate-resource scope, billing, and host-set pricing; checked August 17, 2026
- [TensorDock Core Compute documentation](https://docs.tensordock.com/virtual-machines/introduction-to-core-compute-vms.md) — storage and restart behavior; checked August 17, 2026
- [TensorDock downtime policy](https://docs.tensordock.com/legal-information/downtime-compensation.md) — host tiers and reliability guidance; checked August 17, 2026
- [TensorDock public API documentation](https://documenter.getpostman.com/view/20973002/2s8YzMYRDc) — inventory endpoint and release billing behavior; checked August 17, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, full-table baseline August 13 with additions checked August 14-15 and RunPod Serverless H100 refreshed August 18, 2026
- HostFleet Novita verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-14-novita-gpu-pricing.md`
- HostFleet Verda verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-15-verda-datacrunch-gpu-pricing.md`
- HostFleet TensorDock verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-17-tensordock-gpu-pricing.md`

*Need a self-managed H100 endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: <a href="https://hostfleet.net/go/runpod" rel="sponsored nofollow">RunPod (+$5 credit on your first $10)</a>. Links are labeled, and source citations in this article are never affiliate links.*
