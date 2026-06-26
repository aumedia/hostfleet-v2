---
title: "Best hosts for long-running agent workers (June 2026): where always-on costs and queue limits bite"
description: "Best hosts for long-running agent workers in 2026: a practical comparison of Railway, Render, Fly.io, Hetzner, and DigitalOcean for always-on queues, browser workers, and small agent backends."
pubDate: 2026-06-02
updatedDate: 2026-06-02
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes our recommendations. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This article is source-backed where possible and explicit about where workload-fit judgment enters the ranking.*

**Last updated:** June 2, 2026

# Best hosts for long-running agent workers (June 2026)

Best hosts for long-running agent workers is a narrower question than “best hosting for AI agents.” This is a mixed, mostly source-backed guide built from official provider pricing and docs pages plus HostFleet’s current AI-hosting notes. The sourced part is pricing, worker model, storage rules, and platform limits. The judgment part is whether those rules actually fit a worker that stays alive all day, polls a queue, runs browser tasks, or keeps processing jobs after the web request is long gone.

The distinction matters because a lot of AI agents are not static sites, not cron jobs, and not GPU inference services. They are:

- queue consumers
- webhook processors
- browser workers
- retry loops
- internal automations that stay warm because latency or state continuity matters

If your agent can wake up, do one job, and exit, a cron product is usually cheaper than an always-on worker. If you need local inference, this is the wrong lane; use [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) first. And if the agent lives inside an AI-generated app that is still half builder, half product, the closest companion read is [What breaks when AI-generated apps hit production](https://hostfleet.net/ai-generated-app-production-footguns/).

## The short answer

| What you actually need | Best fit | Real starting floor | Why it wins | Main catch |
|---|---|---:|---|---|
| Managed API + worker + cron for a small team | Railway Hobby | $5/month plus usage | Best small-stack ergonomics for mixing web services, workers, cron, and volumes | Usage-based bills punish sloppy idle architecture |
| One always-on managed queue worker | Render Background Worker | $7/month | Clean worker product with fixed starter pricing and simple mental model | Gets expensive once you add more services and data stores |
| Cheapest credible stateless always-on worker | Fly.io shared-cpu-1x | $3.19/month at 512 MB | Lowest floor I would take seriously for a continuous worker | Persistent local state is awkward and failure-prone |
| Cheapest self-managed Linux box | Hetzner Cloud CX22 / CX32 | EUR 3.79 to EUR 6.80/month | Huge resource-per-dollar advantage if you can own the ops | You are buying Linux responsibility, not a worker platform |
| Mainstream VPS with cleaner upgrade path | DigitalOcean Droplets | $6/month at 1 GB, $12 at 2 GB | Better docs, clearer plan ladder, easier move-to-dedicated-CPU story | More expensive than Hetzner for the same raw box |

## What changes when the worker is long-running

The moment a worker stays alive continuously, three things matter more than generic AI hosting roundups admit:

- Sleep behavior: a host designed for request/response or scheduled runs can be the wrong product for a process that should never exit.
- State placement: if the worker keeps queues, browser sessions, caches, or retry state locally, ephemeral disks and single-node volumes become real operational risks.
- Process shape: a worker is rarely alone forever. Sooner or later you add Redis, Postgres, a reverse proxy, cron, or a second consumer. That is where cheap pricing pages stop telling the whole truth.

That is why this article is not just a cheapest-host list. It is a fit list for workers that remain alive on purpose.

## 1. Railway is the best managed home for a small long-running worker stack

Railway is the strongest managed answer when your architecture looks like a real small application instead of one lonely process. Their pricing page says the Hobby plan is $5 per month with included usage, and the platform bills CPU, memory, disk, and egress usage on top of the plan fee. HostFleet’s June 2026 Railway note adds the practical rate picture: memory at $10/GB-month, CPU at $20/vCPU-month, volumes at $0.15/GB-month, and egress at $0.05/GB.

That model works well for:

- one API service plus one worker
- workers that need private networking to a database
- one or two scheduled jobs living beside the worker
- small teams that want one deploy surface rather than a VPS

Railway’s cron docs are useful here because they show the platform’s boundary clearly. A cron service is expected to run its task and exit. The shortest interval is 5 minutes. If a prior execution is still active when the next run is due, Railway skips the new run. That is exactly why Railway is better for combining cron jobs with long-running workers than for pretending the two are the same thing.

Why it ranks first: Railway is the cleanest small-team answer when you need more than one process but still want managed deployment, secrets, network boundaries, and service-level separation.

Why not use it blindly: usage-based app hosting is only cheap when the architecture stays tight. Idle worker sprawl, too many sidecars, or oversized memory reservations will erase the price advantage fast.

## 2. Render Background Workers is the simplest fixed-price worker product

Render’s docs define a background worker very plainly: it runs continuously, does not receive incoming network traffic, and usually polls a queue such as Redis-like key-value storage. That is an honest fit for a lot of agent systems.

Render’s current pricing page puts background workers on the same service ladder as private services:

- Starter: $7/month, 512 MB RAM, 0.5 CPU
- Standard: $25/month, 2 GB RAM, 1 CPU
- Pro: $85/month, 4 GB RAM, 2 CPU

Render’s appeal is not that it is the absolute cheapest. It is that the product boundary is obvious. You create a worker because you want a worker, not because you are trying to stretch a static or edge product into pretending it has one.

Good fit:

- a queue consumer using BullMQ, Celery, Sidekiq, Asynq, or similar
- media, report, or API-processing jobs
- teams that want fixed monthly instance sizing instead of minute-level usage math
- a worker that should always be alive and does not need public ingress

The catch is stack cost. A worker plus a queue plus a database is no longer a $7 story. Render is a clean worker host, but it stops looking especially budget-friendly once the surrounding stateful services pile up.

## 3. Fly.io is the cheapest credible always-on floor for stateless workers

Fly.io is still the sharpest cheap option if what you need is one always-on worker and you are comfortable with more operational edge. The current pricing docs list these shared-cpu-1x monthly equivalents:

- 256 MB: $1.94
- 512 MB: $3.19
- 1 GB: $5.70
- 2 GB: $10.70

That looks fantastic on paper, and for stateless workers it often is. The important caveats are also in Fly’s docs:

- all organizations need a credit card on file
- stopped Machines still bill for root file system storage
- the root file system is ephemeral
- persistent volumes are local to one Machine, tied to one server, and not automatically replicated

That last part matters a lot. If your long-running worker is basically a stateless process that talks to external APIs and a managed database, Fly is very strong. If your cheap worker plan quietly includes local queue state, a single-node database, or anything you would hate to lose on a hardware failure, the bargain story gets weaker quickly.

My practical rule:

- choose Fly.io for stateless or externally stateful workers where low always-on cost matters most
- do not choose Fly because you hope local disk will behave like a managed durable control plane

## 4. Hetzner Cloud is the cheapest honest box if you are willing to run the box

Hetzner belongs in this article because long-running workers are often just Linux processes plus a queue plus a database, and pure compute economics still matter. Hetzner’s official press material for the shared-vCPU CX line lists:

- CX22: 2 vCPU, 4 GB RAM, 40 GB disk at EUR 3.79/month
- CX32: 4 vCPU, 8 GB RAM, 80 GB disk at EUR 6.80/month

Their cloud docs are equally clear about the tradeoff: shared plans are best for variable usage and price-performance, while dedicated plans are for predictable high workloads, microservices, and larger databases.

That makes Hetzner the best answer when your priorities are:

- the lowest credible monthly compute bill
- Docker Compose or systemd over app-platform abstractions
- private networking, API control, and firewalling without platform lock-in
- one box that can run a worker, queue, and database if you keep the system small

It is not a managed worker host. You need to handle at least some combination of:

- deploy workflow
- queue setup
- process supervision
- backups
- monitoring
- restart policy
- operating system patching

That is the right trade if you are comfortable owning the machine. It is the wrong trade if what you actually want is Heroku for workers.

## 5. DigitalOcean Droplets is the cleanest mainstream VPS ladder

DigitalOcean is not the absolute cheapest raw compute here, but it remains one of the cleanest VPS answers because the plan ladder, CPU model, and upgrade path are unusually legible.

Current Basic Droplet monthly anchors are:

- 1 GB / 1 vCPU: $6
- 2 GB / 1 vCPU: $12
- 4 GB / 2 vCPU: $24
- 8 GB / 4 vCPU: $48

The pricing page also notes that Droplets now use per-second billing with a 60-second or $0.01 minimum. More important than the price table is the plan guidance in their docs:

- Basic shared CPU is for bursty workloads, small databases, microservices, dev/test, and similar workloads that can tolerate variable CPU
- dedicated CPU is the right move when production timing matters and variable performance is not acceptable
- CPU-Optimized plans are the better match for AI/ML, CI/CD, and other CPU-bound workloads

That maps cleanly to agent workers. A light external-API worker can absolutely live on a small Basic Droplet. A browser-heavy or latency-sensitive worker that is part of a revenue path should move to dedicated CPU earlier than bargain roundups usually admit.

### Why I am not putting App Platform above Droplets here

DigitalOcean App Platform is easier operationally, but the worker economics are weaker for this particular use case. The paid tier starts at $5/month for a fixed 1 vCPU / 512 MiB container, $10/month for 1 vCPU / 1 GiB, and a development database adds $7/month. That is reasonable for one component, but the budget story fades once you need a separate worker plus data services.

So if you want managed platform convenience at this scale, I would still choose Railway first. If you want DigitalOcean, I would usually start with Droplets for long-running workers.

## What I would skip

I would skip the following unless your worker is not really long-running:

- static and edge deployment products used as a fake background-worker platform
- cron products when the process should stay warm all day
- single-node local state on platforms whose own storage docs warn about locality or non-replication
- the tiniest promo VPS plan once you already know the worker will add browser automation, a queue, and a database

A lot of agent infrastructure pain is just buying the wrong product shape before the code is even deployed.

## FAQ

### What is the cheapest host for a long-running AI worker?

If the worker is basically stateless and always-on, Fly.io at 512 MB or 1 GB is the cheapest credible managed-ish floor in this sourced set. If you are happy to self-manage Linux, Hetzner Cloud is the cheaper raw box.

### Can a long-running worker live on a $5 host?

Yes, sometimes. A small worker that mostly calls external APIs can fit. A worker that adds browser automation, queues, a local database, and noisy retries usually cannot stay comfortable there for long.

### Should I choose a worker platform or a VPS?

Choose a worker platform when you care more about deploy flow, service boundaries, and managed operations. Choose a VPS when the lowest compute cost matters more than platform convenience and you are willing to own the machine.

### What if the worker also serves a user-facing API?

That usually pushes you toward Railway or a VPS setup faster, because the moment an API, a worker, and a database need to coexist, the hosting decision stops being about one background process and starts being about the whole system.

### What if the worker needs local inference?

Then this is not really a worker-hosting comparison anymore. It becomes a GPU-hosting question, and the right benchmark is [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## Final verdict

If I had to compress the market into one sentence, it would be this: the best host for a long-running agent worker depends less on AI branding and more on whether you want a managed multi-service platform, a cheap stateless worker, or one Linux box you control.

The practical order is:

1. Choose Railway if the worker is one part of a small managed stack.
2. Choose Render Background Workers if you want the cleanest fixed-price always-on worker product.
3. Choose Fly.io if you want the lowest credible always-on floor and can keep state elsewhere.
4. Choose Hetzner Cloud if cheapest compute matters more than managed ergonomics.
5. Choose DigitalOcean Droplets if you want the cleaner mainstream VPS ladder and an easier dedicated-CPU upgrade story.

That is the most defensible answer I can give to best hosts for long running agents without pretending all AI agents have the same shape.

## Sources

- Render pricing - https://render.com/pricing
- Render background workers docs - https://render.com/docs/background-workers
- Railway pricing - https://railway.com/pricing
- Railway cron jobs docs - https://docs.railway.com/cron-jobs
- Fly.io resource pricing - https://fly.io/docs/about/pricing/
- Fly.io volumes overview - https://fly.io/docs/volumes/overview/
- DigitalOcean Droplets pricing - https://www.digitalocean.com/pricing/droplets
- DigitalOcean choosing a Droplet plan - https://docs.digitalocean.com/products/droplets/concepts/choosing-a-plan/
- DigitalOcean App Platform pricing - https://www.digitalocean.com/pricing/app-platform
- Hetzner Cloud pricing and product docs - https://www.hetzner.com/cloud/pricing/
- Hetzner shared-vCPU CX plan launch details - https://www.hetzner.com/pressroom/new-cx-plans/
- Hetzner General Purpose cloud docs - https://www.hetzner.com/cloud/general-purpose
- HostFleet provider matrix - /opt/hostbot/data/ai-hosting/providers.csv
- HostFleet Railway source note - /opt/hostbot/data/ai-hosting/notes/2026-05-28-railway-pricing-limits.md
- HostFleet Fly.io source note - /opt/hostbot/data/ai-hosting/notes/2026-06-01-flyio-pricing-limits.md
