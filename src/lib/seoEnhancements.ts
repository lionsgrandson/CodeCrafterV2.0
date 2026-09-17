import type { Language, PageSection, SeoPage } from './seoPages'

type Enhancement = {
  sections: PageSection[]
  relatedServices: string[]
}

const enhancements: Record<Language, Record<string, Enhancement>> = {
  he: {
    websites: {
      sections: [
        { heading: 'תוכן, CMS וחיבור לתפעול העסק', paragraphs: ['אתר יכול לכלול מערכת תוכן לעמודים, שירותים, מוצרים, קטלוגים, שאלות נפוצות ומאמרים, עם שדות SEO ותוכן רב-לשוני. כאשר האתר מחובר ל-CRM, ERP, חנות או מערכת הזמנות, מגדירים בעלות על הנתונים ותהליך אמין להעברת פניות, סטטוסים ומסמכים.'] },
        { heading: 'מעבר אתר ותחזוקה לאחר ההשקה', paragraphs: ['במעבר מאתר קיים שומרים כתובות חשובות או מגדירים הפניות מתאימות, מעבירים תוכן ומדידה ובודקים טפסים, אנליטיקה, אינדוקס וקישורים. תחזוקה יכולה לכלול עדכונים, גיבוי, ניטור ותיקונים בהתאם להסכם — בלי להבטיח דירוג או תוצאה עסקית קבועה.'] },
      ],
      relatedServices: ['cms-development', 'crm-development', 'erp-development', 'automation', 'integrations'],
    },
    'custom-software': {
      sections: [
        { heading: 'פרויקטים, שירות, הזמנות ודוחות', paragraphs: ['מערכת מותאמת יכולה לנהל פרויקטים, שלבים, משימות, קבצים, אישורים, קריאות שירות, הזמנות וסטטוסים כאשר אלה חלק מאותו תהליך. דשבורד תפעולי ודוחות מסוננים נשענים על הגדרות נתונים מוסכמות; לא מבטיחים מידע בזמן אמת אם המקור מתעדכן רק בסנכרון תקופתי.'] },
        { heading: 'מערכת ממוקדת או ERP', paragraphs: ['תוכנה מותאמת יכולה לפתור תהליך אחד או לבנות כלי פנימי ייעודי. ERP מתאים כאשר כמה מחלקות ומודולים צריכים לעבוד על נתונים משותפים. הבחירה אינה לפי שם מפוצץ אלא לפי גבולות המערכת, המשתמשים והבעלות על המידע.'] },
        { heading: 'מיגרציה, הרשאות ותחזוקה', paragraphs: ['לפני העברת מידע ממפים שדות, מנקים כפילויות ומבצעים ייבוא ניסיוני. מגדירים הרשאות לפי פעולה, תיעוד שינויים, גיבוי וטיפול בשגיאות. לאחר ההשקה ניתן להמשיך בניטור, עדכונים והרחבות לפי שימוש אמיתי.'] },
      ],
      relatedServices: ['erp-development', 'web-app-development', 'business-portals', 'inventory-systems', 'crm-development', 'automation', 'integrations'],
    },
    'crm-development': {
      sections: [
        { heading: 'מכירה, שירות ופעולות המשך', paragraphs: ['ה-CRM יכול לנהל מקור ליד, בעלים, שלב, משימה הבאה והיסטוריית קשר, ובהמשך גם קריאות שירות או חידוש. אוטומציות כמו שיוך, תזכורת והתראה מתאימות כאשר הכלל ברור; החלטות חריגות נשארות בידי הצוות.'] },
        { heading: 'CRM מול ERP ופורטל', paragraphs: ['CRM הוא בעל הבית של קשרי לקוחות ותהליך המכירה והשירות. ERP מחבר את הלקוח להזמנות, רכש, מלאי ופעילות רחבה יותר. פורטל מאפשר ללקוח לבצע פעולות ולראות מידע מורשה. במערכת משולבת מגדירים מקור אמת כדי לא ליצור שלושה עותקים של אותו לקוח.'] },
        { heading: 'העברת נתונים ואימוץ בצוות', paragraphs: ['מיגרציה מתחילה במיפוי שדות, כפילויות והרשאות. מסכים וקיצורי דרך מתוכננים סביב הפעולות היומיומיות, וההשקה יכולה להיות הדרגתית כדי לבדוק שהצוות מתעד מידע באופן עקבי.'] },
      ],
      relatedServices: ['erp-development', 'business-portals', 'automation', 'integrations', 'custom-software', 'app-development'],
    },
    'app-development': {
      sections: [
        { heading: 'אפליקציות ללקוחות, עובדים ואנשי שטח', paragraphs: ['האפליקציה יכולה לתמוך בהזמנה ובסטטוס ללקוח, טפסים ותיעוד לעובד, או עבודה בשטח עם צילום וקבצים. התחברות, חשבונות, תפקידים, התראות Push ושימוש במצלמה נכללים רק כאשר הם משרתים תרחיש מוגדר.'] },
        { heading: 'Backend, סנכרון ועבודה ללא רשת', paragraphs: ['רוב האפליקציות העסקיות דורשות שרת, בסיס נתונים ו-API. מגדירים מה קורה כאשר הרשת חלשה, אילו נתונים נשמרים מקומית ואיך פותרים התנגשות בסנכרון. עבודה מלאה Offline היא דרישה ארכיטקטונית נפרדת ולא הבטחה אוטומטית.'] },
        { heading: 'Mobile App לעומת Web App והפצה', paragraphs: ['Web App בדפדפן יכול להספיק למערכת ניהול או פורטל רספונסיבי. אפליקציה מותקנת מתאימה כאשר חוויית המכשיר, התראות, עבודה בשטח או הפצה בחנויות הן מרכזיות. במקרה של חנויות אפליקציות מתכננים גם חשבונות מפתחים, מדיניות, גרסאות ועדכונים.'] },
      ],
      relatedServices: ['web-app-development', 'business-portals', 'custom-software', 'crm-development', 'erp-development', 'integrations'],
    },
    'cms-development': {
      sections: [
        { heading: 'תוכן מובנה, רב-לשוני ו-SEO', paragraphs: ['במקום שדה טקסט אחד, אפשר להגדיר סוגי תוכן לעמודים, מוצרים, פרויקטים, שאלות נפוצות ומסמכים. לכל שפה ולכל עמוד ניתן לשמור כתובת, כותרת, תיאור, תמונה ושדות שיתוף, עם בדיקות שמונעות פרסום חסר.'] },
        { heading: 'טיוטות, אישורים וגרסאות', paragraphs: ['עורכים יכולים לעבוד בטיוטה, להעביר לאישור ולפרסם לפי הרשאה. היסטוריה וגרסאות מסייעות להבין מה השתנה ולהחזיר תוכן כשנדרש. עומק מנגנון האישור נקבע לפי מספר העורכים והסיכון.'] },
        { heading: 'CMS מול CRM ו-ERP', paragraphs: ['CMS מנהל תוכן שמיועד לפרסום או להצגה בממשקים. CRM מנהל קשרי לקוחות, ו-ERP מנהל תהליכים תפעוליים חוצי מחלקות. Headless CMS יכול לספק תוכן דרך API לאתר, אפליקציה או פורטל בלי להפוך למערכת התפעולית הראשית.'] },
      ],
      relatedServices: ['websites', 'business-portals', 'web-app-development', 'crm-development', 'erp-development'],
    },
    automation: {
      sections: [
        { heading: 'דוגמאות לזרימות עבודה', items: ['ליד חדש אל CRM ושיוך לבעלים', 'יצירת משימת המשך ותזכורת', 'אישור ושינוי סטטוס', 'עדכון לקוח לאחר שלב מוסכם', 'עיבוד הזמנה או מסמך', 'הפקת דוח מתוזמן', 'סנכרון נתונים והתראה על כשל', 'טריגר בין CRM, ERP, פורטל ואתר'] },
        { heading: 'אוטומציה אינה בהכרח AI', paragraphs: ['כאשר הכלל ידוע, תהליך דטרמיניסטי בדרך כלל קל יותר לבדיקה, להסבר ולבקרה. AI מתאים רק למשימות שבהן נדרש פירוש או יצירה ושבהן מוגדרים אימות, מגבלות ומעבר לאדם.'] },
        { heading: 'אמינות ותפעול לאורך זמן', paragraphs: ['אוטומציה טובה מתכננת אימות, מניעת כפילויות, ניסיונות חוזרים, לוגים, התראה ומסלול לטיפול ידני. שינוי API או הרשאה אצל ספק חיצוני הוא אירוע שצריך לנטר, לא תקלה שקטה.'] },
      ],
      relatedServices: ['crm-development', 'erp-development', 'integrations', 'custom-software', 'inventory-systems'],
    },
    integrations: {
      sections: [
        { heading: 'מקור אמת ותדירות סנכרון', paragraphs: ['לפני חיבור קובעים איזו מערכת מוסמכת ליצור ולעדכן כל סוג מידע. החיבור יכול להיות מיידי דרך Webhook, לפי בקשה ב-API או מתוזמן. אין לתאר מידע כזמן אמת כאשר הוא מתעדכן באצווה.'] },
        { heading: 'מניעת כפילויות וטיפול בכשל', paragraphs: ['מפתחות יציבים, Idempotency ובדיקות ולידציה מונעים יצירה כפולה. מגדירים ניסיונות חוזרים עם גבול, תור כשל, לוגים והתראה עם מספיק הקשר לטיפול — בלי לחשוף סודות או מידע רגיש.'] },
        { heading: 'גישה מינימלית ובדיקת ספק', paragraphs: ['משתמשים בהרשאות המצומצמות שנדרשות ושומרים מפתחות מחוץ לקוד. API, מכסות, Webhooks, ייצוא ורישוי נבדקים לפני התחייבות; כאשר ספק אינו מאפשר חיבור אמין, אומרים זאת במקום להבטיח מעקף שביר.'] },
      ],
      relatedServices: ['automation', 'erp-development', 'crm-development', 'inventory-systems', 'business-portals', 'web-app-development'],
    },
    'business-bots': {
      sections: [
        { heading: 'מתי בוט אינו הפתרון', paragraphs: ['אם המשתמש צריך לראות נתונים מורכבים, לבצע פעולות מרובות או לעבוד לאורך זמן, פורטל או מערכת עשויים להיות ברורים יותר. אם התהליך הוא כלל קבוע בין מערכות, אוטומציה ישירה עדיפה לעיתים על שיחה. בוט נבחר כאשר ממשק שיחתי באמת מקצר את הדרך.'] },
        { heading: 'בדיקת מידע ומעבר לאדם', paragraphs: ['בוט שמבצע חיפוש או משתמש ב-AI צריך לציין מגבלות, לבקש אישור לפני פעולה משמעותית ולהציע מעבר לנציג כשאין ודאות. הרשאות המערכת חלות גם בתוך השיחה; הבוט אינו מקבל גישה רחבה רק מטעמי נוחות.'] },
      ],
      relatedServices: ['automation', 'integrations', 'crm-development', 'erp-development', 'business-portals'],
    },
  },
  en: {
    websites: {
      sections: [
        { heading: 'Content management and operational connections', paragraphs: ['A site can manage pages, services, products, catalogues, FAQs, articles, SEO fields, and multilingual content through a CMS. When it connects to CRM, ERP, ecommerce, or order systems, data ownership and reliable handling of enquiries, statuses, and documents are defined explicitly.'] },
        { heading: 'Migration and post-launch maintenance', paragraphs: ['A migration preserves important URLs or maps suitable redirects, moves content and measurement, and checks forms, analytics, indexing, and links. Maintenance can cover updates, backups, monitoring, and fixes under an agreed scope without promising a ranking or fixed business result.'] },
      ], relatedServices: ['cms-development', 'crm-development', 'erp-development', 'automation', 'integrations'],
    },
    'custom-software': {
      sections: [
        { heading: 'Projects, service, orders, and reporting', paragraphs: ['Custom software may manage project stages, tasks, files, approvals, service requests, orders, and statuses when they belong to one workflow. Operational dashboards and filtered reports depend on agreed definitions; data is not described as real time when a source updates on a schedule.'] },
        { heading: 'Focused software or ERP', paragraphs: ['Custom software may solve one workflow or provide a specific internal tool. ERP is appropriate when multiple departments and modules need shared data. The decision follows system boundaries, users, and data ownership rather than the label.'] },
        { heading: 'Migration, permissions, and maintenance', paragraphs: ['Migration maps fields, removes duplicates, and tests sample imports. Permissions, change history, backups, and error handling are designed before launch, followed by monitoring, updates, and evidence-led expansion.'] },
      ], relatedServices: ['erp-development', 'web-app-development', 'business-portals', 'inventory-systems', 'crm-development', 'automation', 'integrations'],
    },
    'crm-development': {
      sections: [
        { heading: 'Sales, service, and next actions', paragraphs: ['CRM can track lead source, owner, stage, next task, and communication history, then support service or renewal. Assignment, reminders, and alerts are useful where the rule is clear, while exceptions stay with the team.'] },
        { heading: 'CRM versus ERP and portals', paragraphs: ['CRM owns customer relationships and sales or service workflow. ERP connects customers to orders, purchasing, inventory, and wider operations. A portal lets a customer act on authorized information. One authoritative customer record prevents three competing copies.'] },
        { heading: 'Migration and team adoption', paragraphs: ['Migration begins with field mapping, duplicates, and permissions. Screens and shortcuts follow daily work, and rollout can be staged so the team learns to record information consistently.'] },
      ], relatedServices: ['erp-development', 'business-portals', 'automation', 'integrations', 'custom-software', 'app-development'],
    },
    'app-development': {
      sections: [
        { heading: 'Customer, employee, and field apps', paragraphs: ['An app may support customer ordering and status, employee forms and evidence, or field work with photos and files. Accounts, roles, push notifications, camera, and file access are included only when they serve a defined journey.'] },
        { heading: 'Backend, synchronization, and offline needs', paragraphs: ['Most business apps require a backend, database, and API. The design explains weak-network behavior, local data, and conflict resolution. Full offline operation is a separate architecture requirement rather than a default promise.'] },
        { heading: 'Mobile app versus web app and distribution', paragraphs: ['A responsive web app may be enough for a portal or management tool. An installed app is stronger when device experience, notifications, field work, or store distribution are central. Store delivery also requires developer accounts, policy review, versioning, and updates.'] },
      ], relatedServices: ['web-app-development', 'business-portals', 'custom-software', 'crm-development', 'erp-development', 'integrations'],
    },
    'cms-development': {
      sections: [
        { heading: 'Structured, multilingual, search-ready content', paragraphs: ['Content types can cover pages, products, projects, FAQs, and documents rather than relying on one large text field. Each language and page can have its own URL, title, description, image, and sharing fields, with validation before publication.'] },
        { heading: 'Drafts, approvals, and revisions', paragraphs: ['Editors can work in draft, submit for approval, and publish according to role. History and revisions make changes understandable and reversible. Workflow depth follows the editorial team and risk.'] },
        { heading: 'CMS versus CRM and ERP', paragraphs: ['CMS manages content for publication and interfaces. CRM manages customer relationships, while ERP manages cross-department operations. A headless CMS can deliver content through an API to a site, app, or portal without becoming the operational source of truth.'] },
      ], relatedServices: ['websites', 'business-portals', 'web-app-development', 'crm-development', 'erp-development'],
    },
    automation: {
      sections: [
        { heading: 'Workflow examples', items: ['New lead to CRM and owner assignment', 'Follow-up task and reminder creation', 'Approval and status change', 'Customer update after an agreed event', 'Order or document processing', 'Scheduled report generation', 'Synchronization and failure alerts', 'Triggers between CRM, ERP, portals, and websites'] },
        { heading: 'Automation is not automatically AI', paragraphs: ['When the rule is known, a deterministic workflow is usually easier to test, explain, and control. AI belongs only where interpretation or generation is useful and verification, limits, and human escalation are defined.'] },
        { heading: 'Operational reliability', paragraphs: ['A production workflow includes validation, deduplication, bounded retries, logs, alerts, and a manual recovery path. Provider API or permission changes must be visible rather than silently dropping work.'] },
      ], relatedServices: ['crm-development', 'erp-development', 'integrations', 'custom-software', 'inventory-systems'],
    },
    integrations: {
      sections: [
        { heading: 'Source of truth and synchronization frequency', paragraphs: ['Each record type needs an authoritative system. Updates may arrive through webhook, API request, or scheduled synchronization. Data should not be described as real time when it arrives in batches.'] },
        { heading: 'Deduplication and failure handling', paragraphs: ['Stable keys, idempotency, and validation prevent duplicate actions. Bounded retries, a failure queue, contextual logs, and alerts make problems recoverable without exposing secrets or sensitive data.'] },
        { heading: 'Least privilege and provider verification', paragraphs: ['Connections use the smallest practical permissions and keep credentials outside code. APIs, quotas, webhooks, exports, and licensing are checked before commitment; an unavailable interface is reported rather than bypassed with a fragile promise.'] },
      ], relatedServices: ['automation', 'erp-development', 'crm-development', 'inventory-systems', 'business-portals', 'web-app-development'],
    },
    'business-bots': {
      sections: [
        { heading: 'When a bot is not the right interface', paragraphs: ['A portal or application is clearer for complex data and multi-step ongoing work. Direct automation is often better for a fixed system-to-system rule. A bot should be chosen only when conversation genuinely shortens the journey.'] },
        { heading: 'Verification and human escalation', paragraphs: ['A bot using search or AI should communicate limits, ask for confirmation before material actions, and hand off when confidence is low. System permissions still apply inside the conversation; convenience does not justify broad access.'] },
      ], relatedServices: ['automation', 'integrations', 'crm-development', 'erp-development', 'business-portals'],
    },
  },
}

export function enhanceSeoPage(page: SeoPage, lang: Language): SeoPage {
  const enhancement = enhancements[lang][page.slug]
  if (!enhancement) return page

  return {
    ...page,
    sections: [...page.sections, ...enhancement.sections],
    relatedServices: [...new Set([...(page.relatedServices ?? []), ...enhancement.relatedServices])],
  }
}
