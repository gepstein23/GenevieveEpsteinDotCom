import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useCursor } from '@/context/CursorContext'
import styles from './MagneticButton.module.scss'

interface MagneticButtonProps {
  children: ReactNode
  /** Click handler */
  onClick?: () => void
  /** If set, renders as an anchor link instead of a button */
  href?: string
  /** Visual variant changes the accent color */
  variant?: 'primary' | 'secondary'
}

/**
 * A button that subtly pulls toward the cursor when nearby.
 *
 * On hover, calculates the offset between cursor and button center,
 * then translates the button by a fraction of that offset (max ~10px).
 * This creates a "magnetic" pull effect that feels playful and responsive.
 *
 * Uses spring physics for smooth movement and snaps back when the
 * cursor leaves. Also triggers the custom cursor hover state.
 */
export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const { setCursorVariant } = useCursor()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    /* Move button by 30% of the offset — subtle but noticeable */
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setCursorVariant('default')
  }

  const handleMouseEnter = () => {
    setCursorVariant('hover')
  }

  const className = `${styles.magnetic} ${styles[variant]}`

  const sharedProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    className,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    whileTap: { scale: 0.95 },
  }

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button {...sharedProps} onClick={onClick}>
      {children}
    </motion.button>
  )
}
