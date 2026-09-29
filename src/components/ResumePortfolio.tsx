import {
  ArrowUpRight,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Github,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '../App'
import { localizePath } from '../lib/seoRoutes'

type Project = {
  title: string
  type: string
  description: string
  highlights: string[]
  technologies: string[]
  href?: string
  linkLabel?: string
}

const projectData: Record<'he' | 'en', Project[]> = {
  he: [
    {
      title: 'Creative CRM — Creative Intelligence',
      type: 'מערכת CRM מלאה',
      description:
        'מערכת עבודה עסקית שמרכזת לקוחות, לידים, מכירות, פרויקטים, משימות, מסמכים, הצעות מחיר, דוחות, צוות ואינטגרציות במקום אחד.',
      highlights: [
        'React + TypeScript עם מסכי Dashboard, Pipeline, Projects, Kanban, Reports וניהול הרשאות.',
        'Supabase עבור Auth, PostgreSQL, Row Level Security, סנכרון נתונים ואחסון קבצים פרטי.',
        'אינטגרציות Gmail ו-Google Calendar, תזכורות, PDF, יבוא/יצוא, Audit Log וכלי AI.',
        'מסלולי הפצה ל-Cloudflare, Desktop עם Tauri ו-Mobile עם Capacitor.',
      ],
      technologies: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Cloudflare', 'Tauri', 'Capacitor'],
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
      href: 'https://github.com/lionsgrandson/StudentTranscribe',
      linkLabel: 'GitHub',
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
      href: 'https://guestatlas.mosheschwartzberg.workers.dev',
      linkLabel: 'Live',
    },
  ],
  en: [
    {
      title: 'Creative CRM — Creative Intelligence',
      type: 'Full CRM / business workspace',
      description:
        'A production-oriented workspace combining clients, leads, sales, projects, tasks, documents, quotes, reporting, team operations and integrations.',
      highlights: [
        'React + TypeScript dashboards, sales pipeline, project workspace, Kanban tasks, reports and role-aware workflows.',
        'Supabase for authentication, PostgreSQL, Row Level Security, synchronized data and private file storage.',
        'Gmail and Google Calendar integrations, reminders, PDFs, import/export, audit history and AI-assisted workflows.',
        'Cloudflare deployment plus desktop/mobile packaging paths using Tauri and Capacitor.',
      ],
      technologies: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Cloudflare', 'Tauri', 'Capacitor'],
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
      href: 'https://github.com/lionsgrandson/StudentTranscribe',
      linkLabel: 'GitHub',
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
      href: 'https://guestatlas.mosheschwartzberg.workers.dev',
      linkLabel: 'Live',
    },
  ],
}

const websites = [
  { title: 'Rainbow ASD', href: 'https://rainbow-asd.com/', stack: 'Responsive service website' },
  { title: 'Shimon Cohen Photography', href: 'https://shimonphotos.com/', stack: 'Photography portfolio' },
  { title: 'Yuval Kadosh', href: 'https://ykadosh.co.il', stack: 'Content & personal brand website' },
  { title: 'SumsUp', href: 'https://sumsup.co', stack: 'White-label product website' },
  { title: 'CodeRecovery', href: 'https://simplyrecovery.netlify.app/', stack: 'Technical service website' },
]

const githubProjects = [
  { title: 'StudentTranscribe', href: 'https://github.com/lionsgrandson/StudentTranscribe' },
  { title: 'CodeCrafterV2.0', href: 'https://github.com/lionsgrandson/CodeCrafterV2.0' },
  { title: 'WA-automation', href: 'https://github.com/lionsgrandson/WA-automation' },
  { title: 'transcribeChats', href: 'https://github.com/lionsgrandson/transcribeChats' },
  { title: 'DevDesk', href: 'https://github.com/lionsgrandson/DevDesk----a-mini-Jira---CRM---client-portal' },
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
        {project.href && (
          <a
            href={project.href}
            target='_blank'
            rel='noreferrer'
            className='interactive-link inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary'
          >
            {project.linkLabel}
            <ExternalLink className='h-4 w-4' />
          </a>
        )}
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
          eyebrow: 'תיק עבודות למגייסים',
          title: 'משה שוורצברג — Software Developer',
          intro:
            'פיתוח Full-stack, מערכות CRM, כלי AI, אינטגרציות, Cloud deployment ואתרי Production. הדף הזה מרכז פרויקטים שמדגימים עבודה טכנית מעבר לעיצוב UI.',
          github: 'לפרופיל GitHub',
          selected: 'פרויקטים נבחרים',
          selectedSub: 'מערכות ואפליקציות שמציגות ארכיטקטורה, Backend, Data, אינטגרציות ופריסה.',
          websitesTitle: 'אתרי Production',
          websitesSub: 'מספר אתרים פעילים שבניתי עבור לקוחות ופרויקטים.',
          githubTitle: 'GitHub ופרויקטים נוספים',
          githubSub:
            'הפרופיל כולל פרויקטים ציבוריים נוספים. חלק ממערכות הלקוחות וה-CRM הן private repositories ולכן אינן מופיעות כולן בפרופיל הציבורי.',
          noteTitle: 'אפשר להעמיק בראיון',
          note:
            'בפרויקטים פרטיים אפשר לעבור יחד על ארכיטקטורה, החלטות מימוש, integrations, deployment והחלקים שבניתי בפועל.',
        }
      : {
          eyebrow: 'Recruiter engineering portfolio',
          title: 'Moshe Schwartzberg — Software Developer',
          intro:
            'Full-stack development, CRM systems, AI tooling, integrations, cloud deployment and production websites. This page focuses on engineering work beyond UI design.',
          github: 'Open GitHub profile',
          selected: 'Selected engineering work',
          selectedSub: 'Applications and systems demonstrating architecture, backend, data, integrations and production delivery.',
          websitesTitle: 'Production websites',
          websitesSub: 'A selection of live client and project websites I built.',
          githubTitle: 'GitHub & additional projects',
          githubSub:
            'The public profile contains additional projects. Some client systems and CRM repositories are private, so GitHub does not represent the full body of work.',
          noteTitle: 'More detail is available in an interview',
          note:
            'For private projects I can walk through architecture, implementation decisions, integrations, deployment and the specific parts I built.',
        }

  const skillGroups = [
    {
      icon: Code2,
      title: 'Frontend',
      items: 'React · Next.js · TypeScript · JavaScript · Vite',
    },
    {
      icon: Database,
      title: 'Backend & Data',
      items: 'Node.js · Supabase · PostgreSQL · MongoDB · REST APIs',
    },
    {
      icon: Cloud,
      title: 'Cloud & Delivery',
      items: 'Cloudflare Workers · R2 · Netlify · CI/CD · Production deployment',
    },
    {
      icon: ShieldCheck,
      title: 'Systems & Security',
      items: 'OAuth · RBAC · MFA · RLS · Audit logs · Integrations',
    },
  ]

  return (
    <div className='resume-page bg-surface'>
      <section className='relative overflow-hidden px-6 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44'>
        <div className='pointer-events-none absolute inset-0 opacity-60'>
          <div className='absolute -end-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute -start-20 bottom-0 h-72 w-72 rounded-full bg-tertiary/10 blur-3xl' />
        </div>

        <div className='relative z-10 mx-auto max-w-7xl'>
          <div className='max-w-4xl'>
            <span className='section-kicker'>{copy.eyebrow}</span>
            <h1 className='mt-6 max-w-4xl text-4xl font-black leading-tight text-on-surface md:text-6xl'>
              {copy.title}
            </h1>
            <p className='mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant md:text-xl'>
              {copy.intro}
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <a
                href='https://github.com/lionsgrandson'
                target='_blank'
                rel='noreferrer'
                className='button-primary px-6 py-3'
              >
                <Github className='h-5 w-5' />
                {copy.github}
              </a>
              <a href='#engineering-work' className='button-secondary px-6 py-3'>
                <BriefcaseBusiness className='h-5 w-5' />
                {copy.selected}
              </a>
            </div>
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

      <section id='engineering-work' className='px-6 py-20 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 max-w-3xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.16em] text-primary'>
              {copy.selected}
            </p>
            <h2 className='mt-2 text-3xl font-black text-on-surface md:text-5xl'>
              {lang === 'he' ? 'מערכות, CRM וכלי AI' : 'Systems, CRM and AI tooling'}
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

      <section className='px-6 py-20 md:px-8'>
        <div className='mx-auto max-w-7xl rounded-3xl bg-on-surface p-7 text-surface md:p-10'>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'>
            <div>
              <div className='flex items-center gap-3'>
                <Github className='h-8 w-8 text-white' />
                <h2 className='text-3xl font-black text-white'>{copy.githubTitle}</h2>
              </div>
              <p className='mt-4 max-w-3xl leading-7 text-white/70'>{copy.githubSub}</p>

              <div className='mt-6 flex flex-wrap gap-2'>
                {githubProjects.map((project) => (
                  <a
                    key={project.title}
                    href={project.href}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10'
                  >
                    <Code2 className='h-4 w-4' />
                    {project.title}
                  </a>
                ))}
              </div>
            </div>

            <a
              href='https://github.com/lionsgrandson'
              target='_blank'
              rel='noreferrer'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-on-surface transition hover:bg-surface-container-high'
            >
              github.com/lionsgrandson
              <ExternalLink className='h-4 w-4' />
            </a>
          </div>
        </div>
      </section>

      <section className='border-t border-outline-variant/15 bg-surface-container-low px-6 py-14 text-center md:px-8'>
        <div className='mx-auto max-w-3xl'>
          <Sparkles className='mx-auto h-7 w-7 text-primary' />
          <h2 className='mt-4 text-2xl font-black text-on-surface'>{copy.noteTitle}</h2>
          <p className='mt-3 leading-7 text-on-surface-variant'>{copy.note}</p>
          <a
            href={localizePath('portfolio', lang)}
            className='interactive-link mt-6 inline-flex items-center gap-2 font-bold text-primary'
          >
            {lang === 'he' ? 'לתיק העבודות המלא' : 'Open the full client portfolio'}
            <ArrowUpRight className='h-4 w-4' />
          </a>
        </div>
      </section>
    </div>
  )
}
