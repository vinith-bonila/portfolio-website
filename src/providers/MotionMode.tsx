import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { MotionModeCtx } from './motionModeContext'

const KEY = 'vb-focus-mode'

/**
 * Two viewing modes:
 *  • Experience (default) — full cinematic: WebGL globe, smooth scroll, ambient motion.
 *  • Focus — calm and maximally readable: no 3D, native scroll, ambient animation off.
 * The choice persists, and OS reduced-motion always forces the calm path.
 */
export function MotionModeProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [focus, setFocus] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      return localStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    // `data-focus` lets CSS quiet ambient animations without prop-drilling.
    document.documentElement.toggleAttribute('data-focus', focus)
    try {
      localStorage.setItem(KEY, focus ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [focus])

  const calm = focus || reduced

  return (
    <MotionModeCtx.Provider value={{ focus, calm, toggle: () => setFocus((f) => !f) }}>
      {children}
    </MotionModeCtx.Provider>
  )
}
