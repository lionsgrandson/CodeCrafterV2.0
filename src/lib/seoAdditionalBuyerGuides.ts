import type { Language, SeoPage, PageSection, FaqItem } from './seoPages'

// Questions and checklists specific to each remaining service. These supplement
// the pre-existing, human-readable page copy; they are not duplicate landing pages.
type Guide = { sections: PageSection[]; faq: FaqItem[] }
const he: Record<string, Guide> = {
  'app-development': {
    sections: [{ heading: 'מה נדרש לפני שמתחילים לפתח אפליקציה', items: ['מי ישתמש בה ומה הפעולה החשובה ביותר בכל שימוש', 'האם נדרשים מצלמה, מיקום, התראות או עבודה ללא חיבור', 'אילו נתונים נשמרים במכשיר ואילו בשרת', 'איך מתנהלים הרשמה, הרשאות, מחיקת חשבון וגיבוי', 'מי מחזיק בחשבונות ההפצה ל-Android ול-iOS'] }],
    faq: [{ question: 'צריך אפליקציה מותקנת או שאפשר להשתמש ב-Web App?', answer: 'אם רוב הפעולות מתבצעות בדפדפן ואין תלות חזקה בפיצ׳רים של המכשיר, Web App עשוי להספיק. הדרישות להתראות, עבודה לא מקוונת והפצה בחנויות נבדקות לפני שמחליטים.' }],
  },
  'cms-development': {
    sections: [{ heading: 'איך נראה אפיון של מערכת ניהול תוכן', items: ['סוגי התוכן והשדות הנדרשים לכל סוג', 'מי עורך, מי מאשר ומי רשאי לפרסם', 'צורכי עברית ואנגלית, כתובות ותמונות לכל שפה', 'גרסאות, תצוגה מקדימה ושחזור תוכן', 'כיצד האתר או האפליקציה קוראים את התוכן'] }],
    faq: [{ question: 'מתי כדאי לבחור CMS מותאם ולא WordPress?', answer: 'כאשר המידע מובנה מאוד, נדרשות הרשאות ותהליכי פרסום מיוחדים או שיש כמה אפליקציות שצורכות את אותו תוכן. אם אתר רגיל ותוספים מתאימים לצורך, פתרון קיים עשוי להיות פשוט וזול יותר.' }],
  },
  'business-bots': {
    sections: [{ heading: 'בדיקות לפני חיבור בוט ללקוחות', items: ['מה הבוט רשאי לענות ללא אישור אנושי', 'איזה מידע אישי הוא מקבל והיכן נשמרת השיחה', 'מתי הוא מפנה לנציג ולא ממציא תשובה', 'מה קורה כאשר API או ערוץ השיחה לא זמינים', 'איך בודקים פעולה בעלת משמעות לפני ביצועה'] }],
    faq: [{ question: 'האם בוט AI יכול לבצע פעולות במערכות העסק?', answer: 'רק דרך ממשקים מורשים ובכפוף להרשאות מוגדרות, אימות נתונים ובקרות מתאימות. בפעולות רגישות נדרש לעיתים אישור אנושי. אין להסתמך על טקסט שהמשתמש כתב כתחליף להרשאה.' }],
  },
  'erp-development': {
    sections: [{ heading: 'לפני שמתחילים מערכת ERP מותאמת', items: ['למפות את המחלקות והתהליכים שצריכים נתונים משותפים', 'לקבוע מקור אמת ללקוחות, מוצרים והזמנות', 'להגדיר מודולים שיכולים להיכנס לגרסה הראשונה', 'לבדוק איזה רכיב מחייב תוכנה מוסמכת או ספק חיצוני', 'להגדיר הסבת מידע, הרשאות, בדיקות ותוכנית השקה'] }],
    faq: [{ question: 'האם פיתוח ERP מחליף מערכת הנהלת חשבונות?', answer: 'לא בהכרח. חשבונאות, מס, תלושי שכר ודיווח רגולטורי עשויים לחייב מערכת מאושרת ושילוב עם ספק קיים. קובעים את גבולות המערכת לפני התכנון.' }],
  },
  'inventory-systems': {
    sections: [{ heading: 'בדיקות לפני מערכת ניהול מלאי ומחסן', items: ['מק״ט (SKU) ומזהה יציב לכל מוצר ווריאציה', 'הגדרת מחסנים, מיקומים והרשאות לתנועות', 'טיפול בקבלה, העברה, החזרה וספירה', 'כללי מניעת מלאי שלילי וכפילויות תנועה', 'סנכרון הזמנות ומלאי עם החנות ומערכת התפעול'] }],
    faq: [{ question: 'איך מונעים הפרשי מלאי בין החנות למחסן?', answer: 'מגדירים מערכת מקור לכל שינוי, מזהי תנועה חד-משמעיים, רישום שינויים ובדיקת התאמה תקופתית. כאשר חיבור נכשל נדרשים ניסיונות חוזרים והתראה, לא עדכון כמות ללא בקרה.' }],
  },
  'business-portals': {
    sections: [{ heading: 'מה חשוב לתכנן בפורטל לקוחות או עובדים', items: ['מי יכול לראות כל מסמך ורשומה', 'איך מתבצעת התחברות ואיפוס גישה', 'אילו פעולות המשתמש יכול לבצע בעצמו', 'איך מציגים שגיאה או בקשה שממתינה לאישור', 'אילו הודעות ונתונים נשלחים למערכות קיימות'] }],
    faq: [{ question: 'איך מונעים ממשתמש אחד לצפות במידע של משתמש אחר?', answer: 'אוכפים הרשאות ברמת השרת לכל קריאת נתונים ופעולה, בודקים מזהי משאבים ולא מסתפקים בהסתרת כפתורים או בהגנות של הממשק.' }],
  },
  'web-app-development': {
    sections: [{ heading: 'איך בוחרים ארכיטקטורה ל-Web App', items: ['מסכים ותפקידים שצריכים גישה שונה', 'גודל המידע ואופן החיפוש והסינון', 'דרישות מהירות ופעולות שחייבות לעבוד בשרת', 'ניהול Session, אימות והרשאות', 'תמיכה בטלפון, עבודה לא מקוונת ובדיקות'] }],
    faq: [{ question: 'האם Web App יכול לעבוד גם בטלפון?', answer: 'כן, כאשר מתכננים ממשק רספונסיבי ותהליכים שמתאימים למסך מגע. אם נדרשת גישה מיוחדת לרכיבי המכשיר, בודקים אם הדפדפן מספיק או שיש צורך באפליקציה מותקנת.' }],
  },
  'api-development': {
    sections: [{ heading: 'תכולה של API שמיועד לשימוש אמיתי', items: ['גרסת API, תיעוד בקשות ותשובות', 'אימות משתמשים והרשאות לפי פעולה', 'ולידציה ומבנה שגיאות עקבי', 'מגבלות קצב, ניטור ויומן אירועים שאינו חושף סודות', 'ניסיונות חוזרים ופעולות בטוחות מפני כפילות'] }],
    faq: [{ question: 'מה צריך לתת למערכת חיצונית כדי שתתחבר ל-API?', answer: 'תיעוד נתיבים, דוגמאות נתונים, סביבת בדיקה ואופן אימות מורשה. מפתחות וסודות נמסרים בערוץ מאובטח ולא מוטמעים בקוד שחשוף לדפדפן.' }],
  },
  'crm-integrations': {
    sections: [{ heading: 'איך מגדירים חיבור CRM תקין', items: ['מקור אמת לשדות בכל מערכת', 'מיפוי מזהי לידים, אנשי קשר ועסקאות', 'כללי יצירה לעומת עדכון רשומה', 'היסטוריית שגיאות ותור ניסיונות חוזרים', 'בדיקה שמידע לא נעלם ולא נוצר פעמיים'] }],
    faq: [{ question: 'איך יודעים שהטופס באתר באמת הגיע ל-CRM?', answer: 'בודקים אישור קבלה תקין, שומרים מזהה פעולה, מנטרים שגיאות ומשווים בין פניות שנקלטו לבין רשומות שנוצרו. הודעת הצלחה באתר לבדה אינה ראיה שהסנכרון הסתיים.' }],
  },
  'crm-migration': {
    sections: [{ heading: 'מה צריך לקבל לפני מיגרציית CRM', items: ['ייצוא מלא והגדרת שדות חסרים', 'מפתח זיהוי לרשומות ושיטות לטיפול בכפילויות', 'מיפוי בעלי רשומה, סטטוסים וקשרים', 'בדיקות מדגם ואישורי משתמשים', 'גיבוי ותוכנית חזרה במקרה שהמעבר נכשל'] }],
    faq: [{ question: 'האם אפשר להעביר הכול ממערכת CRM ישנה?', answer: 'רק מה שניתן לייצא או לקרוא באופן מורשה. בודקים בנפרד הערות, קבצים, היסטוריית שינויים, שדות מותאמים והרשאות כדי לא להבטיח העברה שאינה אפשרית.' }],
  },
  'wix-development': {
    sections: [{ heading: 'מתי לשפר Wix ומתי לשקול מעבר', items: ['מה אפשר לבצע במערכת הקיימת בלי כתיבת קוד חדש', 'מהירות, ניווט, תצוגת מובייל וטפסים', 'מגבלות אפשריות של API, עיצוב ותהליכי קנייה', 'בעלות על הדומיין, התוכן והאנליטיקה', 'שמירת כתובות קיימות והפניות אם מחליפים פלטפורמה'] }],
    faq: [{ question: 'האם חייבים לעבור מ-Wix כדי לשפר SEO?', answer: 'לא. קודם בודקים איכות תוכן, כותרות, יכולת סריקה, ביצועים ונגישות לצד מגבלות המערכת. מעבר פלטפורמה כדאי רק אם יש צורך שהאתר הקיים אינו יכול לספק באופן סביר.' }],
  },
  'website-maintenance': {
    sections: [{ heading: 'מה לכלול בהסכם תחזוקה לאתר', items: ['רשימת עדכונים שגרתיים ותדירות', 'גיבוי, בדיקת שחזור ותקופת שמירה', 'התראות על שגיאות, אבטחה וזמינות', 'זמן טיפול מוסכם לפי חומרת תקלה', 'אחריות לתוכן, דומיין, אחסון וספקי צד שלישי'] }],
    faq: [{ question: 'האם גיבוי בלבד מספיק לתחזוקת אתר?', answer: 'לא. צריך לדעת שניתן לשחזר אותו בפועל, ולעקוב גם אחרי עדכונים, טפסים, תוקף שירותים, זמינות האתר ותקלות אבטחה בהתאם להסכם.' }],
  },
  'landing-page-development': {
    sections: [{ heading: 'מה הופך דף נחיתה לבר-מדידה', items: ['הצעה אחת וקהל יעד מוגדר', 'כותרת שמסבירה את הערך ללא הבטחות שלא ניתן לבסס', 'פעולת קשר אחת ברורה ותצוגת מובייל', 'בדיקת טפסים ואישורי קבלה אמיתיים', 'מדידת פניות והסכמות פרטיות לפי הצורך'] }],
    faq: [{ question: 'מה ההבדל בין דף נחיתה לעמוד שירות באתר?', answer: 'דף נחיתה ממוקד בפעולה אחת ומקור תנועה מוגדר. עמוד שירות באתר נדרש בדרך כלל להסביר את ההקשר הרחב יותר, לקשר לשירותים סמוכים ולהתאים גם לשאלות חיפוש אורגניות.' }],
  },
}
const en: Record<string, Guide> = {
  'app-development': {
    sections: [{ heading: 'Before building a business app', items: ['Who uses it and the main action in each session', 'Whether camera, location, notifications, or offline access are needed', 'Which data stays on the device and which is stored on the server', 'Account registration, authorization, deletion, and backups', 'Who owns the Android and iOS developer accounts'] }],
    faq: [{ question: 'Do we need an installed app or would a web app work?', answer: 'A web app may be enough when most tasks work in a browser. Notification, offline, device-feature, and app-store requirements should be checked before selecting the platform.' }],
  },
  'cms-development': {
    sections: [{ heading: 'What to specify for a content management system', items: ['Content types and their required fields', 'Who edits, approves, and publishes', 'Hebrew/English content, URLs, and images', 'Revision history, previews, and recovery', 'How websites or apps fetch the content'] }],
    faq: [{ question: 'When should a business choose custom CMS over WordPress?', answer: 'When content is highly structured, publication permissions are unusual, or several applications consume the same content. If a standard website and supported extensions fit, an existing CMS may be simpler.' }],
  },
  'business-bots': {
    sections: [{ heading: 'Checks before connecting a bot to customers', items: ['What it can answer without human approval', 'Which personal data it receives and where conversations are stored', 'When it hands off instead of guessing', 'What happens when the channel or API is unavailable', 'How consequential actions are confirmed'] }],
    faq: [{ question: 'Can an AI bot change business records?', answer: 'Only through authorized APIs with explicit access controls, data validation, and appropriate safeguards. Sensitive actions may need human approval. Chat messages do not grant permission.' }],
  },
  'erp-development': {
    sections: [{ heading: 'Define ERP scope before development', items: ['Departments and workflows that need shared data', 'Systems of record for customers, products, and orders', 'Modules that belong in the first release', 'Functions that require certified external software', 'Data migration, access permissions, testing, and rollout'] }],
    faq: [{ question: 'Does a custom ERP replace accounting software?', answer: 'Not necessarily. Accounting, tax, payroll, and statutory reporting may require certified systems and approved integrations. Define the boundary before development.' }],
  },
  'inventory-systems': {
    sections: [{ heading: 'Inventory management requirements to clarify', items: ['Stable SKUs for each product and variant', 'Warehouses, locations, and transfer permissions', 'Receiving, moving, returning, and counting stock', 'Policies for negative stock and duplicate movements', 'Orders and stock synchronization with stores and ERP'] }],
    faq: [{ question: 'How can a store and warehouse avoid inventory discrepancies?', answer: 'Agree on a system of record, unique movement IDs, audit history, and scheduled reconciliation. Failed integrations require retries and alerts rather than silently changing quantities.' }],
  },
  'business-portals': {
    sections: [{ heading: 'What a customer or employee portal must define', items: ['Who can access each document and record', 'Sign-in and account recovery', 'Self-service actions', 'Approval and error states', 'Notifications and transfers to existing systems'] }],
    faq: [{ question: 'How do you prevent one customer from seeing another customer’s data?', answer: 'Enforce record- and action-level authorization on the server for every request, including direct resource URLs. Hiding UI controls is not sufficient.' }],
  },
  'web-app-development': {
    sections: [{ heading: 'Questions before designing a web application', items: ['Screens and roles with different permissions', 'Data volume, search, and filtering', 'Operations that must run on the server', 'Authentication and session management', 'Mobile, offline, and test requirements'] }],
    faq: [{ question: 'Can a web application work properly on a phone?', answer: 'Yes, when responsive interaction and touch-friendly workflows are designed deliberately. Special device integrations may require checking browser capabilities or an installed app.' }],
  },
  'api-development': {
    sections: [{ heading: 'What a usable production API includes', items: ['Versioned endpoints and request/response documentation', 'Authentication and action-level authorization', 'Validation and consistent error responses', 'Rate limits, monitoring, and privacy-aware logging', 'Retries and operations safe from duplicate processing'] }],
    faq: [{ question: 'What does another system need to integrate with an API?', answer: 'Documented endpoints, sample payloads, a test environment, and authorized authentication. Secrets should be exchanged securely and never embedded in client-side code.' }],
  },
  'crm-integrations': {
    sections: [{ heading: 'Define a reliable CRM connection', items: ['Which system owns each field', 'Mapping lead, contact, and opportunity identifiers', 'Create-versus-update behavior', 'Error history and durable retries', 'Reconciliation so records are neither lost nor duplicated'] }],
    faq: [{ question: 'How can we verify a web form actually reached the CRM?', answer: 'Use an accepted delivery acknowledgement, retain an operation ID, monitor failures, and reconcile submissions with created records. A success message in the browser alone is not proof of a completed synchronization.' }],
  },
  'crm-migration': {
    sections: [{ heading: 'What to collect before a CRM migration', items: ['Complete export and missing-field assessment', 'Stable keys and deduplication rules', 'Owners, statuses, and record relationships', 'Sample tests and user approval', 'Backup and rollback plan'] }],
    faq: [{ question: 'Can every field be migrated from an old CRM?', answer: 'Only data that the platform makes available through authorized exports or APIs. Notes, attachments, change history, custom fields, and permissions must be checked separately.' }],
  },
  'wix-development': {
    sections: [{ heading: 'Improve Wix or migrate: what to assess', items: ['What the existing Wix setup already supports', 'Page speed, navigation, mobile layout, and forms', 'API and commerce limitations', 'Ownership of domain, content, and analytics', 'Existing URLs and redirect mapping for migrations'] }],
    faq: [{ question: 'Do we have to leave Wix to improve SEO?', answer: 'No. Audit content quality, titles, crawlability, performance, and accessibility first. A migration is warranted only if an important requirement cannot reasonably be met on the current platform.' }],
  },
  'website-maintenance': {
    sections: [{ heading: 'What to include in a maintenance agreement', items: ['Routine updates and frequency', 'Backups, test restores, and retention period', 'Availability, security, and error alerts', 'Agreed incident response expectations', 'Ownership of content, domain, hosting, and external providers'] }],
    faq: [{ question: 'Is having a backup enough to maintain a website?', answer: 'No. The backup must be restorable, while updates, forms, service expiry, site availability, and security issues also need attention under the agreed scope.' }],
  },
  'landing-page-development': {
    sections: [{ heading: 'What makes a landing page measurable', items: ['One offer and a clearly defined audience', 'A factual, specific headline', 'An obvious mobile-friendly contact action', 'Working forms with verified delivery acknowledgement', 'Relevant conversion and privacy-consent measurement'] }],
    faq: [{ question: 'What is the difference between a landing page and a service page?', answer: 'A landing page is focused on a particular offer and acquisition source. A service page usually covers more context, related services, and the questions people ask when searching organically.' }],
  },
}

export function addAdditionalBuyerGuides(page: SeoPage, lang: Language): SeoPage {
  if (page.kind !== 'service') return page
  const guide = (lang === 'he' ? he : en)[page.slug]
  if (!guide) return page
  const existingQuestions = new Set(page.faq?.map((entry) => entry.question) ?? [])
  return {
    ...page,
    sections: [...page.sections, ...guide.sections],
    faq: [...(page.faq ?? []), ...guide.faq.filter((entry) => !existingQuestions.has(entry.question))],
  }
}
