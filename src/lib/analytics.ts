import { serviceSlugs } from './seoRoutes'
import { onCLS, onINP, onLCP } from 'web-vitals'

type Vendor = (...args: unknown[]) => void
type AnalyticsWindow = Window & { gtag?: Vendor; clarity?: Vendor; dataLayer?: unknown[] }
export const CONSENT_KEY = 'codecrafter-analytics-consent-v1'
const GA_ID = 'G-TJ3C0BBH0F'
const CLARITY_ID = 'ogbt355cwc'
let enabled = false
let installed = false
let loaded = false
let resetPage: (() => void) | undefined
let experiment: { experiment_id: string; experiment_variant: string } | undefined
const leadIds = new Set<string>()
const allowedKeys = new Set(['section_name', 'cta_location', 'cta_type', 'contact_channel', 'field_name', 'error_type', 'scroll_percent', 'duration_ms', 'status_code', 'metric_name', 'metric_value', 'metric_rating', 'target_service', 'experiment_id', 'experiment_variant', 'delivery_status'])
const knownPaths = new Set(['', ...serviceSlugs, 'services', 'resume', 'about', 'pricing', 'portfolio', 'locations',
  ...['sumsup', 'coderecovery', 'yuval-kadosh', 'creative-intelligence', 'rainbow-asd', 'shimon-photography'].map(slug => `portfolio/${slug}`),
  ...['north', 'center', 'tel-aviv', 'haifa', 'jerusalem', 'beer-sheva', 'karmiel'].map(slug => `locations/${slug}`)])
export function getPageContext() {
  const path = window.location.pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/+|\/+$/g, '')
  const category = serviceSlugs.find(slug => path === slug)
  const known = knownPaths.has(path)
  return { page_path: known ? window.location.pathname : '/unknown/', page_type: !path ? 'home' : category ? 'service' : path.startsWith('portfolio') ? 'portfolio' : 'information', service_category: category || (!path ? 'websites' : 'general'), language: /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'he' }
}
export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  if (!enabled || !/^[a-z][a-z0-9_]{0,39}$/.test(name)) return
  const safe = Object.fromEntries(Object.entries(parameters).filter(([key, value]) => allowedKeys.has(key) && (typeof value !== 'string' || /^[a-zA-Z0-9_.-]{1,80}$/.test(value))))
  const w = window as AnalyticsWindow
  try { w.gtag?.('event', name, { ...safe, ...getPageContext(), ...experiment }) } catch { /* Vendors never break the site. */ }
  try { w.clarity?.('event', name === 'scroll_depth' ? `scroll_${safe.scroll_percent}` : name) } catch { /* Independent vendor failure. */ }
}
export function trackContactLead(id: string) {
  if (leadIds.has(id)) return
  leadIds.add(id)
  trackEvent('generate_lead', { delivery_status: 'provider_accepted' })
}
export const trackContactFormStart = () => trackEvent('form_start')
export const trackContactFormSubmit = () => trackEvent('form_submit_attempt')
export const trackContactFormError = (error_type: string) => trackEvent('form_submit_error', { error_type })
export function readConsent(): 'granted' | 'denied' | null {
  try { const value = localStorage.getItem(CONSENT_KEY); return value === 'granted' || value === 'denied' ? value : null } catch { return null }
}
function sanitizeLocation() {
  // Clarity observes the real URL. Remove query values before any recording starts.
  // This application does not use query strings for routing or functionality.
  const hash = /^#(?:contact(?:-page)?|main-content|services|portfolio|process|faq-heading|business-faq|page-section-\d{1,2})$/.test(window.location.hash) ? window.location.hash : ''
  if (window.location.search || window.location.hash !== hash) history.replaceState(history.state, '', window.location.pathname + hash)
}
function consentCommands(granted: boolean) {
  const w = window as AnalyticsWindow
  try { w.gtag?.('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }) } catch {}
  try { w.clarity?.('consentv2', { analytics_Storage: granted ? 'granted' : 'denied', ad_Storage: 'denied' }) } catch {}
}
function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!/^(_ga(?:_|$)|_gid$|_gat|_clck$|_clsk$)/.test(name)) continue
    const domains = ['', window.location.hostname, `.${window.location.hostname}`]
    const parts = window.location.hostname.split('.')
    if (parts.length > 2) domains.push(`.${parts.slice(-2).join('.')}`)
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}; SameSite=Lax`
  }
}
function loadVendors() {
  if (loaded) return
  if (getPageContext().page_path === '/unknown/') return
  loaded = true
  sanitizeLocation()
  const w = window as AnalyticsWindow
  w.dataLayer = w.dataLayer || []
  w.gtag = w.gtag || function () { w.dataLayer!.push(arguments) }
  w.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  const queue: IArguments[] = []
  w.clarity = w.clarity || Object.assign(function () { queue.push(arguments) }, { q: queue })
  consentCommands(true)
  w.gtag('js', new Date())
  w.gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: window.location.origin + getPageContext().page_path, page_referrer: safeReferrer() })
  for (const [id, src] of [['ga4-script', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`], ['clarity-script', `https://www.clarity.ms/tag/${CLARITY_ID}`]]) {
    if (document.getElementById(id)) continue
    const script = document.createElement('script'); script.id = id; script.async = true; script.src = src; document.head.append(script)
  }
}
function safeReferrer() {
  try { return document.referrer ? new URL(document.referrer).origin + '/' : '' } catch { return '' }
}
export function setAnalyticsConsent(granted: boolean) {
  try { localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied') } catch {}
  enabled = granted
  if (granted) { loadVendors(); consentCommands(true); resetPage?.() }
  else {
    consentCommands(false)
    clearAnalyticsCookies()
    // Vendors already loaded cannot be unloaded reliably. Reload into the denied state.
    if (loaded) window.location.reload()
  }
}
// No assignment or experiment starts automatically. Call only for an approved test.
export function exposeExperiment(id: string, variant: string) {
  if (!/^[a-z0-9_-]{1,40}$/.test(id) || !/^[a-z0-9_-]{1,40}$/.test(variant)) return
  experiment = { experiment_id: id, experiment_variant: variant }
  try { const clarity = (window as AnalyticsWindow).clarity; if (enabled) { clarity?.('set', 'experiment_id', id); clarity?.('set', 'experiment_variant', variant) } } catch {}
  trackEvent('experiment_exposure', experiment)
}
export const scrollMilestones = [25, 50, 75, 90, 100] as const
export function reachedMilestones(scrollTop: number, viewport: number, height: number, seen: Set<number>) {
  if (height <= viewport || scrollTop <= 0) return []
  const percent = Math.min(100, Math.round(((scrollTop + viewport) / height) * 10000) / 100)
  const reached = scrollMilestones.filter(m => !seen.has(m) && percent >= m - (m === 100 ? 0.1 : 0))
  reached.forEach(m => seen.add(m))
  return reached
}
export function installContactClickTracking() {
  if (installed) return
  installed = true
  enabled = readConsent() === 'granted'
  if (enabled) loadVendors()
  else clearAnalyticsCookies()
  let milestones = new Set<number>()
  let viewed = new Set<Element>()
  let frame = 0
  const observer = new IntersectionObserver(entries => {
    if (!enabled) return
    for (const entry of entries) {
      if (!entry.isIntersecting || viewed.has(entry.target)) continue
      viewed.add(entry.target)
      const el = entry.target as HTMLElement
      trackEvent(el.matches('form') ? 'contact_form_view' : 'service_section_view', { section_name: el.dataset.section || el.id || 'content' })
    }
  }, { threshold: 0, rootMargin: '-10% 0px -10% 0px' })
  const observe = () => document.querySelectorAll('main section[id], [data-section], form[data-contact-form]').forEach(el => observer.observe(el))
  const checkScroll = () => {
    frame = 0
    if (!enabled) return
    reachedMilestones(window.scrollY, window.innerHeight, document.documentElement.scrollHeight, milestones).forEach(scroll_percent => trackEvent('scroll_depth', { scroll_percent }))
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(checkScroll) }
  resetPage = () => {
    sanitizeLocation(); milestones = new Set(); viewed = new Set(); observer.disconnect(); observe()
    if (!enabled) return
    const w = window as AnalyticsWindow
    try { w.gtag?.('event', 'page_view', { ...getPageContext(), page_location: window.location.origin + getPageContext().page_path, page_referrer: safeReferrer(), ...experiment }) } catch {}
    try { for (const [key, value] of Object.entries({ ...getPageContext(), ...experiment })) if (key !== 'page_path') w.clarity?.('set', key, value) } catch {}
  }
  observe()
  new MutationObserver(observe).observe(document.getElementById('root') || document.body, { childList: true, subtree: true })
  new ResizeObserver(schedule).observe(document.documentElement)
  window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule, { passive: true })
  window.addEventListener('popstate', () => resetPage?.())
  window.addEventListener('storage', event => {
    if (event.key !== CONSENT_KEY) return
    enabled = event.newValue === 'granted'
    if (enabled) { loadVendors(); consentCommands(true); resetPage?.() }
    else { consentCommands(false); clearAnalyticsCookies(); if (loaded) window.location.reload() }
  })
  window.addEventListener('pageshow', e => { if (e.persisted) resetPage?.() })
  for (const method of ['pushState', 'replaceState'] as const) {
    const original = history[method].bind(history)
    history[method] = (...args: Parameters<History[typeof method]>) => {
      const before = window.location.pathname; original(...args)
      if (window.location.pathname !== before) resetPage?.()
    }
  }
  document.addEventListener('click', e => {
    const link = (e.target as Element)?.closest<HTMLAnchorElement>('a[href]')
    if (!link) return
    const href = link.getAttribute('href') || ''
    const placement = link.dataset.placement || link.closest<HTMLElement>('[id]')?.id || (link.closest('nav') ? 'navigation' : link.closest('footer') ? 'footer' : 'page')
    const parameters = { cta_location: placement }
    const channel = /^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)/i.test(href) ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : ''
    if (channel) { trackEvent(`${channel}_click`, parameters); trackEvent('contact_click', { ...parameters, contact_channel: channel }) }
    if (/#contact(?:-page)?$/.test(href)) trackEvent('cta_click', { ...parameters, cta_type: 'form' })
    if (link.closest('nav')) trackEvent('nav_click', parameters)
    const target = serviceSlugs.find(slug => href === `/${slug}/` || href === `/en/${slug}/`)
    if (target) { trackEvent('service_page_navigation', { ...parameters, target_service: target }); if (link.closest('#services')) trackEvent('service_card_click', { target_service: target }) }
    if (link.closest('#portfolio, .seo-related') && !target) {
      if (/^https?:\/\//.test(href)) trackEvent('outbound_project_click', parameters)
      else if (href.includes('/portfolio/')) trackEvent('portfolio_card_click', parameters)
    }
  })
  document.addEventListener('toggle', e => { const el = e.target as HTMLDetailsElement; if (el.matches?.('details') && el.open) trackEvent('faq_expand', { section_name: 'faq' }) }, true)
  window.addEventListener('error', () => trackEvent('javascript_error', { error_type: 'uncaught_error' }))
  window.addEventListener('unhandledrejection', () => trackEvent('javascript_error', { error_type: 'unhandled_rejection' }))
  const metric = (value: { name: string; value: number; rating: string }) => trackEvent('web_vital', { metric_name: value.name, metric_value: Math.round(value.value * 1000) / 1000, metric_rating: value.rating })
  onCLS(metric); onINP(metric); onLCP(metric)
  resetPage()
}
