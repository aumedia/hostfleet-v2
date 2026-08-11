---
title: "Modal pricing 2026: per-second GPU billing, explained"
description: "Modal pricing explained: live per-second GPU rates, plan gates, warm-capacity estimates, and the billing details that change the decision."
pubDate: 2026-07-25
updatedDate: 2026-07-25
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed pricing guide: published rates and billing behavior come from Modal's public pricing page and documentation. The 30-day figures are clearly labeled estimates, not quotes.*

**Pricing verified:** July 25, 2026

# Modal pricing 2026: per-second GPU billing, explained

Modal does not sell a simple GPU instance with one obvious monthly price. It sells serverless compute billed by the second. That is excellent when a GPU job is genuinely intermittent; it is less magical when you keep a container warm all day to avoid a cold start.

This guide is source-backed and uses Modal's live public pricing page checked on **July 25, 2026**, plus its billing, cold-start, scaling, GPU, and timeout documentation. It covers hosting infrastructure costs, not model-token or subscription pricing. For the broader provider market, start with [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For Modal's product fit beyond price, see our [Modal review for inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/).

## The short answer

| If you need… | Modal cost shape | Practical reading |
|---|---|---|
| A prototype or an intermittent GPU job | Often very good | Starter has a $0 base and $30/month credit; billed work can scale down to zero. |
| A Python API that sees uneven traffic | Usually a strong fit | You pay for the resources used or requested, without a minimum time increment. |
| One low-latency GPU held ready all month | Expensive by design | Warm capacity is billable capacity, even when it is waiting. |
| The cheapest predictable always-on server | Usually the wrong shape | Modal is elastic compute, not a bargain fixed GPU box. |

The buying rule: **use Modal for variable work; price warm capacity as if it were deliberately always on.**

## Modal's live GPU rates

The table uses the live rates listed on Modal's pricing page. The hourly column is a conversion of the vendor's per-second rate (`per-second rate × 3,600`), rounded to cents. It is there to make comparison easier; Modal bills per second. All rates are USD per GPU and exclude CPU, memory, storage, and any workload-specific overhead.

| GPU | VRAM | Published rate | Equivalent per hour | 30-day always-allocated estimate |
|---|---:|---:|---:|---:|
| T4 | 16 GB | $0.000164/sec | $0.59/hr | about $425 |
| L4 | 24 GB | $0.000222/sec | $0.80/hr | about $575 |
| A10 | 24 GB | $0.000306/sec | $1.10/hr | about $793 |
| L40S | 48 GB | $0.000542/sec | $1.95/hr | about $1,405 |
| A100 | 40 GB | $0.000583/sec | $2.10/hr | about $1,511 |
| A100 | 80 GB | $0.000694/sec | $2.50/hr | about $1,799 |
| RTX PRO 6000 | 96 GB | $0.000842/sec | $3.03/hr | about $2,182 |
| H100 | 80 GB | $0.001097/sec | $3.95/hr | about $2,843 |
| H200 | 141 GB | $0.001261/sec | $4.54/hr | about $3,269 |
| B200 | 180 GB | $0.001736/sec | $6.25/hr | about $4,500 |
| B300 | 288 GB | $0.001972/sec | $7.10/hr | about $5,111 |

**Estimate assumptions:** one GPU allocated continuously for **720 hours in a 30-day month**; GPU charges only; no CPU, memory, volumes, networking, or region-related charges. Formula: `per-second rate × 3,600 × 720`. These estimates describe a continuously allocated GPU, not an intermittent endpoint that actually scales down. Re-check the [Modal pricing page](https://modal.com/pricing) before committing a production workload.

## Starter and Team: the fixed plan cost is not the whole bill

Modal's current public plan table lists **Starter at $0 plus compute** with **$30/month in free credit**, three workspace seats, 100 containers, and 10 GPU concurrency. Scheduled and Web Functions are marked limited. **Team is $250 plus compute** with $100/month in free credit, 1,000 containers, 50 GPU concurrency, and unlimited Scheduled Functions.

The important wording is “plus compute.” The plan is a control-plane and feature gate; GPU, CPU, memory, and storage remain usage charges. Treat credits as a prototype runway, not as a production cost model.

## What actually bills

Modal's billing guide says customers pay for resources they **use or request**, with no reservations required and no minimum usage-time increments. The live pricing page also lists these supporting resources:

| Resource | Published price | Why it matters |
|---|---:|---|
| CPU | $0.0000131 per physical core-second | A small API wrapper still uses CPU while it handles requests or stays allocated. |
| Memory | $0.00000222 per GiB-second | A large model-serving process can make RAM material alongside GPU time. |
| Volumes | $0.09 per GiB-month | Persistent model data and artifacts are separate from GPU charges. |

The CPU rate has a documented minimum allocation of 0.125 cores per container. The pricing page also includes 1 TiB/month of volume transfer. Those details are small compared with a warm H100, but they are why a “GPU-only” estimate is not a total bill.

## The warm-capacity tradeoff, in plain language

A cold container has to start before it can serve work. Modal's cold-start guide says containers stay idle for a short period before shutdown; the default maximum idle time is **60 seconds**. Its scaling controls let you use `min_containers` to hold capacity warm, `buffer_containers` to keep an extra idle buffer while active, and `scaledown_window` to change how long containers may remain idle.

Those controls improve latency, but Modal is explicit about the trade: a larger warm pool or longer idle window increases resource consumption and cost. A retained GPU is still a billed GPU.

For example, the L4 rate is $0.000222/second. If the deployment only does 100 billable GPU-hours of work in a month, the GPU component is about **$80**. If an L4 remains allocated for all 720 hours, it is about **$575** before CPU, memory, and storage. The same distinction is why a permanently warm H100 is a roughly **$2,843/month GPU-only** decision, not an inexpensive serverless default. Our [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) makes the same 1%, 10%, and always-warm allocation test explicit across several H100 product shapes.

## Limits that should change the architecture

Modal's default Function execution timeout is **300 seconds**. The documented range is one second through 24 hours. That gives batch and async jobs room, but it is not a reason to make every long operation a synchronous web request.

A practical deployment split is:

- keep short inference calls on the request path;
- send longer document processing, fine-tuning preparation, or bulk work to an async job; and
- expose polling, a callback, or a queue status rather than holding a user connection open.

This preserves the real advantage of per-second serverless billing: work can finish and scale down instead of becoming accidental always-on capacity.

## Which Modal price should you use?

Start by selecting VRAM and then match the workload's traffic shape:

- **T4 or L4:** small inference, embeddings, OCR, and bursty jobs where a 16–24 GB class is enough.
- **L40S or A100:** larger serving workloads and models that need more headroom, with a meaningful jump in the cost of keeping containers warm.
- **H100, H200, B200, or B300:** high-throughput or large-memory work where utilization must be deliberate; idle capacity becomes a multi-thousand-dollar monthly decision.

If traffic is steady enough that a GPU should remain allocated for most of the month, compare the warm Modal estimate with dedicated infrastructure rather than assuming serverless is automatically cheaper. The practical tradeoff is covered in [Modal vs RunPod for one warm inference endpoint](https://hostfleet.net/modal-vs-runpod-warm-inference-endpoint/) and [RunPod, Modal, and Replicate for a small inference API](https://hostfleet.net/runpod-vs-modal-vs-replicate-small-inference-api/).

## Final verdict

Modal pricing is straightforward once you separate **billable work** from **billable readiness**:

- Starter is a strong low-friction way to prototype intermittent GPU jobs.
- Per-second billing is valuable when the deployment truly scales down.
- Warm-container settings are latency controls that deliberately raise the bill.
- Always calculate a 720-hour GPU-only floor before calling a public endpoint “serverless and cheap.”

For an application that needs a deliberately always-on GPU rather than elasticity, a RunPod Pod can be a cleaner operational and cost model. For CPU-first agent backends that call external model APIs, renting any GPU may be unnecessary; [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/) explains that boundary.

## Sources

- [Modal pricing](https://modal.com/pricing) — checked July 25, 2026
- [Modal billing guide](https://modal.com/docs/guide/billing) — checked July 25, 2026
- [Modal GPU guide](https://modal.com/docs/guide/gpu) — checked July 25, 2026
- [Modal cold-start guide](https://modal.com/docs/guide/cold-start) — checked July 25, 2026
- [Modal scaling guide](https://modal.com/docs/guide/scale) — checked July 25, 2026
- [Modal timeouts guide](https://modal.com/docs/guide/timeouts) — checked July 25, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, refreshed July 23, 2026

*Signing up for something covered here? If your use case calls for a deliberately always-on RunPod Pod, using our affiliate link supports HostFleet's testing budget at no extra cost: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*

