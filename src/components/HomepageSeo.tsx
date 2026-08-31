import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react'
import { useLanguage } from '../App'
import { getWhatsAppUrl } from '../lib/contact'
import { localizePath } from '../lib/seoRoutes'

const solutionLinks = {
  he: [
    { slug: 'websites', label: 'בניית אתרים לעסקים', text: 'כאשר צריך להציג שירותים, לבנות אמון ולייצר מסלול ברור מפעילות חיפוש או קמפיין אל יצירת קשר.' },
    { slug: 'custom-software', label: 'פיתוח מערכות לעסקים', text: 'כאשר העבודה מפוזרת בין גיליונות, הודעות וכלים שלא בנויים לתהליך האמיתי של העסק.' },
    { slug: 'crm-development', label: 'פיתוח CRM מותאם', text: 'כאשר לידים, לקוחות, משימות והיסטוריית טיפול צריכים להיות במקום אחד עם שלבים והרשאות ברורים.' },
    { slug: 'cms-development', label: 'פיתוח CMS מותאם', text: 'כאשר צוות צריך לנהל תוכן, קטלוגים או מידע מובנה בלי לערוך קוד בכל שינוי.' },
    { slug: 'automation', label: 'אוטומציה לעסקים', text: 'כאשר פעולות חוזרות גוזלות זמן, נופלות בין הכיסאות או תלויות בהעתקה ידנית.' },
    { slug: 'integrations', label: 'אינטגרציות בין מערכות', text: 'כאשר אותו מידע צריך לעבור באופן אמין בין טפסים, CRM, דוא״ל, יומן ושירותים נוספים.' },
    { slug: 'app-development', label: 'פיתוח אפליקציות לעסקים', text: 'כאשר משתמשים צריכים חוויה ייעודית בטלפון או גישה לפונקציה עסקית מעבר לאתר רגיל.' },
    { slug: 'business-bots', label: 'פיתוח בוטים לעסקים', text: 'כאשר אפשר לקצר מענה ראשוני, לאסוף פרטים, לנתב פניות או להפעיל תהליך דרך ממשק מורשה.' },
  ],
  en: [
    { slug: 'websites', label: 'Business website development', text: 'When the business needs to explain its services, establish trust, and give search or campaign traffic a clear path to contact.' },
    { slug: 'custom-software', label: 'Custom business software', text: 'When work is scattered across spreadsheets, messages, and tools that do not match the real process.' },
    { slug: 'crm-development', label: 'Custom CRM development', text: 'When leads, customers, tasks, and service history need one place with clear stages and permissions.' },
    { slug: 'cms-development', label: 'Custom CMS development', text: 'When a team needs to manage content, catalogs, or structured information without editing code for every change.' },
    { slug: 'automation', label: 'Business automation', text: 'When repeated actions consume time, get missed, or depend on manual copying.' },
    { slug: 'integrations', label: 'Systems integration', text: 'When the same information must move reliably between forms, CRM, email, calendars, and other services.' },
    { slug: 'app-development', label: 'Business app development', text: 'When users need a dedicated mobile experience or a business function that goes beyond a normal website.' },
    { slug: 'business-bots', label: 'Business bot development', text: 'When initial answers, intake, routing, or approved workflow actions can be made faster through an authorized platform interface.' },
  ],
}

const faqs = {
  he: [
    ['איך יודעים אם צריך אתר, מערכת או אוטומציה?', 'מתחילים מהבעיה העסקית ולא מהטכנולוגיה. אם הבעיה היא הצגה ושיווק, אתר יכול להספיק. אם המידע והתהליך עצמם מפוזרים, ייתכן שצריך מערכת. אם התהליך כבר ברור אבל חוזר על עצמו, אוטומציה או אינטגרציה עשויות להיות הצעד הנכון.'],
    ['אפשר להתחיל קטן ולהרחיב בהמשך?', 'כן. בפרויקטים רבים נכון להגדיר גרסה ראשונה שמכסה את הצורך המרכזי, לבדוק אותה בתהליך אמיתי ורק לאחר מכן להוסיף יכולות.'],
    ['האם אפשר לעבוד עם מערכות שכבר קיימות בעסק?', 'במקרים רבים כן. בודקים קודם אילו APIs, Webhooks, אפשרויות ייצוא והרשאות קיימים בפועל. לא מבטיחים חיבור לפני שהגישה נבדקה.'],
    ['מה נבדק לפני השקה?', 'לפי סוג הפרויקט נבדקים המסכים הרלוונטיים, מובייל ודסקטופ, טפסים, קישורים, הרשאות, מצבי שגיאה, נגישות בסיסית, ביצועים וחיבורי צד שלישי שנכללים בהיקף העבודה.'],
    ['האם CodeCrafter מבטיחה מקום ראשון בגוגל או תוצאה עסקית מסוימת?', 'לא. אפשר לבנות תשתית טכנית ותוכן ברורים, למדוד ביצועים ולשפר על בסיס נתונים, אבל אין הבטחה אמינה למיקום מסוים בגוגל, לכמות לידים או להכנסה מסוימת.'],
  ],
  en: [
    ['How do we know whether we need a website, system, or automation?', 'Start with the business problem rather than the technology. A presentation and marketing problem may need a website. Fragmented information and workflow may need a system. A clear but repetitive process may be a better fit for automation or integration.'],
    ['Can we start small and expand later?', 'Yes. Many projects are better served by a first version that covers the central need, is tested in the real workflow, and is expanded only when the next requirement is clear.'],
    ['Can CodeCrafter work with systems the business already uses?', 'Often yes. Available APIs, webhooks, exports, and permissions are checked first. A connection is not promised before access is verified.'],
    ['What is checked before launch?', 'Depending on the project, relevant screens, mobile and desktop behavior, forms, links, permissions, error states, basic accessibility, performance, and in scope third party connections are checked before release.'],
    ['Does CodeCrafter guarantee a number one Google position or a specific business result?', 'No. The site and product can be built with clear technical foundations, measured, and improved from real data, but a specific Google position, lead volume, or revenue outcome cannot be guaranteed credibly.'],
  ],
}

export function HomepageSeo() {
  const { lang } = useLanguage()
  const Arrow = lang === 'he' ? ArrowLeft : ArrowRight
  const copy = lang === 'he'
    ? {
        kicker: 'מדריך לבחירת פתרון',
        title: 'מה העסק באמת צריך לבנות?',
        intro: 'אתר, CRM, מערכת, אפליקציה ואוטומציה פותרים בעיות שונות. המטרה היא לבחור את הפתרון הקטן והברור ביותר שמטפל בצורך העסקי, ואז לחבר אותו נכון לשאר התהליך.',
        jumpLabel: 'קפיצה לנושאים בעמוד',
        choose: 'בחירת פתרון',
        faq: 'שאלות נפוצות',
        proof: 'איך בודקים התאמה ואמון',
        chooseHeading: 'איזה פתרון מתאים לאיזה צורך',
        learn: 'מידע נוסף',
        proofHeading: 'תהליך, הוכחות וגבולות ברורים',
        proofText: 'אפשר לבדוק את תיק העבודות, לקרוא מקרי בוחן, להכיר את האדם מאחורי CodeCrafter ולראות איך השירותים מתחברים. במקומות שבהם אין נתון מאומת, האתר לא מציג מספר או תוצאה כאילו הם עובדה.',
        portfolio: 'תיק עבודות ומקרי בוחן',
        about: 'אודות משה ו CodeCrafter',
        privacy: 'פרטיות ואופן טיפול במידע',
        faqHeading: 'שאלות שאנשים שואלים לפני שמתחילים',
        ctaTitle: 'יש תהליך שמבזבז זמן או אתר שלא עושה את העבודה?',
        ctaText: 'אפשר להתחיל מהבעיה עצמה. נבדוק מה כבר קיים, מה באמת חסר ומה הצעד ההגיוני הבא.',
        ctaPrimary: 'ספרו לי על הבעיה',
      }
    : {
        kicker: 'Solution guide',
        title: 'What does the business actually need to build?',
        intro: 'A website, CRM, system, app, and automation solve different problems. The goal is to choose the smallest clear solution that addresses the business need, then connect it properly to the rest of the workflow.',
        jumpLabel: 'Jump to topics on this page',
        choose: 'Choosing a solution',
        faq: 'Common questions',
        proof: 'Process and proof',
        chooseHeading: 'Which solution fits which need',
        learn: 'Learn more',
        proofHeading: 'Process, proof, and clear boundaries',
        proofText: 'You can review the portfolio, read factual case studies, meet the person behind CodeCrafter, and see how the services connect. Where a result or metric has not been verified, the site does not present it as fact.',
        portfolio: 'Portfolio and case studies',
        about: 'About Moshe and CodeCrafter',
        privacy: 'Privacy and data handling',
        faqHeading: 'Questions businesses ask before starting',
        ctaTitle: 'Have a workflow wasting time or a website that is not doing its job?',
        ctaText: 'Start with the problem itself. We can examine what already exists, what is actually missing, and the most sensible next step.',
        ctaPrimary: 'Tell me about the problem',
      }

  return (
    <section className='section-shell bg-surface-container-low' aria-labelledby='solution-guide-heading'>
      <div className='max-w-7xl mx-auto'>
        <header className='max-w-4xl mx-auto text-center mb-10'>
          <span className='section-kicker'>{copy.kicker}</span>
          <h2 id='solution-guide-heading' className='text-3xl md:text-5xl font-bold mt-4 mb-4 font-headline text-on-surface'>{copy.title}</h2>
          <p className='text-secondary text-base md:text-lg leading-relaxed'>{copy.intro}</p>
          <nav aria-label={copy.jumpLabel} className='mt-6 flex flex-wrap justify-center gap-3 text-sm'>
            <a className='button-secondary px-4 py-2' href='#choose-solution'>{copy.choose}</a>
            <a className='button-secondary px-4 py-2' href='#business-faq'>{copy.faq}</a>
            <a className='button-secondary px-4 py-2' href='#proof-and-process'>{copy.proof}</a>
          </nav>
        </header>

        <div id='choose-solution' className='scroll-mt-28'>
          <h3 className='text-2xl md:text-3xl font-bold mb-6 font-headline text-on-surface'>{copy.chooseHeading}</h3>
          <div className='grid md:grid-cols-2 gap-4'>
            {solutionLinks[lang].map((item) => (
              <article key={item.slug} className='rounded-2xl border border-outline-variant/20 bg-surface p-5'>
                <h4 className='text-lg font-bold text-on-surface mb-2'>{item.label}</h4>
                <p className='text-secondary leading-relaxed mb-4'>{item.text}</p>
                <a className='text-primary font-semibold inline-flex items-center gap-2' href={localizePath(item.slug, lang)}>
                  {copy.learn}<Arrow className='w-4 h-4' aria-hidden='true' />
                </a>
              </article>
            ))}
          </div>
        </div>

        <section id='proof-and-process' className='scroll-mt-28 mt-12 rounded-2xl bg-on-surface text-surface p-6 md:p-8'>
          <h3 className='text-2xl md:text-3xl font-bold mb-3 font-headline'>{copy.proofHeading}</h3>
          <p className='opacity-80 leading-relaxed max-w-4xl'>{copy.proofText}</p>
          <div className='mt-5 flex flex-wrap gap-3'>
            <a className='button-secondary px-4 py-2' href={localizePath('portfolio', lang)}>{copy.portfolio}</a>
            <a className='button-secondary px-4 py-2' href={localizePath('about', lang)}>{copy.about}</a>
            <a className='button-secondary px-4 py-2' href='/privacy/'>{copy.privacy}</a>
          </div>
        </section>

        <section id='business-faq' className='scroll-mt-28 mt-12 max-w-5xl mx-auto'>
          <h3 className='text-2xl md:text-3xl font-bold mb-6 font-headline text-on-surface'>{copy.faqHeading}</h3>
          <div className='space-y-3'>
            {faqs[lang].map(([question, answer]) => (
              <details key={question} className='rounded-xl border border-outline-variant/20 bg-surface p-5'>
                <summary className='cursor-pointer font-bold text-on-surface'>{question}</summary>
                <p className='text-secondary leading-relaxed mt-3'>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className='mt-12 text-center rounded-2xl border border-primary/20 bg-surface p-6 md:p-8'>
          <h3 className='text-2xl md:text-3xl font-bold mb-3 font-headline text-on-surface'>{copy.ctaTitle}</h3>
          <p className='text-secondary max-w-3xl mx-auto mb-5'>{copy.ctaText}</p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <a className='button-primary px-6 py-3' href='#contact'>{copy.ctaPrimary}</a>
            <a className='button-secondary px-6 py-3 inline-flex items-center justify-center gap-2' href={getWhatsAppUrl(lang)} target='_blank' rel='noreferrer'>
              <MessageSquare className='w-5 h-5' aria-hidden='true' /> WhatsApp
            </a>
          </div>
        </section>
      </div>
    </section>
  )
}
