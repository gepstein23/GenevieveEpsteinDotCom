import { motion } from 'motion/react'
import GlitchText from '@/components/GlitchText/GlitchText'
import TypewriterText from '@/components/TypewriterText/TypewriterText'
import MagneticButton from '@/components/MagneticButton/MagneticButton'
import ScrollIndicator from '@/components/ScrollIndicator/ScrollIndicator'
import { siteConfig } from '@/data/siteConfig'
import styles from './HeroSection.module.scss'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.greeting} variants={fadeUp}>
          {siteConfig.greeting}
        </motion.p>

        <motion.div variants={fadeUp}>
          <GlitchText text={siteConfig.name} as="h1" />
        </motion.div>

        <motion.div className={styles.tagline} variants={fadeUp}>
          <TypewriterText phrases={[...siteConfig.taglines]} />
        </motion.div>

        <motion.div className={styles.actions} variants={fadeUp}>
          <MagneticButton href="#projects" variant="primary">
            View My Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Get In Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className={styles.scrollHint}>
        <ScrollIndicator />
      </div>
    </section>
  )
}
