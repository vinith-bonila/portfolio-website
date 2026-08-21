import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { CountUp } from './ui/CountUp'
import { ArchitectureStrip } from './ArchitectureStrip'
import { Screenshot } from './ui/Screenshot'

const EASE = [0.22, 1, 0.36, 1] as const

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/** Small mono section label used to structure the modal as a case study. */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-label text-muted">
      {children}
    </div>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus management: remember trigger, focus modal, restore on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  // Esc to close + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null)
        if (nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const hasRealLive = project.live && !project.livePlaceholder
  const repoLinks =
    project.repos && project.repos.length > 0
      ? project.repos
      : project.repo
        ? [{ label: 'Source', url: project.repo }]
        : []

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering wrapper — min-h-full keeps the top reachable when the
          panel is taller than the viewport (avoids flex-centering cutoff). */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/* Panel */}
        <motion.div
          ref={panelRef}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] shadow-2xl"
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
        {/* Accent top rule */}
        <div className="h-1 w-full bg-gradient-to-r from-accent via-accent-soft to-transparent" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
                {hasRealLive && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    Live
                  </span>
                )}
              </div>
              <h3
                id="modal-title"
                className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-accent">
                {project.subtitle}
              </p>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--hairline)] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <X size={18} />
            </button>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-2 text-muted">{project.summary}</p>
          </div>

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mt-6">
              <SectionLabel>Gallery</SectionLabel>
              <div className="mt-3 space-y-3">
                {project.images.map((img) => (
                  <div
                    key={img}
                    className="flex overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--bg)]"
                  >
                    <Screenshot src={img} alt={`${project.title} — screenshot`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engineering */}
          <div className="mt-6">
            <SectionLabel>Engineering</SectionLabel>
            <ul className="mt-3 space-y-3">
              {project.details.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <ArrowUpRight
                    size={16}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture (renders its own label) */}
          {project.architecture && project.architecture.length > 0 && (
            <ArchitectureStrip nodes={project.architecture} />
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-6">
              <SectionLabel>Metrics</SectionLabel>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-[var(--hairline)] bg-[var(--bg)] p-3 text-center"
                  >
                    <div className="font-mono text-xl font-semibold text-accent sm:text-2xl">
                      <CountUp
                        value={m.value}
                        decimals={m.decimals}
                        prefix={m.prefix}
                        suffix={m.suffix}
                      />
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack */}
          <div className="mt-6">
            <SectionLabel>Stack</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[var(--hairline)] bg-[var(--bg)] px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(hasRealLive || repoLinks.length > 0) && (
            <div className="mt-8 border-t border-[var(--hairline)] pt-6">
              <SectionLabel>Links</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-3">
              {hasRealLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-ink-950 transition-shadow hover:shadow-[0_0_24px_-6px_rgba(45,226,197,0.6)]"
                >
                  <ExternalLink size={15} />
                  Live demo
                </a>
              )}
              {repoLinks.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <Github size={15} />
                  {r.label}
                </a>
              ))}
              </div>
            </div>
          )}
        </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
