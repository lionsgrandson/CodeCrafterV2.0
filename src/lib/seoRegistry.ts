import {
  pagesByLanguage as corePagesByLanguage,
  localizePath,
  serviceLabels,
  serviceSlugs,
  type Language,
  type SeoPage,
} from './seoPages'
import { caseStudyExtrasByLanguage } from './seoCaseStudyExtras'
import { extraPagesByLanguage } from './seoExtraPages'
import { factsPagesByLanguage } from './seoFactsPages'
import { locationHubByLanguage } from './seoLocationHub'
import { systemsPagesByLanguage } from './seoSystemsPages'
import { commercialPagesByLanguage } from './seoCommercialPages'
import { servicesHubByLanguage } from './seoServicesHub'
import { enhanceSeoPage } from './seoEnhancements'

export { localizePath, serviceLabels, serviceSlugs, type Language, type SeoPage }

const searchConsoleOverrides: Record<Language, Record<string, Partial<Pick<SeoPage, 'title' | 'description'>>>> = {
  he: {
    'custom-software': {
      title: 'פיתוח תוכנה בהתאמה אישית ומערכות לעסקים | CodeCrafter',
      description: 'פיתוח תוכנה בהתאמה אישית לעסקים בישראל: מערכות Web, פורטלים, דשבורדים, תהליכי עבודה ואינטגרציות שנבנים סביב הצורך והתהליך העסקי.',
    },
    'app-development': {
      title: 'פיתוח אפליקציה לעסק | אפליקציות לנייד | CodeCrafter',
      description: 'פיתוח אפליקציה לעסק ופיתוח אפליקציות לנייד ל-Android ול-iOS, כולל אפיון, UX/UI, חיבור למערכות קיימות, API, בדיקות והשקה לפי הצורך.',
    },
    'crm-development': {
      title: 'פיתוח מערכת CRM בהתאמה אישית | CodeCrafter',
      description: 'פיתוח CRM מותאם אישית לעסק לניהול לידים, לקוחות, משימות, הרשאות, דוחות, אוטומציות ואינטגרציות — לפי תהליך העבודה ולא לפי תבנית קבועה.',
    },
    automation: {
      title: 'אוטומציה לעסקים | חיבור מערכות ותהליכי עבודה | CodeCrafter',
      description: 'אוטומציות לעסקים שמחברות טפסים, CRM, דוא״ל, WhatsApp, מסמכים ו-API כדי לצמצם עבודה ידנית, להעביר מידע בצורה אמינה ולשמור על בקרה.',
    },
  },
  en: {
    websites: {
      title: 'Custom Website Development Services Israel | CodeCrafter',
      description: 'Custom website development services in Israel for business websites, landing pages and ecommerce, with responsive UX, integrations, performance and technical SEO built in.',
    },
    'custom-software': {
      title: 'Custom Software Development Israel | Business Systems | CodeCrafter',
      description: 'Custom software development in Israel for business systems, portals, dashboards, internal tools and integrations built around real workflows, users and permissions.',
    },
    'crm-development': {
      title: 'Custom CRM Development Israel | CodeCrafter',
      description: 'Custom CRM development in Israel for SMBs: leads, customers, tasks, permissions, reporting, automation and integrations built around your actual workflow.',
    },
    'erp-development': {
      title: 'Custom ERP Software Israel | ERP Development | CodeCrafter',
      description: 'Custom ERP software development in Israel for connected business processes, including CRM, orders, inventory, purchasing, projects, reporting and integrations.',
    },
    'app-development': {
      title: 'Mobile App Development Israel | Business Apps | CodeCrafter',
      description: 'Mobile app development in Israel for business and customer apps, from product definition and UX/UI to APIs, integrations, testing and Android/iOS delivery.',
    },
    automation: {
      title: 'Business Automation Israel | Workflow Automation | CodeCrafter',
      description: 'Business automation in Israel for CRM, forms, email, documents, APIs and AI-assisted workflows, designed with monitoring, error handling and human control.',
    },
    integrations: {
      title: 'API Integration Services Israel | Systems Integration | CodeCrafter',
      description: 'API integration services in Israel for connecting websites, CRM, ERP, email, calendars, payments and other business systems with reliable data flows.',
    },
  },
}

function withSearchConsoleMetadata(page: SeoPage, lang: Language): SeoPage {
  const override = searchConsoleOverrides[lang][page.slug]
  return override ? { ...page, ...override } : page
}

export const pagesByLanguage: Record<Language, SeoPage[]> = {
  he: [...corePagesByLanguage.he, ...caseStudyExtrasByLanguage.he, ...extraPagesByLanguage.he, ...systemsPagesByLanguage.he, ...commercialPagesByLanguage.he, servicesHubByLanguage.he, ...locationHubByLanguage.he, ...factsPagesByLanguage.he].map((page) => enhanceSeoPage(withSearchConsoleMetadata(page, 'he'), 'he')),
  en: [...corePagesByLanguage.en, ...caseStudyExtrasByLanguage.en, ...extraPagesByLanguage.en, ...systemsPagesByLanguage.en, ...commercialPagesByLanguage.en, servicesHubByLanguage.en, ...locationHubByLanguage.en, ...factsPagesByLanguage.en].map((page) => enhanceSeoPage(withSearchConsoleMetadata(page, 'en'), 'en')),
}

export function getSeoPage(pathname: string, lang: Language) {
  const withoutLanguage = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  const slug = withoutLanguage.replace(/^\/+|\/+$/g, '')
  return pagesByLanguage[lang].find((page) => page.slug === slug)
}
