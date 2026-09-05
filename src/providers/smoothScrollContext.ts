import { createContext } from 'react'

export type ScrollTo = (
  target: string | number | HTMLElement,
  opts?: { offset?: number },
) => void

export const ScrollCtx = createContext<{ scrollTo: ScrollTo }>({
  scrollTo: () => {},
})
