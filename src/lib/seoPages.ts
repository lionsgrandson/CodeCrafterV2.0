import { localizePath, serviceLabels, serviceSlugs, type Language } from './seoRoutes'
export { localizePath, serviceLabels, serviceSlugs, type Language } from './seoRoutes'

export type PageSection = {
  heading: string
  paragraphs?: string[]
  items?: string[]
  links?: { label: string; href: string; description?: string }[]
}

export type FaqItem = {
  question: string
  answer: string
}

export type SeoPage = {
  kind: 'service' | 'about' | 'guide' | 'directory'
  slug: string
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string[]
  sections: PageSection[]
  faq?: FaqItem[]
  relatedServices?: string[]
  relatedGuides?: string[]
  image?: {
    src: string
    alt: string
    kind?: 'logo' | 'screenshot' | 'photo'
  }
  externalUrl?: string
}

const heServices: SeoPage[] = [
  {
    kind: 'service',
    slug: 'websites',
    title: 'בניית אתרים לעסקים שמייצרים אמון ופניות | CodeCrafter',
    description: 'בניית אתרים לעסקים בישראל עם אסטרטגיה, עיצוב, פיתוח, SEO וחיבור לתהליכי העבודה — כדי להציג ערך ברור ולהפוך מבקרים לפניות איכותיות.',
    eyebrow: 'שירותי CodeCrafter',
    h1: 'בניית אתרים לעסקים שעובדים בשביל העסק',
    intro: [
      'אתר עסקי טוב אינו רק כרטיס ביקור יפה. הוא צריך להסביר במהירות מי אתם, למי אתם מתאימים, למה כדאי לבחור בכם ומה הצעד הבא. ב-CodeCrafter כל אתר נבנה סביב המטרות העסקיות, התוכן והמסלול שהלקוח עובר — מהחיפוש הראשון ועד לשיחה, רכישה או השארת פרטים.',
      'העבודה משלבת מבנה תוכן ברור, חוויית משתמש, פיתוח מהיר ונגיש, התאמה מלאה לעברית ולמובייל ותשתית טכנית שמאפשרת למנועי חיפוש להבין את העסק. המטרה היא ליצור נכס דיגיטלי שקל לתחזק, נעים להשתמש בו ומדויק מספיק כדי לתמוך בשיווק לאורך זמן.',
    ],
    sections: [
      {
        heading: 'אילו בעיות אתר עסקי נכון פותר',
        paragraphs: ['עסקים רבים מגיעים עם אתר שאינו משקף עוד את רמת השירות שלהם, דף איטי שקשה לקרוא בטלפון, מסרים מפוזרים או תלות גבוהה במודעות וברשתות חברתיות. אתר מתוכנן היטב מרכז את הסיפור, השירותים וההוכחות במקום אחד ומאפשר ללקוח לקבל החלטה בביטחון.'],
        items: ['הצעת ערך שאינה ברורה למבקר חדש', 'מעט פניות למרות שיש תנועה לאתר', 'תוכן שלא בנוי לחיפוש או לשאלות של לקוחות', 'חוויית מובייל מסורבלת וטפסים שקשה להשלים', 'אתר ישן שקשה לעדכן או לחבר למערכות אחרות'],
      },
      {
        heading: 'למי השירות מתאים',
        paragraphs: ['השירות מתאים לעסקים חדשים שצריכים בסיס מקצועי, לעסקים קיימים שמבקשים להחליף אתר מיושן, ולחברות שצריכות אתר כחלק ממערכת רחבה יותר. לפני שמעצבים מסך, מגדירים את סוגי הלקוחות, השירותים החשובים, הפעולות הרצויות ומקורות התנועה הצפויים. כך האתר מתאים לעסק עצמו ולא לתבנית כללית.'],
      },
      {
        heading: 'מה אפשר לבנות',
        items: ['אתרי תדמית ושירות עם עמודים ייעודיים לכל תחום', 'דפי נחיתה לקמפיינים ומוצרים', 'קטלוגים, חנויות וחוויות מוצר', 'אתרים דו-לשוניים בעברית ובאנגלית', 'אזורי תוכן, תיק עבודות ופרויקטים', 'טפסים חכמים וחיבור ל-CRM, דוא״ל, WhatsApp ואנליטיקה'],
      },
      {
        heading: 'איך נראה תהליך הפיתוח',
        paragraphs: ['מתחילים בשיחת אפיון ובהבנת מטרות, קהל ותהליכים. לאחר מכן בונים ארכיטקטורת מידע ומסלול משתמש, מכינים תוכן ומסכים, מפתחים את האתר ומחברים את השירותים הנדרשים. לפני העלייה לאוויר נבדקים מובייל ודסקטופ, עברית RTL ואנגלית LTR, נגישות בסיסית, טפסים, קישורים, מטא-דאטה, ביצועים ומצבי שגיאה. אחרי ההשקה אפשר להמשיך במדידה ושיפור על בסיס התנהגות אמיתית.'],
      },
      {
        heading: 'טכנולוגיה, SEO וביצועים כחלק מהמוצר',
        paragraphs: ['הטכנולוגיה נבחרת לפי הצורך: אתר מהיר וסטטי, יישום React, מערכת תוכן או חיבור לשירות קיים. בכל מקרה נשמרים HTML סמנטי, כותרות מסודרות, כתובות קנוניות, מטא-דאטה ייחודי, תמונות מותאמות ומבנה קישורים הגיוני. אין הבטחה למיקום מסוים בגוגל; יש תשתית נקייה שמאפשרת לתוכן איכותי ולעסק אמיתי להיבנות לאורך זמן.'],
      },
      {
        heading: 'הערך לעסק',
        paragraphs: ['אתר מדויק חוסך הסברים חוזרים, מסנן פניות לא מתאימות, מחזק אמון ומאפשר ללקוחות להגיע מוכנים יותר לשיחה. הוא גם נותן לעסק בעלות על הנוכחות הדיגיטלית שלו, במקום להסתמך רק על פלטפורמה חיצונית שמשתנה ללא שליטה.'],
      },
    ],
    faq: [
      { question: 'כמה עולה בניית אתר לעסק?', answer: 'המחיר תלוי במספר העמודים, עומק התוכן, העיצוב, הפונקציות והחיבורים למערכות. לאחר אפיון קצר מתקבלת הצעה שמפרידה בין חובה, אפשרויות והמשך עתידי.' },
      { question: 'כמה זמן לוקח להקים אתר?', answer: 'אתר ממוקד יכול להיבנות בתוך מספר שבועות, בעוד אתר רחב או מערכת משולבת דורשים יותר זמן. לוח הזמנים נקבע לפי היקף אמיתי וזמינות התוכן והמשוב.' },
      { question: 'האם האתר יהיה מותאם למובייל?', answer: 'כן. המסכים, הניווט, הטפסים, התמונות והכפתורים נבדקים ברוחבים שונים ולא רק מצטמצמים אוטומטית.' },
      { question: 'אפשר לחבר אתר קיים למערכות אחרות?', answer: 'ברוב המקרים כן. אפשר לחבר CRM, דיוור, סליקה, יומן, WhatsApp, מערכות ניהול ו-API, לאחר בדיקת ההרשאות והממשק הקיים.' },
    ],
    relatedServices: ['custom-software', 'automation'],
  },
  {
    kind: 'service', slug: 'custom-software', title: 'פיתוח מערכות לעסקים בהתאמה לתהליך העבודה | CodeCrafter', description: 'פיתוח מערכות לעסקים בישראל: פורטלים, דשבורדים, ניהול תהליכים וכלים פנימיים שמרכזים מידע, מצמצמים עבודה ידנית ומתאימים לצמיחה.', eyebrow: 'שירותי CodeCrafter', h1: 'פיתוח מערכות לעסקים בהתאמה אישית',
    intro: ['כאשר גיליונות, הודעות וכלים נפרדים כבר אינם מצליחים להחזיק את התהליך, מערכת עסקית מותאמת יכולה להפוך עבודה מפוזרת לזרימה אחת ברורה. CodeCrafter מתכננת ומפתחת מערכות סביב המשתמשים, ההרשאות, המידע והפעולות שהעסק באמת מבצע.', 'הפתרון אינו מתחיל מרשימת פיצ׳רים. הוא מתחיל במיפוי הדרך שבה פנייה הופכת ללקוח, הזמנה עוברת טיפול, משימה מקבלת בעלים או הנהלה מקבלת תמונת מצב. רק לאחר שהזרימה ברורה בוחרים ארכיטקטורה וטכנולוגיה.'],
    sections: [
      { heading: 'הסימנים שהעסק צריך מערכת מותאמת', items: ['אותו מידע מוזן כמה פעמים במקומות שונים', 'אין מקור אמת אחד לסטטוס של לקוח או פרויקט', 'עובדים תלויים בזיכרון ובהודעות פרטיות', 'דוחות דורשים איסוף ידני לפני כל החלטה', 'תוכנה קיימת מכריחה את העסק לעבוד בצורה שאינה מתאימה לו'] },
      { heading: 'מי מרוויח מהשירות', paragraphs: ['הפתרון מתאים לצוותים שיש להם תהליך מובחן אבל חסר להם כלי שמחבר אותו, לעסקים שצומחים מעבר ליכולת של גיליון, ולחברות שרוצות ליצור מוצר דיגיטלי ללקוחות או לשותפים. מערכת מותאמת אינה תמיד הבחירה הנכונה; אם כלי מדף פותר את הבעיה באופן אמין ובעלות סבירה, עדיף לעיתים לחבר ולהגדיר אותו במקום לפתח הכול מחדש.'] },
      { heading: 'מערכות שאפשר לפתח', items: ['פורטלים ללקוחות, ספקים או עובדים', 'דשבורדים ניהוליים ודוחות תפעוליים', 'ניהול הזמנות, משימות, מסמכים ואישורים', 'מערכות תוכן וניהול מידע ייעודיות', 'כלי הצעות מחיר, קליטה ושירות', 'אינטגרציות בין שירותים ותהליכי API'] },
      { heading: 'תהליך שמצמצם סיכון', paragraphs: ['בשלב הראשון מגדירים משתמשים, תרחישים, הרשאות, נתונים ומדדי הצלחה. לאחר מכן בונים אב-טיפוס או גרסה מצומצמת שמוכיחה את הזרימה המרכזית. הפיתוח מתקדם ביחידות שניתן לבדוק, עם מצבי טעינה, הצלחה, שגיאה, ריק ומלא היכן שהם רלוונטיים. כך המשתמש אינו נשאר מול מסך לא ברור, והעסק יכול לתת משוב לפני שהמערכת מתרחבת.', 'לפני מסירה נבדקים אבטחת הרשאות, טיפול בשגיאות, גיבוי או ייצוא לפי הצורך, נגישות, ביצועים ומובייל. תיעוד והדרכה מותאמים למי שיתפעל את המערכת בפועל.'] },
      { heading: 'טכנולוגיות וחיבורים', paragraphs: ['המערכת יכולה לכלול ממשק React, שרת ו-API, מסד נתונים, אחסון קבצים, אימות משתמשים ושירותי ענן. ניתן להתחבר למערכות CRM, דוא״ל, יומנים, חשבוניות, טפסים, שירותי AI ומקורות מידע קיימים — רק על בסיס API והרשאות אמיתיים, ללא פתרונות שבירים או חשיפת סודות בדפדפן.'] },
      { heading: 'התוצאה העסקית', paragraphs: ['מערכת טובה מפחיתה חיפוש והקלדה, יוצרת אחריות ברורה, מאפשרת למדוד עומסים ומקצרת את הדרך בין אירוע לפעולה. היא גם משמרת ידע בתוך התהליך במקום להשאיר אותו אצל אדם אחד. הערך נמדד בזמן שנחסך, בשגיאות שנמנעות וביכולת של העסק לתת שירות עקבי יותר.'] },
    ],
    faq: [
      { question: 'האם חייבים להחליף את כל המערכות הקיימות?', answer: 'לא. לעיתים נכון לבנות שכבה שמחברת כלים קיימים, ולעיתים להחליף רק את החלק שיוצר את צוואר הבקבוק.' },
      { question: 'איך מתחילים מערכת גדולה?', answer: 'מגדירים תהליך מרכזי וגרסה ראשונה מדידה. לאחר שימוש אמיתי מוסיפים מודולים לפי ערך וסיכון, ולא לפי רשימת משאלות ארוכה.' },
      { question: 'אפשר להגדיר הרשאות שונות?', answer: 'כן. תפקידי משתמש והרשאות נקבעים באפיון ונאכפים בצד השרת, לא רק באמצעות הסתרת כפתורים.' },
      { question: 'האם המערכת יכולה לעבוד בטלפון?', answer: 'כן, אם תרחישי השימוש דורשים זאת. ממשק רספונסיבי או אפליקציה נבחרים לפי הקשר העבודה, החומרה והצורך בעבודה לא מקוונת.' },
    ], relatedServices: ['crm-development', 'automation', 'app-development'],
  },
  {
    kind: 'service', slug: 'automation', title: 'אוטומציה לעסקים וחיבור תהליכי עבודה | CodeCrafter', description: 'אוטומציה לעסקים שמחברת טפסים, CRM, דוא״ל, WhatsApp, מסמכים ו-AI כדי לצמצם משימות ידניות ולשמור על תהליך אמין ומבוקר.', eyebrow: 'שירותי CodeCrafter', h1: 'אוטומציה לעסקים שמפנה זמן לעבודה החשובה',
    intro: ['אוטומציה טובה אינה רק פעולה שרצה בלי אדם. היא תהליך ברור שיודע מתי להתחיל, אילו נתונים נדרשים, מה נחשב הצלחה ומה קורה כשמשהו נכשל. CodeCrafter בונה אוטומציות שמחברות בין הכלים שכבר קיימים בעסק ומוסיפות בקרה במקום לייצר קופסה שחורה.', 'המטרה יכולה להיות תגובה מהירה יותר ללידים, העברת מידע בלי העתקה, יצירת מסמכים, תזכורות, סנכרון סטטוסים או סיוע של AI במשימה מוגדרת. בכל מקרה נשמרת אפשרות להבין מה קרה ולהתערב כשצריך.'],
    sections: [
      { heading: 'תהליכים שכדאי לבחון לאוטומציה', items: ['קליטת ליד מטופס והקצאתו לאדם הנכון', 'שליחת אישורים, תזכורות ועדכוני סטטוס', 'פתיחת משימות בעקבות אירוע עסקי', 'סנכרון בין CRM, גיליונות, יומן ודוא״ל', 'יצירת מסמך או סיכום מנתונים מאושרים', 'סיווג ועיבוד מידע בעזרת AI עם ביקורת אנושית'] },
      { heading: 'למי אוטומציה מתאימה', paragraphs: ['אוטומציה מתאימה במיוחד לפעולה שחוזרת בתדירות גבוהה, מבוססת על כללים ברורים וגוזלת זמן או יוצרת שגיאות. היא פחות מתאימה לתהליך שמשתנה בכל פעם, להחלטה רגישה ללא בקרה או למצב שבו הנתונים המקוריים אינם אמינים. האפיון בודק את נפח הפעולות, החריגים, עלות הטעות והמערכות המעורבות לפני שנכתב חיבור.'] },
      { heading: 'מה אפשר לחבר', paragraphs: ['אפשר לעבוד עם טפסים ואתרים, מערכות CRM, שירותי דוא״ל, WhatsApp דרך ממשק מורשה, יומנים, מסדי נתונים, אחסון קבצים, כלי ניהול ו-API של ספקים. החיבור תלוי בתנאי השירות ובהרשאות שהספק נותן. פרטי גישה נשמרים בצד שרת או בסודות סביבתיים ולא בקוד שנשלח למשתמש.'] },
      { heading: 'איך בונים תהליך אמין', paragraphs: ['משרטטים את האירוע שמתחיל את התהליך, כל שלב, ההחלטות, הנתונים והבעלים. מגדירים מניעת כפילויות, ניסיונות חוזרים, רישום אירועים והתראה כאשר נדרשת פעולה אנושית. לאחר מכן בונים סביבת בדיקה ומריצים תרחישי הצלחה, כשל, מידע חסר ותוצאה ריקה לפני הפעלה אמיתית.', 'בהשקה מתחילים בהיקף מבוקר, משווים בין התהליך החדש לישן ורק אז מרחיבים. אוטומציה קריטית צריכה ניטור ודרך בטוחה לעצור או לתקן אותה.'] },
      { heading: 'AI כחלק מאוטומציה', paragraphs: ['AI יכול לעזור בסיכום, סיווג, חילוץ שדות, הצעת ניסוח או ניתוב. הוא אינו צריך להציג ניחוש כעובדה או לבצע פעולה רגישה בלי גבולות. מגדירים קלט מותר, בדיקות, רמת ביטחון, שמירת פרטיות ומתי מעבירים את ההחלטה לאדם.'] },
      { heading: 'מה העסק מרוויח', paragraphs: ['הערך הוא רצף עבודה מהיר ועקבי יותר: פחות העתקות, פחות פריטים שנופלים בין הכיסאות, תגובה מהירה יותר ויכולת לראות היכן התהליך נעצר. במקום לבזבז זמן על העברת מידע, הצוות יכול להתמקד בשיחה, שירות והחלטות.'] },
    ],
    faq: [
      { question: 'כמה זמן לוקח לבנות אוטומציה?', answer: 'חיבור ממוקד יכול לקחת ימים, ותהליך רב-מערכתי עשוי לקחת מספר שבועות. משך העבודה תלוי באיכות ה-API, בכמות החריגים ובבדיקות הנדרשות.' },
      { question: 'האם אפשר להתחבר למערכת קיימת?', answer: 'כן כאשר יש API, Webhook, ייצוא מסודר או דרך מורשית אחרת. לפני התחייבות נבדקת הגישה בפועל.' },
      { question: 'מה קורה כשהאוטומציה נכשלת?', answer: 'מתכננים מראש לוג, התראה, ניסיונות חוזרים והעברה לאדם. כשל לא אמור להיעלם בשקט.' },
      { question: 'האם אפשר להשתמש ב-WhatsApp?', answer: 'כן באמצעות פתרון רשמי ומתאים לחשבון העסקי ולסוג ההודעות. לא עוקפים מגבלות של הפלטפורמה ולא משתמשים בפרטי התחברות לא מורשים.' },
    ], relatedServices: ['custom-software', 'crm-development'],
  },
  {
    kind: 'service', slug: 'crm-development', title: 'פיתוח מערכת CRM בהתאמה אישית לעסק | CodeCrafter', description: 'אפיון ופיתוח CRM מותאם לתהליך המכירה והשירות: לידים, לקוחות, משימות, הרשאות, דוחות ואינטגרציות במערכת אחת ברורה.', eyebrow: 'שירותי CodeCrafter', h1: 'פיתוח מערכת CRM בהתאמה אישית',
    intro: ['CRM צריך לעזור לצוות לדעת מי הלקוח, מה קרה עד עכשיו ומה הפעולה הבאה. כאשר המערכת עמוסה בשדות לא רלוונטיים או אינה תואמת את תהליך המכירה, העובדים מפסיקים לעדכן אותה והמידע חוזר להודעות ולגיליונות. CodeCrafter מתכננת CRM סביב שלבי העבודה האמיתיים ולא סביב תבנית קבועה.', 'אפשר לבנות מערכת חדשה או שכבה מותאמת מעל כלים קיימים. ההחלטה מתקבלת לפי מורכבות התהליך, מספר המשתמשים, סוגי ההרשאות, החיבורים הנדרשים ועלות התחזוקה לאורך זמן.'],
    sections: [
      { heading: 'בעיות שהמערכת נועדה לפתור', items: ['לידים ללא בעלים או המשך טיפול', 'היסטוריית לקוח מפוזרת בין עובדים וכלים', 'חוסר עקביות בשלבי המכירה', 'משימות ותזכורות שמתבצעות ידנית', 'דוחות שאינם משקפים את הנתונים בזמן אמת', 'גישה רחבה מדי למידע רגיש'] },
      { heading: 'למי CRM מותאם מתאים', paragraphs: ['הפתרון מתאים לעסק עם תהליך מכירה או שירות ייחודי, כמה סוגי לקוחות, צוותים בעלי הרשאות שונות או צורך בחיבור עמוק למערכת תפעולית. לעסק קטן עם תהליך סטנדרטי ייתכן שמערכת מדף מוגדרת היטב תהיה חסכונית יותר; ניתן לסייע גם בבחירה, בהגדרה ובאינטגרציה שלה.'] },
      { heading: 'רכיבים אפשריים', items: ['קליטת לידים ממקורות שונים ומניעת כפילויות', 'כרטיס לקוח עם היסטוריה, מסמכים ופעילויות', 'שלבי מכירה מותאמים ותצוגת צינור', 'משימות, תזכורות ובעלות ברורה', 'הרשאות לפי תפקיד, צוות ורשומה', 'דוחות, חיפוש, סינון וייצוא', 'חיבור לדוא״ל, טפסים, יומן, WhatsApp ומערכות תפעול'] },
      { heading: 'אפיון ופיתוח', paragraphs: ['ממפים כיצד ליד נכנס, מי מטפל בו, אילו פרטים נחוצים בכל שלב ומה גורם למעבר לשלב הבא. מתכננים שדות רק כאשר יש להם שימוש בהחלטה, באוטומציה או בדיווח. לאחר מכן נבנית גרסה שמכסה את הזרימה המרכזית, ונבדקת עם משתמשים אמיתיים לפני הרחבה.', 'הממשק כולל מצבים ברורים למידע שנטען, רשימה ריקה, שמירה מוצלחת וכשל. הרשאות נבדקות גם בצד השרת, ופעולות חשובות מקבלות תיעוד מתאים.'] },
      { heading: 'אינטגרציות והעברת מידע', paragraphs: ['CRM יכול להפוך למרכז תהליך רק כאשר החיבורים אמינים. בודקים API, Webhooks, מגבלות קצב, פורמט נתונים וזהות רשומה בין המערכות. בהעברה ממערכת קיימת מנקים וממפים נתונים לפני הייבוא, שומרים גיבוי ומבצעים בדיקת מדגם.'] },
      { heading: 'יתרונות לעסק', paragraphs: ['הצוות מקבל סדר יום ברור והנהלה מקבלת תמונת מצב בלי לאסוף עדכונים ידנית. הלקוח מקבל המשכיות גם כשהמטפל מתחלף. לאורך זמן אפשר לזהות צווארי בקבוק, לשפר זמני תגובה ולבנות אוטומציות על בסיס נתונים מסודרים.'] },
    ],
    faq: [
      { question: 'לבנות CRM או להשתמש במערכת קיימת?', answer: 'בוחנים את הפער בין התהליך לכלי המדף, עלות רישוי, אינטגרציות ותחזוקה. התאמה אישית מוצדקת כשהפער העסקי מהותי ומתמשך.' },
      { question: 'אפשר להעביר נתונים מ-CRM ישן?', answer: 'בדרך כלל כן באמצעות API או ייצוא. לפני מעבר מבצעים מיפוי, ניקוי, גיבוי ובדיקת איכות.' },
      { question: 'אפשר להגביל מידע לפי עובד?', answer: 'כן. אפשר להגדיר הרשאות לפי תפקיד, צוות, לקוח או פעולה ולבדוק אותן בצד השרת.' },
      { question: 'המערכת מותאמת למובייל?', answer: 'כן כאשר העבודה מתבצעת בשטח או בטלפון. תרחישים קריטיים מקבלים ממשק מותאם וטאפ-טארגטים נוחים.' },
    ], relatedServices: ['custom-software', 'automation'],
  },
  {
    kind: 'service', slug: 'app-development', title: 'פיתוח אפליקציות לעסקים וללקוחות | CodeCrafter', description: 'פיתוח אפליקציות Web ומובייל לעסקים: אפיון, חוויית משתמש, API, נתונים, אינטגרציות ובדיקות — ממוצר ראשון ועד מערכת יציבה.', eyebrow: 'שירותי CodeCrafter', h1: 'פיתוח אפליקציות לעסקים סביב שימוש אמיתי',
    intro: ['אפליקציה מוצלחת מתחילה בסיבה ברורה להשתמש בה. היא יכולה לעזור ללקוחות לבצע פעולה שחוזרת על עצמה, לאפשר לעובדים לעבוד מהשטח, להציג מידע אישי או להפוך שירות למוצר דיגיטלי. CodeCrafter מתכננת את הזרימה, הטכנולוגיה והתפעול יחד כדי שהאפליקציה לא תהיה רק אוסף מסכים.', 'לפני בחירה בין Web, Android, iOS או פתרון משולב, בודקים מי המשתמש, באיזה מכשיר וסביבה הוא עובד, האם נדרשות התראות, מצלמה, עבודה ללא חיבור, חנות אפליקציות או עדכונים מהירים. הבחירה הטכנית צריכה לשרת את המוצר ואת עלות התחזוקה.'],
    sections: [
      { heading: 'אילו מוצרים אפשר לפתח', items: ['אפליקציות לקוחות ושירות עצמי', 'כלים לעובדים ולאנשי שטח', 'פורטלים ומערכות Web מותאמות לנייד', 'מוצרים עם חשבון אישי, הרשאות ותשלומים', 'יישומים שמתחברים לחיישנים או ליכולות מכשיר כאשר נדרש', 'אפליקציות תוכן, מעקב ותהליכים'] },
      { heading: 'למי השירות מתאים', paragraphs: ['השירות מתאים לעסק שכבר זיהה פעולה חוזרת או בעיה ברורה אצל המשתמשים, לחברה שרוצה להחליף תהליך ידני וליזם שצריך לבדוק מוצר בצורה אחראית. רעיון ראשוני אינו חייב להגיע עם מפרט מלא; הוא כן צריך להגיע עם נכונות להגדיר קהל, תרחיש מרכזי ומדד שיאפשר ללמוד.'] },
      { heading: 'מגרסה ראשונה למוצר', paragraphs: ['מתחילים בהגדרת הבעיה והפעולה המרכזית. בונים מסלולי משתמש ואב-טיפוס, בוחרים גרסה ראשונה שמספקת ערך שלם ומפרידים ממנה רעיונות שאפשר לדחות. הפיתוח כולל ממשק, API, מסד נתונים, הרשאות ושירותים חיצוניים לפי הצורך.', 'נבדקים מצבי הרשמה, מידע ריק, טעינה, הצלחה, כשל, עבודה ברשת איטית ותוכן ארוך. באפליקציה ניידת נבדקים גם מקלדת, אזורים בטוחים, הרשאות מערכת, ניווט וחזרה מרקע.'] },
      { heading: 'טכנולוגיה ואינטגרציות', paragraphs: ['אפשר לפתח אפליקציית Web רספונסיבית, PWA, Android או פתרון רב-פלטפורמי. צד השרת יכול לכלול אימות, מסד נתונים, אחסון, תשלומים, התראות ו-API. חיבור למערכות עסקיות נעשה דרך ממשקים מורשים, עם הפרדה בין מידע ציבורי לסודות ועם טיפול בכשלי ספק.'] },
      { heading: 'איכות, פרטיות והפצה', paragraphs: ['בדיקות אוטומטיות וידניות מותאמות לסיכון: זרימות קריטיות, הרשאות, ביצועים, נגישות ומכשירים מייצגים. מגדירים איזה מידע באמת צריך לאסוף, כמה זמן לשמור אותו ומה יוצג למשתמש. פרסום לחנויות, חשבונות ספק ואישורי API הם שלבים חיצוניים שדורשים הרשאה אמיתית ואינם נחשבים מושלמים עד שאושרו בפועל.'] },
      { heading: 'הערך לעסק ולמשתמש', paragraphs: ['אפליקציה מדויקת מאפשרת שירות זמין, מפחיתה תלות בנציג, אוספת מידע בצורה מסודרת ויוצרת חוויה עקבית. גרסה ראשונה ממוקדת גם מאפשרת ללמוד מוקדם ולהשקיע בהמשך רק במה שהמשתמשים באמת צריכים.'] },
    ],
    faq: [
      { question: 'כמה זמן לוקח לפתח אפליקציה?', answer: 'גרסה ממוקדת עשויה לקחת מספר שבועות; מוצר רחב יותר נבנה בשלבים. הזמן תלוי במספר הזרימות, באינטגרציות ובדרישות ההפצה.' },
      { question: 'האם צריך גם Android וגם iPhone?', answer: 'לא תמיד. בוחנים את קהל היעד ואת הצורך ביכולות מכשיר. לעיתים Web או פתרון רב-פלטפורמי מספקים ערך מהר יותר.' },
      { question: 'אפשר להתחבר למערכת העסקית שלנו?', answer: 'כן אם קיימת דרך מורשית לגשת לנתונים. בודקים API, אבטחה, קצב ושדות לפני התכנון הסופי.' },
      { question: 'מי מפרסם את האפליקציה בחנות?', answer: 'אפשר ללוות את תהליך ההכנה וההגשה, אך חשבון המפתח והאישור הסופי שייכים לבעל העסק ולספק החנות.' },
    ], relatedServices: ['custom-software', 'automation'],
  },
]

const enServices: SeoPage[] = heServices.map((page) => ({
  ...page,
  title: `${serviceLabels.en[page.slug]} for growing businesses | CodeCrafter`,
  description: `Practical ${serviceLabels.en[page.slug].toLowerCase()} designed around real workflows, clear user journeys, reliable integrations, accessibility, and maintainable technology.`,
  eyebrow: 'CodeCrafter services',
  h1: serviceLabels.en[page.slug],
  intro: [
    `CodeCrafter plans and builds ${serviceLabels.en[page.slug].toLowerCase()} around the people, information, and decisions that make the business work. The goal is a useful product that reduces friction, communicates value clearly, and remains understandable after launch.`,
    'Every engagement starts with the business problem and the primary user journey. Scope, technology, integrations, accessibility, performance, and measurement are then chosen to support that journey—not to add complexity for its own sake.',
  ],
  sections: [
    { heading: 'Problems this service can solve', items: page.sections[0].items?.map((_, index) => ['Disconnected information and repeated manual entry', 'An unclear customer or employee journey', 'Slow follow-up and tasks that fall between tools', 'Limited visibility into status and ownership', 'Software that no longer fits the way the business operates'][index] ?? 'A recurring operational bottleneck') },
    { heading: 'Who it is for', paragraphs: ['This service is suited to Israeli and international businesses with a defined customer or operational problem, teams that have outgrown generic workflows, and founders who want to validate a focused digital product. If an existing tool solves the need more reliably, CodeCrafter can recommend configuration or integration instead of unnecessary custom development.'] },
    { heading: 'What CodeCrafter can build', items: ['Responsive customer-facing experiences', 'Secure portals, dashboards, and internal tools', 'Forms, workflows, notifications, and reporting', 'Integrations with authorized APIs and existing systems', 'Hebrew RTL and English LTR interfaces', 'Maintainable foundations that can grow in measured stages'] },
    { heading: 'How the process works', paragraphs: ['Discovery maps users, inputs, decisions, permissions, exceptions, and the desired outcome. A focused information architecture or prototype makes the core flow testable before the build expands. Implementation then proceeds in reviewable increments.', 'Relevant screens include loading, empty, filled, success, and failure behavior. Before release, critical paths, mobile layouts, accessibility, metadata, performance, security boundaries, and integrations are checked in the real runtime.'] },
    { heading: 'Technology and integrations', paragraphs: ['The stack is selected for the job and may include React, server APIs, databases, cloud services, mobile technology, analytics, email, calendars, CRM platforms, or AI-assisted workflows. Credentials remain server-side, provider limits are respected, and external approval is never presented as complete before it is verified.'] },
    { heading: 'Business value', paragraphs: ['A well-designed solution can reduce duplicate work, clarify ownership, shorten response times, create a consistent customer experience, and give the business better information for decisions. Success is tied to the real workflow rather than a purely visual launch.'] },
  ],
  faq: [
    { question: 'How much does the service cost?', answer: 'Cost depends on scope, user roles, content, integrations, and operational risk. A short discovery produces a phased proposal with the required work separated from optional improvements.' },
    { question: 'How long does development take?', answer: 'A focused first release may take several weeks, while broader products are delivered in stages. Timing is based on real dependencies and review availability.' },
    { question: 'Can it connect to our existing tools?', answer: 'Usually, when the provider offers an authorized API, webhook, or export. Access and limitations are verified before the integration is promised.' },
    { question: 'Will it work on mobile?', answer: 'Yes when the use case requires it. Layout, controls, forms, content, and critical workflows are checked at representative phone and desktop sizes.' },
  ],
}))

const sharedPages: Record<Language, SeoPage[]> = {
  he: [
    {
      kind: 'about', slug: 'about', title: 'משה שוורצברג | מייסד CodeCrafter', description: 'הכירו את משה שוורצברג, מייסד CodeCrafter: פיתוח אתרים, מערכות, CRM, אפליקציות ואוטומציות לעסקים בגישה ישירה ומעשית.', eyebrow: 'אודות', h1: 'משה שוורצברג, מייסד CodeCrafter',
      intro: ['CodeCrafter היא פעילות הפיתוח של משה שוורצברג. היא נועדה לעזור לעסקים להפוך צורך אמיתי — אתר שמביא פניות, מערכת שמסדרת עבודה או אוטומציה שחוסכת זמן — למוצר דיגיטלי ברור, שימושי וניתן לתחזוקה.', 'העבודה משלבת חשיבה עסקית, חוויית משתמש ופיתוח. במקום להתחיל מטרנד או מטכנולוגיה, משה מתחיל מהשיחה עם האנשים שמשתמשים בתהליך ומהתוצאה שהעסק צריך להשיג.'],
      sections: [
        { heading: 'מה CodeCrafter עושה', paragraphs: ['תחומי העבודה כוללים בניית אתרים, מערכות עסקיות, CRM ו-CMS, אינטגרציות, אוטומציות ואפליקציות. פרויקטים יכולים להיות חוויה ציבורית ללקוחות, כלי פנימי לצוות או חיבור בין מערכות קיימות.'] },
        { heading: 'גישה לעבודה עם לקוחות', items: ['אפיון בשפה ברורה והפרדה בין צורך לפיצ׳ר', 'התקדמות בשלבים שאפשר לראות ולבדוק', 'התאמה אמיתית לעברית RTL, אנגלית ומובייל', 'שקיפות לגבי תלות בספקים והרשאות חיצוניות', 'בדיקת המסלול בפועל ולא רק של קוד המקור'] },
        { heading: 'ניסיון שמופיע בעבודות', paragraphs: ['תיק העבודות כולל אתרי שירות, קטלוגים, פלטפורמות עסקיות, פורטלים וחוויות תוכן בתחומים שונים. תיק העבודות מציג פרויקטים וכתובות פעילות. תוצאות מספריות או פרטי מימוש שלא אומתו אינם מוצגים כעובדה.'] },
        { heading: 'המטרה', paragraphs: ['המטרה של CodeCrafter היא לתת לעסק כלי שעובד איתו: מסביר את הערך, מחבר מידע, מפחית חיכוך ומאפשר לצמוח בצורה מסודרת. לפעמים זה אתר חדש, לפעמים מערכת, ולפעמים שינוי ממוקד בחיבור שכבר קיים.'] },
      ], relatedServices: [...serviceSlugs], image: { src: '/about-photo-800.webp', alt: 'משה שוורצברג, מייסד CodeCrafter', kind: 'photo' },
    },
  ],
  en: [],
}

// The About profile remains bilingual; portfolio projects are shown as cards, not separate case-study routes.
sharedPages.en = sharedPages.he.map(page => ({
  ...page,
  image: page.image ? { ...page.image, alt: 'Portrait of Moshe Schwartzberg, founder of CodeCrafter' } : undefined,
  title: 'Moshe Schwartzberg | Founder of CodeCrafter',
  description: 'Meet Moshe Schwartzberg, founder of CodeCrafter, and the practical approach behind custom websites, business systems, CRM, automation and apps.',
  eyebrow: 'About',
  h1: 'Moshe Schwartzberg, founder of CodeCrafter',
  intro: [
    'CodeCrafter is the development practice founded by Moshe Schwartzberg. It helps businesses turn a concrete need—a website, system, CRM workflow, automation or app—into a clear and maintainable digital product.',
    'The work combines business analysis, user experience and implementation. Projects start with the people and process involved, then select technology that supports the desired outcome.',
  ],
  sections: [
    { heading: 'What CodeCrafter does', paragraphs: ['Work includes business websites, custom software, CRM and CMS development, integrations, automation and applications for customers or internal teams.'] },
    { heading: 'Approach to client work', items: ['Plain-language discovery', 'Visible, testable delivery stages', 'Hebrew RTL and English LTR presentation', 'Mobile and accessibility checks', 'Runtime verification before release claims'] },
    { heading: 'Work in the portfolio', paragraphs: ['The portfolio spans service sites, stores, platforms, portals and content experiences. Portfolio entries link directly to the public examples.'] },
    { heading: 'Purpose', paragraphs: ['CodeCrafter aims to deliver a working business tool that communicates value, connects information, reduces friction and can evolve responsibly.'] },
  ],
}))

export const pagesByLanguage: Record<Language, SeoPage[]> = {
  he: [...heServices, ...sharedPages.he],
  en: [...enServices, ...sharedPages.en],
}

export function getSeoPage(pathname: string, lang: Language) {
  const withoutLanguage = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  const slug = withoutLanguage.replace(/^\/+|\/+$/g, '')
  return pagesByLanguage[lang].find((page) => page.slug === slug)
}
