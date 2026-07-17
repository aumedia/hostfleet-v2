---
title: "Baseten vs Modal vs Replicate for one warm inference endpoint (July 2026): who makes you pay for readiness?"
description: "A July 2026 HostFleet comparison of Baseten, Modal, and Replicate for one warm inference endpoint, focused on 30-day warm-capacity cost floors, scale-to-zero tradeoffs, and where each platform shape really fits."
pubDate: 2026-07-17
updatedDate: 2026-07-17
category: ai-hosting
author: Alex Harmon
draft: false
---
**Last updated:** July 17, 2026

# Baseten vs Modal vs Replicate for one warm inference endpoint

*Source note: this is a mixed, mostly source-backed HostFleet comparison built from the providers' current pricing and deployment docs plus HostFleet's local provider notes. The sourced layer covers pricing units, scaling defaults, cold-start behavior, queueing, billing semantics, rate limits, and retention caveats. The estimate layer is narrow and explicit: 30-day warm-endpoint cost examples derived from the published GPU rates.*

If you are comparing **Baseten vs Modal vs Replicate** for a production endpoint, the real question is not which vendor can run inference. All three can. The real question is **what happens when the endpoint must stay ready instead of sleeping at zero**.

This piece stays narrow on purpose:

- about one or a few always-available inference endpoints
- not a benchmark shootout
- not a model-token pricing roundup
- not a generic serverless GPU comparison

If you need the broader market map first, start with [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). If your main question is still endpoint ownership rather than warm-cost math, pair this with [RunPod vs Modal vs Replicate for shipping a small inference API](https://hostfleet.net/runpod-vs-modal-vs-replicate-small-inference-api/). For the single-provider context, keep [Baseten for AI inference APIs and jobs](https://hostfleet.net/baseten-for-ai-inference-apis-and-jobs/), [Modal for AI inference APIs and jobs](https://hostfleet.net/modal-for-ai-inference-apis-and-jobs/), and [Replicate for AI inference APIs and jobs](https://hostfleet.net/replicate-for-ai-inference-apis-and-jobs/) beside this. If your workload may not need a dedicated GPU endpoint at all, [Cloudflare Workers AI vs self-hosted GPU](https://hostfleet.net/cloudflare-workers-ai-vs-self-hosted-gpu/) is the right contrast.

## The short answer

| What you actually need | Best fit | Honest reason |
|---|---|---|
| Cheapest continuously warm custom GPU endpoint | **Modal** | Its published GPU-second rates are the lightest of these three, though warm containers still become a real bill |
| Managed dedicated inference with the strongest platform posture | **Baseten** | It is the most opinionated dedicated-serving product here, but you pay for that posture |
| Lowest-friction path if the endpoint can stay prediction-shaped and tolerate shared abstractions | **Replicate public models** | Public-model billing hides setup and idle cost, but you lose direct control over a permanently warm service |
| Dedicated warm endpoint on Replicate | **Usually weak fit on cost** | The docs are clear that deployments bill setup, idle, and active time, which makes the warm floor rise fast |

My practical verdict is simple: **Modal wins the warm-floor math, Baseten wins if managed dedicated inference is the point, and Replicate only looks cheap while you stay in its shared or prediction-first product shape.**

## Product shape matters before the GPU line item

A shallow comparison misses the product shape difference:

- **Modal** is a Python application platform with GPUs attached. You can keep containers warm with `min_containers`, stretch idle life with `scaledown_window`, and ship a custom API without buying a more opinionated inference platform.
- **Baseten** is a managed dedicated inference platform. The docs are built around deployments, replica policy, and production posture rather than app-first developer ergonomics.
- **Replicate** is a model and prediction product first. Public models feel cheap because setup and idle time are free, but deployments flip into normal dedicated-infrastructure billing.

That difference is why one headline number never answers the buying question.

## Estimate: what one warm endpoint roughly costs for 30 days

These are **estimate examples**, not vendor quotes. Assumptions:

- 30-day month
- one continuously warm unit
- GPU price only
- no storage, egress, or extra platform charges
- Baseten from published per-minute rates
- Modal and Replicate from published per-second rates
- Replicate public-model pricing is excluded because it is a different product shape

| GPU example | Modal | Baseten | Replicate |
|---|---:|---:|---:|
| T4-class | about **$425/month** | about **$454/month** | about **$583/month** |
| A100 80 GB-class | about **$1,799/month** | about **$2,880/month** | about **$3,629/month** |

Those estimates come from the current published rates checked on **2026-07-17**:

- Modal T4 **$0.000164/s** and A100 80 GB **$0.000694/s**
- Baseten T4 **$0.01052/min** and A100 80 GB **$0.06667/min**
- Replicate T4 **$0.000225/s** and A100 80 GB **$0.001400/s**

The table is not saying the products are identical. It is saying that **once you force each platform into a warm dedicated-serving shape, the bill differences become visible very quickly.**

## What the docs say about sleeping and waking up

### Modal

Modal's docs say containers idle for up to **60 seconds** by default before shutdown. The scaling guide exposes the core warm-capacity knobs directly:

- `min_containers`
- `max_containers`
- `scaledown_window`

The same guide also states per-function limits of **2,000 pending inputs** and **25,000 total inputs**, with higher pending limits for spawned async jobs. In practice, Modal is friendly when you want to buy a little warmth without turning the whole service into a permanently on box.

### Baseten

Baseten's docs are explicit that the default autoscaling posture is conservative:

- `min_replica` defaults to **0**
- `max_replica` defaults to **1**
- the docs say that default `max_replica` of `1` effectively disables autoscaling
- the docs also recommend **at least 2 minimum replicas for production** if you want to avoid cold starts and add redundancy

Baseten's billing docs are also unusually clear:

- usage is **metered by the minute**
- a replica is billed for every minute it is **observed as up**
- **cold starts and model load are billed**
- **idle warm replicas are billed**
- scaled-to-zero idle time is not billed

That makes Baseten coherent, but not magically cheap. The platform gets expensive the moment production readiness means keeping replicas awake.

### Replicate

Replicate's billing docs split the product in two:

- for **public models**, you only pay for active processing time; setup and idle time are free
- for **private models and deployments**, you pay for **setup, idle, and active time**

That is the biggest reason Replicate feels cheap in demos and expensive when converted into a dedicated warm endpoint. The product was not originally optimized around your team owning a permanently warm custom-serving surface.

Replicate also carries two operational caveats that matter for production apps:

- default API rate limits are **600 prediction-create requests per minute** and **3000 requests per minute** for other endpoints
- API-created prediction inputs, outputs, files, and logs are deleted after **1 hour** by default

Those are not deal-breakers, but they are reminders that Replicate remains prediction-shaped even when you buy more control.

## Where each one actually wins

Choose **Modal** first if:

- your team wants a custom Python API
- you care about warm-cost efficiency more than platform polish theater
- you want fine control over prewarm behavior without buying a whole dedicated inference vendor posture

Choose **Baseten** first if:

- the product really needs a managed dedicated inference platform
- rollout flow, replica policy, and production inference posture are part of the value
- paying more than Modal is acceptable because the control plane is the point

Choose **Replicate** first if:

- public or official models already fit the use case
- prediction-style APIs and webhooks are acceptable
- you want to avoid paying for warm dedicated capacity for as long as possible

Skip **Replicate deployments** as the default answer if the whole goal is one cheap always-ready endpoint. The docs do not support that story.

## FAQ

### Which one is cheapest for a warm endpoint?

On current published GPU prices, **Modal**. That does not make it universally best. It just means the warm-floor math is friendlier.

### Which one is best for a serious managed inference service?

Usually **Baseten**. It is the most clearly dedicated-serving platform of the three.

### Why does Replicate often feel cheaper than this comparison suggests?

Because public-model billing is a different product shape. Once you move into deployments and hold capacity online, Replicate starts billing like dedicated infrastructure.

## Final verdict

If I had to compress the decision into one sentence, it would be this: **Modal is the best default when you need one warm custom endpoint at the lowest published floor, Baseten is the premium choice when managed dedicated inference is the feature you are buying, and Replicate is strongest when you can avoid a warm dedicated endpoint altogether.**

That is the honest July 17, 2026 answer to **Baseten vs Modal vs Replicate** for one warm inference endpoint.

## Sources

- Baseten pricing - `https://www.baseten.co/pricing/` - checked **2026-07-17**
- Baseten resources - `https://docs.baseten.co/deployment/resources` - checked **2026-07-17**
- Baseten autoscaling overview - `https://docs.baseten.co/deployment/autoscaling/overview` - checked **2026-07-17**
- Baseten request lifecycle - `https://docs.baseten.co/deployment/autoscaling/request-lifecycle` - checked **2026-07-17**
- Baseten billing and usage - `https://docs.baseten.co/organization/billing` - checked **2026-07-17**
- Modal pricing - `https://modal.com/pricing` - checked **2026-07-17**
- Modal scaling - `https://modal.com/docs/guide/scale` - checked **2026-07-17**
- Modal cold starts - `https://modal.com/docs/guide/cold-start` - checked **2026-07-17**
- Modal timeouts - `https://modal.com/docs/guide/timeouts` - checked **2026-07-17**
- Replicate pricing - `https://replicate.com/pricing` - checked **2026-07-17**
- Replicate billing - `https://replicate.com/docs/topics/billing` - checked **2026-07-17**
- Replicate rate limits - `https://replicate.com/docs/topics/predictions/rate-limits` - checked **2026-07-17**
- Replicate data retention - `https://replicate.com/docs/topics/predictions/data-retention` - checked **2026-07-17**
- Replicate create a deployment - `https://replicate.com/docs/topics/deployments/create-a-deployment` - checked **2026-07-17**
- Replicate monitor a deployment - `https://replicate.com/docs/topics/deployments/monitor-a-deployment` - checked **2026-07-17**
- HostFleet Baseten note - `/opt/hostbot/data/ai-hosting/notes/2026-07-16-baseten-pricing-limits.md`
- HostFleet Modal note - `/opt/hostbot/data/ai-hosting/notes/2026-06-11-modal-pricing-limits.md`
- HostFleet Replicate note - `/opt/hostbot/data/ai-hosting/notes/2026-06-22-replicate-pricing-limits.md`
- HostFleet provider matrix - `/opt/hostbot/data/ai-hosting/providers.csv`
