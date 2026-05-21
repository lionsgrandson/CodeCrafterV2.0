import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eye, EyeOff, Star } from 'lucide-react'
import {
  Timestamp,
  collection,
  doc,
  getDocFromServer,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import hedghogPainting from './assets/hedghogPainting-seo.jpeg'
import outofLine from './assets/outofthelines-seo.jpeg'
import penFlower from './assets/pencilFlower-seo.jpeg'
import rainingHead from './assets/rainingHead-seo.jpeg'
import { db } from './lib/firebase'
import { cn } from './lib/utils'

interface StarSelection {
  userId: string
  starId: string
  ip: string
  timestamp: Timestamp
  position: { x: number; y: number }
}

interface StarType {
  id: string
  name: string
  color: string
}

interface ArtPieceProps {
  title: string
  medium: string
  size: string
  image: string
  alt: string
  width: number
  height: number
  reverse?: boolean
}

const STAR_TYPES: StarType[] = [
  {
    id: 'gold-siph',
    name: 'זהב קדום',
    color: '#d2c972',
  },
  {
    id: 'azure-drift',
    name: 'תכלת נודד',
    color: '#b2c8e7',
  },
  {
    id: 'lunar-void',
    name: 'ירח שקט',
    color: '#e2e3df',
  },
  {
    id: 'crimson-flare',
    name: 'להבה ארגמנית',
    color: '#ffb4ab',
  },
]

const ART_PIECES: ArtPieceProps[] = [
  {
    title: 'חי צומח דומם',
    medium: 'שמן על בד',
    size: '80 X 90',
    image: hedghogPainting,
    alt: 'ציור שמן על בד בשם חי צומח דומם מאת עמית קדוש',
    width: 1400,
    height: 1047,
  },
  {
    title: 'לצאת מהקווים',
    medium: 'אקריליק על בד',
    size: '40 X 35',
    image: outofLine,
    alt: 'ציור אקריליק על בד בשם לצאת מהקווים מאת עמית קדוש',
    width: 1400,
    height: 1050,
    reverse: true,
  },
  {
    title: 'קומפוזיציה עפרונות צבעוניים',
    medium: 'הצבה',
    size: '10 X 15',
    image: penFlower,
    alt: 'עבודת הצבה בשם קומפוזיציה עפרונות צבעוניים מאת עמית קדוש',
    width: 638,
    height: 1000,
  },
  {
    title: 'ללא שם',
    medium: 'שמן על בד',
    size: '25 X 35',
    image: rainingHead,
    alt: 'ציור שמן על בד ללא שם מאת עמית קדוש',
    width: 1041,
    height: 1200,
    reverse: true,
  },
]

const INTERNAL_LINKS = [
  { href: '/', label: 'אתר הבית של עמית קדוש' },
  { href: '/about', label: 'אודות עמית קדוש' },
  { href: '/gallery', label: 'גלריית עבודות באתר הראשי' },
  { href: '/contact', label: 'יצירת קשר עם עמית קדוש' },
]

const getAnonymousId = () => {
  let id = localStorage.getItem('nocturnal_visitor_id')
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('nocturnal_visitor_id', id)
  }
  return id
}

const ArtPiece = ({
  title,
  medium,
  size,
  image,
  alt,
  width,
  height,
  reverse = false,
}: ArtPieceProps) => (
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.8 }}
    className={cn(
      'min-h-[100svh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 group py-14 md:py-20',
      reverse && 'md:flex-row-reverse',
    )}
  >
    <div className='w-full md:w-[52%] relative flex justify-center'>
      <div className='relative inline-block w-fit max-w-full overflow-hidden bg-[#0a0a0a] border-[10px] md:border-[14px] border-[#0b0b0b] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_60px_-15px_rgba(0,0,0,0.9)]'>
        <div className='absolute inset-0 pointer-events-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.14),inset_-1px_-1px_0_rgba(0,0,0,0.55)]'></div>
        <div className='absolute inset-[3px] pointer-events-none border border-white/5'></div>

        <div className='overflow-hidden transition-all duration-700'>
          <img
            className='block h-auto w-auto max-w-full max-h-[44svh] md:max-h-[62svh] grayscale-[20%] brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000'
            src={image}
            alt={alt}
            width={width}
            height={height}
            loading='lazy'
            decoding='async'
            referrerPolicy='no-referrer'
          />
        </div>
      </div>
    </div>

    <div className='w-full md:w-[30%] space-y-3 text-right'>
      <h2 className='font-serif italic text-4xl md:text-6xl lg:text-7xl text-on-surface leading-tight'>
        {title}
      </h2>
      <div className='ml-auto flex w-fit items-start gap-5 border-t border-white/10 pt-3'>
        <p className='font-sans text-base'>{medium}</p>
        <p
          dir='ltr'
          style={{ unicodeBidi: 'isolate' }}
          className='font-sans text-base text-left'
        >
          {size}
        </p>
      </div>
    </div>
  </motion.article>
)

export default function App() {
  const [allStars, setAllStars] = useState<StarSelection[]>([])
  const [userStar, setUserStar] = useState<StarSelection | null>(null)
  const [clientIp, setClientIp] = useState('')
  const [visitorId] = useState(getAnonymousId())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStarFocusMode, setIsStarFocusMode] = useState(false)

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setClientIp(data.ip))
      .catch((err) => console.error('Failed to fetch IP:', err))
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'stars'),
      (snapshot) => {
        const stars: StarSelection[] = []
        snapshot.forEach((entry) => {
          stars.push(entry.data() as StarSelection)
        })
        setAllStars(stars)
      },
      (error) => {
        console.error('Firestore Error:', error)
      },
    )

    return unsubscribe
  }, [])

  useEffect(() => {
    const found = allStars.find((star) => star.userId === visitorId)
    setUserStar(found || null)
  }, [allStars, visitorId])

  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'))
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('the client is offline')
        ) {
          console.error('Please check your Firebase configuration.')
        }
      }
    }

    testConnection()
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = isStarFocusMode ? 'hidden' : previousOverflow

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isStarFocusMode])

  const handlePickStar = async (starType: StarType) => {
    if (userStar || isSubmitting) return

    setIsSubmitting(true)
    const newStar: StarSelection = {
      userId: visitorId,
      starId: starType.id,
      ip: clientIp || 'unknown',
      timestamp: Timestamp.now(),
      position: {
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
      },
    }

    try {
      await setDoc(doc(db, 'stars', visitorId), newStar)
    } catch (err) {
      console.error('Failed to save star:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      dir='rtl'
      className='relative min-h-screen overflow-x-hidden selection:bg-tertiary/30 text-right'
    >
      <div className='fixed inset-0 pointer-events-none z-0 overflow-hidden'>
        <AnimatePresence>
          {allStars.map((star) => {
            const starType = STAR_TYPES.find((type) => type.id === star.starId)
            const isUserStar = star.userId === visitorId

            return (
              <motion.div
                key={star.userId}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isUserStar ? 1 : isStarFocusMode ? 0.82 : 0.42,
                  scale: isUserStar
                    ? isStarFocusMode
                      ? 1.28
                      : 1.2
                    : isStarFocusMode
                      ? 1.08
                      : 1,
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1 },
                  y: {
                    repeat: Infinity,
                    duration: 5 + (parseInt(star.userId.slice(-1), 36) % 5),
                    ease: 'easeInOut',
                  },
                  x: {
                    repeat: Infinity,
                    duration: 7 + (parseInt(star.userId.slice(-2), 36) % 5),
                    ease: 'easeInOut',
                  },
                }}
                className='absolute flex flex-col items-center gap-1'
                style={{
                  left: `${star.position.x}%`,
                  top: `${star.position.y}%`,
                }}
              >
                <div
                  className={cn(
                    'relative flex items-center justify-center',
                    isUserStar &&
                      'after:absolute after:inset-[-8px] after:border after:border-tertiary/40 after:rounded-full after:animate-pulse',
                  )}
                >
                  <Star
                    size={isUserStar ? 28 : 14}
                    fill={starType?.color || 'white'}
                    stroke='none'
                    className={cn(
                      'drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]',
                      isUserStar && 'star-glow',
                    )}
                  />
                </div>
                {isUserStar && !isStarFocusMode && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-[9px] text-tertiary font-sans whitespace-nowrap bg-background/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-tertiary/20'
                  >
                    הכוכב שלך
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className={cn(
              'absolute rounded-full bg-white transition-all duration-500',
              isStarFocusMode ? 'w-1 h-1 opacity-40' : 'w-0.5 h-0.5 opacity-20',
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <button
        type='button'
        onClick={() => setIsStarFocusMode((current) => !current)}
        className='fixed top-6 left-6 z-[60] flex items-center gap-3 rounded-full border border-white/10 bg-background/75 px-4 py-3 text-sm text-on-surface backdrop-blur-md transition-colors hover:border-tertiary/40 hover:text-tertiary'
        aria-pressed={isStarFocusMode}
        aria-label={
          isStarFocusMode ? 'חזרה לתצוגת הגלריה' : 'מעבר לתצוגת כוכבים'
        }
      >
        {isStarFocusMode ? <EyeOff size={18} /> : <Eye size={18} />}
        <span>{isStarFocusMode ? 'חזרה לגלריה' : 'מצב כוכבים'}</span>
      </button>

      <div className='fixed top-6 right-6 z-[60] rounded-full border border-white/10 bg-background/70 px-4 py-3 text-xs text-on-surface-variant/80 backdrop-blur-md'>
        <span className='font-sans tracking-[0.18em]'>
          מזהה מבקר: {visitorId.substring(0, 8)}
        </span>
      </div>

      <motion.div
        animate={{ opacity: isStarFocusMode ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        aria-hidden={isStarFocusMode}
        className={cn(
          'relative z-20',
          isStarFocusMode && 'pointer-events-none select-none',
        )}
      >
        <nav className='seo-internal-links' aria-label='קישורים פנימיים לאתר הראשי'>
          {INTERNAL_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <header className='fixed top-0 w-full z-30 flex justify-between items-center px-8 md:px-12 py-8 bg-transparent'>
          <p className='font-serif italic text-3xl text-on-surface tracking-tight'>
            עמית קדוש
          </p>
        </header>

        <main className='relative z-20'>
          <section className='relative min-h-[118svh] flex items-center justify-center px-8 md:px-24 pt-36 md:pt-44 pb-24 overflow-hidden'>
            <motion.div
              aria-hidden='true'
              animate={{
                scale: [1, 1.08, 1],
                x: [0, -18, 0],
                y: [0, 14, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute left-1/2 top-1/2 h-56 w-56 md:h-96 md:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,201,114,0.24)_0%,rgba(210,201,114,0.08)_35%,rgba(210,201,114,0)_72%)] blur-2xl'
            />
            <div className='relative w-full max-w-7xl space-y-6 text-center flex flex-col items-center'>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className='font-serif italic text-[clamp(3.2rem,10vw,10rem)] leading-[0.9] text-on-surface'
              >
                גלריית האמנות של עמית קדוש
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className='max-w-3xl font-sans text-lg md:text-2xl text-on-surface-variant/85 leading-relaxed text-center'
              >
                המקום שלי לאומנות שלי
              </motion.p>
            </div>
          </section>

          <section className='px-8 md:px-24 py-10 md:py-12 space-y-0'>
            {ART_PIECES.map((piece) => (
              <ArtPiece key={`${piece.title}-${piece.image}`} {...piece} />
            ))}
          </section>

          <section className='min-h-screen flex flex-col items-center justify-center px-8 py-32 bg-surface/30 backdrop-blur-sm'>
            <div className='text-center max-w-2xl space-y-12'>
              <div className='space-y-4'>
                <p className='font-sans text-sm tracking-[0.28em] text-tertiary'>
                  אינטראקציה
                </p>
                <h2 className='font-serif text-5xl italic text-on-surface leading-tight'>
                  בחרו את הכוכב שלכם
                </h2>
                <p className='font-sans font-light text-on-surface-variant'>
                  {userStar
                    ? 'הכוכב שלכם כבר שובץ בארכיון הלילה.'
                    : 'בחרו כוכב שילווה את המסע שלכם. הבחירה הזו קבועה.'}
                </p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-8 py-12'>
                {STAR_TYPES.map((type) => {
                  const isSelected = userStar?.starId === type.id
                  const isDisabled = !!userStar || isSubmitting

                  return (
                    <button
                      key={type.id}
                      disabled={isDisabled}
                      onClick={() => handlePickStar(type)}
                      className={cn(
                        'flex flex-col items-center gap-4 group transition-opacity',
                        isDisabled &&
                          !isSelected &&
                          'opacity-40 grayscale cursor-not-allowed',
                      )}
                    >
                      <div
                        className={cn(
                          'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 relative',
                          'glass-panel',
                          !isDisabled && 'hover:scale-110',
                          isSelected
                            ? 'border-tertiary ring-2 ring-tertiary/20'
                            : 'border-white/10',
                        )}
                      >
                        <Star
                          size={24}
                          fill={isSelected ? type.color : 'transparent'}
                          stroke={type.color}
                          className={cn(isSelected && 'star-glow')}
                        />
                        {isSelected && (
                          <motion.div
                            layoutId='star-glow'
                            className='absolute inset-0 rounded-full bg-tertiary/10 blur-xl'
                          />
                        )}
                      </div>
                      <div className='flex flex-col items-center gap-1'>
                        <span
                          className={cn(
                            'font-sans text-xs tracking-[0.12em] transition-colors',
                            isSelected
                              ? 'text-tertiary'
                              : 'text-on-surface-variant/40 group-hover:text-on-surface-variant',
                          )}
                        >
                          {type.name}
                        </span>
                        {isSelected && (
                          <span className='text-[10px] text-tertiary font-sans tracking-[0.08em]'>
                            הכוכב שלך
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          <footer className='min-h-[60vh] flex items-center justify-center px-8 pb-48'>
            <div className='text-center space-y-10'>
              <div className='flex items-center justify-center gap-4'>
                <p className='font-serif text-2xl md:text-4xl text-tertiary/90 leading-relaxed max-w-4xl'>
                  גם בימים הכי גשומים אדם אופטימי יראה קשת בענן
                </p>
                <motion.svg
                  aria-hidden='true'
                  viewBox='0 0 80 48'
                  className='h-7 w-11 md:h-9 md:w-14 shrink-0'
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d='M10 38a30 30 0 0 1 60 0'
                    fill='none'
                    stroke='#ff6b6b'
                    strokeWidth='4'
                    strokeLinecap='round'
                  />
                  <path
                    d='M16 38a24 24 0 0 1 48 0'
                    fill='none'
                    stroke='#f59f00'
                    strokeWidth='4'
                    strokeLinecap='round'
                  />
                  <path
                    d='M22 38a18 18 0 0 1 36 0'
                    fill='none'
                    stroke='#ffd43b'
                    strokeWidth='4'
                    strokeLinecap='round'
                  />
                  <path
                    d='M28 38a12 12 0 0 1 24 0'
                    fill='none'
                    stroke='#51cf66'
                    strokeWidth='4'
                    strokeLinecap='round'
                  />
                  <path
                    d='M34 38a6 6 0 0 1 12 0'
                    fill='none'
                    stroke='#4dabf7'
                    strokeWidth='4'
                    strokeLinecap='round'
                  />
                </motion.svg>
              </div>
            </div>
          </footer>
        </main>

        <div className='fixed inset-0 pointer-events-none opacity-[0.03] z-40 mix-blend-overlay'>
          <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
            <filter id='noise'>
              <feTurbulence
                type='fractalNoise'
                baseFrequency='0.65'
                numOctaves='3'
                stitchTiles='stitch'
              />
            </filter>
            <rect width='100%' height='100%' filter='url(#noise)' />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
