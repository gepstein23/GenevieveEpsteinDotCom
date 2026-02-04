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
    const photos = screen.getAllByRole('img')
    expect(photos).toHaveLength(2)
    expect(photos[0]).toHaveAttribute('alt', 'Genevieve Epstein — professional photo 1')
    expect(photos[1]).toHaveAttribute('alt', 'Genevieve Epstein — professional photo 2')
  })

  it('gallery photos have lazy loading', () => {
    render(<Footer />)
    const photos = screen.getAllByRole('img')
    for (const photo of photos) {
      expect(photo).toHaveAttribute('loading', 'lazy')
    }
  })
})
