import type { SeoPage } from './seoPages'
import type { Language } from './seoRoutes'

// Editorial drafts: client descriptions must be reviewed before adding numerical outcomes.
export const newCaseStudyPagesByLanguage: Record<Language, SeoPage[]> = {
  "he": [
    {
      "kind": "case-study",
      "slug": "portfolio/aderet-argaman",
      "title": "אדרת וארגמן | תחזוקת WordPress ו-SEO טכני — CodeCrafter",
      "description": "מקרה בוחן של אדרת וארגמן: תחזוקת אתר WordPress לחנויות יד שנייה בתל אביב, בדיקות SEO טכני, עדכונים ותחזוקת תוכן ומבנה.",
      "eyebrow": "מקרה בוחן · טיוטה לבדיקה",
      "h1": "אדרת וארגמן — תחזוקה ושיפור תשתית אתר WordPress",
      "intro": [
        "אדרת וארגמן הן חנויות יד שנייה בתל אביב. אדרת מציגה בגדים, וינטג׳ ופריטי מעצבים; ארגמן מתמקדת בפריטי יוקרה ומותגים מיד שנייה. האתר הציבורי משמש לקוחות שרוצים להכיר את החנויות, לבדוק מה אפשר למכור או להחליף, ולקבל פרטי ביקור ויצירת קשר.",
        "באתר ותיק עם תוכן רב, העבודה אינה רק להוסיף עמודים. חשוב לשמור על עדכונים תקינים, כתובות קיימות, ניווט בין נושאי קנייה ומכירה, ואפשרות למנועי חיפוש לקרוא את המידע."
      ],
      "sections": [
        {
          "heading": "הקשר העסקי",
          "paragraphs": [
            "לשתי החנויות קהלים וצרכים מעט שונים: לקוח שמחפש בגד וינטג׳, לקוח שמחפש פריט יוקרה, ואדם שרוצה להציע פריטים למכירה. המבנה הדיגיטלי צריך לסייע לכל אחד למצוא את המידע הנכון בלי לעבור בין עמודים מבלבלים."
          ]
        },
        {
          "heading": "תחומי העבודה הטכנית",
          "items": [
            "עדכון WordPress ותוספים במסגרת תחזוקת האתר",
            "סקירת תצורת SEO והגדרות Yoast, sitemap ו-robots.txt",
            "בדיקת קישורים, ניווט והצגת תוכן במובייל",
            "בדיקת הגדרות נגישות והתאמות בסיסיות של האתר",
            "בדיקת אפשרויות גיבוי ותחזוקה שוטפת בהתאם לתשתית הקיימת"
          ]
        },
        {
          "heading": "למה לא לבנות מחדש בלי סיבה",
          "paragraphs": [
            "כאשר אתר ותיק כבר מכיל עמודים עם ערך, מעבר פלטפורמה אינו השלב הראשון. נכון קודם להבחין בין בעיית תוכן, בעיית תחזוקה ובעיית מגבלה טכנית. שינוי כתובות ומבנה עמודים דורש תוכנית הפניות וסקירה של דפים שכבר מביאים תנועה."
          ]
        },
        {
          "heading": "תוצר וגבולות המידע",
          "paragraphs": [
            "האתר הציבורי מציג את שתי החנויות, תחומי המוצרים והנחיות מכירה והחלפה. פירוט הפעולות הטכניות כאן הוא טיוטת תיאור לעיון הלקוח ואישור היקף העבודה; הוא אינו מציג שיפור מדוד בדירוג, בכניסות או במכירות ללא נתוני מדידה."
          ]
        }
      ],
      "faq": [
        {
          "question": "האם תמיד כדאי לבנות אתר WordPress ישן מחדש?",
          "answer": "לא. תחילה בודקים את מצב הליבה והתוספים, הביצועים, הניווט ותוכן בעל ערך. בנייה מחדש מוצדקת כאשר שיפור האתר הקיים אינו מספק את הצורך."
        },
        {
          "question": "מה חשוב לשמר כשמעדכנים אתר עם עמודים ותיקים?",
          "answer": "כתובות שימושיות, תוכן רלוונטי, קישורים פנימיים, קישורים חיצוניים נכנסים ותוכנית להפניות כאשר כתובת משתנה."
        }
      ],
      "relatedServices": [
        "wordpress-development",
        "website-maintenance",
        "websites"
      ],
      "image": {
        "src": "/portfolio/aderet-argaman-logo.png",
        "alt": "לוגו אדרת וארגמן, חנויות אופנת יד שנייה בתל אביב",
        "kind": "logo"
      },
      "externalUrl": "https://www.aderet-store.com/"
    },
    {
      "kind": "case-study",
      "slug": "portfolio/ilan-shachar",
      "title": "אילן שחר | אתר שירותים פיננסיים בעברית — CodeCrafter",
      "description": "מקרה בוחן לאתר של אילן שחר: היררכיית תוכן בעברית, הצגת שירותי פנסיה וביטוח, ניווט מותאם למובייל ותהליכי יצירת קשר.",
      "eyebrow": "מקרה בוחן · טיוטה לבדיקה",
      "h1": "אילן שחר — אתר שירותים פיננסיים עם תוכן ברור בעברית",
      "intro": [
        "האתר של אילן שחר מרכז מידע על פתרונות פנסיה, ביטוח וחיסכון עבור אנשים המעוניינים להבין את האפשרויות שלהם ולפנות לייעוץ. בתחום פיננסי, ניסוח ברור ומדויק חשוב לא פחות מהעיצוב.",
        "האתגר בעריכת האתר הוא להציג תחומי שירות שונים בצורה מסודרת, להפוך טקסטים ארוכים לקריאים, ולהתאים את התוכן לממשק בעברית ובמובייל."
      ],
      "sections": [
        {
          "heading": "האתגר בתוכן ובמבנה",
          "paragraphs": [
            "עמודי שירות פיננסיים צריכים לעזור למבקר לזהות את הנושא הרלוונטי — פנסיה, כיסויים ביטוחיים, חיסכון והשקעה — בלי להסיק מהאתר הבטחה לתשואה או תוצאה אישית. ההנעה לפעולה צריכה להתמקד בהיכרות ובבדיקה מקצועית."
          ]
        },
        {
          "heading": "עבודת תוכן וממשק",
          "items": [
            "חלוקת תחומי השירות והצגת מסלול היכרות ויצירת קשר",
            "תיקוני ניסוח בעמוד אודות ובתוכן הפנסיה, החיסכון והביטוח",
            "התאמת ניווט וכיווניות RTL בשפה העברית",
            "סקירת התאמה למכשירים ניידים וקריאות מרכיבי הממשק",
            "הצגת המלצות ושותפים רק בהתאם לחומרים שקיבלו אישור פרסום"
          ]
        },
        {
          "heading": "שיקולי פיתוח",
          "paragraphs": [
            "נדרש תיאום בין טקסט, עיצוב, תפריט וקישורי יצירת קשר כדי שהמבקר יוכל לעבור מתחום עניין להסבר ואז לפנייה. חלק מעבודת האיכות הוא לבדוק את הגרסה בפועל בטלפון ולוודא שההיררכיה לא נשברת בתצוגת RTL."
          ]
        },
        {
          "heading": "מה אפשר לאמת",
          "paragraphs": [
            "בתיק העבודות מוצג הפרויקט עם קישור לגרסה הציבורית שנמסרה. תוצאות עסקיות, מדדי SEO, התאמה מלאה לתקן נגישות או עמידה בדרישות רגולטוריות אינן נטענות ללא אישור ובדיקות תומכות. פירוט שלבי העבודה הוא טיוטה לאישור לפני קיבוע מקרה הבוחן."
          ]
        }
      ],
      "faq": [
        {
          "question": "למה חשוב לנסח מחדש תוכן שירותים פיננסיים?",
          "answer": "משום שצריך לתאר שירותים, מגבלות וצעד הבא באופן שהלקוח מבין, בלי הבטחות בלתי מבוססות ובלי מונחים עמומים."
        },
        {
          "question": "מה בודקים באתר בעברית לפני השקה?",
          "answer": "כותרות, כיווניות RTL, סדר כפתורים ותפריטים, תצוגת מובייל, ניסוח טפסים וקישורי פנייה, וגם תצוגת שיתוף וחיפוש."
        }
      ],
      "relatedServices": [
        "websites",
        "website-maintenance"
      ],
      "image": {
        "src": "/portfolio/ilan-shachar-logo.webp",
        "alt": "סמל אתר אילן שחר, שירותי פנסיה וביטוח",
        "kind": "logo"
      },
      "externalUrl": "https://ilanshacar.netlify.app/"
    },
    {
      "kind": "case-study",
      "slug": "portfolio/green-therapy",
      "title": "Green Therapy | אתר פעילויות וולנס לאירועים — CodeCrafter",
      "description": "מקרה בוחן לאתר Green Therapy: הצגת מתחמי עיסוי, אמבטיות קרח, יוגה וחוויות בריאות לאירועי חברה, לצד טיפולים ומתחם בבית דגן.",
      "eyebrow": "מקרה בוחן · טיוטה לבדיקה",
      "h1": "Green Therapy — אתר חוויות בריאות לאירועי חברה",
      "intro": [
        "Green Therapy מציעה חוויות בריאות ואירוח, ובאתר הנוכחי מציגה במיוחד פעילויות לאירועי חברה: עיסויים באירוע, אמבטיות קרח, יוגה, סדנאות ובר שייקים. לצד הפעילות באירועים מוצגים גם טיפולים אישיים ומתחם בבית דגן.",
        "מטרת האתר הציבורי היא להמחיש חוויה שכדאי להזמין ולהבהיר למארגן האירוע אילו מתחמים ואפשרויות עומדים לרשותו, מה כולל השירות ואיך מתקדמים לשיחה."
      ],
      "sections": [
        {
          "heading": "הצורך התוכני",
          "paragraphs": [
            "שירות חווייתי תלוי בתמונות ובהסבר מדויק של הפעילויות, אך המבקר צריך גם לדעת למי השירות מתאים ומה נדרש לתיאום. לכן נדרשת הפרדה בין פעילות לחברות, חוויות פרטיות וטיפולים במתחם."
          ]
        },
        {
          "heading": "מבנה חוויית האתר",
          "items": [
            "הצגת פעילות לאירועי חברה כבר בחלק העליון של האתר",
            "כרטיסי חוויה נפרדים למתחם עיסויים, אמבטיות קרח, סדנאות גוף־נפש ובר בריאות",
            "תמונות מהאירועים, מידע על מה כל פעילות כוללת וקריאה לפעולה",
            "מסלול נפרד למתחם בבית דגן ולטיפולים אישיים",
            "תוכן עברי, תצוגה רספונסיבית וקישורים בין סוגי הפעילות"
          ]
        },
        {
          "heading": "נגישות וחיפוש",
          "paragraphs": [
            "לתוכן כזה מועילים טקסטים שמסבירים כל חוויה, כותרת ברורה לכל מסלול, טקסט חלופי המתאר תמונות רלוונטיות, כתובות יציבות וקישורים פנימיים. אלה נושאים לסקירה טכנית, לא הוכחה אוטומטית לשיפור דירוג."
          ]
        },
        {
          "heading": "מצב ותוצאות",
          "paragraphs": [
            "האתר הציבורי מציג את מגוון השירותים והאירועים. תיאור היקף העבודה ב-CodeCrafter נמצא בבדיקה, ולכן אינו כולל הבטחות על היקף לידים, שיפור אורגני, מהירות אתר או תוצאות כספיות."
          ]
        }
      ],
      "faq": [
        {
          "question": "מה חשוב באתר שמציע פעילויות לאירועי חברה?",
          "answer": "חלוקה לפי סוג פעילות וקהל, מידע על היקף השירות, תמונות עם הקשר ברור ומסלול קצר לתיאום מול המארגן."
        },
        {
          "question": "איך להציג באתר גם אירועי חברה וגם טיפולים פרטיים?",
          "answer": "מפרידים בין מסלולי התוכן ומקשרים ביניהם במקומות הרלוונטיים, כדי שהמבקר יבין מה מתאים לבקשה שלו."
        }
      ],
      "relatedServices": [
        "websites",
        "landing-page-development",
        "website-maintenance"
      ],
      "externalUrl": "https://greentherapy.co.il/"
    }
  ],
  "en": [
    {
      "kind": "case-study",
      "slug": "portfolio/aderet-argaman",
      "title": "Aderet & Argaman | WordPress Maintenance & SEO Case Study",
      "description": "A review of Aderet and Argaman's established second-hand fashion website in Tel Aviv, covering WordPress maintenance, technical SEO and content structure.",
      "eyebrow": "Case study · details under review",
      "h1": "Aderet & Argaman — WordPress website maintenance and technical SEO",
      "intro": [
        "Aderet and Argaman are second-hand fashion stores in Tel Aviv. Aderet offers vintage, clothing and designer pieces, while Argaman focuses on premium and luxury resale. Their website serves customers browsing the stores, selling garments, and looking for practical visit information.",
        "An established website must preserve useful existing content while keeping WordPress, navigation and technical search settings maintainable. A rebuild is not automatically the right answer."
      ],
      "sections": [
        {
          "heading": "Business context",
          "paragraphs": [
            "The same website serves different visitor intentions: buying vintage clothing, exploring luxury resale, or finding out what the stores buy from customers. Each journey needs easy-to-find information."
          ]
        },
        {
          "heading": "Technical work covered",
          "items": [
            "WordPress core and plugin maintenance within the project scope",
            "Review of Yoast configuration, robots.txt and XML sitemap behavior",
            "Navigation, internal links and mobile content checks",
            "Accessibility configuration review and basic usability checks",
            "Backup options and ongoing maintenance review"
          ]
        },
        {
          "heading": "Why preserve established content",
          "paragraphs": [
            "A mature site can already have valuable URLs and inbound links. Replatforming or changing navigation without an inventory and redirect plan risks disrupting useful content. It is better to distinguish technical maintenance from editorial changes."
          ]
        },
        {
          "heading": "Evidence and scope",
          "paragraphs": [
            "The public site describes both stores, resale categories, selling and exchange information. This case-study draft is subject to confirmation of the completed work. It does not claim verified ranking, traffic or sales improvements."
          ]
        }
      ],
      "faq": [
        {
          "question": "Should an old WordPress site always be rebuilt?",
          "answer": "No. Assess maintenance, performance, content structure, links and limitations first. A rebuild is appropriate only when the existing setup cannot reasonably meet requirements."
        }
      ],
      "relatedServices": [
        "wordpress-development",
        "website-maintenance",
        "websites"
      ],
      "image": {
        "src": "/portfolio/aderet-argaman-logo.png",
        "alt": "Aderet and Argaman second-hand fashion website logo",
        "kind": "logo"
      },
      "externalUrl": "https://www.aderet-store.com/"
    },
    {
      "kind": "case-study",
      "slug": "portfolio/ilan-shachar",
      "title": "Ilan Shachar | Hebrew Financial Services Website Case Study",
      "description": "Website project covering Hebrew RTL content, pension and insurance service pages, mobile navigation and enquiry journeys for Ilan Shachar.",
      "eyebrow": "Case study · details under review",
      "h1": "Ilan Shachar — a clear Hebrew-language financial services website",
      "intro": [
        "The Ilan Shachar website presents pension, insurance and savings-related services. For financial topics, credible language and a straightforward route to contact matter as much as appearance.",
        "The editorial challenge was to organize several areas of advice into readable Hebrew pages while keeping navigation and contact paths clear on mobile devices."
      ],
      "sections": [
        {
          "heading": "Content challenge",
          "paragraphs": [
            "Visitors exploring pension, insurance or savings information need to see the distinction between topics, understand what a conversation might cover, and avoid interpreting marketing copy as a personal financial guarantee."
          ]
        },
        {
          "heading": "Work areas in the review draft",
          "items": [
            "Organization of service topics and enquiry paths",
            "Revisions to About, pension, savings and insurance page copy",
            "RTL layout, navigation and mobile readability checks",
            "Review of testimonials and partner content before publication",
            "Visual and text hierarchy suitable for a service business"
          ]
        },
        {
          "heading": "Technical considerations",
          "paragraphs": [
            "Hebrew layout demands careful alignment, menu order and link behavior. Content and presentation should be reviewed together to avoid breaking the journey on smaller screens."
          ]
        },
        {
          "heading": "Boundaries and review",
          "paragraphs": [
            "The project is linked through its available public site. No measured conversions, rankings, formal accessibility certification or regulatory compliance is asserted here. Details remain subject to the client's review."
          ]
        }
      ],
      "faq": [
        {
          "question": "Why is RTL testing important for a service website?",
          "answer": "Hebrew affects text flow, navigation, button alignment and responsive layout. Those elements should be tested in real mobile and desktop views."
        }
      ],
      "relatedServices": [
        "websites",
        "website-maintenance"
      ],
      "image": {
        "src": "/portfolio/ilan-shachar-logo.webp",
        "alt": "Ilan Shachar financial services website logo",
        "kind": "logo"
      },
      "externalUrl": "https://ilanshacar.netlify.app/"
    },
    {
      "kind": "case-study",
      "slug": "portfolio/green-therapy",
      "title": "Green Therapy | Corporate Wellness Events Website Case Study",
      "description": "A look at Green Therapy's website covering corporate wellness events, massage stations, ice baths, yoga, workshops and the Beit Dagan venue.",
      "eyebrow": "Case study · details under review",
      "h1": "Green Therapy — a website for corporate wellness experiences",
      "intro": [
        "Green Therapy's current public website focuses on corporate event wellness experiences: pop-up massage areas, ice baths, yoga, workshops and a health-focused smoothie bar. It also presents private treatments and a Beit Dagan venue.",
        "The public content needs to help an event organizer understand the available experiences and how to arrange the right format for a particular audience and location."
      ],
      "sections": [
        {
          "heading": "Different customer journeys",
          "paragraphs": [
            "A visitor organizing an employee event has different questions from someone looking for a private treatment. Separating those journeys makes the service easier to understand."
          ]
        },
        {
          "heading": "Public website structure",
          "items": [
            "A clear introduction to wellness experiences for company events",
            "Individual service areas for massage, ice baths, workshops and healthy refreshments",
            "Event photography and contextual descriptions of what is offered",
            "Separate navigation for the Beit Dagan venue and individual treatments",
            "Hebrew-language content and responsive enquiry paths"
          ]
        },
        {
          "heading": "Content and crawlability",
          "paragraphs": [
            "Relevant search and accessibility considerations include useful descriptions, consistent headings, descriptive image alternatives, stable URLs and links between related activities. These are review considerations, not a claim of improved search ranking."
          ]
        },
        {
          "heading": "Scope and results",
          "paragraphs": [
            "The public website displays those experiences and enquiry paths. CodeCrafter's exact implementation scope is being reviewed; no conversion, traffic or financial figures are claimed."
          ]
        }
      ],
      "faq": [
        {
          "question": "What information should a corporate wellness event website show?",
          "answer": "The activities, intended audience, venue and logistical options, event images with context, and a clear route to speak to the organizer."
        }
      ],
      "relatedServices": [
        "websites",
        "landing-page-development",
        "website-maintenance"
      ],
      "externalUrl": "https://greentherapy.co.il/"
    }
  ]
}
