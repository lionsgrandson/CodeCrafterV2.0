import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

export type FaqAccordionItem = {
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: readonly FaqAccordionItem[]
  className?: string
}

export function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId().replace(/:/g, '')
  const reduceMotion = useReducedMotion()

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className={`faq-accordion ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-faq-button-${index}`
        const panelId = `${baseId}-faq-panel-${index}`

        return (
          <motion.article
            layout={!reduceMotion}
            key={item.question}
            className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
            transition={transition}
          >
            <button
              id={buttonId}
              type='button'
              className='faq-accordion-trigger'
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <motion.span
                className='faq-accordion-icon'
                aria-hidden='true'
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={transition}
              >
                <ChevronDown className='h-5 w-5' />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role='region'
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={transition}
                  className='faq-accordion-panel'
                >
                  <div className='faq-accordion-answer'>{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        )
      })}
    </div>
  )
}
