# SEO and editorial review — 22 November 2026

This release adds three bilingual case studies, three bilingual guides, a guides hub, a human-readable sitemap, and the Google Search Console HTML verification file.

## Case studies to review before treating them as final

These are publicly readable editorial drafts; the status is explicitly shown above the heading. Do not substitute invented metrics or certifications.

### Aderet & Argaman — /portfolio/aderet-argaman/
- Review the claims about WordPress core/plugin maintenance, Yoast, robots.txt, sitemap, accessibility checks and backups against the actual work log.
- Confirm which tasks were completed, which were only reviewed, and any independently checkable results.
- Verify the official site https://www.aderet-store.com/ and permission to show the existing logo.
- Check all screenshots, media usage permissions, domain ownership and customer approvals.
- Add before/after measurements only with a dated and attributable evidence source.

### Ilan Shachar — /portfolio/ilan-shachar/
- Review updates to About, pension, savings/investment, insurance, testimonials and partner sections.
- Confirm whether accessibility was reviewed or independently audited; do not claim certification without evidence.
- Confirm the public URL https://ilanshacar.netlify.app/ is still preferred, and replace with a custom domain only when verified.
- Check claims against the final live revision.

### Green Therapy — /portfolio/green-therapy/
- The current public site focuses on corporate wellness events, pop-up massages, ice baths, group sessions, refreshments, plus private treatments and the Beit Dagan venue.
- Confirm the actual CodeCrafter implementation scope and approved project wording.
- Add a genuine optimized portfolio screenshot or logo only with permission. Until then the card shows a text fallback, not another client's image.
- No conversion or SEO outcome is asserted without data.

## Regional page consolidation

The existing city and regional pages remain published: Tel Aviv, Haifa, Jerusalem, Beer Sheva, Karmiel, north and center.
Do **not** merge them solely because some paragraphs resemble one another. The connected Search Console reporting app was not available for measured indexing, queries, impressions or traffic in this session.

Before deciding to consolidate:
1. Export at least 3 months of Search Console page/query data and inspect index coverage.
2. Verify whether each page offers unique locally relevant service information and natural internal links.
3. For a retired page, map a relevant destination (not a generic homepage) and a permanent redirect.
4. Update the route registry, HTML sitemap, XML sitemap, internal links, hreflang and analytics known-path list.
5. Compare Search Console metrics following deployment; rankings and indexing cannot be guaranteed.

## Release checks

The repository has no GitHub Actions workflows (removed at the owner's instruction). The Cloudflare deployment is triggered by pushes to main, but merging is not proof that the live deployment completed.

Run locally before release when possible:
```bash
npm ci
npm run lint
npm run build
npm test
npx playwright install chromium
npm run test:e2e
```

After deployment, check:
- /google6768eed8771c59fe.html returns exactly the supplied one-line verification token.
- /site-map/ and /en/site-map/ show working links.
- /guides/ and /en/guides/ show distinct guides and correct language.
- /portfolio/aderet-argaman/, /portfolio/ilan-shachar/, /portfolio/green-therapy/ and their English counterparts are present.
- Every new page has one H1, canonical URL, reciprocal hreflang and useful metadata.
- Contact attribution is absent without analytics consent and includes only authorized campaign labels with consent.
- No unsupported self-declared rich-result scores or keyword rankings were added.

The Google verification file should remain in public/ to retain verification. Google Search Console verification must still be completed by the property owner after the file becomes publicly reachable.
