import type { Language, SeoPage } from './seoPages'
import { serviceSlugs } from './seoRoutes'

const he: SeoPage = {
  kind: 'service',
  slug: 'services',
  title: 'כל שירותי הפיתוח לעסקים | CodeCrafter',
  description: 'מרכז שירותי CodeCrafter: אתרים, CRM, ERP, אפליקציות מובייל, Web Apps, API, אוטומציות, אינטגרציות, ecommerce, CMS, פורטלים, מלאי ותחזוקה.',
  eyebrow: 'כל השירותים במקום אחד',
  h1: 'שירותי פיתוח לעסקים',
  intro: [
    'העמוד הזה מרכז את שירותי CodeCrafter בלי להעמיס את עמוד הבית. אפשר לעבור מכאן לשירות הראשי שמתאים לצורך, לשירותים משלימים ולמחירון המרכזי.',
    'אם עדיין לא ברור אם צריך אתר, CRM, ERP, אפליקציה, API או אוטומציה, מתחילים מהתהליך העסקי ומהמידע שצריך לנהל. עמודי השירות מסבירים את ההבדלים ואת החיבורים ביניהם.',
  ],
  sections: [
    { heading: 'נוכחות דיגיטלית ומכירה', items: ['אתרים ודפי נחיתה', 'חנויות ecommerce', 'Shopify', 'WordPress', 'Wix', 'תחזוקה ושיפור אתרים'] },
    { heading: 'מערכות ניהול ותפעול', items: ['CRM מותאם', 'ERP', 'מערכות מלאי ומחסנים', 'CMS', 'פורטלים עסקיים', 'Web Apps', 'תוכנה מותאמת'] },
    { heading: 'אפליקציות, API וחיבורים', items: ['אפליקציות מובייל', 'API ו Backend', 'אינטגרציות CRM', 'מיגרציית CRM', 'אינטגרציות בין מערכות', 'אוטומציות', 'בוטים עסקיים'] },
    { heading: 'איך לבחור', paragraphs: ['אתר מתאים להצגה, תוכן ושיווק. CRM מרכז קשרי לקוחות ומכירות. ERP מחבר כמה תחומי תפעול. Web App או תוכנה מותאמת מטפלים בתהליך ייעודי. אפליקציית מובייל מתאימה כאשר חוויית המכשיר, התראות או עבודה בשטח מרכזיות. API ואינטגרציות מחברים את המערכות כך שהמידע לא יעבור ידנית.'] },
  ],
  faq: [
    { question: 'איפה רואים מחירים?', answer: 'המחירון המרכזי מקושר מהעמוד הזה ומכל עמוד שירות. הוא מציג את המחירים והטווחים שפורסמו כרגע.' },
    { question: 'צריך לדעת מראש איזה שירות להזמין?', answer: 'לא. אפשר להתחיל מהבעיה העסקית ולבחור את הפתרון הקטן והברור ביותר שמתאים לתהליך.' },
    { question: 'אפשר לשלב כמה שירותים בפרויקט אחד?', answer: 'כן. לדוגמה אתר יכול להתחבר ל CRM, אוטומציה ו API, או ERP יכול להתחבר לפורטל, אפליקציה ומלאי. ההיקף מוגדר לפי הצורך בפועל.' },
  ],
  relatedServices: [...serviceSlugs],
}

const en: SeoPage = {
  kind: 'service',
  slug: 'services',
  title: 'Business Development Services | CodeCrafter',
  description: 'CodeCrafter service directory for websites, CRM, ERP, mobile apps, web apps, APIs, automation, integrations, ecommerce, CMS, portals, inventory systems, and maintenance.',
  eyebrow: 'All services in one place',
  h1: 'Development services for business',
  intro: [
    'This page brings CodeCrafter services together without adding more sections to the homepage. From here you can reach the primary service, supporting capabilities, and the central pricing guide.',
    'If it is not yet clear whether the business needs a website, CRM, ERP, app, API, or automation, start with the workflow and information that need to be managed. The service pages explain the differences and how the parts connect.',
  ],
  sections: [
    { heading: 'Digital presence and commerce', items: ['Websites and landing pages', 'Ecommerce stores', 'Shopify', 'WordPress', 'Wix', 'Website maintenance and improvement'] },
    { heading: 'Management and operational systems', items: ['Custom CRM', 'ERP', 'Inventory and warehouse systems', 'CMS', 'Business portals', 'Web apps', 'Custom software'] },
    { heading: 'Apps, APIs, and connections', items: ['Mobile apps', 'API and backend development', 'CRM integrations', 'CRM migration', 'Systems integration', 'Automation', 'Business bots'] },
    { heading: 'How to choose', paragraphs: ['A website is primarily for presentation, content, and marketing. CRM centralizes customer and sales work. ERP connects several operational areas. A web app or custom system handles a dedicated workflow. A mobile app fits when device experience, notifications, or field use are central. APIs and integrations connect these systems so data does not need to move manually.'] },
  ],
  faq: [
    { question: 'Where can I see prices?', answer: 'The central pricing guide is linked from this page and every service page. It contains the prices and guidance currently published.' },
    { question: 'Do I need to know which service to buy before contacting you?', answer: 'No. Start with the business problem and choose the smallest clear solution that fits the workflow.' },
    { question: 'Can several services be combined in one project?', answer: 'Yes. A website can connect to CRM, automation, and APIs, while an ERP can connect to a portal, app, and inventory workflow. Scope follows the actual requirement.' },
  ],
  relatedServices: [...serviceSlugs],
}

export const servicesHubByLanguage: Record<Language, SeoPage> = { he, en }
