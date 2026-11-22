import { useEffect, useState } from 'react'
import { useLanguage } from '../App'
import { readConsent, setAnalyticsConsent } from '../lib/analytics'

export function AnalyticsConsent() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(readConsent() === null) }, [])
  const choose = (granted: boolean) => { setOpen(false); setAnalyticsConsent(granted) }
  return <>
    {open && <section className='consent-panel' aria-labelledby='consent-title'>
      <h2 id='consent-title'>{lang === 'he' ? 'עוזרים לנו לשפר את האתר?' : 'Help us improve the website?'}</h2>
      <p>{lang === 'he' ? 'באישורכם נשתמש בכלי מדידה כדי לשפר את האתר.' : 'With your consent, we use analytics to improve the website.'} <a href='/privacy/'>{lang === 'he' ? 'מדיניות פרטיות' : 'Privacy policy'}</a></p>
      <div className='flex flex-wrap gap-3'>
        <button className='button-secondary px-5 py-3' onClick={() => choose(false)}>{lang === 'he' ? 'ללא מדידה' : 'Decline analytics'}</button>
        <button className='button-primary px-5 py-3' onClick={() => choose(true)}>{lang === 'he' ? 'אישור מדידה' : 'Allow analytics'}</button>
      </div>
    </section>}
  </>
}
