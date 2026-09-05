import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, FileDown, MapPin } from 'lucide-react'
import { hero, socials } from '../data/portfolio'
import { Typewriter } from './ui/Typewriter'
import { MagneticButton } from './ui/MagneticButton'
import { HeroSystemPanel } from './HeroSystemPanel'
import { HeroBackground } from './three/HeroBackground'

const EASE = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  }
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
      aria-label="Introduction"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
       <div>
        <motion.p
          {...fadeUp(0.05)}
          className="eyebrow flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {hero.status}
        </motion.p>

        <motion.h1
          {...fadeUp(0.12)}
          className="mt-6 text-[13vw] font-bold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          {hero.name}
        </motion.h1>

        <motion.div
          {...fadeUp(0.2)}
          className="mt-5 font-mono text-lg text-muted sm:text-xl md:text-2xl"
        >
          <span className="text-accent">&gt;</span>{' '}
          <Typewriter words={hero.roles} className="text-[var(--text)]" />
        </motion.div>

        <motion.p
          {...fadeUp(0.28)}
          className="mt-8 max-w-2xl text-xl font-medium leading-snug md:text-2xl"
        >
          {hero.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.34)}
          className="mt-5 max-w-2xl text-muted md:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          {...fadeUp(0.42)}
          className="mt-6 flex items-center gap-2 font-mono text-sm text-muted"
        >
          <MapPin size={15} className="text-accent" />
          {hero.location}
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={`#${hero.ctas.primary.target}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-ink-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(45,226,197,0.6)]"
          >
            {hero.ctas.primary.label}
            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-0.5"
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
        <motion.div {...fadeUp(0.58)} className="mt-10 flex items-center gap-5">
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
       </div>

        <HeroSystemPanel />
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
