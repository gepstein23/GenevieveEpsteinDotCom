import SectionReveal from '@/components/SectionReveal/SectionReveal'
import { siteConfig } from '@/data/siteConfig'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> About Me
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className={styles.badges}>
          <div className={styles.locationBadge}>
            <span className={styles.locationPin}>&#x1F4CD;</span>
            {siteConfig.location}
          </div>
          <div className={styles.locationBadge}>
            <span className={styles.locationPin}>&#x1F3E0;</span>
            {siteConfig.hometown}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal direction="up" delay={0.15}>
        <div className={styles.bio}>
          {siteConfig.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal direction="up" delay={0.25}>
        <h3 className={styles.interestsHeading}>When I'm not coding</h3>
        <div className={styles.interests}>
          {[...siteConfig.interests].map((item, i) => (
            <span key={i} className={styles.chip}>
              <span className={styles.chipEmoji}>{item.emoji}</span>
              {item.label}
            </span>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
