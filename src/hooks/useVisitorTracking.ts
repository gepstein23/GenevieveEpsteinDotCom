import { useEffect } from 'react'
import { featureFlags } from '@/config/featureFlags'

const API_URL = import.meta.env.VITE_COOKIE_API_URL
const VISIT_URL = `${API_URL}/visit`
const SESSION_KEY = 'visitor_tracked'

export function useVisitorTracking() {
  useEffect(() => {
    if (!featureFlags.visitorTracking) return
    if (!API_URL) return
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
