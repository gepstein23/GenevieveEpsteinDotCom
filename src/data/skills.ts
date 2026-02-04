import type { Skill } from '@/types'

/**
 * Skills data for the Tech Stack sidebar in the Resume section.
 *
 * Each skill has a category that determines which group it appears in.
 * Categories are rendered with distinct accent colors.
 */

export const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'C#', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'Bash', category: 'languages' },
  { name: 'Terraform', category: 'languages' },

  // Frameworks & Libraries
  { name: 'Spring', category: 'frameworks' },
  { name: 'Hibernate', category: 'frameworks' },
  { name: 'React', category: 'frameworks' },
  { name: 'Kafka', category: 'frameworks' },
  { name: 'Flink', category: 'frameworks' },
  { name: 'Confluent', category: 'frameworks' },
  { name: 'REST APIs', category: 'frameworks' },
  { name: 'Maven', category: 'frameworks' },
  { name: 'Gradle', category: 'frameworks' },

  // Cloud & Infrastructure
  { name: 'AWS', category: 'cloud' },
  { name: 'EC2', category: 'cloud' },
  { name: 'Amplify', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
  { name: 'CI/CD', category: 'cloud' },

  // Tools & Observability
  { name: 'DataDog', category: 'tools' },
  { name: 'PagerDuty', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'IntelliJ', category: 'tools' },
  { name: 'SCSS', category: 'tools' },
  { name: 'HTML/CSS', category: 'tools' },
]
