import { useEffect, useState } from 'react'
import { useLanguage } from '../App'
import { readConsent, setAnalyticsConsent } from '../lib/analytics'

export function AnalyticsConsent() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(readConsent() === null) }, [])
  const choose = (granted: boolean) => { setOpen(false); setAnalyticsConsent(granted) }
  return <>
    {open && <section className='consent-panel' aria-label={lang === 'he' ? 'העדפות מדידה' : 'Analytics preferences'}>
      <p>{lang === 'he' ? 'באישורכם נשתמש בכלי מדידה כדי לשפר את האתר.' : 'With your consent, we use analytics to improve the website.'} <a href='/privacy/'>{lang === 'he' ? 'מדיניות פרטיות' : 'Privacy policy'}</a></p>
      <div className='consent-actions'>
        <button className='button-secondary' onClick={() => choose(false)}>{lang === 'he' ? 'ללא מדידה' : 'Decline analytics'}</button>
        <button className='button-primary' onClick={() => choose(true)}>{lang === 'he' ? 'אישור מדידה' : 'Allow analytics'}</button>
      </div>
    </section>}
  </>
}
