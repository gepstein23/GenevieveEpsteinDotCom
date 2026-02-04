import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the copyright notice with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Footer />)
    expect(screen.getByText('Built with curiosity & code')).toBeInTheDocument()
  })

  it('renders both gallery photos', () => {
    render(<Footer />)
    expect(
      screen.getByAltText('Genevieve Epstein — professional photo 1'),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText('Genevieve Epstein — professional photo 2'),
    ).toBeInTheDocument()
  })

  it('gallery photos have lazy loading', () => {
    render(<Footer />)
    const photo1 = screen.getByAltText('Genevieve Epstein — professional photo 1')
    const photo2 = screen.getByAltText('Genevieve Epstein — professional photo 2')
    expect(photo1).toHaveAttribute('loading', 'lazy')
    expect(photo2).toHaveAttribute('loading', 'lazy')
  })

  it('renders the logo', () => {
    render(<Footer />)
    expect(screen.getByLabelText('GE logo')).toBeInTheDocument()
  })
})
