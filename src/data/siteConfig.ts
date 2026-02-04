/**
 * Site-wide configuration strings.
 *
 * All personal info and copy lives here so it's easy to update
 * without digging through component code.
 */

export const siteConfig = {
  name: 'Genevieve Epstein',
  greeting: "Hello, I'm",
  /** Taglines that rotate in the typewriter effect on the hero section */
  taglines: [
    'Software Developer',
    'Creative Technologist',
    'Problem Solver',
    'Code Artisan',
  ],
  /** Placeholder bio — replace with your real bio */
  bio: [
    "I'm a software developer who loves building creative, interactive web experiences. I care about clean code, thoughtful design, and making technology feel fun.",
    'When I\'m not coding, you can find me exploring new frameworks, contributing to open source, and turning ideas into polished digital products.',
  ],
  email: 'your.email@example.com',
  resumeUrl: '#',
} as const
