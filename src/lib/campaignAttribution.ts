// Optional first-party campaign attribution. No cookies and no collection before analytics consent.
// The browser keeps a first-party, session-scoped value for at most 30 minutes.
export type CampaignAttribution = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  landing_path?: string
  referrer_origin?: string
}

const STORAGE_KEY = 'codecrafter-consented-campaign-v1'
const MAX_AGE_MS = 30 * 60 * 1000
const campaignFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

function cleanField(input: unknown): string | undefined {
  if (typeof input !== 'string') return undefined
  const value = input.trim()
  // Keep campaign labels descriptive, but avoid emails, controls, HTML and raw search terms.
  return value.length > 0 && value.length <= 80 && /^[\p{L}\p{N}._:\/\- ]+$/u.test(value) ? value : undefined
}

export function normalizeCampaignAttribution(input: unknown): CampaignAttribution | undefined {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined
  const record = input as Record<string, unknown>
  const result: CampaignAttribution = {}
  for (const field of campaignFields) {
    const value = cleanField(record[field])
    if (value) result[field] = value
  }
  const path = record.landing_path
  if (typeof path === 'string' && path.length <= 160 && /^\/(?:[a-zA-Z0-9\/_-]*)$/.test(path)) result.landing_path = path
  const referrer = record.referrer_origin
  if (typeof referrer === 'string' && referrer.length <= 160) {
    try {
      const url = new URL(referrer)
      if ((url.protocol === 'https:' || url.protocol === 'http:') && url.origin === referrer && url.hostname !== 'mosheschwartzberg.com' && url.hostname !== 'www.mosheschwartzberg.com') result.referrer_origin = url.origin
    } catch { /* Untrusted referrer: ignore it. */ }
  }
  return Object.keys(result).length ? result : undefined
}

export function parseCampaignAttribution(search: string, referrer: string, landingPath: string): CampaignAttribution | undefined {
  const params = new URLSearchParams(search.slice(0, 1200))
  const candidate: Record<string, string> = { landing_path: landingPath }
  for (const field of campaignFields) {
    const raw = params.get(field)
    if (raw) candidate[field] = raw
  }
  try {
    if (referrer) candidate.referrer_origin = new URL(referrer).origin
  } catch { /* Ignore malformed referrer. */ }
  const normalized = normalizeCampaignAttribution(candidate)
  if (!normalized) return undefined
  const hasSource = campaignFields.some(field => Boolean(normalized[field])) || Boolean(normalized.referrer_origin)
  return hasSource ? normalized : undefined
}

export function captureCampaignAttribution(consented: boolean) {
  if (!consented || typeof window === 'undefined') return
  try {
    const current = parseCampaignAttribution(window.location.search, document.referrer, window.location.pathname)
    if (current) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ capturedAt: Date.now(), value: current }))
  } catch { /* Attribution must never prevent contact or rendering. */ }
}

export function getCampaignAttribution(consented: boolean): CampaignAttribution | undefined {
  if (!consented || typeof window === 'undefined') return undefined
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const saved = JSON.parse(raw) as { capturedAt?: unknown; value?: unknown }
    if (typeof saved.capturedAt !== 'number' || Date.now() - saved.capturedAt > MAX_AGE_MS || saved.capturedAt > Date.now()) {
      sessionStorage.removeItem(STORAGE_KEY)
      return undefined
    }
    return normalizeCampaignAttribution(saved.value)
  } catch { return undefined }
}

export function clearCampaignAttribution() {
  try { if (typeof window !== 'undefined') sessionStorage.removeItem(STORAGE_KEY) } catch {}
}
