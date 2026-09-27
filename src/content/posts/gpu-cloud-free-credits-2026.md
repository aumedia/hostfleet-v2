---
title: "GPU cloud free credits 2026: which trials stop before charging?"
description: "A source-checked comparison of GPU cloud credits, GPU access gates, paid-account transitions, and the controls that can stop trial spend."
pubDate: 2026-07-27
updatedDate: 2026-09-27
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

> **Offers, rates, and account rules verified:** September 27, 2026<br>
> **Evidence mode:** Official-source claims plus transparent arithmetic. HostFleet did not test account approval, GPU quota, capacity, performance, or an invoice. A published credit does not prove that a provider will allocate a GPU.

# GPU cloud free credits 2026: which trials stop before charging?

The best **GPU cloud free credit** is not necessarily the offer with the largest dollar amount. The safer question is: **what account state, GPU gate, and provider-enforced limit sit behind the credit?**

Modal is the clearest direct GPU example. Its Starter plan includes $30 of compute each month and publishes rates for 11 GPU classes. The credit is still an allowance on a billable workspace, not an automatic $30 ceiling. The material September update is that Modal now documents two active controls: a Workspace budget that caps gross usage before credits and a spend limit that caps net out-of-pocket charges after credits.

Google Cloud is the inverse. Its $300 Welcome credit comes with a non-billable 90-day Free Trial, but that state explicitly blocks GPUs and quota-increase requests. Upgrading unlocks the relevant controls and also creates pay-as-you-go exposure.

This is a **mixed, mostly source-backed** guide. Offer amounts, account transitions, limits, and GPU rates come from the linked official pages checked September 27, 2026. Runtime totals are arithmetic estimates with their assumptions exposed. Startup grants, academic programs, negotiated credits, referral promotions, and country-specific coupons are excluded. For rates outside these programs, use [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

## The short answer

- **Best direct self-serve GPU allowance: Modal.** Starter includes $30/month of compute and direct GPU access, subject to account limits and capacity. Set both the gross Workspace budget and net-charge spend limit deliberately.
- **Strongest default no-charge state: Google Cloud.** The $300 Welcome credit lasts 90 days and does not auto-charge, but the trial state cannot add GPUs to VMs or request higher quota.
- **Largest face value here: Google and Oracle at $300.** Neither amount guarantees a GPU shape, region, quota, or stock.
- **AWS and Azure are broad-cloud trials, not promised GPU allocations.** AWS offers up to $200 over six months; Azure offers $200 for 30 days.
- **A provider stop is not a continuity plan.** Trial expiry can disable services, close an account, reclaim resources, or start a recovery clock.

## Public offers and their real billing boundaries

Every amount and duration below comes from the linked official provider page and was checked **September 27, 2026**.

| Provider and source | Public offer | Default no-charge boundary | What changes it | GPU reality |
|---|---:|---|---|---|
| [Modal](https://modal.com/pricing) | $30/month of free compute on Starter | The credit alone is not a stop; Modal auto-charges after credits. | Workspace budget caps gross usage; spend limit caps net charges. | Direct GPUs are supported, subject to limits and capacity. |
| [AWS](https://aws.amazon.com/free/) | Up to $200: $100 at signup plus up to $100 from eligible activities | Free plan closes after six months or when credits run out; AWS says no charge unless the account upgrades to Paid. | Manual upgrade, joining AWS Organizations, or setting up an AWS Control Tower landing zone; the latter two also expire remaining credits immediately. | No named GPU, quota, region, or capacity is promised. |
| [Azure](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) | $200 in the account's billing currency | Credit expires after 30 days; Azure disables the subscription and services when it runs out or expires. | Upgrade to pay-as-you-go. | Credit scope is not GPU quota or capacity. |
| [Google Cloud](https://cloud.google.com/free/docs/free-cloud-features) | $300 Welcome credit | Non-billable Free Trial lasts 90 days with no automatic charges. | Upgrade to a Paid billing account; uncovered usage can then charge. | GPUs and quota increases are blocked before upgrade. |
| [Oracle Cloud](https://www.oracle.com/cloud/free/faq.html) | US$300 for eligible OCI services | Trial ends after 30 days or when credit is consumed. Card checks are authorization holds. | Upgrade to Pay As You Go; billing starts after credit or trial expiry. | Eligible spend does not guarantee a GPU shape, limit, region, or stock. |

The same word, **credit**, therefore describes three different products: a hard no-charge sandbox, an allowance on a billable account, or a balance that cannot reach GPUs until billing is enabled. Face-value comparisons hide that distinction.

## Modal now has a gross cap and a net-charge cap

Modal's [budget documentation](https://modal.com/docs/guide/budgets), checked September 27, describes the spend-limit feature as active. It separates three controls:

1. **Workspace budget:** the hard outer cap for total Workspace usage during the billing cycle, measured before credits. Modal also calls this the usage limit.
2. **Workspace spend limit:** the monthly cap on net charges after applicable credits. Modal says it stops workloads that would create additional out-of-pocket charges once this limit is reached. Credit-covered workloads can continue until the usage limit is reached.
3. **Environment budget:** a Team/Enterprise compute cap for one Environment. It excludes some Workspace-level charges, including storage and reservations, so it is not a complete invoice cap.

The default formula deserves attention. Modal says that without a custom spend limit, the default is the cycle's usage limit minus credits. Its own example is a $100 usage limit and $30 of credits producing a $70 default spend limit. Receiving $30 of compute does **not** imply a zero-dollar default net-charge ceiling.

For a Starter experiment intended to stay inside the recurring $30 allowance:

- set the Workspace budget to a **$30 gross-usage ceiling**;
- inspect the displayed spend limit and explicitly set the acceptable **net out-of-pocket ceiling**;
- run a tiny workload and confirm both controls in Usage & Billing before launching a GPU; and
- scale down or delete the workload, then check retained storage separately.

Modal's public docs do not publish the minimum custom spend-limit value, so this article does not promise that every workspace can enter $0. A $30 gross Workspace budget remains the documented hard outer cap for a credit-only test. Confirm the dashboard's effective values rather than inferring them from the marketing card.

Modal's [billing guide](https://modal.com/docs/guide/billing), checked September 27, still says a payment method is required and Workspaces are auto-charged after credits and incremental charges. For the full rate card, region premiums, idle tails, and Sandbox pricing, read [HostFleet's Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/).

## How much Modal GPU time can $30 buy?

Modal's [pricing page](https://modal.com/pricing), checked **September 27, 2026**, lists the following 11 per-second rates. HostFleet's live dataset, updated September 24, agrees with them.

`GPU-only hours = $30 / (published per-second rate × 3,600)`

These are ceilings, not runtime promises. Assumptions: one GPU, automatic placement, all $30 applies to GPU usage, and no CPU, memory, storage, networking, idle time, retries, or region multiplier.

| Modal GPU | Published rate | Hourly equivalent | GPU-only time from $30 |
|---|---:|---:|---:|
| T4 | $0.000164/sec | $0.5904/hr | 50.81 hours |
| L4 | $0.000222/sec | $0.7992/hr | 37.54 hours |
| A10 | $0.000306/sec | $1.1016/hr | 27.23 hours |
| L40S | $0.000542/sec | $1.9512/hr | 15.38 hours |
| A100 40 GB | $0.000583/sec | $2.0988/hr | 14.29 hours |
| A100 80 GB | $0.000694/sec | $2.4984/hr | 12.01 hours |
| RTX PRO 6000 | $0.000842/sec | $3.0312/hr | 9.90 hours |
| H100 | $0.001097/sec | $3.9492/hr | 7.60 hours |
| H200 | $0.001261/sec | $4.5396/hr | 6.61 hours |
| B200 | $0.001736/sec | $6.2496/hr | 4.80 hours |
| B300 | $0.001972/sec | $7.0992/hr | 4.23 hours |

The same September 27 rate card lists Function CPU at $0.0000131 per physical core-second and memory at $0.00000222 per GiB-second. One L4 plus four physical CPU cores and 32 GiB of memory costs an estimated **$1.243584/hour**: $0.799200 GPU + $0.188640 CPU + $0.255744 memory. At that shape, $30 funds about **24.12 hours**, not 37.54. This still excludes storage, networking, placement premiums, and idle time.

Use [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) once you know the likely allocation duration. Do not select T4 only because it buys the most clock time; [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why memory, quantization, context, and concurrency come first.

## AWS: organization actions can upgrade the plan and expire credits

AWS's [Free Tier page](https://aws.amazon.com/free/) and [FAQ](https://aws.amazon.com/free/free-tier-faqs/), checked September 27, still describe up to $200 over six months. AWS says the Free plan produces no charges unless the account upgrades to Paid.

The current FAQ documents three relevant paths: a manual upgrade, joining AWS Organizations, or setting up an AWS Control Tower landing zone. If the account upgrades through either organization action, remaining Free Tier credits expire immediately and the account becomes ineligible to earn more. Moving a prototype into a company organization can therefore change both the plan and the credit balance.

AWS does not promise a named EC2 GPU in the public offer. Confirm accelerator family, service access, quota, region, and credit eligibility first.

## Google: the safest trial state blocks GPUs

Google's [Free Program documentation](https://cloud.google.com/free/docs/free-cloud-features), checked September 27, remains explicit: $300 lasts 90 days, the non-billable trial does not charge automatically, and that state cannot add GPUs to VMs or request quota increases.

A manual upgrade unlocks those controls and preserves unused credit until the original deadline. It also enables charges beyond remaining credit or outside coverage. Google budgets are alerts and tracking tools, not hard spending caps. Do not translate the trial's no-charge behavior into a claim that a paid account stops at $300.

## Azure and Oracle stop by default, but neither grants a GPU

Azure's [free-services guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) and [avoid-charges guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account), checked September 27, still say eligible users receive $200 for 30 days. When credit runs out or expires, the subscription and services are disabled. Continuing requires pay-as-you-go. Credit scope is not accelerator quota or capacity.

Oracle's [Free Tier FAQ](https://www.oracle.com/cloud/free/faq.html), checked September 27, still lists US$300 for eligible OCI services for up to 30 days. Upgrading during the trial preserves credit; billing starts after credit is consumed or the trial ends. Without an upgrade, trial resources can be reclaimed. Eligible balance is not a guaranteed GPU shape, tenancy limit, region, or allocation.

## A bounded trial plan

1. **Record the exact account state:** Free, Paid, Starter, Pay As You Go, or equivalent.
2. **Confirm GPU eligibility:** named accelerator, product, quota, region, image support, and capacity.
3. **Set an enforced control:** distinguish a hard budget or spend limit from an alert. On Modal, configure gross usage and net charges.
4. **Price the requested shape:** CPU, memory, storage, network, region, replicas, startup, retries, and warm idle time.
5. **Define one pass condition:** image build, model load, representative requests, logs, and teardown.
6. **Test the stop action:** verify whether stop, zero, or delete ends compute billing and what remains chargeable.
7. **Export before expiry:** do not depend on a recovery window.

For paid alternatives, compare lifecycle boundaries in [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) and Pods versus Serverless in [HostFleet's RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/).

## Verdict

Modal remains the most practical direct GPU allowance in this group, and its active spend-limit documentation improves the safety story. The controls are not interchangeable: Workspace budget caps **gross usage before credits**, while spend limit caps **net charges after credits**. For a credit-only Starter test, set a $30 gross ceiling and verify the displayed net limit before launching.

Google has the cleanest default no-charge state, but it blocks GPU VMs. AWS, Azure, and Oracle offer broader cloud trials whose credits do not guarantee accelerator access. The useful comparison is not $30 versus $200 versus $300. It is **credit, account state, GPU gate, gross cap, net-charge cap, and expiry behavior together**.

## Sources

Official sources were checked **September 27, 2026**.

- [Modal pricing](https://modal.com/pricing) — Starter credit, 11 GPU rates, CPU and memory rates
- [Modal billing](https://modal.com/docs/guide/billing) — payment method, auto-charging, credits, and incremental charges
- [Modal budgets](https://modal.com/docs/guide/budgets) — active budgets, spend limits, default formula, and enforcement
- [AWS Free Tier](https://aws.amazon.com/free/) and [FAQ](https://aws.amazon.com/free/free-tier-faqs/) — offer, manual upgrade, and the AWS Organizations/Control Tower upgrade and credit-expiry rules
- [Google Cloud Free Program](https://cloud.google.com/free/docs/free-cloud-features) — amount, duration, no-charge state, GPU restrictions, and upgrade
- [Azure free-services guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) and [avoid-charges guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account) — amount, duration, disablement, and upgrade
- [Oracle Cloud Free Tier FAQ](https://www.oracle.com/cloud/free/faq.html) — amount, duration, authorization, upgrade, and reclamation
- HostFleet dataset: `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated September 24, 2026
- Live baseline: `/opt/hostbot-v2/src/content/posts/gpu-cloud-free-credits-2026.md`

*Need a paid self-managed GPU Pod after the trial? This is a labeled affiliate link: [RunPod signup (+$5 credit on your first $10, affiliate)](https://hostfleet.net/go/runpod). Source citations above remain direct, non-affiliate links.*
