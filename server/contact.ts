import { validateContact, type ContactInput } from '../src/lib/contactValidation'
export type ContactEnvironment = { RESEND_API_KEY?: string; RESEND_FROM_EMAIL?: string; CONTACT_NOTIFICATION_EMAIL?: string }
export function contactJson(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })
}
const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
// Shared by Cloudflare Pages and Node. Inject fetch only in tests.
export async function handleContact(request: Request, env: ContactEnvironment, send: typeof fetch = fetch) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error()
  } catch { return contactJson({ error: 'Invalid request body.' }, 400) }
  const input = Object.fromEntries(['name', 'email', 'phone', 'message', 'company'].map(key => [key, clean(payload[key])])) as ContactInput
  if (input.company) return contactJson({ ok: true, accepted: false })
  const errors = validateContact(input)
  if (Object.keys(errors).length) return contactJson({ error: 'Please check the submitted details.', fields: errors }, 400)
  const key = clean(request.headers.get('Idempotency-Key'))
  if (key && !/^[a-zA-Z0-9-]{16,80}$/.test(key)) return contactJson({ error: 'Invalid request identifier.' }, 400)
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return contactJson({ error: 'Email delivery is not configured.' }, 503)
  const language = payload.language === 'en' ? 'en' : 'he'
  const lines = [`Name: ${input.name}`, `Email: ${input.email || 'Not provided'}`, `Phone: ${input.phone || 'Not provided'}`, `Language: ${language}`, '', input.message]
  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', ...(key ? { 'Idempotency-Key': `contact-${key}` } : {}) },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({ from: env.RESEND_FROM_EMAIL, to: [env.CONTACT_NOTIFICATION_EMAIL || 'moshe@mosheschwartzberg.com'],
        ...(input.email ? { reply_to: input.email } : {}), subject: `New CodeCrafter inquiry from ${input.name}`,
        text: lines.join('\n'), html: `<h2>New CodeCrafter inquiry</h2><p>${lines.map(escapeHtml).join('<br>')}</p>` }),
    })
    const result = await response.json().catch(() => ({})) as { id?: string }
    if (!response.ok || !result.id) return contactJson({ error: 'Email provider did not accept the message.' }, 502)
    // Provider acceptance is not inbox delivery.
    return contactJson({ ok: true, accepted: true, deliveryStatus: 'provider_accepted' })
  } catch { return contactJson({ error: 'Could not send your message right now.' }, 502) }
}
