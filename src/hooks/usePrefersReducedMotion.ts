import { useState, useEffect } from 'react'

/**
 * Detects if the user has enabled "reduce motion" in their OS accessibility settings.
 *
 * Returns true if the user prefers reduced motion, false otherwise.
 * Components use this to disable or simplify animations for accessibility.
 * This is important because fast-moving animations can cause motion sickness
 * or discomfort for some users.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}
