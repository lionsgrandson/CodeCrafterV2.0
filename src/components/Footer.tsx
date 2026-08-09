import { type FormEvent, useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  MessageSquare,
  Globe,
  Shield,
  Verified,
  Mail,
  Phone,
} from 'lucide-react'
import { useLanguage } from '../App'
import { trackContactLead } from '../lib/analytics'
import { contact, getWhatsAppUrl } from '../lib/contact'
import { WordReveal } from './WordReveal'

export function WhyWorkWithMe() {
  const { t } = useLanguage()
  const points = t.why.items

  return (
    <section className='viewport-section about-section px-6 md:px-8 bg-on-surface text-surface overflow-hidden'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)] gap-5 md:gap-10 items-center'>
        <div>
          <WordReveal
            text={t.why.headline}
            className='text-3xl md:text-5xl font-bold mb-5 md:mb-8 tracking-tight font-headline'
          />
          <ul className='space-y-2.5 md:space-y-4'>
            {points.map((point, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.625, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className='flex gap-3 md:gap-4 items-start'
              >
                <div className='mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm'>
                  <Check className='w-4 h-4 text-white' />
                </div>
                <div>
                  <h3 className='text-base md:text-lg font-bold mb-0.5 font-headline leading-tight'>
                    {point.title}
                  </h3>
                  <p className='text-sm opacity-70 font-light leading-snug'>
                    {point.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.625, delay: 0.6 }}
            className='mt-4 md:mt-6 p-3 md:p-4 bg-surface/5 border border-surface/10 rounded-xl'
          >
            <p className='text-sm md:text-lg font-headline italic font-light opacity-90'>
              {t.why.quote}
            </p>
          </motion.div>
        </div>
        <div className='relative flex justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className='w-full max-h-[62svh] aspect-[4/5] bg-primary/20 rounded-2xl relative overflow-hidden ring-1 ring-white/10'
          >
            <img
              className='w-full h-full object-cover grayscale'
              src='/about-photo-800.webp'
              srcSet='/about-photo-480.webp 480w, /about-photo-800.webp 800w, /about-photo-1200.webp 1200w'
              sizes='(max-width: 767px) calc(100vw - 48px), 50vw'
              alt={t.why.alt}
              loading='lazy'
              decoding='async'
              width='1200'
              height='800'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const copy =
    lang === 'he'
      ? {
          name: 'שם',
          email: 'אימייל',
          phone: 'טלפון',
          message: 'ספרו לי בקצרה על הפרויקט',
          success: 'ההודעה נשלחה. אחזור אליכם בהקדם.',
          error: 'משהו השתבש בשליחה. אפשר לנסות שוב או לשלוח WhatsApp.',
        }
      : {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          message: 'Tell me briefly about the project',
          success: 'Message sent. I will get back to you soon.',
          error: 'Something went wrong. Try again or message me on WhatsApp.',
        }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language: lang }),
      })

      if (!response.ok) throw new Error('Contact request failed')
      trackContactLead()
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '', company: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      className='viewport-section contact-section px-6 md:px-8 bg-surface-container-low'
      id='contact'
    >
      <div className='max-w-4xl mx-auto text-center'>
        <WordReveal
          text={t.cta.headline}
          className='text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight font-headline text-on-surface'
        />
        <p className='text-secondary text-sm md:text-lg mb-4 md:mb-6 font-light'>
          {t.cta.subline}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.625 }}
          className='bg-surface-container-lowest p-5 md:p-7 rounded-2xl shadow-2xl relative overflow-hidden border border-outline-variant/10'
        >
          <div className='absolute top-0 start-0 p-8 opacity-5'>
            <Globe className='w-32 h-32 text-primary' />
          </div>
          <h3 className='text-2xl md:text-3xl font-bold mb-2 font-headline text-on-surface'>
            {t.cta.cardTitle}
          </h3>
          <p className='text-secondary text-sm md:text-base mb-4 font-light'>
            {t.cta.cardSubline}
          </p>
          <form
            onSubmit={handleSubmit}
            data-state={
              status === 'sent' || status === 'error' || status === 'sending'
                ? status
                : Object.values(form).some(Boolean)
                  ? 'filled'
                  : 'blank'
            }
            className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-start'
          >
            <div className='absolute -start-[10000px]' aria-hidden='true'>
              <label htmlFor='company'>Company</label>
              <input
                id='company'
                name='company'
                value={form.company}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
                tabIndex={-1}
                autoComplete='off'
              />
            </div>
            <input
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              required
              placeholder={copy.name}
              aria-label={copy.name}
              className='w-full rounded-lg border border-outline-variant/30 bg-surface px-4 py-3 text-on-surface outline-none transition duration-[200ms] hover:border-primary/60 focus:border-primary'
            />
            <input
              type='email'
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              required
              placeholder={copy.email}
              aria-label={copy.email}
              className='w-full rounded-lg border border-outline-variant/30 bg-surface px-4 py-3 text-on-surface outline-none transition duration-[200ms] hover:border-primary/60 focus:border-primary'
            />
            <input
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
              placeholder={copy.phone}
              aria-label={copy.phone}
              className='w-full rounded-lg border border-outline-variant/30 bg-surface px-4 py-3 text-on-surface outline-none transition duration-[200ms] hover:border-primary/60 focus:border-primary md:col-span-2'
            />
            <textarea
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  message: event.target.value,
                }))
              }
              required
              placeholder={copy.message}
              rows={3}
              aria-label={copy.message}
              className='w-full rounded-lg border border-outline-variant/30 bg-surface px-4 py-3 text-on-surface outline-none transition duration-[200ms] hover:border-primary/60 focus:border-primary md:col-span-2 resize-none'
            />
            {status === 'sent' && (
              <p className='text-sm font-medium text-tertiary md:col-span-2'>
                {copy.success}
              </p>
            )}
            {status === 'error' && (
              <p className='text-sm font-medium text-primary md:col-span-2'>
                {copy.error}
              </p>
            )}
            <p className='text-xs text-secondary md:col-span-2 text-center'>
              {lang === 'he' ? 'בשליחת הטופס אני מאשר/ת את' : 'By submitting, I agree to the'}{' '}
              <a className='hover:text-primary underline' href='/privacy/'>
                {t.footer.privacy}
              </a>{' '}
              {lang === 'he' ? 'ואת' : 'and'}{' '}
              <a className='hover:text-primary underline' href='/terms/'>
                {t.footer.terms}
              </a>
              .
            </p>
            <div className='flex flex-col md:flex-row gap-4 justify-center md:col-span-2'>
              <button
                type='submit'
                disabled={status === 'sending'}
                className='bg-primary-gradient text-white w-full md:w-auto px-5 md:px-8 py-3.5 rounded-lg font-headline font-bold text-base md:text-lg whitespace-nowrap shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 transition-all duration-[200ms] active:scale-95 text-center disabled:opacity-70 disabled:hover:translate-y-0'
              >
                {status === 'sending' ? (
                  <span className='inline-flex items-center gap-3'>
                    <span className='h-2.5 w-24 rounded-full bg-white/35 animate-pulse [animation-duration:2.5s]' />
                    <span className='sr-only'>
                      {lang === 'he' ? 'שולח...' : 'Sending...'}
                    </span>
                  </span>
                ) : (
                  t.cta.primary
                )}
              </button>
              <a
                href={getWhatsAppUrl(lang)}
                target='_blank'
                rel='noreferrer'
                className='bg-surface-container text-primary w-full md:w-auto px-5 md:px-8 py-3.5 rounded-lg font-headline font-bold text-base md:text-lg whitespace-nowrap flex items-center justify-center gap-3 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-md transition-all duration-[200ms] active:scale-95 border border-primary/10'
              >
                <MessageSquare className='w-6 h-6 fill-current' />
                {t.cta.secondary}
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

type FooterProps = {
  homeHashPrefix?: string
}

export function Footer({ homeHashPrefix = '' }: FooterProps) {
  const { t, lang } = useLanguage()
  return (
    <footer className='w-full py-8 px-6 md:px-8 bg-surface-container-high border-t border-outline-variant/10'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='col-span-1 md:col-span-2'>
          <div className='text-xl font-bold font-headline text-on-surface mb-2'>
            {t.nav.brand}
          </div>
          <p className='text-primary font-headline font-bold tracking-wide mb-2'>
            {t.hero.eyebrow}
          </p>
          <p className='text-sm text-secondary max-w-xs mb-4 leading-relaxed'>
            {t.footer.desc}
          </p>
          <div className='flex flex-col gap-2 text-sm'>
            <a
              href={`mailto:${contact.email}`}
              className='text-primary hover:underline underline-offset-4 transition-all duration-[200ms] font-medium inline-flex items-center gap-2'
            >
              <Mail className='w-4 h-4' />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phoneE164}`}
              className='text-primary hover:underline underline-offset-4 transition-all duration-[200ms] font-medium inline-flex items-center gap-2'
            >
              <Phone className='w-4 h-4' />
              <span dir='ltr'>{contact.phoneDisplay}</span>
            </a>
            <a
              href={getWhatsAppUrl(lang)}
              target='_blank'
              rel='noreferrer'
              className='text-primary hover:underline underline-offset-4 transition-all duration-[200ms] font-medium inline-flex items-center gap-2'
            >
              <MessageSquare className='w-4 h-4 fill-current' />
              WhatsApp
            </a>
          </div>
        </div>
        <div>
          <p className='font-headline font-bold text-xs uppercase tracking-widest text-on-surface mb-3'>
            {t.footer.explore}
          </p>
          <ul className='space-y-2 text-sm'>
            {[
              { label: t.nav.solve, href: `${homeHashPrefix}#services` },
              { label: t.nav.work, href: `${homeHashPrefix}#portfolio` },
              { label: t.nav.process, href: `${homeHashPrefix}#process` },
              { label: t.nav.success, href: `${homeHashPrefix}#testimonials` },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className='text-secondary hover:text-primary transition-all duration-[200ms]'
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className='font-headline font-bold text-xs uppercase tracking-widest text-on-surface mb-3'>
            {t.footer.legal}
          </p>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='/privacy/'
                className='text-secondary hover:text-primary transition-all duration-[200ms]'
              >
                {t.footer.privacy}
              </a>
            </li>
            <li>
              <a
                href='/terms/'
                className='text-secondary hover:text-primary transition-all duration-[200ms]'
              >
                {t.footer.terms}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='max-w-7xl mx-auto mt-8 pt-5 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-3'>
        <p className='text-xs text-secondary'>
          © {new Date().getFullYear()} {t.nav.brand}. {t.footer.rights}
        </p>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <a
            href={`${homeHashPrefix}#services`}
            className='footer-trust-link'
          >
            <Globe className='w-4 h-4' />
            <span>{t.nav.solve}</span>
          </a>
          <a href='/privacy/' className='footer-trust-link'>
            <Shield className='w-4 h-4' />
            <span>{t.footer.privacy}</span>
          </a>
          <a href='/terms/' className='footer-trust-link'>
            <Verified className='w-4 h-4' />
            <span>{t.footer.terms}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
