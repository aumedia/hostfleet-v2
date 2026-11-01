---
title: "Replicate pricing 2026: GPU rates, idle costs and teardown rules"
description: "Replicate GPU rates checked November 2026, with all 17 configurations, idle costs, cancellation limits, deletion prerequisites and prepaid-credit risks."
pubDate: 2026-07-26
updatedDate: 2026-11-01
category: ai-hosting
author: Alex Harmon
draft: false
---

**Source-backed pricing guide; estimates are labeled.** Replicate's official pricing, billing, Deployment and API documentation were checked on **November 1, 2026**. HostFleet did not create a paid Deployment or measure cold starts, idle eviction, shutdown propagation, throughput or settled charges. See the [HostFleet methodology](https://hostfleet.net/about/) for the evidence boundary.

> **Replicate rates and documentation verified:** November 1, 2026<br>
> **Currency:** public USD list rates before credits, tax or negotiated terms<br>
> **Evidence:** sourced behavior and rate arithmetic, not a billing benchmark

# Replicate pricing 2026: GPU rates, idle costs and teardown rules

Replicate's hardware prices are easy to read. Its billing stop is harder to establish. A private Deployment pays for every second its instances are online, including setup, prediction work and idle waiting. A completed or canceled prediction does not establish that its instance is offline.

The important teardown rule is explicit: **you can delete a Deployment only after it has been offline and unused for at least 15 minutes**. Deletion is cleanup after shutdown eligibility, not an emergency way to shut down an online GPU. That 15-minute rule is also **not** a published idle timeout or an extra 15 minutes of billable online time.

At the November 1 rates, a single T4 costs **$0.0135 per online minute** and an H100 costs **$0.0915**. The rate card remains unchanged from our previous check. This refresh adds the distinction between prediction cancellation, autoscaling settings, offline status and deletion—four events that should not share one “stop” button in a cost forecast.

For other providers, start with the [live GPU pricing table](https://hostfleet.net/gpu-pricing/) and [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For Replicate's broader product fit, read [Replicate for AI inference APIs and jobs](https://hostfleet.net/replicate-for-ai-inference-apis-and-jobs/).

## The short answer: choose the billing boundary first

| Product shape | Billing boundary | What to budget |
|---|---|---|
| Runtime-priced public model | Active processing; Replicate absorbs setup and idle time | Request runtime, with shared-capacity queue and setup delays still possible |
| Most private models | All online instance time | Setup, active work and gaps between requests |
| Fast-booting fine-tune | Active processing | Only use this exception when the exact version is labeled fast booting |
| Deployment | Every second its instances are online | Warm minimums, cold setup, idle tails and overlapping online instances |
| Official model | Model-specific input or output metric | Outside this hardware-runtime guide |

These boundaries come from [Replicate pricing](https://replicate.com/pricing) and the [billing guide](https://replicate.com/docs/topics/billing), checked November 1. An hourly GPU equivalent is not automatically the price of one request. This guide covers infrastructure runtime, not model-specific unit pricing.

## Four single-GPU rates in HostFleet's live dataset

HostFleet's shared GPU dataset retains its **September 24, 2026 dataset-wide date**. Its four Replicate cells match the official rate card rechecked **November 1, 2026**; that is not a fresh verification of every other provider.

The following rows use those live-dataset inputs and the native per-second rates on [Replicate pricing](https://replicate.com/pricing).

| GPU | VRAM | Public rate | Hourly equivalent | One online minute | 730-hour warm estimate |
|---|---:|---:|---:|---:|---:|
| T4 | 16 GB | $0.000225/sec | $0.81/hr | $0.0135 | $591.30 |
| L40S | 48 GB | $0.000975/sec | $3.51/hr | $0.0585 | $2,562.30 |
| A100 | 80 GB | $0.001400/sec | $5.04/hr | $0.0840 | $3,679.20 |
| H100 | 80 GB | $0.001525/sec | $5.49/hr | $0.0915 | $4,007.70 |

**Estimate assumptions:** one named instance online throughout each interval; November 1 public rate; 730 hours is a comparison month, not a fixed billing month. The minute and monthly columns are derived arithmetic, excluding extra instances, credits, tax, contract changes and downstream-model charges. They are not invoices or performance comparisons.

The [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) can help vary duration. For Replicate Deployments, enter **online time**, including setup and idle time, rather than just successful prediction runtime.

## All 17 published GPU configurations

The [November 1 pricing page](https://replicate.com/pricing) lists six GPU configurations in its primary hardware list and 11 additional configurations with committed-spend qualifications. The whole-configuration rates and monthly arithmetic are below.

| Published configuration | Public rate | Hourly equivalent | 730-hour online estimate | Access note |
|---|---:|---:|---:|---|
| T4, 1 GPU | $0.000225/sec | $0.81/hr | $591.30 | No committed-spend note |
| L40S, 1 GPU | $0.000975/sec | $3.51/hr | $2,562.30 | No committed-spend note |
| L40S, 2 GPUs | $0.001950/sec | $7.02/hr | $5,124.60 | No committed-spend note |
| A100 80 GB, 1 GPU | $0.001400/sec | $5.04/hr | $3,679.20 | No committed-spend note |
| A100 80 GB, 2 GPUs | $0.002800/sec | $10.08/hr | $7,358.40 | No committed-spend note |
| H100, 1 GPU | $0.001525/sec | $5.49/hr | $4,007.70 | No committed-spend note |
| L40S, 4 GPUs | $0.003900/sec | $14.04/hr | $10,249.20 | Committed spend |
| L40S, 8 GPUs | $0.007800/sec | $28.08/hr | $20,498.40 | Committed spend |
| A100 80 GB, 4 GPUs | $0.005600/sec | $20.16/hr | $14,716.80 | Committed spend |
| A100 80 GB, 8 GPUs | $0.011200/sec | $40.32/hr | $29,433.60 | Committed spend |
| H100, 2 GPUs | $0.003050/sec | $10.98/hr | $8,015.40 | Committed spend |
| H100, 4 GPUs | $0.006100/sec | $21.96/hr | $16,030.80 | Committed spend |
| H100, 8 GPUs | $0.012200/sec | $43.92/hr | $32,061.60 | Committed spend |
| H200, 1 GPU | $0.001525/sec | $5.49/hr | $4,007.70 | Committed spend |
| H200, 2 GPUs | $0.003050/sec | $10.98/hr | $8,015.40 | Committed spend |
| H200, 4 GPUs | $0.006100/sec | $21.96/hr | $16,030.80 | Committed spend |
| H200, 8 GPUs | $0.012200/sec | $43.92/hr | $32,061.60 | Committed spend |

**Estimate assumptions:** every GPU in the named configuration remains online for 730 hours at the November 1 public rate; no credits, tax, contract adjustment or downstream calls. Monthly cost is `per-second rate × 3,600 × 730`. An eight-GPU row is not a promise that one-eighth of the configuration can be rented separately.

Absence of a committed-spend note is not proof of account quota, stock, region or launch permission. H200's matching H100 unit rate does not make it ordinary self-service capacity: every H200 row is contract-qualified. Ask for the minimum spend, term, configuration and capacity start date before using it in a purchase plan.

For wider accelerator comparisons, use the [H100 rental guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) and [A100 rental guide](https://hostfleet.net/a100-rental-price-per-hour-2026/). Replicate Deployments are managed inference capacity, not generic GPU VMs.

## Zero minimum removes a warm floor, not the idle tail

Replicate's [billing documentation](https://replicate.com/docs/topics/billing), checked November 1, says it scales toward a configured minimum, zero by default. A Deployment can customize minimum and maximum instance counts. When requests stop, an instance remains idle for “a few minutes” to avoid repeatedly setting up from scratch.

The checked documentation does not provide a universal numeric idle duration. Do not turn that phrase into a guaranteed three-, five- or ten-minute shutdown time.

For a single configuration, the useful equation is:

    online instance-seconds
      = setup seconds + active seconds + idle seconds

    compute estimate
      = sum of online instance-seconds × exact configuration rate

Sum the online time across all paid instances. Concurrent replicas and any rollout overlap cannot be priced as one wall-clock timer. Count successful and failed setup time within online time; do not assume a failed request means a free Deployment. The billing page specifically says failed and canceled private-model and Deployment runs are billed normally for the instances involved, despite broader failure wording elsewhere on that page.

A warm minimum is easier to forecast. At the **November 1** rate, one H100 continuously online for 24 hours costs an estimated **$131.76** (`$0.001525 × 86,400`). Five simultaneously online H100 instances have a combined list-price run rate of **$27.45/hour**. These estimates exclude credits, tax, downstream work and negotiated terms.

The minimum sets an intentional capacity floor. The maximum limits concurrent scale-out, not cumulative monthly spend. A minimum of zero and maximum of one can still leave one instance billing for an unknown duration.

## Cancellation, scale-down and deletion are different controls

Replicate's [HTTP API reference](https://replicate.com/docs/reference/http) and [deletion guide](https://replicate.com/docs/topics/deployments/delete-a-deployment), checked November 1, support the following distinctions.

| Control or event | What it establishes | What it does not establish |
|---|---|---|
| Prediction completes | That prediction is finished | The dedicated instance is offline |
| Prediction cancellation | A request to cancel a prediction | Immediate shutdown of the Deployment's online capacity |
| `Cancel-After` | Automatic prediction cancellation after the specified lifetime, measured from creation | A whole-instance online-time or dollar ceiling |
| `min_instances=0` | A zero autoscaling floor | Current zero-instance state or a known meter-stop time |
| `max_instances` | A scale-out configuration limit | A documented emergency-stop operation |
| Offline state | Under the billing model, offline compute is not billed | A second-exact timestamp from coarse dashboard history |
| Successful Deployment deletion | The Deployment object has been removed | That deletion terminated an online GPU at that moment |

`Cancel-After` is documented for Deployment predictions, with a minimum duration of **five seconds**. A value such as `60s` limits prediction lifetime from creation; it is not a promise that setup, idle time or other instances cost only 60 seconds.

The Deployment PATCH reference exposes hardware, version and min/max instance settings. Each properties update increments the current release number. It does **not** document a numeric minimum for `max_instances` or guarantee that `max_instances=0` is accepted and immediately terminates every instance. Treat that as unverified, not as an emergency-stop recipe.

### The deletion prerequisite does not reveal the idle timeout

The requirement is **offline and unused for at least 15 minutes**. It does not say “wait 15 minutes after the last prediction, then all compute stops.” The instance must already be offline for deletion eligibility. Offline waiting is not online compute time under the documented billing model.

There is also a documentation mismatch. The deletion tutorial shows a path with `{deployment_id}`. The explicit HTTP reference specifies:

```text
DELETE /v1/deployments/{deployment_owner}/{deployment_name}
```

The reference says a successful delete returns an empty **HTTP 204** response. Prefer the explicit owner/name reference when implementing cleanup, and confirm the current resource identity and API behavior before relying on it. HostFleet has not tested either route against an account; no delete command is presented here as a verified shutdown mechanism.

## A shutdown checklist that does not wake the GPU

Before starting a paid Deployment, establish how you will stop submissions, observe offline capacity and reconcile its bill. Do not wait until a small budget is nearly exhausted to discover that deletion is unavailable while the instance is online.

1. **Record the target.** Keep the owner/name, model version, hardware SKU, release number and min/max configuration. Know which usage belongs to it.
2. **Stop the producers.** Disable scheduled submissions and automatic client retries; account for queued or in-flight work. Cancel outstanding predictions where appropriate, without treating cancellation as a billing stop.
3. **Use a confirmed shutdown procedure.** A zero minimum can permit autoscaling toward zero. It does not prove that zero has been reached. If you need a bounded stop, confirm a supported procedure and its limits with Replicate before the run.
4. **Observe passively.** Use control-plane status and monitoring rather than a test prediction that could wake the Deployment again. Preserve observation times as intervals where precision is limited.
5. **Delete only when eligible.** After the documented offline/unused prerequisite, use the confirmed cleanup route, retain the response and verify absence with a read-only resource lookup or listing.
6. **Reconcile settled usage.** An empty resource list does not replace a billing record. Attribute charges to the isolated Deployment and record credits, rounding and reporting delay separately.

This is a source-backed operational checklist, not a tested guarantee of a shutdown deadline. If a bounded stop or attributable usage is unavailable, keep the forecast source-backed and do not describe a small dollar target as an enforced cap.

## Prediction timing is not the Deployment bill

The [HTTP reference](https://replicate.com/docs/reference/http), checked November 1, defines `predict_time` as the CPU/GPU time used while the prediction runs, excluding the wait before it starts. `total_time` is the time the prediction took to complete. Neither represents the post-completion idle interval of a dedicated instance.

The [monitoring guide](https://replicate.com/docs/topics/deployments/monitor-a-deployment) says historical metrics cover up to **24 hours** in **15-minute intervals**. That is useful for capacity trends but cannot establish a second-exact billing stop or an idle cutoff described only as “a few minutes.”

The same guide gives a default model setup timeout of **10 minutes**. Configuring it from one minute to three hours requires an enterprise contract. A setup timeout bounds that setup attempt; it is not a promise that all capacity or retries stop billing then.

For reconciliation, use isolated settled online-instance usage with known monetary precision. If only a rounded account total is available, do not assign unrelated spend to one Deployment or divide the rounded total by the rate and call the answer measured billed seconds.

A process boot UUID is also narrower evidence than it first appears. Reusing it supports process reuse between observations. A changed UUID shows a different process, not whether idle eviction, a crash or a configuration change caused replacement. Neither proves continuous GPU residency or an exact invoice interval.

## Prepaid balance is not an exact experiment ceiling

The [prepaid-credit guide](https://replicate.com/docs/topics/billing/prepaid-credit), checked **November 1, 2026**, states:

- Auto reload is optional. Its minimum threshold is **$5** and minimum reload balance is **$15**.
- Saving a threshold at or above the current balance triggers an immediate reload.
- At zero balance, Replicate prevents new work and shuts down infrastructure running for the account.
- A prediction can rarely overrun the balance; the outstanding amount is charged to the default payment method at month end.
- Purchased credit is non-refundable and valid for **one year**.

Separate credit purchases from consumed compute. A $15 reload balance is an account funding setting, not the cost of a request or the minimum amount consumed. A low prepaid balance is not a guaranteed exact test ceiling because overruns are documented. Record the account's billing mode and reload state before estimating cash exposure.

### Example: a sub-dollar target still needs a bounded stop

At the [November 1 T4 rate](https://replicate.com/pricing), **30 total online minutes** cost:

    $0.000225/second × 1,800 seconds = $0.405

Adding an explicitly assumed **$0.25 planning reserve** gives **$0.655** against a **$1 test target**. The reserve and target are editorial planning assumptions, not Replicate fees or enforced limits.

That estimate assumes one instance, no overlapping replacement, no downstream calls and complete online shutdown inside 30 minutes. Those conditions were not measured. Each additional T4 online minute adds **$0.0135**; multiple online instances multiply the exposure. Do not add the deletion eligibility interval as though it were automatically billable GPU time.

HostFleet has not run this test. We are not treating the $1 target as a cap: a paid trial first needs a supported bounded-stop procedure and attributable settled usage. The useful result today is a transparent cost equation, not an invented idle cutoff.

## Replicate pricing verdict

Replicate still publishes **17 GPU configurations** at the rates above, with H200 and larger additional configurations subject to committed-spend terms. The buying decision is less about multiplying GPU seconds and more about deciding which seconds the product makes you pay for.

- Use the runtime-priced public-model path when it fits and paying only for active processing matters more than owning the queue.
- Budget a Deployment across all online setup, active and idle time. Treat nonzero minimums as warm floors and maximums as concurrency limits.
- Plan the shutdown evidence before launch. Prediction cancellation, zero minimum and deletion are not interchangeable billing stops.
- Treat credits and small budget targets as financial controls with documented limitations, not guaranteed exact caps.

For alternative billing boundaries, compare the [RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) and [Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/). Matching GPU names do not make lifecycle charges interchangeable.

## Sources and verification scope

Official sources below were fetched **November 1, 2026**. They document provider behavior, not HostFleet account results.

- [Replicate pricing](https://replicate.com/pricing) — all 17 GPU configurations, native per-second rates, hourly equivalents and committed-spend qualifications.
- [Billing](https://replicate.com/docs/topics/billing) — public/private/Deployment billing, online states, idle retention and failed/canceled run qualifications.
- [Deployments](https://replicate.com/docs/topics/deployments) and [create a Deployment](https://replicate.com/docs/topics/deployments/create-a-deployment) — hardware, min/max instances and configurable capacity.
- [Delete a Deployment](https://replicate.com/docs/topics/deployments/delete-a-deployment) — offline/unused prerequisite and the tutorial's ID-style path.
- [HTTP API reference](https://replicate.com/docs/reference/http) — owner/name delete route and HTTP 204 success; prediction cancellation, `Cancel-After`, timing metrics and Deployment updates.
- [Monitor a Deployment](https://replicate.com/docs/topics/deployments/monitor-a-deployment) — historical aggregation, setup timeout and enterprise-only customization.
- [Prepaid credit](https://replicate.com/docs/topics/billing/prepaid-credit) — reload limits, immediate reload behavior, zero-balance shutdown, overruns, expiry and refunds.
- [Official models](https://replicate.com/docs/topics/models/official-models) — distinct product and billing boundary; no model-specific price comparison is made here.

**HostFleet data note:** four Replicate cells from the shared GPU dataset, whose dataset-wide date remains September 24, were independently rechecked November 1. The two rate tables use the current official Replicate rate card. No full-market refresh, paid invoice reconciliation or measured shutdown result is claimed.
