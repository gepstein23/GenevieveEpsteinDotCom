import type { Skill } from '@/types'

/**
 * Skills data for the SkillOrbit visualization.
 *
 * Each skill has a category that determines which orbital ring it appears on.
 * The SkillOrbit component groups by category and assigns different orbit radii.
 */

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'HTML/CSS', category: 'frontend' },
  { name: 'SCSS', category: 'frontend' },

  // Backend
  { name: 'Python', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'SQL', category: 'backend' },

  // Tools & Platforms
  { name: 'AWS', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },

  // Languages
  { name: 'Java', category: 'languages' },
  { name: 'C++', category: 'languages' },
]
