/**
 * CustomCursor tests.
 *
 * Since the cursor relies on motion values and mouse events,
 * we primarily test that it renders in the right conditions
 * and respects touch device detection.
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { CursorProvider } from '@/context/CursorContext'
import CustomCursor from './CustomCursor'

/** Helper to render cursor inside its required provider */
function renderCursor() {
  return render(
    <CursorProvider>
      <CustomCursor />
    </CursorProvider>
  )
}

describe('CustomCursor', () => {
  it('renders on non-touch devices', () => {
    const { container } = renderCursor()
    /* The cursor div should exist in the DOM */
    expect(container.firstChild).not.toBeNull()
  })

  it('does not render on touch devices', () => {
    /* Mock matchMedia to report touch device */
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(pointer: coarse)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { container } = renderCursor()
    expect(container.firstChild).toBeNull()
  })
})
