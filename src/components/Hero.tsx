import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, MessageSquare, Languages, X } from 'lucide-react'
import { useLanguage } from '../App'
import { getWhatsAppUrl } from '../lib/contact'

type NavbarProps = {
  homeHashPrefix?: string
}

export function Navbar({ homeHashPrefix = '' }: NavbarProps) {
  const { t, lang, setLang } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = [
    { label: t.nav.solve, href: `${homeHashPrefix}#services` },
    { label: t.nav.work, href: `${homeHashPrefix}#portfolio` },
    { label: t.nav.process, href: `${homeHashPrefix}#process` },
    { label: t.nav.success, href: `${homeHashPrefix}#testimonials` },
  ]

  const toggleLanguage = () => {
    setLang(lang === 'he' ? 'en' : 'he')
    setIsMenuOpen(false)
  }

  return (
    <nav className='fixed top-0 w-full z-50 glass-nav shadow-sm border-b border-outline-variant/10'>
      <div className='flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto'>
        <div className='text-2xl font-bold font-headline text-on-surface tracking-tight'>
          <a href='/' alt='link home'>
            {t.nav.brand}
            <span className='text-primary font-headline font-bold tracking-widest uppercase text-xs mb-4 block underline-offset-4 decoration-primary/30 underline'>
              {t.hero.eyebrow}
            </span>
          </a>
        </div>
        <div className='hidden md:flex space-x-8 rtl:space-x-reverse items-center'>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='font-headline tracking-tight text-sm uppercase font-semibold text-secondary hover:text-primary transition-colors duration-300'
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={toggleLanguage}
            className='flex items-center gap-2 text-secondary hover:text-primary transition-colors font-headline text-sm font-semibold border-x border-outline-variant/20 px-4'
          >
            <Languages className='w-4 h-4' />
            <span>{lang === 'he' ? 'EN' : 'HE'}</span>
          </button>

          <a
            href={`${homeHashPrefix}#contact`}
            className='bg-primary-gradient text-white px-6 py-2 rounded-lg font-headline text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20'
          >
            {t.nav.cta}
          </a>
        </div>
        <div className='flex items-center gap-2 md:hidden'>
          <button
            onClick={toggleLanguage}
            className='p-2 text-on-surface'
            aria-label='Change language'
          >
            <Languages className='w-5 h-5' />
          </button>
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className='text-on-surface p-2'
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
            transition={{ duration: 0.18 }}
            className='md:hidden border-t border-outline-variant/10 bg-surface/95 backdrop-blur-[20px] shadow-lg'
          >
            <div className='px-6 py-4 flex flex-col gap-1'>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className='font-headline text-base font-semibold text-on-surface py-3 border-b border-outline-variant/10 last:border-b-0'
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`${homeHashPrefix}#contact`}
                onClick={() => setIsMenuOpen(false)}
                className='mt-3 bg-primary-gradient text-white px-6 py-3 rounded-lg font-headline text-sm font-semibold text-center shadow-lg shadow-primary/20'
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
  const { t } = useLanguage()

  return (
    <header className='relative pt-32 pb-24 px-6 md:px-8 overflow-hidden bg-surface'>
      {/* Background Animation */}
      <div className='absolute inset-0 z-0 pointer-events-none opacity-20'>
        <div className='absolute top-0 left-0 w-full h-full'>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute bg-primary/20 rounded-full blur-3xl'
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 20 + i * 5,
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

      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10'>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='z-10'
        >
          <h1 className='text-5xl md:text-7xl text-editorial-hero mb-6 text-on-surface'>
            {t.hero.headline}
          </h1>
          <p className='text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light'>
            {t.hero.subline}
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <a
              href='#contact'
              className='bg-primary-gradient text-white px-8 py-5 rounded-lg font-headline font-bold text-lg shadow-xl hover:shadow-primary/30 transition-all active:scale-95 text-center'
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href={getWhatsAppUrl()}
              target='_blank'
              rel='noreferrer'
              className='bg-surface-container-low text-primary px-8 py-5 rounded-lg font-headline font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all active:scale-95 border border-primary/10'
            >
              <MessageSquare className='w-5 h-5 fill-current' />
              {t.hero.ctaSecondary}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='relative group hidden md:block'
        >
          <div className='absolute -inset-4 bg-primary/5 rounded-xl rotate-3 transition-transform group-hover:rotate-1'></div>
          <div className='relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl border border-outline-variant/10'>
            <img
              className='w-full h-full object-cover'
              src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
              alt={t.hero.alt}
              loading='eager'
              referrerPolicy='no-referrer'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
