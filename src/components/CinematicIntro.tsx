import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMotionMode } from '../hooks/useMotionMode'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Short cinematic opener on every load: a dark screen with ambient particles →
 * "Welcome to Vinith's World" → "DATA × AI × ANALYTICS", then auto-dismisses
 * (or the visitor clicks "Enter"). Collapses to an instant, skippable card
 * under reduced motion. Never blocks content for long.
 */
export function CinematicIntro() {
  // Focus mode (or OS reduced-motion) collapses the intro to a brief, static card.
  const { calm: reduced } = useMotionMode()
  const [show, setShow] = useState(true)

  const done = () => setShow(false)

  // Lock scroll while the intro is up.
  useEffect(() => {
    if (!show) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [show])

  // Auto-dismiss (a touch longer when animated, near-instant when reduced).
  useEffect(() => {
    if (!show) return
    const t = setTimeout(done, reduced ? 1200 : 3000)
    return () => clearTimeout(t)
  }, [show, reduced])

  // Allow Enter/Escape to skip.
  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') done()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-ink-950"
          data-lenis-prevent
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
          role="dialog"
          aria-label="Intro"
        >
          {/* faint drifting particles */}
          {!reduced &&
            Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-[3px] w-[3px] rounded-full bg-accent/40"
                style={{
                  left: `${(i * 53) % 100}%`,
                  top: `${(i * 29) % 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0], y: [-10, 10, -10] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE, delay: 0.15 }}
            className="px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0.1 : 0.25, duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted sm:text-xs"
            >
              Welcome to
            </motion.div>
            <div className="mt-4 text-4xl font-bold tracking-tight text-[#EDF0F0] sm:text-6xl md:text-7xl">
              Vinith&rsquo;s <span className="text-accent">World</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0.25 : 0.95, duration: 0.6 }}
              className="mt-5 font-mono text-xs uppercase tracking-[0.32em] text-accent sm:text-sm"
            >
              Data × AI × Analytics
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            onClick={done}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0.3 : 1.5, duration: 0.5 }}
            data-cursor="open"
            className="absolute bottom-16 rounded-full border border-[var(--hairline)] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Enter experience
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
