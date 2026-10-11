import { useId, useState } from 'react'
import { trackEvent } from '../lib/analytics'
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
  return (
    <div className={`faq-accordion ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-faq-button-${index}`
        const panelId = `${baseId}-faq-panel-${index}`

        return (
          <article
            key={item.question}
            className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
          >
            <button
              id={buttonId}
              type='button'
              className='faq-accordion-trigger'
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => { setOpenIndex(isOpen ? null : index); if (!isOpen) trackEvent('faq_expand', { section_name: 'faq' }) }}
            >
              <span>{item.question}</span>
              <span
                className='faq-accordion-icon transition-transform motion-reduce:transition-none'
                aria-hidden='true'
                style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
                  >
                <ChevronDown className='h-5 w-5' />
              </span>
            </button>

            <div
                  id={panelId}
                  role='region'
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                        className='faq-accordion-panel'
                >
                  <div className='faq-accordion-answer'>{item.answer}</div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
