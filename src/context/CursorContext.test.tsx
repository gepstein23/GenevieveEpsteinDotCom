/**
 * Tests for CursorContext.
 *
 * Verifies the provider makes cursor state available
 * and that the variant can be updated.
 */

import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CursorProvider, useCursor } from '@/context/CursorContext'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <CursorProvider>{children}</CursorProvider>
}

describe('CursorContext', () => {
  it('provides default cursor variant', () => {
    const { result } = renderHook(() => useCursor(), { wrapper })
    expect(result.current.variant).toBe('default')
  })

  it('updates cursor variant', () => {
    const { result } = renderHook(() => useCursor(), { wrapper })
    act(() => {
      result.current.setCursorVariant('hover')
    })
    expect(result.current.variant).toBe('hover')
  })

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useCursor())
    }).toThrow('useCursor must be used within a CursorProvider')
  })
})
