import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import App from '@/App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Genevieve Epstein')).toBeInTheDocument()
  })

  it('renders the hero section as the first content section', () => {
    const { container } = render(<App />)
    const main = container.querySelector('main')
    const firstSection = main?.querySelector('section')
    expect(firstSection).toHaveAttribute('id', 'hero')
  })

  it('renders background layers in a dedicated wrapper div', () => {
    const { container } = render(<App />)
    const bgLayers = container.querySelector('[class*="backgroundLayers"]')
    expect(bgLayers).toBeInTheDocument()
  })

  it('background layers wrapper is a sibling of main, not a parent', () => {
    const { container } = render(<App />)
    const bgLayers = container.querySelector('[class*="backgroundLayers"]')
    const main = container.querySelector('main')
    // Both should be children of the same .app div
    expect(bgLayers?.parentElement).toBe(main?.parentElement)
  })

  it('background layers are before main in DOM order for correct paint order', () => {
    const { container } = render(<App />)
    const app = container.querySelector('[class*="app"]')
    const children = Array.from(app?.children ?? [])
    const bgIndex = children.findIndex((el) =>
      el.className.includes('backgroundLayers'),
    )
    const mainIndex = children.findIndex((el) => el.tagName === 'MAIN')
    expect(bgIndex).toBeGreaterThanOrEqual(0)
    expect(mainIndex).toBeGreaterThan(bgIndex)
  })

  it('main element does not have an inline z-index that would create a stacking context', () => {
    const { container } = render(<App />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    // No inline z-index — particles show through transparent sections
    expect(main!.style.zIndex).toBe('')
  })
})
