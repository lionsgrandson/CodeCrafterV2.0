import type { SeoPage } from './seoPages'
import type { Language } from './seoRoutes'

const he: SeoPage = {
  kind: 'service',
  slug: 'locations',
  title: 'אזורי שירות לפיתוח אתרים ומערכות בישראל | CodeCrafter',
  description: 'אזורי השירות של CodeCrafter בישראל: תל אביב, חיפה, ירושלים, באר שבע וכרמיאל, עם פירוט ברור של עבודה פנים אל פנים, מרחוק או בשילוב.',
  eyebrow: 'אזורי שירות',
  h1: 'איפה CodeCrafter עובדת עם עסקים בישראל',
  intro: [
    'CodeCrafter Moshe Schwartzberg פועלת כעסק נותן שירות ולא מציגה סניפים או כתובות משרד שלא קיימים. במקום עמודי עיר גנריים, כל אזור מתאר את מודל העבודה שנמסר בפועל.',
    'השירותים כוללים אתרים, מערכות, CRM, CMS, אוטומציות, אינטגרציות ואפליקציות. ההבדל בין האזורים הוא אופן העבודה: פגישה פנים אל פנים, עבודה מרחוק או שילוב של השניים.',
  ],
  sections: [
    {
      heading: 'תל אביב',
      paragraphs: ['בתל אביב ניתן לתאם פגישות פנים אל פנים לפי צורך וזמינות. CodeCrafter נשארת עסק נותן שירות ללא כתובת משרד לקוחות ציבורית.'],
    },
    {
      heading: 'חיפה',
      paragraphs: ['השירות לעסקים בחיפה ניתן מרחוק, כולל אפיון, פיתוח, גרסאות בדיקה ומשוב.'],
    },
    {
      heading: 'ירושלים',
      paragraphs: ['בירושלים אפשר לשלב פגישות פנים אל פנים עם עבודה מרחוק לאורך הפרויקט.'],
    },
    {
      heading: 'באר שבע',
      paragraphs: ['השירות לעסקים בבאר שבע ניתן מרחוק.'],
    },
    {
      heading: 'כרמיאל',
      paragraphs: ['בכרמיאל אפשר לעבוד גם בפגישות פנים אל פנים לפי תיאום וגם מרחוק.'],
    },
    {
      heading: 'לקוחות מחוץ לישראל',
      paragraphs: ['ל CodeCrafter היו לקוחות גם בבריטניה ובארצות הברית. הנתון מוצג כהיסטוריית לקוחות ולא כהבטחה לנוכחות פיזית או אזור שירות מקומי במדינות האלה.'],
    },
  ],
  faq: [
    { question: 'האם CodeCrafter היא עסק עם סניפים?', answer: 'לא. CodeCrafter פועלת כעסק נותן שירות. עמודי המיקום מתארים זמינות לפגישה או עבודה מרחוק ולא כתובות משרד.' },
    { question: 'איפה אפשר להיפגש פנים אל פנים?', answer: 'לפי המידע הנוכחי ניתן לתאם פגישות בתל אביב, ירושלים וכרמיאל.' },
    { question: 'איפה השירות הוא מרחוק?', answer: 'חיפה ובאר שבע מוגדרות כרגע כשירות מרחוק. בירושלים ובכרמיאל אפשר גם לעבוד מרחוק.' },
  ],
  relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
}

const en: SeoPage = {
  kind: 'service',
  slug: 'locations',
  title: 'Web Development Service Areas in Israel | CodeCrafter',
  description: 'CodeCrafter service areas in Israel: Tel Aviv, Haifa, Jerusalem, Beer Sheva, and Karmiel, with clear information about in person and remote delivery.',
  eyebrow: 'Service areas',
  h1: 'Where CodeCrafter works with businesses in Israel',
  intro: [
    'CodeCrafter Moshe Schwartzberg operates as a service area business and does not claim branches or office addresses that do not exist. Each local page describes the delivery model that was actually provided.',
    'Services include websites, custom systems, CRM, CMS, automation, integrations, and apps. The local difference is whether work is available in person, remotely, or through both modes.',
  ],
  sections: [
    { heading: 'Tel Aviv', paragraphs: ['In person meetings can be arranged in Tel Aviv when useful. CodeCrafter remains a service area business without a published client office address.'] },
    { heading: 'Haifa', paragraphs: ['Service for Haifa businesses is remote, including discovery, development, test versions, and feedback.'] },
    { heading: 'Jerusalem', paragraphs: ['Jerusalem projects can combine arranged in person meetings with remote delivery.'] },
    { heading: 'Beer Sheva', paragraphs: ['Service for Beer Sheva businesses is remote.'] },
    { heading: 'Karmiel', paragraphs: ['Karmiel projects can use both arranged in person meetings and remote delivery.'] },
    { heading: 'Clients outside Israel', paragraphs: ['CodeCrafter has also had clients in the United Kingdom and the United States. This is presented as client history, not as a claim of a physical location in those countries.'] },
  ],
  faq: [
    { question: 'Does CodeCrafter operate branches?', answer: 'No. CodeCrafter is a service area business. Local pages describe meeting and remote delivery availability rather than office addresses.' },
    { question: 'Where are in person meetings available?', answer: 'Based on the current service information, meetings can be arranged in Tel Aviv, Jerusalem, and Karmiel.' },
    { question: 'Which areas are served remotely?', answer: 'Haifa and Beer Sheva are currently remote. Jerusalem and Karmiel can also be served remotely.' },
  ],
  relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
}

export const locationHubByLanguage: Record<Language, SeoPage[]> = { he: [he], en: [en] }
