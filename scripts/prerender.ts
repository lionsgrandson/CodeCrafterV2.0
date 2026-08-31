import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pagesByLanguage, localizePath, type Language, type SeoPage } from '../src/lib/seoRegistry.ts'
import { translations } from '../src/lib/translations.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const templatePath = path.join(distDir, 'index.html')
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js')
const origin = 'https://mosheschwartzberg.com'

const template = await readFile(templatePath, 'utf-8')
const { render } = await import(pathToFileURL(serverEntryPath).href)

type Route = {
  path: string
  lang: Language
  title: string
  description: string
  type: 'website' | 'collection' | 'service' | 'about' | 'case-study'
  page?: SeoPage
}

const homeMetadata: Record<Language, Pick<Route, 'title' | 'description'>> = {
  he: {
    title: 'פיתוח מערכות, CRM, אוטומציות ואתרים לעסקים | CodeCrafter',
    description: 'פיתוח מערכות לעסקים, CRM ו-CMS, אוטומציות, אינטגרציות, אפליקציות ואתרים לעסקים קטנים ובינוניים בישראל ובאירופה, בעברית ובאנגלית.',
  },
  en: {
    title: 'Custom Software, CRM, Automation & Websites | CodeCrafter',
    description: 'Custom business software, CRM and CMS development, automation, integrations, apps, and websites for SMBs in Israel and Europe, with English and Hebrew support.',
  },
}

const portfolioMetadata: Record<Language, Pick<Route, 'title' | 'description'>> = {
  he: {
    title: 'תיק עבודות ומקרי בוחן | CodeCrafter',
    description: 'אתרים, מערכות וחוויות דיגיטליות שנבנו ב-CodeCrafter לעסקים, ארגונים ויוצרים, עם קישורים למקרי בוחן ולפרויקטים הפעילים.',
  },
  en: {
    title: 'Portfolio and Digital Project Case Studies | CodeCrafter',
    description: 'Explore websites, systems, automations, and digital experiences built by CodeCrafter, with factual case studies and links to relevant development services.',
  },
}

const routes: Route[] = []
for (const lang of ['he', 'en'] as const) {
  routes.push({ path: localizePath('', lang), lang, ...homeMetadata[lang], type: 'website' })
  routes.push({ path: localizePath('portfolio', lang), lang, ...portfolioMetadata[lang], type: 'collection' })
  for (const page of pagesByLanguage[lang]) {
    routes.push({
      path: localizePath(page.slug, lang),
      lang,
      title: page.title,
      description: page.description,
      type: page.kind,
      page,
    })
  }
}

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function absoluteUrl(routePath: string) {
  return `${origin}${routePath}`
}

function normalizePortfolioUrl(url?: string) {
  if (url === 'https://rainbowasdv2.netlify.app/') return 'https://rainbow-asd.com/'
  if (url === 'https://eclectic-marigold-0fe508.netlify.app/') return 'https://shimonphotos.com/'
  return url
}

function languagePair(route: Route, lang: Language) {
  if (route.type === 'website') return localizePath('', lang)
  if (route.type === 'collection') return localizePath('portfolio', lang)
  return localizePath(route.page?.slug ?? '', lang)
}

function replaceTitle(html: string, title: string) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(title)}</title>`)
}

function setMeta(html: string, key: string, content: string, attribute: 'name' | 'property' = 'name') {
  const pattern = new RegExp(`<meta\\s+(?:name|property)=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function setCanonical(html: string, url: string) {
  const tag = `<link rel="canonical" href="${url}" />`
  return /<link\s+rel=["']canonical["'][^>]*>/i.test(html)
    ? html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function breadcrumbItems(route: Route) {
  const homeName = route.lang === 'he' ? 'בית' : 'Home'
  const items = [{ name: homeName, url: absoluteUrl(localizePath('', route.lang)) }]
  if (route.type === 'service') items.push({ name: route.lang === 'he' ? 'שירותים' : 'Services', url: `${absoluteUrl(localizePath('', route.lang))}#services` })
  if (route.type === 'case-study') items.push({ name: route.lang === 'he' ? 'תיק עבודות' : 'Portfolio', url: absoluteUrl(localizePath('portfolio', route.lang)) })
  if (route.type !== 'website') items.push({ name: route.page?.h1 ?? route.title, url: absoluteUrl(route.path) })
  return items
}

const serviceAreas = [
  { '@type': 'Country', name: 'Israel' },
  { '@type': 'Place', name: 'Europe' },
]

function schemaFor(route: Route) {
  const url = absoluteUrl(route.path)
  const linkedInProfile = 'https://il.linkedin.com/in/codecrafteril'
  const organization = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${origin}/#organization`,
    name: 'CodeCrafter',
    url: `${origin}/`,
    logo: `${origin}/log-round.png`,
    email: 'moshe@mosheschwartzberg.com',
    telephone: '+972587076077',
    founder: { '@id': `${origin}/#moshe-schwartzberg` },
    areaServed: serviceAreas,
    availableLanguage: ['he', 'en'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales and project enquiries',
      email: 'moshe@mosheschwartzberg.com',
      telephone: '+972587076077',
      availableLanguage: ['he', 'en'],
    },
    knowsAbout: [
      'Custom software development',
      'Business systems',
      'CRM development',
      'CMS development',
      'Business automation',
      'Systems integration',
      'Business bot development',
      'Web application development',
      'Mobile application development',
      'Website development',
      'Technical SEO',
    ],
    sameAs: [linkedInProfile],
  }
  const person = {
    '@type': 'Person',
    '@id': `${origin}/#moshe-schwartzberg`,
    name: 'Moshe Schwartzberg',
    alternateName: 'משה שוורצברג',
    url: absoluteUrl(localizePath('about', route.lang)),
    image: `${origin}/about-photo-1200.webp`,
    worksFor: { '@id': `${origin}/#organization` },
    sameAs: [linkedInProfile],
  }
  const graph: Record<string, unknown>[] = [
    organization,
    person,
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: 'CodeCrafter',
      url: `${origin}/`,
      inLanguage: ['he', 'en'],
      publisher: { '@id': `${origin}/#organization` },
    },
    {
      '@type': route.type === 'collection' ? 'CollectionPage' : route.type === 'about' ? 'ProfilePage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: route.lang,
      isPartOf: { '@id': `${origin}/#website` },
      about: route.type === 'about' ? { '@id': `${origin}/#moshe-schwartzberg` } : { '@id': `${origin}/#organization` },
      ...(route.type === 'about' ? { mainEntity: { '@id': `${origin}/#moshe-schwartzberg` } } : {}),
    },
  ]

  if (route.type !== 'website') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbItems(route).map((item, index) => ({
        '@type': 'ListItem', position: index + 1, name: item.name, item: item.url,
      })),
    })
  }
  if (route.type === 'service' && route.page) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: route.page.h1,
      description: route.description,
      url,
      provider: { '@id': `${origin}/#organization` },
      areaServed: serviceAreas,
      availableLanguage: ['he', 'en'],
    })
  }
  if (route.type === 'case-study' && route.page) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#case-study`,
      name: route.page.h1,
      description: route.description,
      url,
      creator: { '@id': `${origin}/#organization` },
      image: route.page.image ? absoluteUrl(route.page.image.src) : `${origin}/og-logo.png`,
    })
  }
  if (route.page?.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: route.page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }
  if (route.type === 'collection') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#projects`,
      numberOfItems: translations[route.lang].portfolio.projects.length,
      itemListElement: translations[route.lang].portfolio.projects.map((project, index) => ({
        '@type': 'ListItem', position: index + 1, name: project.title, url: normalizePortfolioUrl(project.link),
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

async function createDocument(route: Route) {
  const url = absoluteUrl(route.path)
  const image = route.page?.image ? absoluteUrl(route.page.image.src) : `${origin}/og-logo.png`
  const imageAlt = route.page?.image?.alt ?? (route.lang === 'he' ? 'CodeCrafter - פתרונות תוכנה לעסקים' : 'CodeCrafter business software solutions')
  const locale = route.lang === 'he' ? 'he_IL' : 'en_US'
  let html = template.replace('<!--app-html-->', await render(route.path))
  html = html.replace(/<html\s+lang=["'][^"']+["']\s+dir=["'][^"']+["']>/i, `<html lang="${route.lang}" dir="${route.lang === 'he' ? 'rtl' : 'ltr'}">`)
  html = replaceTitle(html, route.title)
  html = setMeta(html, 'description', route.description)
  html = setMeta(html, 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  html = setMeta(html, 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  html = setMeta(html, 'bingbot', 'index, follow, max-image-preview:large')
  html = setMeta(html, 'og:type', route.type === 'case-study' ? 'article' : 'website', 'property')
  html = setMeta(html, 'og:locale', locale, 'property')
  html = setMeta(html, 'og:site_name', 'CodeCrafter', 'property')
  html = setMeta(html, 'og:url', url, 'property')
  html = setMeta(html, 'og:title', route.title, 'property')
  html = setMeta(html, 'og:description', route.description, 'property')
  html = setMeta(html, 'og:image', image, 'property')
  html = setMeta(html, 'og:image:alt', imageAlt, 'property')
  html = setMeta(html, 'twitter:card', 'summary_large_image')
  html = setMeta(html, 'twitter:title', route.title)
  html = setMeta(html, 'twitter:description', route.description)
  html = setMeta(html, 'twitter:image', image)
  html = setMeta(html, 'twitter:image:alt', imageAlt)
  html = setCanonical(html, url)
  html = html.replace(/\s*<link\s+rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>/gi, '')
  const alternates = [
    `<link rel="alternate" hreflang="he" href="${absoluteUrl(languagePair(route, 'he'))}" />`,
    `<link rel="alternate" hreflang="en" href="${absoluteUrl(languagePair(route, 'en'))}" />`,
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(languagePair(route, 'he'))}" />`,
  ].join('\n    ')
  html = html.replace('</head>', `    ${alternates}\n  </head>`)
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(schemaFor(route))}</script>`
  html = /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i.test(html)
    ? html.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i, jsonLd)
    : html.replace('</head>', `    ${jsonLd}\n  </head>`)
  return html
}

for (const route of routes) {
  const outputPath = route.path === '/' ? templatePath : path.join(distDir, route.path.replace(/^\/+|\/+$/g, ''), 'index.html')
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, await createDocument(route))
}

const lastmod = new Date().toISOString().slice(0, 10)
const sitemapPaths = [...new Set([
  ...routes.map((route) => route.path),
  '/privacy/',
  '/terms/',
])]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths
  .map((routePath) => `  <url><loc>${escapeXml(absoluteUrl(routePath))}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap)

await rm(path.join(distDir, 'server'), { recursive: true, force: true })
console.log(`Prerendered ${routes.length} localized SEO routes and generated a ${sitemapPaths.length}-URL sitemap`)
