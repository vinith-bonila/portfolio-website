import { useContext } from 'react'
import { MotionModeCtx } from '../providers/motionModeContext'

/** Read the current viewing mode (Experience vs Focus). */
export function useMotionMode() {
  return useContext(MotionModeCtx)
}
