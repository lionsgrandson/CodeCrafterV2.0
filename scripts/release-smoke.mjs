import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { writeFile } from 'node:fs/promises'

const browser = await chromium.launch()
const results = []
try {
  for (const language of ['he', 'en']) {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 } })
      const page = await context.newPage()
      const vendors = []; const errors = []
      page.on('request', r => { if (/googletagmanager|clarity\.ms/.test(r.url())) vendors.push(r.url()) })
      page.on('pageerror', e => errors.push(e.message))
      for (const slug of ['', 'websites/', 'services/', 'resume/']) {
        const path = `/${language === 'en' ? 'en/' : ''}${slug}`
        const response = await page.goto(`https://mosheschwartzberg.com${path}`, { waitUntil: 'networkidle' })
        const entry = { path, width, status: response.status(), h1: await page.locator('h1').count(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), forms: await page.locator('form[data-contact-form]').count() }
        if (!slug) {
          await page.screenshot({ path: `docs/evidence/live-${language}-${width}.png` })
          entry.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map(v => ({ id: v.id, impact: v.impact }))
        }
        results.push(entry)
      }
      results.push({ language, width, vendorRequestsBeforeConsent: vendors.length, pageErrors: errors })
      await context.close()
    }
  }
} finally { await browser.close() }
await writeFile('docs/evidence/live-smoke.json', JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2))
console.log(JSON.stringify(results, null, 2))
if (results.some(r => r.status && r.status !== 200 || r.overflow || r.h1 && r.h1 !== 1 || r.axe?.length || r.vendorRequestsBeforeConsent || r.pageErrors?.length)) process.exit(1)
