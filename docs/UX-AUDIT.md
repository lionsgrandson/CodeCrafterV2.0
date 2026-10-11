# CodeCrafter UX and delivery audit — 2026-10-11

## Baseline and scope

Inspected React/Vite source, translations, page registry and enhancements, SSR/prerender pipeline, assets, Node server, Cloudflare Pages Functions, headers, redirects, robots, sitemap, CI, existing SEO documentation, and the separate Amit portfolio build. The production homepage was read without submitting a form. Before screenshots and Lighthouse JSON are in `docs/evidence`. Working tree was clean before this work.

Architecture: `App` provides language and layout; `Hero` includes navigation; `Services` and `Process` describe offers; `Portfolio` and `Testimonials` provide proof; `Footer` contains trust and legal links; `SeoPage` renders registry-driven service/information/case-study content. `entry-client` hydrates prerendered HTML and loads page data separately. `scripts/prerender.ts` generates 60 localized registry pages plus two home/portfolio pairs, a 62-URL sitemap, canonical tags, hreflang, Open Graph and structured data. The Amit/Firebase portfolio is a separate application under `/amitStarProject/`.

Deployment uses Cloudflare Pages, `functions/api/contact`, `_headers`, and `_redirects`. Apache and Node configurations are retained for compatibility. No deployment was made. Root GA ID `G-TJ3C0BBH0F` and Clarity ID `ogbt355cwc` were already present; no identifiers were invented. Search Console is an account-side service, not a browser tracking tag.

## Verified defects and changes

| Existing observation | Implemented change |
| --- | --- |
| Broad software/systems hero obscured website development | Website/landing-page H1, audience and quote action in both languages; immediate text without word animation |
| Homepage advertised five unrelated offers and all 13 projects | Three website offers, three existing website projects, link to complete portfolio; all services remain linked in footer |
| Business-bot card used positional slug and pointed at custom software | Replaced positional mapping with explicit website destinations; dedicated bot URL remains in service navigation |
| Browser accepted any HTTP 2xx as a lead, including honeypot suppression | Requires `ok`, `accepted`, and `provider_accepted`; suppressed requests cannot generate leads |
| Server accepted invalid phone-only inquiries | Shared frontend/backend validation, persistent labels, field-specific errors and contact-method instructions |
| Provider network failures escaped the Pages handler | Controlled 502, timeout, safe error response; client preserves input and offers retry/WhatsApp/phone |
| Service CTAs led to email/WhatsApp without a local form | Shared accessible quote form on every registry page; service navigation CTA stays on its page |
| Tracking loaded without consent; no custom scroll architecture | Consent-first loader, withdrawal and cross-tab handling, masked forms, safe event taxonomy and five milestones |
| Mobile fixed navigation covered part of hero kicker | Increased mobile top spacing; tablet navigation switches to the compact menu |
| Offscreen animation could hide SSR content | Content starts visible without the entrance-animation runtime; reduced-motion CSS and keyboard skip/focus affordances |
| Mahagony public preview returned 404 | Project retained as a visible portfolio article with unavailable-preview text; no broken external CTA |

## Contact-delivery evidence

The live read-only `/api/contact/health` returned HTTP 200 with `providerConfigured: true`. An existing inquiry was independently found in the connected Gmail inbox. Its message headers dated **2026-10-05** show delivery addressed to the business mailbox, forwarded into the connected inbox, with a Resend DKIM signature passing authentication. No customer identity or message content is stored in this report, and no new production inquiry was sent. This verifies historical delivery through the existing path, not universal delivery or deployment of these new changes. Forwarded mail showed SPF softfail alongside passing DKIM; review forwarding/authentication with the mail administrator before treating it as a deliverability defect.

Automated tests inject a mocked Resend transport into the same handler used by Node and Pages. They verify recipient configuration, reply-to, HTML escaping, provider ID requirement, idempotency header, validation, missing configuration, suppression, rejection and network failure. Successful provider acceptance means queued/accepted by Resend; inbox delivery is a separate outcome. No webhook or delivery-confirmed browser event is fabricated.

## Hypotheses requiring data

Unclear offer hierarchy, generic consultation wording, excess project choices, and remote contact actions plausibly increased friction. No GA funnel export or recorded-session analysis was available to quantify their effects. Existing Search Console history shows low traffic; conversion or A/B conclusions would be premature. Qualified leads require a separate business qualification process. ERP, bots, CMS and integrations lack public, service-specific project evidence in the repository; request approved examples before making case-study claims. Existing testimonials were retained; SumsUp's existing website testimonial is reused only on the website page.

## Design research and rationale

- [Nielsen Norman Group homepage principles](https://www.nngroup.com/articles/homepage-design-principles/): immediate purpose, predictable navigation and clear hierarchy. Applied to focused hero, visible headings and reduced choices.
- [Baymard required and optional fields](https://baymard.com/research-articles/required-optional-form-fields): persistent labels and explicit required/optional instructions. The study concerns ecommerce; applying those form mechanics to inquiries is a design inference, not a predicted conversion percentage.
- [W3C form labels](https://www.w3.org/WAI/tutorials/forms/labels/): associated labels, instructions and error relationships.
- [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): keyboard focus and usable controls.
- [web.dev Web Vitals](https://web.dev/articles/vitals): measure LCP, INP and CLS; distinguish lab results from field percentiles.
- [Google localized page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions): preserve separate URLs and reciprocal language alternates.
- [Linear](https://linear.app/) and [Ramotion](https://www.ramotion.com/) were reviewed as SaaS/agency references for concise hero hierarchy and proximity of work evidence to service claims. Existing CodeCrafter colors, photos, typography and assets are retained; no proprietary assets or layouts copied.

See `TESTING.md` for measured performance and limitations, `ANALYTICS.md` for implementation and account setup, and `SEO-STRATEGY.md` for intent ownership.

Public portfolio HEAD checks are recorded in `evidence/portfolio-links.json`: ten destinations returned 200 (including the local Amit build), Mahagony returned 404, and Yuval Kadosh/Rainbow could not be fetched by the test environment. The latter failures also occurred in the web reader and do not establish that those sites are universally unavailable. Their existing internal case studies remain functional; public destination reachability requires owner verification.
