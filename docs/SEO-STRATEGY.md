# SEO strategy — 2026-10-11

## Route ownership

All existing 62 canonical URLs and legacy redirects are retained. No new competing service slugs were created. Hebrew pages use `/service/`; English pages use `/en/service/`, with RTL/LTR and existing canonical/hreflang/x-default generation. Homepage titles, descriptions, H1 and social metadata now prioritize business websites and landing pages. `/websites/` remains the detailed website-service page. The homepage introduces the business and selection process; the service page explains implementation, scope, migration and FAQs. Monitor overlap in GSC rather than assuming all similarity is cannibalization.

| Existing service slug | Search intent |
| --- | --- |
| websites | Business websites, landing pages, custom website development |
| crm-development | Custom CRM, lead/customer workflows |
| cms-development | Content types, publishing and editorial permissions |
| erp-development | Connected operations, orders, inventory and procurement |
| automation | Repetitive business workflows |
| integrations | Authorized API/webhook connections and data ownership |
| custom-software | Internal systems, dashboards and bespoke business tools |
| app-development | Business mobile applications and distribution |
| business-bots | Business conversations, routing and human handoff |

Additional existing pages: inventory-systems, business-portals, web-app-development, pricing, about, locations and case studies. Their audience, content, FAQs and related links are preserved. Local contact forms now avoid requiring a visitor to leave the service intent before requesting a quote. Website pages reuse the genuine SumsUp testimonial. No ERP/mobile/automation case results were invented.

## Evidence and opportunities

The existing `SEO_2026_SEARCH_CONSOLE_BASELINE.md` reports an uploaded August 31, 2026 three-month export: 21 clicks and 1,630 impressions. This is historical evidence, not fresh account data. The connected GSC Wizard read returned `payment_required` because its trial/subscription is inactive; no subscription was purchased.

Recorded opportunities include `custom web development in israel` (106 impressions, position 14.70), custom CRM Hebrew (14 impressions, position 10.79), and existing app/software queries. Use that dated export cautiously. Hebrew phrases בניית אתרים לעסקים, בניית דפי נחיתה, פיתוח אתרים בהתאמה אישית and אוטומציה לעסקים guide page intent; current demand/volume is unverified. No search volumes were invented. Preserve the existing English home ownership of `web development company israel`, while the website service page supplies detailed custom-development information.

## Technical checks

SSR headings and relevant copy appear in HTML; service pages retain Service, BreadcrumbList and visible FAQ structured data. Sitemap, robots, redirects, canonical language variants, case-study paths, alt text, dimensions and lazy portfolio images are preserved. Mobile hero selects an existing 480px WebP with matching mobile preload; larger desktop images remain responsive. Heavy hero background motion was removed, content starts visible and tracking vendors load only on consent. The separate Amit demo remains excluded from commercial indexing under existing rules.

`npm run build` runs checks for all canonical routes and 44 deployment rules. Browser tests verify metadata, language alternates, no horizontal overflow and service forms across every registry URL in both languages at desktop/mobile widths. They also check representative redirects, local links and 404 behavior.

## Reporting and rollout

Export GSC page/date/device aggregates and GA4 landing-page/date/device aggregates, normalize origin and trailing slash, then join at the page/cohort level. Queries can explain aggregate intent; never assign an exact Google query to an individual user or inquiry. Monitor CTR, impressions and accepted-lead rate together. Some queries are anonymized or omitted; query-table totals need not equal chart totals.

After an authorized staging/release: verify served canonicals, sitemap and redirects; inspect representative pages in Search Console; annotate release date; compare equivalent traffic/time windows. Avoid publishing new near-duplicate location or service pages without distinct content and demand evidence. Recheck account data when access is restored using the existing Search Console account or free exports; a paid connector is not required.
