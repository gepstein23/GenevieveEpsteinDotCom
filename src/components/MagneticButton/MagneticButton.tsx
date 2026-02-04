import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useCursor } from '@/context/CursorContext'
import styles from './MagneticButton.module.scss'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
}

interface Sparkle {
  id: number
  x: number
  y: number
}

let sparkleId = 0

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const { setCursorVariant } = useCursor()
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

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
    setCursorVariant('default')
  }

  const handleMouseEnter = () => {
    setCursorVariant('hover')
  }

  const handleClick = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const newSparkles: Sparkle[] = Array.from({ length: 6 }, () => ({
      id: ++sparkleId,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }))
    setSparkles((s) => [...s, ...newSparkles])
    setTimeout(() => {
      setSparkles((s) => s.filter((sp) => !newSparkles.includes(sp)))
    }, 600)
    onClick?.()
  }

  const className = `${styles.magnetic} ${styles[variant]}`

  const sharedProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    className,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick: handleClick,
    whileTap: { scale: 0.95 },
  }

  const sparkleElements = sparkles.map((s, i) => (
    <span
      key={s.id}
      className={styles.sparkle}
      style={{
        left: s.x,
        top: s.y,
        '--angle': `${(i % 6) * 60}deg`,
      } as React.CSSProperties}
    />
  ))

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
      >
        {children}
        {sparkleElements}
      </motion.a>
    )
  }

  return (
    <motion.button {...sharedProps}>
      {children}
      {sparkleElements}
    </motion.button>
  )
}
