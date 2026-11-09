---
title: "H100 rental price per hour: current checks and future-price traps"
description: "Compare 19 dated H100 inputs, updated Verda and RunPod costs, and Lambda’s November 16 announcement without mistaking future prices for current quotes."
pubDate: 2026-07-29
updatedDate: 2026-11-09
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission through the labeled signup links at the end. That does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed H100 rental guide; calculated costs are estimates, not measured invoices.** This refresh uses HostFleet's GPU dataset, saved official checks and live public sources. On **November 9, 2026**, we rechecked Verda, both selected RunPod rates, Novita's selected catalog record and Northflank's GPU component. Lambda's public table now announces future prices rather than establishing today's account rate. The other 13 price inputs retain their October 15 checks. No GPU was provisioned, stock confirmed, workload benchmarked or account charge measured.

> **Five selected rate inputs checked:** November 9, 2026 — Verda, RunPod Pod/Flex, Novita and Northflank<br>
> **Lambda:** November 9 announcement check; current account price unverified; future table effective November 16, 2026 at 00:00 UTC<br>
> **Other 13 prices:** October 15, 2026; not newly verified by this refresh<br>
> **Lifecycle evidence:** separately dated beside each claim; Novita billing docs retain October 21 checks<br>
> **Full-dataset baseline:** September 24, 2026; this targeted check does not advance it<br>
> **Currency and planning convention:** public USD before tax; 720 continuously billable hours, not a monthly-price promise

# H100 rental price per hour: compare the product, not just the number

Among these dated inputs, **Hyperstack and Koyeb share the lowest selected rate at $2.50/hour**, checked October 15. Hyperstack sells allocated PCIe VM capacity; Koyeb exposes a serverless application instance. Equal rates do not mean equal bills. At the other end, Baseten's published per-minute rate is about **$6.50/hour**, also checked October 15, for a managed deployment rather than a bare VM.

The useful buying questions are:

1. Does the exact card, memory and topology fit the workload?
2. Is the number an instance total, a GPU component, or managed deployment compute?
3. Which lifecycle state actually stops billing?
4. Can your account launch the product in the required region?

The November 9 refresh changes the shortlist in three useful ways:

- **Verda's selected H100 is $4.938/hour**, versus this guide's October 21 $4.382 observation. That adds **$400.32** to the same 720-hour compute scenario.
- **RunPod H100 PRO Flex is $5.39/hour**, not this guide's older $4.79 input. The selected Secure PCIe Pod remains **$2.89/hour**. These are separate products, not two tariffs for the same allocation.
- **Lambda's announced one-GPU PCIe price is $3.79/GPU-hour from November 16 at 00:00 UTC.** It is not today's verified rate. The former $3.29 input is retained only as historical context; current pricing requires an account quote.

Sources: [Verda pricing](https://verda.com/pricing), [RunPod pricing](https://www.runpod.io/pricing) and [Lambda instances](https://lambda.ai/instances), checked **November 9, 2026**. These are dated observations, not a claim that each price changed today.

## 19 dated H100 rental rates and 30-day compute estimates

This table starts with the H100 row in HostFleet's `gpu-pricing.json` and retains native rates from saved official checks. November 9 checks override five selected inputs; the Lambda row is explicitly historical, not a verified current offer. The source/check column governs freshness for each row. The [live GPU pricing table](https://hostfleet.net/gpu-pricing/) remains the broader comparison, not a promise that every provider has been rechecked today.

**Each total assumes the named allocation remains billable for 720 hours; Northflank has conditional one- and eight-GPU cases, and Lambda is historical-only.** It excludes separately priced CPU/RAM, disks, IPs, network, tax, support, extra replicas and operational work. Where the listed product bundles resources, those remain included. This is neither an all-in invoice nor a performance ranking.

| Product | What the rate buys | Native list rate | 720-hour estimate | Source / checked |
|---|---|---:|---:|---|
| **Hyperstack** | PCIe VM; 28 CPU / 180 GB RAM; local storage | **$2.50/hr** | **$1,800.00** | [Official source](https://www.hyperstack.cloud/gpu-pricing), 2026-10-15 |
| **Koyeb** | Serverless instance; 15 vCPU / 180 GB RAM / 320 GB disk | **$2.50/hr** | **$1,800.00** | [Official source](https://www.koyeb.com/pricing), 2026-10-15 |
| **Massed Compute** | Base H100 VM; 20 vCPU / 128 GB RAM; not another H100 variant | **$2.73/hr** | **$1,965.60** | [Official source](https://vm.massedcompute.com/pricing), 2026-10-15 |
| **Northflank** | GPU component; one-GPU orderability unresolved; eight-GPU listing observed | **$2.74/GPU-hr** | **$1,972.80 for 1; $15,782.40 for 8, GPU-only** | [Official source](https://northflank.com/pricing), 2026-11-09 |
| **RunPod Secure Cloud** | H100 PCIe Pod; not the Serverless tier | **$2.89/hr** | **$2,080.80** | [Official source](https://www.runpod.io/pricing), 2026-11-09 |
| **Thunder Compute** | H100 SXM; 4 vCPU / 32 GB RAM / first 100 GB disk | **$3.20/hr** | **$2,304.00** | [Official source](https://www.thundercompute.com/pricing), 2026-10-15 |
| **Lambda Cloud — historical only** | One-GPU H100 PCIe; current quote required | **$3.29/hr historical, not current-verified** | **$2,368.80 historical scenario only** | [Official source](https://lambda.ai/instances), historical 2026-10-15; future-date notice checked 2026-11-09 |
| **Novita AI** | H100 SXM; 16 vCPU / 128 GB RAM / 60 GB container quota | **$3.39/hr** | **$2,440.80** | [Official source](https://api-server.novita.ai/api/v1/market/products), 2026-11-09 |
| **Jarvis Labs** | H100 SXM; 16 vCPU / 200 GB RAM | **$3.49/hr** | **$2,512.80** | [Official source](https://jarvislabs.ai/pricing), 2026-10-15 |
| **Modal** | H100 serverless container GPU; CPU and memory extra | **$0.001097/sec (≈ $3.95/hr)** | **$2,843.42** | [Official source](https://modal.com/pricing), 2026-10-15 |
| **DigitalOcean GPU Droplet** | HGX H100; 20 vCPU / 240 GiB RAM; bundled boot/scratch/transfer | **$4.41/hr** | **$3,175.20** | [Official source](https://www.digitalocean.com/pricing/gpu-droplets), 2026-10-15 |
| **Fal** | H100 custom deployment; on-demand list, not negotiated floor | **$4.50/hr** | **$3,240.00** | [Official source](https://fal.ai/pricing), 2026-10-15 |
| **Nebius** | H100 SXM/NVLink; prescribed 16 vCPU / 200 GB RAM | **$4.50/hr** | **$3,240.00** | [Official source](https://nebius.com/prices), 2026-10-15 |
| **Verda** | H100 SXM5; selected 30 CPU / 120 GB RAM; storage extra | **$4.938/hr** | **$3,555.36** | [Official source](https://verda.com/pricing), 2026-11-09 |
| **RunPod Serverless** | H100 PRO Flex worker tier; not an exact-card reservation | **$5.39/hr** | **$3,880.80** | [Official source](https://www.runpod.io/pricing), 2026-11-09 |
| **Replicate** | Private H100 model deployment; billed online-instance time | **$0.001525/sec (≈ $5.49/hr)** | **$3,952.80** | [Official source](https://replicate.com/pricing), 2026-10-15 |
| **Paperspace Machines** | H100 SXM5 compute; default disk billed separately; approval may apply | **$5.95/hr** | **$4,284.00** | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), 2026-10-15 |
| **CoreWeave Inference** | Inference-platform rate; not a self-serve one-GPU VM quote | **$6.16/hr** | **$4,435.20** | [Official source](https://www.coreweave.com/pricing), 2026-10-15 |
| **Baseten** | Managed H100 deployment; published 80 GiB VRAM label | **$0.10833/min (≈ $6.50/hr)** | **$4,679.86** | [Official source](https://www.baseten.co/pricing/), 2026-10-15 |

Northflank's estimates are **GPU-only**. Public H100 count captures have conflicted; the latest checked pricing capture lists eight. Neither a universal eight-GPU minimum nor one-GPU account availability is established. Its component price is not a one-GPU deployment quote. Modal's GPU line also needs any billed CPU and memory. Paperspace's default disk is not free just because a Machine includes a disk specification. CoreWeave's entry is specifically an inference-platform rate. Do not compare those numbers as if each bought the same ready-to-serve VM.

Per-second inputs are multiplied by 3,600; per-minute inputs by 60. The 720-hour calculation uses the native rate before rounding: for example, Baseten's **$0.10833/minute** gives **$4,679.86**, not the total obtained from a rounded $6.50/hour headline. Those per-second and per-minute inputs retain their October 15 checks and direct citations above.

## Novita: verify the $3.39 product ID and included resources

**Catalog checked November 9, 2026; conversion independently rechecked in the same day’s saved first-party implementation audit. Billing documents retain October 21, 2026 checks.** The [public product feed](https://api-server.novita.ai/api/v1/market/products) identifies `H100-80GB.16c128g` as a one-GPU **H100 SXM 80 GB** on-demand product with **16 vCPU, 128 GB RAM and a 60 GB free container-disk quota**. The CPU and system RAM are included in that selected compute rate; extra storage is not.

The November 9 feed again selects the 16-vCPU/128-GB record; the saved November 5 audit saw a 22-vCPU/150-GB variant that is absent from the latest feed. Absence today does not prove permanent withdrawal. The selected product must be checked by ID, rather than borrowing host resources from another capture. These catalog observations are not evidence that an existing instance was resized or a customer’s workload migrated.

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

## Verda: $4.938/hour changes the monthly comparison

**Selected offer checked November 9, 2026.** Verda's [pricing page](https://verda.com/pricing) and [instance-types API](https://api.verda.com/v1/instance-types) agree on **$4.938/hour** for `1H100.80S.30V`: one **H100 SXM5 80 GB**, **30 CPU and 120 GB RAM**, with storage separate. The separate 32-CPU/170-GB one-GPU shape lists the same rate; do not substitute its resources silently. This is on-demand instance pricing, not spot or Verda's serverless-container tariff.

The previous guide used **$4.382/hour**, checked October 21. The current selected price is **12.69% higher** than that historical input:

    October 21 input: $4.382 × 720 = $3,155.04
    November 9 input: $4.938 × 720 = $3,555.36
    Difference: $400.32 for the same 720 billable hours

These are differences between observations, not a one-day increase, an effective-date announcement or a measured invoice. The exact raw input matters: use $4.938 rather than the displayed two-decimal $4.94 when calculating a long allocation. In this mixed-date table, Verda now sits above the retained DigitalOcean, Fal and Nebius inputs. That is a list-price ordering, not a performance or all-in-cost verdict.

## Lambda: an announced price is not today's quote

**Public announcement checked November 9, 2026.** The [instances page](https://lambda.ai/instances) explicitly says its public prices take effect **November 16, 2026 at 00:00 UTC**, and directs users to log in for current pricing until then. A page retrieved today can legitimately describe next week's tariff.

The one-GPU table announces **H100 PCIe 80 GB at $3.79/GPU-hour**, with **26 vCPU, 225 GiB RAM and 1 TiB SSD**. Do not substitute the SXM or multi-GPU rows: prices are labeled per GPU, while an instance may contain several GPUs. Account orderability and the effective contract still need confirmation.

| Scenario | Input and status | 720-hour compute sensitivity |
|---|---|---:|
| Previously saved one-GPU PCIe rate | $3.29/hr; October 15 historical observation, not current-verified | $2,368.80 |
| Announced one-GPU PCIe rate | $3.79/GPU-hr; November 9 capture, effective November 16 at 00:00 UTC | $2,728.80 |
| Difference between those inputs | $0.50/hr, or 15.20% | $360.00 |

**Assumptions:** one GPU, 720 hours entirely under the selected tariff, before tax and separately billed resources. The future scenario is not a quote for a deployment started today and does not assume how a workload spanning the effective date will be charged. The comparison does not establish what your account currently pays. Obtain the current quote, then recheck the effective tariff before scheduling work across November 16.

This distinction also explains why the dataset can retain an old numeric value without making it fresh: a historical rate with an explicit caveat is not a current offer. Do not include Lambda in a current-price winner claim until the account rate is verified.

## RunPod: Pod and Flex have different updated inputs

**Both public inputs checked November 9, 2026.** The [rate card](https://www.runpod.io/pricing) lists **$2.89/hour for the Secure H100 PCIe Pod** and **$5.39/hour for the H100 PRO Flex worker tier**. The Flex figure replaces this guide's October 15 **$4.79/hour** input; the Pod is unchanged.

For the same assumed 720 continuously billed worker-hours, Flex rises from **$3,448.80 to $3,880.80**, a **$432.00** difference. That is not a prediction for a bursty endpoint. At 100 billable Flex worker-hours, the current compute input gives **$539.00**; a Pod held for 720 hours gives **$2,080.80**, while a Pod released after 100 allocated hours gives **$289.00**. All three examples exclude storage, tax and other charges and do not establish equivalent performance or host resources.

The decision is about allocation lifetime, not whether “serverless” sounds cheaper. A job completing does not establish that its worker stopped billing. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) separates running startup, request work, idle waiting and retained storage, with its own dated documentation checks.

## The off switch can matter more than a lower hourly rate

The lifecycle evidence below has its own dates. **No lifecycle document inherits the November 9 price-check date.** Novita retains October 21 checks; the other boundaries retain their earlier dates.

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

**Bottom line:** the dated rate floor is useful for a shortlist, not a purchasing verdict. Novita's unchanged price still requires exact product-ID matching and includes a billable image-pull phase. Verda’s refreshed price adds $400.32 to the same 720-hour scenario; RunPod’s Flex correction adds $432.00. Lambda’s future announcement must not masquerade as today’s rate. Buy a verified product and lifecycle, not a copied GPU-hour number.

## Turn the shortlist into a deployment decision

- **Still deciding whether H100 memory is necessary?** Start with the [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before treating this rate table as a hardware requirement.
- **Already know the shape and need a billable-hours estimate?** Put active work, pulling, idle time and retained storage into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) rather than extending an hourly headline across every calendar hour.
- **Building a request-driven endpoint instead of holding a VM?** Compare the [serverless GPU lifecycle and pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) before selecting a provider on rate alone.

## Sources and verification scope

- **November 9, 2026 — selected current prices and announcement:** [RunPod](https://www.runpod.io/pricing) (Secure PCIe Pod and H100 PRO Flex), [Northflank](https://northflank.com/pricing) (H100 GPU component and count caveat), [Verda pricing](https://verda.com/pricing) plus [instance-types API](https://api.verda.com/v1/instance-types), and [Lambda](https://lambda.ai/instances) (future-effective notice, not current account pricing). Novita’s legacy catalog and saved first-party implementation audit reconfirm the selected product and $3.39/hour conversion. Source files and conversion checks are saved in HostFleet’s November 9 audit ledger; no account or rendered UI observation is implied.
- **October 21, 2026 — Novita retained billing evidence:** [public legacy GPU catalog](https://api-server.novita.ai/api/v1/market/products), [marketplace](https://novita.ai/gpus-console/explore) and its currently referenced first-party script; [instance pricing](https://docs.novita.ai/guides/gpu-instance-pricing.md), [management](https://docs.novita.ai/guides/gpu-instance-quickstart-manage-instances.md), [FAQ](https://docs.novita.ai/guides/gpu-instance-faq.md), [V2 product precision/unit schema](https://docs.novita.ai/api-reference/gpus-v2-list-products.md), and [separate account-balance unit schema](https://docs.novita.ai/api-reference/basic-get-user-balance.md). Public data and code inspection only; no rendered marketplace or authenticated billing observation.
- **Historical price comparisons:** Verda $4.382/hour is the October 21 guide observation; RunPod Flex $4.79/hour and Lambda PCIe $3.29/hour are October 15 observations from the prior guide. Differences are not provider-announced change dates.
- **October 15, 2026 — other 13 prices:** direct official citations beside each retained rate, backed by HostFleet's saved source ledger. They are not relabeled November 9 prices. Baseten's retained per-minute input is historical pricing evidence, not a fresh extraction from its JavaScript shell.
- **Retained lifecycle sources:** [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) (Aug. 13); [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) and [autoscaling](https://www.koyeb.com/docs/run-and-scale/autoscaling) (Aug. 28); [Lambda billing](https://docs.lambda.ai/public-cloud/billing/), [lifecycle](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/) and [filesystems](https://docs.lambda.ai/public-cloud/filesystems/) (Sept. 14); [Verda billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing) and [lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) (Sept. 25); [Nebius pricing](https://docs.nebius.com/compute/resources/pricing) and [stop/start](https://docs.nebius.com/compute/virtual-machines/stop-start) (Sept. 10 lifecycle check); [DigitalOcean Droplet billing](https://docs.digitalocean.com/products/droplets/details/pricing/) (Aug. 20). All retained dates are in 2026 and do not inherit today's price-check date.

*Need self-managed H100 capacity? These are labeled affiliate links; source citations above stay direct. <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> and <a href="/go/digitalocean-gpu" rel="sponsored nofollow">DigitalOcean GPU signup (affiliate)</a> support HostFleet at no extra cost to you. Recheck the exact card, region, account quote, retained storage and release behavior before purchasing.*
