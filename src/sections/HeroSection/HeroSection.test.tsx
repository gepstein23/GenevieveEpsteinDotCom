import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import HeroSection from './HeroSection'

describe('HeroSection', () => {
  it('renders the hero section with correct id', () => {
    render(<HeroSection />)
    const section = document.getElementById('hero')
    expect(section).toBeInTheDocument()
  })

  it('renders the profile photo with alt text and a src', () => {
    render(<HeroSection />)
    const photo = screen.getByAltText('Genevieve Epstein')
    expect(photo).toBeInTheDocument()
    expect(photo).toHaveAttribute('src')
  })

  it('renders the profile photo with explicit dimensions', () => {
    render(<HeroSection />)
    const photo = screen.getByAltText('Genevieve Epstein')
    expect(photo).toHaveAttribute('width', '220')
    expect(photo).toHaveAttribute('height', '220')
  })

  it('renders the name as an h1 heading', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Genevieve Epstein')
  })

  it('renders the greeting text', () => {
    render(<HeroSection />)
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument()
  })

  it('renders the tagline with an aria-label for the first phrase', () => {
    render(<HeroSection />)
    expect(
      screen.getByLabelText('Senior Software Engineer'),
    ).toBeInTheDocument()
  })

  it('renders the View My Work button linking to projects', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: 'View My Work' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#projects')
  })

  it('renders the Get In Touch button linking to contact', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: 'Get In Touch' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#contact')
  })

  it('renders the scroll indicator', () => {
    const { container } = render(<HeroSection />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders the photo ring element for the neon border', () => {
    const { container } = render(<HeroSection />)
    const ring = container.querySelector('[class*="photoRing"]')
    expect(ring).toBeInTheDocument()
  })

  it('renders the name inside a wrapper for the CSS entrance animation', () => {
    const { container } = render(<HeroSection />)
    const nameWrap = container.querySelector('[class*="nameWrap"]')
    expect(nameWrap).toBeInTheDocument()
    expect(nameWrap).toHaveTextContent('Genevieve Epstein')
  })

  it('name heading does not have inline opacity 0 (visible on first paint)', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    // Must NOT be hidden by inline styles — CSS animations handle the entrance
    expect(heading.style.opacity).not.toBe('0')
  })

  it('hero uses plain HTML elements, not Motion components that delay rendering', () => {
    const { container } = render(<HeroSection />)
    const hero = container.querySelector('[id="hero"]')!
    // The direct content wrapper should be a plain div, not a motion.div
    // (motion.div would set initial: hidden → opacity: 0 before JS runs)
    const contentDiv = hero.querySelector('[class*="content"]')
    expect(contentDiv).toBeInTheDocument()
    expect(contentDiv!.tagName).toBe('DIV')
    // Should not have data-projection-id (Motion internals)
    expect(contentDiv!.hasAttribute('data-projection-id')).toBe(false)
  })

  it('photo appears before the name in DOM order', () => {
    const { container } = render(<HeroSection />)
    const content = container.querySelector('[class*="content"]')!
    const children = Array.from(content.children)
    const photoIndex = children.findIndex(
      (el) => el.querySelector('img') !== null,
    )
    const nameIndex = children.findIndex(
      (el) => el.querySelector('h1') !== null,
    )
    expect(photoIndex).toBeLessThan(nameIndex)
  })
})
