import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { staggerParent } from '../../lib/animations'

const EASE = [0.22, 1, 0.36, 1] as const

/** Fade-and-rise container that triggers when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.48, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'section'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  )
}
