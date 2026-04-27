import type { ISourceOptions } from '@tsparticles/engine'

/**
 * tsParticles configuration.
 *
 * Creates a sparse field of slow-drifting particles in the accent colors.
 * Particles connect with faint lines when close together and gently
 * repel from the mouse cursor, adding interactivity to the background.
 *
 * Kept deliberately subtle (low count, low opacity, slow speed) so
 * it enhances the atmosphere without distracting from content.
 */
export const particlesConfig: ISourceOptions = {
  fullScreen: false,
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
      },
    },
    color: {
      value: ['#e0527a', '#6366b3', '#5bc4b5'],
    },
    opacity: {
      value: { min: 0.1, max: 0.3 },
    },
    size: {
      value: { min: 3, max: 8 },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      outModes: {
        default: 'out',
      },
    },
    links: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      repulse: {
        distance: 100,
        speed: 0.5,
      },
    },
  },
  detectRetina: true,
}
