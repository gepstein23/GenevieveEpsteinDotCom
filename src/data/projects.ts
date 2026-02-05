import { content } from './content'
import type { Project } from '@/types'

/**
 * Re-exported from content.ts for backwards compatibility.
 */
export const projects: Project[] = [...content.projects.items]
