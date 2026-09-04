import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Languages, Menu, MessageSquare, X } from 'lucide-react'
import { useLanguage } from '../App'
import { getWhatsAppUrl } from '../lib/contact'
import { localizePath } from '../lib/seoRoutes'
import { WordReveal } from './WordReveal'

type NavbarProps = {
  homeHashPrefix?: string
}

export function Navbar({ homeHashPrefix = '' }: NavbarProps) {
  const { t, lang, setLang } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = [
    { label: t.nav.solve, href: `${homeHashPrefix}#services` },
    { label: t.nav.work, href: localizePath('portfolio', lang) },
    { label: lang === 'he' ? 'מחירים' : 'Pricing', href: localizePath('pricing', lang) },
    { label: lang === 'he' ? 'אזורי שירות' : 'Areas', href: localizePath('locations', lang) },
    { label: t.nav.process, href: `${homeHashPrefix}#process` },
    { label: lang === 'he' ? 'אודות' : 'About', href: localizePath('about', lang) },
  ]

  const toggleLanguage = () => {
    setLang(lang === 'he' ? 'en' : 'he')
    setIsMenuOpen(false)
  }

  return (
    <nav className='fixed top-0 w-full z-50 glass-nav shadow-sm border-b border-outline-variant/10'>
      <div className='flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto'>
        <div className='text-2xl font-bold font-headline text-on-surface tracking-tight'>
          <a
            href={localizePath('', lang)}
            aria-label={`${t.nav.brand} ${t.hero.eyebrow}`}
            className='block transition-opacity duration-[200ms] hover:opacity-75'
          >
            {t.nav.brand}
            <span className='text-primary font-headline font-bold tracking-widest uppercase text-xs mb-4 block underline-offset-4 decoration-primary/30 underline'>
              {t.hero.eyebrow}
            </span>
          </a>
        </div>
        <div className='hidden md:flex space-x-5 rtl:space-x-reverse items-center'>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='font-headline tracking-tight text-xs lg:text-sm uppercase font-semibold text-secondary hover:text-primary transition-colors duration-[375ms] whitespace-nowrap'
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={toggleLanguage}
            className='interactive-link flex items-center gap-2 text-secondary font-headline text-sm font-semibold border-x border-outline-variant/20 px-3'
            aria-label={lang === 'he' ? 'Switch to English' : 'מעבר לעברית'}
          >
            <Languages className='w-4 h-4' />
            <span>{lang === 'he' ? 'EN' : 'HE'}</span>
          </button>

          <a
            href={`${homeHashPrefix}#contact`}
            className='button-primary px-5 py-2 text-sm whitespace-nowrap'
          >
            {t.nav.cta}
          </a>
        </div>
        <div className='flex items-center gap-2 md:hidden'>
          <button
            onClick={toggleLanguage}
            className='icon-button'
            aria-label={lang === 'he' ? 'Switch to English' : 'מעבר לעברית'}
          >
            <Languages className='w-5 h-5' />
          </button>
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className='icon-button'
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id='mobile-menu'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.225 }}
            className='md:hidden border-t border-outline-variant/10 bg-surface/95 backdrop-blur-[20px] shadow-lg'
          >
            <div className='px-6 py-4 flex flex-col gap-1'>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className='interactive-link font-headline text-base font-semibold text-on-surface py-3 border-b border-outline-variant/10 last:border-b-0'
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`${homeHashPrefix}#contact`}
                onClick={() => setIsMenuOpen(false)}
                className='button-primary mt-3 px-6 py-3 text-sm text-center'
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export function Hero() {
  const { t, lang } = useLanguage()
  const seoHeadline = lang === 'he'
    ? 'פיתוח תוכנה, מערכות ואתרים בהתאמה אישית לעסקים'
    : 'Web Development Company in Israel for Websites, Systems and Automation'

  return (
    <header className='viewport-section hero-section relative px-6 md:px-8 overflow-hidden bg-surface'>
      <div className='absolute inset-0 z-0 pointer-events-none opacity-20'>
        <div className='absolute top-0 left-0 w-full h-full'>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute bg-primary/20 rounded-full blur-3xl'
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 25 + i * 6.25,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${(i * 30) % 100}%`,
                top: `${(i * 20) % 100}%`,
              }}
            />
          ))}
          <svg className='absolute inset-0 w-full h-full opacity-10'>
            <pattern
              id='grid'
              width='40'
              height='40'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 40 0 L 0 0 0 40'
                fill='none'
                stroke='currentColor'
                strokeWidth='0.5'
              />
            </pattern>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10'>
        <div className='z-10'>
          <WordReveal
            as='h1'
            text={seoHeadline}
            className='text-5xl md:text-7xl text-editorial-hero mb-6'
          />
          <p className='subtitle-accent text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed'>
            {t.hero.subline}
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <a
              href='#contact'
              data-analytics='cta_click'
              data-placement='hero_primary'
              className='button-primary w-full md:w-auto px-6 md:px-8 py-4 md:py-5 text-base md:text-lg text-center'
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href={getWhatsAppUrl(lang)}
              target='_blank'
              rel='noreferrer'
              data-placement='hero_whatsapp'
              className='button-secondary w-full md:w-auto px-6 md:px-8 py-4 md:py-5 text-base md:text-lg'
            >
              <MessageSquare className='w-5 h-5 fill-current' />
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div
          className='relative mt-4 md:mt-0'
          aria-label={lang === 'he' ? 'משה שוורצברג' : 'Moshe Schwartzberg'}
        >
          <div className='hero-photo-frame'>
            <img
              src='/moshe-prague-768.webp'
              srcSet='/moshe-prague-480.webp 480w, /moshe-prague-768.webp 768w, /moshe-prague-1052.webp 1052w'
              sizes='(max-width: 767px) calc(100vw - 48px), 50vw'
              alt={
                lang === 'he'
                  ? 'משה שוורצברג ברחוב עירוני בפראג'
                  : 'Moshe Schwartzberg on a city street in Prague'
              }
              className='hero-photo'
              width='1052'
              height='945'
              fetchPriority='high'
              decoding='async'
            />
            <span className='hero-photo-accent hero-photo-accent-top' aria-hidden='true' />
            <span className='hero-photo-accent hero-photo-accent-bottom' aria-hidden='true' />
          </div>
        </div>
      </div>
    </header>
  )
}
