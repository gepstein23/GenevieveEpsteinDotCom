import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { particlesConfig } from './particlesConfig'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Full-screen particle effect background layer.
 *
 * Uses tsParticles with the "slim" bundle (smaller than the full library)
 * to render interactive particles behind all content.
 *
 * The engine must be initialized once before particles can render.
 * loadSlim loads only the features we use (basic particles, links, repulse)
 * to keep the bundle small.
 *
 * Disabled when the user prefers reduced motion.
 */
export default function ParticleBackground() {
  const [isReady, setIsReady] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setIsReady(true)
    })
  }, [])

  const options = useMemo(() => particlesConfig, [])

  if (prefersReduced || !isReady) return null

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  )
}
