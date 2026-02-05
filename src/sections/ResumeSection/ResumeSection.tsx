import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/SectionReveal/SectionReveal'
import GlowCard from '@/components/GlowCard/GlowCard'
import { content } from '@/data/content'
import styles from './ResumeSection.module.scss'

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame: number
    const duration = 1500
    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, end])

  return (
    <span ref={ref} className={styles.counter}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function ResumeSection() {
  const [hoveredEntry, setHoveredEntry] = useState<string | null>(null)

  const { experience, stats, categories, techStackHeading, education, awards } = content.resume
  const { skills } = content

  return (
    <section id="resume" className={styles.resume}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> {content.resume.heading}
        </h2>
      </SectionReveal>

      {/* Stats bar */}
      <SectionReveal delay={0.1}>
        <div className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </SectionReveal>

      <div className={styles.columns}>
        {/* Left: timeline */}
        <div className={styles.timelineCol}>
          <div className={styles.timeline}>
            {experience.map((item, i) => (
              <SectionReveal
                key={item.id}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={0.1 * (i + 1)}
              >
                <div
                  className={styles.entry}
                  onMouseEnter={() => setHoveredEntry(item.id)}
                  onMouseLeave={() => setHoveredEntry(null)}
                >
                  <div
                    className={`${styles.node} ${hoveredEntry === item.id ? styles.nodePulse : ''}`}
                    aria-hidden="true"
                  />
                  <div className={styles.card}>
                    <span className={styles.period}>{item.period}</span>
                    <h3 className={styles.role}>{item.role}</h3>
                    <a
                      href={item.companyUrl ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                    >
                      <span className={styles.company}>{item.company}</span>
                    </a>
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
        </div>

        {/* Right: sidebar */}
        <div className={styles.sidebar}>
          <SectionReveal direction="right" delay={0.2}>
            <GlowCard className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>{techStackHeading}</h3>
              <div className={styles.skillCategories}>
                {categories.map((cat) => (
                  <div key={cat.key} className={styles.category}>
                    <span className={styles.categoryLabel} style={{ color: cat.color }}>
                      {cat.label}
                    </span>
                    <div className={styles.tags}>
                      {skills
                        .filter((s) => s.category === cat.key)
                        .map((skill) => (
                          <span
                            key={skill.name}
                            className={`${styles.tag}${skill.highlighted ? ` ${styles.tagHighlighted}` : ''}`}
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

          <SectionReveal direction="right" delay={0.3}>
            <GlowCard className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>{education.heading}</h3>
              <p className={styles.eduDegree}>{education.degree}</p>
              <p className={styles.eduSchool}>{education.school}</p>
              <p className={styles.eduDetail}>{education.college}</p>
              <p className={styles.eduDetail}>{education.concentration}</p>
              <p className={styles.eduDate}>{education.graduationDate}</p>
            </GlowCard>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.4}>
            <GlowCard className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>{awards.heading}</h3>
              {awards.items.map((award) => (
                <div key={award.title} className={styles.award}>
                  <span className={styles.awardIcon}>&#9733;</span>
                  <div>
                    <p className={styles.awardTitle}>{award.title}</p>
                    <p className={styles.awardOrg}>{award.org}</p>
                  </div>
                </div>
              ))}
            </GlowCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
