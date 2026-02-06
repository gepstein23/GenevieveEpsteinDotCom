import { useEffect } from 'react'
import { featureFlags, apiConfig } from '@/config/featureFlags'

const VISIT_URL = `${apiConfig.baseUrl}/visit`
const SESSION_KEY = 'visitor_tracked'

export function useVisitorTracking() {
  useEffect(() => {
    if (!featureFlags.visitorTracking) return
    if (sessionStorage.getItem(SESSION_KEY)) return

    sessionStorage.setItem(SESSION_KEY, '1')

    fetch(VISIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {
      // Fire-and-forget — silently ignore errors
    })
  }, [])
}
