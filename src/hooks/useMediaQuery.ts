import { useState, useEffect } from 'react'

/**
 * Reactive media query hook.
 *
 * Returns true when the given CSS media query matches.
 * Updates automatically when the viewport changes (e.g., resize, orientation).
 *
 * Usage:
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const isTouch = useMediaQuery('(pointer: coarse)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
