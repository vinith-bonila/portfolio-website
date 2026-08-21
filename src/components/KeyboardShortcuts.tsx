import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { shortcuts } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

const SECTION_MAP: Record<string, string> = {
  h: 'home',
  p: 'projects',
  s: 'skills',
  e: 'experience',
  c: 'contact',
}

function isTyping(el: Element | null) {
  if (!el) return false
  const tag = el.tagName
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    (el as HTMLElement).isContentEditable
  )
}

/**
 * Global keyboard navigation (an understated power-user touch):
 *   g h/p/s/e/c → jump to a section, ? → toggle help, Esc → close help.
 * Yields to an open project modal so its own Esc handler wins.
 */
export function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false)
  const awaitingG = useRef(false)
  const gTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTyping(document.activeElement)) return

      if (e.key === '?') {
        e.preventDefault()
        setHelpOpen((o) => !o)
        return
      }
      if (e.key === 'Escape') {
        if (helpOpen) setHelpOpen(false)
        return
      }

      // A project modal owns the keyboard while it's open.
      if (document.querySelector('[role="dialog"]')) return

      const k = e.key.toLowerCase()
      if (k === 'g') {
        awaitingG.current = true
        clearTimeout(gTimer.current)
        gTimer.current = setTimeout(() => (awaitingG.current = false), 800)
        return
      }
      if (awaitingG.current && SECTION_MAP[k]) {
        awaitingG.current = false
        const reduce = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
        document.getElementById(SECTION_MAP[k])?.scrollIntoView({
          behavior: reduce ? 'auto' : 'smooth',
        })
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [helpOpen])

  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setHelpOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-4">
              <span className="font-mono text-xs uppercase tracking-label text-accent">
                Keyboard shortcuts
              </span>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                aria-label="Close shortcuts"
                className="grid h-8 w-8 place-items-center rounded-full border border-[var(--hairline)] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="divide-y divide-[var(--hairline)] px-5 py-2">
              {shortcuts.map((s) => (
                <li
                  key={s.keys}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-sm text-muted">{s.label}</span>
                  <span className="flex gap-1">
                    {s.keys.split(' ').map((key, i) => (
                      <kbd
                        key={i}
                        className="rounded-md border border-[var(--hairline)] bg-[var(--bg)] px-2 py-0.5 font-mono text-xs text-[var(--text)]"
                      >
                        {key}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
