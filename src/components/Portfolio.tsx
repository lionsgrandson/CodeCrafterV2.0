import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { useLanguage } from '../App'

export function Portfolio() {
  const { t } = useLanguage()
  const projectImages = [
    'https://gxgtkdshctfclpmavgbp.supabase.co/storage/v1/object/public/project-images/uploads/1759489369256-lxc88q.png',
    'https://www.ykadosh.co.il/assets/yuvalLogo.png',
    'https://rainbowasdv2.netlify.app/assets/LogoWithText-CcLxZipc.png',
    'https://chicagotraumatherapy.com/assets/blueLogo-DrhddtD2.png',
    'https://sumsup.co/assets/sumsup-logo-RXncwyPE.png',
    'https://mosheschwartzberg.com/amitStarProject/assets/outofthelines-seo-Dxx0P0rN.jpeg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXtm5vmCqj-ux3Q8YBk6RhJg1OrlY3bmPH4n_D7a-Xv7uVOTCEbMnoRCpOunHOJ2O7mAOBofqjivokq7e8xiC13AkqJ4AqC8XTN5Ka9W06oXc4Y_JcypdVt0aXw8teDmYG4QctCdTt4tBrf37-8vss01rryYZOV5bpxUvHI_zZ-NErXT-nZofEA0JpQuZnpiCe2kZTVEywEMsugwnpdPUvXBuEQhRNLeEGFkqL-mQWOTsE6ZAWkpLuiZWtztNHp_I-fpC95j7CDCNo',
  ]

  const projects = t.portfolio.projects.map((project, idx) => ({
    ...project,
    img: projectImages[idx],
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
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              viewport={{ once: true }}
              className='bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10 flex flex-col h-full'
            >
              <div className='aspect-video relative overflow-hidden bg-surface-container-high'>
                <img
                  className='w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700'
                  src={project.img}
                  alt={project.title}
                  loading='lazy'
                  referrerPolicy='no-referrer'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6'>
                  <h3 className='text-white text-xl font-bold font-headline'>
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className='p-6 flex-1 flex flex-col justify-between'>
                <div>
                  <p className='text-on-surface-variant text-sm font-light leading-relaxed'>
                    {project.desc}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
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
