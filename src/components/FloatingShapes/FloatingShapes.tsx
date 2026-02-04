import { motion } from 'motion/react'
import styles from './FloatingShapes.module.scss'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Decorative SVG shapes that float gently in the background.
 *
 * Used in the Contact section (and optionally others) to add visual interest.
 * Each shape is positioned absolutely and animates with slow drift + rotation.
 * Low opacity keeps them subtle — they're atmosphere, not content.
 */
export default function FloatingShapes() {
  const prefersReduced = usePrefersReducedMotion()

  const shapes = [
    { top: '10%', left: '5%', size: 60, duration: 15, delay: 0, rotation: 360 },
    { top: '20%', right: '8%', size: 40, duration: 20, delay: 2, rotation: -360 },
    { top: '60%', left: '15%', size: 50, duration: 18, delay: 5, rotation: 360 },
    { top: '70%', right: '20%', size: 35, duration: 22, delay: 3, rotation: -360 },
  ]

  return (
    <div className={styles.container} aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={styles.shape}
          style={{
            top: shape.top,
            left: shape.left,
            right: (shape as { right?: string }).right,
            width: shape.size,
            height: shape.size,
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, -15, 0],
                  rotate: [0, shape.rotation],
                }
          }
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Alternate between circle and triangle shapes */}
          {i % 2 === 0 ? (
            <svg viewBox="0 0 60 60" className={styles.svg}>
              <circle cx="30" cy="30" r="28" />
            </svg>
          ) : (
            <svg viewBox="0 0 60 60" className={styles.svg}>
              <polygon points="30,5 55,55 5,55" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
