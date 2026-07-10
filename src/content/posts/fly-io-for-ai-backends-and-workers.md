---
title: "Fly.io for AI backends and workers (July 2026): where the cheap Machine fits and where volumes bite"
description: "A July 2026 HostFleet guide to Fly.io for AI backends and workers, focused on the real floor for always-on CPU services, where autostop actually helps, and why local volumes are the platform's sharp edge."
pubDate: 2026-07-05
updatedDate: 2026-07-10
category: deploy-ai-apps
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a mostly source-backed deployment guide with a narrow estimate layer. The sourced layer is Fly.io's current pricing, billing, CPU, scheduling, autostop, and volume documentation plus HostFleet's provider notes. The estimate layer is where those product facts turn into practical sizing and workload-fit judgment for small AI backends.*

**Last updated:** July 10, 2026

# Fly.io for AI backends and workers

If you are considering **Fly.io for AI hosting**, the honest answer is that Fly is strongest when the job is a small always-on CPU service, not when you want a beginner-proof platform or a carefree stateful stack.

This is a **mostly source-backed** HostFleet deployment guide for Fly.io in the AI backend lane: bots, agent controllers, webhook receivers, retrieval glue, background workers, and small internal APIs. It is not a GPU-inference guide, and it is not pretending Fly is a magical one-click home for every agent stack. Fly's own current pricing docs now treat GPU-enabled Machines as deprecated, so the practical story here is CPU infrastructure, not local model serving.

The assumptions for this guide are simple:

- the workload is mostly CPU orchestration, not local GPU inference
- the service may be an API, a queue worker, a bot, or a small multi-process backend
- the team wants a low monthly floor and tighter control than a fully managed app platform
- the team is comfortable owning a little more infrastructure sharpness in exchange for lower always-on cost

If you need the broader platform comparison first, start with [Railway vs Fly.io vs Render for AI workflow backends](https://hostfleet.net/railway-vs-fly-io-vs-render-for-ai-workflow-backends/). If your main concern is always-on workers rather than one specific platform, read [Best hosts for long-running agent workers](https://hostfleet.net/best-hosts-for-long-running-agent-workers/). If you are actually shopping for GPU inference, the right companion is [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/). And if the workload is really an always-on chat bot, the adjacent practical guide is [Where to host an always-on AI Telegram or Discord bot](https://hostfleet.net/where-to-host-ai-telegram-discord-bots/).

## The short answer

| What you actually need | Best fit on Fly | Real floor | Why it fits | Main catch |
|---|---|---:|---|---|
| Thin always-on API or worker | **shared-cpu-1x 512 MB** | **$3.32/month plus rootfs** | One of the cheapest honest always-on process floors in this category | Too little room for a sloppy stack |
| Safer default for a real small AI backend | **shared-cpu-1x 1 GB** | **$5.92/month plus rootfs** | More realistic headroom for SDKs, logs, retries, and queue clients | Still a shared CPU, not a performance box |
| Public API with spiky traffic and idle gaps | **HTTP service with autostop/autostart** | **Idle mostly drops to rootfs billing** | Fly Proxy can stop and start Machines around request traffic | This only helps request-driven services |
| Stateful prototype or internal tool | **One Machine plus one volume** | **Machine cost plus $0.15/GB-month volume** | Cheap way to keep local state for dev or low-stakes tools | Volumes are local, single-host, and not replicated for you |
| Durable production state | **Usually externalize state or pick another platform first** | **Not a simple single-box number** | Avoids the local-volume sharp edges Fly leaves to the operator | Less self-contained than a one-box build |

My practical verdict is simple: **Fly is one of the best places to run a cheap always-on AI worker or small regional API, but it is much less attractive when you need first-class cron semantics, carefree durable state, or beginner-friendly platform ergonomics.**

## What Fly is actually good at

Fly is easy to misread because the landing-page price looks like a tiny VPS and the product vocabulary sounds like a platform. In practice, it is best understood as a low-floor Machines platform with good region control and a lot of operator freedom.

That makes it strong for:

- always-on workers that should just stay alive
- small HTTP APIs close to users or data
- bot backends and queue consumers that do not need a managed control plane around them
- teams that want private networking and Machine-level control without paying Render- or Railway-style service floors for each process

It is weaker for:

- teams that want the clearest beginner path
- workloads that quietly depend on durable local state
- CPU-heavy jobs on the cheapest shared tiers
- buyers who really need a first-class cron product more than a flexible Machines substrate

That distinction matters because Fly is not bad at these other jobs. It is just sharper. If the team wants platform convenience, that sharpness becomes friction instead of leverage.

## The pricing story is cleaner than most app platforms, but it is not a flat plan

Fly's current pricing page says the company now charges new customers on a usage basis rather than fixed plans. The docs explicitly say Fly no longer offers plans to new customers, and that billing is based on provisioned resources over time.

In Fly's current Amsterdam pricing table, the important current numbers are still unusually clear:

- shared-cpu-1x 256 MB: **$2.02/month**
- shared-cpu-1x 512 MB: **$3.32/month**
- shared-cpu-1x 1 GB: **$5.92/month**
- shared-cpu-1x 2 GB: **$11.11/month**
- persistent volumes: **$0.15/GB-month**
- North America and Europe public-internet egress under granular pricing: **$0.02/GB**
- North America and Europe private cross-region transfer under granular pricing: **$0.006/GB**

That is the part people like, and fairly so. For one small always-on process, Fly can still undercut the fixed monthly floor of many app platforms.

The part buyers miss is what still bills when a service is not actively doing useful work. Fly's billing docs say **stopped and suspended Machines still bill based on root file system usage at $0.15 per GB per month**. So the idle bill can fall a lot, but it does not become magical zero. That matters if you keep lots of stopped Machines around or assume scale-to-zero means literally no residual cost.

This is why the honest Fly pitch is not “free when idle.” It is “cheap when lightly provisioned, and cheaper still when request-driven services can stop.” That is still a good pitch. It is just not the same one.

## The cheap Machine is real, but 256 MB is mostly a trap for AI-adjacent backends

This is where the estimate layer matters most.

Fly's CPU docs are unusually candid: shared CPUs and performance CPUs run on the same hardware, but shared CPUs only get a small baseline quota and can be throttled when they exceed it. The docs show a shared vCPU baseline quota of **5 ms out of every 80 ms period**, or **6.25%**, while a performance CPU gets the full period.

That technical detail matters because many AI-adjacent services are not actually compute-free even when they are “just orchestration.” A small backend may still be doing:

- JSON transformations on large payloads
- embeddings batching or reranking calls around upstream APIs
- document parsing and chunking
- browser control coordination
- queue polling and retry bookkeeping
- multiple SDK clients plus tracing and logging overhead

So here is the honest practical sizing guidance, and it is estimate-based rather than lab-measured:

- **256 MB** is fine for very thin webhooks, toy services, or deliberately tiny internal helpers
- **512 MB** is the first size I would recommend with a straight face for a thin always-on worker or API
- **1 GB** is the safer default for a real small AI backend that has more than one moving part
- if the work is meaningfully CPU-bound rather than mostly I/O-bound, you should think about performance CPUs or a different platform shape instead of pretending the cheapest shared tier will stay pleasant

This is the same pattern small teams keep rediscovering the hard way: the posted entry price is real, but the cheapest credible production shape is rarely the absolute first number on the table.

## Autostop helps request-driven APIs, not background-worker lifecycle

This is the biggest conceptual mistake buyers make on Fly.

Fly's autostop and autostart docs are built around **Fly Proxy** managing Machines for services that receive traffic. If you set auto-stop to stop or suspend, Fly Proxy can reduce idle Machines when traffic drops, and the docs say min_machines_running only maintains the specified floor in the **primary region**. That is useful, but it is not a universal process manager.

The Machines API guide is even more explicit about the boundary. If a Machine has **no services config**, the Fly Proxy does not manage it at all. It will not auto-stop or auto-start; it just runs until you stop it via the API or it exits on its own. The guide says this is the right setup for **cron-style jobs, queue workers, and anything that does not accept inbound connections**.

That creates a very practical split:

- public APIs can benefit from autostop/autostart
- long-running workers usually need their own lifecycle model
- a Machine that receives a request, kicks off background work, and returns too early can be auto-stopped while that background work is still happening

Fly's own guide calls that out directly as a common gotcha.

For AI backends, this matters a lot. Many small agent systems are mixed-shape deployments:

- one public API receives a webhook or task
- one worker keeps polling or processing after the response is already sent
- one scheduled or one-off job does cleanup, indexing, or ingestion

Fly can host all of that, but not with one simplistic “turn on autostop and forget it” mental model. The web tier and the worker tier usually deserve different process groups and different lifecycle settings.

## Volumes are Fly's real sharp edge

If you remember only one caution from this article, make it this one: **Fly volumes are local storage attached to one Machine on one server in one region.**

Fly's docs are very plain here:

- the root file system is ephemeral and should only hold rebuildable runtime data
- volumes are local persistent storage for Fly Machines
- a volume exists on one server in a single region and is **not network storage**
- a volume can attach to only one Machine, and a Machine can mount only one volume at a time
- Fly does **not** automatically replicate data between volumes
- Fly recommends provisioning **at least two volumes per app** for resiliency
- daily snapshots exist, but the docs say they should not be your primary backup method

This is the part of Fly that separates a disciplined operator from a hopeful buyer.

A single Machine plus a single volume can be perfectly reasonable for:

- development environments
- staging
- internal tools that can tolerate downtime
- small experimental SQLite-like state with deliberate backup habits

It is a much shakier fit for:

- a naïve single-node database you expect to feel managed
- production state you have not designed to replicate
- teams that hear “persistent volume” and assume cloud-block-storage semantics with comfortable abstraction layers

Fly even warns that if the NVMe drive hosting your volume fails, that app instance goes down, and if you only had one copy of the data there, the data is gone. That is the most important Fly storage sentence in the whole platform.

My practical read is straightforward: **keep important state external unless you intentionally want to own local-volume architecture.** Fly volumes are powerful, but they are not forgiving.

## Scheduling on Fly is flexible, not beginner-simple

Fly does have answers for scheduled work. It just does not give you the same neat product boundary Render gives you with cron jobs.

The current Fly scheduling docs point to several patterns:

- **Cron Manager**, a small Fly app that watches a schedules file and spins up one-off Machines for each job
- **Supercronic**, for teams that want cron inside their own container setup
- **scheduled Machines** and Machines-API driven patterns for more direct lifecycle control

Cron Manager is the clearest example of the Fly philosophy. Fly's docs describe it as a separate Fly app that stays online, watches a schedules file, boots a one-off Machine when a job is due, and then tears that Machine down again afterward.

That is powerful. It is also more parts than “create cron service.”

So the honest comparison is this:

- Fly is stronger when you want Machine-level control and do not mind composing the scheduling pattern
- Render is stronger when you want first-class cron semantics out of the box
- Railway is stronger when you want a more opinionated multi-service application model

That does not make Fly the wrong answer for scheduled work. It just means Fly rewards operators who enjoy assembling the shape more than buyers who want the hosting product to decide the shape for them.

## When Fly wins

Fly is a strong choice when most of the following are true:

- the core need is one or two always-on CPU processes
- you care about a low monthly floor more than managed-platform polish
- your state can live elsewhere, or the state is low-stakes enough that a local-volume design is acceptable
- the team is comfortable thinking about process groups, Machine lifecycle, and region placement
- the workload is more I/O-bound than CPU-bound

This is why Fly is such a good fit for certain HostFleet-style workloads:

- queue consumers
- ingestion workers
- lightweight orchestration APIs
- MCP-style shared tools that need a normal server rather than an edge function
- chat-bot backends that should stay up cheaply

For those shapes, Fly often feels refreshingly direct.

## When I would not choose Fly first

I would look elsewhere first if any of these are true:

- you want the easiest managed home for a multi-service app with worker, cron, and database attached
- you want a beginner-friendly answer for scheduled jobs
- the service is meaningfully CPU-heavy on a continuous basis
- the important state lives on the same box and the team does not want to design around volume-locality and replication
- you actually need GPU inference hosting rather than CPU orchestration

That is why the cleanest adjacent comparison on HostFleet is still [Railway vs Fly.io vs Render for AI workflow backends](https://hostfleet.net/railway-vs-fly-io-vs-render-for-ai-workflow-backends/). Fly wins specific shapes very well. It is just not the default answer for every shape.

## FAQ

### Is Fly cheaper than Railway or Render for AI workers?

For **one thin always-on process**, often yes. That is Fly's clearest advantage. The gap narrows once you add more processes, more state, or more operator time.

### Can I run a worker on Fly without a public port?

Yes. Fly's Machines API guide explicitly says Machines without services are the right setup for queue workers, cron-style jobs, and anything that does not accept inbound connections. Just do not expect Fly Proxy autostop/autostart to manage that worker for you.

### Should I run my database on a Fly volume?

For dev, staging, or deliberate low-stakes setups, maybe. For important production state, only if you actually understand Fly's local-volume model, redundancy requirements, backup limits, and replication burden.

### What size should a small AI backend start on?

My estimate-based guidance is simple: **512 MB** for a deliberately thin service, **1 GB** for a safer real small backend, and a different shape entirely if the workload is continuously CPU-heavy.

## Final verdict

If I had to compress Fly.io into one sentence for AI teams, it would be this: **Fly is excellent cheap infrastructure for small always-on CPU backends, and a worse fit the moment you expect the platform to hide lifecycle or storage complexity from you.**

The practical order is:

1. Choose Fly for cheap always-on APIs, workers, bots, and regional CPU services.
2. Start at **512 MB** only when the service is genuinely thin.
3. Treat **1 GB shared-cpu-1x** as the safer default for a real small backend.
4. Use autostop for public request-driven services, not as a universal background-job answer.
5. Avoid local volumes for important state unless you intentionally want to own the replication and failure story.

That is the honest way to use **Fly.io for AI hosting** in July 2026 without overselling the cheap entry price or pretending the platform's storage and lifecycle tradeoffs do not exist.
