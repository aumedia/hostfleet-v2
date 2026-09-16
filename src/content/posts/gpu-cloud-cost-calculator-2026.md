---
title: "GPU cloud cost calculator 2026: 8 A100 rates and snapshot math"
description: "Eight current A100 cloud rates with idle-cost math, exact billing-stop actions, and Thunder Compute snapshot, deletion, storage, and restore boundaries."
pubDate: 2026-08-09
updatedDate: 2026-09-16
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rates and billing rules; calculated totals are estimates.** All eight selected A100 80 GB rate anchors were rechecked against official live vendor pages or vendor-owned APIs on **September 16, 2026**. Thunder Compute's snapshot/delete/restore documentation was checked on **September 15, 2026**. HostFleet did not benchmark performance, test capacity, inspect a settled invoice, or run the account-gated lifecycle experiments discussed below.

> **All eight selected rates verified:** September 16, 2026<br>
> **Thunder lifecycle documentation verified:** September 15, 2026<br>
> **Dataset baseline:** 21 providers and 148 displayed price cells, fully checked September 10, 2026<br>
> **Currency:** public USD on-demand list prices before tax<br>
> **Planning week:** 168 hours<br>
> **Test case:** eight useful compute hours followed by 160 unattended hours<br>
> **Boundary:** all rows expose 80 GB of A100 memory, but accelerator variant, CPU, RAM, storage, deployment surface, region, and availability differ

# GPU cloud cost calculator: eight A100 rates and the real cost of stopping

The useful GPU cost formula has four terms:

    estimated cost = useful compute + teardown lag + unattended compute + retained resources

Hourly price controls only the first three terms. The provider-specific action that releases the GPU determines whether a forgotten resource costs a few dollars or several hundred.

That action is not consistent across clouds. Thunder Compute has no native Stop operation: preserving an environment requires a snapshot, deleting the running instance, and later creating a replacement from the snapshot. A stopped Hyperstack or Vultr VM remains fully billable. Jarvis Labs pause and Paperspace power-off stop compute billing. Verda requires deletion. Koyeb can scale an eligible public Service to zero after an idle window.

This refresh adds Thunder's snapshot/delete/restore cost boundary and updates Verda's selected A100 80 GB rate from the dataset's **$1.79** snapshot to the official page's current exact offer of **$1.718 per hour** (displayed as $1.72). The comparison table is a separate provider-source refresh of these eight named products, not a direct extract from HostFleet's broader [GPU pricing dataset](https://hostfleet.net/gpu-pricing/). In particular, the RunPod row deliberately selects a Secure Cloud PCIe Pod at $1.59 rather than the dataset's lower Community/SXM summary cell. It is a planning tool, not a performance ranking or inventory claim.

## Eight current A100 80 GB planning rates

The table uses one public, reproducible product per provider. Thunder is the only row that requires component arithmetic to reach its minimum launchable total.

| Provider and product | Public rate used | What the rate includes or omits | 720-hour planning estimate | Official rate source |
|---|---:|---|---:|---|
| **Thunder Compute minimum VM** | **$1.25/hr estimated minimum** | $1.09 GPU base plus four required vCPUs at $0.04/vCPU-hr; minimum shape has 8 vCPU, 64 GiB RAM, and a 100 GB disk | **$900.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs), Sept. 16, 2026 |
| **Hyperstack A100 PCIe VM** | **$1.35/hr** | One GPU with 28 CPU, 120 GB RAM, 100 GB root disk, and 750 GB ephemeral disk; public IP and shared storage are separate | **$972.00** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing) and [flavor catalog](https://docs.hyperstack.cloud/docs/hardware/flavors), Sept. 16, 2026 |
| **Jarvis Labs on-demand instance** | **$1.49/GPU-hr** | Public one-GPU row lists 16 vCPU and 112 GB RAM; retained data bills separately when paused | **$1,072.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 16, 2026 |
| **RunPod Secure Cloud A100 PCIe Pod** | **$1.59/hr** | Selected Secure Cloud Pod allocation; storage has a separate lifecycle | **$1,144.80** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 16, 2026 |
| **Koyeb A100 Service** | **$1.60/hr** | One A100 Instance with 15 vCPU, 180 GB RAM, and 320 GB disk | **$1,152.00** | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 16, 2026 |
| **Verda A100 80 GB SXM4 instance** | **$1.718/hr exact** | One GPU with 22 CPU and 120 GB RAM; storage is separate; visible table rounds to $1.72/hr | **$1,236.96** | [Verda pricing](https://verda.com/pricing), Sept. 16, 2026 |
| **Vultr A100 Cloud GPU** | **$2.397/hr** | One PCIe A100 with 12 vCPU, 120 GB RAM, 1.40 TB local storage, and 10 TB bandwidth; the public plans API currently omits this row | **$1,725.84** | [Vultr rendered Cloud GPU pricing](https://www.vultr.com/pricing/#cloud-gpu), Sept. 16, 2026 |
| **Paperspace A100-80G Machine** | **$3.18/hr compute** | One GPU with 12 vCPU and 90 GB RAM; the default 50 GB SSD is configured with the Machine but billed separately | **$2,289.60 compute** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) and [Machine Type Reference](https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/), Sept. 16, 2026 |

**Estimate assumptions:** one named product remains billable for 720 hours; its dated public rate remains unchanged; no tax, negotiated discount, overlapping replacement, retained-resource charge, or additional traffic-driven instance applies. Thunder's minimum is `$1.09 + (8 - 4) × $0.04 = $1.25`. The other seven inputs are published product rates.

A100 PCIe and SXM4 are not throughput-equivalent. Koyeb is an application Service, RunPod is a Pod, and the other rows are VM-like products with different fixed resources. A cheaper estimate is useless if the required region, software path, or capacity is unavailable. Use the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) for the larger product matrix and the [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before choosing the memory tier.

## The eight-hour test that runs for a week

The failure case is simple: a test does eight hours of useful work, but its resource remains billable for all 168 hours in the week.

    useful cost = hourly input × 8
    unattended compute = hourly input × 160
    one-week billable compute = hourly input × 168

| Provider and product | Eight useful hours | Left billable for 168 hours | Avoidable 160-hour compute | One forgotten day |
|---|---:|---:|---:|---:|
| Thunder minimum VM | $10.00 | $210.00 | $200.00 | $30.00 |
| Hyperstack A100 PCIe VM | $10.80 | $226.80 | $216.00 | $32.40 |
| Jarvis Labs A100 80 GB | $11.92 | $250.32 | $238.40 | $35.76 |
| RunPod Secure A100 PCIe Pod | $12.72 | $267.12 | $254.40 | $38.16 |
| Koyeb A100 Service | $12.80 | $268.80 | $256.00 | $38.40 |
| Verda A100 80 GB SXM4 | $13.74 | $288.62 | $274.88 | $41.23 |
| Vultr A100 Cloud GPU | $19.18 | $402.70 | $383.52 | $57.53 |
| Paperspace A100-80G Machine | $25.44 | $534.24 | $508.80 | $76.32 |

These totals are arithmetic from the dated inputs. They exclude retained storage, IP addresses, snapshots, support, tax, network charges, and any billing-unit rounding. The Vultr and Verda calculations preserve their three-decimal rates until the final cent rounding.

The useful eight-hour spread is **$10.00 to $25.44**. The one-week spread is **$210.00 to $534.24**. More importantly, the avoidable idle column is roughly twenty times the useful-work column in every row. Cleanup policy dominates a small hourly discount.

## Stop, pause, hibernate, power off, and delete are different billing events

| Product | Action that stops or avoids GPU compute billing | What can remain billable or unavailable |
|---|---|---|
| **Thunder Compute** | Create any required snapshot, then delete the instance; there is no native Stop state | Snapshots bill separately; restore creates a new instance; snapshot size, restore capacity, and data durability matter |
| **Hyperstack** | Hibernate or delete; **Stop is still fully billed** | Hibernation bills saved root data, retained public IPs, and attached shared volumes; ephemeral disk is deleted; the flavor is not reserved for restore |
| **Jarvis Labs** | Pause or delete | Paused data bills at $0.00014/GB-hour; released GPU capacity is not guaranteed on resume |
| **RunPod Pod** | Stop or terminate, depending on the data lifecycle required | Container disk is erased on stop; volume and network storage can keep billing |
| **Koyeb Service** | Set minimum Instances to zero for an eligible Internet-facing Service | Scale-to-Zero is public preview; default idle period is five minutes; open connections can prevent sleep; HTTP/2 cannot wake a sleeping Service |
| **Verda** | Delete the instance | Shutdown remains billable; retained storage not selected for deletion keeps charging |
| **Vultr Cloud GPU** | Destroy the instance | A stopped instance keeps its resources and remains billed; destroying permanently deletes instance data |
| **Paperspace Machine** | Shut down or power off to stop compute; destroy unused add-ons separately | Storage, public IPs, and other add-ons continue until removed |

These are documented lifecycle rules, not measured ledger cutoffs. They do not prove current stock, restore success, a provisioning SLA, or how quickly a provider's account ledger posts a charge.

## Thunder Compute: there is no Stop button

Thunder's documented substitute for Stop is a three-step lifecycle:

1. Create a snapshot from an instance in `RUNNING`.
2. Delete the running instance. Thunder explicitly says deletion can happen immediately after snapshot creation is initiated.
3. Later, create a replacement instance from the snapshot.

Thunder says running compute bills per minute and billing stops immediately when an instance is deleted. Deletion permanently removes the instance and its associated data, so anything that must survive needs to be downloaded or captured first. A snapshot records the persistent-disk state at the moment snapshot creation is initiated; its states are `CREATING`, `READY`, and `FAILED`.

Snapshot storage is **$0.05/GB-month**, billed hourly. Thunder's public pricing API exposes the raw rate as **$0.00006849/GB-hour**, rechecked September 16, 2026:

    $0.00006849 × 730 hours = $0.0499977 per GB-month

For the calculator's remaining 160 hours, a hypothetical 100 billable GB snapshot would cost:

    snapshot storage = 100 GB × $0.00006849 × 160 hours = $1.09584
    scoped total = $10.00 useful A100 compute + $1.09584 snapshot = $11.10 rounded

Leaving the minimum A100 VM running instead would make the scoped total **$210.00**. The snapshot scenario therefore reduces this specific planning exposure by about **$198.90**, before restore compute or other charges.

That is a **scenario, not a quote**. Thunder does not publicly define whether snapshot billing uses allocated disk capacity, logical included files, or compressed stored bytes. The 100 GB minimum instance disk does not prove a near-empty snapshot is billed as 100 GB. Its documented snapshot-list response exposes `minimumDiskSizeGb`, not a billable-byte field.

Restoring can take up to **eight minutes per 100 GB**, and the replacement disk must be at least as large as the snapshot. If eight minutes of the selected $1.25/hour A100 minimum were billable, the arithmetic exposure would be about **$0.17**:

    $1.25 × 8/60 = $0.1667

Thunder's public documentation does not say whether compute billing begins while the replacement is `RESTORING` or only after it reaches `RUNNING`, so that number is a sensitivity case, not an invoice prediction. Creation and restore time vary with snapshot size; `.thunderignore` can exclude disposable caches and outputs before capture.

There are two operational ceilings. An organization can retain at most 50 snapshots, and Thunder says snapshots are a convenience mechanism without an explicit durability guarantee. Important models, outputs, and datasets need another durable copy. The safe automation is **snapshot, verify the snapshot reaches `READY`, confirm required external copies, delete compute, and separately expire the snapshot**. Thunder permits immediate deletion after snapshot initiation, but a conservative production workflow should not treat a still-`CREATING` snapshot as the only recoverable copy.

## Hyperstack: Stop costs $216; hibernate is about $1.55 in this scenario

Hyperstack makes the vocabulary problem unusually clear. Its [VM state billing guide](https://docs.hyperstack.cloud/docs/billing/states-and-billing), checked September 9, 2026, marks both `ACTIVE` and `SHUTOFF` as billed because the flavor hardware remains reserved. Pressing Stop after the eight-hour test therefore does not change the remaining 160-hour compute estimate:

    $1.35/hour × 160 hours = $216.00

The same guide says `HIBERNATED` releases the GPU, CPU, RAM, and ephemeral disk. Saved root data bills at **$0.000096774/GB-hour**, and a public IP retained during hibernation bills at **$0.00672/hour**. The selected A100 flavor has a 100 GB root disk.

Using configured root capacity as a conservative planning input:

    root retention = 100 GB × $0.000096774 × 160 hours = $1.55
    retained IP = $0.00672 × 160 hours = $1.08

| State after the eight-hour run | Remaining 160-hour estimate | Eight-hour compute plus remainder | Operational boundary |
|---|---:|---:|---|
| Stop (`SHUTOFF`) | $216.00 | $226.80 | Hardware remains reserved and billed |
| Hibernate, release public IP | $1.55 | $12.35 | Root saved; ephemeral data deleted; restore needs capacity |
| Hibernate, retain public IP | $2.62 | $13.42 | Root and IP billed; attached shared volumes would add cost |
| Delete VM and unneeded retained resources | $0.00 in this scoped example | $10.80 | VM removed; preserve required data first |

The hibernated estimates are derived, not measured invoice results. Hyperstack's public rate is per GB of saved root data, while the planning calculation uses the flavor's configured 100 GB root capacity. Confirm whether the account ledger meters configured, transferred, or consumed storage before treating $1.55 as a quote.

The economic saving also buys operational risk. Hyperstack's [hibernation guide](https://docs.hyperstack.cloud/docs/virtual-machines/hibernation), checked September 9, 2026, says ephemeral disk is not preserved, released public IPs change on restore, and the flavor is not reserved. A hibernated A100 VM cannot restore until the same flavor is back in stock.

## Three more retained-resource examples

Stopping compute does not make the resource free.

### Jarvis Labs pause

Jarvis Labs' [SDK documentation](https://docs.jarvislabs.ai/sdk/) says pause stops compute billing and preserves data. Its [FAQ](https://docs.jarvislabs.ai/faqs/), checked September 14, 2026, prices paused data at **$0.00014/GB-hour** and says the released GPU is not guaranteed on resume.

For 100 GB kept through the remaining 160 hours:

    100 GB × $0.00014 × 160 = $2.24
    scoped total = $11.92 compute + $2.24 retained data = $14.16

That is far below the $250.32 one-week compute case, but it is not zero and it trades reservation for a future capacity check.

### RunPod stopped volume

RunPod's [Pod pricing documentation](https://docs.runpod.io/pods/pricing), checked September 9, 2026, lists volume disk at **$0.20/GB-month while stopped** and says container disk is erased when the Pod stops. It bills volume disk per second.

Using 720 hours only as a planning-month divisor, 100 GB retained for 160 hours is approximately:

    100 GB × $0.20/GB-month × 160/720 = $4.44

The scoped estimate is **$12.72 of compute plus $4.44 of stopped volume = $17.16**. Network-volume rates and the exact storage choice can change that number. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the storage and Pod-versus-Serverless boundary in more detail.

### Koyeb's default idle tail

Koyeb's [Scale-to-Zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked August 28, 2026, includes GPU Instances, labels the feature public preview, and gives GPU Services a five-minute default idle period. At the selected A100 rate:

    $1.60/hour × 5/60 = $0.1333 nominal five-minute tail

That is one tail for one active Instance, excluding useful work, wake time, extra Instances, storage, and connections that prevent idleness. It is not a per-request fee. For more request-waking products and lifecycle boundaries, use HostFleet's [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## A reusable calculator for any GPU product

Start with the provider's native billing unit:

    useful compute = native rate × billable useful duration
    teardown lag = native rate × time between work completion and release
    unattended compute = native rate × time cleanup failed
    retained resources = storage + IP + snapshots + volumes + other add-ons
    estimated total = useful compute + teardown lag + unattended compute + retained resources

Then model three operating modes:

1. **Always allocated.** Use 720 hours only for a 30-day sensitivity case. It is not an invoice forecast.
2. **Scheduled capacity.** Count from provider billing start through the exact release action, then add a scheduler-failure case.
3. **Scale-to-zero.** Count startup where billed, execution, idle windows, retry overlap, and warm minimums. End-user response time is not a substitute for billable allocation time.

Credits belong outside the base estimate. Calculate the workload first, then subtract only a credit whose GPU eligibility, expiry, and paid-account transition are known. HostFleet's [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) explains why a promotional balance is neither capacity nor recurring unit economics.

## Build cleanup into the deployment

Before launching a GPU workload, record:

1. **Exact product boundary.** GPU memory, PCIe or SXM variant, GPU count, minimum CPU/RAM, region, and deployment surface.
2. **Native price and date.** Keep the official URL beside every numeric input.
3. **Billable start.** Determine whether provisioning, image download, model load, snapshot creation, or restore time is charged.
4. **Exact release action.** Test stop, pause, hibernate, power off, terminate, delete, or destroy—whichever the provider documents.
5. **Data consequence.** Know what survives, what keeps billing, and what cannot be restored without capacity.
6. **Cleanup deadline.** Alert when compute or a retained snapshot, volume, IP, or disk exists past its deadline.
7. **Failure budget.** Price at least one hour, one day, and one week of missed cleanup before launch.
8. **Ledger reconciliation.** Compare expected and actual resource-state timestamps after the first bounded run.

## Verdict

The selected A100 examples cost an estimated **$10.00 to $25.44** for eight useful hours. Leaving them billable for a week raises the range to **$210.00 through $534.24**. The spread matters, but lifecycle semantics matter more.

Thunder demonstrates the new boundary. It has no native Stop state. In this calculator's scenario, keeping its minimum A100 VM running for the remaining 160 hours costs **$200.00**. If 100 GB is the billable snapshot size, snapshot retention for the same period is about **$1.10**—but the provider does not publicly define the byte basis, and restore-phase compute billing remains unresolved.

Use the calculator in this order: choose hardware that fits, reconstruct the launchable rate, identify the provider-specific billing-stop action, price retained resources, model restore risk, and set a cleanup deadline. A low hourly number is not cost control. A tested state transition is.

## Sources

- [HostFleet GPU pricing dataset](https://hostfleet.net/gpu-pricing/) — broader 21-provider, 148-cell baseline fully checked September 10, 2026; it is not the direct source of the eight product-specific rows above
- [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs) — A100 base, additional-vCPU rate, minimum shape, and snapshot hourly rate; rate inputs rechecked September 16, 2026
- [Thunder stopping-instances guide](https://www.thundercompute.com/docs/guides/stopping-instances.md) — no native Stop, snapshot/delete/restore substitute, and immediate post-initiation deletion; checked September 15, 2026
- [Thunder billing](https://www.thundercompute.com/docs/billing.md) and [deletion guide](https://www.thundercompute.com/docs/cli/operations/deleting-instances.md) — per-minute running compute, immediate deletion cutoff, and permanent instance-data loss; checked September 15, 2026
- [Thunder snapshot guide](https://www.thundercompute.com/docs/cli/operations/snapshots.md) and [snapshot-optimization guide](https://www.thundercompute.com/docs/guides/speeding-up-snapshots.md) — states, running-only creation, 50-snapshot limit, restore ceiling, durability caveat, and exclusions; checked September 15, 2026
- [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing) and [flavor catalog](https://docs.hyperstack.cloud/docs/hardware/flavors) — A100 rate, fixed resources, and hibernation support; rate rechecked September 16, 2026
- [Hyperstack VM state billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing) and [hibernation guide](https://docs.hyperstack.cloud/docs/virtual-machines/hibernation) — stopped and hibernated billing plus retained-data, IP, data-loss, and restore-capacity boundaries; checked September 9, 2026
- [Jarvis Labs pricing](https://jarvislabs.ai/pricing), [FAQ](https://docs.jarvislabs.ai/faqs/), and [SDK](https://docs.jarvislabs.ai/sdk/) — A100 rate, pause behavior, retained-data rate, and capacity release; rate rechecked September 16 and lifecycle checked September 14, 2026
- [RunPod pricing](https://www.runpod.io/pricing) and [Pod pricing documentation](https://docs.runpod.io/pods/pricing) — selected Secure Cloud PCIe A100 rate and stopped-storage lifecycle; rate rechecked September 16 and lifecycle checked September 9, 2026
- [Koyeb pricing](https://www.koyeb.com/pricing) and [Scale-to-Zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — A100 rate, included resources, public-preview status, idle period, and protocol limits; rate rechecked September 16 and lifecycle checked August 28, 2026
- [Verda pricing](https://verda.com/pricing) and [instance lifecycle documentation](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — exact structured `$1.718` A100 80 GB rate (visible `$1.72`), shutdown billing, deletion, and retained storage; rate rechecked September 16, 2026
- [Vultr rendered Cloud GPU pricing](https://www.vultr.com/pricing/#cloud-gpu), [stopped-instance billing](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr), and [GPU billing](https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently) — A100 rate, destroy boundary, and calendar-month billing; rate rechecked September 16, 2026; the current public plans API omits the A100 row
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) and [Machine Type Reference](https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/) — A100-80G rate, powered-off compute boundary, separately billed disk, and fixed resources; rate rechecked September 16, 2026
- Local data baseline: /opt/hostbot-v2/src/data/gpu-pricing.json
- Local verification notes: /opt/hostbot/data/ai-hosting/notes/2026-09-16-a100-eight-anchor-verification.md, /opt/hostbot/data/ai-hosting/notes/2026-09-10-gpu-pricing-full-verification.md, /opt/hostbot/data/ai-hosting/notes/2026-09-09-hyperstack-hibernation-cost-boundary.md, /opt/hostbot/data/ai-hosting/notes/2026-09-13-jarvislabs-pause-destroy-billing-boundary.md, and /opt/hostbot/data/ai-hosting/notes/2026-09-15-thunder-compute-snapshot-stop-boundary.md

*Need an allocated A100 Pod? This labeled affiliate link supports HostFleet's research at no extra cost to you: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Every source citation above remains direct and non-affiliate.*
