import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './CookieLeaderboard.module.scss'

const API_URL = import.meta.env.VITE_COOKIE_API_URL as string | undefined
const LEADERBOARD_URL = API_URL ? `${API_URL}/cookie/leaderboard` : null

interface LeaderboardEntry {
  username: string
  count: number
  rank: number
}

interface CookieLeaderboardProps {
  isOpen: boolean
  onClose: () => void
  currentUsername: string | null
  onUsernameChange: (value: string) => void
}

export default function CookieLeaderboard({ isOpen, onClose, currentUsername, onUsernameChange }: CookieLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [globalCount, setGlobalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchLeaderboard = useCallback(async () => {
    if (!LEADERBOARD_URL) return
    setLoading(true)
    try {
      const res = await fetch(LEADERBOARD_URL)
      if (res.ok) {
        const data = await res.json()
        setLeaderboard(data.leaderboard ?? [])
        setGlobalCount(data.globalCount ?? 0)
      }
    } catch {
      // Failed to fetch leaderboard
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard()
    }
  }, [isOpen, fetchLeaderboard])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(e.target.value)
  }, [onUsernameChange])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="leaderboard-title"
          tabIndex={-1}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <header className={styles.header}>
              <h2 id="leaderboard-title" className={styles.title}>Cookie Leaderboard</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close leaderboard"
              >
                &times;
              </button>
            </header>

            <div className={styles.nameSection}>
              <label htmlFor="cookie-username" className={styles.nameLabel}>
                Your name (tracks your cookies on the board)
              </label>
              <input
                id="cookie-username"
                type="text"
                className={styles.nameInput}
                placeholder="enter a name..."
                value={currentUsername ?? ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.globalCount}>
              <span className={styles.globalLabel}>Total cookies sent</span>
              <span className={styles.globalValue}>{globalCount.toLocaleString()}</span>
            </div>

            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : leaderboard.length === 0 ? (
              <div className={styles.empty}>
                No entries yet. Be the first to add your name!
              </div>
            ) : (
              <ol className={styles.list}>
                {leaderboard.map((entry) => {
                  const isCurrentUser = currentUsername?.toLowerCase() === entry.username.toLowerCase()
                  return (
                    <li
                      key={entry.username}
                      className={`${styles.entry} ${isCurrentUser ? styles.currentUser : ''}`}
                    >
                      <span className={styles.rank}>#{entry.rank}</span>
                      <span className={styles.username}>
                        {entry.username}
                        {isCurrentUser && <span className={styles.youBadge}>you</span>}
                      </span>
                      <span className={styles.entryCount}>{entry.count.toLocaleString()}</span>
                    </li>
                  )
                })}
              </ol>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
