import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Zero-pad the integer part to this width, e.g. 2 → "02". */
  pad?: number
  durationMs?: number
  className?: string
}

function format(n: number, decimals: number, pad?: number) {
  let s = n.toFixed(decimals)
  if (pad) {
    const [intPart, frac] = s.split('.')
    s = intPart.padStart(pad, '0') + (frac ? `.${frac}` : '')
  }
  return s
}

/** Counts up to `value` once when scrolled into view. Respects reduced motion. */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  pad,
  durationMs = 900,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = performance.now()
    // easeOutCubic
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      setDisplay(value * ease(t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value, durationMs])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display, decimals, pad)}
      {suffix}
    </span>
  )
}
