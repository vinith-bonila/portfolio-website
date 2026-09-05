import type { ComponentType } from 'react'
import {
  Database,
  BrainCircuit,
  BarChart3,
  Server,
  ArrowRight,
  FileDown,
  type LucideProps,
} from 'lucide-react'
import { about, hero } from '../data/portfolio'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, staggerParent, staggerItem } from './ui/Reveal'
import { motion } from 'framer-motion'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  database: Database,
  brain: BrainCircuit,
  barChart: BarChart3,
  server: Server,
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="00"
          eyebrow="Identity"
          title="Who's behind the work."
          description="A data-and-AI engineer who ships — with a petroleum-engineering foundation."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Intro + stack + resume */}
          <Reveal>
            <div className="space-y-5">
              {about.intro.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-xl font-medium leading-snug md:text-2xl'
                      : 'text-muted md:text-lg'
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-label text-muted">
                Core stack
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {about.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[var(--hairline)] bg-[var(--bg-raise)] px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`#${hero.ctas.primary.target}`}
                data-cursor="open"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-ink-950 transition-shadow hover:shadow-[0_0_28px_-6px_rgba(45,226,197,0.6)]"
              >
                View projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={hero.ctas.secondary.href}
                download
                data-cursor="open"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-6 py-3 font-mono text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Resume
                <FileDown size={16} />
              </a>
            </div>
          </Reveal>

          {/* Interactive focus facets */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {about.facets.map((f) => {
              const Icon = ICONS[f.icon] ?? Database
              return (
                <motion.div
                  key={f.key}
                  variants={staggerItem}
                  data-cursor="inspect"
                  className="group relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--hairline)] bg-[var(--bg)] text-accent transition-colors group-hover:border-accent/60">
                    <Icon size={18} />
                  </span>
                  <h3 className="relative mt-4 font-mono text-sm uppercase tracking-wider text-[var(--text)]">
                    {f.key}
                  </h3>
                  <p className="relative mt-2 text-sm text-muted">{f.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
