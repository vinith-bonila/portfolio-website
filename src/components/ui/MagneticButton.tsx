import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  /** Pull strength in px */
  strength?: number
  ariaLabel?: string
  download?: boolean
  external?: boolean
}

/**
 * Button/link whose contents drift toward the cursor on hover (a "magnetic"
 * pull), snapping back on leave. Falls back to a static element under reduced
 * motion. Renders an <a> when `href` is set, otherwise a <button>.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 14,
  ariaLabel,
  download,
  external,
}: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set((relX / (rect.width / 2)) * strength)
    y.set((relY / (rect.height / 2)) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const style = reduced ? undefined : { x: springX, y: springY }

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className={className}
        aria-label={ariaLabel}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
