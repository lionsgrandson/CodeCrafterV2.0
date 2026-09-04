import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const app = express()
const preferredPort = Number(process.env.PORT || 5173)
const canonicalOrigin = 'https://mosheschwartzberg.com'
const contactAttempts = new Map<string, number[]>()
const contactWindowMs = 10 * 60 * 1000
const maxContactAttempts = 5

const legacyRedirects = new Map<string, string>([
  ['/blog.html', '/websites/'],
  ['/index.html', '/'],
  ['/blog/free-domains-new-era-internet', '/websites/'],
  ['/blog/perfect-lighthouse', '/websites/'],
  ['/blog/backend-code-horror', '/custom-software/'],
  ['/blog/5-website-must-have', '/websites/'],
  ['/portfolio/idf-tech-maintenance-corps-v2', '/portfolio/'],
  ['/portfolio/rainbow-asd', '/portfolio/'],
  ['/portfolio/nexa-automations-glass-ui', '/automation/'],
])

app.use(express.json({ limit: '32kb' }))

app.use((req, res, next) => {
  const host = req.headers.host?.toLowerCase().split(':')[0]
  if (host === 'www.mosheschwartzberg.com') {
    return res.redirect(301, `${canonicalOrigin}${req.originalUrl}`)
  }

  const pathname = req.path.replace(/\/$/, '').toLowerCase() || '/'
  const redirectTarget = legacyRedirects.get(pathname)
  if (redirectTarget) {
    return res.redirect(301, redirectTarget)
  }

  next()
})

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  message?: string
  company?: string
  language?: string
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

function isRateLimited(ip: string) {
  const now = Date.now()
  const recentAttempts = (contactAttempts.get(ip) || []).filter(
    (timestamp) => now - timestamp < contactWindowMs,
  )

  if (recentAttempts.length >= maxContactAttempts) {
    contactAttempts.set(ip, recentAttempts)
    return true
  }

  contactAttempts.set(ip, [...recentAttempts, now])
  return false
}

app.get('/api/contact/health', (_req, res) => {
  res.json({
    ok: true,
    providerConfigured: Boolean(
      process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL,
    ),
  })
})

app.post('/api/contact', async (req, res) => {
  const body = req.body as ContactPayload
  const name = clean(body.name)
  const email = clean(body.email)
  const phone = clean(body.phone)
  const message = clean(body.message)
  const company = clean(body.company)
  const language = clean(body.language) === 'en' ? 'en' : 'he'
  const ip =
    clean(req.headers['cf-connecting-ip']) ||
    clean(req.headers['x-forwarded-for']).split(',')[0] ||
    req.ip

  if (company) {
    return res.json({ ok: true })
  }

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Too many contact attempts. Please try again later.' })
  }

  if (!name || (!email && !phone)) {
    return res
      .status(400)
      .json({ error: 'Please provide your name and a phone number or email.' })
  }

  if (
    name.length > 120 ||
    email.length > 254 ||
    phone.length > 40 ||
    message.length > 5000 ||
    (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return res.status(400).json({ error: 'Please check the submitted details.' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return res.status(500).json({ error: 'Email delivery is not configured.' })
  }

  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL || 'moshe@mosheschwartzberg.com'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [to],
      ...(email ? { replyTo: email } : {}),
      subject: `New CodeCrafter inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email || 'Not provided'}`,
        `Phone: ${phone || 'Not provided'}`,
        `Language: ${language}`,
        '',
        message,
      ].join('\n'),
      html: `
      <h2>New CodeCrafter inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Language:</strong> ${language}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message || 'No message provided').replace(/\n/g, '<br>')}</p>
    `,
    })

    if (error) {
      console.error('Resend rejected the email:', error)

      return res.status(500).json({
        error: 'Email provider rejected the message.',
        details: error.message,
      })
    }

    console.log('Email sent successfully:', data)

    return res.json({
      ok: true,
      emailId: data?.id,
    })
  } catch (error) {
    console.error('Unexpected contact-email error:', error)

    return res.status(500).json({
      error: 'Could not send your message right now.',
    })
  }
})

if (isProduction) {
  const amitStarDistPath = path.join(__dirname, 'dist', 'amitStarProject')

  app.get(/^\/amitStarProject$/, (_req, res) => {
    res.redirect(301, '/amitStarProject/')
  })
  app.use('/amitStarProject', express.static(amitStarDistPath))
  app.get('/amitStarProject/*', (_req, res) => {
    res.sendFile(path.join(amitStarDistPath, 'index.html'))
  })

  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (_req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'))
  })
} else {
  const { createServer } = await import('vite')
  const hmrPort = Number(process.env.HMR_PORT || 24679)
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR === 'true' ? false : { port: hmrPort },
    },
    appType: 'spa',
  })
  app.use(vite.middlewares)
}

function listen(port: number) {
  const server = app.listen(port, () => {
    console.log(`CodeCrafter running at http://localhost:${port}`)
  })

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE' && !process.env.PORT && !isProduction) {
      console.warn(`Port ${port} is already in use. Trying ${port + 1}...`)
      listen(port + 1)
      return
    }

    throw error
  })
}

listen(preferredPort)
