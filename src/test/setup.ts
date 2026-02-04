/**
 * Vitest global test setup.
 *
 * This file runs before every test suite. It:
 * 1. Adds custom DOM matchers from jest-dom (like toBeInTheDocument)
 * 2. Cleans up the DOM after each test to prevent test pollution
 * 3. Mocks browser APIs not available in jsdom (like matchMedia)
 */

import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

/**
 * Mock window.matchMedia — jsdom doesn't implement it,
 * but our components use it for responsive behavior and
 * prefers-reduced-motion detection.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

/**
 * Mock IntersectionObserver — jsdom doesn't implement it,
 * but react-intersection-observer depends on it.
 *
 * Must be a real class so `new IntersectionObserver(...)` works.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn().mockReturnValue([])
  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}
}
window.IntersectionObserver = MockIntersectionObserver
