---
title: "H100 rental price per hour in 2026: Nebius rises 16.9% to $4.50"
description: "Nineteen H100 rates compared, with Nebius now $4.50/GPU-hour after an effective 16.9% increase and updated 720-hour cost math."
pubDate: 2026-07-29
updatedDate: 2026-10-02
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rate-card and lifecycle comparison; estimated monthly totals.** This refresh uses official provider pricing pages, public vendor APIs, and HostFleet's [live GPU pricing dataset](https://hostfleet.net/gpu-pricing/). It is not a capacity, latency, throughput, reliability, or current-stock benchmark. Seventeen selected H100 price anchors remain anchored to live-vendor checks on **September 28, 2026**. Nebius's H100 rate and October 1 effective date were rechecked on **October 1, 2026** against two official pricing surfaces. Verda's selected H100 rate was refreshed on **October 2, 2026** against its official pricing page and public instance API. This is a targeted two-provider price-event refresh, not a fresh full-market verification. TensorDock's two stop modes, storage-only release state, and restart constraints were checked September 28. Verda's prepaid billing terms were rechecked September 25. Lambda's termination, guest-poweroff, and filesystem rules were checked September 14. HostFleet did not measure invoices, refund timing, capacity, or state-transition timing.

> **Price anchors rechecked:** Verda October 2, 2026; Nebius October 1, 2026; remaining 17 selected rows September 28, 2026<br>
> **Full-dataset baseline:** September 24, 2026; targeted Verda and Nebius patches October 1; live Verda refresh October 2<br>
> **TensorDock lifecycle checked:** September 28, 2026; no current fixed H100 rate was added<br>
> **Currency:** public USD on-demand list prices before tax<br>
> **Comparison unit:** one listed GPU-hour or a published per-second/per-minute equivalent<br>
> **Boundary:** a public rate does not prove inventory, quota, regional access, approval, or equal performance

# H100 rental price per hour in 2026: 19 public rates checked

The cheapest selected H100 rate is now a tie: **Hyperstack and Koyeb both publish $2.50 per hour**. That does not make them interchangeable. Hyperstack's row is a one-GPU PCIe VM whose stopped state remains billable. Koyeb's row is a serverless application instance with public-preview scale-to-zero and a documented five-minute default idle period.

Jarvis Labs follows at **$2.69/GPU-hour**, Massed Compute at **$2.73/hour**, Northflank at **$2.74/GPU-hour**, and RunPod Secure Cloud at **$2.89/hour**. Northflank's number is only a GPU component; CPU and memory are extra. The other rows package different resources and lifecycle controls.

The September 28 recheck found 18 selected H100 rates unchanged from September 24. Novita's official marketplace API still exposes product `H100-80GB.22c150g` with 22 vCPU, 150 GB RAM, a 60 GB container-disk quota, and **$3.39/hour**. Verda changed repeatedly: HostFleet observed its exact H100 offer at **$3.282/hour on September 17**, **$3.416 on September 24**, **$3.555 on September 28**, **$3.627 on October 1**, and **$3.663 on October 2**. The latest October 1–2 step adds **$25.92** to a 720-hour estimate; the cumulative September 17–October 2 increase is 11.6%, or **$274.32** for 720 hours.

Nebius's previously scheduled increase is now effective. Its unified H100 SXM/NVLink VM moved from **$3.85 to $4.50/GPU-hour on October 1**, a **16.9%** increase. That adds **$468.00** to a 720-hour planning case and moves Nebius behind Modal and DigitalOcean in this rate-only ordering, into a tie with Fal's $4.50/hour list rate.

The lifecycle still matters more than that ranking change. Verda prepays pay-as-you-go compute in 10-minute increments and returns unused terminated time in the next billing period; shutdown does not release the compute charge. Lambda has a different trap: guest `shutdown` or `poweroff` puts the instance into `Alert` and billing continues; only Lambda's termination operation ends the compute meter. TensorDock makes the distinction explicit in its API: a normal stop keeps the GPU reserved at the running rate, while stop-and-release drops the VM to storage-only billing and makes the next start capacity-dependent.

## Current H100 price-per-hour comparison

The table is sorted by normalized hourly rate. Per-second prices are multiplied by 3,600 and per-minute prices by 60. Product shape remains visible because a PCIe VM, an SXM machine, a serverless instance, and a managed inference deployment are not equivalent purchases.

| Provider and product | H100 scope | Public list rate | Official evidence and check date |
|---|---|---:|---|
| **Hyperstack** | 1x H100 80 GB PCIe VM; 28 CPU, 180 GB RAM, local storage; Canada | **$2.50/GPU-hr** | [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing), Sept. 28, 2026 |
| **Koyeb** | 1x H100 80 GB serverless instance; 15 vCPU, 180 GB RAM, 320 GB disk | **$2.50/hr** | [Koyeb pricing](https://www.koyeb.com/pricing), Sept. 28, 2026 |
| **Jarvis Labs** | 1x H100 80 GB SXM on-demand instance; public row lists 16 vCPU and 200 GB RAM | **$2.69/GPU-hr** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Sept. 28, 2026 |
| **Massed Compute** | 1x H100 80 GB on-demand VM; 20 vCPU, 128 GB RAM; storage shown as 1,250 with no unit | **$2.73/hr** | [Massed Compute pricing](https://vm.massedcompute.com/pricing), Sept. 28, 2026 |
| **Northflank** | 1x H100 80 GB managed-cloud GPU component; CPU, memory, disk, and egress separate | **$2.74/GPU-hr** | [Northflank pricing](https://northflank.com/pricing), Sept. 28, 2026 |
| **RunPod Pods** | H100 PCIe Secure Cloud Pod | **$2.89/hr** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 28, 2026 |
| **Thunder Compute** | 1x H100 80 GB PCIe base; 4 vCPU, 32 GB RAM, 100 GB persistent disk included | **$3.20/GPU-hr** | [Thunder pricing](https://www.thundercompute.com/pricing), Sept. 28, 2026 |
| **Lambda Cloud** | 1x H100 PCIe VM | **$3.29/GPU-hr** | [Lambda GPU instances](https://lambda.ai/instances), Sept. 28, 2026 |
| **Novita AI instance** | 1x H100 80 GB SXM; live API product `H100-80GB.22c150g` lists 22 vCPU, 150 GB RAM, 60 GB container-disk quota | **$3.39/GPU-hr** | [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products), Sept. 28, 2026 |
| **Verda GPU instance** | 1x H100 80 GB SXM5; selected configuration includes 30 CPU and 120 GB RAM; storage separate | **$3.663/hr** | [Verda pricing](https://verda.com/pricing) and [instance catalog](https://api.verda.com/v1/instance-types), Oct. 2, 2026 |
| **Modal** | H100 allocated to a serverless container | **$0.001097/sec** (**$3.9492/hr**) | [Modal pricing](https://modal.com/pricing), Sept. 28, 2026 |
| **DigitalOcean GPU Droplet** | 1x HGX H100; 20 vCPU, 240 GiB RAM, 720 GiB boot, 5 TiB scratch, 15,000 GiB transfer | **$4.41/GPU-hr** | [DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets), Sept. 28, 2026 |
| **Nebius AI Cloud** | 1x H100 SXM/NVLink VM; 16 vCPU, 200 GB RAM; eu-north1 | **$4.50/GPU-hr** | [Nebius pricing](https://nebius.com/prices) and [Compute pricing](https://docs.nebius.com/compute/resources/pricing), Oct. 1, 2026 |
| **Fal custom deployment** | H100 80 GB on-demand custom deployment; excludes the separately advertised "as low as" rate | **$4.50/hr list** | [Fal pricing](https://fal.ai/pricing), Sept. 28, 2026 |
| **RunPod Serverless** | H100 PRO Serverless Flex worker tier; not an exact-card reservation | **$4.79/hr** | [RunPod pricing](https://www.runpod.io/pricing), Sept. 28, 2026 |
| **Replicate private deployment** | H100 managed model deployment | **$0.001525/sec** (**$5.49/hr**) | [Replicate pricing](https://replicate.com/pricing), Sept. 28, 2026 |
| **Paperspace Machine** | 1x H100 80 GB SXM5; 20 vCPU, 250 GB RAM, 50 GB SSD; approval may be required | **$5.95/hr** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Sept. 28, 2026 |
| **CoreWeave Inference** | Single-GPU inference rate for inference-platform customers | **$6.16/GPU-hr** | [CoreWeave pricing](https://www.coreweave.com/pricing), Sept. 28, 2026 |
| **Baseten deployment** | Managed H100 deployment; 80 GiB VRAM | **$0.10833/min** (**$6.50/hr**) | [Baseten pricing](https://www.baseten.co/pricing/), Sept. 28, 2026 |

The selected range remains **$2.50 to $6.50 per listed GPU-hour** across 19 product surfaces. The low end includes a serverless instance and an allocated VM. The high end includes managed inference. Treating the range as a performance ranking would be benchmark theater.

## What the lowest-cost newer rows change

### Koyeb ties for the lowest rate, with a documented idle tail

Koyeb's official pricing page and instance reference both publish **$2.50/hour** for one H100 instance, checked September 28, 2026. The pricing card includes 15 vCPU, 180 GB RAM, and 320 GB disk. GPU availability is region-specific; the public rate is not a stock guarantee.

The operating model changes the cost calculation. Koyeb's scale-to-zero documentation explicitly includes GPU instances and labels the feature **public preview**. A GPU service can set its minimum to zero. The default idle period is five minutes, and the service wakes on a supported inbound request.

At the current H100 rate, the nominal default post-traffic idle tail is an estimate of:

    $2.50/hour × 5/60 hour = $0.2083

That is arithmetic from sourced inputs, not an invoice measurement. It excludes startup, model loading, active processing, storage, and any gradual multi-instance scale-down. A held internet connection prevents the service from becoming idle. HTTP/2 requests cannot wake a sleeping service; WebSocket has a separate limited wake path. Koyeb also counts the configured autoscaling maximum against organization quota even while the service is at zero.

The honest conclusion is narrower than "serverless means free when idle." Koyeb can scale a GPU service to zero, but protocol choice, idle qualification, wake behavior, quota, and public-preview status all belong in the deployment design.

### Jarvis Labs puts an SXM instance near the top

Jarvis Labs publishes **$2.69/GPU-hour** for a one-GPU H100 SXM on-demand instance, checked September 28, 2026. Its public row lists 16 vCPU and 200 GB RAM. On-demand compute bills per minute. The page also announces new H100 rates effective October 5, but it does not yet replace the current $2.69 on-demand row; recheck after that date.

Pausing stops compute billing while preserving data, according to the official SDK documentation. Paused data continues billing at **$0.00014/GB-hour**, verified from the Jarvis Labs FAQ on August 24, 2026. Pausing or deleting releases GPU capacity, so the same card and region are not guaranteed when the workload resumes.

For example, retaining 100 GB for 160 paused hours is an estimated **$2.24**:

    100 GB × $0.00014/GB-hour × 160 hours = $2.24

The example isolates retained data and assumes no other charge. It does not claim current H100 inventory or a future resume success rate.

### Northflank's $2.74 is not an all-in VM

Northflank publishes an H100 component at **$2.74/GPU-hour**, checked September 28, 2026. Managed-cloud GPU use bills by the second once provisioned, but every workload also selects a CPU and memory compute plan. Persistent disk and network egress can add more.

The same pricing page lists CPU at **$0.01667/vCPU-hour** and memory at **$0.00833/GB-hour**, checked September 28, 2026. Northflank does not publish one model-specific minimum CPU/RAM plan for the H100, so HostFleet does not invent an all-in total. The correct formula is:

    all-in compute rate = $2.74 GPU component
                        + selected vCPU × $0.01667/hour
                        + selected memory GB × $0.00833/hour

Disk, egress, tax, and other services sit outside that formula. Northflank's [managed GPU deployment documentation](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md), checked August 31, 2026, also requires at least $50 in account credit before deployment; that is a funding prerequisite, not a quoted minimum charge.

Manual scale-to-zero is documented, but a service at zero instances is unavailable. The autoscaling docs describe configurable minimum and maximum counts, 15-second evaluations, and a five-minute downscale window; they do not establish automatic GPU scale-to-zero or request wake-up. Do not group this row with Koyeb merely because both products use managed application abstractions.

## Thunder remains $3.20 after August's one-cent move

Thunder Compute's [live pricing page](https://www.thundercompute.com/pricing) and [public pricing API](https://api.thundercompute.com:8443/v1/pricing) agree on **$3.20/GPU-hour** for the one-H100 PCIe base configuration, checked September 28, 2026. HostFleet's check of those same official surfaces on August 23, 2026 recorded the previous selected value of **$3.19/hour**.

The August change remains small but should not be hidden:

    ($3.20 - $3.19) × 720 hours = $7.20

The current 720-hour compute estimate is **$2,304.00**, up from $2,296.80 at the former rate. Thunder's base still includes four vCPUs, 32 GB RAM, and 100 GB persistent disk. Its billing documentation says compute bills per minute while the instance runs and deletion stops instance billing.

The September 28 full-table verification found the other 18 selected H100 rates unchanged from September 24. Verda was the only selected H100 price that moved in that refresh. On October 1, the HostFleet dataset received targeted patches for both Verda at $3.627/hour and Nebius at $4.50/hour. Verda's live price then moved again to $3.663/hour on October 2; that latest value is sourced directly from Verda and is not presented as a full-dataset refresh.

## Verda moved to $3.663, and its 10-minute rule changes cash flow

Verda's pricing page and public instance catalog both publish **$3.663/hour** for the selected one-GPU H100 SXM5 instance, checked October 2, 2026. The selected fixed shape includes 30 CPU and 120 GB RAM; storage is separate. HostFleet observed the exact rate at $3.282/hour on September 17, $3.416/hour on September 24, $3.555/hour on September 28, and $3.627/hour in the October 1 dataset patch.

Across the September 17–October 2 movements, the exact increase is:

    ($3.663 - $3.282) / $3.282 = 11.6%

For 720 continuously billable hours, that changes the compute estimate from **$2,363.04 to $2,637.36**, a **$274.32** increase. The October 1 dataset rate of $3.627 implied **$2,611.44** for 720 hours; the October 2 live rate adds **$25.92**. Lambda's $3.29 PCIe VM is now $268.56 lower over 720 hours, and Novita's $3.39 catalog row is $196.56 lower. Those gaps do not override product differences, inventory, region, topology, or lifecycle behavior.

Verda's official [Pricing and Billing documentation](https://docs.verda.com/welcome-to-verda/pricing-and-billing), checked September 25, describes pay-as-you-go usage as prepaid in 10-minute increments, with unused time on a terminated instance refunded in the next billing period. At $3.663/hour, one nominal 10-minute block is **$0.6105**. A planning example that terminates after seven minutes allocates **$0.42735** to elapsed compute and **$0.18315** to the unused three minutes returned later:

    10-minute prepayment = $3.663 / 6 = $0.6105
    seven-minute compute = $3.663 × 7/60 = $0.42735
    unused three-minute portion = $3.663 × 3/60 = $0.18315

This is arithmetic from the public rate and refund rule, not a measured invoice. It excludes storage, tax, and any other resource. The distinction is cash flow rather than a claimed 10-minute minimum charge: the unused terminated portion is returned later, not necessarily absent from the current billing period.

Verda's lifecycle documentation says shutdown does not stop compute billing; deletion is the release action, and retained storage continues separately. Cost automation should therefore delete, confirm the instance is gone, and reconcile the later refund instead of treating an in-guest shutdown as completion.

## TensorDock: `stop` can mean full-rate or storage-only

TensorDock is intentionally **not** a twentieth row in the ranked H100 table. Its marketplace hosts set separate GPU, CPU, RAM, and storage prices, and the public cloud-GPU page still labels its example rates as last updated July 24, 2024. That is useful product documentation but not a current, reproducible H100 list price. Adding an old or inventory-dependent number would make the ranking look more complete than the evidence allows.

The lifecycle documentation is current enough to expose a cost boundary that matters on any TensorDock GPU:

| Provider action | Documented compute treatment | What remains |
|---|---|---|
| Stop without `disassociate_resources=true` | GPU remains reserved; TensorDock says the VM bills at the same rate as when running | Compute and storage remain allocated |
| Stop with `disassociate_resources=true` | GPU is released; the VM enters a storage-only state | Network storage continues billing |
| Restart a released Core Compute VM | Capacity-dependent; it can return on another server in the same location | Same-location GPU availability is required |
| Restart a Distributed Compute VM | Tied to the original server | Restart depends on that host and resource availability |

These are sourced rules checked September 28, not measured invoice results. TensorDock's [cloud GPU page](https://www.tensordock.com/cloud-gpus.html) says host-priced GPU, CPU, RAM, and storage are billed per second. Its [Core Compute introduction](https://docs.tensordock.com/virtual-machines/introduction-to-core-compute-vms) describes network storage and same-location restart behavior. The [public API collection](https://documenter.getpostman.com/view/20973002/2s8YzMYRDc) documents the `disassociate_resources` stop parameter plus account `balance` and aggregate `hourly_cost` fields.

One API caveat matters for automation. TensorDock's own `StoppedDisassociated` response example retains static `compute_price` and `total_price` quote fields. Those fields describe the VM quote; they do not prove that compute is actively metered after release. A billing test should reconcile state against an otherwise idle account's aggregate `hourly_cost` and balance instead of reading one static VM field as an invoice.

The practical rule is explicit: **use stop-and-release when the goal is to end GPU billing, then verify storage-only account spend.** That saves compute but gives up guaranteed possession of the GPU. A normal stop is the reservation-preserving choice and should be budgeted at the full running rate.

## Lambda: guest poweroff keeps billing, while terminate destroys local data

Lambda publishes **$3.29/GPU-hour** for its one-GPU H100 PCIe instance, rechecked September 28, 2026. The rate is expressed hourly, but Lambda says On-Demand Cloud usage is billed in one-minute increments. Billing begins when the instance launches and passes health checks and ends when the instance is terminated. The public documentation does not unambiguously define partial-minute rounding or whether pre-health-check launch time can later appear on a bill, so this guide does not invent those details.

The dangerous distinction is between an operating-system power command and a provider termination:

- Lambda currently documents launch, restart, and terminate actions; there is no pause or suspend state.
- `sudo shutdown -h now` and `sudo systemctl poweroff` do not terminate or suspend the instance. Lambda says they put it into `Alert`, and billing continues.
- The cost-control action is termination through Lambda's console or Cloud API. Automation should confirm that the instance disappears from the running-instance list and alert when it remains in `Alert` or another unexpected state.

For the same eight-useful-hours-plus-160-unattended-hours scenario used elsewhere in this guide, the compute-only exposure is:

    useful compute = $3.29 × 8 hours = $26.32
    unattended compute = $3.29 × 160 hours = $526.40
    one-week compute = $552.72

**Estimate assumptions:** one H100 PCIe instance remains billable for 168 hours at the September 28 list rate, with no storage, tax, network, or other resource charge. This is planning arithmetic, not a measured Lambda invoice. Correct termination after eight hours limits the compute portion to **$26.32**; guest poweroff does not.

Termination has a data consequence. Lambda says all local, non-filesystem data is irrecoverably destroyed when an instance is terminated. Data that must survive needs to be copied before termination to an attached Lambda filesystem or another durable store.

A Lambda filesystem has its own lifecycle:

- it survives instance termination and continues billing for as long as it exists, even while unmounted;
- billing is per GiB used per month in one-hour increments, with no minimum storage period and no ingress or egress charge;
- the public billing page's `$0.20/GiB-month` figure is explicitly an example that might not reflect current pricing, so HostFleet does not use it as a current rate; the actual price appears during authenticated filesystem creation;
- it must be selected when the instance launches, must share the instance's workspace and region, and cannot be attached to an already running instance; and
- it cannot be deleted until attached instances are terminated and the filesystem is detached. Lambda exposes no user-set usage quota, and hidden `.Trash-*` data can remain billable until permanently deleted.

The safe automation sequence is therefore **copy, verify, terminate, confirm detachment, inspect, delete**. Treat compute release and persistent-storage cleanup as separate operations.

## Nebius: use the cloud stop control, not Linux shutdown

Nebius now publishes a unified **$4.50/GPU-hour** price for its one-H100 SXM/NVLink `1gpu-16vcpu-200gb` VM in `eu-north1`, rechecked October 1, 2026. Both its pricing overview and detailed Compute pricing documentation show the former **$3.85/GPU-hour** rate and the new rate effective October 1. The current price includes the prescribed 16 vCPU and 200 GB of RAM. Persistent disks and other retained resources are separate.

The increase is **$0.65/GPU-hour**, or **16.9%**:

    ($4.50 - $3.85) / $3.85 = 16.9%
    720-hour increase = $0.65 × 720 = $468.00
    730-hour increase = $0.65 × 730 = $474.50

These are arithmetic planning values, not measured invoices. The public rate does not prove live stock, quota, regional eligibility, provisioning success, performance, or an SLA.

The provider's lifecycle documentation draws a sharp billing boundary:

- GPU, vCPU, and RAM accrue only while the VM is `Running`, in one-second billing units. A `Stopped` VM has no compute charge.
- A normal provider stop can spend up to 60 seconds in graceful termination. The public documentation does not identify whether the stop-side billing cutoff is the stop command, entry into `Stopping`, or arrival at `Stopped`; HostFleet does not invent that timestamp.
- Linux `shutdown` and `halt` inside the guest are not cost controls. Nebius treats them as VM failure, automatically reboots the instance, and continues charging. Use the console, SDK, or `nebius compute instance stop`.
- Deleting stops compute billing when the delete command is sent. VM-managed disks are deleted with the VM; standalone disks persist and keep billing.
- Stopping keeps VM, GPU, CPU, RAM, and storage quota occupied. It does not reserve physical restart capacity: a later start can still fail with `Not enough resources`.
- Local SSD data is erased on stop or delete. Persistent disks, snapshots, and shared filesystems remain chargeable by allocated size while the VM is stopped.

For the same eight-useful-hours-plus-160-unattended-hours scenario used in HostFleet's [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/), leaving this H100 VM `Running` produces:

    useful compute = $4.50 × 8 hours = $36.00
    unattended compute = $4.50 × 160 hours = $720.00
    one-week compute = $756.00

A successful provider-level stop reduces the **compute** part of those remaining 160 hours to zero. It does not make retained storage free. As a deliberately small planning example, 32 GiB of Network SSD retained for 160 hours costs about **$0.50** at the current **$0.071/GiB per 730 hours** rate:

    32 GiB × $0.071 × 160/730 = $0.498

The 32 GiB allocation is an exposed assumption, not a claimed H100 boot-disk minimum; the selected image may require more. The resulting scoped total would be about **$36.50** for eight hours of H100 compute plus that retained disk, before tax, traffic, snapshots, shared filesystems, or other resources.

The stop-side transition cutoff remains **sourced but not measured**. A bounded ledger-reconciliation experiment has been designed, but it is account-gated and has not been run. The practical rule does not depend on that missing timestamp: automate the provider's stop or delete operation, observe the final state, and alert if the VM returns to `Running`.

## What one continuously allocated H100 costs for 30 days

These estimates multiply the October 2 Verda rate, the October 1 Nebius rate, and the remaining 17 September 28 sourced rates by **720 hours**. Modal, Baseten, and Verda use their unrounded native rates. The estimates assume one named product stays billable continuously. They exclude separate CPU/RAM, storage, IP, network, tax, support, commitments, extra replicas, and operational work. They are not quotes or performance comparisons. TensorDock remains excluded because it does not expose a current fixed H100 rate suitable for this arithmetic.

| Product shape | Rate used | 720-hour compute estimate |
|---|---:|---:|
| Hyperstack H100 PCIe VM | $2.50/hr | **$1,800.00** |
| Koyeb H100 serverless instance | $2.50/hr | **$1,800.00** |
| Jarvis Labs H100 SXM instance | $2.69/hr | **$1,936.80** |
| Massed Compute H100 VM | $2.73/hr | **$1,965.60** |
| Northflank H100 component only | $2.74/hr | **$1,972.80 plus CPU and memory** |
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | **$2,080.80** |
| Thunder Compute H100 PCIe base | $3.20/hr | **$2,304.00** |
| Lambda H100 PCIe VM | $3.29/hr | **$2,368.80** |
| Novita H100 SXM instance | $3.39/hr | **$2,440.80** |
| Verda H100 SXM5 instance | $3.663/hr | **$2,637.36** |
| Modal H100 container | $0.001097/sec | **$2,843.42** |
| DigitalOcean HGX H100 Droplet | $4.41/hr | **$3,175.20** |
| Nebius H100 SXM/NVLink VM | $4.50/hr | **$3,240.00** |
| Fal H100 custom deployment | $4.50/hr list | **$3,240.00** |
| RunPod Serverless H100 tier | $4.79/hr | **$3,448.80** |
| Replicate private H100 deployment | $0.001525/sec | **$3,952.80** |
| Paperspace H100 SXM5 Machine | $5.95/hr | **$4,284.00** |
| CoreWeave Inference H100 | $6.16/hr | **$4,435.20** |
| Baseten managed H100 deployment | $0.10833/min | **$4,679.86** |

A 720-hour total is a sensitivity case, not a forecast. It is appropriate only when the product remains billable for all 30 days. Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) when the real question is useful time versus billable time.

## The off switch can reverse the rate ranking

Hourly price matters less when the wrong lifecycle action leaves the GPU meter running.

| Product | Compute-billing boundary | Important residual |
|---|---|---|
| **Hyperstack** | Hibernation deallocates the flavor; a merely stopped VM remains billable | Disks, IPs, and volumes can remain billable |
| **Koyeb** | Eligible public-preview services can reach zero after the idle policy | Wake protocol and idle conditions matter; no GPU cold-start number is claimed |
| **Jarvis Labs** | Pause stops compute billing | Retained data bills; released GPU capacity may not return |
| **Massed Compute** | Active VM total is debited per minute | Confirm the exact stop/delete action before automation |
| **Northflank** | GPU bills by the second once provisioned; manual zero makes the service unavailable | CPU, memory, disk, and egress are separate |
| **RunPod Pods** | Stop or terminate according to the required persistence model | Storage can continue; container-disk data can be erased |
| **Thunder Compute** | Deleting the instance stops instance billing | Confirm snapshot and retained-disk handling |
| **Verda** | Delete the instance; shutdown does not stop compute billing; pay-as-you-go prepays 10-minute blocks and refunds unused terminated time next period | Retained storage remains separate; refund timing changes cash flow |
| **TensorDock** | Stop-and-release with `disassociate_resources=true`; a normal stop keeps the GPU reserved at the running rate | Storage continues; restart is capacity-dependent and product-mode-dependent |
| **Lambda Cloud** | Terminate through Lambda's console or Cloud API; guest shutdown/poweroff enters `Alert` and keeps billing | Termination destroys local data; filesystems survive and bill until deleted |
| **Nebius** | Stop through the console, CLI, or SDK; guest `shutdown`/`halt` auto-reboots and remains billable | Persistent storage bills; local SSD is erased; quota stays occupied; restart capacity is not guaranteed |
| **DigitalOcean GPU Droplets** | Destroy the Droplet; powering it off does not stop billing | Reserved resources continue charging while powered off |
| **Paperspace Machines** | Power off stops compute billing | Storage, public IPs, and add-ons can continue |
| **Modal and RunPod Serverless** | Workers can return to zero | Startup, idle windows, and warm settings determine billable allocation |

Lifecycle sources retain their own verification dates in the Sources section. This table does not imply that unlisted products lack cleanup controls; it highlights the boundaries with specific checked documentation.

A generic scheduler that calls "stop" is not portable cost control. Record the exact state transition that releases compute, the data consequence, and the resource that remains chargeable.

## Choose product shape before hourly price

### Self-managed capacity

Hyperstack, Jarvis Labs, Massed Compute, RunPod Pods, Thunder, Verda, TensorDock, Lambda, Novita, Nebius, DigitalOcean GPU Droplets, and Paperspace Machines are relevant when the buyer wants a VM, instance, or Pod and accepts responsibility for the image, inference server, authentication, rollout, health checks, logs, and cleanup. TensorDock belongs in this product-shape discussion but not the fixed-rate ranking because its public marketplace pricing is host-variable and its public example rates are stale.

Compare PCIe with SXM/NVLink/HGX, not just "H100." Check included CPU, RAM, local and persistent storage, region, account approval, and release behavior. A low rate is unusable when the available topology or product shape does not fit.

### Serverless and managed application instances

Koyeb, Modal, RunPod Serverless, and Northflank expose different application-level deployment models. Koyeb documents GPU scale-to-zero in public preview. Modal and RunPod publish serverless GPU rates with their own lifecycle controls. Northflank publishes a GPU component and does not establish automatic request-waking from zero.

The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) is the better companion when scaling policy matters more than allocated capacity. Use the [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/) and [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) for provider-specific billing boundaries.

### Managed inference deployments

Fal, Replicate, CoreWeave Inference, and Baseten offer more opinionated inference surfaces. Higher hourly equivalents may make sense when rollout controls, autoscaling, observability, serving infrastructure, or support replace engineering work. CoreWeave's public rate is specifically for inference-platform customers, not a self-serve one-GPU VM quote.

The [Replicate pricing guide](https://hostfleet.net/replicate-pricing-guide-2026/) shows why setup, idle, and failed deployment work can matter more than prediction runtime.

## Size the workload before renting an H100

An 80 GB H100 is not automatically the right purchase because it is newer. Start with model weights, quantization, runtime overhead, KV-cache demand, context length, batch size, and required throughput. HostFleet's [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) exposes the memory calculation without pretending to benchmark every stack.

If an A100 fits the model and the workload does not need H100-specific throughput or features, compare the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). The older card can be the better infrastructure decision after a bounded workload test.

## H100 buying checklist

1. **Fix the exact hardware requirement.** Record PCIe versus SXM/NVLink/HGX, memory, topology, and minimum GPU count.
2. **Identify what the rate buys.** Separate complete VM totals, GPU components, Pods, serverless workers, and managed deployments.
3. **Confirm account eligibility and capacity.** Check region, quota, approval, credit prerequisites, and live inventory.
4. **Model billable time.** Include startup, model loading, active work, retries, idle windows, scale-down, and warm minimums.
5. **Test the off switch.** Verify whether stop, pause, hibernate, scale-to-zero, delete, or destroy ends compute billing.
6. **Add omitted resources.** Price CPU/RAM, storage, IPs, network, tax, support, and retained data.
7. **Run a bounded deployment test.** Measure provisioning, readiness, throughput, failure recovery, billed duration, and cleanup before production commitment.

## Verdict

**Koyeb and Hyperstack share the lowest selected public H100 rate at $2.50/hour**, verified September 28, 2026. Koyeb is the more elastic documented shape, with public-preview GPU scale-to-zero and a five-minute default idle period. Hyperstack is an allocated PCIe VM whose stopped state remains billable. Equal hourly numbers do not mean equal bills.

**Jarvis Labs is next at $2.69/hour**, with per-minute compute and a pause action that stops compute while retained data continues billing. **Massed Compute follows at $2.73/hour. Northflank's $2.74/hour is a GPU component, not an all-in workload price.**

Thunder's selected rate remains **$3.20/hour**, only **$7.20** above its former rate over a 720-hour estimate. Verda's September 17–October 2 increases move its exact H100 rate from $3.282 to **$3.663/hour**, adding **$274.32** to the 720-hour estimate and moving the current total to **$2,637.36**. Verda's 10-minute prepayment is not a 10-minute minimum charge in this comparison because the provider says unused terminated time is refunded in the next billing period; deletion and refund reconciliation are both part of cost control.

Lambda documents a separate risk: guest shutdown or poweroff does not end billing. At $3.29/hour, confusing guest poweroff with provider termination can leave **$526.40** of avoidable compute in the 160-hour example, and termination then requires a deliberate plan for local data and separately billed filesystems.

TensorDock adds a third pattern: its normal stop preserves the GPU reservation at full rate, while stop-and-release leaves storage-only billing and makes restart capacity-dependent. It is useful lifecycle evidence, but TensorDock still does not belong in the numeric ranking until a current, reproducible H100 offer can be sourced.

**Nebius's October 1 increase is now live:** $4.50/GPU-hour, up 16.9% from $3.85. The 720-hour estimate rises from $2,772.00 to **$3,240.00**, a $468.00 increase. Nebius now ties Fal's list rate and sits above Modal's hourly equivalent and DigitalOcean's H100 Droplet rate in this rate-only table. Nebius still differs from both: it is a unified VM rate with prescribed CPU and RAM, and its provider-level stop ends compute billing while retained storage can continue.

The defensible buying order is hardware fit, deployable product shape, current eligibility, billing lifecycle, complete cost, and only then hourly rate.

## Sources

Official pricing sources below were rechecked **September 28, 2026**, except Nebius, which was rechecked **October 1, 2026**, and Verda, which was rechecked **October 2, 2026**; both were checked against two official pricing surfaces.

- [Hyperstack pricing](https://www.hyperstack.cloud/gpu-pricing)
- [Koyeb pricing](https://www.koyeb.com/pricing) and [instance reference](https://www.koyeb.com/docs/reference/instances)
- [Jarvis Labs pricing](https://jarvislabs.ai/pricing)
- [Massed Compute pricing](https://vm.massedcompute.com/pricing)
- [Northflank pricing](https://northflank.com/pricing)
- [RunPod pricing](https://www.runpod.io/pricing)
- [Thunder Compute pricing](https://www.thundercompute.com/pricing)
- [Verda pricing](https://verda.com/pricing) and [public instance catalog](https://api.verda.com/v1/instance-types) — exact H100 offer and fixed CPU/RAM shape; checked October 2, 2026
- [Lambda GPU instances](https://lambda.ai/instances)
- [Novita marketplace API](https://api-server.novita.ai/api/v1/market/products)
- [Nebius pricing](https://nebius.com/prices) and [Compute pricing](https://docs.nebius.com/compute/resources/pricing) — former $3.85 rate, $4.50 rate effective October 1, prescribed 16-vCPU/200-GB shape, and per-second running-only billing; checked October 1, 2026
- [Modal pricing](https://modal.com/pricing)
- [DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets)
- [Fal pricing](https://fal.ai/pricing)
- [Replicate pricing](https://replicate.com/pricing)
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/)
- [CoreWeave pricing](https://www.coreweave.com/pricing)
- [Baseten pricing](https://www.baseten.co/pricing/)

Operating-boundary sources:

- [TensorDock cloud GPU pricing and billing](https://www.tensordock.com/cloud-gpus.html), [Core Compute introduction](https://docs.tensordock.com/virtual-machines/introduction-to-core-compute-vms), and [public API collection](https://documenter.getpostman.com/view/20973002/2s8YzMYRDc) — host-variable per-second resource pricing, reservation-preserving stop, stop-and-release, storage-only state, restart constraints, and account meter fields; checked September 28, 2026
- [Lambda billing](https://docs.lambda.ai/public-cloud/billing/), [instance lifecycle](https://docs.lambda.ai/public-cloud/on-demand/creating-managing-instances/), [console controls](https://docs.lambda.ai/public-cloud/console/), [filesystems](https://docs.lambda.ai/public-cloud/filesystems/), and [data import/export](https://docs.lambda.ai/public-cloud/importing-exporting-data/) — one-minute instance billing, health-check and termination boundaries, guest-poweroff `Alert` behavior, local-data destruction, filesystem persistence, attachment limits, and cleanup requirements; checked September 14, 2026
- [Nebius Compute pricing](https://docs.nebius.com/compute/resources/pricing), [VM lifecycle](https://docs.nebius.com/compute/virtual-machines/lifecycle), [stop/start controls](https://docs.nebius.com/compute/virtual-machines/stop-start), [storage types](https://docs.nebius.com/compute/storage/types), and [quotas](https://docs.nebius.com/compute/resources/quotas-limits) — running-only compute billing, guest-shutdown reboot trap, delete cutoff, retained storage, local-SSD loss, quota retention, and restart-capacity boundary; checked September 10, 2026
- [Koyeb scale-to-zero](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — GPU inclusion, public-preview status, idle conditions, wake protocols, and default period; checked August 28, 2026
- [Koyeb autoscaling](https://www.koyeb.com/docs/run-and-scale/autoscaling) — quota and gradual scale-down behavior; checked August 28, 2026
- [Jarvis Labs FAQ](https://docs.jarvislabs.ai/faqs/) and [SDK documentation](https://docs.jarvislabs.ai/sdk/) — per-minute billing, pause, storage, and released capacity; checked August 24, 2026
- [Northflank managed GPU deployment](https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md) and [autoscaling](https://northflank.com/docs/v1/application/scale/autoscale-deployments.md) — separate compute plan, billing start, credit prerequisite, and scaling boundaries; checked August 31, 2026
- [Hyperstack states and billing](https://docs.hyperstack.cloud/docs/billing/states-and-billing/) — stopped and hibernated lifecycle; checked August 13, 2026
- [Massed Compute billing](https://vm-docs.massedcompute.com/docs/billing/overview) — active-VM per-minute debit; checked August 23, 2026
- [Thunder billing](https://www.thundercompute.com/docs/billing) — running compute and deletion boundary; checked August 22, 2026
- [Verda Pricing and Billing](https://docs.verda.com/welcome-to-verda/pricing-and-billing) — prepaid 10-minute increments and next-billing-period refunds for unused terminated time; checked September 25, 2026
- [Verda lifecycle](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — shutdown, deletion, and retained storage; checked September 25, 2026
- [DigitalOcean Droplet pricing documentation](https://docs.digitalocean.com/products/droplets/details/pricing/) — powered-off billing and destruction; checked August 20, 2026
- [Paperspace Machine limits](https://docs.digitalocean.com/products/paperspace/machines/details/limits/) — H100 approval boundary; checked August 21, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, full-table baseline September 24, 2026, with targeted Verda and Nebius patches from October 1
- HostFleet full-source verification note — /opt/hostbot/data/ai-hosting/notes/2026-09-24-gpu-pricing-full-verification.md
- HostFleet TensorDock lifecycle note — /opt/hostbot/data/ai-hosting/notes/2026-09-28-tensordock-stop-release-storage-boundary.md
- HostFleet Verda price-change notes — /opt/hostbot/data/ai-hosting/notes/2026-09-21-verda-gpu-price-change.md, /opt/hostbot/data/ai-hosting/notes/2026-09-22-verda-gpu-price-change.md, and /opt/hostbot/data/ai-hosting/notes/2026-10-01-verda-gpu-price-change.md
- HostFleet Koyeb scale-to-zero note — /opt/hostbot/data/ai-hosting/notes/2026-08-28-koyeb-gpu-scale-to-zero-limits.md
- HostFleet Northflank autoscaling note — /opt/hostbot/data/ai-hosting/notes/2026-08-31-northflank-gpu-autoscaling-billing-boundary.md
- HostFleet Thunder Compute pricing note — /opt/hostbot/data/ai-hosting/notes/2026-08-22-thunder-compute-gpu-pricing.md
- HostFleet Nebius stop/delete evidence note — /opt/hostbot/data/ai-hosting/notes/2026-09-10-nebius-gpu-vm-stop-delete-boundary.md
- HostFleet Nebius October 1 price-event note — /opt/hostbot/data/ai-hosting/notes/2026-10-01-nebius-gpu-price-increases.md
- HostFleet Lambda termination/storage evidence note — /opt/hostbot/data/ai-hosting/notes/2026-09-14-lambda-cloud-termination-storage-boundary.md

*Need self-managed H100 capacity? These are labeled affiliate links; the source citations above remain direct. [RunPod signup (affiliate)](https://hostfleet.net/go/runpod) and [DigitalOcean GPU signup (affiliate)](https://hostfleet.net/go/digitalocean-gpu) support HostFleet at no extra cost to you. Re-check the exact card, region, rate, storage, and shutdown behavior before purchase.*
