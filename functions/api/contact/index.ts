type ContactEnvironment = {
  RESEND_API_KEY?: string
  RESEND_FROM_EMAIL?: string
  CONTACT_NOTIFICATION_EMAIL?: string
}

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  message?: string
  company?: string
  language?: string
}

type PagesContext = {
  request: Request
  env: ContactEnvironment
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function onRequestPost({ request, env }: PagesContext) {
  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  const name = clean(payload.name)
  const email = clean(payload.email)
  const phone = clean(payload.phone)
  const message = clean(payload.message)
  const company = clean(payload.company)
  const language = clean(payload.language) === 'en' ? 'en' : 'he'

  if (company) return json({ ok: true })

  if (!name || !email || !message) {
    return json(
      { error: 'Please provide your name, email, and message.' },
      400,
    )
  }

  if (
    name.length > 120 ||
    email.length > 254 ||
    phone.length > 40 ||
    message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return json({ error: 'Please check the submitted details.' }, 400)
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: 'Email delivery is not configured.' }, 500)
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [env.CONTACT_NOTIFICATION_EMAIL || 'moshe@mosheschwartzberg.com'],
      reply_to: email,
      subject: `New CodeCrafter inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Language: ${language}`,
        '',
        message,
      ].join('\n'),
      html: `
        <h2>New CodeCrafter inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    }),
  })

  const providerResult = (await response.json().catch(() => ({}))) as {
    id?: string
    message?: string
  }

  if (!response.ok) {
    console.error('Resend rejected the contact email:', providerResult.message)
    return json({ error: 'Email provider rejected the message.' }, 502)
  }

  return json({ ok: true, emailId: providerResult.id })
}

export function onRequest() {
  return json({ error: 'Method not allowed.' }, 405)
}
