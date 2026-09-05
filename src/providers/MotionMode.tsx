import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const KEY = 'vb-focus-mode'

type MotionMode = {
  /** Focus mode explicitly enabled by the visitor. */
  focus: boolean
  /** True when heavy motion should be skipped (focus mode OR OS reduced-motion). */
  calm: boolean
  toggle: () => void
}

const Ctx = createContext<MotionMode>({
  focus: false,
  calm: false,
  toggle: () => {},
})

export function useMotionMode() {
  return useContext(Ctx)
}

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
    <Ctx.Provider value={{ focus, calm, toggle: () => setFocus((f) => !f) }}>
      {children}
    </Ctx.Provider>
  )
}
