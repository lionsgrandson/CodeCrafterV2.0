import { ExternalLink, MapPin, MessageSquare } from 'lucide-react'
import { useLanguage } from '../App'
import { getWhatsAppUrl } from '../lib/contact'
import { localizePath } from '../lib/seoRoutes'
import { locationLinks } from '../lib/seoFactsPages'

const authorityLinks = [
  { label: 'LinkedIn', href: 'https://il.linkedin.com/in/codecrafteril' },
  { label: 'CodeCrafter LinkedIn', href: 'https://il.linkedin.com/company/codecrafterisrael' },
  { label: 'CodeCrafter Instagram', href: 'https://www.instagram.com/codecrafter_site/' },
  { label: 'Moshe Instagram', href: 'https://www.instagram.com/moshe_blackberg/' },
  { label: 'CodeCrafter Facebook', href: 'https://www.facebook.com/profile.php?id=61591518676016' },
  { label: 'Moshe Facebook', href: 'https://www.facebook.com/moshe.schwartzberg.92' },
  { label: 'Google Business reviews', href: 'https://share.google/3pvnxMoRbHllkET9G' },
]

export function TrustCoverageSeo() {
  const { lang } = useLanguage()
  const copy = lang === 'he'
    ? {
        kicker: 'עובדות, אזורי שירות וקישורים חיצוניים',
        title: 'מי עומד מאחורי CodeCrafter ואיפה אפשר לעבוד יחד',
        intro: 'CodeCrafter Moshe Schwartzberg הוא עסק שירות שמופעל על ידי משה שוורצברג. הנתונים כאן מבוססים על מידע עסקי שנמסר ואינם הערכות SEO.',
        factsHeading: 'עובדות שניתן להציג בבירור',
        facts: [
          ['2018', 'שנת התחלה'],
          ['12+', 'לקוחות מרוצים'],
          ['ישראל, בריטניה וארה״ב', 'מדינות שבהן היו לקוחות'],
          ['8 שעות', 'שיא אישי לבניית דף נחיתה, לא זמן אספקה מובטח'],
        ],
        locationsHeading: 'אזורי שירות בישראל',
        locationsIntro: 'CodeCrafter פועלת כעסק נותן שירות. אין כאן כתובות משרד מומצאות. בכל אזור מפורט אם העבודה היא פנים אל פנים, מרחוק או בשילוב.',
        pricing: 'מחירון שירותים 2026',
        authorityHeading: 'פרופילים וביקורות מחוץ לאתר',
        authorityIntro: 'קישורים חיצוניים עוזרים ללקוחות ולמנועי חיפוש לחבר בין האתר, משה ו CodeCrafter כישות אמיתית מחוץ לדומיין.',
        cta: 'דברו איתי על הפרויקט',
      }
    : {
        kicker: 'Facts, service areas, and external profiles',
        title: 'Who is behind CodeCrafter and where we can work together',
        intro: 'CodeCrafter Moshe Schwartzberg is a service business operated by Moshe Schwartzberg. The facts below come from supplied business information rather than SEO estimates.',
        factsHeading: 'Verified business facts',
        facts: [
          ['2018', 'Started'],
          ['12+', 'Happy clients'],
          ['Israel, UK, and US', 'Countries with clients'],
          ['8 hours', 'Personal record for a landing page, not a guaranteed delivery time'],
        ],
        locationsHeading: 'Service areas in Israel',
        locationsIntro: 'CodeCrafter operates as a service area business. No office addresses are invented. Each local page states whether delivery is in person, remote, or both.',
        pricing: '2026 service pricing',
        authorityHeading: 'Profiles and reviews outside this website',
        authorityIntro: 'External profiles help customers and search engines connect this website, Moshe, and CodeCrafter to a real entity beyond this domain.',
        cta: 'Discuss your project',
      }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': 'https://mosheschwartzberg.com/#organization',
        name: 'CodeCrafter Moshe Schwartzberg',
        url: 'https://mosheschwartzberg.com/',
        telephone: '+972587076077',
        email: 'moshe@mosheschwartzberg.com',
        foundingDate: '2018',
        founder: { '@id': 'https://mosheschwartzberg.com/#moshe-schwartzberg' },
        sameAs: authorityLinks.map((item) => item.href),
      },
      {
        '@type': 'Person',
        '@id': 'https://mosheschwartzberg.com/#moshe-schwartzberg',
        name: 'Moshe Schwartzberg',
        alternateName: 'משה שוורצברג',
        url: `https://mosheschwartzberg.com${localizePath('about', lang)}`,
        worksFor: { '@id': 'https://mosheschwartzberg.com/#organization' },
        sameAs: authorityLinks.filter((item) => !item.label.startsWith('CodeCrafter') && item.label !== 'Google Business reviews').map((item) => item.href),
      },
    ],
  }

  return (
    <section className='section-shell bg-surface' aria-labelledby='trust-coverage-heading'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className='max-w-7xl mx-auto'>
        <header className='max-w-4xl mx-auto text-center mb-10'>
          <span className='section-kicker'>{copy.kicker}</span>
          <h2 id='trust-coverage-heading' className='text-3xl md:text-5xl font-bold mt-4 mb-4 font-headline text-on-surface'>{copy.title}</h2>
          <p className='text-secondary text-base md:text-lg leading-relaxed'>{copy.intro}</p>
        </header>

        <div className='grid lg:grid-cols-2 gap-6 mb-8'>
          <section className='rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6'>
            <h3 className='text-2xl font-bold font-headline mb-5'>{copy.factsHeading}</h3>
            <dl className='grid sm:grid-cols-2 gap-4'>
              {copy.facts.map(([value, label]) => (
                <div key={label} className='rounded-xl bg-surface p-4 border border-outline-variant/10'>
                  <dt className='text-sm text-secondary leading-relaxed'>{label}</dt>
                  <dd className='text-xl font-bold text-primary mt-1'>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className='rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6'>
            <h3 className='text-2xl font-bold font-headline mb-3'>{copy.locationsHeading}</h3>
            <p className='text-secondary leading-relaxed mb-5'>{copy.locationsIntro}</p>
            <div className='grid gap-3'>
              {locationLinks[lang].map((location) => (
                <a key={location.slug} href={localizePath(location.slug, lang)} className='flex items-center justify-between gap-4 rounded-xl bg-surface p-4 border border-outline-variant/10 hover:border-primary/40 transition-colors'>
                  <span className='flex items-center gap-3 min-w-0'>
                    <MapPin className='w-5 h-5 text-primary shrink-0' aria-hidden='true' />
                    <span>
                      <strong className='block'>{location.label}</strong>
                      <span className='text-sm text-secondary'>{location.mode}</span>
                    </span>
                  </span>
                  <ExternalLink className='w-4 h-4 text-primary shrink-0' aria-hidden='true' />
                </a>
              ))}
            </div>
          </section>
        </div>

        <section className='rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 mb-8'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>
            <div>
              <h3 className='text-2xl font-bold font-headline mb-2'>{copy.authorityHeading}</h3>
              <p className='text-secondary leading-relaxed max-w-3xl'>{copy.authorityIntro}</p>
            </div>
            <a href={localizePath('pricing', lang)} className='button-secondary px-6 py-3 whitespace-nowrap'>{copy.pricing}</a>
          </div>
          <div className='flex flex-wrap gap-3 mt-5'>
            {authorityLinks.map((link) => (
              <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface px-4 py-2 text-sm font-medium hover:border-primary/50 transition-colors'>
                {link.label}<ExternalLink className='w-3.5 h-3.5' aria-hidden='true' />
              </a>
            ))}
          </div>
        </section>

        <div className='text-center'>
          <a className='button-primary inline-flex items-center gap-2 px-7 py-4' href={getWhatsAppUrl(lang)} target='_blank' rel='noreferrer'>
            <MessageSquare className='w-5 h-5' aria-hidden='true' />
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
