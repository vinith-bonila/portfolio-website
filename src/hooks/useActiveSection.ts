import { useEffect, useState } from 'react'

/**
 * Scroll-spy: returns the id of the section currently in view.
 *
 * Sections below the fold are lazy-loaded, so they aren't in the DOM when this
 * first runs — a MutationObserver picks them up as they mount and starts
 * observing them, then stops watching once every section has been found.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio)
          } else {
            visible.delete(entry.target.id)
          }
        }
        // Pick the most-visible section
        let best: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best) setActive(best)
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.15, 0.3, 0.6, 1],
      },
    )

    const observed = new Set<Element>()
    let mutation: MutationObserver | null = null

    const attach = () => {
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && !observed.has(el)) {
          observer.observe(el)
          observed.add(el)
        }
      }
      // Every section is accounted for — stop watching the tree.
      if (observed.size === ids.length) {
        mutation?.disconnect()
        mutation = null
      }
    }

    attach()
    if (observed.size < ids.length) {
      mutation = new MutationObserver(attach)
      mutation.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
      mutation?.disconnect()
    }
  }, [ids])

  return active
}
