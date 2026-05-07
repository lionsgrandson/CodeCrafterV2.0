import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Navbar, Hero } from './components/Hero';
import { Services, Process } from './components/Services';
import { Portfolio, Testimonials } from './components/Portfolio';
import { WhyWorkWithMe, FinalCTA, Footer } from './components/Footer';
import { translations } from './lib/translations';

type Language = 'he' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 end-8 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-container transition-colors active:scale-90"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('he');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen bg-surface">
        <ScrollToTop />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Process />
          <Portfolio />
          <Testimonials />
          <WhyWorkWithMe />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
