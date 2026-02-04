/**
 * Site-wide configuration strings.
 *
 * All personal info and copy lives here so it's easy to update
 * without digging through component code.
 */

export const siteConfig = {
  name: 'Genevieve Epstein',
  greeting: "Hello, I'm",
  taglines: [
    'Senior Software Engineer',
    'Backend Systems Builder',
    'Cloud-Native Engineer',
    'Cellist & Coder',
  ],
  bio: [
    'Senior Software Engineer specializing in large-scale backend systems and cloud-native infrastructure, with a proven record of delivering high-impact features on AWS that reduce fraud, cost, and operational overhead.',
    "When I'm not building event-driven architectures or optimizing systems, you can find me playing cello, snowboarding, or deep in a game of Texas Hold 'Em.",
  ],
  location: 'Atlanta, GA',
  hometown: 'San Francisco, CA',
  email: 'genevieve.epstein@gmail.com',
  resumeUrl: '#',
  interests: [
    { emoji: '\u{1F3BB}', label: 'Cello & Viola' },
    { emoji: '\u{1F3C2}', label: 'Snowboarding' },
    { emoji: '\u{1F5A8}\uFE0F', label: '3D Printing' },
    { emoji: '\u{1F6B4}', label: 'SoulCycle' },
    { emoji: '\u{1F0CF}', label: "Texas Hold 'Em" },
    { emoji: '\u{1F3AE}', label: 'PC Gaming' },
    { emoji: '\u{1F9E0}', label: 'Trivia' },
    { emoji: '\u{1F1EB}\u{1F1F7}', label: 'Fluent in French' },
  ],
} as const
