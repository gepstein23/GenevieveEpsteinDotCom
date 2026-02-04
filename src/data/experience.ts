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
    role: 'Senior Software Engineer (L4)',
    company: 'FanDuel',
    period: 'Jul 2024 — Present',
    description: [
      'Led design and delivery of fraud mitigation features on AWS and Confluent using event-driven architectures, resulting in 51,000+ fraudulent account suspensions and 3.45M+ hours of potential fraud prevented.',
      'Drove process and operational improvements, including abstracting 3 algorithms into shared libraries and redesigning a Flink feature to cut cost by 98%.',
      'Emerged as de facto technical lead by aligning cross-team work, coordinating with external vendors, and executing 9 emergency releases for time-sensitive requests.',
      'Supported mission-critical, high-throughput services (withdrawals and login flows up to 3,000 reqs/sec) and delivered multiple external vendor integrations.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Senior Software Engineer (ICB 3)',
    company: 'VMware by Broadcom',
    period: 'Feb 2023 — Jul 2024',
    description: [
      'Developed 2 of 4 core VM cloning methods, improving performance by ~80%, reducing process time from days to hours.',
      'Introduced 2 of 4 supported VM types, including one driving a cross-team rearchitecture of backup/failover management.',
      'Designed and launched a log parsing/querying tool adopted across teams, significantly reducing debugging time.',
      'Supported cross-functional teams by triaging 5,000+ test failures and mentoring peers.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Software Engineer 2',
    company: 'VMware',
    period: 'Dec 2021 — Feb 2023',
    description: [
      'Resolved 400+ product issues, found and filed 350+ bugs, implemented 10+ RESTful API endpoints.',
      'Led integration of team workflows into new service environments, enabling a successful SaaS product launch.',
      'Acted as subject matter expert for several key features, ensuring prioritization and delivery across environments.',
    ],
  },
  {
    id: 'exp-4',
    role: 'Student Cooperative Engineer',
    company: 'VMware',
    period: 'Jul 2019 — Dec 2021',
    description: [
      'Full-time and part-time intern across multiple teams, contributing to core product development.',
    ],
  },
]
