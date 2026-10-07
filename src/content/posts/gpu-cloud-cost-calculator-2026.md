---
title: "GPU cloud cost calculator 2026: A100 rates, stop costs and retained storage"
description: "Eight dated A100 rates, including Verda at $1.833/hour on October 7, with stop and retained-storage costs for an eight-hour job."
pubDate: 2026-08-09
updatedDate: 2026-10-07
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rates and lifecycle rules; calculated totals are estimates.** Five of the eight selected A100 80 GB rate anchors were rechecked against official provider pages or vendor-owned APIs on **September 30, 2026**; Verda's selected A100 rate was rechecked on **October 7, 2026**, RunPod's Secure Cloud A100 PCIe rate on **October 3, 2026**, and Vultr's rate was last source-verified on **September 29, 2026**. RunPod's Pod stop, storage, restart, and billing-documentation boundaries were checked October 2. Vast.ai's rented-instance states, storage behavior, and restart constraints were checked September 30. Verda's prepaid billing, shutdown, deletion, refund, and retained-storage rules were checked September 25. HostFleet did not benchmark performance, test inventory, rent a Pod or Vast instance, or inspect settled invoices for this refresh.

> **Five selected rates rechecked:** September 30, 2026<br>
> **Verda A100 SXM4 rate rechecked:** October 7, 2026<br>
> **RunPod Secure A100 PCIe rate rechecked:** October 3, 2026<br>
> **Vultr A100 rate last source-verified:** September 29, 2026<br>
> **Vast.ai lifecycle rules verified:** September 30, 2026<br>
> **RunPod Pod lifecycle and storage rules verified:** October 2, 2026<br>
> **Verda lifecycle rules verified:** September 25, 2026<br>
> **Full-table verification baseline:** September 24, 2026; later provider-specific changes are not a new full audit<br>
> **Currency:** public USD on-demand list prices before tax<br>
> **Planning week:** 168 hours<br>
> **Test case:** eight useful compute hours followed by 160 unattended hours<br>
> **Boundary:** every row exposes 80 GB of A100 memory, but accelerator variant, fixed resources, product surface, region, billing unit, and availability differ

# GPU cloud cost calculator: eight A100 rates, stop costs, and retained storage

The useful GPU cost formula has four terms:

    estimated cost = useful compute + teardown lag + unattended compute + retained resources

Hourly price controls only the first three terms. The provider-specific release action decides whether a forgotten resource costs a few dollars or several hundred.

That action is not consistent across clouds. Thunder Compute has no native Stop operation. A stopped Hyperstack or Vultr VM remains fully billable. Jarvis Labs pause and Paperspace power-off stop compute billing. Verda requires deletion, not shutdown. Koyeb can scale an eligible public Service to zero after an idle window. Vast.ai documents stopped rented instances as storage-only, but a frozen instance still incurs GPU charges and a restart may wait indefinitely for capacity. A stopped RunPod Pod releases its GPU, but doubles the local-volume storage rate; termination deletes that local volume, while a separately created network volume survives. The table below prices those distinct states.

An October 7 recheck found Verda's selected **1A100.22V** A100 80 GB at **$1.833 per hour** in both its official pricing page's embedded on-demand offer and public instance-types API. That is **$0.018/hour** above the October 5 snapshot of $1.815, adding **$12.96** to a 720-hour planning month. It is **5.1%** above the September 24 rate of $1.744, adding **$64.08** to that same planning month versus the older baseline. The human-facing table rounds the current rate to $1.83/hour; the embedded offer and API provide the exact $1.833 input used here. The September 25 lifecycle check found a more important operating boundary: Verda prepays pay-as-you-go resources in 10-minute increments, refunds unused terminated time in the next billing period, and keeps charging a shut-down instance until it is deleted.

This comparison is a provider-source refresh of eight named products. It uses the same verified market baseline as HostFleet's broader [GPU pricing dataset](https://hostfleet.net/gpu-pricing/), but it deliberately keeps exact product shapes visible. The RunPod row, for example, selects a Secure Cloud PCIe Pod at $1.59, rechecked October 3, rather than mixing Secure and Community inventory. This is a planning tool, not a performance ranking or stock claim.

## Eight dated A100 80 GB planning rates

The table uses one public, reproducible product per provider. Thunder is the only row that requires component arithmetic to reach its minimum launchable total.

| Provider and product | Public rate used | What the rate includes or omits | 720-hour planning estimate | Official rate source |
|---|---:|---|---:|---|
| **Thunder Compute minimum VM** | **$1.25/hr estimated minimum** | $1.09 GPU base plus four required paid vCPUs at $0.04/vCPU-hr; minimum shape has 8 vCPU, 64 GiB RAM, and a 100 GB disk | **$900.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs), rechecked Sept. 30, 2026 |
| **Hyperstack A100 PCIe VM** | **$1.35/hr** | One GPU with 28 CPU, 120 GB RAM, 100 GB root disk, and 750 GB ephemeral disk; public IP and shared storage are separate | **$972.00** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), rechecked Sept. 30, 2026 |
| **Jarvis Labs on-demand instance** | **$1.49/GPU-hr** | Public one-GPU row lists 16 vCPU and 112 GB RAM; retained data bills separately when paused | **$1,072.80** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), rechecked Sept. 30, 2026 |
| **RunPod Secure Cloud A100 PCIe Pod** | **$1.59/hr** | Selected Secure Cloud Pod allocation; storage has a separate lifecycle | **$1,144.80** | [RunPod pricing](https://www.runpod.io/pricing), rechecked Oct. 3, 2026 |
| **Koyeb A100 Service** | **$1.60/hr** | One A100 Instance with 15 vCPU, 180 GB RAM, and 320 GB disk | **$1,152.00** | [Koyeb pricing](https://www.koyeb.com/pricing), rechecked Sept. 30, 2026 |
| **Verda A100 80 GB SXM4 instance** | **$1.833/hr exact** | One GPU with 22 CPU and 120 GB RAM; storage is separate; visible table rounds to $1.83/hr | **$1,319.76** | [Verda pricing](https://verda.com/pricing) and [instance-types API](https://api.verda.com/v1/instance-types), rechecked Oct. 7, 2026 |
| **Vultr A100 Cloud GPU** | **$2.397/hr** | One PCIe A100 with 12 vCPU, 120 GB RAM, 1.40 TB local storage, and 10 TB bandwidth | **$1,725.84** | [Vultr Cloud GPU pricing](https://www.vultr.com/pricing/#cloud-gpu), last source-verified Sept. 29, 2026 |
| **Paperspace A100-80G Machine** | **$3.18/hr compute** | One GPU with 12 vCPU and 90 GB RAM; the default 50 GB SSD is configured with the Machine but billed separately | **$2,289.60 compute** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), rechecked Sept. 30, 2026 |

**Estimate assumptions:** one named product remains billable for 720 hours; its dated public rate remains unchanged; no tax, negotiated discount, overlapping replacement, retained-resource charge, or additional traffic-driven instance applies. Thunder's minimum is `$1.09 + (8 - 4) × $0.04 = $1.25`. The other seven inputs are published product rates.

A100 PCIe and SXM4 are not throughput-equivalent. Koyeb is an application Service, RunPod is a Pod, and the other rows are VM-like products with different fixed resources. Use the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) for the wider 21-rate matrix and the [open-model VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) before choosing the memory tier.

## The eight-hour test that runs for a week

The failure case is simple: a test performs eight hours of useful work, but its resource remains billable for all 168 hours in the week.

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
| Verda A100 80 GB SXM4 | $14.66 | $307.94 | $293.28 | $43.99 |
| Vultr A100 Cloud GPU | $19.18 | $402.70 | $383.52 | $57.53 |
| Paperspace A100-80G Machine | $25.44 | $534.24 | $508.80 | $76.32 |

These totals are arithmetic from the dated inputs. They exclude retained storage, IP addresses, snapshots, support, tax, network charges, billing-unit rounding, and refunds. The Vultr and Verda calculations preserve their three-decimal rates until the final cent rounding.

The useful eight-hour spread is **$10.00 to $25.44**. The one-week spread is **$210.00 to $534.24**. More importantly, the avoidable compute column is roughly twenty times the useful-work column in every row. Cleanup policy dominates a small hourly discount.

## Stop, pause, hibernate, power off, and delete are different billing events

| Product | Action that stops or avoids GPU compute billing | What can remain billable or unavailable |
|---|---|---|
| **Thunder Compute** | Create any required snapshot, then delete the instance; there is no native Stop state | Snapshots bill separately; restore creates a new instance; snapshot size, restore capacity, and data durability matter |
| **Hyperstack** | Hibernate or delete; **Stop is still fully billed** | Hibernation bills saved root data, retained public IPs, and attached shared volumes; ephemeral disk is deleted; the flavor is not reserved for restore |
| **Jarvis Labs** | Pause or delete | Paused data bills at $0.00014/GB-hour; released GPU capacity is not guaranteed on resume |
| **RunPod Pod** | Stop releases GPU; terminate deletes the Pod and its local volume | Container disk is erased on stop; stopped local volume remains at $0.20/GB-month; separately created network volume survives and bills independently; GPU capacity is not reserved for restart |
| **Koyeb Service** | Set minimum Instances to zero for an eligible Internet-facing Service | Scale-to-Zero is public preview; default idle period is five minutes; open connections can prevent sleep; HTTP/2 cannot wake a sleeping Service |
| **Vast.ai rented instance** | Stop the instance to remove GPU billing, or destroy it to end container-storage billing too | Stopped storage continues billing and may cost more than running storage; frozen remains GPU-billable; a restart does not reserve or guarantee the same GPU capacity |
| **Verda** | Delete the instance | Shutdown remains billable; PAYG is prepaid in 10-minute increments; retained volumes continue charging; unused terminated time is refunded in the next billing period |
| **Vultr Cloud GPU** | Destroy the instance | A stopped instance keeps its resources and remains billed; destroying permanently deletes instance data |
| **Paperspace Machine** | Shut down or power off to stop compute; destroy unused add-ons separately | Storage, public IPs, and other add-ons continue until removed |

These are documented lifecycle rules, not measured ledger cutoffs. They do not prove current stock, restore success, provisioning time, or the timestamp a provider uses to settle a charge.

## Verda: offline is still billable, and deletion has two clocks

Verda's [shutdown and deletion guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/index.md), checked September 25, 2026, is explicit: shutting down an instance does not stop its compute charge. Deletion is required.

That makes the calculator's unattended case concrete. If the selected A100 instance finishes eight useful hours and an operator only shuts it down, another 160 billable hours are an estimated:

    $1.833/hour × 160 hours = $293.28

The provider's [pricing and billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing/index.md), also checked September 25, says pay-as-you-go resources are prepaid in 10-minute increments. For the selected A100 rate, one nominal 10-minute prepayment is:

    $1.833/hour ÷ 6 = $0.3055

That is not a claimed 10-minute minimum charge. Verda says that when a resource is terminated before the paid interval ends, unused time is refunded within the next billing period. A balance can therefore show a debit before the final net cost is known. Forecast gross cash movement separately from settled usage, and do not treat an immediate prepaid debit as the final invoice.

Deletion also has a storage decision. Verda lists NVMe storage at **$0.20/GiB-month** on its [pricing page](https://verda.com/pricing), rechecked September 27, 2026. If 100 GiB were retained for the calculator's remaining 160 hours, a 720-hour planning-month estimate would be:

    100 GiB × $0.20/GiB-month × 160/720 = $4.44

That is a scenario, not a quote. The actual OS-volume size, attached volumes, billing convention, taxes, and retention duration can differ.

The [storage deletion guide](https://docs.verda.com/storage/deleting-storage/index.md), checked September 25, adds another trap. Deleted storage stays restorable for 96 hours. Restoring it incurs the pay-as-you-go storage price for the time it was deleted. Permanent deletion frees quota and cannot be undone. Trash is therefore a recovery window, not proof of free retention.

Automation has to be more explicit than the console workflow. The console lifecycle guide says no storage is selected for deletion by default. Verda's current [Public API reference](https://api.verda.com/v1/docs), checked September 25, says omitting `volume_ids` deletes the OS volume and detaches other attached volumes. Those defaults conflict. A cleanup job should first read the instance's OS and attached volume IDs, then send the complete intended `volume_ids` list and `delete_permanently` value. Do not infer data survival or cost cleanup from an omitted field.

The unresolved part is the exact meter boundary. Public documentation does not define whether compute stops at delete-request acceptance, an audit event, state disappearance, or another internal event. It also does not define the refund timestamp or balance precision. Until a bounded account experiment reconciles those events, model a teardown-lag allowance and label the exact cutoff unverified.

## Vast.ai: stopped is storage-only, frozen still bills the GPU

Vast.ai is a host-priced marketplace, so there is no durable catalog rate to add as a ninth row. Use the active-rental quote shown for the exact offer at launch time; Vast's [instance pricing guide](https://docs.vast.ai/guides/instances/pricing.md), checked September 30, says total cost combines per-second active rental, continuously billed storage, and byte-metered bandwidth. Rates vary by host and offer. HostFleet does not republish Vast marketplace prices in its dataset without written licensing permission.

The official [instance status reference](https://docs.vast.ai/cli/reference/show-instance.md), checked September 30, makes the state boundary unusually clear:

| Vast state | Documented treatment | Calculator treatment |
|---|---|---|
| `loading` | No GPU charge | Do not call the whole state free; storage and bandwidth can still contribute |
| `running` | GPU charges apply | Count active rental per second plus storage and bandwidth |
| `frozen` | GPU charges apply | Treat it as allocated compute, not a savings state |
| `stopped` | No GPU charge | Count container storage continuously; the stopped rate may be higher |
| restart `scheduling` | Capacity is being sought | Do not assume a prompt return or reserved GPU |

Stopping therefore removes the GPU meter but not the resource bill. Vast's [storage documentation](https://docs.vast.ai/guides/instances/storage/types.md), checked September 30, says container storage has a 10 GB minimum, is fixed at creation, persists while stopped, and is deleted with the instance. Stopped storage may have a higher rate than running storage. Destroying the instance is the documented action that ends its container-storage billing, but it also removes that data; separately created volumes have their own lifecycle.

For a launch-time active quote `q`, allocated container size `d`, and stopped-storage rate `s`, extend the calculator like this:

    accidental running or frozen compute = active quote × billable active duration
    stopped retention = allocated GB × stopped-storage quote × stopped duration
    estimated total = useful compute + transition lag + stopped retention + bandwidth

Do not substitute a marketplace search result from a different host or timestamp. Capture the offer JSON privately beside the estimate, including the active quote, storage rates, bandwidth rates, GPU model, host, and timestamp.

The restart tradeoff is real. Vast's [instance-management guide](https://docs.vast.ai/guides/instances/manage-instances.md), checked September 30, says a stopped instance enters `SCHEDULING` when restarted and waits for GPU availability; a higher-priority job can block it. Stop preserves data, not capacity. Public documentation establishes the broad state treatment, but it does not establish the exact second-level meter cutoff around asynchronous stop or destroy. HostFleet has designed a $0.10-capped reconciliation test, but no instance was rented and no charge was measured for this article.

## Thunder Compute: preserving state requires snapshot, delete, and restore

Thunder's [stopping-instances guide](https://www.thundercompute.com/docs/guides/stopping-instances.md) documents a three-step substitute for Stop:

1. Create a snapshot from an instance in `RUNNING`.
2. Delete the running instance.
3. Later, create a replacement instance from the snapshot.

Thunder's [billing documentation](https://www.thundercompute.com/docs/billing.md) says running compute bills per minute and billing stops when the instance is deleted. Its [deletion guide](https://www.thundercompute.com/docs/cli/operations/deleting-instances.md) says deletion permanently removes the instance and associated data, so anything that must survive needs an external copy or a snapshot first.

Snapshot storage is **$0.05/GB-month**, billed hourly. Thunder's [public pricing API](https://api.thundercompute.com:8443/v1/pricing), rechecked September 27, 2026, exposes **$0.00006849/GB-hour**:

    $0.00006849 × 730 hours = $0.0499977 per GB-month

For the calculator's remaining 160 hours, a hypothetical 100 billable GB snapshot would cost:

    100 GB × $0.00006849 × 160 hours = $1.09584
    scoped total = $10.00 useful A100 compute + $1.09584 snapshot = $11.10 rounded

Leaving the minimum A100 VM running instead would make the scoped total **$210.00**. The snapshot scenario reduces this specific planning exposure by about **$198.90**, before restore compute or other charges.

This remains a scenario. Thunder does not publicly define whether snapshot billing uses allocated disk capacity, included files, or compressed stored bytes. Its [snapshot operations guide](https://www.thundercompute.com/docs/cli/operations/snapshots.md) says restore can take up to eight minutes per 100 GB but does not establish whether the replacement bills while `RESTORING`. That same operations guide says Thunder provides no explicit guarantee about snapshot durability, so important data needs a durable copy beyond a convenience snapshot. The separate [snapshot-optimization guide](https://www.thundercompute.com/docs/guides/speeding-up-snapshots.md) documents size reduction and `.thunderignore` behavior.

## Hyperstack: Stop costs $216; hibernate is much cheaper but releases capacity

Hyperstack's [VM state billing guide](https://docs.hyperstack.cloud/docs/billing/states-and-billing), checked September 9, 2026, marks both `ACTIVE` and `SHUTOFF` as billed because the flavor remains reserved. Pressing Stop after the eight-hour test therefore leaves this estimate unchanged:

    $1.35/hour × 160 hours = $216.00

The same guide prices saved root data for a hibernated VM at **$0.000096774/GB-hour** and a retained public IP at **$0.00672/hour**. Using the selected flavor's configured 100 GB root disk as a conservative input:

    root retention = 100 GB × $0.000096774 × 160 hours = $1.55
    retained IP = $0.00672 × 160 hours = $1.08

| State after the eight-hour run | Remaining 160-hour estimate | Eight-hour compute plus remainder | Operational boundary |
|---|---:|---:|---|
| Stop (`SHUTOFF`) | $216.00 | $226.80 | Hardware remains reserved and billed |
| Hibernate, release public IP | $1.55 | $12.35 | Root saved; ephemeral data deleted; restore needs capacity |
| Hibernate, retain public IP | $2.62 | $13.42 | Root and IP billed; attached shared volumes would add cost |
| Delete VM and unneeded retained resources | $0.00 in this scoped example | $10.80 | VM removed; preserve required data first |

These hibernation totals are derived, not measured invoice results. Hyperstack's hibernation documentation says ephemeral disk is not preserved, released public IPs can change on restore, and the flavor is not reserved. A hibernated A100 VM cannot restore until the same flavor is available again.

## Three more retained-resource examples

Stopping compute does not make the deployment free.

### Jarvis Labs pause

Jarvis Labs' official [FAQ](https://docs.jarvislabs.ai/faqs/), checked September 14, 2026, prices paused data at **$0.00014/GB-hour** and says pause releases the GPU. For 100 GB kept through the remaining 160 hours:

    100 GB × $0.00014 × 160 = $2.24
    scoped total = $11.92 compute + $2.24 retained data = $14.16

That is far below the $250.32 one-week compute case, but it trades guaranteed retention of the GPU for a future capacity check.

### RunPod: stop, terminate, or keep a separate network volume?

RunPod's [Pod pricing documentation](https://docs.runpod.io/pods/pricing), [Pod management guide](https://docs.runpod.io/pods/manage-pods), and [storage guide](https://docs.runpod.io/pods/storage/types), checked October 2, 2026, define three different cost states. A running Pod's local volume disk costs **$0.10/GB-month**; a stopped Pod releases its GPU but keeps that local volume at **$0.20/GB-month**. Its container disk is cleared on stop. Termination deletes the Pod and its local volume. A separately created standard network volume below 1 TB remains after stop or termination and has a listed **$0.07/GB-month** storage rate. Local volume and network volume are not interchangeable: local storage is host-bound, while network-volume performance and availability can differ.

For the same **eight useful A100 GPU hours plus 160 hours without compute**, the table isolates GPU compute and one selected retained storage type. It assumes the October 3 Secure Cloud A100 PCIe rate of **$1.59/hour**, the October 2 storage rates above, 720 hours per planning month, local-volume billing during all eight running hours and 160 stopped hours, or network-volume billing for all 168 hours. It excludes required container-disk cost, transfer, other resources, tax, and billing rounding. These are **derived estimates, not observed invoices**.

| Retained capacity | Eight-hour GPU compute | RunPod local volume: running 8h + stopped 160h | Scoped total with local volume | Separate standard network volume: 168h | Scoped total with network volume |
|---:|---:|---:|---:|---:|---:|
| 10 GB | $12.72 | $0.46 | **$13.18** | $0.16 | **$12.88** |
| 100 GB | $12.72 | $4.56 | **$17.28** | $1.63 | **$14.35** |
| 500 GB | $12.72 | $22.78 | **$35.50** | $8.17 | **$20.89** |

For the 100 GB local-volume row, unrounded math is `100 × $0.10 × 8/720 + 100 × $0.20 × 160/720 = $4.5556` of storage, then `$12.72 + $4.5556 = $17.2756`, rounded to **$17.28**. For 100 GB of standard network storage, `100 × $0.07 × 168/720 = $1.6333`, then **$14.35** with compute. The network rate is cheaper per provisioned GB in this case, but not proof that a network volume meets the workload's I/O or placement needs. RunPod documents network-volume billing hourly versus Pod-local billing per second; actual bills need their native-unit treatment.

**Action boundary:** stop only when the local `/workspace` data must survive on the Pod and a later restart is acceptable; the GPU is released and restart can return zero GPUs if capacity has changed. Terminate when the local Pod data is disposable. If data must outlive the Pod, provision and verify separate network storage before termination. None of these actions should be treated as a guaranteed instant ledger cutoff. The authenticated [Pod billing-history endpoint](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history) can filter by Pod ID and report GPU and disk amounts, while [network-volume billing history](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history) uses a separate volume ID. The Pod endpoint's minimum one-hour bucket is useful for reconciliation, not second-level cutoff proof. The [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the full Pod-versus-Serverless rate card.

### Koyeb's default idle tail

Koyeb's [Scale-to-Zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero), checked August 28, 2026, includes GPU Instances, labels the feature public preview, and gives GPU Services a five-minute default idle period. At the selected A100 rate:

    $1.60/hour × 5/60 = $0.1333 nominal five-minute tail

That is one tail for one active Instance. It excludes useful work, wake time, extra Instances, storage, and connections that prevent idleness. It is not a per-request fee. HostFleet's [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) covers more request-waking products and lifecycle boundaries.

## A reusable calculator for any GPU product

Start with the provider's native billing unit:

    useful compute = native rate × billable useful duration
    teardown lag = native rate × time between work completion and release
    unattended compute = native rate × time cleanup failed
    retained resources = storage + IP + snapshots + volumes + other add-ons
    estimated total = useful compute + teardown lag + unattended compute + retained resources

Then model three operating modes:

1. **Always allocated.** Use 720 hours only for a 30-day sensitivity case. It is not an invoice forecast.
2. **Scheduled capacity.** Count from provider billing start through the documented release action, then add a scheduler-failure case.
3. **Scale-to-zero.** Count startup where billed, execution, idle windows, retry overlap, and warm minimums. End-user response time is not a substitute for billable allocation time.

Credits belong outside the base estimate. Calculate the workload first, then subtract only a credit whose GPU eligibility, expiry, and paid-account transition are known. HostFleet's [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) explains why a promotional balance is neither capacity nor recurring unit economics.

## Build cleanup into the deployment

Before launching a GPU workload, record:

1. **Exact product boundary.** GPU memory, PCIe or SXM variant, GPU count, minimum CPU/RAM, region, and deployment surface.
2. **Native price and date.** Keep the official URL beside every numeric input.
3. **Billable start.** Determine whether provisioning, image download, model load, snapshot creation, or restore time is charged.
4. **Exact release action.** Test stop, pause, hibernate, power off, terminate, delete, or destroy—whichever the provider documents.
5. **Explicit retained-resource policy.** Enumerate disks, volumes, snapshots, public IPs, and trash/recovery states instead of relying on defaults.
6. **Cleanup deadline.** Alert when compute or a retained resource exists past its deadline.
7. **Failure budget.** Price at least one hour, one day, and one week of missed cleanup before launch.
8. **Ledger reconciliation.** Compare expected and actual resource-state timestamps after the first bounded run.

## Verdict

The selected A100 examples cost an estimated **$10.00 to $25.44** for eight useful hours. Leaving them billable for a week raises the range to **$210.00 through $534.24**. The spread matters, but lifecycle semantics matter more.

Verda's selected A100 rate is $1.833/hour as of October 7, up from the October 5 snapshot of $1.815. That adds $12.96 to a 720-hour estimate, but a shutdown-only cleanup failure still adds an estimated $293.28 in this 160-hour scenario. Deletion stops the compute charge at a provider-controlled boundary, prepaid time can be refunded later, and storage treatment must be explicit because the console and API describe different omission defaults.

RunPod illustrates why “stopped” needs a storage line: the 100 GB local-volume case is about **$17.28** for eight GPU hours plus 160 stopped hours, versus **$14.35** with a separately retained standard network volume under the stated assumptions. Both include storage, but neither includes container disk or transfer. A terminated Pod deletes its local volume, so a cheaper storage figure is not a durability plan.

Vast.ai adds a related stop trap: stopped removes GPU billing, but retained container storage keeps charging and restart capacity is not reserved. Frozen is not stopped; the GPU meter remains active. Use the exact offer quote and stopped-storage rate from the rented instance, then reconcile itemized charges before treating the documented state boundary as a second-level measured cutoff.

Use the calculator in this order: choose hardware that fits, reconstruct the launchable rate, identify the provider-specific billing-stop action, enumerate retained resources, model teardown lag, and set a cleanup deadline. A low hourly number is not cost control. A tested state transition is.

## Sources

- [HostFleet GPU pricing dataset](https://hostfleet.net/gpu-pricing/) — broader 21-provider comparison; full-table verification baseline September 24, 2026, with later targeted updates
- [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [spec API](https://api.thundercompute.com:8443/v1/specs) — A100 base, additional-vCPU rate, minimum shape, and snapshot hourly rate; pricing rechecked September 30, 2026
- [Thunder stopping-instances guide](https://www.thundercompute.com/docs/guides/stopping-instances.md), [billing documentation](https://www.thundercompute.com/docs/billing.md), and [deletion guide](https://www.thundercompute.com/docs/cli/operations/deleting-instances.md) — no native Stop state, snapshot/delete/restore workflow, per-minute running compute, deletion cutoff, and permanent instance-data loss; rechecked September 26, 2026
- [Thunder snapshot operations guide](https://www.thundercompute.com/docs/cli/operations/snapshots.md) — snapshot states, restore timing, size constraints, and the explicit durability caveat; rechecked September 27, 2026
- [Thunder snapshot-optimization guide](https://www.thundercompute.com/docs/guides/speeding-up-snapshots.md) — snapshot size reduction and `.thunderignore` behavior; rechecked September 27, 2026
- [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), [flavor catalog](https://docs.hyperstack.cloud/docs/hardware/flavors), [VM state billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing), and [hibernation guide](https://docs.hyperstack.cloud/docs/virtual-machines/hibernation) — A100 rate, fixed disks and resources, stopped/hibernated billing, public-IP behavior, ephemeral-disk loss, and restore-capacity boundary; pricing rechecked September 30 and documentation rechecked September 26, 2026
- [Jarvis Labs pricing](https://jarvislabs.ai/pricing) and [FAQ](https://docs.jarvislabs.ai/faqs/) — A100 rate, pause behavior, retained-data rate, and capacity release; rate rechecked September 30, lifecycle checked September 14, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — selected Secure Cloud PCIe A100 rate, rechecked October 3, 2026
- [RunPod Pod pricing](https://docs.runpod.io/pods/pricing), [management](https://docs.runpod.io/pods/manage-pods), and [storage types](https://docs.runpod.io/pods/storage/types) — running and stopped local-volume rates, network-volume rate, Pod stop/termination state, container-disk deletion, and restart-capacity boundary; checked October 2, 2026
- [RunPod Pod billing history](https://docs.runpod.io/api-reference-v2/billing/get-pod-billing-history) and [network-volume billing history](https://docs.runpod.io/api-reference-v2/billing/get-network-volume-billing-history) — resource-scoped charge reconciliation and bucket limits; checked October 2, 2026
- [Koyeb pricing](https://www.koyeb.com/pricing) and [Scale-to-Zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — A100 rate, included resources, public-preview status, idle period, and protocol limits; rate rechecked September 30, lifecycle checked August 28, 2026
- [Verda pricing](https://verda.com/pricing), [instance-types API](https://api.verda.com/v1/instance-types), [billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing/index.md), [instance lifecycle guide](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/index.md), [storage deletion guide](https://docs.verda.com/storage/deleting-storage/index.md), and [Public API reference](https://api.verda.com/v1/docs) — exact A100 rate, prepaid intervals, refund timing, shutdown/deletion boundary, storage recovery, and API defaults; rate rechecked October 7 and lifecycle checked September 25, 2026
- [Vultr Cloud GPU pricing](https://www.vultr.com/pricing/#cloud-gpu), [stopped-instance billing](https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr), and [GPU billing documentation](https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently) — A100 rate, continued billing while stopped, destroy boundary, and GPU billing model; rate last source-verified September 29 and documentation rechecked September 26, 2026
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) — A100-80G rate, powered-off compute boundary, and separately billed disk; rate rechecked September 30, 2026
- [Vast.ai billing](https://docs.vast.ai/guides/reference/billing), [instance pricing](https://docs.vast.ai/guides/instances/pricing.md), [instance management](https://docs.vast.ai/guides/instances/manage-instances.md), [storage types](https://docs.vast.ai/guides/instances/storage/types.md), and [instance status reference](https://docs.vast.ai/cli/reference/show-instance.md) — host-priced components, per-second active rental, state-specific GPU treatment, stopped storage, destroy boundary, and restart-capacity risk; checked September 30, 2026
- Local evidence: `/opt/hostbot-v2/src/data/gpu-pricing.json`, `/opt/hostbot/data/gpu-pricing-history/2026-09-24.json`, `/opt/hostbot/data/ai-hosting/notes/2026-09-24-gpu-pricing-full-verification.md`, `/opt/hostbot/data/ai-hosting/notes/2026-09-25-verda-shutdown-delete-refund-boundary.md`, and `/opt/hostbot/data/ai-hosting/notes/2026-09-30-vastai-stop-restart-storage-billing-boundary.md`, and `/opt/hostbot/data/ai-hosting/notes/2026-10-02-runpod-pod-stop-storage-billing-boundary.md`

*Need an allocated A100 Pod? This labeled affiliate link supports HostFleet's research at no extra cost to you: <a href="/go/runpod" rel="sponsored nofollow">RunPod signup (affiliate)</a>. Every source citation above remains direct and non-affiliate.*
