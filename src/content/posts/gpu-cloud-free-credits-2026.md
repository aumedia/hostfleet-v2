---
title: "GPU cloud free credits 2026: offers, GPU access and spend limits"
description: "Compare five GPU cloud credit offers, AWS project spend limits, Modal stop controls, and verified GPU-hour estimates before starting a trial."
pubDate: 2026-07-27
updatedDate: 2026-11-04
category: "ai-hosting"
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

> **Offers, rates, and account rules verified:** November 4, 2026<br>
> **Evidence mode:** Official-source claims plus transparent arithmetic. HostFleet did not test account approval, GPU quota, capacity, performance, or an invoice. A published credit does not prove that a provider will allocate a GPU.

# GPU cloud free credits 2026: offers, GPU access and spend limits

The best **GPU cloud free credit** is not necessarily the offer with the largest dollar amount. The safer question is: **what account state, GPU gate, and provider-enforced limit sit behind the credit?**

Modal is the clearest direct GPU example: Starter includes $30 of compute each month. But a credit, a timeout, and a spending limit solve different problems. A job can time out while containers restart; a workspace can spend past its credit unless its billing controls prevent it.

AWS now documents a different option in its new signup experience: a Paid-plan project spend limit, with a floor of at least $20. That is an enforced project control, not a promise of a zero-charge GPU trial. Google's $300 non-billable trial is simpler on charges but explicitly blocks GPU VMs.

This is a **source-backed guide with estimated runtime calculations**, not a benchmark or an account test. Official offers, rates, and control contracts were checked **November 4, 2026**. HostFleet did not verify signup approval, quota, stock, stop latency, or a settled invoice. Startup grants, academic programs, negotiated credits, referral promotions, and country-specific coupons are excluded. For rates outside these programs, use [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/).

## The short answer

- **Best direct self-serve GPU allowance: Modal.** Starter includes $30/month of compute and direct GPU access, subject to account limits and capacity. Set both the gross Workspace budget and net-charge spend limit deliberately.
- **Strongest default no-charge state: Google Cloud.** The $300 Welcome credit lasts 90 days and does not auto-charge, but the trial state cannot add GPUs to VMs or request higher quota.
- **Largest face value here: Google and Oracle at $300.** Neither amount guarantees a GPU shape, region, quota, or stock.
- **AWS and Azure are broad-cloud trials, not promised GPU allocations.** AWS offers up to $200; its Free plan lasts up to six months. Azure offers $200 for 30 days. AWS now also documents a Paid-plan project spend limit with a minimum of at least $20, subject to the account experience.
- **A provider stop is not a continuity plan.** Trial expiry can disable services, close an account, reclaim resources, or start a recovery clock.

## Public offers and their real billing boundaries

Every amount and duration below comes from the linked official provider page and was checked **November 4, 2026**.

| Provider and source | Public offer | Default no-charge boundary | What changes it | GPU reality |
|---|---:|---|---|---|
| [Modal](https://modal.com/pricing) | $30/month of free compute on Starter | The credit alone is not a stop; Modal auto-charges after credits. | Workspace budget caps gross usage; spend limit caps net charges. | Direct GPUs are supported, subject to limits and capacity. |
| [AWS](https://aws.amazon.com/free/) | Up to $200: $100 at signup plus up to $100 from eligible activities | Free plan ends after six months or when credits run out; no charges unless upgraded to Paid. | Paid enables out-of-credit charges. Its new project spend-limit control starts at at least $20; joining Organizations or setting up Control Tower ends remaining earning activities. | No named GPU, quota, region, or capacity is promised. |
| [Azure](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) | $200 in the account's billing currency | Credit expires after 30 days; Azure disables the subscription and services when it runs out or expires. | Upgrade to pay-as-you-go. | Credit scope is not GPU quota or capacity. |
| [Google Cloud](https://cloud.google.com/free/docs/free-cloud-features) | $300 Welcome credit | Non-billable Free Trial lasts 90 days with no automatic charges. | Upgrade to a Paid billing account; uncovered usage can then charge. | GPUs and quota increases are blocked before upgrade. |
| [Oracle Cloud](https://www.oracle.com/cloud/free/faq.html) | US$300 for eligible OCI services | Trial ends after 30 days or when credit is consumed. Card checks are authorization holds. | Upgrade to Pay As You Go; billing starts after credit or trial expiry. | Eligible spend does not guarantee a GPU shape, limit, region, or stock. |

The same word, **credit**, therefore describes three different products: a hard no-charge sandbox, an allowance on a billable account, or a balance that cannot reach GPUs until billing is enabled. Face-value comparisons hide that distinction.

## Modal now has a gross cap and a net-charge cap

Modal's [budget documentation](https://modal.com/docs/guide/budgets), checked November 4, describes the spend-limit feature as active. It separates three controls:

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

Modal's [billing guide](https://modal.com/docs/guide/billing), checked November 4, still says a payment method is required and Workspaces are auto-charged after credits and incremental charges. For the full rate card, region premiums, idle tails, and Sandbox pricing, read [HostFleet's Modal pricing guide](https://hostfleet.net/modal-pricing-guide-2026/).

## A timeout is not a credit-only spending cap

The following control distinctions come from Modal's official documentation, checked **November 4, 2026**. They matter before you turn an allowance into a GPU experiment.

| Control | What the docs say | What it does not establish |
|---|---|---|
| Function `timeout` | Limits execution time per attempt; excludes scheduling and resets for retries. Execution may overrun by a handful of seconds. | A launch-to-cleanup deadline or a maximum bill. |
| `startup_timeout` | Separately configures startup; if unset, `timeout` also configures startup. | A shared lifetime cap across repeated container starts. |
| `retries=0` | Disables configured input retries, not the platform's separate container crash recovery. Deployed Apps retry crashes indefinitely with backoff. | One lifetime attempt, one lifetime container, or bounded total exposure. |
| `max_containers=1` | Limits the specific Function's container pool. Parametrized class instances can have independent pools. | An App-wide spending cap or a lifetime-attempt limit. |
| `FunctionCall.get(timeout=...)` | Sets how long the client waits for a result. | Remote cancellation or container termination when the client stops waiting. |
| `FunctionCall.cancel()` | Cancels inputs without retrying them. Container termination is **off by default**. | Proof that every container stopped or billing settled. |
| `modal app stop --yes APP_ID --env ENV` | Permanently stops the selected App and terminates running containers; `--yes` avoids an interactive confirmation. SDK `App.stop()` also prevents new inputs. | A documented numerical stop-latency or invoice-settlement guarantee. |

Sources: [timeouts](https://modal.com/docs/guide/timeouts), [retries and crash recovery](https://modal.com/docs/guide/retries), [FunctionCall](https://modal.com/docs/sdk/py/latest/FunctionCall), [autoscaling](https://modal.com/docs/guide/scale), [CLI App commands](https://modal.com/docs/cli/latest/app), and [App SDK](https://modal.com/docs/sdk/py/latest/App).

For an isolated trial, use the billing controls as the spending boundary and an observer outside the target App for the operational stop. Record the exact workspace, Environment and App ID before launch. Do not make App stop depend on a cancellation call completing. Stop only the disposable App you own, then verify its state, container count, retained resources and later usage. A successful stop response is lifecycle evidence, not an exact meter timestamp.

The practical distinction: **a timeout bounds an attempt; a budget bounds usage; an App stop ends a deployment**. Use them together. None of the timeout or concurrency settings turns a calculated trial cost into a provider-enforced dollar cap.

## How much Modal GPU time can $30 buy?

Modal's [pricing page](https://modal.com/pricing), checked **November 4, 2026**, lists the following 11 per-second rates. The table is generated from the Modal native-unit cells in HostFleet's `gpu-pricing.json`, cross-checked against today's official rate card. The dataset-wide date remains September 24; this is a scoped Modal recheck, not a fresh check of every provider.

`GPU-only hours = $30 / (published per-second rate × 3,600)`

These are ceilings, not runtime promises. Assumptions: one GPU, automatic placement, all $30 applies to GPU usage, and no CPU, memory, storage, networking, idle time, retries, or region multiplier.

| Modal GPU | Published rate | Hourly equivalent | GPU-only time from $30 |
|---|---:|---:|---:|
| T4 | $0.000164/sec | $0.5904/hr | 50.81 hours |
| L4 | $0.000222/sec | $0.7992/hr | 37.54 hours |
| A10 | $0.000306/sec | $1.1016/hr | 27.23 hours |
| L40S | $0.000542/sec | $1.9512/hr | 15.38 hours |
| RTX PRO 6000 | $0.000842/sec | $3.0312/hr | 9.90 hours |
| A100 40 GB | $0.000583/sec | $2.0988/hr | 14.29 hours |
| A100 80 GB | $0.000694/sec | $2.4984/hr | 12.01 hours |
| H100 | $0.001097/sec | $3.9492/hr | 7.60 hours |
| H200 | $0.001261/sec | $4.5396/hr | 6.61 hours |
| B200 | $0.001736/sec | $6.2496/hr | 4.80 hours |
| B300 | $0.001972/sec | $7.0992/hr | 4.23 hours |

The same November 4 rate card lists Function CPU at $0.0000131 per physical core-second and memory at $0.00000222 per GiB-second. One L4 plus four physical CPU cores and 32 GiB of memory costs an estimated **$1.243584/hour**: $0.799200 GPU + $0.188640 CPU + $0.255744 memory. At that shape, $30 funds about **24.12 hours**, not 37.54. This still excludes storage, networking, placement premiums, and idle time.

Use [HostFleet's GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) once you know the likely allocation duration. Do not select T4 only because it buys the most clock time; [HostFleet's Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) explains why memory, quantization, context, and concurrency come first.

## AWS: a new project cap, but not a universal zero-charge GPU trial

AWS's [Free Tier page](https://aws.amazon.com/free/) and [FAQ](https://aws.amazon.com/free/free-tier-faqs/), checked **November 4, 2026**, still advertise up to $200: $100 at signup and up to $100 from eligible activities. The Free plan ends after six months or when credits run out, whichever comes first. AWS says there are no charges unless you upgrade to Paid. That plan is restricted to selected services; the public offer does not promise an EC2 GPU allocation.

### Paid projects can now have an enforced spend limit

The [AWS Settings spend-limit guide](https://docs.aws.amazon.com/accounts/latest/reference/create-spend-limit.html), checked **November 4, 2026**, is explicitly for the new AWS experience. It documents an enforced control, not just an email alert:

- You must be on a **Paid Plan** to create it, and a project owner manages it.
- It applies to **one project**, not automatically to every project or the entire account. Some projects can have limits while others do not.
- The minimum is the **greater of $20 or AWS's conservative estimate of likely monthly spend**. Existing running resources and prior-month usage can raise that floor. A universal $20 setting is not promised.
- AWS calls it a ceiling on the project's **pre-tax costs** and states that spend limits **exclude credits**. Do not subtract a promotional balance and assume that creates a zero-out-of-pocket test; inspect the effective limit and balance in the account.
- At the limit, AWS says it pauses the project and stops its resources. Reactivation can require increasing the limit, and some resources may need manual restart.
- AWS warns that project data is permanently deleted if no action is taken within **90 days** of the pause. Export important results before relying on a stop.

This is useful for a disposable experiment if the account exposes it, the GPU service is available, and a paused project is acceptable. It does not remove GPU quota, regional capacity, or credit-eligibility gates, and it is not a sub-dollar or credit-only cap.

Optional early controls can stop new launches, pause idle resources, or pause top cost drivers before the limit. Do not treat the idle detector as a short trial watchdog: AWS describes a **14-day lookback** for EC2 G/P GPU idle criteria. A failed five-minute experiment needs its own stop path.

### Separate earning eligibility from an already-earned balance

The current FAQ says joining an AWS Organization or setting up an AWS Control Tower landing zone immediately expires remaining **earning activities** and makes the account ineligible to earn more. That is not the same as saying every already-earned credit disappears. The advanced-features section instead says earned credits continue applying until expiry.

The same FAQ currently gives different expiry statements: the general and advanced-features answers say **six months**, while the Paid-upgrade and activity-credit answers say **12 months**. It also explicitly distinguishes accounts created before the new signup experience in **October 2026**. Those statements do not support a universal extra six months for every upgrade or credit.

Before moving a prototype to Paid or into a company organization, record its exact plan, remaining balance and **each credit's displayed expiration date** in AWS Settings or the Billing console. The documented [GetAccountPlanState API](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/API_freetier_GetAccountPlanState.html) returns plan type, status, plan expiration and remaining credits; **plan expiration is not a per-credit expiry ledger**. Preserve both kinds of evidence rather than resolving the FAQ's differing dates by assumption.

## Google: the safest trial state blocks GPUs

Google's [Free Program documentation](https://cloud.google.com/free/docs/free-cloud-features), checked November 4, remains explicit: $300 lasts 90 days, the non-billable trial does not charge automatically, and that state cannot add GPUs to VMs or request quota increases.

A manual upgrade unlocks those controls and preserves unused credit until the original deadline. It also enables charges beyond remaining credit or outside coverage. Google's [budget documentation](https://cloud.google.com/billing/docs/how-to/budgets), checked November 4, explicitly says **alerts-only budgets do not automatically cap usage or spending**. An alert alone is not a stop action. Do not translate the trial's no-charge behavior into a claim that a paid account stops at $300.

## Azure and Oracle stop by default, but neither grants a GPU

Azure's [free-services guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) and [avoid-charges guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account), checked November 4, still say eligible users receive $200 for 30 days. When credit runs out or expires, the subscription and services are disabled. Continuing requires pay-as-you-go. Credit scope is not accelerator quota or capacity.

Oracle's [Free Tier FAQ](https://www.oracle.com/cloud/free/faq.html), checked November 4, still lists US$300 for eligible OCI services for up to 30 days. Upgrading during the trial preserves credit; billing starts after credit is consumed or the trial ends. Without an upgrade, trial resources can be reclaimed. The FAQ describes a 30-day upgrade grace period but says resources may exist for only a few days before reclamation; reclaimed resources cannot be recovered. Do not treat the grace period as 30 days of guaranteed GPU access. Eligible balance is not a guaranteed GPU shape, tenancy limit, region, or allocation.

## A bounded trial plan

1. **Record the exact account state:** Free, Paid, Starter, Pay As You Go, or equivalent.
2. **Confirm GPU eligibility:** named accelerator, product, quota, region, image support, and capacity.
3. **Set an enforced control:** distinguish it from an alert, timeout or concurrency limit. On Modal, configure gross usage and net charges; in the new AWS experience, confirm the exact project and accepted spend-limit floor. Record credit expiry separately from plan expiry.
4. **Price the requested shape:** CPU, memory, storage, network, region, replicas, startup, retries, and warm idle time.
5. **Define one pass condition:** image build, model load, representative requests, logs, and teardown.
6. **Prepare and verify the stop action:** use a separately running observer for a disposable App or project. Verify lifecycle state, then check attributable usage after collection lag and inventory retained storage. Do not infer an exact meter cutoff from cancellation, a client timeout or a zero-container display.
7. **Export before expiry:** do not depend on a recovery window.

## After the credit test: choose the cost model before adding spend

- **Running queue-driven or scale-to-zero GPU work?** Check the documented billing, retry, and teardown boundaries in [HostFleet's serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) before treating a cancelled job or stopped group as proof that worker charges ended.
- **Keeping an endpoint warm between requests?** Put the GPU, CPU, memory, active work, and idle retention into the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) rather than extending a credit-only GPU-hour estimate into a production forecast.
- **Moving to continuously allocated capacity?** Compare like-for-like hardware, storage, and billing boundaries in the [H100 rental-price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) before choosing a Pod or VM.

## Verdict

Modal is the most practical direct GPU allowance in this group. Its Workspace budget caps gross usage and its spend limit caps net charges after credits. A timeout or one-container setting does not replace those controls, especially for a deployed App that can crash-retry indefinitely.

AWS's new project spend limit is a meaningful enforced control, but it requires Paid, starts at **at least $20**, and is project-scoped. Check account availability and credit expiry rather than importing the Free plan's no-charge promise into Paid. Google has a clean non-billable trial state that blocks GPU VMs; Azure and Oracle offer broader trials without guaranteed accelerator allocation.

Choose on **GPU access, credit coverage, effective spending control, stop behavior and data expiry together**. The largest promotional balance is not necessarily the cheapest completed deployment test.

## Sources

Official sources were checked **November 4, 2026**.

- [Modal pricing](https://modal.com/pricing) — Starter credit, 11 GPU rates, CPU and memory rates
- [Modal billing](https://modal.com/docs/guide/billing) — payment method, auto-charging, credits, and incremental charges
- [Modal budgets](https://modal.com/docs/guide/budgets) — active budgets, spend limits, default formula, and enforcement
- [AWS Free Tier](https://aws.amazon.com/free/) and [FAQ](https://aws.amazon.com/free/free-tier-faqs/) — offer, account experiences, earning eligibility and differing published expiry statements
- [AWS Settings spend limits](https://docs.aws.amazon.com/accounts/latest/reference/create-spend-limit.html) — Paid-plan requirement, project scope, minimum, credits exclusion, enforcement, early controls and data retention
- [AWS GetAccountPlanState](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/API_freetier_GetAccountPlanState.html) — plan state, expiration and balance fields
- [Modal timeouts](https://modal.com/docs/guide/timeouts), [retries](https://modal.com/docs/guide/retries), [FunctionCall](https://modal.com/docs/sdk/py/latest/FunctionCall), [autoscaling](https://modal.com/docs/guide/scale), [CLI App commands](https://modal.com/docs/cli/latest/app), and [App SDK](https://modal.com/docs/sdk/py/latest/App) — attempt limits, crash recovery, cancellation and whole-App stop
- [Google Cloud budgets](https://cloud.google.com/billing/docs/how-to/budgets) — alerts-only budgets do not cap spend
- [Google Cloud Free Program](https://cloud.google.com/free/docs/free-cloud-features) — amount, duration, no-charge state, GPU restrictions, and upgrade
- [Azure free-services guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services) and [avoid-charges guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account) — amount, duration, disablement, and upgrade
- [Oracle Cloud Free Tier FAQ](https://www.oracle.com/cloud/free/faq.html) — amount, duration, authorization, upgrade, and reclamation
- HostFleet GPU dataset — dataset-wide date September 24, 2026; Modal native per-second cells rechecked November 4. Other provider rates were not revalidated for this article.

*Need a paid self-managed GPU Pod after the trial? This is a labeled affiliate link: [RunPod signup (affiliate)](https://hostfleet.net/go/runpod). Source citations above remain direct, non-affiliate links.*
