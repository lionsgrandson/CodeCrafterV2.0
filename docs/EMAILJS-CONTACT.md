# CodeCrafter contact form — EmailJS delivery

The Hebrew and English contact forms on both the homepage and service pages submit directly from the visitor's browser to EmailJS. They no longer depend on Cloudflare Pages Functions, Resend credentials or the legacy `/api/contact` endpoint.

## Configured browser delivery

- Service ID: `service_lx51il8`
- Contact Us template ID: `template_jux7c9h`
- Public key: `aS_Kd2on0E1C1dTBv`
- Endpoint: `POST https://api.emailjs.com/api/v1.0/email/send`
- Client implementation: `src/lib/emailjsContact.ts`
- Browser form: `src/components/ContactForm.tsx`
- Cloudflare CSP: `public/_headers` explicitly permits `https://api.emailjs.com` under `connect-src`.

Only EmailJS **public** identifiers are embedded in the frontend. No private API key should be placed in source.

## Verify the existing EmailJS dashboard configuration

1. Confirm the service is connected and the **Contact Us** template `template_jux7c9h` belongs to it.
2. Configure **To Email** to the intended CodeCrafter inbox (for example, `moshe@mosheschwartzberg.com`) in the EmailJS template itself. **Do not** use `{{email}}` for the destination: it represents the person filling out the form.
3. Use `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`, `{{title}}`, `{{time}}` as required by the EmailJS pre-built Contact Us template. `{{contact_email}}` contains the real supplied email or "Not provided".
4. Use `{{reply_to}}` for **Reply-To** when the template supports it. For a phone-only enquiry, `{{reply_to}}` and `{{email}}` fall back to the CodeCrafter mailbox to avoid invalid email headers; the **message body accurately says "Email: Not provided."**
5. If **Domains / Allowed origins** are configured in EmailJS, add `https://mosheschwartzberg.com` and any actual preview host you need to test.
6. After deploying, send a real test enquiry from both the Hebrew and English pages with your own test details. Confirm that EmailJS accepts the message, verify the intended mailbox receives it, and check spam and EmailJS history if it does not arrive.
7. If spam becomes an issue, enable appropriate EmailJS spam protections, origin restrictions and CAPTCHA. The client-side honeypot is supplementary and does not substitute for provider enforcement.

The form validates name and at least one contact method, preserves values on errors, and marks success **only if EmailJS returns HTTP 200 and the exact response body `OK`**. An accepted API request does not prove mailbox delivery. No automatic retry occurs because that could duplicate delivered enquiries.

## Variable handling and privacy

The `message` variable includes the visitor's message, name, email and phone, so basic EmailJS templates still receive enough information. Campaign fields (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, landing path and referrer origin) are included only after analytics consent; raw search terms and advertising click IDs are never included. Names, contact details and free-text messages are not sent to GA4 or Clarity.

The privacy notice documents that form data goes directly from the browser to EmailJS, independent of analytics consent.

## Tests

- `tests/emailjs.test.ts`: provider request structure, exact IDs, phone-only fallback, consent-safe fields and failure handling.
- `tests/browser/site.spec.ts`: mocked EmailJS API success/failure, form validation, retry, lead tracking and privacy.
- `scripts/seo-config-check.mjs`: prevents removal of the Cloudflare CSP allowance.
- `npm run build`: includes the EmailJS unit tests in postbuild.

No live EmailJS transmission was attempted by this code change. The account's template, recipient and domain restrictions cannot be established from the public identifiers alone.
