import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'
import { SectionHeading } from './ui/SectionHeading'
import { staggerParent, staggerItem } from '../lib/animations'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title="A stack spanning applied AI, backend engineering, and the field."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((category, idx) => (
            <motion.div
              key={category.name}
              variants={staggerItem}
              className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--text)]">
                  {category.name}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-lg border border-[var(--hairline)] bg-[var(--bg)] px-3 py-1.5 text-sm text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_6px_20px_-10px_rgba(45,226,197,0.5)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
