import type { ContactInput } from './contactValidation'
import type { CampaignAttribution } from './campaignAttribution'
import { normalizeCampaignAttribution } from './campaignAttribution'
import { contact } from './contact'

// EmailJS public identifiers are designed for browser use. The recipient address
// and Reply-To handling are configured in the EmailJS dashboard template.
export const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'
export const EMAILJS_SERVICE_ID = 'service_lx51il8'
export const EMAILJS_TEMPLATE_ID = 'template_jux7c9h'
export const EMAILJS_PUBLIC_KEY = 'aS_Kd2on0E1C1dTBv'

export type ContactLanguage = 'he' | 'en'

export function buildEmailJSTemplateParams(
  input: ContactInput,
  language: ContactLanguage,
  attribution?: CampaignAttribution,
  submittedAt: Date = new Date(),
): Record<string, string> {
  const name = input.name.trim()
  const email = input.email.trim()
  const phone = input.phone.trim()
  const details = input.message.trim() || (language === 'he' ? 'לא נמסר פירוט נוסף.' : 'No additional project details provided.')
  const campaign = normalizeCampaignAttribution(attribution)
  const campaignParams: Record<string, string> = {}
  for (const [key, value] of Object.entries(campaign ?? {})) {
    if (typeof value === 'string') campaignParams[key] = value
  }
  const campaignLines = Object.entries(campaignParams).map(([key, value]) => `${key}: ${value}`)

  // The message field is deliberately self-contained: a basic EmailJS template
  // with only {{name}} and {{message}} still receives every contact method.
  const message = [
    details,
    '',
    `Name: ${name}`,
    `Email: ${email || 'Not provided'}`,
    `Phone: ${phone || 'Not provided'}`,
    `Language: ${language}`,
    ...(campaignLines.length ? ['', 'Consented campaign information:', ...campaignLines] : []),
  ].join('\n')

  return {
    name,
    from_name: name,
    // Some EmailJS templates use {{email}} directly in Reply-To. Keep it valid
    // for phone-only enquiries; the message clearly states no email was supplied.
    email: email || contact.email,
    contact_email: email || 'Not provided',
    to_email: contact.email,
    from_email: email || contact.email,
    reply_to: email || contact.email,
    phone: phone || 'Not provided',
    message,
    project_message: details,
    subject: `New CodeCrafter enquiry from ${name}`,
    title: `New CodeCrafter enquiry from ${name}`,
    language,
    time: submittedAt.toISOString(),
    submitted_at: submittedAt.toISOString(),
    ...campaignParams,
  }
}

// EmailJS REST /send returns HTTP 200 with the plain-text body "OK".
// An HTTP 200 from a fallback page or proxy is not evidence of acceptance.
export async function sendContactWithEmailJS(
  input: ContactInput,
  language: ContactLanguage,
  attribution?: CampaignAttribution,
  send: typeof fetch = fetch,
): Promise<void> {
  const response = await send(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: buildEmailJSTemplateParams(input, language, attribution),
    }),
    signal: AbortSignal.timeout(16000),
  })
  if (!response.ok || (await response.text()).trim() !== 'OK') {
    throw new Error('emailjs_not_accepted')
  }
}
