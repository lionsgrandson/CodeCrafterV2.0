import { FloatingWhatsApp } from 'react-floating-whatsapp'

export default function FloatingWA() {
  return (
    <FloatingWhatsApp
      phoneNumber='972587076077'
      accountName='CodeCrafter'
      avatar='/oldabout-photo.jpeg'
      darkMode={true}
      allowClickAway={true}
      allowEsc={true}
      notification={true}
      chatMessage='Hello! How can we help you today?'
    />
  )
}
