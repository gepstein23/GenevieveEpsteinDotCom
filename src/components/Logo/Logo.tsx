import styles from './Logo.module.scss'

interface LogoProps {
  size?: number
  className?: string
}

/**
 * Flowing "GE" monogram logo with neon gradient stroke.
 * Uses smooth curves and a single continuous-feel stroke for an artistic look.
 */
export default function Logo({ size = 32, className = '' }: LogoProps) {
  const height = size
  const width = size // 1:1 aspect ratio

  return (
    <svg
      viewBox="0 0 60 48"
      width={width}
      height={height}
      className={`${styles.logo} ${className}`}
      aria-label="GE logo"
      role="img"
    >
      <defs>
        <linearGradient id="ge-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-pink)" />
          <stop offset="50%" stopColor="var(--color-accent-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-cyan)" />
        </linearGradient>
      </defs>
      {/* G — open arc with inward crossbar */}
      <path
        d="M26 6 C18 3, 6 6, 4 18 C2 30, 10 44, 24 42 C32 41, 30 34, 28 28 L18 28"
        fill="none"
        stroke="url(#ge-logo-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* E — three flowing strokes sharing a spine */}
      <path
        d="M36 6 C42 4, 54 6, 56 8"
        fill="none"
        stroke="url(#ge-logo-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M36 6 L36 42 C36 42, 48 44, 56 40"
        fill="none"
        stroke="url(#ge-logo-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 24 C42 22, 50 24, 52 26"
        fill="none"
        stroke="url(#ge-logo-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
