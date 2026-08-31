import type { SeoPage } from './seoPages'
import type { Language } from './seoRoutes'

const he: SeoPage[] = [
  {
    kind: 'service',
    slug: 'cms-development',
    title: 'פיתוח מערכת CMS וניהול תוכן לעסק | CodeCrafter',
    description: 'פיתוח CMS מותאם לעסק לניהול תוכן, קטלוגים, עמודים, הרשאות ותהליכי פרסום, עם ממשק שמתאים למידע ולצוות במקום לתבנית כללית.',
    eyebrow: 'שירותי CodeCrafter',
    h1: 'פיתוח מערכת CMS בהתאמה לעסק',
    intro: [
      'מערכת ניהול תוכן טובה מאפשרת לעסק לעדכן מידע בלי לפתוח משימת פיתוח בכל שינוי קטן. במקום להכריח את הצוות לעבוד לפי מבנה קבוע מראש, אפשר לתכנן CMS סביב סוגי התוכן, ההרשאות ותהליך האישור שקיימים בפועל.',
      'הפתרון יכול לשרת אתר, קטלוג, פורטל או מערכת פנימית. לפני שבונים מגדירים מי יוצר תוכן, מי מאשר אותו, אילו שדות באמת נדרשים ומה צריך לקרות כאשר מידע משתנה.',
    ],
    sections: [
      {
        heading: 'מתי CMS מותאם יכול לעזור',
        items: [
          'כאשר תוכן עסקי מתעדכן לעיתים קרובות',
          'כאשר כמה אנשים צריכים הרשאות שונות',
          'כאשר הנתונים צריכים להופיע בכמה מסכים או ערוצים',
          'כאשר מערכת מדף מוסיפה שדות ותהליכים שלא מתאימים לעסק',
          'כאשר חשוב לשמור היסטוריית שינויים או תהליך אישור',
        ],
      },
      {
        heading: 'מה אפשר לנהל',
        paragraphs: ['אפשר לנהל עמודים, שירותים, קטלוגים, פרויקטים, מסמכים, שאלות נפוצות, מדיה ומבני תוכן נוספים לפי הצורך. מבנה הנתונים נקבע לפי המידע האמיתי של העסק ולא לפי רשימת פיצרים קבועה.'],
      },
      {
        heading: 'הרשאות ותהליך פרסום',
        paragraphs: ['כאשר יש יותר ממשתמש אחד, מגדירים מראש מי רשאי לצפות, ליצור, לערוך, לאשר או למחוק. במערכות רגישות אפשר להוסיף רישום פעולות ובקרות נוספות לפי הצורך העסקי והטכני.'],
      },
      {
        heading: 'חיבור לאתר ולמערכות נוספות',
        paragraphs: ['CMS יכול לעבוד כחלק מאתר או כמערכת נפרדת שמספקת מידע דרך API. ניתן לחבר אותו למערכות אחרות כאשר קיימת דרך מורשית ואמינה להעביר נתונים. לפני התחייבות לחיבור נבדקות ההרשאות והיכולות בפועל.'],
      },
      {
        heading: 'איך מתחילים',
        paragraphs: ['מתחילים במיפוי סוגי התוכן, המשתמשים והפעולות שחוזרות על עצמן. משם אפשר להחליט אם נכון לבנות מערכת מותאמת, להגדיר מערכת קיימת או לשלב בין השתיים.'],
      },
    ],
    faq: [
      { question: 'מה ההבדל בין CMS לאתר רגיל?', answer: 'אתר מציג את התוכן למבקר. CMS הוא שכבת הניהול שמאפשרת לצוות לעדכן ולארגן את התוכן בלי לערוך קוד בכל שינוי.' },
      { question: 'אפשר לחבר CMS לאתר שכבר קיים?', answer: 'במקרים רבים כן. זה תלוי בטכנולוגיה של האתר, במבנה הנתונים ובאפשרויות החיבור הקיימות.' },
      { question: 'האם כל עסק צריך CMS מותאם?', answer: 'לא. אם התוכן פשוט ותהליך העבודה סטנדרטי, מערכת קיימת יכולה להספיק. התאמה אישית הגיונית כאשר המבנה או תהליך הניהול ייחודיים מספיק כדי להצדיק אותה.' },
      { question: 'אפשר להגדיר הרשאות שונות לעובדים?', answer: 'כן כאשר זה חלק מדרישות המערכת. מגדירים את התפקידים והפעולות המותרות לפני הפיתוח כדי שההרשאות יתאימו לתהליך האמיתי.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development'],
  },
  {
    kind: 'service',
    slug: 'integrations',
    title: 'אינטגרציות בין מערכות ו API לעסקים | CodeCrafter',
    description: 'חיבור מערכות עסקיות באמצעות API, Webhooks ודרכים מורשות אחרות כדי להעביר מידע בצורה עקבית ולצמצם העתקה ידנית בין כלים.',
    eyebrow: 'שירותי CodeCrafter',
    h1: 'אינטגרציות בין מערכות לעסקים',
    intro: [
      'כאשר אותו מידע מועתק בין טופס, CRM, יומן, דוא״ל ומערכת תפעולית, נוצרות כפילויות וקל לפספס עדכון. אינטגרציה טובה מגדירה מקור אמת, כללים ברורים להעברת מידע ומה קורה כאשר אחד השירותים אינו זמין.',
      'החיבור נבנה רק דרך ממשקים והרשאות שמתאימים למערכות המעורבות. לפני שמבטיחים אינטגרציה בודקים את ה API, ה Webhook, אפשרויות הייצוא או דרך מורשית אחרת שקיימת בפועל.',
    ],
    sections: [
      {
        heading: 'סימנים שכדאי לבדוק אינטגרציה',
        items: [
          'אותם פרטים מוקלדים ביותר ממערכת אחת',
          'סטטוס משתנה במקום אחד ולא מתעדכן במקום אחר',
          'לידים או משימות מועברים ידנית בין עובדים',
          'דוחות נבנים מהעתקה של כמה מקורות',
          'הצוות תלוי באדם אחד שיודע לחבר בין הכלים',
        ],
      },
      {
        heading: 'API, Webhooks וסנכרון',
        paragraphs: ['API מאפשר למערכות לבקש ולשלוח מידע באופן מובנה. Webhook מאפשר למערכת להודיע כאשר אירוע התרחש. הבחירה תלויה במה שהספק תומך בו, בתדירות העדכון ובחשיבות של עקביות הנתונים.'],
      },
      {
        heading: 'אמינות לפני אוטומציה',
        paragraphs: ['מגדירים מניעת כפילויות, טיפול בכשל, ניסיונות חוזרים, לוגים והתראה כאשר נדרשת פעולה אנושית. חיבור שמצליח רק בתרחיש האידיאלי אינו מספיק לתהליך עסקי חשוב.'],
      },
      {
        heading: 'אבטחת מידע והרשאות',
        paragraphs: ['משתמשים בהרשאות המצומצמות שנדרשות לתהליך ושומרים סודות בצד שרת או בסביבת הרצה מתאימה. לא עוקפים מגבלות של ספק ולא מציגים חיבור כזמין לפני שהממשק נבדק בפועל.'],
      },
      {
        heading: 'אינטגרציה לעומת אוטומציה',
        paragraphs: ['אינטגרציה מחברת בין מערכות. אוטומציה משתמשת בחיבורים האלה כדי לבצע תהליך. לעיתים צריך רק סנכרון נקי בין שני מקורות, ולעיתים נכון לבנות תהליך מלא עם החלטות, התראות ומשימות.'],
      },
    ],
    faq: [
      { question: 'אפשר לחבר כל מערכת לכל מערכת?', answer: 'לא תמיד. החיבור תלוי ב API, בהרשאות, ב Webhooks, בייצוא נתונים או בממשק מורשה אחר. בודקים זאת לפני שמתחייבים לפתרון.' },
      { question: 'מה קורה אם אחת המערכות נופלת?', answer: 'בתהליך חשוב מתכננים טיפול בכשל, לוגים, ניסיונות חוזרים והתראה. ההתנהגות המדויקת נקבעת לפי המערכות והסיכון העסקי.' },
      { question: 'אפשר לסנכרן מידע לשני הכיוונים?', answer: 'כן כאשר שתי המערכות מאפשרות זאת וכאשר מוגדר מי מקור האמת בכל סוג נתון. סנכרון דו כיווני דורש כללי קונפליקט ברורים.' },
      { question: 'איך יודעים אם צריך אינטגרציה או מערכת חדשה?', answer: 'ממפים קודם את התהליך הקיים. לפעמים חיבור בין הכלים הקיימים פותר את הבעיה, ולפעמים הפיצול עצמו הוא הבעיה ואז מערכת מרכזית מתאימה יותר.' },
    ],
    relatedServices: ['automation', 'custom-software', 'crm-development'],
  },
  {
    kind: 'service',
    slug: 'business-bots',
    title: 'פיתוח בוטים לעסקים ותהליכי שיחה | CodeCrafter',
    description: 'פיתוח בוטים ותהליכי שיחה לעסקים לאיסוף פרטים, מענה ראשוני, ניתוב וביצוע פעולות דרך ממשקים מורשים ובקרה אנושית במקום שבו היא נדרשת.',
    eyebrow: 'שירותי CodeCrafter',
    h1: 'פיתוח בוטים לעסקים',
    intro: [
      'בוט עסקי צריך לפתור משימה ברורה ולא רק לנהל שיחה. הוא יכול לאסוף פרטים, לענות על שאלות מוגדרות, לנתב פנייה, לפתוח משימה או להעביר מידע למערכת אחרת כאשר הפלטפורמה מאפשרת זאת.',
      'התכנון מתחיל מהשיחה שהלקוח באמת צריך לעבור: מה הוא מנסה להשיג, איזה מידע מותר לבקש, מתי יש מספיק נתונים לפעולה ומתי נכון להעביר את השיחה לאדם.',
    ],
    sections: [
      {
        heading: 'משימות שבוט יכול להתאים להן',
        items: [
          'מענה ראשוני לשאלות חוזרות',
          'איסוף פרטי ליד בצורה מסודרת',
          'ניתוב פנייה לפי שירות או צורך',
          'פתיחת משימה או עדכון מערכת דרך חיבור מורשה',
          'שליחת מידע שהעסק אישר מראש',
        ],
      },
      {
        heading: 'שיחה ברורה במקום תפריט אינסופי',
        paragraphs: ['מגדירים מסלול קצר עם אפשרות לחזור, לתקן תשובה ולהגיע לאדם כאשר הבוט אינו יודע לטפל בבקשה. אם כל שיחה הופכת לעץ החלטות גדול, ייתכן שצריך לפשט את התהליך לפני שמפתחים אותו.'],
      },
      {
        heading: 'חיבור ל CRM ולמערכות עסקיות',
        paragraphs: ['כאשר קיימת אינטגרציה מורשית, אפשר להעביר מידע מהשיחה ל CRM או למערכת אחרת. מגדירים מראש אילו שדות נשמרים, מה קורה בכפילויות ומי אחראי להמשך טיפול.'],
      },
      {
        heading: 'AI ובקרה אנושית',
        paragraphs: ['AI יכול לסייע בניסוח, סיווג או הבנת כוונה, אבל הוא אינו צריך להמציא מדיניות עסקית או לבצע פעולה רגישה בלי גבולות. מגדירים מידע מאושר, תרחישי חריגה ונקודת מעבר לאדם.'],
      },
      {
        heading: 'פלטפורמות והרשאות',
        paragraphs: ['היכולת לפעול ב WhatsApp, Instagram, Facebook, Telegram או ערוץ אחר תלויה בממשקים הרשמיים, בסוג החשבון ובמדיניות הספק בזמן הפיתוח. זמינות נבדקת לפני התחייבות.'],
      },
    ],
    faq: [
      { question: 'האם בוט יכול להתחבר ל WhatsApp?', answer: 'כן כאשר משתמשים בפתרון רשמי שמתאים לחשבון ולסוג ההודעות. בודקים את דרישות הפלטפורמה וההרשאות לפני הפיתוח.' },
      { question: 'האם בוט חייב להשתמש ב AI?', answer: 'לא. תהליך מבוסס כללים יכול להיות אמין ומתאים יותר למשימות רבות. AI מוסיפים כאשר הוא פותר צורך אמיתי וניתן להגדיר לו גבולות.' },
      { question: 'אפשר להעביר שיחה לאדם?', answer: 'כן כאשר הפלטפורמה והתהליך תומכים בכך. כדאי להגדיר מראש באילו מצבים הבוט מפסיק ומעביר את הטיפול.' },
      { question: 'אפשר לשמור את פרטי הפנייה ב CRM?', answer: 'כן אם קיימת דרך מורשית לחבר בין המערכות. מגדירים אילו נתונים נשמרים ומה קורה אם הרשומה כבר קיימת.' },
    ],
    relatedServices: ['automation', 'integrations', 'crm-development'],
  },
]

const en: SeoPage[] = [
  {
    kind: 'service',
    slug: 'cms-development',
    title: 'Custom CMS Development for Business | CodeCrafter',
    description: 'Custom CMS development for pages, catalogs, content, permissions, and publishing workflows, designed around the business data and team instead of a generic template.',
    eyebrow: 'CodeCrafter services',
    h1: 'Custom CMS development for business',
    intro: [
      'A useful content management system lets a business update information without opening a development task for every small change. Instead of forcing the team into a fixed template, the CMS can be planned around the real content types, permissions, and approval process.',
      'The solution can support a website, catalog, portal, or internal system. Before development, we define who creates content, who approves it, which fields are genuinely required, and what should happen when information changes.',
    ],
    sections: [
      { heading: 'When a custom CMS may help', items: ['Business content changes frequently', 'Several people need different permissions', 'The same data must appear in several screens or channels', 'An off the shelf system adds fields or workflows the business does not need', 'Change history or an approval process matters'] },
      { heading: 'What the business can manage', paragraphs: ['A CMS can manage pages, services, catalogs, projects, documents, FAQs, media, and other content structures as needed. The data model follows the real information rather than a fixed feature checklist.'] },
      { heading: 'Permissions and publishing workflow', paragraphs: ['When several people use the system, roles can define who may view, create, edit, approve, or delete. Sensitive workflows can add activity logging or other controls when the requirements call for them.'] },
      { heading: 'Connecting the CMS to other systems', paragraphs: ['A CMS can be part of a website or a separate application that provides data through an API. Other systems can be connected when a reliable, authorized interface is available. Access and capabilities are checked before a connection is promised.'] },
      { heading: 'How the project starts', paragraphs: ['The first step is to map content types, users, and repeated actions. From there we can decide whether a custom system, a configured existing platform, or a combination is the sensible approach.'] },
    ],
    faq: [
      { question: 'What is the difference between a CMS and a normal website?', answer: 'The website presents content to visitors. A CMS is the management layer that lets the team organize and update that content without editing code for every change.' },
      { question: 'Can a CMS connect to an existing website?', answer: 'Often yes. It depends on the website technology, data structure, and the integration options that are actually available.' },
      { question: 'Does every business need a custom CMS?', answer: 'No. A standard platform may be better for simple content and a standard workflow. Custom development makes sense when the structure or management process is distinctive enough to justify it.' },
      { question: 'Can employees have different permissions?', answer: 'Yes when role based access is part of the requirements. Roles and permitted actions are defined before development so permissions match the real workflow.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development'],
  },
  {
    kind: 'service',
    slug: 'integrations',
    title: 'Business Systems Integration and API Development | CodeCrafter',
    description: 'Connect business systems through APIs, webhooks, and other authorized interfaces to move data consistently and reduce manual copying between tools.',
    eyebrow: 'CodeCrafter services',
    h1: 'Business systems integration',
    intro: [
      'When the same information is copied between a form, CRM, calendar, email, and an operational system, duplicates and missed updates become likely. A reliable integration defines the source of truth, clear transfer rules, and what happens when one service is unavailable.',
      'Connections are built only through interfaces and permissions that fit the systems involved. Before promising an integration, the available API, webhook, export, or other authorized method is checked in practice.',
    ],
    sections: [
      { heading: 'Signs an integration is worth examining', items: ['The same details are typed into more than one system', 'A status changes in one tool but not another', 'Leads or tasks are passed manually between people', 'Reports are assembled by copying several sources', 'The workflow depends on one person who knows how to bridge the tools'] },
      { heading: 'APIs, webhooks, and synchronization', paragraphs: ['An API lets systems request and send structured information. A webhook lets a system signal that an event occurred. The right approach depends on what the provider supports, update frequency, and how important data consistency is.'] },
      { heading: 'Reliability before automation', paragraphs: ['Important workflows need duplicate prevention, failure handling, retries, logs, and an alert when a person must intervene. A connection that works only in the ideal path is not enough for a critical business process.'] },
      { heading: 'Security and permissions', paragraphs: ['Use the narrowest permissions required for the workflow and keep secrets on the server or in an appropriate runtime secret store. Provider restrictions are not bypassed, and a connection is not presented as available before its interface is checked.'] },
      { heading: 'Integration versus automation', paragraphs: ['Integration connects systems. Automation uses those connections to run a process. Sometimes clean synchronization between two sources is enough; sometimes a complete workflow with decisions, alerts, and tasks is the better solution.'] },
    ],
    faq: [
      { question: 'Can any system connect to any other system?', answer: 'Not always. It depends on APIs, permissions, webhooks, data exports, or another authorized interface. Those capabilities are checked before committing to a solution.' },
      { question: 'What happens if one connected system is down?', answer: 'An important process should define failure handling, logs, retries, and alerts. The exact behavior depends on the systems and the business risk.' },
      { question: 'Can data synchronize in both directions?', answer: 'Yes when both systems support it and the source of truth is defined for each data type. Two way synchronization also needs clear conflict rules.' },
      { question: 'How do we know whether we need an integration or a new system?', answer: 'Map the current process first. Sometimes connecting the existing tools solves the problem. In other cases the fragmentation itself is the problem and a central system is a better fit.' },
    ],
    relatedServices: ['automation', 'custom-software', 'crm-development'],
  },
  {
    kind: 'service',
    slug: 'business-bots',
    title: 'Business Bot Development and Conversation Workflows | CodeCrafter',
    description: 'Business bot development for intake, initial answers, routing, and approved actions through authorized platform interfaces with human handoff where needed.',
    eyebrow: 'CodeCrafter services',
    h1: 'Business bot development',
    intro: [
      'A business bot should solve a clear task rather than simply hold a conversation. It can collect details, answer defined questions, route an inquiry, open a task, or pass information to another system when the platform permits it.',
      'Planning starts with the conversation a customer genuinely needs: what they are trying to achieve, what information is appropriate to request, when there is enough data to act, and when the conversation should move to a person.',
    ],
    sections: [
      { heading: 'Tasks a bot can be useful for', items: ['Initial answers to repeated questions', 'Structured lead intake', 'Routing by service or need', 'Creating a task or updating a system through an authorized connection', 'Sending information the business has approved in advance'] },
      { heading: 'A clear conversation instead of an endless menu', paragraphs: ['The flow should stay short and let the user go back, correct an answer, or reach a person when the bot cannot handle the request. If every conversation becomes a large decision tree, the business process may need simplifying before development.'] },
      { heading: 'Connecting a bot to CRM and business systems', paragraphs: ['When an authorized integration exists, information from a conversation can be passed to a CRM or another system. Define which fields are stored, how duplicates are handled, and who owns the next action.'] },
      { heading: 'AI and human oversight', paragraphs: ['AI can help with wording, classification, or intent detection, but it should not invent business policy or perform a sensitive action without boundaries. Approved information, exception paths, and human handoff are defined as part of the workflow.'] },
      { heading: 'Platforms and permissions', paragraphs: ['The ability to work with WhatsApp, Instagram, Facebook, Telegram, or another channel depends on official interfaces, account type, and provider policy at development time. Availability is checked before a commitment is made.'] },
    ],
    faq: [
      { question: 'Can a bot connect to WhatsApp?', answer: 'Yes when an official solution is available for the account and message type. Platform requirements and permissions are checked before development.' },
      { question: 'Does a business bot have to use AI?', answer: 'No. A rules based flow can be more reliable for many tasks. AI should be added only when it solves a real need and clear boundaries can be defined.' },
      { question: 'Can the bot hand the conversation to a person?', answer: 'Yes when the platform and workflow support it. The handoff conditions should be defined before launch.' },
      { question: 'Can inquiry details be saved in a CRM?', answer: 'Yes when there is an authorized way to connect the systems. The stored fields and duplicate handling should be defined explicitly.' },
    ],
    relatedServices: ['automation', 'integrations', 'crm-development'],
  },
]

export const extraPagesByLanguage: Record<Language, SeoPage[]> = { he, en }
