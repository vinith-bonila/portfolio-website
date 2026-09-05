import { Folder, Cpu, Target, Activity, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import { systemProfile } from '../data/portfolio'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  folder: Folder,
  cpu: Cpu,
  target: Target,
  activity: Activity,
}

/**
 * Compact horizontal "system profile" proof strip shown beneath the hero
 * content — replaces the old vertical panel so it never competes with the
 * data core on the right.
 */
export function HeroProfileStrip() {
  return (
    <div className="glass max-w-2xl rounded-xl">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {systemProfile.title}
        </span>
        {systemProfile.live && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
            <span className="relative flex h-1 w-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1 w-1 rounded-full bg-accent" />
            </span>
            Live
          </span>
        )}
      </div>
      <dl className="grid grid-cols-2 divide-y divide-[var(--hairline)] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {systemProfile.stats.map((s) => {
          const Icon = ICONS[s.icon] ?? Target
          return (
            <div key={s.label} className="px-4 py-3">
              <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                <Icon size={12} className="text-accent" />
                {s.label}
              </dt>
              <dd
                className={`mt-1.5 font-mono text-sm font-medium ${
                  s.accent ? 'text-accent' : 'text-[var(--text)]'
                }`}
              >
                {s.value}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
