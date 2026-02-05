import { useRef, type ReactNode, type MouseEvent } from 'react'
import styles from './GlowCard.module.scss'

interface GlowCardProps {
  children: ReactNode
  className?: string
}

/**
 * A glassmorphism card with a mouse-following radial glow effect.
 *
 * As the cursor moves over the card, a radial gradient highlight
 * follows it, creating a spotlight/glow effect under the pointer.
 * This is achieved by setting a CSS custom property (--glow-x, --glow-y)
 * on the element, which the SCSS uses in a radial-gradient background.
 */
export default function GlowCard({ children, className = '' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      className={`${styles.glowCard} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
}
