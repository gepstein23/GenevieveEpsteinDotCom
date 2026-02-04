import { motion } from 'motion/react'
import styles from './ScrollIndicator.module.scss'

/**
 * Animated bouncing arrow that hints the user should scroll down.
 *
 * Placed at the bottom of the Hero section. Uses a simple CSS chevron
 * with a motion.div for infinite y-axis oscillation.
 * Fades away naturally as the hero scrolls out of view.
 */
export default function ScrollIndicator() {
  return (
    <motion.div
      className={styles.indicator}
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.div>
  )
}
