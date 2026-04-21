---
title: "How to Migrate Your Website to a New Host (Step by Step)"
description: "Moving your website to a new host? Follow this step-by-step migration guide to avoid downtime, DNS mistakes, and data loss."
pubDate: 2026-04-05
updatedDate: 2026-04-21
category: legacy-wp
author: Alex Harmon
draft: false
legacy: true
canonicalUrl: "https://hostfleet.net/how-to-migrate-website-to-new-host/"
---

> *Legacy review from HostFleet's pre-2026-04-21 era, when we focused on traditional shared and managed WordPress hosting. We have pivoted to AI infrastructure benchmarks ([see why](/about/)). This article remains for reference and people who arrived from search.*

***Affiliate disclosure:** HostFleet may earn a commission if you sign up through links on this page. That never changes our recommendations or the migration process we suggest. [Full disclosure](https://hostfleet.net/affiliate-disclosure/).*

**Last updated:** April 19, 2026

Migrating a website to a new host feels risky because two bad outcomes can happen at once: downtime and data loss. The good news is that most migrations are not technically difficult — they are *sequence-sensitive*. If you back up first, build the new copy before changing DNS, and keep the old host alive until traffic has fully moved, the process is usually safe.

This guide walks through the safest sequence for moving a website to a new host step by step. It is written for normal site owners — bloggers, small businesses, WooCommerce stores, brochure sites — not just sysadmins. We’ll show you what to do before the move, how to test the new site properly, and how to avoid the mistakes that cause most migration disasters.

## Step 0: Decide Where You’re Migrating To

Before you move anything, make sure you’re moving to a host that’s actually better than the one you’re leaving. HostFleet’s data advantage is useful here: we monitor provider speed every 30 minutes and scrape live pricing daily. [You can review the methodology here](https://hostfleet.net/methodology/). Here’s the current snapshot from our **1,041-check dataset per provider** through April 21, 2026, paired with the latest stable pricing snapshot from April 17, 2026.

Provider
Median TTFB
Checks >1s
Entry Price
Renewal
Best For

**[Hostinger](https://hostfleet.net/hostinger-review/)**
290.0 ms
111/1,041 (10.7%)
$2.99/mo
$7.99/mo
Most migrations from weak shared hosting

**[Cloudways](https://hostfleet.net/cloudways-review/)**
**267.0 ms**
127/1,041 (12.2%)
$14.00/mo
$14.00/mo
Growing WordPress sites that need cloud headroom

**[ScalaHosting](https://hostfleet.net/scalahosting-review/)**
334.7 ms
150/1,041 (14.4%)
$29.95/mo
$29.95/mo
Managed VPS migrations and higher-stakes stores

[SiteGround](https://hostfleet.net/siteground-review/)
594.5 ms
208/1,041 (20.0%)
$2.99/mo
$17.99/mo
Teams that value staging and dev tooling more than price

[Bluehost](https://hostfleet.net/bluehost-review/)*
281.2 ms*
108/1,041 (10.4%)*
$2.95/mo
$11.99/mo
Readers who specifically want the cPanel familiarity caveat

**Bluehost returned HTTP 403 on all 1,041 monitoring requests in our current dataset, so those figures reflect network latency to an error page, not real content delivery. We do not use Bluehost’s numbers for head-to-head performance conclusions.*

If you’re moving off cheap shared hosting and want the safest mainstream upgrade path, start with our [Hostinger review](https://hostfleet.net/hostinger-review/). If you’re migrating a growing WordPress site and want more headroom, read our [Cloudways review](https://hostfleet.net/cloudways-review/). For VPS-style isolation without managing the server yourself, see [ScalaHosting](https://hostfleet.net/scalahosting-review/). And if you’re still comparing options broadly, our [best WordPress hosting guide](https://hostfleet.net/best-wordpress-hosting/) and [small-business hosting shortlist](https://hostfleet.net/best-web-hosting-small-business/) give the fuller ranking context.

## Migration Checklist: The Safe Order

Here’s the short version of the safest migration workflow:

- Audit the current site

- Take full backups

- Lower DNS TTL if possible

- Create the site on the new host

- Copy files + database

- Fix config values and paths

- Test on the new host before switching DNS

- Freeze content on the old host

- Make the final sync

- Update DNS

- Monitor both hosts for 24–72 hours

- Only then cancel the old host

The biggest mistake people make is changing DNS too early. If you remember only one thing from this article, let it be this: **do not point the domain until the new site is already working**.

## Step 1: Audit the Site Before You Touch Anything

Before migrating, make a quick inventory. You need to know exactly what you’re moving.

- What CMS are you using? WordPress, WooCommerce, Joomla, static HTML, custom PHP?

- How large is the site? Files size, media library size, database size.

- Is email hosted with the same provider?

- Do you have SSL certificates, CDN settings, firewall rules, cron jobs, redirects, or staging sites?

- Is the site dynamic? Comments, orders, memberships, bookings, forum posts?

If you’re moving a WooCommerce or membership site, the migration gets more sensitive because new orders or user changes can happen during the cutover. For those sites, schedule the move during low traffic and consider a short maintenance window.

### Quick pre-migration audit table

Item
Why it matters
Where to check

Files size
Determines upload time and storage needs
cPanel File Manager / SSH / hosting dashboard

Database size
Large DBs can fail on default import limits
phpMyAdmin or host dashboard

Email accounts
Mailboxes often get forgotten
Old host email panel

DNS records
Need to preserve MX, TXT, subdomains, SPF, DKIM
Registrar / Cloudflare / DNS host

Backups
Your rollback plan depends on them
Host backup tool + local download

## Step 2: Lower DNS TTL Before the Move

If you control your DNS zone, reduce the TTL (time to live) on your A record 12–24 hours before migration. Set it to something like **300 seconds** (5 minutes). This doesn’t make propagation instant, but it shortens the time people remain pointed at the old server after you switch.

If your DNS is on Cloudflare, your registrar, or another DNS provider, make the change there — not inside the old hosting account unless it is also your DNS provider.

If you forget this step, it’s not catastrophic. The migration still works. It just means the cutover window may take longer.

## Step 3: Create a Full Backup — Files, Database, and Email

Do not rely on your host’s backups alone. Take your own copies.

### For WordPress sites, export:

- The full `public_html` or site directory

- The MySQL database

- The `wp-config.php` file

- Any custom `.htaccess` rules

- Email account settings if mail is hosted on the same server

### Good backup options

Method
Best For
Notes

Full cPanel backup
cPanel-to-cPanel moves
Fastest if both hosts support full restore

WordPress plugin (Duplicator, All-in-One WP Migration, Updraft)
Small/medium WordPress sites
Very beginner-friendly; can hit size limits on huge sites

Manual ZIP + SQL export
Any PHP/MySQL site
Most reliable and universal

rsync / SCP / SSH
Large sites and VPS moves
Fastest for technical users

Keep at least one backup on your local machine or cloud storage. If the old host account is suspended or goes offline unexpectedly, you don’t want your only backup trapped on the source server.

## Step 4: Set Up the New Hosting Environment First

Create the target site on the new host before copying anything over. That usually means:

- Add the domain or temporary subdomain

- Create the database and database user

- Enable SSL if the host provisions it before DNS (some do via temporary validation, some after cutover)

- Confirm PHP version compatibility

- Set up staging or temporary preview access if available

If you’re migrating WordPress, this is also a good moment to check whether the new host has server-level caching, Redis, LiteSpeed, or staging features that may affect your setup after the move. If you are still deciding between plan types before you migrate, read our [shared vs cloud vs VPS hosting guide](https://hostfleet.net/shared-vs-cloud-vs-vps-hosting/) first.

For example:

- **[Hostinger](https://hostfleet.net/hostinger-review/)** is straightforward for shared hosting migrations and gives you lots of storage headroom.

- **[Cloudways](https://hostfleet.net/cloudways-review/)** gives you staging, Redis, and cloud resources from the start.

- **[SiteGround](https://hostfleet.net/siteground-review/)** makes testing easier with staging on all plans, but it’s much pricier long-term.

## Step 5: Move the Files and Database

### Option A: Easiest for WordPress — plugin migration

If your site is a standard WordPress install and not massive, a migration plugin is the simplest route. Export from the old host, import into the new host, then update the config if required. This is the lowest-stress method for beginners.

### Option B: Manual migration

If you want full control or you’re moving a larger site:

- Upload site files to the new server

- Create/import the database

- Update connection settings in config files (`wp-config.php` for WordPress)

- Check file permissions

- Update hard-coded paths if the directory structure changed

For WordPress, the critical settings are usually:

- `DB_NAME`

- `DB_USER`

- `DB_PASSWORD`

- `DB_HOST`

If the domain stays the same, you may not need a search-and-replace in the database — unless you are testing on a temporary domain or subdomain first. In that case, you’ll need to update URLs before launch or use a hosts-file preview instead.

## Step 6: Test the New Site Before Changing DNS

This is the step that saves migrations.

Do **not** switch DNS and hope the new site works. Test it first using one of these methods:

- A temporary URL or preview domain provided by the host

- A staging URL

- Your local hosts file pointing the domain to the new server IP

### What to test

- Homepage loads correctly

- Navigation menus work

- Images, CSS, and JS files load

- Forms submit correctly

- Login/admin area works

- Checkout, account pages, booking flows, or search functions work

- Redirects and canonical tags are intact

- SSL behaves correctly

If you skip testing and go straight to DNS, any problem becomes a live-site problem.

## Step 7: Freeze Content and Do the Final Sync

Once the new host copy is working, you need to stop the old site from changing during the final cutover.

For a low-activity brochure site, this may just mean avoiding edits during the migration hour. For a store, forum, membership site, or blog receiving comments/orders, put the site into maintenance mode briefly during final sync.

The goal is simple: no new content should be written to the old database after you’ve copied it to the new server.

### For dynamic sites, your cutover plan should be:

- Enable maintenance mode on the old site

- Take a final database export

- Import it to the new server

- Run final tests

- Switch DNS

- Disable maintenance mode once traffic is landing on the new server

## Step 8: Change DNS

Now — and only now — point the domain to the new host.

Usually that means one of the following:

- Update the A record to the new server IP

- Change nameservers if the new host controls the entire DNS zone

- Reconnect the domain in Cloudflare if proxying is enabled

In most cases, updating the A record is cleaner than moving nameservers because it avoids accidentally losing MX, TXT, SPF, DKIM, or verification records.

**Best practice:** keep the old hosting account active for at least 72 hours after the DNS change. DNS propagation is usually faster than that, but email, local resolver caches, and edge cases are why people regret cancelling early.

## Step 9: Monitor After the Cutover

Once DNS is pointed to the new server, check the site from multiple networks and devices if possible. Use an incognito window, mobile data, and a different browser to avoid cached results.

### Post-migration checklist

- Site loads on the new server

- Admin/login area works

- Email still sends and receives

- SSL certificate is active

- CDN/firewall rules are configured

- Backups are enabled on the new host

- Search engines can crawl the site (not blocked by a staging/noindex setting)

This last one matters more than people think: some hosts or migration plugins leave a temporary noindex setting enabled after launch. Double-check it.

## Special Cases That Break Migrations

### Email hosted with the old provider

This is the most commonly forgotten piece of a migration. If your email inboxes live on the old host, moving the website does not automatically move the mailboxes. Preserve your MX records and migrate mail separately if needed.

### WooCommerce or booking sites

Any site processing orders, bookings, or user data needs a maintenance window or final-database-sync plan. Otherwise you risk losing transactions created after the first export.

### Large media libraries

Migration plugins often fail on giant uploads. For large WordPress sites, manual transfer or SSH-based copying is more reliable.

### CDN/firewall configuration

If you use Cloudflare, Sucuri, or another WAF/CDN, remember to update origin server settings after the cutover. Otherwise traffic can still route incorrectly or show stale content.

### Hard-coded URLs

If the domain changes as part of the migration, you’ll need a proper database search-and-replace to update absolute URLs. WordPress serialised data makes naive find/replace risky — use a tool that understands serialised values.

## Common Migration Mistakes

Mistake
Why it hurts
Safer alternative

Changing DNS before testing
Turns setup bugs into live downtime
Test on preview URL or hosts file first

Cancelling old host immediately
No rollback option if something breaks
Keep old host 72 hours minimum

Forgetting email
Mail stops sending/receiving
Audit MX and mailbox setup before cutover

No local backup
You’re trapped if host access disappears
Download your own files + DB copy

Skipping final database sync
Lost comments, orders, or user changes
Freeze content and sync once more before DNS

## If You Want the Lowest-Risk Migration Path

Here’s the simplest practical advice:

- **Moving a normal WordPress site from weak shared hosting?** → Hostinger is the easiest mainstream upgrade path based on our pricing and speed data.

- **Moving a growing WordPress site that needs staging and more performance headroom?** → Cloudways.

- **Moving a store or business-critical site that needs VPS isolation?** → ScalaHosting.

- **Need staging and backups on every plan, and don’t mind paying for it?** → SiteGround.

For deeper provider-specific breakdowns, read:

- [Hostinger Review 2026](https://hostfleet.net/hostinger-review/)

- [Cloudways Review 2026](https://hostfleet.net/cloudways-review/)

- [SiteGround Review 2026](https://hostfleet.net/siteground-review/)

- [Bluehost Review 2026](https://hostfleet.net/bluehost-review/)

- [Best Web Hosting for Small Business 2026](https://hostfleet.net/best-web-hosting-small-business/)

## Frequently Asked Questions

### How do I migrate my website to a new host without downtime?

You minimise downtime by building and testing the site on the new host first, then changing DNS only after the new copy is working. Lower the DNS TTL in advance, keep the old host active for 72 hours, and use maintenance mode for dynamic sites during final sync.

### Can I move a WordPress site myself?

Yes. Most small and medium WordPress sites can be migrated by the site owner using a plugin or manual file/database export. The process is very manageable if you work from a checklist and keep full backups.

### How long does website migration take?

A small WordPress site can often be migrated in 30–90 minutes. Large sites, stores, or sites with lots of media and custom configuration can take several hours. DNS propagation adds another few minutes to 48 hours depending on resolver caching.

### What happens to email when I change web hosts?

Nothing automatically. If your email is hosted with the old provider, you must preserve MX records and migrate mailboxes separately. This is one of the most common migration mistakes.

### Should I switch nameservers or just change the A record?

Usually just change the A record. It’s safer because you keep the rest of the DNS zone intact — MX, TXT, SPF, DKIM, subdomains, and verification records stay where they are.

## The Bottom Line

Website migrations are less about technical wizardry and more about discipline. Backup first. Build the new copy first. Test before DNS. Keep the old host alive until you’re certain the move is complete.

If you’re migrating because your current host is slow or expensive, use real data to pick the destination. In our latest snapshot, Hostinger is the best value landing spot for most sites, Cloudways is the best performance-oriented upgrade, and ScalaHosting is the best managed VPS path.

Get the sequence right, and a migration is just a project. Get the sequence wrong, and it becomes an emergency.

---

*Data cited from HostFleet’s monitoring dataset: 1,041 samples per provider through April 21, 2026, 30-minute intervals, fixed European server. Pricing from the latest stable April 17, 2026 snapshot. Bluehost returned HTTP 403 on all 1,041 requests; performance figures reflect error-response latency only.*
