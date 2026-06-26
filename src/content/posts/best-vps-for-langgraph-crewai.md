---
title: "Best VPS setup for LangGraph or CrewAI (June 2026): what fits on 4 GB, 8 GB, and beyond"
description: "Best VPS for LangGraph or CrewAI in 2026: when 4 GB is enough, when 8 GB is the honest floor, and which single-box setups make sense for small self-hosted agent backends."
pubDate: 2026-06-13
updatedDate: 2026-06-13
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context.*

**Last updated:** June 13, 2026

# Best VPS setup for LangGraph or CrewAI

This is a source-backed sizing guide with an explicit estimate layer. The framework facts and VPS plan specs come from official docs and pricing pages. The fit calls are estimates based on the actual process shape you end up running on one Linux box: app container, logs, reverse proxy, retries, and sometimes Postgres or Redis.

The assumptions are narrow on purpose:

- you are calling external model APIs rather than serving local GPU models
- you want one self-hosted VPS, not a managed agent platform
- you are sizing for a small product, internal tool, or side project backend
- you care more about an honest starting point than about theoretical minimums

If the generated app still needs a home, start with [Where to deploy your Lovable, Bolt, or v0 app](https://hostfleet.net/where-to-deploy-lovable-bolt-v0-apps/). If the real workload is local inference, use [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) instead. If the fragile part is the generated code rather than the server size, read [What breaks when AI-generated apps hit production](https://hostfleet.net/ai-generated-app-production-footguns/).

## The short answer

| What you are actually running | Best starting point | Why |
|---|---|---|
| One light CrewAI Flow that mostly calls external APIs | **1 vCPU / 4 GB can work** | CrewAI can start fairly light when the app is mostly one process with little local state |
| A real small CrewAI app with API, worker, retries, and persistence | **2 vCPU / 8 GB / 100 GB** | This is the first tier that stops feeling cramped once the app becomes a small system instead of one clean demo |
| LangGraph standalone on one machine | **Start at 2 vCPU / 8 GB** | LangGraph's standalone docs explicitly call for Postgres and Redis as backing services |
| Browser-heavy tools, parallel jobs, or latency-sensitive user flows | **Dedicated CPU or a larger box** | Shared CPU jitter is a bad place to debug agent behavior |

If you want one sentence: **CrewAI can start smaller, but LangGraph's documented standalone footprint makes 8 GB the honest default for most single-box deployments.**

## Why LangGraph usually starts bigger

LangGraph's current standalone-server docs are unusually clear about what self-hosting actually means. The server is production-ready, but you manage the data plane yourself, including the required backing services. The docs call out:

- REDIS_URI for background-run streaming and pub-sub
- DATABASE_URI for Postgres
- Docker-based packaging through the LangGraph CLI
- Kubernetes as the recommended option for production-grade deployments
- Docker as the better fit for development or small-scale workloads
- a warning not to run standalone servers on scale-to-zero serverless infrastructure

That is the important sizing point. Even if your traffic is still modest, the documented standalone shape is not just one Python process on Ubuntu. It is usually some combination of:

- the LangGraph app container
- Postgres
- Redis
- Docker overhead
- a reverse proxy
- logs, restarts, and backup chores

That is why I do not think 4 GB is the honest starting recommendation for LangGraph on one VPS. You might get it to boot. That is not the same as giving yourself enough headroom for background runs, schema changes, retries, and the first bad deploy.

## Why CrewAI can start smaller

CrewAI's docs push a different architecture story. The current production-architecture guide recommends a Flow-first design with explicit state, control flow, and observability. The memory docs also show that CrewAI's unified memory can live inside a Flow, Crew, Agent, or even a standalone script instead of forcing you into a separate platform control plane from day one.

That makes CrewAI more forgiving when the real app looks like this:

- one API or webhook entrypoint
- one Flow that coordinates a small number of steps
- external model APIs
- little local persistence beyond files or a small database
- low concurrency

In that shape, **4 GB is workable**. The mistake is pretending that the first workable size stays workable after the app picks up more of the usual baggage:

- browser automation
- vector storage
- multiple workers
- local Postgres or Redis
- tracing and monitoring
- concurrent jobs instead of one sequential run

Once that happens, CrewAI and LangGraph stop feeling far apart at the VPS layer. Both become small multi-process systems, and the cheap-box fantasy ends.

## The VPS sizes I would actually use

### 1 vCPU / 4 GB

This is the smallest box I would treat seriously for a real self-hosted agent backend, and only for the lighter CrewAI end of the market.

Hostinger's current VPS page lists **KVM 1** at **1 vCPU, 4 GB RAM, 50 GB NVMe** for **$6.49/month promo** with **$11.99/month renewal** on the current term. That is inexpensive enough to be tempting, and it is fine for:

- one light CrewAI Flow app
- internal tools
- low-concurrency webhook processors
- dev, staging, or proof-of-concept work

It is the wrong default for:

- LangGraph standalone with local Postgres and Redis
- browser-heavy agents
- multiple always-on workers
- anything that already looks like a small platform

### 2 vCPU / 8 GB

This is the tier where the advice becomes honest.

Hostinger's **KVM 2** is currently **2 vCPU, 8 GB RAM, 100 GB NVMe** at **$8.99/month promo** with **$14.99/month renewal**. This is the first size where I would comfortably host:

- LangGraph standalone on one machine
- a CrewAI app with an API process and a worker
- local Postgres and Redis for a modest internal system
- basic observability, cron, and backup tooling without immediate RAM anxiety

If you are trying to decide between squeezing into 4 GB and starting at 8 GB, the cleaner answer is simple: **buy the 8 GB box first if the project is meant to survive contact with real users.**

### 4 vCPU / 16 GB

This is the first comfortable single-box tier for a small team.

Hostinger's **KVM 4** currently gives **4 vCPU, 16 GB RAM, 200 GB NVMe** at **$12.99/month promo** with **$28.99/month renewal**. Move here when you expect any of the following:

- browser tools or scraping workers
- heavier concurrency
- a local vector index
- multiple long-running services
- enough deploy churn that you want margin instead of just enough RAM for clean demos

It is still not high availability. It is just the point where one VPS stops feeling instantly cramped.

## Shared CPU versus dedicated CPU

DigitalOcean's plan docs explain the tradeoff cleanly. **Basic** Droplets use shared CPU and are meant for bursty workloads that can tolerate variable CPU access. **General Purpose** and **CPU-Optimized** Droplets give dedicated CPU for more predictable performance.

That maps cleanly to agent backends:

- choose **shared CPU** when the workload is small, bursty, or still in dev and staging
- choose **dedicated CPU** when latency matters, concurrency rises, or noisy-neighbor behavior becomes the thing you are debugging

DigitalOcean's current shared-CPU anchors are also useful as a reality check:

- **1 GB / 1 vCPU** at **$6/month**
- **2 GB / 1 vCPU** at **$12/month**
- **4 GB / 2 vCPU** at **$24/month**
- **8 GB / 4 vCPU** at **$48/month**

That pricing is much easier to explain than many app platforms, but it also shows why budget buyers gravitate toward Hostinger for single-box agent backends. DigitalOcean becomes attractive when you value its cleaner upgrade path and clearer dedicated-CPU ladder more than the cheapest possible monthly entry point.

## The setups I would actually recommend

### Cheapest honest CrewAI setup

- Ubuntu 22.04 or 24.04
- Docker and Compose
- one CrewAI Flow app
- external model APIs
- no local vector database unless you already know why you need one

Use **4 GB** only when cost is the first constraint and the process graph is still simple.

### Default LangGraph or serious CrewAI starter

- 2 vCPU
- 8 GB RAM
- 100 GB storage
- Docker Compose
- app container plus Postgres plus Redis
- Caddy or Nginx in front

This is the setup I would recommend to most solo builders and small teams who insist on one VPS.

### Comfortable small-platform setup

- 4 vCPU
- 16 GB RAM
- 200 GB storage or more
- app, worker, Postgres, Redis, and one heavier supporting service

This is where self-hosting starts to feel intentional instead of like a memory-budget stunt.

## FAQ

### Can LangGraph run on a 4 GB VPS?

For experiments, yes. For the documented standalone shape with local Postgres and Redis, **4 GB is below where I would want to start** for a real deployment.

### Can CrewAI run on a 4 GB VPS?

Yes. A light Flow that mostly calls external APIs can fit on 4 GB. It stops being comfortable once you add persistence, browser tools, multiple workers, or heavier local services.

### What is the best cheap VPS for LangGraph or CrewAI?

On current published pricing, **Hostinger KVM 2** is the strongest cheap answer in this source set because it gives you **2 vCPU and 8 GB RAM** at a price where many mainstream clouds still feel undersized.

### When should I pay for dedicated CPU?

Pay for it when user-facing latency matters, when the system runs several concurrent jobs, or when browser work and retries are making shared CPU jitter harder to tolerate than the extra monthly bill.

## Final verdict

The cleanest answer is not a framework fanboy answer. It is a process-footprint answer.

- **CrewAI** can start on 4 GB if the app is still light and mostly orchestrates external APIs.
- **LangGraph** should usually start at 8 GB on one VPS because its documented standalone shape already assumes more supporting services.
- **16 GB** is where the setup starts to feel comfortable once browser jobs, vector storage, heavier concurrency, or multiple long-running processes show up.

That is the most defensible answer I can give to **best VPS for LangGraph CrewAI** without pretending that booting once on a promo plan is the same thing as being production-ready.

## Sources

- LangGraph standalone servers docs - https://docs.langchain.com/langsmith/deploy-standalone-server
- CrewAI production architecture - https://docs.crewai.com/en/concepts/production-architecture
- CrewAI memory - https://docs.crewai.com/en/concepts/memory
- CrewAI quickstart - https://docs.crewai.com/en/quickstart
- Hostinger VPS pricing - https://www.hostinger.com/vps-hosting
- DigitalOcean Droplet pricing - https://www.digitalocean.com/pricing/droplets
- DigitalOcean choosing a plan - https://docs.digitalocean.com/products/droplets/concepts/choosing-a-plan/
- HostFleet provider list - /opt/hostbot/data/ai-hosting/providers.csv
