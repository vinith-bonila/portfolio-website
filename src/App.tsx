import { lazy, Suspense } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ProofOfWork } from './components/ProofOfWork'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'
import { CinematicIntro } from './components/CinematicIntro'
import { Cursor } from './components/ui/Cursor'
import { SmoothScrollProvider } from './providers/SmoothScroll'
import { MotionModeProvider } from './providers/MotionMode'
import { useMotionMode } from './hooks/useMotionMode'
import { useTheme } from './hooks/useTheme'

// Lazy-load below-the-fold sections to keep the initial bundle lean.
const Skills = lazy(() =>
  import('./components/Skills').then((m) => ({ default: m.Skills })),
)
const Photography = lazy(() =>
  import('./components/Photography').then((m) => ({ default: m.Photography })),
)
const Experience = lazy(() =>
  import('./components/Experience').then((m) => ({ default: m.Experience })),
)
const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({ default: m.Contact })),
)

/** Reserves vertical space so lazy sections load without layout shift. */
function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />
}

export default function App() {
  return (
    <MotionModeProvider>
      <Portfolio />
    </MotionModeProvider>
  )
}

function Portfolio() {
  const { theme, toggle } = useTheme()
  const { calm } = useMotionMode()

  return (
    <SmoothScrollProvider enabled={!calm}>
      {/* Fixed grid + noise + glow texture layer */}
      <div className="texture-bg" aria-hidden="true" />

      <CinematicIntro />
      <Cursor />

      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink-950"
      >
        Skip to content
      </a>

      <Nav theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <ProofOfWork />
        <About />
        <Projects />
        <Suspense fallback={<SectionFallback />}>
          <Skills />
          <Photography />
          <Experience />
          <Contact />
        </Suspense>
      </main>

      <KeyboardShortcuts />
    </SmoothScrollProvider>
  )
}
