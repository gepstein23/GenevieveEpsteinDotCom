import GlitchText from '@/components/GlitchText/GlitchText'
import TypewriterText from '@/components/TypewriterText/TypewriterText'
import MagneticButton from '@/components/MagneticButton/MagneticButton'
import ScrollIndicator from '@/components/ScrollIndicator/ScrollIndicator'
import { siteConfig } from '@/data/siteConfig'
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
            alt="Genevieve Epstein"
            className={styles.photo}
            width={180}
            height={180}
          />
        </div>

        {/* Greeting — fades in after name lands */}
        <p className={styles.greeting}>{siteConfig.greeting}</p>

        {/* Name — visible from first paint, dramatic blur/scale entrance */}
        <div className={styles.nameWrap}>
          <GlitchText text={siteConfig.name} as="h1" />
        </div>

        {/* Tagline — fades in after greeting */}
        <div className={styles.tagline}>
          <TypewriterText phrases={[...siteConfig.taglines]} />
        </div>

        {/* Buttons — appear last */}
        <div className={styles.actions}>
          <MagneticButton href="#projects" variant="primary">
            View My Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Get In Touch
          </MagneticButton>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <ScrollIndicator />
      </div>
    </section>
  )
}
