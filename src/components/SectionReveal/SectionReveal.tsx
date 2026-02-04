import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import type { ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  /** How the section animates in. Each has a distinct character. */
  direction?: 'up' | 'left' | 'right' | 'fade'
  /** Delay before animation starts (seconds). Used for staggering. */
  delay?: number
}

/**
 * Wrapper that animates its children into view when scrolled to.
 *
 * Uses Intersection Observer to detect when the section enters the viewport,
 * then triggers a motion animation. triggerOnce ensures it only plays once
 * (sections stay visible after revealing, not re-animating on scroll back).
 *
 * The threshold of 0.15 means 15% of the element must be visible before
 * triggering — this ensures the animation is visible to the user.
 */
export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
}: SectionRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  const directionVariants = {
    up: { y: 40 },
    left: { x: -40 },
    right: { x: 40 },
    fade: {},
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directionVariants[direction] }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
