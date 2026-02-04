import type { SocialLink } from '@/types'

/**
 * Social and external links.
 *
 * The icon field matches the SVG icon rendered in the SocialLinks component.
 * Update URLs here — they propagate to both the Contact section and Footer.
 *
 * TODO: Replace placeholder URLs with real profiles.
 */

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/gepstein23',
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: '#',
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'email',
  },
]
