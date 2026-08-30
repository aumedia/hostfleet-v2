---
title: "GPU cloud free credits 2026: which trials stop before charging?"
description: "A source-backed comparison of GPU cloud credits, paid-account transitions, hard spending caps, and what happens when each trial ends."
pubDate: 2026-07-27
updatedDate: 2026-08-30
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

> **Offers, rates, and account rules verified:** August 30, 2026
> **Evidence mode:** Source-backed with transparent calculations. This is not a capacity test or performance benchmark. A published credit does not prove that a provider will allocate a GPU.

# GPU cloud free credits 2026: which trials stop before charging?

The important number on a cloud trial is not only the credit balance. It is the amount you can spend **before the account starts charging a payment method**. Those are not always the same number.

Modal is the clearest example. Its Starter plan includes $30 of compute credit each month and directly supports GPU workloads, but Modal's billing documentation says Workspaces are auto-charged for usage after credits. The $30 is an allowance, not an automatic stop. A separate Workspace budget is the hard cap.

Google takes the opposite approach during its Free Trial: it promises no automatic charges, but the non-billable trial account cannot attach GPUs to VM instances or request quota increases. You must upgrade to a paid billing account to unlock the hardware, and that upgrade also enables charges for usage not covered by the remaining credit.

This source-backed refresh compares both sides of five public offers: the headline credit and the billing-state transition. Startup grants, academic programs, sales-negotiated credits, referral promotions, and country-specific coupons are excluded. For current public GPU rates outside these trials, use [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

## The short answer

- **Best direct GPU test credit: Modal, with a budget set first.** Starter includes $30 of monthly compute credit and publishes the GPU rates needed to plan a test. Modal also requires a payment method and auto-charges usage after credits, so configure a Workspace budget before launching.
- **Safest no-charge trial state: Google Cloud, but it is not a GPU-VM trial.** The $300 Welcome credit lasts 90 days and the non-billable state does not charge automatically. That same state blocks GPUs and quota increases.
- **Broad-cloud offers need an account-state check.** AWS advertises up to $200, Azure $200, and Oracle US$300. None of those amounts guarantees a GPU family, quota, region, or capacity.
- **A shutdown is safer than a surprise invoice but still operationally dangerous.** Azure disables the subscription and services when its credit ends. AWS, Google, and Oracle document recovery or retention windows, but none should be treated as a production continuity mechanism.

Every dollar amount and account rule below was checked on the linked official pages on August 30, 2026.

## Public cloud-credit offers and their real billing boundaries

| Provider | Public offer | Default no-charge boundary | What changes the boundary | GPU reality |
|---|---:|---|---|---|
| **Modal** | $30 of compute credit each month on Starter | **Not the credit balance by itself.** Modal bills monthly after credits and can make incremental usage charges. | Set a Workspace budget to impose a hard gross-usage cap. Modal says a net-charge spend limit starts September 1, 2026. | Direct GPU use is supported, subject to concurrency and capacity. |
| **AWS** | Up to $200: $100 at signup plus up to $100 from eligible exploration activities | Free plan ends after six months or when credits run out; AWS says no charges unless the account upgrades or activates paid-only services. | A manual Paid-plan upgrade enables pay-as-you-go. Some organization, compliance, and contract actions automatically upgrade the account; joining AWS Organizations or setting up Control Tower also expires remaining Free Tier credits immediately. | EC2 is represented in the Free Tier catalog, but the public offer does not promise a GPU instance type, quota, or region. |
| **Microsoft Azure** | $200 in the account's billing currency | Credit expires after 30 days. Microsoft says the subscription and services are disabled when the credit runs out or expires. | Upgrade to pay-as-you-go; remaining credit can still be used through the original 30-day deadline, then non-free usage is charged. | The offer can apply to Azure services except third-party Marketplace purchases, but it does not grant GPU quota or capacity. |
| **Google Cloud** | $300 Welcome credit | Non-billable Free Trial lasts 90 days and has no automatic charges. | Upgrade to a Paid billing account. Remaining credit survives until the original deadline, but uncovered usage can charge the payment method. | GPUs and quota increases are explicitly blocked until the paid upgrade. |
| **Oracle Cloud Infrastructure** | US$300 for eligible OCI services | Trial ends after 30 days or when the credit is consumed. Card checks are authorization holds, not usage charges. | Upgrade to Pay As You Go. Oracle says billing starts after the trial window or credit is exhausted. | Eligible spend is not a GPU allocation; shape, tenancy limit, region, and capacity remain separate gates. |

A credit can therefore play three different roles: a **hard no-charge sandbox**, an **allowance on a billable account**, or a **balance that becomes usable for GPUs only after billing is enabled**. Comparing the face values without those states is misleading.

## Modal's $30 is an allowance; the Workspace budget is the cap

Modal remains the most transparent self-serve GPU offer in this comparison because one official pricing page publishes both the monthly Starter credit and every GPU rate. Its separate billing guide adds the condition buyers cannot afford to miss: all Workspaces are billed monthly and auto-charged for usage after credits. Modal also says it can auto-charge incremental usage when a Workspace first crosses certain thresholds, and a payment method is required.

That does not make the offer bad. It means the safe setup is **credit plus budget**, not credit alone.

Modal's budget documentation describes two existing controls:

- A **Workspace budget** caps total monthly Workspace usage before credits are applied. The documentation calls this the hard outer cap.
- An **Environment budget** caps compute usage for one environment, but this control is limited to Team and Enterprise plans and excludes some Workspace-level charges.

For a Starter test intended to stay inside the recurring allowance, set the Workspace budget to $30 before launching. This caps gross usage at the same amount as the published monthly credit. Do not rely on a dashboard reminder while an expensive GPU remains warm.

Modal also documents a second control scheduled to start **September 1, 2026**: a Workspace spend limit that caps net out-of-pocket charges after credits. The provider says workloads that would create additional net charges stop when that limit is reached. If no custom spend limit is set, the default is the Workspace usage limit minus credits. Because that feature was not yet effective at this article's August 30 verification time, confirm its live behavior in the dashboard before treating it as the only guardrail.

For the broader billing details—including requested-resource billing, regional multipliers, Sandbox rates, and storage lag—read [HostFleet's Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/).

## How much Modal GPU time can $30 fund?

The table below uses Modal's public per-second GPU rates, checked August 30, 2026. The same values appear in HostFleet's live GPU dataset, last updated August 27.

`GPU-only hours = $30 / (published per-second GPU rate × 3,600)`

These are ceilings, not runtime promises. They assume the entire credit applies to one GPU and exclude CPU, memory, storage, networking, regional placement multipliers, retries, and intentionally warm idle time.

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

The GPU-only column is useful for comparing accelerators, but it is not a complete credit budget. Consider an L4 Function that requests four physical CPU cores and 32 GiB of memory for every billable GPU second. At Modal's August 30 public rates:

| Resource | Calculation | Hourly cost |
|---|---:|---:|
| L4 GPU | $0.000222 × 3,600 | $0.7992 |
| 4 physical CPU cores | $0.0000131 × 4 × 3,600 | $0.18864 |
| 32 GiB memory | $0.00000222 × 32 × 3,600 | $0.255744 |
| **Total** | GPU + CPU + memory | **$1.243584/hr** |

At that requested shape, $30 funds about **24.12 hours**, not the GPU-only ceiling of 37.54 hours. The estimate still excludes storage, networking, and optional regional placement. It also assumes every dollar of credit remains available and every requested resource stays billable for the same duration. Use [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to model warm capacity and billable seconds separately.

Do not select the T4 merely because it buys the most clock time. The workload still has to fit its memory and supported execution path. [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why GPU memory, quantization, context, and concurrency come before the hourly-rate comparison.

## AWS: a Free-plan account can become paid because of an organization action

AWS's current Free Tier is safer than an ordinary pay-as-you-go account while it remains on the Free plan. AWS says the plan incurs no charges unless the user upgrades or activates paid-only services, and the account closes after six months or when the credits are exhausted. Data is retained for 90 days after the Free plan expires, but AWS says upgrading is required even to download that data.

The sharp edge is that a plan change is not always triggered by a button labeled buy GPU. AWS documents automatic Paid-plan upgrades when an account performs certain organization, contract, partner, subscription, or compliance actions. Its examples include creating or joining an AWS Organization, setting up an AWS Control Tower landing zone, joining the AWS Partner Network, and designating the account HIPAA- or SEC-compliant.

Two of those actions have a second consequence: joining an AWS Organization or setting up Control Tower immediately expires Free Tier credits and makes the account ineligible to earn more. This matters for a team prototype. Moving a personal trial account into the company organization can simultaneously remove the free-plan boundary and erase the balance intended for the test.

AWS does not promise a named GPU instance in the public Free Tier offer. Confirm the exact EC2 accelerator family, service access, quota, region, and credit eligibility before porting a workload. Treat the account-plan state as a deployment prerequisite.

## Google: the safest no-charge state blocks the GPU

Google's non-billable Free Trial is unusually explicit: no automatic charges, $300 of Welcome credit, and a 90-day window. It is also explicit that the trial account cannot add GPUs to VM instances or request quota increases. GPUs and TPUs are not part of Google's ongoing Free Tier either.

A manual upgrade to a Paid billing account unlocks GPUs and preserves unused Welcome credit until the original 90-day expiry. It also enables charges for usage beyond the remaining credit, beyond Free Tier limits, or outside trial coverage. The operational sequence is therefore:

1. Validate the non-GPU parts of the stack in the no-charge trial state.
2. Confirm GPU quota, machine family, region, and expected rate.
3. Set budgets and alerts.
4. Upgrade only when the team is ready for pay-as-you-go exposure.

If the account is not upgraded when the 90 days or $300 ends, Google closes the trial billing account and stops its resources. The provider documents a 30-day grace period in which an upgrade might recover stopped resources and data. That is a recovery opportunity, not a service-level commitment.

## Azure and Oracle default to stopping, not silently charging

Azure's free-account documentation says its $200 credit can be used during the first 30 days on any Azure service except third-party Marketplace purchases. When the credit runs out or expires, the subscription and services are disabled. To continue, the owner must upgrade to pay-as-you-go. If that upgrade happens before day 30, the remaining credit lasts only through the original deadline; uncovered usage after that is charged.

Oracle likewise requires a deliberate upgrade for paid operation. Its US$300 applies to eligible OCI services for up to 30 days. Oracle says upgrading during the trial preserves the credit and delays billing until the credit is consumed or the trial ends. Without an upgrade, paid trial resources can be reclaimed and cannot be restored. The FAQ describes a 30-day grace period, but also says resources may continue to exist for only a few days before reclamation; by the end of the grace period, trial instances and data are deleted.

Neither rule grants a deployable accelerator. Azure's credit scope and Oracle's eligible-service wording answer a billing question, not the quota and capacity question. Verify the exact GPU VM family before building around either trial.

## A bounded trial plan that will not become a surprise bill

Use this order for any GPU-credit test:

1. **Record the account state.** Write down Free, Paid, Starter, Pay As You Go, or the provider's exact equivalent.
2. **Confirm GPU eligibility.** Check the named accelerator, machine or deployment product, quota, region, and capacity.
3. **Set the hard control.** Configure a Workspace budget, spending limit, project billing boundary, or the closest provider-enforced cap. Alerts are useful but are not caps.
4. **Price the whole requested shape.** Include CPU, memory, storage, network, placement multipliers, replicas, and warm idle time.
5. **Define the pass condition.** A useful smoke test proves image build, model load, representative requests, logs, and teardown.
6. **Test the stop action.** Verify whether stop, scale-to-zero, or delete actually ends compute billing and which retained resources remain chargeable.
7. **Export anything worth keeping.** Do this before the balance or trial window expires, not during a recovery grace period.

For paid alternatives, compare product boundaries in [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) and the Pods-versus-Serverless details in [HostFleet's RunPod pricing guide](https://hostfleet.net/runpod-pricing-guide-2026/). A small paid test on the correct GPU can be more valuable than a large credit that cannot reach the hardware.

## Verdict

Modal still offers the clearest direct GPU trial budget in this group, but the safe recommendation now needs an important qualifier: **set a Workspace budget because the recurring $30 credit is not the billing ceiling**. At current rates, the GPU-only ceiling ranges from 50.81 T4 hours to 4.23 B300 hours, while a realistic L4 shape with requested CPU and memory can reduce the example allowance to about 24.12 hours.

Google offers the cleanest default protection from automatic charges, but that protection exists in an account state that blocks GPU VMs. AWS, Azure, and Oracle can support broader cloud proofs of concept; their credits still do not guarantee GPU access. The right comparison is not $30 versus $200 versus $300. It is **credit, account state, quota, hard cap, and end-of-trial behavior together**.

## Sources

All web sources below were accessed August 30, 2026.

- [Modal pricing](https://modal.com/pricing) — Starter credit, GPU, CPU and memory rates, plan controls, and concurrency
- [Modal billing guide](https://modal.com/docs/guide/billing) — payment-method requirement, monthly auto-charging, incremental charges, and billing after credits
- [Modal budgets guide](https://modal.com/docs/guide/budgets) — Workspace and Environment caps plus the September 1 spend-limit behavior
- [Google Cloud Free Program](https://cloud.google.com/free/docs/free-cloud-features) — $300 amount, 90-day window, no-charge state, GPU and quota restrictions, upgrade behavior, and recovery window
- [AWS Free Tier](https://aws.amazon.com/free/) — up-to-$200 structure, six-month Free plan, and no-charge boundary
- [AWS Free Tier FAQ](https://aws.amazon.com/free/free-tier-faqs/) — 12-month credit expiry, automatic Paid-plan transitions, organization-related credit expiry, and data retention
- [Azure free-services documentation](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) — $200 amount, 30-day window, Marketplace exclusion, and remaining-credit treatment
- [Azure avoid-charges documentation](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account) — subscription disablement and post-upgrade charging
- [Oracle Cloud Free Tier FAQ](https://www.oracle.com/cloud/free/faq.html) — US$300 amount, 30-day window, card verification, upgrade behavior, resource reclamation, and deletion
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 27, 2026; Modal entries rechecked against the live provider page August 30

*Need a paid self-managed GPU endpoint after the test? Using our labeled affiliate link supports HostFleet's testing budget at no extra cost to you: <a href="https://hostfleet.net/go/runpod" rel="sponsored nofollow">RunPod</a>. Source citations in this article are never affiliate links.*
