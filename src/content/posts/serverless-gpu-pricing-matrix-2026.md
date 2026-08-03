---
title: "Serverless GPU pricing 2026: August 3 rate check and deployment-cost matrix"
description: "An August 3, 2026 public-rate check for GPU deployment: comparable RunPod, Modal, Baseten, Replicate, and Lambda prices—and the product scope behind each number."
pubDate: 2026-04-21
updatedDate: 2026-08-03
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed rate guide: the listed rates and product descriptions come from public provider pages checked on August 3, 2026. The monthly figures are estimates, not quotes.*

**Rates checked:** August 3, 2026
**Billing basis:** published USD listed-product rates; the surrounding CPU, RAM, storage, networking, support, scaling, and availability terms vary by provider

# Serverless GPU pricing 2026: August 3 rate check and deployment-cost matrix

The useful question is not simply “which cloud rents the cheapest H100?” It is **what product is attached to that H100 rate, and does that product match the job?** A RunPod Pod is a continuously allocated container. Lambda sells a conventional GPU VM instance. Modal bills a container by the second. Baseten and Replicate quote managed deployment hardware. Converting those rate cards to GPU-hours makes budgeting possible; it does not turn them into identical infrastructure.

This is a **partial public-source check**, completed August 3. RunPod, Modal, Baseten, Replicate, and Lambda published readable rate tables that matched the selected HostFleet data rows. Fal's public price page returned an access challenge, so Fal is deliberately excluded from any newly checked rate ranking. That is a source-access limit, not evidence that Fal's price changed. This page is source-backed, not benchmark-backed: it does not measure latency, capacity, startup time, or model throughput. For the live machine-readable reference, use [HostFleet's GPU pricing table](https://hostfleet.net/gpu-pricing/).

## The August 3 public-rate matrix

All values are USD per GPU-hour. Where a provider publishes seconds or minutes, the precise public rate is shown in the scope notes and converted by multiplying by 3,600 or 60. A dash means this comparison does not have a matching public product row—not that the provider has no GPU or no capacity.

| GPU capacity point | RunPod Secure Cloud Pod | Modal container | Baseten managed deployment | Replicate private deployment | Lambda GPU instance |
|---|---:|---:|---:|---:|---:|
| T4 — 16 GB | — | $0.5904/hr | $0.6312/hr | $0.81/hr | — |
| L4 — 24 GB | $0.39/hr | $0.7992/hr | $0.8484/hr | — | — |
| A10 / A10G — 24 GB | — | $1.1016/hr | $1.2072/hr | — | $1.29/GPU-hr |
| A100 — 80 GB | $1.39/hr | $2.4984/hr | $4.0002/hr | $5.04/hr | — |
| H100 — 80 GB | $2.89/hr | $3.9492/hr | $6.4998/hr | $5.49/hr | $3.29/GPU-hr |
| B200 — 180 GB | $5.89/hr | $6.2496/hr | $9.9798/hr | — | $6.99/GPU-hr |

### What each column actually buys

- **RunPod:** These are selected [RunPod pricing](https://www.runpod.io/pricing) **Secure Cloud Pod** rates, not Community Cloud and not Serverless worker tiers. The check confirmed the displayed A100 PCIe ($1.39/hr), H100 PCIe ($2.89/hr), and B200 ($5.89/hr) entries. A running Pod remains allocated and billable; its lower rate comes with the work of operating the image, serving process, storage, logs, and shutdown policy.
- **Modal:** [Modal pricing](https://modal.com/pricing) publishes $0.000164/sec for T4, $0.000222/sec for L4, $0.000306/sec for A10, $0.000694/sec for A100 80 GB, $0.001097/sec for H100, and $0.001736/sec for B200. The hourly values above are those rates × 3,600. This is a container-compute rate, not a reserved VM rate.
- **Baseten:** [Baseten pricing](https://www.baseten.co/pricing/) publicly lists $0.01052/min for 16 GiB, $0.01414/min for 24 GiB, $0.02012/min for A10G, $0.06667/min for A100 80 GiB, $0.10833/min for H100 80 GiB, and $0.16633/min for B200. The hourly equivalents are the listed minute rates × 60. These are managed deployment prices, not bare-card rentals.
- **Replicate:** [Replicate pricing](https://replicate.com/pricing) publishes private-deployment hardware at $0.000225/sec for T4, $0.001400/sec for A100 80 GB, and $0.001525/sec for H100. The hourly equivalents are the published second rates × 3,600.
- **Lambda:** [Lambda GPU instances](https://lambda.ai/instances) lists an A10 1x instance at $1.29/GPU-hour, a 1x H100 PCIe instance at $3.29/GPU-hour, and a 1x B200 instance at $6.99/GPU-hour. Each is an instance price with its own CPU, RAM, and local-storage configuration, so it is not a bare-GPU comparison.

### The Fal gap is intentional

Fal can be relevant when the buyer wants managed inference, but [Fal's pricing page](https://fal.ai/pricing) returned HTTP 429 during this check. The older HostFleet dataset contains dated Fal values; it does not justify presenting them as August 3 verified prices. A precise-looking stale row would be worse than an explicit gap. Recheck the official page in a browser before using Fal in a purchase decision.

## The low rate is only comparable inside the same operating model

A $1.39/hour RunPod A100 is not a cheaper version of a $4.00/hour Baseten A100 in every practical sense. The former is a dedicated Pod the operator runs; the latter is a managed deployment product. Similarly, a Lambda instance bundles an instance shape around the GPU, while Modal's rate belongs to a container execution surface.

Use this sequence before treating a table row as an answer:

1. **Choose the VRAM class first.** Memory, model format, context length, runtime overhead, and expected concurrency can make a lower-cost card unusable. The [Llama 70B VRAM guide](https://hostfleet.net/what-gpu-to-run-llama-70b/) shows why a raw model-weight number is not a deployment-size recommendation.
2. **Decide whether capacity must stay warm.** A Pod or VM that remains on keeps accumulating billable time. A workload that genuinely returns to zero should instead be modeled from expected billable seconds and cold-start tolerance. For the RunPod product split, read [RunPod Pods versus Serverless pricing](https://hostfleet.net/runpod-pricing-guide-2026/).
3. **Choose the operating surface.** Self-managed machines reduce the listed GPU floor but leave image, endpoint, observability, and lifecycle work with the team. Managed deployment products may cost more because they package a different serving surface.
4. **Then check the real constraint.** Region, capacity, storage, minimum replicas, networking, account terms, and support can change the final decision even when the rate card does not.

The dedicated [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) and [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/) separate capacity classes and explain their product-scope caveats in more detail.

## Estimate: one warm H100 for 30 days

These are **listed-product-rate estimates**, not provider quotes. The assumption is one named H100 product allocated for **720 hours** (30 days). They include only what that listed product bundles and exclude taxes, separately billed storage or networking, support, extra replicas, and workload-specific scaling behavior.

```text
monthly listed-product-rate estimate = published hourly equivalent × 720 hours
```

| H100 product shape | Rate used | 720-hour estimate |
|---|---:|---:|
| RunPod Secure Cloud H100 PCIe Pod | $2.89/hr | about $2,081 |
| Lambda 1x H100 PCIe instance | $3.29/GPU-hr | about $2,369 |
| Modal H100 container | $0.001097/sec | about $2,843 |
| Replicate private H100 deployment | $0.001525/sec | about $3,953 |
| Baseten H100 80 GiB deployment | $0.10833/min | about $4,680 |

The Modal calculation is reproducible from its unrounded public rate: `$0.001097 × 3,600 × 720 = $2,843.42`. The estimate explains the commitment created by holding capacity; it does **not** predict a bursty job that releases the GPU between requests. A serverless label changes the useful billing model only if the deployment really scales down.

## Who should start where?

- **You need a continuously allocated GPU and can run the stack:** compare RunPod Secure Cloud Pods and Lambda instances with the exact GPU variant, CPU/RAM bundle, storage, region, and availability required. RunPod's selected public rates are lower in this table, but that does not remove the operational responsibility.
- **You have bursty Python jobs or a service that can tolerate scaling behavior:** start with Modal's billable-second model, then turn expected active GPU-seconds into a budget. Do not apply 720-hour math to a job that can truly return to zero.
- **You need a managed model-serving surface:** compare Baseten and Replicate after defining minimum replicas, traffic shape, deployment controls, and support requirements. Their hourly equivalents should be weighed against the operator work they replace.
- **You are still deciding between 40 GB, 80 GB, and larger capacity:** settle the VRAM requirement before shopping rates. An 80 GB A100 and 80 GB H100 have different compute characteristics, but both are a different memory class from a 40 GB A100.

## Verdict

For an always-on, self-managed 80 GB GPU endpoint, **RunPod Secure Cloud remains the lowest selected verified rate in this matrix**: $1.39/hour for A100 PCIe and $2.89/hour for H100 PCIe. That is a useful starting point, not a universal winner—it buys a Pod and the operating work that comes with one.

For a conventional VM, Lambda provides a clear single-instance comparison point. For work that can genuinely release GPU capacity, model Modal from billable seconds rather than a month of warm capacity. For managed serving, Baseten and Replicate should be evaluated as deployment platforms, not as expensive versions of a raw GPU rental. And because Fal's public rate source was inaccessible on this pass, it should stay unranked until it can be re-verified.

## Sources

- [RunPod pricing](https://www.runpod.io/pricing) — selected Secure Cloud Pod and Serverless public rate tables; checked August 3, 2026
- [Modal pricing](https://modal.com/pricing) — published GPU per-second rates; checked August 3, 2026
- [Baseten pricing](https://www.baseten.co/pricing/) — published deployment per-minute rates; checked August 3, 2026
- [Replicate pricing](https://replicate.com/pricing) — published private-deployment hardware per-second rates; checked August 3, 2026
- [Lambda GPU instances](https://lambda.ai/instances) — published instance and per-GPU-hour rates; checked August 3, 2026
- [Fal pricing](https://fal.ai/pricing) — checked August 3, 2026; returned HTTP 429 and is not used for a current price claim
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`; selected public rows independently rechecked August 3, 2026; top-level dataset date remains July 23 because the Fal source check was incomplete

*Need a self-managed GPU endpoint? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
