---
title: "A100 rental price per hour in 2026: 22 public rates checked"
description: "Twenty-two public A100 40 GB and 80 GB rates checked September 2026, with complete-cost, pause, scale-to-zero, and component-pricing caveats."
pubDate: 2026-07-31
updatedDate: 2026-09-08
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card comparison; estimated monthly totals.** This September refresh uses official provider pages, vendor APIs, and HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/). Every listed A100 rate was rechecked on **September 8, 2026**. It is not a benchmark, inventory guarantee, negotiated quote, or complete invoice.

# A100 rental price per hour in 2026: 22 public rates checked

The cheapest selected **A100 40 GB** list rate is now Jarvis Labs at **$0.89 per GPU-hour**, or an estimated **$640.80 for 720 active hours**. That displaces Verda's $1.29/hour row after this guide adds Jarvis Labs and Northflank.

For **A100 80 GB**, Thunder Compute still has the lowest minimum launchable total in this comparison: an estimated **$1.25/hour** after required CPU is added to its $1.09 GPU base rate. Hyperstack and Massed Compute publish complete one-GPU VM totals of **$1.35/hour**. Jarvis Labs lists **$1.49/hour**, followed by RunPod's selected Secure Cloud PCIe Pod at **$1.59/hour**.

Those numbers do not buy the same thing. This comparison spans 40 GB and 80 GB cards, PCIe and SXM4 systems, complete VMs, Pods, per-second containers, managed deployments, and Northflank GPU components that still require paid CPU and memory. Choose the memory class and operating surface before sorting by price.

> **Price anchors rechecked:** September 8, 2026<br>
> **Currency:** public USD list rates before tax<br>
> **Monthly estimate:** one listed product held billable for 720 hours<br>
> **Evidence boundary:** a public rate does not prove current stock, quota, regional access, approval, or equal performance

## The short answer

| Requirement | Lowest selected public rate | 720-hour planning figure | Important boundary |
|---|---:|---:|---|
| A100 40 GB | Jarvis Labs at **$0.89/hr** | **$640.80** | One-GPU on-demand row; capacity is released when paused |
| A100 80 GB, lowest launchable total | Thunder Compute at **$1.25/hr estimated** | **$900.00** | $1.09 GPU base plus four required paid vCPUs |
| A100 80 GB, complete published VM total | Hyperstack or Massed Compute at **$1.35/hr** | **$972.00** | Different regions, hardware variants, resources, and lifecycle rules |
| A100 80 GB, request-waking service | Koyeb at **$1.60/hr while active** | **$1,152.00 if active for 720 hours** | Public-preview scale-to-zero; five-minute default idle period |
| Managed-cloud component | Northflank at **$1.42/hr for 40 GB** or **$1.76/hr for 80 GB** | GPU component only | CPU, memory, disk, and egress are separate |

All values in this summary come from the linked official rate sources and were rechecked September 8, 2026. The 720-hour figures are arithmetic, not vendor quotes.

## A100 40 GB: five complete rates plus one component price

A100 40 GB is a separate capacity class. If the model, KV cache, batch, and runtime overhead do not fit with safe headroom, its lower rates are irrelevant.

| Provider and product | Configuration or boundary | Public rate | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Jarvis Labs on-demand instance** | 1x A100 40 GB; public row lists 16 vCPU and 112 GB RAM | **$0.89/GPU-hr** | **$640.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 8, 2026 |
| **Verda GPU instance** | 1x A100 40 GB SXM4; 22 CPU and 120 GB RAM included; storage separate | **$1.29/hr** | **$928.80** | [Verda pricing](https://verda.com/pricing), Sept. 8, 2026 |
| **Lambda Cloud VM** | Selected one-GPU A100 PCIe or SXM row; 40 GB | **$1.99/GPU-hr** | **$1,432.80** | [Lambda GPU instances](https://lambda.ai/instances), Sept. 8, 2026 |
| **Modal container** | A100 40 GB allocated to a serverless container | **$0.000583/sec** (**$2.0988/hr**) | **$1,511.14** | [Modal pricing](https://modal.com/pricing), Sept. 8, 2026 |
| **Paperspace Machine** | 1x A100 40 GB; 12 vCPU, 90 GB RAM, and 50 GB SSD included | **$3.09/hr** | **$2,224.80** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) and [Machine Type Reference](https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/), Sept. 8, 2026 |

Northflank also publishes an A100 40 GB rate of **$1.42/GPU-hour**, checked September 8, 2026 on [Northflank's pricing page](https://northflank.com/pricing). That is **$1,022.40 for 720 GPU-component hours**, before the required CPU and memory compute plan. Because Northflank does not prescribe one minimum CPU/RAM shape for this card, inventing an all-in total would make the table look more precise than the source allows.

The estimates multiply the native rate by 720. Modal's figure uses its unrounded per-second rate. They exclude storage beyond included amounts, networking where charged, IPs, support, tax, additional replicas, and operational labor.

## A100 80 GB: 15 product rates plus one component price

This table ranks published product rates, not Northflank's incomplete GPU component. Novita remains in the catalog-price comparison but is not currently launchable from the public inventory response. Thunder is the one ranked row whose minimum total requires transparent CPU arithmetic.

| Provider and product | Configuration or access boundary | Public rate used | 720-hour estimate | Official source and check date |
|---|---|---:|---:|---|
| **Thunder Compute** | 1x A100 80 GB; minimum 8 vCPU, 64 GB RAM, and 100 GB disk | **$1.09 GPU base + 4 × $0.04 vCPU = $1.25/hr minimum VM** | **$900.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs), Sept. 8, 2026 |
| **Hyperstack VM** | 1x A100 80 GB PCIe; 28 CPU, 120 GB RAM, and local storage included; Canada | **$1.35/GPU-hr** | **$972.00** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), Sept. 8, 2026 |
| **Massed Compute VM** | 1x A100 80 GB; 16 vCPU and 96 GB RAM included | **$1.35/hr** | **$972.00** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), Sept. 8, 2026 |
| **Jarvis Labs on-demand instance** | 1x A100 80 GB; public row lists 16 vCPU and 112 GB RAM | **$1.49/GPU-hr** | **$1,072.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 8, 2026 |
| **RunPod Secure Cloud Pod** | Selected one-GPU A100 80 GB PCIe Pod; Secure Cloud SXM is also $1.59/hr | **$1.59/hr** | **$1,144.80** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 8, 2026 |
| **Novita AI instance** | 1x A100 80 GB SXM; 14 vCPU, 240 GB RAM, and 60 GB container-disk quota; API reports inventoryState=none, usableNode=false, and zero available GPUs | **$1.60/GPU-hr** | **$1,152.00** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), Sept. 8, 2026 |
| **Koyeb GPU Service** | 1x A100 80 GB; 15 vCPU, 180 GB RAM, and 320 GB disk included | **$1.60/hr** | **$1,152.00** | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 8, 2026 |
| **Verda GPU instance** | 1x A100 80 GB SXM4; 22 CPU and 120 GB RAM included; storage separate | **$1.79/hr** | **$1,288.80** | [Verda pricing](https://verda.com/pricing), Sept. 8, 2026 |
| **Vultr Cloud GPU** | 1x PCIe A100 80 GB catalog plan; 12 vCPU, 120 GB RAM, 1.40 TB local storage, and 10 TB bandwidth included; API locations array is empty | **$2.397/hr** | **$1,725.84** | [Vultr public plan API](https://api.vultr.com/v2/plans?per_page=500), Sept. 8, 2026 |
| **Modal container** | A100 80 GB allocated to a serverless container | **$0.000694/sec** (**$2.4984/hr**) | **$1,798.85** | [Modal pricing](https://modal.com/pricing), Sept. 8, 2026 |
| **CoreWeave Inference** | A100 80 GB single-GPU inference rate; inference-platform customers only | **$2.70/GPU-hr** | **$1,944.00** | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 8, 2026 |
| **RunPod Serverless** | A100 80 GB worker tier; not an exact-card reservation | **$2.72/hr** | **$1,958.40** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 8, 2026 |
| **Paperspace Machine** | 1x A100 80 GB; 12 vCPU, 90 GB RAM, and 50 GB SSD included | **$3.18/hr** | **$2,289.60** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) and [Machine Type Reference](https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/), Sept. 8, 2026 |
| **Baseten deployment** | A100 80 GiB managed deployment | **$0.06667/min** (**$4.0002/hr**) | **$2,880.14** | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 8, 2026 |
| **Replicate private deployment** | One A100 80 GB managed deployment | **$0.001400/sec** (**$5.04/hr**) | **$3,628.80** | [Replicate pricing](https://replicate.com/pricing), Sept. 8, 2026 |

Northflank's separate **A100 80 GB component is $1.76/GPU-hour**, or **$1,267.20 for 720 GPU-component hours**, from its [official pricing](https://northflank.com/pricing) checked September 8, 2026. The all-in running rate must add the chosen vCPU and memory plan; persistent disk and egress can add more. The raw GPU number sits between Koyeb and Verda, but the unknown complete total means it should not be ranked between them.

Together, the guide now contains **six A100 40 GB cells and 16 A100 80 GB cells: 22 public price points**. They are not 22 equivalent rentals.

The Vultr A100 plan is included because the official plan API returned it again on September 7 after it was absent during the September 4 review. Its current record has an empty `locations` array, so this is volatile catalog evidence, not proof that an account can deploy it in any region.

## What the five added cells change

The previous page covered 17 price cells. The current dataset adds Jarvis Labs at both memory tiers, Koyeb at 80 GB, and Northflank components at both tiers.

### Jarvis Labs becomes the 40 GB price leader

Jarvis Labs publishes **$0.89/GPU-hour for A100 40 GB** and **$1.49/GPU-hour for A100 80 GB**, rechecked September 8, 2026 on its [pricing page](https://jarvislabs.ai/pricing). The selected on-demand rows list one GPU, 16 vCPU, and 112 GB RAM.

Its operating boundary matters as much as the rate. Jarvis says on-demand instances bill per minute. Pausing stops compute billing and preserves data, but releases the GPU capacity; a later resume depends on availability. Paused storage continues billing at **$0.00014/GB-hour**, with the vendor's example of 50 GB costing **$5.04 for 720 hours**. Those lifecycle figures come from the [Jarvis Labs FAQ](https://docs.jarvislabs.ai/faqs/) checked August 24, 2026.

That makes Jarvis attractive when the operator can tolerate capacity loss between sessions. It does not make $0.89 a reservation guarantee, availability claim, or performance result.

### Koyeb adds an included-resource service with a real idle tail

Koyeb lists one A100 80 GB Service at **$1.60/hour**, with 15 vCPU, 180 GB RAM, and 320 GB disk on the pricing card, rechecked September 8, 2026. The separate A100 SXM product is **$2.15/hour** and is not substituted into the lower selected row.

Koyeb's [scale-to-zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked August 28, 2026, explicitly includes GPU Instances. A Service can set its minimum instance count to zero, with a default five-minute idle period. At the current $1.60/hour A100 rate, the nominal five-minute post-traffic tail is:

    $1.60 × 5 / 60 = $0.1333

That is derived planning arithmetic, not a vendor-quoted minimum charge. It excludes active processing, wake and model-load time, additional instances, storage, and networking. Scale-to-zero is in public preview; held connections prevent idleness, HTTP/2 cannot wake a sleeping Service, and no public GPU wake-latency SLA was found.

For a sparse request-driven endpoint, the active hourly rate plus the five-minute tail can matter more than a 720-hour estimate. For a continuously warm endpoint, it behaves like the $1,152 monthly planning row.

### Northflank adds useful market evidence, not a finished invoice

Northflank publishes **$1.42/GPU-hour for A100 40 GB** and **$1.76/GPU-hour for A100 80 GB**, rechecked September 8, 2026. Its managed-cloud documentation says GPU use is billed by the second once provisioned.

The trap is that these are GPU components. Northflank separately charges for the selected CPU and memory compute plan, and also lists persistent disk and egress charges. Its public documents do not prescribe a model-specific minimum CPU/RAM plan that would justify one comparable all-in figure.

Northflank's autoscaling is also not request-waking scale-to-zero. The [manual scaling documentation](https://northflank.com/docs/v1/application/scale/scale-instances.md), checked August 31, 2026, says a service can be manually set to zero but is unavailable at zero. Its [autoscaling documentation](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) describes 15-second evaluations and a five-minute moving downscale window, but does not establish an autoscaling minimum of zero or an incoming-request wake path. Treating it as interchangeable with Koyeb would erase the central product difference.

## Forty gigabytes versus 80 GB is the first decision

Jarvis's $0.89 A100 40 GB rate is 36 cents below Thunder's estimated $1.25 minimum 80 GB VM total. That gap is real, but it is useful only if the workload fits.

Start with model weights, precision, KV-cache size, batch size, context length, runtime workspace, and headroom for the serving stack. If the safe requirement exceeds 40 GB, remove every 40 GB row. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) shows the memory arithmetic, including why context and concurrency can consume the apparent spare capacity.

Hardware variant is the next filter. PCIe and SXM4 systems have different bandwidth and topology boundaries. A single-GPU inference service may care less about multi-GPU fabric than training or tensor-parallel inference, but the exact variant still belongs in the deployment record. “A100” alone is not a reproducible configuration.

## What the 720-hour estimates mean

A 30-day planning month has 720 hours. The estimates assume one named product stays billable for all 720 hours. They normalize continuously allocated capacity; they do not predict a bursty endpoint's bill.

Vultr's [GPU billing guide](https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently) uses 730 hours for its published monthly calculation while charging the actual hours in each calendar month. This guide applies 720 hours uniformly, so the Vultr row's **$1,725.84** planning figure differs from the API's **$1,750** catalog monthly price.

The calculations assume:

- one GPU product remains billable continuously;
- no overlapping rollout, failed replacement, or extra replica is charged;
- native per-second or per-minute rates are multiplied before display rounding; and
- the public list rate remains unchanged for the planning period.

They exclude storage beyond included allocations, network overages, public IPs, support, tax, commitments, regional premiums, retries, and engineering labor. Thunder's $900 estimate includes the minimum required vCPU arithmetic. Northflank's figures deliberately remain GPU-component floors.

For intermittent work, billable allocation time replaces 720 in the formula. Startup, image pulls, model loading, retries, idle windows, minimum workers, downscale holds, and retained resources all change cost. [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) exposes useful-hour and always-warm assumptions instead of burying them inside one monthly headline.

## The off switch can reverse the ranking

The cheapest hourly row is not always the cheapest operational choice.

- **Jarvis Labs:** pause stops compute billing but keeps storage billing and releases GPU capacity. Resume is subject to capacity.
- **Thunder Compute:** its [billing guide](https://www.thundercompute.com/docs/billing) says compute bills per minute while the instance runs and deletion stops instance billing. Confirm retained-disk treatment.
- **Hyperstack:** its [states-and-billing guide](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) says a stopped VM remains billable because hardware stays reserved; hibernation deallocates the flavor, while retained resources can still bill.
- **Massed Compute:** its [billing overview](https://vm-docs.massedcompute.com/docs/billing/overview) says the active VM total is debited per minute. Confirm the exact release action before automation.
- **RunPod Pods:** compute allocation and persistent storage have separate lifecycle controls.
- **Novita:** its [GPU instance pricing guide](https://novita.ai/docs/guides/gpu-instance-pricing) says stopping ends compute billing; storage is separate.
- **Koyeb:** an eligible Internet-facing GPU Service can scale to zero after its idle window, subject to preview and protocol limitations.
- **Verda:** its [instance lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) says shutdown does not stop compute billing; deletion is required, and retained storage can continue billing.
- **Vultr:** its [stopped-instance billing documentation](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr) says a stopped instance remains billable until it is destroyed.
- **Paperspace:** power-off stops compute billing, while storage, public IPs, and add-ons can continue.
- **Northflank:** manual zero makes the service unavailable; documented autoscaling does not establish request wake-up from zero.
- **Modal and RunPod Serverless:** workers can return to zero, but startup, execution, idle windows, and warm settings determine billable allocation.

A portable cleanup job cannot merely call “stop” everywhere. For each provider, record the exact action that releases the GPU and the fate of disks, checkpoints, images, IPs, and cached model data.

## Choose the operating surface after memory

Once the memory floor is fixed, group products by the work they remove.

1. **Self-managed VM or Pod:** Jarvis Labs, Thunder, Hyperstack, Massed Compute, RunPod Pods, Novita, Verda, Vultr, Lambda, and Paperspace leave the image, inference server, authentication, rollout, monitoring, and cleanup largely to the buyer.
2. **Request-driven or scale-to-zero container:** Koyeb, Modal, and RunPod Serverless can align compute with active allocation, but their wake path, idle policy, and worker semantics differ.
3. **Managed deployment:** Baseten, Replicate, and eligible CoreWeave products add a more opinionated serving surface. Higher rates can be rational when autoscaling, rollout controls, and operations replace internal work.
4. **Component-priced managed cloud:** Northflank exposes a GPU component inside a configurable service. Build the complete CPU, memory, storage, and egress total before comparing it with fixed VM bundles.
5. **Catalog evidence:** a public price is not current capacity. Account access, quota, region, and actual launch success remain separate checks.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion for worker and managed-deployment tradeoffs. [RunPod's pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains why Pods and Serverless need different allocation and storage assumptions. If A100 is not the required generation, compare the [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) after fixing the workload shape.

## A practical A100 buying checklist

1. **Set the memory floor.** Remove every 40 GB row if weights plus runtime headroom require 80 GB.
2. **Confirm the exact hardware.** Record PCIe versus SXM4, topology, region, and the smallest deployable GPU count.
3. **Build the complete product total.** Add required CPU, memory, storage, IP, and egress components.
4. **Prove capacity.** Check account eligibility, quota, approval, region, and live inventory.
5. **Test the off switch.** Verify whether pause, stop, hibernate, scale-to-zero, manual zero, or deletion ends compute billing.
6. **Run a bounded deployment test.** Measure provisioning, model load, billed duration, failure recovery, and cleanup before production traffic.
7. **Set a spend guardrail.** Alert on unexpected replicas and retained resources; do not rely on a low hourly rate to limit a broken rollout.

## Verdict

**Jarvis Labs is the new selected A100 40 GB public-rate leader at $0.89/GPU-hour**, or an estimated **$640.80 for 720 active hours**, based on the official rate checked September 8, 2026. Its pause behavior can reduce compute cost, but capacity is released and retained data keeps billing.

**Thunder Compute remains the lowest A100 80 GB launchable total in this check at an estimated $1.25/hour.** That is explicit component arithmetic: a $1.09 GPU base plus four paid vCPUs at $0.04 each. It is not a vendor-published all-in headline or proof of inventory.

**Hyperstack and Massed Compute tie at $1.35/hour among selected published complete VM totals.** Jarvis Labs is $1.49/hour, RunPod's selected Secure Cloud PCIe Pod is $1.59/hour, and Koyeb is $1.60/hour with an included-resource, request-waking Service boundary.

**Northflank's $1.42 and $1.76 A100 numbers are GPU components, not comparable totals.** They are useful public market data only after CPU and memory are added.

The defensible buying order is memory, exact hardware, product shape, capacity, billing lifecycle, complete cost, and then hourly rate. The lowest number wins only after every earlier constraint survives.

## Sources

- [HostFleet GPU pricing dataset](https://hostfleet.net/gpu-pricing/) — live-table baseline; its last full-dataset check covered all 21 providers and 147 displayed price cells on September 7, 2026
- [Jarvis Labs pricing](https://jarvislabs.ai/pricing) — A100 40 GB and 80 GB on-demand rates and resource rows; rechecked September 8, 2026
- [Jarvis Labs FAQ](https://docs.jarvislabs.ai/faqs/) — per-minute billing, pause behavior, storage rate, and capacity release; checked August 24, 2026
- [Verda pricing](https://verda.com/pricing) — A100 40 GB and 80 GB rates and fixed CPU/RAM configurations; rechecked September 8, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — selected one-GPU A100 40 GB rate; rechecked September 8, 2026
- [Modal pricing](https://modal.com/pricing) — A100 40 GB and 80 GB per-second rates; rechecked September 8, 2026
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) — A100 rates, power-off billing, storage, and bandwidth; rechecked September 8, 2026
- [Paperspace Machine Type Reference](https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/) — 12-vCPU, 90-GB-RAM, and 50-GB-SSD configurations for A100 and A100-80G; rechecked September 8, 2026
- [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs) — A100 base rate, vCPU price, and selectable minimum; rechecked September 8, 2026
- [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing) — selected one-GPU A100 80 GB PCIe VM rate; rechecked September 8, 2026
- [Massed Compute pricing](https://vm.massedcompute.com/pricing) — selected one-GPU A100 80 GB VM total; rechecked September 8, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud PCIe/SXM and Serverless A100 rates; rechecked September 8, 2026
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products) — A100 configuration and catalog rate, plus zero inventory, inventoryState=none, and usableNode=false; rechecked September 8, 2026
- [Koyeb pricing](https://www.koyeb.com/pricing) — A100 and A100 SXM rates and included resources; rechecked September 8, 2026
- [Koyeb scale-to-zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — GPU eligibility, idle period, wake path, preview status, and protocol limits; checked August 28, 2026
- [Northflank pricing](https://northflank.com/pricing) — A100 GPU-component, CPU, memory, storage, and egress pricing; rechecked September 8, 2026
- [Northflank managed GPU documentation](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md) — component and provisioning boundary; checked August 31, 2026
- [Northflank autoscaling](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) and [manual scaling](https://northflank.com/docs/v1/application/scale/scale-instances.md) — downscale window and manual-zero behavior; checked August 31, 2026
- [Vultr public plan API](https://api.vultr.com/v2/plans?per_page=500) — restored A100 catalog record, rate, included resources, and empty locations array; rechecked September 8, 2026
- [Vultr GPU billing guide](https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently) — 730-hour monthly calculation and actual calendar-month billing; rechecked September 8, 2026
- [Vultr stopped-instance billing](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr) — stopped-instance resource reservation and destroy-to-end-billing rule; rechecked September 8, 2026
- [CoreWeave pricing](https://www.coreweave.com/pricing) — A100 single-GPU inference rate and eligibility; rechecked September 8, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — A100 80 GiB managed-deployment rate; rechecked September 8, 2026
- [Replicate pricing](https://replicate.com/pricing) — A100 80 GB private-deployment rate; rechecked September 8, 2026
- Local evidence: /opt/hostbot-v2/src/data/gpu-pricing.json, /opt/hostbot/data/ai-hosting/notes/2026-09-07-gpu-pricing-full-verification.md, /opt/hostbot/data/ai-hosting/notes/2026-08-24-jarvis-labs-gpu-pricing.md, /opt/hostbot/data/ai-hosting/notes/2026-08-28-koyeb-gpu-scale-to-zero-limits.md, and /opt/hostbot/data/ai-hosting/notes/2026-08-31-northflank-gpu-autoscaling-billing-boundary.md

*Need a self-managed A100 endpoint? This is a labeled affiliate link; source citations above remain direct. [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod) supports HostFleet's testing budget at no extra cost to you. Re-check the exact card, region, rate, storage, and shutdown behavior before purchase.*
