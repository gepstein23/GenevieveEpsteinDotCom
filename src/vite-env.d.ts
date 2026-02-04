/// <reference types="vite/client" />

/**
 * Type declarations for SCSS modules.
 *
 * Tells TypeScript that *.module.scss imports return an object
 * mapping class names to unique scoped strings. Without this,
 * importing SCSS modules would cause TypeScript errors.
 */
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
