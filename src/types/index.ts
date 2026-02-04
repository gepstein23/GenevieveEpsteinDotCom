/**
 * Shared TypeScript types used across the application.
 *
 * Centralizing types here avoids circular imports and makes it easy
 * to see the data model at a glance. Each interface corresponds to
 * a data file in src/data/.
 */

/** A project to showcase in the Projects section. */
export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl?: string
  /** Custom label for the live link (defaults to "Live Demo") */
  liveLabel?: string
  sourceUrl?: string
  /** Used as alt text for the project thumbnail */
  imageAlt: string
}

/** A single entry in the experience timeline. */
export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  description: string[]
}

/** A skill with its category for the Tech Stack display. */
export interface Skill {
  name: string
  category: 'languages' | 'frameworks' | 'cloud' | 'tools'
}

/** A social/external link (GitHub, LinkedIn, etc.). */
export interface SocialLink {
  id: string
  label: string
  url: string
  /** The icon name — used to select which SVG/icon to render */
  icon: string
}

/** Cursor visual states — determines how the custom cursor looks. */
export type CursorVariant = 'default' | 'hover' | 'text' | 'hidden'

/** Navigation section identifiers — must match section element IDs. */
export type SectionId = 'hero' | 'about' | 'projects' | 'resume' | 'contact'
