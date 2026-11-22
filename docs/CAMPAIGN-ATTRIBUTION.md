# Consent-based enquiry source attribution

## Purpose
Tie a contact form submission to a descriptive campaign source. The implementation **does not** confirm a sale, store CRM records, perform offline conversion uploads, or promise higher search visibility.

## Client flow
1. The visitor sees the analytics consent panel when no choice is stored.
2. If analytics consent is granted, the page reads these permitted parameters before analytics removes the query string from the address bar: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
3. The page also captures the landing path and the **origin only** of an external referrer, without path or query.
4. The approved fields are validated, size-limited and stored in first-party `sessionStorage` for up to 30 minutes. No cookies are created by this feature.
5. If the user sends the contact form while consent is granted, the allowed fields accompany the enquiry. The client normalizes the permitted fields and includes them in EmailJS template parameters only with analytics consent. The form is sent directly to EmailJS through its browser-accessible REST API; the EmailJS template decides the recipient.
6. Declining or withdrawing analytics consent prevents attribution and clears the temporary stored data.

## Not captured or exported
- Names, emails, phone numbers or message contents are never sent to GA4 or Clarity by this feature.
- `utm_term` is not captured.
- Advertising click IDs such as `gclid`, `msclkid`, `fbclid` are not collected.
- Full referrer URLs, query strings, and arbitrary user-provided keys are excluded.
- Campaign labels should not be treated as proof of provider attribution: a user may submit modified field values.

## Measuring actual paying customers
When consent has been granted, each EmailJS notification can include the permitted campaign labels. Use a private CRM or other authorized lead register to link later sales outcomes to enquiries. This is currently **manual**: there is no automatic CRM integration or offline conversion upload, and no claim that the system identifies a paid sale automatically.

Privacy and consent descriptions were updated alongside the implementation.
