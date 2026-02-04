import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import TypewriterText from './TypewriterText'

describe('TypewriterText', () => {
  it('renders with accessible label', () => {
    render(<TypewriterText phrases={['Hello', 'World']} />)
    expect(screen.getByLabelText('Hello')).toBeInTheDocument()
  })

  it('renders the blinking cursor element', () => {
    const { container } = render(
      <TypewriterText phrases={['Test']} />
    )
    const cursor = container.querySelector('[class*="cursor"]')
    expect(cursor).toBeInTheDocument()
    expect(cursor).toHaveTextContent('|')
  })
})
