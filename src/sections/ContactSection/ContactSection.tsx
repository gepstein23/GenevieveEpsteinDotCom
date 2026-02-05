import { useState, useRef, useCallback } from 'react'
import SectionReveal from '@/components/SectionReveal/SectionReveal'
import GlowCard from '@/components/GlowCard/GlowCard'
import { content } from '@/data/content'
import styles from './ContactSection.module.scss'

const iconPaths: Record<string, string> = {
  github:
    'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  email:
    'M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2.5 0L12 11l7.5-5h-15zM4 8v10h16V8l-8 5.333L4 8z',
}

/** Rate-limit window in ms — one submission per 60 seconds */
const RATE_LIMIT_MS = 60_000

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sent' | 'rate-limited'>('idle')
  const lastSubmitRef = useRef(0)
  const mountTimeRef = useRef(Date.now())

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Honeypot check — bots fill the hidden field
      const form = e.currentTarget
      const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value
      if (honeypot) return

      // Minimum time on page check (bots submit instantly)
      if (Date.now() - mountTimeRef.current < 3000) return

      // Rate limiting
      const now = Date.now()
      if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
        setStatus('rate-limited')
        return
      }
      lastSubmitRef.current = now

      // Open mailto with form data pre-populated
      const subject = encodeURIComponent(content.contact.emailSubject)
      const body = encodeURIComponent(
        content.contact.emailBodyTemplate(formData.name, formData.message),
      )
      window.location.href = `mailto:${content.meta.email}?subject=${subject}&body=${body}`

      setStatus('sent')
      setFormData({ name: '', message: '' })
    },
    [formData],
  )

  return (
    <section id="contact" className={styles.contact}>
      <SectionReveal>
        <h2 className={styles.heading}>
          <span className={styles.accent}>//</span> {content.contact.heading}
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <p className={styles.subtext}>{content.contact.subtext}</p>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <GlowCard className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Honeypot — hidden from real users, bots auto-fill it */}
            <input
              type="text"
              name="website"
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={styles.field}>
              <label htmlFor="contact-name" className={styles.label}>
                {content.contact.form.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder={content.contact.form.namePlaceholder}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>
                {content.contact.form.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textarea}
                placeholder={content.contact.form.messagePlaceholder}
                rows={5}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {content.contact.form.submitText}
            </button>

            {status === 'sent' && (
              <p className={styles.statusMsg}>{content.contact.statusSent}</p>
            )}
            {status === 'rate-limited' && (
              <p className={styles.statusMsgError}>{content.contact.statusRateLimited}</p>
            )}
          </form>
        </GlowCard>
      </SectionReveal>

      <SectionReveal delay={0.35}>
        <div className={styles.socials}>
          {content.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={link.label}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={iconPaths[link.icon] ?? ''} />
              </svg>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
