---
title: "Where to host an always-on AI Telegram or Discord bot (June 2026): the honest budget map"
description: "A June 2026 guide to hosting always-on AI Telegram and Discord bots — what cheap VPS, free serverless, and managed bot platforms cost, where each breaks, and which to pick at $0, $5, and $15 per month."
pubDate: 2026-06-29
updatedDate: 2026-06-29
category: deploy-ai-apps
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. It never changes the recommendation. Rankings come from current public pricing, official platform docs, and our own deployment notes — not affiliate payouts. [Full disclosure here](https://hostfleet.net/about/).*

**Last updated:** June 29, 2026

# Where to host an always-on AI Telegram or Discord bot (June 2026)

An AI bot looks like the smallest possible deployment until you realise it actually has to **stay online**. That single constraint — always-on, listening, capable of receiving a webhook or holding a long-poll — is what turns "cheap free tier" into the most over-promised, under-delivered category in deploy-AI-apps land.

This piece is a **mixed guide**. The sourced layer is current public pricing for the obvious candidates. The estimate layer is what each home actually feels like once you put a real bot on it — one that calls an LLM, retains some user state, sometimes does retrieval, and survives a Telegram reconnect or a Discord gateway hiccup at 3am.

If you are still picking a broader AI hosting direction, start with [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/). If you are weighing serverless vs always-on more generally, the deployment companion is [Where to deploy your Lovable, Bolt, or v0 app](https://hostfleet.net/where-to-deploy-lovable-bolt-v0-apps/).

## The short answer

| Budget | Best honest home | Why |
|---|---|---|
| **$0** | Cloudflare Workers + Telegram webhooks (no Discord gateway) | Real always-on, no cold start, generous free quota; Discord gateway doesn't fit this shape |
| **~$5/mo** | Hetzner CX22 with systemd or Docker | Real Linux box, predictable, easy to add a small Postgres |
| **~$10–$15/mo** | Hostinger KVM 2 or Fly.io always-on app | Coolify-friendly box for self-hosters; Fly.io for region-spread always-on |
| **Free + dirty** | Replit, Render free tier, Glitch | Works for hobby; "free" usually means "sleeps", which kills the gateway |

Everything below is the long version. The key insight: **Telegram bots can live happily on a webhook-only serverless platform; Discord bots need a persistent gateway connection and that single fact eliminates most "free" options.**

## Why this is harder than it looks

The two main bot platforms work fundamentally differently:

- **Telegram** has clean webhook delivery. You expose one HTTPS endpoint, register it once, and Telegram pushes updates as POSTs. This fits serverless perfectly. The bot is "always on" because Telegram's servers are always on.
- **Discord** uses a persistent WebSocket gateway. Your bot must hold an open connection, send heartbeats, and re-identify after drops. Webhook-only deployments do not work for a real Discord bot.

If your AI bot is Telegram-only, you have far more options. If it touches Discord, you almost always need a persistent process on something that does not sleep. Read every "free Discord bot host" article through that lens — most of them either silently sleep or quietly assume slash-command-only bots, which still need an endpoint but not a gateway.

## The free tier honestly evaluated

The dream is "free forever, always on, takes my AI calls." It does not exist for general AI bots. What does exist:

**Cloudflare Workers (free tier)** — 100k requests/day, no cold start, real always-on for webhook-shape work. Brilliant for Telegram bots. Useless for Discord gateway bots. Use Workers KV or D1 for tiny state, and Durable Objects (paid) if the bot needs sessions per user.

**Render free tier** — spins down after inactivity, wakes on request. The Telegram webhook handler suffers a noticeable cold-start delay on every wake; the Discord gateway loses connection during sleep. Treat this as "broken by design" for production bots.

**Replit / Glitch** — same sleeping behaviour, with extra rate limits and unreliability under load. Fine for showing a friend a demo. Not fine for an always-on AI bot.

**Hugging Face Spaces** — only really makes sense if the bot is mostly a model wrapper and you accept their cold-start and queue behaviour.

The honest "free" answer for an AI bot today is: **Cloudflare Workers if Telegram-only, nothing if Discord.**

## The $5/month tier — where it gets real

Once you are willing to spend the price of a coffee per month, the playing field opens.

**Hetzner CX22 (~€4.51/mo)** is the default pick for any always-on AI bot. You get a small KVM box with 2 vCPU and 4 GB RAM, hourly cloud billing, and the ability to run anything Linux runs. You can fit:

- one Telegram bot
- one Discord bot (with persistent gateway)
- a small SQLite or Postgres for user/session state
- one cron job for periodic work
- a reverse proxy (Caddy is the painless choice)
- room for a second hobby app

That is more than enough for almost any single-developer AI bot. See [Hostinger VPS for AI side projects](https://hostfleet.net/hostinger-vps-for-ai-side-projects/) and [Best hosts for long-running agent workers](https://hostfleet.net/best-hosts-for-long-running-agent-workers/) for adjacent budget breakdowns; the same CX22 logic applies here.

**Hostinger KVM 2 (~$5.99/mo promo)** is a close second if you prefer a friendlier panel and want to prepay. Renewal pricing is roughly 2–3× the promo, which matters more for a multi-year always-on bot than for a one-off project.

**Fly.io smallest always-on** comes in around $5–$8/mo for a real always-on machine of 256 MB RAM in one region, more if you go multi-region or larger. Fly.io's model fits Discord gateway bots particularly well because of stable persistent connections and the ability to pin a single small VM. The downside is that scaling and idle policies are less obvious than on a bare VPS, and surprises tend to show up on the bill before they show up in your dashboard.

**Railway / Render paid starters** sit in the same price band. They are fine, especially for a Telegram bot wired to a webhook, but the cost-per-resource is worse than a VPS for the same workload. See [Railway vs Fly.io vs Render for AI workflow backends](https://hostfleet.net/railway-vs-fly-io-vs-render-for-ai-workflow-backends/) for the deeper comparison of these three.

## The $10–$15/month tier — comfortable headroom

If your AI bot is starting to do real work — sessions per user, retrieval against a small vector store, periodic embedding refreshes, light browser checks — the comfortable tier is **8 GB of RAM** and **predictable CPU**.

**Hetzner CX32 (~€6.85/mo)** is the default. 4 vCPU, 8 GB RAM, NVMe disk, plenty of headroom to run the bot, a small Qdrant or pgvector, and a queue worker.

**Hostinger KVM 4 (~$8.99/mo promo)** is the prepay-friendly alternative with 16 GB RAM on paper. Especially worth a look if you are also running Coolify and want a single comfortable box for several hobby services, including the bot. See [Coolify on a VPS for AI app hosting](https://hostfleet.net/coolify-on-a-vps-for-ai-app-hosting/).

**Fly.io with one shared-cpu-1x at 1 GB** plus a small Postgres ends up roughly in this band for a Discord bot with light persistent state. It is a strong "I want managed but cheap" option, especially for multi-region presence.

## Patterns that work, no matter the host

A few patterns make any choice above behave better:

1. **Use webhooks for Telegram, gateway for Discord** — do not try to make one architecture cover both. Two small processes is cheaper than fighting one runtime to do both.
2. **Externalise model calls** — never run local inference on a $5 box. Call a managed provider. See [OpenRouter vs Together vs Groq vs Fireworks vs Cerebras](https://hostfleet.net/openrouter-vs-together-vs-groq-vs-fireworks/).
3. **Persist state in something boring** — SQLite or Postgres, not in process memory. Bots restart. State that lives in RAM does not survive a deploy or a crash.
4. **Add a watchdog** — `systemd Restart=always` for VPS-hosted bots, platform health checks for managed runtimes. Discord gateway disconnects are a fact of life; auto-recovery is the only acceptable answer.
5. **Cap LLM spend at the app layer** — per-user and per-minute caps prevent a single conversation from cleaning out your model API budget overnight.

## What about purpose-built bot platforms?

There is a long tail of "host your bot for free!" services that mostly resell a small VPS slice. Some are fine; most are not transparent about their own backend, their durability, or their failure modes. If you are deploying a real AI bot — one that touches model APIs, user data, and uptime that matters — you almost always come out ahead by spending the $5 yourself on a real VPS and writing one systemd unit. The bot platform layer is unnecessary for anyone who can read this article.

The exception is if you are explicitly building inside a no-code automation tool like n8n. In that case, the bot lives wherever your n8n lives. The [Cheapest place to host n8n, Open WebUI, and Qdrant together](https://hostfleet.net/cheapest-place-to-host-n8n-open-webui-qdrant/) breakdown applies directly.

## Common failure modes to plan for

- **Cold starts on free tiers** — fatal for both Telegram webhook responsiveness and Discord gateway connections.
- **IPv6-only on cheap free tiers** — some platforms force IPv6, which causes issues for some bot SDKs and webhook delivery. Test before committing.
- **Outbound rate limits on free serverless** — making lots of model calls per webhook can trip platform limits before it trips the model provider's limits.
- **Discord gateway resume failures** — usually a bug in the bot library version or how you handle reconnects, not the host. But a host that randomly kills your process makes it worse.
- **Long-running tool calls** — many serverless platforms have a 30-second or 60-second execution cap. Long agent loops on a webhook will get cut off. Either move the long work to a queue or pick a host that supports background tasks.

## FAQ

### Can I host an AI Discord bot for free?

Realistically, no. Discord requires a persistent WebSocket gateway connection, and free tiers that sleep will drop it. Pay $5 for the smallest Hetzner box and the problem disappears.

### What is the cheapest sustainable home for a Telegram AI bot?

Cloudflare Workers free tier with webhook-style updates. Pay nothing, no cold start, no sleep. Add Workers KV or D1 for tiny state.

### Is Fly.io cheaper than Hetzner?

For a single small always-on machine, Fly.io is typically a few dollars more per month than a Hetzner CX22 for similar resources. The reason to pick Fly.io is region-spread, easy persistent volumes, or you prefer the platform model. The reason to pick Hetzner is raw cost.

### What about Vercel and Netlify?

Both target serverless functions and static deploys. They are fine for Telegram-webhook bots that finish in seconds, with the same caveats as any cold-start environment. Neither is a sensible Discord bot home. See [Cloudflare Pages vs Vercel vs Netlify](https://hostfleet.net/cf-pages-vs-vercel-vs-netlify-2026/).

### How do I keep my bot from getting expensive on model API calls?

Per-user rate limits, response length caps, and a daily ceiling enforced in your bot code. Do not rely on the model provider's account-level limits — they kick in after your wallet has already been hit.

### Where should the bot's database live?

For under 1 GB of state, SQLite on the same box is fine. Past that, a small managed Postgres (Neon, Supabase, or Hostinger's own) is the cleanest answer.

## Final verdict

For a hobbyist Telegram AI bot, **Cloudflare Workers free tier**. For anything more serious or anything Discord, **a $5 Hetzner CX22 with systemd and an external Postgres**. For a comfortable single box that can hold a bot plus Coolify plus a few other services, **a Hetzner CX32 or a Hostinger KVM 4 at promo**.

There is no honest middle ground between "free serverless webhook" and "$5 VPS with a real process." Trying to make sleepy free tiers behave like always-on bots is the most common mistake in this category and the one that produces the most rage-tweets at 3am.

## Sources

- Cloudflare Workers pricing — https://developers.cloudflare.com/workers/platform/pricing/
- Hetzner cost-optimized cloud — https://www.hetzner.com/cloud/cost-optimized
- Hostinger VPS hosting — https://www.hostinger.com/vps-hosting
- Fly.io pricing — https://fly.io/docs/about/pricing/
- Render pricing — https://render.com/pricing
- Telegram Bots API webhooks — https://core.telegram.org/bots/api#setwebhook
- Discord developer gateway docs — https://discord.com/developers/docs/topics/gateway
- HostFleet post baseline: Best hosting for AI agents on a budget — /opt/hostbot-v2/src/content/posts/best-hosting-for-ai-agents-on-a-budget.md
- HostFleet post baseline: Best hosts for long-running agent workers — /opt/hostbot-v2/src/content/posts/best-hosts-for-long-running-agent-workers.md
- HostFleet post baseline: Railway vs Fly.io vs Render for AI workflow backends — /opt/hostbot-v2/src/content/posts/railway-vs-fly-io-vs-render-for-ai-workflow-backends.md
- HostFleet post baseline: Coolify on a VPS for AI app hosting — /opt/hostbot-v2/src/content/posts/coolify-on-a-vps-for-ai-app-hosting.md
