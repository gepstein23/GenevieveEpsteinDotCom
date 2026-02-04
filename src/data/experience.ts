import type { ExperienceItem } from '@/types'

/**
 * Resume timeline data.
 *
 * Each entry appears as a node on the animated timeline in the Resume section.
 * Edit this array to update your experience — the UI renders it automatically.
 *
 * TODO: Replace placeholder data with real experience.
 */

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Developer',
    company: 'Company Name',
    period: '2024 — Present',
    description: [
      'Built and maintained full-stack web applications',
      'Collaborated with cross-functional teams to ship features',
      'Implemented CI/CD pipelines and automated testing',
    ],
  },
  {
    id: 'exp-2',
    role: 'Software Engineering Intern',
    company: 'Company Name',
    period: '2023 — 2024',
    description: [
      'Developed frontend features using React and TypeScript',
      'Contributed to backend API design and implementation',
      'Participated in code reviews and agile ceremonies',
    ],
  },
  {
    id: 'exp-3',
    role: 'Computer Science Student',
    company: 'University Name',
    period: '2020 — 2024',
    description: [
      'Studied algorithms, data structures, and software engineering',
      'Built personal projects to apply classroom concepts',
      'Active member of coding clubs and hackathons',
    ],
  },
]
