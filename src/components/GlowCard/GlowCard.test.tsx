import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import GlowCard from './GlowCard'

describe('GlowCard', () => {
  it('renders children', () => {
    render(<GlowCard><p>Card content</p></GlowCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })
})
