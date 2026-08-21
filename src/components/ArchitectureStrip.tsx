import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Vertical pipeline flow for a project's architecture. Each node lights up
 * teal on hover; nodes stagger in when the strip scrolls into view.
 */
export function ArchitectureStrip({ nodes }: { nodes: string[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="mt-6">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-label text-muted">
        Architecture
      </div>

      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="flex flex-col items-stretch"
        onMouseLeave={() => setActive(null)}
      >
        {nodes.map((node, i) => {
          const isActive = active === i
          return (
            <motion.li
              key={node}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
              }}
              className="flex flex-col items-center"
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`w-full rounded-lg border px-4 py-2.5 text-center font-mono text-xs transition-colors duration-200 ${
                  isActive
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-[var(--hairline)] bg-[var(--bg)] text-muted'
                }`}
              >
                {node}
              </button>
              {i < nodes.length - 1 && (
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`my-1 transition-colors duration-200 ${
                    isActive || active === i + 1 ? 'text-accent' : 'text-[var(--text-muted)]/40'
                  }`}
                />
              )}
            </motion.li>
          )
        })}
      </motion.ol>
    </div>
  )
}
