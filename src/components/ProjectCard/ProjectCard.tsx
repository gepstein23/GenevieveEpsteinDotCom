import { useRef, useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt'
import GlowCard from '@/components/GlowCard/GlowCard'
import { content } from '@/data/content'
import type { Project } from '@/types'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
  project: Project
}

/**
 * Interactive project showcase card with 3D tilt effect.
 *
 * Wraps GlowCard (for the mouse-following glow and glassmorphism) and adds:
 * - vanilla-tilt for 3D perspective tilt on hover
 * - Glare effect (simulated light reflection)
 * - Project info: title, description, tech tags, and links
 *
 * The tilt effect is destroyed on unmount to prevent memory leaks.
 * Disabled when user prefers reduced motion.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = tiltRef.current
    if (!node || prefersReduced) return

    VanillaTilt.init(node, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      perspective: 1000,
      scale: 1.02,
    })

    return () => {
      /* Clean up to prevent memory leaks */
      (node as HTMLDivElement & { vanillaTilt?: { destroy: () => void } })
        .vanillaTilt?.destroy()
    }
  }, [prefersReduced])

  return (
    <div ref={tiltRef}>
      <GlowCard className={styles.card}>
        {/* Gradient placeholder for project screenshot */}
        <div className={styles.thumbnailWrap}>
          <div className={styles.thumbnail} aria-hidden="true" />
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.badge}
            >
              {project.liveLabel ?? content.projectCard.liveDemoLabel} &rarr;
            </a>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.tags}>
            {project.techStack.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>

          <div className={styles.links}>
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {content.projectCard.sourceCodeLabel} &rarr;
              </a>
            )}
          </div>
        </div>
      </GlowCard>
    </div>
  )
}
