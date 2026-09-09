You are operating my Windows desktop and browser to finish the production SEO rollout for https://mosheschwartzberg.com/ (CodeCrafter).

Repository: https://github.com/lionsgrandson/CodeCrafterV2.0
Local repository is normally under my development folders. Find it if needed.

IMPORTANT HOSTING FACT
mosheschwartzberg.com is hosted only on Cloudflare now. Do not look for, configure, deploy, or troubleshoot this site on DigitalOcean. If you encounter an old DigitalOcean reference in local notes/history, treat it as obsolete unless I explicitly tell you otherwise.

GOAL
Finish everything that requires account-level/browser access after the repository SEO hardening has been merged to main. Work through GitHub/local build, Cloudflare hosting, Cloudflare DNS/edge rules, and Google Search Console. Do not make unrelated visual/content changes. Do not weaken security or email/DNS settings.

IMPORTANT SAFETY / DO-NOT-DO RULES
1. Never delete or alter MX, SPF, DKIM, DMARC, mail, Resend, or unrelated DNS records.
2. Never turn off Cloudflare proxying for the production web hostname unless there is a verified technical reason and I explicitly approve it.
3. Never create an SPA catch-all that returns HTTP 200 for missing URLs. The site is prerendered and missing routes must return a real 404.
4. Never block /assets/ in robots.txt. Google must be able to crawl JS/CSS to render pages.
5. Do not use Google Search Console Removals for a whole /assets/ directory. Only remove exact stale URLs that are already 404/410 or noindex.
6. Do not remove valid indexable service, portfolio, pricing, location, Hebrew, or English pages.
7. Do not overwrite existing unrelated Cloudflare Transform Rules. The repository script is intentionally idempotent and updates only the CodeCrafter SEO rule.
8. Do not invent SEO results, traffic, client metrics, office addresses, reviews, or business claims.
9. If a login, CAPTCHA, passkey, or 2FA screen requires me, stop only at that screen and ask me to complete it. Otherwise continue without asking me to confirm each step.
10. Before any destructive or irreversible account action, verify twice that it is required by this prompt.

PHASE 1 — LOCAL REPOSITORY AND BUILD
1. Find the CodeCrafterV2.0 repository.
2. Check git status. Preserve any uncommitted user work; do not reset, discard, stash, or overwrite it without explicit permission.
3. Verify main contains the latest SEO hardening changes, including these files:
   - SEO-FULL-DEPLOY.cmd
   - scripts/cloudflare-seo-hardening.ps1
   - scripts/production-seo-audit.mjs
   - scripts/seo-config-check.mjs
   - src/lib/seoCaseStudyExtras.ts
   - updated server.ts, .htaccess, public/.htaccess, public/_headers, robots.txt, public/_redirects
4. If the working tree is clean, pull main with fast-forward only.
5. Run:
   npm ci
   npm run lint
   npm run build
6. The build must pass the existing prerender SEO validation and the new SEO infrastructure validation. If it fails, diagnose and fix the actual repository issue, run the checks again, commit the fix to main, and push it. Do not bypass the checks.

PHASE 2 — CLOUDFLARE HOSTING AND DEPLOYMENT
1. Open Cloudflare and identify the production Cloudflare hosting product/project serving mosheschwartzberg.com. It may be Cloudflare Pages or Workers; verify the actual current setup instead of guessing.
2. Confirm the production project is connected to lionsgrandson/CodeCrafterV2.0 and uses main as the production branch, or otherwise verify the currently configured production deployment source.
3. Confirm the latest main commit is the version deployed to production. If auto-deploy from main is enabled and appropriate, keep it enabled. If the latest main commit is not live, trigger/redeploy it using the existing Cloudflare hosting workflow.
4. Verify the build/output configuration is compatible with the repo's prerendered production output:
   - build command must actually run the current production build, normally npm run build
   - production output must serve the generated dist content
   - prerendered nested routes must resolve to their generated HTML
   - unknown URLs must return a real HTTP 404, never a generic index.html/200 catch-all
5. Do not replace the current production architecture with a new hosting product merely because both Pages and Workers exist. Keep the existing Cloudflare hosting product unless there is a verified problem.
6. Verify in the browser/devtools or terminal:
   - https://mosheschwartzberg.com/ returns 200
   - https://mosheschwartzberg.com/websites/ returns 200
   - https://mosheschwartzberg.com/custom-software/ returns 200
   - https://mosheschwartzberg.com/portfolio/rainbow-asd/ returns 200 and is a real case study
   - https://mosheschwartzberg.com/portfolio/shimon-photography/ returns 200
   - a random nonexistent URL such as /seo-test-this-must-not-exist-92741 returns a real 404, never 200
   - /404.html contains noindex
7. Do not create a provider-level redirect or route that conflicts with the repository's canonical URLs or revives a soft-404 problem.

PHASE 3 — CLOUDFLARE DNS AND EDGE RULES
1. Stay in Cloudflare for mosheschwartzberg.com.
2. Verify the production DNS/custom-domain setup for the root domain and www points to the actual Cloudflare-hosted production project. Do not touch mail-related DNS records.
3. From the repository, run SEO-FULL-DEPLOY.cmd. If it asks for a Cloudflare API token and none exists:
   - create a scoped token limited to mosheschwartzberg.com
   - allow Zone Read
   - allow Transform Rules Edit
   - allow Cache Purge only because the CMD runs a purge step; it is optional for the SEO rule itself
   - do not create an all-zones/global super-token
4. Let scripts/cloudflare-seo-hardening.ps1 create or update its named response-header transform rule. It must set:
   X-Robots-Tag: noindex
   on non-page .js, .mjs, .css, .map, .json, .webmanifest resources and /favicon.svg.
5. In Cloudflare Transform Rules, verify the CodeCrafter rule exists, is enabled, and unrelated existing rules are unchanged.
6. Purge cache after the latest deployment/configuration if the script has permission to do so.
7. Verify headers using the current hashed JS file referenced by the live homepage. A direct request to that JS asset must show:
   X-Robots-Tag: noindex
8. Verify /favicon.svg and /manifest.json are 404/410 or otherwise carry noindex and are not serving old homepage HTML.
9. Verify the root HTML pages themselves DO NOT receive X-Robots-Tag: noindex.
10. Verify www permanently redirects to https://mosheschwartzberg.com/ and HTTPS is enforced.

PHASE 4 — RUN THE LIVE AUDIT
From the repo run:
   npm run seo:audit:production

Treat failures as real issues to investigate. Fix Cloudflare hosting, route, header, or repository configuration and rerun until the critical failures are green. Warnings may be reviewed individually; do not silence or delete audit checks merely to get green output.

PHASE 5 — GOOGLE SEARCH CONSOLE
1. Open Google Search Console for mosheschwartzberg.com. Prefer/use the Domain property if it is already verified; otherwise use the existing canonical HTTPS property without creating duplicate properties unnecessarily.
2. Open Sitemaps.
3. Confirm https://mosheschwartzberg.com/sitemap.xml is submitted and readable. Resubmit it after the new deployment so Google sees the updated URL set.
4. Inspect these priority URLs with URL Inspection. Use TEST LIVE URL first. Confirm the live page is crawlable, canonical is correct, robots does not block it, and the rendered page contains the expected content. Then use REQUEST INDEXING where available:
   https://mosheschwartzberg.com/
   https://mosheschwartzberg.com/websites/
   https://mosheschwartzberg.com/custom-software/
   https://mosheschwartzberg.com/crm-development/
   https://mosheschwartzberg.com/cms-development/
   https://mosheschwartzberg.com/automation/
   https://mosheschwartzberg.com/integrations/
   https://mosheschwartzberg.com/app-development/
   https://mosheschwartzberg.com/pricing/
   https://mosheschwartzberg.com/portfolio/
   https://mosheschwartzberg.com/portfolio/rainbow-asd/
   https://mosheschwartzberg.com/portfolio/shimon-photography/
   https://mosheschwartzberg.com/about/
   https://mosheschwartzberg.com/locations/
   https://mosheschwartzberg.com/en/
   https://mosheschwartzberg.com/en/websites/
   https://mosheschwartzberg.com/en/custom-software/
   https://mosheschwartzberg.com/en/crm-development/
   https://mosheschwartzberg.com/en/automation/
   https://mosheschwartzberg.com/en/pricing/
   https://mosheschwartzberg.com/en/portfolio/
   https://mosheschwartzberg.com/en/portfolio/rainbow-asd/
   https://mosheschwartzberg.com/en/portfolio/shimon-photography/
5. Google limits manual indexing requests, so prioritize the homepage, commercial service pages, pricing, portfolio, and the two newly added case studies. The sitemap is the main discovery mechanism for the full set.
6. In Page indexing, inspect exclusions/errors for:
   - Crawled - currently not indexed
   - Discovered - currently not indexed
   - Duplicate without user-selected canonical
   - Alternate page with proper canonical
   - Soft 404
   - Not found (404)
   - Blocked by robots.txt
   - Excluded by noindex
   Fix only genuine problems. Legitimate 404/410 asset cleanup and noindex utility pages are expected exclusions.
7. Inspect the exact stale asset URLs that previously appeared in search, including /favicon.svg, /manifest.json if present, and any exact old hashed /assets/*.js URL visible in Search Console or Google results. Confirm first that each exact URL is now 404/410 or has X-Robots-Tag noindex.
8. If those exact stale asset URLs are still visibly appearing in Google and fast cleanup is useful, use Search Console Removals for the EXACT URL only. Do not remove /assets/ as a prefix. Remember that Removals is temporary; the permanent fix is the 404/410/noindex behavior already implemented.
9. Check Manual actions and Security issues. Record whether both are clean; do not make changes if there are no issues.
10. Check Core Web Vitals for mobile and desktop. Note any failing URL groups. Do not make arbitrary design changes from field-data warnings during this browser task; report the affected group/metric first unless there is an obvious technical regression from this deployment.
11. Check HTTPS report and confirm the canonical pages are HTTPS.
12. Where available, use Rich Results/Test Live URL on the homepage, a service page, pricing, and a case study. Confirm JSON-LD is parseable. Do not add unsupported rich-result markup simply to chase a badge.

PHASE 6 — SEARCH CLEANUP AND VALIDATION
1. Search Google for:
   site:mosheschwartzberg.com
   site:mosheschwartzberg.com inurl:assets
   site:mosheschwartzberg.com favicon.svg
   site:mosheschwartzberg.com manifest.json
2. Record stale results still visible. Do not assume immediate disappearance means configuration failed; check the actual live HTTP response/header first.
3. Verify the primary result/snippet is increasingly aligned with the current CodeCrafter positioning and current titles. Do not repeatedly change titles just because Google rewrites a snippet once.
4. Confirm Hebrew and English pages reference each other through hreflang and each has a self-canonical.

PHASE 7 — FINAL REPORT
When finished, give me one concise report containing:
- latest GitHub main commit SHA you verified/deployed
- Cloudflare hosting product/project and production deployment status
- whether production is connected to main and whether the latest main commit is live
- whether a random missing URL returns 404
- Cloudflare SEO transform rule status
- one example hashed JS URL and its X-Robots-Tag response
- status of /favicon.svg and /manifest.json
- output/result of npm run seo:audit:production
- Search Console sitemap status
- which priority URLs had Live Test + Request Indexing completed
- any Page indexing issues that genuinely need follow-up
- Manual actions / Security issues status
- Core Web Vitals issues, if any
- stale exact URLs submitted to Removals, if any
- anything you could not complete and the precise reason

Keep working through the list unless blocked by a human login/2FA/CAPTCHA or a genuinely destructive decision that this prompt does not authorize.
