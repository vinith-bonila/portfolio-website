import { lazy, Suspense, useState, type ComponentType } from 'react'
import {
  Code2,
  BrainCircuit,
  Database,
  BarChart3,
  LineChart,
  Boxes,
  Layers,
  type LucideProps,
} from 'lucide-react'
import { heroNodes } from '../data/portfolio'
import { useDeviceCapability } from '../hooks/useDeviceCapability'
import { useSmoothScrollTo } from '../providers/SmoothScroll'

const DataCore = lazy(() => import('./three/DataCore'))

const ICONS: Record<string, ComponentType<LucideProps>> = {
  code: Code2,
  brain: BrainCircuit,
  database: Database,
  barChart: BarChart3,
  lineChart: LineChart,
  box: Boxes,
  layers: Layers,
}

// Angular position (degrees) of each node around the globe, tuned for an even,
// reference-like spread. Index matches `heroNodes`.
const ANGLES = [150, 90, 22, -30, -72, -128, 182]
const RX = 47
const RY = 43

type NodePos = { x: number; y: number; left: boolean }

function positions(): NodePos[] {
  return ANGLES.map((deg) => {
    const a = (deg * Math.PI) / 180
    return {
      x: 50 + RX * Math.cos(a),
      y: 50 - RY * Math.sin(a),
      left: Math.cos(a) < -0.05,
    }
  })
}

/**
 * The hero's interactive data core: a WebGL data-globe surrounded by labelled
 * skill/section nodes. Hovering a node focuses (enlarges) the globe; clicking
 * one smooth-scrolls to that section. Nodes are real buttons — accessible and
 * keyboard-navigable — and work even when WebGL is unavailable.
 */
export function HeroDataCore() {
  const cap = useDeviceCapability()
  const use3D = cap.ready && cap.webgl && !cap.reducedMotion && cap.tier !== 'low'
  const [focused, setFocused] = useState<number | null>(null)
  const scrollTo = useSmoothScrollTo()
  const pos = positions()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      {/* 3D globe (or CSS fallback) */}
      <div className="absolute inset-0">
        {use3D ? (
          <Suspense fallback={<CssGlobe />}>
            <DataCore tier={cap.tier} focused={focused !== null} />
          </Suspense>
        ) : (
          <CssGlobe />
        )}
      </div>

      {/* Connection lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {pos.map((p, i) => (
          <line
            key={i}
            x1={50}
            y1={50}
            x2={p.x}
            y2={p.y}
            stroke="#2DE2C5"
            strokeWidth={focused === i ? 0.4 : 0.18}
            opacity={focused === null ? 0.28 : focused === i ? 0.85 : 0.14}
            style={{ transition: 'opacity 0.25s, stroke-width 0.25s' }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {heroNodes.map((node, i) => {
        const Icon = ICONS[node.icon] ?? Boxes
        const p = pos[i]
        const active = focused === i
        return (
          <button
            key={node.label}
            type="button"
            data-cursor="open"
            onMouseEnter={() => setFocused(i)}
            onMouseLeave={() => setFocused((f) => (f === i ? null : f))}
            onFocus={() => setFocused(i)}
            onBlur={() => setFocused((f) => (f === i ? null : f))}
            onClick={() => scrollTo(`#${node.target}`)}
            aria-label={`${node.label} — go to ${node.target}`}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              flexDirection: p.left ? 'row-reverse' : 'row',
            }}
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur-sm transition-all duration-200 ${
                active
                  ? 'border-accent bg-accent/20 text-accent shadow-[0_0_20px_-2px_rgba(45,226,197,0.6)]'
                  : 'border-[var(--hairline)] bg-[var(--bg-raise)]/70 text-[var(--text)]'
              } group-hover:scale-110`}
            >
              <Icon size={18} />
            </span>
            <span
              className={`whitespace-nowrap rounded-md px-2 py-1 font-mono text-xs transition-colors ${
                active
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted group-hover:text-[var(--text)]'
              }`}
            >
              {node.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** Lightweight non-WebGL globe: a glowing ring + core. */
function CssGlobe() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="relative h-[62%] w-[62%] rounded-full border border-accent/20">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(45,226,197,0.22),transparent_65%)]" />
        <div className="absolute inset-[18%] rounded-full border border-accent/15" />
        <div className="absolute inset-[38%] rounded-full bg-accent/10 blur-md" />
      </div>
    </div>
  )
}
