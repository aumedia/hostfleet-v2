---
title: "A100 rental price per hour in 2026: 17 public rates checked"
description: "Seventeen public A100 40 GB and 80 GB rates compared, including Thunder, Massed Compute, Vultr, and Paperspace, with minimum-config and lifecycle boundaries."
pubDate: 2026-07-31
updatedDate: 2026-08-23
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card comparison; estimated monthly totals.** This refresh uses official provider pricing pages, public vendor APIs, and HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/). Every ranked price was rechecked on **August 23, 2026**. It is not a benchmark, inventory guarantee, negotiated quote, or complete invoice.

# A100 rental price per hour in 2026: 17 public rates checked

The cheapest selected **A100 40 GB** rate remains Verda at **$1.29/hour**. For **A100 80 GB**, Thunder Compute publishes a **$1.09/GPU-hour base rate**, but its smallest selectable one-GPU VM requires four paid vCPUs above the included four. The minimum launchable total is therefore an estimated **$1.25/hour**.

If you want a vendor-published complete one-GPU VM total without component arithmetic, Hyperstack and Massed Compute tie at **$1.35/hour** for their selected A100 80 GB configurations. RunPod Secure Cloud follows at **$1.39/hour** for an allocated PCIe Pod.

Those numbers are not interchangeable. The comparison spans 40 GB and 80 GB devices, PCIe and SXM4 hardware, VMs, Pods, serverless workers, and managed deployment products. Fix the memory and operating surface before sorting by price.

> **Price anchors rechecked:** August 23, 2026
> **Currency:** public USD list rates before tax
> **Monthly estimate:** one listed product held billable for 720 hours
> **Evidence boundary:** a public price does not prove stock, quota, regional access, approval, or equal performance

## A100 40 GB price comparison

A100 40 GB is a separate capacity class. Do not substitute it for an 80 GB requirement merely because its hourly rate is lower.

| Provider and product | Configuration or boundary | Public rate | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Verda GPU instance** | 1x A100 40 GB SXM4; 22 CPU and 120 GB RAM included; storage separate | **$1.29/hr** | **$928.80** | [Verda pricing](https://verda.com/pricing), Aug. 23, 2026 |
| **Lambda Cloud VM** | 1x A100 PCIe or SXM, 40 GB; selected one-GPU row | **$1.99/GPU-hr** | **$1,432.80** | [Lambda GPU instances](https://lambda.ai/instances), Aug. 23, 2026 |
| **Modal container** | A100 40 GB allocated to a serverless container | **$0.000583/sec** (**$2.0988/hr**) | **$1,511.14** | [Modal pricing](https://modal.com/pricing), Aug. 23, 2026 |
| **Paperspace Machine** | 1x A100 40 GB; 12 vCPU, 90 GB RAM, and 50 GB SSD included | **$3.09/hr** | **$2,224.80** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Aug. 23, 2026 |

The estimates multiply each sourced hourly equivalent by 720. Modal uses its unrounded per-second rate before display rounding. They exclude storage beyond the included amount, networking where charged, IPs, support, tax, extra replicas, and operational overhead.

## A100 80 GB price comparison

The 80 GB table is sorted by the smallest usable one-GPU hourly total represented by each row. Thunder is the only row where that total must be derived from separately published components; both the base rate and the arithmetic remain visible.

| Provider and product | Configuration or access boundary | Public rate used | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Thunder Compute** | 1x A100 80 GB; minimum 8 vCPU, 64 GB RAM, and 100 GB disk | **$1.09 GPU base + 4 × $0.04 vCPU = $1.25/hr minimum VM** | **$900.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs), Aug. 23, 2026 |
| **Hyperstack VM** | 1x A100 80 GB PCIe; 28 CPU, 120 GB RAM, and local storage included; Canada | **$1.35/GPU-hr** | **$972.00** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), Aug. 23, 2026 |
| **Massed Compute VM** | 1x A100 80 GB; 16 vCPU and 96 GB RAM included | **$1.35/hr** | **$972.00** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), Aug. 23, 2026 |
| **RunPod Secure Cloud Pod** | A100 80 GB PCIe allocated Pod | **$1.39/hr** | **$1,000.80** | [RunPod pricing](https://www.runpod.io/pricing), Aug. 23, 2026 |
| **Novita AI instance** | 1x A100 80 GB SXM; 14 vCPU, 240 GB RAM, and 60 GB container-disk quota; no public inventory observed | **$1.60/GPU-hr** | **$1,152.00** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), Aug. 23, 2026 |
| **Verda GPU instance** | 1x A100 80 GB SXM4; 22 CPU and 120 GB RAM included; storage separate | **$1.79/hr** | **$1,288.80** | [Verda pricing](https://verda.com/pricing), Aug. 23, 2026 |
| **Vultr Cloud GPU** | 1x PCIe A100 80 GB; 12 vCPU, 120 GB RAM, 1.40 TB local storage, and 10 TB bandwidth included | **$2.397/hr** | **$1,725.84** | [Vultr public plan API](https://api.vultr.com/v2/plans?per_page=500), Aug. 23, 2026 |
| **Modal container** | A100 80 GB allocated to a serverless container | **$0.000694/sec** (**$2.4984/hr**) | **$1,798.85** | [Modal pricing](https://modal.com/pricing), Aug. 23, 2026 |
| **CoreWeave Inference** | A100 80 GB single-GPU inference rate; inference-platform customers only | **$2.70/GPU-hr** | **$1,944.00** | [CoreWeave pricing](https://www.coreweave.com/pricing), Aug. 23, 2026 |
| **RunPod Serverless** | A100 80 GB worker tier; not an exact-card reservation | **$2.72/hr** | **$1,958.40** | [RunPod pricing](https://www.runpod.io/pricing), Aug. 23, 2026 |
| **Paperspace Machine** | 1x A100 80 GB; 12 vCPU, 90 GB RAM, and 50 GB SSD included | **$3.18/hr** | **$2,289.60** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Aug. 23, 2026 |
| **Baseten deployment** | A100 80 GiB managed deployment | **$0.06667/min** (**$4.0002/hr**) | **$2,880.14** | [Baseten pricing](https://www.baseten.co/pricing/), Aug. 23, 2026 |
| **Replicate private deployment** | One A100 80 GB managed deployment | **$0.001400/sec** (**$5.04/hr**) | **$3,628.80** | [Replicate pricing](https://replicate.com/pricing), Aug. 23, 2026 |

The table contains **13 A100 80 GB rows** and the earlier table contains **four A100 40 GB rows**, for 17 public price points in total. It does not contain 17 equivalent rental offers.

## What the five new price cells change

The live guide previously covered 12 rows. The current dataset adds five price cells: Thunder Compute and Massed Compute at 80 GB, Vultr at 80 GB, and Paperspace at both 40 GB and 80 GB.

### Thunder becomes the minimum-total leader only after explicit arithmetic

Thunder's live page and pricing API publish an **A100 80 GB base GPU rate of $1.09/hour**, checked August 23, 2026. The same pricing page says four vCPUs are included and additional vCPUs cost **$0.04/vCPU-hour**. Its public specification API says the smallest selectable one-GPU A100 configuration uses eight vCPUs.

The minimum running VM estimate is therefore:

    $1.09 + (8 - 4) × $0.04 = $1.25/hour
    $1.25 × 720 = $900.00 for a 30-day planning month

This is derived arithmetic, not a vendor-quoted all-in headline. The minimum configuration also includes 64 GB RAM and 100 GB persistent disk. Thunder bills compute per minute while the instance runs; its documentation says deleting the instance stops billing. None of those public sources proves current A100 stock or launch time.

### Massed Compute ties Hyperstack at a published $1.35 VM total

Massed Compute's live on-demand catalog lists one A100 80 GB VM at **$1.35/hour**, checked August 23, 2026, with 16 vCPU and 96 GB RAM included. This is a complete published VM total, not a GPU component that needs CPU arithmetic.

The page displays a storage allocation but does not name the unit, so HostFleet does not assign one. Massed Compute's billing overview says an active VM's hourly total is divided by 60 and debited from prepaid balance every minute. Its public catalog says there are no bandwidth charges or long-term contracts for these on-demand rows. A price still does not prove capacity.

Hyperstack's selected **$1.35/GPU-hour** row is also a complete one-GPU VM price, rechecked August 23, but it is a PCIe configuration in Canada with a different CPU, RAM, storage, lifecycle, and platform boundary. A tie on dollars per hour is not a tie on deployability or workload performance.

### Vultr costs more but publishes a large fixed bundle

Vultr's public plan API returned an on-demand one-GPU A100 plan at **$2.397/hour** on August 23, 2026. The plan includes 12 vCPU, 120 GB RAM, 1.40 TB local storage, and 10 TB bandwidth. The 720-hour estimate is **$1,725.84** before overages and other excluded charges.

The operational catch is lifecycle. Vultr's documentation says stopped Cloud GPU instances continue billing until destroyed. It also bills GPU products for the actual number of hours in the calendar month, so a 31-day month can contain 744 billable hours rather than the 720-hour planning convention used in this guide.

### Paperspace adds both memory tiers and a different off switch

Paperspace's official live price table lists A100 40 GB at **$3.09/hour** and A100 80 GB at **$3.18/hour**, rechecked August 23, 2026. Each one-GPU Machine includes 12 vCPU, 90 GB RAM, and 50 GB SSD.

Powering a Paperspace Machine off stops its compute charge, unlike Vultr, Hyperstack, or Verda stopped-state behavior. Attached storage, public IP addresses, and add-ons can continue billing. Paperspace says Machine ingress and egress bandwidth are free, but its public regional table is catalog evidence rather than live stock.

## Forty gigabytes versus 80 GB is the first decision

The cheapest 40 GB and 80 GB rows are only 4 cents apart on their minimum hourly totals: Verda at $1.29 and Thunder at an estimated $1.25. That does not make the cards interchangeable.

Start with model weights, precision, KV-cache size, batch size, context length, runtime overhead, and any memory reserved for the serving stack. If the workload does not fit in 40 GB with safe headroom, every 40 GB price should be removed before comparing providers. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains the memory calculation without pretending that capacity alone predicts throughput.

Hardware variant matters after memory. PCIe and SXM4 systems expose different interconnect and topology boundaries. A single-GPU inference service may care less about multi-GPU fabric than a communication-heavy training or parallel inference workload. Record the exact variant instead of treating A100 as one fungible product.

## What 720-hour estimates do and do not mean

A 30-day planning month has 720 hours. The estimates above assume one named product stays billable for all 720 hours. They are useful for comparing continuously allocated capacity, but they are not final invoices.

The estimates assume:

- one GPU product remains billable continuously;
- no overlapping rollout, failed replacement, or second replica is billed;
- native per-second or per-minute rates are multiplied before display rounding; and
- the public rate remains unchanged for the planning period.

They exclude storage beyond included allocations, network overages, public IPs, support, tax, commitments, regional premiums, retries, and engineering labor. Thunder's $900 estimate includes the minimum paid vCPU arithmetic; the other rows use vendor-published complete prices or the native managed-product rate.

For bursty work, allocation time matters more than 720-hour multiplication. Startup, image pulls, model loading, retries, idle windows, minimum workers, and scale-down rules all change billable duration. [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) exposes 1%, 10%, and always-warm assumptions rather than hiding them in a monthly total.

## The off switch can reverse the ranking

Hourly price is only half of cost control:

- **Thunder Compute:** compute bills per minute while the instance runs; deletion stops instance billing. Confirm snapshot and retained-disk treatment before automating cleanup.
- **Hyperstack:** a stopped VM remains billable because the hardware stays reserved; hibernation deallocates the flavor, while retained resources can still bill.
- **Massed Compute:** active VM totals are debited per minute. Confirm the exact stop or deletion state that ends the active charge.
- **RunPod Pods:** compute allocation and persistent storage require separate shutdown and deletion discipline.
- **Novita:** compute billing ends when the instance is stopped; storage remains separate.
- **Verda:** shutting down does not stop compute billing; deletion is required, and retained storage continues billing.
- **Vultr:** stopped Cloud GPU instances keep billing until destroyed.
- **Paperspace:** powering off stops compute billing, but storage, public IPs, and add-ons can continue.
- **Modal and RunPod Serverless:** workers can return to zero, but startup, execution, idle windows, and warm-pool settings determine billable allocation.

A scheduler that blindly calls stop is not portable cost control. Document the exact provider action that releases the GPU and what happens to disks, checkpoints, images, IPs, and cached model data.

## Choose the operating surface after memory

Once the memory floor is fixed, separate the rows by what the product actually buys.

1. **Self-managed VM or Pod:** Thunder, Hyperstack, Massed Compute, RunPod Pods, Novita, Verda, Vultr, Lambda, and Paperspace leave the image, inference server, authentication, rollout, logging, and cleanup largely to the buyer.
2. **Scale-to-zero container or worker:** Modal and RunPod Serverless can align spend with real allocation when the workload releases the GPU. Their hourly equivalents are rate normalization, not a forecast for a bursty endpoint.
3. **Managed deployment:** Baseten, Replicate, and eligible CoreWeave offerings provide a more opinionated serving surface. Compare minimum replicas, rollout controls, observability, eligibility, and work removed before rejecting the higher hourly equivalent.
4. **Catalog-only evidence:** Novita's public A100 row showed no inventory during the August 23 check. The price belongs in a market comparison, but not in a deployment plan until the account can actually launch it.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion for worker and managed-deployment tradeoffs. [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains why a Pod and a Serverless worker need different storage and allocation assumptions. If the workload needs newer hardware, use the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) without assuming that an H100 is automatically better value.

## A practical A100 buying checklist

1. **Set the memory floor.** Remove every 40 GB row if weights plus runtime headroom require 80 GB.
2. **Confirm the hardware.** Record PCIe versus SXM4, topology, region, and the smallest deployable GPU count.
3. **Confirm the product total.** Add required CPU, RAM, storage, and IP charges when the headline is a component rate.
4. **Prove capacity.** Check account eligibility, quota, approval, and live inventory. A rate card is not stock evidence.
5. **Test the off switch.** Verify whether stop, shutdown, hibernate, scale-to-zero, or delete ends compute billing.
6. **Run a bounded deployment test.** Measure provisioning, model-load time, billed duration, failure recovery, and cleanup before production traffic.

## Verdict

**For A100 40 GB, Verda remains the selected public-rate leader at $1.29/hour**, or an estimated **$928.80 for 720 allocated hours**, based on the rate rechecked August 23, 2026. The configuration includes 22 CPU and 120 GB RAM, but storage is separate and shutdown does not stop compute billing.

**For A100 80 GB, Thunder Compute has the lowest minimum launchable total in this check at an estimated $1.25/hour.** That figure is transparent component arithmetic: a $1.09 GPU base plus four required paid vCPUs at $0.04 each. It is not a vendor-published all-in headline or evidence of stock.

**Hyperstack and Massed Compute tie at $1.35/hour among the selected vendor-published complete VM totals.** RunPod Secure Cloud follows at $1.39/hour. Their accelerator variant, included resources, regions, availability, storage model, and lifecycle still differ.

The defensible buying order is required memory, exact hardware, deployable product shape, current capacity, billing lifecycle, complete cost, and then hourly rate. A cheap A100 row is useful only when the account can launch it and the operator knows how to stop the meter.

## Sources

- [Verda GPU pricing](https://verda.com/pricing) — A100 40 GB and 80 GB rates and fixed CPU/RAM configurations; rechecked August 23, 2026
- [Verda billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing/) and [lifecycle documentation](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — billing increments, shutdown, deletion, and retained storage; checked August 15, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — one-GPU A100 40 GB rate; rechecked August 23, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; rechecked August 23, 2026
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) — A100 Machine rates, included resources, powered-off billing, storage, and bandwidth; rechecked August 23, 2026
- [Paperspace Machine types](https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/) and [availability](https://docs.digitalocean.com/products/paperspace/machines/details/availability/) — fixed configurations and catalog regions; checked August 21, 2026
- [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs) — base rate, vCPU price, and selectable minimum; rechecked August 23, 2026
- [Thunder billing](https://www.thundercompute.com/docs/billing) — per-minute running compute and deletion boundary; checked August 22, 2026
- [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing) — one-GPU A100 80 GB PCIe VM rate; rechecked August 23, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped, hibernated, and deleted billing; checked August 13, 2026
- [Massed Compute pricing](https://vm.massedcompute.com/pricing) and [billing overview](https://vm-docs.massedcompute.com/docs/billing/overview) — one-GPU VM total and per-minute debit; checked August 23, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud Pod and Serverless A100 rates; rechecked August 23, 2026
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products) and [billing guide](https://novita.ai/docs/guides/gpu-instance-pricing) — A100 configuration, catalog rate, observed inventory, and stopped-state billing; rechecked August 23, 2026
- [Vultr public plan API](https://api.vultr.com/v2/plans?per_page=500) — A100 plan rate and included resources; rechecked August 23, 2026
- [Vultr GPU billing](https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently) and [Cloud GPU FAQ](https://docs.vultr.com/products/compute/instances/cloud-gpu/faq) — actual calendar-hour billing and stopped-instance charges; checked August 18, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — A100 single-GPU inference rate and eligibility; rechecked August 23, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — A100 80 GiB per-minute managed-deployment rate; rechecked August 23, 2026
- [Replicate pricing](https://replicate.com/pricing) — one-GPU A100 80 GB private-deployment rate; rechecked August 23, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json
- HostFleet provider notes — /opt/hostbot/data/ai-hosting/notes/2026-08-18-vultr-cloud-gpu-pricing.md, /opt/hostbot/data/ai-hosting/notes/2026-08-21-paperspace-gpu-machine-pricing.md, /opt/hostbot/data/ai-hosting/notes/2026-08-22-thunder-compute-gpu-pricing.md, and /opt/hostbot/data/ai-hosting/notes/2026-08-23-massed-compute-gpu-pricing.md

*Need a self-managed A100 endpoint? This is a labeled affiliate link; source citations above remain direct. [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod) supports HostFleet's testing budget at no extra cost to you. Re-check the exact card, region, rate, storage, and shutdown behavior before purchase.*
