import type { Project } from '@/types'

/**
 * Project showcase data.
 *
 * Add, remove, or reorder projects here and the Projects section
 * updates automatically. Each project gets its own interactive card.
 *
 * TODO: Replace placeholder URLs with real links.
 */

export const projects: Project[] = [
  {
    id: 'poker-high-hand',
    title: 'Poker High Hand Simulator',
    description:
      'An interactive simulator for poker high hand promotions. Calculates probabilities and simulates outcomes for casino-style high hand bonuses.',
    techStack: ['React', 'TypeScript', 'Python'],
    liveUrl: '#',
    sourceUrl: '#',
    imageAlt: 'Poker High Hand Simulator screenshot',
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description:
      'This very site! A creative, interactive portfolio built with React, Framer Motion, and tsParticles. Features custom cursor, 3D card effects, and scroll-triggered animations.',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'SCSS'],
    sourceUrl: 'https://github.com/gepstein23/GenevieveEpsteinDotCom',
    imageAlt: 'Portfolio website screenshot',
  },
  {
    id: 'project-placeholder-1',
    title: 'Project Three',
    description:
      'Replace this placeholder with your next project. Describe what it does and why it matters.',
    techStack: ['Technology', 'Stack', 'Here'],
    liveUrl: '#',
    sourceUrl: '#',
    imageAlt: 'Project three screenshot',
  },
]
