import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useLanguage } from '../App'

export default function FloatingWA() {
  const { lang } = useLanguage()
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

  return (
    <div className='localized-whatsapp' dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <FloatingWhatsApp
        key={lang}
        phoneNumber='972587076077'
        accountName='CodeCrafter'
        avatar='/oldabout-photo.jpeg'
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
