import { useEffect, useState } from 'react'

export type DeviceTier = 'high' | 'mid' | 'low'

export interface Capability {
  /** WebGL is available in this browser. */
  webgl: boolean
  /** Coarse pointer / touch device. */
  touch: boolean
  /** Rendering tier used to scale 3D quality. */
  tier: DeviceTier
  /** User asked the OS to reduce motion. */
  reducedMotion: boolean
  /** True once detection has run (avoid SSR/first-paint flashes). */
  ready: boolean
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Detects device capability so the 3D layer can be scaled or skipped entirely.
 * Runs once on mount; returns `ready:false` until then so callers can hold the
 * lightweight path during the very first paint.
 */
export function useDeviceCapability(): Capability {
  const [cap, setCap] = useState<Capability>({
    webgl: false,
    touch: false,
    tier: 'low',
    reducedMotion: false,
    ready: false,
  })

  useEffect(() => {
    // A coarse pointer is the stable signal for "mobile / simplified"; screen
    // width is avoided here because embedded/resizing viewports report a
    // transient small width at mount, which would wrongly demote a desktop.
    const touch = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const webgl = detectWebGL()

    const cores = navigator.hardwareConcurrency ?? 4
    // deviceMemory is non-standard; treat missing as a mid value.
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4

    let tier: DeviceTier = 'high'
    if (touch) tier = 'low'
    else if (cores <= 4 || mem <= 4) tier = 'mid'

    setCap({ webgl, touch, tier, reducedMotion, ready: true })
  }, [])

  return cap
}
