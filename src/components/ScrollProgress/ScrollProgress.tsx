import { motion, useScroll } from 'motion/react'
import styles from './ScrollProgress.module.scss'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  )
}
