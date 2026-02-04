import styles from './GlitchText.module.scss'

interface GlitchTextProps {
  text: string
  /** HTML tag to render. Defaults to span. Use 'h1', 'h2', etc. for headings. */
  as?: keyof HTMLElementTagNameMap
}

/**
 * Text with a periodic RGB-split glitch effect.
 *
 * Uses CSS ::before and ::after pseudo-elements that are offset copies
 * of the text in cyan and pink. A clip-path animation reveals slices
 * of these offset copies intermittently, creating a "digital glitch" look.
 *
 * The effect triggers every few seconds via CSS animation and also on hover.
 * This is pure CSS — no JavaScript animation needed.
 */
export default function GlitchText({ text, as: Tag = 'span' }: GlitchTextProps) {
  return (
    <Tag className={styles.glitch} data-text={text}>
      {text}
    </Tag>
  )
}
