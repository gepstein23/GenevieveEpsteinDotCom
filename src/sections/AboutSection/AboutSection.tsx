import SectionReveal from '@/components/SectionReveal/SectionReveal'
import GlowCard from '@/components/GlowCard/GlowCard'
import { siteConfig } from '@/data/siteConfig'
import { skills } from '@/data/skills'
import styles from './AboutSection.module.scss'

const categories = [
  { key: 'frontend', label: 'Frontend', color: 'var(--color-accent-pink)' },
  { key: 'backend', label: 'Backend', color: 'var(--color-accent-purple)' },
  { key: 'tools', label: 'Tools', color: 'var(--color-accent-cyan)' },
  { key: 'languages', label: 'Languages', color: 'var(--color-text-secondary)' },
] as const

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> About Me
        </h2>
      </SectionReveal>

      <div className={styles.grid}>
        <SectionReveal direction="left" delay={0.1}>
          <div className={styles.bio}>
            {siteConfig.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal direction="right" delay={0.2}>
          <GlowCard className={styles.skillsCard}>
            <h3 className={styles.skillsHeading}>Tech Stack</h3>
            <div className={styles.skillCategories}>
              {categories.map((cat) => (
                <div key={cat.key} className={styles.category}>
                  <span
                    className={styles.categoryLabel}
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                  <div className={styles.tags}>
                    {skills
                      .filter((s) => s.category === cat.key)
                      .map((skill) => (
                        <span
                          key={skill.name}
                          className={styles.tag}
                          style={{ borderColor: cat.color }}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </SectionReveal>
      </div>
    </section>
  )
}
