import {
  pagesByLanguage as corePagesByLanguage,
  localizePath,
  serviceLabels,
  serviceSlugs,
  type Language,
  type SeoPage,
} from './seoPages'
import { extraPagesByLanguage } from './seoExtraPages'

export { localizePath, serviceLabels, serviceSlugs, type Language, type SeoPage }

export const pagesByLanguage: Record<Language, SeoPage[]> = {
  he: [...corePagesByLanguage.he, ...extraPagesByLanguage.he],
  en: [...corePagesByLanguage.en, ...extraPagesByLanguage.en],
}

export function getSeoPage(pathname: string, lang: Language) {
  const withoutLanguage = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  const slug = withoutLanguage.replace(/^\/+|\/+$/g, '')
  return pagesByLanguage[lang].find((page) => page.slug === slug)
}
