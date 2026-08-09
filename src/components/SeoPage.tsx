import { ArrowLeft, ArrowRight, ExternalLink, MessageSquare } from 'lucide-react'
import { useLanguage } from '../App'
import { getWhatsAppUrl } from '../lib/contact'
import { localizePath, serviceLabels } from '../lib/seoRoutes'
import type { SeoPage as SeoPageData } from '../lib/seoPages'

const projectLabels: Record<string, string> = {
  sumsup: 'SumsUp',
  coderecovery: 'CodeRecovery',
  'yuval-kadosh': 'יובל קדוש',
  'creative-intelligence': 'Creative Intelligence',
}

type SeoPageProps = {
  page: SeoPageData
}

export function SeoPage({ page }: SeoPageProps) {
  const { lang } = useLanguage()
  const Arrow = lang === 'he' ? ArrowLeft : ArrowRight
  const servicesPath = localizePath('', lang) + '#services'
  const portfolioPath = localizePath('portfolio', lang)

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
