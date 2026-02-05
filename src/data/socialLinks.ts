import { content } from './content'
import type { SocialLink } from '@/types'

/**
 * Re-exported from content.ts for backwards compatibility.
 */
export const socialLinks: SocialLink[] = [...content.socialLinks]
