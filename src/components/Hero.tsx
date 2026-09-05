import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, FileDown } from 'lucide-react'
import { hero, socials } from '../data/portfolio'
import { MagneticButton } from './ui/MagneticButton'
import { HeroDataCore } from './HeroDataCore'
import { HeroProfileStrip } from './HeroProfileStrip'

const EASE = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  }
}

export function Hero() {
  const [firstName, ...restName] = hero.name.split(' ')
  const lastName = restName.join(' ')

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 lg:pt-20"
      aria-label="Introduction"
    >
      {/* Ambient glow (the full 3D lives in the right column, not the bg) */}
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        {/* ── Identity (60%) ── */}
        <div>
          <motion.p {...fadeUp(0.05)} className="eyebrow flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.status}
          </motion.p>

          <motion.h1
            {...fadeUp(0.12)}
            className="mt-5 text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
          >
            {firstName} <span className="text-accent">{lastName}</span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-4 font-mono text-base uppercase tracking-[0.28em] text-muted sm:text-lg md:text-xl"
          >
            Data <span className="text-accent">×</span> AI{' '}
            <span className="text-accent">×</span> Analytics
          </motion.div>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 max-w-xl text-muted md:text-lg"
          >
            {hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href={`#${hero.ctas.primary.target}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-ink-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(45,226,197,0.6)]"
            >
              {hero.ctas.primary.label}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </MagneticButton>

            <MagneticButton
              href={hero.ctas.secondary.href}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-6 py-3 font-mono text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {hero.ctas.secondary.label}
              <FileDown size={16} />
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.48)} className="mt-7 flex items-center gap-5">
            {[
              { href: socials.github, label: 'GitHub', Icon: Github },
              { href: socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
              { href: `mailto:${socials.email}`, label: 'Email', Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                aria-label={label}
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>

          {/* System profile strip */}
          <motion.div {...fadeUp(0.56)} className="mt-9">
            <HeroProfileStrip />
          </motion.div>
        </div>

        {/* ── Interactive data core (40%) — desktop only ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="hidden lg:block"
        >
          <HeroDataCore />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[10px] uppercase tracking-label text-muted"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}
