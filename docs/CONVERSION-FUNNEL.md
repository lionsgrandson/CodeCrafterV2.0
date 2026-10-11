# Conversion funnel and reporting specification

Use the existing GA4 Explorations, Search Console reports/exports and Clarity filters. Optional Looker Studio can join aggregate exports; no paid reporting infrastructure was introduced. Data reflects consenting visitors and is not a count of every visitor or every inbox inquiry.

| Stage | Evidence | Interpretation |
| --- | --- | --- |
| Landing | page_view plus GA4 landing-page/session dimensions | Entry to a consented session |
| Engagement | section impression or custom scroll_depth | Relevant content actually entered view / page depth reached |
| CTA | cta_click or specific contact-channel click | An action, not an inquiry |
| Form visible | contact_form_view | Real form entered viewport |
| Form started | form_start | First public field focus |
| Attempt | form_submit_attempt | Submit action, including validation failures |
| Accepted inquiry | generate_lead | Backend confirms provider accepted email; no inbox/qualification guarantee |
| Delivery | Provider delivered/bounced evidence | Historical inbox delivery verified separately; no live webhook metric yet |
| Qualified inquiry | Human qualification in existing business workflow | Separate from accepted inquiry; not collected automatically |

Backend response contract: `{ok:true, accepted:true, deliveryStatus:'provider_accepted'}` only after a successful provider response with an email ID. HTTP 200 alone is insufficient. Honeypot suppression returns accepted=false. Both frontend and provider idempotency prevent ordinary double-click/retry duplicates. Editing data begins a new idempotency key. Unknown network outcomes retain the same key for an unchanged retry. Resend's retention of idempotency keys is provider-defined; this is not a permanent global uniqueness database. No random/request identifier is added to analytics.

## Dashboard pages

| Question | Report and breakdown |
| --- | --- |
| Which landing pages attract visits and leads? | GA4 landing page, sessions, engaged sessions, accepted leads, rate by service/language |
| Which traffic generates qualified inquiries? | GA4 source/medium/campaign where available; separately aggregate human-qualified leads. Do not infer qualification from clicks |
| Where does scrolling stop? | Users reaching each custom threshold / page viewers; device, service, language; Clarity heatmap/recordings for context |
| Which CTA works? | CTA event, location and type; page viewers as denominator; keep WhatsApp/email/phone actions separate from leads |
| Which forms lose people? | Ordered exploration: view → start → attempt → accepted; optional pagehide signal; errors and latency |
| Which fields cause friction? | Validation error counts and affected users by field/error; no input values |
| Does device matter? | Use GA4 device category and matched page/source cohorts |
| Which services perform? | service_category × sessions, starts, accepted inquiries; low-count cautions |
| Does SEO lead to commercial results? | GSC page/date/device clicks/impressions/CTR/position joined with GA4 page cohorts and accepted rates |
| What is slow/broken? | LCP/INP/CLS percentiles and rating, error count/rate, contact latency and status classes |
| Did a release improve outcomes? | Release annotation and comparable cohorts; future approved experiment exposure and outcome |

Definitions: accepted-lead session rate = sessions with at least one generate_lead / eligible consented landing sessions. Form completion rate = users with an accepted inquiry / users with form_start in the same scope/window. Start rate = users with form_start / users with contact_form_view. Attempt acceptance rate = accepted request count / network submission count (form_submit_attempt also includes validation, so report that as attempt-to-lead rate separately). CTA click rate = users with CTA click / users viewing that page. Funnel abandonment = scoped starts without accepted inquiry by the end of the selected session/window, subject to consent/exit loss and return visits. Use distinct users or sessions consistently; do not divide raw click events by session counts and label the result a user rate.

Percentiles require sufficient samples. Average LCP or a single Lighthouse run is not a field Core Web Vitals assessment. Default funnel reports should exclude staff/test traffic and compatibility contact_click events where channel events are already counted. Query reporting is aggregate; an individual visitor's exact Google query is unavailable. Query removal currently sacrifices query-based campaign attribution; see `ANALYTICS.md`.

## Future approved experiments

No experiment is active. `exposeExperiment(id, variant)` provides validated exposure metadata only; it does not assign users, change copy or persist an experiment. First define eligibility, one stable assignment per session, exposure timing, primary accepted-inquiry metric, minimum sample and analysis window. Consider headline, quote wording, project position, testimonial position or WhatsApp/form emphasis, one change at a time. Do not add required questions merely to support measurement. Low-volume before/after comparisons can suggest investigation but cannot establish causation.
