import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import styles from './MagneticButton.module.scss'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
}

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleClick = () => {
    onClick?.()
  }

  const className = `${styles.magnetic} ${styles[variant]}`

  const sharedProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    className,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
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
    <motion.button {...sharedProps}>
      {children}
    </motion.button>
  )
}
