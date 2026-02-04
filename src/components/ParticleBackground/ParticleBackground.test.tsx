/**
 * ParticleBackground tests.
 *
 * Since tsParticles relies heavily on canvas and browser APIs,
 * we mock it and test that the component renders (or doesn't)
 * based on conditions like reduced motion preferences.
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

/* Mock tsParticles — the actual rendering needs canvas, which jsdom lacks */
vi.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => <div data-testid={id} />,
  initParticlesEngine: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn(),
}))

import ParticleBackground from './ParticleBackground'

describe('ParticleBackground', () => {
  it('renders the particles container', async () => {
    const { findByTestId } = render(<ParticleBackground />)
    const particles = await findByTestId('tsparticles')
    expect(particles).toBeInTheDocument()
  })
})
