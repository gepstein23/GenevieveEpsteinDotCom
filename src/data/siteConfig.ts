import { content } from './content'

/**
 * Re-exported from content.ts for backwards compatibility.
 */
export const siteConfig = {
  name: content.meta.name,
  greeting: content.hero.greeting,
  taglines: content.hero.taglines,
  bio: content.about.bio,
  location: content.meta.location,
  hometown: content.meta.hometown,
  email: content.meta.email,
  resumeUrl: content.meta.resumeUrl,
  interests: content.about.interests,
} as const
