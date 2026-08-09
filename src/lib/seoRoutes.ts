export type Language = 'he' | 'en'

export const serviceSlugs = [
  'websites',
  'crm-development',
  'app-development',
  'automation',
  'custom-software',
] as const

export const serviceLabels: Record<Language, Record<string, string>> = {
  he: {
    websites: 'בניית אתרים לעסקים',
    'custom-software': 'פיתוח מערכות לעסקים',
    automation: 'אוטומציה לעסקים',
    'crm-development': 'פיתוח מערכת CRM בהתאמה אישית',
    'app-development': 'פיתוח אפליקציות לעסקים',
  },
  en: {
    websites: 'Business websites',
    'custom-software': 'Custom business software',
    automation: 'Business automation',
    'crm-development': 'Custom CRM development',
    'app-development': 'Business app development',
  },
}

export function localizePath(path: string, lang: Language) {
  const normalized = `/${path.replace(/^\/+|\/+$/g, '')}`
  if (lang === 'en') return normalized === '/' ? '/en/' : `/en${normalized}/`
  return normalized === '/' ? '/' : `${normalized}/`
}
