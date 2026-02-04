import { useState, useEffect, useCallback } from 'react'
import styles from './TypewriterText.module.scss'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface TypewriterTextProps {
  /** Array of phrases to cycle through */
  phrases: string[]
  /** Milliseconds per character when typing */
  typeSpeed?: number
  /** Milliseconds per character when deleting */
  deleteSpeed?: number
  /** Milliseconds to pause after typing a complete phrase */
  pauseDuration?: number
}

/**
 * Typewriter effect that cycles through an array of phrases.
 *
 * Types each phrase character-by-character, pauses, then "deletes" it
 * and moves to the next phrase. Creates the classic terminal typing look.
 *
 * Implementation uses a state machine with three states:
 * 1. 'typing' — adding characters one at a time
 * 2. 'pausing' — holding the complete phrase for the user to read
 * 3. 'deleting' — removing characters one at a time before next phrase
 *
 * If user prefers reduced motion, shows the first phrase statically.
 */
export default function TypewriterText({
  phrases,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const prefersReduced = usePrefersReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  const currentPhrase = phrases[phraseIndex] ?? ''

  const advanceToNextPhrase = useCallback(() => {
    setPhraseIndex((prev) => (prev + 1) % phrases.length)
    setCharIndex(0)
    setPhase('typing')
  }, [phrases.length])

  useEffect(() => {
    if (prefersReduced) return

    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), typeSpeed)
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pauseDuration)
      }
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed)
      } else {
        advanceToNextPhrase()
      }
    }

    return () => clearTimeout(timeout)
  }, [
    phase,
    charIndex,
    currentPhrase.length,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    prefersReduced,
    advanceToNextPhrase,
  ])

  const displayText = prefersReduced
    ? currentPhrase
    : currentPhrase.slice(0, charIndex)

  return (
    <span className={styles.typewriter} aria-label={currentPhrase}>
      <span>{displayText}</span>
      {!prefersReduced && <span className={styles.cursor}>|</span>}
    </span>
  )
}
