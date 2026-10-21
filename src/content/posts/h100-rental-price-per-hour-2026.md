---
title: "H100 rental price per hour: 19 cloud rates and billing traps"
description: "Compare 19 dated H100 cloud rates, Novita’s $3.39 CPU/RAM bundle and billable startup, plus Verda’s updated price and 30-day cost estimates."
pubDate: 2026-07-29
updatedDate: 2026-10-21
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission through the labeled signup links at the end. That does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed H100 rental guide; calculated costs are estimates, not measured invoices.** This page starts with HostFleet's GPU dataset and saved official pricing checks. Novita's selected H100 product, price conversion and billing documentation, plus Verda's exact one-GPU H100 price, were rechecked **October 21, 2026**. The other 17 rate inputs retain **October 15** source checks. No GPU was provisioned, workload benchmarked, stock confirmed, or account charge measured.

> **Novita and Verda selected prices checked:** October 21, 2026<br>
> **Other 17 selected prices checked:** October 15, 2026; not rechecked today<br>
> **Full-dataset verification baseline:** September 24, 2026; targeted checks do not advance it<br>
> **Currency:** USD public on-demand list prices before tax; native billing units retained<br>
> **Planning convention:** 720 continuously billable hours, not a provider's monthly-price promise

# H100 rental price per hour: compare the product, not just the number

Among these dated inputs, **Hyperstack and Koyeb share the lowest selected rate at $2.50/hour**, checked October 15. Hyperstack sells allocated PCIe VM capacity; Koyeb exposes a serverless application instance. Equal rates do not mean equal bills. At the other end, Baseten's published per-minute rate is about **$6.50/hour**, also checked October 15, for a managed deployment rather than a bare VM.

The useful buying questions are:

1. Does the exact card, memory and topology fit the workload?
2. Is the number an instance total, a GPU component, or managed deployment compute?
3. Which lifecycle state actually stops billing?
4. Can your account launch the product in the required region?

Today's targeted checks catch two different problems. **Novita's H100 remains $3.39/hour, but its current product includes 16 vCPU and 128 GB RAM, not the guide's older 22-vCPU/150-GB bundle. Verda's selected H100 is now $4.382/hour.** Hardware metadata can become stale without a price change; a price can also move while the instance shape stays the same.

## 19 dated H100 rental rates and 30-day compute estimates

This table is a dated extract of the H100 row in HostFleet's `gpu-pricing.json`, reconciled to the linked official sources. Native rates from the October 15 source ledger avoid rounding errors; October 21 direct checks override Novita's product metadata and Verda's cached price. The [live GPU pricing table](https://hostfleet.net/gpu-pricing/) remains the broader comparison, not a promise that every provider has been rechecked today.

**Every total below assumes one named product remains billable for all 720 hours.** It excludes separately priced CPU/RAM, disks, IPs, network, tax, support, extra replicas and operational work. Where the listed product bundles resources, those remain included. This is neither an all-in invoice nor a performance ranking.

| Product | What the rate buys | Native list rate | 720-hour estimate | Source / checked |
|---|---|---:|---:|---|
| **Hyperstack** | PCIe VM; 28 CPU / 180 GB RAM; local storage | **$2.50/hr** | **$1,800.00** | [Official source](https://www.hyperstack.cloud/gpu-pricing), 2026-10-15 |
| **Koyeb** | Serverless instance; 15 vCPU / 180 GB RAM / 320 GB disk | **$2.50/hr** | **$1,800.00** | [Official source](https://www.koyeb.com/pricing), 2026-10-15 |
| **Massed Compute** | Base H100 VM; 20 vCPU / 128 GB RAM; not another H100 variant | **$2.73/hr** | **$1,965.60** | [Official source](https://vm.massedcompute.com/pricing), 2026-10-15 |
| **Northflank** | GPU component only; CPU, RAM, disk and egress extra | **$2.74/hr** | **$1,972.80** | [Official source](https://northflank.com/pricing), 2026-10-15 |
| **RunPod Secure Cloud** | H100 PCIe Pod; not the Serverless tier | **$2.89/hr** | **$2,080.80** | [Official source](https://www.runpod.io/pricing), 2026-10-15 |
| **Thunder Compute** | H100 SXM; 4 vCPU / 32 GB RAM / first 100 GB disk | **$3.20/hr** | **$2,304.00** | [Official source](https://www.thundercompute.com/pricing), 2026-10-15 |
| **Lambda Cloud** | One-GPU H100 PCIe VM | **$3.29/hr** | **$2,368.80** | [Official source](https://lambda.ai/instances), 2026-10-15 |
| **Novita AI** | H100 SXM; 16 vCPU / 128 GB RAM / 60 GB container quota | **$3.39/hr** | **$2,440.80** | [Official source](https://api-server.novita.ai/api/v1/market/products), 2026-10-21 |
| **Jarvis Labs** | H100 SXM; 16 vCPU / 200 GB RAM | **$3.49/hr** | **$2,512.80** | [Official source](https://jarvislabs.ai/pricing), 2026-10-15 |
| **Modal** | H100 serverless container GPU; CPU and memory extra | **$0.001097/sec (≈ $3.95/hr)** | **$2,843.42** | [Official source](https://modal.com/pricing), 2026-10-15 |
| **Verda** | H100 SXM5; selected 30 CPU / 120 GB RAM; storage extra | **$4.382/hr** | **$3,155.04** | [Official source](https://verda.com/pricing), 2026-10-21 |
| **DigitalOcean GPU Droplet** | HGX H100; 20 vCPU / 240 GiB RAM; bundled boot/scratch/transfer | **$4.41/hr** | **$3,175.20** | [Official source](https://www.digitalocean.com/pricing/gpu-droplets), 2026-10-15 |
| **Fal** | H100 custom deployment; on-demand list, not negotiated floor | **$4.50/hr** | **$3,240.00** | [Official source](https://fal.ai/pricing), 2026-10-15 |
| **Nebius** | H100 SXM/NVLink; prescribed 16 vCPU / 200 GB RAM | **$4.50/hr** | **$3,240.00** | [Official source](https://nebius.com/prices), 2026-10-15 |
| **RunPod Serverless** | H100 PRO Flex worker tier; not an exact-card reservation | **$4.79/hr** | **$3,448.80** | [Official source](https://www.runpod.io/pricing), 2026-10-15 |
| **Replicate** | Private H100 model deployment; billed online-instance time | **$0.001525/sec (≈ $5.49/hr)** | **$3,952.80** | [Official source](https://replicate.com/pricing), 2026-10-15 |
| **Paperspace Machines** | H100 SXM5 compute; default disk billed separately; approval may apply | **$5.95/hr** | **$4,284.00** | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), 2026-10-15 |
| **CoreWeave Inference** | Inference-platform rate; not a self-serve one-GPU VM quote | **$6.16/hr** | **$4,435.20** | [Official source](https://www.coreweave.com/pricing), 2026-10-15 |
| **Baseten** | Managed H100 deployment; published 80 GiB VRAM label | **$0.10833/min (≈ $6.50/hr)** | **$4,679.86** | [Official source](https://www.baseten.co/pricing/), 2026-10-15 |

Northflank's estimate is **GPU-only**; Modal's GPU line also needs any billed CPU and memory. Paperspace's default disk is not free just because a Machine includes a disk specification. CoreWeave's entry is specifically an inference-platform rate. Do not compare those numbers as if each bought the same ready-to-serve VM.

Per-second inputs are multiplied by 3,600; per-minute inputs by 60. The 720-hour calculation uses the native rate before rounding: for example, Baseten's **$0.10833/minute** gives **$4,679.86**, not the total obtained from a rounded $6.50/hour headline. Those inputs retain their October 15 checks and direct citations above.

## Novita: the same $3.39 buys a different documented bundle

**Product, conversion and billing documents checked October 21, 2026.** The [public product feed](https://api-server.novita.ai/api/v1/market/products) identifies `H100-80GB.16c128g` as a one-GPU **H100 SXM 80 GB** on-demand product with **16 vCPU, 128 GB RAM and a 60 GB free container-disk quota**. The CPU and system RAM are included in that selected compute rate; extra storage is not.

The earlier 22-vCPU/150-GB description is no longer the selected feed record. This is a catalog-description correction, not evidence that an existing instance was resized or a customer's workload migrated.

### What we verified about the price

The legacy feed returns an on-demand `instancePrice.discount` of `339000`. The current first-party marketplace code divides that field by 100,000, multiplies by the selected GPU count and labels it dollars per hour:

    339000 / 100000 = $3.39 per GPU-hour
    one selected GPU × $3.39 = $3.39 per instance-hour

This conversion was checked against the application script referenced by the [current marketplace page](https://novita.ai/gpus-console/explore), not inferred from the magnitude of the integer. It is **API plus source-code verification, not a rendered-browser price observation or an authenticated quote**. The account-balance API and newer V2 product schema use separate precision contracts; a script must not reuse the legacy divisor for either.

For a buyer, the point is simple: **record the product ID, included resources, currency and billing unit together**. A copied rate without its product shape is an incomplete quote.

### Image pulling is inside the documented compute meter

Novita's [GPU Instance Pricing guide](https://docs.novita.ai/guides/gpu-instance-pricing.md), checked October 21, says compute is accurate to the second and settled hourly. It starts when a successfully created instance enters **pulling** and ends when the instance is stopped. Hourly settlement does not mean whole-hour compute rounding.

A planning example makes the startup boundary visible:

| Assumed billable period, one H100 | Calculation at the October 21 rate | Compute estimate |
|---|---|---:|
| Eight hours of useful work | 8 × $3.39 | **$27.12** |
| Ten additional minutes of image pulling | 10/60 × $3.39 | **$0.565** |
| Combined, before any further billable transition time | $27.12 + $0.565 | **$27.685, about $27.69** |
| 24 continuously billable hours | 24 × $3.39 | **$81.36** |
| 720 continuously billable hours | 720 × $3.39 | **$2,440.80** |

**Assumptions:** ten minutes is an illustrative pull duration, not a measured startup result. The eight hours are additional useful work; the 24- and 720-hour rows are separate cases. Storage, retries, stop propagation and other charges are excluded. A successful stop API response alone does not establish the exact settled billing cutoff.

### Storage uses a day denominator, not an hour denominator

The same October 21 [pricing guide](https://docs.novita.ai/guides/gpu-instance-pricing.md) gives the container disk a **60 GB free quota**, then charges excess capacity at **$0.005/GB/day**. Volume disks also list **$0.005/GB/day**. These are different resource classes from compute and should have separate budget lines.

For **one 24-hour continuously running case**, assume a **100 GB container allocation**, no attached volumes and the documented free quota:

    chargeable container capacity = 100 - 60 = 40 GB
    container storage = 40 × $0.005 × 1 day = $0.20
    compute plus that container storage = $81.36 + $0.20 = $81.56

That is a scoped estimate, not an all-in deployment quote. It does not establish partial-day proration or how the free quota applies after stopping.

The stopped-state question remains unresolved. The [management guide](https://docs.novita.ai/guides/gpu-instance-quickstart-manage-instances.md) warns that stopped volume storage is charged. The [FAQ](https://docs.novita.ai/guides/gpu-instance-faq.md) describes stopped data at **$0.005/GB/day**, without resolving the pricing guide's free-container-quota boundary. All three documents were rechecked October 21. HostFleet therefore does **not** label a stopped root/container disk either universally free or universally charged from byte one.

Both management documents also warn about stopped-data retention: the management guide says **at most seven days**, and the FAQ says data is permanently deleted after seven days. Stop is not a backup policy. Export durable results, verify the copy, then choose stop or destructive termination deliberately. A later restart is capacity-dependent.

### A catalog entry is not deployable stock

The October 21 public H100 record reported **zero** in both availability counters and `usableNode: false`, while also reporting `canBuy: true`. Those fields do not establish launchable stock, account quota or future availability. They are not proof that the provider is globally sold out, either. Confirm the exact offer in your account before committing to a deadline.

## Verda: use $4.382, not the older article or rounded dataset input

**Selected offer checked October 21, 2026.** Verda's [pricing page](https://verda.com/pricing) and [instance-types API](https://api.verda.com/v1/instance-types) both publish **$4.382/hour** for `1H100.80S.30V`: one **H100 SXM5 80 GB**, **30 CPU and 120 GB RAM**, with storage separate. The visible pricing table, embedded on-demand offer and API agree. The distinct 32-CPU/170-GB one-GPU shape also lists that rate; do not silently substitute its resources.

The former guide used **$3.663/hour**, checked October 2. Today's selected quote is **19.6% higher** than that historical input:

    old 720-hour estimate = $3.663 × 720 = $2,637.36
    new 720-hour estimate = $4.382 × 720 = $3,155.04
    difference = $517.68

This is a difference between observations, not a claimed one-day increase or a measured invoice. This comparison uses today's exact direct quote where the cached dataset differs; it does not relabel the dataset as globally current. The higher rate puts this selected Verda shape above Modal's GPU-only hourly equivalent and below DigitalOcean's bundled H100 Droplet in this dated price ordering. Those are not equivalent products.

## The off switch can matter more than a lower hourly rate

The lifecycle evidence below has its own dates. **Only Novita's documents were rechecked today**; the other checked boundaries are retained from the earlier guide.

| Product | Action or state that matters | What can remain / documentation checked |
|---|---|---|
| Novita | Compute meter runs from pulling until stopped; do not substitute readiness or stop acknowledgment | Stopped storage/free-quota ambiguity, short retention and capacity-dependent restart; Oct. 21, 2026 |
| Hyperstack | Hibernation deallocates the flavor; an ordinary stopped VM remains billable | Disks, IPs and volumes; Aug. 13, 2026 |
| Koyeb | Eligible GPU services can scale to zero in public preview; wake and idle conditions apply | A warm minimum, startup or unqualified idle period can preserve allocation; Aug. 28, 2026 |
| Lambda Cloud | Terminate through the provider; guest shutdown/poweroff enters Alert and billing continues | Local data is destroyed; filesystems survive and bill until removed; Sept. 14, 2026 |
| Verda | Delete the instance; guest shutdown does not end compute billing | Retained storage; prepaid increments and unused-time refund reconciliation; Sept. 25, 2026 |
| Nebius | Use the provider's stop control; guest shutdown can trigger a reboot and continued billing | Persistent storage and occupied quota; restart capacity is not guaranteed; Sept. 10, 2026 |
| DigitalOcean GPU Droplets | Destroy the Droplet; powered-off resources still bill | Separately retained snapshots or other resources; Aug. 20, 2026 |

For example, **160 unattended billable Novita H100 hours cost an estimated $542.40** at its October 21 rate, before storage. That scenario can overwhelm a small hourly-rate advantage. It is not a prediction that a stopped Novita instance keeps charging compute; it assumes the instance never reaches the documented compute-free boundary.

Automate the provider's release operation, confirm the final state, and inspect retained resources separately. The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) helps turn useful work, billed startup, idle time and storage into distinct inputs.

## Pick the deployment shape before choosing the provider

**Self-managed capacity:** VM, instance and Pod products put more responsibility on your team for images, serving, authentication, rollouts, monitoring and teardown. Compare PCIe, SXM and HGX/topology requirements explicitly. Thunder's selected catalog label is **SXM**, correcting the older guide's PCIe description; that label does not establish a hardware migration or a measured speed advantage. Massed Compute's row is its base H100 VM, not a quote for every H100 variant.

**Request-driven containers:** a low serverless GPU rate is useful only when the worker lifecycle fits the workload. Startup, model loading, warm minimums, idle windows and extra resource charges determine the actual cost. Use the [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/), [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) and [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) to compare those boundaries.

**Managed inference:** Fal, Replicate, Baseten and CoreWeave Inference represent different serving surfaces from a bare GPU VM. Higher listed compute may replace some engineering work, but that is a workload-specific decision. The [Replicate pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/) explains why prediction runtime alone is not the complete private-deployment bill.

Before choosing an H100 at all, size weights, runtime workspace, context, KV cache and concurrency. The [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) exposes those assumptions. If an older card meets the memory and measured throughput requirement, compare the [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/); this article provides no benchmark that would justify paying more automatically.

## Buying checklist

1. **Save the exact quote.** Product ID, GPU count, card variant, CPU, RAM, storage, region, currency and timestamp.
2. **Prove access.** Confirm approval, quota and account-visible capacity; public catalog presence is insufficient.
3. **Calculate with native units.** Use per-second or per-minute inputs before rounding the final estimate.
4. **Count all billable phases.** Include pulling, model loading, retries, active work, idle retention and teardown where documented.
5. **Test the release path.** Distinguish guest poweroff from provider stop, hibernate, scale-to-zero, delete or destroy.
6. **Preserve results deliberately.** Verify exports and price retained storage independently of compute.
7. **Measure before committing.** Run a bounded deployment test for readiness, throughput, failure recovery and settled usage. None of those outcomes is established by this rate table.

**Bottom line:** the dated rate floor is useful for a shortlist, not a purchasing verdict. Novita's unchanged price conceals a changed CPU/RAM description and a billable image-pull phase. Verda's refreshed price changes the monthly sensitivity case by hundreds of dollars. Buy a verified product and lifecycle, not a copied GPU-hour number.

## Sources and verification scope

- **October 21, 2026 — Novita:** [public legacy GPU catalog](https://api-server.novita.ai/api/v1/market/products), [marketplace](https://novita.ai/gpus-console/explore) and its currently referenced first-party script; [instance pricing](https://docs.novita.ai/guides/gpu-instance-pricing.md), [management](https://docs.novita.ai/guides/gpu-instance-quickstart-manage-instances.md), [FAQ](https://docs.novita.ai/guides/gpu-instance-faq.md), [V2 product precision/unit schema](https://docs.novita.ai/api-reference/gpus-v2-list-products.md), and [separate account-balance unit schema](https://docs.novita.ai/api-reference/basic-get-user-balance.md). Public data and code inspection only; no rendered marketplace or authenticated billing observation.
- **October 21, 2026 — Verda price:** [public pricing](https://verda.com/pricing) and [instance-types API](https://api.verda.com/v1/instance-types). Exact on-demand one-GPU price; spot, dynamic, serverless and multi-GPU prices excluded. The October 2 comparison comes from the prior dated version of this guide.
- **October 15, 2026 — other 17 H100 prices:** the direct official citations beside each rate, backed by HostFleet's saved provider-by-provider source ledger. Those prices were not rechecked October 21.
- **Retained lifecycle sources:** [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) (Aug. 13); [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) and [autoscaling](https://www.koyeb.com/docs/run-and-scale/autoscaling) (Aug. 28); [Lambda billing](https://docs.lambda.ai/public-cloud/billing/), [lifecycle](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/) and [filesystems](https://docs.lambda.ai/public-cloud/filesystems/) (Sept. 14); [Verda billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing) and [lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) (Sept. 25); [Nebius pricing](https://docs.nebius.com/compute/resources/pricing) and [stop/start](https://docs.nebius.com/compute/virtual-machines/stop-start) (Sept. 10 lifecycle check); [DigitalOcean Droplet billing](https://docs.digitalocean.com/products/droplets/details/pricing/) (Aug. 20). All retained dates are in 2026 and do not inherit today's price-check date.

*Need self-managed H100 capacity? These are labeled affiliate links; source citations above stay direct. <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> and <a href="/go/digitalocean-gpu" rel="sponsored nofollow">DigitalOcean GPU signup (affiliate)</a> support HostFleet at no extra cost to you. Recheck the exact card, region, account quote, retained storage and release behavior before purchasing.*
