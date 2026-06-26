---
title: "Cheapest place to host n8n, Open WebUI, and Qdrant together (June 2026)"
description: "The cheapest honest way to host n8n, Open WebUI, and Qdrant together is usually one small VPS, but the real floor is an 8 GB box with enough storage and predictable persistence."
pubDate: 2026-06-17
updatedDate: 2026-06-17
category: deploy-ai-apps
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This article mixes current official product facts with explicit workload-fit estimates, and I call out the estimate layer instead of pretending it is benchmark data.*

**Last updated:** June 17, 2026

# Cheapest place to host n8n, Open WebUI, and Qdrant together

The **cheapest place to host n8n Open WebUI Qdrant** is usually not a managed app platform once you need all three services running together with persistent storage. This is a **mostly source-backed** deployment guide built from current n8n, Open WebUI, Qdrant, Hetzner, Hostinger, and DigitalOcean pages, plus a small estimate layer about what actually fits on one small server.

The assumptions matter:

- Open WebUI connects to a remote OpenAI-compatible provider or another model host, not to a local GPU model on the same box
- n8n starts on its default SQLite path with a persistent volume, not on a more complex multi-node queue setup
- Qdrant stores a modest side-project corpus, not a giant production vector estate
- the stack lives on one VPS with light to moderate traffic, one reverse proxy, and no high-availability requirement

If you need local inference on the same machine, start with our [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) instead. If you are moving a builder-generated internal tool into your own infrastructure, the closest deployment companion is [Where to deploy your Lovable, Bolt, or v0 app](https://hostfleet.net/where-to-deploy-lovable-bolt-v0-apps/). If you are trying to harden an AI-generated internal tool after the first demo, the operational companion is [What breaks when AI-generated apps hit production](https://hostfleet.net/ai-generated-app-production-footguns/).

## The short answer

| What you actually want | Best fit | Real floor | Why it wins |
|---|---|---:|---|
| Lowest honest monthly cost for the full stack on x86 | **Hetzner CX33** | **€6.49/month** | 8 GB RAM and 80 GB SSD at a price most platforms cannot touch |
| Slightly easier buying story with more storage | **Hostinger KVM 2** | **$8.99/month promo, $14.99 renewal** | 8 GB RAM, 100 GB NVMe, weekly backups, and a friendlier control panel |
| Mainstream VPS ergonomics over raw cheapest cost | **DigitalOcean Basic** | **$24/month at 4 GB, $48/month at 8 GB** | Cleaner cloud defaults, but not the cheap answer for this exact stack |

My practical verdict is simple: **an 8 GB VPS is the honest starting point** if you want n8n, Open WebUI, and Qdrant together without turning every update into memory roulette.

## Why a single VPS usually beats a cheap platform here

The official docs for each product point in the same direction.

n8n recommends Docker for most self-hosting needs, persists data in a dedicated volume, and warns that self-hosting is for people comfortable managing servers. Open WebUI's Docker quick start also assumes a persistent data volume and WebSocket-friendly networking. Qdrant's local quick start runs as its own service and persists data in a mounted storage directory.

That means this stack wants:

- three always-on services
- three persistence stories
- one box or private network where the containers can talk to each other cleanly
- enough RAM that one service restart does not shove the others into swap

Once that is the shape, the cheapest answer is usually one VPS you control rather than a pile of tiny managed services pretending to be cheaper.

## Option 1: Hetzner CX33 is the cheapest honest answer

This is the answer I would put first for a technical buyer who wants the lowest monthly bill without doing something silly.

Hetzner's own cost-optimized page lists **CX33** with:

- 4 vCPU
- 8 GB RAM
- 80 GB SSD

Hetzner's public cloud pricing data file lists **CX33 at €6.49/month** in its main EU locations.

That price matters because it lands below the most common budget-hosting talking point while still giving the stack enough room to breathe. It also stays in the x86 lane, which is the safer default for self-hosting random Dockerized software compared with going bargain-hunting on Arm first.

There is another useful signal here: n8n publishes a specific guide for hosting n8n on Hetzner Cloud and says **CPX11 is enough for most usage levels** for n8n alone. I would not apply that recommendation to this three-service stack. But it does reinforce that Hetzner is a normal, credible self-host lane for the automation part of the bundle.

Why I like CX33 for this article:

- 8 GB is enough headroom for n8n, Open WebUI, Qdrant, and a reverse proxy if you keep usage modest
- the monthly cap is genuinely low, not a teaser-renewal story
- Hetzner's cloud feature set includes API, networking, and firewalls without turning into platform markup

Why I would still be cautious:

- Hetzner itself describes the cost-optimized plan as best for low to medium traffic and smaller projects
- the plan uses older but still-supported hardware generations
- availability is limited compared with the regular-performance line
- you still own Linux, backups, upgrades, and service recovery

The tradeoff is honest: **best price, more operator responsibility**.

## Option 2: Hostinger KVM 2 is the practical fallback if you want a roomier cheap box

Hostinger's VPS page currently lists **KVM 2** at:

- $8.99/month promo
- $14.99/month renewal
- 2 vCPU
- 8 GB RAM
- 100 GB NVMe storage
- 8 TB bandwidth

Hostinger also says all plans are paid upfront, include weekly backups and snapshots, and offer an app catalog with Docker and n8n in the mix.

Compared with Hetzner CX33, Hostinger KVM 2 is not the absolute cheapest monthly answer. What it gives you instead is:

- more storage
- a more consumer-friendly control panel
- a product line already leaning into Docker and automation-tool self-hosting
- fewer questions about whether you are buying into a constrained low-cost sub-tier

This makes Hostinger KVM 2 the better fit if your priorities are:

- you want one cheap side-project box and a slightly smoother beginner experience
- you expect to keep local files or Qdrant collections around longer
- you are willing to accept promo pricing and an upfront term to lower first-year spend

The weakness is obvious: the headline price is a **promo story**, not a clean month-to-month cloud story. If you care about long-lived steady-state economics more than first-year affordability, Hetzner is cleaner.

## Option 3: DigitalOcean is the clean mainstream baseline, not the cheapest place

DigitalOcean's published Basic Droplet pricing still makes a good reality check:

- 1 GB / 1 vCPU: $6/month
- 2 GB / 1 vCPU: $12/month
- 4 GB / 2 vCPU: $24/month
- 8 GB / 4 vCPU: $48/month

The reason I keep DigitalOcean in this article is not that it wins the budget contest. It does not. The reason it matters is that it exposes how expensive the "safe default" gets once you size this stack honestly.

My estimate is straightforward:

- **4 GB is the smallest size I would even trial**
- **8 GB is the first size I would buy with a straight face**

At $24, the 4 GB Droplet is already more expensive than the better Hetzner and Hostinger fits above, while also leaving less margin for a stateful three-service setup. At $48, the 8 GB Droplet is operationally cleaner but stops being a cheap answer altogether.

Choose DigitalOcean if you want the familiar ecosystem, straightforward billing, and standard VPS ergonomics. Do not choose it because you think it is the cheapest place to run this bundle. It is not.

## The real sizing assumption: 8 GB is the honest floor

This is the estimate layer, not a published benchmark.

Could you jam this stack into 4 GB?

Yes, probably, if all of the following are true:

- Open WebUI is only a frontend to remote APIs
- n8n workflows are light and concurrency is low
- Qdrant holds a small collection and modest payloads
- you are disciplined about container limits, logs, and background jobs

Would I recommend buying fresh into 4 GB for this exact setup?

No. That is the kind of deployment that looks clever right up until Qdrant grows, n8n piles up execution history, or Open WebUI updates into a slightly heavier build.

The honest resource floor for a side-project version of this stack is **8 GB RAM**. That is why the article's recommendation lands on **Hetzner CX33** and **Hostinger KVM 2**, not on the cheapest tiny instances those providers sell.

## The cheapest sane deployment shape

If I were optimizing for minimum spend without lying to myself, I would do this:

- run n8n in Docker with its persistent data volume
- keep n8n on SQLite first and delay PostgreSQL until the workflow volume or team size justifies it
- run Open WebUI as a frontend to a remote OpenAI-compatible model provider, not to a local model on the box
- run Qdrant in its own Docker container with persistent storage
- put Caddy or Nginx in front for TLS and routing
- back up the n8n and Qdrant data on a schedule you actually test

That setup keeps the cheap answer cheap by refusing to turn the same VPS into a local inference node, a browser farm, a database cluster, and a public SaaS platform at the same time.

## What breaks the cheap answer

### 1. Local Ollama or CPU inference on the same box

Open WebUI can absolutely talk to a local model server, but that is not what this draft recommends. Once you try to run local inference on the same cheap VPS, the whole cost argument falls apart. This article is about orchestration and retrieval, not about CPU-only model serving.

### 2. Qdrant that stops being small

Qdrant is easy to start and honest about its local storage model. That does not mean the collections stay tiny. Large embeddings, lots of payload metadata, or sloppy retention will turn the cheapest box into the wrong box.

### 3. n8n that stops being simple

n8n's docs say Docker is the recommended route and SQLite is the default path. That is perfect for cheap starting points. It gets less perfect when you add lots of workflows, execution history, or a team that needs stronger operational guarantees.

### 4. "One box" turning into "our production platform"

None of the picks here are a high-availability recommendation. They are single-node budget answers. The moment the stack becomes business-critical, you should reevaluate whether separate services, managed data, or a more redundant design are worth the extra cost.

## FAQ

### Can I host n8n, Open WebUI, and Qdrant on a 4 GB VPS?

Probably, but I would treat that as a test-box move, not the best buying decision for a fresh setup. It is too easy for logs, updates, or vector growth to eat the margin.

### What is the cheapest honest host for this stack?

On current published pricing and an 8 GB floor, **Hetzner CX33** is the cheapest answer I would actually recommend.

### Is Hostinger a better choice than Hetzner?

It can be, if you value 100 GB storage, a friendlier control plane, and a smoother beginner experience more than the absolute lowest monthly price. It is a worse choice if you care about clean long-term pricing more than first-year promo economics.

### Is DigitalOcean worth it here?

Yes, if you want mainstream VPS predictability and are comfortable paying materially more. No, if the goal is the cheapest sane place to run the full stack.

### Should I add PostgreSQL for n8n on day one?

Not for the cheapest version of this setup. n8n defaults to SQLite, and that is the right starting point for a small single-node deployment unless your workflow volume or team needs make PostgreSQL clearly worth the extra footprint.

## Final verdict

If the goal is **the cheapest place to host n8n, Open WebUI, and Qdrant together**, the honest answer is not "whatever plan has the smallest number on the landing page." The honest answer is **the cheapest 8 GB VPS you trust to run three stateful services on one box**.

Right now that ladder looks like this:

1. **Hetzner CX33** if you want the absolute cheapest serious monthly price.
2. **Hostinger KVM 2** if you want a slightly friendlier cheap box with more storage.
3. **DigitalOcean** only if you are intentionally paying extra for cleaner cloud ergonomics.

That is the real buyer answer for June 2026.

## Sources

- n8n Docker installation docs - https://docs.n8n.io/hosting/installation/docker/
- n8n Hetzner setup guide - https://docs.n8n.io/hosting/installation/server-setups/hetzner/
- Open WebUI quick start - https://docs.openwebui.com/getting-started/quick-start/
- Qdrant local quick start - https://qdrant.tech/documentation/quickstart/
- Hetzner cost-optimized cloud page - https://www.hetzner.com/cloud/cost-optimized/
- Hetzner regular-performance cloud page - https://www.hetzner.com/cloud/regular-performance/
- Hetzner cloud pricing data - https://www.hetzner.com/_resources/app/data/bench/cloud_data.json
- Hostinger VPS hosting page - https://www.hostinger.com/vps-hosting
- DigitalOcean Droplet pricing - https://www.digitalocean.com/pricing/droplets
- HostFleet AI-hosting provider list - /opt/hostbot/data/ai-hosting/providers.csv
- HostFleet AI-hosting experiment backlog - /opt/hostbot/data/ai-hosting/experiment-backlog.md
- HostFleet content calendar - /opt/hostbot/data/content_calendar.csv
- HostFleet live about page source - /opt/hostbot-v2/src/pages/about.astro
- HostFleet post baseline: Best hosting for AI agents on a budget - /opt/hostbot-v2/src/content/posts/best-hosting-for-ai-agents-on-a-budget.md
- HostFleet post baseline: What breaks when AI-generated apps hit production - /opt/hostbot-v2/src/content/posts/ai-generated-app-production-footguns.md
- HostFleet post baseline: Where to deploy your Lovable, Bolt, or v0 app - /opt/hostbot-v2/src/content/posts/where-to-deploy-lovable-bolt-v0-apps.md
