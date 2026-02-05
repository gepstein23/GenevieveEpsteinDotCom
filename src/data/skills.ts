import { content } from './content'
import type { Skill } from '@/types'

/**
 * Re-exported from content.ts for backwards compatibility.
 */
export const skills: Skill[] = [...content.skills]
