import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useLanguage } from '../App'
import { contact, getWhatsAppUrl } from '../lib/contact'
import { validateContact, type ContactInput, type ContactField } from '../lib/contactValidation'
import { trackEvent, trackContactLead } from '../lib/analytics'

const empty: ContactInput = { name: '', email: '', phone: '', message: '', company: '' }
export function ContactForm({ id = 'contact', title, description }: { id?: string; title?: string; description?: string }) {
  const { lang } = useLanguage()
  const he = lang === 'he'
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})
  const started = useRef(false)
  const focused = useRef(new Set<ContactField>())
  const accepted = useRef(false)
  const inFlight = useRef(false)
  const requestId = useRef<string | null>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const abandon = () => { if (started.current && !accepted.current) trackEvent('form_abandon', { section_name: 'contact' }) }
    window.addEventListener('pagehide', abandon)
    return () => window.removeEventListener('pagehide', abandon)
  }, [])
  const labels = he ? { name: 'שם (חובה)', email: 'אימייל', phone: 'טלפון', message: 'על הפרויקט (רשות)' } : { name: 'Name (required)', email: 'Email', phone: 'Phone', message: 'About the project (optional)' }
  const messages: Record<string, string> = he ? {
    invalid_name: 'הזינו שם, עד 120 תווים.', missing_contact_method: 'הזינו אימייל או מספר טלפון כדי שאוכל לחזור אליכם.', invalid_email: 'בדקו את כתובת האימייל.', invalid_phone: 'הזינו מספר טלפון תקין עם 7–15 ספרות.', message_too_long: 'אפשר להזין עד 5,000 תווים.',
  } : { invalid_name: 'Enter a name, up to 120 characters.', missing_contact_method: 'Enter an email or phone number so I can reply.', invalid_email: 'Check the email address.', invalid_phone: 'Enter a phone number with 7–15 digits.', message_too_long: 'Use up to 5,000 characters.' }
  const focus = (field: ContactField) => {
    if (!started.current) { started.current = true; trackEvent('form_start') }
    if (!focused.current.has(field)) { focused.current.add(field); trackEvent('form_field_focus', { field_name: field }) }
  }
  const change = (field: keyof ContactInput, value: string) => {
    requestId.current = null
    setForm(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: undefined }))
    if (status !== 'sending') setStatus('idle')
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current || status === 'sent') return
    trackEvent('form_submit_attempt')
    const invalid = validateContact(form)
    setErrors(invalid)
    if (Object.keys(invalid).length) {
      for (const [field_name, error_type] of Object.entries(invalid)) trackEvent('form_validation_error', { field_name, error_type })
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(invalid)[0]}"]`)?.focus()
      return
    }
    inFlight.current = true; setStatus('sending')
    requestId.current ||= crypto.randomUUID()
    const key = requestId.current
    const start = performance.now()
    let statusCode = 0
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ ...form, language: lang }), signal: AbortSignal.timeout(16000) })
      statusCode = response.status
      const result = await response.json()
      if (!response.ok || result.ok !== true || result.accepted !== true || result.deliveryStatus !== 'provider_accepted') throw new Error('not_accepted')
      trackContactLead(key)
      accepted.current = true
      setStatus('sent'); setForm(empty)
    } catch {
      setStatus('error')
      trackEvent('form_submit_error', { error_type: statusCode ? 'backend_rejected' : 'network_or_timeout', status_code: statusCode })
      trackEvent('api_request_failed', { error_type: 'contact_request', status_code: statusCode })
      requestAnimationFrame(() => errorRef.current?.focus())
    } finally {
      trackEvent('form_submission_latency', { duration_ms: Math.round(performance.now() - start) })
      inFlight.current = false
    }
  }
  return <section id={id} className='contact-section px-6 md:px-8 bg-surface-container-low' data-section='contact'>
    <div className='max-w-3xl mx-auto'>
      <span className='section-kicker'>{he ? 'הצעד הבא' : 'Your next step'}</span>
      <h2 className='text-3xl md:text-5xl font-bold mb-4'>{title || (he ? 'בואו נבנה את האתר שמתאים לעסק שלכם' : 'Let’s build the website your business needs')}</h2>
      <p className='text-secondary mb-6'>{description || (he ? 'ספרו לי מה אתם צריכים. אחזור אליכם לשיחת היכרות, נחדד את ההיקף ונבדוק יחד את הצעד הבא לפני הצעת מחיר.' : 'Tell me what you need. I’ll reply for an introductory conversation, clarify the scope, and discuss the next step before a quote.')}</p>
      <form noValidate onSubmit={submit} data-contact-form data-clarity-mask='true' aria-busy={status === 'sending'} className='contact-form grid grid-cols-1 md:grid-cols-2 gap-5'>
        <p id={`${id}-help`} className='md:col-span-2 text-sm text-secondary'>{he ? 'שם ואחת מדרכי הקשר נדרשים: אימייל או טלפון. פירוט הפרויקט הוא רשות.' : 'A name and one contact method are required: email or phone. Project details are optional.'}</p>
        <div className='absolute -start-[10000px]' aria-hidden='true'><label htmlFor={`${id}-company`}>Company</label><input id={`${id}-company`} tabIndex={-1} autoComplete='off' value={form.company} onChange={e => change('company', e.target.value)} /></div>
        {(['name', 'email', 'phone', 'message'] as ContactField[]).map(field => {
          const props = { id: `${id}-${field}`, name: field, value: form[field], disabled: status === 'sending', onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => change(field, e.target.value), onFocus: () => focus(field), 'aria-invalid': Boolean(errors[field]), 'aria-describedby': `${id}-help${errors[field] ? ` ${id}-${field}-error` : ''}`, maxLength: { name: 120, email: 254, phone: 40, message: 5000 }[field] }
          return <div key={field} className={field === 'message' ? 'md:col-span-2' : ''}>
            <label htmlFor={props.id} className='block font-semibold mb-2'>{labels[field]}</label>
            {field === 'message' ? <textarea {...props} rows={3} /> : <input {...props} required={field === 'name'} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} inputMode={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'} autoComplete={field === 'phone' ? 'tel' : field} />}
            {errors[field] && <p id={`${id}-${field}-error`} className='text-primary text-sm mt-2' role='alert'>{messages[errors[field]!]}</p>}
          </div>
        })}
        {status === 'sent' && <p role='status' className='md:col-span-2 text-tertiary font-semibold'>{he ? 'הפנייה התקבלה לשליחה. אחזור אליכם בהקדם.' : 'Your inquiry was accepted for sending. I’ll get back to you soon.'}</p>}
        {status === 'error' && <p ref={errorRef} tabIndex={-1} role='alert' className='md:col-span-2 text-primary'>{he ? 'לא ניתן לאשר שהפנייה התקבלה. הפרטים נשמרו כאן — נסו שוב, או פנו ב-WhatsApp או בטלפון.' : 'We could not confirm your inquiry was accepted. Your details are still here — retry, or contact me by WhatsApp or phone.'} <a className='underline' href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a></p>}
        <p className='md:col-span-2 text-sm text-secondary'>{he ? 'הפרטים ישמשו למענה לפנייה, כפי שמפורט ב' : 'Your details will be used to reply, as described in the '}<a href='/privacy/' className='underline'>{he ? 'מדיניות הפרטיות' : 'privacy policy'}</a>.</p>
        <div className='md:col-span-2 flex flex-col sm:flex-row gap-3'>
          <button type='submit' disabled={status === 'sending' || status === 'sent'} className='button-primary px-6 py-4 disabled:opacity-70'>{status === 'sending' ? (he ? 'שולח…' : 'Sending…') : status === 'sent' ? (he ? 'הפנייה התקבלה' : 'Inquiry accepted') : (he ? 'שלחו בקשה להצעת מחיר' : 'Request a quote')}</button>
          <a className='button-secondary px-6 py-4' href={getWhatsAppUrl(lang)} target='_blank' rel='noreferrer' data-placement='contact_whatsapp'>{he ? 'אפשר גם ב-WhatsApp' : 'Prefer WhatsApp?'}</a>
        </div>
      </form>
    </div>
  </section>
}
