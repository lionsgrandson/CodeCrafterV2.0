import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useEffect, useRef } from 'react'
import { useLanguage } from '../App'

export default function FloatingWA() {
  const { lang } = useLanguage()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const copy =
    lang === 'he'
      ? {
          status: 'בדרך כלל עונה במהירות',
          message: 'היי! איך אפשר לעזור לך היום?',
          placeholder: 'כתיבת הודעה...',
        }
      : {
          status: 'Typically replies quickly',
          message: 'Hello! How can I help you today?',
          placeholder: 'Type a message...',
        }

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    const syncHiddenPanels = () => {
      wrapper.querySelectorAll<HTMLElement>('[aria-hidden]').forEach((panel) => {
        if (panel.getAttribute('aria-hidden') === 'true') panel.setAttribute('inert', '')
        else panel.removeAttribute('inert')
      })
    }

    syncHiddenPanels()
    const observer = new MutationObserver(syncHiddenPanels)
    observer.observe(wrapper, {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-hidden'],
    })
    return () => observer.disconnect()
  }, [lang])

  return (
    <div ref={wrapperRef} className='localized-whatsapp' dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <FloatingWhatsApp
        key={lang}
        phoneNumber='972587076077'
        accountName='CodeCrafter'
        avatar='/oldabout-photo-120.webp'
        statusMessage={copy.status}
        chatMessage={copy.message}
        placeholder={copy.placeholder}
        darkMode
        allowClickAway
        allowEsc
        notification
      />
    </div>
  )
}
