import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { serviceSlugs } from '../../src/lib/seoRoutes'
import { pagesByLanguage, localizePath } from '../../src/lib/seoRegistry'

async function analytics(page: Page, consent = 'granted') {
  await page.addInitScript(value => {
    localStorage.setItem('codecrafter-analytics-consent-v1', value)
    Object.assign(window, { __ga: [], __clarity: [], gtag: (...args: unknown[]) => (window as any).__ga.push(args), clarity: (...args: unknown[]) => (window as any).__clarity.push(args) })
  }, consent)
  await page.route(/googletagmanager|clarity\.ms/, route => route.abort())
}
const events = (page: Page, name: string) => page.evaluate(event => (window as any).__ga.filter((args: unknown[]) => args[0] === 'event' && args[1] === event), name)

for (const lang of ['he', 'en'] as const) {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    test(`${lang} ${viewport.width}: all routes, metadata, forms and overflow`, async ({ page }) => {
      test.setTimeout(180000)
      await analytics(page, 'denied'); await page.setViewportSize(viewport)
      for (const path of [localizePath('', lang), localizePath('portfolio', lang), localizePath('resume', lang), ...pagesByLanguage[lang].map(p => localizePath(p.slug, lang))]) {
        const response = await page.goto(path)
        expect(response?.status(), path).toBe(200)
        await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr')
        await expect(page.locator('h1')).toHaveCount(1)
        await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://mosheschwartzberg.com${path}`)
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBe(true)
        expect(await page.locator('link[hreflang]').count()).toBeGreaterThanOrEqual(2)
        if (serviceSlugs.some(s => path === localizePath(s, lang))) await expect(page.locator('form[data-contact-form]')).toHaveCount(1)
      }
    })
  }
  test(`${lang}: accessible homepage and service page`, async ({ page }) => {
    await analytics(page, 'denied')
    for (const path of [localizePath('', lang), localizePath('websites', lang)]) {
      await page.goto(path)
      const contactForm = page.locator('form[data-contact-form]')
      await expect(contactForm).toHaveCount(1)
      await expect(contactForm.locator('a[href*="wa.me"], [data-placement="contact_whatsapp"]')).toHaveCount(0)
      await expect(contactForm.locator('button[type="submit"]')).toHaveCount(1)
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      expect(result.violations).toEqual([])
    }
  })
}
test('first-visit consent, saved choice, sensitive URL removal and cross-tab withdrawal', async ({ page }) => {
  const requests: string[] = []
  await page.addInitScript(() => { if (!sessionStorage.getItem('initialized')) { localStorage.clear(); sessionStorage.setItem('initialized', 'true') } })
  await page.route(/googletagmanager|clarity\.ms/, route => { requests.push(route.request().url()); return route.abort() })
  await page.goto('/en/?email=private@example.com&token=secret')
  await expect(page.locator('.consent-panel h2')).toHaveCount(0)
  await expect(page.locator('.consent-panel')).toHaveAttribute('aria-label', 'Analytics preferences')
  await expect(page.locator('.consent-panel a[href="/privacy/"]')).toHaveCount(1)
  await expect(page.locator('.consent-panel')).toHaveCSS('width', '336px')
  expect(requests).toEqual([])
  await page.getByRole('button', { name: 'Allow analytics' }).click()
  await expect.poll(() => requests.length).toBe(2)
  expect(new URL(page.url()).search).toBe('')
  await page.reload()
  await expect(page.locator('.consent-panel')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Analytics preferences' })).toHaveCount(0)
  await page.goto('/en/websites/')
  await expect(page.locator('.consent-panel')).toHaveCount(0)
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.evaluate(() => { localStorage.setItem('codecrafter-analytics-consent-v1', 'denied'); window.dispatchEvent(new StorageEvent('storage', { key: 'codecrafter-analytics-consent-v1', newValue: 'denied' })) }),
  ])
  expect(await page.evaluate(() => localStorage.getItem('codecrafter-analytics-consent-v1'))).toBe('denied')
  expect(await page.locator('#ga4-script, #clarity-script').count()).toBe(0)
  await expect(page.locator('.consent-panel')).toHaveCount(0)
  await page.reload()
  await expect(page.locator('.consent-panel')).toHaveCount(0)
})
test('EmailJS contact validation, retry and lead privacy', async ({ page }) => {
  await analytics(page); await page.goto('/en/')
  const requests: any[] = []
  let attempt = 0
  await page.route('**/api/v1.0/email/send', async route => {
    if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' } })
    requests.push(route.request().postDataJSON())
    attempt++
    await route.fulfill({ status: attempt === 1 ? 502 : 200, contentType: 'text/plain', body: attempt === 1 ? 'Unavailable' : 'OK', headers: { 'access-control-allow-origin': '*' } })
  })
  const form = page.locator('form[data-contact-form]')
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.locator('[name=name]')).toBeFocused()
  await form.locator('[name=name]').fill('Private Person')
  await form.locator('[name=phone]').fill('bad')
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.locator('[name=phone]')).toHaveAttribute('aria-invalid', 'true')
  await form.locator('[name=phone]').fill('+972587076077')
  await form.locator('[name=message]').fill('Private free text')
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.getByRole('alert')).toContainText('Could not send')
  await expect(form.locator('[name=name]')).toHaveValue('Private Person')
  expect((await events(page, 'generate_lead')).length).toBe(0)
  await form.getByRole('button', { name: 'Request a quote' }).dblclick()
  await expect(form.getByRole('status')).toContainText('accepted')
  expect(requests).toHaveLength(2)
  expect(requests[1]).toMatchObject({ service_id: 'service_lx51il8', template_id: 'template_jux7c9h', user_id: 'aS_Kd2on0E1C1dTBv', template_params: { name: 'Private Person', phone: '+972587076077' } })
  expect(requests[1].template_params.message).toContain('Private free text')
  expect((await events(page, 'generate_lead')).length).toBe(1)
  const calls = JSON.stringify(await page.evaluate(() => [(window as any).__ga, (window as any).__clarity]))
  for (const value of ['Private Person', '+972587076077', 'Private free text']) expect(calls).not.toContain(value)
  expect(await page.evaluate(() => (window as any).__clarity.some((a: unknown[]) => a[0] === 'event' && a[1] === 'generate_lead'))).toBe(true)
})
test('EmailJS rejects unexpected HTTP 200 responses; the form works without analytics consent', async ({ page }) => {
  await analytics(page, 'denied'); await page.goto('/en/websites/')
  const form = page.locator('form[data-contact-form]')
  await form.locator('[name=name]').fill('Mock Test'); await form.locator('[name=email]').fill('test@example.com')
  await page.route('**/api/v1.0/email/send', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'Unexpected response', headers: { 'access-control-allow-origin': '*' } }))
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.getByRole('alert')).toBeVisible()
  await page.unroute('**/api/v1.0/email/send')
  await page.route('**/api/v1.0/email/send', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK', headers: { 'access-control-allow-origin': '*' } }))
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.getByRole('status')).toBeVisible()
  expect(await events(page, 'generate_lead')).toEqual([])
})
test('all five scroll thresholds, resize deduplication, SPA navigation and history reset', async ({ page }) => {
  await analytics(page); await page.goto('/en/')
  await page.evaluate(() => document.documentElement.style.scrollBehavior = 'auto')
  for (const percent of [25, 50, 75, 90, 100]) {
    await page.evaluate(p => window.scrollTo(0, Math.max(1, document.documentElement.scrollHeight * p / 100 - innerHeight + 2)), percent)
    await expect.poll(async () => (await events(page, 'scroll_depth')).map((a: any[]) => a[2].scroll_percent)).toContain(percent)
  }
  await page.setViewportSize({ width: 1000, height: 900 })
  await page.evaluate(() => window.dispatchEvent(new Event('scroll')))
  expect((await events(page, 'scroll_depth')).map((a: any[]) => a[2].scroll_percent)).toEqual([25, 50, 75, 90, 100])
  const clarity = await page.evaluate(() => (window as any).__clarity.filter((a: unknown[]) => a[0] === 'event' && String(a[1]).startsWith('scroll_')).map((a: unknown[]) => a[1]))
  expect(clarity).toEqual(['scroll_25', 'scroll_50', 'scroll_75', 'scroll_90', 'scroll_100'])
  await page.evaluate(() => { history.pushState({}, '', '/en/websites/'); window.dispatchEvent(new Event('scroll')) })
  await expect.poll(async () => (await events(page, 'page_view')).length).toBe(2)
  await page.evaluate(() => history.back())
  await expect.poll(async () => (await events(page, 'page_view')).length).toBe(3)
})
test('navigation, FAQ, portfolio, vendor failures and service links', async ({ page }) => {
  await analytics(page); await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/en/')
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  expect((await events(page, 'mobile_menu_open')).length).toBe(1)
  await page.getByRole('button', { name: 'Close menu', exact: true }).click()
  await page.locator('#services a').first().click(); await expect(page).toHaveURL(/\/en\/websites\/$/)
  await page.locator('.faq-accordion-trigger').first().click(); await expect.poll(async () => (await events(page, 'faq_expand')).length).toBe(1)
  await page.evaluate(() => { (window as any).gtag = () => { throw Error('vendor failure') } })
  await page.locator('.faq-accordion-trigger').first().click(); await page.locator('.faq-accordion-trigger').first().click()
  const localLinks = await page.locator('a[href^="/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')!.split('#')[0]))])
  for (const url of localLinks.filter(Boolean)) expect((await page.request.get(url)).status(), url).toBe(200)
  await page.goto('/en/portfolio/')
  await expect(page.getByRole('heading', { name: 'Mahagony Israel' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'SumsUp' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Aderet & Argaman' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'AI Pro' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Green Therapy' })).toBeVisible()
  await expect(page.locator('#portfolio img[src="https://greentherapy.co.il/assets/green-therapy-logo.webp"]')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'CodeRecovery' })).toHaveCount(0)
  await expect(page.locator('img[src="https://omnifood.dev/img/omnifood-logo.png"]')).toHaveCount(1)
  await expect(page.locator('a[href="https://rainbowasdv2.netlify.app"]')).toHaveCount(1)
})
test('existing redirects, unknown route and nonconfigured local backend', async ({ request }) => {
  for (const [from, to] of [['/blog.html', '/websites/'], ['/index.html', '/'], ['/portfolio/Rainbow-ASD', '/portfolio/'], ['/pricing/', '/services/'], ['/en/pricing/', '/en/services/'], ['/portfolio/sumsup/', '/portfolio/'], ['/en/portfolio/green-therapy/', '/en/portfolio/']]) {
    const response = await request.get(from, { maxRedirects: 0 }); expect(response.status()).toBe(301); expect(response.headers().location).toBe(to)
  }
  expect((await request.get('/does-not-exist/')).status()).toBe(404)
  expect((await request.post('/api/contact', { data: { name: 'Mock', email: 'test@example.com' } })).status()).toBe(503)
})

test('journey events, section impressions, privacy-safe diagnostics and language switch', async ({ page }) => {
  await analytics(page); await page.goto('/en/websites/')
  await page.locator('.seo-page-actions a[href="#contact-page"]').click()
  await expect.poll(async () => (await events(page, 'contact_form_view')).length).toBe(1)
  expect((await events(page, 'cta_click')).length).toBe(1)
  expect((await events(page, 'service_section_view')).length).toBeGreaterThan(0)
  await page.locator('[name=name]').focus(); await page.locator('[name=email]').focus(); await page.locator('[name=name]').focus()
  expect((await events(page, 'form_start')).length).toBe(1)
  expect((await events(page, 'form_field_focus')).length).toBe(2)
  await page.evaluate(() => {
    for (const href of ['mailto:private@example.com?body=secret', 'tel:+972587076077', 'https://wa.me/972587076077?text=secret']) {
      const a = document.createElement('a'); a.href = href; a.addEventListener('click', e => e.preventDefault()); document.body.append(a); a.click(); a.remove()
    }
    window.dispatchEvent(new ErrorEvent('error', { message: 'private@example.com private-token' }))
    window.dispatchEvent(new Event('pagehide'))
  })
  for (const name of ['email_click', 'phone_click', 'whatsapp_click', 'javascript_error', 'form_abandon']) expect((await events(page, name)).length, name).toBe(1)
  expect(JSON.stringify(await page.evaluate(() => (window as any).__ga))).not.toContain('secret')
  await page.evaluate(() => {
    const old = (window as any).gtag
    ;(window as any).gtag = (...args: unknown[]) => { old(...args); if (args[1] === 'language_switch') sessionStorage.setItem('language-event', 'yes') }
  })
  await page.getByRole('button', { name: 'מעבר לעברית' }).first().click()
  await expect(page).toHaveURL(/\/websites\/(?:#contact-page)?$/)
  expect(await page.evaluate(() => sessionStorage.getItem('language-event'))).toBe('yes')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

test('vendor exceptions cannot break a successful form', async ({ page }) => {
  await analytics(page); await page.goto('/en/')
  await page.evaluate(() => { (window as any).gtag = (window as any).clarity = () => { throw Error('vendor down') } })
  await page.route('**/api/v1.0/email/send', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK', headers: { 'access-control-allow-origin': '*' } }))
  await page.locator('[name=name]').fill('Mock'); await page.locator('[name=email]').fill('test@example.com')
  await page.locator('form[data-contact-form]').getByRole('button', { name: 'Request a quote' }).click()
  await expect(page.locator('form[data-contact-form]').getByRole('status')).toBeVisible()
})

test('Google verification file and editorial hub are crawlable', async ({ request, page }) => {
  const verification = await request.get('/google6768eed8771c59fe.html')
  expect(verification.status()).toBe(200)
  expect((await verification.text()).trim()).toBe('google-site-verification: google6768eed8771c59fe.html')
  await analytics(page, 'denied')
  await page.goto('/en/site-map/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CodeCrafter website sitemap')
  for (const path of ['/en/guides/', '/en/guides/planning-a-custom-crm/', '/en/guides/woocommerce-to-shopify-migration/']) {
    expect(await page.locator('a[href="' + path + '"]').count()).toBeGreaterThan(0)
    const response = await request.get(path)
    expect(response.status()).toBe(200)
  }
})
test('EmailJS includes consented campaign fields but never click IDs or sensitive search terms', async ({ page }) => {
  await analytics(page)
  await page.goto('/en/?utm_source=linkedin&utm_medium=social&utm_campaign=autumn_launch&utm_term=private%40example.com&gclid=private-click-id')
  await expect.poll(() => new URL(page.url()).search).toBe('')
  let received: any
  await page.route('**/api/v1.0/email/send', route => {
    received = route.request().postDataJSON()
    return route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK', headers: { 'access-control-allow-origin': '*' } })
  })
  const form = page.locator('form[data-contact-form]')
  await form.locator('[name=name]').fill('Campaign Test')
  await form.locator('[name=email]').fill('test@example.com')
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.getByRole('status')).toBeVisible()
  expect(received.template_params).toMatchObject({ utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'autumn_launch', landing_path: '/en/' })
  expect(received.service_id).toBe('service_lx51il8')
  expect(JSON.stringify(received)).not.toContain('private-click-id')
  expect(JSON.stringify(received)).not.toContain('private@example.com')
  expect(JSON.stringify(await page.evaluate(() => (window as any).__ga))).not.toContain('autumn_launch')
})
test('denying analytics excludes campaign attribution from EmailJS contact submissions', async ({ page }) => {
  await analytics(page, 'denied')
  await page.goto('/en/?utm_source=linkedin&utm_campaign=private')
  let received: any
  await page.route('**/api/v1.0/email/send', route => {
    received = route.request().postDataJSON()
    return route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK', headers: { 'access-control-allow-origin': '*' } })
  })
  const form = page.locator('form[data-contact-form]')
  await form.locator('[name=name]').fill('Denied Test')
  await form.locator('[name=email]').fill('test@example.com')
  await form.getByRole('button', { name: 'Request a quote' }).click()
  await expect(form.getByRole('status')).toBeVisible()
  expect(received.template_params.utm_source).toBeUndefined()
  expect(received.template_params.utm_campaign).toBeUndefined()
  expect(received.template_params.message).not.toContain('private')
})

test('only the three requested projects appear on the homepage', async ({ page }) => {
  await analytics(page, 'denied')
  for (const lang of ['he', 'en'] as const) {
    await page.goto(localizePath('', lang))
    const cards = page.locator('#portfolio .portfolio-inner-card, #portfolio .group')
    await expect(cards).toHaveCount(3)
    for (const slug of ['greentherapy.co.il', 'shimonphotos.com', 'ilanshacar.netlify.app']) {
      await expect(page.locator('#portfolio a[href*="' + slug + '"]')).toHaveCount(1)
    }
    await expect(page.locator('#portfolio a[href*="ykadosh.co.il"]')).toHaveCount(0)
    await expect(page.locator('#portfolio img[src="https://greentherapy.co.il/assets/green-therapy-logo.webp"]')).toHaveCount(1)
    await expect(page.locator('a[href*="/pricing/"]')).toHaveCount(0)
    await expect(page.locator('a[href*="/portfolio/"][href*="coderecovery"]')).toHaveCount(0)
  }
})
test('testimonials have the correct project associations without review links', async ({ page }) => {
  await analytics(page, 'denied')
  await page.goto('/')
  const testimonials = page.locator('#testimonials')
  await expect(testimonials.locator('.testimonial-card')).toHaveCount(6)
  await expect(testimonials.locator('a')).toHaveCount(0)
  for (const name of ['Alon Greenshtein', 'Akiva Kulbersh']) await expect(testimonials.getByText(name, { exact: true })).toBeVisible()
  for (const project of ['Green Therapy', 'TorahPublishing', 'shimonphotos.com']) await expect(testimonials.getByText(project, { exact: true })).toBeVisible()
  await expect(page.getByText('עבודה ישירה עם המפתח')).toHaveCount(0)
  await expect(page.locator('.section-kicker')).toHaveCount(0)
  await page.goto('/websites/')
  await expect(page.getByText('מקור: CodeCrafter')).toHaveCount(0)
  await expect(page.locator('.section-kicker')).toHaveCount(0)
  await page.goto('/en/guides/')
  await expect(page.getByText('Original publisher: CodeCrafter')).toHaveCount(0)
})
