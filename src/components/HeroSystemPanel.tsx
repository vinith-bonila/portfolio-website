import { motion } from 'framer-motion'
import { systemProfile } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

function Row({
  label,
  value,
  tag,
}: {
  label: string
  value: string
  tag?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="flex items-center gap-2">
        {tag && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-accent">
            <span className="relative flex h-1 w-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1 w-1 rounded-full bg-accent" />
            </span>
            {tag}
          </span>
        )}
        <span className="text-sm font-medium text-accent">{value}</span>
      </span>
    </div>
  )
}

/** Terminal-style "system profile" readout shown beside the hero on desktop. */
export function HeroSystemPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
      className="hidden w-full max-w-[320px] justify-self-end font-mono lg:block"
      aria-label="System profile"
    >
      <div className="overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--bg-raise)]/85 backdrop-blur-md">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)]/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)]/40" />
          <span className="ml-2 text-[10px] uppercase tracking-label text-muted">
            {systemProfile.title}
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          <div className="divide-y divide-[var(--hairline)]">
            {systemProfile.metrics.map((m) => (
              <Row key={m.label} label={m.label} value={m.value} tag={m.tag} />
            ))}
          </div>

          <div className="my-2 h-px bg-[var(--hairline)]" />

          <div className="divide-y divide-[var(--hairline)]">
            {systemProfile.status.map((s) => (
              <Row key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
