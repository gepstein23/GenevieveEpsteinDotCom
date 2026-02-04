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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
