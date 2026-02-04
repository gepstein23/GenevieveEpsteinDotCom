import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

/**
 * Vitest configuration — extends the Vite config.
 *
 * Separated from vite.config.ts because Vitest 4.x requires
 * importing from 'vitest/config' for type-safe test options.
 * mergeConfig ensures Vite's plugins, aliases, and SCSS setup carry over.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  })
)
