---
title: "Where to host MCP servers for small teams (May 2026)"
description: "Where to host MCP servers for small teams in 2026: keep personal stdio servers local, use Railway for the default managed case, Cloudflare for thin HTTP tools, and Fly.io or Hetzner when you need always-on control."
pubDate: 2026-06-08
updatedDate: 2026-07-10
category: deploy-ai-apps
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This article is mostly source-backed, with a small workload-fit estimate layer called out explicitly where the provider docs stop.*

**Last updated:** July 10, 2026

# Where to host MCP servers for small teams

If you are asking **where to host MCP servers for small teams**, the first honest answer is that some MCP servers should not be hosted at all. This is a **mostly source-backed** deployment guide built from the current MCP transport and authorization specifications plus current Cloudflare, Railway, Fly.io, and Hetzner docs. The estimate layer is narrow: it covers which hosting shape fits a small team's likely workload once the raw product facts are on the table.

The distinction that matters is transport:

- local `stdio` servers are subprocesses launched by the client and usually belong on one user's machine
- shared team servers are usually HTTP endpoints and need real hosting, auth, logging, and restart behavior
- browser-heavy, stateful, or queue-backed MCP tools stop being "cheap edge functions" very quickly

The assumptions for this guide are simple:

- the team wants a remote MCP server over Streamable HTTP, not a one-user local helper
- the server mostly calls APIs, internal services, or small databases rather than doing local GPU inference
- concurrency is modest, but reliability matters enough that silent restarts and auth gaps are real problems
- the team is optimizing for practical cost and operational sanity, not enterprise procurement

If you need the broader hosting market before picking an MCP shape, start with [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/). If the MCP server is part of a larger AI app stack, the operational companion is [What breaks when AI-generated apps hit production](https://hostfleet.net/ai-generated-app-production-footguns/). If the underlying product began life in Lovable, Bolt, or v0, the migration context is [Where to deploy your Lovable, Bolt, or v0 app](https://hostfleet.net/where-to-deploy-lovable-bolt-v0-apps/).

## The short answer

| What you actually need | Best fit | Real floor | Why it wins |
|---|---|---:|---|
| One developer's local MCP helper | **Do not host it** | **$0** | The MCP spec treats `stdio` as a subprocess pattern, not a shared web service |
| Default managed home for a team-shared MCP backend | **Railway Hobby** | **$5/month plus usage** | Best balance of private networking, workers, and low-friction deploys |
| Cheap stateless HTTP MCP endpoint | **Cloudflare Workers Paid** | **$5/month** | Request-based pricing, long HTTP duration, and a clean fit for thin API wrappers |
| Cheapest always-on small remote server | **Fly.io shared-cpu-1x** | **$3.32/month in Fly's Amsterdam table plus storage** | Lowest credible floor for an always-on process with region choice |
| Cheap self-hosted box with private networking | **Hetzner CX33** | **€8.49/month in NBG1/HEL1** | 8 GB RAM, 80 GB SSD, firewall and private-network features at a real budget price |

My practical verdict is straightforward: **most small teams should start with Railway for shared HTTP MCP servers, keep Cloudflare Workers for thin stateless tools, and only drop to Fly.io or Hetzner when they know why they need always-on process control or self-hosted networking**.

## First decision: do not host a `stdio` server just because it says "server"

The MCP transport spec is plain about `stdio`: the client launches the MCP server as a subprocess and communicates over standard input and output. The authorization spec is just as plain that HTTP authorization rules should not be applied to `stdio` transports, which should retrieve credentials from the environment instead.

That means a lot of "MCP server hosting" questions are really design questions:

- if one user needs local access to GitHub, Slack, Jira, Postgres, or the file system, keep it local
- if a team needs one shared endpoint with stable auth and shared tool behavior, use HTTP and host it properly
- if you are exposing a remote MCP endpoint, treat it like backend infrastructure, not like a throwaway plugin

This matters because the hosting wrong-turn is common: teams take a local helper that should have stayed `stdio`, wrap it in HTTP, and then inherit all the auth and reliability work they were trying to avoid.

## Option 1: Railway is the best default managed host for team-shared MCP servers

Railway is the cleanest first recommendation for a small team because its docs are already organized around the exact backend patterns MCP servers often need: HTTP services, background workers, cron jobs, and queues.

Current product facts from Railway's docs and pricing pages:

- Hobby is **$5/month with included usage**
- Pro is **$20/month per seat**
- usage is billed per second for CPU, memory, disk, and egress
- Railway's architecture guide explicitly separates cron jobs, always-on workers, and queue-backed workers
- private networking is available between services in one project

That shape fits MCP work well when the server is more than a single file:

- one HTTP MCP endpoint
- one worker for long-running or queued tool execution
- one Redis or Postgres service
- one small team that wants deploy speed more than raw lowest compute cost

Why Railway wins for most teams:

- it is the most natural home for a remote Streamable HTTP server that may need a worker beside it
- private service-to-service networking is built into the platform model
- the pricing starts low enough to trial a real deployment without buying a VPS and doing all the Linux work first

The caution is the same caution I would give for agent backends in general: Railway is cheap when the architecture is disciplined. It becomes much less cheap when you leave multiple services idling, attach too many add-ons, or drift into platform sprawl.

## Option 2: Cloudflare Workers is the right answer for thin stateless MCP endpoints, not for everything

Cloudflare Workers is appealing because the paid floor is only **$5/month**, the free plan includes **100,000 requests/day**, and HTTP-triggered Workers have **no hard duration limit** as long as the client stays connected. That combination makes it a real option for some MCP servers, especially the ones that are mostly request routing, auth checks, and upstream API calls.

The limits page is where the fit becomes clearer:

- memory is capped at **128 MB**
- simultaneous outgoing connections are capped at **6 per request**
- paid Workers can raise CPU time per HTTP request up to **5 minutes**
- free Workers only get **10 ms CPU** per request

That is enough for:

- lightweight shared tools that mostly proxy to other APIs
- auth-gated wrappers around existing internal services
- small retrieval or formatting tools where the real state lives elsewhere
- MCP endpoints that stream a response but do not need big in-memory state

That is a worse fit for:

- browser automation
- large local indexes
- tools that need many concurrent upstream connections
- processes that assume a normal always-on server with a writable local runtime footprint

My honest read is that Cloudflare is the best answer when the MCP server is really an edge-friendly HTTP adapter. It is the wrong answer when the team secretly needs a small application server.

## Option 3: Fly.io is the cheapest credible always-on home for a remote MCP process

Fly.io matters because it gives you a genuinely low floor for an always-on process instead of nudging you into a bigger app-platform bundle.

Current published prices for shared-cpu-1x Machines in Fly's Amsterdam table are:

- **256 MB: $2.02/month**
- **512 MB: $3.32/month**
- **1 GB: $5.92/month**
- volumes are **$0.15/GB-month**
- all organizations require a **credit card on file**

This is where I would put the estimate layer clearly on the table: **256 MB is too cramped for most real remote MCP servers once you add SDKs, auth middleware, logging, and a few concurrent requests.** The first size I would treat as credible is **512 MB**, and **1 GB** is the safer default if the server does anything beyond very light API mediation.

Fly is the right fit when you want:

- one normal always-on process
- region placement control
- a persistent volume for small local state
- a lower monthly floor than a more bundled managed platform

Fly is less attractive if the team wants the easiest beginner experience or a polished multi-service control plane. It is a sharper tool. That is not a flaw, but it is a real tradeoff.

## Option 4: Hetzner is the best cheap self-host lane when the team wants private networking and full control

Hetzner's cost-optimized cloud line is one of the few places where self-hosting still has a meaningfully lower monthly floor without turning into obvious junk. The current cost-optimized page says the line is aimed at **low to medium traffic**, uses **older but reliable hardware generations**, and includes API, networks, and firewalls. Hetzner's public cloud pricing data lists **CX33 at €8.49/month** in **NBG1 and HEL1**.

For this topic, that matters more than the absolute cheapest instance on the site. A team-shared MCP server often wants:

- a reverse proxy and TLS termination
- one private network path to internal services
- one auth layer such as an OAuth-aware proxy or another access gateway
- one or more worker processes running beside the MCP endpoint
- enough RAM that logs, SDKs, and caches are not constantly fighting each other

That is why the self-host answer here is **CX33**, not the tiniest box. The point is not to win a landing-page price contest. The point is to have enough headroom for a real team-shared tool server.

Choose Hetzner if:

- the team is comfortable owning Linux
- you want the lowest serious monthly bill for a full private setup
- you need private networking and firewall control more than platform convenience

Skip Hetzner if:

- nobody on the team wants patching, backups, and restart ownership
- the server needs formal team governance features more than raw cheap compute
- you are choosing self-hosting only because the product page number looks low

## The transport and auth rules change the hosting answer

The MCP authorization spec matters here because HTTP hosting is not just "make the process reachable." If you support authorization on an HTTP-based MCP server, the spec expects an OAuth-style flow with protected resource metadata, authorization server metadata discovery, and `WWW-Authenticate` behavior on unauthorized requests.

The transport spec also adds a basic security warning for Streamable HTTP servers:

- validate the `Origin` header
- prefer localhost binding when local-only
- implement proper authentication for all connections

In practice, that means your hosting choice should make these things easy:

- a stable HTTPS endpoint
- one clear auth story
- logs you can actually inspect
- predictable restart behavior
- state that survives process restarts when the server depends on it

This is why the answer is not just "pick the cheapest place that can open a port."

## The mistake small teams make

The most common mistake is not cost. It is shape mismatch.

Teams pick Cloudflare because $5 sounds cheap when what they really need is a small always-on app server. Or they pick a VPS because it feels "serious" when the server is really just a thin API wrapper that could have lived happily on a managed edge runtime. Or they remote-host a local-only `stdio` helper and create an auth problem they never needed.

The honest sequence is:

1. Decide whether the MCP server is local `stdio` or shared HTTP.
2. Decide whether the shared HTTP server is stateless, always-on, or private-network heavy.
3. Then buy the host that matches that shape.

## FAQ

### Do small teams need to host every MCP server remotely?

No. If the tool is personal, machine-local, or tied to one user's credentials and workstation context, `stdio` is usually the better answer.

### What is the best managed host for a shared MCP server?

For most small teams, **Railway Hobby** is the cleanest default because it fits HTTP services, workers, and small queue-backed backends without making you manage a VPS first.

### Can Cloudflare Workers host any MCP server?

No. The **128 MB memory limit** and **6 simultaneous outgoing connections per request** make it a poor fit for heavier, stateful, or browser-like tools even though the pricing looks attractive.

### What is the cheapest always-on option?

In this sourced set, **Fly.io at 512 MB** is the cheapest always-on floor I would recommend with a straight face. Anything smaller is usually false economy for a shared remote server.

### When should a small team self-host on Hetzner?

When the team wants private networking, reverse-proxy control, and the lowest serious monthly bill for a full custom setup, and is actually willing to own Linux operations.

## Final verdict

If I had to compress the decision into one sentence, it would be this: **host MCP servers only when they are truly team-shared HTTP backends, then match the host to whether the workload is stateless, always-on, or self-hosted private infrastructure.**

The practical order for most small teams is:

1. Keep personal tools on `stdio` and do not host them.
2. Start with **Railway** for the default managed shared-server case.
3. Use **Cloudflare Workers** only for thin stateless HTTP MCP tools.
4. Use **Fly.io** when you need the cheapest always-on process.
5. Use **Hetzner** when you want the cheapest serious self-hosted box and accept the operational burden.

That is the honest hosting ladder for small-team MCP deployments in July 2026.

## Sources

- MCP transports specification - https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
- MCP authorization specification - https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- Railway pricing - https://railway.com/pricing
- Railway guide: cron jobs, workers, and queues - https://docs.railway.com/guides/cron-workers-queues
- Cloudflare Workers pricing - https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Workers limits - https://developers.cloudflare.com/workers/platform/limits/
- Fly.io pricing - https://fly.io/docs/about/pricing/
- Hetzner cost-optimized cloud - https://www.hetzner.com/cloud/cost-optimized/
- Hetzner cloud pricing data - https://www.hetzner.com/_resources/app/data/bench/cloud_data.json
- HostFleet provider list - /opt/hostbot/data/ai-hosting/providers.csv
- HostFleet experiment backlog - /opt/hostbot/data/ai-hosting/experiment-backlog.md
- HostFleet content calendar - /opt/hostbot/data/content_calendar.csv
- HostFleet post baseline: Best hosting for AI agents on a budget - /opt/hostbot-v2/src/content/posts/best-hosting-for-ai-agents-on-a-budget.md
- HostFleet post baseline: What breaks when AI-generated apps hit production - /opt/hostbot-v2/src/content/posts/ai-generated-app-production-footguns.md
- HostFleet post baseline: Where to deploy your Lovable, Bolt, or v0 app - /opt/hostbot-v2/src/content/posts/where-to-deploy-lovable-bolt-v0-apps.md
