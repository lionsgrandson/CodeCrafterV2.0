import type { SeoPage } from './seoPages'
import type { Language } from './seoRoutes'

export const locationLinks: Record<Language, { slug: string; label: string; mode: string }[]> = {
  he: [
    { slug: 'locations/north', label: 'צפון ישראל', mode: 'עבודה מרחוק ופגישות בכרמיאל לפי תיאום' },
    { slug: 'locations/center', label: 'מרכז ישראל', mode: 'עבודה מרחוק ופגישות בתל אביב לפי תיאום' },
    { slug: 'locations/tel-aviv', label: 'תל אביב', mode: 'פגישות פנים אל פנים' },
    { slug: 'locations/haifa', label: 'חיפה', mode: 'עבודה מרחוק' },
    { slug: 'locations/jerusalem', label: 'ירושלים', mode: 'פגישות פנים אל פנים ועבודה מרחוק' },
    { slug: 'locations/beer-sheva', label: 'באר שבע', mode: 'עבודה מרחוק' },
    { slug: 'locations/karmiel', label: 'כרמיאל', mode: 'פגישות פנים אל פנים ועבודה מרחוק' },
  ],
  en: [
    { slug: 'locations/north', label: 'Northern Israel', mode: 'Remote delivery and Karmiel meetings by arrangement' },
    { slug: 'locations/center', label: 'Central Israel', mode: 'Remote delivery and Tel Aviv meetings by arrangement' },
    { slug: 'locations/tel-aviv', label: 'Tel Aviv', mode: 'In person meetings' },
    { slug: 'locations/haifa', label: 'Haifa', mode: 'Remote delivery' },
    { slug: 'locations/jerusalem', label: 'Jerusalem', mode: 'In person and remote' },
    { slug: 'locations/beer-sheva', label: 'Beer Sheva', mode: 'Remote delivery' },
    { slug: 'locations/karmiel', label: 'Karmiel', mode: 'In person and remote' },
  ],
}

const he: SeoPage[] = [
  {
    kind: 'service',
    slug: 'locations/tel-aviv',
    title: 'בניית אתרים ופיתוח מערכות לעסקים בתל אביב | CodeCrafter',
    description: 'CodeCrafter מספקת בניית אתרים, מערכות, CRM, אוטומציות ואפליקציות לעסקים בתל אביב, עם אפשרות לפגישות פנים אל פנים לפי תיאום.',
    eyebrow: 'שירות באזור תל אביב',
    h1: 'בניית אתרים ופיתוח מערכות לעסקים בתל אביב',
    intro: ['CodeCrafter Moshe Schwartzberg עובדת עם עסקים שצריכים אתר, מערכת, CRM, אוטומציה או אפליקציה, ובתל אביב ניתן לקיים פגישות פנים אל פנים לפי תיאום.', 'פגישות בתל אביב מתקיימות בתיאום מראש, ללא משרד לקוחות קבוע בעיר. את שאר העבודה ניתן לנהל מרחוק עם אפיון כתוב, סביבת בדיקה ועדכונים לאורך הדרך.'],
    sections: [
      { heading: 'מה אפשר לבנות לעסק בתל אביב', items: ['אתרי תדמית ודפי נחיתה', 'מערכות Web ומערכות מידע', 'CRM ו CMS מותאמים', 'אוטומציות ואינטגרציות', 'אפליקציות מובייל', 'תחזוקה ושיפור מערכות קיימות'] },
      { heading: 'איך העבודה מתבצעת', paragraphs: ['אפשר להתחיל בשיחת אפיון ולהמשיך לפגישה פנים אל פנים בתל אביב כאשר זה מתאים לפרויקט. תהליך הפיתוח, התיעוד והבדיקות נשאר דיגיטלי כדי שאפשר יהיה לעקוב אחרי החלטות וגרסאות גם אחרי הפגישה.'] },
      { heading: 'מה כדאי להכין לשיחת אפיון', paragraphs: ['מומלץ להגיע עם תיאור קצר של העסק, קהל היעד, התהליך שצריך לשפר וקישורים למערכות קיימות. כך ניתן לברר אם נכון להתחיל באתר, מערכת או חיבור בין כלים.'] },
    ],
    faq: [
      { question: 'אפשר להיפגש בתל אביב?', answer: 'כן. ניתן לתאם פגישה פנים אל פנים בתל אביב בהתאם לפרויקט ולזמינות.' },
      { question: 'יש ל CodeCrafter משרד פיזי בתל אביב?', answer: 'CodeCrafter פועלת כעסק נותן שירות ולא מפרסמת כתובת משרד לקוחות בתל אביב.' },
      { question: 'איזה שירותים זמינים בתל אביב?', answer: 'בניית אתרים, מערכות, CRM, CMS, אוטומציות, אינטגרציות, אפליקציות ושירותי פיתוח ותחזוקה נוספים בהתאם להיקף.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service',
    slug: 'locations/haifa',
    title: 'בניית אתרים ופיתוח מערכות לעסקים בחיפה מרחוק | CodeCrafter',
    description: 'שירותי פיתוח אתרים, מערכות, CRM, אוטומציות ואפליקציות לעסקים בחיפה באמצעות תהליך עבודה מרחוק של CodeCrafter.',
    eyebrow: 'שירות לעסקים בחיפה',
    h1: 'פיתוח אתרים ומערכות לעסקים בחיפה בעבודה מרחוק',
    intro: ['לעסקים בחיפה השירות של CodeCrafter ניתן מרחוק. האפיון, הפיתוח, המשוב והבדיקות יכולים להתבצע בשיחות, מסמכים וסביבות בדיקה בלי לטעון לקיומו של משרד או צוות מקומי בחיפה.', 'מודל העבודה מתאים לפרויקטים שבהם חשוב לשמור תיעוד, להעביר גרסאות בצורה מסודרת ולהתקדם לפי משימות ברורות.'],
    sections: [
      { heading: 'שירותים שניתן לספק מרחוק', items: ['בניית אתרים ודפי נחיתה', 'פיתוח מערכות עסקיות', 'CRM ו CMS', 'אוטומציות ואינטגרציות', 'אפליקציות', 'תחזוקה ותיקונים'] },
      { heading: 'איך נראה פרויקט מרחוק', paragraphs: ['מגדירים מטרות והיקף בשיחה, מרכזים החלטות ומשוב בכתב, עובדים מול סביבת בדיקה ומבצעים בדיקות לפני פרסום. אין צורך להיות באותו משרד כדי לעבוד על קוד, תוכן, מסכים ואינטגרציות בצורה מסודרת.'] },
      { heading: 'בדיקות לפני השקה מרחוק', paragraphs: ['לפני פרסום בודקים את המסכים העיקריים במובייל ובמחשב, טפסים וקישורים, תצוגת עברית ונתונים שמועברים למערכות אחרות בהתאם להיקף. גרסת בדיקה מאפשרת לבצע סקירה משותפת מרחוק.'] },
    ],
    faq: [
      { question: 'העבודה עם עסקים בחיפה היא מרחוק?', answer: 'כן. השירות בחיפה מוגדר כרגע כעבודה מרחוק.' },
      { question: 'אפשר לבנות מערכת מלאה בלי פגישה פיזית?', answer: 'כן. אפיון, עיצוב, פיתוח, בדיקות ומשוב יכולים להתבצע מרחוק כאשר המידע והגישה הנדרשים זמינים.' },
      { question: 'יש משרד של CodeCrafter בחיפה?', answer: 'לא מוצגת כתובת משרד לקוחות בחיפה. CodeCrafter פועלת כעסק נותן שירות.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service',
    slug: 'locations/jerusalem',
    title: 'בניית אתרים ופיתוח מערכות לעסקים בירושלים | CodeCrafter',
    description: 'שירותי פיתוח אתרים, מערכות, CRM, אוטומציות ואפליקציות בירושלים עם אפשרות לעבודה מרחוק ולפגישות פנים אל פנים לפי תיאום.',
    eyebrow: 'שירות באזור ירושלים',
    h1: 'בניית אתרים ופיתוח מערכות לעסקים בירושלים',
    intro: ['בירושלים CodeCrafter יכולה לעבוד בשני מודלים: פגישות פנים אל פנים לפי תיאום ועבודה מרחוק לאורך הפרויקט.', 'הגישה מאפשרת להשתמש בפגישה כאשר היא עוזרת לאפיון או להצגת פתרון, ועדיין לשמור את הפיתוח, הגרסאות, המשוב והבדיקות בתהליך דיגיטלי מסודר.'],
    sections: [
      { heading: 'מה אפשר לבנות לעסק בירושלים', items: ['אתרים ודפי נחיתה', 'מערכות עסקיות ופורטלים', 'CRM ו CMS', 'אוטומציות ואינטגרציות', 'אפליקציות מובייל', 'תחזוקה ושיפור מוצר קיים'] },
      { heading: 'פגישה או עבודה מרחוק', paragraphs: ['אפשר לבחור בכל פרויקט מה דורש פגישה ומה עדיף לבצע מרחוק. אין טענה למשרד לקוחות בירושלים; השירות הוא אזורי והפגישות מתואמות לפי צורך.'] },
      { heading: 'תהליך עם תיעוד', paragraphs: ['גם כאשר נפגשים פיזית, החלטות חשובות עוברות למסמך, משימה או גרסת בדיקה. כך יש מקור ברור למה שסוכם ואפשר לבדוק את התוצאה לפני העלייה לאוויר.'] },
    ],
    faq: [
      { question: 'אפשר להיפגש בירושלים?', answer: 'כן. ניתן לתאם פגישות פנים אל פנים בירושלים, ואפשר גם לנהל את הפרויקט מרחוק.' },
      { question: 'יש משרד לקוחות בירושלים?', answer: 'CodeCrafter פועלת כעסק נותן שירות ולא מפרסמת כתובת משרד לקוחות בירושלים.' },
      { question: 'אפשר לשלב פגישות ועבודה מרחוק?', answer: 'כן. זהו מודל העבודה שהוגדר לירושלים.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service',
    slug: 'locations/beer-sheva',
    title: 'בניית אתרים ופיתוח מערכות לעסקים בבאר שבע מרחוק | CodeCrafter',
    description: 'CodeCrafter מספקת לעסקים בבאר שבע שירותי פיתוח אתרים, מערכות, CRM, אוטומציות ואפליקציות בתהליך עבודה מרחוק.',
    eyebrow: 'שירות לעסקים בבאר שבע',
    h1: 'פיתוח אתרים ומערכות לעסקים בבאר שבע מרחוק',
    intro: ['השירות לעסקים בבאר שבע ניתן כרגע מרחוק. אפשר לבצע אפיון, פיתוח, מסירת גרסאות, בדיקות ומשוב בלי להציג נוכחות פיזית שלא קיימת.', 'המודל מתאים במיוחד לעבודת תוכנה שבה רוב התוצרים ממילא נבדקים בדפדפן, במערכת בדיקה, באפליקציה או דרך חיבור מאובטח לשירותים הרלוונטיים.'],
    sections: [
      { heading: 'שירותי פיתוח זמינים', items: ['אתרי תדמית ומכירה', 'מערכות מותאמות לעסק', 'CRM ו CMS', 'אוטומציות ואינטגרציות', 'אפליקציות', 'תחזוקה ושדרוג'] },
      { heading: 'ניהול פרויקט מרחוק', paragraphs: ['מגדירים אבני דרך, מרכזים את המשוב ומציגים גרסאות שניתן לבדוק. לפני חיבור למערכת צד שלישי נבדקות ההרשאות והיכולות בפועל כדי לא להבטיח פיצר שאי אפשר לממש.'] },
      { heading: 'מה נדרש להשלמת העבודה מרחוק', paragraphs: ['כדאי להגדיר איש קשר שמאשר החלטות, גישה מורשית לחומרי הפרויקט ולמערכות הרלוונטיות, ומשוב מסודר על גרסאות בדיקה. השירות בבאר שבע ניתן מרחוק.'] },
    ],
    faq: [
      { question: 'איך CodeCrafter עובדת עם עסק בבאר שבע?', answer: 'באמצעות תהליך עבודה מרחוק הכולל אפיון, גרסאות בדיקה, משוב והתקדמות לפי היקף הפרויקט.' },
      { question: 'יש פגישות פיזיות בבאר שבע?', answer: 'השירות שהוגדר כרגע לבאר שבע הוא מרחוק בלבד.' },
      { question: 'אפשר לקבל גם תחזוקה אחרי ההשקה?', answer: 'כן, בהתאם למסלול תחזוקה או להיקף עבודה שנקבע.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service',
    slug: 'locations/karmiel',
    title: 'בניית אתרים ופיתוח מערכות לעסקים בכרמיאל | CodeCrafter',
    description: 'שירותי פיתוח אתרים, מערכות, CRM, אוטומציות ואפליקציות לעסקים בכרמיאל עם אפשרות לפגישות פנים אל פנים ולעבודה מרחוק.',
    eyebrow: 'שירות באזור כרמיאל',
    h1: 'בניית אתרים ופיתוח מערכות לעסקים בכרמיאל',
    intro: ['בכרמיאל CodeCrafter יכולה לעבוד גם בפגישות פנים אל פנים לפי תיאום וגם מרחוק לאורך הפרויקט.', 'ניתן לקיים פגישה בכרמיאל בתיאום מראש או לנהל את הפרויקט מרחוק. אין משרד לקוחות קבוע בעיר, ומסגרת הפגישות נקבעת לפי הצורך והזמינות.'],
    sections: [
      { heading: 'שירותים לעסקים בכרמיאל', items: ['בניית אתרים', 'מערכות Web ומערכות מידע', 'CRM ו CMS', 'אוטומציות ואינטגרציות', 'אפליקציות', 'תחזוקה ותיקונים'] },
      { heading: 'שילוב בין פגישה לעבודה דיגיטלית', paragraphs: ['אפשר לקיים פגישה כאשר יש ערך לעבודה משותפת על האפיון או להצגת גרסה, ולהמשיך את שאר השלבים מרחוק עם תיעוד וגרסאות בדיקה.'] },
      { heading: 'מה עושים אחרי פגישת האפיון', paragraphs: ['מרכזים החלטות, היקף עבודה ואבני דרך בכתב. בהמשך מעבירים גרסאות לבדיקה ולאישור ומגדירים מראש איך יטופלו תיקונים ותחזוקה.'] },
    ],
    faq: [
      { question: 'אפשר להיפגש בכרמיאל?', answer: 'כן. ניתן לתאם פגישה פנים אל פנים בכרמיאל, ואפשר גם לעבוד מרחוק.' },
      { question: 'האם כל הפרויקט חייב להתבצע בפגישה?', answer: 'לא. גם כאשר מתקיימת פגישה, הפיתוח והבדיקות יכולים להמשיך מרחוק.' },
      { question: 'יש משרד CodeCrafter בכרמיאל?', answer: 'לא מוצגת כתובת משרד לקוחות בכרמיאל. CodeCrafter פועלת כעסק נותן שירות.' },
    ],
    relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
]

const en: SeoPage[] = [
  {
    kind: 'service', slug: 'locations/tel-aviv', title: 'Web Development and Business Systems in Tel Aviv | CodeCrafter', description: 'CodeCrafter provides websites, custom systems, CRM, automation, and app development for Tel Aviv businesses, with in person meetings available by arrangement.', eyebrow: 'Serving Tel Aviv', h1: 'Web development and business systems for Tel Aviv businesses',
    intro: ['CodeCrafter Moshe Schwartzberg works with businesses that need a website, system, CRM, automation, or app. In Tel Aviv, in person project meetings can be arranged.', 'CodeCrafter operates as a service area business and does not claim a public client office in Tel Aviv. This page describes the real delivery model without inventing an address, local team, or response time.'],
    sections: [
      { heading: 'What can be built for a Tel Aviv business', items: ['Marketing websites and landing pages', 'Web systems and business software', 'Custom CRM and CMS', 'Automation and integrations', 'Mobile apps', 'Maintenance and improvement of existing systems'] },
      { heading: 'How the work is delivered', paragraphs: ['A project can begin with discovery and continue with an in person meeting in Tel Aviv when useful. Development, documentation, feedback, and testing remain organized digitally so decisions and versions stay traceable.'] },
      { heading: 'What to prepare for discovery', paragraphs: ['A short description of the business, target customers, the service or workflow to improve, relevant existing tools, and the intended outcome will make the first conversation more useful.'] },
    ],
    faq: [
      { question: 'Can we meet in Tel Aviv?', answer: 'Yes. In person meetings in Tel Aviv can be arranged depending on the project and availability.' },
      { question: 'Does CodeCrafter have a public office in Tel Aviv?', answer: 'CodeCrafter operates as a service area business and does not publish a client office address in Tel Aviv.' },
      { question: 'Which services are available in Tel Aviv?', answer: 'Websites, custom systems, CRM, CMS, automation, integrations, apps, maintenance, and other development work according to scope.' },
    ], relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service', slug: 'locations/haifa', title: 'Remote Web Development and Business Systems for Haifa | CodeCrafter', description: 'Remote website, custom software, CRM, automation, and app development for businesses in Haifa through CodeCrafter.', eyebrow: 'Serving Haifa remotely', h1: 'Remote web development and business systems for Haifa businesses',
    intro: ['For Haifa businesses, CodeCrafter currently delivers projects remotely. Discovery, development, feedback, and testing can be handled through calls, written decisions, and test environments without claiming a Haifa office or local team.', 'The remote workflow is designed around documented decisions, reviewable versions, and clear project tasks.'],
    sections: [
      { heading: 'Services available remotely', items: ['Websites and landing pages', 'Custom business systems', 'CRM and CMS', 'Automation and integrations', 'Mobile apps', 'Maintenance and fixes'] },
      { heading: 'How a remote project works', paragraphs: ['Goals and scope are defined in calls, important decisions are recorded in writing, and versions are shared for review before release. Code, content, screens, and integrations can all be delivered without being in the same physical office.'] },
      { heading: 'Pre-launch review for a remote project', paragraphs: ['Review the key screens on desktop and mobile, forms and links, language display, and approved data flows between systems. Test versions make these checks possible without a local office.'] },
    ],
    faq: [
      { question: 'Is service for Haifa businesses remote?', answer: 'Yes. Haifa is currently served remotely.' },
      { question: 'Can a complete system be built without an in person meeting?', answer: 'Yes. Discovery, design, development, testing, and feedback can be handled remotely when the required information and access are available.' },
      { question: 'Does CodeCrafter have an office in Haifa?', answer: 'No client office address is published in Haifa. CodeCrafter operates as a service area business.' },
    ], relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service', slug: 'locations/jerusalem', title: 'Web Development and Business Systems in Jerusalem | CodeCrafter', description: 'Website, custom system, CRM, automation, and app development for Jerusalem businesses with both in person meetings and remote delivery available.', eyebrow: 'Serving Jerusalem', h1: 'Web development and business systems for Jerusalem businesses',
    intro: ['In Jerusalem, CodeCrafter can work in both modes: in person meetings by arrangement and remote delivery throughout the project.', 'A meeting can be used when it helps discovery or review, while development, versions, feedback, and testing remain documented digitally.'],
    sections: [
      { heading: 'What can be built for a Jerusalem business', items: ['Websites and landing pages', 'Business systems and portals', 'CRM and CMS', 'Automation and integrations', 'Mobile apps', 'Maintenance and product improvement'] },
      { heading: 'In person or remote', paragraphs: ['Each project can use the mode that fits the work. CodeCrafter does not claim a public client office in Jerusalem. The service area supports arranged meetings and remote delivery.'] },
      { heading: 'A documented process', paragraphs: ['Even after an in person meeting, important decisions move into written tasks, documents, or test versions. That creates a clear source of truth before release.'] },
    ],
    faq: [
      { question: 'Can we meet in Jerusalem?', answer: 'Yes. In person meetings can be arranged in Jerusalem, and the project can also be handled remotely.' },
      { question: 'Does CodeCrafter have a client office in Jerusalem?', answer: 'CodeCrafter operates as a service area business and does not publish a client office address in Jerusalem.' },
      { question: 'Can we combine meetings and remote work?', answer: 'Yes. That is the service model currently available for Jerusalem.' },
    ], relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service', slug: 'locations/beer-sheva', title: 'Remote Web Development and Business Systems for Beer Sheva | CodeCrafter', description: 'Remote websites, custom software, CRM, automation, and app development for businesses in Beer Sheva through CodeCrafter.', eyebrow: 'Serving Beer Sheva remotely', h1: 'Remote web development and business systems for Beer Sheva businesses',
    intro: ['Service for Beer Sheva businesses is currently remote. Discovery, development, version delivery, testing, and feedback can be completed without claiming a physical local presence that was not provided.', 'This model fits software work where most deliverables are reviewed in a browser, test system, application, or authorized integration environment.'],
    sections: [
      { heading: 'Development services available', items: ['Marketing and ecommerce websites', 'Custom business systems', 'CRM and CMS', 'Automation and integrations', 'Mobile apps', 'Maintenance and upgrades'] },
      { heading: 'Managing the project remotely', paragraphs: ['Milestones are defined, feedback is centralized, and versions are made available for review. Third party connections are checked for real access and permissions before features are promised.'] },
      { heading: 'What helps remote delivery work', paragraphs: ['A designated decision-maker, authorized access to relevant materials, and structured feedback on test versions keep the project accountable. Work for Beer Sheva businesses is delivered remotely.'] },
    ],
    faq: [
      { question: 'How does CodeCrafter work with a Beer Sheva business?', answer: 'Through a remote workflow with discovery, test versions, feedback, and progress based on the agreed project scope.' },
      { question: 'Are in person meetings offered in Beer Sheva?', answer: 'The service currently defined for Beer Sheva is remote only.' },
      { question: 'Can maintenance continue after launch?', answer: 'Yes, according to a maintenance plan or another agreed scope of work.' },
    ], relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
  {
    kind: 'service', slug: 'locations/karmiel', title: 'Web Development and Business Systems in Karmiel | CodeCrafter', description: 'Website, custom system, CRM, automation, and app development for Karmiel businesses with both in person meetings and remote delivery available.', eyebrow: 'Serving Karmiel', h1: 'Web development and business systems for Karmiel businesses',
    intro: ['In Karmiel, CodeCrafter can work through both in person meetings by arrangement and remote delivery throughout the project.', 'Meetings in Karmiel can be arranged in advance, or the project can be delivered remotely. There is no permanent client office in the city; arrangements depend on the needs and availability.'],
    sections: [
      { heading: 'Services for Karmiel businesses', items: ['Website development', 'Web and information systems', 'CRM and CMS', 'Automation and integrations', 'Mobile apps', 'Maintenance and fixes'] },
      { heading: 'Combining a meeting with digital delivery', paragraphs: ['An in person meeting can be used when it adds value to discovery or review, while development and testing continue remotely with documented decisions and test versions.'] },
      { heading: 'After the discovery meeting', paragraphs: ['Decisions, scope, and delivery milestones are documented. Test versions can be approved before launch, with correction and maintenance responsibilities agreed in advance.'] },
    ],
    faq: [
      { question: 'Can we meet in Karmiel?', answer: 'Yes. An in person meeting can be arranged in Karmiel, and remote delivery is also available.' },
      { question: 'Does the whole project need to happen in person?', answer: 'No. Development and testing can continue remotely even when an in person meeting is part of the project.' },
      { question: 'Does CodeCrafter have an office in Karmiel?', answer: 'No client office address is published in Karmiel. CodeCrafter operates as a service area business.' },
    ], relatedServices: ['websites', 'custom-software', 'crm-development', 'automation'],
  },
]

export const factsPagesByLanguage: Record<Language, SeoPage[]> = { he, en }
