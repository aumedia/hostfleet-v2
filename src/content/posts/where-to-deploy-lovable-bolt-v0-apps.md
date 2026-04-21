---
title: "Where to deploy your Lovable, Bolt, or v0 app: a decision guide (April 2026)"
description: "Lovable, Bolt.new, and v0 all generate working apps — but the hosting story is different for each one. A feature-by-feature guide to what each platform supports and where your code actually runs."
pubDate: 2026-04-21
category: deploy-ai-apps
author: Alex Harmon
draft: false
---

AI app builders exploded in 2024–2025 and have become real productivity tools in 2026. But once you've used Lovable, Bolt, or v0 to ship the first working version of your app, you hit the same question: **where does it actually run?** This guide is a decision tree drawn strictly from what each platform publishes on its website and docs.

> **No benchmarks here — this is a capabilities matrix.** I'm not claiming "Lovable apps are 40% faster on Vercel than on Cloudflare". Nobody could honestly claim that without publishing a methodology. This is what each platform *supports*, straight from their docs.

## The three builders at a glance

| Capability | Lovable | Bolt.new | v0 |
|---|---|---|---|
| Built-in hosting | Yes — Lovable Cloud ([docs](https://docs.lovable.dev/features/cloud)) | Yes — Bolt Cloud ([StackBlitz announcement](https://blog.stackblitz.com/posts/announcing-bolt-cloud/)) | Yes — deploys to Vercel (owned by Vercel) |
| Backend/database | Yes — Supabase integration built-in | Yes — via Bolt Cloud or user-provided | Yes — via Vercel integrations (Neon, Upstash, etc.) |
| GitHub sync | Yes — two-way sync ([Lovable GitHub docs](https://docs.lovable.dev/integrations/git-integration)) | Yes — export/import | Yes — deploy from GitHub |
| Self-host export | Yes (via GitHub) | Yes (download or push to GitHub) | Yes (via Vercel deploy) |
| Framework | React + Vite + TypeScript + Tailwind + shadcn | Full IDE — any Vite-compatible stack | Next.js only |

Sources: [Lovable docs](https://docs.lovable.dev/), [Bolt.new docs](https://support.bolt.new/), [v0 docs](https://v0.dev/docs).

## Lovable — deploy anywhere, but Supabase is sticky

Lovable generates a React + Vite + Tailwind + shadcn/ui app. The generated code lives in your Lovable workspace and can two-way sync to a GitHub repo you own. From there:

- **Stay on Lovable Cloud** — simplest; integrates with Supabase for auth and DB; custom domain supported on the paid plan. Good for MVPs and side projects.
- **Deploy to Cloudflare Pages / Vercel / Netlify** — push the synced GitHub repo, point the host at it, done. The generated app is vanilla Vite build output. You keep the Supabase backend.
- **Full self-host** — clone the repo, build locally, deploy to whatever. You'll need to host your own Supabase or swap the backend integration.

The stickiest piece is Supabase. Lovable wires up auth, database, and storage via its Supabase integration, and ripping that out is the main migration cost. If you deploy the frontend elsewhere, you still pay Supabase for the backend.

## Bolt.new — fullest IDE experience, Bolt Cloud or export

Bolt.new runs a WebContainer in your browser. It can build almost any Vite-compatible stack. For deployment, their published options per [the Bolt docs](https://support.bolt.new/) are:

1. **Bolt Cloud (V2)** — deploy directly inside Bolt. This is their newest offering and includes built-in databases, auth, storage. Announced [here](https://blog.stackblitz.com/posts/announcing-bolt-cloud/).
2. **Export to Vercel** — one-click deploy. Bolt generates a `.vercel` config and pushes.
3. **Export to Netlify** — same as Vercel, official button.
4. **Export to Cloudflare Pages** — manually; push the generated code to GitHub and connect CF Pages.
5. **Download ZIP / push to GitHub** — full escape hatch.

Bolt's real differentiator is that the IDE is the build — it's not "AI writes code, you paste it into your IDE". You iterate live, then export. If you plan to keep iterating in Bolt long term, Bolt Cloud is the lowest-friction path. If you want to hand the code to a developer team, push to GitHub and let them take over.

## v0 — Next.js + Vercel, end of story (mostly)

v0 is a Vercel product and generates Next.js code. You can:

- **Deploy to Vercel** — the default, one click, the integration is seamless.
- **Push to GitHub and deploy elsewhere** — technically supported; the generated Next.js code is valid and can be built on Cloudflare Pages (via [`@cloudflare/next-on-pages`](https://developers.cloudflare.com/pages/framework-guides/nextjs/)), Netlify (via their Next.js runtime), or self-hosted with `next build`.

Realistically, if you're using v0, you're likely already paying for Vercel Pro. Fighting the platform to deploy elsewhere is work you don't need. Export becomes useful mainly when: (a) you want the code in your team's monorepo, or (b) Vercel Hobby's commercial-use ban is a problem (see [Vercel fair-use rules](https://vercel.com/docs/limits/fair-use-guidelines)).

## Decision tree

**"I'm shipping my first side project"**
→ Stay on the builder's default. Lovable Cloud / Bolt Cloud / Vercel. You'll outgrow it before it costs you anything.

**"I need a custom domain and plan to keep iterating in the AI builder"**
→ Builder's paid tier (Lovable Cloud Pro, Bolt Pro, v0 as part of Vercel Pro).

**"This is going commercial and I want cheap bandwidth"**
→ Export to GitHub → Cloudflare Pages. Free bandwidth, $5/mo Workers for backend. (See the [CF Pages vs Vercel vs Netlify comparison](/cf-pages-vs-vercel-vs-netlify-2026/).)

**"My team will take over the code"**
→ Export to GitHub, hand off, close the AI builder subscription.

**"I need to self-host everything"**
→ All three builders let you export. Lovable gives you the cleanest Vite bundle. Bolt exports a full project. v0 exports a Next.js app. Each is a standard codebase at that point.

## What the AI builders *don't* give you

This is the part most "AI app builder" reviews skip:

- **No real observability out of the box.** You get the preview URL and a success/fail status. No APM, no error tracking, no analytics. Add Sentry, PostHog, or similar yourself.
- **No production load testing.** AI builders optimize for "the demo works". First time you get 100 concurrent users, you'll discover your Supabase row-level-security policy is wrong or your Vercel function timeouts.
- **No guarantee the generated code is maintainable.** Six months in, when the AI builder has changed its output style twice, the diff between your hand edits and the AI's regenerated code can get ugly. This is why the GitHub escape hatch matters — once you go manual, you've left the builder behind.

## What this article deliberately doesn't do

- No speed comparison across the three — that depends on what your app does, not who generated it.
- No claim that one builder "produces better code". Code quality varies more by prompt than by tool.

## Sources

- Lovable docs — https://docs.lovable.dev/
- Lovable Cloud feature page — https://docs.lovable.dev/features/cloud
- Lovable GitHub integration — https://docs.lovable.dev/integrations/git-integration
- Bolt.new support / docs — https://support.bolt.new/
- Bolt Cloud V2 announcement — https://blog.stackblitz.com/posts/announcing-bolt-cloud/
- v0 docs — https://v0.dev/docs
- Next.js on Cloudflare Pages — https://developers.cloudflare.com/pages/framework-guides/nextjs/
- Vercel fair use — https://vercel.com/docs/limits/fair-use-guidelines
