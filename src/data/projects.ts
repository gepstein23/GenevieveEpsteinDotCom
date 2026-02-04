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
      'Researching the optimization of High Hand promotions using Monte Carlo Tree Search. A memory-efficient Java app performing adjustable simulations with custom card-playing mechanics, React UI, animations, and ML capabilities — hosted on AWS EC2 and AWS Amplify.',
    techStack: ['Java', 'React', 'AWS EC2', 'AWS Amplify', 'MCTS'],
    sourceUrl: 'https://github.com/gepstein23/PokerHighHandSimulator',
    imageAlt: 'Poker High Hand Simulator screenshot',
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description:
      'This very site! A creative, interactive portfolio built with React, Framer Motion, and tsParticles. Features a custom cursor, 3D card effects, glassmorphism, and scroll-triggered animations.',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'SCSS'],
    sourceUrl: 'https://github.com/gepstein23/GenevieveEpsteinDotCom',
    imageAlt: 'Portfolio website screenshot',
  },
]
