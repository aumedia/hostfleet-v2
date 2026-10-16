---
title: "GPU cloud cost calculator 2026: rates, idle GPUs and snapshot costs"
description: "Estimate eight dated A100 rates, idle GPU costs and retained storage. Includes corrected CPU inclusions and a DigitalOcean snapshot-budget worked example."
pubDate: 2026-08-09
updatedDate: 2026-10-16
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through the labeled signup links on this page. That does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed prices and billing rules; calculated costs are estimates, not measured invoices.** We rechecked eight selected A100 80 GB rates and the cited lifecycle documentation on **October 16, 2026**. No GPU was rented, workload benchmarked, stock confirmed, or invoice measured. This is a worked GPU cloud cost calculator: substitute your launch-time quote and expected billable duration into the formulas below.

> **Selected A100 rates and cited billing rules checked:** October 16, 2026<br>
> **DigitalOcean snapshot, invoice and spend-alert documentation checked:** October 16, 2026<br>
> **Dataset-wide verification baseline:** September 24, 2026; this targeted refresh does not advance that date<br>
> **Currency:** public USD list prices before tax<br>
> **Planning conventions:** eight useful hours, a 168-hour week, and a 720-hour sensitivity case—not provider monthly billing promises

# GPU cloud cost calculator: useful work, idle GPUs and retained storage

An hourly GPU rate is an input, not a budget. Start with:

    estimated usage cost = useful compute
                         + billed startup and teardown
                         + unattended compute
                         + retained storage and other resources

Then calculate credits, discounts and taxes separately. Use the provider's native billing unit and minimum; do not round every second or minute to cents before adding the total.

This refresh fixes three inputs in the earlier calculator. **Thunder's $1.09/hour A100 base includes eight vCPUs**, so the old $1.25 minimum added CPU that was already included. **Verda's selected A100 is now $1.996/hour**, versus this page's October 9 input of $1.870. **RunPod's Secure Cloud A100 PCIe is now consistently $1.79/hour** across its visible table and embedded offer; yesterday's $1.79/$1.59 source conflict no longer appears in today's capture.

There is also a storage trap: DigitalOcean lists boot disks in **GiB**, but bills Droplet snapshots in **GB-month**. Treating those units as interchangeable can understate a retention scenario before any GPU runtime error occurs.

## Eight dated A100 80 GB calculator inputs

These are selected entries from the same baseline as our [GPU pricing table](https://hostfleet.net/gpu-pricing/), reconciled against today's official sources. Verda and RunPod use today's direct vendor values rather than the dataset's earlier cells. The table is a dated snapshot, not a promise of launchable capacity or equal performance.

| Selected product | Hourly input | Included resources / boundary | 720-hour estimate | Official source / checked |
|---|---:|---|---:|---|
| **Thunder Compute A100 base** | **$1.09/hr** | 8 included vCPUs, 64 GB RAM, first 100 GB disk per GPU | **$784.80** | [Official source](https://www.thundercompute.com/pricing), Oct. 16, 2026 |
| **Hyperstack A100 PCIe VM** | **$1.35/hr** | One GPU; 28 CPU and 120 GB RAM; local storage included | **$972.00** | [Official source](https://www.hyperstack.cloud/gpu-pricing), Oct. 16, 2026 |
| **Jarvis Labs A100 instance** | **$1.49/hr** | One-GPU on-demand row; 16 vCPU and 112 GB RAM | **$1,072.80** | [Official source](https://jarvislabs.ai/pricing), Oct. 16, 2026 |
| **Koyeb A100 Instance** | **$1.60/hr** | 15 vCPU, 180 GB RAM, 320 GB disk; not the separate A100 SXM tier | **$1,152.00** | [Official source](https://www.koyeb.com/pricing), Oct. 16, 2026 |
| **RunPod Secure A100 PCIe Pod** | **$1.79/hr** | Selected Secure Cloud allocation; disks billed separately | **$1,288.80** | [Official source](https://www.runpod.io/pricing), Oct. 16, 2026 |
| **Verda A100 SXM4 80 GB VM** | **$1.996/hr** | Exact 1A100.22V shape: 22 CPU, 120 GB RAM; storage extra | **$1,437.12** | [Official source](https://verda.com/pricing), Oct. 16, 2026 |
| **Vultr A100 Cloud GPU** | **$2.397/hr** | Exact API plan; 12 vCPU and 120 GB RAM; locations list empty | **$1,725.84** | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 16, 2026 |
| **Paperspace A100-80G Machine** | **$3.18/hr** | Machine compute; storage, IPs and add-ons extra | **$2,289.60** | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 16, 2026 |

**All rates above checked October 16, 2026.** The 720-hour column is simply the exact hourly input multiplied by 720, rounded at the end. It excludes separately billed storage, IPs, transfer, additional resources, minimums and billing rounding, taxes, discounts, and any mandatory account-plan charge. For Vultr, the public API also lists a monthly price; the rate-times-hours column is not a reconstruction of its invoice rules. Koyeb is an application Instance, RunPod is a Pod, and the others are VM-like products with different bundles. Paperspace's figure is Machine compute, not a complete deployment bill.

Thunder's current [pricing page](https://www.thundercompute.com/pricing) includes eight vCPUs, 64 GB RAM and the first 100 GB disk per GPU at the base price. Its [public pricing API](https://api.thundercompute.com:8443/v1/pricing) agrees on `a100xl_x1 = 1.09`; the $0.04/vCPU-hour extra applies beyond the included allocation, not to four supposedly missing mandatory CPUs. Correcting that inclusion removes **$115.20** from the old 720-hour estimate: `($1.25 − $1.09) × 720`.

For Verda, both the [pricing page](https://verda.com/pricing)'s embedded on-demand offer and the [instance-types API](https://api.verda.com/v1/instance-types)'s `1A100.22V` row agree on **$1.996/hour**. Do not substitute its separate Spot or Serverless price. Compared with this calculator's October 9 observation of $1.870, that adds **$90.72 over 720 hours**: `(1.996 − 1.870) × 720`. Yesterday's A100-guide check was $1.976; the additional observed difference is **$14.40 over 720 hours**. These are differences between dated observations, not an announced effective-date claim.

The [RunPod pricing page](https://www.runpod.io/pricing)'s visible Secure Cloud A100 PCIe row and structured Secure Cloud offer both show **$1.79/hour** today. That resolves the contradiction recorded on October 15; it does not validate the older $1.59 as today's purchase rate. The new input adds **$144.00** to a 720-hour scenario versus this calculator's previous input. Confirm the exact tier, card, region and storage in your account before launching.

Vultr's [public plans API](https://api.vultr.com/v2/plans?per_page=500) returns **$2.397/hour** for `vcg-a100-12c-120g-80vram`. Its `locations` list is empty, so the catalog rate does not establish an orderable location. Keep exact native rates; do not calculate the table from rounded display cells.

Choose hardware that fits before comparing cost. The [VRAM sizing guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) covers memory headroom; the [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) covers the wider product matrix. Companion pages have their own check dates: they are not substitutes for today's vendor input.

## Calculate an eight-hour job—and one week of missed cleanup

Assume one named configuration performs eight useful hours, but remains billable for all 168 hours in a week:

    useful compute = hourly input × 8
    unattended compute = hourly input × 160
    total week = hourly input × 168

| Product | Eight useful hours | 168 hours billable | Extra 160 hours | One forgotten day |
|---|---:|---:|---:|---:|
| Thunder Compute A100 base | $8.72 | $183.12 | $174.40 | $26.16 |
| Hyperstack A100 PCIe VM | $10.80 | $226.80 | $216.00 | $32.40 |
| Jarvis Labs A100 instance | $11.92 | $250.32 | $238.40 | $35.76 |
| Koyeb A100 Instance | $12.80 | $268.80 | $256.00 | $38.40 |
| RunPod Secure A100 PCIe Pod | $14.32 | $300.72 | $286.40 | $42.96 |
| Verda A100 SXM4 80 GB VM | $15.97 | $335.33 | $319.36 | $47.90 |
| Vultr A100 Cloud GPU | $19.18 | $402.70 | $383.52 | $57.53 |
| Paperspace A100-80G Machine | $25.44 | $534.24 | $508.80 | $76.32 |

These are compute-only sensitivities from the October 16 inputs, not forecasts that each provider will remain allocated by default. They assume the release action fails or is never performed, one configuration stays billable throughout, and the rate does not change. Startup, add-ons, tax, unit rounding and refunds are excluded.

The useful-work range is **$8.72 to $25.44**. The week-long exposure is **$183.12 to $534.24**. In every row, the extra 160 hours cost twenty times the eight useful hours. A cleanup policy can matter much more than a small hourly discount.

## Stop is not a universal billing boundary

The following rules were checked against the linked official documentation on **October 16, 2026**. They establish documented state treatment, not exact asynchronous ledger timestamps.

| Product | Documented compute-release action | Remaining cost or operational boundary |
|---|---|---|
| [Thunder](https://www.thundercompute.com/docs/guides/stopping-instances.md) | Delete the instance; no native Stop feature | Preserve required state through its snapshot workflow; snapshots and a replacement instance have their own costs |
| [Hyperstack](https://docs.hyperstack.cloud/docs/billing/states-and-billing) | Hibernate or delete; **Stop/SHUTOFF remains billed** | Hibernation retains billable root data, optional public IP, and attached volumes |
| [Jarvis Labs](https://docs.jarvislabs.ai/faqs/) | Pause or delete releases GPU resources | Paused data bills separately; released GPU capacity is not guaranteed on resume |
| [RunPod](https://docs.runpod.io/pods/manage-pods) | Stop releases GPU; termination deletes the Pod | Container disk is cleared on stop; local volume survives stop, not termination; separate network volume survives either |
| [Koyeb](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) | Eligible GPU Service can set minimum Instances to zero | Public preview; default idle period is five minutes, and idle/wake conditions apply |
| [Verda](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) | Delete; **shutdown continues charging** | Storage not selected for deletion continues charging |
| [Vultr](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr) | Destroy; **stopped remains billed** | Reserved resources keep charging until destruction; preserve required data first |
| [Paperspace](https://docs.digitalocean.com/products/paperspace/pricing/) | Shut down or power off to stop Machine compute | Attached storage, IPs and other add-ons keep billing until removed |

For a Koyeb A100, one nominal five-minute default idle tail is `1.60 × 5/60 = $0.1333`, before useful work, startup, additional Instances or other costs. It is not a per-request fee or a measured cold-start result. Use the [serverless GPU matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) when request wake-up and warm minimums determine the architecture.

Verda's [billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), checked October 16, describes prepaid **10-minute increments**, with an unused terminated portion refunded within the next billing period. At $1.996/hour, one nominal block is approximately **$0.3327**. That is cash-flow arithmetic, not a nonrefundable minimum-charge claim. Shutting down instead of deleting leaves another **$319.36** of estimated compute in the 160-hour failure case.

## RunPod: keep storage separate from the resolved GPU price

RunPod's [Pod pricing](https://docs.runpod.io/pods/pricing) and [storage documentation](https://docs.runpod.io/pods/storage/types), checked October 16, list local volume disk at **$0.10/GB-month running** and **$0.20/GB-month stopped**. A separate standard network volume below 1 TB lists **$0.07/GB-month**. Container disk is another charge while running; it is erased on stop.

For **100 GB** kept through eight running hours and 160 stopped hours, using **720 hours only as a planning divisor**:

    eight-hour GPU estimate = $1.79 × 8 = $14.32
    local volume = 100 × ($0.10 × 8 + $0.20 × 160) / 720
                 = $4.5556
    GPU plus local volume ≈ $18.88

A standard 100 GB network volume kept for all 168 hours gives:

    network storage = 100 × $0.07 × 168 / 720 = $1.6333
    GPU plus network volume ≈ $15.95

These scoped totals exclude required container-disk charges, transfer, other add-ons, tax and native-unit rounding. Pod-local storage bills per second; network volumes bill hourly. The lower network-storage number does not prove equivalent I/O or placement. Termination deletes local volume data, so verify any separate durable copy first. RunPod also warns that restarting a stopped Pod can return **zero GPUs** if capacity changed. Storage retention is not capacity reservation.

The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the product split. For this example, use the October 16 GPU input above, not an older number in another article.

## DigitalOcean: a snapshot can break a small GPU-test budget

DigitalOcean's [GPU pricing page](https://www.digitalocean.com/pricing/gpu-droplets), checked October 16, lists the **one-GPU RTX 4000 Ada at $0.76/hour**, with eight vCPUs, 32 GiB RAM and a **500 GiB boot disk**. The catalog shows no scratch allocation for that SKU. This is a separate small-GPU retention example, not an A100 substitute or a recommendation that 20 GB VRAM fits your workload.

The official [Droplet billing documentation](https://docs.digitalocean.com/products/droplets/details/pricing/) says on-demand GPU compute bills from creation until destruction, including while powered off. Snapshotting and powering off therefore do not themselves end that compute bill.

There is still a source conflict about short-lived GPU minimums, checked October 16:

| Official source | Published on-demand GPU minimum | RTX 4000 Ada arithmetic per created Droplet |
|---|---|---:|
| GPU marketing pricing FAQ | Five minutes | `$0.76 × 5/60 ≈ $0.0633` |
| Droplet product billing docs | 60 seconds or $0.01, whichever is higher | `max($0.76/60, $0.01) ≈ $0.0127` |

Neither is silently selected as universal. Two sequential creations mean two minimum considerations, not one. The figures are unrounded rate arithmetic, not observed invoice rounding or proof of an exact cutoff. Confirm account terms and retain a conservative allowance until the contradiction is resolved.

### Convert disk units, then state the storage assumption

DigitalOcean's [snapshot pricing documentation](https://docs.digitalocean.com/products/snapshots/details/pricing/), checked October 16, prices **Droplet snapshots at $0.06/GB-month**, with a **$0.01 minimum**, based on snapshot size. Volume snapshots use a different published unit, GiB; do not mix the two.

The 500 GiB boot allocation converts to decimal GB like this:

    500 GiB × 2^30 / 10^9 = 536.870912 GB

That conversion does **not** prove the billed snapshot will be 536.870912 GB. Actual snapshot size, its relationship to allocated boot capacity, and the provider's proration convention need account-visible confirmation.

For an illustrative sensitivity only, assume billed snapshot size equals that converted full-disk allocation, storage is prorated over **730 hours**, one snapshot is retained for **24 hours**, and the source and replacement together incur **two billable compute hours**, without overlapping:

    compute = 2 × $0.76 = $1.52
    snapshot = 536.870912 × $0.06 × 24/730 ≈ $1.0590
    scoped estimate ≈ $2.58

That scenario already exceeds a **$2 planning target** before taxes, add-ons or failure contingency. It is not a predicted charge, a measured storage size, a source-verified hourly snapshot divisor, or an upper bound. The lesson is to obtain a defensible storage-size and proration quote before promising that a small GPU experiment fits its budget.

### Snapshot survival is narrower than machine survival

The [snapshot workflow](https://docs.digitalocean.com/products/snapshots/how-to/snapshot-droplets/), [limits](https://docs.digitalocean.com/products/snapshots/details/limits/) and [restore documentation](https://docs.digitalocean.com/products/snapshots/how-to/create-and-restore-droplets/), all checked October 16, establish these boundaries:

- GPU snapshots capture the **boot disk, not scratch**. Attached volumes require their own snapshot plan.
- A replacement needs disk at least as large as the source. A smaller image is not permission to recreate onto a smaller source-disk allocation.
- Snapshots preserve disk contents, not the Droplet's settings or IP. Live snapshots can compromise consistency; powering off for consistency still incurs GPU compute charges.
- The selected RTX 4000 Ada has no listed scratch disk, so it cannot establish a scratch-loss experiment result. Inspect the actual device layout before choosing data paths.

DigitalOcean's [destruction guide](https://docs.digitalocean.com/products/droplets/how-to/destroy/), checked October 16, says associated resources are **not destroyed by default**. Preserve the exact snapshot needed for recovery; later delete only the snapshot and other resources you actually intend to remove. A successful deletion request is not itself settled billing evidence, and a blocked or delayed teardown can exceed a planning reserve.

## Alerts tell you about spend; they do not enforce the budget

DigitalOcean's [spend-alert documentation](https://docs.digitalocean.com/platform/billing/spend-alerts/), checked October 16, explicitly says a budget is **not a spending cap**. Notifications arrive within an hour of crossing a threshold, once per threshold per billing cycle. A short GPU test can finish—or overrun—before that email arrives.

Use alerts as a secondary signal. Before launching, define the maximum billable duration, exact resource IDs, storage-retention deadline, cleanup permissions, and an independent cleanup path. Include a failure allowance for provisioning, snapshot operations, failed requests and delayed deletion. If you cannot bound teardown sufficiently for the budget, the responsible next step is a read-only quote and permissions check, not a claim that the run is capped.

For reconciliation, DigitalOcean's [invoice documentation](https://docs.digitalocean.com/platform/billing/invoices/), checked October 16, says invoices cover the previous month's usage. The detailed invoice CSV includes resource projects and tags, with tag information for usage on or after **July 1, 2026**. Record source, replacement and snapshot IDs and a run-specific mapping; apply and verify tags where supported rather than assuming inheritance.

Compare those records with individual-resource charges. Month-to-date figures remain provisional. A project-spend CSV is a separate **beta estimate**, not the settled per-resource ledger, and it is not available to every account. Keep resource usage, credits, taxes and payment-card charges separate; a card debit does not establish a GPU metering timestamp. If the export cannot attribute the charge, call the result **unattributed**, not measured.

## Use the calculator before launch

1. **Choose a configuration that fits.** Record GPU model, memory, variant, count, CPU/RAM and region. Do not compare a GPU component with an all-in VM.
2. **Save the native quote and date.** Include required add-ons and account access conditions. Recompute from exact rates, not rounded table cells.
3. **Count billable allocation, not just useful execution.** Add startup, idle windows, retries and teardown time where charged.
4. **Model missed cleanup.** Price one day and one week of continued compute, then enumerate storage, IPs and snapshots separately.
5. **Specify release and recovery.** Identify the correct stop/delete action, data-loss boundary and retained-resource deadline.
6. **Reconcile actual usage.** Preserve resource mappings and timestamps, then compare attributable invoice lines with the estimate. Leave unmeasured cutoffs unmeasured.

For this selected set, eight useful A100 hours cost an estimated **$8.72–$25.44 in compute**, while a week without release costs **$183.12–$534.24**. Those ranges are useful planning inputs, not all-in buyer rankings. The DigitalOcean example adds the missing lesson: even after compute is destroyed, a retained snapshot and a unit assumption can invalidate a tiny budget.

## Source notes

Every price and billing rule linked above was checked on **October 16, 2026**. Rate tables use official pricing pages and public vendor APIs; conversions and cost scenarios are derived under the assumptions beside each example. The wider HostFleet dataset retains its **September 24** full-table baseline. No authenticated billing export, paid experiment, second-level meter cutoff, restoration success rate, workload performance or live inventory was measured for this article.

*Comparing an allocated Pod with a GPU Droplet? These are labeled affiliate links: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> and <a href="/go/digitalocean-gpu" rel="sponsored nofollow">DigitalOcean GPU signup (affiliate)</a>. HostFleet may earn a commission at no extra cost to you. Check the launch-time card, region, quote, storage and cleanup behavior before buying; every evidence citation above remains direct.*
