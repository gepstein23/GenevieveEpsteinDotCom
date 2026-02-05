import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './CookieClicker.module.scss'

const API_URL = import.meta.env.VITE_COOKIE_API_URL as string | undefined
const COOKIE_POST_URL = API_URL ? `${API_URL}/cookie` : null
const COOKIE_GET_URL = API_URL ? `${API_URL}/cookie/count` : null

interface FloatingCookie {
  id: number
  x: number
}

export default function CookieClicker() {
  const [count, setCount] = useState<number | null>(null)
  const [floatingCookies, setFloatingCookies] = useState<FloatingCookie[]>([])
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!COOKIE_GET_URL) return
    fetch(COOKIE_GET_URL)
      .then(res => res.json())
      .then(data => setCount(data.count ?? 0))
      .catch(() => setCount(0))
  }, [])

  const sendCookie = useCallback(async () => {
    if (sending || !COOKIE_POST_URL) return
    setSending(true)

    const id = Date.now() + Math.random()
    const x = Math.random() * 60 + 20
    setFloatingCookies(prev => [...prev, { id, x }])
    setTimeout(() => {
      setFloatingCookies(prev => prev.filter(c => c.id !== id))
    }, 1500)

    try {
      const res = await fetch(COOKIE_POST_URL, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setCount(data.count)
      }
    } catch {
      // request failed — don't update count
    } finally {
      setSending(false)
    }
  }, [sending])

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {floatingCookies.map(cookie => (
          <motion.span
            key={cookie.id}
            className={styles.floatingCookie}
            style={{ left: `${cookie.x}%` }}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -100, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' as const }}
          >
            🍪
          </motion.span>
        ))}
      </AnimatePresence>

      <button
        className={styles.cookieButton}
        onClick={sendCookie}
        disabled={sending}
      >
        <span className={styles.emoji}>🍪</span>
        <span className={styles.label}>send me a cookie</span>
      </button>

      {count !== null && (
        <span className={styles.count}>
          {count.toLocaleString()} cookie{count !== 1 ? 's' : ''} received
        </span>
      )}
    </div>
  )
}
