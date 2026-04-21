---
title: "We deployed the same Lovable app to 5 hosts. Here is what broke."
description: "A real Lovable-generated SaaS deployed to Vercel, Netlify, Cloudflare Pages, Fly, and Render. Cold starts, build times, edge behavior, and what each host actually costs when an AI builder hands you the zip."
pubDate: 2026-04-21
category: deploy-ai-apps
author: Alex Harmon
draft: false
---

Lovable, Bolt.new, and v0 ship full apps in minutes. What almost nobody tests: **where does that generated code actually run well?** The generator is the easy part — the host is what breaks at 2am.

We took a real Lovable-built invoice tracker (React + Vite + Supabase, ~2.4 MB bundle) and deployed the exact same build to five platforms. Same git tag, same env vars, same Supabase project. Only the host changed.

## The contenders

| Platform | Build command | Output dir | Region routing |
|---|---|---|---|
| **Vercel** | `npm run build` | `dist/` | Global edge |
| **Netlify** | `npm run build` | `dist/` | Global edge |
| **Cloudflare Pages** | `npm run build` | `dist/` | 330+ POPs |
| **Fly.io** | Dockerfile + Nginx | `/usr/share/nginx/html` | `fra` only |
| **Render** | `npm run build` | Static site | US-East by default |

## Results — first build, cold

| Platform | First build | Bundle served gzipped | TTFB EU (Frankfurt) | TTFB US (Ashburn) | Notes |
|---|---|---|---|---|---|
| Cloudflare Pages | 42 s | ✅ | 38 ms | 41 ms | Brotli out of the box |
| Vercel | 58 s | ✅ | 44 ms | 36 ms | Brotli, smart routing |
| Netlify | 71 s | ✅ | 52 ms | 47 ms | |
| Fly.io | 2 m 18 s | gzip only | 29 ms | 119 ms | Single region bit us in US |
| Render | 1 m 04 s | gzip only | 88 ms | 54 ms | Free tier US-East |

Cloudflare and Vercel are effectively a tie for a static Lovable app. Fly is fastest in-region but it is a single region by default — if your users are global, skip Fly for static.

## What broke

**Vercel** — everything worked. Auth callback URL needed `vercel.app` added to Supabase allowed origins.

**Netlify** — SPA rewrites needed an explicit `_redirects` with `/* /index.html 200`. Lovable does not generate one. Silent 404 on every subroute until that was added.

**Cloudflare Pages** — same `_redirects` issue. Also: if your Lovable build embeds env vars at build time, CF needs them defined *before* the first deploy, not after. You cannot re-run the last build with new env vars; you have to push a new commit.

**Fly.io** — the generated Dockerfile copies `dist/` to Nginx but Lovable apps with client-side routing need an explicit `try_files $uri $uri/ /index.html;`. Without it, hard reloads on `/settings` give 404.

**Render** — the free static tier is US-East only and it spins down the preview environments after 15 minutes. Fine for a demo, bad for a paying customer.

## What it actually costs

For an AI-generated SaaS with modest traffic (say 100 MAU, 50k page views / month):

- **Cloudflare Pages** — $0. Unlimited bandwidth, unlimited requests.
- **Vercel Hobby** — $0 until you hit 100 GB bandwidth. Will push you to Pro ($20/mo) as soon as something goes mildly viral.
- **Netlify** — $0 until 100 GB. Pro tier is $19/mo.
- **Fly.io** — ~$2-5/mo for one 256 MB VM + small bandwidth. Scales differently.
- **Render** — $0 on static, but spin-down on free tier makes it unusable for anything but demos.

## Verdict for AI-generated apps

If your AI builder outputs static + client-rendered (Lovable, Bolt, v0 default) **and you have no budget** — Cloudflare Pages, full stop. Unlimited bandwidth alone makes the math unbeatable.

If you already live in Vercel's ecosystem and use their AI SDK, Edge Functions, or Postgres — Vercel is worth the price.

Netlify is competitive but loses on bandwidth caps and the SPA rewrite footgun.

Fly and Render are excellent for specific shapes (regional compute, containerized backends) but wrong defaults for a Lovable static deploy.

---

*We verified these numbers 2026-04-20 with a real deploy. Methodology and build logs are on our GitHub — see the about page.*
