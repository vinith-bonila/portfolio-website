import { useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ScrollCtx, type ScrollTo } from './smoothScrollContext'


/**
 * Wraps the app in Lenis smooth scrolling. Disabled entirely when the user
 * prefers reduced motion (native scrolling then applies). Also intercepts
 * in-page hash links so they glide instead of jumping.
 */
export function SmoothScrollProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)
  const [, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) {
      lenisRef.current = null
      setReady(true)
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    setReady(true)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  const scrollTo: ScrollTo = (target, opts) => {
    const offset = opts?.offset ?? -80
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as never, { offset })
      return
    }
    // Fallback: native scroll (reduced motion or Lenis unavailable)
    const el =
      typeof target === 'string'
        ? document.querySelector(target)
        : target instanceof HTMLElement
          ? target
          : null
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
    else if (typeof target === 'number') window.scrollTo(0, target)
  }

  // Intercept in-page hash links globally.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      scrollTo(el as HTMLElement)
      history.replaceState(null, '', href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled])

  return <ScrollCtx.Provider value={{ scrollTo }}>{children}</ScrollCtx.Provider>
}
