import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { useCursor } from '@/context/CursorContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './CustomCursor.module.scss'

/**
 * Custom cursor with two layers:
 * 1. A small solid dot locked to exact mouse position (no lag)
 * 2. A larger trailing ring with spring physics for personality
 *
 * On hover, the dot scales up and the ring expands with a glow.
 * Hidden on touch devices.
 */
export default function CustomCursor() {
  const { variant } = useCursor()
  const isTouch = useMediaQuery('(pointer: coarse)')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  /* Ring follows with a tight spring — subtle lag, not distracting */
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.1 })
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.1 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (isTouch) return null

  return (
    <>
      {/* Dot: instant position, zero lag */}
      <motion.div
        className={styles.dot}
        style={{ x: mouseX, y: mouseY }}
        animate={variant}
        variants={{
          default: { scale: 1, opacity: 1 },
          hover: { scale: 2.5, opacity: 1 },
          text: { scaleX: 0.5, scaleY: 2, opacity: 0.9 },
          hidden: { scale: 0, opacity: 0 },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Ring: trails behind with spring physics */}
      <motion.div
        className={styles.ring}
        style={{ x: ringX, y: ringY }}
        animate={variant}
        variants={{
          default: { width: 28, height: 28, opacity: 0.4 },
          hover: { width: 44, height: 44, opacity: 0.6 },
          text: { width: 20, height: 20, opacity: 0.25 },
          hidden: { width: 0, height: 0, opacity: 0 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
