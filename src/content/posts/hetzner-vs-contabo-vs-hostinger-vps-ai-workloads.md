---
title: "Hetzner vs Contabo vs Hostinger VPS for AI workloads (June 2026): which budget box actually fits an agent stack"
description: "Honest June 2026 comparison of Hetzner, Contabo, and Hostinger VPS plans for AI agent backends, RAG glue, and browser-automation workers — using current public pricing and real workload constraints."
pubDate: 2026-06-29
updatedDate: 2026-06-29
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. We rank providers using current public pricing pages and our own workload notes, not based on who pays more. Full methodology and disclosure live on the [HostFleet about page](https://hostfleet.net/about/).*

**Last updated:** June 29, 2026

# Hetzner vs Contabo vs Hostinger VPS for AI workloads (June 2026)

If you have read this far, you have already accepted the unpopular truth about AI-side-project hosting: a small VPS is still the most boring, predictable home for an agent backend, a RAG glue layer, or a webhook-driven worker. The interesting question is which of the three "everyone says they're cheap" boxes — **Hetzner**, **Contabo**, **Hostinger** — actually fits the work without becoming the problem you spend your weekends debugging.

This piece is a **mixed guide**. The sourced layer is current public plan pricing, included resources, and provider billing rules. The estimate layer is what each plan can actually carry once you put a real AI stack on it. Where I am inferring, I say so.

If you have not picked a workload shape yet, start with [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/) and [What it costs to run an AI side project on a VPS for 30 days](https://hostfleet.net/cost-to-run-ai-side-project-on-vps-30-days/). This article assumes you already know roughly what you want to run.

## The short answer

| Box you should buy | When it fits | What it does not do well |
|---|---|---|
| **Hetzner CX22 or CX32** | Mostly API-driven agents, light RAG, one small Postgres, a few always-on services | Heavy CPU inference, big browser fleets, "everything on one node" mistakes |
| **Hostinger KVM 2 or KVM 4** | Single-developer AI stack with prepaid budget, Coolify-style self-hosting, modest workload | True month-to-month flexibility — pricing is promo-anchored |
| **Contabo VPS S or M** | Storage-heavy workloads, big-RAM-on-a-budget, archival or vector dump rigs | Latency-sensitive request paths, anything that needs consistent burst CPU |

Everything below is the long version of that table.

## Why these three keep showing up

Each provider plays a different game:

- **Hetzner** sells genuinely cheap, modern, x86 and Arm cloud instances out of EU and US regions, billed by the hour, with a clean ecosystem. It is the default "serious cheap cloud" pick for European builders and has crossed into the global default for budget self-hosting.
- **Hostinger** sells prepaid VPS contracts at very low monthly-equivalent prices, with KVM virtualization and a managed-feeling control surface. Renewal pricing is materially higher than promo pricing, and the cheap number assumes long commitments.
- **Contabo** sells the most RAM and disk per dollar in the budget tier, hands down — but on shared CPU that does not behave like Hetzner's. It is a storage and RAM rig, not a latency rig.

This is a real trade tree, not "who is fastest." For AI workloads in particular, the right answer depends on whether you are storing things, calling things, or computing things.

## What the providers actually charge right now

I am quoting current public pricing pages. Promo terms, taxes, and regional variation all apply. Always re-check on the provider site before signing.

### Hetzner cloud — the boring efficient default

Hetzner's current cost-optimized cloud lineup (x86 shared) includes the **CX22** at roughly €4.51 per month with 2 vCPU and 4 GB RAM, the **CX32** at roughly €6.85 per month with 4 vCPU and 8 GB RAM, and **CX42** at roughly €12.10 per month with 8 vCPU and 16 GB RAM. Arm-based CAX plans price even lower for the same RAM tiers. Public IPv4 is billed separately (about €0.60 per month), backups are about 20% of plan price, and you get generous included egress.

Hourly billing means you can run a stack for a weekend test and pay cents. This is a real advantage for AI work, where you often want to try a model gateway or a vector store on a separate box for a day and then kill it.

### Hostinger VPS — cheap if you commit, normal if you don't

Hostinger's KVM VPS line currently lists **KVM 2** at around **$5.99/mo** promo (8 GB RAM, 2 vCPU, 100 GB NVMe), **KVM 4** at around **$8.99/mo** promo (16 GB RAM, 4 vCPU, 200 GB NVMe), and **KVM 8** at around **$15.99/mo** promo (32 GB RAM, 8 vCPU, 400 GB NVMe). Those numbers assume a four-year prepaid term. Renewal pricing is roughly 2× to 3× the headline.

What you actually get for that money is large-RAM KVM with NVMe and a UI that is friendlier than Hetzner's for people who do not live in cloud consoles. For an AI side project running Coolify, n8n, Open WebUI, a small Qdrant, and one always-on Telegram or Discord bot, the **KVM 4** tier is realistic. See [Hostinger VPS for AI side projects](https://hostfleet.net/hostinger-vps-for-ai-side-projects/) for the deeper breakdown.

### Contabo VPS — most-RAM-per-dollar with a CPU caveat

Contabo's standard VPS line currently lists **VPS S** at around **$5.50/mo** with 4 vCPU and 8 GB RAM and 100 GB NVMe, **VPS M** at around **$10.50/mo** with 6 vCPU and 16 GB RAM and 200 GB NVMe, and **VPS L** at around **$17.50/mo** with 8 vCPU and 30 GB RAM and 400 GB SSD. Setup fees and region surcharges apply for some configurations.

This is the cheapest way to get 16–30 GB of RAM in this category. The catch is shared vCPU on Intel/AMD platforms that **do not** match Hetzner's modern Ampere or AMD performance per core under sustained load. For a vector dump, a media archive, or a self-hosted LLM gateway holding lots of cached embeddings in RAM, that is fine. For latency-sensitive request paths, plan accordingly.

## Workload by workload — which box wins

### Agent backends and webhook workers

If your workload is mostly: receive a webhook, call an external LLM API, write to a small Postgres, push to a queue, return — then **Hetzner CX22** is the right default. It is cheap, the CPU is modern enough that retries do not balloon, and hourly billing means you can throw away a box without sunk-cost guilt.

Hostinger KVM 2 also fits, especially if you already prepay. Contabo VPS S works on paper but its CPU consistency is the worst fit for request-path work that has to answer in hundreds of milliseconds, not seconds. For more on always-on agent workers in particular, see [Best hosts for long-running agent workers](https://hostfleet.net/best-hosts-for-long-running-agent-workers/).

### Self-hosted Coolify, n8n, Open WebUI, Qdrant

A self-hosted stack like the one in [Cheapest place to host n8n, Open WebUI, and Qdrant together](https://hostfleet.net/cheapest-place-to-host-n8n-open-webui-qdrant/) is RAM-shaped. Once you add a small Qdrant, a Postgres, n8n, Open WebUI, a reverse proxy, and a few helpers, you want **at least 8 GB** of RAM and prefer 16 GB.

This is where Contabo earns its place: **VPS M** at ~$10.50/mo gives you 16 GB and 200 GB NVMe for the price of a Hetzner CX32. If your usage tolerates noisier CPU, it is a strong pick. Hostinger KVM 4 at the promo price is the closest mainstream alternative with cleaner CPU and a friendlier panel.

### Browser automation and Playwright/Steel fleets

Headless Chrome is the workload most likely to embarrass a cheap VPS. Each browser tab can easily eat 300–800 MB of RAM under realistic AI scraping or testing patterns, and the workload is bursty CPU.

For small fleets (1–4 concurrent browsers), **Hetzner CX32** is the most predictable home. For larger fleets, you usually want either a dedicated Hetzner AX-series machine or a managed browser service — read [Where to host MCP servers for small teams](https://hostfleet.net/where-to-host-mcp-servers-for-small-teams/) and the browser-runtime section of [Coolify on a VPS for AI app hosting](https://hostfleet.net/coolify-on-a-vps-for-ai-app-hosting/) for the larger-fleet patterns.

Contabo is the wrong choice here. Its CPU model and noisier-neighbor profile is the worst possible fit for a workload that needs short, sharp bursts and consistent latency.

### Vector storage and embedding caches

If the workload is mostly cold storage of embeddings, document chunks, or media assets — and you serve them in batch rather than interactively — **Contabo** is genuinely good. Its disk-per-dollar and RAM-per-dollar profile is exactly what bulk vector and asset storage needs.

For interactive vector lookups against a small corpus that has to feel snappy, **Hetzner** is the better choice and pgvector on a CX32 will outperform a noisier-CPU Contabo box on hot queries even with less total RAM. The deeper version of this argument is in [Vector database hosting for small AI apps](https://hostfleet.net/vector-database-hosting-small-ai-apps/).

### Always-on bots, schedulers, and small APIs

If you are running an AI Telegram or Discord bot, a small webhook receiver, and one cron-driven enrichment job, you do not need 8 GB. A **Hetzner CX22** at €4.51/mo is the right answer and the closest thing to a "set and forget" cheap AI bot host on the open market today.

## Where each one breaks first

Every cheap box has a wall. Knowing where yours is matters more than which logo you picked.

- **Hetzner** breaks first on **disk capacity** in the cheapest tiers, and on **GPU access** (there is none in the cloud line). If you need >200 GB cheaply, look at Contabo or a Hetzner dedicated server. If you need a GPU, use a serverless inference provider — see [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) and [RunPod vs Modal vs Replicate for shipping a small inference API](https://hostfleet.net/runpod-vs-modal-vs-replicate-small-inference-api/).
- **Hostinger** breaks first on **renewal pricing** if you treat promo prices as ongoing. Plan the prepaid term you can actually commit to or you will pay roughly 2–3× later.
- **Contabo** breaks first on **request-path latency** under sustained load and **noisy-neighbor variability**. Use it as a storage and RAM rig, not as a "main hot box."

## FAQ

### What is the cheapest serious AI VPS in 2026?

For request-path AI work, Hetzner's CX22 at roughly €4.51 per month is the cheapest honest answer right now. For RAM-heavy storage workloads, Contabo VPS M at around $10.50/mo for 16 GB is unbeatable on paper.

### Is Hostinger's $5.99 KVM 2 really $5.99?

Only on a four-year prepay. Renewals run closer to the high teens per month. The hardware is real, but the headline number is the marketing number.

### Can I run a local LLM on any of these?

You can technically run a small quantized model on Contabo VPS L or Hostinger KVM 8, but the latency will disappoint you. CPU inference on a cheap VPS is almost never the right answer. Use a managed inference provider for the model and let the VPS hold the orchestration. See [OpenRouter vs Together vs Groq vs Fireworks vs Cerebras](https://hostfleet.net/openrouter-vs-together-vs-groq-vs-fireworks/).

### What about Hetzner Arm (CAX) plans?

For pure orchestration and most webhook or agent work, the CAX line is a fine cheaper alternative. Ollama, vLLM, and a few Docker images still have spotty Arm support, so test before committing if your stack includes anything exotic.

### Where does DigitalOcean fit in this comparison?

Above all three on price, below all three on per-dollar resources, but with the cleanest ecosystem. If you are choosing between cheap and convenient, the comparison piece is [What it costs to run an AI side project on a VPS for 30 days](https://hostfleet.net/cost-to-run-ai-side-project-on-vps-30-days/).

## Final verdict

For 80% of AI side projects on a budget today, the honest answer is **Hetzner first, Hostinger second, Contabo only when the workload shape genuinely matches**.

1. **Hetzner CX22 or CX32** — default pick for request-path AI work, agent backends, and small RAG.
2. **Hostinger KVM 2 or KVM 4** — fine if you prepay and want a friendlier panel.
3. **Contabo VPS M or L** — pick this when you need cheap RAM and disk for storage-shaped workloads, not for hot request paths.

There is no fourth option in this comparison that is meaningfully cheaper without trading away something more important than the price gap.

## Sources

- Hetzner cost-optimized cloud page — https://www.hetzner.com/cloud/cost-optimized
- Hetzner cloud pricing data — https://www.hetzner.com/_resources/app/data/bench/cloud_data.json
- Hetzner cloud billing FAQ — https://docs.hetzner.com/cloud/billing/faq/
- Hostinger VPS hosting — https://www.hostinger.com/vps-hosting
- Contabo VPS — https://contabo.com/en/vps/
- HostFleet post baseline: Hostinger VPS for AI side projects — /opt/hostbot-v2/src/content/posts/hostinger-vps-for-ai-side-projects.md
- HostFleet post baseline: What it costs to run an AI side project on a VPS for 30 days — /opt/hostbot-v2/src/content/posts/cost-to-run-ai-side-project-on-vps-30-days.md
- HostFleet post baseline: Best hosting for AI agents on a budget — /opt/hostbot-v2/src/content/posts/best-hosting-for-ai-agents-on-a-budget.md
- HostFleet post baseline: Vector database hosting for small AI apps — /opt/hostbot-v2/src/content/posts/vector-database-hosting-small-ai-apps.md
- HostFleet post baseline: Cheapest place to host n8n, Open WebUI, and Qdrant together — /opt/hostbot-v2/src/content/posts/cheapest-place-to-host-n8n-open-webui-qdrant.md
