import type { SeoPage } from './seoPages'
import type { Language } from './seoRoutes'

const he: SeoPage[] = [
  {
    kind: 'case-study',
    slug: 'portfolio/rainbow-asd',
    title: 'Rainbow ASD | מקרה בוחן לאתר תמיכה וליווי באוטיזם',
    description: 'מקרה בוחן: אתר Rainbow ASD שמציג ליווי, ייעוץ ותמיכה להורים, בני נוער ומבוגרים על הרצף האוטיסטי בחוויה ברורה, חמה ונגישה.',
    eyebrow: 'מקרה בוחן',
    h1: 'Rainbow ASD — אתר שירות נגיש, ברור ואנושי',
    intro: [
      'Rainbow ASD מציגה שירותי ליווי, ייעוץ ותמיכה להורים, בני נוער ומבוגרים על הרצף האוטיסטי. באתר כזה המבקר צריך להבין במהירות למי השירות מתאים, מה סוג העזרה שניתן לקבל ואיך ממשיכים לצעד הבא בלי להרגיש מוצף.',
      'הפרויקט התמקד ביצירת נוכחות דיגיטלית נעימה ומהירה שמחברת בין מידע מקצועי לבין מסלול ברור ליצירת קשר. במקום לבנות חוויה עמוסה, התוכן והמסכים אורגנו כך שהשירותים והקהל יהיו מובנים גם בביקור קצר ובמובייל.',
    ],
    sections: [
      {
        heading: 'האתגר',
        paragraphs: [
          'שירות בתחום רגיש צריך לשלב מקצועיות עם שפה אנושית. יותר מדי טקסט או ממשק אגרסיבי יכולים להקשות על המבקר, בעוד אתר כללי מדי לא מסביר מה באמת מוצע. לכן המבנה נדרש לשמור על היררכיה ברורה, קריאות ונגישות תוך שמירה על האופי של המותג.',
        ],
      },
      {
        heading: 'הפתרון הדיגיטלי',
        items: [
          'מבנה תוכן שמציג את סוגי הליווי והקהל בצורה ברורה',
          'חוויה רספונסיבית שמותאמת לטלפון ולמסכים גדולים',
          'שפה חזותית חמה שמחזקת את המסר בלי להעמיס על התוכן',
          'מסלולי יצירת קשר פשוטים מתוך העמודים המרכזיים',
          'תשתית SEO טכנית עם כותרות, מטא דאטה וקישורים ברורים',
        ],
      },
      {
        heading: 'מה ניתן לאמת',
        paragraphs: [
          'האתר הציבורי הפעיל ב-rainbow-asd.com מציג את Rainbow ASD ואת שירותי הליווי שלה. מקרה הבוחן מתאר את העבודה והנוכחות הדיגיטלית שניתן לראות בפועל ואינו מייחס לאתר נתוני המרה, הכנסה או תוצאות טיפוליות שלא סופקו כנתונים מאומתים.',
        ],
      },
    ],
    faq: [
      {
        question: 'מה היה המוקד המרכזי בפרויקט Rainbow ASD?',
        answer: 'ליצור אתר שירות ברור, נעים ונגיש שמסביר את סוגי הליווי ואת הקהלים הרלוונטיים ומקל על מעבר ליצירת קשר.',
      },
      {
        question: 'האם האתר מותאם למובייל?',
        answer: 'כן. מבנה העמודים, הטקסט, התמונות והפעולות תוכננו כך שיעבדו גם ברוחבי מסך קטנים.',
      },
    ],
    relatedServices: ['websites'],
    image: {
      src: '/portfolio/rainbow-asd-logo.png',
      alt: 'לוגו Rainbow ASD',
      kind: 'logo',
    },
    externalUrl: 'https://rainbow-asd.com/',
  },
  {
    kind: 'case-study',
    slug: 'portfolio/shimon-photography',
    title: 'Shimon Cohen Photography | מקרה בוחן לאתר צילום',
    description: 'מקרה בוחן: אתר פורטפוליו לצלם שמעביר את העבודה, הסיפור והרגש לפני יצירת הקשר ומציג את התמונות בחוויה נקייה וממוקדת.',
    eyebrow: 'מקרה בוחן',
    h1: 'Shimon Cohen Photography — פורטפוליו שמעמיד את הצילום במרכז',
    intro: [
      'באתר צילום העבודה עצמה צריכה להיות ההוכחה המרכזית. המטרה הייתה ליצור חוויה שבה התמונות מקבלות מקום, המבקר מבין במהירות את אופי הצילום, והדרך ליצירת קשר נשארת פשוטה בלי להתחרות בתוכן החזותי.',
      'האתר נבנה סביב הצגה נקייה של העבודות, קריאות טובה במובייל ומסלול שמאפשר למשפחות וללקוחות להתרשם מהסגנון לפני הפנייה.',
    ],
    sections: [
      {
        heading: 'האתגר',
        paragraphs: [
          'פורטפוליו עמוס יכול להאט את האתר ולהפוך את הצפייה למעייפת. מצד שני, צמצום יתר עלול להעלים את מגוון העבודה. לכן היה צורך לאזן בין איכות התמונות, קצב טעינה, היררכיה חזותית ויכולת להגיע במהירות לפרטים וליצירת קשר.',
        ],
      },
      {
        heading: 'הפתרון',
        items: [
          'היררכיה שמעמידה את התמונות לפני טקסט שיווקי ארוך',
          'תצוגה רספונסיבית שמתאימה לצפייה בגלריות גם בטלפון',
          'מסלול ברור מהתרשמות מהעבודה אל פרטי יצירת הקשר',
          'כתובות ותשתית מטא דאטה שמתאימות לסריקה ולשיתוף',
          'קישור לדומיין הפעיל והמרכזי של העסק',
        ],
      },
      {
        heading: 'התוצאה שניתן לראות',
        paragraphs: [
          'shimonphotos.com משמש כפורטפוליו ציבורי פעיל שמרכז את עבודות הצילום ואת הנוכחות המקצועית. אין כאן טענה לכמות פניות, דירוגים או הכנסה שלא נמסרו כנתונים מאומתים.',
        ],
      },
    ],
    faq: [
      {
        question: 'מה חשוב במיוחד באתר פורטפוליו לצלם?',
        answer: 'מהירות, איכות תצוגת התמונות, ניווט פשוט, מובייל טוב ודרך ברורה ליצור קשר בלי להסתיר את העבודה עצמה.',
      },
      {
        question: 'למה לא להעמיס טקסט באתר צילום?',
        answer: 'התוכן עדיין חשוב להסבר ולחיפוש, אבל באתר פורטפוליו התמונות הן ההוכחה המרכזית ולכן הטקסט צריך לתמוך בהן ולא להתחרות בהן.',
      },
    ],
    relatedServices: ['websites'],
    image: {
      src: '/portfolio/shimon-photography-logo.jpeg',
      alt: 'לוגו Shimon Cohen Photography',
      kind: 'logo',
    },
    externalUrl: 'https://shimonphotos.com/',
  },
]

const en: SeoPage[] = [
  {
    kind: 'case-study',
    slug: 'portfolio/rainbow-asd',
    title: 'Rainbow ASD | Autism Support Website Case Study',
    description: 'Case study of the Rainbow ASD website for guidance, consultation, and tailored support for parents, teens, and adults on the autism spectrum.',
    eyebrow: 'Case study',
    h1: 'Rainbow ASD — a clear and human service website',
    intro: [
      'Rainbow ASD presents guidance, consultation, and support for parents, teenagers, and adults on the autism spectrum. The website needs to make the audience, type of support, and next step understandable without overwhelming a visitor who may already be looking for answers in a sensitive situation.',
      'The project focused on a warm, fast digital presence that connects professional information with a straightforward contact path. Content and screens were organized so the services remain understandable during a short visit and on mobile devices.',
    ],
    sections: [
      {
        heading: 'The challenge',
        paragraphs: [
          'A service in a sensitive field needs to feel professional without becoming cold or dense. Too much content can make navigation difficult, while generic copy can leave the visitor unsure about what is actually offered. The structure therefore needed clear hierarchy, readability, accessibility-minded design, and a consistent visual voice.',
        ],
      },
      {
        heading: 'The digital solution',
        items: [
          'Content structure that makes audiences and support options easy to identify',
          'Responsive behavior for phones and larger screens',
          'A warm visual language that supports rather than competes with the content',
          'Simple contact paths from the primary pages',
          'A technical SEO foundation with clear headings, metadata, and links',
        ],
      },
      {
        heading: 'What can be verified',
        paragraphs: [
          'The live public website at rainbow-asd.com presents Rainbow ASD and its support services. This case study describes visible project work and does not claim conversion, revenue, or therapeutic outcomes that were not supplied as verified data.',
        ],
      },
    ],
    faq: [
      {
        question: 'What was the main focus of the Rainbow ASD project?',
        answer: 'To create a clear, welcoming service website that explains the available support and audiences and makes the next contact step easy to find.',
      },
      {
        question: 'Is the website designed for mobile use?',
        answer: 'Yes. Page structure, text, media, and primary actions are designed to work at small screen widths as well as desktop sizes.',
      },
    ],
    relatedServices: ['websites'],
    image: {
      src: '/portfolio/rainbow-asd-logo.png',
      alt: 'Rainbow ASD logo',
      kind: 'logo',
    },
    externalUrl: 'https://rainbow-asd.com/',
  },
  {
    kind: 'case-study',
    slug: 'portfolio/shimon-photography',
    title: 'Shimon Cohen Photography | Photography Portfolio Case Study',
    description: 'Case study of a photography portfolio designed to put the work, story, and emotion first while giving potential clients a simple path to make contact.',
    eyebrow: 'Case study',
    h1: 'Shimon Cohen Photography — a portfolio built around the images',
    intro: [
      'For a photography website, the work itself should be the primary proof. The goal was to give the images room, make the style understandable quickly, and keep the path to contact simple without letting interface elements compete with the photography.',
      'The site centers the viewing experience, mobile readability, and a journey that lets families and clients understand the photographer’s work before reaching out.',
    ],
    sections: [
      {
        heading: 'The challenge',
        paragraphs: [
          'An overloaded portfolio can become slow and tiring to browse, while excessive reduction can hide the range of work. The experience needed to balance image quality, loading behavior, visual hierarchy, and quick access to contact information.',
        ],
      },
      {
        heading: 'The solution',
        items: [
          'A hierarchy that puts photography before long marketing copy',
          'Responsive presentation for gallery viewing on phones',
          'A clear path from viewing the work to contact details',
          'Clean URLs and metadata suitable for crawling and sharing',
          'Use of the project’s current primary domain',
        ],
      },
      {
        heading: 'The visible result',
        paragraphs: [
          'shimonphotos.com is a live public portfolio that brings the photography work and professional presence into one experience. No lead, ranking, or revenue figures are claimed because those figures were not supplied as verified data.',
        ],
      },
    ],
    faq: [
      {
        question: 'What matters most on a photography portfolio website?',
        answer: 'Speed, image presentation, simple navigation, strong mobile behavior, and an obvious contact path without distracting from the work.',
      },
      {
        question: 'Why keep marketing copy restrained on a photography site?',
        answer: 'Text still helps users and search engines understand the service, but the images are the main evidence, so copy should support the work instead of competing with it.',
      },
    ],
    relatedServices: ['websites'],
    image: {
      src: '/portfolio/shimon-photography-logo.jpeg',
      alt: 'Shimon Cohen Photography logo',
      kind: 'logo',
    },
    externalUrl: 'https://shimonphotos.com/',
  },
]

export const caseStudyExtrasByLanguage: Record<Language, SeoPage[]> = { he, en }
