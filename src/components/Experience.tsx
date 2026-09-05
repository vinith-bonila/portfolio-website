import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Users, GraduationCap, Award } from 'lucide-react'
import { timeline, certifications, type TimelineItem } from '../data/portfolio'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { staggerParent, staggerItem } from '../lib/animations'

const kindIcon: Record<TimelineItem['kind'], typeof Briefcase> = {
  work: Briefcase,
  leadership: Users,
  education: GraduationCap,
}

const kindLabel: Record<TimelineItem['kind'], string> = {
  work: 'Experience',
  leadership: 'Leadership',
  education: 'Education',
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 70%'],
  })
  // Animated line draws in as the section scrolls through view
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Track Record"
          title="Experience, leadership, and education."
        />

        <div ref={trackRef} className="relative pl-8 md:pl-10">
          {/* Rail (static faint) */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-[var(--hairline)] md:left-[11px]" />
          {/* Rail (animated accent draw-in) */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent to-accent/20 md:left-[11px]"
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const Icon = kindIcon[item.kind]
              return (
                <Reveal key={i} delay={i * 0.04} as="div" className="relative">
                  {/* Node */}
                  <span className="absolute -left-8 top-1 grid h-4 w-4 place-items-center rounded-full border border-accent bg-[var(--bg)] md:-left-10 md:h-6 md:w-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent md:h-2 md:w-2" />
                  </span>

                  <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--bg)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        <Icon size={12} />
                        {kindLabel[item.kind]}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">
                      {item.role}
                    </h3>
                    <p className="font-mono text-sm text-muted">{item.org}</p>
                    {item.description && (
                      <p className="mt-3 text-sm text-muted">
                        {item.description}
                      </p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {item.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex gap-2.5 text-sm text-muted"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Certifications strip */}
        <Reveal className="mt-16">
          <div className="flex items-center gap-3">
            <Award size={16} className="text-accent" />
            <span className="eyebrow">Certifications</span>
            <span
              className="h-px flex-1 bg-[var(--hairline)]"
              aria-hidden="true"
            />
          </div>
          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-5 flex flex-wrap gap-3"
          >
            {certifications.map((cert) => (
              <motion.li
                key={cert}
                variants={staggerItem}
                className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-raise)] px-4 py-2.5 text-sm text-muted"
              >
                {cert}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  )
}
