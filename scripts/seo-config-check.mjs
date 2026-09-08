import { readFile } from 'node:fs/promises'

const failures = []
const passes = []

function pass(message) {
  passes.push(message)
  console.log(`PASS ${message}`)
}

function fail(message) {
  failures.push(message)
  console.error(`FAIL ${message}`)
}

function expect(condition, message) {
  condition ? pass(message) : fail(message)
}

const [
  rootHtaccess,
  publicHtaccess,
  rootRobots,
  publicRobots,
  redirects,
  headers,
  server,
  cloudflareScript,
] = await Promise.all([
  readFile('.htaccess', 'utf8'),
  readFile('public/.htaccess', 'utf8'),
  readFile('robots.txt', 'utf8'),
  readFile('public/robots.txt', 'utf8'),
  readFile('public/_redirects', 'utf8'),
  readFile('public/_headers', 'utf8'),
  readFile('server.ts', 'utf8'),
  readFile('scripts/cloudflare-seo-hardening.ps1', 'utf8'),
])

expect(rootHtaccess === publicHtaccess, 'root and public Apache configs are identical')
expect(rootRobots === publicRobots, 'root and public robots.txt are identical')
expect(!/Disallow:\s*\/assets\//i.test(publicRobots), 'robots.txt does not block render-critical assets')
expect(publicRobots.includes('Sitemap: https://mosheschwartzberg.com/sitemap.xml'), 'robots.txt declares canonical sitemap')

for (const status of ['401', '403', '404', '200']) {
  expect(publicRobots.includes(`Disallow: /${status}.html`), `robots.txt excludes ${status}.html from crawling`)
}

expect(/X-Robots-Tag\s+"noindex"/i.test(rootHtaccess), 'Apache adds X-Robots-Tag noindex to non-page assets')
expect(rootHtaccess.includes('RewriteRule ^favicon\\.svg$ - [R=410,L]'), 'Apache returns 410 for obsolete favicon.svg')
expect(rootHtaccess.includes('RewriteRule ^manifest\\.json$ - [R=410,L]'), 'Apache returns 410 for obsolete manifest.json')
expect(rootHtaccess.includes('RewriteRule ^portfolio/Rainbow-asd/?$ /portfolio/rainbow-asd/ [R=301,L,NE]'), 'Apache canonicalizes the historical mixed-case Rainbow URL')
expect(/X-Robots-Tag:\s*noindex/i.test(headers), 'static-host headers include noindex protection')
expect(server.includes("res.setHeader('X-Robots-Tag', 'noindex')"), 'Node server adds X-Robots-Tag noindex')
expect(server.includes("new Set(['/favicon.svg', '/manifest.json'])"), 'Node server treats obsolete asset URLs as gone')
expect(server.includes("pathname === '/portfolio/rainbow-asd'"), 'Node server preserves the revived Rainbow case-study route')

const expectedRedirects = new Map([
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

for (const [source, target] of expectedRedirects) {
  expect(redirects.split(/\r?\n/).includes(`${source} ${target} 301`), `_redirects maps ${source} to ${target}`)
  expect(server.includes(`['${source}', '${target}']`), `server.ts maps ${source} to ${target}`)
}

expect(!redirects.includes('/portfolio/rainbow-asd /portfolio/ 301'), 'static redirects do not discard the revived Rainbow case study')
expect(!server.includes("['/portfolio/rainbow-asd', '/portfolio/']"), 'Node redirects do not discard the revived Rainbow case study')
expect(!rootHtaccess.includes('/#services'), 'Apache no longer redirects legacy URLs to homepage fragments')
expect(!rootHtaccess.includes('/#portfolio'), 'Apache no longer redirects legacy portfolio URLs to homepage fragments')

expect(cloudflareScript.includes('http_response_headers_transform'), 'Cloudflare script uses response-header transform phase')
expect(cloudflareScript.includes("'X-Robots-Tag'"), 'Cloudflare script configures X-Robots-Tag')
expect(cloudflareScript.includes("value = 'noindex'"), 'Cloudflare script sets noindex rather than blocking crawl')
expect(cloudflareScript.includes('PATCH'), 'Cloudflare script updates its existing rule idempotently')

console.log(`\nSEO infrastructure checks: ${passes.length} passed, ${failures.length} failed.`)
if (failures.length) process.exit(1)
