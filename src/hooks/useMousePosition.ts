import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

/**
 * Tracks the global mouse position.
 *
 * Returns { x, y } coordinates updated on every mouse move.
 * Used by the CustomCursor component to follow the pointer,
 * and by MagneticButton to calculate distance from the cursor.
 *
 * Performance note: mousemove fires very frequently. This is fine for the
 * cursor (which needs real-time updates), but components that don't need
 * every frame should throttle their consumption of these values.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
