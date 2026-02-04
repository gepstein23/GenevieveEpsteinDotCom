import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CursorVariant } from '@/types'

/**
 * CursorContext provides global cursor state to the app.
 *
 * The custom cursor changes appearance based on what it's hovering.
 * Any interactive component can call setCursorVariant('hover') on
 * mouseEnter and setCursorVariant('default') on mouseLeave to trigger
 * the cursor's shape/size animation.
 *
 * This avoids prop-drilling cursor state through the entire component tree.
 */

interface CursorContextValue {
  variant: CursorVariant
  setCursorVariant: (variant: CursorVariant) => void
}

const CursorContext = createContext<CursorContextValue | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')

  const setCursorVariant = useCallback((v: CursorVariant) => {
    setVariant(v)
  }, [])

  return (
    <CursorContext.Provider value={{ variant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  )
}

/**
 * Hook to access cursor state from any component.
 * Throws if used outside CursorProvider (catches missing provider bugs early).
 */
export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
