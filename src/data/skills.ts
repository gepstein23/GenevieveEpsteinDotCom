import type { Skill } from '@/types'

/**
 * Skills data for the SkillOrbit visualization.
 *
 * Each skill has a category that determines which orbital ring it appears on.
 * The SkillOrbit component groups by category and assigns different orbit radii.
 */

export const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'C#', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'Terraform', category: 'languages' },

  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'HTML/CSS', category: 'frontend' },

  // Backend
  { name: 'Spring', category: 'backend' },
  { name: 'Hibernate', category: 'backend' },
  { name: 'Maven', category: 'backend' },
  { name: 'Kafka', category: 'backend' },
  { name: 'Flink', category: 'backend' },

  // Tools & Platforms
  { name: 'AWS', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'DataDog', category: 'tools' },
  { name: 'IntelliJ', category: 'tools' },
  { name: 'PagerDuty', category: 'tools' },
]
