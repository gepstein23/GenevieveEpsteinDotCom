import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { useCursor } from '@/context/CursorContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './CustomCursor.module.scss'

/**
 * Custom animated cursor that replaces the default browser cursor.
 *
 * The cursor is a circle that follows the mouse with spring physics,
 * creating a slight "lag" that feels organic. It changes shape and size
 * based on what the user is hovering over (controlled via CursorContext).
 *
 * Hidden on touch devices since they don't have a persistent pointer.
 *
 * Variants:
 * - default: small circle with neon border
 * - hover: larger circle with semi-transparent fill (for buttons, links)
 * - text: wider, shorter rectangle (for text areas)
 * - hidden: invisible (for when native cursor is needed)
 */
export default function CustomCursor() {
  const { variant } = useCursor()
  const isTouch = useMediaQuery('(pointer: coarse)')

  /* Raw mouse position tracked as motion values (not React state)
   * to avoid re-rendering on every pixel of mouse movement. */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  /* Spring-smoothed position — creates the trailing effect.
   * Lower damping = more bounce, higher stiffness = snappier follow. */
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  /* Don't render on touch devices */
  if (isTouch) return null

  return (
    <motion.div
      className={styles.cursor}
      style={{ x: springX, y: springY }}
      animate={variant}
      variants={{
        default: {
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '2px solid var(--color-accent-pink)',
          opacity: 1,
        },
        hover: {
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 0, 110, 0.15)',
          border: '2px solid var(--color-accent-pink)',
          opacity: 1,
        },
        text: {
          width: 4,
          height: 32,
          borderRadius: '2px',
          backgroundColor: 'var(--color-accent-cyan)',
          border: 'none',
          opacity: 0.8,
        },
        hidden: {
          opacity: 0,
        },
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    />
  )
}
