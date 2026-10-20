---
title: "GPU cloud cost calculator 2026: VM presets, idle time and storage"
description: "Estimate eight A100 rates and 12 Nebius L40S VM presets, including required CPU/RAM, billable idle time and retained-storage costs."
pubDate: 2026-08-09
updatedDate: 2026-10-20
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission through the labeled signup links on this page. That does not change our analysis. See our [methodology and affiliate policy](https://hostfleet.net/about/).*

**Source-backed prices and billing rules; calculated costs are estimates, not measured invoices.** This refresh checks eight selected A100 80 GB rates and all 12 documented Nebius L40S VM presets on **October 20, 2026**. Earlier release, snapshot and billing-attribution rules retain their **October 16** checks unless a newer date is stated. No GPU was rented, workload benchmarked, stock confirmed, or invoice measured. This is a worked GPU cloud cost calculator: substitute your launch-time quote and expected billable duration into the formulas below.

> **Eight selected A100 rates and resource bundles checked:** October 20, 2026<br>
> **Nebius L40S component prices, presets and billing rules checked:** October 20, 2026<br>
> **Other cited release, storage and billing rules checked:** October 16, 2026; not rechecked in this refresh<br>
> **Dataset-wide verification baseline:** September 24, 2026; this targeted refresh does not advance that date<br>
> **Currency:** public USD list prices before tax; Nebius USD prices apply outside its Israeli-company pricing scope<br>
> **Planning conventions:** eight useful hours, a 168-hour week, and a 720-hour sensitivity case—not provider monthly billing promises

# GPU cloud cost calculator: useful work, idle GPUs and retained storage

An hourly GPU rate is an input, not a budget. Start with:

    estimated usage cost = useful compute
                         + billed startup and teardown
                         + unattended compute
                         + retained storage and other resources

Then calculate credits, discounts and taxes separately. Use the provider's native billing unit and minimum; do not round every second or minute to cents before adding the total.

The new worked example shows why the **GPU component is not the VM price**. Nebius lists its L40S GPU component at **$1.35/GPU-hour**, but required CPU and RAM bring its smallest Intel preset to **$1.5484/VM-hour**, before storage. Its smallest AMD preset is a different shape at **$1.8172/VM-hour**. These October 20 inputs are explained and sourced below; neither is a performance-equivalent replacement for an 80 GB A100.

The A100 refresh also catches a moving input: Verda's selected on-demand VM now lists **$2.066/hour**, versus the calculator's October 16 observation of $1.996. The other seven selected A100 rates remain unchanged in this check.

Storage remains a separate trap: DigitalOcean lists boot disks in **GiB**, but bills Droplet snapshots in **GB-month**. That example retains its October 16 source checks, rather than implying every resource on this page was reverified today.

## Eight dated A100 80 GB calculator inputs

These are selected entries from the same baseline as our [GPU pricing table](https://hostfleet.net/gpu-pricing/), reconciled against official sources on **October 20, 2026**. Use these dated direct vendor inputs rather than older dataset cells where they differ. The table is a dated snapshot, not a promise of launchable capacity or equal performance.

| Selected product | Hourly input | Included resources / boundary | 720-hour estimate | Official source / checked |
|---|---:|---|---:|---|
| **Thunder Compute A100 base** | **$1.09/hr** | 8 included vCPUs, 64 GB RAM, first 100 GB disk per GPU | **$784.80** | [Official source](https://www.thundercompute.com/pricing), Oct. 20, 2026 |
| **Hyperstack A100 PCIe VM** | **$1.35/hr** | One GPU; 28 CPU and 120 GB RAM; local storage included | **$972.00** | [Official source](https://www.hyperstack.cloud/gpu-pricing), Oct. 20, 2026 |
| **Jarvis Labs A100 instance** | **$1.49/hr** | One-GPU on-demand row; 16 vCPU and 112 GB RAM | **$1,072.80** | [Official source](https://jarvislabs.ai/pricing), Oct. 20, 2026 |
| **Koyeb A100 Instance** | **$1.60/hr** | 15 vCPU, 180 GB RAM, 320 GB disk; not the separate A100 SXM tier | **$1,152.00** | [Official source](https://www.koyeb.com/pricing), Oct. 20, 2026 |
| **RunPod Secure A100 PCIe Pod** | **$1.79/hr** | Selected Secure Cloud allocation; disks billed separately | **$1,288.80** | [Official source](https://www.runpod.io/pricing), Oct. 20, 2026 |
| **Verda A100 SXM4 80 GB VM** | **$2.066/hr** | Exact 1A100.22V shape: 22 CPU, 120 GB RAM; storage extra | **$1,487.52** | [Official source](https://verda.com/pricing), Oct. 20, 2026 |
| **Vultr A100 Cloud GPU** | **$2.397/hr** | Exact API plan; 12 vCPU and 120 GB RAM; locations list empty | **$1,725.84** | [Official source](https://api.vultr.com/v2/plans?per_page=500), Oct. 20, 2026 |
| **Paperspace A100-80G Machine** | **$3.18/hr** | Machine compute; storage, IPs and add-ons extra | **$2,289.60** | [Official source](https://docs.digitalocean.com/products/paperspace/pricing/), Oct. 20, 2026 |

**All rates above checked October 20, 2026.** The 720-hour column is simply the exact hourly input multiplied by 720, rounded at the end. It excludes separately billed storage, IPs, transfer, additional resources, minimums and billing rounding, taxes, discounts, and any mandatory account-plan charge. For Vultr, the public API also lists a monthly price; the rate-times-hours column is not a reconstruction of its invoice rules. Koyeb is an application Instance, RunPod is a Pod, and the others are VM-like products with different bundles. Paperspace's figure is Machine compute, not a complete deployment bill.

Thunder's [pricing page](https://www.thundercompute.com/pricing), checked October 20, includes eight vCPUs, 64 GB RAM and the first 100 GB disk per A100 at the **$1.09/hour** Instance base price. Its separate Sandbox rate is not this product. Do not add extra CPU charges for resources already included in the selected bundle.

For Verda, the [pricing page](https://verda.com/pricing)'s visible row and embedded on-demand offer agree with the [instance-types API](https://api.verda.com/v1/instance-types)'s `1A100.22V` row at **$2.066/hour**, checked October 20. Do not substitute its separate Spot or Serverless price. Compared with this calculator's October 16 observation of $1.996, that adds **$50.40 over 720 hours**: `(2.066 − 1.996) × 720`. This is a difference between dated observations, not an announced effective-date claim.

The [RunPod pricing page](https://www.runpod.io/pricing)'s visible Secure Cloud A100 PCIe row and structured Secure Cloud offer both show **$1.79/hour**, checked October 20. Confirm the exact tier, card, region and storage in your account before launching.

Vultr's [public plans API](https://api.vultr.com/v2/plans?per_page=500), checked October 20, returns **$2.397/hour** for `vcg-a100-12c-120g-80vram`. Its `locations` list is empty, so the catalog rate does not establish an orderable location. Keep exact native rates; do not calculate the table from rounded display cells.

Choose hardware that fits before comparing cost. The [VRAM sizing guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) covers memory headroom; the [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) covers the wider product matrix. Companion pages have their own check dates: they are not substitutes for the dated vendor inputs above.

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
| Verda A100 SXM4 80 GB VM | $16.53 | $347.09 | $330.56 | $49.58 |
| Vultr A100 Cloud GPU | $19.18 | $402.70 | $383.52 | $57.53 |
| Paperspace A100-80G Machine | $25.44 | $534.24 | $508.80 | $76.32 |

These are compute-only sensitivities from the October 20 inputs, not forecasts that each provider will remain allocated by default. They assume the release action fails or is never performed, one configuration stays billable throughout, and the rate does not change. Startup, add-ons, tax, unit rounding and refunds are excluded.

The useful-work range is **$8.72 to $25.44**. The week-long exposure is **$183.12 to $534.24**. In every row, the extra 160 hours cost twenty times the eight useful hours. A cleanup policy can matter much more than a small hourly discount.

## Nebius L40S: calculate the complete preset, not just the GPU

**Prices, supported presets and billing rules checked October 20, 2026.** This example comes from the Nebius L40S entry in HostFleet's `gpu-pricing.json`: the dataset displays **$1.55/hour**, but its underlying formula is **$1.5484/hour** for the smallest Intel shape. Use the exact formula, not the rounded display cell, for duration calculations. The dataset-wide date remains September 24.

Nebius's [compute pricing documentation](https://docs.nebius.com/compute/resources/pricing) prices GPU, CPU and RAM separately. Its [VM types documentation](https://docs.nebius.com/compute/virtual-machines/types) specifies valid presets, rather than arbitrary combinations of the three resources. Both L40S platforms are listed in **`eu-north1`**: Intel `gpu-l40s-a` uses Xeon Gold 6338; AMD `gpu-l40s-d` uses EPYC 9654. Both use L40S GPUs with **48 GB VRAM**. Host RAM below is **GiB**, even though preset names end in `gb`.

| Component, USD list price | Intel `gpu-l40s-a` | AMD `gpu-l40s-d` |
|---|---:|---:|
| GPU, per GPU-hour | $1.35 | $1.35 |
| CPU, per vCPU-hour | $0.012 | $0.010 |
| RAM, per GiB-hour | $0.0032 | $0.0032 |

**Source and as-of date for all six rates:** [Nebius compute pricing](https://docs.nebius.com/compute/resources/pricing), October 20, 2026. These are PAYG USD inputs, before taxes and outside Israeli-company ILS pricing; no Spot or commitment discount is used.

The complete compute formula is:

    VM cost per hour = GPU count × GPU rate
                     + vCPU count × CPU rate
                     + RAM GiB × RAM rate

The two minimum presets therefore cost:

    Intel: 1 × 1.35 + 8 × 0.012 + 32 × 0.0032 = $1.5484/VM-hour
    AMD:   1 × 1.35 + 16 × 0.010 + 96 × 0.0032 = $1.8172/VM-hour

Nebius's [public price overview](https://nebius.com/prices), checked October 20, rounds these to **from $1.55/hour** and **from $1.82/hour**, respectively. Neither includes a boot volume or other services. The AMD floor is a larger CPU/RAM allocation, not evidence of an AMD surcharge for an equivalent VM or of better throughput.

### All 12 documented L40S presets

The counts below come from [Nebius VM types](https://docs.nebius.com/compute/virtual-machines/types); totals are derived from the October 20 component rates above. Every row prices the **whole VM**. The final column divides by GPU count only for comparison—it does not make part of a multi-GPU VM separately purchasable.

| Platform / preset | GPUs | vCPUs | RAM, GiB | Compute $/VM-hour | Normalized $/GPU-hour |
|---|---:|---:|---:|---:|---:|
| Intel `1gpu-8vcpu-32gb` | 1 | 8 | 32 | $1.5484 | $1.5484 |
| Intel `1gpu-16vcpu-64gb` | 1 | 16 | 64 | $1.7468 | $1.7468 |
| Intel `1gpu-24vcpu-96gb` | 1 | 24 | 96 | $1.9452 | $1.9452 |
| Intel `1gpu-32vcpu-128gb` | 1 | 32 | 128 | $2.1436 | $2.1436 |
| Intel `1gpu-40vcpu-160gb` | 1 | 40 | 160 | $2.3420 | $2.3420 |
| AMD `1gpu-16vcpu-96gb` | 1 | 16 | 96 | $1.8172 | $1.8172 |
| AMD `1gpu-32vcpu-192gb` | 1 | 32 | 192 | $2.2844 | $2.2844 |
| AMD `1gpu-48vcpu-288gb` | 1 | 48 | 288 | $2.7516 | $2.7516 |
| AMD `2gpu-64vcpu-384gb` | 2 | 64 | 384 | $4.5688 | $2.2844 |
| AMD `2gpu-96vcpu-576gb` | 2 | 96 | 576 | $5.5032 | $2.7516 |
| AMD `4gpu-128vcpu-768gb` | 4 | 128 | 768 | $9.1376 | $2.2844 |
| AMD `4gpu-192vcpu-1152gb` | 4 | 192 | 1152 | $11.0064 | $2.7516 |

For example, AMD `2gpu-64vcpu-384gb` costs **$4.5688 per VM-hour**, or **$2.2844 per GPU-hour** after dividing by two. Use either `4.5688 × VM-hours` or `2.2844 × GPU-hours`, never the whole-VM price multiplied by GPU count again. Multiple GPUs' VRAM is not automatically one memory pool for an unmodified workload.

### Eight useful hours versus one forgotten day

Using the two minimum presets, assume one VM is continuously Running for the full duration. Exclude storage, networking, taxes, credits, additional VMs and final-invoice rounding. These are estimates, not measured bills or equivalent-performance comparisons.

| Minimum preset | Eight Running hours | 24 Running hours | 24-hour understatement from using only $1.35/GPU-hour |
|---|---:|---:|---:|
| Intel: 1 GPU, 8 vCPU, 32 GiB RAM | $12.39 | $37.16 | $4.76 |
| AMD: 1 GPU, 16 vCPU, 96 GiB RAM | $14.54 | $43.61 | $11.21 |

Round only the final scenario: the Intel eight-hour input is `1.5484 × 8 = $12.3872`, not `1.55 × 8`. At the same GPU-component price, host sizing changes the complete compute bill.

Nebius's [compute billing rules](https://docs.nebius.com/compute/resources/pricing), checked October 20, charge Running GPU/vCPU/RAM in **one-second billing units**; stopped VM compute is uncharged. That is not a universal rule for the other providers below. It is also not a measured claim about the exact asynchronous stop-side meter cutoff.

Volumes remain separate: Nebius charges allocated volume size whether or not the volume is attached or full. Its documented storage pricing unit is **one GiB per 730 hours**, not a generic 720-hour month. Obtain the boot-volume type, size and rate before calling either preset price an all-in budget. A listed region or preset establishes neither quota nor live stock; save an account-visible launch quote before starting work.

## Stop is not a universal billing boundary

The following rules retain their checks against the linked official documentation on **October 16, 2026**; they were not reverified on October 20. Nebius's separately dated rule appears above. They establish documented state treatment, not exact asynchronous ledger timestamps.

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

Verda's [billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), checked October 16, describes prepaid **10-minute increments**, with an unused terminated portion refunded within the next billing period. Using the **October 20 $2.066/hour** input, one nominal block is approximately **$0.3443**. That is cash-flow arithmetic, not a nonrefundable minimum-charge claim. Shutting down instead of deleting leaves another **$330.56** of estimated compute in the 160-hour failure case.

## RunPod: keep storage separate from the resolved GPU price

RunPod's [Pod pricing](https://docs.runpod.io/pods/pricing) and [storage documentation](https://docs.runpod.io/pods/storage/types), checked October 16, list local volume disk at **$0.10/GB-month running** and **$0.20/GB-month stopped**. A separate standard network volume below 1 TB lists **$0.07/GB-month**. Container disk is another charge while running; it is erased on stop.

Using the **October 20 GPU rate** and **October 16 storage rates**, for **100 GB** kept through eight running hours and 160 stopped hours, with **720 hours only as a planning divisor**:

    eight-hour GPU estimate = $1.79 × 8 = $14.32
    local volume = 100 × ($0.10 × 8 + $0.20 × 160) / 720
                 = $4.5556
    GPU plus local volume ≈ $18.88

A standard 100 GB network volume kept for all 168 hours gives:

    network storage = 100 × $0.07 × 168 / 720 = $1.6333
    GPU plus network volume ≈ $15.95

These scoped totals exclude required container-disk charges, transfer, other add-ons, tax and native-unit rounding. Pod-local storage bills per second; network volumes bill hourly. The lower network-storage number does not prove equivalent I/O or placement. Termination deletes local volume data, so verify any separate durable copy first. RunPod also warns that restarting a stopped Pod can return **zero GPUs** if capacity changed. Storage retention is not capacity reservation.

The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) explains the product split. For this example, use the October 20 GPU input above, not an older number in another article.

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

For the October 20 selected A100 set, eight useful hours cost an estimated **$8.72–$25.44 in compute**, while a week without release costs **$183.12–$534.24**. Those ranges are useful planning inputs, not all-in buyer rankings. Nebius adds a second input check: multiply the complete preset price by duration, rather than treating the GPU component as the VM total. The separately dated DigitalOcean example shows why retained snapshots and unit assumptions also belong in the budget.

## Source notes

Eight selected A100 rates and their resource bundles were rechecked on **October 20, 2026** against the official links in that table and the current Verda and Vultr API rows. All six Nebius L40S PAYG component rates, 12 presets, region/platform identities, headline floors and cited Nebius billing rules were checked on **October 20, 2026** against its [price overview](https://nebius.com/prices), [compute pricing](https://docs.nebius.com/compute/resources/pricing) and [VM types](https://docs.nebius.com/compute/virtual-machines/types). Nebius's live dataset cell matches the exact Intel minimum-preset formula.

**All other cited release, storage, snapshot, spending-alert and invoice-attribution rules retain October 16 checks and were not rechecked in this refresh.** Their prices and examples remain explicitly dated. A newer check date on this article does not make those older inputs current purchase quotes. The wider HostFleet dataset retains its **September 24** full-table baseline. Conversions and scenarios are derived under the assumptions beside each example. No authenticated billing export, paid experiment, second-level meter cutoff, restoration success rate, workload performance or live inventory was measured.

*Comparing an allocated Pod with a GPU Droplet? These are labeled affiliate links: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a> and <a href="/go/digitalocean-gpu" rel="sponsored nofollow">DigitalOcean GPU signup (affiliate)</a>. HostFleet may earn a commission at no extra cost to you. Check the launch-time card, region, quote, storage and cleanup behavior before buying; every evidence citation above remains direct.*
