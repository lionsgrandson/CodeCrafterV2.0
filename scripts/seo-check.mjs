import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { readMetaContent } from './seo-meta-utils.mjs'

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
if (/<lastmod>/i.test(sitemapText)) fail('sitemap must not claim a build-time modification date for every route')

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
  const description = readMetaContent(html, 'description')
  const canonical = capture(html, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
  const robots = readMetaContent(html, 'robots')
  const expectedCanonical = `${origin}${routePath}`

  if (count(html, /<title\b/gi) !== 1 || !title) fail(`${routePath} must have one title`)
  if (count(html, /<meta\s+name=["']description["']/gi) !== 1 || !description) fail(`${routePath} must have one description`)
  if (description.length < 70 || description.length > 190) fail(`${routePath} description length is ${description.length}`)
  if (count(html, /<link\s+rel=["']canonical["']/gi) !== 1 || canonical !== expectedCanonical) fail(`${routePath} canonical is ${canonical}`)
  if (/noindex|none/i.test(robots)) fail(`${routePath} is unexpectedly noindex`)
  if (count(html, /<h1\b/gi) !== 1) fail(`${routePath} must have one h1`)
  // Every informative static image needs descriptive alt text and a real build asset.
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = image[0]
    const alt = capture(tag, /\balt=["']([^"']*)["']/i)
    if (!alt) fail(`${routePath} has an image without descriptive alt text`)
    const src = capture(tag, /\bsrc=["']([^"']+)["']/i)
    if (!baseUrl && src.startsWith('/') && !existsSync(join(distDir, src.replace(/^\//, '')))) {
      fail(`${routePath} references missing image ${src}`)
    }
  }

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

for (const locale of ['/', '/en/']) {
  const routePath = locale === '/' ? '/portfolio/' : '/en/portfolio/'
  const html = documents.get(routePath) ?? ''
  if (html.includes('Mahagony Israel') || html.includes('mahagonyisraeldidntpay')) fail('Mahagony was not removed from ' + routePath)
  if (/HIPAA.compliant|תואם HIPAA/i.test(html)) fail('Portfolio makes an unsupported compliance claim: ' + routePath)
  const script = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)][0]?.[1]
  if (!script) fail('portfolio structured data missing: ' + routePath)
  const list = JSON.parse(script)['@graph']?.find((item) => item['@type'] === 'ItemList')
  if (!list || list.numberOfItems !== list.itemListElement?.length || list.numberOfItems < 10) fail('portfolio structured data does not match its project listing: ' + routePath)
  if (!list.itemListElement.some((item) => item.url === 'https://sumsup.co')) fail('portfolio structured data must link to the public SumsUp website: ' + routePath)
  if (list.itemListElement.some((item) => /coderecovery|simplyrecovery|ai-pro\.co\.il|aderet-store\.com/i.test(item.url ?? '') || /coderecovery|AI Pro|Aderet|אדרת וארגמן/i.test(item.name ?? ''))) fail('Removed project found in structured portfolio: ' + routePath)
}

const titles = [...documents.values()].map((html) => capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i))
if (new Set(titles).size !== titles.length) fail('indexable routes contain duplicate titles')

for (const requiredPath of [
  '/erp-development/', '/en/erp-development/',
  '/inventory-systems/', '/en/inventory-systems/',
  '/business-portals/', '/en/business-portals/',
  '/web-app-development/', '/en/web-app-development/',
  '/locations/north/', '/en/locations/north/',
  '/locations/center/', '/en/locations/center/',
]) {
  if (!documents.has(requiredPath)) fail(`required commercial route is missing from sitemap and prerender output: ${requiredPath}`)
}

const erpPairs = [
  ['/erp-development/', '/en/erp-development/'],
  ['/inventory-systems/', '/en/inventory-systems/'],
  ['/business-portals/', '/en/business-portals/'],
  ['/web-app-development/', '/en/web-app-development/'],
]
for (const [hebrewPath, englishPath] of erpPairs) {
  const hebrew = documents.get(hebrewPath) || ''
  const english = documents.get(englishPath) || ''
  if (!new RegExp(`<link\\s+rel=["']alternate["'][^>]*hreflang=["']en["'][^>]*href=["']${origin}${englishPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(hebrew)) fail(`${hebrewPath} does not reciprocate to ${englishPath}`)
  if (!new RegExp(`<link\\s+rel=["']alternate["'][^>]*hreflang=["']he["'][^>]*href=["']${origin}${hebrewPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(english)) fail(`${englishPath} does not reciprocate to ${hebrewPath}`)
}

const erpHtml = documents.get('/erp-development/') || ''
if (!/"@type":"Service"/.test(erpHtml) || !/"@type":"FAQPage"/.test(erpHtml)) fail('ERP page schema must include visible Service and FAQPage entities')
for (const requiredTerm of ['מקור אמת יחיד', 'ERP לעומת CRM', 'מתי לא נכון לבנות ERP']) {
  if (!erpHtml.includes(requiredTerm)) fail(`ERP prerendered content is missing: ${requiredTerm}`)
}

const ownerH1Paths = ['/erp-development/', '/inventory-systems/', '/crm-development/', '/custom-software/']
const ownerH1s = ownerH1Paths.map((path) => capture(documents.get(path) || '', /<h1[^>]*>([\s\S]*?)<\/h1>/i))
if (new Set(ownerH1s).size !== ownerH1s.length) fail('ERP, inventory, CRM, and custom software must have distinct H1 ownership')

for (const targetPath of ['/erp-development/', '/inventory-systems/', '/business-portals/', '/web-app-development/']) {
  const inbound = [...documents.entries()].filter(([sourcePath, html]) => sourcePath !== targetPath && new RegExp(`href=["']${targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(html))
  if (inbound.length < 2) fail(`${targetPath} needs at least two prerendered inbound links, found ${inbound.length}`)
}

const buyerGuideChecks = [
  ['/websites/', 'מה לבדוק לפני שמזמינים אתר לעסק', 'האם אתר חדש מבטיח הופעה במקום הראשון בגוגל'],
  ['/crm-development/', 'בדיקות חובה לפני שמחליפים או בונים CRM', 'איך מונעים כפילות של לקוחות'],
  ['/integrations/', 'בדיקות אמינות לחיבור API בין מערכות', 'איך מטפלים בתאריכים עם הפרשי שעות'],
  ['/automation/', 'לפני שמפעילים אוטומציה על מידע אמיתי', 'אם שירות חיצוני לא זמין'],
  ['/custom-software/', 'מה להכין להצעת מחיר לפיתוח מערכת', 'איך מחליטים מה להכניס לגרסה הראשונה'],
  ['/ecommerce-development/', 'הכנות למעבר חנות בין פלטפורמות', 'האם קובץ CSV של WooCommerce'],
  ['/shopify-development/', 'מה צריך לסגור לפני פיתוח חנות Shopify', 'מה ההבדל בין הקמת Shopify'],
  ['/wordpress-development/', 'בדיקות WordPress לפני עלייה לאוויר', 'האם התקנת Yoast'],
  ['/en/integrations/', 'Reliability checklist for system-to-system APIs', 'How do you handle different time zones'],
  ['/en/websites/', 'Checklist before commissioning a business website', 'Will a new site guarantee first place'],
  ['/en/crm-development/', 'Checks before replacing or building a CRM', 'How do you prevent duplicate customers'],
]
for (const [routePath, section, question] of buyerGuideChecks) {
  const html = documents.get(routePath) ?? ''
  if (!html.includes(section) || !html.includes(question)) fail(routePath + ' is missing its buyer guide or FAQ')
}

// Verify the expanded bilingual editorial content, not just template-level metadata.
const additionalServiceGuides = [
  ['app-development', 'מה נדרש לפני שמתחילים לפתח אפליקציה', 'Before building a business app'],
  ['cms-development', 'איך נראה אפיון של מערכת ניהול תוכן', 'What to specify for a content management system'],
  ['business-bots', 'בדיקות לפני חיבור בוט ללקוחות', 'Checks before connecting a bot to customers'],
  ['erp-development', 'לפני שמתחילים מערכת ERP מותאמת', 'Define ERP scope before development'],
  ['inventory-systems', 'בדיקות לפני מערכת ניהול מלאי ומחסן', 'Inventory management requirements to clarify'],
  ['business-portals', 'מה חשוב לתכנן בפורטל לקוחות או עובדים', 'What a customer or employee portal must define'],
  ['web-app-development', 'איך בוחרים ארכיטקטורה ל-Web App', 'Questions before designing a web application'],
  ['api-development', 'תכולה של API שמיועד לשימוש אמיתי', 'What a usable production API includes'],
  ['crm-integrations', 'איך מגדירים חיבור CRM תקין', 'Define a reliable CRM connection'],
  ['crm-migration', 'מה צריך לקבל לפני מיגרציית CRM', 'What to collect before a CRM migration'],
  ['wix-development', 'מתי לשפר Wix ומתי לשקול מעבר', 'Improve Wix or migrate: what to assess'],
  ['website-maintenance', 'מה לכלול בהסכם תחזוקה לאתר', 'What to include in a maintenance agreement'],
  ['landing-page-development', 'מה הופך דף נחיתה לבר-מדידה', 'What makes a landing page measurable'],
]
for (const [slug, hebrewHeading, englishHeading] of additionalServiceGuides) {
  for (const [lang, heading] of [['he', hebrewHeading], ['en', englishHeading]]) {
    const routePath = `${lang === 'he' ? '/' : '/en/'}${slug}/`
    if (!documents.get(routePath)?.includes(heading)) fail(`${routePath} missing original, language-specific buyer content`)
  }
}

for (const [routePath, html] of documents) {
  const heading = capture(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (routePath.startsWith('/en/') && /[\u0590-\u05ff]/.test(heading)) {
    fail(`${routePath} contains a Hebrew heading on an English page`)
  }
}

const llmsText = await readAsset('/llms.txt')
const fullDirectory = await readAsset('/llms-full.txt')
if (!llmsText.includes(`${origin}/llms-full.txt`)) fail('llms.txt does not reference the complete directory')
if (!fullDirectory.includes('# CodeCrafter — Public source directory')) fail('llms-full.txt is missing the source identity')
for (const sitemapUrl of sitemapUrls.filter((url) => !/\/(privacy|terms)\/$/.test(url))) {
  if (!fullDirectory.includes(`](${sitemapUrl})`)) fail(`llms-full.txt omits a canonical page: ${sitemapUrl}`)
}

const publishedContentPages = [
  ['/guides/', 'מדריכים מעשיים'],
  ['/guides/planning-a-business-website/', 'איך מתכננים אתר לעסק'],
  ['/guides/planning-a-custom-crm/', 'איך מאפיינים מערכת CRM'],
  ['/guides/woocommerce-to-shopify-migration/', 'WooCommerce'],
  ['/site-map/', 'מפת האתר'],
  ['/en/guides/', 'Practical guides'],
  ['/en/guides/planning-a-business-website/', 'How to plan a business website'],
  ['/en/guides/planning-a-custom-crm/', 'How to plan a custom CRM'],
  ['/en/guides/woocommerce-to-shopify-migration/', 'WooCommerce'],
  ['/en/site-map/', 'CodeCrafter website sitemap'],
]
for (const [pagePath, expectedHeading] of publishedContentPages) {
  const html = documents.get(pagePath)
  if (!html?.includes(expectedHeading)) fail(pagePath + ' missing its descriptive editorial content')
}
const retiredCaseStudyPaths = [
  'sumsup', 'coderecovery', 'yuval-kadosh', 'rainbow-asd', 'project-orion',
  'shimon-photography', 'aderet-argaman', 'ilan-shachar', 'green-therapy',
]
for (const lang of ['', '/en']) {
  const siteMap = documents.get(`${lang}/site-map/`) ?? ''
  for (const slug of ['services', 'portfolio', 'guides']) {
    if (!siteMap.includes(`href="${lang}/${slug}/"`)) fail('HTML sitemap omits ' + slug + ' in ' + lang)
  }
  const portfolioPage = documents.get(`${lang}/portfolio/`) ?? ''
  if (!portfolioPage.includes('https://rainbowasdv2.netlify.app')) fail('Portfolio Rainbow ASD link was not updated')
  if (!portfolioPage.includes('https://omnifood.dev/img/omnifood-logo.png')) fail('Portfolio Omnifood logo is not the supplied image')
  if (/CodeRecovery|coderecovery-screenshot|AI Pro[^\s]*.*coderecovery/i.test(portfolioPage)) fail('Removed CodeRecovery portfolio entry is still present')
  if (portfolioPage.includes('href="/portfolio/aderet-argaman/"')) fail('Portfolio still links to removed case-study URLs')
  if (portfolioPage.includes('https://ai-pro.co.il/') || portfolioPage.includes('https://www.aderet-store.com/')) fail('Removed AI Pro or Aderet remains in the portfolio')
  if (!portfolioPage.includes('src="https://greentherapy.co.il/assets/green-therapy-logo.webp"')) fail('Green Therapy portfolio logo does not match the supplied asset')
  if (siteMap.includes('/portfolio/aderet-argaman/')) fail('HTML sitemap includes an unpublished case-study URL')
  for (const slug of retiredCaseStudyPaths) {
    const oldRoute = `${lang}/portfolio/${slug}/`
    if (documents.has(oldRoute)) fail('Retired case study remains indexed: ' + oldRoute)
  }
  if (documents.has(`${lang}/pricing/`)) fail('Public pricing route remains indexed')
}
for (const [routePath, html] of documents) {
  if (/href=["'](?:\/en)?\/pricing\//.test(html)) fail('Published HTML still links to pricing: ' + routePath)
  if (html.includes('מקור: CodeCrafter — משה שוורצברג. קישור קבוע') || html.includes('Original publisher: CodeCrafter')) {
    fail('An intrusive content attribution footer remains: ' + routePath)
  }
}
for (const lang of ['', '/en']) {
  const homeProjects = documents.get(`${lang}/`) ?? ''
  for (const website of ['https://greentherapy.co.il/', 'https://shimonphotos.com/', 'https://ilanshacar.netlify.app/']) {
    if (!homeProjects.includes(`href="${website}"`)) fail('Missing requested homepage featured project: ' + website + ' in ' + lang)
  }
  if (!homeProjects.includes('src="https://greentherapy.co.il/assets/green-therapy-logo.webp"')) fail('Green Therapy logo is missing from the homepage: ' + lang)
  for (const removedWebsite of ['https://ykadosh.co.il', 'https://ai-pro.co.il/', 'https://www.aderet-store.com/']) {
    if (homeProjects.includes(`href="${removedWebsite}"`)) fail('Unwanted featured homepage project: ' + removedWebsite + ' in ' + lang)
  }
}

const verificationFile = await readAsset('/google6768eed8771c59fe.html')
if (verificationFile.trim() !== 'google-site-verification: google6768eed8771c59fe.html') {
  fail('Google Search Console verification file does not match the supplied token')
}

const home = documents.get('/')
if (!home?.includes('id="choose-solution"') || !home?.includes('id="business-faq"')) fail('homepage must render buyer guide and accessible FAQ')
if (!home?.includes('"@type":"FAQPage"')) fail('homepage FAQ must have visible matching FAQ structured data')
if (documents.get('/portfolio/')?.includes('mahagonyisraeldidntpay')) fail('portfolio still contains the inappropriate Mahagony preview URL')
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
