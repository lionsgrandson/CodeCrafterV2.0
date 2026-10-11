import { ContactForm } from './ContactForm'

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
import { contact, getWhatsAppUrl } from '../lib/contact'
import { localizePath, serviceLabels, serviceSlugs } from '../lib/seoRoutes'
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
              <li
                key={idx}
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
              </li>
            ))}
          </ul>
        </div>
        <div className='relative flex justify-center'>
          <div
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
          </div>
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() { return <ContactForm /> }

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
              { label: t.nav.work, href: localizePath('portfolio', lang) },
              { label: lang === 'he' ? 'אודות משה ו CodeCrafter' : 'About Moshe and CodeCrafter', href: localizePath('about', lang) },
              { label: t.nav.process, href: `${homeHashPrefix}#process` },
              { label: lang === 'he' ? 'מחירון' : 'Pricing', href: localizePath('pricing', lang) },
              { label: lang === 'he' ? 'אזורי שירות' : 'Service areas', href: localizePath('locations', lang) },
              ...serviceSlugs.map((slug) => ({ label: serviceLabels[lang][slug], href: localizePath(slug, lang) })),
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
