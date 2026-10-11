import { useEffect, useState } from 'react'
import { useLanguage } from '../App'
import { readConsent, setAnalyticsConsent } from '../lib/analytics'

export function AnalyticsConsent() {
  const { lang } = useLanguage()
  const [choice, setChoice] = useState<'granted' | 'denied' | null>('denied')
  const [open, setOpen] = useState(false)
  useEffect(() => { const stored = readConsent(); setChoice(stored); setOpen(stored === null) }, [])
  const choose = (granted: boolean) => { setChoice(granted ? 'granted' : 'denied'); setOpen(false); setAnalyticsConsent(granted) }
  return <>
    <button className='consent-settings' onClick={() => setOpen(true)}>{lang === 'he' ? 'העדפות מדידה' : 'Analytics preferences'}</button>
    {open && <section className='consent-panel' aria-labelledby='consent-title'>
      <h2 id='consent-title'>{lang === 'he' ? 'עוזרים לנו לשפר את האתר?' : 'Help us improve the website?'}</h2>
      <p>{lang === 'he' ? 'בהסכמתכם, Google Analytics ו-Microsoft Clarity מודדים שימוש והקלטות ביקור עם שדות טופס מוסתרים. אפשר לסרב או לשנות את הבחירה בכל עת. טופס הפנייה עובד גם ללא מדידה.' : 'With your permission, Google Analytics and Microsoft Clarity measure usage and record visits with form fields masked. You can decline or change your choice anytime. Contact works without analytics.'} <a href='/privacy/'>{lang === 'he' ? 'מדיניות פרטיות' : 'Privacy policy'}</a></p>
      <div className='flex flex-wrap gap-3'>
        <button className='button-secondary px-5 py-3' onClick={() => choose(false)}>{lang === 'he' ? 'ללא מדידה' : 'Decline analytics'}</button>
        <button className='button-primary px-5 py-3' onClick={() => choose(true)}>{lang === 'he' ? 'אישור מדידה' : 'Allow analytics'}</button>
        {choice !== null && <button className='px-4 py-3 underline' onClick={() => setOpen(false)}>{lang === 'he' ? 'סגירה' : 'Close'}</button>}
      </div>
    </section>}
  </>
}
