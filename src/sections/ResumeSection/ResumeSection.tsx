import SectionReveal from '@/components/SectionReveal/SectionReveal'
import MagneticButton from '@/components/MagneticButton/MagneticButton'
import { experience } from '@/data/experience'
import { siteConfig } from '@/data/siteConfig'
import styles from './ResumeSection.module.scss'

export default function ResumeSection() {
  return (
    <section id="resume" className={styles.resume}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> Experience
        </h2>
      </SectionReveal>

      <div className={styles.timeline}>
        {experience.map((item, i) => (
          <SectionReveal
            key={item.id}
            direction={i % 2 === 0 ? 'left' : 'right'}
            delay={0.15 * (i + 1)}
          >
            <div className={styles.entry}>
              <div className={styles.node} aria-hidden="true" />
              <div className={styles.card}>
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.role}>{item.role}</h3>
                <span className={styles.company}>{item.company}</span>
                <ul className={styles.details}>
                  {item.description.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      {siteConfig.resumeUrl !== '#' && (
        <SectionReveal delay={0.4}>
          <div className={styles.download}>
            <MagneticButton href={siteConfig.resumeUrl} variant="secondary">
              Download Resume
            </MagneticButton>
          </div>
        </SectionReveal>
      )}
    </section>
  )
}
