import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/SectionReveal/SectionReveal'
import GlowCard from '@/components/GlowCard/GlowCard'
import { experience } from '@/data/experience'
import { skills } from '@/data/skills'
import styles from './ResumeSection.module.scss'

/**
 * Tiny company logos as SVG paths (16x16 viewBox).
 * Keyed by company name for easy lookup.
 */
const companyLogos: Record<string, { path: string; color: string }> = {
  FanDuel: {
    // Simplified crown/shield icon
    path: 'M8 1L2 5v6l6 4 6-4V5L8 1zM8 3.2L12.2 6v4.4L8 13 3.8 10.4V6L8 3.2z',
    color: '#1493ff',
  },
  'VMware by Broadcom': {
    // Simplified V-check icon
    path: 'M1 5l3-1 4 6 4-6 3 1-6.2 10h-1.6L1 5z',
    color: '#cc092f',
  },
}

const categories = [
  { key: 'languages', label: 'Languages', color: 'var(--color-text-secondary)' },
  { key: 'frameworks', label: 'Frameworks & Libraries', color: 'var(--color-accent-purple)' },
  { key: 'cloud', label: 'Cloud & Infrastructure', color: 'var(--color-accent-pink)' },
  { key: 'tools', label: 'Tools & Observability', color: 'var(--color-accent-cyan)' },
] as const

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

  return (
    <section id="resume" className={styles.resume}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> Experience
        </h2>
      </SectionReveal>

      {/* Stats bar */}
      <SectionReveal delay={0.1}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <AnimatedCounter end={3000} suffix="+" />
            <span className={styles.statLabel}>reqs/sec handled</span>
          </div>
          <div className={styles.stat}>
            <AnimatedCounter end={51000} suffix="+" />
            <span className={styles.statLabel}>fraud accounts caught</span>
          </div>
          <div className={styles.stat}>
            <AnimatedCounter end={3450000} suffix="+" />
            <span className={styles.statLabel}>hours of potential fraud prevented</span>
          </div>
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
                      {companyLogos[item.company] && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill={companyLogos[item.company].color}
                          aria-hidden="true"
                          className={styles.companyLogo}
                        >
                          <path d={companyLogos[item.company].path} />
                        </svg>
                      )}
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
              <h3 className={styles.sidebarHeading}>Tech Stack</h3>
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
              <h3 className={styles.sidebarHeading}>Education</h3>
              <p className={styles.eduDegree}>B.Sc. Computer Science</p>
              <p className={styles.eduSchool}>Northeastern University</p>
              <p className={styles.eduDetail}>Khoury College of Computer Sciences</p>
              <p className={styles.eduDetail}>Concentration in Systems, Minor in Music</p>
              <p className={styles.eduDate}>Graduated December 2021</p>
            </GlowCard>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.4}>
            <GlowCard className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>Awards</h3>
              <div className={styles.award}>
                <span className={styles.awardIcon}>&#9733;</span>
                <div>
                  <p className={styles.awardTitle}>Rising Stars Program Award</p>
                  <p className={styles.awardOrg}>FanDuel &middot; July 2025</p>
                </div>
              </div>
              <div className={styles.award}>
                <span className={styles.awardIcon}>&#9733;</span>
                <div>
                  <p className={styles.awardTitle}>#1 Ranked Senior Software Engineer</p>
                  <p className={styles.awardOrg}>FanDuel Trust &amp; Safety &middot; 2025</p>
                </div>
              </div>
            </GlowCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
