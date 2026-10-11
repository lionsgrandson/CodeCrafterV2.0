import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleContact } from '../server/contact'
import { onRequestPost, onRequest } from '../functions/api/contact/index'
import { validateContact } from '../src/lib/contactValidation'
import { reachedMilestones } from '../src/lib/analytics'

const input = { name: 'Test <script>', email: 'test@example.com', phone: '', message: '<b>test</b>', company: '' }
const env = { RESEND_API_KEY: 'mock-key', RESEND_FROM_EMAIL: 'staging@example.com', CONTACT_NOTIFICATION_EMAIL: 'inbox@example.com' }
const request = (body: unknown = input) => new Request('https://staging.example/api/contact', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json', 'Idempotency-Key': '12345678-1234-1234-1234-123456789012' } })
test('valid email-only and phone-only, invalid methods and limits', () => {
  assert.deepEqual(validateContact(input), {})
  assert.deepEqual(validateContact({ ...input, email: '', phone: '+972 58 707 6077' }), {})
  for (const overrides of [{ name: '' }, { email: '', phone: '' }, { email: 'bad' }, { phone: 'abc' }, { phone: '123' }, { message: 'a'.repeat(5001) }]) assert.ok(Object.keys(validateContact({ ...input, ...overrides })).length)
})
test('acceptance requires provider id, preserves recipient, reply-to, escaped HTML and idempotency', async () => {
  const mock = (async (_url, options) => {
    assert.equal(options.headers['Idempotency-Key'], 'contact-12345678-1234-1234-1234-123456789012')
    const body = JSON.parse(String(options.body))
    assert.deepEqual(body.to, ['inbox@example.com']); assert.equal(body.reply_to, input.email)
    assert.ok(body.html.includes('&lt;script&gt;')); assert.ok(!body.html.includes('<script>'))
    return Response.json({ id: 'mock-provider-id' })
  }) as typeof fetch
  const response = await handleContact(request(), env, mock)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true, accepted: true, deliveryStatus: 'provider_accepted' })
})
test('provider rejection, malformed success, network errors and missing configuration never accept', async () => {
  for (const send of [(async () => Response.json({ message: 'rejected' }, { status: 429 })), (async () => Response.json({})), (async () => { throw new Error('network') })]) {
    const response = await handleContact(request(), env, send as typeof fetch)
    assert.equal(response.status, 502); assert.ok(!(await response.json()).accepted)
  }
  assert.equal((await onRequestPost({ request: request(), env: {} })).status, 503)
  assert.equal(onRequest().status, 405)
})
test('malformed, oversized and honeypot requests never call provider', async () => {
  const forbidden = (async () => { assert.fail('provider must not be called') }) as typeof fetch
  for (const body of [null, [], { ...input, phone: 'wrong' }, { ...input, name: 'a'.repeat(121) }]) assert.equal((await handleContact(request(body), env, forbidden)).status, 400)
  const response = await handleContact(request({ ...input, company: 'spam' }), env, forbidden)
  assert.deepEqual(await response.json(), { ok: true, accepted: false })
})
test('all scroll milestones deduplicate and adapt to changing heights', () => {
  const seen = new Set<number>()
  assert.deepEqual(reachedMilestones(0, 1000, 1000, seen), [])
  for (const milestone of [25, 50, 75, 90, 100]) {
    assert.deepEqual(reachedMilestones(milestone * 40 - 1000, 1000, 4000, seen), milestone === 25 ? [] : milestone === 50 ? [25, 50] : [milestone])
    assert.deepEqual(reachedMilestones(milestone * 40 - 1000, 1000, 4000, seen), [])
  }
  assert.deepEqual(reachedMilestones(7000, 1000, 8000, seen), [])
  assert.deepEqual(reachedMilestones(1000, 1000, 8000, new Set()), [25])
})
