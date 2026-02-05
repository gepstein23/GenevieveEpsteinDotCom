/**
 * CustomCursor tests.
 *
 * The custom cursor has been replaced by a CSS-only cursor.
 * The component now renders nothing (returns null).
 */

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import CustomCursor from './CustomCursor'

describe('CustomCursor', () => {
  it('renders nothing (cursor is CSS-only)', () => {
    const { container } = render(<CustomCursor />)
    expect(container.firstChild).toBeNull()
  })
})
