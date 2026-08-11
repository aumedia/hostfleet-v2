---
title: "Baseten pricing 2026: warm-replica costs explained"
description: "Baseten pricing explained: live per-minute GPU rates, 30-day warm-replica estimates, and when scale-to-zero really lowers the bill."
pubDate: 2026-07-26
updatedDate: 2026-07-26
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed pricing guide: rates and billing behavior come from Baseten's public pricing and documentation. The monthly figures are clearly labeled estimates, not quotes.*

**Pricing verified:** July 26, 2026

# Baseten pricing 2026: warm-replica costs explained

Baseten prices dedicated model deployments by the minute. That sounds like fine-grained serverless billing, but it does not mean a production endpoint costs only when it handles a request. Baseten bills every minute a replica is observed as up—including cold starts, model load, and an idle replica intentionally kept warm.

This is a source-backed infrastructure cost guide, not a model-token pricing roundup or a performance benchmark. It uses Baseten's live public resources and billing documentation checked on **July 26, 2026**. For the broader market first, see [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). For product fit, deployment workflow, and operational tradeoffs beyond the bill, see [Baseten for AI inference APIs and jobs](https://hostfleet.net/baseten-for-ai-inference-apis-and-jobs/).

## The short answer

| If you need… | Baseten cost shape | Practical reading |
|---|---|---|
| A staging endpoint or sporadic async job | Potentially efficient | With min replicas set to 0, idle time after scale-to-zero is not billed. |
| A public endpoint that must answer without a cold start | Deliberate warm-capacity spend | One or more replicas must remain up, and every observed minute is billed. |
| High availability through two warm replicas | A real monthly infrastructure floor | Double the single-replica estimate before traffic-driven scale-out. |
| The cheapest always-on GPU | Usually the wrong buying lens | Baseten sells managed dedicated inference, not raw GPU rental economics. |

The buying rule: **use Baseten's per-minute price for work that can sleep; use 720-hour math for capacity you deliberately keep ready.**

## Baseten's live instance prices

Baseten's resource reference publishes these representative one-GPU instance SKUs. Each price covers the listed vCPU, RAM, GPU, and VRAM for one replica; it is not a GPU-only component price. The table is drawn from HostFleet's current GPU pricing dataset and checked against Baseten's live resource page on **July 26, 2026**. Baseten bills per minute; the hourly column is a conversion of the per-minute rate times 60. Rates are USD per instance/replica and exclude any extra replicas created by autoscaling.

| Instance GPU | VRAM | Published instance rate | Equivalent per hour | 30-day, one warm replica |
|---|---:|---:|---:|---:|
| T4 | 16 GB | $0.01052/min | $0.63/hr | about $454 |
| L4 | 24 GB | $0.01414/min | $0.85/hr | about $611 |
| A10G | 24 GB | $0.02012/min | $1.21/hr | about $869 |
| A100 | 80 GB | $0.06667/min | $4.00/hr | about $2,880 |
| H100 | 80 GB | $0.10833/min | $6.50/hr | about $4,680 |
| B200 | 180 GB | $0.16633/min | $9.98/hr | about $7,185 |

**Estimate assumptions:** one replica observed as up continuously for **43,200 minutes** (720 hours in a 30-day month); published instance charges only; no extra replicas from traffic spikes. Formula: per-minute rate times 60 times 720. These are continuously warm-replica estimates, not a forecast for an endpoint that really scales to zero. Re-check [Baseten's resource reference](https://docs.baseten.co/deployment/resources) before committing a production deployment.

## The number most buyers miss: replica count

The table is a **one-replica** floor. Replica count changes the bill faster than small differences in GPU rate.

| Always-warm configuration | L4 instance-charge estimate | H100 instance-charge estimate |
|---|---:|---:|
| One replica for 720 hours | about $611/month | about $4,680/month |
| Two replicas for 720 hours | about $1,222/month | about $9,360/month |

Two replicas are not automatically wasteful. They may be the reasonable design choice for redundancy or more predictable latency. The point is to price that choice as infrastructure before calling the deployment serverless and cheap.

Baseten's autoscaling documentation says the minimum-replica setting controls the number of replicas kept running. Set it to zero and the deployment can scale down; set it to one or more and that capacity is intentionally held ready. The same docs describe production controls for maximum replicas, scale-down behavior, concurrency, and utilization. Those settings affect how many billable replicas the platform can create when traffic rises.

## What Baseten actually bills

Baseten's billing documentation is unusually direct: it meters usage **by the minute**, and for every minute a replica is observed as up, its instance-type price applies. That covers more than requests:

| Replica state | Billed? | Why it matters |
|---|---|---|
| Cold start and model load | Yes | The replica is already up before it is healthy enough to serve. |
| Idle warm replica (minimum replicas at least 1) | Yes | Readiness is capacity, even with no requests. |
| Active prediction | Yes | This is ordinary deployed compute use. |
| Scaled-to-zero idle time (minimum replicas 0, no traffic) | No | This is where scale-to-zero can lower the compute bill. |

That distinction resolves the apparent contradiction in Baseten's pricing language. A deployment can avoid idle compute costs when it has truly scaled to zero, yet a latency-sensitive endpoint can still have a substantial minimum monthly bill because its replicas must stay warm.

## How to estimate a real monthly Baseten bill

Start with two separate numbers instead of one blended guess:

    warm-capacity floor = per-minute rate × warm replicas × minutes kept up
    traffic-driven capacity = additional replica-minutes created by load
    monthly instance-charge estimate = warm-capacity floor + traffic-driven capacity

For a simple first pass, use 43,200 minutes for a 30-day always-warm replica. Then ask three operational questions:

1. **Can the endpoint tolerate a cold first request?** If yes, start with zero minimum replicas and measure the actual cold-start experience.
2. **Does the endpoint need redundancy or predictable latency?** If yes, budget at least two warm replicas before adding traffic-driven scale-out.
3. **How long should Baseten wait before scaling down?** A longer scale-down delay can avoid flapping after brief quiet periods, but it retains billable capacity longer.

A traffic-shape example makes the difference concrete. An L4 deployment held up for 100 total replica-hours in a month has roughly **$85** in L4 instance charges at the published $0.85/hour equivalent. An L4 kept warm for the full 720 hours is about **$611** before any extra replicas. Both figures can be correct; they describe different operating choices. Use the [GPU cloud cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) to pressure-test the same decision at 1%, 10%, and always-warm allocation before committing to a replica minimum.

## Scale-to-zero saves money, but it changes the request path

When a deployment is scaled to zero, Baseten's request-lifecycle documentation says a request can be parked while capacity starts. That removes the need for the client to treat every idle deployment as an immediate failure, but it does not make the first request fast. Baseten's cold-start documentation explains that model-weight loading is a major part of startup work; those startup minutes are also billed.

This makes the decision fairly clean:

- **Scale to zero:** good for staging, batch work, internal tools, and asynchronous jobs that can wait.
- **Keep replicas warm:** good for user-facing services where cold-start latency is unacceptable; budget the warm-replica floor honestly.
- **Use more replicas:** good when availability and concurrency need it; estimate the full replica count, then test under real traffic.

If the workload is mostly intermittent GPU execution rather than a managed dedicated model service, compare the same warm-capacity math with the broader [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). If you want a dedicated GPU container instead of a managed inference control plane, [RunPod pricing: Pods vs Serverless](https://hostfleet.net/runpod-pricing-guide-2026/) explains that different cost shape.

## Baseten pricing: the practical verdict

Baseten is not expensive because it bills by the minute; it becomes expensive when its deployment design needs replicas to remain up.

- The published L4 instance rate is about **$611/month** for one continuously warm replica, while an H100 instance is about **$4,680/month**.
- Scale-to-zero is meaningful only when the deployment actually spends time at zero replicas.
- Cold starts are billable, so a cheaper idle bill exchanges money for first-request latency.
- Production redundancy can double the warm-capacity floor before traffic causes any further scale-out.

Price the number of warm replicas first, then use Baseten's autoscaling controls to absorb real demand. That produces a more useful Baseten budget than treating a per-minute rate as request-only billing.

## Sources

- [Baseten pricing](https://www.baseten.co/pricing/) — checked July 26, 2026
- [Baseten resource reference](https://docs.baseten.co/deployment/resources) — checked July 26, 2026
- [Baseten billing and usage](https://docs.baseten.co/organization/billing) — checked July 26, 2026
- [Baseten autoscaling overview](https://docs.baseten.co/deployment/autoscaling/overview) — checked July 26, 2026
- [Baseten request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) — checked July 26, 2026
- [Baseten cold starts](https://docs.baseten.co/deployment/autoscaling/cold-starts) — checked July 26, 2026
- HostFleet GPU pricing dataset — /opt/hostbot-v2/src/data/gpu-pricing.json, refreshed July 23, 2026
