---
title: "Cloudflare Pages vs Vercel vs Netlify: pricing, limits, and gotchas (April 2026)"
description: "A source-by-source breakdown of the three biggest free-tier static + edge hosts for 2026 — what's actually free, what gets metered, and where each one bites back."
pubDate: 2026-04-21
category: edge
author: Alex Harmon
draft: false
---

If you deploy Astro, Next.js, SvelteKit, or a Vite app in 2026, you almost certainly land on Cloudflare Pages, Vercel, or Netlify. All three have free tiers. None of the free tiers mean the same thing. This article is a side-by-side of what each vendor *actually publishes* on their pricing pages as of April 2026, with links.

> **Methodology note.** Every number here is sourced from the vendor's own pricing or docs page. I have not re-benchmarked anything — you can click through every figure. Where a vendor uses fuzzy language ("generous limits", "fair use"), I say so.

## The cheat sheet

| Dimension | Cloudflare Pages (Free) | Vercel (Hobby) | Netlify (Starter) |
|---|---|---|---|
| Monthly bandwidth cap | Unlimited ([source](https://developers.cloudflare.com/pages/platform/limits/)) | 100 GB ([source](https://vercel.com/docs/limits)) | 100 GB ([source](https://www.netlify.com/pricing/)) |
| Builds per month | 500 ([source](https://developers.cloudflare.com/pages/platform/limits/)) | 6 000 build minutes ([source](https://vercel.com/docs/limits)) | 300 build minutes, credit-metered ([source](https://www.netlify.com/pricing/)) |
| Concurrent builds | 1 | 1 | 1 |
| Commercial use allowed on free tier? | Yes | **No** ([source](https://vercel.com/docs/limits/fair-use-guidelines)) | Yes |
| Custom domains | Unlimited | Unlimited | Unlimited |
| Functions included | Workers: 100k req/day ([source](https://developers.cloudflare.com/workers/platform/pricing/)) | 1M invocations, 4h Active CPU ([source](https://vercel.com/docs/limits)) | 125k function invocations ([source](https://www.netlify.com/pricing/)) |
| Entry paid tier | Workers Paid $5/mo | Pro $20 per user / mo | Pro $19/mo |

## Where each one shines

**Cloudflare Pages** is the only one with truly unmetered bandwidth on the free tier. If you have a 200 MB wasm bundle or ship big podcast MP3s, this is the only honest free option. The catch is the 500-builds-per-month ceiling and just one concurrent build — if your CI fires on every PR commit, you can blow through the monthly allowance faster than you think. Pro tier ($20/mo as of April 2026) lifts that to 5 000 builds and 5 concurrent.

**Vercel Hobby** has the best Next.js ergonomics and the most generous function budget (1M invocations + 4 Active CPU hours — Active CPU means only the time the function is actually computing, not waiting). But Hobby is explicitly **not for commercial use**: the [fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) ban selling products, running business sites, or monetizing in any way on the free tier. Pro starts at $20 per user per month, and the per-user pricing bites teams harder than it looks.

**Netlify** changed their pricing model in September 2025 to a credit system (300 free credits/month, metered consumption across builds, bandwidth, and functions). Read their [pricing page](https://www.netlify.com/pricing/) carefully — the old "100 GB bandwidth free" framing still shows up, but consumption is now a unified credit bucket. This is flexible if you have bursty workloads but harder to reason about if you want hard caps.

## The gotchas nobody mentions in the marketing

1. **Vercel Hobby forbids commercial use.** Even a portfolio site running a Stripe checkout counts. See the [fair use docs](https://vercel.com/docs/limits/fair-use-guidelines). People do violate this and get away with it for a while, but you can get suspended without warning.
2. **Cloudflare Pages free tier has a 25 MB per file limit** on the built output ([source](https://developers.cloudflare.com/pages/platform/limits/)). If you're shipping a big video asset or a wasm binary, you'll hit this before you hit the bandwidth cap.
3. **Netlify's credit system is non-obvious.** Build minutes, bandwidth, and serverless invocations now all drain from the same 300-credit bucket. Very hard to predict your bill if you don't instrument it.
4. **Vercel function timeouts default to 10 seconds on Hobby, 15 on Pro** ([source](https://vercel.com/docs/functions/configuring-functions/duration)). If you're doing any LLM streaming, you'll need Edge Functions or move to Pro.
5. **Cloudflare Workers paid tier is $5/mo, not $20.** This is the cheapest way to get a production-ready edge function platform in 2026. Bundled with Pages, it's hard to beat.

## My recommendation as of April 2026

For a static marketing site or blog with occasional forms: **Cloudflare Pages free + Workers Paid $5/mo** covers 95% of what a small team needs. This is exactly what hostfleet.net runs on.

For a Next.js app where you want zero-config: **Vercel Pro** if it's a real product, otherwise Cloudflare Pages with `@astrojs/vercel` or `@cloudflare/next-on-pages`.

For a team that wants to self-host eventually: **Netlify** remains the most portable (standard build output, not locked into one runtime), but be ready to migrate the moment your credit usage gets weird.

## What this article deliberately doesn't do

This is a pricing comparison, not a performance one. I have not re-run Lighthouse scores, Core Web Vitals, or cold-start benchmarks across the three, because (a) those results are heavily workload-dependent and (b) every other blog on the internet is already publishing made-up numbers on this. If you want to benchmark for your workload, use [WebPageTest](https://www.webpagetest.org/) on your own deployed URLs and share the public result links — that's the only honest way to do it.

## Sources

- Cloudflare Pages limits — https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Workers pricing — https://developers.cloudflare.com/workers/platform/pricing/
- Vercel limits — https://vercel.com/docs/limits
- Vercel fair-use guidelines — https://vercel.com/docs/limits/fair-use-guidelines
- Vercel function duration — https://vercel.com/docs/functions/configuring-functions/duration
- Netlify pricing — https://www.netlify.com/pricing/
