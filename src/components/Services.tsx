import { motion } from 'motion/react'
import {
  Bot,
  Braces,
  Database,
  Smartphone,
  Workflow,
} from 'lucide-react'
import { useLanguage } from '../App'

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Services() {
  const { t } = useLanguage()
  const icons = [Braces, Database, Smartphone, Workflow, Bot]
  const cardLayouts = [
    'lg:col-span-3',
    'lg:col-span-3',
    'lg:col-span-2',
    'lg:col-span-2',
    'lg:col-span-2',
  ]

  return (
    <section
      className='section-shell services-showcase'
      id='services'
    >
      <div className='services-orb services-orb-one' aria-hidden='true' />
      <div className='services-orb services-orb-two' aria-hidden='true' />
      <div className='max-w-7xl mx-auto relative z-10'>
        <motion.div
          variants={reveal}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className='mb-14 text-center max-w-4xl mx-auto'
        >
          <span className='section-kicker'>{t.services.eyebrow}</span>
          <h2 className='title-shine text-4xl md:text-6xl font-extrabold mt-5 mb-5'>
            {t.services.headline}
          </h2>
          <p className='section-subtitle-panel text-secondary text-lg md:text-xl whitespace-pre-line'>
            {t.services.subline}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5'>
          {t.services.items.map((service, idx) => {
            const Icon = icons[idx]

            return (
              <motion.article
                key={service.title}
                variants={reveal}
                initial='hidden'
                whileInView='visible'
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.625, delay: idx * 0.07 }}
                className={`service-card service-card-${idx + 1} ${cardLayouts[idx]} group`}
              >
                <span className='service-card-number'>0{idx + 1}</span>
                <div className='service-icon' aria-hidden='true'>
                  <Icon className='w-6 h-6' />
                </div>
                <h3 className='text-xl md:text-2xl font-extrabold mb-3 text-on-surface'>
                  {service.title}
                </h3>
                <p className='text-on-surface-variant leading-relaxed text-[0.95rem]'>
                  {service.desc}
                </p>
                <div className='service-card-beam' aria-hidden='true' />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  const { t } = useLanguage()

  return (
    <section className='section-shell bg-surface' id='process'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          variants={reveal}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className='max-w-3xl mx-auto text-center mb-14'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-5 text-on-surface'>
            {t.process.headline}
          </h2>
          <p className='text-lg text-secondary leading-relaxed'>
            {t.process.subline}
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-5 relative'>
          <div
            className='hidden md:block absolute top-8 inset-x-[12%] h-px bg-outline-variant/40'
            aria-hidden='true'
          />

          {t.process.steps.map((step, idx) => (
            <motion.article
              key={step.title}
              variants={reveal}
              initial='hidden'
              whileInView='visible'
              whileHover={{ y: -5 }}
              transition={{ duration: 0.625, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className='process-card group'
            >
              <div className='process-number'>{idx + 1}</div>
              <h3 className='text-xl font-bold mb-2 text-on-surface'>
                {step.title}
              </h3>
              <p className='font-semibold text-primary mb-2'>{step.lead}</p>
              <p className='text-secondary leading-relaxed text-[0.95rem]'>
                {step.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
