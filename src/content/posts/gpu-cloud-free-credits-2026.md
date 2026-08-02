---
title: "GPU cloud free credits 2026: August check—what can actually run a GPU test?"
description: "An August 2026 source check of GPU-cloud credits: which public offers can fund a real test, which require an account upgrade, and where quota or capacity can still stop you."
pubDate: 2026-07-27
updatedDate: 2026-08-02
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed guide: credit amounts, expiry windows, and account restrictions come from the providers' published pages checked on August 2, 2026. The GPU-time figures are estimates, not quotes.*

**Offers checked:** August 2, 2026
**What this page answers:** whether a public credit can fund a bounded GPU deployment test—not whether a GPU is in stock or suitable for production

# GPU cloud free credits 2026: August check—what can actually run a GPU test?

A cloud credit is not the same thing as GPU access. A provider can offer a real sign-up balance while the account still lacks the required plan, quota, region capacity, or permission to create a GPU machine. That distinction matters more than the headline amount when the job is to prove that a container starts, a model loads, and one request completes.

This August refresh compares public, self-serve offers only. It excludes sales credits, student or research grants, country-specific promotions, and referral promotions that do not have stable public terms. It is source-backed rather than benchmark-backed. For the current GPU rate reference behind the estimates below, use [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

## The short answer

- **Modal is still the clearest direct GPU test credit.** Its Starter plan lists $30 of free compute credit each month and public per-second GPU rates on the same page.
- **AWS, Azure, and Oracle offer larger general-cloud credits, but none is a capacity reservation.** You still need to confirm the service, region, plan, quota, and any resulting paid-use exposure.
- **Google's $300 trial cannot create a VM with a GPU while the billing account remains a non-billable Free Trial account.** Upgrade first, then treat the remaining credit, quota, and capacity as separate checks.
- **AWS's current account-plan split is easy to miss.** New customers can choose Free or Paid at sign-up and receive up to $200 in credits either way, but the Free plan restricts services that would immediately consume the balance or require hardware purchases.

## Public offers, tested against the GPU question

| Provider | Public offer checked | Window | Does the published offer directly fund a GPU test? | The operational catch |
|---|---:|---|---|---|
| **Modal** | $30 of free compute credit on Starter | Recurs monthly | **Yes.** Modal publishes the credit and GPU task rates together. | CPU, memory, volumes, and a deliberately warm container can consume the credit too. |
| **AWS** | Up to $200: $100 at sign-up plus up to $100 from eligible exploration activities | Free plan ends at six months; credits expire 12 months after account creation | **Potentially, on a Paid plan.** AWS says remaining credits apply to future eligible bills after upgrade. | The Free plan limits offerings that require hardware purchases; GPU quota and regional EC2 capacity are separate from the credit. |
| **Microsoft Azure** | $200 credit in the account's billing currency | First 30 days | **Potentially.** Azure says the credit can be used on any service other than third-party Marketplace purchases. | A GPU VM still depends on quota and available capacity in the chosen region. |
| **Google Cloud** | $300 Welcome credit | 90 days | **Not while the account is a non-billable Free Trial account.** | Google explicitly disallows adding GPUs to VM instances and requesting quota increases at that stage. |
| **Oracle Cloud Infrastructure** | US$300 credit for eligible OCI services | Up to 30 days | **Possible, but not established by the offer alone.** | Eligible spend is not a GPU allocation; check the exact shape and region before designing the test around it. |

A yes in this table means the published terms do not themselves block GPU spend. It does not mean a particular H100, region, quota increase, image, or startup time is available. Credits answer a billing question; deployable capacity is an operations question.

## What Modal's recurring $30 can buy

Modal is the only offer in this comparison that pairs a recurring, public credit with published per-second GPU rates. The table uses the active Modal rows in [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/), verified against Modal's pricing page on August 2, 2026.

These are GPU-only estimates. The assumption is simple: the full $30 is spent on one named GPU rate, with no CPU, memory, storage, networking, or other charge. The calculation is $30 divided by the published hourly equivalent.

| Modal GPU | Published GPU rate | Approximate GPU time from $30 |
|---|---:|---:|
| T4 — 16 GB | $0.000164/sec ($0.5904/hr) | about 51 hours |
| L4 — 24 GB | $0.000222/sec ($0.7992/hr) | about 38 hours |
| A10 — 24 GB | $0.000306/sec ($1.1016/hr) | about 27 hours |
| A100 — 80 GB | $0.000694/sec ($2.4984/hr) | about 12 hours |
| H100 — 80 GB | $0.001097/sec ($3.9492/hr) | about 8 hours |

Those are spend ceilings, not throughput or latency predictions. They are enough to validate a bounded deployment path: build an image, load a model, exercise an endpoint or batch input, capture the result, and scale down. They are not evidence that a production endpoint will have acceptable cold starts, concurrency, or capacity.

For the billing behavior behind that calculation, read [Modal pricing explained](https://hostfleet.net/modal-pricing-guide-2026/). A scale-to-zero platform helps only when the workload actually returns to zero; holding a GPU warm turns a small credit into an always-on capacity budget.

## The account upgrade changes the risk

The general cloud trials are useful when the question includes more than GPU runtime: identity, private networking, object storage, monitoring, a queue, or a VM image. They require a slightly different test plan.

### Google: the credit exists, but the trial account blocks GPUs

Google's documentation says a Free Trial billing account starts with $300 in Welcome credit valid for 90 days. It also explicitly says a non-billable Free Trial account cannot add GPUs to VM instances or request a quota increase. GPUs and TPUs are not part of the separate Free Tier offer.

The safe sequence is:

1. Create the trial only if the surrounding non-GPU setup work is useful.
2. Upgrade to a Paid billing account before attempting a GPU VM.
3. Check GPU quota and regional capacity before committing engineering time.
4. Set a budget alert and a shutdown plan, because usage beyond remaining credit can be billed.

Google says unused Welcome credit remains after an upgrade until its original 90-day expiry. That preserves the opportunity, not the safety of the non-billable trial stage.

### AWS: credit eligibility and plan access are different controls

AWS now describes two choices for new customers at sign-up: Free and Paid. Both can receive up to $200 in Free Tier credits, composed of $100 at sign-up and up to another $100 through eligible exploration activities. The Free plan lasts until the earlier of six months after account opening or exhaustion of the credits. The credits themselves expire 12 months after account creation.

For GPU testing, the important detail is AWS's own restriction: the Free plan limits a subset of offerings that would immediately consume the credits or require hardware purchases. AWS says those limitations can be removed by upgrading to a Paid plan, and that remaining credits then apply to future eligible bills until expiry. That makes a GPU test plausible, but it also moves the account into normal pay-as-you-go exposure once the balance is gone or the service is not credit-eligible.

### Azure and OCI: broad credits are not a quota promise

Azure's $200 credit is broad on paper: Microsoft says it can be used on any service except third-party Marketplace purchases during the first 30 days. The page does not convert that policy into a GPU allocation. Confirm the VM family, regional quota, and capacity before building a test around it. If an account is upgraded during the first 30 days, Microsoft says remaining credit can be used through the original 30-day window.

Oracle documents US$300 of credit for eligible OCI services for up to 30 days. Its Free Tier material separately documents capacity limitations even for Always Free compute shapes. Treat that as a warning against assuming that a trial balance equals hardware availability. Verify the target shape, region, and account limits before moving any workload.

## A credit test that produces a useful answer

A credit is most valuable when it answers one decision rather than becoming an unbounded prototype. Use a fixed test definition:

1. **Choose the smallest meaningful GPU class.** Start with memory and model format, not the largest headline credit. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why an 80 GB-class card and a 40 GB card are different deployment constraints.
2. **Write the pass condition before provisioning.** For example: image builds, model reaches ready state, ten requests complete, logs and metrics are captured, then the resource is destroyed.
3. **Check allocation before porting.** Confirm plan, quota, region, and the exact GPU shape. A credit cannot fix a denied quota request.
4. **Set a dollar and time boundary.** Enable budget alerts, tag the resource, and schedule shutdown or deletion. Stopped or warm resources can still incur costs depending on product shape.
5. **Record the observed behavior.** Cold start, queueing, image pull time, model load time, and billed duration are workload-specific results. Do not substitute the published credit table for a measurement.

If a trial is not the right test vehicle, compare the operating shapes in [RunPod's Pods versus Serverless pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/) and [HostFleet's serverless GPU price matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). A small explicit budget on the right product can be more useful than a larger credit attached to the wrong account controls.

## Verdict

For a bounded, self-serve GPU prototype, **Modal's recurring $30 Starter credit remains the cleanest public offer in this set** because the credit and GPU rates are published together. Its value is operational clarity, not the largest possible dollar amount.

AWS, Azure, and OCI can fund broader cloud proof-of-concepts, but the GPU path is conditional on plan access, quota, regional capacity, and cost controls. Google's $300 credit is only relevant to a GPU VM after an account upgrade. In every case, verify allocation before investing in a migration and treat a public credit as a test budget—not a promise of hardware.

## Sources

- [Modal pricing](https://modal.com/pricing) — Starter credit and published GPU rates; checked August 2, 2026
- [Google Cloud Free Program and Free Trial restrictions](https://cloud.google.com/free/docs/free-cloud-features) — $300 credit, 90-day window, GPU and quota restrictions; checked August 2, 2026
- [AWS Free Tier FAQ](https://aws.amazon.com/free/free-tier-faqs/) — credit structure, account-plan rules, expiry, and restrictions; checked August 2, 2026
- [Azure free-account credit documentation](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) — credit amount, window, and upgrade treatment; checked August 2, 2026
- [Oracle Cloud Free Tier FAQ](https://www.oracle.com/cloud/free/faq.html) — credit amount, eligibility, window, and capacity caveat; checked August 2, 2026
- [Oracle Cloud Infrastructure Free Tier documentation](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm) — eligible OCI-service scope; checked August 2, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json; selected Modal rows rechecked August 2, 2026

*Need a paid self-managed GPU endpoint after the test? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
