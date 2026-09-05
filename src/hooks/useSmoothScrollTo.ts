import { useContext } from 'react'
import { ScrollCtx } from '../providers/smoothScrollContext'

/** Programmatic smooth-scroll (nav links, CTAs, hero nodes). */
export function useSmoothScrollTo() {
  return useContext(ScrollCtx).scrollTo
}
