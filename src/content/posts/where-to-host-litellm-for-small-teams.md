---
title: "Where to host LiteLLM for small teams (July 2026): managed proxy vs one small VPS"
description: "A July 2026 HostFleet deployment guide to hosting LiteLLM for small teams, including when to skip the proxy, when Railway is the cleanest managed home, and when a small VPS is the better fit."
pubDate: 2026-07-03
updatedDate: 2026-07-10
category: deploy-ai-apps
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a mostly source-backed deployment guide with a narrow estimate layer. The sourced layer is LiteLLM's current proxy deployment docs plus current host pricing and operational docs. The estimate layer is workload fit: which host shape stays simple for a small team once the proxy, database, and uptime reality are on the table.*

**Last updated:** July 10, 2026

# Where to host LiteLLM for small teams

If you are asking **where to host LiteLLM for small teams**, the first useful answer is that some teams should not host the LiteLLM proxy at all.

LiteLLM's own docs are explicit that you can use it either as a **Proxy Server** or as a **Python SDK**. If you have one application, one codebase, and no real need for shared budgets, virtual keys, or centralized routing, embedding the SDK into the app is usually simpler than creating another always-on service just because the word "gateway" sounds enterprise-ready.

This article is about the other case: you do want the proxy. That usually means you want one shared OpenAI-compatible endpoint for multiple apps, teams, or agents, with centralized provider routing, spend controls, and key management.

This is a **mostly source-backed** deployment guide built from current LiteLLM docs and current host docs for Railway, Fly.io, Hostinger, and Hetzner. The estimate layer is intentionally narrow and stated plainly: it covers which hosting shape is the cleanest operational fit once the raw product facts are known.

If the gateway is part of a wider agent stack, keep [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/) open beside this. If your team is really building remote tool backends rather than an LLM gateway, the closer companion is [Where to host MCP servers for small teams](https://hostfleet.net/where-to-host-mcp-servers-for-small-teams/). And if you already know you want to own one VPS and self-manage the control plane, [Coolify on a VPS for AI app hosting](https://hostfleet.net/coolify-on-a-vps-for-ai-app-hosting/) is the operational sibling read.

## The short answer

| What you actually need | Best fit | Real floor | Why it wins | Main catch |
|---|---|---:|---|---|
| One app using LiteLLM internally | **Do not host the proxy** | **$0 extra** | The SDK removes an unnecessary always-on service | You lose the shared gateway layer |
| Default managed home for one team-shared LiteLLM proxy | **Railway Hobby + Postgres** | **$5/month base plus usage** | Easiest path for one always-on container, env vars, logs, health checks, and a database | Usage-based bills and static egress IPs are a Pro-only story |
| Friendliest fixed-price self-host lane | **Hostinger KVM 2** | **$8.99/month promo** | 8 GB RAM, dedicated IP, and LiteLLM already exists in Hostinger's Docker Catalog | Prepaid VPS ownership and destructive region moves |
| Cheapest DIY cloud baseline if you want plain Linux | **Hetzner Cloud + IPv4** | **€5.49/month plus €0.50 for IPv4** | Clean raw cloud economics if you are comfortable owning the box | Public IPv4 is extra and the operational burden is yours |
| Lowest credible always-on process floor if the proxy stays stateless | **Fly.io shared-cpu-1x 1 GB** | **$5.92/month in Fly's Amsterdam pricing table** | Cheap way to keep one small process up with external state | Local volumes are the sharp edge, not the CPU price |

My practical verdict is simple: **most small teams that truly need a shared LiteLLM gateway should start on Railway, self-host on Hostinger or Hetzner only when they intentionally want Linux ownership, and avoid pretending the proxy itself belongs on an edge or serverless runtime.**

## First decision: do you need the proxy, or just LiteLLM in your app?

This is the most important decision in the whole article.

LiteLLM is not only a gateway product. The docs frame it as two usable shapes:

- **Proxy Server** for a shared OpenAI-compatible endpoint
- **Python SDK** for direct in-app usage

That means a lot of teams should stop before they create more infrastructure.

If you have:

- one internal app
- one deployment
- one team that already owns the application code
- no need for virtual keys, budgets, or centralized model routing across multiple clients

then the SDK path is usually the better answer.

Host the proxy only when the proxy is actually doing gateway work:

- multiple apps or agents call it
- you want shared routing or fallback behavior
- you need virtual keys and budget controls
- you want one audited endpoint between teams and model providers
- you want usage tracking outside any one application

If that list sounds familiar, then yes, you are in hosting territory.

## Why LiteLLM proxy hosting becomes real infrastructure faster than it looks

The hosted LiteLLM proxy is not a static site or a toy webhook. LiteLLM's own deployment docs tell you what the product expects:

- Docker and Kubernetes are first-class deployment paths
- the production docs talk about **Uvicorn**, **Gunicorn**, and **Granian**
- the proxy exposes `/health`, `/health/readiness`, and `/health/liveliness`
- virtual keys require a **PostgreSQL** database
- multi-instance load balancing and shared rpm/tpm tracking use **Redis**

That is the architecture signal to take seriously.

If you only run pass-through routing for one app, the proxy can stay fairly light. But as soon as you want the features many teams actually care about, LiteLLM stops being "just one container":

- **Virtual Keys** require Postgres
- the DB stores keys, teams, users, budgets, and per-request usage tracking
- Redis enters the picture when you want multi-instance shared rate-limit state
- the production docs recommend worker recycling and real readiness checks

That is why the default answer is not "throw it on the cheapest 256 MB box you can find." The gateway usually becomes one small control-plane service, not one disposable demo process.

## Railway is the best default managed home for one team-shared LiteLLM proxy

Railway is the best default recommendation here because the deployment shape matches LiteLLM unusually well.

Current public Railway pricing still says:

- **Hobby** costs **$5/month**
- that Hobby fee includes **$5 of resource usage credit**
- resource pricing is **$10/GB/month RAM**, **$20/vCPU/month CPU**, and **$0.15/GB/month volume storage**

That matters because a small LiteLLM setup usually looks like:

- one always-on proxy service
- one Postgres service if you use virtual keys and spend tracking
- optional Redis only if you truly need multi-instance shared routing state

Railway is good at exactly that shape:

- one long-running web service
- one attached Postgres
- clean secret management
- easy logs
- health checks and redeploys without building your own process manager story from scratch

The operational fit is better than the headline price suggests. LiteLLM's health endpoints and long-running process model map naturally onto a normal app host. Railway gives you the least-friction way to deploy that shape without instantly becoming your own VPS admin.

### Why Railway wins for most small teams

It wins because the proxy is usually the beginning of platform work, not the end of it.

A small team that adopts LiteLLM often adds at least one more requirement quickly:

- a shared database for keys and usage
- a second internal service that calls the proxy
- logs and restart behavior somebody can inspect
- an auth or network policy conversation with another team

Railway handles those adjacent needs without making the team commit to full Linux ownership on day one.

### The catch: usage pricing and outbound IP policy

Railway is not a fixed-price VPS. The base is clear, but the bill grows with always-on resources and attached services.

There is also one specific gotcha that matters for enterprise-flavored LiteLLM setups: Railway's **Static Outbound IPs** are a **Pro-plan** feature. If your downstream provider, private database, or corporate firewall requires egress allowlisting, that is not a Hobby-story convenience.

So the honest recommendation is:

- choose Railway when the team wants the easiest managed deployment path
- stay aware that a "small proxy" can become a multi-service usage bill
- upgrade expectations quickly if outbound IP allowlisting becomes a requirement

## Hostinger KVM 2 is the friendliest fixed-price self-host lane

If the team already knows it wants a VPS it owns, **Hostinger KVM 2** is the most practical fixed-price recommendation in this source set.

Hostinger's current VPS page still lists:

- **KVM 1** at **$6.49/month**
- **KVM 2** at **$8.99/month**
- **KVM 4** at **$12.99/month**
- **KVM 8** at **$25.99/month**

And the current plan page describes KVM 2 as:

- **2 vCPU**
- **8 GB RAM**
- **100 GB NVMe SSD**

That is a much more comfortable small-team LiteLLM box than the ultra-cheap floor options people reach for by reflex.

Hostinger also has one very relevant advantage for this exact workload: its VPS Docker Catalog currently includes **LiteLLM** as a listed application. That does not make Hostinger a managed LiteLLM platform, but it does reduce the bootstrapping friction for teams that want a self-hosted gateway without starting from a blank Ubuntu prompt.

Hostinger's support docs also say:

- all VPS plans include a **dedicated IP address**
- moving a VPS to another location requires a **reinstall**
- reinstalling into a new location **permanently deletes existing data, including backups and snapshots**

That is a clean illustration of the Hostinger tradeoff.

### Why Hostinger is the best fixed-price self-host pick

It wins when the team wants:

- one predictable monthly bill
- enough RAM to host LiteLLM plus a database or adjacent service on one machine
- a friendlier self-host path than a bare cloud VM
- built-in dedicated IP instead of add-on IP math

For many small teams, 8 GB is the point where the box stops feeling like a puzzle and starts feeling like infrastructure.

### The catch: it is still a prepaid VPS you own

Hostinger's convenience features do not change the category. You still own:

- OS patching
- process supervision
- backups you actually trust
- reverse proxy and TLS if you do not use a panel or template path
- failure recovery if the box dies at the wrong time

So Hostinger is the right answer when the team wants self-hosting with lower setup friction, not when it wants PaaS ergonomics.

## Hetzner is the cheapest honest cloud baseline if you want plain Linux

Hetzner remains the cleanest cheap-cloud baseline in this lane because the pricing model stays honest and the Linux ownership is explicit.

Current Hetzner Cloud docs say:

- cloud servers do **not** include public IP addresses
- **Primary IPv6** is free
- **Primary IPv4** costs an additional **€0.50/month**

Hetzner's current official pricing data for **NBG1 and HEL1** puts the cheap shared-CPU floor at **€5.49/month** for a small 4 GB-class box in this lane, before that IPv4 add-on.

That makes Hetzner appealing when you want:

- a plain Linux VM
- low monthly cost
- external Postgres or a very deliberate one-box design
- freedom from app-platform metering

### Why Hetzner is not the default answer

Hetzner is cheaper than the managed options because you are buying responsibility with the discount.

You need to be comfortable owning:

- the deploy path
- the process manager
- patching
- backups
- monitoring
- firewall rules
- any failover or restore story

For a team that already likes owning infrastructure, that is fine. For a team that mainly wanted a shared LLM gateway this month, it is often more work than the proxy deserves.

My practical read is simple: **Hetzner is stronger than Hostinger when you want raw cloud control and cleaner non-promo economics, but weaker when you want the friendliest small-team self-host experience.**

## Fly.io is the lowest credible always-on proxy floor if you keep the state elsewhere

Fly.io is still worth mentioning because it offers one of the lowest believable price floors for keeping a small process alive.

Using Fly's current **Amsterdam** pricing table as the clearest public anchor, `shared-cpu-1x` is listed at:

- **512 MB:** **$3.32/month**
- **1 GB:** **$5.92/month**
- **2 GB:** **$11.11/month**

Fly's docs also say:

- organizations generally require a **credit card on file**
- volumes cost **$0.15/GB/month**
- volumes are billed whether attached or not, including when the attached Machine is stopped
- persistent volumes are **local** storage for Machines

That is why Fly is not the universal winner even though the CPU floor looks attractive.

### When Fly is a good LiteLLM fit

Fly is a good fit when:

- the LiteLLM proxy is mostly stateless
- Postgres lives elsewhere
- Redis, if any, lives elsewhere
- you want one always-on process at a low monthly floor
- you do not need the hosting platform itself to solve storage architecture for you

That is the right Fly mental model: **cheap process hosting, not cheap stateful control-plane hosting**.

### Why I would not start LiteLLM on Fly's tiniest size

This is estimate-layer guidance, not a measured benchmark.

For LiteLLM as a real shared gateway, I would treat **1 GB** as the first credible Fly starting point, not 256 MB and usually not 512 MB unless the setup is intentionally thin. The proxy, health checks, auth logic, and ordinary Python process overhead make the tiniest VM sizes feel cleverer than they are.

If the gateway matters enough to centralize model access for a team, it matters enough to avoid making memory pressure the first thing you learn in production.

## What I would not do

### I would not host the LiteLLM proxy on edge or serverless products

This is one of the clearest "wrong shape" mistakes in the category.

LiteLLM's own production and deployment docs are built around long-running process hosts: Docker, Kubernetes, health probes, Gunicorn, Granian, Postgres, Redis. That is not the posture of a tiny request-only edge function.

If you want LiteLLM in a serverless or edge-heavy application, the usual better answer is:

- keep the app where it is
- host the LiteLLM proxy on a normal process host
- or skip the proxy and use the SDK directly in the app

### I would not start with the absolute cheapest VM tier unless the proxy is deliberately minimal

Small-team LiteLLM setups rarely stay tiny for long. Somebody adds:

- virtual keys
- more providers
- budget tracking
- one internal admin flow
- one more service calling the proxy

That is enough to make the tiniest VM feel false-economy cheap.

### I would not combine the gateway and local inference on the same tiny box

LiteLLM is a gateway. If the same cheap server is also doing local inference, heavy embeddings jobs, or browser-heavy agent work, you have stopped asking a hosting question and started building a cramped multi-role machine.

That is a different article, and usually a worse architecture.

## FAQ

### Should I host LiteLLM or just use the SDK?

Use the SDK if LiteLLM only serves one application and you do not need a shared gateway layer. Host the proxy when multiple apps, agents, or teams need one managed OpenAI-compatible endpoint.

### Does LiteLLM need a database?

Not for the simplest pass-through routing. But LiteLLM's docs say **virtual keys** require **Postgres**, and the database stores budgets, users, teams, and per-request usage tracking. For many real team-shared deployments, the answer becomes "yes" very quickly.

### When do I need Redis with LiteLLM?

LiteLLM's deployment docs position Redis as the shared state layer when you want load balancing across multiple LiteLLM containers and shared rpm/tpm tracking. If you are running one small instance, you often do not need it yet.

### What is the easiest host for a small team?

**Railway** is the easiest default if you want a managed deployment path with attached Postgres and normal service ergonomics. **Hostinger KVM 2** is the easiest self-host lane if you want one fixed-price VPS you own.

### What is the cheapest honest self-host option?

**Hetzner** is the cheapest honest cloud baseline in this set, but it is cheap because you own the Linux and recovery story yourself.

## Final verdict

If I had to compress the whole market into one sentence, it would be this: **LiteLLM is easy to over-host, and the right answer usually depends on whether you need a shared gateway or just the library.**

The practical order is:

1. Use the **SDK** and skip the proxy if LiteLLM only serves one application.
2. Choose **Railway** if you want the cleanest managed home for one team-shared LiteLLM gateway.
3. Choose **Hostinger KVM 2** if you want the friendliest fixed-price self-host box.
4. Choose **Hetzner** if the cheapest honest Linux cloud baseline matters more than ergonomics.
5. Choose **Fly.io** only when the proxy can stay mostly stateless and you understand that cheap compute does not solve cheap state.

That is the most defensible way to answer **where to host LiteLLM for small teams** on July 3, 2026 without pretending every team needs a platform team or that every gateway belongs on the cheapest box available.
