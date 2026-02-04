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
      value: 40,
      density: {
        enable: true,
      },
    },
    color: {
      value: ['#ff006e', '#7b2ff7', '#00f5d4'],
    },
    opacity: {
      value: { min: 0.2, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 3 },
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
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.08,
      width: 1,
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
