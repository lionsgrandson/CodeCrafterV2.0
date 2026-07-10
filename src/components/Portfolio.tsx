import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../App'

type ProjectMediaProps = {
  src?: string
  title: string
  kind?: 'logo' | 'screenshot'
}

function ProjectMedia({ src, title, kind = 'logo' }: ProjectMediaProps) {
  const [state, setState] = useState<
    'blank' | 'loading' | 'success' | 'failure'
  >(src ? 'loading' : 'blank')

  return (
    <div className='aspect-video relative overflow-hidden bg-surface-container-high'>
      {state === 'loading' && (
        <div
          className='absolute inset-0 animate-pulse bg-gradient-to-br from-surface-container-high to-surface-container-highest'
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
          className={`w-full h-full group-hover:scale-105 transition-all duration-700 ${kind === 'screenshot' ? 'object-cover' : 'object-contain p-8'} ${state === 'success' ? 'opacity-100' : 'opacity-0'}`}
          src={src}
          alt={title}
          loading='lazy'
          referrerPolicy='no-referrer'
          onLoad={() => setState('success')}
          onError={() => setState('failure')}
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6'>
        <h3 className='text-white text-xl font-bold font-headline'>
          {title}
        </h3>
      </div>
    </div>
  )
}

export function Portfolio() {
  const { t } = useLanguage()

  const projectMedia = [
    {
      src: 'https://gxgtkdshctfclpmavgbp.supabase.co/storage/v1/object/public/project-images/uploads/1759489369256-lxc88q.png',
    },
    { src: 'https://www.ykadosh.co.il/assets/yuvalLogo.png' },
    {
      src: 'https://rainbowasdv2.netlify.app/assets/LogoWithText-CcLxZipc.png',
    },
    {
      src: 'https://chicagotraumatherapy.com/assets/blueLogo-DrhddtD2.png',
    },
    { src: 'https://sumsup.co/assets/sumsup-logo-RXncwyPE.png' },
    {
      src: 'https://mosheschwartzberg.com/amitStarProject/assets/outofthelines-seo-Dxx0P0rN.jpeg',
    },
    { src: '/portfolio/technology-corps-logo.png' },
    { src: '/portfolio/big-sale-logo.jpeg' },
    { src: '/portfolio/creative-intelligence-logo.svg' },
    { src: '/portfolio/shimon-photography-logo.jpeg' },
    { src: '/portfolio/aderet-argaman-logo.png' },
    {
      src: '/portfolio/coderecovery-screenshot.png',
      kind: 'screenshot' as const,
    },
    { src: '/portfolio/ai-pro-logo.jpeg' },
    { src: '/portfolio/omnifood-logo.png' },
  ]

  const projects = t.portfolio.projects.map((project, idx) => ({
    ...project,
    media: projectMedia[idx],
    link: project.link || projectMedia[idx]?.src,
  }))

  return (
    <section
      className='py-24 px-6 md:px-8 bg-surface-container-low'
      id='portfolio'
    >
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl md:text-5xl font-bold mb-16 tracking-tight font-headline text-on-surface'>
          {t.portfolio.headline}
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, idx) => {
            return (
              <motion.a
              key={project.link || project.title}
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              viewport={{ once: true }}
              className='bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10 flex flex-col h-full text-start cursor-pointer'
            >
              <ProjectMedia
                src={project.media?.src}
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
    <section className='py-24 px-6 md:px-8 bg-surface' id='testimonials'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight font-headline text-on-surface'>
          {t.testimonials.headline}
        </h2>
        <div className='grid md:grid-cols-2 gap-8'>
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-xl flex flex-col shadow-sm border-t-4 transition-all hover:-translate-y-1 ${review.featured ? 'bg-surface-container-high border-primary' : 'bg-surface-container-low border-transparent'}`}
            >
              <div className='flex text-primary mb-6'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 fill-primary' />
                ))}
              </div>
              <p className='text-lg font-light text-on-surface-variant mb-8 flex-1 leading-relaxed italic'>
                {review.text}
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-primary/10 text-primary ring-2 ring-primary/10 flex items-center justify-center font-headline font-bold'>
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
