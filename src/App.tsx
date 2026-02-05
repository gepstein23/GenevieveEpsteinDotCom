import { CursorProvider } from '@/context/CursorContext'
import CustomCursor from '@/components/CustomCursor/CustomCursor'
import ParticleBackground from '@/components/ParticleBackground/ParticleBackground'
import AnimatedGradientOrb from '@/components/AnimatedGradientOrb/AnimatedGradientOrb'
import GrainOverlay from '@/components/GrainOverlay/GrainOverlay'
import Navigation from '@/components/Navigation/Navigation'
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress'
import Footer from '@/components/Footer/Footer'
import CookieClicker from '@/components/CookieClicker/CookieClicker'
import { featureFlags } from '@/config/featureFlags'
import HeroSection from '@/sections/HeroSection/HeroSection'
import AboutSection from '@/sections/AboutSection/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection/ProjectsSection'
import ResumeSection from '@/sections/ResumeSection/ResumeSection'
import ContactSection from '@/sections/ContactSection/ContactSection'
import styles from '@/App.module.scss'

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      {featureFlags.cookieClicker && <CookieClicker />}

      <div className={styles.app}>
        {/* Background layers — fixed wrapper ensures they never take flow space */}
        <div className={styles.backgroundLayers}>
          <ParticleBackground />
          <AnimatedGradientOrb
            color="var(--color-accent-pink)"
            size={500}
            top="-10%"
            left="-5%"
            duration={25}
          />
          <AnimatedGradientOrb
            color="var(--color-accent-purple)"
            size={400}
            top="30%"
            right="-10%"
            duration={20}
          />
          <AnimatedGradientOrb
            color="var(--color-accent-cyan)"
            size={350}
            top="70%"
            left="20%"
            duration={30}
          />
          <GrainOverlay />
        </div>

        <main className={styles.main}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ResumeSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </CursorProvider>
  )
}
