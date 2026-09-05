import { createContext } from 'react'

export type MotionMode = {
  /** Focus mode explicitly enabled by the visitor. */
  focus: boolean
  /** True when heavy motion should be skipped (focus mode OR OS reduced-motion). */
  calm: boolean
  toggle: () => void
}

export const MotionModeCtx = createContext<MotionMode>({
  focus: false,
  calm: false,
  toggle: () => {},
})
