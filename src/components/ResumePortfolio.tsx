import {
  ArrowUpRight,
  BriefcaseBusiness,
  Bug,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Headphones,
  MonitorCog,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { useLanguage } from '../App'

type Project = {
  title: string
  type: string
  description: string
  highlights: string[]
  technologies: string[]
  links?: { label: string; href: string }[]
}

type Experience = {
  role: string
  organization: string
  description: string
  bullets: string[]
  tags: string[]
}

const projectData: Record<'he' | 'en', Project[]> = {
  he: [
    {
      title: 'Tov Ha’aretz',
      type: 'QA · Technical SEO · Production flow',
      description:
        'עבודת QA ואבחון טכני למערכת תוכן מבוססת React/SPA, כולל בדיקות End-to-End, תהליכי פרסום, תרגומים ו-SEO טכני.',
      highlights: [
        'בדיקת End-to-End של תהליך יצירה, עריכה ופרסום ותיעוד תקלות שחוסמות או פוגעות בזרימת העבודה.',
        'בדיקת בעיות SPA/SEO כולל sitemap, canonical, hreflang, crawlability ותוכן מתורגם.',
        'בדיקת התנהגות fallback ו-cache בתרגומים כדי לוודא שעריכות לא מציגות תוכן ישן או שפה לא נכונה.',
        'בדיקת בעיות קישורים והתנהגות בפועל מתוך תהליכי משתמש ולא רק מתוך הקוד.',
      ],
      technologies: ['Manual QA', 'E2E Testing', 'React SPA', 'Technical SEO', 'Sitemaps', 'hreflang', 'Debugging'],
      links: [{ label: 'Live', href: 'https://tovhaaretz.com/' }],
    },
    {
      title: 'Student Transcribe',
      type: 'AI / Transcription / Local-first',
      description:
        'אפליקציית סטודנטים שמקליטה או מקבלת הרצאה, מתמללת אותה ומייצרת סיכום, נקודות מפתח, נושאים למבחן, משימות, פלאשקארדים ושאלות תרגול.',
      highlights: [
        'הקלטה עמידה לקריסות עם MediaRecorder וחלוקה ל-chunks שנשמרים ב-OPFS / IndexedDB.',
        'הפרדה בין שלב התמלול לשלב יצירת חומר הלימוד כדי לא לאבד Transcript במקרה של כשל AI.',
        'Gemini transcription + structured analysis עם retry ו-model fallback.',
        'Cloudflare Worker ששומר את מפתח Gemini בצד השרת ולא חושף אותו לדפדפן.',
      ],
      technologies: ['React 19', 'TypeScript', 'Gemini', 'Cloudflare Workers', 'IndexedDB', 'OPFS'],
      links: [{ label: 'Live', href: 'https://student-transcribe.mosheschwartzberg.workers.dev' }],
    },
    {
      title: 'CodeCrafter CRM',
      type: 'CRM · Business Operations · AI',
      description:
        'מערכת CRM עסקית מלאה עבור CodeCrafter שמרכזת לקוחות, מכירות, פרויקטים, משימות, מסמכים, הצעות מחיר, דיווחים, צוות ואינטגרציות.',
      highlights: [
        'ניהול לקוחות ולידים, Pipeline מכירות, Project workspace, Kanban, תזכורות, קבצים, דוחות ו-Audit Log.',
        'Supabase Auth, PostgreSQL, RLS, Realtime ואחסון קבצים פרטי.',
        'Gmail, Google Calendar ו-Google Drive דרך OAuth, לצד Gemini דרך Supabase Edge Functions.',
        'יבוא/יצוא Excel ו-CSV, PDF quotes, הרשאות צוות, MFA ויכולות Mobile דרך Capacitor.',
      ],
      technologies: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini', 'Google APIs', 'Capacitor'],
      links: [{ label: 'Live', href: 'https://codecraftercrm.netlify.app' }],
    },
    {
      title: 'RAM Engineering CRM',
      type: 'CRM · Project Management · Engineering Operations',
      description:
        'מערכת CRM וניהול פרויקטים בעברית עבור ר.א.ם הנדסה, עם דגש על אתרי עבודה, משימות, דוחות פיקוח, קבצים, משתמשים והרשאות.',
      highlights: [
        'ניהול פרויקטים לפי אתר/כתובת, משימות ותתי-משימות, סטטוסים, אחראים, תאריכים ודוחות פיקוח.',
        'Supabase Auth, RLS, Realtime, Storage ותפקידי developer, admin, assistant, inspector, engineer ו-viewer.',
        'תשתית Google Workspace ל-Gmail, Calendar ו-Drive, כולל OAuth per-user.',
        'Cloudflare Worker שמגיש את ה-Frontend וה-API, לצד לקוח Windows ותמיכה ב-Capacitor.',
      ],
      technologies: ['React', 'TypeScript', 'Supabase', 'Cloudflare Workers', 'Google Workspace', 'RBAC', 'Realtime'],
      links: [
        { label: 'Live', href: 'https://rameng-crm.rameng-crm-worker.workers.dev' },
        { label: 'GitHub', href: 'https://github.com/lionsgrandson/RAMeng' },
      ],
    },
    {
      title: 'GuestAtlas',
      type: 'מערכת Full-stack מאובטחת',
      description:
        'פלטפורמה רב-נכסית למלונות עבור משוב אורחים, אירועים, מחלוקות, הרשאות ותהליכי פרטיות.',
      highlights: [
        'Next.js עם תפקידי owner / admin / manager / reviewer / viewer.',
        'Supabase Auth + PostgreSQL ו-Cloudflare R2 לאחסון Evidence פרטי.',
        'MFA, Audit History, הצפנת שדות זהות, בקרות גישה ותהליכי Data Rights.',
        'Pipeline פריסה עם TypeScript checks, self-tests, schema verification ו-dry-run.',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Cloudflare R2', 'Security'],
      links: [{ label: 'Live', href: 'https://guestatlas.mosheschwartzberg.workers.dev' }],
    },
  ],
  en: [
    {
      title: 'Tov Ha’aretz',
      type: 'QA · Technical SEO · Production flow',
      description:
        'QA and technical analysis for a React/SPA content platform, covering end-to-end publishing, translations and technical SEO.',
      highlights: [
        'Tested the end-to-end create, edit and publish workflow and documented defects affecting production use.',
        'Audited SPA/SEO issues including sitemap behavior, canonicals, hreflang, crawlability and translated content.',
        'Checked translation fallback and cache behavior so edits do not surface stale content or the wrong language.',
        'Investigated link behavior from the user flow instead of treating code-level correctness as sufficient.',
      ],
      technologies: ['Manual QA', 'E2E Testing', 'React SPA', 'Technical SEO', 'Sitemaps', 'hreflang', 'Debugging'],
    },
    {
      title: 'Student Transcribe',
      type: 'AI / transcription / local-first',
      description:
        'A student web app that records or accepts lectures, transcribes them and generates summaries, key points, exam topics, tasks, flashcards and practice questions.',
      highlights: [
        'Crash-resilient recording using MediaRecorder chunks persisted to OPFS / IndexedDB.',
        'Transcription and study-note generation are separated so a finished transcript survives downstream AI failures.',
        'Gemini transcription and structured analysis with retries and model fallback.',
        'Cloudflare Worker keeps the Gemini API key server-side and out of the browser.',
      ],
      technologies: ['React 19', 'TypeScript', 'Gemini', 'Cloudflare Workers', 'IndexedDB', 'OPFS'],
      links: [{ label: 'Live', href: 'https://student-transcribe.mosheschwartzberg.workers.dev' }],
    },
    {
      title: 'CodeCrafter CRM',
      type: 'CRM · Business Operations · AI',
      description:
        'A full business CRM for CodeCrafter combining clients, sales, projects, tasks, documents, quotes, reporting, team operations and integrations.',
      highlights: [
        'Client/lead management, sales pipeline, project workspace, Kanban, reminders, files, reports and audit history.',
        'Supabase Auth, PostgreSQL, RLS, Realtime and private file storage.',
        'Gmail, Google Calendar and Google Drive through OAuth, plus Gemini through Supabase Edge Functions.',
        'Excel/CSV import-export, printable quotes, team permissions, MFA and mobile packaging through Capacitor.',
      ],
      technologies: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini', 'Google APIs', 'Capacitor'],
      links: [
        { label: 'Live', href: 'https://codecraftercrm.netlify.app' },
        { label: 'GitHub', href: 'https://github.com/lionsgrandson/CodeCrafterCRM' },
      ],
    },
    {
      title: 'RAM Engineering CRM',
      type: 'CRM · Project Management · Engineering Operations',
      description:
        'A Hebrew-first CRM and project management platform for RAM Engineering focused on job sites, tasks, inspection reports, files, users and permissions.',
      highlights: [
        'Project management by site/address, tasks and subtasks, statuses, assignees, dates and inspection reports.',
        'Supabase Auth, RLS, Realtime, Storage and developer/admin/assistant/inspector/engineer/viewer roles.',
        'Google Workspace infrastructure for Gmail, Calendar and Drive with per-user OAuth connections.',
        'Cloudflare Worker serving the frontend and API, plus a Windows desktop client and Capacitor support.',
      ],
      technologies: ['React', 'TypeScript', 'Supabase', 'Cloudflare Workers', 'Google Workspace', 'RBAC', 'Realtime'],
      links: [
        { label: 'Live', href: 'https://rameng-crm.rameng-crm-worker.workers.dev' },
        { label: 'GitHub', href: 'https://github.com/lionsgrandson/RAMeng' },
      ],
    },
    {
      title: 'GuestAtlas',
      type: 'Secure full-stack platform',
      description:
        'A multi-property hospitality platform for guest feedback, incidents, disputes, permissions and privacy workflows.',
      highlights: [
        'Next.js application with owner, admin, manager, reviewer and viewer roles.',
        'Supabase Auth + PostgreSQL with Cloudflare R2 for private evidence storage.',
        'MFA-aware flows, audit history, encrypted identity fields, scoped access and data-rights workflows.',
        'Deployment pipeline with TypeScript checks, self-tests, schema verification and dry-run gates.',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Cloudflare R2', 'Security'],
      links: [{ label: 'Live', href: 'https://guestatlas.mosheschwartzberg.workers.dev' }],
    },
  ],
}

const experienceData: Record<'he' | 'en', Experience[]> = {
  he: [
    {
      role: 'טכנאי AV — Audio & Video',
      organization: 'VidCo · תמיכה עבור WZO, KKL-JNF ו-JAFI',
      description:
        'תפקיד טכני בסביבת Audio/Video דרך VidCo, עם תמיכה תפעולית עבור WZO, KKL-JNF ו-JAFI.',
      bullets: [
        'עזרתי לתפעל פגישות דיגיטליות ב-Zoom ולחבר מערכות Audio ו-Video.',
        'הקמה, הפעלה ותמיכה במערכות AV בסביבת עבודה מקצועית.',
        'Troubleshooting בזמן אמת ומתן תמיכה טכנית למשתמשים ולצוותים.',
      ],
      tags: ['AV', 'Technical Support', 'Troubleshooting', 'User Support'],
    },
    {
      role: 'Full-Stack Software Developer & Team Lead',
      organization: 'צה״ל · מפקדת חיל הטנ״א',
      description:
        'שירתתי כמפתח Full Stack וכ-Team Lead במפקדת חיל הטנ״א, עם אחריות על פיתוח תוכנה, הובלה טכנית ועבודה בצוות.',
      bullets: [
        'פיתוח Full Stack במסגרת השירות הצבאי.',
        'הובלת צוות פיתוח והכוונה טכנית במסגרת מפקדת חיל הטנ״א.',
        'הדרכת סטודנטים / חניכים במסלול B.Sc. באלקטרוניקה.',
      ],
      tags: ['Full Stack', 'Team Lead', 'Software Development', 'Training', 'Electronics'],
    },
  ],
  en: [
    {
      role: 'AV Technician — Audio & Video',
      organization: 'VidCo · supporting WZO, KKL-JNF and JAFI',
      description:
        'Hands-on audio/video technical operations through VidCo, supporting WZO, KKL-JNF and JAFI.',
      bullets: [
        'Helped operate digital meetings in Zoom and connect audio and video systems.',
        'Setup, operation and support of AV systems in a professional workplace environment.',
        'Real-time troubleshooting and technical assistance for users and teams.',
      ],
      tags: ['AV', 'Technical Support', 'Troubleshooting', 'User Support'],
    },
    {
      role: 'Full-Stack Software Developer & Team Lead',
      organization: 'Israel Defense Forces · Technological and Maintenance Corps HQ',
      description:
        'Served as a Full-Stack Software Developer and Team Lead at the Technological and Maintenance Corps headquarters, combining hands-on development with technical leadership.',
      bullets: [
        'Full-stack software development during military service.',
        'Led a development team and provided technical direction at corps headquarters.',
        'Instruction for B.Sc. electronics students / trainees.',
      ],
      tags: ['Full Stack', 'Team Lead', 'Software Development', 'Training', 'Electronics'],
    },
  ],
}

const websites = [
  { title: 'Creative Intelligence', href: 'https://creative-intell.netlify.app/', stack: 'Business / technology website' },
  { title: 'Shimon Cohen Photography', href: 'https://shimonphotos.com/', stack: 'Photography portfolio' },
  { title: 'Yuval Kadosh', href: 'https://ykadosh.co.il', stack: 'Content & personal brand website' },
  { title: 'SumsUp', href: 'https://sumsup.co', stack: 'White-label product website' },
  { title: 'CodeRecovery', href: 'https://simplyrecovery.netlify.app/', stack: 'Technical service website' },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className='rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm md:p-8'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary'>
            {project.type}
          </p>
          <h3 className='text-2xl font-extrabold text-on-surface'>{project.title}</h3>
        </div>
        {project.links?.length ? (
          <div className='flex flex-wrap gap-3'>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target='_blank'
                rel='noreferrer'
                className='interactive-link inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary'
              >
                {link.label}
                <ExternalLink className='h-4 w-4' />
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <p className='mt-4 max-w-4xl leading-7 text-on-surface-variant'>{project.description}</p>

      <ul className='mt-5 space-y-2'>
        {project.highlights.map((highlight) => (
          <li key={highlight} className='flex gap-3 text-sm leading-6 text-on-surface-variant'>
            <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className='mt-6 flex flex-wrap gap-2'>
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className='rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-bold text-on-surface'
          >
            {technology}
          </span>
        ))}
      </div>
    </article>
  )
}

export function ResumePortfolio() {
  const { lang } = useLanguage()
  const copy =
    lang === 'he'
      ? {
          eyebrow: 'פרופיל טכני למגייסים',
          title: 'משה שוורצברג — Software · QA · IT Support · AV',
          intro:
            'אני מפתח Full Stack עם רקע רחב גם ב-QA, Help Desk, SEO טכני, אינטגרציות, Cloud ו-AV. אני אוהב להבין מערכת לעומק — לבנות אותה, לבדוק אותה, לאבחן תקלות ולפתור אותן בפועל.',
          businessNote:
            'האתר הראשי הוא האתר של העסק שלי, CodeCrafter. במקביל אני מחפש תפקיד כשכיר שבו אוכל להביא את הניסיון שלי בפיתוח, QA, Implementation ותמיכה טכנית.',
          selected: 'פרויקטים נבחרים',
          selectedSub: 'מערכות ועבודות שמציגות פיתוח, QA, debugging, data, integrations ו-production delivery.',
          experienceTitle: 'ניסיון טכני',
          experienceSub: 'פיתוח, תמיכה, הדרכה ו-AV בסביבות שבהן צריך להבין מערכת, לאבחן בעיה ולפתור אותה בפועל.',
          capabilitiesTitle: 'QA · Help Desk · SEO · Technical Operations',
          capabilitiesSub: 'התחומים הטכניים שאני מביא בנוסף לפיתוח תוכנה.',
          websitesTitle: 'אתרי Production',
          websitesSub: 'מספר אתרים פעילים שבניתי או עבדתי עליהם עבור לקוחות ופרויקטים.',
          noteTitle: 'אפשר להעמיק בראיון',
          note:
            'בפרויקטים פרטיים אפשר לעבור יחד על ארכיטקטורה, תקלות שאובחנו, תהליכי QA, integrations, deployment והחלקים שבניתי או בדקתי בפועל.',
        }
      : {
          eyebrow: 'Technical profile for recruiters',
          title: 'Moshe Schwartzberg — Software · QA · IT Support · AV',
          intro:
            'I am a Full-Stack Developer with broader hands-on experience in QA, Help Desk, technical SEO, integrations, cloud delivery and AV. I like understanding systems end-to-end — building them, testing them, diagnosing failures and solving practical problems.',
          businessNote:
            'The main website is for my business, CodeCrafter. In parallel, I am actively looking for an employed role where I can bring my development, QA, implementation and technical-support experience.',
          selected: 'Selected engineering work',
          selectedSub: 'Projects demonstrating development, QA, debugging, data, integrations and production delivery.',
          experienceTitle: 'Technical experience',
          experienceSub: 'Development, support, instruction and AV work where understanding the system, diagnosing the issue and solving it in practice all matter.',
          capabilitiesTitle: 'QA · Help Desk · SEO · Technical Operations',
          capabilitiesSub: 'Technical capabilities I bring in addition to software development.',
          websitesTitle: 'Production websites',
          websitesSub: 'A selection of live client and project websites I built or worked on.',
          noteTitle: 'More detail is available in an interview',
          note:
            'For private projects I can walk through architecture, defects investigated, QA flows, integrations, deployment and the specific work I built or tested.',
        }

  const skillGroups = [
    {
      icon: Code2,
      title: 'Software Development',
      items: 'React · Next.js · TypeScript · JavaScript · Node.js · REST APIs',
    },
    {
      icon: Bug,
      title: 'QA & Debugging',
      items: 'Manual QA · E2E · Regression · Reproduction · Browser DevTools · API checks',
    },
    {
      icon: Headphones,
      title: 'Help Desk / IT Support',
      items: 'Windows · Microsoft setup · Gmail · Printers · Routers/Wi-Fi · User support',
    },
    {
      icon: Search,
      title: 'Technical SEO',
      items: 'Sitemaps · robots.txt · canonical · hreflang · SPA/SSR · crawlability · metadata',
    },
    {
      icon: Database,
      title: 'Backend & Data',
      items: 'Supabase · PostgreSQL · MongoDB · Auth · RBAC · RLS',
    },
    {
      icon: Cloud,
      title: 'Cloud & Delivery',
      items: 'Cloudflare · R2 · Netlify · deployment · production troubleshooting',
    },
    {
      icon: Radio,
      title: 'AV / Technical Operations',
      items: 'Audio/video systems · setup · operation · real-time troubleshooting · user support',
    },
    {
      icon: ShieldCheck,
      title: 'Systems & Security',
      items: 'OAuth · MFA · permissions · audit logs · integrations · secure file handling',
    },
  ]

  const capabilityCards = [
    {
      icon: Bug,
      title: lang === 'he' ? 'QA ובדיקות' : 'QA & Testing',
      text:
        lang === 'he'
          ? 'בדיקות ידניות, End-to-End, Regression, שחזור תקלות, בדיקת flows אמיתיים, הרשאות, קישורים, שפות, API והתנהגות production.'
          : 'Manual QA, end-to-end and regression testing, defect reproduction, real user flows, permissions, links, localization, APIs and production behavior.',
    },
    {
      icon: Headphones,
      title: lang === 'he' ? 'Help Desk ותמיכה' : 'Help Desk & Support',
      text:
        lang === 'he'
          ? 'פתרון בעיות Windows, חשבונות Microsoft/Gmail, מדפסות, ראוטרים ו-Wi-Fi, הגדרות משתמש ותקלות יום-יומיות מול משתמשים לא טכניים.'
          : 'Troubleshooting Windows, Microsoft/Gmail accounts, printers, routers and Wi-Fi, user setup and day-to-day issues with non-technical users.',
    },
    {
      icon: Search,
      title: 'Technical SEO',
      text:
        lang === 'he'
          ? 'Audits ויישום של sitemap, robots, canonical, hreflang, metadata, crawlability, SPA/SSR, accessibility בסיסית ותקלות אינדוקס.'
          : 'Audits and implementation work covering sitemaps, robots, canonicals, hreflang, metadata, crawlability, SPA/SSR, basic accessibility and indexing issues.',
    },
    {
      icon: Wrench,
      title: lang === 'he' ? 'Implementation / Technical Operations' : 'Implementation / Technical Operations',
      text:
        lang === 'he'
          ? 'חיבור בין לקוח, מערכת וצוות פיתוח: הבנת דרישה, reproduction, logs/debugging, configuration, integrations, rollout ופתרון בעיות.'
          : 'Bridging users, systems and development: requirements, reproduction, logs/debugging, configuration, integrations, rollout and troubleshooting.',
    },
  ]

  return (
    <div className='resume-page bg-surface'>
      <section className='relative overflow-hidden px-6 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44'>
        <div className='pointer-events-none absolute inset-0 opacity-60'>
          <div className='absolute -end-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute -start-20 bottom-0 h-72 w-72 rounded-full bg-tertiary/10 blur-3xl' />
        </div>

        <div className='relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center'>
          <div className='max-w-5xl'>
            <span className='section-kicker'>{copy.eyebrow}</span>
            <h1 className='mt-6 max-w-5xl text-4xl font-black leading-tight text-on-surface md:text-6xl'>
              {copy.title}
            </h1>
            <p className='mt-6 max-w-4xl text-lg leading-8 text-on-surface-variant md:text-xl'>
              {copy.intro}
            </p>
            <p className='mt-5 max-w-4xl rounded-2xl border border-primary/15 bg-white/70 px-5 py-4 text-sm font-semibold leading-7 text-on-surface-variant shadow-sm backdrop-blur'>
              {copy.businessNote}
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <a href='#experience' className='button-primary px-6 py-3'>
                <BriefcaseBusiness className='h-5 w-5' />
                {copy.experienceTitle}
              </a>
              <a href='#engineering-work' className='button-secondary px-6 py-3'>
                <MonitorCog className='h-5 w-5' />
                {copy.selected}
              </a>
            </div>
          </div>

          <div className='mx-auto w-full max-w-[320px]'>
            <div className='overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-2xl shadow-primary/10'>
              <img
                src='/moshe-prague-768.webp'
                srcSet='/moshe-prague-480.webp 480w, /moshe-prague-768.webp 768w, /moshe-prague-1052.webp 1052w'
                sizes='(max-width: 1023px) 320px, 320px'
                alt={lang === 'he' ? 'משה שוורצברג' : 'Moshe Schwartzberg'}
                className='aspect-[4/5] w-full object-cover'
                width='768'
                height='945'
                loading='eager'
                decoding='async'
              />
            </div>
            <p className='mt-4 text-center text-sm leading-6 text-on-surface-variant'>
              {lang === 'he'
                ? 'מפתח Full Stack עם ניסיון בהובלה טכנית, QA, תמיכה ופתרון בעיות.'
                : 'Full-Stack Developer with experience in technical leadership, QA, support and troubleshooting.'}
            </p>
          </div>
        </div>
      </section>

      <section className='border-y border-outline-variant/15 bg-surface-container-low px-6 py-12 md:px-8'>
        <div className='mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {skillGroups.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className='rounded-2xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur'
            >
              <Icon className='mb-4 h-7 w-7 text-primary' />
              <h2 className='text-lg font-extrabold text-on-surface'>{title}</h2>
              <p className='mt-2 text-sm leading-6 text-on-surface-variant'>{items}</p>
            </div>
          ))}
        </div>
      </section>

      <section id='experience' className='px-6 py-20 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 max-w-3xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.16em] text-primary'>
              {copy.experienceTitle}
            </p>
            <h2 className='mt-2 text-3xl font-black text-on-surface md:text-5xl'>
              {lang === 'he' ? 'ניסיון מקצועי וטכני' : 'Professional & technical experience'}
            </h2>
            <p className='mt-4 text-lg leading-7 text-on-surface-variant'>{copy.experienceSub}</p>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            {experienceData[lang].map((item) => (
              <article
                key={item.role}
                className='rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm md:p-8'
              >
                <div className='flex flex-wrap items-center gap-3'>
                  <h3 className='text-2xl font-extrabold text-on-surface'>{item.role}</h3>
                </div>
                <p className='mt-2 font-bold text-primary'>{item.organization}</p>
                <p className='mt-4 leading-7 text-on-surface-variant'>{item.description}</p>
                <ul className='mt-5 space-y-2'>
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className='flex gap-3 text-sm leading-6 text-on-surface-variant'>
                      <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className='mt-6 flex flex-wrap gap-2'>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-bold'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-surface-container-low px-6 py-20 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 max-w-3xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.16em] text-primary'>
              {copy.capabilitiesTitle}
            </p>
            <h2 className='mt-2 text-3xl font-black text-on-surface md:text-5xl'>
              {lang === 'he' ? 'מעבר לפיתוח תוכנה' : 'Beyond software development'}
            </h2>
            <p className='mt-4 text-lg leading-7 text-on-surface-variant'>{copy.capabilitiesSub}</p>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {capabilityCards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className='rounded-2xl border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur'
              >
                <Icon className='h-7 w-7 text-primary' />
                <h3 className='mt-4 text-xl font-extrabold text-on-surface'>{title}</h3>
                <p className='mt-3 leading-7 text-on-surface-variant'>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='engineering-work' className='px-6 py-20 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 max-w-3xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.16em] text-primary'>
              {copy.selected}
            </p>
            <h2 className='mt-2 text-3xl font-black text-on-surface md:text-5xl'>
              {lang === 'he' ? 'פיתוח, QA ומערכות Production' : 'Development, QA and production systems'}
            </h2>
            <p className='mt-4 text-lg leading-7 text-on-surface-variant'>{copy.selectedSub}</p>
          </div>

          <div className='grid gap-6'>
            {projectData[lang].map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className='bg-surface-container-low px-6 py-20 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 max-w-3xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.16em] text-primary'>
              {copy.websitesTitle}
            </p>
            <h2 className='mt-2 text-3xl font-black text-on-surface md:text-5xl'>
              {lang === 'he' ? 'כמה פרויקטי Web פעילים' : 'A few live web projects'}
            </h2>
            <p className='mt-4 text-lg text-on-surface-variant'>{copy.websitesSub}</p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {websites.map((site) => (
              <a
                key={site.title}
                href={site.href}
                target='_blank'
                rel='noreferrer'
                className='group rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='text-xl font-extrabold text-on-surface'>{site.title}</h3>
                    <p className='mt-2 text-sm text-on-surface-variant'>{site.stack}</p>
                  </div>
                  <ArrowUpRight className='h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className='border-t border-outline-variant/15 bg-surface px-6 py-14 text-center md:px-8'>
        <div className='mx-auto max-w-3xl'>
          <Sparkles className='mx-auto h-7 w-7 text-primary' />
          <h2 className='mt-4 text-2xl font-black text-on-surface'>{copy.noteTitle}</h2>
          <p className='mt-3 leading-7 text-on-surface-variant'>{copy.note}</p>
          <div className='mt-5 flex flex-wrap justify-center gap-5'>
            <a
              href='https://github.com/lionsgrandson'
              target='_blank'
              rel='noreferrer'
              className='interactive-link inline-flex items-center gap-2 font-bold text-primary'
            >
              GitHub · lionsgrandson
              <ExternalLink className='h-4 w-4' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
