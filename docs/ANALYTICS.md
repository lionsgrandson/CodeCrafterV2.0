# Analytics implementation and verification

## Integration and consent

`src/lib/analytics.ts` is the sole main-site tracking layer. Existing IDs: GA4 `G-TJ3C0BBH0F`, Clarity `ogbt355cwc`, verified against repository/production baseline. Inline vendor tags were removed from `index.html`. `entry-client` installs listeners once outside React effects, preventing StrictMode duplicates. The separate Amit application is preserved and is not governed by this main-site measurement module.

Analytics default to off until explicit consent stored under `codecrafter-analytics-consent-v1`. No analytics script or event is loaded before consent. After grant, Google Consent Mode uses analytics storage granted, all advertising settings denied; Clarity uses current `consentv2` analytics granted/ad denied. Refusal and withdrawal disable dispatch immediately; withdrawal sends denied signals, clears accessible analytics cookies and reloads without vendors. Cross-tab storage changes also apply. Blocking localStorage leaves the next visit unconsented. The first-visit popup remembers acceptance or refusal. At the owner’s request, there is no persistent preferences button; subsequent visits and route changes do not reopen the popup after a saved choice. Clearing this site’s browser data resets the saved choice. Form processing does not depend on any vendor.

Sources: [Google consent](https://developers.google.com/tag-platform/security/guides/consent), [Clarity ConsentV2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2), [Clarity client API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api), [Google lead event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead), [Web Vitals](https://web.dev/articles/vitals).

## Event taxonomy

All custom events have `page_path`, `page_type`, `service_category`, `language`; approved experiments add `experiment_id` and `experiment_variant`. Use GA4 built-in device/source dimensions instead of redundant client device classification. Parameters accept only explicitly allowed keys and short token strings or numeric/boolean values. No raw link URLs, target text, error messages, user IDs or request IDs enter analytics.

| Event | Trigger and parameters | Deduplication |
| --- | --- | --- |
| page_view | Initial consented page, path-changing history push/replace, popstate or restored page; sanitized page_location/referrer | One reset per navigation; automatic config pageview disabled |
| nav_click | Anchor in navigation; cta_location | Each intentional click |
| mobile_menu_open | Closed menu opened | Open transition only |
| language_switch | Language change | One action |
| cta_click | Form-targeting anchor; cta_location, cta_type=form | One delegated handler, one click |
| whatsapp_click, email_click, phone_click | Contact channel anchors; cta_location; WhatsApp widget submission | No contact URL or composed text recorded |
| contact_click | Existing compatibility contact-channel event; contact_channel, cta_location | One per channel click, separate metric from channel-specific events |
| service_card_click | Homepage service card; target_service | Each click |
| service_page_navigation | Internal service URL; target_service, cta_location | Each click; distinct from card clicks |
| service_section_view | Named section entering central viewport; section_name | Element once per page view |
| portfolio_card_click | Case-study card/link; cta_location | Each click |
| outbound_project_click | Project external link; cta_location | Each click; no URL sent |
| faq_expand | FAQ accordion or native details opens; section_name=faq | Open only; repeated deliberate reopening is another action |
| contact_form_view | Real form enters viewport | Form element once per page view |
| form_start | First public field focus | Once per form instance |
| form_field_focus | Public field first focused; field_name | Each field once per form instance; no values or keystrokes |
| form_validation_error | Submit fails validation; field_name, error_type | Once per invalid field per attempt |
| form_submit_attempt | Submit action before validation | In-flight lock blocks duplicate submits |
| form_submit_error | Backend/network/timeout/nonaccepted response; error_type, status_code | Once per failed request |
| generate_lead | Explicit backend `ok=true`, `accepted=true`, `deliveryStatus=provider_accepted` | Local request UUID Set; backend same-payload retry uses Resend idempotency key; UUID is never sent to analytics |
| form_abandon | Pagehide after form start and before accepted submission | Navigation signal only; not a guaranteed report of abandonment |
| form_submission_latency | Request settles; duration_ms | Once per request |
| api_request_failed | Failed contact API request; static error_type, status_code | Once per failed request; do not sum with form_submit_error |
| javascript_error | Uncaught error/rejection; static error_type | No message, stack, URL or user data; each incident |
| web_vital | web-vitals reports LCP, INP, CLS; metric_name/value/rating | Library default final reporting; no DOM attribution strings |
| scroll_depth | Scroll thresholds; scroll_percent | Each milestone once per page view |
| experiment_exposure | Explicit future approved exposure call | No active experiment or random assignment today; future caller must invoke once per assigned exposure |

The old manual `form_submit` and `form_error` names are replaced by explicit attempt/error stages. GA4 enhanced-measurement form events can still exist until disabled in the property; they must not be treated as leads.

## Scroll behavior

25/50/75/90/100 use `(scrollY + viewportHeight) / documentHeight`. A passive scroll listener schedules a requestAnimationFrame, and ResizeObserver accounts for height changes. Short non-scrollable pages and the unscrolled top do not generate artificial milestones. A jump emits all crossed thresholds. The 100% threshold tolerates one tenth of a percentage point for rounding. Sets reset on actual page navigation and BFCache restore, not React render or hash-only navigation. Sections use IntersectionObserver, not polling.

Clarity receives corresponding `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90`, `scroll_100` events. Other custom events keep their names; page/service/language and approved experiment tags use Clarity `set`. GA4 enhanced scroll is named `scroll`; never sum it with `scroll_depth`. Disable enhanced scroll if one scroll source is desired. All five custom milestones are browser-tested in order, with resize deduplication and history resets; the pure calculation also tests changing heights.

## Privacy and attribution tradeoffs

Contact and WhatsApp forms have `data-clarity-mask=true`. Custom events exclude names, email, phone, message text, keystrokes, passwords, tokens, exact location and fingerprints. Exceptions send fixed classifications rather than message/stack text. Incoming query strings are removed before vendor loading because Clarity sees actual URLs. Only known internal anchor fragments are retained. GA4 receives a clean page URL and origin-only referrer; unknown routes do not load vendors. This intentionally sacrifices query-based campaigns, including UTM/gclid attribution. GA4 still supplies referrer/direct and consented-session acquisition; add only an approved, enumerated campaign mapping in a future change if campaign attribution is required. Arbitrary UTM values are not safe by default.

Removing same-page query strings is safe for the current main-site routes, which do not use query parameters. Reassess this policy before adding query-based application features. Pages/history support is measurement support; the current website navigates with normal anchors rather than a client-side router. Vendor-generated automatic dimensions and recording masking settings still require live staging verification; no claim of complete legal compliance is made.

Privacy-policy copy now names Microsoft Clarity, consent controls, masking and withdrawal. Legal review should assess Israeli notification/purpose/retention/transfer obligations and visitors covered by GDPR/ePrivacy or other laws, vendor processing contracts, withdrawal/deletion processes and policy translations. [Israel Privacy Protection Authority Amendment 13 guidance](https://www.gov.il/he/pages/tikun13_qa) was reviewed; the technical consent choice is not a legal determination. No paid CMP or reporting service was added.

## Required external account setup

1. In existing GA4 web stream, disable automatic form interactions to prevent parallel form_start/form_submit counts; disable enhanced scroll or explicitly exclude `scroll` from custom reports. Check automatic history page views against the manual page-view architecture.
2. Mark `generate_lead` as a key event. Retire any submit-click conversion/key event.
3. Register event-scoped custom dimensions: page_type, service_category, section_name, cta_location, cta_type, field_name, error_type, scroll_percent, experiment_id, experiment_variant, delivery_status. Use numeric custom metrics for latency/vital values as needed. Respect property quota; do not register built-in page/device/source dimensions twice.
4. Verify staging through GA4 DebugView (using a test-only debug configuration), Realtime and Clarity recordings/custom-event filters. Use a staging stream/project or exclude test traffic before sending diagnostics. Mocked tests prove the call contract, not vendor ingestion.
5. In Clarity, verify strict masking, both form types, consent status, page/service/language tags and event filters. Check all contact fields in a consenting staging recording without real personal information.
6. Restore direct Search Console/free-export access or optional existing connector subscription only at the owner's choice. No new properties were created and no paid service was purchased. Existing-account release changes are recorded below.
7. Provider acceptance is not delivery confirmation. A future signed Resend delivered/bounced webhook needs secure storage and server-side correlation before reporting delivery outcomes; it is not implemented or fabricated here.

## Verification

Run `npm test`, `npm run build`, `npm run test:e2e`. Browser spies capture calls to each vendor, assert consent gating and withdrawal, lead uniqueness, no private input, milestones and page history. Network vendor scripts are blocked in tests. The form tests intercept only local `/api/contact`; the test server has mail credentials cleared. `docs/evidence/browser-results.json` records results.

## Existing account release configuration — 2026-10-11

GA4 property 546129674 / stream 15283151293 / G-TJ3C0BBH0F verified. `generate_lead` is now a key event. Automatic scroll/outbound/search/form collection and history page-change events were disabled to avoid duplicates and URL-value collection. Video and file downloads remain enabled; application page_view uses send_page_view=false. Registered 16 event dimensions: page_type, service_category, language (Content language), section_name, cta_location, cta_type, contact_channel, target_service, field_name, error_type, scroll_percent, delivery_status, experiment_id, experiment_variant, metric_name, metric_rating. Registered duration_ms in milliseconds and metric_value as standard; always filter Vital name before comparing mixed vital units. New definitions need processing time; no causal conversion improvement is asserted.

Clarity project ogbt355cwc verified and strict masking selected with confirmation. Masking changes can take an hour and cannot be applied retroactively. Actual new-event ingestion and consent-tag/recording checks remain pending; no fabricated production inquiry or test lead was sent. Evidence screenshots are in docs/evidence.
