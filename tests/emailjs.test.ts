import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  EMAILJS_ENDPOINT,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  buildEmailJSTemplateParams,
  sendContactWithEmailJS,
} from '../src/lib/emailjsContact'
import type { ContactInput } from '../src/lib/contactValidation'

const input: ContactInput = {
  name: '  Test Client  ',
  email: 'client@example.com',
  phone: '+972 50 123 4567',
  message: '  Please contact me about an integration.  ',
  company: '',
}

test('EmailJS uses the exact provided public service/template IDs and a self-contained message', async () => {
  const calls: { url: string; options?: RequestInit }[] = []
  const mockFetch = (async (url: RequestInfo | URL, options?: RequestInit) => {
    calls.push({ url: String(url), options })
    return new Response('OK', { status: 200 })
  }) as typeof fetch

  await sendContactWithEmailJS(input, 'he', undefined, mockFetch)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, EMAILJS_ENDPOINT)
  assert.equal(calls[0].options?.method, 'POST')
  assert.deepEqual(calls[0].options?.headers, { 'Content-Type': 'application/json' })
  const payload = JSON.parse(String(calls[0].options?.body))
  assert.equal(payload.service_id, EMAILJS_SERVICE_ID)
  assert.equal(payload.template_id, EMAILJS_TEMPLATE_ID)
  assert.equal(payload.user_id, EMAILJS_PUBLIC_KEY)
  assert.equal(payload.service_id, 'service_lx51il8')
  assert.equal(payload.template_id, 'template_jux7c9h')
  assert.equal(payload.user_id, 'aS_Kd2on0E1C1dTBv')
  assert.equal(payload.template_params.name, 'Test Client')
  assert.equal(payload.template_params.reply_to, 'client@example.com')
  assert.match(payload.template_params.message, /Please contact me about an integration\./)
  assert.match(payload.template_params.message, /Phone: \+972 50 123 4567/)
})

test('phone-only leads preserve their phone and have a safe Reply-To fallback', () => {
  const params = buildEmailJSTemplateParams({ ...input, email: '', message: '' }, 'en', undefined, new Date('2026-11-22T20:00:00.000Z'))
  assert.equal(params.email, 'moshe@mosheschwartzberg.com')
  assert.equal(params.contact_email, 'Not provided')
  assert.equal(params.reply_to, 'moshe@mosheschwartzberg.com')
  assert.match(params.message, /Phone: \+972 50 123 4567/)
  assert.match(params.message, /No additional project details provided/)
  assert.equal(params.time, '2026-11-22T20:00:00.000Z')
})

test('campaign fields are normalized and contain no raw query identifiers', () => {
  const params = buildEmailJSTemplateParams(input, 'en', {
    utm_source: 'linkedin',
    utm_campaign: 'new_clients',
    landing_path: '/en/',
    referrer_origin: 'https://www.linkedin.com',
    // Deliberately untrusted extra fields are dropped by the normalizer.
    utm_term: 'client@example.com',
    gclid: 'private-ad-click-id',
  } as any)
  assert.equal(params.utm_source, 'linkedin')
  assert.equal(params.landing_path, '/en/')
  assert.equal(params.utm_term, undefined)
  assert.equal(params.gclid, undefined)
  assert.doesNotMatch(params.message, /private-ad-click-id/)
})

test('EmailJS failures never produce a false success', async () => {
  for (const response of [new Response('Not authorized', { status: 403 }), new Response('Unexpected HTML', { status: 200 })]) {
    const mockFetch = (async () => response) as typeof fetch
    await assert.rejects(() => sendContactWithEmailJS(input, 'en', undefined, mockFetch), /emailjs_not_accepted/)
  }
})

test('network exceptions propagate so the form can retain the entered values', async () => {
  const failedFetch = (async () => { throw new TypeError('Network error') }) as typeof fetch
  await assert.rejects(() => sendContactWithEmailJS(input, 'en', undefined, failedFetch), /Network error/)
})
