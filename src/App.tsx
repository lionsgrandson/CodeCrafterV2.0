import { createContext, useContext, useState, useEffect } from 'react'

import { ArrowUp } from 'lucide-react'
import { Navbar, Hero } from './components/Hero'
import { Services, Process } from './components/Services'
import { Portfolio, Testimonials } from './components/Portfolio'
import { WhyWorkWithMe, FinalCTA, Footer } from './components/Footer'
import { SeoPage } from './components/SeoPage'
import { translations } from './lib/translations'
import { localizePath, type Language } from './lib/seoRoutes'
import type { SeoPage as SeoPageData } from './lib/seoPages'
import { AnalyticsConsent } from './components/AnalyticsConsent'

import { trackEvent } from './lib/analytics'
import FloatingWA from './components/floatingWA'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context)
    throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

function ScrollToTop() {
  const { lang } = useLanguage()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          className='fixed bottom-28 end-8 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-container hover:-translate-y-1 transition-all duration-[250ms] active:scale-90'
          aria-label={lang === 'he' ? 'חזרה לראש הדף' : 'Scroll to top'}
        >
          <ArrowUp className='w-6 h-6' />
        </button>
      )}
    </>
  )
}

type AppProps = {
  pathname?: string
  seoPage?: SeoPageData
}

export default function App({ pathname, seoPage }: AppProps) {
  const currentPath =
    pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const normalizedPath = currentPath.replace(/\/+$/, '') || '/'
  const initialLanguage: Language = normalizedPath === '/en' || normalizedPath.startsWith('/en/') ? 'en' : 'he'
  const [lang, setLanguageState] = useState<Language>(initialLanguage)
  const localizedPath = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/'
  const isHomePage = localizedPath === '/'
  const isPortfolioPage = localizedPath === '/portfolio'
  const homeHashPrefix = isHomePage ? '' : localizePath('', lang)

  const setLang = (nextLanguage: Language) => {
    if (nextLanguage === lang) return

    if (typeof window === 'undefined') {
      setLanguageState(nextLanguage)
      return
    }

    const routeWithoutLanguage = window.location.pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    trackEvent('language_switch')
    const nextPath = localizePath(routeWithoutLanguage, nextLanguage)
    window.location.assign(`${nextPath}${window.location.hash}`)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  const value = {
    lang,
    setLang,
    t: translations[lang],
  }

  return (
    <LanguageContext.Provider value={value}>
      <div className='min-h-screen bg-surface'>
        <a href='#main-content' className='skip-link'>{lang === 'he' ? 'דילוג לתוכן' : 'Skip to content'}</a>
        <ScrollToTop />
        <Navbar homeHashPrefix={homeHashPrefix} contactHref={seoPage ? '#contact-page' : undefined} />
        <main id='main-content'>
          {seoPage ? (
            <SeoPage page={seoPage} />
          ) : isPortfolioPage ? (
            <Portfolio showAll standalone />
          ) : (
            <>
              <Hero />
              <Services />
              <Process />
              <Portfolio />
              <Testimonials />
              <WhyWorkWithMe />
              <FinalCTA />
            </>
          )}
        </main>
        <FloatingWA />
        <Footer homeHashPrefix={homeHashPrefix} />
        <AnalyticsConsent />
      </div>
    </LanguageContext.Provider>
  )
}
