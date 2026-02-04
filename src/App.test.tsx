/**
 * Root App component tests.
 *
 * Verifies the app renders without crashing and displays
 * the expected initial content.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import App from '@/App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Genevieve Epstein')).toBeInTheDocument()
  })
})
