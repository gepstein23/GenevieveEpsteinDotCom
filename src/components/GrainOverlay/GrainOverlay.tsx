import styles from './GrainOverlay.module.scss'

/**
 * Film grain texture overlay.
 *
 * Adds a subtle noise texture over the entire page, giving the background
 * a tactile, organic feel that counteracts the "too clean digital" look.
 *
 * The grain is generated purely with CSS using an SVG filter turbulence
 * and composited as a fixed overlay with very low opacity.
 * No images needed — it's lightweight and resolution-independent.
 */
export default function GrainOverlay() {
  return <div className={styles.grain} aria-hidden="true" />
}
