import { lazy, Suspense } from 'react'
import { useDeviceCapability } from '../../hooks/useDeviceCapability'

// three.js is only pulled in when we actually render the 3D scene.
const DataCore = lazy(() => import('./DataCore'))

/**
 * Ambient hero backdrop. Renders the WebGL data-core on capable, motion-OK,
 * non-touch devices; everywhere else it falls back to a pure-CSS glow so the
 * hero still feels premium with zero 3D cost.
 */
export function HeroBackground() {
  const cap = useDeviceCapability()
  const use3D = cap.ready && cap.webgl && !cap.reducedMotion && cap.tier !== 'low'

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-glow" />
      {use3D && (
        <Suspense fallback={null}>
          <DataCore tier={cap.tier} />
        </Suspense>
      )}
    </div>
  )
}
