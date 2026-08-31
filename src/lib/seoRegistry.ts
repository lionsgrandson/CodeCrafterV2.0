import {
  pagesByLanguage as corePagesByLanguage,
  localizePath,
  serviceLabels,
  serviceSlugs,
  type Language,
  type SeoPage,
} from './seoPages'
import { extraPagesByLanguage } from './seoExtraPages'
import { factsPagesByLanguage } from './seoFactsPages'
import { locationHubByLanguage } from './seoLocationHub'

export { localizePath, serviceLabels, serviceSlugs, type Language, type SeoPage }

const searchConsoleOverrides: Record<Language, Record<string, Partial<Pick<SeoPage, 'title' | 'description'>>>> = {
  he: {
    'custom-software': {
      title: 'פיתוח תוכנה בהתאמה אישית לעסקים | CodeCrafter',
      description: 'פיתוח תוכנה בהתאמה אישית לעסקים בישראל: מערכות Web, פורטלים, דשבורדים וכלים פנימיים שנבנים סביב תהליך העבודה האמיתי של העסק.',
    },
    'app-development': {
      title: 'פיתוח אפליקציה לעסק ופיתוח אפליקציות לעסקים | CodeCrafter',
      description: 'פיתוח אפליקציה לעסק ופיתוח אפליקציות לעסקים ל Android ו iOS, עם אפיון, ממשק, חיבור למערכות קיימות ובדיקות לפי הצורך.',
    },
    'crm-development': {
      title: 'פיתוח מערכת CRM בהתאמה אישית | CodeCrafter',
      description: 'פיתוח מערכת CRM בהתאמה אישית לעסק לניהול לידים, לקוחות, משימות, הרשאות, דוחות ותהליכי מכירה ושירות במקום אחד.',
    },
  },
  en: {
    websites: {
      title: 'Website Development Company Israel | CodeCrafter',
      description: 'Website development in Israel for businesses that need fast, clear, custom websites, landing pages, ecommerce, integrations, and a strong technical SEO foundation.',
    },
    'custom-software': {
      title: 'Custom Software Development Israel | CodeCrafter',
      description: 'Custom software development in Israel for business systems, portals, dashboards, internal tools, workflow management, and integrations built around real processes.',
    },
    'crm-development': {
      title: 'Custom CRM Development Israel | CodeCrafter',
      description: 'Custom CRM development in Israel for leads, customers, tasks, permissions, reporting, and integrations, designed around the business workflow instead of a fixed template.',
    },
  },
}

function withSearchConsoleMetadata(page: SeoPage, lang: Language): SeoPage {
  const override = searchConsoleOverrides[lang][page.slug]
  return override ? { ...page, ...override } : page
}

export const pagesByLanguage: Record<Language, SeoPage[]> = {
  he: [...corePagesByLanguage.he, ...extraPagesByLanguage.he, ...locationHubByLanguage.he, ...factsPagesByLanguage.he].map((page) => withSearchConsoleMetadata(page, 'he')),
  en: [...corePagesByLanguage.en, ...extraPagesByLanguage.en, ...locationHubByLanguage.en, ...factsPagesByLanguage.en].map((page) => withSearchConsoleMetadata(page, 'en')),
}

export function getSeoPage(pathname: string, lang: Language) {
  const withoutLanguage = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  const slug = withoutLanguage.replace(/^\/+|\/+$/g, '')
  return pagesByLanguage[lang].find((page) => page.slug === slug)
}
