import SectionReveal from '@/components/SectionReveal/SectionReveal'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { projects } from '@/data/projects'
import styles from './ProjectsSection.module.scss'

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.projects}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> Projects
        </h2>
      </SectionReveal>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <SectionReveal key={project.id} direction="up" delay={0.1 * (i + 1)}>
            <ProjectCard project={project} />
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
