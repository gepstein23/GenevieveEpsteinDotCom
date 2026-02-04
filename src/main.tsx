/**
 * Application entry point.
 *
 * Imports global styles (which include the CSS reset, typography, and variables)
 * and mounts the React root. StrictMode is enabled to catch common React bugs
 * during development (double-renders, deprecated API warnings).
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/global.scss'
import App from '@/App'

// Disable browser scroll restoration so reloads always start at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
