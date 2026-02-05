import SectionReveal from '@/components/SectionReveal/SectionReveal'
import { content } from '@/data/content'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> {content.about.heading}
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className={styles.badges}>
          <div className={styles.locationBadge}>
            <span className={styles.locationPin}>&#x1F4CD;</span>
            {content.meta.location}
          </div>
          <div className={styles.locationBadge}>
            <span className={styles.locationPin}>&#x1F3E0;</span>
            {content.meta.hometown}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal direction="up" delay={0.15}>
        <div className={styles.bio}>
          {content.about.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal direction="up" delay={0.25}>
        <h3 className={styles.interestsHeading}>{content.about.interestsHeading}</h3>
        <div className={styles.interests}>
          {[...content.about.interests].map((item, i) => (
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
