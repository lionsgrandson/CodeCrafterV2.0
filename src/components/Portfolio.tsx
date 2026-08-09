import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../App'
import { WordReveal } from './WordReveal'
import { localizePath } from '../lib/seoRoutes'

type ProjectMediaProps = {
  src?: string
  title: string
  kind?: 'logo' | 'screenshot'
}

function ProjectMedia({ src, title, kind = 'logo' }: ProjectMediaProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [state, setState] = useState<
    'blank' | 'loading' | 'success' | 'failure'
  >(src ? 'loading' : 'blank')

  useEffect(() => {
    const image = imageRef.current
    if (!image || !image.complete) return

    setState(image.naturalWidth > 0 ? 'success' : 'failure')
  }, [src])

  return (
    <div className='aspect-video relative overflow-hidden bg-surface-container-high'>
      {state === 'loading' && (
        <div
          className='absolute inset-0 animate-pulse [animation-duration:2.5s] bg-gradient-to-br from-surface-container-high to-surface-container-highest'
          aria-hidden='true'
        />
      )}
      {(state === 'blank' || state === 'failure') && (
        <div className='absolute inset-0 flex items-center justify-center p-8 text-center'>
          <span className='font-headline text-xl font-bold text-on-surface'>
            {title}
          </span>
        </div>
      )}
      {src && (
        <img
          ref={imageRef}
          className={`w-full h-full group-hover:scale-105 transition-all duration-[875ms] ${kind === 'screenshot' ? 'object-cover' : 'object-contain p-8'} ${state === 'success' ? 'opacity-100' : 'opacity-0'}`}
          src={src}
          alt={title}
          loading='lazy'
          decoding='async'
          width='640'
          height='360'
          onLoad={() => setState('success')}
          onError={() => setState('failure')}
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6'>
        <h3 className='text-white text-xl font-bold font-headline'>{title}</h3>
      </div>
    </div>
  )
}

type PortfolioProps = {
  showAll?: boolean
  standalone?: boolean
}

export function Portfolio({
  showAll = false,
  standalone = false,
}: PortfolioProps) {
  const { t, lang } = useLanguage()

  const projectMedia = [
    { src: '/portfolio/mahagony-logo.png' },
    { src: '/portfolio/yuval-kadosh-logo.png' },
    { src: '/portfolio/rainbow-asd-logo.png' },
    { src: '/portfolio/chicago-trauma-logo.png' },
    { src: '/portfolio/sumsup-logo.png' },
    { src: '/portfolio/amit-kadosh.webp', kind: 'screenshot' as const },
    { src: '/portfolio/technology-corps-logo.webp' },
    { src: '/portfolio/big-sale-logo.jpeg' },
    { src: '/portfolio/creative-intelligence-logo.svg' },
    { src: '/portfolio/shimon-photography-logo.jpeg' },
    // { src: '/portfolio/aderet-argaman-logo.png' },
    {
      src: '/portfolio/coderecovery-screenshot.webp',
      kind: 'screenshot' as const,
    },
    { src: '/portfolio/ai-pro-logo.jpeg' },
    { src: '/portfolio/omnifood-logo.png' },
  ]

  const projects = t.portfolio.projects.map((project, idx) => ({
    ...project,
    media: projectMedia[idx],
    externalLink: project.link || projectMedia[idx]?.src,
    link: ({
      1: localizePath('portfolio/yuval-kadosh', lang),
      4: localizePath('portfolio/sumsup', lang),
      8: localizePath('portfolio/creative-intelligence', lang),
      10: localizePath('portfolio/coderecovery', lang),
    } as Record<number, string>)[idx] || project.link || projectMedia[idx]?.src,
  }))

  return (
    <section
      className={`${standalone ? 'pt-32 pb-24' : 'py-24'} px-6 md:px-8 bg-surface-container-low`}
      id='portfolio'
    >
      <div className='max-w-7xl mx-auto'>
        {standalone && (
          <a
            href={localizePath('', lang)}
            className='mb-8 inline-flex items-center gap-2 font-headline text-sm font-semibold text-secondary hover:text-primary transition-colors duration-[200ms]'
          >
            {lang === 'he' ? (
              <ArrowRight className='h-4 w-4' aria-hidden='true' />
            ) : (
              <ArrowLeft className='h-4 w-4' aria-hidden='true' />
            )}
            {t.portfolio.backHome}
          </a>
        )}
        {standalone ? (
          <header className='mb-16 max-w-3xl'>
            <h1 className='text-4xl md:text-6xl font-bold mb-5 tracking-tight font-headline text-on-surface'>
              {t.portfolio.allHeadline}
            </h1>
            <p className='text-lg md:text-xl text-on-surface-variant font-light leading-relaxed'>
              {t.portfolio.allSubline}
            </p>
          </header>
        ) : (
          <WordReveal
            text={t.portfolio.headline}
            className='text-4xl md:text-5xl font-bold mb-16 tracking-tight font-headline text-on-surface'
          />
        )}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, idx) => {
            const isHomepageExtra = !showAll && idx >= 20

            return (
              <motion.a
                key={project.link || project.title}
                href={project.link}
                target={project.link === project.externalLink ? '_blank' : undefined}
                rel={project.link === project.externalLink ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                viewport={{ once: true }}
                className={`${isHomepageExtra ? 'hidden' : 'flex'} bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-[625ms] border border-outline-variant/10 flex-col h-full text-start cursor-pointer`}
              >
                <ProjectMedia
                  src={showAll || idx < 20 ? project.media?.src : undefined}
                  title={project.title}
                  kind={project.media?.kind}
                />
                <div className='p-6 flex-1 flex flex-col justify-between'>
                  <div>
                    <p className='text-on-surface-variant text-sm font-light leading-relaxed'>
                      {project.desc}
                    </p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
        {/* {!showAll && (
          <div className='mt-10 flex justify-center'>
            <a
              href='/portfolio/'
              className='inline-flex min-h-12 items-center justify-center rounded-lg bg-primary-gradient px-7 py-3 text-center font-headline font-bold text-white shadow-lg shadow-primary/20 transition-all duration-[250ms] hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-95'
            >
              {t.portfolio.seeAll}
            </a>
          </div>
        )} */}
      </div>
    </section>
  )
}

export function Testimonials() {
  const { t } = useLanguage()
  const reviews = t.testimonials.items.map((review, idx) => ({
    ...review,
    featured: idx === 0,
  }))

  return (
    <section
      className='viewport-section testimonials-section px-6 md:px-8 bg-surface'
      id='testimonials'
    >
      <div className='max-w-7xl mx-auto'>
        <WordReveal
          text={t.testimonials.headline}
          className='text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-center tracking-tight font-headline text-on-surface'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'>
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`testimonial-card p-4 md:p-5 rounded-xl flex flex-col shadow-sm border-t-4 transition-all duration-[200ms] hover:-translate-y-1 hover:shadow-lg ${review.featured ? 'bg-surface-container-high border-primary' : 'bg-surface-container-low border-transparent'}`}
            >
              <div className='flex text-primary mb-2 md:mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-500 text-yellow-500'
                  />
                ))}
              </div>
              <p className='testimonial-copy text-xs md:text-sm font-light text-on-surface-variant mb-3 md:mb-4 flex-1 leading-snug italic'>
                {review.text}
              </p>
              <div className='flex items-center gap-4'>
                <div className='hidden sm:flex w-9 h-9 rounded-full bg-primary/10 text-primary ring-2 ring-primary/10 items-center justify-center font-headline font-bold'>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className='font-bold text-on-surface font-headline tracking-tight'>
                    {review.name}
                  </p>
                  <p className='text-xs text-secondary uppercase font-bold tracking-widest'>
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
