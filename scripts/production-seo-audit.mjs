const baseUrl = (process.env.SEO_BASE_URL || 'https://mosheschwartzberg.com').replace(/\/$/, '')
const failures = []
const warnings = []
const passes = []

function pass(message) {
  passes.push(message)
  console.log(`PASS ${message}`)
}

function fail(message) {
  failures.push(message)
  console.error(`FAIL ${message}`)
}

function warn(message) {
  warnings.push(message)
  console.warn(`WARN ${message}`)
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`
  const response = await fetch(url, {
    redirect: options.redirect ?? 'follow',
    headers: {
      'user-agent': 'CodeCrafter-SEO-Audit/1.0',
      'cache-control': 'no-cache',
      ...(options.headers || {}),
    },
  })
  const body = options.body === false ? '' : await response.text()
  return { url, response, body }
}

function getCanonical(html) {
  return html.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
    || html.match(/<link\s+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1]
}

function getTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim()
}

console.log(`Production SEO audit: ${baseUrl}\n`)

const crawlerAgents = new Map([
  ['browser', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36'],
  ['googlebot-desktop', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  ['googlebot-smartphone', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 Chrome/140.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
])

const crawlerRoutes = [
  '/',
  '/websites/',
  '/crm-development/',
  '/app-development/',
  '/custom-software/',
  '/automation/',
  '/erp-development/',
  '/inventory-systems/',
  '/business-portals/',
  '/web-app-development/',
  '/en/',
  '/pricing/',
  '/index.html',
]

function challengeDetected(body) {
  return /blocked automated request|cf-chl-|challenge-platform|attention required|just a moment\.\.\./i.test(body)
}

for (const [agentName, userAgent] of crawlerAgents) {
  for (const route of crawlerRoutes) {
    const initial = await request(route, {
      redirect: 'manual',
      headers: { 'user-agent': userAgent },
    })
    const location = initial.response.headers.get('location') || ''
    const initialStatus = initial.response.status
    const isIndexAlias = route === '/index.html'
    const expectedInitial = isIndexAlias ? [301, 308].includes(initialStatus) : initialStatus === 200
    if (!expectedInitial) {
      fail(`crawler access ${agentName} ${route}: initial=${initialStatus} location=${location || '-'} cf-ray=${initial.response.headers.get('cf-ray') || '-'}`)
      continue
    }

    const final = isIndexAlias
      ? await request(new URL(location, baseUrl).href, { headers: { 'user-agent': userAgent } })
      : initial
    const contentType = final.response.headers.get('content-type') || ''
    const robotsHeader = final.response.headers.get('x-robots-tag') || ''
    const inaccessible = [401, 403].includes(final.response.status)
      || final.response.status !== 200
      || !/text\/html/i.test(contentType)
      || challengeDetected(final.body)
      || /noindex|none/i.test(robotsHeader)
      || !/<(?:html|main)\b/i.test(final.body)

    const trace = `initial=${initialStatus} redirect=${location || '-'} final=${final.response.status} cf-ray=${final.response.headers.get('cf-ray') || '-'} cf-cache=${final.response.headers.get('cf-cache-status') || '-'} x-robots=${robotsHeader || '-'}`
    if (inaccessible) fail(`crawler access ${agentName} ${route}: ${trace}`)
    else pass(`crawler access ${agentName} ${route}: ${trace}`)
  }
}

const robots = await request('/robots.txt')
if (robots.response.ok) pass('robots.txt returns 200')
else fail(`robots.txt returned ${robots.response.status}`)

if (robots.body.includes(`Sitemap: ${baseUrl}/sitemap.xml`)) pass('robots.txt points to the canonical sitemap')
else fail('robots.txt does not point to the canonical sitemap')

if (/Disallow:\s*\/assets\//i.test(robots.body)) fail('robots.txt blocks /assets/, which can prevent Google rendering')
else pass('robots.txt allows render-critical assets')

const sitemap = await request('/sitemap.xml')
if (sitemap.response.ok) pass('sitemap.xml returns 200')
else fail(`sitemap.xml returned ${sitemap.response.status}`)

const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (sitemapUrls.length >= 10) pass(`sitemap contains ${sitemapUrls.length} URLs`)
else fail(`sitemap contains only ${sitemapUrls.length} URLs`)

const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index)
if (duplicateUrls.length === 0) pass('sitemap has no duplicate URLs')
else fail(`sitemap has duplicate URLs: ${[...new Set(duplicateUrls)].join(', ')}`)

for (const expectedCaseStudy of [
  `${baseUrl}/portfolio/rainbow-asd/`,
  `${baseUrl}/portfolio/shimon-photography/`,
  `${baseUrl}/en/portfolio/rainbow-asd/`,
  `${baseUrl}/en/portfolio/shimon-photography/`,
]) {
  if (sitemapUrls.includes(expectedCaseStudy)) pass(`new case study is in sitemap: ${expectedCaseStudy}`)
  else fail(`new case study missing from sitemap: ${expectedCaseStudy}`)
}

for (const url of sitemapUrls) {
  const result = await request(url)
  if (!result.response.ok) {
    fail(`sitemap URL returned ${result.response.status}: ${url}`)
    continue
  }

  const canonical = getCanonical(result.body)
  if (canonical === url) pass(`canonical matches sitemap URL: ${url}`)
  else fail(`canonical mismatch: ${url} -> ${canonical || 'missing'}`)

  const title = getTitle(result.body)
  if (title && title.length >= 10) pass(`title present: ${url}`)
  else fail(`missing/weak title: ${url}`)

  if (/name=["']robots["'][^>]*content=["'][^"']*index/i.test(result.body)) pass(`index directive present: ${url}`)
  else warn(`explicit index robots meta not found: ${url}`)

  if (/application\/ld\+json/i.test(result.body)) pass(`structured data present: ${url}`)
  else warn(`structured data not found: ${url}`)
}

const homepage = await request('/')
const jsAsset = homepage.body.match(/src=["'](\/assets\/[^"']+\.(?:js|mjs))["']/i)?.[1]
if (!jsAsset) {
  warn('Could not discover the current hashed JS asset from the homepage')
} else {
  const asset = await request(jsAsset, { body: false })
  const robotsHeader = asset.response.headers.get('x-robots-tag') || ''
  if (/noindex/i.test(robotsHeader)) pass(`hashed JS asset is noindex via X-Robots-Tag: ${jsAsset}`)
  else fail(`hashed JS asset lacks X-Robots-Tag noindex: ${jsAsset}`)
}

for (const obsoletePath of ['/favicon.svg', '/manifest.json']) {
  const result = await request(obsoletePath, { redirect: 'manual' })
  const robotsHeader = result.response.headers.get('x-robots-tag') || ''
  if ([404, 410].includes(result.response.status) || /noindex/i.test(robotsHeader)) {
    pass(`obsolete non-page URL cannot remain indexable: ${obsoletePath}`)
  } else {
    fail(`obsolete non-page URL is still indexable (${result.response.status}): ${obsoletePath}`)
  }
}

const rainbow = await request('/portfolio/rainbow-asd/')
if (rainbow.response.ok && getCanonical(rainbow.body) === `${baseUrl}/portfolio/rainbow-asd/`) {
  pass('historical Rainbow URL now serves a canonical case study')
} else {
  fail(`Rainbow case study is not serving canonically (${rainbow.response.status})`)
}

const redirectChecks = new Map([
  ['/portfolio/Rainbow-asd', '/portfolio/rainbow-asd/'],
  ['/portfolio/Rainbow-asd/', '/portfolio/rainbow-asd/'],
  ['/blog.html', '/websites/'],
  ['/portfolio/index.html', '/portfolio/'],
  ['/about/index.html', '/about/'],
  ['/blog/free-domains-new-era-internet', '/websites/'],
  ['/blog/perfect-lighthouse', '/websites/'],
  ['/blog/backend-code-horror', '/custom-software/'],
  ['/blog/5-website-must-have', '/websites/'],
  ['/portfolio/idf-tech-maintenance-corps-v2', '/portfolio/'],
  ['/portfolio/nexa-automations-glass-ui', '/automation/'],
])

for (const [source, expectedPath] of redirectChecks) {
  const result = await request(source, { redirect: 'manual', body: false })
  const location = result.response.headers.get('location') || ''
  const expectedAbsolute = `${baseUrl}${expectedPath}`
  const targetOk = location === expectedPath || location === expectedAbsolute
  if ([301, 308].includes(result.response.status) && targetOk) pass(`legacy redirect is topical: ${source} -> ${expectedPath}`)
  else fail(`legacy redirect mismatch: ${source} returned ${result.response.status} location=${location || 'missing'}`)
}

const wwwResponse = await fetch('https://www.mosheschwartzberg.com/', { redirect: 'manual' })
const wwwLocation = wwwResponse.headers.get('location') || ''
if ([301, 308].includes(wwwResponse.status) && wwwLocation.startsWith(baseUrl)) pass('www hostname permanently redirects to canonical hostname')
else warn(`www canonical redirect was not confirmed (${wwwResponse.status}, ${wwwLocation || 'no location'})`)

console.log(`\nSummary: ${passes.length} passed, ${warnings.length} warnings, ${failures.length} failed.`)
if (warnings.length) console.log('Warnings are review items; failures block a clean SEO deployment.')
if (failures.length) process.exit(1)
