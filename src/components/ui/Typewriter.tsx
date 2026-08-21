import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  holdMs?: number
}

/**
 * Rotating typewriter effect. When reduced motion is preferred it renders the
 * first word statically (no cycling) with an accessible live label.
 */
export function Typewriter({
  words,
  className,
  typeSpeed = 55,
  deleteSpeed = 30,
  holdMs = 1600,
}: Props) {
  const reduced = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')

  useEffect(() => {
    if (reduced) return
    const current = words[wordIndex % words.length]

    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        )
      } else {
        timeout = setTimeout(() => setPhase('holding'), holdMs)
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed,
        )
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, wordIndex, words, reduced, typeSpeed, deleteSpeed, holdMs])

  if (reduced) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={className} aria-live="polite">
      {text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] -translate-y-[1px] self-center bg-accent align-middle animate-blink"
        style={{ height: '1em' }}
      />
    </span>
  )
}
