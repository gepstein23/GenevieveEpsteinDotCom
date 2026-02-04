import { siteConfig } from '@/data/siteConfig'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className={styles.tagline}>Built with curiosity & code</p>
      </div>
    </footer>
  )
}
