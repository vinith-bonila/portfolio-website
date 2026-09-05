import { useEffect, useState } from 'react'

/**
 * Reactively reports whether the `dark` class is on <html>. Lets the WebGL
 * scene (which needs literal colors, not CSS vars) recolor itself when the
 * theme toggles.
 */
export function useIsDark(): boolean {
  const [dark, setDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const el = document.documentElement
    const update = () => setDark(el.classList.contains('dark'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return dark
}
