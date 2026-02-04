import { motion } from 'motion/react'
import styles from './AnimatedGradientOrb.module.scss'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface AnimatedGradientOrbProps {
  /** CSS color for the orb's gradient (e.g., 'var(--color-accent-pink)') */
  color: string
  /** Size in pixels */
  size?: number
  /** CSS top position */
  top?: string
  /** CSS left position */
  left?: string
  /** CSS right position */
  right?: string
  /** Animation duration in seconds — controls how slowly the orb drifts */
  duration?: number
}

/**
 * A large, blurred, glowing orb that drifts slowly across the background.
 *
 * Multiple orbs in different accent colors create the "living, breathing"
 * gradient background effect. They use heavy blur (80px+) so they appear
 * as smooth color washes rather than distinct circles.
 *
 * Each orb slowly oscillates in position and scale, creating organic movement.
 * The animation repeats infinitely and reverses, so orbs drift back and forth.
 */
export default function AnimatedGradientOrb({
  color,
  size = 400,
  top,
  left,
  right,
  duration = 20,
}: AnimatedGradientOrbProps) {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <motion.div
      className={styles.orb}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={
        prefersReduced
          ? {}
          : {
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.1, 0.9, 1],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  )
}
