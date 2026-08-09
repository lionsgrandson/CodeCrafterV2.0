import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const argument = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

const distDir = argument('--dist') ?? 'dist'
const baseUrl = argument('--base-url')?.replace(/\/$/, '')
const canonicalOrigin = 'https://mosheschwartzberg.com'
const routes = [
  { path: '/', file: 'index.html' },
  { path: '/portfolio/', file: 'portfolio/index.html' },
  { path: '/privacy/', file: 'privacy/index.html' },
  { path: '/terms/', file: 'terms/index.html' },
]

const fail = (message) => {
  throw new Error(`SEO check failed: ${message}`)
}

const count = (value, pattern) => [...value.matchAll(pattern)].length
const attribute = (html, selector) => html.match(selector)?.[1]?.trim() ?? ''
const visibleText = (html) => html
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;|&#34;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ')
  .trim()

const readRoute = async ({ path, file }) => {
  if (baseUrl) {
    const response = await fetch(`${baseUrl}${path}`, { redirect: 'manual' })
    if (response.status !== 200) fail(`${path} returned ${response.status}`)
    if (/noindex|none/i.test(response.headers.get('x-robots-tag') ?? '')) {
      fail(`${path} has a restrictive X-Robots-Tag`)
    }
    return response.text()
  }

  const filePath = join(distDir, file)
  if (!existsSync(filePath)) fail(`missing built route ${file}`)
  return readFileSync(filePath, 'utf8')
}

const documents = new Map()
for (const route of routes) {
  const html = await readRoute(route)
  documents.set(route.path, html)

  const title = attribute(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
  const description = attribute(html, /<meta\s+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
  const canonical = attribute(html, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
  const robots = attribute(html, /<meta\s+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)

  if (count(html, /<title\b/gi) !== 1 || !title) fail(`${route.path} must have one title`)
  if (count(html, /<meta\s+name=["']description["']/gi) !== 1 || !description) fail(`${route.path} must have one description`)
  if (count(html, /<link\s+rel=["']canonical["']/gi) !== 1) fail(`${route.path} must have one canonical`)
  if (!canonical.startsWith(`${canonicalOrigin}/`)) fail(`${route.path} has a malformed canonical: ${canonical}`)
  if (/noindex|none/i.test(robots)) fail(`${route.path} is unexpectedly noindex`)
  if (count(html, /<h1\b/gi) !== 1) fail(`${route.path} must have one h1`)
}

const home = documents.get('/')
if (!home?.includes('<html lang="he" dir="rtl">')) fail('homepage language or direction is incorrect')
if (attribute(home, /<title[^>]*>([\s\S]*?)<\/title>/i) !== 'CodeCrafter | בניית אתרים, אוטומציות ומערכות לעסקים') {
  fail('homepage title changed')
}
if (attribute(home, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) !== `${canonicalOrigin}/`) {
  fail('homepage canonical is not self-referencing')
}

for (const match of home.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
  const value = JSON.parse(match[1])
  const serialized = JSON.stringify(value)
  if (/placeholder|example\.com|your[_ -]?(name|email|phone)/i.test(serialized)) fail('structured data contains a placeholder')
  if (/AggregateRating|"Review"/.test(serialized)) fail('structured data contains controlled ratings or reviews')
}

const sitemapText = baseUrl
  ? await (await fetch(`${baseUrl}/sitemap.xml`)).text()
  : readFileSync(join(distDir, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const expectedSitemapUrls = routes.map(({ path }) => `${canonicalOrigin}${path}`)
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemapUrls)) fail('sitemap URLs do not match canonical indexable routes')

const llmsText = baseUrl
  ? await (await fetch(`${baseUrl}/llms.txt`)).text()
  : readFileSync(join(distDir, 'llms.txt'), 'utf8')
if (!/^#\s+\S+/m.test(llmsText)) fail('llms.txt has no H1')
if (!/\[[^\]]+\]\(https:\/\/[^)]+\)/.test(llmsText)) fail('llms.txt has no HTTPS Markdown link')

if (!baseUrl) {
  const snapshot = JSON.parse(readFileSync('seo/visible-text.snapshot.json', 'utf8'))
  for (const [path, expected] of Object.entries(snapshot)) {
    const routePath = path === '/' ? '/' : `${path}/`
    const text = visibleText(documents.get(routePath) ?? '')
    const sha256 = createHash('sha256').update(text).digest('hex')
    if (text.length !== expected.length || sha256 !== expected.sha256) {
      fail(`visible text changed on ${path}: ${text.length}/${sha256}`)
    }
  }
} else {
  for (const asset of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/og-logo.png', '/favicon.ico', '/apple-touch-icon.png']) {
    const response = await fetch(`${baseUrl}${asset}`, { redirect: 'manual' })
    if (response.status !== 200) fail(`${asset} returned ${response.status}`)
  }

  const missing = await fetch(`${baseUrl}/seo-soft-404-probe-8f15c`, { redirect: 'manual' })
  if (missing.status !== 404) fail(`missing route returned ${missing.status}`)

  for (const variant of ['http://mosheschwartzberg.com/', 'http://www.mosheschwartzberg.com/', 'https://www.mosheschwartzberg.com/']) {
    const response = await fetch(variant, { redirect: 'manual' })
    if (![301, 308].includes(response.status) || response.headers.get('location') !== `${canonicalOrigin}/`) {
      fail(`${variant} does not redirect directly to the canonical homepage`)
    }
  }
}

console.log(`SEO checks passed for ${routes.length} public routes${baseUrl ? ' in production' : ''}.`)
