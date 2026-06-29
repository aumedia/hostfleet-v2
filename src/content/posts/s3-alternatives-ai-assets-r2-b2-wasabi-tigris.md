---
title: "S3 alternatives for AI assets: R2 vs B2 vs Wasabi vs Tigris (June 2026)"
description: "A June 2026 honest comparison of Cloudflare R2, Backblaze B2, Wasabi, and Tigris for AI asset storage — model weights, embeddings dumps, training data, generated media — with current per-GB pricing, egress rules, and where each one wins."
pubDate: 2026-06-29
updatedDate: 2026-06-29
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never affects the rankings. We compare object storage providers using current public pricing pages and our own deployment notes. [Full methodology here](https://hostfleet.net/about/).*

**Last updated:** June 29, 2026

# S3 alternatives for AI assets: R2 vs B2 vs Wasabi vs Tigris (June 2026)

AWS S3 is the default. It is also the most expensive way to store the things AI apps actually produce in volume — model weights, embedding dumps, training datasets, generated images, scraped HTML caches, audio outputs, video frames. The bill that gets people is rarely the storage itself; it is the egress.

This is a **mixed guide**. The sourced layer is current public per-GB pricing, egress rules, and API compatibility for each candidate. The estimate layer is which provider best fits which AI workload — and where each one's marketing collides with its small print.

If you have not picked the broader storage model yet, the natural priors are [Vector database hosting for small AI apps](https://hostfleet.net/vector-database-hosting-small-ai-apps/) for embeddings and [Cheapest place to host n8n, Open WebUI, and Qdrant together](https://hostfleet.net/cheapest-place-to-host-n8n-open-webui-qdrant/) for the surrounding self-hosted stack.

## The short answer

| Provider | Where it wins | Where it loses |
|---|---|---|
| **Cloudflare R2** | Zero egress fees; tight integration with Workers and Pages | Smaller ecosystem of off-platform tools; per-GB storage not the absolute cheapest |
| **Backblaze B2** | Lowest sustained storage price; CDN-fronted egress is free via Cloudflare | Fewer regions; older S3 API quirks for some SDKs |
| **Wasabi** | Flat predictable storage, no egress fees within minimum-storage policy | 90-day minimum retention; geo-region pricing varies |
| **Tigris** | Globally distributed by default; modern S3-compatible API; usage-based | Newer, smaller community than the older three |

The headline: **for AI workloads that pull data back out a lot, R2 and Tigris are the safest defaults; for cold archival of model weights and embedding dumps, B2 wins on pure price; Wasabi sits between the two with stricter terms.**

## Why egress dominates AI storage cost

Most AI workloads do not just store. They move data:

- a worker pulls a quantized model weight at boot
- a batch job streams a 4 GB embeddings dump back into Qdrant
- a generation pipeline writes thousands of generated images that are then served to users
- a scraping pipeline writes HTML, then pulls subsets back for re-parsing
- a multi-tenant app serves user-uploaded files at request time

AWS S3 charges roughly **$0.09/GB** for outbound traffic to the public internet in most regions. At a terabyte a month — easy for a media-generating app or a scraping pipeline — that is $90 per month before storage. The S3 alternatives that matter for AI all attack this number.

## What each provider actually charges right now

I am quoting current public pricing pages. Promo and region variation apply. Always re-check on the provider site before signing.

### Cloudflare R2 — the egress-free default

R2 charges **$0.015 per GB-month** for stored data and **$0 for egress to the public internet**. Operations are billed at $4.50 per million Class A writes and $0.36 per million Class B reads. There is a free tier of 10 GB stored and a generous number of free operations per month.

This is the headline trade. R2's per-GB storage price is higher than B2's, but zero egress turns the math on its head the moment you actually pull data back out — which AI workloads do constantly. For anything that serves AI-generated assets to users, embeds with Workers, or pairs with Cloudflare Pages or D1, R2 is the obvious default. See [Cloudflare Pages vs Vercel vs Netlify](https://hostfleet.net/cf-pages-vs-vercel-vs-netlify-2026/) for the deployment-side context.

### Backblaze B2 — the cheapest pure storage

B2 charges **$0.006 per GB-month** for stored data and **$0.01 per GB** for direct egress, with the first 3× of stored data per month free. The bigger lever: **egress is free to Cloudflare** via the Bandwidth Alliance, which means you can put R2-like egress economics on a B2 backend by fronting with a Cloudflare Worker or Cache Rule.

For pure cold storage — model weights, training datasets, embedding archives that get hit occasionally — B2 is the cheapest credible answer. For interactive serving, it works best when paired with a CDN that the Bandwidth Alliance covers.

### Wasabi — predictable, with policy traps

Wasabi charges roughly **$6.99 per TB-month** for hot cloud storage with no egress or API request fees, within their fair-use policy. The two important policy details: a **90-day minimum storage duration** (delete before that and you still pay for the full window) and a **monthly egress allowance equal to your stored amount** before fair-use kicks in.

Wasabi is excellent for predictable workloads — backups, periodic training data refreshes, predictable monthly egress patterns. It is a bad fit for workloads that write a lot and delete a lot in quick succession, or that have spiky outbound bursts well above the active-storage ratio.

### Tigris — newer, globally distributed, S3-compatible

Tigris charges **$0.02 per GB-month** for stored data and explicitly markets **zero egress fees** for typical workloads. It is fully S3-API compatible, globally distributed by default, and integrates cleanly with Fly.io. Its angle is "S3 ergonomics, modern global edge, simple pricing."

For AI apps that need genuine multi-region asset serving without DIY edge plumbing, Tigris is the cleanest option. It is younger than R2, B2, or Wasabi, so the ecosystem of third-party tools is smaller. For Fly.io-hosted stacks, the integration is good enough that it is often the path of least resistance — see [Railway vs Fly.io vs Render for AI workflow backends](https://hostfleet.net/railway-vs-fly-io-vs-render-for-ai-workflow-backends/) for adjacent context.

## Workload-by-workload — which provider wins

### Storing model weights and quantized LLM checkpoints

These are typically a few GB to tens of GB per artifact, written once, pulled at every worker boot. The relevant numbers are storage cost (low) and egress cost on read (potentially high). The right pick is **R2** if your workers run on Cloudflare, **Tigris** if they run on Fly.io, and **B2 fronted by Cloudflare** if you want the lowest dollar number per stored GB and do not mind one extra hop.

### Embeddings dumps and vector backups

These tend to be large (multi-GB) and re-imported periodically. Storage is the cost driver more than egress, especially if you only restore monthly. **B2** wins here. Wasabi is fine if you respect the 90-day minimum and your churn is low.

### Generated media — images, video frames, audio

Heavy on egress. R2 or Tigris. Anything else gets expensive fast at scale.

### Scraping and HTML caches

Heavy writes, occasional reads, often short-lived files. **B2** if your retention pattern is predictable; **R2** if you want zero-egress reads when you do pull data back; **avoid Wasabi** unless you can tolerate the 90-day minimum on every object you create.

### User uploads served back to users at request time

The classic "S3 plus CDN" pattern. The cheapest legitimate stack today is **R2 served directly** or **B2 fronted by Cloudflare Cache Rules**. AWS S3 with CloudFront is the most expensive credible option in this list.

## Operational notes that matter more than the per-GB price

A few things bite AI workloads on object storage regardless of provider:

- **S3 API compatibility is not always 100%** — most SDKs work everywhere, but some uncommon endpoints (multipart upload edge cases, certain ACL semantics) differ. Test the SDK you use, not "the S3 API."
- **Eventual consistency assumptions** — modern providers (including R2) are strongly consistent for most operations; older code that assumed eventual consistency works either way.
- **Free egress is not infinite** — every "no egress fees" pitch comes with some fair-use boundary. Read the page before committing a high-traffic asset.
- **Class A vs Class B operations** — writes are 10–25× more expensive than reads on most providers. Workloads that write many small files (scraping, frame extraction) can be operations-bound before they are storage-bound.
- **Per-region cost variance** — some providers charge meaningfully more in certain regions. EU regions are sometimes cheaper than US, sometimes the reverse.

## What about S3 itself?

S3 is fine. It is well-understood, has the deepest ecosystem, and the most documented behaviour. It is also the most expensive option on this list once you account for egress, and the price-per-GB on Standard storage is not the cheapest either.

The honest reason to pick S3 in 2026 is: you are already deep in AWS, your data has to live where your compute is, or you have an enterprise commitment that makes a tier-1 vendor easier to justify than a budget alternative. None of those are about price. For AI side projects and lean production stacks, the alternatives in this article will all be cheaper for the same workload.

## A cost example, made concrete

Say you run a generation pipeline that creates and serves **500 GB of images per month**, with **5 TB of outbound traffic** because users actually look at the images.

- **AWS S3 Standard** — about $11.50 storage + about $450 egress = **roughly $460/mo**
- **Cloudflare R2** — about $7.50 storage + $0 egress (plus operations) = **under $10/mo at this scale**
- **Backblaze B2 direct** — about $3 storage + about $50 egress = **roughly $53/mo**
- **Backblaze B2 fronted by Cloudflare** — about $3 storage + $0 egress = **about $3/mo plus Cloudflare costs**
- **Wasabi** — about $3.50 storage, fair-use egress applies = **roughly $3.50/mo if within policy, more if not**
- **Tigris** — about $10 storage + $0 typical egress = **about $10/mo at this scale**

That gap is why nobody who has done the math runs heavy AI asset workloads on AWS S3 in 2026.

## FAQ

### Is R2 really $0 egress?

Yes, for egress to the public internet. There is no per-GB outbound fee. You still pay for storage and per-operation costs.

### Why is B2 cheaper than R2 if R2 has zero egress?

B2's pure storage price is lower (about $0.006/GB-month vs R2's $0.015/GB-month). If your workload mostly stores and rarely reads, B2 wins. If it reads a lot, R2 wins because B2's direct egress is $0.01/GB and that adds up.

### Can I use one of these as a drop-in replacement for S3?

For most SDK code, yes — change the endpoint and credentials and run. Test against the specific SDK and operations you use. Multipart edge cases and ACL semantics are the usual culprits when something does not behave identically.

### What about Wasabi's 90-day minimum?

It is real and it catches people. If you delete an object after 30 days, Wasabi still bills as if it stored for 90. Plan for it or pick something else for short-lived files.

### Where do I store training data versus served data?

Training data — cold, rarely accessed — B2 is hard to beat. Served data — frequently fetched by users or workers — R2 if Cloudflare-shaped, Tigris if Fly-shaped, B2 + Cloudflare if you want the absolute floor on cost.

### Are these providers fast enough for AI?

For asset serving and bulk reads, all four are fine. None of them are appropriate as a low-latency database for hot vector search — that belongs on local NVMe or in a proper vector DB. See [Vector database hosting for small AI apps](https://hostfleet.net/vector-database-hosting-small-ai-apps/).

## Final verdict

For AI workloads that involve egress, **stop using S3 first and pick second**. The cleanest defaults today are:

1. **Cloudflare R2** — default for Cloudflare-shaped stacks and anything serving generated media to users.
2. **Backblaze B2** — default for cold storage of model weights, embeddings dumps, and infrequently-accessed archives. Pair with Cloudflare for free egress at scale.
3. **Wasabi** — pick when your storage and egress pattern is predictable and you can respect the 90-day minimum.
4. **Tigris** — pick when you want modern S3-compatible global storage on Fly.io or anywhere that benefits from an edge-distributed bucket.

Three of these four will beat AWS S3 on bill for almost any real AI workload. The fourth (Tigris) will tie or beat S3 with a much cleaner global story. The only credible reason to stay on S3 in this category is incumbency.

## Sources

- Cloudflare R2 pricing — https://developers.cloudflare.com/r2/pricing/
- Backblaze B2 cloud storage pricing — https://www.backblaze.com/cloud-storage/pricing
- Bandwidth Alliance (Cloudflare + Backblaze egress) — https://www.cloudflare.com/bandwidth-alliance/
- Wasabi cloud storage pricing — https://wasabi.com/pricing
- Wasabi storage policies — https://wasabi.com/cloud-storage-pricing
- Tigris object storage pricing — https://www.tigrisdata.com/pricing/
- AWS S3 pricing — https://aws.amazon.com/s3/pricing/
- HostFleet post baseline: Vector database hosting for small AI apps — /opt/hostbot-v2/src/content/posts/vector-database-hosting-small-ai-apps.md
- HostFleet post baseline: Cheapest place to host n8n, Open WebUI, and Qdrant together — /opt/hostbot-v2/src/content/posts/cheapest-place-to-host-n8n-open-webui-qdrant.md
- HostFleet post baseline: Cloudflare Pages vs Vercel vs Netlify — /opt/hostbot-v2/src/content/posts/cf-pages-vs-vercel-vs-netlify-2026.md
- HostFleet post baseline: Railway vs Fly.io vs Render for AI workflow backends — /opt/hostbot-v2/src/content/posts/railway-vs-fly-io-vs-render-for-ai-workflow-backends.md
