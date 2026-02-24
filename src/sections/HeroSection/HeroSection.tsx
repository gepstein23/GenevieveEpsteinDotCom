import GlitchText from '@/components/GlitchText/GlitchText'
import TypewriterText from '@/components/TypewriterText/TypewriterText'
import MagneticButton from '@/components/MagneticButton/MagneticButton'
import ScrollIndicator from '@/components/ScrollIndicator/ScrollIndicator'
import { content } from '@/data/content'
import { trackClick } from '@/hooks/useVisitorTracking'
import headshotImg from '@/assets/genevieve-headshot_2025.jpg'
import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        {/* Photo — fades in quickly */}
        <div className={styles.photoFrame}>
          <div className={styles.photoRing} />
          <img
            src={headshotImg}
            alt={content.hero.photoAlt}
            className={styles.photo}
            width={220}
            height={220}
          />
        </div>

        {/* Greeting — fades in after name lands */}
        <p className={styles.greeting}>{content.hero.greeting}</p>

        {/* Name — visible from first paint, dramatic blur/scale entrance */}
        <div className={styles.nameWrap}>
          <GlitchText text={content.meta.name} as="h1" />
        </div>

        {/* Tagline — fades in after greeting */}
        <div className={styles.tagline}>
          <TypewriterText phrases={[...content.hero.taglines]} />
        </div>

        {/* Buttons — appear last */}
        <div className={styles.actions}>
          <MagneticButton href="#resume" variant="primary" onClick={() => trackClick('hero:View My Work')}>
            {content.hero.ctaPrimary}
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary" onClick={() => trackClick('hero:Get In Touch')}>
            {content.hero.ctaSecondary}
          </MagneticButton>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <ScrollIndicator />
      </div>
    </section>
  )
}
