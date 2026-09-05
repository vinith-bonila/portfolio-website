import type { Variants } from 'framer-motion'

/** Shared easing curve for the site's motion language. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Parent that staggers its children into view. Pair with `staggerItem`. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/** Child of `staggerParent` — fades and rises into place. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: EASE },
  },
}
