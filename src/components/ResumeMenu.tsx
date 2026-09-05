import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileDown, ChevronDown, Download } from 'lucide-react'
import { hero } from '../data/portfolio'

/**
 * "Download Resume" split into a small accessible dropdown of role-tailored
 * resumes (AI / Data Science, Data Analyst). Closes on outside click or Esc.
 */
export function ResumeMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-cursor="open"
        aria-haspopup="menu"
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-6 py-3 font-mono text-sm font-medium transition-colors hover:border-accent hover:text-accent"
      >
        {hero.ctas.secondary.label}
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute left-0 top-full z-30 mt-2 w-60 overflow-hidden rounded-xl p-1.5 shadow-2xl"
          >
            <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-label text-muted">
              Choose a resume
            </div>
            {hero.resumes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                download
                role="menuitem"
                data-cursor="open"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
              >
                <FileDown size={15} className="text-accent" />
                <span className="flex-1">{r.label}</span>
                <Download size={13} className="opacity-40" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
