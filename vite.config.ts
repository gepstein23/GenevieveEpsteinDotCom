import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

/**
 * Vite configuration for the portfolio site.
 *
 * - SWC plugin compiles React/TypeScript faster than Babel
 * - Path alias '@' maps to 'src/' for cleaner imports (e.g., '@/components/Foo')
 * - SCSS modules are handled natively by Vite (no extra plugin needed)
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
