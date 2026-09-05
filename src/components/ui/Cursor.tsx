import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'view' | 'explore' | 'inspect' | 'ask' | 'open'

const LABELS: Record<CursorState, string> = {
  default: '',
  view: 'VIEW',
  explore: 'EXPLORE',
  inspect: 'INSPECT',
  ask: 'ASK',
  open: 'OPEN',
}

/**
 * Premium custom cursor for pointer:fine devices only. A small dot tracks the
 * pointer exactly; a ring lerps behind it and swells to show a contextual label
 * (VIEW / EXPLORE / INSPECT / ASK / OPEN) when hovering an element that sets
 * `data-cursor`. Never mounts on touch devices, so mobile keeps the native UX.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [pressed, setPressed] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    document.documentElement.classList.add('has-custom-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      setHidden(false)
      const el = (e.target as HTMLElement)?.closest?.('[data-cursor]') as
        | HTMLElement
        | null
      const next = (el?.dataset.cursor as CursorState) || 'default'
      setState((prev) => (prev === next ? prev : next))
    }
    const onLeave = () => setHidden(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    let raf = 0
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  const label = LABELS[state]
  const labelled = label !== ''

  return (
    <div aria-hidden="true" className={hidden ? 'opacity-0' : 'opacity-100'}>
      {/* Exact-tracking dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent transition-[opacity] duration-200"
        style={{ opacity: labelled ? 0 : 1 }}
      />
      {/* Lerping ring / label */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border font-mono uppercase transition-[width,height,background-color,border-color] duration-200"
        style={{
          width: labelled ? 46 : pressed ? 16 : 24,
          height: labelled ? 46 : pressed ? 16 : 24,
          marginLeft: labelled ? -23 : pressed ? -8 : -12,
          marginTop: labelled ? -23 : pressed ? -8 : -12,
          fontSize: 8,
          letterSpacing: '0.14em',
          borderColor: labelled
            ? 'rgba(45,226,197,0.7)'
            : 'rgba(45,226,197,0.35)',
          color: '#2DE2C5',
          backgroundColor: labelled ? 'rgba(45,226,197,0.10)' : 'transparent',
          backdropFilter: labelled ? 'blur(2px)' : 'none',
        }}
      >
        {label}
      </div>
    </div>
  )
}
