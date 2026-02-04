/**
 * Root application component.
 *
 * This is the top-level layout that:
 * 1. Wraps everything in context providers (cursor state)
 * 2. Renders global visual layers (particles, gradient orbs, grain overlay, cursor)
 * 3. Renders the navigation and all page sections in order
 *
 * Sections are rendered in a single scrollable page (no routing needed
 * for a portfolio site — smooth scroll between sections via anchor links).
 *
 * Layer order (back to front):
 *   Particles → Gradient Orbs → Grain Overlay → Content → Navigation → Cursor
 */

import { CursorProvider } from '@/context/CursorContext'
import CustomCursor from '@/components/CustomCursor/CustomCursor'
import ParticleBackground from '@/components/ParticleBackground/ParticleBackground'
import AnimatedGradientOrb from '@/components/AnimatedGradientOrb/AnimatedGradientOrb'
import GrainOverlay from '@/components/GrainOverlay/GrainOverlay'
import styles from '@/App.module.scss'

export default function App() {
  return (
    <CursorProvider>
      {/* Custom cursor follows mouse with spring physics */}
      <CustomCursor />

      <div className={styles.app}>
        {/* Background visual layers — behind all content */}
        <ParticleBackground />
        <AnimatedGradientOrb
          color="var(--color-accent-pink)"
          size={500}
          top="-10%"
          left="-5%"
          duration={25}
        />
        <AnimatedGradientOrb
          color="var(--color-accent-purple)"
          size={400}
          top="30%"
          right="-10%"
          duration={20}
        />
        <AnimatedGradientOrb
          color="var(--color-accent-cyan)"
          size={350}
          top="70%"
          left="20%"
          duration={30}
        />
        <GrainOverlay />

        <main className={styles.main}>
          {/* Sections will be added in Phases 5-9:
              - HeroSection
              - AboutSection
              - ProjectsSection
              - ResumeSection
              - ContactSection
          */}
          <div className={styles.placeholder}>
            <h1>Genevieve Epstein</h1>
            <p>Site coming together...</p>
          </div>
        </main>

        {/* Footer will be added in Phase 9 */}
      </div>
    </CursorProvider>
  )
}
