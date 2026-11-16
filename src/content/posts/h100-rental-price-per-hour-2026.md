---
title: "H100 rental price per hour: effective Lambda rates and updated costs"
description: "Compare 19 dated H100 price inputs, Lambda’s effective November 16 tariff, and updated Verda and RunPod Flex costs without confusing list prices with quotes."
pubDate: 2026-07-29
updatedDate: 2026-11-16
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission through the labeled signup links at the end. That does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed H100 rental guide; calculated costs are estimates, not measured invoices.** On **November 16, 2026**, we checked Lambda's now-effective public tariff, Verda's selected H100 VM and RunPod's selected Pod/Flex prices. Northflank and Novita retain November 9 price checks; the other 13 comparison inputs retain October 15 checks. No GPU was provisioned, stock confirmed, workload benchmarked or account charge measured.

> **Four selected inputs checked:** November 16, 2026 — Lambda PCIe, Verda, RunPod Pod and Flex<br>
> **Lambda effective date:** November 16, 2026 at 00:00 UTC; this source capture is after that instant<br>
> **Other prices:** Northflank/Novita November 9; 13 others October 15, 2026; not reverified today<br>
> **Lifecycle evidence:** separately dated beside each claim; not rechecked by this price refresh<br>
> **Full-dataset baseline:** September 24, 2026; targeted checks do not advance it<br>
> **Currency and planning:** public USD before tax; 720 continuously billable hours, not a monthly-price promise

# H100 rental price per hour: match the rate, product and effective date

The important change today is not just a number: **Lambda's $3.79/GPU-hour one-GPU H100 PCIe tariff is now effective**, no longer merely a future announcement. That gives a **$2,728.80** compute estimate for 720 billable hours. It remains a public list price, not an authenticated quote or available-capacity check.

Two other inputs have moved since this guide's November 9 check:

- **Verda's selected H100 SXM5 VM lists $5.241/hour**, up from $4.938: **$3,773.52** for 720 hours, a **$218.16** increase between observations.
- **RunPod H100 PRO Flex lists $5.89/hour**, up from $5.39: **$4,240.80** for 720 billable worker-hours, a **$360.00** increase. The distinct Secure H100 PCIe Pod remains **$2.89/hour**, or **$2,080.80** for 720 allocated hours.

Sources: [Lambda instances](https://lambda.ai/instances), [Verda pricing](https://verda.com/pricing) plus its [instance catalog](https://api.verda.com/v1/instance-types), and [RunPod pricing](https://www.runpod.io/pricing), all checked **November 16, 2026**. These are compute-only scenarios, not equal-performance or all-in-cost comparisons. Differences between captures do not establish when Verda or RunPod changed their tariffs.

Among the **retained October 15 observations**, Hyperstack and Koyeb share the lowest selected rate at **$2.50/hour**. That is a historical shortlist input, not a freshly verified cheapest-provider claim. One buys a PCIe VM; the other an application instance. First match GPU variant, GPU count, bundled resources, account access and the release operation.

## 19 dated H100 rental rates and 30-day compute estimates

This table starts with the H100 row in HostFleet's `gpu-pricing.json`, retaining native units and dated official evidence. Today's four selected inputs override older observations. The [live GPU pricing table](https://hostfleet.net/gpu-pricing/) is the broader data page; it is not a promise that every provider was rechecked today.

**Each total assumes the named allocation remains billable for 720 hours.** Northflank has conditional one- and eight-GPU cases. Separately priced CPU/RAM, disks, IPs, network, tax, support and extra replicas are excluded; bundled resources remain included. This is neither an invoice nor a performance ranking.

| Product | What the rate buys | Native list rate | 720-hour estimate | Source / checked |
|---|---|---:|---:|---|
| **Hyperstack** | PCIe VM; 28 CPU / 180 GB RAM; local storage | **$2.50/hr** | **$1,800.00** | [Official source](https://www.hyperstack.cloud/gpu-pricing), 2026-10-15 |
| **Koyeb** | Serverless instance; 15 vCPU / 180 GB RAM / 320 GB disk | **$2.50/hr** | **$1,800.00** | [Official source](https://www.koyeb.com/pricing), 2026-10-15 |
| **Massed Compute** | Base H100 VM; 20 vCPU / 128 GB RAM; not another H100 variant | **$2.73/hr** | **$1,965.60** | [Official source](https://vm.massedcompute.com/pricing), 2026-10-15 |
| **Northflank** | GPU component; one-GPU orderability unresolved; eight-GPU listing observed | **$2.74/GPU-hr** | **$1,972.80 for 1; $15,782.40 for 8, GPU-only** | [Official source](https://northflank.com/pricing), 2026-11-09 |
| **RunPod Secure Cloud** | H100 PCIe Pod; not the Serverless tier | **$2.89/hr** | **$2,080.80** | [Official source](https://www.runpod.io/pricing), 2026-11-16 |
| **Thunder Compute** | H100 SXM; 4 vCPU / 32 GB RAM / first 100 GB disk | **$3.20/hr** | **$2,304.00** | [Official source](https://www.thundercompute.com/pricing), 2026-10-15 |
| **Novita AI** | H100 SXM; 16 vCPU / 128 GB RAM / 60 GB container quota | **$3.39/hr** | **$2,440.80** | [Official source](https://api-server.novita.ai/api/v1/market/products), 2026-11-09 |
| **Jarvis Labs** | H100 SXM; 16 vCPU / 200 GB RAM | **$3.49/hr** | **$2,512.80** | [Official source](https://jarvislabs.ai/pricing), 2026-10-15 |
| **Lambda Cloud** | One-GPU H100 PCIe; 26 vCPU / 225 GiB RAM / 1 TiB SSD | **$3.79/GPU-hr** | **$2,728.80** | [Official source](https://lambda.ai/instances), 2026-11-16; effective 00:00 UTC |
| **Modal** | H100 serverless container GPU; CPU and memory extra | **$0.001097/sec (≈ $3.95/hr)** | **$2,843.42** | [Official source](https://modal.com/pricing), 2026-10-15 |
| **DigitalOcean GPU Droplet** | HGX H100; 20 vCPU / 240 GiB RAM; bundled boot/scratch/transfer | **$4.41/hr** | **$3,175.20** | [Official source](https://www.digitalocean.com/pricing/gpu-droplets), 2026-10-15 |
| **Fal** | H100 custom deployment; on-demand list, not negotiated floor | **$4.50/hr** | **$3,240.00** | [Official source](https://fal.ai/pricing), 2026-10-15 |
| **Nebius** | H100 SXM/NVLink; prescribed 16 vCPU / 200 GB RAM | **$4.50/hr** | **$3,240.00** | [Official source](https://nebius.com/prices), 2026-10-15 |
| **Verda** | H100 SXM5; selected 30 CPU / 120 GB RAM; storage extra | **$5.241/hr** | **$3,773.52** | [Official source](https://verda.com/pricing), 2026-11-16 |
| **RunPod Serverless** | H100 PRO Flex worker tier; not an exact-card reservation | **$5.89/hr** | **$4,240.80** | [Official source](https://www.runpod.io/pricing), 2026-11-16 |
| **Replicate** | Private H100 model deployment; billed online-instance time | **$0.001525/sec (≈ $5.49/hr)** | **$3,952.80** | [Official source](https://replicate.com/pricing), 2026-10-15 |
| **Paperspace Machines** | H100 SXM5 compute; default disk billed separately; approval may apply | **$5.95/hr** | **$4,284.00** | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), 2026-10-15 |
| **CoreWeave Inference** | Inference-platform rate; not a self-serve one-GPU VM quote | **$6.16/hr** | **$4,435.20** | [Official source](https://www.coreweave.com/pricing), 2026-10-15 |
| **Baseten** | Managed H100 deployment; published 80 GiB VRAM label | **$0.10833/min (≈ $6.50/hr)** | **$4,679.86** | [Official source](https://www.baseten.co/pricing/), 2026-10-15 |





Northflank's estimates are **GPU-only**. Public H100 count captures have conflicted; the latest checked pricing capture lists eight. Neither a universal eight-GPU minimum nor one-GPU account availability is established. Its component price is not a one-GPU deployment quote. Modal's GPU line also needs any billed CPU and memory. Paperspace's default disk is not free just because a Machine includes a disk specification. CoreWeave's entry is specifically an inference-platform rate. Do not compare those numbers as if each bought the same ready-to-serve VM.

Per-second inputs are multiplied by 3,600; per-minute inputs by 60. The 720-hour calculation uses the native rate before rounding: for example, Baseten's **$0.10833/minute** gives **$4,679.86**, not the total obtained from a rounded $6.50/hour headline. Those per-second and per-minute inputs retain their October 15 checks and direct citations above.

## Novita: verify the $3.39 product ID and included resources

**Catalog checked November 9, 2026; conversion independently rechecked in the same day’s saved first-party implementation audit. Billing documents retain October 21, 2026 checks.** The [public product feed](https://api-server.novita.ai/api/v1/market/products) identifies `H100-80GB.16c128g` as a one-GPU **H100 SXM 80 GB** on-demand product with **16 vCPU, 128 GB RAM and a 60 GB free container-disk quota**. The CPU and system RAM are included in that selected compute rate; extra storage is not.

The November 9 feed again selects the 16-vCPU/128-GB record; the saved November 5 audit saw a 22-vCPU/150-GB variant that is absent from the November 9 feed. Absence in that capture does not prove permanent withdrawal. The selected product must be checked by ID, rather than borrowing host resources from another capture. These catalog observations are not evidence that an existing instance was resized or a customer’s workload migrated.

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

## Verda: price the exact VM, not a rounded headline

**Selected on-demand offer checked November 16, 2026.** Verda's [pricing page](https://verda.com/pricing) and [instance-types API](https://api.verda.com/v1/instance-types) agree on **$5.241/hour** for `1H100.80S.30V`: one **H100 SXM5 80 GB**, **30 CPU and 120 GB RAM**, with storage separate. The separate 32-CPU/170-GB one-GPU shape lists the same rate; do not silently substitute its resources. Neither is the spot or serverless-container tariff.

Against this guide's **November 9 $4.938/hour observation**, the selected input is **6.14% higher**:

    November 9:  $4.938 × 720 = $3,555.36
    November 16: $5.241 × 720 = $3,773.52
    Difference: $218.16 for the same 720 billable hours

Those are observations a week apart, not a measured invoice or an announced tariff-change date. Use $5.241 in calculations rather than a two-decimal $5.24 display: rounding first understates this scenario by $0.72. Storage and the separately dated prepayment/refund rules still need their own budget lines.

## Lambda: the announced tariff is now effective

**Public page checked November 16, 2026, after 00:00 UTC.** The [instances page](https://lambda.ai/instances) still explicitly states that its table takes effect **November 16, 2026 at 00:00 UTC**. The capture was made after that instant. This is now an effective public list tariff, not a future-only announcement. It does **not** establish your account's contractual rate, region, quota or stock.

The one-GPU table lists **H100 PCIe 80 GB at $3.79/GPU-hour**, with **26 vCPU, 225 GiB RAM and 1 TiB SSD**. The one-GPU **H100 SXM 80 GB** is a different offer at **$4.89/GPU-hour**, with **26 vCPU, 225 GiB RAM and 2.75 TiB SSD**. Both observations are from today's source. The cheaper per-GPU rates in multi-GPU tables do not buy a one-GPU instance.

| Scenario | Dated input | 720-hour compute estimate |
|---|---|---:|
| Historical one-GPU PCIe observation | $3.29/hr; October 15, not a current offer | $2,368.80 |
| Effective public one-GPU PCIe tariff | $3.79/GPU-hr; checked November 16, effective 00:00 UTC | $2,728.80 |
| Effective public one-GPU SXM tariff | $4.89/GPU-hr; checked November 16, effective 00:00 UTC | $3,520.80 |

For the PCIe comparison, the new public input is **$0.50/hour higher**, or **15.20%**, than the historical observation: **$50** more for 100 hours or **$360** for 720. Those are calculated sensitivities, not evidence of what a particular account paid before or after the change.

**Assumptions:** one GPU, all modeled hours under the selected tariff, before tax and separately billed resources. This does not establish proration for a workload spanning the boundary, treatment of existing instances or an account-specific discount. Save the exact quote before launch. A separate retained filesystem can outlive the instance; the lifecycle sources below retain their older dates.

## RunPod: unchanged PCIe Pod, higher Flex worker rate

**Both public inputs checked November 16, 2026.** The [rate card](https://www.runpod.io/pricing) lists **$2.89/hour for the Secure H100 PCIe Pod** and **$5.89/hour for the H100 PRO Flex worker tier**. The Secure row agrees with the embedded Secure Cloud offer; do not substitute the cheaper Community Cloud entry. Flex is a worker tier, not an exact-card reservation.

The guide's **November 9 Flex input was $5.39/hour**. Today's input is **9.28% higher**. For 720 continuously billed worker-hours, the compute estimate rises from **$3,880.80 to $4,240.80**, a **$360.00** difference. At 100 billable worker-hours, the new Flex input gives **$589.00**; a Pod released after 100 allocated hours gives **$289.00**, while a Pod held for 720 hours gives **$2,080.80**. These scenarios exclude storage, tax and other charges and do not establish equal performance or host resources.

The decision is about allocation lifetime. A bursty endpoint need not accumulate 720 worker-hours, but a completed request does not establish that its worker stopped billing. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) separates startup, request work, idle waiting and retained storage. Its own tables have separately dated checks; use today's rate above for this H100 scenario.

## The off switch can matter more than a lower hourly rate

The lifecycle evidence below has its own dates. **No lifecycle document inherits the November 16 price-check date.** Novita retains October 21 checks; the other boundaries retain their earlier dates.

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

**Bottom line:** the dated rate floor is useful for a shortlist, not a purchasing verdict. Novita's unchanged price still requires exact product-ID matching and includes a billable image-pull phase. Compared with the November 9 guide inputs, Verda adds $218.16 and RunPod Flex adds $360.00 to their respective 720-hour scenarios. Lambda’s public tariff is now effective, but it is not proof of an account quote or available capacity. Buy a verified product and lifecycle, not a copied GPU-hour number.

## Turn the shortlist into a deployment decision

- **Still deciding whether H100 memory is necessary?** Start with the [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before treating this rate table as a hardware requirement.
- **Already know the shape and need a billable-hours estimate?** Put active work, pulling, idle time and retained storage into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) rather than extending an hourly headline across every calendar hour.
- **Building a request-driven endpoint instead of holding a VM?** Compare the [serverless GPU lifecycle and pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) before selecting a provider on rate alone.

## Sources and verification scope

- **November 16, 2026 — four selected inputs:** fresh public source captures for [Lambda](https://lambda.ai/instances) (one-GPU PCIe/SXM table and effective-date notice), [RunPod](https://www.runpod.io/pricing) (Secure PCIe Pod and H100 PRO Flex), [Verda pricing](https://verda.com/pricing) plus [instance-types API](https://api.verda.com/v1/instance-types) (exact on-demand H100 shape). Captures occur after Lambda's effective instant. No authenticated quote, rendered-console observation or stock check is implied. Saved source bodies, hashes, UTC retrieval times, calculations and link checks accompany this draft.
- **November 9, 2026 — retained checks and comparison history:** [RunPod](https://www.runpod.io/pricing) (Secure PCIe Pod and H100 PRO Flex), [Northflank](https://northflank.com/pricing) (H100 GPU component and count caveat), [Verda pricing](https://verda.com/pricing) plus [instance-types API](https://api.verda.com/v1/instance-types), and [Lambda](https://lambda.ai/instances) (then-future-effective notice; superseded for public tariff status by the November 16 capture). Novita’s legacy catalog and saved first-party implementation audit reconfirm the selected product and $3.39/hour conversion. Source files and conversion checks are saved in HostFleet’s November 9 audit ledger; no account or rendered UI observation is implied.
- **October 21, 2026 — Novita retained billing evidence:** [public legacy GPU catalog](https://api-server.novita.ai/api/v1/market/products), [marketplace](https://novita.ai/gpus-console/explore) and its currently referenced first-party script; [instance pricing](https://docs.novita.ai/guides/gpu-instance-pricing.md), [management](https://docs.novita.ai/guides/gpu-instance-quickstart-manage-instances.md), [FAQ](https://docs.novita.ai/guides/gpu-instance-faq.md), [V2 product precision/unit schema](https://docs.novita.ai/api-reference/gpus-v2-list-products.md), and [separate account-balance unit schema](https://docs.novita.ai/api-reference/basic-get-user-balance.md). Public data and code inspection only; no rendered marketplace or authenticated billing observation.
- **Historical price comparisons:** Verda $4.382/hour is the October 21 guide observation; RunPod Flex $4.79/hour and Lambda PCIe $3.29/hour are October 15 observations from the prior guide. Verda $4.938/hour and RunPod Flex $5.39/hour are the November 9 guide inputs. Differences are not provider-announced change dates; Lambda alone has the explicit effective date above.
- **October 15, 2026 — other 13 prices:** direct official citations beside each retained rate, backed by HostFleet's saved source ledger. They are not relabeled November 9 prices. Baseten's retained per-minute input is historical pricing evidence, not a fresh extraction from its JavaScript shell.
- **Retained lifecycle sources:** [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) (Aug. 13); [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) and [autoscaling](https://www.koyeb.com/docs/run-and-scale/autoscaling) (Aug. 28); [Lambda billing](https://docs.lambda.ai/public-cloud/billing/), [lifecycle](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/) and [filesystems](https://docs.lambda.ai/public-cloud/filesystems/) (Sept. 14); [Verda billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing) and [lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) (Sept. 25); [Nebius pricing](https://docs.nebius.com/compute/resources/pricing) and [stop/start](https://docs.nebius.com/compute/virtual-machines/stop-start) (Sept. 10 lifecycle check); [DigitalOcean Droplet billing](https://docs.digitalocean.com/products/droplets/details/pricing/) (Aug. 20). All retained dates are in 2026 and do not inherit today's price-check date.

*Need self-managed H100 capacity? These are labeled affiliate links; source citations above stay direct. <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> and <a href="/go/digitalocean-gpu" rel="sponsored nofollow">DigitalOcean GPU signup (affiliate)</a> support HostFleet at no extra cost to you. Recheck the exact card, region, account quote, retained storage and release behavior before purchasing.*
