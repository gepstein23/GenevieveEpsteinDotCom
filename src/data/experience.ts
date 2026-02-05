import { content } from './content'
import type { ExperienceItem } from '@/types'

/**
 * Re-exported from content.ts for backwards compatibility.
 */
export const experience: ExperienceItem[] = [...content.resume.experience]
