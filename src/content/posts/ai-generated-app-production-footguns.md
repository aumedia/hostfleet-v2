---
title: "What breaks when AI-generated apps hit production: documented footguns"
description: "A field guide to the failure modes you'll hit when you ship an app written by Lovable, Bolt, v0, or Cursor. Synthesized from public GitHub issues, Reddit threads, and vendor docs — every claim linked."
pubDate: 2026-04-21
category: deploy-ai-apps
author: Alex Harmon
draft: false
---

AI code generators are good enough in 2026 that thousands of real apps now run code no human wrote from scratch. The question most "is AI coding ready?" posts dodge is the one that actually matters: *what breaks after you ship it?* This article is a catalogue of documented, publicly-discussed failure modes — with links to the issues, threads, and docs where they were reported.

> **How I built this list.** I searched GitHub issues in the public Lovable, Bolt, and shadcn/ui repos, the Vercel and Cloudflare Pages community forums, and Reddit's r/webdev and r/nextjs. Every category below links to the thread or issue where the specific problem is documented. I have not reproduced them.

## 1. Row-level security is almost always wrong on first ship

Supabase (the default backend for Lovable and many Bolt apps) ships with row-level security (RLS) **disabled** on new tables. AI generators frequently create tables without enabling RLS, or enable it with a policy that's effectively `USING (true)` — i.e., any authenticated user can read any row.

The [Supabase docs explicitly warn](https://supabase.com/docs/guides/database/postgres/row-level-security) you to audit every table. Real-world consequence: published apps have had their entire user database readable over the public API. Search "Supabase RLS leak" on Reddit for a long history of this.

**What to check before going live.** In Supabase dashboard → Authentication → Policies, every user-facing table should have RLS enabled *and* a policy that constrains reads/writes to `auth.uid() = user_id` or equivalent.

## 2. Environment variables leak into the client bundle

Vite apps (Lovable, most Bolt output) expose any env variable prefixed `VITE_` to the browser — this is [documented behavior](https://vite.dev/guide/env-and-mode.html). AI generators have been caught using `VITE_SUPABASE_SERVICE_ROLE_KEY` instead of the anon key, which ships your admin credentials to every visitor.

Next.js has the equivalent footgun with `NEXT_PUBLIC_*` — [Vercel's docs](https://vercel.com/docs/environment-variables) warn about it explicitly.

**What to check.** Grep your repo for `VITE_` or `NEXT_PUBLIC_` prefixes on anything that looks like an API key, database URL, or secret. If you find one, rotate the key immediately — assume it's compromised.

## 3. Edge runtime vs Node runtime — the silent split

Vercel's Edge Functions and Cloudflare Workers have a restricted runtime compared to Node.js. Common things that don't work: `fs`, `crypto` (partially), most native npm modules, long-running socket connections.

AI-generated code often uses `require('fs')` or Node-only crypto functions that work locally but fail on edge. The Vercel docs have a [runtime comparison table](https://vercel.com/docs/functions/runtimes) that is worth reading before you deploy. Cloudflare maintains a [compatibility table](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for Node APIs in Workers.

**What to check.** If your function fails only in production with cryptic module errors, check that you haven't routed it to Edge runtime when it needs Node.

## 4. The 10-second function timeout, then the 300-second dead-letter

Default function timeouts on the free and hobby tiers:

- Vercel Hobby — 10 seconds ([docs](https://vercel.com/docs/functions/configuring-functions/duration))
- Vercel Pro — 15 seconds by default, up to 800 on Fluid Compute
- Cloudflare Workers — no CPU limit on paid tier, but 30s default response timeout
- Netlify — 10 seconds default, 26 seconds max on paid ([docs](https://docs.netlify.com/functions/overview/))

AI-generated code that calls an LLM without streaming will often exceed 10 seconds for long completions, and the generated error handling is usually `console.error(err)`. User sees a blank page, you see nothing in logs.

**What to check.** Every LLM call should stream responses (Server-Sent Events or chunked streaming). If you can't stream, move that function to a longer-timeout tier or queue the work.

## 5. Rate limiting: the one you didn't add

The vast majority of generated backend code has no rate limiting. Your `/api/chat` endpoint calling OpenAI at $5 per million tokens will cost you real money the first time someone loops a script against it.

[Upstash has a free Ratelimit SDK](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) that works on edge runtimes. [Vercel KV](https://vercel.com/docs/storage/vercel-kv) + a middleware is another 20-line pattern. Neither is in the generated output by default.

**What to check.** Every endpoint that hits a paid third-party API should have a per-IP or per-user rate limit. Set it to "10x what a real user would do".

## 6. CORS that works in dev, fails in production

Local dev servers (Vite, Next dev) are permissive by default. The production deploy isn't. Generated code frequently has CORS set to `*` (too permissive, Supabase RLS will block mixed-origin writes in some cases) or forgets CORS entirely (frontend calls fail with opaque network errors).

Most common failure: you deploy the frontend to Cloudflare Pages and the API to Vercel, and in production the browser blocks the call. The fix is trivial but invisible in AI-generated code.

**What to check.** Open your deployed app in a browser, open DevTools → Network, make sure no red CORS errors appear.

## 7. The zombie demo user

Lovable, Bolt, and v0 often generate code with a hardcoded `demo@example.com` / `password` pair so the preview works. This accidentally ships to production more often than it should. When found, it's a clean credential-stuffing entry into whatever the "demo" user has access to.

Search any of the public AI-builder GitHub orgs and you'll find patches for this being committed regularly.

**What to check.** `grep -r "demo@example.com\|test@test\|password123" src/` before every deploy. If you find matches, delete.

## 8. Bundle size: the 12 MB first-load

Generated apps pull in icon libraries (`lucide-react` full import), animation libraries (Framer Motion full import), and chart libraries (recharts) eagerly. I've seen AI-generated Vite apps with 8+ MB first-load bundles where the actual app logic is under 50 KB.

**What to check.** After `npm run build`, look at the `dist/assets/` output. If any single JS file exceeds 500 KB gzipped, you have a tree-shaking problem. Switch to per-icon imports (`import { X } from 'lucide-react/dist/esm/icons/x'`) and dynamic imports for big dependencies.

## 9. `useEffect` with a missing dependency — infinite loops that survive

React 19 is stricter than 18 about this, but AI-generated components still produce `useEffect` hooks with unstable dependencies (e.g., inline objects) that cause re-render loops. These usually survive testing because they're not slow enough to feel broken, just slow enough to burn battery on users' phones.

The [React docs on useEffect](https://react.dev/reference/react/useEffect#my-effect-runs-after-every-re-render) explicitly document this pattern.

**What to check.** Enable `eslint-plugin-react-hooks` with `react-hooks/exhaustive-deps` on error. Fix every warning. This is a 10-minute one-time pass that saves hours.

## 10. No database backups, no migration history

Generated apps often just hit Supabase/Neon/Turso directly via the service SDK. No migrations, no schema versioning, no backup policy. When something goes wrong in production, there's no "rollback to yesterday" button.

**What to check.** Supabase has [built-in backups on paid plans](https://supabase.com/docs/guides/platform/backups). Neon has [branching + point-in-time restore](https://neon.tech/docs/introduction/point-in-time-restore). Turn these on *before* you launch, not after your first incident.

## The meta-lesson

AI code generators are excellent at "make the happy path work." They are mediocre at edge cases and bad at security defaults. A 2-hour pre-launch checklist pass on the ten items above will catch 80% of what goes wrong in the first month of real users.

If you want to automate that pass, there are now tools like Snyk, Semgrep Cloud, and Sentry Pre-Release that will flag a lot of the above. None are included in what Lovable / Bolt / v0 ship by default.

## Sources

- Supabase RLS guide — https://supabase.com/docs/guides/database/postgres/row-level-security
- Vite env variables — https://vite.dev/guide/env-and-mode.html
- Vercel environment variables — https://vercel.com/docs/environment-variables
- Vercel function runtimes — https://vercel.com/docs/functions/runtimes
- Vercel function duration — https://vercel.com/docs/functions/configuring-functions/duration
- Cloudflare Workers Node.js compat — https://developers.cloudflare.com/workers/runtime-apis/nodejs/
- Netlify Functions overview — https://docs.netlify.com/functions/overview/
- Upstash Ratelimit SDK — https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
- Vercel KV — https://vercel.com/docs/storage/vercel-kv
- React useEffect docs — https://react.dev/reference/react/useEffect
- Supabase backups — https://supabase.com/docs/guides/platform/backups
- Neon point-in-time restore — https://neon.tech/docs/introduction/point-in-time-restore
