---
title: "Where to host MCP servers for small teams (June 2026)"
description: "For most small teams, the right MCP hosting answer starts by not hosting personal stdio servers at all. Use Railway for the default shared HTTP case, Cloudflare for thin stateless tools, Render or Fly for always-on services, and Hetzner when you want full control."
pubDate: 2026-06-08
updatedDate: 2026-06-08
category: deploy-ai-apps
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This article is mostly source-backed, with a small workload-fit estimate layer called out explicitly where provider docs stop and operating judgment starts.*

**Last updated:** June 8, 2026

# Where to host MCP servers for small teams

If you are asking **where to host MCP servers for small teams**, the first honest answer is that some MCP servers should not be hosted at all. This is a **mostly source-backed** guide built from the current MCP transport and authorization specifications, current Railway, Cloudflare, Render, Fly.io, and Hetzner docs, plus HostFleet's AI-hosting notes. The estimate layer is narrow and explicit: it covers which hosting shape is a sane fit once the raw product facts are on the table.

The distinction that matters is transport:

- local `stdio` servers are subprocesses launched by the client and usually belong on one user's machine
- shared team servers are usually HTTP endpoints and need real hosting, auth, logging, and restart behavior
- browser-heavy, stateful, or queue-backed MCP tools stop being "cheap edge functions" very quickly

The assumptions for this guide are simple:

- the team wants a remote MCP server over Streamable HTTP, not a one-user local helper
- the server mostly calls APIs, internal services, or small databases rather than doing local GPU inference
- concurrency is modest, but reliability matters enough that silent restarts and auth gaps are real problems
- the team is optimizing for practical cost and operational sanity, not enterprise procurement

If your MCP server is part of a broader AI app hardening project, the closest companion read is [What breaks when AI-generated apps hit production](https://hostfleet.net/ai-generated-app-production-footguns/). If the surrounding product started life in Lovable, Bolt, or v0, the migration context is [Where to deploy your Lovable, Bolt, or v0 app](https://hostfleet.net/where-to-deploy-lovable-bolt-v0-apps/). And if the workload is drifting toward local inference instead of pure tool orchestration, start with [Every serverless GPU host compared](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/).

## The short answer

| What you actually need | Best fit | Real floor | Why it wins | Main catch |
|---|---|---:|---|---|
| One developer's local MCP helper | **Do not host it** | **$0** | The MCP spec treats `stdio` as a subprocess pattern, not a shared web service | It is not a team-shared endpoint |
| Default managed home for a team-shared MCP backend | **Railway Hobby** | **$5/month plus usage** | Best balance of HTTP services, workers, and private internal networking | Usage-based bills punish sloppy idle architecture |
| Cheap stateless HTTP MCP endpoint | **Cloudflare Workers Paid** | **$5/month** | Clean fit for thin API wrappers with long-lived HTTP requests | 128 MB memory and 6 simultaneous outgoing connections per request |
| Fixed-price managed always-on service | **Render Starter** | **$7/month** | Easy way to run one small shared service or background worker | Disks disable zero-downtime deploys and multi-instance scaling on that service |
| Cheapest credible always-on process | **Fly.io shared-cpu-1x** | **$3.19/month at 512 MB** | Lowest realistic floor for a continuously running process | Persistent storage is local and not automatically replicated |
| Cheapest serious self-host lane | **Hetzner CX33** | **EUR 6.49/month** | Full Linux box, private networking, and real headroom at a budget price | You own patching, backups, and recovery |

My practical verdict is straightforward: **most small teams should keep personal `stdio` tools local, start with Railway for shared HTTP MCP servers, use Cloudflare only for thin stateless tools, and drop to Render, Fly.io, or Hetzner only when they know why they need that shape.**

## First decision: do not host a `stdio` server just because it says "server"

The MCP transports spec is explicit about `stdio`: the client launches the MCP server as a subprocess and communicates over standard input and output. The authorization spec is just as explicit that HTTP authorization rules should not be applied to `stdio` transports, which should retrieve credentials from the environment instead.

That means a lot of "MCP server hosting" questions are really design questions:

- if one user needs local access to GitHub, Slack, Jira, Postgres, or the file system, keep it local
- if a team needs one shared endpoint with stable auth and shared tool behavior, use HTTP and host it properly
- if you are exposing a remote MCP endpoint, treat it like backend infrastructure, not like a throwaway plugin

This is the most common wrong turn in MCP deployments. Teams take a helper that should have stayed local, wrap it in HTTP, and then inherit every auth and reliability problem they were trying to avoid.

## The transport and auth rules change the hosting answer

The infrastructure shape is not just "which host can open a port." The current MCP docs turn remote hosting into a security and operational question.

The transport spec says Streamable HTTP servers should:

- validate the `Origin` header
- prefer localhost binding when they are local-only
- implement proper authentication for all connections

The authorization spec is even more opinionated for HTTP-based MCP:

- authorization is optional overall, but HTTP transports should follow the spec when they support it
- protected MCP servers must publish protected resource metadata
- clients must discover the authorization server from that metadata
- unauthorized requests should use `WWW-Authenticate` to point clients at the right metadata URL

In practical terms, that means the best MCP host is the one that makes these things boring:

- a stable HTTPS endpoint
- one clear auth story
- logs you can inspect
- predictable restart behavior
- state that survives process restarts when the server depends on it

This is why "cheapest thing with a public URL" is not a serious answer.

## 1. Railway is the best default managed host for team-shared MCP servers

Railway is still the cleanest first recommendation for a small team because its own docs are already organized around the exact backend patterns MCP servers often need: HTTP services, background workers, cron jobs, and queues in the same project.

Current public facts from Railway's docs and pricing pages:

- Hobby is **$5/month with included usage**
- Pro is **$20/month per seat**
- Railway bills CPU, memory, disk, and bandwidth usage separately from the plan fee
- pricing is usage-based and billed **per second**
- Railway's guide explicitly separates cron jobs, always-on workers, and queue-backed workers
- private service-to-service networking is part of the platform model

That shape fits MCP work well when the server is more than one file:

- one HTTP MCP endpoint
- one worker for long-running or queued tool execution
- one Redis or Postgres service
- one small team that wants deploy speed more than the absolute lowest raw compute bill

Why Railway wins for most teams:

- it is the most natural home for a remote Streamable HTTP server that may need a worker beside it
- private networking is already part of how Railway wants you to structure services
- the monthly floor is low enough to trial a real shared deployment without buying a VPS first

The caution is the same caution I would give for agent backends in general: Railway is cheap when the architecture is disciplined. It gets noticeably less cheap when you leave multiple services idling, oversize memory, or let preview environments and sidecars pile up.

## 2. Cloudflare Workers is the right answer for thin stateless MCP endpoints, not for everything

Cloudflare Workers is appealing because the paid floor is **$5/month** and the platform is unusually good at globally reachable HTTP endpoints. The limits docs make the fit much clearer than the homepage marketing:

- memory per isolate is **128 MB**
- simultaneous open connections are capped at **6 per request**
- the Workers Paid plan can raise CPU time to **5 minutes**
- incoming HTTP requests have **no hard wall-time limit while the client remains connected**
- the free Workers plan includes **100,000 requests per day**

That is enough for:

- lightweight shared tools that mostly proxy to other APIs
- auth-gated wrappers around internal services
- small retrieval or formatting tools where the real state lives elsewhere
- MCP endpoints that stream a response but do not need large in-memory state

That is a worse fit for:

- browser automation
- large local indexes
- tools that fan out across many upstream connections
- server designs that assume a normal always-on process with a writable local runtime footprint

My honest read is that Cloudflare is the best answer when the MCP server is really an edge-friendly HTTP adapter. It is the wrong answer when the team secretly needs a small application server.

## 3. Render is the cleanest fixed-price managed option when you want one obvious always-on service

Render matters because some small teams do not want usage-metered uncertainty or Fly.io sharp edges. They want one small always-on managed service with a price they can explain easily.

Current public facts from Render's pricing and product docs:

- workspace pricing is now separate from compute pricing
- paid web services, private services, and background workers start at **$7/month** on Starter
- free web services spin down after **15 minutes** idle and do not have a free worker equivalent
- background workers are intended for continuous async processing
- persistent disks cost **$0.25/GB-month**
- a service with an attached disk loses zero-downtime deploys and cannot scale to multiple instances

Render is a good fit when:

- the MCP server should just stay alive all the time
- the team wants simpler managed operations than Fly.io or a VPS
- the service shape is straightforward enough that one always-on service or one worker is the main requirement

Render is a weaker fit when the architecture gets disk-heavy, or when you need the lowest possible always-on bill rather than the cleanest product boundary.

## 4. Fly.io is the cheapest credible always-on home for a remote MCP process

Fly.io still matters because it gives you a genuinely low floor for an always-on process instead of nudging you into a heavier app-platform bundle.

Current published prices for shared-cpu-1x Machines are:

- **256 MB: $1.94/month**
- **512 MB: $3.19/month**
- **1 GB: $5.70/month**
- **2 GB: $10.70/month**

Fly's docs also make the real caveats plain:

- all organizations require a **credit card on file**
- stopped Machines still bill for root file system storage
- the root file system is ephemeral
- volumes are local to one Machine and are **not automatically replicated**

This is where the estimate layer belongs: **256 MB is too cramped for most real remote MCP servers once you add SDKs, auth middleware, logging, and a little concurrency.** The first size I would recommend with a straight face is **512 MB**, and **1 GB** is the safer default if the server does anything beyond light API mediation.

Fly is the right fit when you want:

- one normal always-on process
- region placement control
- a lower monthly floor than Render or a bigger managed platform
- externalized state rather than a lot of local persistence

Fly gets worse quickly if the team expects local-disk behavior to feel like managed durable infrastructure. It does not.

## 5. Hetzner is the best cheap self-host lane when the team wants full control

Hetzner belongs here because some small teams really do want one Linux box, private networking, full reverse-proxy control, and the lowest serious monthly bill.

Hetzner's current cost-optimized cloud line positions itself for low to medium traffic workloads and still gives a real amount of machine for the price. The current pricing data puts **CX33 at EUR 6.49/month** in Nuremberg and Helsinki.

For this topic, the exact smallest plan is less important than the operating shape. A team-shared remote MCP server often wants:

- a reverse proxy and TLS termination
- one private network path to internal services
- one auth layer or access gateway
- one or more worker processes beside the MCP endpoint
- enough RAM that SDKs, logs, and caches do not constantly fight each other

That is why the self-host answer here is a real small server, not the tiniest teaser box on a landing page.

Choose Hetzner if:

- the team is comfortable owning Linux
- you want the lowest serious monthly bill for a custom private setup
- you care more about control and price efficiency than platform convenience

Skip Hetzner if:

- nobody on the team wants patching, backups, and restart ownership
- the team really wants a managed platform and is using "self-host" only because the landing-page number looks low
- you want built-in collaboration and service abstractions more than a cheap machine

## The mistake small teams keep making

The biggest mistake is not cost. It is shape mismatch.

Teams pick Cloudflare because $5 sounds cheap when what they really need is a small always-on app server. Or they pick a VPS because it feels serious when the MCP server is really just a thin HTTP wrapper that could have lived happily on a managed edge runtime. Or they remote-host a local-only `stdio` helper and create an auth problem they never needed.

The honest sequence is:

1. Decide whether the MCP server is local `stdio` or shared HTTP.
2. Decide whether the shared HTTP server is stateless, always-on, or private-network-heavy.
3. Then buy the host that matches that shape.

That sounds obvious. It is still where most wasted hosting spend starts.

## FAQ

### Do small teams need to host every MCP server remotely?

No. If the tool is personal, machine-local, or tied to one user's credentials and workstation context, `stdio` is usually the better answer.

### What is the best managed host for a shared MCP server?

For most small teams, **Railway Hobby** is the cleanest default because it fits HTTP services, workers, and small queue-backed backends without making you manage a VPS first.

### Can Cloudflare Workers host any MCP server?

No. The **128 MB memory limit** and **6 simultaneous outgoing connections per request** make it a poor fit for heavier, stateful, or browser-like tools even though the floor price looks attractive.

### What is the cheapest always-on option?

In this sourced set, **Fly.io at 512 MB** is the cheapest always-on floor I would recommend seriously for a remote MCP service. Anything smaller is usually false economy.

### When should a small team self-host on Hetzner?

When the team wants private networking, reverse-proxy control, and the lowest serious monthly bill for a full custom setup, and is actually willing to own Linux operations.

## Final verdict

If I had to compress the decision into one sentence, it would be this: **host MCP servers only when they are truly team-shared HTTP backends, then match the host to whether the workload is stateless, always-on, or self-hosted private infrastructure.**

The practical order for most small teams is:

1. Keep personal tools on `stdio` and do not host them.
2. Start with **Railway** for the default managed shared-server case.
3. Use **Cloudflare Workers** only for thin stateless HTTP MCP tools.
4. Use **Render** when you want a fixed-price managed always-on service.
5. Use **Fly.io** when you need the cheapest always-on process.
6. Use **Hetzner** when you want the cheapest serious self-hosted box and accept the operational burden.

That is the honest hosting ladder for small-team MCP deployments in June 2026.

## Sources

- MCP transports specification - https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
- MCP authorization specification - https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- Railway pricing - https://railway.com/pricing
- Railway guide: cron jobs, workers, and queues - https://docs.railway.com/guides/cron-workers-queues
- Cloudflare Workers pricing - https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Workers limits - https://developers.cloudflare.com/workers/platform/limits/
- Render pricing - https://render.com/pricing
- Render background workers docs - https://render.com/docs/background-workers
- Render persistent disks docs - https://render.com/docs/disks
- Fly.io pricing - https://fly.io/docs/about/pricing/
- Hetzner cost-optimized cloud - https://www.hetzner.com/cloud/cost-optimized/
- Hetzner cloud pricing data - https://www.hetzner.com/_resources/app/data/bench/cloud_data.json
- HostFleet provider list - /opt/hostbot/data/ai-hosting/providers.csv
- HostFleet experiment backlog - /opt/hostbot/data/ai-hosting/experiment-backlog.md
- HostFleet note: Railway pricing and operational limits - /opt/hostbot/data/ai-hosting/notes/2026-05-28-railway-pricing-limits.md
- HostFleet note: Fly.io pricing and operational limits - /opt/hostbot/data/ai-hosting/notes/2026-06-01-flyio-pricing-limits.md
- HostFleet note: Render pricing and operational limits - /opt/hostbot/data/ai-hosting/notes/2026-06-08-render-pricing-limits.md
- HostFleet post baseline: What breaks when AI-generated apps hit production - /opt/hostbot-v2/src/content/posts/ai-generated-app-production-footguns.md
- HostFleet post baseline: Where to deploy your Lovable, Bolt, or v0 app - /opt/hostbot-v2/src/content/posts/where-to-deploy-lovable-bolt-v0-apps.md
- HostFleet post baseline: Every serverless GPU host compared - /opt/hostbot-v2/src/content/posts/serverless-gpu-pricing-matrix-2026.md
