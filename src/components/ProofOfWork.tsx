import { motion } from 'framer-motion'
import { proofOfWork } from '../data/portfolio'
import { CountUp } from './ui/CountUp'
import { staggerParent, staggerItem } from './ui/Reveal'

/** Count-up "proof of work" band directly beneath the hero. */
export function ProofOfWork() {
  return (
    <section aria-label="Proof of work" className="border-y border-[var(--hairline)]">
      <motion.dl
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mx-auto grid max-w-content grid-cols-2 gap-px overflow-hidden px-5 sm:grid-cols-3 md:px-8 lg:grid-cols-5"
      >
        {proofOfWork.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className="flex flex-col gap-1 py-8 pr-4"
          >
            <dd className="font-mono text-3xl font-semibold text-[var(--text)] md:text-4xl">
              <CountUp
                value={stat.value}
                pad={stat.pad}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </dd>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {stat.label}
            </dt>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  )
}
