import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills, projects } from '../data/portfolio'
import { SectionHeading } from './ui/SectionHeading'
import { CountUp } from './ui/CountUp'
import { Reveal, staggerParent, staggerItem } from './ui/Reveal'
import { useIsDark } from '../hooks/useIsDark'

/** Headline KPIs, all drawn from real project work. */
const KPIS = [
  { value: 3, label: 'Live apps in production' },
  { value: 265, suffix: '+', label: 'Automated tests written' },
  { value: 6, label: 'Projects shipped' },
  { value: 1.0, decimals: 2, label: 'Best retrieval recall@5' },
]

// Real DocMind RAG evaluation metrics (0–1).
const docmind = projects.find((p) => p.id === 'docmind')
const ragData =
  docmind?.metrics?.map((m) => ({ name: m.label, value: m.value })) ?? []

// Real breadth: number of skills per category.
const skillData = skills.map((c) => ({ name: c.name, value: c.skills.length }))

function ChartCard({
  label,
  hint,
  children,
}: {
  label: string
  hint: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Recharts' ResponsiveContainer must mount into a sized box, so we only
  // render the chart once the card scrolls into view (also saves work).
  const inView = useInView(ref, { once: true, margin: '80px' })
  return (
    <div className="glass rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {label}
        </span>
        <span className="font-mono text-[10px] text-muted">{hint}</span>
      </div>
      <div ref={ref} className="mt-4 h-[260px] w-full">
        {inView ? children : null}
      </div>
    </div>
  )
}

function TooltipBox({
  active,
  payload,
  label,
  fmt,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
  fmt: (v: number) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-raise)] px-3 py-2 shadow-xl">
      <div className="font-mono text-[11px] text-[var(--text)]">{label}</div>
      <div className="font-mono text-sm font-medium text-accent">
        {fmt(payload[0].value)}
      </div>
    </div>
  )
}

export function DataViz() {
  const dark = useIsDark()

  const axis = dark ? '#8A9694' : '#55605F'
  const grid = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,13,14,0.06)'
  const barColor = dark ? '#2DE2C5' : '#0B8F79'

  return (
    <section id="analytics" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Analytics"
          title="Data, measured — not decorated."
          description="Live charts built from my own projects. Every number here is real, pulled straight from the work."
        />

        {/* KPI row */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {KPIS.map((k) => (
            <motion.div
              key={k.label}
              variants={staggerItem}
              className="glass rounded-2xl p-5"
            >
              <div className="font-mono text-3xl font-semibold text-accent md:text-4xl">
                <CountUp
                  value={k.value}
                  decimals={k.decimals}
                  suffix={k.suffix}
                />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                {k.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* DocMind RAG evaluation */}
          <Reveal>
            <ChartCard label="DocMind · RAG evaluation" hint="score 0–1">
              <ResponsiveContainer>
                <BarChart
                  data={ragData}
                  layout="vertical"
                  margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
                >
                  <CartesianGrid horizontal={false} stroke={grid} />
                  <XAxis
                    type="number"
                    domain={[0, 1]}
                    tick={{ fill: axis, fontSize: 11, fontFamily: 'monospace' }}
                    stroke={grid}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={112}
                    tick={{ fill: axis, fontSize: 11, fontFamily: 'monospace' }}
                    stroke={grid}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(45,226,197,0.06)' }}
                    content={<TooltipBox fmt={(v) => v.toFixed(2)} />}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
                    {ragData.map((_, i) => (
                      <Cell key={i} fill={barColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          {/* Skills breadth — with a small metric toggle */}
          <Reveal delay={0.05}>
            <ChartCard
              label="Toolkit · breadth by area"
              hint="skills per category"
            >
              <ResponsiveContainer>
                <BarChart
                  data={skillData}
                  margin={{ left: -18, right: 8, top: 4, bottom: 4 }}
                >
                  <CartesianGrid vertical={false} stroke={grid} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: axis, fontSize: 9, fontFamily: 'monospace' }}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={64}
                    stroke={grid}
                  />
                  <YAxis
                    tick={{ fill: axis, fontSize: 11, fontFamily: 'monospace' }}
                    stroke={grid}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(45,226,197,0.06)' }}
                    content={<TooltipBox fmt={(v) => `${v} skills`} />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {skillData.map((_, i) => (
                      <Cell key={i} fill={barColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
