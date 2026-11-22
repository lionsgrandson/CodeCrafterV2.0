import type { FaqItem, Language, PageSection, SeoPage } from './seoPages'

// Editorial additions to existing intent owners. These answer real pre-purchase
// questions without publishing thin, competing URL variants or unverified claims.
type Guide = { sections: PageSection[]; faq: FaqItem[] }
const guides: Record<Language, Record<string, Guide>> = {
  he: {
    websites: {
      sections: [{
        heading: 'מה לבדוק לפני שמזמינים אתר לעסק',
        items: [
          'קהל היעד, השירות המרכזי והפעולה שהמבקר צריך לבצע',
          'מי מספק טקסטים, תמונות, זכויות שימוש ואישורים',
          'כתובות קיימות, הפניות 301 ועמודים שאסור לאבד במעבר',
          'מה נמדד כשליד פונה ומה נדרש מבחינת פרטיות והסכמה',
          'שדות עריכה, אחריות לתחזוקה, גיבויים והרשאות',
        ],
      }],
      faq: [
        { question: 'האם אתר חדש מבטיח הופעה במקום הראשון בגוגל או בתשובות AI?', answer: 'לא. מבנה סמנטי, תוכן מועיל, טעינה תקינה ויכולת סריקה הם תשתית. מיקום בגוגל והפניה מצד מערכות AI תלויים גם בהתאמה לשאלה, בתחרות ובמקורות אמינים שאינם בשליטת האתר.' },
        { question: 'איך שומרים על תנועה אורגנית כשמחליפים אתר?', answer: 'ממפים את הכתובות הישנות, שומרים כתובות חשובות ככל האפשר, מגדירים הפניות 301 כשצריך, מעבירים תוכן ותגיות, ומאמתים sitemap, canonical, hreflang ונתוני Search Console אחרי ההשקה.' },
      ],
    },
    'crm-development': {
      sections: [{
        heading: 'בדיקות חובה לפני שמחליפים או בונים CRM',
        items: [
          'מיפוי לידים, לקוחות, אנשי קשר, בעלות וסטטוסים במערכת המקור',
          'כלל אחיד לזיהוי רשומה ומניעת כפילויות בייבוא ובסנכרון',
          'הרשאות לפי תפקיד ופעולה, כולל בדיקה בצד השרת',
          'בדיקת ייבוא מדגם, גיבוי ומסלול חזרה לפני מעבר מלא',
          'הגדרת הדוחות והפעולות שהצוות צריך ביום העבודה',
        ],
      }],
      faq: [
        { question: 'איך מונעים כפילות של לקוחות אחרי ייבוא או חיבור למערכת אחרת?', answer: 'מגדירים מזהה יציב או כלל התאמה מוסכם, בודקים נתונים חריגים, ומבצעים עדכון בטוח של רשומה קיימת במקום יצירה עיוורת של רשומה חדשה. התאמה לפי שם בלבד אינה אמינה מספיק.' },
        { question: 'מה עושים כשסנכרון ה-CRM נכשל באמצע?', answer: 'מתעדים את שלב ההעברה, משתמשים בפעולות שניתן לנסות שוב בלי ליצור כפילות, ומגדירים תור ניסיונות חוזרים, התראה והשוואת רשומות לאחר התאוששות. אופן המימוש תלוי במערכות וב-API הקיימים.' },
      ],
    },
    integrations: {
      sections: [{
        heading: 'בדיקות אמינות לחיבור API בין מערכות',
        items: [
          'מקור האמת לכל שדה, מזהה הרשומה ותדירות העדכון',
          'בדיקות סוגים, שדות חובה, ערכים חסרים וגבולות גודל',
          'הצפנה בתעבורה, ניהול סודות והרשאות מצומצמות',
          'תור עמיד מחוץ לשירות שעלול להיות מושבת, ניסיונות חוזרים ו-Idempotency',
          'פורמט זמן עם היסט UTC או אזור זמן מפורש, כולל שעון קיץ',
          'התאמת כמויות וסיכומי רשומות, התראות ומסלול תיקון ידני',
        ],
      }],
      faq: [
        { question: 'מה קורה אם האינטרנט או מערכת היעד מתנתקים באמצע העברת נתונים?', answer: 'צריך לתכנן שמירה עמידה של הפעולה לפני אישור, ניסיונות חוזרים מבוקרים ומפתח Idempotency למניעת כפילות. אי אפשר להבטיח שלא יאבד מידע בלי להגדיר גם מקור אמת, אישורי קבלה ובדיקת התאמה לאחר חיבור מחדש.' },
        { question: 'איך מטפלים בתאריכים עם הפרשי שעות או שעון קיץ?', answer: 'מעבירים חותמות זמן עם Offset מפורש או ב-UTC ומגדירים כיצד זמן מקומי מוצג ונשמר. דוחים או מסמנים חותמות זמן לא חד-משמעיות, ובודקים מקרים סביב מעבר לשעון קיץ.' },
      ],
    },
    automation: {
      sections: [{
        heading: 'לפני שמפעילים אוטומציה על מידע אמיתי',
        items: [
          'הגדרת טריגר, תנאי עצירה ופעולה צפויה לכל מצב',
          'בדיקת הרשאות, מידע רגיש ותיעוד פעולות',
          'טיפול בהודעות כפולות, כשל זמני ומגבלת בקשות של ספק',
          'בדיקת מסלול ידני כאשר האוטומציה אינה זמינה',
          'הגדרת ניטור, התראות ובעל תפקיד שמטפל בכשל',
        ],
      }],
      faq: [
        { question: 'אם שירות חיצוני לא זמין, האם האוטומציה מאבדת את הבקשה?', answer: 'לא חייבים לאבד אותה: אפשר להשתמש בתור עמיד, להגביל ניסיונות חוזרים ולשלוח התראה. מימוש אמין מחייב לדעת היכן נשמרת הבקשה ומה קורה כאשר גם מערכת האחסון עצמה מושבתת.' },
        { question: 'האם כל אוטומציה צריכה AI?', answer: 'לא. כאשר התנאים ידועים, חוקים דטרמיניסטיים בדרך כלל פשוטים יותר לבדיקה, לתחזוקה ולבקרה. משתמשים ב-AI כשהמשימה דורשת פירוש או יצירה ומוסיפים אימות אנושי כשיש סיכון.' },
      ],
    },
    'custom-software': {
      sections: [{
        heading: 'מה להכין להצעת מחיר לפיתוח מערכת',
        items: [
          'מי המשתמשים, התפקידים וההרשאות שלהם',
          'שלוש עד חמש פעולות ליבה שהמערכת חייבת לאפשר',
          'דוגמאות לקבצים, מסכים ודוחות קיימים ללא מידע אישי מיותר',
          'רשימת חיבורים, מערכות מקור והרשאות API זמינות',
          'דרישות גיבוי, תחזוקה, בעלות על קוד וקריטריוני קבלה',
        ],
      }],
      faq: [
        { question: 'איך מחליטים מה להכניס לגרסה הראשונה של מערכת?', answer: 'מגדירים תהליך אחד שלם שאפשר לבצע מתחילתו ועד סופו, את המשתמשים שלו ואת מדד ההצלחה. פונקציות שאינן חיוניות לתהליך הראשי נכנסות לרשימת המשך ולא מתערבבות באומדן הראשוני.' },
        { question: 'האם עדיף לפתח מערכת חדשה או להתאים כלי קיים?', answer: 'משווים עלות רישוי ותחזוקה, התאמה לתהליך, איכות API, ניידות נתונים והרשאות. פיתוח מותאם מוצדק כאשר ההבדל התפעולי משמעותי ולא ניתן לפתור אותו בהגדרה או באינטגרציה פשוטה.' },
      ],
    },
    'ecommerce-development': {
      sections: [{
        heading: 'הכנות למעבר חנות בין פלטפורמות',
        items: [
          'ייצוא מוצרים הכולל וריאציות, מחירים, מלאי, SKU ותמונות',
          'מיפוי קטגוריות, כתובות מוצרים והפניות 301',
          'בדיקת מסים, מטבעות, משלוח, תשלום והודעות הזמנה',
          'ייבוא מדגם ובדיקת קנייה מלאה לפני מעבר',
          'הפרדת חשבונות והרשאות ומעקב אחרי שינויי מלאי',
        ],
      }],
      faq: [
        { question: 'האם קובץ CSV של WooCommerce מספיק למעבר ל-Shopify?', answer: 'לא תמיד. צריך לבדוק אם הייצוא כולל את כל הווריאציות, התמונות, המאפיינים, ה-SKU, המלאי והשדות המותאמים, ולמפות אותם לפורמט היעד. שדות חסרים מחייבים השלמה או מיגרציה נפרדת.' },
      ],
    },
    'shopify-development': {
      sections: [{
        heading: 'מה צריך לסגור לפני פיתוח חנות Shopify',
        items: [
          'מבנה קטלוג, וריאציות ומקור נתוני מוצרים',
          'יכולות תבנית לעומת קוד מותאם ואפליקציות צד שלישי',
          'צרכי סליקה, מסים, משלוחים והודעות ללקוח',
          'מיפוי הפניות ומעקב SEO אם עוברים מפלטפורמה אחרת',
        ],
      }],
      faq: [
        { question: 'מה ההבדל בין הקמת Shopify לבין העברה מלאה של חנות קיימת?', answer: 'הקמה יכולה להתחיל מקטלוג ותבנית חדשים. מעבר מלא מוסיף מיפוי מוצרים, וריאציות, תמונות, כתובות, הפניות, הזמנות ומערכות חיצוניות לפי היקף והגבלות הייצוא.' },
      ],
    },
    'wordpress-development': {
      sections: [{
        heading: 'בדיקות WordPress לפני עלייה לאוויר',
        items: [
          'גיבוי תקין ושחזור ניסיוני בסביבה נפרדת',
          'מפת הפניות, sitemap, robots ו-canonical',
          'בדיקות ביצועים, מובייל ונגישות בדפים מרכזיים',
          'תאימות עדכוני תוספים, תבנית וגרסת PHP',
          'אבטחת משתמשי ניהול, הרשאות ותוספים נחוצים בלבד',
        ],
      }],
      faq: [
        { question: 'האם התקנת Yoast או תוסף SEO אחר מספיקה כדי להתקדם בגוגל?', answer: 'לא. תוסף יכול לעזור בניהול metadata, sitemap והגדרות אינדוקס, אבל הוא אינו מחליף תוכן מועיל, מבנה תקין, קישורים אמינים ותחזוקת אתר.' },
      ],
    },
  },
  en: {
    websites: {
      sections: [{
        heading: 'Checklist before commissioning a business website',
        items: [
          'Target audience, key service, and the action visitors should take',
          'Who supplies copy, images, permissions, and usage rights',
          'Existing URLs, 301 redirects, and pages that must survive migration',
          'Lead tracking, privacy disclosures, and consent requirements',
          'Editorial access, maintenance responsibility, backups, and permissions',
        ],
      }],
      faq: [
        { question: 'Will a new site guarantee first place on Google or an AI recommendation?', answer: 'No. Semantic HTML, useful content, crawlability, and performance provide a foundation, not a guaranteed ranking or citation. Relevance, competition, and independent sources also matter.' },
        { question: 'How do you protect organic traffic during a website migration?', answer: 'Inventory old URLs, preserve important paths where possible, use 301 redirects when needed, carry over relevant content and metadata, and verify the sitemap, canonicals, language alternates, and Search Console after launch.' },
      ],
    },
    'crm-development': {
      sections: [{
        heading: 'Checks before replacing or building a CRM',
        items: [
          'Map leads, customers, contacts, ownership, and statuses in the source',
          'Agree on stable record identity and deduplication rules',
          'Enforce role and action permissions on the server',
          'Test sample imports, backups, and rollback before full migration',
          'Define the reports and daily actions the team actually needs',
        ],
      }],
      faq: [
        { question: 'How do you prevent duplicate customers after imports or sync?', answer: 'Use stable identifiers or an agreed matching rule, review ambiguous records, and update existing records safely rather than blindly inserting new ones. Names alone are not reliable unique keys.' },
        { question: 'What happens when a CRM sync fails partway through?', answer: 'Record the transfer stage, make operations safe to retry, and plan durable retries, alerts, and reconciliation after recovery. The exact approach depends on the systems and their APIs.' },
      ],
    },
    integrations: {
      sections: [{
        heading: 'Reliability checklist for system-to-system APIs',
        items: [
          'System of record, stable keys, and expected synchronization frequency',
          'Data types, required fields, missing values, and payload size limits',
          'Encryption in transit, secret management, and least-privilege access',
          'Durable queue outside the unavailable destination, bounded retries, and idempotency',
          'Timestamps with explicit offsets or UTC, including daylight-saving boundaries',
          'Reconciliation totals, monitoring, alerts, and a manual recovery path',
        ],
      }],
      faq: [
        { question: 'What if the internet or destination disconnects during a transfer?', answer: 'Design durable storage before acknowledging the operation, bounded retries, and idempotency keys. Avoid promising zero data loss without defining the system of record, acknowledgements, and post-recovery reconciliation.' },
        { question: 'How do you handle different time zones and daylight saving?', answer: 'Exchange timestamps with explicit offsets or UTC and define local-time display and storage rules. Flag ambiguous timestamps and test cases across daylight-saving transitions.' },
      ],
    },
    automation: {
      sections: [{
        heading: 'Checks before automating real business data',
        items: [
          'Triggers, stopping conditions, and expected actions for each state',
          'Permissions, sensitive information, and audit trails',
          'Duplicate events, temporary failures, and provider rate limits',
          'A manual recovery process when the automation is unavailable',
          'Monitoring, alerts, and a named person responsible for failures',
        ],
      }],
      faq: [
        { question: 'Does an automation lose requests when a third-party service goes down?', answer: 'Not necessarily. Durable queues, bounded retries, and alerts can make failures recoverable. Reliable design also considers what happens when the queue storage itself becomes unavailable.' },
        { question: 'Does every business automation need AI?', answer: 'No. For well-defined rules, deterministic workflows are generally easier to test, maintain, and audit. Use AI where interpretation or generation adds value and introduce human review for consequential decisions.' },
      ],
    },
    'custom-software': {
      sections: [{
        heading: 'What to prepare for a custom software estimate',
        items: [
          'Who will use the system and what each role can access',
          'Three to five core actions that the system must support',
          'Representative screens, reports, and files with unnecessary personal data removed',
          'Existing systems, integration needs, and available API permissions',
          'Backup, maintenance, code ownership, and acceptance requirements',
        ],
      }],
      faq: [
        { question: 'How should the first release of a custom system be scoped?', answer: 'Choose one complete business flow, its users, and a measurable acceptance criterion. Keep nonessential functions in a separate backlog rather than hiding them in the initial estimate.' },
        { question: 'Should we build software or configure an existing platform?', answer: 'Compare subscription and maintenance cost, workflow fit, API quality, data portability, and permissions. Custom development makes sense when the operational gap is material and cannot be solved with straightforward configuration or integration.' },
      ],
    },
    'ecommerce-development': {
      sections: [{
        heading: 'Prepare for an ecommerce platform migration',
        items: [
          'Export products, variants, prices, stock, SKUs, and images',
          'Map categories, product URLs, and 301 redirects',
          'Test taxes, currency, shipping, checkout, and order emails',
          'Run sample imports and a full purchase flow before switching',
          'Separate account permissions and reconcile stock updates',
        ],
      }],
      faq: [
        { question: 'Is a WooCommerce CSV enough for a Shopify migration?', answer: 'Not always. Verify whether the export includes variants, photos, attributes, SKUs, inventory, and custom fields, and map each one to the destination format. Missing fields need additional extraction or separate migration work.' },
      ],
    },
    'shopify-development': {
      sections: [{
        heading: 'Define these details before starting a Shopify store',
        items: [
          'Catalog structure, variants, and the source of product data',
          'Theme features versus custom code and third-party apps',
          'Payments, taxes, shipping, and customer notifications',
          'Redirect mapping and SEO tracking for migrations',
        ],
      }],
      faq: [
        { question: 'What is the difference between a new Shopify store and migrating one?', answer: 'A new setup starts from a catalog and theme. A full migration also requires mapping products, variants, images, URLs, redirects, orders, and connected systems where data exports permit it.' },
      ],
    },
    'wordpress-development': {
      sections: [{
        heading: 'WordPress checks before launch',
        items: [
          'A working backup and a test restore in a separate environment',
          'Redirect map, sitemap, robots instructions, and canonicals',
          'Performance, mobile, and accessibility checks on key pages',
          'Plugin, theme, and PHP compatibility checks',
          'Secured admin accounts, permissions, and minimal necessary plugins',
        ],
      }],
      faq: [
        { question: 'Is installing Yoast or another SEO plugin enough to rank?', answer: 'No. A plugin can manage metadata, sitemaps, and indexing settings, but cannot replace helpful content, a sound information architecture, credible references, and proper maintenance.' },
      ],
    },
  },
}

export function addPracticalSeoContent(page: SeoPage, lang: Language): SeoPage {
  const guide = page.kind === 'service' ? guides[lang][page.slug] : undefined
  if (!guide) return page
  const existingFaq = page.faq ?? []
  const existingQuestions = new Set(existingFaq.map((item) => item.question))
  return {
    ...page,
    sections: [...page.sections, ...guide.sections],
    faq: [...existingFaq, ...guide.faq.filter((item) => !existingQuestions.has(item.question))],
  }
}
