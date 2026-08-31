import { ArrowLeft, ArrowRight, ExternalLink, MapPin, MessageSquare } from 'lucide-react'
import { useLanguage } from '../App'
import { getWhatsAppUrl } from '../lib/contact'
import { localizePath, serviceLabels } from '../lib/seoRoutes'
import { locationLinks, pricingRows } from '../lib/seoFactsPages'
import type { SeoPage as SeoPageData } from '../lib/seoPages'

const projectLabels: Record<string, string> = {
  sumsup: 'SumsUp',
  coderecovery: 'CodeRecovery',
  'yuval-kadosh': 'יובל קדוש',
  'creative-intelligence': 'Creative Intelligence',
}

const profileLinks = [
  { label: 'LinkedIn', href: 'https://il.linkedin.com/in/codecrafteril' },
  { label: 'Instagram', href: 'https://www.instagram.com/moshe_blackberg/' },
  { label: 'Facebook', href: 'https://www.facebook.com/moshe.schwartzberg.92' },
  { label: 'Google Business', href: 'https://share.google/3pvnxMoRbHllkET9G' },
]

type SeoPageProps = {
  page: SeoPageData
}

export function SeoPage({ page }: SeoPageProps) {
  const { lang } = useLanguage()
  const Arrow = lang === 'he' ? ArrowLeft : ArrowRight
  const servicesPath = localizePath('', lang) + '#services'
  const portfolioPath = localizePath('portfolio', lang)
  const isPricingPage = page.slug === 'pricing'
  const isLocationPage = page.slug.startsWith('locations/')

  return (
    <article className='seo-page pt-28 pb-24 px-6 md:px-8'>
      <div className='max-w-5xl mx-auto'>
        <nav className='breadcrumbs' aria-label={lang === 'he' ? 'פירורי לחם' : 'Breadcrumbs'}>
          <ol>
            <li><a href={localizePath('', lang)}>{lang === 'he' ? 'בית' : 'Home'}</a></li>
            <li aria-hidden='true'>/</li>
            {page.kind === 'service' ? (
              <li><a href={servicesPath}>{lang === 'he' ? 'שירותים' : 'Services'}</a></li>
            ) : page.kind === 'case-study' ? (
              <li><a href={portfolioPath}>{lang === 'he' ? 'תיק עבודות' : 'Portfolio'}</a></li>
            ) : null}
            {page.kind !== 'about' && <li aria-hidden='true'>/</li>}
            <li aria-current='page'>{page.h1}</li>
          </ol>
        </nav>

        <header className='seo-page-hero'>
          <div className='min-w-0'>
            <span className='section-kicker'>{page.eyebrow}</span>
            <h1>{page.h1}</h1>
            {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className='seo-page-actions'>
              <a className='button-primary px-7 py-4' href='#contact-page'>
                {lang === 'he' ? 'בואו נדבר על הפרויקט' : 'Discuss your project'}
              </a>
              <a className='button-secondary px-7 py-4' href={getWhatsAppUrl(lang)} target='_blank' rel='noreferrer'>
                <MessageSquare className='w-5 h-5' aria-hidden='true' />
                WhatsApp
              </a>
            </div>
          </div>
          {page.image && (
            <figure className={`seo-page-image seo-page-image-${page.image.kind ?? 'logo'}`}>
              <img
                src={page.image.src}
                alt={page.image.alt}
                width='800'
                height='600'
                loading='eager'
                decoding='async'
              />
            </figure>
          )}
        </header>

        <div className='seo-page-sections'>
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        {page.kind === 'about' && (
          <section className='seo-faq' aria-labelledby='verified-profile-heading'>
            <span className='section-kicker'>{lang === 'he' ? 'פרופיל מאומת' : 'Verified profile'}</span>
            <h2 id='verified-profile-heading'>{lang === 'he' ? 'עובדות על משה ו CodeCrafter' : 'Facts about Moshe and CodeCrafter'}</h2>
            <ul>
              <li>{lang === 'he' ? 'השם העסקי הציבורי: CodeCrafter Moshe Schwartzberg.' : 'Public business name: CodeCrafter Moshe Schwartzberg.'}</li>
              <li>{lang === 'he' ? 'משה התחיל בתחום בשנת 2018 והוא המייסד והמפתח הראשי.' : 'Moshe started in 2018 and is the founder and lead developer.'}</li>
              <li>{lang === 'he' ? 'ל CodeCrafter יש מעל 12 לקוחות מרוצים.' : 'CodeCrafter has more than 12 happy clients.'}</li>
              <li>{lang === 'he' ? 'היו לקוחות בישראל, בבריטניה ובארצות הברית.' : 'Client history includes Israel, the United Kingdom, and the United States.'}</li>
              <li>{lang === 'he' ? 'השיא האישי לבניית דף נחיתה הוא 8 שעות. זהו שיא אישי ולא זמן אספקה מובטח.' : 'The personal record for building a landing page is 8 hours. This is a record, not a guaranteed delivery time.'}</li>
              <li>{lang === 'he' ? 'טלפון עסקי: 0587076077.' : 'Business phone: 0587076077.'}</li>
            </ul>
            <div className='flex flex-wrap gap-3 mt-5'>
              {profileLinks.map((link) => (
                <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full border border-outline-variant/20 px-4 py-2 text-sm font-medium hover:border-primary/50 transition-colors'>
                  {link.label}<ExternalLink className='w-3.5 h-3.5' aria-hidden='true' />
                </a>
              ))}
            </div>
          </section>
        )}

        {isPricingPage && (
          <section className='seo-faq' aria-labelledby='pricing-table-heading'>
            <span className='section-kicker'>{lang === 'he' ? 'מחירים בפועל' : 'Published prices'}</span>
            <h2 id='pricing-table-heading'>{lang === 'he' ? 'מחירון שירותים מלא' : 'Full service pricing guide'}</h2>
            <p>{lang === 'he' ? 'המחירים להלן נלקחו ממדריך השירותים והתמחור הנוכחי. מחיר שמסומן כמשוער עשוי להשתנות לאחר אפיון.' : 'The prices below come from the current services and pricing guide. A price marked as approximate may change after discovery.'}</p>
            <div className='overflow-x-auto mt-5'>
              <table className='w-full border-collapse text-start'>
                <thead>
                  <tr>
                    <th className='p-3 border-b border-outline-variant/30 text-start'>{lang === 'he' ? 'שירות' : 'Service'}</th>
                    <th className='p-3 border-b border-outline-variant/30 text-start'>{lang === 'he' ? 'מחיר' : 'Price'}</th>
                    <th className='p-3 border-b border-outline-variant/30 text-start'>{lang === 'he' ? 'הערה' : 'Note'}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows[lang].map((row) => (
                    <tr key={row.service}>
                      <th scope='row' className='p-3 border-b border-outline-variant/15 text-start font-semibold'>{row.service}</th>
                      <td className='p-3 border-b border-outline-variant/15'>{row.price}</td>
                      <td className='p-3 border-b border-outline-variant/15 text-secondary'>{row.note ?? (row.external ? (lang === 'he' ? 'ספק חיצוני' : 'External specialist') : '')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {page.faq && (
          <section className='seo-faq' aria-labelledby='faq-heading'>
            <span className='section-kicker'>FAQ</span>
            <h2 id='faq-heading'>{lang === 'he' ? 'שאלות נפוצות' : 'Frequently asked questions'}</h2>
            <div className='seo-faq-list'>
              {page.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {(page.relatedServices?.length || page.relatedProjects?.length || page.externalUrl) && (
          <aside className='seo-related' aria-label={lang === 'he' ? 'קישורים קשורים' : 'Related links'}>
            {page.relatedServices?.length ? (
              <div>
                <h2>{lang === 'he' ? 'שירותים קשורים' : 'Related services'}</h2>
                <div className='seo-link-grid'>
                  {page.relatedServices.map((slug) => (
                    <a key={slug} href={localizePath(slug, lang)}>
                      <span>{serviceLabels[lang][slug]}</span><Arrow className='w-4 h-4' aria-hidden='true' />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {page.relatedProjects?.length ? (
              <div>
                <h2>{lang === 'he' ? 'מקרי בוחן קשורים' : 'Related case studies'}</h2>
                <div className='seo-link-grid'>
                  {page.relatedProjects.map((slug) => (
                    <a key={slug} href={localizePath(`portfolio/${slug}`, lang)}>
                      <span>{projectLabels[slug] ?? slug}</span><Arrow className='w-4 h-4' aria-hidden='true' />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {page.externalUrl && (
              <a className='external-project-link' href={page.externalUrl} target='_blank' rel='noopener noreferrer'>
                {lang === 'he' ? 'צפייה באתר הפרויקט' : 'Visit the live project'}
                <ExternalLink className='w-4 h-4' aria-hidden='true' />
              </a>
            )}
          </aside>
        )}

        {page.kind === 'service' && (
          <aside className='seo-related' aria-label={lang === 'he' ? 'מחירון ואזורי שירות' : 'Pricing and service areas'}>
            <div>
              <h2>{lang === 'he' ? 'מחירון ואזורי שירות' : 'Pricing and service areas'}</h2>
              <div className='seo-link-grid'>
                {!isPricingPage && (
                  <a href={localizePath('pricing', lang)}>
                    <span>{lang === 'he' ? 'מחירון שירותים 2026' : '2026 service pricing'}</span><Arrow className='w-4 h-4' aria-hidden='true' />
                  </a>
                )}
                <a href={localizePath('locations', lang)}>
                  <span>{lang === 'he' ? 'כל אזורי השירות' : 'All service areas'}</span><Arrow className='w-4 h-4' aria-hidden='true' />
                </a>
                {locationLinks[lang].map((location) => (
                  <a key={location.slug} href={localizePath(location.slug, lang)} aria-current={isLocationPage && page.slug === location.slug ? 'page' : undefined}>
                    <span className='inline-flex items-center gap-2'><MapPin className='w-4 h-4' aria-hidden='true' />{location.label}</span><Arrow className='w-4 h-4' aria-hidden='true' />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        )}

        <section className='seo-contact-card' id='contact-page'>
          <h2>{lang === 'he' ? 'יש תהליך שאפשר לשפר?' : 'Have a workflow worth improving?'}</h2>
          <p>{lang === 'he' ? 'ספרו בקצרה מה העסק צריך. נבדוק יחד אם הפתרון הנכון הוא אתר, מערכת, אוטומציה, אפליקציה או שינוי ממוקד יותר.' : 'Share what the business needs. We can determine whether the right next step is a website, system, automation, app, or a smaller focused change.'}</p>
          <div className='seo-page-actions'>
            <a className='button-primary px-7 py-4' href='mailto:moshe@mosheschwartzberg.com'>moshe@mosheschwartzberg.com</a>
            <a className='button-secondary px-7 py-4' href={getWhatsAppUrl(lang)} target='_blank' rel='noreferrer'>WhatsApp</a>
          </div>
        </section>
      </div>
    </article>
  )
}
