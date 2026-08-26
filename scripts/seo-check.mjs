import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const argument = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

const distDir = argument('--dist') ?? 'dist'
const baseUrl = argument('--base-url')?.replace(/\/$/, '')
const origin = 'https://mosheschwartzberg.com'
const fail = (message) => { throw new Error(`SEO check failed: ${message}`) }
const count = (value, pattern) => [...value.matchAll(pattern)].length
const capture = (html, pattern) => html.match(pattern)?.[1]?.trim() ?? ''

const readAsset = async (assetPath) => {
  if (baseUrl) {
    const response = await fetch(`${baseUrl}${assetPath}`, { redirect: 'manual' })
    if (response.status !== 200) fail(`${assetPath} returned ${response.status}`)
    return response.text()
  }
  const filePath = join(distDir, assetPath.replace(/^\//, ''))
  if (!existsSync(filePath)) fail(`missing built asset ${assetPath}`)
  return readFileSync(filePath, 'utf8')
}

const sitemapText = await readAsset('/sitemap.xml')
try {
  if (!sitemapText.startsWith('<?xml')) fail('sitemap has no XML declaration')
  if (count(sitemapText, /<url>/g) !== count(sitemapText, /<\/url>/g)) fail('sitemap URL elements are unbalanced')
} catch (error) {
  fail(`sitemap XML is malformed: ${error.message}`)
}

const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (sitemapUrls.length < 20) fail(`expected a substantial public sitemap, found ${sitemapUrls.length} URLs`)
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('sitemap contains duplicate URLs')
if (sitemapUrls.some((url) => !url.startsWith(`${origin}/`))) fail('sitemap contains a non-canonical origin')
if (sitemapUrls.some((url) => /blog\.html|amitStarProject|index\.html/i.test(url))) fail('sitemap contains a redirect or noindex route')

const documents = new Map()
for (const url of sitemapUrls) {
  const routePath = new URL(url).pathname
  let html
  if (baseUrl) {
    const response = await fetch(`${baseUrl}${routePath}`, { redirect: 'manual' })
    if (response.status !== 200) fail(`${routePath} returned ${response.status}`)
    if (/noindex|none/i.test(response.headers.get('x-robots-tag') ?? '')) fail(`${routePath} has restrictive X-Robots-Tag`)
    html = await response.text()
  } else {
    const file = routePath === '/' ? 'index.html' : `${routePath.replace(/^\/+|\/+$/g, '')}/index.html`
    const filePath = join(distDir, file)
    if (!existsSync(filePath)) fail(`missing built route ${file}`)
    html = readFileSync(filePath, 'utf8')
  }
  documents.set(routePath, html)

  const title = capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
  const description = capture(html, /<meta\s+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
  const canonical = capture(html, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
  const robots = capture(html, /<meta\s+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)
  const expectedCanonical = `${origin}${routePath}`

  if (count(html, /<title\b/gi) !== 1 || !title) fail(`${routePath} must have one title`)
  if (count(html, /<meta\s+name=["']description["']/gi) !== 1 || !description) fail(`${routePath} must have one description`)
  if (description.length < 70 || description.length > 190) fail(`${routePath} description length is ${description.length}`)
  if (count(html, /<link\s+rel=["']canonical["']/gi) !== 1 || canonical !== expectedCanonical) fail(`${routePath} canonical is ${canonical}`)
  if (/noindex|none/i.test(robots)) fail(`${routePath} is unexpectedly noindex`)
  if (count(html, /<h1\b/gi) !== 1) fail(`${routePath} must have one h1`)
  if (!/<main\b/i.test(html) || !/<nav\b/i.test(html) || !/<footer\b/i.test(html)) fail(`${routePath} lacks semantic page regions`)
  if (!/<a\s+[^>]*href=["']\//i.test(html)) fail(`${routePath} has no internal outlink in raw HTML`)
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image']) {
    if (!new RegExp(`<meta\\s+property=["']${key}["']`, 'i').test(html)) fail(`${routePath} is missing ${key}`)
  }
  for (const key of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    if (!new RegExp(`<meta\\s+name=["']${key}["']`, 'i').test(html)) fail(`${routePath} is missing ${key}`)
  }

  const isEnglish = routePath === '/en/' || routePath.startsWith('/en/')
  if (isEnglish && !/<html\s+lang=["']en["']\s+dir=["']ltr["']>/i.test(html)) fail(`${routePath} must be English LTR`)
  if (!isEnglish && !/<html\s+lang=["']he["']\s+dir=["']rtl["']>/i.test(html)) fail(`${routePath} must be Hebrew RTL`)

  if (!['/privacy/', '/terms/'].includes(routePath)) {
    for (const code of ['he', 'en', 'x-default']) {
      if (!new RegExp(`<link\\s+rel=["']alternate["'][^>]*hreflang=["']${code}["']`, 'i').test(html)) fail(`${routePath} is missing ${code} hreflang`)
    }
    const scripts = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    if (!scripts.length) fail(`${routePath} is missing JSON-LD`)
    for (const script of scripts) {
      const parsed = JSON.parse(script[1])
      const serialized = JSON.stringify(parsed)
      if (/placeholder|example\.com|AggregateRating|"Review"/i.test(serialized)) fail(`${routePath} schema contains placeholder or controlled review data`)
    }
  }
}

const titles = [...documents.values()].map((html) => capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i))
if (new Set(titles).size !== titles.length) fail('indexable routes contain duplicate titles')

const home = documents.get('/')
if (!/mailto:moshe@mosheschwartzberg\.com/i.test(home ?? '')) fail('homepage/footer does not expose the CodeCrafter mailto link')
if (!/tel:\+972587076077/i.test(home ?? '')) fail('homepage/footer does not expose the CodeCrafter telephone link')

const robotsText = await readAsset('/robots.txt')
if (!/User-agent:\s*\*/i.test(robotsText) || !/Allow:\s*\//i.test(robotsText)) fail('robots.txt does not allow normal crawling')
if (!robotsText.includes(`Sitemap: ${origin}/sitemap.xml`)) fail('robots.txt has no canonical sitemap reference')
if (/Disallow:\s*\/(websites|custom-software|automation|crm-development|app-development|portfolio|about)/i.test(robotsText)) fail('robots.txt blocks an indexable route')

const demoHtml = baseUrl
  ? await (await fetch(`${baseUrl}/amitStarProject/`)).text()
  : readFileSync(join(distDir, 'amitStarProject', 'index.html'), 'utf8')
if (!/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(demoHtml)) fail('standalone Amit demo is not noindex')

if (baseUrl) {
  const missing = await fetch(`${baseUrl}/seo-soft-404-probe-8f15c`, { redirect: 'manual' })
  if (missing.status !== 404) fail(`missing route returned ${missing.status}`)
  const legacy = await fetch(`${baseUrl}/blog.html`, { redirect: 'manual' })
  const legacyLocation = legacy.headers.get('location')
  if (![301, 308].includes(legacy.status) || !legacyLocation || new URL(legacyLocation, origin).href !== `${origin}/websites/`) fail('/blog.html does not redirect permanently to /websites/')
  for (const variant of ['http://mosheschwartzberg.com/', 'http://www.mosheschwartzberg.com/', 'https://www.mosheschwartzberg.com/']) {
    const response = await fetch(variant, { redirect: 'manual' })
    if (![301, 308].includes(response.status) || response.headers.get('location') !== `${origin}/`) fail(`${variant} does not redirect directly to the canonical homepage`)
  }
} else {
  const redirects = readFileSync(join(distDir, '_redirects'), 'utf8')
  if (!/^\/blog\.html\s+\/websites\/\s+301$/m.test(redirects)) fail('built redirects omit permanent /blog.html redirect')
  const notFound = readFileSync(join(distDir, '404.html'), 'utf8')
  if (!/noindex,\s*follow/i.test(notFound) || !/href=["']\/portfolio\//i.test(notFound) || !/href=["']\/websites\//i.test(notFound)) fail('404 page lacks noindex or helpful internal links')
}

console.log(`SEO checks passed for ${sitemapUrls.length} canonical routes${baseUrl ? ' in production' : ''}.`)
