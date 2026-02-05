import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Logo from '@/components/Logo/Logo'
import { content } from '@/data/content'
import type { SectionId } from '@/types'
import styles from './Navigation.module.scss'

const navItems = content.navigation.items

export default function Navigation() {
  const [active, setActive] = useState<SectionId>('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[]

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top <= window.innerHeight / 3) {
          setActive(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: SectionId) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <button
            className={styles.logo}
            onClick={() => handleClick('hero')}
          >
            <Logo size={28} />
          </button>

          {/* Desktop links */}
          <ul className={styles.links}>
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`${styles.link} ${active === id ? styles.active : ''}`}
                  onClick={() => handleClick(id)}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      className={styles.indicator}
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? content.navigation.hamburgerOpen : content.navigation.hamburgerClosed}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ul className={styles.mobileLinks}>
              {navItems.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (i + 1) }}
                >
                  <button
                    className={`${styles.mobileLink} ${active === id ? styles.mobileActive : ''}`}
                    onClick={() => handleClick(id)}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
