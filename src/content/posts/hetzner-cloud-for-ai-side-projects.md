---
title: "Hetzner Cloud for AI side projects (July 2026): cheapest serious self-hosted CPU, with the catches that still matter"
description: "A July 2026 HostFleet review of Hetzner Cloud for AI side projects, focused on the real all-in floor after IPv4 and backups, the June 2026 price shift, and when Hetzner still beats friendlier managed platforms."
pubDate: 2026-07-07
updatedDate: 2026-07-10
category: ai-hosting
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This article is source-backed on Hetzner's current pricing, billing rules, traffic policy, backup behavior, and product limits, with a narrow estimate layer for workload fit.*

**Last updated:** July 10, 2026

# Hetzner Cloud for AI side projects

If you are considering **Hetzner Cloud for AI side projects**, the right opening question is not whether Hetzner is cheap. It is. The real question is whether you want **cheap cloud primitives** badly enough to own the Linux box, the backup plan, and the deployment rough edges yourself.

This is a **mixed, mostly source-backed** review built from Hetzner's current cloud pages and docs plus HostFleet's current provider note. The sourced layer is the important stuff buyers can verify directly: current plan pricing after Hetzner's June 15, 2026 cloud price adjustment, paid IPv4, backup pricing, volume behavior, traffic accounting, and default limits. The estimate layer is smaller and stated plainly: which Hetzner plans are actually honest homes for a small AI side project once the stack includes an API, a worker, maybe Redis or Postgres, and the usual operational slack.

The scope is narrow on purpose:

- this is about CPU-first side projects that mostly call external AI APIs
- this is not a local GPU inference guide
- this is not a managed-platform review for teams that want Railway-like ergonomics
- this is not a pretend benchmark where a box that booted once is called production-ready

If you need the broader budget ladder first, read [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/). If you are still deciding whether one VPS is the right shape at all, pair this with [What it costs to run an AI side project on a VPS for 30 days](https://hostfleet.net/cost-to-run-ai-side-project-on-vps-30-days/). If the real question is single-box sizing for agent frameworks, [Best VPS setup for LangGraph or CrewAI](https://hostfleet.net/best-vps-for-langgraph-crewai/) is the better companion.

## The short answer

| What you actually need | Best Hetzner starting point | Honest all-in monthly shape | Why it fits |
|---|---|---:|---|
| One light always-on API, webhook worker, or bot backend | **CX23** | **About EUR 7.09/month** | Cheapest serious x86 floor once you include Primary IPv4 and backups |
| One roomier small stack with API, worker, and one light stateful service | **CX33** | **About EUR 10.69/month** | First Hetzner tier that feels sane for a real small system instead of one thin process |
| Arm-friendly orchestration stack where your images and tooling are already ARM-safe | **CAX11** | **About EUR 7.69/month** | Cheap 4 GB option if your stack is comfortable on Arm |
| Team wants deploy convenience more than raw resource-per-dollar | **Do not start with Hetzner alone** | **Use a platform or add your own control plane** | Hetzner gives infrastructure, not deployment ergonomics |

The practical verdict is simple: **Hetzner Cloud is still one of the best low-cost CPU baselines for AI side projects in July 2026, but it wins because the bill is low, not because the operations disappear.**

## The pricing changed in June 2026, and the cheap story is still real

This review needs a date because Hetzner's cloud pricing moved recently.

Hetzner's official price-adjustment note says new cloud prices took effect on **June 15, 2026** for new bookings and server resets. In Germany and Finland, the current published entry prices now include:

- **CX23:** **EUR 5.49/month**
- **CAX11:** **EUR 5.99/month**
- **CX33:** **EUR 8.49/month**
- **CAX21:** **EUR 8.99/month**
- **CPX22:** **EUR 19.49/month**

That matters because some older comparison pieces and cached screenshots still show the pre-adjustment numbers. Hetzner is not quite as absurdly cheap as it looked earlier in June. It is still cheap enough to matter.

The important correction is that the landing-page monthly price is not the real operating floor. Hetzner's docs also say:

- cloud servers do **not** include public IP addresses
- **Primary IPv4** costs **EUR 0.50/month**
- **Primary IPv6** is free
- backups cost **20 percent** of the server price
- powered-off cloud servers still bill until they are deleted

That creates the first honest small-project math:

- **CX23:** EUR 5.49 + EUR 0.50 IPv4 + EUR 1.10 backups = about **EUR 7.09/month**
- **CAX11:** EUR 5.99 + EUR 0.50 IPv4 + EUR 1.20 backups = about **EUR 7.69/month**
- **CX33:** EUR 8.49 + EUR 0.50 IPv4 + EUR 1.70 backups = about **EUR 10.69/month**

Those are still excellent prices. They are also the numbers you should compare against Hostinger promo VPS pricing, Railway's managed floor, or DigitalOcean's cleaner but pricier mainstream cloud posture.

## Why Hetzner is still strong for AI side projects

Hetzner keeps showing up in HostFleet's AI-hosting work for one boring reason: it is a very good fit for **always-on CPU orchestration**.

That usually means:

- a webhook receiver
- a background worker that calls external model APIs
- a small internal API
- one Redis or Postgres instance
- a bot backend
- a self-hosted LiteLLM, Open WebUI, or MCP-style support service that is mostly glue, not local inference

For those shapes, Hetzner gives you three things that still matter:

- a low monthly floor with hourly billing and a monthly cap
- free firewalls
- generous included outbound traffic in EU for the common CX, CPX, and CAX cloud families

Hetzner's traffic docs are explicit that billing is based on **outgoing traffic only**, while incoming and internal traffic are not counted. The same docs currently show **20 TB included** for EU-region CX, CPX, and CAX cloud servers, with overage at **EUR 1/TB**. That is more generous than many buyers expect at this price.

For a lot of AI side projects, the server is not doing the expensive intelligence. It is just keeping the workflow alive. Hetzner is good at that role.

## The catches are operational, not mysterious

This is where the cheap-cloud story stays honest.

### 1. Hetzner is infrastructure, not a deployment product

Hetzner gives you servers, volumes, firewalls, snapshots, and IP objects. It does not give you app-platform ergonomics.

If you want:

- one-click service graphs
- built-in preview environments
- first-class worker and cron products
- logs and rollbacks that feel productized

then Hetzner alone is the wrong starting point. You either add your own deployment layer, such as Coolify, or you pay a platform tax somewhere else.

That does not make Hetzner bad. It just means the labor cost moves from the bill to the operator.

### 2. Volumes are good, but the backup story is worse than many buyers assume

Hetzner's volume docs are strong on the infrastructure side:

- volumes scale from **10 GB to 10 TB**
- they are billed hourly with a monthly cap
- they are **triple-replicated across three physical servers**
- one volume can attach to only **one server at a time**

The bad news is the protection model. Hetzner's docs also say:

- Hetzner does **not** provide backups or snapshots for volumes
- server snapshots and backups do **not** include attached volumes

That is a serious caveat for stateful AI side projects. If your Postgres data, vector store, or uploaded files live on an attached volume, your backup story is your problem. Triple replication helps with hardware failure. It does not replace backup and restore discipline.

### 3. Cheap shared resources are still shared resources

The cost-optimized CX and CAX lines are strong because they are cheap. They are not dedicated high-performance boxes.

This is the estimate layer, and I want to keep it narrow:

- **CX23** is credible for one light always-on API or worker
- **CX33** is the first tier I would call an honest home for one small multi-service stack
- the smaller entry shapes are not where I would put browser-heavy work, large local vector indexes, or CPU-sensitive concurrency

If your AI side project starts to include Playwright fleets, aggressive parsing jobs, or lots of local embedding work, Hetzner's cheap shared plans stop being the fun answer. At that point you should either move up the line or stop pretending the workload is still a tiny side project.

### 4. Default limits exist, even if they can be raised

Hetzner's server docs say the default project quota is **5 cloud servers** and **8 dedicated-resource servers**. They also document per-server limits such as:

- up to **1 Primary IPv4**
- up to **1 Primary IPv6**
- up to **20 Floating IPs**
- up to **5 Firewalls**
- up to **16 Volumes**

Most small teams will not hit those limits immediately. They still matter when a supposedly simple side project starts multiplying into staging boxes, worker pools, and sidecar services.

## When Hetzner wins, and when it does not

### Hetzner wins when the workload is one boring always-on box

Buy Hetzner first when you want:

- one always-on API and worker
- one small Linux home for a bot backend or internal tool
- a cheap MCP or LiteLLM-style support service you control yourself
- the lowest serious self-hosted CPU bill without promo-prepay tricks

This is especially true if you are comfortable with SSH, Docker, backups, and basic Linux housekeeping.

### Hetzner loses when the human cost of self-hosting is the expensive part

Skip Hetzner as the first answer when:

- nobody on the team wants to run Linux
- the app shape changes often and you value faster deploy ergonomics more than the smallest bill
- the project is heavily cron-shaped and would map better to a managed runtime
- the data lives on volumes and the team has not designed backups properly
- the stack is browser-heavy enough that cheap shared CPU becomes the bottleneck

In other words: Hetzner is often the cheapest box. It is not the cheapest mistake-proof workflow.

## What I would actually buy

### Buy CX23 if the app is one thin service

Use **CX23** if the workload is mostly:

- one API
- one worker
- low concurrency
- external model APIs
- little local state

That is the right tier for simple bots, webhook workers, or modest internal tools.

### Buy CX33 if the app is a real small system

Use **CX33** if the workload looks like:

- one API
- one worker
- reverse proxy
- one small Postgres or Redis
- enough logging and retries that the app should not live on the edge of RAM

This is the plan I would recommend most often for a real AI side project on Hetzner Cloud.

### Buy CAX only if your stack is already comfortable on Arm

The current **CAX11** and **CAX21** prices are attractive, but Arm should be a conscious choice, not a surprise discount. If your Docker images, dependencies, and browser tooling are already Arm-safe, CAX can be a good cheap orchestration lane. If not, the hassle can erase the savings.

## FAQ

### Is Hetzner Cloud good for AI hosting?

Yes for CPU-first AI hosting where the server mostly orchestrates external model APIs, workers, or small data services. No if you mean managed GPU inference or a platform that hides infrastructure operations.

### What is the first honest Hetzner Cloud plan for a small AI app?

For one thin process, **CX23** is a credible start. For a real small stack with multiple always-on pieces, **CX33** is the first plan I would recommend without apology.

### Is Hetzner cheaper than DigitalOcean?

Usually yes on raw monthly compute cost, even after you add Primary IPv4 and backups. DigitalOcean is easier to justify when cleaner mainstream cloud ergonomics matter more than squeezing down the bill.

### Is Hetzner cheaper than Hostinger?

Compared with Hostinger's promo math, not always. Compared with more honest month-to-month or renewal thinking, Hetzner is usually the cleaner cheap-cloud answer because the billing is transparent and not built around long prepaid terms.

### What is the biggest Hetzner gotcha for stateful apps?

Attached volumes are the big one. Hetzner's docs say server backups and snapshots do not include them, and Hetzner does not provide backups or snapshots for volumes. If the important data lives there, you need your own backup plan.

## Final verdict

If I had to compress the answer into one sentence, it would be this: **Hetzner Cloud is still one of the best low-cost places to run a small always-on AI side project, as long as you remember that the cheap bill buys infrastructure, not safety rails.**

The practical buying order is:

1. Start with **CX23** for one thin always-on service.
2. Start with **CX33** if the project is already a small multi-service system.
3. Consider **CAX** only when your stack is already Arm-safe.
4. Skip Hetzner first if what you actually want is a managed app platform or a backup story you do not have to think about.

That is the honest July 2026 answer to **Hetzner Cloud for AI side projects** without flattening cheap cloud infrastructure into something it is not.

---

*Signing up for something covered here? Using our affiliate links supports HostFleet's testing budget at no extra cost to you: [DigitalOcean](/go/digitalocean). Links are labeled, and source citations in this article are never affiliate links.*
