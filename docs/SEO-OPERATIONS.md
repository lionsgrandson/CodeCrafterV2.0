# CodeCrafter SEO Operations

Production domain: `https://mosheschwartzberg.com/`

Production hosting: Cloudflare only. DigitalOcean is no longer part of the production path for this site.

## One-command Windows workflow

Run from the repository root:

```bat
SEO-FULL-DEPLOY.cmd
```

The CMD file:

1. Protects uncommitted work by skipping Git sync when the tree is dirty.
2. Syncs clean local `main` with GitHub.
3. Runs `npm ci` and TypeScript checks.
4. Builds the prerendered site and runs local SEO validation.
5. Applies the scoped Cloudflare response-header rule for non-page assets.
6. Purges Cloudflare cache when the API token permits it.
7. Runs the live production SEO audit.
8. Copies `docs/CODEX-SEO-CONSOLE-PROMPT.md` to the Windows clipboard and opens Search Console and Cloudflare.

## Local validation

```bash
npm run lint
npm run build
npm run seo:config
```

`npm run build` already invokes the generated-page SEO checks and infrastructure regression checks through `postbuild`.

## Production validation

```bash
npm run seo:audit:production
```

The audit checks:

- `robots.txt` and sitemap availability
- sitemap URL duplication
- every sitemap URL HTTP status
- page titles
- self-canonicals
- index robots metadata
- JSON-LD presence
- new Rainbow ASD and Shimon Photography case studies
- hashed JavaScript `X-Robots-Tag: noindex`
- obsolete `/favicon.svg` and `/manifest.json`
- topical legacy redirects
- the revived `/portfolio/rainbow-asd/` URL
- `www` to canonical-host redirect

Do not remove a failing check only to get a green run. Fix the Cloudflare deployment, route, edge rule, or repository configuration that caused the failure.

## Cloudflare hosting

Cloudflare is the sole production hosting/provider path for `mosheschwartzberg.com`.

When validating a deployment:

1. Identify the current Cloudflare hosting product/project actually serving the domain. It may be Pages or Workers; verify instead of assuming.
2. Confirm production is deploying the intended GitHub `main` branch or current production source.
3. Confirm the latest expected main commit is live.
4. Confirm the production build serves the generated `dist` output.
5. Confirm nested prerendered routes resolve correctly.
6. Confirm a random nonexistent URL returns a real HTTP 404 instead of a soft-404 SPA response.
7. Do not move the site to a different Cloudflare hosting product just for SEO if the existing setup is working.

## Cloudflare edge SEO rule

Run directly when needed:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\cloudflare-seo-hardening.ps1 -PurgeCache
```

If `CLOUDFLARE_API_TOKEN` is not set, the script prompts for it with hidden input. Use a token scoped only to the CodeCrafter zone with Zone Read and Transform Rules Edit. Cache Purge permission is optional unless `-PurgeCache` is used.

The script owns only the rule identified by:

`codecrafter_seo_noindex_nonpage_assets`

It does not replace unrelated Cloudflare Transform Rules.

## Search Console

After a meaningful SEO deployment:

1. Confirm the sitemap is readable and resubmit it.
2. Use URL Inspection and Test Live URL on the homepage, highest-value service pages, pricing, portfolio, and newly published case studies.
3. Request indexing for priority pages within Google's available quota.
4. Use the sitemap for broad discovery rather than trying to manually submit every URL.
5. Treat exact stale asset search results with permanent `404/410/noindex` behavior first. Search Console Removals, when useful, should only be used for exact stale URLs after the permanent behavior is verified.
6. Review Page indexing, Core Web Vitals, HTTPS, Manual actions, and Security issues.

## Rules that should not regress

- Do not `Disallow: /assets/` in `robots.txt`.
- Do not use `noindex` on production HTML service pages.
- Do not configure an SPA catch-all that serves a 200 response for nonexistent URLs.
- Do not redirect topical historical URLs to homepage hash fragments.
- Do not create location pages for cities without real differentiated service information.
- Do not publish invented rankings, conversion data, testimonials, addresses, or client results.
- Keep Hebrew and English canonical/hreflang pairs aligned.
- Do not reintroduce DigitalOcean deployment steps for this site unless the hosting architecture changes again intentionally.
