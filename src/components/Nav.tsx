import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Moon, Sun, Sparkles, Focus } from 'lucide-react'
import { useMotionMode } from '../hooks/useMotionMode'
import { nav, site } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './ui/Logo'
import type { Theme } from '../hooks/useTheme'

const sectionIds = nav.map((n) => n.id)

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: Theme
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative grid h-11 w-11 place-items-center rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] text-[var(--text)] transition-colors hover:border-accent hover:text-accent md:h-9 md:w-9"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/**
 * Switches between the full cinematic experience and a calm, readable view.
 * Desktop-only: on mobile the WebGL scene is already skipped and Lenis doesn't
 * take over touch scrolling, so the toggle would change almost nothing while
 * crowding a small header. OS reduced-motion is still honoured everywhere.
 */
function ModeToggle() {
  const { focus, toggle } = useMotionMode()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={focus}
      data-cursor="open"
      title={focus ? 'Switch to Experience mode' : 'Switch to Focus mode'}
      aria-label={focus ? 'Switch to Experience mode' : 'Switch to Focus mode'}
      className={`hidden h-9 w-9 place-items-center rounded-full border transition-colors md:grid ${
        focus
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-[var(--hairline)] bg-[var(--bg-raise)] text-[var(--text)] hover:border-accent hover:text-accent'
      }`}
    >
      {focus ? <Sparkles size={16} /> : <Focus size={16} />}
    </button>
  )
}

export function Nav({
  theme,
  onToggleTheme,
}: {
  theme: Theme
  onToggleTheme: () => void
}) {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[var(--hairline)] bg-[var(--bg)]/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium"
          aria-label={`${site.name} — home`}
        >
          <Logo className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-active={isActive}
                  className={`accent-underline font-mono text-sm transition-colors ${
                    isActive ? 'text-accent' : 'text-muted hover:text-[var(--text)]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-[var(--hairline)] bg-[var(--bg)]/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-3 font-mono text-sm ${
                      active === item.id
                        ? 'bg-accent/10 text-accent'
                        : 'text-muted'
                    }`}
                  >
                    <span className="mr-3 text-xs opacity-50">
                      {String(nav.indexOf(item) + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
