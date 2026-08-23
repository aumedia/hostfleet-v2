---
title: "H100 rental price per hour in 2026: 16 public cloud rates checked"
description: "Sixteen public H100 rates compared, including Massed Compute, Thunder, DigitalOcean, and Paperspace, with billing lifecycle and 720-hour cost boundaries."
pubDate: 2026-07-29
updatedDate: 2026-08-23
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card comparison; estimated monthly totals.** This refresh uses official provider pages, public vendor APIs, and HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/). It is not a capacity, latency, throughput, reliability, or current-stock benchmark. All 16 price anchors were rechecked against the vendors' live pricing surfaces on **August 23, 2026**. Lifecycle, eligibility, and experiment notes retain their own evidence dates.

# H100 rental price per hour in 2026: 16 public cloud rates checked

The lowest selected public H100 rate remains **Hyperstack at $2.50 per GPU-hour** for a one-GPU H100 PCIe VM. **Massed Compute now follows at $2.73/hour**, RunPod Secure Cloud is **$2.89/hour**, and Thunder Compute is **$3.19/GPU-hour**. These are four different VM or Pod configurations, not equivalent performance results.

This update expands the ranked comparison from 12 to 16 product surfaces by adding Massed Compute, Thunder Compute, DigitalOcean GPU Droplets, and Paperspace Machines. DigitalOcean and Paperspace share a parent company, but they remain separate products with different configurations and shutdown rules. A provider logo is not a billing model.

> **Price anchors rechecked:** August 23, 2026, for all 16 rows below
> **Dataset baseline:** August 13, 2026; later provider additions keep their own check dates
> **Currency:** public USD list rates before tax
> **Comparison unit:** one listed GPU-hour or the published per-second/per-minute equivalent
> **Boundary:** a public rate does not prove inventory, quota, regional access, approval, or equal performance

## Current H100 price-per-hour comparison

The table is sorted by normalized hourly rate. Per-second prices are multiplied by 3,600 and per-minute prices by 60. The product shape stays visible because an H100 PCIe VM, an SXM/NVLink machine, a serverless worker, and a managed inference deployment are not interchangeable purchases.

| Provider and product | H100 scope | Public list rate | Official evidence and check date |
|---|---|---:|---|
| **Hyperstack** | 1x H100 80 GB PCIe VM; Canada | **$2.50/GPU-hr** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), rechecked Aug. 23, 2026 |
| **Massed Compute** | 1x H100 80 GB VM; 20 vCPU, 128 GB RAM, and a vendor-listed 1,250 storage allocation whose unit is not stated | **$2.73/hr** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), checked Aug. 23, 2026 |
| **RunPod Pods** | H100 PCIe Secure Cloud Pod | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing), rechecked Aug. 23, 2026 |
| **Thunder Compute** | 1x H100 80 GB PCIe base configuration; 4 vCPU, 32 GB RAM, and 100 GB persistent disk included | **$3.19/GPU-hr** | [Thunder pricing](https://www.thundercompute.com/pricing), rechecked Aug. 23, 2026 |
| **Verda GPU instance** | 1x H100 80 GB SXM5; selected configuration includes 30 CPU and 120 GB RAM | **$3.25/hr** | [Verda pricing](https://verda.com/pricing), rechecked Aug. 23, 2026 |
| **Lambda Cloud** | 1x H100 PCIe VM | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), rechecked Aug. 23, 2026 |
| **Novita AI instance** | 1x H100 80 GB SXM; 16 vCPU, 128 GB RAM, and 60 GB container-disk quota | **$3.39/GPU-hr** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), rechecked Aug. 23, 2026 |
| **Nebius AI Cloud** | 1x H100 SXM/NVLink VM with 16 vCPU and 200 GB RAM; eu-north1 | **$3.85/GPU-hr** | [Nebius pricing](https://nebius.com/prices), rechecked Aug. 23, 2026 |
| **Modal** | H100 allocated to a serverless container | **$0.001097/sec** (**$3.9492/hr**) | [Modal pricing](https://modal.com/pricing), rechecked Aug. 23, 2026 |
| **DigitalOcean GPU Droplet** | 1x HGX H100; 20 vCPU, 240 GiB RAM, 720 GiB boot, 5 TiB scratch, and 15,000 GiB transfer | **$4.41/GPU-hr** | [DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets), rechecked Aug. 23, 2026 |
| **Fal custom deployment** | H100 80 GB on-demand custom deployment | **$4.50/hr** | [Fal pricing](https://fal.ai/pricing), rechecked Aug. 23, 2026 |
| **RunPod Serverless** | H100 worker tier; not an exact-card reservation | **$4.79/hr** | [RunPod pricing](https://www.runpod.io/pricing), rechecked Aug. 23, 2026 |
| **Replicate private deployment** | H100 managed model deployment | **$0.001525/sec** (**$5.49/hr**) | [Replicate pricing](https://replicate.com/pricing), rechecked Aug. 23, 2026 |
| **Paperspace Machine** | 1x H100 80 GB SXM5; 20 vCPU, 250 GB RAM, and 50 GB SSD included; approval may be required | **$5.95/hr** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), rechecked Aug. 23, 2026 |
| **CoreWeave Inference** | Single-GPU inference rate for inference-platform customers | **$6.16/GPU-hr** | [CoreWeave pricing](https://www.coreweave.com/pricing), rechecked Aug. 23, 2026 |
| **Baseten deployment** | Managed H100 deployment; 80 GiB VRAM | **$0.10833/min** (**$6.50/hr**) | [Baseten pricing](https://www.baseten.co/pricing/), rechecked Aug. 23, 2026 |

The selected public-rate range remains **$2.50 to $6.50 per listed GPU-hour**. That range now spans 16 product surfaces. It does not say that every account can launch them, that the surrounding resources are equal, or that the cheapest row delivers the best workload-level economics.

## What the four additions change

### Massed Compute enters second with a complete VM total

Massed Compute's live on-demand catalog lists a one-GPU H100 80 GB VM at **$2.73/hour**, checked August 23, 2026. The published configuration includes 20 vCPU, 128 GB RAM, and a storage allocation displayed as 1,250; the public table does not identify the storage unit, so HostFleet does not invent one. The same page separately lists a one-GPU H100 NVL at $3.11/hour.

The vendor labels the $2.73 figure as an on-demand VM total, says the on-demand catalog has no bandwidth charges or long-term contracts, and publishes fixed CPU and RAM with the rate. Its [billing documentation](https://vm-docs.massedcompute.com/docs/billing/overview), checked August 23, says an active VM's hourly total is divided by 60 and debited each minute. This public rate does not prove current stock, region access, quota, or an exact stop-versus-delete lifecycle; confirm those before automating cleanup.

### Thunder Compute enters fourth, but read the base-rate boundary

Thunder's current pricing page and unauthenticated pricing API both returned **$3.19/GPU-hour** for the one-GPU H100 PCIe configuration on August 23, 2026. The base includes four vCPUs, **32 GB RAM** at 8 GB per included vCPU, and **100 GB persistent disk**. Additional vCPUs cost **$0.04/vCPU-hour** according to the same [official pricing page](https://www.thundercompute.com/pricing), rechecked August 23. The H100 can use the included four-vCPU minimum, so HostFleet does not need to add a CPU surcharge to reach a launchable minimum configuration.

Thunder bills compute per minute while an instance runs. Its [billing documentation](https://www.thundercompute.com/docs/billing), checked August 22, says deleting an instance stops billing. The checked technical specification places the service in North America; the public sources do not establish current H100 inventory, quota, or provisioning time.

Two lower Thunder numbers are intentionally excluded. A stale Thunder-authored search/blog reference says **$2.19/hour**, while the current pricing page and public API agree on $3.19. The API also exposes an undefined `h100_native` key at **$2.49**, but neither the customer-facing price page nor public specification API maps it to a launchable configuration. A price key without a defined product is not a usable quote.

### DigitalOcean adds the largest included-resource bundle in the new set

DigitalOcean lists its one-GPU HGX H100 Droplet at an on-demand **$4.41/GPU-hour**, rechecked August 23, 2026. The same live page shows a lower **$3.26/GPU-hour** 12-month rate; that commitment price is excluded from this on-demand ranking. This is a fixed VM price, not a GPU-only component: it includes 20 vCPU, 240 GiB RAM, a 720 GiB NVMe boot disk, 5 TiB of NVMe scratch storage, and 15,000 GiB of outbound transfer. The official pricing surface says the displayed rate became effective August 1, 2026.

The lifecycle catch is sharp. [DigitalOcean's Droplet pricing documentation](https://docs.digitalocean.com/products/droplets/details/pricing/), checked August 20, says on-demand GPU Droplets bill per second with a 60-second or **$0.01** minimum, and powering a Droplet off does not stop billing. The charge ends when the Droplet is destroyed because the powered-off resource remains reserved.

DigitalOcean therefore fits a continuously allocated VM better than a workload whose cost plan assumes stop/start savings. The listed catalog regions—NYC2, AMS3, and TOR1—are not evidence of live capacity.

### Paperspace adds another SXM5 machine with a different off switch

Paperspace lists a one-GPU H100 SXM5 Machine at **$5.95/hour**, rechecked against the official live price table on August 23, 2026. The fixed configuration includes 20 vCPU, 250 GB RAM, and 50 GB SSD. Paperspace's [Machine limits](https://docs.digitalocean.com/products/paperspace/machines/details/limits/), checked August 21, says H100 access may require approval and that requests typically take one to two business days. That is an eligibility boundary, not a capacity promise.

Unlike DigitalOcean GPU Droplets, powering a Paperspace Machine off stops its compute charge. Attached storage, public IP addresses, and other add-ons continue billing until those resources are destroyed. Paperspace also says Machine ingress and egress bandwidth are free. These terms come from the [official Paperspace pricing documentation](https://docs.digitalocean.com/products/paperspace/pricing/), rechecked August 23.

The two DigitalOcean-owned products should not be merged into one line: they expose different configurations, billing units, approval paths, and powered-off behavior.

## Why TensorDock's advertised $2.25 does not become the winner

TensorDock publishes a **$2.25/hour typical H100 SXM5 GPU-only rate**, but its public table says host pricing varies and is marked last updated July 24, 2024. CPU, RAM, and storage are extra. **Measured, non-generalizable observation:** HostFleet could not reproduce a current unauthenticated public H100 offer during the August 17, 2026 check recorded in its local TensorDock experiment note.

That does not prove logged-in inventory is empty or that $2.25 never appears. It means the dated marketplace reference fails the current, reproducible, sufficiently specified test used for the ranked table. The vendor reference remains [TensorDock's marketplace pricing page](https://www.tensordock.com/cloud-gpus.html), rechecked August 23, 2026; the separate HostFleet experiment note supports only the dated August 17 non-reproduction observation.

## What one continuously allocated H100 costs for 30 days

These are estimates, not vendor quotes. Each line multiplies the sourced rate above by **720 hours** for a 30-day planning month. Modal and Baseten use their unrounded native rates. The estimates assume one listed product remains billable continuously and exclude storage or CPU/RAM where separate, IPs, network overages, taxes, support, commitments, additional replicas, and operational overhead. They do not claim equal throughput.

| Product shape | Rate used | 720-hour compute estimate |
|---|---:|---:|
| Hyperstack 1x H100 PCIe VM | $2.50/hr | **$1,800.00** |
| Massed Compute 1x H100 VM | $2.73/hr | **$1,965.60** |
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,080.80** |
| Thunder Compute H100 PCIe minimum configuration | $3.19/hr | **$2,296.80** |
| Verda 1x H100 SXM5 instance | $3.25/hr | **$2,340.00** |
| Lambda 1x H100 PCIe VM | $3.29/hr | **$2,368.80** |
| Novita 1x H100 SXM instance | $3.39/hr | **$2,440.80** |
| Nebius 1x H100 SXM/NVLink VM | $3.85/hr | **$2,772.00** |
| Modal H100 container | $0.001097/sec | **$2,843.42** |
| DigitalOcean 1x HGX H100 Droplet | $4.41/hr | **$3,175.20** |
| Fal H100 custom deployment | $4.50/hr | **$3,240.00** |
| RunPod Serverless H100 tier | $4.79/hr | **$3,448.80** |
| Replicate private H100 deployment | $0.001525/sec | **$3,952.80** |
| Paperspace 1x H100 SXM5 Machine | $5.95/hr | **$4,284.00** |
| CoreWeave Inference H100 | $6.16/hr | **$4,435.20** |
| Baseten managed H100 deployment | $0.10833/min | **$4,679.86** |

The arithmetic is transparent: Massed Compute is 720 × $2.73; Thunder is 720 × $3.19; DigitalOcean is 720 × $4.41; Paperspace is 720 × $5.95. Modal is $0.001097 × 3,600 × 720, and Baseten is $0.10833 × 60 × 720. Native invoice precision, minimum billing increments, and non-GPU resources can produce a different total.

For a workload that releases its GPU between jobs, 720-hour math is the wrong forecast. Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to expose the allocation assumption, then add startup, model-loading, idle-timeout, retry, and minimum-capacity behavior for the actual product.

## The off switch can reverse the price ranking

The table normalizes rates, but lifecycle determines billable time:

- **Hyperstack:** a stopped VM remains billable because the hardware stays reserved; hibernation deallocates the flavor, while retained disks, IPs, and volumes can still charge.
- **Massed Compute:** the published hourly VM total is debited per minute while a VM is active; confirm the exact stop or deletion state that ends the active charge.
- **RunPod Pods:** allocated compute and persistent storage require explicit shutdown and deletion discipline.
- **Thunder Compute:** compute bills per minute while the instance runs; deletion stops instance billing. Confirm disk and snapshot treatment before automating cleanup.
- **Verda:** shutting down does not stop compute billing; delete the instance, while retained storage remains separate.
- **Novita:** compute billing ends when the instance is stopped; storage remains its own lifecycle.
- **DigitalOcean GPU Droplets:** powering off does not stop billing; destroy the Droplet to release the reserved resources.
- **Paperspace Machines:** powering off stops compute billing, but attached storage, public IPs, and other add-ons can continue.
- **Modal and RunPod Serverless:** workers can return to zero, but startup, execution, idle windows, and warm-pool settings still decide billable allocation.

A generic scheduler that calls `stop` is not portable cost control. Write down the exact state transition that releases the GPU, what data survives it, and which retained resources keep billing.

## Choose by product shape before price

### Self-managed one-GPU capacity

Hyperstack, Massed Compute, RunPod Pods, Thunder Compute, Verda, Lambda, Novita, Nebius, DigitalOcean GPU Droplets, and Paperspace Machines are the relevant rows when the buyer wants a VM or Pod and accepts responsibility for the image, inference server, authentication, rollout, health checks, logging, and cleanup.

Do not sort these ten products by price alone. Confirm PCIe versus SXM/NVLink/HGX, exact region, included CPU and RAM, local versus persistent storage, account quota, approval, and the action that ends compute billing. Thunder's $3.19 base is a compact PCIe configuration; DigitalOcean's $4.41 line bundles much more local storage and transfer; Paperspace's $5.95 line is SXM5 and may require approval. Those are different buying shapes.

[RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the operational boundary between a continuously allocated Pod and a Serverless worker.

### Bursty serverless allocation

Modal and RunPod Serverless can align spend with billable allocation when the worker truly returns to zero. Their hourly equivalents normalize rate cards; they do not predict the bill for a bursty endpoint. Image pulls, model loading, concurrency, retries, idle windows, minimum workers, and warm pools can dominate low-utilization cost.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion when the decision is about scaling controls rather than bare capacity.

### Managed inference deployment

Fal, Replicate, CoreWeave Inference, and Baseten expose more opinionated deployment surfaces. Their higher hourly equivalents may be rational when autoscaling, rollout controls, serving infrastructure, observability, or support replace enough engineering work. CoreWeave's public $6.16 rate is specifically for inference-platform customers, not evidence of a self-serve one-GPU VM.

Compare the operational work removed, account eligibility, minimum replicas, and idle behavior—not just the GPU line.

## H100 or A100: size the workload first

An 80 GB H100 is not automatically the right purchase because it is newer. Start with model weights, quantization, KV-cache needs, batch size, context length, runtime overhead, and required throughput. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains capacity sizing without pretending to benchmark every runtime.

If 40 GB or 80 GB A100 capacity fits and the workload does not need H100-specific throughput or features, compare the [current A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). A cheaper older GPU can be the better infrastructure choice when it meets latency and throughput targets in a bounded deployment test.

## A six-check H100 buying sequence

1. **Fix the hardware requirement.** Record H100 PCIe versus SXM/NVLink/HGX, 80 GB memory, topology, and the smallest acceptable GPU count.
2. **Confirm the deployable shape.** Determine whether the rate buys a complete VM, a GPU base plus components, a Pod, a serverless tier, or an account-gated managed deployment.
3. **Prove current capacity.** Check region, quota, account eligibility, approval, and live inventory. A rate card is not stock evidence.
4. **Test the off switch.** Document whether stop, release, hibernate, scale-to-zero, or delete ends GPU billing and what data survives.
5. **Price missing resources.** Add storage, IPs, CPU/RAM where separate, network transfer, support, taxes, and required replicas.
6. **Run a bounded deployment test.** Measure provisioning, image pull, model-load time, time-to-ready, billed duration, failure recovery, and cleanup before committing production traffic.

## Verdict

**Hyperstack remains the selected public-rate leader at $2.50 per GPU-hour**, or an estimated **$1,800 for 720 allocated hours**, based on its one-GPU H100 PCIe VM rechecked August 23, 2026. The catch is lifecycle: stopping the VM does not stop compute billing.

**Massed Compute enters second at $2.73/hour, RunPod Secure Cloud is third at $2.89/hour, and Thunder Compute is fourth at $3.19/hour.** Massed Compute publishes a complete one-GPU VM total, but its public table leaves the storage unit unstated. Thunder's current page and public API agree, and its minimum H100 configuration does not require paid CPU above the included four vCPUs. Its price is still a rate-card fact, not a capacity or performance claim.

**DigitalOcean at $4.41/hour and Paperspace at $5.95/hour add two very different DigitalOcean-owned product surfaces.** DigitalOcean bundles a large fixed HGX VM but bills a powered-off Droplet until destruction. Paperspace offers an SXM5 Machine whose compute charge stops when powered off, while add-ons can continue and H100 access may require approval.

The defensible buying order is hardware fit, deployable product shape, current eligibility, billing lifecycle, complete cost, and only then hourly rate. The cheapest H100 line is useful only when it describes capacity the account can actually launch and operate safely.

## Sources

- [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) — H100 PCIe VM rate; rechecked August 23, 2026
- [Massed Compute pricing](https://vm.massedcompute.com/pricing) — one-GPU H100 VM rate and included CPU/RAM boundary; checked August 23, 2026
- [Massed Compute billing](https://vm-docs.massedcompute.com/docs/billing/overview) — active-VM per-minute debit from the published hourly total; checked August 23, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped, hibernated, and deleted billing; checked August 13, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pod and Serverless H100 rates; rechecked August 23, 2026
- [Thunder Compute pricing](https://www.thundercompute.com/pricing) — H100 rate, included vCPU/RAM/disk, additional CPU price, and per-minute billing; rechecked August 23, 2026
- [Thunder Compute public pricing API](https://api.thundercompute.com:8443/v1/pricing) — current H100 and component keys; rechecked August 23, 2026
- [Thunder Compute public specification API](https://api.thundercompute.com:8443/v1/specs) — selectable H100 configurations; checked August 22, 2026
- [Thunder Compute billing](https://www.thundercompute.com/docs/billing) — running-instance and deletion boundary; checked August 22, 2026
- [Thunder Compute technical specifications](https://www.thundercompute.com/docs/technical-specs) — location, disk, and networking scope; checked August 22, 2026
- [Verda GPU pricing](https://verda.com/pricing) — H100 SXM5 rate and included CPU/RAM; rechecked August 23, 2026
- [Verda billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing/) — pay-as-you-go increments; checked August 15, 2026
- [Verda lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — shutdown, deletion, and retained storage; checked August 15, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — one-GPU H100 PCIe rate; rechecked August 23, 2026
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products) — H100 product, resources, rate, and observed inventory; rechecked August 23, 2026
- [Novita GPU instance pricing](https://novita.ai/docs/guides/gpu-instance-pricing) — compute and storage billing boundaries; checked August 14, 2026
- [Nebius pricing](https://nebius.com/prices) — unified one-GPU H100 SXM/NVLink VM rate; rechecked August 23, 2026
- [Modal pricing](https://modal.com/pricing) — H100 per-second rate; rechecked August 23, 2026
- [DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets) — one-GPU H100 on-demand and 12-month rates plus complete configuration; rechecked August 23, 2026
- [DigitalOcean Droplet pricing documentation](https://docs.digitalocean.com/products/droplets/details/pricing/) — per-second minimum, powered-off billing, destruction, and transfer billing; checked August 20, 2026
- [DigitalOcean GPU availability](https://docs.digitalocean.com/products/droplets/details/gpu-availability/) — catalog regions; checked August 20, 2026
- [Fal pricing](https://fal.ai/pricing) — H100 custom-deployment rate; rechecked August 23, 2026
- [Replicate pricing](https://replicate.com/pricing) — private H100 deployment rate; rechecked August 23, 2026
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) — H100 Machine rate, included resources, powered-off billing, storage, and bandwidth; rechecked August 23, 2026
- [Paperspace Machine limits](https://docs.digitalocean.com/products/paperspace/machines/details/limits/) — H100 approval and operational limits; checked August 21, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — H100 inference rate and eligibility; rechecked August 23, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — managed H100 deployment rate; rechecked August 23, 2026
- [TensorDock marketplace pricing](https://www.tensordock.com/cloud-gpus.html) — dated typical GPU-only reference; rechecked August 23, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`
- HostFleet TensorDock experiment note — `/opt/hostbot/data/ai-hosting/notes/2026-08-17-tensordock-gpu-pricing.md`
- HostFleet Massed Compute verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-23-massed-compute-gpu-pricing.md`
- HostFleet DigitalOcean verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-20-digitalocean-gpu-droplet-pricing.md`
- HostFleet Paperspace verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-21-paperspace-gpu-machine-pricing.md`
- HostFleet Thunder Compute verification note — `/opt/hostbot/data/ai-hosting/notes/2026-08-22-thunder-compute-gpu-pricing.md`

*Need self-managed H100 capacity? These are labeled affiliate links; the source citations above remain direct. [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod) and [DigitalOcean GPU signup (affiliate)](https://hostfleet.net/go/digitalocean-gpu) support HostFleet at no extra cost to you. Re-check the exact card, region, rate, storage, and shutdown behavior before purchase.*
