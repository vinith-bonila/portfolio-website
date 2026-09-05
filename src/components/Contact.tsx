import { useState } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react'
import {
  contact,
  socials,
  site,
  currently,
  builtWith,
} from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { MagneticButton } from './ui/MagneticButton'
import { ContactForm } from './ContactForm'

function CurrentlyBlock() {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] p-6">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-label text-accent">
          Currently
        </span>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Open to
          </dt>
          <dd className="mt-2 space-y-1">
            {currently.openTo.map((item) => (
              <div key={item} className="text-sm text-[var(--text)]">
                {item}
              </div>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Based in
          </dt>
          <dd className="mt-2 space-y-1">
            {currently.basedIn.map((item) => (
              <div key={item} className="text-sm text-[var(--text)]">
                {item}
              </div>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export function Contact() {
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea')
      ta.value = contact.email
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      {/* Cinematic backdrop — a calm central glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="contact-glow absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,226,197,0.1),transparent_62%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow flex items-center gap-3">
            <span className="font-mono text-xs text-accent">05</span>
            Turning data into decisions
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
            Let&rsquo;s build something{' '}
            <span className="text-accent">with data.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-muted md:text-lg">{contact.sub}</p>
        </Reveal>

        {/* Big email CTA + copy */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <MagneticButton
              href={`mailto:${contact.email}`}
              strength={10}
              className="group inline-flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] px-6 py-5 transition-colors hover:border-accent md:px-8 md:py-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-ink-950 transition-transform group-hover:scale-105 md:h-12 md:w-12">
                <Mail size={20} />
              </span>
              <span className="min-w-0 text-left">
                <span className="block font-mono text-[10px] uppercase tracking-label text-muted">
                  Email me
                </span>
                <span className="block truncate text-lg font-medium md:text-2xl">
                  {contact.email}
                </span>
              </span>
              <ArrowUpRight
                size={22}
                className="ml-2 hidden shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
              />
            </MagneticButton>

            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] px-6 py-4 font-mono text-sm transition-colors hover:border-accent hover:text-accent sm:px-7"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-accent" />
                  <span className="text-accent">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
        </Reveal>

        {/* Secondary contact row */}
        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${contact.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Phone size={15} />
              {contact.phone}
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </Reveal>

        {/* Contact form (mailto) */}
        <Reveal delay={0.28}>
          <div className="mt-10 max-w-xl">
            <ContactForm />
          </div>
        </Reveal>

        {/* Currently status */}
        <Reveal delay={0.34}>
          <div className="mt-10 max-w-xl">
            <CurrentlyBlock />
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-24 max-w-content px-5 md:px-8">
        <div className="flex flex-col gap-6 border-t border-[var(--hairline)] py-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-label text-muted">
              Engineered with
            </div>
            <div className="mt-2 font-mono text-sm text-[var(--text)]">
              {builtWith.tools.join(' · ')}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-label text-muted">
              Designed &amp; built by{' '}
              <span className="text-accent">{builtWith.author}</span>
            </div>
          </div>

          <div className="flex items-start gap-1">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <Github size={16} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="grid h-11 w-11 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
        <p className="pb-8 font-mono text-[11px] text-muted">
          © {year} {site.name}.
        </p>
      </footer>
    </section>
  )
}
