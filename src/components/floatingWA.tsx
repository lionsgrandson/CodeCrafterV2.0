import { MessageCircle, Send, X } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../App'

export default function FloatingWA() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const copy = lang === 'he'
    ? {
        status: 'בדרך כלל עונה במהירות',
        greeting: 'היי! איך אפשר לעזור לך היום?',
        placeholder: 'כתיבת הודעה...',
        open: 'פתיחת שיחה עם CodeCrafter ב-WhatsApp',
        close: 'סגירת חלון WhatsApp',
        send: 'שליחת הודעה ב-WhatsApp',
      }
    : {
        status: 'Typically replies quickly',
        greeting: 'Hello! How can I help you today?',
        placeholder: 'Type a message...',
        open: 'Open a WhatsApp chat with CodeCrafter',
        close: 'Close WhatsApp panel',
        send: 'Send message on WhatsApp',
      }

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('mousedown', closeOnOutsideClick)
    }
  }, [open])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = message.trim() || (lang === 'he' ? 'היי משה, אשמח להתייעץ לגבי פרויקט.' : 'Hi Moshe, I would like to discuss a project.')
    window.open(`https://wa.me/972587076077?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div ref={wrapperRef} className='wa-widget' dir={lang === 'he' ? 'rtl' : 'ltr'}>
      {open && (
        <section className='wa-panel' aria-label='WhatsApp'>
          <header className='wa-panel-header'>
            <img
              src='https://mosheschwartzberg.com/about-photo-1200.webp'
              alt={lang === 'he' ? 'משה שוורצברג, CodeCrafter' : 'Moshe Schwartzberg, CodeCrafter'}
              width='48'
              height='48'
            />
            <div>
              <strong>CodeCrafter</strong>
              <span>{copy.status}</span>
            </div>
            <button type='button' onClick={() => setOpen(false)} aria-label={copy.close}>
              <X className='w-5 h-5' aria-hidden='true' />
            </button>
          </header>
          <div className='wa-message'>{copy.greeting}</div>
          <form onSubmit={submit}>
            <label className='sr-only' htmlFor='wa-message'>{copy.placeholder}</label>
            <input
              id='wa-message'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={copy.placeholder}
              autoComplete='off'
            />
            <button type='submit' aria-label={copy.send}>
              <Send className='w-5 h-5' aria-hidden='true' />
            </button>
          </form>
        </section>
      )}
      <button
        type='button'
        className='wa-launcher'
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className='w-7 h-7' aria-hidden='true' /> : <MessageCircle className='w-7 h-7 fill-current' aria-hidden='true' />}
        {!open && <span aria-hidden='true' />}
      </button>
    </div>
  )
}
