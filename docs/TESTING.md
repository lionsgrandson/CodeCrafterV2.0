# Testing and performance evidence — 2026-10-11

## Commands and coverage

- `npm run lint`: TypeScript check, including shared server and Cloudflare handlers.
- `npm test`: five Node test groups covering email-only/phone-only input, malformed requests, lengths, HTML escaping, recipient/reply-to, Resend idempotency header, provider-ID acceptance, rejection, timeout/network outcome, configuration and honeypot suppression; all scroll milestones, deduplication and changed height.
- `npm run build`: main client and SSR bundles, prerender, separate Amit application, 84 canonical route checks, 44 deployment/redirect/robots/header checks.
- `npm run test:e2e`: fourteen Chromium scenarios. The four route loops visit all 84 URLs at 1440×1000 and 390×844, covering Hebrew/English, canonical tags, hreflang, heading count, form presence and overflow. Other scenarios exercise form validation/recovery/unchanged-retry idempotency, accepted-lead deduplication, masked private inputs, both vendors, consent/loading/withdrawal, analytics refusal and vendor exceptions, scroll milestones/resize/history, mobile navigation, service links, FAQ, language switching with preserved anchor, section impressions, fixed error classifications, abandonment, representative redirects and 404s.
- Axe checks WCAG A/AA including 2.1/2.2 tags on the Hebrew/English homepage and website service page: zero violations in the sampled pages. This is an automated audit, not a claim of universal WCAG conformance.
- `git diff --check`: no whitespace errors.

The test server explicitly clears email credentials, even when the host has them. Browser form requests are mocked. The same backend implementation is exercised with an injected mock transport. GA4/Clarity network scripts are intercepted; tests verify call contracts and event privacy, not live vendor ingestion. Initial test failures were corrected: the consent initializer originally erased stored choices on reload, FAQ assertions needed to await native toggle dispatch, and the language URL assertion needed to preserve the contact anchor. No failures are suppressed.

CI now uses Node 22, runs unit and browser/accessibility checks after the existing build, and installs Chromium. The user subsequently authorized production publication. Production deployed successfully; no production POST or paid subscription occurred. GA4 key-event/custom-definition/enhanced-measurement settings and Clarity strict masking were updated in the existing accounts.

## Visual review

Before and after Hebrew desktop/mobile snapshots are in `evidence`. Final hero screenshots include Hebrew and English, with fully decoded images. Service desktop/mobile captures show the reusable website landing page and quote form. Final captures were reviewed for headline prominence, fixed-navigation clearance, CTA visibility, image rendering and English/Hebrew alignment. Baseline full-page captures reflect the old scroll-triggered entrance animations: offscreen content can appear hidden in a full-page snapshot. Final content is immediately visible without the animation runtime. Screenshot assets are evidence; no visual regression golden-file comparison against the deliberately changed design is asserted.

## Historical mobile Lighthouse lab comparison before production-content integration

Lighthouse 13.5.0 against local prerendered production output in Chromium, mobile simulation; a fresh default-consent session. `before-lighthouse.json` is the pre-change build. `final-lighthouse.json` is the final design after image/runtime optimization. Intermediate files show the detected regression and follow-up investigation.

| Metric | Baseline | Final |
| --- | ---: | ---: |
| Performance score | 95 | 96 |
| Accessibility score | 100 | 100 |
| SEO score | 100 | 100 |
| Simulated LCP | 2.713 s | 2.716 s |
| CLS | 0.000009 | 0.000628 |
| Total blocking time | 27 ms | 0 ms |
| Measured transfer weight | 533,915 bytes | 383,015 bytes |

The first changed build measured LCP around 3.32 s (91). The existing smaller mobile WebP reduced image bytes, and removing the main-site entrance-animation runtime reduced the client bundle from about 143 KB gzip to 101 KB. Final LCP is effectively unchanged at lab precision, blocking and payload improve, and layout shift remains well below 0.1. The separate Amit application still has its existing 819 KB uncompressed bundle warning and was not redesigned.

LCP remains above the 2.5 s good threshold in this mobile simulation. INP needs real interaction/field data; TBT is a lab indicator, not INP. Field LCP/INP/CLS at the 75th percentile across real devices and at consent-granted vendor load must be assessed on authorized staging/production, using the new web-vitals events and existing Search Console/CrUX where available. One before/after lab run is not a conversion or field-performance guarantee. Small environment variations can change scores and simulated timing.

## Delivery evidence and external verification

Production health is configured; historical inbox delivery on 2026-10-05 is verified through existing mail headers. The revised code's transport behavior is mock-verified and is now deployed; no new live provider/inbox test was generated. Resend acceptance and inbox delivery remain separate outcomes. Run an approved staging inquiry to a controlled test mailbox and inspect provider delivery evidence as the next delivery acceptance check.

GA4 key-event, 16 dimensions, two custom metrics and automatic-event settings are configured. Clarity strict masking is configured. New-event ingestion and actual recording/inbox acceptance remain pending. GSC Wizard access returned `payment_required`; the dated repo export is the only SEO measurement used. There is no new delivery webhook, no qualified-lead automation and no active experiment. See `ANALYTICS.md` for exact setup steps.

Existing dependency audits report unresolved findings (root: 7; separate Amit: 11). Broad major-version remediation was not mixed into this redesign. Track dependency remediation separately and verify provider/platform compatibility before release. Cloudflare's deployed distributed rate limiting was not verified; the local Node limiter is retained, while Pages relies on existing platform controls and the honeypot. Legal policy translations and actual recording behavior require review.

Portfolio HEAD results are saved in `evidence/portfolio-links.json`. Ten destinations returned 200; the Mahagony preview returned 404 and is now presented without a broken link. Yuval Kadosh and Rainbow were unreachable through both the test fetch and web reader; verify their public hosting separately. This does not affect their existing internal case-study routes.

## Live release verification

Cloudflare Pages codecrafter-v2 deployed commit debe22f on main successfully at 2026-10-11 10:08:15 UTC. Production SEO audit: 399 passed, two informational legal-page structured-data warnings, zero failed. Live browser sample: home/websites/services/resume in both languages at 1440 and 390 pixels, HTTP 200, one H1, no overflow or JavaScript errors; main pages have the expected forms; no analytics vendors load before consent. Live homepage axe checks report no violations. `evidence/live-smoke.json`, live screenshots and account-setting screenshots record evidence. A follow-up layout adjustment moves analytics preferences away from the existing accessibility widget and hides its duplicate trigger while the consent panel is open; all 14 local browser scenarios pass after this change.
