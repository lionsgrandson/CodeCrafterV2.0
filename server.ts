import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleContact } from './server/contact'

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
  ['/portfolio/index.html', '/portfolio/'],
  ['/about/index.html', '/about/'],
  ['/blog/free-domains-new-era-internet', '/websites/'],
  ['/blog/perfect-lighthouse', '/websites/'],
  ['/blog/backend-code-horror', '/custom-software/'],
  ['/blog/5-website-must-have', '/websites/'],
  ['/portfolio/idf-tech-maintenance-corps-v2', '/portfolio/'],
  ['/portfolio/nexa-automations-glass-ui', '/automation/'],
])

const obsoleteAssetPaths = new Set(['/favicon.svg', '/manifest.json'])
const nonIndexableAssetExtensions = ['.js', '.mjs', '.css', '.map', '.json', '.webmanifest']

function shouldNoIndexAsset(pathname: string) {
  const normalized = pathname.toLowerCase()
  return (
    normalized === '/favicon.svg' ||
    nonIndexableAssetExtensions.some((extension) => normalized.endsWith(extension))
  )
}

app.use(express.json({ limit: '32kb' }))

app.use((req, res, next) => {
  const host = req.headers.host?.toLowerCase().split(':')[0]
  if (host === 'www.mosheschwartzberg.com') {
    return res.redirect(301, `${canonicalOrigin}${req.originalUrl}`)
  }

  const lowerPath = req.path.toLowerCase()
  if (shouldNoIndexAsset(lowerPath)) {
    res.setHeader('X-Robots-Tag', 'noindex')
  }

  if (obsoleteAssetPaths.has(lowerPath)) {
    return res.status(410).type('text/plain').send('Gone')
  }

  const rawPath = req.path.replace(/\/$/, '') || '/'
  const pathname = rawPath.toLowerCase()

  // Preserve the historical Rainbow URL while canonicalizing old mixed-case links.
  if (pathname === '/portfolio/rainbow-asd' && rawPath !== '/portfolio/rainbow-asd') {
    return res.redirect(301, '/portfolio/rainbow-asd/')
  }

  const redirectTarget = legacyRedirects.get(pathname)
  if (redirectTarget) {
    return res.redirect(301, redirectTarget)
  }

  next()
})

app.get('/api/contact/health', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.json({ ok: true, providerConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) })
})
app.post('/api/contact', async (req, res) => {
  const ip = req.ip || 'unknown'
  const now = Date.now()
  const recent = (contactAttempts.get(ip) || []).filter(time => now - time < contactWindowMs)
  if (recent.length >= maxContactAttempts) return res.status(429).json({ error: 'Too many contact attempts.' })
  contactAttempts.set(ip, [...recent, now])
  for (const [key, times] of contactAttempts) if (times.every(time => now - time >= contactWindowMs)) contactAttempts.delete(key)
  const response = await handleContact(new Request('http://localhost/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': String(req.headers['idempotency-key'] || '') },
    body: JSON.stringify(req.body),
  }), process.env)
  response.headers.forEach((value, key) => res.setHeader(key, value))
  res.status(response.status).send(await response.text())
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