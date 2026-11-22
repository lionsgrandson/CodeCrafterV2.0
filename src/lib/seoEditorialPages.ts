import type { SeoPage } from './seoPages'
import { serviceLabels, serviceSlugs, localizePath, type Language } from './seoRoutes'
import { locationLinks } from './seoFactsPages'

const guides: Record<Language, SeoPage[]> = {
  "he": [
    {
      "kind": "directory",
      "slug": "guides",
      "title": "מדריכים מעשיים לבניית אתרים, CRM ומעבר חנות | CodeCrafter",
      "description": "ספריית מדריכים מעשיים של CodeCrafter: איך מתכננים אתר לעסק, מה בודקים לפני פיתוח CRM ואיך מעבירים חנות מ-WooCommerce ל-Shopify.",
      "eyebrow": "מרכז ידע",
      "h1": "מדריכים מעשיים לפני שמתחילים פרויקט פיתוח",
      "intro": [
        "כאן מרוכזים מדריכים שנועדו לעזור לבעלי עסקים לקבל החלטות לפני אפיון ופיתוח: מה חשוב לברר, אילו חומרים צריך להכין, ואיפה כדאי לבדוק מגבלות של מערכת קיימת.",
        "המידע מבוסס על עקרונות עבודה ובדיקות מעשיות. הוא אינו תחליף לאפיון פרטני או להתחייבות שמערכת מסוימת תתמוך בכל דרישה."
      ],
      "sections": [
        {
          "heading": "בחרו מדריך לפי הבעיה",
          "links": [
            {
              "label": "איך מתכננים אתר לעסק לפני שמתחילים?",
              "href": "/guides/planning-a-business-website/",
              "description": "קהל יעד, תוכן, עמודים, טפסים, נגישות, SEO ומדידה."
            },
            {
              "label": "איך מאפיינים מערכת CRM בהתאמה אישית?",
              "href": "/guides/planning-a-custom-crm/",
              "description": "תהליכים, הרשאות, מיגרציה, אינטגרציות ובדיקות."
            },
            {
              "label": "מעבר חנות מ-WooCommerce ל-Shopify",
              "href": "/guides/woocommerce-to-shopify-migration/",
              "description": "ייצוא מוצרים, וריאציות, הזמנות, הפניות ו-QA."
            }
          ]
        },
        {
          "heading": "מה התפקיד של המדריכים",
          "paragraphs": [
            "מדריך טוב מאפשר להבין את היקף העבודה ולבקש הצעת מחיר מדויקת יותר. כאשר יש מידע חסר — למשל ייצוא מוצרים לא מלא או גישה מוגבלת ל-API — כדאי לזהות זאת לפני שמגדירים לוחות זמנים או עלות סופית."
          ]
        }
      ],
      "relatedServices": [
        "websites",
        "custom-software",
        "crm-development",
        "shopify-development"
      ]
    },
    {
      "kind": "guide",
      "slug": "guides/planning-a-business-website",
      "title": "איך מתכננים אתר לעסק לפני בנייה? מדריך מעשי | CodeCrafter",
      "description": "מדריך לתכנון אתר עסקי: מטרות, קהל יעד, מבנה עמודים, חומרים, טפסים, נגישות, SEO, מדידה ובדיקות לפני השקה.",
      "eyebrow": "מדריך לפיתוח אתרים",
      "h1": "איך מתכננים אתר לעסק לפני שמתחילים לפתח?",
      "intro": [
        "הרבה פרויקטים מתחילים בשאלה באיזו טכנולוגיה לבנות, אבל זו אינה ההחלטה הראשונה. לפני כתיבת קוד כדאי להגדיר מה האתר צריך להסביר, מי אמור להשתמש בו ואיך נראית פנייה מוצלחת.",
        "המדריך מרכז החלטות שכדאי לקבל מראש כדי לצמצם תיקונים יקרים, כפילויות תוכן ושינויים לא צפויים באמצע העבודה."
      ],
      "sections": [
        {
          "heading": "1. הגדירו מטרה מרכזית וקהל יעד",
          "paragraphs": [
            "אתר תדמית, דף נחיתה, קטלוג וחנות נבנים סביב פעולות שונות. הגדירו מי מבקר באתר, איזו בעיה יש לו, ומה הוא צריך להבין לפני שיפנה או ירכוש. עבור כמה קהלים אפשר ליצור מסלולי ניווט נפרדים בלי לשכפל את אותו תוכן."
          ],
          "items": [
            "מה הפעולה החשובה ביותר: טופס, שיחה, רכישה או הרשמה?",
            "מי מקבל החלטה ומי בפועל משתמש בשירות?",
            "מה צריך להופיע במובייל לפני הגלילה הראשונה?"
          ]
        },
        {
          "heading": "2. בנו מפת עמודים לפי צורך ולא לפי מילות מפתח",
          "paragraphs": [
            "עמוד הבית מסביר מה העסק מציע ולמי. עמוד שירות מציג בעיה, תכולה, תהליך ודרך לפנייה. עמוד אודות מוסיף הקשר אנושי ופרטי עסק, ותיק עבודות מספק דוגמאות קונקרטיות. אין צורך ליצור עמוד חדש עבור כל וריאציה קטנה של חיפוש."
          ],
          "items": [
            "שירותים מובחנים עם ערך ייחודי",
            "פרויקטים אמיתיים עם תיאור העבודה שבוצעה",
            "שאלות נפוצות שמבהירות היקף, מגבלות ועלויות",
            "מדיניות פרטיות ותנאים במקום המתאים"
          ]
        },
        {
          "heading": "3. הכינו תוכן, תמונות והרשאות",
          "paragraphs": [
            "קבעו מי כותב ומאשר טקסט, מי מחזיק בזכויות לתמונות וללוגו, ואילו תיאורי לקוח מאושרים לפרסום. תוכן זמני שנשאר אחרי ההשקה עלול ליצור בלבול ואף להפריע להמרות."
          ],
          "items": [
            "לוגו וקבצים מקוריים באיכות מתאימה",
            "תיאור השירות בשפה של הלקוח",
            "תמונות מקוריות או תמונות שיש זכות להשתמש בהן",
            "פרטי קשר, דומיין, חשבונות וכלי מדידה בבעלות מוגדרת"
          ]
        },
        {
          "heading": "4. פרטיות, טפסים ונגישות",
          "paragraphs": [
            "טופס צריך לאסוף רק מידע רלוונטי, להציג הודעת הצלחה רק לאחר אישור קליטה ולספק חלופה כאשר השליחה נכשלת. מדידה חיצונית ומידע אישי מחייבים בחינה של דרישות פרטיות והסכמה לפי הדין והשימוש. בהיבטי נגישות יש לתכנן מבנה כותרות, ניווט מקלדת, תוויות לטפסים, טקסט חלופי ותצוגת טלפון."
          ]
        },
        {
          "heading": "5. SEO טכני ושימור כתובות",
          "paragraphs": [
            "בדקו שלעמודים יש כותרות ייחודיות ותיאורים מדויקים, H1 המתאר את התוכן, כתובת קנונית, קישורים פנימיים ויכולת קריאה של HTML גם בלי הפעלת JavaScript מצד הזחלן. אתר חדש שמחליף אתר פעיל צריך מיפוי כתובות והפניות 301 עבור עמודים שהשתנו."
          ]
        },
        {
          "heading": "6. בדיקות והעברת בעלות",
          "paragraphs": [
            "לפני העלייה לאוויר בודקים במובייל ובדסקטופ ניווט, טפסים, מדיה, קישורים, אינדוקס, תגיות שיתוף ותוכן. בסיום כדאי לקבל גישה לאחסון, לדומיין, לחשבונות שיווק ולתיעוד בסיסי של המערכת, ולא להישאר תלויים בסיסמאות של ספק יחיד."
          ]
        }
      ],
      "faq": [
        {
          "question": "האם כדאי לבחור מערכת לפני אפיון האתר?",
          "answer": "רצוי קודם להגדיר תוכן, משתמשים, תהליך עבודה ותקציב. לאחר מכן אפשר להשוות CMS קיים, קוד מותאם או פלטפורמת מסחר לפי הדרישות."
        },
        {
          "question": "כמה עמודים אתר עסקי צריך?",
          "answer": "מספר שנובע משירותים, קהלים ותוכן אמיתי. עמודים דומים מאוד אינם מוסיפים ערך רק מפני שהם מכוונים לביטויי חיפוש שונים."
        }
      ],
      "relatedServices": [
        "websites",
        "landing-page-development",
        "wordpress-development",
        "website-maintenance"
      ],
      "relatedProjects": [
        "sumsup",
        "aderet-argaman",
        "ilan-shachar"
      ]
    },
    {
      "kind": "guide",
      "slug": "guides/planning-a-custom-crm",
      "title": "איך מאפיינים מערכת CRM בהתאמה אישית? | CodeCrafter",
      "description": "צ'קליסט לפני פיתוח CRM: לידים, לקוחות, צוותים והרשאות, ייבוא נתונים, אוטומציות, אינטגרציות ואמינות המערכת.",
      "eyebrow": "מדריך לפיתוח מערכות",
      "h1": "איך מאפיינים מערכת CRM שמתאימה לתהליך העבודה?",
      "intro": [
        "מערכת CRM חדשה אינה מתחילה מטבלה של לקוחות אלא מהדרך שבה ליד נכנס, מי מטפל בו ואיך יודעים מה צריך לעשות בהמשך. כשמעתיקים תהליך לא ברור למערכת חדשה, מקבלים בדרך כלל אותה בעיה עם ממשק חדש.",
        "לפני שמחליטים אם לפתח CRM מותאם או להשתמש במוצר קיים, יש לתעד את התהליכים והמידע שהמשתמשים באמת צריכים."
      ],
      "sections": [
        {
          "heading": "1. הגדירו תהליך מקצה לקצה",
          "items": [
            "מאיפה נכנסים לידים ומי אחראי על כל ערוץ",
            "שלבי מכירה, משימות, תזכורות וסגירת טיפול",
            "מה קורה כשלקוח חוזר או נפתח ליד כפול",
            "מי מאשר שינויים ומתי צריך התערבות אנושית"
          ],
          "paragraphs": [
            "כדאי לתאר כמה מקרים אמיתיים, לרבות מקרה שבו לקוח לא עונה, עובר נציג, או נרשם דרך שני טפסים. אלה מציפים מצבי קצה שבדרך כלל לא מופיעים בסקיצה ראשונה."
          ]
        },
        {
          "heading": "2. תכננו מבנה נתונים והרשאות",
          "paragraphs": [
            "לקוחות, אנשי קשר, לידים, עסקאות ומשימות הם לא אותה ישות. הגדירו מזהים, קשרים, שדות חובה, היסטוריית שינוי וזכויות גישה. הרשאות חייבות להיבדק בצד השרת ולא רק על ידי הסתרת כפתורים."
          ],
          "items": [
            "מנהל, נציג, מנהל צוות ולקוח חיצוני",
            "גישה לרשומות לפי תפקיד, צוות ובעלות",
            "מחיקת נתונים, ייצוא, גיבוי ושחזור",
            "שדות רגישים ותיעוד פעולות"
          ]
        },
        {
          "heading": "3. בדקו חיבור למערכות קיימות",
          "paragraphs": [
            "מיפוי אינטגרציה צריך לציין מקור אמת לכל שדה, אופן אימות, תדירות סנכרון ואיך מטפלים בניתוק. API, Webhooks ומנגנוני ייצוא זמינים נקבעים לפי הרשאות ותוכנית הספק בפועל."
          ],
          "items": [
            "טפסי אתר ופרסום",
            "דוא״ל, יומן והתראות",
            "ERP, הנהלת חשבונות והזמנות",
            "ממשקי תשלום וקבצים רק בהסכמה והרשאה"
          ]
        },
        {
          "heading": "4. הסבו מידע בזהירות",
          "paragraphs": [
            "ייצוא ממערכת ישנה אינו מבטיח שהכול ניתן להעברה. יש לבדוק קידוד, שדות מותאמים, בעלות, הקשרים וקבצים. הריצו ייבוא מדגם, השוו ספירות, בדקו כפילויות ותעדו מה לא הועבר."
          ]
        },
        {
          "heading": "5. אמינות לפני השקה",
          "paragraphs": [
            "לוגים, ניסיונות חוזרים, תור המתנה עמיד ופעולות בטוחות מפני כפילות חיוניים במיוחד כאשר CRM מקבל מידע ממערכות אחרות. יש לבדוק כשל חיבור באמצע פעולה, חזרה מרשת לא זמינה, הרשאה שפגה ותאריך שמגיע עם אזור זמן אחר."
          ]
        },
        {
          "heading": "6. היקף גרסה ראשונה",
          "paragraphs": [
            "עדיף להשיק תהליך אחד שנבדק בפועל מאשר מערכת ענקית שחלקיה אינם בשימוש. הגדירו מה נחשב לסיום, למי מעבירים גרסה לבדיקה ואיזה מידע יסייע להחליט על הפיתוח הבא."
          ]
        }
      ],
      "faq": [
        {
          "question": "מתי CRM מותאם עדיף על פתרון מוכן?",
          "answer": "כאשר תהליך עסקי חריג, הרשאות מיוחדות או אינטגרציות עמוקות אינם אפשריים באופן סביר במוצר קיים. אם מוצר מדף עונה על הצורך, לרוב נכון להשוות אותו קודם."
        },
        {
          "question": "מה הדבר הכי חשוב בבדיקת מיגרציית CRM?",
          "answer": "התאמת רשומות וקשרים למקור, טיפול בכפילויות, הרשאות ותוכנית התאוששות שמגינה על מידע קיים."
        }
      ],
      "relatedServices": [
        "crm-development",
        "crm-migration",
        "crm-integrations",
        "custom-software",
        "integrations"
      ]
    },
    {
      "kind": "guide",
      "slug": "guides/woocommerce-to-shopify-migration",
      "title": "מעבר מ-WooCommerce ל-Shopify: צ'קליסט מלא | CodeCrafter",
      "description": "מה בודקים לפני מעבר מ-WooCommerce ל-Shopify: CSV מוצרים, וריאציות, תמונות, מלאי, הזמנות, כתובות והפניות SEO.",
      "eyebrow": "מדריך למעבר חנות",
      "h1": "איך עוברים מ-WooCommerce ל-Shopify בלי לאבד מידע חשוב?",
      "intro": [
        "העברת חנות היא לא רק העלאת קובץ CSV. שני המוצרים יכולים לייצג וריאציות, קטגוריות, תוספים, אפשרויות משלוח ושדות מוצרים בצורות שונות. לפני שנותנים הצעת מחיר למעבר, חשוב להבין מה המקור מסוגל לייצא ומה יהיה המבנה בחנות החדשה.",
        "המדריך מציג נקודות בדיקה שיכולות לשנות את היקף העבודה, את לוח הזמנים ואת בדיקות הקבלה."
      ],
      "sections": [
        {
          "heading": "1. קבלו ייצוא מלא ולא רשימת מוצרים חלקית",
          "paragraphs": [
            "בקשו ייצוא WooCommerce שכולל מזהים, שמות, תיאורים, SKU, מחירים, קטגוריות, תגיות, סטטוס פרסום, מלאי, וריאציות, תמונות ושדות מותאמים. שדות שלא מופיעים ב-CSV עשויים לדרוש ייצוא נוסף או טיפול ידני."
          ],
          "items": [
            "מוצרים פשוטים ומוצרים עם וריאציות",
            "תמונות ראשיות, גלריות וטקסטים חלופיים",
            "מחירים, מבצעים, מסים ומלאי",
            "שדות שמגיעים מתוספי צד שלישי"
          ]
        },
        {
          "heading": "2. מפו את מבנה החנות החדשה",
          "paragraphs": [
            "WooCommerce categories ו-Shopify collections אינם זהים בכל תרחיש. יש להגדיר קטגוריות, ניווט, פילטרים, סוגי מוצרים ווריאציות לפני הייבוא. בדקו במיוחד מוצרים שבהם יש שילובי מידה, צבע וחומר, או מגבלות מספר אפשרויות בפלטפורמה הנבחרת."
          ]
        },
        {
          "heading": "3. בדקו מידע היסטורי וחשבונות",
          "paragraphs": [
            "מוצרים, הזמנות, לקוחות, שוברים, חוות דעת ונתוני SEO לא תמיד עוברים באותה דרך. חלקם דורשים אפליקציה ייעודית, API או תהליך נפרד. לפני ההתחייבות כתבו במפורש מה כן עובר ומה לא, והימנעו מהבטחה להעברת סיסמאות לקוחות שאינה נתמכת."
          ]
        },
        {
          "heading": "4. שמרו על קישורים ויכולת איתור בגוגל",
          "paragraphs": [
            "צרו טבלה של כתובות חשובות באתר הישן והיעדים ב-Shopify. עבור URL שמשתנה קבעו הפניה קבועה מתאימה ובדקו שאין שרשראות או עמודי 404. המשיכו להשתמש בתוכן מוצר איכותי, קנוניקל והיררכיית ניווט במקום לנסות להעתיק תגיות ללא התאמה."
          ]
        },
        {
          "heading": "5. תשלומים, משלוחים ומיסוי",
          "paragraphs": [
            "החנות החדשה דורשת התאמה לספקי סליקה זמינים, מטבע, מדינה, מיסוי, משלוחים ואישורי הזמנה. יכולות של תוספים קיימים לא עוברות אוטומטית. בדקו תרחישי סל, קופון, החזר וכתובת משלוח בסביבת בדיקה."
          ]
        },
        {
          "heading": "6. ייבוא מדגם, אימות ומעבר",
          "paragraphs": [
            "ייבאו תחילה מדגם שמכיל מוצרים פשוטים ומורכבים, והשוו כל שדה למקור. לפני מעבר מלא בצעו בדיקות ספירה, תמונות, וריאציות, זמינות מלאי, סריקת כתובות, טופס יצירת קשר והזמנת ניסיון. הגדירו חלון מעבר, גיבוי ואחריות לתקלות ביום ההשקה."
          ]
        }
      ],
      "faq": [
        {
          "question": "האם קובץ CSV רגיל מ-WooCommerce מספיק למעבר?",
          "answer": "רק אם הוא כולל את כל השדות הדרושים וניתן למפות אותם לתבנית Shopify. תוספים, וריאציות מורכבות, מידע היסטורי ותמונות עשויים לדרוש מקורות נוספים."
        },
        {
          "question": "האם צריך לשנות את כל כתובות המוצרים?",
          "answer": "לא בהכרח. יש לבדוק כל מבנה URL ולהפנות כתובות שהשתנו ליעדים רלוונטיים. שינוי גדול ללא מיפוי עלול לפגוע בקישורים ובחוויית המשתמש."
        }
      ],
      "relatedServices": [
        "shopify-development",
        "wordpress-development",
        "ecommerce-development",
        "integrations",
        "website-maintenance"
      ]
    }
  ],
  "en": [
    {
      "kind": "directory",
      "slug": "guides",
      "title": "Practical Website, CRM & Ecommerce Guides | CodeCrafter",
      "description": "Practical CodeCrafter guides to planning a business website, defining custom CRM requirements and migrating from WooCommerce to Shopify.",
      "eyebrow": "Guides and resources",
      "h1": "Practical guides before commissioning a development project",
      "intro": [
        "These guides help business owners plan projects before discussing scope and budget: which decisions matter, what materials to prepare, and which dependencies need investigation.",
        "They describe practical planning and quality checks, not a guarantee that a specific platform can deliver every requested feature."
      ],
      "sections": [
        {
          "heading": "Choose a guide",
          "links": [
            {
              "label": "Planning a business website",
              "href": "/en/guides/planning-a-business-website/",
              "description": "Audience, content, page structure, forms, accessibility and SEO."
            },
            {
              "label": "Planning a custom CRM",
              "href": "/en/guides/planning-a-custom-crm/",
              "description": "Workflows, permissions, migrations, integrations and reliability."
            },
            {
              "label": "WooCommerce to Shopify migration",
              "href": "/en/guides/woocommerce-to-shopify-migration/",
              "description": "Exports, product variants, image mapping, 301 redirects and launch checks."
            }
          ]
        },
        {
          "heading": "How to use these checklists",
          "paragraphs": [
            "A useful brief identifies the real business goal, the files and access already available, and the unknowns that may affect scope or schedule. For unfamiliar vendor APIs or incomplete exports, verify feasibility before committing to dates or costs."
          ]
        }
      ],
      "relatedServices": [
        "websites",
        "custom-software",
        "crm-development",
        "shopify-development"
      ]
    },
    {
      "kind": "guide",
      "slug": "guides/planning-a-business-website",
      "title": "How to Plan a Business Website: Practical Checklist | CodeCrafter",
      "description": "A practical guide to website scope, target audience, page structure, content, forms, accessibility, technical SEO, measurement and launch checks.",
      "eyebrow": "Website planning guide",
      "h1": "How to plan a business website before development starts",
      "intro": [
        "Choosing React, WordPress or a site builder should not be the first decision. Start by defining what visitors need to understand, who will use the site, and what a successful enquiry looks like.",
        "A little planning before writing code reduces duplicated pages, incomplete content and late-stage changes."
      ],
      "sections": [
        {
          "heading": "1. Define the audience and primary action",
          "paragraphs": [
            "A service site, landing page, catalogue and store serve different purposes. Identify the target buyer, their questions and the main action. Distinct audiences may deserve separate paths without creating near-duplicate pages."
          ],
          "items": [
            "Enquiry, phone call, booking, purchase or sign-up?",
            "Who makes the buying decision?",
            "What must mobile visitors understand immediately?"
          ]
        },
        {
          "heading": "2. Plan pages around intent, not keyword variations",
          "paragraphs": [
            "A homepage explains the offer. A service page should cover a specific need, scope and next step. About and case-study pages provide identity and real examples. A separate URL is not justified solely by a small keyword variation."
          ],
          "items": [
            "Distinct service categories with meaningful differences",
            "Actual project evidence",
            "FAQs covering limitations and next steps",
            "Privacy and terms where relevant"
          ]
        },
        {
          "heading": "3. Prepare text, images and permissions",
          "paragraphs": [
            "Agree on who supplies and approves copy, brand assets, photographs and customer references. Avoid launching with placeholder content, unlicensed images or unsupported testimonials."
          ],
          "items": [
            "Logo and brand assets",
            "Accurate service information",
            "Original or licensed images and descriptive alternatives",
            "Domain, hosting and analytics account ownership"
          ]
        },
        {
          "heading": "4. Forms, privacy and accessibility",
          "paragraphs": [
            "Ask only for needed contact information, acknowledge a submission only after it is accepted, and provide a failure path. Review applicable privacy and tracking-consent requirements. Plan a logical heading hierarchy, keyboard access, form labels and responsive layouts."
          ]
        },
        {
          "heading": "5. Search-ready pages and URL continuity",
          "paragraphs": [
            "Check unique titles, descriptive H1s, canonical URLs, internal navigation, accessible content and renderable HTML. Replacing an existing website requires URL mapping and appropriate 301 redirects, especially for pages with inbound links."
          ]
        },
        {
          "heading": "6. Launch acceptance and handover",
          "paragraphs": [
            "Verify the mobile and desktop journey, contact delivery, links, images, crawlability, sharing previews and analytics settings. Confirm who owns the domain, hosting, content and administrative access after launch."
          ]
        }
      ],
      "faq": [
        {
          "question": "Should a platform be selected before defining the website scope?",
          "answer": "Usually no. Define user journeys, content, integrations and budget first, then compare suitable implementation options."
        },
        {
          "question": "How many pages does a small business website need?",
          "answer": "Only enough to cover genuinely distinct services, audience needs and useful content. Do not multiply near-identical pages for minor keyword variations."
        }
      ],
      "relatedServices": [
        "websites",
        "landing-page-development",
        "wordpress-development",
        "website-maintenance"
      ],
      "relatedProjects": [
        "sumsup",
        "aderet-argaman",
        "ilan-shachar"
      ]
    },
    {
      "kind": "guide",
      "slug": "guides/planning-a-custom-crm",
      "title": "Planning a Custom CRM: Requirements Checklist | CodeCrafter",
      "description": "Define custom CRM requirements for leads, customers, permissions, migration, automation, integrations, data integrity and operational reliability.",
      "eyebrow": "CRM planning guide",
      "h1": "How to plan a custom CRM around real business workflows",
      "intro": [
        "A CRM begins with what should happen when a new lead arrives, who owns the next action, and how progress is recorded. Moving an unclear process into a new interface rarely fixes it.",
        "Document the daily workflow and available data before deciding whether to buy an existing CRM or commission custom development."
      ],
      "sections": [
        {
          "heading": "1. Map lead-to-customer journeys",
          "items": [
            "Lead sources and assignment rules",
            "Pipeline stages, tasks and follow-ups",
            "Duplicate, dormant and returning contacts",
            "Approval steps and exceptional cases"
          ],
          "paragraphs": [
            "Use real examples, including leads arriving twice or being transferred between team members. These expose exceptions a first mockup may miss."
          ]
        },
        {
          "heading": "2. Define records and authorization",
          "paragraphs": [
            "Leads, contacts, organizations, opportunities and tasks are separate entities with relationships. Define stable IDs, required fields, ownership, audit history, and server-side permissions rather than relying on hidden UI controls."
          ],
          "items": [
            "Administrator, agent and team-manager roles",
            "Record-level ownership and visibility",
            "Export, deletion and restore rules",
            "Sensitive fields and action logging"
          ]
        },
        {
          "heading": "3. Check external integrations",
          "paragraphs": [
            "Each connection needs a source of truth, authentication, update direction, frequency, and documented failure behavior. Provider APIs and exports depend on authorized account permissions and plan limitations."
          ],
          "items": [
            "Website and campaign forms",
            "Email, calendar and notifications",
            "ERP, invoicing and order systems",
            "Payments or file access when authorized"
          ]
        },
        {
          "heading": "4. Validate migration and existing data",
          "paragraphs": [
            "An old-system export may not include every note, attachment, permission or historical record. Test a representative sample, preserve relationships, reconcile counts, and document unavailable fields before a bulk migration."
          ]
        },
        {
          "heading": "5. Design for failure and recovery",
          "paragraphs": [
            "Production integrations need error logs, bounded retries, durable queues and deduplication. Test mid-transfer disconnections, expired credentials, server replays and differing time-zone offsets. A successful HTTP request is not always confirmation that the receiving system committed the change."
          ]
        },
        {
          "heading": "6. Scope a usable first release",
          "paragraphs": [
            "Deliver an end-to-end workflow that real users can test before expanding to additional departments and automations. Define acceptance criteria and responsibilities for ongoing maintenance."
          ]
        }
      ],
      "faq": [
        {
          "question": "When is a custom CRM preferable to an off-the-shelf platform?",
          "answer": "When unusual workflows, permissions or deep integrations cannot reasonably be supported by suitable existing products. Compare those options before choosing custom development."
        }
      ],
      "relatedServices": [
        "crm-development",
        "crm-migration",
        "crm-integrations",
        "custom-software",
        "integrations"
      ]
    },
    {
      "kind": "guide",
      "slug": "guides/woocommerce-to-shopify-migration",
      "title": "WooCommerce to Shopify Migration Checklist | CodeCrafter",
      "description": "A practical WooCommerce to Shopify migration guide covering products, CSV fields, variants, orders, inventory, SEO redirects, payments and launch checks.",
      "eyebrow": "Ecommerce migration guide",
      "h1": "How to migrate from WooCommerce to Shopify without losing essential data",
      "intro": [
        "A store migration is more than importing a CSV. Products, variations, categories, attachments, payment options and custom plugin fields may work differently on each platform.",
        "Before estimating time or cost, identify which source fields can actually be exported and how each will be represented in the destination."
      ],
      "sections": [
        {
          "heading": "1. Audit the complete product export",
          "paragraphs": [
            "Request a WooCommerce export with product identifiers, SKUs, titles, descriptions, images, prices, inventory, categories, variants and custom metadata. Missing fields may require additional exports, API access or manual reconciliation."
          ],
          "items": [
            "Simple products and variants",
            "Main images, galleries and alt descriptions",
            "Pricing, promotions, tax and inventory",
            "Custom fields supplied by plugins"
          ]
        },
        {
          "heading": "2. Map collections and variants",
          "paragraphs": [
            "WooCommerce categories and Shopify collections are not automatically equivalent. Agree on navigation, filters, variant combinations and product relationships before importing. Review unusual product options against the destination platform's current constraints."
          ]
        },
        {
          "heading": "3. Review historical information",
          "paragraphs": [
            "Products, orders, customers, coupons, reviews and SEO fields may need different migration methods. Some require separate apps or APIs. Record what can and cannot move and never assume customer passwords are transferable."
          ]
        },
        {
          "heading": "4. Protect useful URLs",
          "paragraphs": [
            "Inventory existing product and category URLs, map changed paths to relevant destinations, configure permanent redirects where appropriate and test that there are no loops or unhandled 404s. Keep substantive product copy and meaningful internal links."
          ]
        },
        {
          "heading": "5. Payments, shipping and tax configuration",
          "paragraphs": [
            "Confirm compatible payment providers, countries, currency, taxes, shipping policies, notifications and refunds. Third-party plugin behavior does not automatically transfer. Test checkout, coupon and refund scenarios before launch."
          ]
        },
        {
          "heading": "6. Sample import and acceptance testing",
          "paragraphs": [
            "Import representative simple and complex products first. Compare quantities, variants, images, inventory and descriptions to the source. Then test navigation, checkout, forms, search, redirects and a sample order in a safe test environment. Define backups and an agreed cutover plan."
          ]
        }
      ],
      "faq": [
        {
          "question": "Is a WooCommerce product CSV enough to migrate everything?",
          "answer": "Only when it contains all required fields in a mappable format. Complex variants, plugin metadata, order history, reviews and other records often need additional sources."
        },
        {
          "question": "Should every old product URL change?",
          "answer": "Not necessarily. Review each URL pattern and create relevant redirects for changed addresses. Avoid mass redirects to the homepage."
        }
      ],
      "relatedServices": [
        "shopify-development",
        "wordpress-development",
        "ecommerce-development",
        "integrations",
        "website-maintenance"
      ]
    }
  ]
}

export const guideLabels: Record<Language, Record<string, string>> = {
  he: { 'guides/planning-a-business-website': 'מדריך לתכנון אתר עסקי', 'guides/planning-a-custom-crm': 'מדריך לאפיון CRM', 'guides/woocommerce-to-shopify-migration': 'מדריך מעבר WooCommerce ל-Shopify' },
  en: { 'guides/planning-a-business-website': 'Planning a business website', 'guides/planning-a-custom-crm': 'Planning a custom CRM', 'guides/woocommerce-to-shopify-migration': 'WooCommerce to Shopify migration' },
}

export const relatedGuidesByService: Record<string, string[]> = {
  websites: ['guides/planning-a-business-website'],
  'landing-page-development': ['guides/planning-a-business-website'],
  'website-maintenance': ['guides/planning-a-business-website', 'guides/woocommerce-to-shopify-migration'],
  'wordpress-development': ['guides/woocommerce-to-shopify-migration', 'guides/planning-a-business-website'],
  'shopify-development': ['guides/woocommerce-to-shopify-migration'],
  'ecommerce-development': ['guides/woocommerce-to-shopify-migration'],
  'custom-software': ['guides/planning-a-custom-crm'],
  'crm-development': ['guides/planning-a-custom-crm'],
  'crm-migration': ['guides/planning-a-custom-crm'],
  'crm-integrations': ['guides/planning-a-custom-crm'],
  integrations: ['guides/planning-a-custom-crm'],
  'erp-development': ['guides/planning-a-custom-crm'],
}

const publicCaseStudies = [
  ['portfolio/yuval-kadosh', 'Yuval Kadosh'],
  ['portfolio/rainbow-asd', 'Rainbow ASD'],
  ['portfolio/sumsup', 'SumsUp'],
  ['portfolio/project-orion', 'Project Orion'],
  ['portfolio/shimon-photography', 'Shimon Cohen Photography'],
  ['portfolio/aderet-argaman', 'Aderet & Argaman'],
  ['portfolio/coderecovery', 'CodeRecovery'],
  ['portfolio/ilan-shachar', 'Ilan Shachar'],
  ['portfolio/green-therapy', 'Green Therapy'],
] as const

function sitemapPage(lang: Language): SeoPage {
  const he = lang === 'he'
  const link = (slug: string, label: string) => ({ label, href: localizePath(slug, lang) })
  return {
    kind: 'directory', slug: 'site-map',
    title: he ? 'מפת אתר: כל השירותים, המדריכים והפרויקטים | CodeCrafter' : 'Website Sitemap: Services, Guides & Projects | CodeCrafter',
    description: he ? 'מפת האתר של CodeCrafter עם קישורים לשירותי פיתוח, מדריכים, מקרי בוחן, אזורי שירות, מחירון, אודות ומדיניות.' : 'Browse the CodeCrafter HTML sitemap: services, practical guides, portfolio case studies, service areas, pricing and legal pages.',
    eyebrow: he ? 'מפת אתר' : 'HTML sitemap',
    h1: he ? 'מפת האתר — כל העמודים החשובים ב-CodeCrafter' : 'CodeCrafter website sitemap',
    intro: [he ? 'מפה נוחה לניווט בעמודים הציבוריים של CodeCrafter. לפרוטוקולי סריקה יש גם sitemap.xml נפרד שמתעדכן בזמן הבנייה.' : 'A human-readable list of CodeCrafter’s public pages. An XML sitemap is also generated during deployment for search crawlers.'],
    sections: [
      { heading: he ? 'עמודים מרכזיים' : 'Main pages', links: [link('', he ? 'בית' : 'Home'), link('services', he ? 'כל השירותים' : 'All services'), link('portfolio', he ? 'תיק עבודות' : 'Portfolio'), link('guides', he ? 'מדריכים' : 'Guides'), link('about', he ? 'אודות' : 'About'), link('pricing', he ? 'מחירון' : 'Pricing'), link('locations', he ? 'אזורי שירות' : 'Service areas'), link('resume', he ? 'תיק עבודות מקצועי למגייסים' : 'Technical résumé')] },
      { heading: he ? 'שירותי פיתוח' : 'Development services', links: serviceSlugs.map(slug => link(slug, serviceLabels[lang][slug])) },
      { heading: he ? 'מקרי בוחן ופרויקטים' : 'Project case studies', links: publicCaseStudies.map(([slug, label]) => link(slug, label)) },
      { heading: he ? 'מדריכים' : 'Practical guides', links: Object.entries(guideLabels[lang]).map(([slug, label]) => link(slug, label)) },
      { heading: he ? 'אזורי שירות' : 'Service areas', links: locationLinks[lang].map(({slug,label}) => link(slug, label)) },
      { heading: he ? 'מידע נוסף' : 'Further information', links: [{ label: he ? 'מדיניות פרטיות' : 'Privacy policy', href: '/privacy/' }, { label: he ? 'תנאי שימוש' : 'Terms', href: '/terms/' }, { label: 'XML sitemap', href: '/sitemap.xml' }, { label: 'robots.txt', href: '/robots.txt' }, { label: 'llms.txt', href: '/llms.txt' }] },
    ],
  }
}

export const editorialPagesByLanguage: Record<Language, SeoPage[]> = {
  he: [...guides.he, sitemapPage('he')],
  en: [...guides.en, sitemapPage('en')],
}
