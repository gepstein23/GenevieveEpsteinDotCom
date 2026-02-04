import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import GlitchText from './GlitchText'

describe('GlitchText', () => {
  it('renders the text content', () => {
    render(<GlitchText text="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('sets data-text attribute for pseudo-elements', () => {
    render(<GlitchText text="Test" />)
    const element = screen.getByText('Test')
    expect(element).toHaveAttribute('data-text', 'Test')
  })

  it('renders as custom HTML tag', () => {
    render(<GlitchText text="Heading" as="h1" />)
    const element = screen.getByText('Heading')
    expect(element.tagName).toBe('H1')
  })
})
