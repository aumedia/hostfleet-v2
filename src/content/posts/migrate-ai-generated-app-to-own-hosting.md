---
title: "How to move an AI-generated app off the builder and into your own stack (May 2026)"
description: "A practical migration guide for moving a Lovable, Bolt, or v0 app into your own stack without replatforming everything at once. Covers code export, frontend hosting, sticky backend services, secrets, and cutover order."
pubDate: 2026-05-31
updatedDate: 2026-05-31
category: deploy-ai-apps
author: Alex Harmon
draft: false
---
*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This article is mostly source-backed, with a narrow estimate layer around migration effort and lowest-rewrite hosting choices where the vendor docs stop.*

**Last updated:** May 31, 2026

# How to move an AI-generated app off the builder and into your own stack

If you need to **migrate an AI-generated app to your own hosting**, the mistake is trying to move code, hosting, auth, storage, database, secrets, and observability in one jump. This is a **mostly source-backed** migration guide built from current Lovable, Bolt, v0, Cloudflare, Vercel, and Netlify docs, plus HostFleet's existing deployment baseline. The estimate layer is limited and explicit: it covers which first move usually creates the least rewrite pain once the documented platform facts are on the table.

The assumptions for this guide are simple:

- the app began in Lovable, Bolt, or v0 and now needs normal Git ownership and non-builder operations
- the team wants to reduce platform dependency without turning one migration into a full rewrite
- the app may keep its current backend temporarily while the frontend and deploy workflow move first
- the goal is production control and portability, not a purity contest about self-hosting every component immediately

If you are still deciding *where* the app should run, start with [Where to deploy your Lovable, Bolt, or v0 app](https://hostfleet.net/where-to-deploy-lovable-bolt-v0-apps/). If the app is already live and you need the operational cleanup list, pair this with [What breaks when AI-generated apps hit production](https://hostfleet.net/ai-generated-app-production-footguns/). If your target host shortlist is Cloudflare, Vercel, or Netlify, the supporting runtime and billing context is [Cloudflare Pages vs Vercel vs Netlify](https://hostfleet.net/cf-pages-vs-vercel-vs-netlify-2026/).

## The short answer

| Builder origin | Lowest-risk first move | Rewrite risk on first move | Why this is the honest starting point |
|---|---|---|---|
| **Lovable** | Sync to GitHub, move the frontend to Vercel, Netlify, or Cloudflare Pages, and keep backend services where they are initially | **Low** if you are only moving the frontend | Lovable's docs are unusually explicit that the code is a standard Vite + React project and that frontend hosting can move independently |
| **Bolt** | Export to GitHub and move only the web app first | **Medium** if the project uses Bolt Cloud database, auth, storage, or server functions | Bolt code can move, but Bolt Cloud is bundled infrastructure, so code export is not the same thing as infra export |
| **v0** | Put the code in GitHub, but make your first non-builder deploy on **Vercel** unless you have a strong reason not to | **Low to medium** | v0 is Vercel-native Next.js, and other hosts add extra runtime decisions before you have even stabilized the handoff |

My practical recommendation is straightforward: **move ownership in layers. Export the code first, move the frontend second, recreate secrets and deploy workflow third, and only then replace builder-managed backend services one by one.**

## Move ownership in layers, not all at once

Lovable's own portability page is very clear about the trade: once you stop using Lovable for the editor, previews, and hosting, you become responsible for CI/CD, production infrastructure, SSL, CDN, backups, access control, secrets, AI provider credentials, and monitoring. That is the real boundary of leaving a managed builder, and the same logic applies to Bolt Cloud and v0 even when the docs phrase it differently.

The migration layers are:

1. **Code ownership**
2. **Frontend hosting**
3. **Secrets and environment management**
4. **Backend and data services**
5. **Operational tooling** such as previews, logs, monitoring, backups, and rollback

Teams get into trouble when they compress those layers into one weekend because a builder made the first version feel easy.

## Step 1: export to GitHub before prompt drift makes the handoff worse

The first goal is not elegance. It is to get the working code into a repo your team controls.

For each builder, the docs support a different version of that move:

- **Lovable** supports continuous GitHub sync and also allows paid-plan users to download the codebase directly from the code editor
- **Bolt** has built-in version history, but its own GitHub guidance says GitHub is where you go for branching, collaboration, review, and permanent history outside Bolt
- **v0** positions itself around immediate Vercel deploys or opening a pull request for review, which is exactly the cue to get a normal repo workflow in place before the app grows further

This matters because AI-builder diffs get uglier over time. The longer you keep iterating inside the builder before taking a clean repo snapshot, the harder it becomes to separate generated baseline, human fixes, and production hardening.

## Step 2: inventory what is portable and what is sticky

Code portability and platform portability are not the same thing. Here is the part buyers routinely underestimate.

| Builder | What moves cleanly | What tends to stick | What that means in practice |
|---|---|---|---|
| **Lovable** | Standard Vite + React frontend, GitHub repo, frontend deploy to major clouds or managed hosts | Backend/data services if you rely on Lovable Cloud or Supabase-specific auth, storage, realtime, and edge functions | You can usually move the frontend first with low drama, but backend replacement is a separate project |
| **Bolt** | Exported app code, repo workflow, external host for the web app | Bolt Cloud hosting, databases, auth, storage, analytics, domains, and server functions | If the app only uses frontend code and external APIs, the move is easier; if it uses bundled Bolt Cloud services, budget real replacement work |
| **v0** | Next.js code and normal repo workflow | Vercel-shaped defaults, runtime assumptions, and any Vercel-managed integrations you adopted implicitly | The code is portable, but the cheapest first migration is usually to keep the runtime story Vercel-compatible until the app is stable |

Lovable is the clearest case in the docs. Their ownership page says apps are standard Vite + React projects, the frontend can run on managed platforms like Netlify, Cloudflare Pages, and Vercel, and frontend hosting can move without architectural changes if the backend remains on Lovable Cloud. But the same page also says backend migration is different: while the underlying database is PostgreSQL, Lovable apps commonly depend on Supabase-specific services like auth, storage, realtime, and edge functions, so moving to plain Postgres is not a drop-in swap.

Bolt's docs point in a different direction. Bolt Cloud intentionally bundles hosting, domains, databases, authentication, file storage, server functions, and analytics in one place. That is great for fast shipping. It also means the exported code is only one part of the system. The migration lesson is simple: **do not confuse 'I have the repo' with 'I have the whole platform'.**

v0 sits in between. The code is standard Next.js, but the default path is still Vercel-native. Cloudflare's own Pages docs explicitly split static Next.js exports from full-stack SSR Next.js, and recommend the Workers guide for full-stack cases. Netlify's docs say their OpenNext adapter supports major Next.js features with zero configuration. So yes, you can move a v0 app away from Vercel. But the rewrite risk depends heavily on whether your app is static, SSR-heavy, middleware-heavy, or tied to Vercel-specific defaults.

## Step 3: choose the first destination that minimizes rewrite

This is the narrow estimate layer in the article. The docs tell you what each platform supports. They do not tell you which first move creates the least chaos for a small team. Here is the practical answer.

### Lovable

If the app already works and you mainly want ownership, the lowest-rewrite move is:

1. connect or refresh GitHub sync
2. deploy the frontend from that repo to Vercel, Netlify, or Cloudflare Pages
3. keep the current backend path in place for one release cycle

That buys you repo ownership, preview deploys, and a standard frontend hosting path without forcing an auth and data migration in the same pass.

### Bolt

The first question is whether the app depends on Bolt Cloud infrastructure.

- If the project is mostly frontend code plus external APIs, exporting to GitHub and redeploying the web app is relatively straightforward.
- If the project uses Bolt databases, built-in auth, file storage, or server functions, the lowest-risk path is to move the frontend first and treat every Bolt Cloud feature replacement as its own scoped migration.

That is less glamorous than saying 'we are off the builder now,' but it is how you avoid accidental data and auth regressions.

### v0

For most teams, the honest first destination is still **Vercel**. Not forever. Just for the first stable handoff.

Why: v0 is already aligned to Next.js and one-click Vercel deploys. If you immediately add a host migration at the same time you are taking ownership from the builder, you are introducing runtime differences before you have even frozen the baseline.

Move away from Vercel later if one of these is true:

- you only need static export and want Cloudflare's bandwidth and preview posture
- you want Netlify's adapter model and team economics more than Vercel's workflow
- you have a specific reason to standardize on another Next.js host and the app behavior is well understood

## Step 4: recreate secrets and environments explicitly

Builders hide a lot of operational glue. Your new host will not.

Vercel's environment-variable docs are a useful reminder of what changes once you own deployment: variables are scoped by environment, encrypted at rest, and only apply to *new* deployments after you change them. In other words, secret management is now part of release management.

The migration checklist here is basic but non-optional:

- make an inventory of every env var, OAuth callback URL, webhook secret, and storage bucket binding before the first cutover
- separate development, preview, and production values instead of copying one builder-era secret set everywhere
- reissue secrets where you are not certain who or what had access to them inside the old platform flow
- test auth callbacks, uploads, email providers, payment webhooks, and cron endpoints on the preview environment before production DNS moves

This is also the moment to clean up builder-generated public env mistakes. If an app shipped with client-exposed secrets or confused public/private prefixes, do not faithfully preserve that bug during migration.

## Step 5: add preview deploys, rollback, and a real release gate

One reason people stay in builders too long is that the preview URL feels like enough process. It is not.

A real handoff should give you:

- a Git-based default branch and pull-request flow
- preview deployments for branches or pull requests
- one documented production promotion path
- one rollback path that does not depend on prompt history

Cloudflare Pages, Vercel, and Netlify all support repo-connected deploy flows, but the details matter. Cloudflare Pages explicitly calls out preview deployments on new pull requests. Netlify's Next.js support is adapter-driven and works from a Git provider connection. Vercel's environment model is built around production and preview deploy separation. The common lesson is more important than the branding: once the app leaves the builder, **Git becomes the control plane**.

## Step 6: replace builder-managed backend services one by one

This is the part most teams underestimate because frontend redeploy success creates false confidence.

### Auth

If auth lived inside Lovable Cloud or Bolt Cloud, replace it as an isolated project. Do not change auth, payments, and DNS together. Identity bugs are harder to detect than broken CSS.

### Database and storage

If the app uses Supabase through Lovable, keep that stable first and decide later whether you actually need to move it. Lovable's docs explicitly support migration to managed Supabase and self-hosted Supabase, which is a much narrower and safer target than 'rewrite everything around plain Postgres this week.'

If the app uses Bolt's built-in database, storage, or user-management flows, treat data export, schema recreation, file migration, and backup policy as a distinct workstream. Bolt's docs also note that version-history restore does **not** restore databases, which is a useful warning against assuming UI-level restore equals data-level safety.

### Background jobs and server functions

Builder-era apps often grow hidden background behavior: cron jobs, webhooks, edge functions, or upload processors. Inventory them. If the app needs long-running workers or agent backends after the move, this is where the companion guide [Best hosting for AI agents on a budget](https://hostfleet.net/best-hosting-for-ai-agents-on-a-budget/) becomes relevant.

## What not to do

The fastest way to turn a controlled migration into a rewrite is to stack multiple unknowns at once.

Do **not** do these together unless you have strong test coverage and a rollback path:

- move hosting, auth, database, and payments in one cutover
- migrate a v0 app off Vercel and change the runtime model in the same release
- treat Cloudflare's static Next.js guide as proof that a full-stack SSR app will move unchanged
- delete the builder project before secrets, env vars, storage paths, and callback URLs are inventoried
- assume a builder's backup or version-history feature protects production data the way your own database backup policy should

## A practical cutover order

This is the order I would use for a real small-team migration:

1. Freeze the current working builder version and export to GitHub.
2. Deploy the unmodified app to the least-surprising external host.
3. Recreate env vars and preview environments.
4. Validate sign-in, uploads, payments, and webhooks on preview.
5. Cut the frontend domain only after preview parity is real.
6. Replace backend services one at a time, starting with the least risky dependency.
7. Add monitoring, backups, and rollback documentation before calling the migration finished.

That sequence is not flashy, but it is how you get off the builder without breaking the business logic that made the app worth keeping.

## Final verdict

If you want the shortest honest answer, it is this: **own the code immediately, own the deploy path next, and only own the backend platform pieces when you can replace them intentionally rather than emotionally.**

For most teams in May 2026, the best first move is not full self-hosting. It is a controlled handoff from builder-managed magic to standard repo-driven deployment, with the smallest possible number of moving parts changed per release.

That is how you move an AI-generated app into your own stack without accidentally turning a working product into a migration project.
