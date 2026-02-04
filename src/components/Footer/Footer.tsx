import { siteConfig } from '@/data/siteConfig'
import Logo from '@/components/Logo/Logo'
import photo1 from '@/assets/linderpix-NU-KCCS-24916-web (1).jpg'
import photo2 from '@/assets/linderpix-NU-KCCS-24962-web (1).jpg'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.gallery}>
        <div className={styles.galleryItem}>
          <img
            src={photo1}
            alt="Genevieve Epstein — professional photo 1"
            className={styles.galleryImg}
            loading="lazy"
          />
        </div>
        <div className={styles.galleryItem}>
          <img
            src={photo2}
            alt="Genevieve Epstein — professional photo 2"
            className={styles.galleryImg}
            loading="lazy"
          />
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.content}>
        <Logo size={36} />
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className={styles.tagline}>Built with curiosity & code</p>
      </div>
    </footer>
  )
}
