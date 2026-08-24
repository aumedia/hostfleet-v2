---
title: "GPU cloud cost calculator (2026): useful hours vs idle GPU leakage"
description: "Calculate useful GPU hours, idle compute leakage, and retained-resource costs across six A100 cloud products with provider-specific cleanup actions."
pubDate: 2026-08-09
updatedDate: 2026-08-24
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the analysis. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Source-backed rates and billing rules; estimated totals.** The six A100 80 GB rate anchors and their lifecycle documentation were checked against official provider pages and public APIs on **August 24, 2026**. The cost examples are transparent arithmetic, not benchmarks, capacity guarantees, negotiated quotes, or invoice predictions.

# GPU cloud cost calculator: useful hours versus idle GPU leakage

The most useful GPU cost formula has three inputs, not one:

    estimated cost = useful compute + idle billable compute + retained resources

Hourly price matters, but the second term is where a short test becomes an expensive week. Some products stop compute billing when you pause or power them off. Others keep charging until you delete or destroy the instance. Storage, public IP addresses, and other retained resources can continue after the GPU meter stops.

This refresh uses six A100 80 GB deployment products from HostFleet's [live GPU pricing table](https://hostfleet.net/gpu-pricing/) to make that failure mode visible. Every selected rate was rechecked on August 24 rather than treated as current merely because it appears in the local dataset.

> **Rate and lifecycle verification:** August 24, 2026<br>
> **Currency:** public USD on-demand list prices before tax<br>
> **Planning week:** 168 hours<br>
> **Test assumption:** 8 billable compute hours, followed by 160 idle hours<br>
> **Boundary:** all rows expose 80 GB of A100 memory, but accelerator variant, CPU, RAM, storage, product surface, location, and availability differ

## The one-week A100 idle-cost calculator

The table asks a deliberately simple question: what happens if an eight-hour test remains billable for the rest of a 168-hour week?

| Provider and product | Rate used | Eight useful hours | Left billable for 168 hours | Avoidable 160-hour idle compute | Official rate check |
|---|---:|---:|---:|---:|---|
| **Thunder Compute minimum VM** | **$1.25/hr estimated minimum** | **$10.00** | **$210.00** | **$200.00** | [Thunder pricing](https://www.thundercompute.com/pricing), [pricing API](https://api.thundercompute.com:8443/v1/pricing), and [specification API](https://api.thundercompute.com:8443/v1/specs), Aug. 24 |
| **RunPod Secure Cloud PCIe Pod** | **$1.39/hr** | **$11.12** | **$233.52** | **$222.40** | [RunPod pricing](https://www.runpod.io/pricing), Aug. 24 |
| **Jarvis Labs on-demand instance** | **$1.49/GPU-hr** | **$11.92** | **$250.32** | **$238.40** | [Jarvis Labs pricing](https://jarvislabs.ai/pricing), Aug. 24 |
| **Verda GPU instance** | **$1.79/hr** | **$14.32** | **$300.72** | **$286.40** | [Verda pricing](https://verda.com/pricing), Aug. 24 |
| **Vultr Cloud GPU** | **$2.397/hr** | **$19.18** | **$402.70** | **$383.52** | [Vultr public plan API](https://api.vultr.com/v2/plans?per_page=500), Aug. 24 |
| **Paperspace Machine** | **$3.18/hr** | **$25.44** | **$534.24** | **$508.80** | [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/), Aug. 24 |

The calculation is the published or derived hourly total multiplied by 8, 168, or 160 hours. Values are rounded to cents only after multiplication. The Vultr row retains the API's three-decimal $2.397 input.

These are **capacity-cost examples, not performance rankings**. Thunder's number is a derived minimum VM total. RunPod is an allocated Pod. Jarvis Labs, Verda, Vultr, and Paperspace publish different fixed instance shapes. PCIe and SXM A100s are not interchangeable throughput claims. A lower row can be unusable if the account cannot launch it, the region does not fit, or the workload needs another hardware variant.

For a broader comparison of the configurations, use HostFleet's [A100 rental-price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/).

## Why Thunder's $1.09 headline becomes $1.25

Thunder's official pricing page and public pricing API return an A100 80 GB base of **$1.09 per GPU-hour** on August 24. Four vCPUs are included, and each additional vCPU costs **$0.04/hour**. The live specification API says the smallest selectable one-GPU A100 configuration has eight vCPUs.

The calculator therefore uses:

    $1.09 + (8 required vCPUs - 4 included vCPUs) x $0.04 = $1.25/hour

That $1.25 is an estimate from official inputs, not a vendor-quoted bundle price. The minimum configuration also has 64 GB RAM and 100 GB persistent disk. Thunder's billing documentation says compute bills while the instance runs and deleting it stops instance billing.

If the test runs for eight hours and the instance is deleted, the compute estimate is **$10.00**. If it runs unattended for the full week, the estimate is **$210.00**. The mistake costs an estimated **$200.00** before snapshots or other separate resources.

## The off switch is provider-specific

A generic automation script that sends stop is not reliable cost control across GPU clouds.

| Product | Action that ends or suspends GPU compute billing | What may remain billable or unavailable |
|---|---|---|
| **Thunder Compute** | Delete the instance when work is complete | Snapshots are separate; confirm retained-data handling before deletion |
| **RunPod Pod** | Stop or terminate the Pod, depending on whether data must survive | Volume and network storage can keep billing; container-disk data is erased when the Pod stops |
| **Jarvis Labs** | Pause or delete the instance | Paused data bills at $0.00014/GB-hour; released GPU capacity is not guaranteed on resume |
| **Verda** | Delete the instance | Shutdown does not stop compute billing; retained storage continues billing |
| **Vultr Cloud GPU** | Destroy the instance | A stopped instance incurs normal charges as if active |
| **Paperspace Machine** | Power off the Machine to stop compute; destroy unused add-ons to stop all charges | Attached storage, public IP addresses, and other add-ons continue billing while powered off |

Every lifecycle statement in this table was rechecked on the linked official documentation on August 24. None establishes current GPU stock or guarantees that released capacity can be reacquired.

### Pause can stop compute without making the resource free

Jarvis Labs is the clearest example. Its SDK documentation says pausing stops compute billing while preserving data. Its FAQ prices paused data at **$0.00014 per GB-hour** and gives **50 GB = $5.04/month** as its example.

For 100 GB retained during the remaining 160 hours of this test week:

    100 GB x $0.00014/GB-hour x 160 hours = $2.24

That makes the scoped estimate **$11.92 of compute + $2.24 of paused data = $14.16**, assuming exactly 100 GB is retained and no other charge applies. It is an estimate, not a quote. Pausing releases the GPU, so the same card and region may not be available when the workload resumes.

### Stop can preserve data while storage keeps billing

RunPod's Pod documentation says storage charges continue on stopped Pods. It lists volume disk at **$0.10/GB-month while running** and **$0.20/GB-month while stopped**, while container disk is not charged after stop because its data is erased.

The operational choice is therefore explicit:

- stop the Pod and accept retained-volume charges;
- terminate compute and delete storage only when the data is safely elsewhere; or
- keep paying for an allocated GPU because fast resume is worth more than the idle cost.

HostFleet's [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) covers the Pod-versus-Serverless and storage boundary in more detail.

### Power off and shutdown do not mean the same thing

Paperspace says powering a Machine off stops compute billing, although attached storage, public IP addresses, and add-ons continue until destroyed. Its published A100-80G Machine remains **$3.18/hour** in the August 24 check.

Verda documents the opposite compute behavior for its GPU instances: shutdown does **not** stop billing. Deletion is required. At Verda's current **$1.79/hour** A100 80 GB rate, confusing shutdown with release for the remaining 160 hours adds an estimated **$286.40** of compute.

Vultr is equally explicit. Its Cloud GPU FAQ says a stopped instance incurs normal charges and must be destroyed to avoid additional charges. The official public plan API still returns **$2.397/hour** for the selected one-GPU PCIe A100 80 GB instance. Stopping rather than destroying it after the eight-hour test produces the table's estimated **$383.52** idle-compute leak.

## A reusable calculator for any GPU product

Use the source rate's native billing unit where possible.

For hourly infrastructure:

    compute estimate = hourly rate x billable instance hours

For per-minute products:

    compute estimate = per-minute rate x billable minutes

For per-second workers:

    compute estimate = per-second rate x billable seconds

Then add retained resources:

    total estimate = compute estimate + storage + IP + network + snapshots + support + tax

The hard input is **billable time**, not request time. Include provisioning where billed, image pulls, model loading, retries, idle windows, teardown, and any warm minimum. A serverless worker can return to zero, but only after its billing window actually ends.

## Three planning modes

Write one of these modes beside every estimate.

1. **Always allocated.** Use 720 hours for a 30-day planning month only when the Pod, VM, or replica stays billable continuously.
2. **Scheduled capacity.** Use the hours between automated start and the provider-specific release action. Add a failure case for the scheduler not running.
3. **Bursty scale-to-zero.** Use observed billable seconds or minutes, including startup and idle timeout. Do not substitute end-user latency.

A 720-hour figure is not a prediction. It is a sensitivity case:

| Product | Hourly input | Eight-hour test | 30-day always-billable estimate |
|---|---:|---:|---:|
| Thunder minimum A100 80 GB VM | $1.25 | $10.00 | $900.00 |
| RunPod Secure A100 80 GB Pod | $1.39 | $11.12 | $1,000.80 |
| Jarvis Labs A100 80 GB | $1.49 | $11.92 | $1,072.80 |
| Verda A100 80 GB | $1.79 | $14.32 | $1,288.80 |
| Vultr A100 80 GB | $2.397 | $19.18 | $1,725.84 |
| Paperspace A100 80 GB | $3.18 | $25.44 | $2,289.60 |

All monthly figures multiply the August 24 rate by 720 hours. They exclude retained resources and every charge not already included in the named configuration. Vultr bills actual calendar-month hours for GPU products, so a 31-day month has 744 hours rather than 720.

## Build cleanup into the deployment

Before launching a GPU test, record:

1. **The exact billable product.** Include GPU memory, PCIe or SXM variant, GPU count, CPU/RAM minimum, region, and provider tier.
2. **The native rate and verification date.** Keep the official URL beside the value.
3. **The exact release action.** Test whether stop, pause, power off, terminate, delete, or destroy ends GPU compute billing.
4. **The data consequence.** Know which disk is erased, retained, snapshotted, or billed after compute stops.
5. **A cleanup deadline.** Schedule provider-specific teardown and alert when the resource still exists afterward.
6. **A budget ceiling.** Use provider alerts where available, but do not assume a low balance performs a safe backup.
7. **A billing-record check.** After the first bounded run, compare expected and actual billable duration before scaling.

Credits belong outside the base estimate. Calculate the workload first, then subtract only a credit whose GPU eligibility, expiry, and account restrictions are confirmed. HostFleet's [GPU cloud free-credits guide](https://hostfleet.net/gpu-cloud-free-credits-2026/) explains why a promotional balance is not capacity or recurring unit economics.

## Verdict

For a short GPU test, the difference between an eight-hour bill and a one-week bill is mostly an automation question.

The selected A100 examples range from **$10.00 to $25.44 for eight useful hours**. Leaving the same products billable for a full week raises the estimates to **$210.00 through $534.24**. Those totals do not prove that the cheaper instance is faster, available, or a better fit. They prove that idle allocation can dominate the rate-card decision.

Use the calculator in this order: choose hardware that fits, reconstruct the minimum deployable price, identify the provider-specific release action, add retained resources, and model failure time. The cheapest cleanup action is the one tested before the GPU launches.

## Sources

- [Jarvis Labs pricing](https://jarvislabs.ai/pricing) — A100 80 GB rate, per-minute billing, storage, and product boundary; checked August 24, 2026
- [Jarvis Labs FAQ](https://docs.jarvislabs.ai/faqs/) — paused-data rate and availability release; checked August 24, 2026
- [Jarvis Labs SDK documentation](https://docs.jarvislabs.ai/sdk/) — pause stops compute billing; checked August 24, 2026
- [Thunder Compute pricing](https://www.thundercompute.com/pricing) — A100 base rate and included resources; checked August 24, 2026
- [Thunder pricing API](https://api.thundercompute.com:8443/v1/pricing) and [specification API](https://api.thundercompute.com:8443/v1/specs) — live calculation inputs; checked August 24, 2026
- [Thunder billing](https://www.thundercompute.com/docs/billing) — deletion boundary; checked August 24, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — Secure Cloud A100 PCIe Pod rate; checked August 24, 2026
- [RunPod Pod pricing documentation](https://docs.runpod.io/pods/pricing) — stopped storage behavior; checked August 24, 2026
- [Verda pricing](https://verda.com/pricing) and [lifecycle documentation](https://docs.verda.com/cpu-and-gpu-instances/shutdown-hibernate-and-delete/) — A100 rate and deletion behavior; checked August 24, 2026
- [Vultr public plan API](https://api.vultr.com/v2/plans?per_page=500) and [Cloud GPU FAQ](https://docs.vultr.com/products/compute/instances/cloud-gpu/faq) — rate and stopped-instance billing; checked August 24, 2026
- [Vultr GPU billing](https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently) — calendar-month hours; checked August 24, 2026
- [Paperspace pricing](https://docs.digitalocean.com/products/paperspace/pricing/) — A100 rate and powered-off billing; checked August 24, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json
- HostFleet provider notes — /opt/hostbot/data/ai-hosting/notes/2026-08-24-jarvis-labs-gpu-pricing.md, /opt/hostbot/data/ai-hosting/notes/2026-08-22-thunder-compute-gpu-pricing.md, /opt/hostbot/data/ai-hosting/notes/2026-08-18-vultr-cloud-gpu-pricing.md, /opt/hostbot/data/ai-hosting/notes/2026-08-21-paperspace-gpu-machine-pricing.md, and /opt/hostbot/data/ai-hosting/notes/2026-08-15-verda-datacrunch-gpu-pricing.md

*Need an allocated A100 Pod? This is a labeled affiliate link, while every source citation above remains direct: [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod). Re-check the exact GPU, cloud tier, region, storage, and shutdown behavior before purchase.*
