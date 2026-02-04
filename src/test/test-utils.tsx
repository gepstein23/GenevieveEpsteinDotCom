/**
 * Custom render function that wraps components with all necessary providers.
 *
 * Use this instead of @testing-library/react's render() in tests so that
 * context providers (CursorContext, etc.) are always available.
 * This prevents "missing provider" errors in component tests.
 *
 * Usage:
 *   import { render, screen } from '@/test/test-utils'
 *   render(<MyComponent />)
 */

import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { CursorProvider } from '@/context/CursorContext'

/**
 * Wrapper that provides all application context providers.
 * Add new providers here as they're created.
 */
function AllProviders({ children }: { children: ReactNode }) {
  return <CursorProvider>{children}</CursorProvider>
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

/* Re-export everything from testing-library, but override render with ours */
export { customRender as render }
export { screen, waitFor, within, act } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
