import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import SectionReveal from './SectionReveal'

describe('SectionReveal', () => {
  it('renders children', () => {
    render(
      <SectionReveal>
        <p>Hello world</p>
      </SectionReveal>
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
